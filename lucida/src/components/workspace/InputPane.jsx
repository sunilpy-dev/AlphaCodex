import React from 'react';
import GlassPanel from '../ui/GlassPanel';
import { useLucidaStore } from '../../store/useLucidaStore';
import { Type } from 'lucide-react';

const InputPane = () => {
  const { rawText, setRawText } = useLucidaStore();

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    setRawText(text);
  };

  const handleChange = (e) => {
    setRawText(e.target.value);
  };

  return (
    <GlassPanel className="h-full flex flex-col p-6 overflow-hidden" intensity="medium">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-500/20 rounded-lg">
          <Type size={18} className="text-purple-400" />
        </div>
        <h2 className="text-lg font-bold text-white/90">Source Text</h2>
      </div>
      
      <textarea
        className="flex-1 bg-transparent border-none resize-none text-white/70 focus:outline-none font-sans text-sm leading-relaxed custom-scrollbar"
        placeholder="Paste or type your text here... (formatting will be stripped automatically)"
        value={rawText}
        onChange={handleChange}
        onPaste={handlePaste}
      />
      
      <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-tighter text-white/30 font-semibold border-top border-white/5 pt-4">
        <span>{rawText.length} characters</span>
        <span>{rawText.split(/\s+/).filter(Boolean).length} words</span>
      </div>
    </GlassPanel>
  );
};

export default InputPane;
