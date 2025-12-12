"use client";

import React from "react";
import { motion } from "framer-motion";

const workItems = [
    {
        id: 1,
        title: "AURA Teams Chatbot - Retrieval Hardening",
        status: "In progress",
        updated: "Oct 2024",
        summary:
            "Tightening RAG grounding for SharePoint/OneDrive content so answers stay scoped, fast, and safe inside Teams.",
        highlights: [
            "Optimizing chunking/embeddings for noisy PDFs and slide decks",
            "Adding guardrails for citation coverage and hallucination checks",
            "Profiling cold-start latency to keep replies snappy during peak hours",
        ],
        link: {
            href: "https://github.com/amritesh-dasari/",
            label: "Notes / PRs",
        },
    },
    {
        id: 2,
        title: "NOVA Teams Chatbot - Reliability Sprint",
        status: "Live",
        updated: "Sep 2024",
        summary:
            "Hardening ingestion of user-shared files with Azure Document Intelligence so Teams SSO sessions stay stable.",
        highlights: [
            "Improved retry/backoff for Graph API fetches and file parsing",
            "Built structured insights output with clearer action items",
            "Rolling out telemetry to watch drop-offs in long-running analyses",
        ],
        link: {
            href: "https://github.com/amritesh-dasari/",
            label: "Changelog",
        },
    },
    {
        id: 3,
        title: "Upcoming: Auth + Access UX",
        status: "Discovery",
        updated: "This month",
        summary:
            "Scoping a passkey-first sign-in and clearer authorization surface for future Teams apps.",
        highlights: [
            "Comparing passkey rollout vs. staged MFA prompts",
            "Mapping user journeys with least-privilege defaults",
            "Partnering with design on low-friction recovery flows",
        ],
        link: {
            href: "mailto:dmamritesh@gmail.com",
            label: "Discuss",
        },
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
    hover: { y: -6, scale: 1.01, transition: { duration: 0.25 } },
};

const CurrentWorkSection = () => {
    return (
        <section id="current-work" className="text-white mt-12 md:mt-16">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-3 mb-8 md:mb-12"
            >
                <p className="text-sm uppercase tracking-[0.2em] text-purple-300/80">
                    Now Shipping
                </p>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent">
                    Current Work
                </h2>
                <p className="text-[#ADB7BE] max-w-2xl">
                    A quick snapshot of what I&apos;m actively building and improving
                    right now. Kept lean so you see the most recent impact first.
                </p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="grid gap-6 md:grid-cols-3"
            >
                {workItems.map((item) => (
                    <motion.article
                        key={item.id}
                        variants={cardVariants}
                        whileHover="hover"
                        className="relative overflow-hidden rounded-2xl border border-purple-500/15 bg-gradient-to-br from-[#1a1a1f] via-[#14141a] to-[#0f0f15] p-[1px]"
                    >
                        <div className="flex h-full flex-col gap-4 rounded-2xl bg-[#0f0f15]/90 p-5 shadow-2xl shadow-purple-900/20">
                            <div className="flex items-center justify-between gap-3">
                                <span className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-200 uppercase tracking-wide">
                                    {item.status}
                                </span>
                                <span className="text-xs text-[#8a8f99]">
                                    Updated {item.updated}
                                </span>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold text-white">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-[#CBD5E1] leading-relaxed">
                                    {item.summary}
                                </p>
                            </div>
                            <ul className="space-y-2 text-sm text-[#A7B3C2] list-disc list-inside">
                                {item.highlights.map((point, idx) => (
                                    <li key={idx}>{point}</li>
                                ))}
                            </ul>
                            <div className="pt-2">
                                <a
                                    className="inline-flex items-center gap-1 text-sm font-semibold text-blue-200 hover:text-white transition-colors duration-200"
                                    href={item.link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {item.link.label} <span aria-hidden="true">-&gt;</span>
                                </a>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </motion.div>
        </section>
    );
};

export default CurrentWorkSection;
