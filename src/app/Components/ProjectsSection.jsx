"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
    {
        id: 1,
        title: "NOVA Teams Chatbot",
        description: "NOVA is a Teams-based AI chatbot that uses Azure Document Intelligence, Teams SSO, and Graph API to analyze user-shared files and deliver structured insights directly within Teams.",
        tag: ["All", "AI"],
        gitUrl: "https://github.com/amritesh-dasari/",
    },
    {
        id: 2,
        title: "AURA Teams Chatbot",
        description: "AURA is a Teams-based AI agent that uses Azure OpenAI and a RAG pipeline to search, retrieve, and deliver context-aware answers from SharePoint and OneDrive content.",
        tag: ["All", "AI"],
        gitUrl: "https://github.com/amritesh-dasari/",
    },
    {
        id: 3,
        title: "Chat-Time",
        description: "Coded a real-time chat website using React, Node.js and Appwrite Cloud that implemented client-server subscription for real-time messaging and allowed message deletion based on message IDs.",
        tag: ["All", "Web"],
        gitUrl: "https://github.com/amritesh-dasari/Chat-Time",
    },
    {
        id: 4,
        title: "FCC-HFTracer",
        description: "Developed a website visualization of publicly available FCC data between locations using indexing to optimize complex queries hosted on a GCP server and SQL instance.",
        tag: ["All", "Web"],
        gitUrl: "https://github.com/amritesh-dasari/FCC-HFTracer",
    },
    {
        id: 5,
        title: "Distributed Machine Learning Cluster",
        description: "Implemented a distributed machine learning system with 10 nodes having integrated failure detection using a logsaver program and versioned file system with replication for efficient storage and maintenance.",
        tag: ["All", "System Design"],
        gitUrl: "https://github.com/amritesh-dasari/CS425-Distributed-Systems-UIUC/tree/main/cs425_mp4",
    },
    {
        id: 6,
        title: "VTOP Extended",
        description: "Developed an Android application for Vellore Institute of Technology with authentication, clubs, events, faculty database and additional features like web view of campus portal, online quizzes using Flutter and Firebase.",
        tag: ["All", "Mobile"],
        gitUrl: "https://github.com/amritesh-dasari/VTOP-Extended",
    },
    {
        id: 7,
        title: "BCFL: Blockchain based Federated Learning",
        description: "Researched improving security and reliability of Federated Learning by incorporating a blockchain-based distributed ledger for model update record-keeping and replacing the central server with Proof-of-Work validated miners.",
        tag: ["All", "System Design"],
        gitUrl: "https://gitlab.engr.illinois.edu/mdasari2/cs-525-research",
    },
    {
        id: 8,
        title: "notsosimpletictactoe",
        description: "Mobile Tic-Tac-Toe game built with Flutter uses minimax algorithm for AI opponent to allow single player mode.",
        tag: ["All", "Mobile"],
        gitUrl: "https://github.com/amritesh-dasari/notsosimpletictactoe",
    },
    {
        id: 9,
        title: "Diabetic Retinopathy Diagnosis",
        description: "Mobile App developed using TensorFlow Lite and Flutter that allows user to upload fundus images to check if a person is suffering from Diabetic Retinopathy. The Model has an accuracy of 91% based on publicly available datasets.",
        tag: ["All", "Mobile"],
        gitUrl: "https://github.com/amritesh-dasari/Diabetic-Retinopathy-Diagnosis",
    },
    {
        id: 10,
        title: "Blog Application",
        description: "Backend REST API implementation for a Blog Application based on Spring Boot and MySQL.",
        tag: ["All", "Web"],
        gitUrl: "https://github.com/amritesh-dasari/Springboot-Blog",
    },
]

const ProjectsSection = () => {
    const [tag, setTag] = useState("All");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const handleTagChange = (newTag) => {
        setTag(newTag);
    };

    const filteredProjects = projectsData.filter((project) =>
        project.tag.includes(tag)
    );

    const cardVariants = {
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        hover: { y: -10, transition: { duration: 0.3 } }
    };

    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            }
        }
    };

    return (
        <section id="projects">
            <motion.h2 
                className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12 bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent"
                variants={titleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                My Projects
            </motion.h2>
            <motion.div 
                className="text-white w-full flex flex-row justify-center items-center gap-3 md:gap-4 py-6 flex-wrap text-center"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <ProjectTag
                    onClick={handleTagChange}
                    name="All"
                    isSelected={tag === "All"}
                />
                <ProjectTag
                    onClick={handleTagChange}
                    name="AI"
                    isSelected={tag === "AI"}
                />
                <ProjectTag
                    onClick={handleTagChange}
                    name="System Design"
                    isSelected={tag === "System Design"}
                />
                <ProjectTag
                    onClick={handleTagChange}
                    name="Web"
                    isSelected={tag === "Web"}
                />
                <ProjectTag
                    onClick={handleTagChange}
                    name="Mobile"
                    isSelected={tag === "Mobile"}
                />
            </motion.div>
            <motion.ul 
                ref={ref} 
                className="grid md:grid-cols-3 gap-8 md:gap-12"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {filteredProjects.map((project, index) => (
                    <motion.li
                        key={index}
                        variants={cardVariants}
                        initial="initial"
                        animate={isInView ? "animate" : "initial"}
                        whileHover="hover"
                        transition={{ duration: 0.3, delay: index * 0.15 }}
                    >
                        <ProjectCard
                            key={project.id}
                            title={project.title}
                            description={project.description}
                            gitUrl={project.gitUrl}
                        />
                    </motion.li>
                ))}
            </motion.ul>
        </section>
    );
};

export default ProjectsSection
