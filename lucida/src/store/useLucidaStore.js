import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { tokenize } from '../utils/tokenizer';

export const useLucidaStore = create(
  persist(
    (set, get) => ({
      // Text State
      rawText: '',
      tokenizedParagraphs: [],
      
      // Typography Settings
      settings: {
        letterSpacing: 0,
        wordSpacing: 0,
        lineHeight: 1.6,
        paragraphSpacing: 28,
        fontSize: 20,
        fontFamily: 'Inter',
        backgroundColor: '#05060f',
        isImmersive: false,
        focusLineMode: false,
        showRuler: false,
      },

      // Analytics
      wpm: 0,
      wordsTraversed: 0,
      startTime: null,

      // Highlight State
      highlight: {
        paragraphIndex: 0,
        wordIndex: -1,
        isPlaying: false,
        speed: 1500,
      },

      // Actions
      setRawText: (text) => {
        const paragraphs = tokenize(text);
        set({ rawText: text, tokenizedParagraphs: paragraphs });
      },

      updateSetting: (key, value) => {
        set((state) => ({
          settings: { ...state.settings, [key]: value }
        }));
      },

      setHighlight: (updates) => {
        set((state) => ({
          highlight: { ...state.highlight, ...updates }
        }));
        
        // Track progress for WPM
        if (updates.wordIndex !== undefined || updates.paragraphIndex !== undefined) {
          set((state) => ({ wordsTraversed: state.wordsTraversed + 1 }));
        }
      },

      startPlayback: () => {
        set((state) => ({
          highlight: { ...state.highlight, isPlaying: true },
          startTime: Date.now(),
          wordsTraversed: 0
        }));
      },

      stopPlayback: () => {
        const { startTime, wordsTraversed } = get();
        if (startTime) {
          const elapsedMinutes = (Date.now() - startTime) / 60000;
          const currentWpm = Math.round(wordsTraversed / elapsedMinutes) || 0;
          set({ wpm: currentWpm });
        }
        set((state) => ({
          highlight: { ...state.highlight, isPlaying: false },
          startTime: null
        }));
      },

      nextWord: () => {
        const { paragraphIndex, wordIndex } = get().highlight;
        const { tokenizedParagraphs } = get();
        
        if (tokenizedParagraphs.length === 0) return;

        const currentPara = tokenizedParagraphs[paragraphIndex];
        
        if (wordIndex < currentPara.length - 1) {
          get().setHighlight({ wordIndex: wordIndex + 1 });
        } else if (paragraphIndex < tokenizedParagraphs.length - 1) {
          get().setHighlight({ paragraphIndex: paragraphIndex + 1, wordIndex: 0 });
        } else {
          get().stopPlayback();
          set((state) => ({
            highlight: { ...state.highlight, wordIndex: -1, paragraphIndex: 0 }
          }));
        }
      },

      resetHighlight: () => {
        set((state) => ({
          highlight: { ...state.highlight, wordIndex: -1, paragraphIndex: 0, isPlaying: false },
          wpm: 0,
          wordsTraversed: 0
        }));
      },

      // Presets
      savePreset: () => {
        const { settings } = get();
        localStorage.setItem('lucida-preset-v1', JSON.stringify(settings));
      },

      loadPreset: () => {
        const saved = localStorage.getItem('lucida-preset-v1');
        if (saved) {
          set({ settings: JSON.parse(saved) });
        }
      }
    }),
    {
      name: 'lucida-workspace-storage',
      partialize: (state) => ({ settings: state.settings }),
    }
  )
);
