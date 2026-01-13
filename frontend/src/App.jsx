import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

// Wrapper to allow useNavigate in Navbar onSearch
const AppContent = () => {
  const navigate = useNavigate();

  const handleGlobalSearch = (query) => {
    // Navigate home if searched (simple spa behavior) or just log
    console.log(`[DEBUG] Global search triggered with query: "${query}"`);
    navigate('/');
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white pb-20 selection:bg-[#10b981] selection:text-black font-sans">
      <Navbar onSearch={handleGlobalSearch} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} /> {/* Catch all redirect to home */}
      </Routes>

      <footer className="container mx-auto px-6 md:px-12 lg:px-20  text-gray-600 text-sm border-t border-[#10b981]/10 ">
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <h4 className="text-white font-bold tracking-widest text-xs mb-6">COMPANY</h4>
            <p className="hover:text-[#10b981] cursor-pointer transition duration-300">About Us</p>
            <p className="hover:text-[#10b981] cursor-pointer transition duration-300">Jobs</p>
          </div>
         
        </div> */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#10b981]/5">
          <div className="mb-4 md:mb-0">© 2026 SonicFlix Inc.</div>
        </div>
      </footer>
    </div>
  );
};

import LoadingScreen from './components/LoadingScreen';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <AppContent key="content" />
        )}
      </AnimatePresence>
    </Router>
  );
};

export default App;