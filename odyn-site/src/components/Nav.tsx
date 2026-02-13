"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className="fixed top-6 inset-x-0 z-50 px-6 pointer-events-none">
            <div className="max-w-[1400px] mx-auto flex items-center justify-between pointer-events-auto">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3"
                >
                    <Image src="/odyn_logo.png" alt="Odyn" width={80} height={80} className="rounded-xl" />
                    <span className="text-white font-bold text-xl tracking-tight">Odyn</span>
                </motion.div>

                <motion.nav
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hidden md:flex items-center gap-1 bg-white/[0.03] backdrop-blur-md border border-white/[0.08] px-2 py-1.5 rounded-full"
                >
                    {["How it Works", "Templates", "API", "Docs"].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                            className="px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-full transition-all duration-300 font-medium"
                        >
                            {item}
                        </a>
                    ))}
                </motion.nav>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3"
                >
                    <button className="hidden md:block px-5 py-2.5 text-sm text-white/70 hover:text-white transition-colors font-medium bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-xl hover:bg-white/[0.08]">
                        Sign in
                    </button>
                    <Link href="/studio" className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300 inline-block">
                        Get Started
                    </Link>
                </motion.div>
            </div>
        </header>
    );
}
