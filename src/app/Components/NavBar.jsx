"use client";
import React, { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import NavLink from "./NavLink"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"
import MenuOverlay from "./MenuOverlay";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { fadeDown, staggerContainer } from "../lib/animations";

const navLinks = [
    { title: "Home", href: "/#home", sectionId: "home" },
    { title: "About", href: "/#about", sectionId: "about" },
    { title: "Projects", href: "/#projects", sectionId: "projects" },
    { title: "Contact", href: "/#contact", sectionId: "contact" },
];

const NavBar = () => {
    const pathname = usePathname();
    const sectionLinks = useMemo(() => navLinks.filter((link) => link.sectionId), []);
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState(
        pathname === "/" ? sectionLinks[0]?.sectionId ?? "" : ""
    );
    const ignoreObserverRef = useRef(false);

    const linkVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    const menuVariants = {
        closed: { opacity: 0, height: 0 },
        open: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
    };

    // Handle scroll for background change
    useEffect(() => {
        const scrollContainer = document.getElementById("page-scroll");
        const target = scrollContainer || window;
        const handleScroll = () => {
            const scrollTop = scrollContainer ? scrollContainer.scrollTop : window.scrollY;
            setScrolled(scrollTop > 50);
        };
        handleScroll();
        target.addEventListener('scroll', handleScroll);
        return () => target.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const scrollContainer = document.getElementById("page-scroll");
        const sections = sectionLinks
            .map((link) => document.getElementById(link.sectionId))
            .filter(Boolean);
        if (!sections.length) return undefined;

        const thresholds = Array.from({ length: 101 }, (_, i) => i / 100);
        const observer = new IntersectionObserver(
            (entries) => {
                if (ignoreObserverRef.current) return;

                if (
                    typeof window !== "undefined" &&
                    ((scrollContainer ? scrollContainer.scrollTop : window.scrollY || window.pageYOffset) <= 40) &&
                    sectionLinks[0]
                ) {
                    setActiveSection(sectionLinks[0].sectionId);
                    return;
                }

                let best = entries.reduce((acc, entry) => {
                    if (!acc) return entry;
                    if (entry.intersectionRatio > acc.intersectionRatio) return entry;
                    if (entry.intersectionRatio === acc.intersectionRatio) {
                        return Math.abs(entry.boundingClientRect.top) < Math.abs(acc.boundingClientRect.top) ? entry : acc;
                    }
                    return acc;
                }, null);

                if (best && best.isIntersecting) {
                    setActiveSection(best.target.id);
                    return;
                }

                const tops = sections.map((s) => ({ el: s, top: s.getBoundingClientRect().top }));
                const below = tops.filter((t) => t.top >= 0).sort((a, b) => a.top - b.top)[0];
                const above = tops.filter((t) => t.top < 0).sort((a, b) => b.top - a.top)[0];
                const candidate = below || above;
                if (candidate) setActiveSection(candidate.el.id);
            },
            {
                threshold: thresholds,
                root: scrollContainer || null,
                rootMargin: "-40% 0px -40% 0px"
            }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, [sectionLinks]);

    const handleNavClick = (sectionId) => {
        ignoreObserverRef.current = true;
        setTimeout(() => {
            setActiveSection(sectionId);
            setTimeout(() => (ignoreObserverRef.current = false), 80);
        }, 450);
    };

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-background-primary/80 backdrop-blur-md border-b border-border-subtle'
                    : 'bg-transparent'
            }`}
            initial="hidden"
            animate="visible"
            variants={fadeDown}
        >
            <div className='max-w-7xl mx-auto flex items-center justify-between px-6 py-5 w-full'>
                {/* Logo */}
                <Link
                    href='/'
                    className='text-text-primary font-display font-semibold text-xl tracking-[0.12em] hover:text-accent-primary transition-colors duration-300'
                >
                    MAD
                </Link>

                {/* Mobile menu button */}
                <div className='md:hidden'>
                    <button
                        onClick={() => setNavbarOpen(!navbarOpen)}
                        className='p-2 text-text-secondary hover:text-text-primary transition-colors duration-300'
                        aria-label="Toggle menu"
                    >
                        {!navbarOpen ? <Bars3Icon className='h-6 w-6' /> : <XMarkIcon className='h-6 w-6' />}
                    </button>
                </div>

                {/* Desktop navigation */}
                <motion.ul
                    className='hidden md:flex items-center gap-8'
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {navLinks.map((link, index) => {
                        const isSectionLink = Boolean(link.sectionId);
                        const isActive = isSectionLink
                            ? activeSection === link.sectionId
                            : pathname === link.href;

                        return (
                            <motion.li key={index} variants={linkVariants} className="relative">
                                <NavLink
                                    href={link.href}
                                    title={link.title}
                                    active={isActive}
                                    onClick={isSectionLink ? () => handleNavClick(link.sectionId) : undefined}
                                    sectionId={link.sectionId}
                                    currentPath={pathname}
                                />
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-indicator"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-primary rounded-full"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </motion.li>
                        )
                    })}
                </motion.ul>
            </div>

            {/* Mobile menu overlay */}
            <motion.div
                variants={menuVariants}
                initial="closed"
                animate={navbarOpen ? "open" : "closed"}
                className="md:hidden overflow-hidden bg-background-primary/95 backdrop-blur-md border-b border-border-subtle"
            >
                {navbarOpen && (
                    <MenuOverlay
                        links={navLinks}
                        activeSection={activeSection}
                        pathname={pathname}
                        onNavigate={() => setNavbarOpen(false)}
                    />
                )}
            </motion.div>
        </motion.nav>
    )
}

export default NavBar
