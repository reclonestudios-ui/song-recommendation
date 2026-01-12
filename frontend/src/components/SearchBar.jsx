import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { Search, Music } from 'lucide-react';

const SearchBar = ({ onSearch, isLoading }) => {
    const inputRef = useRef(null);
    const containerRef = useRef(null);
    const [query, setQuery] = useState('');

    const handleFocus = () => {
        gsap.to(containerRef.current, {
            borderColor: '#00f0ff',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)',
            duration: 0.3
        });
    };

    const handleBlur = () => {
        gsap.to(containerRef.current, {
            borderColor: 'rgba(255, 255, 255, 0.1)',
            boxShadow: 'none',
            duration: 0.3
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mt-20 relative z-10 px-4">
            <div
                ref={containerRef}
                className="flex items-center bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-2 transition-all"
            >
                <div className="p-3 text-cyan-400">
                    {isLoading ? (
                        <div className="animate-spin w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full"></div>
                    ) : (
                        <Search size={24} />
                    )}
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Enter a song name..."
                    className="flex-1 bg-transparent text-white text-lg placeholder-gray-500 focus:outline-none px-2 font-medium"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-6 rounded-xl transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Music size={18} />
                    <span>Discover</span>
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
