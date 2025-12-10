"use client";
import React from 'react'
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import { motion } from 'framer-motion';

const HeroSection = () => {
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
    <section className='lg:py-16'>
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