"use client";
import React, { useTransition, useState } from 'react'
import Image from 'next/image'
import TabButton from './TabButton';

const TAB_DATA = [
    {
        title: "Skills",
        id: "skills",
        content: (
            <ul className='list-disc pl-6'>
                <li>Django</li>
                <li>Flutter</li>
                <li>Node.js</li>
                <li>PostgreSQL</li>
                <li>Kubernetes</li>
                <li>Kafka</li>
                <li>Spring Boot</li>
            </ul>
        )
    },
    {
        title: "Education",
        id: "education",
        content: (
            <ul className='list-disc pl-6'>
                <li>University of Illinois, Urbana-Champaign <i>(Master of Computer Science)</i></li>
                <ul>
                    <li>GPA: 3.43/4</li>
                </ul>
                <li>Vellore Institute of Technology, Amaravati <i>(Bachelor of Technology)</i></li>
                <ul>
                    <li>GPA: 8.9/10</li>
                </ul>
            </ul>
        )
    },
    {
        title: "Experience",
        id: "experience",
        content: (
            <ul className='list-disc pl-6'>
                <li><a href="https://drive.google.com/file/d/1SZIFZf47H7deDvB4KzyUtxK_eR4_hT5G/view"><i>Software Development Engineering Intern</i>, Logistics pod, Technology function, Blinkit (previously Grofers)</a></li>
                <li><i>Teaching Assistant</i>, ECE445 Senior Design Lab (under prof.Arne Fliflet), UIUC</li>
            </ul>
        )
    },
    {
        title: "Certifications",
        id: "certifications",
        content: (
            <ul className='list-disc pl-6'>
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
    // bg-gradient-to-br from-blue-600 via-purple-600 to-red-600
    return (
        <section className='text-white'  id="about">
            <div className='md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 sm:px-16'>
                <Image className='rounded-full bg-[#181818]' src='/images/Amritesh.jpeg' width={500} height={500} />
                <div className='mt-4 md:mt-0 text-left flex flex-col h-full'>
                    <h2 className='text-4xl font-bold text-white mb-4'>About Me</h2>
                    <p className='text-base lg:text-lg text-justify'>
                        I am a distributed systems engineer and backend developer with experience in technologies like Python,
                        Kafka, PostgreSQL, Docker, Kubernetes, React, Django, and more. I have a passion for creating resilient and
                        fault-tolerant systems. As a lifelong learner, I continuously expand my knowledge and skills including machine learning,
                        web development, and cloud technologies to take on new challenges. I am an excellent team player who approaches work in a punctual and efficient manner.
                    </p>
                    <div className='flex flex-row mt-5'>
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
                    </div>
                    <div className='mt-4'>
                        {TAB_DATA.find((t) => t.id === tab).content}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection