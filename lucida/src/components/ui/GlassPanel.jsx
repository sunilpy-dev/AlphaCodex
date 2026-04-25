import React from 'react';

const GlassPanel = ({ children, className = '', intensity = 'medium', ...props }) => {
  const intensities = {
    low: 'bg-white/5 border-white/5 backdrop-blur-lg',
    medium: 'bg-white/10 border-white/10 backdrop-blur-xl',
    strong: 'bg-white/15 border-white/15 backdrop-blur-2xl',
  };

  return (
    <div
      className={`rounded-3xl border shadow-2xl transition-all duration-300 ${intensities[intensity]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassPanel;
