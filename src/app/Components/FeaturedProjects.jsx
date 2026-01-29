"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, lineScale } from '../lib/animations';

const featuredProjects = [
  {
    title: "NOVA Teams Chatbot",
    description: "Enterprise Teams chatbot with Document Intelligence integration, Graph API access, and secure Key Vault deployments.",
    stack: ["Teams AI", "Azure OpenAI", "Graph API"],
  },
  {
    title: "Latista Data Pipeline",
    description: "Automated data extraction from Oracle dumps to Snowflake with PDF processing and a Streamlit dashboard.",
    stack: ["Python", "Snowflake", "Streamlit"],
  },
  {
    title: "SecureDNS Validator",
    description: "DNS validation and record generation tool for DMARC, DKIM, and SPF compliance.",
    stack: ["Python", "Flask", "AWS Lambda"],
  },
  {
    title: "Distributed ML Cluster",
    description: "10-node fault-tolerant system with failure detection, versioned file system (SDFS), and multi-model training support.",
    stack: ["Python", "PyTorch", "Sockets"],
  },
  {
    title: "BCFL: Blockchain Federated Learning",
    description: "Federated learning system using a blockchain ledger for model updates and PoW validation.",
    stack: ["Python", "gRPC", "Blockchain"],
  },
  {
    title: "Chat-Time",
    description: "Real-time chat application with client-server subscriptions and Appwrite backend services.",
    stack: ["React", "Node.js", "Appwrite"],
  },
];

const FeaturedProjects = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="projects" className='min-h-screen snap-start scroll-mt-24 pt-24 pb-16 lg:pt-28 lg:pb-20'>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {/* Section header */}
          <motion.div className='mb-10' variants={fadeUp}>
            <div>
              <h2 className='text-3xl lg:text-4xl font-semibold text-text-primary mb-3'>
                Featured Projects
              </h2>
              <motion.div variants={lineScale} className='w-12 h-1 bg-accent-primary rounded-full' />
            </div>
          </motion.div>

          {/* Projects grid */}
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
            {featuredProjects.map((project) => (
              <motion.article
                key={project.title}
                className='group p-6 bg-background-secondary rounded-xl border border-border-subtle hover:border-border-hover transition-all duration-300 shadow-[0_20px_40px_-32px_rgba(0,0,0,0.6)]'
                variants={cardVariants}
                whileHover={{ y: -3 }}
              >
                <div className='h-0.5 w-full bg-gradient-to-r from-accent-primary/50 to-transparent mb-4 -mt-6 -mx-6 px-6 rounded-t-xl' style={{ width: 'calc(100% + 3rem)', marginLeft: '-1.5rem' }} />

                <h3 className='text-lg font-semibold text-text-primary group-hover:text-accent-primary transition-colors duration-200 mb-2'>
                  {project.title}
                </h3>

                <p className='text-base text-text-secondary leading-relaxed mb-4'>
                  {project.description}
                </p>

                <div className='flex flex-wrap gap-1.5'>
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className='px-2.5 py-1 text-xs text-text-tertiary bg-background-tertiary rounded'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>

          {/* View all projects */}
          <motion.div className='mt-10 flex justify-center' variants={fadeUp}>
            <Link
              href="/projects"
              className='inline-flex items-center justify-center px-6 py-3 text-base border border-border-default text-text-primary font-semibold rounded-lg hover:border-border-hover hover:bg-background-hover transition-all duration-300'
            >
              View All Projects
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
