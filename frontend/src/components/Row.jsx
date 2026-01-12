import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SongCard from './SongCard';

const Row = ({ title, results = [], subtitle, onSongClick }) => {
    const rowRef = useRef(null);

    const slide = (direction) => {
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const amount = clientWidth * 0.8; // Slide 80% of width
            const scrollTo = direction === 'left'
                ? scrollLeft - amount
                : scrollLeft + amount;

            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    if (!results.length) return null;

    return (
        <div className="mb-20 relative group/row z-10">
            <div className="container mx-auto px-6 md:px-12 lg:px-20 mb-6 flex items-end justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-white cursor-pointer transition font-display tracking-tight group-hover/text:text-[#10b981]">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-gray-400 text-sm mt-1 font-medium">{subtitle}</p>
                    )}
                </div>
                <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer group/link">
                    <span className="text-xs font-bold text-[#10b981] tracking-widest uppercase group-hover/link:underline transition-all">
                        View All
                    </span>
                    <ChevronRight size={14} className="text-[#10b981]" />
                </div>
            </div>

            <div className="relative group">
                <div
                    className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-40 flex items-center justify-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto pl-4"
                >
                    <button
                        onClick={() => slide('left')}
                        className="w-12 h-12 rounded-full bg-black/50 border border-white/10 backdrop-blur-md flex items-center justify-center hover:bg-[#10b981] hover:text-black hover:border-[#10b981] transition-all duration-300"
                    >
                        <ChevronLeft size={24} />
                    </button>
                </div>

                <div
                    ref={rowRef}
                    className="flex gap-8 overflow-x-scroll no-scrollbar py-4 px-6 md:px-12 lg:px-20 scroll-smooth items-start"
                    style={{ scrollPaddingLeft: '5rem' }} // Better focus alignment when tabbing
                >
                    {results.map((song, i) => (
                        <SongCard key={i} song={song} index={i} onClick={onSongClick} />
                    ))}
                    {/* Spacer at the end */}
                    <div className="w-12 flex-shrink-0"></div>
                </div>

                <div
                    className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-40 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto pr-4"
                >
                    <button
                        onClick={() => slide('right')}
                        className="w-12 h-12 rounded-full bg-black/50 border border-white/10 backdrop-blur-md flex items-center justify-center hover:bg-[#10b981] hover:text-black hover:border-[#10b981] transition-all duration-300"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Row;
