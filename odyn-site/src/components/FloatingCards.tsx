"use client";

import React, { useEffect, useState } from "react";
import { motion, useTransform } from "framer-motion";
import {
    Terminal,
    Layers,
    FileText,
    Video,
    Film,
    Play,
    Check,
    Download
} from "lucide-react";

export default function FloatingCards({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
    const x1 = useTransform(mouseX, [-20, 20], [-15, 15]);
    const y1 = useTransform(mouseY, [-20, 20], [-15, 15]);
    const x2 = useTransform(mouseX, [-20, 20], [10, -10]);
    const y2 = useTransform(mouseY, [-20, 20], [10, -10]);
    const x3 = useTransform(mouseX, [-20, 20], [-8, 8]);
    const y3 = useTransform(mouseY, [-20, 20], [-8, 8]);

    const [typedText, setTypedText] = useState("");
    const fullText = "A cinematic intro with glitch text and neon glow...";

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index <= fullText.length) {
                setTypedText(fullText.slice(0, index));
                index++;
            } else {
                setTimeout(() => {
                    index = 0;
                    setTypedText("");
                }, 2000);
            }
        }, 50);
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <motion.div
                style={{ x: x1, y: y1 }}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.4, type: "spring" }}
                className="absolute top-[15%] left-[2%] lg:left-[5%] z-20 pointer-events-auto animate-float-slow hidden md:block"
            >
                <div className="w-72 p-5 rounded-2xl glass-panel glass-panel-hover transition-all duration-500">
                    <div className="flex items-center gap-2 mb-4 text-white/40 text-xs uppercase tracking-wider">
                        <Terminal className="w-4 h-4" />
                        <span>Prompt Input</span>
                    </div>
                    <div className="space-y-3 font-mono text-sm">
                        <div className="h-2 bg-white/10 rounded-full w-full overflow-hidden">
                            <div className="h-full bg-indigo-500/50 rounded-full w-2/3 animate-pulse" />
                        </div>
                        <div className="p-3 rounded-lg bg-black/30 border border-white/10 text-white/70 text-xs leading-relaxed min-h-[60px]">
                            {typedText}
                            <span className="inline-block w-0.5 h-4 bg-indigo-400 ml-0.5 animate-pulse" />
                        </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                        {["4K", "Neon", "Cinematic"].map((tag) => (
                            <span key={tag} className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-white/60 border border-white/10 hover:bg-indigo-500/20 hover:border-indigo-500/30 transition-colors cursor-pointer">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>

            <motion.div
                style={{ x: x2, y: y2 }}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.6, type: "spring" }}
                className="absolute top-[55%] left-[0%] lg:left-[3%] z-20 pointer-events-auto animate-float-medium hidden md:block"
            >
                <div className="w-60 p-5 rounded-2xl glass-panel glass-panel-hover transition-all duration-500">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs text-white/40 font-medium">Templates</span>
                        <Layers className="w-4 h-4 text-white/30" />
                    </div>
                    <div className="space-y-2">
                        {[
                            { icon: Film, label: "Intro", active: false },
                            { icon: FileText, label: "Lower Third", active: true },
                            { icon: Video, label: "Reel Opener", active: false }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`p-3 rounded-lg flex items-center gap-3 cursor-pointer transition-all ${item.active
                                    ? "bg-indigo-500/20 border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                                    : "bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06]"
                                    }`}
                            >
                                <item.icon className={`w-4 h-4 ${item.active ? "text-indigo-400" : "text-white/50"}`} />
                                <span className={`text-sm ${item.active ? "text-white font-medium" : "text-white/70"}`}>
                                    {item.label}
                                </span>
                                {item.active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />}
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            <motion.div
                style={{ x: x3, y: y3 }}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.8, type: "spring" }}
                className="absolute top-[18%] right-[1%] lg:right-[4%] z-20 pointer-events-auto animate-float-slow hidden xl:block"
            >
                <div className="w-[400px] rounded-2xl overflow-hidden glass-panel glass-panel-hover transition-all duration-500 shadow-2xl">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] bg-white/[0.02]">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-red-500/80" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                            <div className="w-2 h-2 rounded-full bg-green-500/80" />
                        </div>
                        <span className="text-xs text-white/40 font-mono">Preview</span>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-xs font-medium text-green-400">Rendering...</span>
                        </div>
                    </div>

                    <div className="relative aspect-video bg-gradient-to-br from-indigo-900/30 to-purple-900/20 flex items-center justify-center overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=450&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent" />

                        <button className="relative z-10 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:scale-110 transition-all duration-300 group-hover:bg-white/20">
                            <Play className="w-6 h-6 text-white ml-1" />
                        </button>

                        <div className="absolute bottom-4 left-4 right-4">
                            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                />
                            </div>
                            <div className="flex justify-between mt-2 text-[10px] text-white/40 font-mono">
                                <span>00:00</span>
                                <span>00:15</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 flex items-center justify-between bg-black/20">
                        <div>
                            <div className="text-sm text-white/80 font-medium flex items-center gap-2">
                                final_render.mp4
                                <Check className="w-3 h-3 text-green-400" />
                            </div>
                            <div className="text-xs text-white/40 mt-0.5 font-mono">1920 &times; 1080 &bull; 30fps &bull; MP4</div>
                        </div>
                        <button className="p-2.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/30 transition-colors group">
                            <Download className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
