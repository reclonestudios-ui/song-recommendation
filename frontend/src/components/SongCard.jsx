import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Play, Music } from 'lucide-react';

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

const SongCard = ({ song, index, onClick }) => {
    const gradient = useMemo(() => getGradient(song.track_name), [song.track_name]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => onClick && onClick(song)}
            className="relative w-[240px] flex-shrink-0 group cursor-pointer"
        >
            {/* Album Art Container (Square) */}
            <div className={`w-full aspect-square rounded-xl overflow-hidden relative shadow-xl bg-gradient-to-br ${gradient} group-hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-shadow duration-500`}>

                {/* Noise Texture Overlay */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

                {/* Generative Art Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-7xl font-black text-white/20 select-none font-display mix-blend-overlay">
                        {song.track_name.slice(0, 2).toUpperCase()}
                    </span>
                    <Music size={48} className="absolute text-white/10 rotate-12" />
                </div>

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/10 opacity-60"></div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]"></div>

                {/* Floating Play Button */}
                <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                    <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform">
                        <Play fill="black" size={24} className="ml-1" />
                    </div>
                </div>
            </div>

            {/* Meta Info (Below Card) with cleaner typography */}
            <div className="mt-4 px-1">
                <h3 className="text-white font-bold text-lg truncate group-hover:text-[#10b981] transition-colors duration-300 font-display tracking-wide">
                    {song.track_name}
                </h3>
                <p className="text-gray-400 text-sm font-medium truncate mt-1">
                    {song.track_artist}
                </p>
            </div>
        </motion.div>
    );
};

export default SongCard;
