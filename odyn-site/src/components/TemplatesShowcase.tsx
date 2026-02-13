"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

interface Template {
    name: string;
    duration: string;
    style: string;
    popular: boolean;
}

export default function TemplatesShowcase() {
    const templates: Template[] = [
        { name: "Channel Intro", duration: "5s", style: "Cinematic", popular: true },
        { name: "Lower Third", duration: "3s", style: "Minimal", popular: false },
        { name: "Quote Card", duration: "10s", style: "Typographic", popular: false },
        { name: "Reel Opener", duration: "15s", style: "Dynamic", popular: true },
        { name: "Product Showcase", duration: "20s", style: "Corporate", popular: false },
        { name: "Subtitle Overlay", duration: "Variable", style: "Clean", popular: false }
    ];

    return (
        <section id="templates" className="py-24 px-6 max-w-7xl mx-auto relative">
            <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div>
                    <h2 className="text-4xl md:text-5xl font-semibold mb-4">Start with a <span className="font-serif-italic text-gradient-bright">foundation</span></h2>
                    <p className="text-white/40 text-lg">Start with a foundation, customize with prompts.</p>
                </div>
                <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/5 hover:bg-indigo-500/10 border border-indigo-500/20">
                    Browse all templates <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((t, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative aspect-[16/10] rounded-2xl overflow-hidden glass-panel cursor-pointer hover:border-indigo-500/30 transition-colors"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Play className="w-12 h-12 text-white/30 group-hover:text-white/80 group-hover:scale-110 transition-all duration-300" />
                        </div>
                        {t.popular && (
                            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-indigo-500/90 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm">
                                Popular
                            </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-semibold text-white text-lg mb-1 group-hover:text-indigo-300 transition-colors">{t.name}</div>
                                    <div className="text-xs text-white/50">{t.style} &bull; {t.duration}</div>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm border border-white/20">
                                    <ArrowRight className="w-4 h-4 text-white" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
