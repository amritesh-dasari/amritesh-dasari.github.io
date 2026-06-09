"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { maskUp, letterMaskUp, stagger } from '../lib/animations';

// Letter-by-letter masked reveal. Letters rise out of an invisible "ink line"
// — words stay intact so nothing wraps mid-word.
export const LetterReveal = ({ text, className = '', delay = 0, inView = false }) => {
  const words = text.split(' ');
  const animationProps = inView
    ? { whileInView: 'visible', viewport: { once: true, amount: 0.6 } }
    : { animate: 'visible' };

  return (
    <motion.span
      className={className}
      initial="hidden"
      variants={stagger(0.035, delay)}
      {...animationProps}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <React.Fragment key={`${word}-${wi}`}>
          <span
            className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]"
            aria-hidden="true"
          >
            {word.split('').map((letter, li) => (
              <motion.span
                key={li}
                variants={letterMaskUp}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </span>
          {wi < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </motion.span>
  );
};

// Word-by-word masked reveal for headings and pull-quotes.
export const WordReveal = ({ text, className = '', delay = 0, amount = 0.5 }) => {
  const words = text.split(' ');

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={stagger(0.06, delay)}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <React.Fragment key={`${word}-${wi}`}>
          <span
            className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]"
            aria-hidden="true"
          >
            <motion.span variants={maskUp} className="inline-block">
              {word}
            </motion.span>
          </span>
          {wi < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </motion.span>
  );
};
