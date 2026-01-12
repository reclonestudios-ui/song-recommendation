from flask import Flask, request, jsonify
from flask_cors import CORS
from song_recommendation import recommend_songs, background_data_expansion
import threading

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/recommend', methods=['POST'])
def recommend():
    data = request.json
    song_name = data.get('song_name')
    n_recommendations = data.get('n_recommendations', 5)

    if not song_name:
        return jsonify({"error": "Please provide a song name"}), 400

    try:
        recommendations = recommend_songs(song_name, n_recommendations)
        
        if recommendations is None:
             return jsonify({"error": "Could not generate recommendations."}), 500
        
        # Start Background Expansion Task
        # Use daemon=True so it doesn't block program exit
        thread = threading.Thread(
            target=background_data_expansion, 
            args=(song_name, recommendations),
            daemon=True
        )
        thread.start()
        
        return jsonify(recommendations)
    except Exception as e:
        print(f"Server Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
