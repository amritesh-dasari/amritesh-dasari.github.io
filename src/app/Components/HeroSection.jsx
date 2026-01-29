"use client";
import React from 'react'
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, lineScale } from '../lib/animations';

const HeroSection = () => {
  const quickStats = [
    { label: 'Experience', value: '2+ years', detail: 'Systems and Cloud Solutions Architect' },
    { label: 'Currently', value: 'SDE @ Princeton IT Services', detail: 'Learning. Building. Growing.' },
  ];

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98 },
  };

  return (
    <section id="home" className='relative min-h-screen snap-start scroll-mt-24 pt-24 pb-12 flex items-center'>
      <div className="absolute inset-x-0 top-6 -z-10">
        <div className="mx-auto h-64 w-[80%] max-w-5xl rounded-full bg-gradient-to-r from-accent-primary/10 via-transparent to-accent-primary/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full py-14 lg:py-20">
        <motion.div
          className='grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full'
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Text content */}
          <motion.div className='lg:col-span-7 space-y-6'>
            {/* Role label with typing animation */}
            <motion.div variants={fadeUp}>
              <TypeAnimation
                sequence={[
                  'Distributed Systems Developer',
                  2000,
                  'Agentic AI Engineer',
                  2000,
                  'Backend Software Engineer',
                  2000,
                  'Cloud Solutions Architect',
                  2000,
                ]}
                wrapper="span"
                speed={40}
                repeat={Infinity}
                className="text-base sm:text-lg font-semibold tracking-[0.3em] uppercase text-accent-primary/90"
              />
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={fadeUp}
              className='text-5xl sm:text-6xl lg:text-7xl font-bold text-text-primary tracking-tighter leading-tight'
            >
              Mohan Amritesh Dasari
            </motion.h1>

            {/* Accent line */}
            <motion.div
              variants={lineScale}
              className='w-20 h-1 bg-accent-primary rounded-full'
            />

            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              className='text-lg sm:text-xl text-text-secondary max-w-2xl leading-relaxed'
            >
              Ingesting new knowledge and leveling up - one message at a time from the Kafka queue of experience.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className='text-base sm:text-lg text-text-tertiary max-w-2xl leading-relaxed'
            >
              Software engineer focused on backend, data, and platform layers. I build reliable services, tighten feedback loops with automation, and keep latency predictable at scale.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className='flex flex-wrap gap-3 pt-1'>
              <motion.div
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  href="mailto:dmamritesh@gmail.com"
                  className='inline-block px-6 py-3 text-base bg-accent-primary text-background-primary font-semibold rounded-lg hover:bg-accent-secondary transition-colors duration-300 shadow-[0_10px_30px_-12px_rgba(245,158,11,0.45)]'
                >
                  Get in Touch
                </Link>
              </motion.div>
              <motion.div
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  href="https://drive.google.com/file/d/1SrO4j8d-Np81Mh2x0hQdJNxvgmtxce3V/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className='inline-block px-6 py-3 text-base border border-border-default text-text-primary font-semibold rounded-lg hover:border-border-hover hover:bg-background-hover transition-all duration-300'
                >
                  View Resume
                </Link>
              </motion.div>
            </motion.div>

            {/* Quick stats */}
            <motion.div variants={fadeUp} className='grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2'>
              {quickStats.map((item) => (
                <div
                  key={item.label}
                  className='p-4 rounded-xl border border-border-subtle bg-background-secondary/60 backdrop-blur-sm'
                >
                  <p className='text-xs uppercase tracking-wide text-text-tertiary'>{item.label}</p>
                  <p className='text-lg font-semibold text-text-primary leading-tight'>{item.value}</p>
                  <p className='text-sm text-text-secondary'>{item.detail}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile image */}
          <motion.div
            className='lg:col-span-5 flex justify-center lg:justify-end origin-center lg:origin-right'
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1.5 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className='relative'>
              {/* Subtle accent glow behind image */}
              <div className='absolute -inset-1 bg-gradient-to-br from-accent-primary/20 via-accent-primary/5 to-transparent rounded-2xl blur-xl' />
              <div className='relative w-[240px] h-[240px] lg:w-[320px] lg:h-[320px] rounded-2xl overflow-hidden border border-border-subtle'>
                <Image
                  src="/images/Amritesh.jpeg"
                  alt='Amritesh Dasari'
                  fill
                  className='object-cover'
                  priority
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
