import React, { useEffect, useRef } from 'react';
import { useLucidaStore } from '../../store/useLucidaStore';
import { rafScheduler } from '../../utils/rafScheduler';

const ReadingPane = () => {
  const containerRef = useRef(null);
  const activeWordRef = useRef(null);
  const { tokenizedParagraphs, settings, highlight, setHighlight } = useLucidaStore();

  // Sync settings to CSS variables
  useEffect(() => {
    if (!containerRef.current) return;

    rafScheduler.schedule('update-typography', () => {
      const el = containerRef.current;
      el.style.setProperty('--letter-spacing', `${settings.letterSpacing}px`);
      el.style.setProperty('--word-spacing', `${settings.wordSpacing}px`);
      el.style.setProperty('--line-height', settings.lineHeight);
      el.style.setProperty('--paragraph-spacing', `${settings.paragraphSpacing}px`);
      el.style.setProperty('--font-size', `${settings.fontSize}px`);
      el.style.setProperty('--font-family', settings.fontFamily === 'OpenDyslexic' ? '"OpenDyslexic", sans-serif' : 'Inter, sans-serif');
      el.style.backgroundColor = settings.backgroundColor;
    });
  }, [settings]);

  // Auto-scroll follow
  useEffect(() => {
    if (activeWordRef.current && highlight.isPlaying) {
      activeWordRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [highlight.wordIndex, highlight.paragraphIndex, highlight.isPlaying]);

  const handleWordClick = (paraIdx, wordIdx) => {
    setHighlight({ paragraphIndex: paraIdx, wordIndex: wordIdx, isPlaying: false });
  };

  return (
    <div 
      className="h-full w-full overflow-y-auto custom-scrollbar flex flex-col items-center py-32 px-8 transition-colors duration-500 relative"
      style={{ backgroundColor: settings.backgroundColor }}
    >
      <div
        ref={containerRef}
        className="max-w-3xl w-full reading-content"
        style={{
          letterSpacing: 'var(--letter-spacing)',
          lineHeight: 'var(--line-height)',
          fontFamily: 'var(--font-family)',
          fontSize: 'var(--font-size)',
        }}
      >
        {tokenizedParagraphs.length === 0 ? (
          <div className="text-white/20 text-center italic mt-20 font-sans">
            Empty workspace. Add some text to start reading.
          </div>
        ) : (
          <div className="flex flex-col">
            {tokenizedParagraphs.map((para, pIdx) => {
              const isActivePara = pIdx === highlight.paragraphIndex;
              const isFocusMode = settings.focusLineMode;
              
              return (
                <div 
                  key={pIdx} 
                  className={`flex flex-wrap items-baseline transition-opacity duration-300 ${isFocusMode && !isActivePara ? 'opacity-40' : 'opacity-100'}`}
                  style={{ marginBottom: 'var(--paragraph-spacing)' }}
                >
                  {para.map((word, wIdx) => {
                    const isSpace = /^\s+$/.test(word);
                    const isHighlighted = isActivePara && wIdx === highlight.wordIndex;
                    
                    if (isSpace) {
                      return (
                        <span 
                          key={wIdx} 
                          style={{ width: 'var(--word-spacing)', display: 'inline-block' }}
                        >
                          &nbsp;
                        </span>
                      );
                    }

                    return (
                      <span
                        key={wIdx}
                        ref={isHighlighted ? activeWordRef : null}
                        onClick={() => handleWordClick(pIdx, wIdx)}
                        className={`
                          cursor-pointer transition-all duration-150 rounded-sm inline-block
                          ${isHighlighted 
                            ? 'bg-purple-500/20 text-white scale-[1.02] px-1 border-b-2 border-purple-500/50 z-10' 
                            : 'text-white/80 hover:text-white'}
                        `}
                      >
                        {word}
                      </span>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadingPane;
