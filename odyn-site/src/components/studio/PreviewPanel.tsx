"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Download, Pencil, Copy, Film, Clock, Check, User, Sparkles, Loader2 } from "lucide-react";

export interface ChatMessage {
    id: string;
    type: "user" | "system";
    text: string;
    status?: "rendering" | "complete";
    progress?: number;
}

interface ChatAreaProps {
    messages: ChatMessage[];
}

export default function ChatArea({ messages }: ChatAreaProps) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, messages[messages.length - 1]?.progress]);

    if (messages.length === 0) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center px-6 overflow-y-auto">
                <div className="text-center max-w-lg">
                    <div className="w-24 h-24 rounded-3xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-8">
                        <Sparkles className="w-10 h-10 text-white/10" />
                    </div>
                    <h2 className="text-2xl font-semibold text-white/60 mb-3">Create Motion Graphics</h2>
                    <p className="text-base text-white/25 leading-relaxed mb-10">
                        Describe your video in the prompt below and hit Enter.<br />
                        We'll generate professional motion graphics in seconds.
                    </p>
                    <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                        {[
                            "Cinematic YouTube Intro",
                            "Podcast Lower Third",
                            "Neon Reel Opener",
                            "Animated Quote Card",
                        ].map((t) => (
                            <div
                                key={t}
                                className="px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] text-sm text-white/30 font-medium hover:bg-white/[0.06] hover:text-white/50 transition-colors cursor-pointer"
                            >
                                {t}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
            <div className="max-w-3xl mx-auto space-y-6">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {msg.type === "user" ? (
                            /* ── User Message ── */
                            <div className="flex items-start gap-4 justify-end">
                                <div className="max-w-[75%]">
                                    <div className="bg-indigo-500/15 border border-indigo-500/20 rounded-2xl rounded-tr-md px-5 py-4">
                                        <p className="text-[15px] text-white/80 leading-relaxed">{msg.text}</p>
                                    </div>
                                    <div className="text-[11px] text-white/20 mt-1.5 text-right pr-1">You</div>
                                </div>
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500/40 to-purple-600/40 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                                    <User className="w-4 h-4 text-white/60" />
                                </div>
                            </div>
                        ) : (
                            /* ── System Reply ── */
                            <div className="flex items-start gap-4">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500/30 to-indigo-600/30 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                                    <Sparkles className="w-4 h-4 text-indigo-400/70" />
                                </div>
                                <div className="max-w-[85%] w-full">
                                    {msg.status === "rendering" ? (
                                        /* Rendering State */
                                        <div className="rounded-2xl rounded-tl-md bg-white/[0.03] border border-white/[0.06] overflow-hidden">
                                            {/* Video placeholder */}
                                            <div className="relative aspect-video bg-gradient-to-br from-[#0c0c16] to-[#0e0e1c] flex items-center justify-center overflow-hidden">
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-indigo-500/8 rounded-full blur-[80px] render-pulse" />
                                                <div className="absolute top-1/3 right-1/3 w-[120px] h-[120px] bg-purple-500/6 rounded-full blur-[50px] render-pulse" style={{ animationDelay: "0.7s" }} />

                                                <div className="relative z-10 text-center">
                                                    <div className="w-14 h-14 mx-auto mb-4 relative">
                                                        <div className="absolute inset-0 rounded-full border-2 border-white/[0.06]" />
                                                        <motion.div
                                                            className="absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-500"
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                                                        />
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <Film className="w-5 h-5 text-indigo-400/50" />
                                                        </div>
                                                    </div>
                                                    <p className="text-white/40 text-sm font-medium">Rendering your motion…</p>
                                                </div>
                                            </div>

                                            {/* Progress bar */}
                                            <div className="px-5 py-4 border-t border-white/[0.04]">
                                                <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden mb-2">
                                                    <motion.div
                                                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                                                        initial={{ width: "0%" }}
                                                        animate={{ width: `${msg.progress || 0}%` }}
                                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                                    />
                                                </div>
                                                <div className="flex justify-between text-xs text-white/20 font-mono">
                                                    <span>{Math.round(msg.progress || 0)}%</span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        ~{Math.max(1, Math.round((100 - (msg.progress || 0)) / 10))}s
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        /* Complete State */
                                        <div className="rounded-2xl rounded-tl-md bg-white/[0.03] border border-white/[0.06] overflow-hidden">
                                            {/* Video */}
                                            <div className="relative aspect-video bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-[#0a0a12] flex items-center justify-center overflow-hidden group cursor-pointer">
                                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=450&fit=crop')] bg-cover bg-center opacity-25 mix-blend-overlay group-hover:scale-105 transition-transform duration-700" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                                                <button className="relative z-10 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:scale-110 hover:bg-white/20 transition-all duration-300 shadow-2xl">
                                                    <Play className="w-7 h-7 text-white ml-0.5" />
                                                </button>

                                                {/* Watermark */}
                                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 text-[10px] text-white/35 font-bold uppercase tracking-wider">
                                                    Odyn Free
                                                </div>

                                                {/* Seekbar */}
                                                <div className="absolute bottom-3 left-3 right-3">
                                                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                                        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-full rounded-full" />
                                                    </div>
                                                    <div className="flex justify-between mt-1.5 text-[10px] text-white/30 font-mono">
                                                        <span>00:00</span>
                                                        <span>00:05</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Info + Actions */}
                                            <div className="px-5 py-4 border-t border-white/[0.04]">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className="text-sm text-white/60 font-medium">render_output.mp4</span>
                                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                                    <span className="text-xs text-white/20 font-mono ml-auto">1280×720 • 30fps</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button className="flex-1 glow-btn text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm">
                                                        <Download className="w-4 h-4" />
                                                        Download MP4
                                                    </button>
                                                    <button className="px-4 py-3.5 rounded-xl studio-input text-white/50 hover:text-white hover:bg-white/[0.06] transition-all text-sm font-medium flex items-center gap-2">
                                                        <Pencil className="w-4 h-4" />
                                                        Edit
                                                    </button>
                                                    <button className="px-4 py-3.5 rounded-xl studio-input text-white/50 hover:text-white hover:bg-white/[0.06] transition-all text-sm font-medium">
                                                        <Copy className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="text-[11px] text-white/20 mt-1.5 pl-1">Odyn Studio</div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                ))}
                <div ref={bottomRef} />
            </div>
        </div>
    );
}
