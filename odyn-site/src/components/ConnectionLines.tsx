"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ConnectionLines() {
    return (
        <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(99, 102, 241, 0)" />
                    <stop offset="50%" stopColor="rgba(168, 85, 247, 0.8)" />
                    <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
                </linearGradient>
            </defs>
            {[0, 1, 2].map((i) => (
                <motion.path
                    key={i}
                    d={`M ${15 + i * 5} ${30 + i * 15} C ${30 + i * 5} ${35 + i * 10}, 40 ${48 - i * 5}, 50 52`}
                    fill="none"
                    stroke="url(#grad1)"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
                />
            ))}
        </svg>
    );
}
