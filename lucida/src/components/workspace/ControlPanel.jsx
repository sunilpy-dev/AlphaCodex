import React from 'react';
import GlassPanel from '../ui/GlassPanel';
import Slider from '../ui/Slider';
import { useLucidaStore } from '../../store/useLucidaStore';
import WordHighlighter from './WordHighlighter';
import { Settings, MousePointer2 } from 'lucide-react';

const ControlPanel = () => {
  const { settings, updateSetting } = useLucidaStore();

  const fontOptions = [
    { name: 'Inter', value: 'Inter' },
    { name: 'OpenDyslexic', value: 'OpenDyslexic' },
    { name: 'Serif', value: 'Georgia' },
    { name: 'Mono', value: 'monospace' },
  ];

  const tintOptions = [
    { name: 'Midnight', color: '#05060f' },
    { name: 'Sepia', color: '#1a1814' },
    { name: 'Deep Sea', color: '#050a14' },
    { name: 'Graphite', color: '#0d0d0d' },
  ];

  return (
    <GlassPanel 
      className="w-80 flex flex-col p-6 overflow-y-auto custom-scrollbar shadow-[0_0_50px_rgba(0,0,0,0.5)] border-white/10" 
      intensity="strong"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-indigo-500/20 rounded-lg">
          <Settings size={18} className="text-indigo-400" />
        </div>
        <h2 className="text-lg font-bold text-white/90">Controls</h2>
      </div>

      <div className="space-y-8 flex-1">
        {/* Playback Controls */}
        <div className="flex flex-col items-center gap-4 pb-8 border-b border-white/5">
          <WordHighlighter />
          <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest flex items-center gap-1">
            <MousePointer2 size={10} /> Click words to focus
          </span>
        </div>

        {/* Typography Sliders */}
        <Slider 
          id="font-size"
          label="Font Size" 
          min={12} max={48} 
          value={settings.fontSize} 
          unit="px"
          onChange={(v) => updateSetting('fontSize', v)} 
        />
        
        <Slider 
          id="letter-spacing"
          label="Letter Spacing" 
          min={-2} max={10} 
          value={settings.letterSpacing} 
          unit="px"
          onChange={(v) => updateSetting('letterSpacing', v)} 
        />

        <Slider 
          id="word-spacing"
          label="Word Spacing" 
          min={0} max={40} 
          value={settings.wordSpacing} 
          unit="px"
          onChange={(v) => updateSetting('wordSpacing', v)} 
        />

        <Slider 
          id="line-height"
          label="Line Height" 
          min={1} max={3} step={0.1}
          value={settings.lineHeight} 
          unit="x"
          onChange={(v) => updateSetting('lineHeight', v)} 
        />

        <Slider 
          id="paragraph-spacing"
          label="Paragraph Spacing" 
          min={0} max={100} 
          value={settings.paragraphSpacing} 
          unit="px"
          onChange={(v) => updateSetting('paragraphSpacing', v)} 
        />

        {/* Font Selector */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-white/60 uppercase tracking-widest">Typeface</label>
          <div className="grid grid-cols-2 gap-2">
            {fontOptions.map((f) => (
              <button
                key={f.value}
                onClick={() => updateSetting('fontFamily', f.value)}
                className={`
                  px-3 py-2 rounded-lg text-xs font-medium border transition-all
                  ${settings.fontFamily === f.value 
                    ? 'bg-purple-500/20 border-purple-500/50 text-white' 
                    : 'bg-white/5 border-white/5 text-white/50 hover:bg-white/10'}
                `}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>

        {/* Background Selector */}
        <div className="space-y-3 pt-4 border-t border-white/5">
          <label className="text-xs font-semibold text-white/60 uppercase tracking-widest">Background Tint</label>
          <div className="flex gap-3">
            {tintOptions.map((t) => (
              <button
                key={t.color}
                onClick={() => updateSetting('backgroundColor', t.color)}
                style={{ backgroundColor: t.color }}
                title={t.name}
                className={`
                  w-8 h-8 rounded-full border-2 transition-all
                  ${settings.backgroundColor === t.color 
                    ? 'border-purple-500 scale-125' 
                    : 'border-white/20 hover:scale-110'}
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </GlassPanel>
  );
};

export default ControlPanel;
