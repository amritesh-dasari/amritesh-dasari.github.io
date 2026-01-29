import React from 'react'
import { CodeBracketIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { motion } from 'framer-motion'

const ProjectCard = ({ title, description, gitUrl, tags = [] }) => {
    return (
        <motion.article
            className="group h-full rounded-xl bg-background-secondary border border-border-subtle hover:border-border-hover transition-all duration-300 overflow-hidden"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
        >
            {/* Accent line at top */}
            <div className="h-0.5 w-full bg-gradient-to-r from-accent-primary/50 to-transparent" />

            <div className="p-6">
                {/* Header row */}
                <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-medium text-text-primary group-hover:text-accent-primary transition-colors duration-300 flex-1 pr-4">
                        {title}
                    </h3>

                    {/* GitHub link */}
                    <Link
                        href={gitUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-text-tertiary hover:text-accent-primary transition-colors duration-300 -mr-2 -mt-1"
                        aria-label="View on GitHub"
                    >
                        <CodeBracketIcon className="w-5 h-5" />
                    </Link>
                </div>

                {/* Description */}
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    {description}
                </p>

                {/* Tech tags */}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2.5 py-1 text-xs text-text-tertiary bg-background-tertiary rounded-md"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </motion.article>
    )
}

export default ProjectCard
