/**
 * Tokenizes text into an array of paragraphs, where each paragraph 
 * is an array of words and spaces.
 */
export const tokenize = (text) => {
  if (!text) return [];
  
  // Split by double newlines for paragraphs
  const paragraphs = text.split(/\n\s*\n/);
  
  return paragraphs.map(p => {
    // Split each paragraph into words and whitespace
    return p.split(/(\s+)/).filter(token => token.length > 0);
  });
};
