import React from 'react';

const Background = () => {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#050505]">
            {/* Cyber Grid / Floor Effect */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    perspective: '1000px',
                    transformStyle: 'preserve-3d',
                }}
            >
                <div
                    className="absolute inset-[-100%] w-[300%] h-[300%] bg-[linear-gradient(rgba(16,185,129,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.2)_1px,transparent_1px)] bg-[size:100px_100px]"
                    style={{
                        transform: 'rotateX(60deg)',
                        animation: 'grid-move 20s linear infinite',
                    }}
                ></div>
            </div>

            {/* Aurora / Nebula Blobs */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#10b981]/20 rounded-full blur-[150px] animate-pulse-slow"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-purple-900/40 rounded-full blur-[180px] animate-pulse-slower"></div>

            {/* Floating Particles Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

            <style>{`
                @keyframes grid-move {
                    0% { transform: rotateX(60deg) translateY(0); }
                    100% { transform: rotateX(60deg) translateY(100px); }
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.1); }
                }
                @keyframes pulse-slower {
                    0%, 100% { opacity: 0.2; transform: translate(0, 0); }
                    50% { opacity: 0.5; transform: translate(-20px, 20px); }
                }
                .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
                .animate-pulse-slower { animation: pulse-slower 12s ease-in-out infinite; }
            `}</style>
        </div>
    );
};

export default Background;
