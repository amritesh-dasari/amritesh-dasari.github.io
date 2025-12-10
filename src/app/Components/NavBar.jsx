"use client";
import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import NavLink from "./NavLink"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"
import MenuOverlay from "./MenuOverlay";
import { motion, useScroll, useSpring } from "framer-motion";

const navLinks = [
    {
        title: "About",
        path: "#about"
    },
    {
        title: "Projects",
        path: "#projects"
    },
    {
        title: "Contact",
        path: "#contact"
    }
]

const NavBar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [navHidden, setNavHidden] = useState(false);
    const [activeId, setActiveId] = useState(navLinks[0].path);
    const lastScrollY = useRef(0);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.15 });

    const navVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1,
            }
        },
        hiddenUp: {
            opacity: 0.9,
            y: -96,
            transition: { duration: 0.25 }
        }
    };

    const linkVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 }
        },
        hiddenUp: {
            opacity: 0,
            y: -12,
            transition: { duration: 0.2 }
        }
    };

    const menuVariants = {
        closed: { opacity: 0, scale: 0.95 },
        open: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.2 }
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const current = window.scrollY;
            const delta = current - lastScrollY.current;

            if (current < 16) {
                setNavHidden(false);
            } else if (delta > 8) {
                setNavHidden(true);
            } else if (delta < -8) {
                setNavHidden(false);
            }

            lastScrollY.current = current;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const sections = navLinks
            .map((link) => document.querySelector(link.path))
            .filter(Boolean);

        if (!sections.length) return undefined;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

                if (visible[0]) {
                    setActiveId(`#${visible[0].target.id}`);
                }
            },
            { threshold: 0.35 }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 right-0 h-[3px] origin-left z-20 bg-gradient-to-r from-blue-400 to-purple-400/80"
                style={{ scaleX }}
            />
            <motion.nav 
                className='fixed top-0 left-0 right-0 z-10 bg-[#121212] bg-opacity-95 backdrop-blur-md border-b border-purple-500/10'
                initial="hidden"
                animate={navHidden ? "hiddenUp" : "visible"}
                variants={navVariants}
            >
                <div className='flex flex-wrap items-center justify-between mx-auto px-4 py-2'>
                    <motion.div variants={linkVariants}>
                        <Link href={"/"} className='text-2xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold hover:opacity-80 transition-opacity duration-300'>
                            {/* Home */}
                        </Link>
                    </motion.div>

                    <div className='mobile-menu block md:hidden'>
                        <motion.button 
                            onClick={() => setNavbarOpen(!navbarOpen)}
                            className='flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white transition-colors duration-300'
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {!navbarOpen ? (
                                <Bars3Icon className='h-5 w-5' />
                            ) : (
                                <XMarkIcon className='h-5 w-5' />
                            )}
                        </motion.button>
                    </div>

                    <motion.div 
                        className='menu hidden md:block md:w-auto'
                        id='navbar'
                        variants={navVariants}
                    >
                        <ul className='flex p-4 md:p-1 md:flex-row md:space-x-6 mt-0'>
                            {navLinks.map((link, index) => {
                                const isActive = activeId === link.path;
                                return (
                                    <motion.li 
                                        key={index}
                                        variants={linkVariants}
                                        className="relative"
                                    >
                                        {isActive && (
                                            <motion.span
                                                layoutId="navHighlight"
                                                className="absolute inset-x-1 inset-y-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-[2px] pointer-events-none"
                                                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                                            />
                                        )}
                                        <NavLink href={link.path} title={link.title} active={isActive} />
                                    </motion.li>
                                )
                            })}
                        </ul>
                    </motion.div>
                </div>

                <motion.div
                    variants={menuVariants}
                    initial="closed"
                    animate={navbarOpen ? "open" : "closed"}
                >
                    {navbarOpen ? (
                        <MenuOverlay
                            links={navLinks}
                            activeId={activeId}
                            onNavigate={() => setNavbarOpen(false)}
                        />
                    ) : null}
                </motion.div>
            </motion.nav>
        </>
    )
}

export default NavBar
