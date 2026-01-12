import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SongCard from './SongCard';

const RecommendationList = ({ recommendations, onSongClick }) => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 mt-12 pb-20">
            {recommendations.length > 0 && (
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-2xl md:text-3xl font-bold text-white mb-8 text-left border-l-4 border-cyan-400 pl-4"
                >
                    Top Requirements For You
                </motion.h2>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence>
                    {recommendations.map((song, index) => (
                        <SongCard
                            key={`${song.track_name}-${index}`}
                            song={song}
                            index={index}
                            onClick={onSongClick}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default RecommendationList;
