import React, { useState } from 'react';
import { Search, Bell, User } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Navbar = ({ onSearch }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [query, setQuery] = useState('');
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <motion.nav
            className={`fixed top-0 w-full z-50 transition-colors duration-500 ${isScrolled ? 'bg-[#050505]/95 backdrop-blur-sm border-b border-[#10b981]/10' : 'bg-transparent'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="px-4 md:px-12 py-4 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <h1 className="text-3xl font-bold font-display tracking-widest cursor-pointer select-none" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <span className="text-white">SONIC</span>
                        <span className="text-[#10b981]">FLIX</span>
                    </h1>
                </div>

                <div className="flex items-center gap-6 text-white">
                    <Bell className="cursor-pointer hover:text-[#10b981] transition duration-300" size={20} />
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#10b981] to-black border border-[#10b981]/50 flex items-center justify-center cursor-pointer hover:shadow-[0_0_10px_rgba(16,185,129,0.4)] transition">
                        <User size={16} />
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
