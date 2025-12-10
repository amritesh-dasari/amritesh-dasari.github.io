import React from 'react'
import { CodeBracketIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { motion } from 'framer-motion'

const ProjectCard = ({ title, description, gitUrl }) => {
    const cardVariants = {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
    };

    return (
        <motion.div
            variants={cardVariants}
            className="h-full"
        >
            <div
                className="h-52 md:h-72 rounded-t-xl relative group bg-gradient-to-br from-blue-800 via-purple-800 to-red-800 overflow-hidden"
            >
                {/* Animated gradient background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-blue-600 via-purple-600 to-red-600" />
                
                <div className="text-center absolute top-0 left-0 w-full h-full text-xl font-bold text-white mt-4 mb-8 md:mb-12 z-10">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        {title}
                    </div>
                </div>

                {/* Glassmorphism overlay with blur effect */}
                <motion.div 
                    className="overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-[#181818]/40 backdrop-blur-sm hidden group-hover:flex transition-all duration-500 z-20"
                    initial={{ backdropFilter: 'blur(0px)' }}
                    whileHover={{ backdropFilter: 'blur(10px)' }}
                >
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            href={gitUrl}
                            className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link transition-all duration-300 shadow-lg shadow-purple-500/50"
                        >
                            <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-white transition-colors duration-300" />
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Modern card with improved styling */}
            <div className="text-white rounded-b-xl bg-[#181818] bg-opacity-80 backdrop-blur-sm py-6 px-4 border border-white/10 hover:border-purple-500/30 transition-colors duration-300">
                <h5 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">{title}</h5>
                <p className="text-[#ADB7BE] text-sm leading-relaxed">{description}</p>
            </div>
        </motion.div>
    )
}

export default ProjectCard