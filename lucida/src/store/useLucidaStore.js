import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { tokenize } from '../utils/tokenizer';

export const useLucidaStore = create(
  persist(
    (set, get) => ({
      // Text State
      rawText: '',
      tokenizedParagraphs: [], // Array of Arrays
      
      // Typography Settings
      settings: {
        letterSpacing: 0, // px
        wordSpacing: 0,   // px
        lineHeight: 1.6,  // multiplier
        paragraphSpacing: 28, // px
        fontSize: 20,     // px
        fontFamily: 'Inter',
        backgroundColor: '#05060f',
      },

      // Highlight State
      highlight: {
        paragraphIndex: 0,
        wordIndex: -1,
        isPlaying: false,
        speed: 1500, // ms
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
      },

      nextWord: () => {
        const { paragraphIndex, wordIndex, isPlaying } = get().highlight;
        const { tokenizedParagraphs } = get();
        
        if (tokenizedParagraphs.length === 0) return;

        const currentPara = tokenizedParagraphs[paragraphIndex];
        
        if (wordIndex < currentPara.length - 1) {
          // Next word in same paragraph
          set((state) => ({
            highlight: { ...state.highlight, wordIndex: state.highlight.wordIndex + 1 }
          }));
        } else if (paragraphIndex < tokenizedParagraphs.length - 1) {
          // Next paragraph
          set((state) => ({
            highlight: { 
              ...state.highlight, 
              paragraphIndex: state.highlight.paragraphIndex + 1, 
              wordIndex: 0 
            }
          }));
        } else {
          // End of text
          set((state) => ({
            highlight: { ...state.highlight, isPlaying: false, wordIndex: -1, paragraphIndex: 0 }
          }));
        }
      },

      resetHighlight: () => {
        set((state) => ({
          highlight: { ...state.highlight, wordIndex: -1, paragraphIndex: 0, isPlaying: false }
        }));
      },
    }),
    {
      name: 'lucida-workspace-storage',
      partialize: (state) => ({ settings: state.settings }),
    }
  )
);
