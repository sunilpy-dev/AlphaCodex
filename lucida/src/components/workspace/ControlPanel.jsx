import React from 'react';
import GlassPanel from '../ui/GlassPanel';
import Slider from '../ui/Slider';
import { useLucidaStore } from '../../store/useLucidaStore';
import WordHighlighter from './WordHighlighter';
import { Settings, MousePointer2, Eye, EyeOff, Maximize, Minimize, Save, Download, Zap } from 'lucide-react';
import Button from '../ui/Button';

const ControlPanel = ({ mini = false }) => {
  const { settings, updateSetting, wpm, savePreset, loadPreset } = useLucidaStore();

  const fontOptions = [
    { name: 'Inter', value: 'Inter' },
    { name: 'OpenDyslexic', value: 'OpenDyslexic' },
    { name: 'Serif', value: 'Georgia' },
    { name: 'Mono', value: 'monospace' },
  ];

  if (mini) {
    return (
      <GlassPanel className="p-3 flex items-center gap-3 shadow-2xl border-purple-500/30" intensity="strong">
        <Button 
          variant="secondary" 
          className="!p-2" 
          onClick={() => updateSetting('isImmersive', false)}
          aria-label="Exit Immersion Mode"
        >
          <Minimize size={18} />
        </Button>
        <div className="h-4 w-[1px] bg-white/10" />
        <WordHighlighter mini />
      </GlassPanel>
    );
  }

  return (
    <GlassPanel 
      className="w-80 h-full flex flex-col p-6 overflow-y-auto custom-scrollbar shadow-[0_0_50px_rgba(0,0,0,0.5)] border-white/10" 
      intensity="strong"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <Settings size={18} className="text-indigo-400" />
          </div>
          <h2 className="text-lg font-bold text-white/90">Controls</h2>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 bg-purple-500/10 rounded-lg border border-purple-500/20">
          <Zap size={14} className="text-purple-400" />
          <span className="text-xs font-bold text-purple-400">{wpm} <span className="text-[10px] opacity-60">WPM</span></span>
        </div>
      </div>

      <div className="space-y-8 flex-1">
        {/* Playback Controls */}
        <div className="flex flex-col items-center gap-4 pb-8 border-b border-white/5">
          <WordHighlighter />
          <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest flex items-center gap-1">
            <MousePointer2 size={10} /> Click words to focus
          </span>
        </div>

        {/* Intelligence Features */}
        <div className="grid grid-cols-2 gap-3 pb-8 border-b border-white/5">
          <button
            onClick={() => updateSetting('isImmersive', !settings.isImmersive)}
            aria-label={settings.isImmersive ? "Exit Immersion Mode" : "Enter Immersion Mode"}
            className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all ${settings.isImmersive ? 'bg-purple-500/20 border-purple-500/50 text-white' : 'bg-white/5 border-white/5 text-white/50 hover:bg-white/10'}`}
          >
            {settings.isImmersive ? <Minimize size={16} /> : <Maximize size={16} />}
            Immersion
          </button>
          <button
            onClick={() => updateSetting('focusLineMode', !settings.focusLineMode)}
            aria-label={settings.focusLineMode ? "Disable Focus Mode" : "Enable Focus Mode"}
            className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all ${settings.focusLineMode ? 'bg-purple-500/20 border-purple-500/50 text-white' : 'bg-white/5 border-white/5 text-white/50 hover:bg-white/10'}`}
          >
            {settings.focusLineMode ? <Eye size={16} /> : <EyeOff size={16} />}
            Focus
          </button>
          <button
            onClick={() => updateSetting('showRuler', !settings.showRuler)}
            aria-label={settings.showRuler ? "Hide Reading Ruler" : "Show Reading Ruler"}
            className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all col-span-2 ${settings.showRuler ? 'bg-purple-500/20 border-purple-500/50 text-white' : 'bg-white/5 border-white/5 text-white/50 hover:bg-white/10'}`}
          >
            Reading Ruler
          </button>
        </div>

        {/* Typography Sliders */}
        <div className="space-y-6">
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
            id="paragraph-spacing"
            label="Para Spacing" 
            min={0} max={100} 
            value={settings.paragraphSpacing} 
            unit="px"
            onChange={(v) => updateSetting('paragraphSpacing', v)} 
          />
        </div>

        {/* Font Selector */}
        <div className="space-y-3 pt-6 border-t border-white/5">
          <label className="text-xs font-semibold text-white/60 uppercase tracking-widest">Typeface</label>
          <div className="grid grid-cols-2 gap-2">
            {fontOptions.map((f) => (
              <button
                key={f.value}
                aria-label={`Select ${f.name} font`}
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

        {/* Preset System */}
        <div className="grid grid-cols-2 gap-3 pt-6 border-t border-white/5">
          <Button variant="secondary" onClick={savePreset} className="!text-[10px] !py-2 !px-0" aria-label="Save current settings">
            <Save size={14} /> Save Preset
          </Button>
          <Button variant="secondary" onClick={loadPreset} className="!text-[10px] !py-2 !px-0" aria-label="Load saved settings">
            <Download size={14} /> Load Preset
          </Button>
        </div>
      </div>
    </GlassPanel>
  );
};

export default ControlPanel;
