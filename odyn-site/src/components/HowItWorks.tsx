"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Layers, Zap, Download } from "lucide-react";

export default function HowItWorks() {
    const steps = [
        {
            num: "01",
            title: "Define",
            desc: "Input your creative requirements. 'Cinematic intro, glitch style, 5 seconds'.",
            icon: <FileText className="w-5 h-5" />,
            color: "from-blue-500 to-indigo-500"
        },
        {
            num: "02",
            title: "Customize",
            desc: "Select aspect ratio, duration, and brand themes. AI suggests optimal motion patterns.",
            icon: <Layers className="w-5 h-5" />,
            color: "from-indigo-500 to-purple-500"
        },
        {
            num: "03",
            title: "Generate",
            desc: "Remotion compiles your video deterministically. No randomness, perfect pixels every time.",
            icon: <Zap className="w-5 h-5" />,
            color: "from-purple-500 to-pink-500"
        },
        {
            num: "04",
            title: "Export",
            desc: "Download MP4 in 1080p or 4K. Edit the React code if you need precise adjustments.",
            icon: <Download className="w-5 h-5" />,
            color: "from-pink-500 to-rose-500"
        }
    ];

    return (
        <section id="how-it-works" className="py-20 px-6 max-w-7xl mx-auto relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="text-center max-w-2xl mx-auto mb-24 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 mb-6"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    Process
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-semibold mb-6 tracking-tight"
                >
                    From prompt to <span className="text-gradient-bright">pixels</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-lg text-white/40"
                >
                    Four steps to professional motion graphics
                </motion.p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 relative">
                <div className="absolute top-12 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent hidden lg:block" />

                {steps.map((step, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 }}
                        className="relative"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-white mb-6 relative z-10 glass-panel shadow-lg">
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-20`} />
                            {step.icon}
                        </div>
                        <div className="text-7xl font-bold text-white/[0.03] absolute -top-4 -right-1 select-none">
                            {step.num}
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-white">{step.title}</h3>
                        <p className="text-sm text-white/40 leading-relaxed">{step.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
