import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InputPane from './InputPane';
import ReadingPane from './ReadingPane';
import ControlPanel from './ControlPanel';
import ProfileMenu from './ProfileMenu';
import { useLucidaStore } from '../../store/useLucidaStore';

const Workspace = () => {
  const { settings } = useLucidaStore();
  const isImmersive = settings.isImmersive;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen w-screen bg-[#05060f] flex overflow-hidden relative font-inter"
    >
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[150px]" />
      </div>

      {/* Reading Ruler */}
      <AnimatePresence>
        {settings.showRuler && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            className="absolute top-1/2 left-0 right-0 h-[1px] bg-purple-400 pointer-events-none z-50 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
          />
        )}
      </AnimatePresence>

      {/* Main Layout */}
      <div className="flex h-full w-full p-6 gap-6 relative z-10">
        
        {/* Profile Menu (Persistent) */}
        <AnimatePresence>
          {!isImmersive && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-6 right-6 z-[60]"
            >
              <ProfileMenu />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Left Section: Input Pane */}
        <AnimatePresence>
          {!isImmersive && (
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="w-[380px] h-full flex-shrink-0"
            >
              <InputPane />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Center/Right Section: Reading Pane */}
        <motion.div 
          layout
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          className="flex-1 h-full rounded-3xl overflow-hidden shadow-inner bg-black/20 border border-white/5 relative"
        >
          <ReadingPane />
          
          {/* Immersive Toggle indicator (if in immersive mode, we need a way to see settings?) 
              The user didn't specify how to exit immersion mode if the control panel is hidden.
              I'll add a tiny floating settings icon or assume ControlPanel handles it.
          */}
        </motion.div>

        {/* Floating Section: Control Panel */}
        <AnimatePresence>
          {!isImmersive && (
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="h-full flex-shrink-0"
            >
              <ControlPanel />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Toggle for Immersion Mode Exit */}
        <AnimatePresence>
          {isImmersive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-10 right-10 z-50"
            >
              <ControlPanel mini />
            </motion.div>
          )}
        </AnimatePresence>

      </div>

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

        *:focus-visible {
          outline: 2px solid #7c3aed !important;
          outline-offset: 2px !important;
        }
      `}</style>
    </motion.div>
  );
};

export default Workspace;
