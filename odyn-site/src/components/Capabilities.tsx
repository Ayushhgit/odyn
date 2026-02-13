"use client";

import React from "react";
import { motion } from "framer-motion";
import { Terminal, Code, Play, Video, Sparkles } from "lucide-react";

export default function Capabilities() {
    const features = [
        {
            title: "Deterministic Output",
            desc: "Unlike AI diffusion, Remotion generates programmable motion. The same prompt always produces the same result.",
            icon: <Terminal className="w-6 h-6" />
        },
        {
            title: "Code Export",
            desc: "Get the underlying React code. Edit timing, easing, and layers with developer precision.",
            icon: <Code className="w-6 h-6" />
        },
        {
            title: "Instant Preview",
            desc: "See changes in real-time. No waiting for renders to check if your timing is right.",
            icon: <Play className="w-6 h-6" />
        },
        {
            title: "Scale to 4K",
            desc: "Vector-based graphics scale infinitely. Render once, export in any resolution up to 4K60.",
            icon: <Video className="w-6 h-6" />
        }
    ];

    return (
        <section id="capabilities" className="py-24 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 mb-6"
                    >
                        <Sparkles className="w-3 h-3" />
                        <span>Why Odyn?</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-semibold mb-6"
                    >
                        Built for <span className="font-serif-italic text-gradient-bright">reliability</span>
                    </motion.h2>
                    <p className="text-lg text-white/40 leading-relaxed">Built on Remotion for reliable, scalable video generation without the chaos.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-3xl glass-panel hover:bg-white/[0.05] transition-all duration-300 group cursor-pointer"
                        >
                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0 group-hover:scale-110 transition-transform">
                                    {f.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-indigo-300 transition-colors">{f.title}</h3>
                                    <p className="text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">{f.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
