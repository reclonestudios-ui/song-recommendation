
import google.generativeai as genai
import pandas as pd
import json
import time
import random
import os

# --- CONFIGURATION ---
GEMINI_API_KEY = "AIzaSyC1typQr_vFhO6Cwo0aKklyAhSig5VspnU" # Use the one from song_recommendation.py
genai.configure(api_key=GEMINI_API_KEY)

CSV_FILE = "SongRecommendation.csv"
TARGET_COUNT = 10000
BATCH_SIZE = 40  # Number of songs to request per prompt (to fit in context/output limits)

# Decades and years to cover to get a good spread
YEARS = list(range(1960, 2024))
GENRES = ["Hindi Pop", "Bollywood", "Filmi", "Indie Pop", "Sufi", "Ghazal", "Punjabi Pop"]

def get_csv_header():
    """Reads existing CSV to get the correct header order."""
    if os.path.exists(CSV_FILE):
        return pd.read_csv(CSV_FILE, nrows=0).columns.tolist()
    else:
        # Fallback if file doesn't exist (though it should)
        return [
            "track_id", "track_name", "track_artist", "track_popularity",
            "track_album_id", "track_album_name", "track_album_release_date",
            "playlist_name", "playlist_id", "playlist_genre", "playlist_subgenre",
            "danceability", "energy", "key", "loudness", "mode", "speechiness",
            "acousticness", "instrumentalness", "liveness", "valence", "tempo",
            "duration_ms"
        ]

CSV_HEADER = get_csv_header()

def generate_songs_batch(year, genre, count=20, existing_names=set()):
    """
    Asks Gemini to generate a batch of songs for a specific year/genre.
    """
    model = genai.GenerativeModel('gemini-flash-lite-latest')
    
    prompt = f"""
    Generate a JSON list of exactly {count} popular {genre} songs from the year {year}.
    
    For each song, estimate these audio features accurately (0.0 to 1.0 mostly):
    - track_name (String)
    - track_artist (String)
    - track_popularity (Int 0-100)
    - track_album_name (String)
    - danceability (Float 0-1)
    - energy (Float 0-1)
    - key (Int 0-11)
    - loudness (Float -60 to 0)
    - mode (Int 0 or 1)
    - speechiness (Float 0-1)
    - acousticness (Float 0-1)
    - instrumentalness (Float 0-1 - usually 0 for pop)
    - liveness (Float 0-1)
    - valence (Float 0-1)
    - tempo (Float)
    - duration_ms (Int)

    IMPORTANT: 
    - The output must be a valid JSON list of objects.
    - Do NOT include songs named: {json.dumps(list(existing_names)[-50:])} (if any).
    - Provide diverse artists (Arijit Singh, Lata Mangeshkar, Kishore Kumar, AR Rahman, etc).
    - Do not include markdown formatting like ```json. Just raw text or bracketed JSON.
    """
    
    try:
        response = model.generate_content(prompt)
        text = response.text.replace('```json', '').replace('```', '').strip()
        # Sometimes the model adds text before/after, try to isolate the list
        start_idx = text.find('[')
        end_idx = text.rfind(']') + 1
        if start_idx != -1 and end_idx != -1:
             text = text[start_idx:end_idx]
             
        data = json.loads(text)
        return data
    except Exception as e:
        print(f"Error generating batch for {year} {genre}: {e}")
        # Print response feedback if available
        try:
             if hasattr(response, 'prompt_feedback'):
                print(response.prompt_feedback)
        except:
             pass
        return []

def append_to_csv(songs_data, year, genre):
    """
    Formats the JSON data into a DataFrame matching the CSV schema and appends it.
    """
    rows = []
    current_time = int(time.time())
    
    for i, song in enumerate(songs_data):
        row = {col: 0 for col in CSV_HEADER} # Default 0
        
        # Map JSON fields to CSV columns
        row['track_id'] = f"gemini_{year}_{current_time}_{i}"
        row['track_name'] = song.get('track_name', 'Unknown')
        row['track_artist'] = song.get('track_artist', 'Unknown')
        row['track_popularity'] = song.get('track_popularity', 50)
        row['track_album_id'] = f"gemini_alb_{year}_{i}"
        row['track_album_name'] = song.get('track_album_name', f"{genre} Hits {year}")
        row['track_album_release_date'] = f"{year}-01-01"
        row['playlist_name'] = f"{genre} AI Generated"
        row['playlist_id'] = "hindi_ai_gen_001"
        row['playlist_genre'] = "pop" # Mapping to existing genre scope for compatibility
        row['playlist_subgenre'] = "hindi pop" 
        
        # Audio features
        row['danceability'] = song.get('danceability', 0.5)
        row['energy'] = song.get('energy', 0.5)
        row['key'] = song.get('key', 0)
        row['loudness'] = song.get('loudness', -5.0)
        row['mode'] = song.get('mode', 1)
        row['speechiness'] = song.get('speechiness', 0.05)
        row['acousticness'] = song.get('acousticness', 0.1)
        row['instrumentalness'] = song.get('instrumentalness', 0.0)
        row['liveness'] = song.get('liveness', 0.1)
        row['valence'] = song.get('valence', 0.5)
        row['tempo'] = song.get('tempo', 120.0)
        row['duration_ms'] = song.get('duration_ms', 200000)

        rows.append(row)

    if not rows:
        return 0

    df_new = pd.DataFrame(rows)
    # Ensure correct column order
    df_new = df_new[CSV_HEADER]
    
    # Append to file
    with open(CSV_FILE, 'a', newline='', encoding='utf-8') as f:
        df_new.to_csv(f, header=False, index=False)
        
    return len(rows)

def main():
    total_added = 0
    existing_track_names = set()
    
    # Load some existing names to avoid dupes purely by name if possible (optional)
    if os.path.exists(CSV_FILE):
        try:
             # Just read track_names to save memory
             existing = pd.read_csv(CSV_FILE, usecols=['track_name'])
             existing_track_names = set(existing['track_name'].astype(str))
             print(f"Loaded {len(existing_track_names)} existing songs.")
        except:
             pass

    print(f"Starting generation of {TARGET_COUNT} Hindi songs...")
    
    errors = 0
    # Infinite loop till target hit, shuffling years/genres to get variety
    while total_added < TARGET_COUNT:
        year = random.choice(YEARS)
        genre = random.choice(GENRES)
        
        print(f"Generating batch: {year} - {genre}...")
        
        batch_data = generate_songs_batch(year, genre, count=BATCH_SIZE, existing_names=existing_track_names)
        
        if batch_data:
            # Filter duplicates immediately
            new_batch = []
            for song in batch_data:
                name = song.get('track_name', '').strip()
                if name and name not in existing_track_names:
                    new_batch.append(song)
                    existing_track_names.add(name)
            
            if new_batch:
                added = append_to_csv(new_batch, year, genre)
                total_added += added
                print(f"  + Added {added} songs. Total: {total_added}/{TARGET_COUNT}")
                errors = 0 # Reset error count
            else:
                print("  - No unique songs in this batch.")
        else:
            errors += 1
            if errors > 5:
                print("Too many consecutive errors, pausing for 1 minute...")
                time.sleep(60)
                errors = 0
        
        # Rate limit compliance
        time.sleep(2) 

    print("Done!")

if __name__ == "__main__":
    main()
