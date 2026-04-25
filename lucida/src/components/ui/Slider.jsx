import React from 'react';

const Slider = ({ label, value, min, max, step = 1, onChange, unit = '', id }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center px-1">
        <label htmlFor={id} className="text-xs font-semibold text-white/60 uppercase tracking-widest">
          {label}
        </label>
        <span className="text-xs font-mono text-purple-400">
          {value}{unit}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/50"
      />
    </div>
  );
};

export default Slider;
