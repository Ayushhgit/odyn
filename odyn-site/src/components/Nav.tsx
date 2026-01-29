"use client";

import { Zap } from "lucide-react";

export function Nav() {
    return (
        <header className="fixed inset-x-0 top-0 z-50 px-4 py-4">
            {/* Glassmorphic pill container */}
            <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-lg shadow-black/20">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-400 flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path d="M3 12h18" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            <path d="M12 3v18" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                    <span className="text-white font-semibold text-lg">
                        Odyn<span className="text-emerald-400">Lab</span>
                    </span>
                </div>

                {/* Nav Links */}
                <nav className="hidden md:flex items-center gap-8 text-sm text-gray-400">
                    <a href="#features" className="hover:text-white transition-colors flex items-center gap-1">
                        Features
                        <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </a>
                    <a href="#demo" className="hover:text-white transition-colors flex items-center gap-1">
                        Use Cases
                        <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </a>
                    <a href="#architecture" className="hover:text-white transition-colors flex items-center gap-1">
                        Resources
                        <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </a>
                    <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                    <button className="hidden md:inline-flex text-sm text-gray-300 hover:text-white transition-colors">
                        Sign in
                    </button>
                    <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-colors shadow-lg shadow-emerald-500/25">
                        <Zap className="w-4 h-4" />
                        Try Odyn Now
                    </button>
                </div>
            </div>
        </header>
    );
}
