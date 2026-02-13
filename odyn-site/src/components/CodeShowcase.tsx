"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code } from "lucide-react";

export default function CodeShowcase() {
    const codeSnippet = [
        { text: "import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';", color: "text-purple-400" },
        { text: "", color: "" },
        { text: "export const MySequence = () => {", color: "text-blue-400" },
        { text: "  const frame = useCurrentFrame();", color: "text-white" },
        { text: "  const opacity = interpolate(frame, [0, 30], [0, 1]);", color: "text-amber-300" },
        { text: "", color: "" },
        { text: "  return (", color: "text-blue-400" },
        { text: "    <AbsoluteFill style={{ opacity }}>", color: "text-white" },
        { text: "      <h1 className='text-6xl font-bold'>Hello World</h1>", color: "text-emerald-400" },
        { text: "    </AbsoluteFill>", color: "text-white" },
        { text: "  );", color: "text-blue-400" },
        { text: "};", color: "text-blue-400" },
    ];

    return (
        <section className="py-24 px-6 max-w-7xl mx-auto relative">
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="relative order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="rounded-2xl bg-[#0F0F11] border border-white/10 overflow-hidden shadow-2xl relative z-10"
                    >
                        <div className="flex items-center px-4 py-3 bg-white/[0.03] border-b border-white/[0.05]">
                            <div className="flex gap-2 mr-4">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                            </div>
                            <div className="text-xs text-white/30 font-mono">MyComposition.tsx</div>
                        </div>
                        <div className="p-6 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto">
                            <pre>
                                {codeSnippet.map((line, i) => (
                                    <div key={i} className={`${line.color || 'text-white/50'} py-0.5`}>
                                        {line.text || '\u00A0'}
                                    </div>
                                ))}
                            </pre>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-indigo-500/5 pointer-events-none" />
                    </motion.div>
                    {/* Decorative Elements */}
                    <div className="absolute -top-10 -left-10 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl animate-pulse-glow" />
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
                </div>

                <div className="order-1 lg:order-2">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300 mb-6">
                            <Code className="w-3 h-3" />
                            <span>Developer First</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-semibold mb-6">
                            Code is your <span className="font-serif-italic text-gradient-bright">canvas</span>
                        </h2>
                        <p className="text-lg text-white/40 mb-8 leading-relaxed">
                            Don't get locked into proprietary tools. Odyn generates clean, standard Remotion code.
                            <span className="text-white/70 block mt-4">
                                Check it into git. Review diffs. Integrate with CI/CD. It's just React.
                            </span>
                        </p>

                        <div className="flex flex-wrap gap-4">
                            {[
                                "TypeScript Support",
                                "Hot Reloading",
                                "NPM Ecosystem",
                                "Server Side Rendering"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-sm text-white/70">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
