"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, Loader2, Plus, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PromptInputProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    onGenerate: () => void;
    isRendering: boolean;
    template: string;
    setTemplate: (val: string) => void;
    resolution: string;
    setResolution: (val: string) => void;
    duration: number;
    setDuration: (val: number) => void;
    fps: number;
    setFps: (val: number) => void;
}

const placeholders = [
    "Cinematic YouTube intro for tech channel…",
    "Minimal lower third for podcast…",
    "Neon Instagram reel opener with glitch effects…",
    "Corporate product showcase with smooth transitions…",
    "Animated quote card with particle background…",
];

const MAX_CHARS = 500;

const templates = [
    { value: "intro", label: "Channel Intro" },
    { value: "lower-third", label: "Lower Third" },
    { value: "reel-opener", label: "Reel Opener" },
    { value: "quote-video", label: "Quote Video" },
];

export default function PromptInput({
    prompt, setPrompt, onGenerate, isRendering,
    template, setTemplate, resolution, setResolution,
    duration, setDuration, fps, setFps
}: PromptInputProps) {
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const el = textareaRef.current;
        if (el) {
            el.style.height = "28px";
            el.style.height = Math.min(el.scrollHeight, 160) + "px";
        }
    }, [prompt]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey && prompt.trim() && !isRendering) {
            e.preventDefault();
            onGenerate();
        }
    };

    return (
        <div className="bottom-input-bar px-5 py-4">
            <div className="max-w-3xl mx-auto">
                {/* Settings Panel */}
                <AnimatePresence>
                    {settingsOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden mb-3"
                        >
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-medium text-white/30 uppercase tracking-wider">Template</label>
                                    <select
                                        value={template}
                                        onChange={(e) => setTemplate(e.target.value)}
                                        className="w-full studio-input rounded-xl px-3 py-2.5 text-sm text-white select-styled cursor-pointer"
                                    >
                                        {templates.map((t) => (
                                            <option key={t.value} value={t.value} className="bg-[#0a0a0a]">{t.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-medium text-white/30 uppercase tracking-wider">Resolution</label>
                                    <div className="flex gap-1.5">
                                        <button
                                            onClick={() => setResolution("720p")}
                                            className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${resolution === "720p"
                                                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                                                    : "studio-input text-white/50"
                                                }`}
                                        >720p</button>
                                        <button
                                            onClick={() => setResolution("1080p")}
                                            className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-1 ${resolution === "1080p"
                                                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                                                    : "studio-input text-white/50"
                                                }`}
                                        >1080p <Lock className="w-3 h-3 text-amber-400/50" /></button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-medium text-white/30 uppercase tracking-wider">Duration</label>
                                    <div className="relative">
                                        <input
                                            type="number" min={1} max={60} value={duration}
                                            onChange={(e) => setDuration(Math.min(60, Math.max(1, parseInt(e.target.value) || 1)))}
                                            className="w-full studio-input rounded-xl px-3 py-2.5 text-sm text-white pr-9 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/25">sec</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-medium text-white/30 uppercase tracking-wider">Frame Rate</label>
                                    <div className="flex gap-1.5">
                                        <button
                                            onClick={() => setFps(30)}
                                            className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${fps === 30 ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30" : "studio-input text-white/50"
                                                }`}
                                        >30fps</button>
                                        <button
                                            onClick={() => setFps(60)}
                                            className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${fps === 60 ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30" : "studio-input text-white/50"
                                                }`}
                                        >60fps</button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Input Bar */}
                <div className="flex items-end gap-3 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 py-4 focus-within:border-white/[0.15] transition-colors">
                    <button
                        onClick={() => setSettingsOpen(!settingsOpen)}
                        className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${settingsOpen
                                ? "bg-indigo-500/20 text-indigo-400 rotate-45"
                                : "bg-white/[0.06] text-white/40 hover:text-white/60 hover:bg-white/[0.08]"
                            }`}
                    >
                        <Plus className="w-5 h-5" />
                    </button>

                    <textarea
                        ref={textareaRef}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value.slice(0, MAX_CHARS))}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholders[placeholderIndex]}
                        rows={1}
                        className="flex-1 bg-transparent text-white text-[15px] resize-none placeholder:text-white/20 focus:outline-none leading-7 max-h-[160px] font-medium"
                    />

                    {prompt.length > 0 && (
                        <span className={`shrink-0 text-xs font-mono self-end pb-1 ${prompt.length > MAX_CHARS * 0.9 ? "text-amber-400" : "text-white/20"
                            }`}>
                            {prompt.length}/{MAX_CHARS}
                        </span>
                    )}

                    <button
                        onClick={onGenerate}
                        disabled={!prompt.trim() || isRendering}
                        className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-white text-black hover:bg-white/90"
                    >
                        {isRendering ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Send className="w-5 h-5" />
                        )}
                    </button>
                </div>

                <div className="text-center mt-2.5">
                    <span className="text-xs text-white/15">Odyn generates motion graphics using Remotion. Results are deterministic.</span>
                </div>
            </div>
        </div>
    );
}
