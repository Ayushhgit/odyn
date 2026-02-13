"use client";

import React from "react";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="py-16 bg-[#020202] relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col items-start gap-4">
                        <div className="flex items-center gap-3">
                            <Image src="/odyn_logo.png" alt="Odyn" width={32} height={32} className="rounded-lg shadow-lg" />
                            <span className="text-white font-bold text-xl tracking-tight">Odyn</span>
                        </div>
                        <p className="text-white/30 text-sm max-w-xs">
                            The programmable motion graphics platform. Build cinematic video content with AI and Remotion.
                        </p>
                    </div>

                    <div className="flex gap-12 text-sm font-medium text-white/40">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">GitHub</a>
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    </div>
                </div>

                <div className="pt-8 mt-12 border-t border-white/[0.04] text-center text-sm text-white/20">
                    © {new Date().getFullYear()} Odyn. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
