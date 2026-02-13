"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Video, Plus, Search, Layers, Film, CreditCard,
    ChevronDown, ChevronRight, User, LogOut, Settings,
    LayoutDashboard, Crown, ArrowRight, Check
} from "lucide-react";
import Link from "next/link";

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}

const recentProjects = [
    { name: "Tech Channel Intro", time: "2m ago", status: "complete" as const },
    { name: "Podcast Lower Third", time: "1h ago", status: "complete" as const },
    { name: "Neon Reel Opener", time: "Yesterday", status: "rendering" as const },
    { name: "Product Showcase", time: "2 days ago", status: "complete" as const },
    { name: "Quote Card Animation", time: "Last week", status: "complete" as const },
];

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
    const [avatarOpen, setAvatarOpen] = useState(false);
    const [recentsOpen, setRecentsOpen] = useState(true);

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={onToggle} />
            )}

            <aside
                className={`fixed top-0 left-0 h-full z-50 sidebar-bg flex flex-col transition-all duration-300 ${isOpen ? "w-[300px] translate-x-0" : "w-[300px] -translate-x-full lg:translate-x-0 lg:w-[300px]"
                    }`}
            >
                {/* ── 1. Logo Section ── */}
                <div className="px-5 pt-6 pb-4">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="logo-glow w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow duration-300">
                            <Video className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-white font-bold text-xl tracking-tight">Odyn</span>
                            <span className="px-1.5 py-0.5 rounded-md bg-indigo-500/15 text-[9px] font-bold text-indigo-400 uppercase tracking-widest border border-indigo-500/20">
                                Beta
                            </span>
                        </div>
                    </Link>
                </div>

                {/* ── 2. New Project Button ── */}
                <div className="px-4 mb-3">
                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        className="new-project-btn w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl text-sm text-indigo-200 font-semibold"
                    >
                        <Plus className="w-4.5 h-4.5" />
                        New Project
                    </motion.button>
                </div>

                {/* ── 3. Search Input ── */}
                <div className="px-4 mb-4">
                    <div className="search-glass flex items-center gap-2.5 rounded-xl px-3.5 py-2.5">
                        <Search className="w-4 h-4 text-white/20 shrink-0" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            className="flex-1 bg-transparent text-sm text-white/70 placeholder:text-white/20 focus:outline-none"
                        />
                        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08] text-[10px] text-white/25 font-mono shrink-0">
                            ⌘K
                        </kbd>
                    </div>
                </div>

                {/* ── 4. Navigation Items ── */}
                <div className="px-4">
                    <div className="px-3 mb-2 text-[10px] font-semibold text-white/20 uppercase tracking-[0.15em]">Workspace</div>
                    <div className="space-y-0.5">
                        {[
                            { icon: LayoutDashboard, label: "Dashboard", active: true },
                            { icon: Layers, label: "Templates", active: false },
                            { icon: Film, label: "My Videos", active: false },
                            { icon: CreditCard, label: "Billing", active: false },
                        ].map((item) => (
                            <button
                                key={item.label}
                                className={`nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium ${item.active ? "active text-white" : "text-white/40 hover:text-white/65"
                                    }`}
                            >
                                <span className="accent-bar" />
                                <item.icon className={`w-[18px] h-[18px] transition-colors duration-150 ${item.active ? "text-indigo-400" : ""}`} />
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Divider ── */}
                <div className="mx-5 my-3 h-px bg-white/[0.05]" />

                {/* ── 5. Recent Projects ── */}
                <div className="flex-1 overflow-y-auto px-4 min-h-0">
                    <button
                        onClick={() => setRecentsOpen(!recentsOpen)}
                        className="w-full flex items-center justify-between px-3 mb-1.5 group cursor-pointer"
                    >
                        <span className="text-[10px] font-semibold text-white/20 uppercase tracking-[0.15em] group-hover:text-white/30 transition-colors">
                            Recent
                        </span>
                        <ChevronDown className={`w-3 h-3 text-white/15 transition-transform duration-200 ${recentsOpen ? "" : "-rotate-90"}`} />
                    </button>

                    <AnimatePresence>
                        {recentsOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                            >
                                <div className="space-y-0.5">
                                    {recentProjects.map((p, i) => (
                                        <button
                                            key={i}
                                            className="project-item w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] group"
                                        >
                                            {/* Status dot */}
                                            <span className={`w-2 h-2 rounded-full shrink-0 ${p.status === "complete"
                                                    ? "bg-emerald-400/70"
                                                    : "bg-amber-400/70 animate-pulse"
                                                }`} />
                                            <span className="text-white/40 group-hover:text-white/70 truncate text-left font-medium transition-colors duration-150">
                                                {p.name}
                                            </span>
                                            <span className="text-[10px] text-white/15 shrink-0 ml-auto font-mono">
                                                {p.time}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ── 6. Upgrade Card ── */}
                <div className="px-4 pb-2">
                    <div className="upgrade-card rounded-2xl p-4">
                        <div className="relative z-10">
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-3">
                                <div className="crown-glow w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400/25 to-amber-500/15 flex items-center justify-center border border-amber-500/25">
                                    <Crown className="w-4 h-4 text-amber-400" />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-white">Upgrade to Pro</div>
                                    <div className="text-[11px] text-white/25">Unlock the full experience</div>
                                </div>
                            </div>

                            {/* Benefits */}
                            <div className="space-y-1.5 mb-4">
                                {[
                                    "1080p & 4K Export",
                                    "No Watermark",
                                    "Faster Queue",
                                ].map((b) => (
                                    <div key={b} className="flex items-center gap-2 text-[11px] text-white/35">
                                        <Check className="w-3 h-3 text-indigo-400/60 shrink-0" />
                                        {b}
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <motion.button
                                whileTap={{ scale: 0.98 }}
                                className="upgrade-btn w-full py-2.5 rounded-xl text-black font-semibold text-sm flex items-center justify-center gap-2"
                            >
                                Upgrade Now
                                <ArrowRight className="w-3.5 h-3.5 arrow-icon" />
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* ── 7. User Profile Section ── */}
                <div className="px-4 pb-4 pt-2 border-t border-white/[0.04]">
                    {/* Usage bar */}
                    <div className="px-1 mb-3 mt-3">
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] text-white/20 font-medium">Renders used</span>
                            <span className="text-[10px] text-white/25 font-mono">2 / 5</span>
                        </div>
                        <div className="usage-bar-track h-1 rounded-full overflow-hidden">
                            <div className="usage-bar-fill h-full rounded-full" style={{ width: "40%" }} />
                        </div>
                    </div>

                    {/* Profile */}
                    <div className="relative">
                        <button
                            onClick={() => setAvatarOpen(!avatarOpen)}
                            className="w-full flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/[0.03] transition-colors duration-150"
                        >
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500/50 to-purple-600/50 border border-white/10 flex items-center justify-center">
                                <User className="w-4 h-4 text-white/70" />
                            </div>
                            <div className="flex-1 text-left min-w-0">
                                <div className="text-[13px] font-semibold text-white/75 truncate">Ayrax</div>
                                <div className="flex items-center gap-1.5">
                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.06] text-[9px] text-white/30 font-semibold uppercase tracking-wider">
                                        Free
                                    </span>
                                </div>
                            </div>
                            <motion.div
                                animate={{ rotate: avatarOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronDown className="w-3.5 h-3.5 text-white/20" />
                            </motion.div>
                        </button>

                        <AnimatePresence>
                            {avatarOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setAvatarOpen(false)} />
                                    <motion.div
                                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute bottom-full left-0 right-0 mb-2 rounded-xl bg-[#141414] border border-white/[0.08] shadow-2xl shadow-black/60 overflow-hidden z-50"
                                    >
                                        <div className="p-1.5">
                                            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-[13px] text-white/50 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors duration-150">
                                                <Settings className="w-4 h-4" />
                                                Settings
                                            </button>
                                            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-[13px] text-white/50 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors duration-150">
                                                <LogOut className="w-4 h-4" />
                                                Sign out
                                            </button>
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </aside>
        </>
    );
}
