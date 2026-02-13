"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItemProps {
    q: string;
    a: string;
}

function FAQItem({ q, a }: FAQItemProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className={`rounded-2xl border transition-all duration-300 ${open ? "bg-white/[0.03] border-indigo-500/30" : "bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12]"}`}>
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.01] transition-colors rounded-2xl"
            >
                <span className={`font-medium transition-colors ${open ? "text-white" : "text-white/80"}`}>{q}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${open ? "bg-indigo-500/20 text-indigo-400 rotate-45" : "bg-white/5 text-white/40"}`}>
                    <span className="text-xl leading-none">+</span>
                </div>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 text-white/50 leading-relaxed border-t border-white/[0.04] pt-4 mt-2">
                            {a}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FAQ() {
    const faqs = [
        { q: "Do I need to know After Effects?", a: "No. Odyn uses natural language prompts and Remotion's programmatic approach. You describe what you want, we generate the code." },
        { q: "Can I edit the generated video?", a: "Yes. Unlike AI video generators, you get clean React code using Remotion. Developers can tweak timing, colors, and animation curves directly." },
        { q: "What resolutions are supported?", a: "Any resolution up to 4K. Since we generate vector-based motion graphics, you can render the same project at 1080p for web or 4K for broadcast." },
        { q: "Is there a limit on renders?", a: "Free tier includes 5 renders/month. Pro is unlimited. Studio adds priority queue and 4K batch processing." }
    ];

    return (
        <section id="faq" className="py-24 w-full">
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-4xl font-semibold text-center mb-16">Common <span className="font-serif-italic text-gradient-bright">questions</span></h2>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <FAQItem key={i} {...faq} />
                    ))}
                </div>
            </div>
        </section>
    );
}
