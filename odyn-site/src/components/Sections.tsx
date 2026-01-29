"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Code, Cpu, Cloud, Database, Zap, ArrowRight, Globe, Layers } from "lucide-react";

// ============================================================================
// HELPER COMPONENTS
// ============================================================================
function Benefit({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
    return (
        <div className="rounded-2xl p-6 glass border border-white/6 soft-shadow">
            <div className="flex items-center gap-4">
                <div className="bg-white/5 rounded-md p-3">{icon}</div>
                <div>
                    <div className="font-semibold">{title}</div>
                    <div className="mt-1 text-sm text-[#93a0b2]">{desc}</div>
                </div>
            </div>
        </div>
    );
}

function MiniPreview({ label }: { label: string }) {
    return (
        <div className="rounded-lg p-3 bg-black/30 border border-white/6" style={{ minHeight: 86 }}>
            <div className="text-xs text-[#93a0b2]">{label}</div>
            <div className="mt-2 h-16 rounded-md flex items-center justify-center text-sm text-[#cfe8f0]">
                Preview
            </div>
        </div>
    );
}

function FaqItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="rounded-xl border border-white/6 overflow-hidden">
            <button onClick={() => setOpen(!open)} className="w-full text-left px-6 py-4 flex justify-between items-center">
                <div className="text-sm font-medium">{q}</div>
                <div className="text-sm text-[#93a0b2]">{open ? "−" : "+"}</div>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 py-4 text-sm text-[#93a0b2]">
                        {a}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ============================================================================
// WHY SECTION
// ============================================================================
export function Why() {
    return (
        <section className="py-24">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Benefit icon={<Cpu className="w-6 h-6" />} title="Deterministic Templates" desc="Reliable outputs at scale that you can version and audit." />
                    <Benefit icon={<Zap className="w-6 h-6" />} title="Fast Cloud Renders" desc="Autoscaling render workers optimized for throughput and cost." />
                    <Benefit icon={<Layers className="w-6 h-6" />} title="Composable Systems" desc="Build motion graphs, reuse templates and share across teams." />
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// DEMO SECTION
// ============================================================================
export function DemoSection() {
    return (
        <section id="demo" className="py-20 border-t border-white/6">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7">
                        <h3 className="text-3xl font-semibold">Live demo, not screenshots</h3>
                        <p className="mt-3 text-[#93a0b2]">Interact with the compiler, adjust prompts and render settings, and preview outputs in real time.</p>
                        <div className="mt-6 flex gap-3">
                            <div className="rounded-md bg-white/6 px-4 py-3 flex items-center gap-3">
                                <Code className="w-5 h-5" />
                                <div className="text-sm">Prompt-driven APIs</div>
                            </div>
                            <div className="rounded-md bg-white/6 px-4 py-3 flex items-center gap-3">
                                <Cloud className="w-5 h-5" />
                                <div className="text-sm">Autoscale renders</div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-5">
                        <div className="rounded-2xl bg-gradient-to-br from-white/3 to-white/2 p-4 border border-white/6">
                            <div className="h-48 rounded-md bg-black/40 flex items-center justify-center text-sm text-[#cfe8f0]">Interactive demo panel</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// FEATURES SECTION
// ============================================================================
export function Features() {
    const list = [
        { title: "Prompt → Schema", text: "Structured JSON outputs from natural language." },
        { title: "Remotion Templates", text: "Code-based templates for deterministic motion." },
        { title: "Versioning", text: "Lock templates and roll back changes." },
        { title: "API", text: "Programmatic rendering and batch jobs." },
        { title: "Brand Kits", text: "Upload fonts, logos, colors for consistent renders." },
        { title: "Team Workflows", text: "Shared queues and role-based access." }
    ];
    return (
        <section id="features" className="py-20 bg-[#07070a] border-t border-white/6">
            <div className="max-w-7xl mx-auto px-6">
                <h3 className="text-3xl font-semibold">Features</h3>
                <p className="mt-3 text-[#93a0b2] max-w-2xl">Everything you need to build motion at scale without a timeline.</p>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {list.map((f, i) => (
                        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} key={i} className="rounded-2xl p-6 glass border border-white/6">
                            <div className="text-sm text-[#93a0b2]">{f.title}</div>
                            <div className="mt-2 text-sm text-[#cfe8f0]">{f.text}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// ARCHITECTURE SECTION
// ============================================================================
export function Architecture() {
    const layers = [
        { icon: <Cpu className="w-6 h-6" />, title: "LLM Layer", desc: "Contextual structured generation" },
        { icon: <Layers className="w-6 h-6" />, title: "Template Engine", desc: "Composable React motion graphs" },
        { icon: <Zap className="w-6 h-6" />, title: "Queue & Workers", desc: "BullMQ + Redis autoscaling" },
        { icon: <Database className="w-6 h-6" />, title: "Storage", desc: "Object storage with signed URLs" },
        { icon: <Cloud className="w-6 h-6" />, title: "Cloud Fabric", desc: "Autoscaled render fleet" },
        { icon: <Globe className="w-6 h-6" />, title: "Delivery", desc: "Edge CDN distribution" }
    ];
    return (
        <section id="architecture" className="py-20 border-t border-white/6">
            <div className="max-w-7xl mx-auto px-6">
                <h3 className="text-3xl font-semibold">Architecture</h3>
                <p className="mt-3 text-[#93a0b2]">Designed like infrastructure so creators can rely on it.</p>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {layers.map((l, i) => (
                        <motion.div key={i} whileHover={{ y: -6 }} className="rounded-2xl p-6 glass border border-white/6">
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-md bg-white/5">{l.icon}</div>
                                <div>
                                    <div className="font-semibold">{l.title}</div>
                                    <div className="mt-1 text-sm text-[#93a0b2]">{l.desc}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// SHOWCASE SECTION
// ============================================================================
export function Showcase() {
    const items = ["Trailer sequence", "Podcast opener", "Product reveal", "Short-form reel"];
    return (
        <section className="py-20 bg-[#07070a] border-t border-white/6">
            <div className="max-w-7xl mx-auto px-6">
                <h3 className="text-3xl font-semibold">Showcase</h3>
                <p className="mt-3 text-[#93a0b2]">Examples produced by Odyn</p>
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {items.map((s, i) => (
                        <motion.div key={i} whileHover={{ scale: 1.03 }} className="rounded-md p-6 bg-gradient-to-br from-indigo-600/6 to-cyan-400/6 border border-white/6 flex items-end">
                            <div className="text-sm text-[#e6f6fb]">{s}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// PRICING SECTION
// ============================================================================
export function Pricing() {
    const plans = [
        { name: "Starter", price: "0", list: ["Watermarked", "720p", "Community queue"], popular: false },
        { name: "Pro", price: "399", list: ["No watermark", "1080p", "Priority queue"], popular: true },
        { name: "Studio", price: "1499", list: ["4K", "API access", "Team seats"], popular: false }
    ];
    return (
        <section className="py-20 border-t border-white/6">
            <div className="max-w-7xl mx-auto px-6">
                <h3 className="text-3xl font-semibold">Pricing</h3>
                <p className="mt-3 text-[#93a0b2]">Simple, transparent pricing</p>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {plans.map((p, i) => (
                        <motion.div key={i} whileHover={{ y: -6 }} className={`rounded-2xl p-6 border ${p.popular ? "border-indigo-500/40 bg-indigo-500/8" : "border-white/6"} glass`}>
                            <div className="flex items-center justify-between">
                                <div className="font-semibold text-lg">{p.name}</div>
                                <div className="text-2xl font-bold">₹{p.price}</div>
                            </div>
                            <ul className="mt-4 space-y-2 text-sm text-[#93a0b2]">
                                {p.list.map((l, j) => <li key={j}>• {l}</li>)}
                            </ul>
                            <div className="mt-6">
                                <button className={`w-full py-3 rounded-full ${p.popular ? "bg-indigo-600 text-white" : "border border-white/8"}`}>{p.popular ? "Get Pro" : "Choose"}</button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// FAQ SECTION
// ============================================================================
export function FAQ() {
    const questions = [
        { q: "How do I get started?", a: "Sign up, try the demo, and request studio access." },
        { q: "Can I use my fonts?", a: "Yes, brand kits allow fonts, logos, and colors." },
        { q: "Can I self-host?", a: "We offer enterprise deployment and hybrid options." }
    ];
    return (
        <section className="py-20 bg-[#07070a] border-t border-white/6">
            <div className="max-w-5xl mx-auto px-6">
                <h3 className="text-3xl font-semibold">FAQ</h3>
                <div className="mt-6 space-y-4">
                    {questions.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// FINAL CTA SECTION
// ============================================================================
export function FinalCta() {
    return (
        <section className="py-20 border-t border-white/6">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h3 className="text-4xl font-semibold">Launch your first render</h3>
                <p className="mt-3 text-[#93a0b2]">Join creators building with Odyn today.</p>
                <div className="mt-6">
                    <button className="inline-flex items-center gap-3 px-6 py-3 bg-white text-black rounded-full font-semibold">
                        Start free
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// FOOTER
// ============================================================================
export function Footer() {
    return (
        <footer className="py-12 border-t border-white/6">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-sm text-[#93a0b2]">© {new Date().getFullYear()} Odyn Systems</div>
                <div className="flex gap-4 text-sm text-[#93a0b2]">
                    <a>Terms</a>
                    <a>Privacy</a>
                </div>
            </div>
        </footer>
    );
}
