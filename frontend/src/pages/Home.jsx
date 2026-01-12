import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Hero from '../components/Hero';
import Row from '../components/Row';
import SongModal from '../components/SongModal';
import SearchSection from '../components/SearchSection';
import RecommendationList from '../components/RecommendationList';

const Home = () => {
    const [selectedSong, setSelectedSong] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchedSong, setSearchedSong] = useState('');

    // Ref for scrolling to results
    const resultsRef = useRef(null);

    // Mock data for initial rows (keep as fallback/footer content)
    const trendingNow = [
        { track_name: "Blinding Lights", track_artist: "The Weeknd", spotify_url: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b", youtube_url: "https://www.youtube.com/watch?v=4NRXx6U8ABQ" },
        { track_name: "Levitating", track_artist: "Dua Lipa", spotify_url: "#", youtube_url: "#" },
        { track_name: "Stay", track_artist: "The Kid LAROI", spotify_url: "#", youtube_url: "#" },
        { track_name: "Peaches", track_artist: "Justin Bieber", spotify_url: "#", youtube_url: "#" },
        { track_name: "Save Your Tears", track_artist: "The Weeknd", spotify_url: "#", youtube_url: "#" },
        { track_name: "Kiss Me More", track_artist: "Doja Cat", spotify_url: "#", youtube_url: "#" },
        { track_name: "Montero", track_artist: "Lil Nas X", spotify_url: "#", youtube_url: "#" },
    ];

    const handleSearch = async (songName, numRecs) => {
        setIsLoading(true);
        setError(null);
        setSearchedSong(songName);
        setRecommendations([]);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await axios.post(`${apiUrl}/api/recommend`, {
                song_name: songName,
                n_recommendations: numRecs
            });
            console.log("API Response:", response.data);
            setRecommendations(response.data);

            // Scroll to results after short delay to allow render
            setTimeout(() => {
                resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);

        } catch (err) {
            console.error(err);
            setError('Failed to fetch recommendations. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Hero />

            <div className="relative z-10 -mt-20 md:-mt-32">
                <SearchSection onSearch={handleSearch} isLoading={isLoading} />
            </div>

            <div ref={resultsRef} className="container mx-auto px-4 min-h-[200px]">
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-red-400 bg-red-500/10 border border-red-500/20 p-4 rounded-xl max-w-lg mx-auto mb-12"
                    >
                        {error}
                    </motion.div>
                )}

                <AnimatePresence mode="wait">
                    {recommendations.length > 0 && (
                        <RecommendationList
                            recommendations={recommendations}
                            onSongClick={(song) => {
                                console.log("Selected song:", song);
                                setSelectedSong(song);
                            }}
                        />
                    )}
                </AnimatePresence>
            </div>

            {selectedSong && (
                <SongModal
                    song={selectedSong}
                    onClose={() => {
                        console.log("Closing modal");
                        setSelectedSong(null);
                    }}
                />
            )}
        </>
    );
};

export default Home;
