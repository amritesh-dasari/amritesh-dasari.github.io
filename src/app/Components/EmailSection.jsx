"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { WordReveal } from './TextReveal';
import MagneticButton from './MagneticButton';
import { fadeUp, lineScaleX, popIn, scaleIn, stagger, VIEWPORT } from '../lib/animations';

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/amritesh-dasari',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/amritesh-dasari',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const EmailSection = () => {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-x-clip pt-28 lg:pt-36">
      {/* Ghost watermark */}
      <span
        className="text-ghost pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 select-none font-display text-[22vw] italic leading-none lg:text-[16rem]"
        aria-hidden="true"
      >
        fin
      </span>

      <div className="relative mx-auto w-full max-w-4xl px-6 lg:px-12">
        <motion.div
          className="flex w-full flex-col items-center gap-7 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={stagger(0.14)}
        >
          {/* Kicker */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em]"
          >
            <motion.span
              variants={lineScaleX}
              className="h-px w-12 bg-gradient-to-r from-transparent to-accent-primary/60"
            />
            <span className="text-accent-primary">Epilogue</span>
            <motion.span
              variants={lineScaleX}
              className="h-px w-12 bg-gradient-to-l from-transparent to-accent-primary/60"
            />
          </motion.div>

          {/* Floating memoji */}
          <motion.div variants={scaleIn} className="relative">
            <div className="absolute -inset-5 rounded-full bg-gradient-to-br from-accent-primary/20 via-accent-primary/5 to-transparent blur-2xl" />
            <div className="animate-floaty relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border border-border-subtle bg-background-secondary/50 sm:h-48 sm:w-48 lg:h-56 lg:w-56">
              <Image
                src="/images/Himemoji.png"
                alt="Amritesh waving"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Headline */}
          <h2 className="font-display text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            <WordReveal text="The next chapter is unwritten." />
          </h2>

          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-lg leading-relaxed text-text-secondary"
          >
            Currently open to new opportunities. Whether you have a role in mind, a question, or
            an idea worth building — let&rsquo;s write it together.
          </motion.p>

          {/* Email CTA */}
          <motion.div variants={fadeUp}>
            <MagneticButton>
              <a
                href="mailto:dmamritesh@gmail.com"
                className="inline-flex items-center gap-3 rounded-lg bg-accent-primary px-7 py-3.5 text-base font-semibold text-background-primary shadow-[0_10px_30px_-12px_rgba(245,158,11,0.5)] transition-colors duration-300 hover:bg-accent-secondary"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                dmamritesh@gmail.com
              </a>
            </MagneticButton>
          </motion.div>

          {/* Socials */}
          <motion.div variants={stagger(0.1)} className="flex gap-3">
            {SOCIALS.map((social) => (
              <motion.div key={social.label} variants={popIn}>
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="block rounded-lg border border-border-subtle bg-background-secondary p-3 text-text-secondary transition-all duration-300 hover:-translate-y-1 hover:border-accent-primary/40 hover:text-accent-primary"
                >
                  {social.icon}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-24 border-t border-border-subtle py-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          <div className="flex flex-col items-center justify-between gap-3 font-mono text-xs text-text-tertiary sm:flex-row">
            <span>© {new Date().getFullYear()} Mohan Amritesh Dasari</span>
            <span className="italic">
              — fin<span className="text-accent-primary">.</span> (for now) —
            </span>
            <span>written in Next.js · animated with Framer Motion</span>
          </div>
        </motion.footer>
      </div>
    </section>
  );
};

export default EmailSection;
