import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Sparkles, Disc } from 'lucide-react';

const SearchSection = ({ onSearch, isLoading }) => {
    const [songName, setSongName] = useState('');
    const [numRecs, setNumRecs] = useState(5);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!songName.trim()) return;
        onSearch(songName, numRecs);
    };

    return (
        <section className="relative w-full max-w-5xl mx-auto px-6 pt-56 z-20">
            {/* Header Text */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    INITIALIZE <span className="text-[#10b981] drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]">SEARCH</span>
                </h2>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide">
                    Access the neural network. Find the perfect frequency.
                </p>
            </motion.div>

            {/* The Command Console */}
            <motion.form
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="relative group"
            >
                {/* Glowing Border Container */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#10b981] via-blue-500 to-purple-600 rounded-[2rem] opacity-30 group-hover:opacity-60 blur-xl transition duration-500 animate-pulse-slow"></div>

                <div className="relative bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 p-2 md:p-3 rounded-[2rem] flex flex-col md:flex-row items-center gap-4 md:gap-2 shadow-2xl">

                    {/* Icon */}
                    <div className="hidden md:flex items-center justify-center w-16 h-16 bg-white/5 rounded-full border border-white/5 shrink-0">
                        <Disc className="text-[#10b981] animate-spin-slow" size={28} />
                    </div>

                    {/* Input Field */}
                    <div className="flex-1 w-full relative">
                        <input
                            type="text"
                            value={songName}
                            onChange={(e) => setSongName(e.target.value)}
                            placeholder="Type a song (e.g., Starboy)..."
                            className="w-full bg-transparent border-none text-white text-xl md:text-2xl font-medium placeholder-gray-600 focus:outline-none focus:ring-0 px-4 py-4 md:py-2 font-display tracking-wide"
                        />
                    </div>

                    {/* Divider for mobile hidden */}
                    <div className="hidden md:block w-px h-10 bg-white/10 mx-2"></div>

                    {/* Count Selector (Compact) */}
                    <div className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-xl border border-white/5 w-full md:w-auto justify-between md:justify-start">
                        <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Count</span>
                        <div className="flex items-center gap-2">
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={numRecs}
                                onChange={(e) => setNumRecs(parseInt(e.target.value))}
                                className="w-20 md:w-24 accent-[#10b981] cursor-pointer h-1.5 bg-gray-700 rounded-lg appearance-none"
                            />
                            <span className="text-[#10b981] font-bold font-mono text-lg w-6 text-center">{numRecs}</span>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        type="submit"
                        disabled={isLoading || !songName.trim()}
                        className="w-full md:w-auto bg-[#10b981] hover:bg-[#059669] text-black font-bold text-lg px-8 py-4 md:py-5 rounded-xl md:rounded-[1.5rem] transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0"
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <span>RUN</span>
                                <Sparkles size={20} className="fill-black" />
                            </>
                        )}
                    </button>
                </div>
            </motion.form>

            {/* Style for custom animations */}
            <style>{`
                .animate-spin-slow { animation: spin 8s linear infinite; }
                @keyframes spin { 100% { transform: rotate(360deg); } }
            `}</style>
        </section>
    );
};

export default SearchSection;
