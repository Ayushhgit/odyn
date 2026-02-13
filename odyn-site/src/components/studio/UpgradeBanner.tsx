"use client";

import React from "react";
import { motion } from "framer-motion";
import { Crown, ArrowRight, Zap } from "lucide-react";

export default function UpgradeBanner() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl upgrade-border bg-gradient-to-br from-indigo-500/[0.06] to-purple-500/[0.04] p-5 relative overflow-hidden"
        >
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[40px] pointer-events-none" />

            <div className="relative z-10">
                <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20">
                        <Crown className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-1">Upgrade to Pro</h4>
                        <p className="text-xs text-white/35 leading-relaxed">
                            Remove watermarks, unlock 1080p/4K, unlimited renders, and priority processing.
                        </p>
                    </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {["No watermark", "1080p & 4K", "Unlimited renders"].map((f) => (
                        <span key={f} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[10px] text-white/50 font-medium">
                            <Zap className="w-2.5 h-2.5 text-amber-400/60" />
                            {f}
                        </span>
                    ))}
                </div>

                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500/90 to-amber-600/90 text-black font-semibold text-sm flex items-center justify-center gap-2 hover:from-amber-400/90 hover:to-amber-500/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                    Upgrade Now
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    );
}
