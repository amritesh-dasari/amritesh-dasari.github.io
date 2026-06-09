"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { WordReveal } from './TextReveal';
import { fadeUp, lineScaleX, stagger, VIEWPORT } from '../lib/animations';

// Editorial chapter opener: a huge parallax ghost numeral behind a mono
// kicker line and a serif title that reveals word by word.
const ChapterHeading = ({ number, kicker, title, lead }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const ghostY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <div ref={ref} className="relative mb-12 lg:mb-16">
      {/* Ghost numeral */}
      <motion.span
        className="text-ghost pointer-events-none absolute -top-14 -left-3 select-none font-display text-[8rem] font-bold leading-none lg:-top-20 lg:text-[12rem]"
        style={{ y: ghostY }}
        aria-hidden="true"
      >
        {number}
      </motion.span>

      <motion.div
        className="relative"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={stagger(0.12)}
      >
        {/* Kicker */}
        <motion.div
          variants={fadeUp}
          className="mb-4 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em]"
        >
          <span className="text-accent-primary">Chapter {number}</span>
          <motion.span
            variants={lineScaleX}
            className="h-px w-16 bg-gradient-to-r from-accent-primary/60 to-transparent"
          />
          <span className="text-text-tertiary">{kicker}</span>
        </motion.div>

        {/* Title */}
        <h2 className="font-display text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
          <WordReveal text={title} />
        </h2>

        {lead && (
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary"
          >
            {lead}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default ChapterHeading;
