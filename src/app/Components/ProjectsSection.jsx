"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer, lineScale } from "../lib/animations";

const projectsData = [
    {
        id: 1,
        title: "NOVA Teams Chatbot",
        description: "Teams-based AI chatbot using Azure Document Intelligence, Teams SSO, and Graph API to analyze user-shared files and deliver structured insights.",
        tag: ["All", "AI"],
        stack: ["Azure OpenAI", "Teams SSO", "Graph API"],
        gitUrl: "https://github.com/amritesh-dasari/",
    },
    {
        id: 2,
        title: "Distributed ML Cluster",
        description: "10-node distributed machine learning system with integrated failure detection, log-saver program, and versioned file system with replication.",
        tag: ["All", "Systems"],
        stack: ["Python", "PyTorch", "Distributed Systems"],
        gitUrl: "https://github.com/amritesh-dasari/CS425-Distributed-Systems-UIUC/tree/main/cs425_mp4",
    },
    {
        id: 3,
        title: "BCFL: Blockchain Federated Learning",
        description: "Improved FL security by incorporating blockchain-based distributed ledger for model updates and replacing central server with PoW validators.",
        tag: ["All", "Systems"],
        stack: ["Python", "gRPC", "Blockchain"],
        gitUrl: "https://gitlab.engr.illinois.edu/mdasari2/cs-525-research",
    },
    {
        id: 4,
        title: "Chat-Time",
        description: "Real-time chat application using React, Node.js and Appwrite with client-server subscription for instant messaging.",
        tag: ["All", "Web"],
        stack: ["React", "Node.js", "Appwrite"],
        gitUrl: "https://github.com/amritesh-dasari/Chat-Time",
    },
    {
        id: 5,
        title: "SecureDNS Validator",
        description: "DNS record validator and generator for DMARC, DKIM, and SPF compliance with guided record generation.",
        tag: ["All", "Web"],
        stack: ["Python", "Flask", "AWS Lambda"],
        gitUrl: "https://github.com/amritesh-dasari/",
    },
    {
        id: 6,
        title: "VTOP Extended",
        description: "Campus companion app for VIT with authentication, clubs, events, faculty database, and online quizzes.",
        tag: ["All", "AI"],
        stack: ["Flutter", "Firebase"],
        gitUrl: "https://github.com/amritesh-dasari/VTOP-Extended",
    },
];

const ProjectsSection = () => {
    const [tag, setTag] = useState("All");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const filteredProjects = projectsData.filter((project) =>
        project.tag.includes(tag)
    );

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="projects" className="py-16 lg:py-24">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={staggerContainer}
            >
                {/* Section header */}
                <motion.div className="mb-8" variants={fadeUp}>
                    <h2 className="text-3xl lg:text-4xl font-semibold text-text-primary mb-4">
                        Projects
                    </h2>
                    <motion.div variants={lineScale} className="w-12 h-0.5 bg-accent-primary mb-6" />
                </motion.div>

                {/* Filter tags */}
                <motion.div
                    className="flex flex-wrap gap-3 mb-10"
                    variants={fadeUp}
                >
                    {['All', 'Systems', 'AI', 'Web'].map((tagName) => (
                        <ProjectTag
                            key={tagName}
                            onClick={() => setTag(tagName)}
                            name={tagName}
                            isSelected={tag === tagName}
                        />
                    ))}
                </motion.div>

                {/* Projects grid */}
                <motion.ul
                    ref={ref}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filteredProjects.map((project, index) => (
                        <motion.li
                            key={project.id}
                            variants={cardVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <ProjectCard
                                title={project.title}
                                description={project.description}
                                gitUrl={project.gitUrl}
                                tags={project.stack}
                            />
                        </motion.li>
                    ))}
                </motion.ul>
            </motion.div>
        </section>
    );
};

export default ProjectsSection;
