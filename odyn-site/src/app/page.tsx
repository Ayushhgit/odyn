"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Play,
  Film,
  Type,
  Palette,
  Download,
  Cpu,
  Cloud,
  Users,
  Zap,
  Layers,
  Sparkles,
  Video,
  FileVideo
} from "lucide-react";

export default function Page() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#030303]" />;

  return (
    <main className="min-h-screen bg-[#030303] text-white antialiased overflow-x-hidden selection:bg-indigo-500/30">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@1,400;1,500;1,600&display=swap');
        
        .font-serif-italic {
          font-family: 'Playfair Display', serif;
          font-style: italic;
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(0.5deg); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes energy-flow {
          0% { stroke-dashoffset: 300; }
          100% { stroke-dashoffset: 0; }
        }
        
        @keyframes draw-line {
          0% { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }
        
        .animate-float-slow {
          animation: float-slow 7s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 5s ease-in-out infinite 0.5s;
        }
        
        .line-flow {
          stroke-dasharray: 20 80;
          animation: energy-flow 3s linear infinite;
        }
        
        .line-flow-slow {
          stroke-dasharray: 10 90;
          animation: energy-flow 4s linear infinite;
        }

        .glass-panel {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .neon-glow {
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.3), 0 0 40px rgba(99, 102, 241, 0.1);
        }
      `}</style>
      
      <Nav />
      <Hero />
      <LogoBar />
      <Features />
      <HowItWorks />
      <Templates />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#030303]/90 backdrop-blur-xl border-b border-white/[0.04]" : ""}`}>
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center neon-glow">
            <Video className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">MotionAI</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/50 font-medium">
          {["Templates", "Features", "Pricing", "API", "Docs"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors duration-300">
              {item}
            </a>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <button className="hidden md:block text-sm text-white/70 hover:text-white transition-colors">
            Sign in
          </button>
          <button className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold rounded-full transition-all duration-300 neon-glow">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-32 overflow-hidden">
      {/* Background */}
      <DotGrid />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-indigo-500/[0.03] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6">
        {/* Floating Cards & Lines Layer */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <ConnectionLines />
          <FloatingCards />
        </div>

        {/* Center Content */}
        <div className="relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto pt-16">
          {/* Announcement Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-10"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">New</span>
            </span>
            <span className="text-sm text-white/70">4K rendering now available</span>
            <ChevronRight className="w-3.5 h-3.5 text-white/50" />
          </motion.div>

          {/* Headline with Underlined Creative */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1]"
          >
            Your{' '}
            <span className="relative inline-block">
              <span className="font-serif-italic text-white">creative</span>
              {/* Animated Underline */}
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-400 to-indigo-500"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                style={{ originX: 0.5 }}
              />
              {/* Glow under line */}
              <motion.div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-indigo-500/30 blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              />
              {/* Convergence dot */}
              <motion.div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </span>{' '}
            <br className="hidden md:block" />
            motion studio.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-xl md:text-2xl text-white/40 font-light leading-relaxed max-w-2xl"
          >
            Type a prompt. Get cinematic motion graphics in seconds.
            <br className="hidden md:block" />
            Powered by Remotion. No After Effects required.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <button className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium text-base hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
              Start creating free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center gap-3 px-8 py-4 rounded-full font-medium text-base border border-white/10 hover:bg-white/5 transition-colors">
              <Play className="w-4 h-4" />
              Watch demo
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ConnectionLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        {/* Gradient for visible flowing lines */}
        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(99, 102, 241, 0)" />
          <stop offset="20%" stopColor="rgba(99, 102, 241, 0.8)" />
          <stop offset="50%" stopColor="rgba(168, 85, 247, 1)" />
          <stop offset="80%" stopColor="rgba(99, 102, 241, 0.8)" />
          <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
        </linearGradient>
        
        <filter id="lineGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Visible Base Curves - Thick and prominent */}
      <path
        d="M 15 30 C 30 35, 40 48, 50 52"
        fill="none"
        stroke="rgba(99, 102, 241, 0.2)"
        strokeWidth="0.5"
        filter="url(#lineGlow)"
      />
      <path
        d="M 15 75 C 30 68, 40 58, 50 52"
        fill="none"
        stroke="rgba(99, 102, 241, 0.2)"
        strokeWidth="0.5"
        filter="url(#lineGlow)"
      />
      <path
        d="M 50 52 C 65 48, 75 45, 88 50"
        fill="none"
        stroke="rgba(99, 102, 241, 0.2)"
        strokeWidth="0.6"
        filter="url(#lineGlow)"
      />

      {/* Animated Energy Lines - More visible flowing dashes */}
      <path
        d="M 15 30 C 30 35, 40 48, 50 52"
        fill="none"
        stroke="url(#flowGradient)"
        strokeWidth="0.8"
        filter="url(#lineGlow)"
        className="line-flow"
      />
      <path
        d="M 15 75 C 30 68, 40 58, 50 52"
        fill="none"
        stroke="url(#flowGradient)"
        strokeWidth="0.8"
        filter="url(#lineGlow)"
        className="line-flow-slow"
      />
      <path
        d="M 50 52 C 65 48, 75 45, 88 50"
        fill="none"
        stroke="url(#flowGradient)"
        strokeWidth="1"
        filter="url(#lineGlow)"
        className="line-flow"
        style={{ animationDuration: "2s" }}
      />

      {/* Nodes at start and end points */}
      <circle cx="15" cy="30" r="1" fill="rgba(99, 102, 241, 0.5)" />
      <circle cx="15" cy="75" r="1" fill="rgba(99, 102, 241, 0.5)" />
      <circle cx="88" cy="50" r="1.5" fill="rgba(168, 85, 247, 0.8)" filter="url(#lineGlow)" />
    </svg>
  );
}

function FloatingCards() {
  return (
    <>
      {/* Top Left - Prompt Input Card */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute top-[18%] left-[8%] md:left-[10%] z-20 pointer-events-auto animate-float-slow"
      >
        <div className="relative group">
          <div className="w-64 p-5 rounded-2xl glass-panel shadow-2xl transition-transform duration-500 hover:scale-105 border border-indigo-500/10">
            <div className="flex items-center gap-2 mb-3 text-white/40 text-xs uppercase tracking-wider">
              <Type className="w-3.5 h-3.5" />
              <span>Prompt Input</span>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-white/10 rounded-full w-full" />
              <div className="h-2 bg-white/10 rounded-full w-4/5" />
              <div className="h-2 bg-indigo-500/30 rounded-full w-3/5" />
            </div>
            <div className="mt-4 flex gap-2">
              <span className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-white/50">4K</span>
              <span className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-white/50">Neon</span>
              <span className="px-2 py-1 rounded-md bg-indigo-500/20 text-[10px] text-indigo-300">Generate</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Left - Template Selection */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute top-[50%] left-[5%] md:left-[8%] z-20 pointer-events-auto animate-float-medium"
      >
        <div className="relative group">
          <div className="w-52 p-4 rounded-2xl glass-panel shadow-2xl transition-transform duration-500 hover:scale-105">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-white/40">Templates</span>
              <Layers className="w-3.5 h-3.5 text-white/30" />
            </div>
            <div className="space-y-2">
              <div className="p-2 rounded-lg bg-white/5 border border-white/5 flex items-center gap-2">
                <Film className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-xs text-white/70">Intro</span>
              </div>
              <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-2">
                <Type className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-xs text-white">Lower Third</span>
              </div>
              <div className="p-2 rounded-lg bg-white/5 border border-white/5 flex items-center gap-2">
                <FileVideo className="w-3.5 h-3.5 text-white/40" />
                <span className="text-xs text-white/70">Reel Opener</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right - Video Output Preview */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute top-[20%] right-[5%] md:right-[8%] z-20 pointer-events-auto animate-float-slow"
      >
        <div className="relative group">
          <div className="w-80 rounded-2xl overflow-hidden glass-panel shadow-2xl border border-indigo-500/10">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              <span className="text-xs text-white/40">Preview</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] font-medium text-green-400">HD</span>
              </div>
            </div>
            
            {/* Video Preview Area */}
            <div className="relative aspect-video bg-gradient-to-br from-indigo-900/20 to-purple-900/20 flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=450&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay" />
              <div className="relative z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Play className="w-5 h-5 text-white ml-0.5" />
              </div>
              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                <div className="h-full w-2/3 bg-gradient-to-r from-indigo-500 to-purple-500" />
              </div>
            </div>
            
            {/* Info */}
            <div className="p-4 flex items-center justify-between">
              <div>
                <div className="text-xs text-white/70">Final render</div>
                <div className="text-[10px] text-white/40">1920 × 1080 • 30fps</div>
              </div>
              <button className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener("resize", resize);
    
    const spacing = 35;
    let mouseX = -1000;
    let mouseY = -1000;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          const distToMouse = Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2);
          const maxDist = 120;
          const proximity = Math.max(0, 1 - distToMouse / maxDist);
          
          let opacity = 0.025;
          opacity += proximity * 0.15;
          
          // Fade edges
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const distToCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
          const maxCenterDist = Math.sqrt(centerX ** 2 + centerY ** 2);
          opacity *= (1 - distToCenter / maxCenterDist * 0.6);
          
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fill();
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}

function LogoBar() {
  const logos = ["YouTube", "Netflix", "Adobe", "Spotify", "TikTok", "Instagram", "Vimeo", "Wistia"];
  
  return (
    <section className="py-10 border-y border-white/[0.04] bg-white/[0.01] overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#030303] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#030303] to-transparent z-10" />
      
      <div className="flex animate-scroll">
        {[...logos, ...logos].map((logo, i) => (
          <div key={i} className="flex-none px-12">
            <span className="text-base text-white/20 font-semibold tracking-wider uppercase">
              {logo}
            </span>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
      `}</style>
    </section>
  );
}

function Features() {
  const features = [
    { icon: <Sparkles className="w-5 h-5" />, title: "Prompt to Video", desc: "Type naturally, get cinematic motion graphics instantly" },
    { icon: <Film className="w-5 h-5" />, title: "Remotion Powered", desc: "Deterministic, programmable motion design logic" },
    { icon: <Layers className="w-5 h-5" />, title: "10+ Templates", desc: "Intros, lower thirds, subtitles, quote videos, reels" },
    { icon: <Zap className="w-5 h-5" />, title: "4K Renders", desc: "Studio quality exports in MP4, MOV formats" },
    { icon: <Cloud className="w-5 h-5" />, title: "Cloud Queue", desc: "Batch processing with priority rendering" },
    { icon: <Palette className="w-5 h-5" />, title: "Brand Kits", desc: "Save logos, colors, and fonts for consistency" }
  ];

  return (
    <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">Built for video creators</h2>
        <p className="text-white/40">Everything you need to create professional motion graphics without After Effects</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-indigo-500/20 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
              {f.icon}
            </div>
            <h3 className="font-medium text-white mb-1">{f.title}</h3>
            <p className="text-sm text-white/30">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { num: "01", title: "Write Prompt", desc: "Describe your video in natural language" },
    { num: "02", title: "Pick Template", desc: "Choose from cinematic presets" },
    { num: "03", title: "Generate", desc: "AI builds your motion graphics" },
    { num: "04", title: "Export", desc: "Download 4K MP4 instantly" }
  ];

  return (
    <section className="py-32 bg-white/[0.01] border-y border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">How it works</h2>
          <p className="text-white/40">From prompt to video in seconds</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="text-5xl font-bold text-white/5 mb-4">{step.num}</div>
              <h3 className="font-medium text-white mb-2">{step.title}</h3>
              <p className="text-sm text-white/30">{step.desc}</p>
              {i < 3 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Templates() {
  const templates = [
    { name: "Channel Intro", tag: "YouTube", color: "from-red-500/20 to-orange-500/10" },
    { name: "Lower Third", tag: "News", color: "from-blue-500/20 to-cyan-500/10" },
    { name: "Quote Video", tag: "Social", color: "from-purple-500/20 to-pink-500/10" },
    { name: "Reel Opener", tag: "Instagram", color: "from-indigo-500/20 to-purple-500/10" }
  ];

  return (
    <section id="templates" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Templates</h2>
          <p className="text-white/40">Professional starting points for any content</p>
        </div>
        <button className="mt-4 md:mt-0 text-sm text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
          View all templates <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {templates.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden glass-panel cursor-pointer hover:scale-[1.02] transition-transform"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${t.color} opacity-50`} />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="w-8 h-8 text-white/50 group-hover:text-white/80 group-hover:scale-110 transition-all" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="text-xs text-white/50 mb-1">{t.tag}</div>
              <div className="font-medium text-white">{t.name}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "0",
      period: "Forever",
      desc: "Perfect for trying out",
      features: ["Watermarked exports", "720p resolution", "5 renders/month", "Community support"],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Pro",
      price: "399",
      period: "/month",
      desc: "For serious creators",
      features: ["No watermark", "1080p & 4K", "Unlimited renders", "Priority queue", "API access"],
      cta: "Get Pro",
      popular: true
    },
    {
      name: "Studio",
      price: "1,499",
      period: "/month",
      desc: "For teams & agencies",
      features: ["Everything in Pro", "Custom templates", "Team collaboration", "Brand kits", "Dedicated support"],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-32 px-6 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">Simple pricing</h2>
        <p className="text-white/40">Upgrade or downgrade anytime. No hidden fees.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative rounded-3xl p-8 ${plan.popular ? 'bg-white text-black' : 'glass-panel'}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-500 text-white text-xs font-bold rounded-full">
                MOST POPULAR
              </div>
            )}
            
            <div className="mb-6">
              <h3 className={`text-lg font-semibold mb-1 ${plan.popular ? 'text-black' : 'text-white'}`}>
                {plan.name}
              </h3>
              <p className={`text-sm ${plan.popular ? 'text-black/50' : 'text-white/30'}`}>{plan.desc}</p>
            </div>
            
            <div className="mb-6">
              <span className={`text-4xl font-bold ${plan.popular ? 'text-black' : 'text-white'}`}>₹{plan.price}</span>
              <span className={plan.popular ? 'text-black/40' : 'text-white/30'}>{plan.period}</span>
            </div>
            
            <ul className="space-y-3 mb-8">
              {plan.features.map((f, j) => (
                <li key={j} className={`flex items-center gap-3 text-sm ${plan.popular ? 'text-black/60' : 'text-white/40'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${plan.popular ? 'bg-indigo-600' : 'bg-indigo-500'}`} />
                  {f}
                </li>
              ))}
            </ul>
            
            <button className={`w-full py-3 rounded-xl font-medium transition-colors ${plan.popular ? 'bg-black text-white hover:bg-black/90' : 'bg-white/10 text-white hover:bg-white/15'}`}>
              {plan.cta}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "How is this different from Canva or Runway?", a: "Unlike pixel-based tools, we use Remotion to generate deterministic, programmable motion design. You get editable code-based templates that render perfectly every time." },
    { q: "What video formats are supported?", a: "We export MP4 and MOV in 1080p and 4K resolution, at 30fps or 60fps. Pro and Studio plans support transparent backgrounds (Alpha channel)." },
    { q: "Can I use my own brand assets?", a: "Yes! Pro plans can upload logos, custom fonts, and set brand colors. Studio plans get advanced brand kits shared across team members." },
    { q: "Is there an API for bulk generation?", a: "Studio plans include full API access with webhooks, perfect for generating thousands of personalized videos programmatically." }
  ];

  return (
    <section className="py-32 bg-white/[0.01] border-y border-white/[0.04]">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">Questions?</h2>
        
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
      <button 
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="font-medium text-white/90">{q}</span>
        <span className={`text-2xl leading-none text-white/40 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-6 pb-6 text-white/50 leading-relaxed">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CTA() {
  return (
    <section className="py-32 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-indigo-500/5" />
      <div className="max-w-3xl mx-auto relative">
        <h2 className="text-4xl md:text-6xl font-semibold mb-6 tracking-tight">
          Ready to create?
        </h2>
        <p className="text-lg text-white/40 mb-10">
          Join thousands of YouTubers, podcasters, and editors using MotionAI.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-black rounded-full font-medium hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
            Start creating free
          </button>
          <button className="px-8 py-4 border border-white/10 rounded-full font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
            <Play className="w-4 h-4" />
            Watch demo
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 border-t border-white/[0.04] bg-[#020202]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-indigo-500 rounded flex items-center justify-center">
            <Video className="w-3 h-3 text-white" />
          </div>
          <span className="text-white font-semibold text-sm">MotionAI</span>
        </div>
        
        <div className="flex gap-8 text-sm text-white/30">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">API Docs</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
        
        <div className="text-sm text-white/20">
          © {new Date().getFullYear()} MotionAI
        </div>
      </div>
    </footer>
  );
}