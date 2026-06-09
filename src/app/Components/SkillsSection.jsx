"use client";
import React from 'react';
import { motion } from 'framer-motion';
import ChapterHeading from './ChapterHeading';
import { fadeUp, fadeIn, stagger, VIEWPORT } from '../lib/animations';

const ROWS = [
  {
    label: 'the languages',
    duration: '38s',
    reverse: false,
    items: ['Python', 'Java', 'C++', 'TypeScript', 'Dart', 'C#', 'SQL'],
  },
  {
    label: 'the frameworks',
    duration: '48s',
    reverse: true,
    items: [
      'React.js', 'Next.js', 'Node.js', 'Django', 'Flask', 'Spring Boot', 'Flutter',
      'Streamlit', 'TensorFlow', 'TensorFlow Lite', 'OpenCV', 'Teams AI', 'Native Android',
    ],
  },
  {
    label: 'the infrastructure',
    duration: '56s',
    reverse: false,
    items: [
      'Kafka', 'Redis', 'Docker', 'Kubernetes', 'PostgreSQL', 'MySQL', 'MongoDB',
      'Snowflake', 'Firebase', 'Celery', 'nginx', 'Jenkins', 'Sentry', 'Grafana',
      'AWS Lambda', 'Azure', 'Document Intelligence',
    ],
  },
];

const Chip = ({ children }) => (
  <span className="mr-3 flex items-center gap-2 whitespace-nowrap rounded-full border border-border-subtle bg-background-secondary/80 px-4 py-2 font-mono text-xs text-text-secondary transition-colors duration-300 hover:border-accent-primary/40 hover:text-accent-primary">
    <span className="h-1 w-1 rounded-full bg-accent-primary" />
    {children}
  </span>
);

const SkillsSection = () => {
  return (
    <section id="skills" className="relative scroll-mt-24 py-28 lg:py-36">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <ChapterHeading
          number="02"
          kicker="The Toolkit"
          title="Tools gathered along the way"
          lead="No hero walks into act three empty-handed. These are the languages, frameworks, and infrastructure collected across every chapter so far."
        />
      </div>

      {/* Full-bleed marquee rows */}
      <motion.div
        className="space-y-8"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={stagger(0.2)}
      >
        {ROWS.map((row) => (
          <motion.div key={row.label} variants={fadeIn}>
            <p className="mx-auto mb-3 w-full max-w-7xl px-6 font-mono text-xs uppercase tracking-[0.3em] text-text-tertiary lg:px-12">
              <span className="text-accent-primary">//</span> {row.label}
            </p>
            <div className={`marquee ${row.reverse ? 'marquee-reverse' : ''}`}>
              <div className="marquee-track py-1" style={{ '--marquee-duration': row.duration }}>
                <div className="flex shrink-0">
                  {row.items.map((item) => (
                    <Chip key={item}>{item}</Chip>
                  ))}
                </div>
                <div className="flex shrink-0" aria-hidden="true">
                  {row.items.map((item) => (
                    <Chip key={`${item}-dup`}>{item}</Chip>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        <motion.p
          variants={fadeUp}
          className="mx-auto w-full max-w-7xl px-6 pt-2 font-mono text-xs text-text-tertiary lg:px-12"
        >
          <span className="text-accent-primary">$</span> hover to pause —
          <span className="italic"> and the next chapter will demand new tools entirely.</span>
        </motion.p>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
