"use client";
import React, { useRef } from 'react';
import Link from 'next/link';
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from 'framer-motion';
import ChapterHeading from './ChapterHeading';
import MagneticButton from './MagneticButton';
import { fadeUp, stagger, VIEWPORT_SHALLOW } from '../lib/animations';

const FEATURED_PROJECTS = [
  {
    title: 'NOVA Teams Chatbot',
    description:
      'Enterprise Teams chatbot with Document Intelligence integration, Graph API access, and secure Key Vault deployments.',
    stack: ['Teams AI', 'Azure OpenAI', 'Graph API'],
  },
  {
    title: 'Latista Data Pipeline',
    description:
      'Automated data extraction from Oracle dumps to Snowflake with PDF processing and a Streamlit dashboard.',
    stack: ['Python', 'Snowflake', 'Streamlit'],
  },
  {
    title: 'SecureDNS Validator',
    description:
      'DNS validation and record generation tool for DMARC, DKIM, and SPF compliance.',
    stack: ['Python', 'Flask', 'AWS Lambda'],
  },
  {
    title: 'Distributed ML Cluster',
    description:
      '10-node fault-tolerant system with failure detection, versioned file system (SDFS), and multi-model training support.',
    stack: ['Python', 'PyTorch', 'Sockets'],
  },
  {
    title: 'BCFL: Blockchain Federated Learning',
    description:
      'Federated learning system using a blockchain ledger for model updates and PoW validation.',
    stack: ['Python', 'gRPC', 'Blockchain'],
  },
  {
    title: 'Chat-Time',
    description:
      'Real-time chat application with client-server subscriptions and Appwrite backend services.',
    stack: ['React', 'Node.js', 'Appwrite'],
  },
];

// Card that tilts toward the cursor with an amber spotlight chasing it.
const TiltCard = ({ project, index }) => {
  const ref = useRef(null);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 });
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${spotX}px ${spotY}px, rgba(245, 158, 11, 0.08), transparent 65%)`;

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 10);
    rotateX.set(-(py - 0.5) * 10);
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article variants={fadeUp} className="h-full [perspective:900px]">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border-subtle bg-background-secondary/80 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-accent-primary/30"
      >
        {/* Cursor spotlight inside the card */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlight }}
          aria-hidden="true"
        />

        <div className="relative" style={{ transform: 'translateZ(30px)' }}>
          <div className="mb-4 flex items-start justify-between">
            <span className="font-mono text-xs text-text-tertiary transition-colors duration-300 group-hover:text-accent-primary">
              {String(index + 1).padStart(3, '0')}
            </span>
            <span className="text-text-tertiary transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-primary">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
              </svg>
            </span>
          </div>

          <h3 className="mb-2 font-display text-xl font-semibold text-text-primary transition-colors duration-300 group-hover:text-accent-primary">
            {project.title}
          </h3>

          <p className="mb-5 text-sm leading-relaxed text-text-secondary">
            {project.description}
          </p>

          <div className="mt-auto flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded bg-background-tertiary px-2.5 py-1 font-mono text-[10px] text-text-tertiary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
};

const FeaturedProjects = () => {
  return (
    <section id="projects" className="relative scroll-mt-24 py-28 lg:py-36">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <ChapterHeading
          number="04"
          kicker="The Work"
          title="Artifacts of the journey"
          lead="Six pieces of the story, told in code. Each one shipped, each one taught something the last one couldn't."
        />

        <motion.div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_SHALLOW}
          variants={stagger(0.1)}
        >
          {FEATURED_PROJECTS.map((project, index) => (
            <TiltCard key={project.title} project={project} index={index} />
          ))}
        </motion.div>

        <motion.div
          className="mt-14 flex flex-col items-center gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          variants={fadeUp}
        >
          <MagneticButton>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg border border-border-default px-6 py-3 text-base font-semibold text-text-primary transition-all duration-300 hover:border-accent-primary/40 hover:bg-background-hover"
            >
              Browse the Full Archive
              <span aria-hidden="true">→</span>
            </Link>
          </MagneticButton>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-tertiary">
            12+ entries, catalogued by era
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
