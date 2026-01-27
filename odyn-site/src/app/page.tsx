"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Play,
  Code,
  Cpu,
  Cloud,
  Database,
  Zap,
  ArrowRight,
  Globe,
  Box,
  Layers,
  CloudLightning
} from "lucide-react";

export default function Page() {
  const pageRef = useRef<HTMLElement | null>(null);
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <main ref={pageRef} className="min-h-screen bg-[#060608] text-white antialiased">
      <GlobalStyles />
      <Nav />
      <Hero />
      <Why />
      <DemoSection />
      <Features />
      <Architecture />
      <Showcase />
      <Pricing />
      <FAQ />
      <FinalCta />
      <Footer />
    </main>
  );
}

function GlobalStyles() {
  return (
    <>
      <style jsx global>{`
        :root {
          --bg:#060608;
          --muted:#94a3b8;
          --glass: rgba(255,255,255,0.03);
          --accent1: #7c3aed;
          --accent2: #06b6d4;
        }
        html,body,#__next {height:100%}
        body {background:var(--bg);font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Helvetica Neue",Arial}
        .glass {background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));backdrop-filter: blur(6px);}
        .soft-shadow {box-shadow:0 6px 30px rgba(0,0,0,0.6)}
      `}</style>
    </>
  );
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-400 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M3 12h18" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M12 3v18" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="text-white font-semibold tracking-tight text-lg">Odyn</div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-[#93a0b2]">
          <a href="#demo" className="hover:text-white">Demo</a>
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#architecture" className="hover:text-white">Architecture</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
          <a href="#docs" className="hover:text-white">Docs</a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/8 text-sm">Sign in</button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-medium shadow-sm">
            Get Started
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -60]);
  return (
    <section className="relative pt-28 pb-28 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <GradientOrb />
        <Noise />
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div style={{ y }} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-3 px-3 py-1 bg-white/5 rounded-full text-xs text-white/80">
                <CloudLightning className="w-4 h-4 text-amber-300" />
                New: Gen-4 workflow previews
              </span>
              <h1 className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
                Create cinematic motion from language
                <span className="block mt-2 text-3xl font-normal text-[#94a3b8]">Instant previews. Deterministic templates. Cloud renders.</span>
              </h1>
              <p className="mt-6 text-lg text-[#93a0b2]">Odyn compiles prompts into deterministic motion systems and renders them at scale. Ship intros, ads, and social clips without editors.</p>
              <div className="mt-8 flex gap-4">
                <button className="inline-flex items-center gap-3 bg-white text-black px-5 py-3 rounded-full font-semibold shadow-sm">
                  Try Demo
                  <Play className="w-4 h-4" />
                </button>
                <button className="inline-flex items-center gap-3 border border-white/10 px-4 py-3 rounded-full text-sm text-white/90">Request Access</button>
              </div>
              <div className="mt-8 flex gap-4 items-center text-sm text-[#93a0b2]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 6v12" stroke="white" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  </div>
                  <span>Used by creative teams at leading studios</span>
                </div>
                <div className="h-6 w-px bg-white/6 mx-2" />
                <div className="text-white font-medium">120k renders/day</div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6">
            <DemoCanvas />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function GradientOrb() {
  return (
    <div className="absolute inset-0">
      <div className="absolute left-[-10%] top-[-10%] w-[55vw] h-[55vw] max-w-[900px] max-h-[900px] rounded-full filter blur-3xl opacity-60"
        style={{ background: "radial-gradient(circle at 20% 20%, rgba(124,58,237,0.18), transparent 20%), radial-gradient(circle at 80% 40%, rgba(6,182,212,0.12), transparent 20%)" }} />
      <div className="absolute right-[-10%] bottom-[-10%] w-[40vw] h-[40vw] max-w-[700px] max-h-[700px] rounded-full filter blur-2xl opacity-40"
        style={{ background: "radial-gradient(circle at 30% 30%, rgba(98,0,238,0.08), transparent 20%), radial-gradient(circle at 60% 60%, rgba(14,165,233,0.06), transparent 20%)" }} />
    </div>
  );
}

function Noise() {
  return <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')", mixBlendMode: "overlay" }} />;
}

function DemoCanvas() {
  const [prompt, setPrompt] = useState("A cinematic title sequence with glitch text and neon glow");
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let t: any;
    if (running) {
      setProgress(0);
      t = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(t);
            setRunning(false);
            return 100;
          }
          return Math.min(100, p + Math.random() * 12 + 6);
        });
      }, 300);
    } else {
      setProgress(0);
    }
    return () => clearInterval(t);
  }, [running]);

  return (
    <div className="rounded-2xl bg-gradient-to-br from-white/3 to-white/2 border border-white/6 p-6 soft-shadow">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <label className="text-xs text-[#93a0b2]">Prompt</label>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4}
            className="w-full mt-2 resize-none bg-black/40 border border-white/6 rounded-xl px-4 py-3 text-sm text-[#cfe8f0]" />
        </div>
        <div className="w-56">
          <div className="text-xs text-[#93a0b2]">Render</div>
          <div className="mt-2 rounded-xl bg-black/30 p-3 flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm text-[#cfe8f0]">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-green-300" />
                <span>Live Preview</span>
              </div>
              <div className="text-xs text-[#93a0b2]">HD</div>
            </div>
            <div className="h-28 bg-gradient-to-br from-indigo-600/12 to-purple-500/12 rounded-md flex items-center justify-center text-sm text-[#cfe8f0]">
              <div className="flex flex-col items-center">
                <div className="text-sm">Preview Canvas</div>
                <div className="mt-2 text-xs text-[#8fb8c2]">Frames & motion visible here</div>
              </div>
            </div>
            <div className="mt-2">
              <div className="w-full h-2 bg-white/8 rounded-full overflow-hidden relative">
                <div style={{ width: `${progress}%` }} className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-indigo-500 to-cyan-400" />
              </div>
            </div>
            <div className="mt-2 flex gap-2">
              <button onClick={() => setRunning(true)} className="flex-1 px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500">Run</button>
              <button onClick={() => { setRunning(false); setProgress(0); }} className="px-3 py-2 rounded-md border border-white/8">Reset</button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <MiniPreview label="Intro" color="from-indigo-500/12 to-purple-400/8" />
        <MiniPreview label="Lower Third" color="from-cyan-400/12 to-indigo-500/8" />
        <MiniPreview label="Quote" color="from-amber-400/8 to-red-400/8" />
      </div>
    </div>
  );
}

function MiniPreview({ label, color }: { label: string; color?: string }) {
  return (
    <div className={`rounded-lg p-3 bg-black/30 border border-white/6`} style={{ minHeight: 86 }}>
      <div className="text-xs text-[#93a0b2]">{label}</div>
      <div className="mt-2 h-16 rounded-md flex items-center justify-center text-sm text-[#cfe8f0]">
        Preview
      </div>
    </div>
  );
}

function Why() {
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

function DemoSection() {
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

function Features() {
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

function Architecture() {
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

function Showcase() {
  const items = [
    "Trailer sequence",
    "Podcast opener",
    "Product reveal",
    "Short-form reel"
  ];
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

function Pricing() {
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

function FAQ() {
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

function FinalCta() {
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

function Footer() {
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
