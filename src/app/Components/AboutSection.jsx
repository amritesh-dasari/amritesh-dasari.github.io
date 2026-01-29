"use client";
import React from 'react'
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, lineScale } from '../lib/animations';

const skills = [
  'Python', 'Java', 'C++', 'Dart', 'C#',
  'TensorFlow','TensorFlow Lite','OpenCV','CNN',
  'Django','Flutter','Flask','TypeScript','React.js','Next.js','Node.js','Streamlit','Native Android Dev','Spring Boot',
  'MySQL','PostgreSQL','MongoDB','Firebase','Snowflake',
  'Docker','Kubernetes','Kafka','Redis','Teams AI','Document Intelligence','Scaffold','Celery','nginx','Jenkins','Sentry','Grafana'
];

const education = [
  {
    school: 'University of Illinois, Urbana-Champaign',
    degree: 'Masters in Computer Science',
    detail: 'Distributed Systems, Cloud Systems',
    gpa: 'GPA: 3.43/4.0',
    url: 'https://illinois.edu'
  },
  {
    school: 'VIT Amaravati',
    degree: 'B.Tech Computer Science',
    detail: 'Networking and Cyber Security',
    gpa: 'GPA: 8.9/10',
    url: 'https://vitap.ac.in'
  }
];

const experience = [
  {
    role: 'Software Development Engineer',
    company: 'Princeton IT Services',
    period: 'Feb 2024 - Present',
    url: 'https://princetonits.com'
  },
  {
    role: 'SDE Intern',
    company: 'Blinkit (Grofers)',
    period: 'Jan 2022 - Jul 2022',
    url: 'https://blinkit.com'
  }
];

const AboutSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="about" className='min-h-screen snap-start scroll-mt-24 pt-24 pb-16 lg:pt-28 lg:pb-20'>
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-12 items-start w-full"
        >
          {/* Section header & copy */}
          <motion.div className='space-y-5' variants={fadeUp}>
            <div>
              <h2 className='text-3xl lg:text-4xl font-semibold text-text-primary mb-3'>
                About
              </h2>
              <motion.div variants={lineScale} className='w-12 h-1 bg-accent-primary rounded-full' />
            </div>
            <p className='text-lg text-text-secondary leading-relaxed'>
              I am a software engineer specializing in distributed systems, backend development, and full-stack engineering. My experience spans Python, Kafka, Docker, Kubernetes, PostgreSQL, Flask, React, and cloud-native tooling. I have built scalable systems - from a distributed machine learning cluster to production ready chatbots, data extraction pipelines, and DNS security tools. With a strong foundation in distributed and cloud systems from my graduate program at UIUC, I focus on creating resilient, efficient, and automated solutions. I am a continuous learner who enjoys tackling complex problems, improving data workflows, and delivering reliable, well-engineered systems as part of collaborative teams.
            </p>
          </motion.div>

          {/* Cards grid */}
          <div className='grid sm:grid-cols-2 gap-4 w-full'>
            {/* Skills card */}
            <motion.div
              className='p-6 bg-background-secondary rounded-xl border border-border-subtle hover:border-border-hover transition-colors duration-300 sm:col-span-2'
              variants={cardVariants}
            >
              <h3 className='text-lg font-semibold text-text-primary mb-4'>Core Skillset</h3>
              <div className='flex flex-wrap gap-2'>
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className='px-3 py-1.5 text-xs font-medium text-text-secondary bg-background-tertiary rounded-lg hover:text-accent-primary transition-colors duration-200'
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Education card */}
            <motion.div
              className='p-6 bg-background-secondary rounded-xl border border-border-subtle hover:border-border-hover transition-colors duration-300'
              variants={cardVariants}
            >
              <h3 className='text-lg font-semibold text-text-primary mb-3'>Education</h3>
              <div className='space-y-3'>
                {education.map((edu) => (
                  <Link
                    key={edu.school}
                    href={edu.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='block group'
                  >
                    <p className='text-base text-text-primary font-medium group-hover:text-accent-primary transition-colors duration-200'>
                      {edu.school}
                    </p>
                    <p className='text-sm text-text-tertiary'>{edu.degree}</p>
                    <p className='text-sm text-text-tertiary'>{edu.detail}</p>
                    <p className='text-sm text-text-tertiary'>{edu.gpa}</p>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Experience card */}
            <motion.div
              className='p-6 bg-background-secondary rounded-xl border border-border-subtle hover:border-border-hover transition-colors duration-300'
              variants={cardVariants}
            >
              <h3 className='text-lg font-semibold text-text-primary mb-3'>Experience</h3>
              <div className='space-y-3'>
                {experience.map((exp) => (
                  <Link
                    key={exp.company}
                    href={exp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='block group'
                  >
                    <p className='text-base text-text-primary font-medium group-hover:text-accent-primary transition-colors duration-200'>
                      {exp.role}
                    </p>
                    <p className='text-sm text-text-tertiary'>{exp.company}</p>
                    <p className='text-sm text-text-tertiary'>{exp.period}</p>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
