import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, className = '', variant = 'primary', ...props }) => {
  const variants = {
    primary: 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)]',
    ghost: 'bg-transparent border border-white/20 text-white/70 hover:text-white hover:bg-white/10',
    secondary: 'bg-white/5 border border-white/10 text-white/90 hover:bg-white/10',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: variant === 'primary' ? '0 0 30px rgba(124,58,237,0.5)' : '' }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
