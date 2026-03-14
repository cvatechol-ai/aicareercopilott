"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // On the landing page, hide navbar until the user scrolls past the top portion of the hero.
            if (pathname === "/") {
                setIsScrolled(window.scrollY > 300);
            } else {
                // On all other pages (form, dashboard), show the navbar immediately.
                setIsScrolled(true);
            }
        };

        // Check state on mount
        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [pathname]);

    const links = [
        { href: "/", label: "Home" },
        { href: "/form", label: "Get Roadmap" },
        { href: "/dashboard", label: "Dashboard" },
    ];

    return (
        <AnimatePresence>
            {isScrolled && (
                <motion.nav
                    initial={{ y: -50, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -50, opacity: 0, scale: 0.95 }}
                    transition={{ type: "tween", ease: "easeOut", duration: 0.35 }}
                    className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
                >
                    {/* Liquid Glass Floating Dock container */}
                    <div className="flex items-center gap-1.5 p-2 rounded-full bg-white/30 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/50 pointer-events-auto">
                        {links.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="relative px-6 py-2.5 rounded-full text-sm font-bold transition-colors duration-300 z-10"
                                >
                                    {/* The text itself */}
                                    <span
                                        className={`relative z-20 transition-colors duration-300 ${isActive
                                                ? "text-white drop-shadow-sm"
                                                : "text-[var(--color-text-muted)] hover:text-black"
                                            }`}
                                    >
                                        {link.label}
                                    </span>

                                    {/* Sliding Pill Animation for active active state */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-active-bubble"
                                            className="absolute inset-0 bg-gradient-to-r from-[#C8A951] to-[#D4B86A] rounded-full shadow-[0_2px_12px_rgba(200,169,81,0.4)] z-10"
                                            transition={{
                                                type: "spring",
                                                stiffness: 250,
                                                damping: 25,
                                                mass: 0.8
                                            }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
}
