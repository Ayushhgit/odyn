"use client";

import React, { useRef, useCallback } from "react";
import { motion, useMotionValue } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import ParticleField from "./ParticleField";
import ConnectionLines from "./ConnectionLines";
import FloatingCards from "./FloatingCards";
import MagneticButton from "./MagneticButton";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) / 50);
        mouseY.set((e.clientY - centerY) / 50);
    }, [mouseX, mouseY]);

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-10 overflow-hidden"
        >
            <ParticleField />

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-indigo-500/[0.03] rounded-full blur-[150px] animate-pulse-glow" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/[0.03] rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
            </div>

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6">
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                    <ConnectionLines />
                    <FloatingCards mouseX={mouseX} mouseY={mouseY} />
                </div>

                <div className="relative z-20 flex flex-col items-center text-center max-w-2xl mx-auto pt-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8 hover:bg-indigo-500/20 transition-colors cursor-pointer group"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider group-hover:translate-x-0.5 transition-transform">Now in Beta v2.0</span>
                        <ArrowRight className="w-3 h-3 text-indigo-400" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1]"
                    >
                        Your{" "}
                        <span className="relative inline-block">
                            <span className="font-serif-italic text-gradient-bright">creative</span>
                            <motion.span
                                className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 1, delay: 0.8 }}
                            />
                            <motion.div
                                className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-indigo-500/40 blur-2xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                            />
                            <motion.div
                                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1.2, duration: 0.5 }}
                            />
                        </span>{" "}
                        <br className="hidden md:block" />
                        motion studio.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-8 text-xl md:text-2xl text-white/40 font-light leading-relaxed max-w-3xl"
                    >
                        Type a prompt. Get cinematic motion graphics in seconds.
                        <br className="hidden md:block" />
                        <span className="text-white/60">No After Effects. No templates. Just results.</span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="mt-10 flex flex-col sm:flex-row gap-4"
                    >
                        <MagneticButton>
                            <button className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium text-base hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-105">
                                Start creating free
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </MagneticButton>

                        <button className="group flex items-center gap-3 px-8 py-4 rounded-full font-medium text-base border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all duration-300 backdrop-blur-sm">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Play className="w-3 h-3 text-white ml-0.5" />
                            </div>
                            See it in action
                        </button>
                    </motion.div>


                </div>
            </div>
        </section>
    );
}
