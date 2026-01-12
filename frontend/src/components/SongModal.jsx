import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Youtube, Music, Disc, Activity, ExternalLink, Play } from 'lucide-react';

const gradients = [
    "from-pink-500 to-rose-500",
    "from-purple-500 to-indigo-500",
    "from-cyan-400 to-blue-500",
    "from-emerald-400 to-green-600",
    "from-orange-400 to-red-500",
    "from-fuchsia-500 to-purple-600",
    "from-violet-500 to-fuchsia-500",
    "from-sky-400 to-indigo-500",
    "from-teal-400 to-emerald-500",
];

const getGradient = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % gradients.length;
    return gradients[index];
};

const SongModal = ({ song, onClose }) => {
    const gradient = useMemo(() => getGradient(song?.track_name || ''), [song?.track_name]);

    if (!song) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#050505]/90 backdrop-blur-md"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="relative w-full max-w-2xl bg-[#111] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl shadow-[#10b981]/20"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Decorative Header Grid */}
                    <div className="absolute top-0 left-0 w-full h-32 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#10b981] to-transparent"></div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 z-20 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-all border border-white/5 hover:border-[#10b981]/50"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex flex-col md:flex-row h-full">
                        {/* Left: Album Art & Vinyl */}
                        <div className="relative w-full md:w-1/2 min-h-[300px] p-8 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-black">
                            {/* Spinning Vinyl Effect */}
                            <motion.div
                                className="absolute text-5xl opacity-10"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="w-64 h-64 rounded-full border-[20px] border-black/80 bg-stone-900 flex items-center justify-center shadow-xl">
                                    <div className="w-24 h-24 rounded-full bg-[#10b981]/20"></div>
                                </div>
                            </motion.div>

                            <div className="relative z-10 group perspective-1000">
                                <motion.div
                                    initial={{ rotateY: -15 }}
                                    animate={{ rotateY: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className={`w-48 h-48 md:w-56 md:h-56 rounded-xl overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group-hover:scale-105 transition-transform duration-500 bg-gradient-to-br ${gradient}`}
                                >
                                    {/* Noise Texture */}
                                    <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

                                    {/* Generative Art Content */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-8xl font-black text-white/20 select-none font-display mix-blend-overlay">
                                            {song.track_name.slice(0, 2).toUpperCase()}
                                        </span>
                                        <Music size={64} className="absolute text-white/10 rotate-12" />
                                    </div>

                                    {/* Subtle gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/10 opacity-60"></div>
                                </motion.div>

                                {/* Reflection */}
                                <div className="absolute -bottom-4 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent blur-xl -z-10 rounded-full transform scale-y-50"></div>
                            </div>
                        </div>

                        {/* Right: Info & Actions */}
                        <div className="flex-1 p-8 md:p-10 flex flex-col justify-center bg-[#0a0a0a]">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="flex items-center gap-2 mb-2 text-[#10b981] text-xs font-bold tracking-widest uppercase">
                                    <Activity size={12} className="animate-pulse" />
                                    <span>High Fidelity Match</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2 leading-tight">
                                    {song.track_name}
                                </h2>
                                <p className="text-xl text-gray-400 font-medium mb-8">
                                    {song.track_artist}
                                </p>

                                {/* Stats/Tag Pills */}
                                <div className="flex flex-wrap gap-2 mb-8">
                                    <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-gray-400">99.8% Compatibility</span>
                                    <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-gray-400">Cinematic</span>
                                    <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-gray-400">Vibey</span>
                                </div>

                                <div className="space-y-3">
                                    <a
                                        href={song.spotify_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full flex items-center justify-between px-6 py-4 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold transition-all hover:shadow-[0_0_20px_rgba(29,185,84,0.3)] hover:-translate-y-1 group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Music size={20} />
                                            <span>Stream on Spotify</span>
                                        </div>
                                        <Disc size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                                    </a>

                                    <a
                                        href={song.youtube_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full flex items-center justify-between px-6 py-4 rounded-xl bg-[#222] border border-white/10 hover:bg-[#333] text-white font-bold transition-all hover:border-red-500/50 group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Youtube size={20} className="text-red-500" />
                                            <span>Watch Video</span>
                                        </div>
                                        <ExternalLink size={18} className="text-gray-500 group-hover:text-white" />
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SongModal;
