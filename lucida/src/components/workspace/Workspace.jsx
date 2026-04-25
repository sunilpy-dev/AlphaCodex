import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InputPane from './InputPane';
import ReadingPane from './ReadingPane';
import ControlPanel from './ControlPanel';

const Workspace = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen w-screen bg-[#05060f] flex overflow-hidden relative font-inter"
    >
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[150px]" />
      </div>

      {/* Main Layout */}
      <div className="flex h-full w-full p-6 gap-6 relative z-10">
        
        {/* Left Section: Input Pane */}
        <div className="w-[380px] h-full flex-shrink-0">
          <InputPane />
        </div>

        {/* Center/Right Section: Reading Pane */}
        <div className="flex-1 h-full rounded-3xl overflow-hidden shadow-inner bg-black/20 border border-white/5 relative">
          <ReadingPane />
        </div>

        {/* Floating Section: Control Panel */}
        <div className="h-full flex-shrink-0">
          <ControlPanel />
        </div>

      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        
        @font-face {
          font-family: 'OpenDyslexic';
          src: url('https://cdn.jsdelivr.net/npm/opendyslexic@1.0.3/font/OpenDyslexic-Regular.otf');
        }
      `}</style>
    </motion.div>
  );
};

export default Workspace;
