import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Info } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative h-[90vh] w-full text-white overflow-hidden">
            {/* Background Image with Emerald Tint - Parallax effect simulation with scale-105 */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop"
                    alt="Hero Background"
                    className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[rgba(5,5,5,0.2)] to-transparent"></div>
                {/* Cinematic grain overlay could be added here */}
            </div>

            {/* Content - Centered vertically, aligned left with standard container padding */}
            <div className="absolute inset-0 flex items-center z-10 ">
                <div className="container mx-auto px-6 md:px-12 lg:py-20">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <span className="mt-48 text-[#10b981] font-bold tracking-[0.2em] text-xs uppercase border border-[#10b981]/50 px-3 py-1.5 rounded-sm bg-[#10b981]/10 backdrop-blur-sm">
                                Featured Algorithm
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="text-7xl md:text-8xl lg:text-9xl font-bold mb-8 font-display tracking-tight leading-[0.9] text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 drop-shadow-2xl"
                        >
                            Sonic <br /> Odyssey
                        </motion.h1>

                        <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            className="text-lg md:text-2xl text-gray-300 mb-10 max-w-2xl font-light leading-relaxed text-balance"
                        >
                            Experience music tailored to your neural pathways.
                            <span className="text-[#10b981] font-medium ml-2">99.8% Match Accuracy.</span>
                        </motion.p>

                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                className="absolute mt-24 bottom-1 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2 cursor-pointer"
                onClick={() => {
                    const searchSection = document.querySelector('section'); // SearchSection is the next section
                    if (searchSection) searchSection.scrollIntoView({ behavior: 'smooth' });
                }}
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-[#10b981]"></div>
                <span className="text-[10px] tracking-[0.3em] uppercase">Initialize</span>
            </motion.div>
        </div>
    );
};

export default Hero;
