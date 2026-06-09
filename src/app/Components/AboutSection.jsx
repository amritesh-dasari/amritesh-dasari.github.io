"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ChapterHeading from './ChapterHeading';
import { fadeUp, slideLeft, stagger, VIEWPORT } from '../lib/animations';

const EDUCATION = [
  {
    school: 'University of Illinois, Urbana-Champaign',
    degree: 'M.S. in Computer Science',
    detail: 'Distributed Systems · Cloud Systems',
    period: '2022 — 2023',
    gpa: '3.43 / 4.0',
    note: 'The deep dive',
    url: 'https://illinois.edu',
  },
  {
    school: 'VIT Amaravati',
    degree: 'B.Tech in Computer Science',
    detail: 'Networking · Cyber Security',
    period: '2018 — 2022',
    gpa: '8.9 / 10',
    note: 'The first pages',
    url: 'https://vitap.ac.in',
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative scroll-mt-24 py-28 lg:py-36">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <ChapterHeading
          number="01"
          kicker="Origins"
          title="Where the story begins"
        />

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          {/* Narrative */}
          <motion.div
            className="space-y-7"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={stagger(0.15)}
          >
            <motion.p
              variants={fadeUp}
              className="drop-cap text-lg leading-relaxed text-text-secondary"
            >
              Somewhere between a first &ldquo;Hello, World&rdquo; and a ten-node distributed
              cluster, curiosity turned into a craft. I am a software engineer specializing in
              distributed systems, backend development, and full-stack engineering — fluent in
              Python, Kafka, Docker, Kubernetes, PostgreSQL, Flask, React, and the cloud-native
              tooling that holds it all together.
            </motion.p>

            <motion.p variants={fadeUp} className="text-lg leading-relaxed text-text-secondary">
              The plot so far: a distributed machine learning cluster built from scratch,
              production-ready chatbots, data extraction pipelines, and DNS security tools. With
              a graduate foundation in distributed and cloud systems from UIUC, I focus on
              building resilient, efficient, automated solutions — and on tackling the complex
              problems that make the best stories.
            </motion.p>

            {/* Pull quote */}
            <motion.blockquote
              variants={fadeUp}
              className="border-l-2 border-accent-primary pl-6"
            >
              <p className="font-display text-xl italic leading-relaxed text-text-primary sm:text-2xl">
                Every reliable system is a story of failures handled gracefully.
              </p>
              <footer className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
                — a lesson from chapter three
              </footer>
            </motion.blockquote>
          </motion.div>

          {/* Education milestones */}
          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={stagger(0.18, 0.1)}
          >
            <motion.p
              variants={fadeUp}
              className="font-mono text-xs uppercase tracking-[0.3em] text-text-tertiary"
            >
              // formative arcs
            </motion.p>

            {EDUCATION.map((edu) => (
              <motion.div key={edu.school} variants={slideLeft}>
                <Link
                  href={edu.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl border border-border-subtle bg-background-secondary/70 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-primary/30 hover:shadow-[0_20px_40px_-24px_rgba(245,158,11,0.25)]"
                >
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-primary">
                      {edu.note}
                    </span>
                    <span className="rounded-full border border-border-subtle bg-background-tertiary px-2.5 py-1 font-mono text-[10px] text-text-tertiary">
                      GPA {edu.gpa}
                    </span>
                  </div>
                  <p className="font-display text-lg font-semibold text-text-primary transition-colors duration-300 group-hover:text-accent-primary">
                    {edu.school}
                  </p>
                  <p className="mt-1 text-sm text-text-secondary">{edu.degree}</p>
                  <p className="text-sm text-text-tertiary">{edu.detail}</p>
                  <p className="mt-2 font-mono text-xs text-text-tertiary">{edu.period}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
