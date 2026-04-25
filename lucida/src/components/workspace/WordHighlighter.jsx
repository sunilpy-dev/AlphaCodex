import React, { useEffect, useRef } from 'react';
import { useLucidaStore } from '../../store/useLucidaStore';
import { Play, Pause, RotateCcw, FastForward } from 'lucide-react';
import Button from '../ui/Button';

const WordHighlighter = ({ mini = false }) => {
  const { highlight, startPlayback, stopPlayback, nextWord, resetHighlight } = useLucidaStore();
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
    if (highlight.isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  };

  return (
    <div className={`flex items-center ${mini ? 'gap-2' : 'gap-3'}`}>
      {!mini && (
        <Button 
          variant="secondary" 
          onClick={resetHighlight} 
          className="!p-3" 
          title="Reset"
          aria-label="Reset Reading Progress"
        >
          <RotateCcw size={18} />
        </Button>
      )}

      <Button 
        variant="primary" 
        onClick={togglePlay} 
        className={`${mini ? '!p-2.5' : '!p-4'} !rounded-full`}
        aria-label={highlight.isPlaying ? "Pause Auto-Reading" : "Start Auto-Reading"}
      >
        {highlight.isPlaying ? <Pause size={mini ? 18 : 24} /> : <Play size={mini ? 18 : 24} className={mini ? "ml-0.5" : "ml-1"} />}
      </Button>

      {!mini && (
        <Button 
          variant="secondary" 
          onClick={nextWord} 
          className="!p-3"
          title="Next Word"
          aria-label="Skip to Next Word"
        >
          <FastForward size={18} />
        </Button>
      )}
    </div>
  );
};

export default WordHighlighter;
