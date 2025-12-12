"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { getFirestoreDb, hasFirebaseConfig, missingFirebaseKeys } from "../lib/firebaseClient";

const fallbackCards = [
    {
        id: "placeholder-1",
        title: "Add your first post",
        status: "Draft",
        updated: "—",
        summary: "Create a doc in the posts collection with published=true to show it here.",
        highlights: ["Set title, summary, highlights", "Flip published to true", "Add a CTA link"],
        link: { href: "/blog", label: "See blog" },
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

const resolveDate = (value) => {
    if (!value) return null;
    if (typeof value.toDate === "function") return value.toDate();
    if (value.seconds) return new Date(value.seconds * 1000);
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const formatDate = (value) => {
    const date = resolveDate(value);
    if (!date) return "Recently";
    return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date);
};

const mapPostToCard = (doc) => {
    const data = doc.data() || {};
    const card = data.card || {};
    const highlights = Array.isArray(card.highlights) ? card.highlights : [];
    const link = card.link || data.link || null;

    return {
        id: doc.id,
        title: data.title || "Untitled post",
        status: card.status || data.status || "Live",
        updated: card.updated || data.updated || data.createdAt,
        createdAt: data.createdAt,
        summary: card.summary || data.excerpt || data.content || "New post coming soon.",
        highlights: highlights.slice(0, 3),
        link: link || { href: "/blog", label: "Read more" },
    };
};

const LatestWorkSection = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!hasFirebaseConfig) {
            setError(
                `Add Firebase env vars (${missingFirebaseKeys.join(
                    ", "
                )}) to fetch your latest posts.`
            );
            setLoading(false);
            return undefined;
        }

        try {
            const db = getFirestoreDb();
            const postsQuery = query(
                collection(db, "posts"),
                where("published", "==", true),
                orderBy("createdAt", "desc"),
                limit(3)
            );

            const unsubscribe = onSnapshot(
                postsQuery,
                (snapshot) => {
                    const docs = snapshot.docs.map(mapPostToCard);
                    setItems(docs);
                    setLoading(false);
                },
                (err) => {
                    console.error("Failed to load latest posts", err);
                    setError("Unable to load posts. Check Firestore rules/index.");
                    setLoading(false);
                }
            );

            return () => unsubscribe();
        } catch (err) {
            console.error("Firestore init failed", err);
            setError("Firestore is not configured.");
            setLoading(false);
            return undefined;
        }
    }, []);

    const displayItems = useMemo(() => {
        if (items.length) return items;
        if (loading) return [{ id: "loading-1" }, { id: "loading-2" }, { id: "loading-3" }];
        return fallbackCards;
    }, [items, loading]);

    return (
        <section id="latest-work" className="text-white mt-12 md:mt-16">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-3 mb-8 md:mb-12"
            >
                <p className="text-sm uppercase tracking-[0.2em] text-purple-300/80">
                    Latest Work
                </p>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent">
                    Latest from the Blog
                </h2>
                <p className="text-[#ADB7BE] max-w-2xl">
                    Streaming the newest three published posts so visitors see what you shipped most recently.
                </p>
                {error && (
                    <p className="text-sm text-red-300/90">
                        {error}
                    </p>
                )}
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="grid gap-6 md:grid-cols-3"
            >
                {displayItems.map((item) => {
                    const isLoading = item.id?.startsWith("loading");
                    return (
                        <motion.article
                            key={item.id}
                            variants={cardVariants}
                            whileHover="hover"
                            className="relative overflow-hidden rounded-2xl border border-purple-500/15 bg-gradient-to-br from-[#1a1a1f] via-[#14141a] to-[#0f0f15] p-[1px]"
                        >
                            <div className="flex h-full flex-col gap-4 rounded-2xl bg-[#0f0f15]/90 p-5 shadow-2xl shadow-purple-900/20">
                                <div className="flex items-center justify-between gap-3">
                                    <span className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-200 uppercase tracking-wide">
                                        {isLoading ? "Loading" : item.status}
                                    </span>
                                    <span className="text-xs text-[#8a8f99]">
                                        {isLoading ? "…" : `Updated ${formatDate(item.updated || item.createdAt)}`}
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold text-white">
                                        {isLoading ? "Fetching post…" : item.title}
                                    </h3>
                                    <p className="text-sm text-[#CBD5E1] leading-relaxed">
                                        {isLoading ? "Loading summary..." : item.summary}
                                    </p>
                                </div>
                                <ul className="space-y-2 text-sm text-[#A7B3C2] list-disc list-inside">
                                    {isLoading
                                        ? [1, 2, 3].map((idx) => (
                                            <li key={idx} className="text-[#465066]">...</li>
                                        ))
                                        : (item.highlights || []).map((point, idx) => (
                                            <li key={idx}>{point}</li>
                                        ))}
                                </ul>
                                <div className="pt-2">
                                    <a
                                        className="inline-flex items-center gap-1 text-sm font-semibold text-blue-200 hover:text-white transition-colors duration-200"
                                        href={item.link?.href || "/blog"}
                                        target={item.link?.href?.startsWith("http") ? "_blank" : undefined}
                                        rel="noopener noreferrer"
                                    >
                                        {isLoading ? "Loading…" : item.link?.label || "Read more"}{" "}
                                        <span aria-hidden="true">-&gt;</span>
                                    </a>
                                </div>
                            </div>
                        </motion.article>
                    );
                })}
            </motion.div>
        </section>
    );
};

export default LatestWorkSection;
