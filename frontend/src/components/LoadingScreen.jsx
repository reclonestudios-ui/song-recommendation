import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [text, setText] = useState("INITIALIZING");

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 500); // Small delay after 100%
                    return 100;
                }
                // Random increments for "hacking" feel
                return prev + Math.floor(Math.random() * 10) + 1;
            });
        }, 150);

        // Text cycle
        const textTimers = [
            setTimeout(() => setText("CONNECTING TO NEURAL NET"), 800),
            setTimeout(() => setText("ANALYZING AUDIO WAVES"), 1600),
            setTimeout(() => setText("SYSTEM ONLINE"), 2400),
        ];

        return () => {
            clearInterval(timer);
            textTimers.forEach(t => clearTimeout(t));
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center text-[#10b981]"
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            {/* Glitch Logo Effect */}
            <div className="relative mb-12">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-4xl md:text-6xl font-display font-bold tracking-widest text-white relative z-10"
                >
                    SONIC ODYSSEY
                </motion.h1>
                <div className="absolute inset-0 text-4xl md:text-6xl font-display font-bold tracking-widest text-[#10b981] opacity-50 blur-[2px] animate-pulse">
                    SONIC ODYSSEY
                </div>
            </div>

            {/* Progress Bar Container */}
            <div className="w-64 md:w-96 h-1 bg-gray-900 rounded-full overflow-hidden relative">
                <motion.div
                    className="h-full bg-[#10b981] shadow-[0_0_15px_#10b981]"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ ease: "linear" }}
                />
            </div>

            {/* Terminal Text */}
            <div className="mt-4 font-mono text-xs md:text-sm tracking-wider flex justify-between w-64 md:w-96 text-[#10b981]/80">
                <span>{text}...</span>
                <span>{Math.min(progress, 100)}%</span>
            </div>

            {/* Background Noise/Grid overlay for style */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </motion.div>
    );
};

export default LoadingScreen;
