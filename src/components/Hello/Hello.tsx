'use client';

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from 'framer-motion';

const greetings = [
  { text: 'مرحبا', language: 'Arabic' },
  { text: 'Hello', language: 'English' },
  { text: 'नमस्ते', language: 'Hindi' },
  { text: 'Ciao', language: 'Italian' },
  { text: '你好', language: 'Chinese' },
  { text: 'Bonjour', language: 'French' },
  { text: 'Hola', language: 'Spanish' },
  { text: '안녕하세요', language: 'Korean' },
  { text: 'Hallo', language: 'German' },
];
type HelloProps = {
  onEnd?: () => void;
};

const Hello: React.FC<HelloProps> = ({ onEnd }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
// now (onEnd) not use but dont remove it
  const handleEnd = useCallback(() => {
    if (onEnd) onEnd();
  }, [onEnd]);

  useEffect(() => {
    if (currentIndex < greetings.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, getDuration(currentIndex));

      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
      setTimeout(() => {
        handleEnd();
      }, 1510);
    }
  }, [currentIndex , handleEnd]);

  const getDuration = (index: number): number => {
    if (index < greetings.length - 1 && index !== 0) {
      return 200;
    } else {
      return 1000;
    }
  };

  return (
    
    <AnimatePresence>
      {!isComplete && (
        <motion.div
        className="fixed inset-0 bg-gradient-to-b from-[var(--gradient-from)] to-[var(--gradient-to)] text-[var(--text-color)] z-[9999999999999]"      
          initial={{ y: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
          exit={{
            y: [0, '-25%', '-100%'],
            borderRadius: ['0px', '0px', '50%'],
            transition: {
              duration: 1.5,
              ease: 'easeInOut',
              times: [0, 0.5, 1], 
            }}}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <div className="flex h-screen items-center justify-center ">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-6xl"
              style={{
                fontFamily: greetings[currentIndex]?.language === "Arabic" ? "Cairo, sans-serif" : undefined,
              }}
            >
              {greetings[currentIndex]?.text || ''}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Hello;