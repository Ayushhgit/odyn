"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
    return (
        <section className="py-32 px-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-transparent to-indigo-500/10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-sm text-indigo-300 mb-8"
                >
                    <Sparkles className="w-4 h-4" />
                    <span>Start for free today</span>
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-semibold mb-8 tracking-tight"
                >
                    Ready to streamline your <span className="font-serif-italic text-gradient-bright">production</span>?
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-white/40 mb-12 max-w-2xl mx-auto"
                >
                    Join creators generating motion graphics in seconds, not hours. No credit card required.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <button className="px-10 py-5 bg-white text-black rounded-full font-semibold text-lg hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)] transition-all duration-300 hover:scale-105 flex items-center gap-2">
                        Get started free
                        <ArrowRight className="w-5 h-5" />
                    </button>
                    <button className="px-10 py-5 border border-white/20 rounded-full font-semibold text-lg hover:bg-white/5 hover:border-white/30 transition-all duration-300 backdrop-blur-sm">
                        View documentation
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
