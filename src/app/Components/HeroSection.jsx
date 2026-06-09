"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LetterReveal } from './TextReveal';
import MagneticButton from './MagneticButton';
import Counter from './Counter';
import { blurUp, fadeUp, fadeIn, stagger } from '../lib/animations';

const STATS = [
  { value: 2, suffix: '+', label: 'years in production' },
  { value: 12, suffix: '+', label: 'projects shipped' },
  { value: 35, suffix: '+', label: 'technologies explored' },
];

const HeroSection = () => {
  const sectionRef = useRef(null);

  // Parallax: the portrait scrolls slower than the copy, the glow slower still.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-x-clip pt-28 pb-20 scroll-mt-24"
    >
      {/* Drifting backdrop glow */}
      <motion.div className="absolute inset-x-0 top-10 -z-10" style={{ y: glowY }}>
        <div className="mx-auto h-72 w-[80%] max-w-5xl rounded-full bg-gradient-to-r from-accent-primary/10 via-transparent to-accent-primary/10 blur-3xl" />
      </motion.div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <motion.div
          className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12"
          initial="hidden"
          animate="visible"
          variants={stagger(0.14, 0.2)}
        >
          {/* Story copy */}
          <div className="space-y-7 lg:col-span-7">
            {/* Opening line */}
            <motion.div
              variants={fadeIn}
              className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-text-tertiary"
            >
              <span className="h-px w-10 bg-accent-primary/60" />
              <span>
                Prologue <span className="text-accent-primary">//</span> every system tells a story
              </span>
            </motion.div>

            {/* Name */}
            <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-text-primary sm:text-6xl lg:text-7xl xl:text-8xl">
              <LetterReveal text="Mohan Amritesh" delay={0.35} />
              <br />
              <LetterReveal text="Dasari" delay={0.85} />
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, type: 'spring', stiffness: 260, damping: 14 }}
                className="inline-block text-accent-primary"
              >
                .
              </motion.span>
            </h1>

            {/* Rotating roles */}
            <motion.div variants={fadeUp} className="font-mono text-sm sm:text-base">
              <span className="text-text-tertiary">$ whoami </span>
              <TypeAnimation
                sequence={[
                  'Distributed Systems Developer',
                  2200,
                  'Agentic AI Engineer',
                  2200,
                  'Backend Software Engineer',
                  2200,
                  'Cloud Solutions Architect',
                  2200,
                ]}
                wrapper="span"
                speed={40}
                repeat={Infinity}
                className="font-semibold uppercase tracking-[0.2em] text-accent-primary"
              />
            </motion.div>

            {/* The hook */}
            <motion.p
              variants={blurUp}
              className="max-w-2xl font-display text-xl italic leading-relaxed text-text-secondary sm:text-2xl"
            >
              &ldquo;Ingesting new knowledge and leveling up — one message at a time from the
              Kafka queue of experience.&rdquo;
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="max-w-2xl text-base leading-relaxed text-text-tertiary sm:text-lg"
            >
              Software engineer focused on backend, data, and platform layers. I build reliable
              services, tighten feedback loops with automation, and keep latency predictable at
              scale.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 pt-1">
              <MagneticButton>
                <Link
                  href="mailto:dmamritesh@gmail.com"
                  className="inline-block rounded-lg bg-accent-primary px-6 py-3 text-base font-semibold text-background-primary shadow-[0_10px_30px_-12px_rgba(245,158,11,0.45)] transition-colors duration-300 hover:bg-accent-secondary"
                >
                  Begin the Conversation
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  href="https://drive.google.com/file/d/1SrO4j8d-Np81Mh2x0hQdJNxvgmtxce3V/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-lg border border-border-default px-6 py-3 text-base font-semibold text-text-primary transition-all duration-300 hover:border-border-hover hover:bg-background-hover"
                >
                  Read the Résumé
                </Link>
              </MagneticButton>
            </motion.div>

            {/* The story so far, in numbers */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-3 gap-4 border-t border-border-subtle pt-6 sm:max-w-xl"
            >
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl font-semibold text-text-primary sm:text-4xl">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.div
            className="flex justify-center lg:col-span-5 lg:justify-end"
            style={{ y: portraitY }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="group relative">
              {/* Glow */}
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-accent-primary/25 via-accent-primary/5 to-transparent blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

              {/* Corner brackets */}
              <span className="absolute -top-3 -left-3 h-8 w-8 border-t-2 border-l-2 border-accent-primary/70 transition-all duration-500 group-hover:-top-4 group-hover:-left-4" />
              <span className="absolute -bottom-3 -right-3 h-8 w-8 border-b-2 border-r-2 border-accent-primary/70 transition-all duration-500 group-hover:-bottom-4 group-hover:-right-4" />

              <div className="relative h-[280px] w-[280px] overflow-hidden rounded-2xl border border-border-subtle lg:h-[360px] lg:w-[360px]">
                <Image
                  src="/images/Amritesh.jpeg"
                  alt="Amritesh Dasari"
                  fill
                  className="object-cover grayscale-[35%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  priority
                />
              </div>

              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ x: '-50%' }}
                transition={{ delay: 1.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-5 left-1/2 flex w-max max-w-[calc(100vw-3rem)] items-center gap-2 rounded-full border border-border-subtle bg-background-secondary/90 px-4 py-2 backdrop-blur-sm"
              >
                <span className="h-2 w-2 shrink-0 animate-pulse-dot rounded-full bg-accent-primary" />
                <span className="truncate whitespace-nowrap font-mono text-[10px] text-text-secondary sm:text-xs">
                  Currently · SDE @ Princeton IT Services
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        style={{ opacity: cueOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-tertiary">
            Scroll to begin
          </span>
          <span className="block h-10 w-px overflow-hidden bg-border-subtle">
            <span className="block h-full w-full animate-scroll-line bg-accent-primary" />
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
