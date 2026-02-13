"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Settings2, Lock } from "lucide-react";

interface AdvancedSettingsProps {
    template: string;
    setTemplate: (val: string) => void;
    resolution: string;
    setResolution: (val: string) => void;
    duration: number;
    setDuration: (val: number) => void;
    fps: number;
    setFps: (val: number) => void;
}

const templates = [
    { value: "intro", label: "Channel Intro" },
    { value: "lower-third", label: "Lower Third" },
    { value: "reel-opener", label: "Reel Opener" },
    { value: "quote-video", label: "Quote Video" },
];

export default function AdvancedSettings({
    template, setTemplate,
    resolution, setResolution,
    duration, setDuration,
    fps, setFps,
}: AdvancedSettingsProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="rounded-2xl studio-glass overflow-hidden">
            {/* Toggle Header */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors"
            >
                <div className="flex items-center gap-2.5">
                    <Settings2 className="w-4 h-4 text-white/40" />
                    <span className="text-sm font-medium text-white/60">Advanced Settings</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-white/30 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Expandable Content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5 pt-1 space-y-4 border-t border-white/[0.04]">
                            {/* Template */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Template</label>
                                <select
                                    value={template}
                                    onChange={(e) => setTemplate(e.target.value)}
                                    className="w-full studio-input rounded-xl px-4 py-3 text-sm text-white select-styled cursor-pointer"
                                >
                                    {templates.map((t) => (
                                        <option key={t.value} value={t.value} className="bg-[#0a0a0a]">
                                            {t.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Resolution */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Resolution</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => setResolution("720p")}
                                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${resolution === "720p"
                                                ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                                                : "studio-input text-white/60 hover:text-white/80"
                                            }`}
                                    >
                                        720p <span className="text-[10px] text-white/30 ml-1">Free</span>
                                    </button>
                                    <button
                                        onClick={() => setResolution("1080p")}
                                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${resolution === "1080p"
                                                ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                                                : "studio-input text-white/60 hover:text-white/80"
                                            }`}
                                    >
                                        1080p
                                        <Lock className="w-3 h-3 text-amber-400/60" />
                                        <span className="text-[10px] text-amber-400/60">Pro</span>
                                    </button>
                                </div>
                            </div>

                            {/* Duration + FPS Row */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Duration */}
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Duration</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            min={1}
                                            max={60}
                                            value={duration}
                                            onChange={(e) => setDuration(Math.min(60, Math.max(1, parseInt(e.target.value) || 1)))}
                                            className="w-full studio-input rounded-xl px-4 py-3 text-sm text-white pr-10 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/30">sec</span>
                                    </div>
                                </div>

                                {/* FPS */}
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Frame Rate</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => setFps(30)}
                                            className={`px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${fps === 30
                                                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                                                    : "studio-input text-white/60 hover:text-white/80"
                                                }`}
                                        >
                                            30fps
                                        </button>
                                        <button
                                            onClick={() => setFps(60)}
                                            className={`px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${fps === 60
                                                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                                                    : "studio-input text-white/60 hover:text-white/80"
                                                }`}
                                        >
                                            60fps
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
