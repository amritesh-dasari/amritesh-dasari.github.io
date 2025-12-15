"use client";
import React, { useTransition, useState } from 'react'
import Image from 'next/image'
import TabButton from './TabButton';
import { motion } from 'framer-motion';

const TAB_DATA = [
    {
        title: "Skills",
        id: "skills",
        content: (
            <ul className='list-disc pl-6 space-y-2'>
                <li>Azure AI Foundry</li>
                <li>Teams Apps</li>
                <li>Node.js</li>
                <li>Typescript</li>
                <li>Talend ETL</li>
                <li>Snowflake</li>
                <li>Kafka</li>
            </ul>
        )
    },
    {
        title: "Education",
        id: "education",
        content: (
            <ul className='list-disc pl-6 space-y-2'>
                <li>University of Illinois, Urbana-Champaign <i>(Master of Computer Science)</i></li>
                <ul className='ml-4'>
                    <li>GPA: 3.43/4</li>
                </ul>
                <li>Vellore Institute of Technology, Amaravati <i>(Bachelor of Technology)</i></li>
                <ul className='ml-4'>
                    <li>GPA: 8.9/10</li>
                </ul>
            </ul>
        )
    },
    {
        title: "Experience",
        id: "experience",
        content: (
            <ul className='list-disc pl-6 space-y-2'>
                <li><i>Software Development Engineer</i>, Princeton IT Services</li>
                <li><i>Teaching Assistant</i>, ECE445 Senior Design Lab (under prof.Arne Fliflet), UIUC</li>
                <li><a href="https://drive.google.com/file/d/1SZIFZf47H7deDvB4KzyUtxK_eR4_hT5G/view"><i>Software Development Engineering Intern</i>, Logistics pod, Technology function, Blinkit (previously Grofers)</a></li>
            </ul>
        )
    },
    {
        title: "Certifications",
        id: "certifications",
        content: (
            <ul className='list-disc pl-6 space-y-2'>
                <li><a href="https://www.credly.com/badges/0138781d-9481-4b1e-b7bb-9768614cd08d">IBM Master the Mainframe Challenge, 2020</a></li>
                <li><a href="https://www.udemy.com/certificate/UC-c2e1003e-98a4-4a2a-9b2f-a55672f464a8/">Flutter & Dart - The Complete Flutter App Development Course, Udemy</a></li>
                <li><a href="https://www.udemy.com/certificate/UC-1f276f43-488d-448a-ad9a-0345fceef665/">Building Real-Time REST APIs with Spring Boot - Blog App, Udemy</a></li>
            </ul>
        )
    },
]

const AboutSection = () => {
    const [tab, setTab] = useState("skills");
    const [isPending, startTransition] = useTransition();

    const handleTabChange = (id) => {
        startTransition(() => {
            setTab(id);
        })
    }

    const imageVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const contentVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.4 }
        })
    };

    return (
        <section className='text-white' id="about">
            <motion.div
                className='md:grid md:grid-cols-2 gap-8 items-start py-8 px-4 xl:gap-16 sm:py-16 sm:px-16'
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.div variants={imageVariants}>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Image
                            className='rounded-full bg-[#181818] shadow-2xl shadow-purple-500/20'
                            src='/images/Amritesh.jpeg'
                            width={500}
                            height={500}
                            alt='Profile Photo'
                        />
                    </motion.div>
                </motion.div>

                <motion.div
                    className='mt-4 md:mt-0 text-left flex flex-col h-full'
                    variants={contentVariants}
                >
                    <motion.h2
                        className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 mb-4'
                        variants={itemVariants}
                        custom={0}
                    >
                        About Me
                    </motion.h2>

                    <motion.p
                        className='text-base lg:text-lg text-justify text-[#ADB7BE]'
                        variants={itemVariants}
                        custom={1}
                    >
                        I am a software engineer specializing in distributed systems, backend development, and full-stack engineering. 
                        My experience spans Python, Kafka, Docker, Kubernetes, PostgreSQL, Flask, React, and cloud-native tooling. 
                        I have built scalable systems - from a distributed machine learning cluster to production ready chatbots, data extraction pipelines, and DNS security tools. 
                        With a strong foundation in distributed and cloud systems from my graduate program at UIUC, I focus on creating resilient, efficient, and automated solutions. 
                        I am a continuous learner who enjoys tackling complex problems, improving data workflows, and delivering reliable, well-engineered systems as part of collaborative teams.
                    </motion.p>

                    <motion.div
                        className='flex flex-row mt-5 gap-2 flex-wrap'
                        variants={itemVariants}
                        custom={2}
                    >
                        <TabButton
                            selectTab={() => handleTabChange("skills")}
                            active={tab == "skills"}>
                            {" "}Skills{" "}
                        </TabButton>
                        <TabButton
                            selectTab={() => handleTabChange("education")}
                            active={tab == "education"}>
                            {" "}Education{" "}
                        </TabButton>
                        <TabButton
                            selectTab={() => handleTabChange("experience")}
                            active={tab == "experience"}>
                            {" "}Experience{" "}
                        </TabButton>
                        <TabButton
                            selectTab={() => handleTabChange("certifications")}
                            active={tab == "certifications"}>
                            {" "}Certifications{" "}
                        </TabButton>
                    </motion.div>

                    <motion.div
                        className='mt-4 min-h-[220px]'
                        key={tab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {TAB_DATA.find((t) => t.id === tab).content}
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default AboutSection
