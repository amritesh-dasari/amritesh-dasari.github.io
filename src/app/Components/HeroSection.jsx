"use client";
import React, { useMemo, useRef } from 'react'
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const blobX = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const shapeY = useTransform(scrollYProgress, [0, 1], [0, 32]);
  const shapeX = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const shapeWanders = useMemo(() => [
    {
      size: 380,
      className: 'pointer-events-none absolute z-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(96,165,250,0.3),rgba(76,29,149,0))] blur-3xl',
      animate: {
        x: [0, 18, -14, 0],
        y: [0, -16, 10, 0],
        scale: [1, 1.04, 0.98, 1],
      },
      duration: 18 + Math.random() * 6,
      style: { top: "-8%", left: "-12%" },
      parallax: { x: blobX, y: blobY },
    },
    {
      size: 440,
      className: 'pointer-events-none absolute z-0 rounded-full bg-[radial-gradient(circle_at_70%_40%,rgba(168,85,247,0.28),rgba(14,165,233,0))] blur-3xl',
      animate: {
        x: [0, -20, 16, 0],
        y: [0, 18, -14, 0],
        scale: [1, 1.03, 0.99, 1],
      },
      duration: 20 + Math.random() * 6,
      style: { bottom: "-18%", right: "-14%" },
      parallax: { x: shapeX, y: shapeY },
    },
    {
      size: 220,
      className: 'pointer-events-none absolute z-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.26),rgba(59,130,246,0))] blur-3xl',
      animate: {
        x: [0, 14, -10, 0],
        y: [0, -14, 12, 0],
        scale: [1, 1.05, 0.97, 1],
      },
      duration: 16 + Math.random() * 6,
      style: { top: "32%", right: "16%" },
      parallax: { x: shapeX, y: blobY },
    },
  ], [blobX, blobY, shapeX, shapeY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.98 },
  };

  return (
    <section ref={heroRef} className='lg:py-16 relative'>
      {/* Parallax shapes behind hero */}
      {shapeWanders.map((shape, idx) => (
        <motion.div
          key={idx}
          className="pointer-events-none absolute z-0"
          style={{ ...shape.style, x: shape.parallax.x, y: shape.parallax.y }}
        >
          <motion.div
            className={shape.className}
            style={{ width: shape.size, height: shape.size }}
            animate={shape.animate}
            transition={{ duration: shape.duration, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      ))}
      <motion.div
        className='grid grid-cols-1 sm:grid-cols-12'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className='col-span-7 place-self-center text-center sm:text-left' variants={itemVariants}>
          <h1 className='text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold'>
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-red-400'>Hello, I&apos;m{" "}</span>
            <br />
            <TypeAnimation
              sequence={[
                'Mohan Amritesh',
                1000,
                'Distributed Systems Dev',
                1000,
                'Backend Developer',
                1000,
                'Flutter Developer',
                1000
              ]}
              wrapper="span"
              speed={30}
              repeat={Infinity}
            />
          </h1>
          <motion.p 
            className='text-[#ADB7BE] text-base sm:text-lg mt-4 mb-6 lg:text-xl'
            variants={itemVariants}
          >
            I&apos;m ingesting new knowledge and leveling up my skills by pulling lessons asynchronously from the Kafka queue of experience.
          </motion.p>
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
              className='inline-block'
            >
              <Link href="mailto:dmamritesh@gmail.com" className='px-6 py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-blue-500 via-purple-500 to-red-500 hover:shadow-lg hover:shadow-purple-500/50 text-white transition-shadow duration-300'>
                Contact Me
              </Link>
            </motion.div>
            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
              className='inline-block mt-3 sm:mt-0'
            >
              <Link href="https://drive.google.com/file/d/1hnxAe19fxdJ4-hIRyGLdqbaPNt52TrHH/view?usp=sharing">
                <button className='px-1 py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-red-500 hover:shadow-lg hover:shadow-purple-500/50 text-white transition-shadow duration-300'>
                  <span className='block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2'>Download Resume</span>
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div 
          className='col-span-5 place-self-center mt-4 lg:mt-0'
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className='rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative overflow-clip shadow-2xl shadow-purple-500/20'
            animate="float"
          >
            <Image src="/images/Himemoji.png"
              alt='Hi Memoji'
              className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
              width={300}
              height={300}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
