"use client";
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { usePathname } from 'next/navigation';

const CHAPTERS = [
  { id: 'home', num: '00', label: 'Prologue' },
  { id: 'about', num: '01', label: 'Origins' },
  { id: 'skills', num: '02', label: 'The Toolkit' },
  { id: 'journey', num: '03', label: 'The Journey' },
  { id: 'projects', num: '04', label: 'The Work' },
  { id: 'contact', num: '05', label: 'Epilogue' },
];

// Reading progress bar along the top + a chapter rail down the right edge.
const StoryRail = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [active, setActive] = useState('home');

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.4 });

  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-42% 0px -52% 0px' }
    );
    CHAPTERS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Reading progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent-secondary via-accent-primary to-accent-primary"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      {/* Chapter rail */}
      {isHome && (
        <motion.nav
          className="fixed right-5 top-1/2 z-40 hidden lg:block"
          style={{ y: '-50%' }}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Chapters"
        >
          <ul className="flex flex-col items-end gap-5">
            {CHAPTERS.map(({ id, num, label }) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="group flex items-center gap-3"
                    aria-label={`${label} — chapter ${num}`}
                  >
                    <span
                      className={`font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                        isActive
                          ? 'text-accent-primary opacity-100'
                          : 'text-text-tertiary opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      {num} · {label}
                    </span>
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        isActive
                          ? 'h-2.5 w-2.5 bg-accent-primary shadow-[0_0_12px_rgba(245,158,11,0.8)]'
                          : 'h-1.5 w-1.5 bg-text-tertiary/50 group-hover:bg-text-secondary'
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </motion.nav>
      )}
    </>
  );
};

export default StoryRail;
