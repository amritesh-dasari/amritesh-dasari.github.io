"use client";
import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import ChapterHeading from './ChapterHeading';
import { fadeUp, popIn, slideLeft, slideRight, stagger } from '../lib/animations';

const PLOT_POINTS = [
  {
    act: 'Act I',
    tag: 'The Foundation',
    title: 'VIT Amaravati',
    subtitle: 'B.Tech in Computer Science — Networking & Cyber Security',
    meta: '2018 — 2022',
    description:
      'Where the first lines were written: four years of fundamentals, networks, and security — and the discovery that systems are more interesting when they have to survive the real world.',
    stack: ['C++', 'Java', 'Networking', 'Security'],
    url: 'https://vitap.ac.in',
  },
  {
    act: 'Act II',
    tag: 'First Production Push',
    title: 'Blinkit (Grofers)',
    subtitle: 'Software Development Engineering Intern',
    meta: 'Jan 2022 — Jul 2022',
    description:
      'First taste of scale: live order tracking with real-time location plotting, a new message delivery service, and CRON automation for rate-cards and user onboarding.',
    stack: ['Python', 'Kafka', 'Redis', 'Celery'],
    url: 'https://blinkit.com',
  },
  {
    act: 'Act III',
    tag: 'The Deep Dive',
    title: 'University of Illinois, Urbana-Champaign',
    subtitle: 'M.S. in Computer Science — Distributed & Cloud Systems',
    meta: '2022 — 2023',
    description:
      'Graduate school: fault tolerance, failure detectors, versioned file systems — and a 10-node distributed ML cluster built from scratch that survived cascading failures.',
    stack: ['Distributed Systems', 'Cloud', 'PyTorch', 'gRPC'],
    url: 'https://illinois.edu',
  },
  {
    act: 'Act IV',
    tag: 'The Current Chapter',
    title: 'Princeton IT Services',
    subtitle: 'Software Development Engineer',
    meta: 'Feb 2024 — Present',
    description:
      'Shipping for real clients: enterprise Teams chatbots, data extraction pipelines into Snowflake, BI migrations, and DNS security tooling — reliable systems, delivered.',
    stack: ['Azure', 'Python', 'Snowflake', 'Teams AI'],
    url: 'https://princetonits.com',
  },
];

const TimelineCard = ({ point, side }) => (
  <Link
    href={point.url}
    target="_blank"
    rel="noopener noreferrer"
    className={`group block rounded-xl border border-border-subtle bg-background-secondary/70 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-primary/30 hover:shadow-[0_24px_48px_-28px_rgba(245,158,11,0.3)] ${
      side === 'left' ? 'lg:text-right' : ''
    }`}
  >
    <div
      className={`mb-2 flex items-center justify-between gap-3 ${
        side === 'left' ? 'lg:flex-row-reverse' : ''
      }`}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-primary">
        {point.tag}
      </span>
      <span className="whitespace-nowrap font-mono text-[10px] text-text-tertiary">
        {point.meta}
      </span>
    </div>
    <h3 className="font-display text-xl font-semibold text-text-primary transition-colors duration-300 group-hover:text-accent-primary">
      {point.title}
    </h3>
    <p className="mt-1 text-sm text-text-secondary">{point.subtitle}</p>
    <p className="mt-3 text-sm leading-relaxed text-text-tertiary">{point.description}</p>
    <div
      className={`mt-4 flex flex-wrap gap-1.5 ${side === 'left' ? 'lg:justify-end' : ''}`}
    >
      {point.stack.map((tech) => (
        <span
          key={tech}
          className="rounded bg-background-tertiary px-2.5 py-1 font-mono text-[10px] text-text-tertiary"
        >
          {tech}
        </span>
      ))}
    </div>
  </Link>
);

const JourneySection = () => {
  const timelineRef = useRef(null);

  // The spine of the story draws itself as the reader scrolls through it.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.75', 'end 0.45'],
  });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="journey" className="relative scroll-mt-24 py-28 lg:py-36">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <ChapterHeading
          number="03"
          kicker="The Journey"
          title="Plot points along the way"
          lead="Four acts so far — each one a place that changed how I think about building software."
        />

        <div ref={timelineRef} className="relative">
          {/* The spine */}
          <div className="absolute left-4 top-0 h-full w-px bg-border-subtle lg:left-1/2 lg:-translate-x-1/2" />
          <motion.div
            className="absolute left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-accent-primary via-accent-primary to-accent-secondary lg:left-1/2 lg:-translate-x-1/2"
            style={{ scaleY: lineProgress }}
          />

          <div className="space-y-12 lg:space-y-20">
            {PLOT_POINTS.map((point, index) => {
              const side = index % 2 === 0 ? 'left' : 'right';
              return (
                <motion.div
                  key={point.title}
                  className="relative grid grid-cols-[2rem_1fr] gap-4 lg:grid-cols-[1fr_4rem_1fr] lg:gap-0"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.35 }}
                  variants={stagger(0.15)}
                >
                  {/* Node */}
                  <motion.div
                    variants={popIn}
                    style={{ x: '-50%' }}
                    className="absolute left-4 top-7 z-10 lg:left-1/2"
                  >
                    <span className="relative flex h-4 w-4 items-center justify-center">
                      <span className="absolute h-full w-full animate-ping rounded-full bg-accent-primary/30" />
                      <span className="relative h-2.5 w-2.5 rounded-full bg-accent-primary shadow-[0_0_14px_rgba(245,158,11,0.8)]" />
                    </span>
                  </motion.div>

                  {/* Act label on the opposite side (desktop) */}
                  <motion.div
                    variants={fadeUp}
                    className={`hidden items-start pt-6 lg:flex ${
                      side === 'left'
                        ? 'order-3 justify-start pl-10'
                        : 'order-1 justify-end pr-10'
                    }`}
                  >
                    <span className="font-display text-2xl italic text-text-tertiary/70">
                      {point.act}
                    </span>
                  </motion.div>

                  {/* Spacer column where the spine lives */}
                  <div className="order-2 hidden lg:block" />

                  {/* Card */}
                  <motion.div
                    variants={side === 'left' ? slideRight : slideLeft}
                    className={`col-start-2 lg:col-auto ${
                      side === 'left' ? 'order-1 lg:pr-10' : 'order-3 lg:pl-10'
                    }`}
                  >
                    <p className="mb-2 font-display text-base italic text-text-tertiary lg:hidden">
                      {point.act}
                    </p>
                    <TimelineCard point={point} side={side} />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* To be continued */}
          <motion.div
            className="relative mt-14 flex justify-start pl-10 lg:justify-center lg:pl-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
            variants={fadeUp}
          >
            <span className="rounded-full border border-border-subtle bg-background-secondary/80 px-5 py-2 font-mono text-xs uppercase tracking-[0.25em] text-text-tertiary backdrop-blur-sm">
              to be continued<span className="text-accent-primary">…</span>
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
