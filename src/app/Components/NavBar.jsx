"use client";
import React, { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import NavLink from "./NavLink"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"
import MenuOverlay from "./MenuOverlay";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { isBlogEnabled } from "../lib/featureFlags";

const baseNavLinks = [
    { title: "Home", href: "/#home", sectionId: "home" },
    { title: "Latest Work", href: "/#latest-work", sectionId: "latest-work", requiresBlog: true },
    { title: "About", href: "/#about", sectionId: "about" },
    { title: "Projects", href: "/projects" },
    { title: "Blog", href: "/blog", requiresBlog: true },
];

const NavBar = () => {
    const pathname = usePathname();
    const navLinks = useMemo(
        () => baseNavLinks.filter((link) => (link.requiresBlog ? isBlogEnabled : true)),
        [isBlogEnabled]
    );
    const sectionLinks = useMemo(() => navLinks.filter((link) => link.sectionId), [navLinks]);
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState(
        pathname === "/" ? sectionLinks[0]?.sectionId ?? "" : ""
    );
    const ignoreObserverRef = useRef(false);

    const navVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
    };

    const linkVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    const menuVariants = {
        closed: { opacity: 0, scale: 0.95 },
        open: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    };

    useEffect(() => {
        const sections = sectionLinks
            .map((link) => document.getElementById(link.sectionId))
            .filter(Boolean);
        if (!sections.length) return undefined;

        const thresholds = Array.from({ length: 101 }, (_, i) => i / 100);
        const observer = new IntersectionObserver(
            (entries) => {
                if (ignoreObserverRef.current) return;

                // If user is at the very top, ensure Home is active
                if (
                    typeof window !== "undefined" &&
                    (window.scrollY || window.pageYOffset) <= 40 &&
                    sectionLinks[0]
                ) {
                    setActiveSection(sectionLinks[0].sectionId);
                    return;
                }

                // Pick the entry with the largest intersectionRatio
                let best = entries.reduce((acc, entry) => {
                    if (!acc) return entry;
                    if (entry.intersectionRatio > acc.intersectionRatio) return entry;
                    if (entry.intersectionRatio === acc.intersectionRatio) {
                        // prefer the one closest to the top of the viewport
                        return Math.abs(entry.boundingClientRect.top) < Math.abs(acc.boundingClientRect.top) ? entry : acc;
                    }
                    return acc;
                }, null);

                if (best && best.isIntersecting) {
                    setActiveSection(best.target.id);
                    return;
                }

                // Fallback: when no entry is considered intersecting (slow/partial scroll),
                // pick the section whose top is nearest to the viewport top (prefer the one below the fold)
                const tops = sections.map((s) => ({ el: s, top: s.getBoundingClientRect().top }));
                const below = tops.filter((t) => t.top >= 0).sort((a, b) => a.top - b.top)[0];
                const above = tops.filter((t) => t.top < 0).sort((a, b) => b.top - a.top)[0];
                const candidate = below || above;
                if (candidate) setActiveSection(candidate.el.id);
            },
            { threshold: thresholds, rootMargin: "-40% 0px -40% 0px" }
        );

        sections.forEach((section) => observer.observe(section));
        return () => {
            observer.disconnect();
        };
    }, [sectionLinks]);

    const handleNavClick = (sectionId) => {
        ignoreObserverRef.current = true;
        setTimeout(() => {
            setActiveSection(sectionId);
            setTimeout(() => (ignoreObserverRef.current = false), 80);
        }, 450);
    };

    return (
        <motion.nav className='fixed top-0 left-0 right-0 z-10 bg-[#121212] bg-opacity-95 backdrop-blur-md border-b border-purple-500/10' initial="hidden" animate="visible" variants={navVariants}>
            <div className='flex flex-wrap items-center justify-between mx-auto px-4 py-2'>
                <motion.div variants={linkVariants}>
                    <Link href={'/'} className='text-2xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold hover:opacity-80 transition-opacity duration-300'>
                        {/* Home */}
                    </Link>
                </motion.div>

                <div className='mobile-menu block md:hidden'>
                    <motion.button onClick={() => setNavbarOpen(!navbarOpen)} className='flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white transition-colors duration-300' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        {!navbarOpen ? <Bars3Icon className='h-5 w-5' /> : <XMarkIcon className='h-5 w-5' />}
                    </motion.button>
                </div>

                <motion.div className='menu hidden md:block md:w-auto' id='navbar' variants={navVariants}>
                    <ul className='flex p-4 md:p-1 md:flex-row md:space-x-6 mt-0'>
                        {navLinks.map((link, index) => {
                            const isSectionLink = Boolean(link.sectionId);
                            const isActive = isSectionLink
                                ? activeSection === link.sectionId
                                : pathname === link.href;

                            return (
                                <motion.li key={index} variants={linkVariants} className="relative pb-1">
                                    {isActive && (
                                        <motion.span layoutId="navHighlight" className="absolute inset-x-1 inset-y-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-[2px] pointer-events-none" transition={{ type: "spring", stiffness: 260, damping: 30 }} />
                                    )}
                                    {isActive && (
                                        <motion.span layoutId="navUnderline" className="pointer-events-none absolute left-1 right-1 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-blue-400 to-purple-400" transition={{ type: "spring", stiffness: 260, damping: 30 }} />
                                    )}
                                    <NavLink
                                        href={link.href}
                                        title={link.title}
                                        active={isActive}
                                        onClick={isSectionLink ? () => handleNavClick(link.sectionId) : undefined}
                                        sectionId={link.sectionId}
                                        currentPath={pathname}
                                    />
                                </motion.li>
                            )
                        })}
                    </ul>
                </motion.div>
            </div>

            <motion.div variants={menuVariants} initial="closed" animate={navbarOpen ? "open" : "closed"}>
                {navbarOpen ? (
                    <MenuOverlay
                        links={navLinks}
                        activeSection={activeSection}
                        pathname={pathname}
                        onNavigate={() => setNavbarOpen(false)}
                    />
                ) : null}
            </motion.div>
        </motion.nav>
    )
}

export default NavBar
