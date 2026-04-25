import React, { useEffect, useRef } from 'react';
import { useLucidaStore } from '../../store/useLucidaStore';
import { Play, Pause, RotateCcw, FastForward } from 'lucide-react';
import Button from '../ui/Button';

const WordHighlighter = () => {
  const { highlight, setHighlight, nextWord, resetHighlight } = useLucidaStore();
  const timerRef = useRef(null);

  useEffect(() => {
    if (highlight.isPlaying) {
      timerRef.current = setInterval(() => {
        nextWord();
      }, highlight.speed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [highlight.isPlaying, highlight.speed, nextWord]);

  const togglePlay = () => {
    setHighlight({ isPlaying: !highlight.isPlaying });
  };

  return (
    <div className="flex items-center gap-3">
      <Button 
        variant="secondary" 
        onClick={resetHighlight} 
        className="!p-3" 
        title="Reset"
      >
        <RotateCcw size={18} />
      </Button>

      <Button 
        variant="primary" 
        onClick={togglePlay} 
        className="!p-4 !rounded-full"
      >
        {highlight.isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
      </Button>

      <Button 
        variant="secondary" 
        onClick={nextWord} 
        className="!p-3"
        title="Next Word"
      >
        <FastForward size={18} />
      </Button>
    </div>
  );
};

export default WordHighlighter;
