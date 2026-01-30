"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  Play,
  Image as ImageIcon,
  Zap,
  Cloud,
  Cpu,
  Database,
  Globe,
  Layers,
  X
} from "lucide-react";

export default function Page() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-[#030303]" />;
  }

  return (
    <main className="min-h-screen bg-[#030303] text-white antialiased overflow-x-hidden selection:bg-emerald-500/30">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@1,400;1,500&display=swap');
        
        .font-serif-italic {
          font-family: 'Playfair Display', serif;
          font-style: italic;
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(0.5deg); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        
        @keyframes energy-flow {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: -100; }
        }
        
        @keyframes energy-flow-slow {
          0% { stroke-dashoffset: 200; }
          100% { stroke-dashoffset: -200; }
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite 1s;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .energy-line {
          stroke-dasharray: 10 90;
          animation: energy-flow 4s linear infinite;
        }
        
        .energy-line-slow {
          stroke-dasharray: 5 95;
          animation: energy-flow-slow 6s linear infinite;
        }

        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .text-shadow-glow {
          text-shadow: 0 0 80px rgba(255,255,255,0.1);
        }
      `}</style>
      
      <Nav />
      <Hero />
      <LogoBar />
      <FeaturesSection />
      <ArchitectureSection />
      <PricingSection />
      <FAQSection />
      <FinalCTA />
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
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#030303]/80 backdrop-blur-xl border-b border-white/[0.04]" : ""}`}>
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
            <span className="text-black font-bold text-lg">F</span>
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">FLORA</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/50 font-medium">
          {["Company", "Enterprise", "Pricing", "Community", "Resources", "Careers"].map((item) => (
            <a key={item} href="#" className="hover:text-white transition-colors duration-300">
              {item}
            </a>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <button className="hidden md:block text-sm text-white/70 hover:text-white transition-colors">
            Contact sales
          </button>
          <button className="px-5 py-2.5 bg-[#10b981] hover:bg-[#059669] text-black text-sm font-semibold rounded-full transition-all duration-300">
            Get Started for free
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-32 overflow-hidden">
      {/* Dot Grid Background */}
      <DotGrid />
      
      {/* Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/[0.03] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-cyan-500/[0.02] rounded-full blur-[120px]" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 flex flex-col items-center">
        
        {/* Floating Cards Layer */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <FloatingCards />
          <ConnectionLines />
        </div>

        {/* Center Content */}
        <div className="relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto pt-12">
          {/* Announcement Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-10"
          >
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">New</span>
            </div>
            <span className="text-sm text-white/60">Inpaint, outpaint, and crop now live on FLORA</span>
            <button className="text-sm text-white hover:text-emerald-400 transition-colors flex items-center gap-0.5 ml-1">
              Try now <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1] text-shadow-glow"
          >
            Your <span className="font-serif-italic text-white/90">creative</span>
            <br />
            environment.
          </motion.h1>

          {/* Underline Glow Effect */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="relative w-[280px] h-[1px] mt-2 mb-8"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full blur-[4px] animate-pulse-glow" />
            {/* Convergence glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-8 bg-emerald-500/10 rounded-full blur-xl" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl text-white/40 font-light leading-relaxed max-w-xl"
          >
            Bring your ideas to life faster than ever before.
            <br />
            Every creative AI tool, one unified process.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10"
          >
            <button className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium text-base hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
              Get started for free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
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
    
    const spacing = 30;
    let mouseX = -1000;
    let mouseY = -1000;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      
      const cols = Math.ceil(canvas.width / spacing);
      const rows = Math.ceil(canvas.height / spacing);
      
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          
          const distToMouse = Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2);
          const maxDist = 150;
          const proximity = Math.max(0, 1 - distToMouse / maxDist);
          
          // Subtle wave
          const wave = Math.sin(frame * 0.02 + x * 0.01) * Math.cos(frame * 0.02 + y * 0.01) * 0.02;
          
          let opacity = 0.03 + wave;
          opacity += proximity * 0.15;
          
          // Fade edges
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const distToCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
          const maxCenterDist = Math.sqrt(centerX ** 2 + centerY ** 2);
          opacity *= (1 - distToCenter / maxCenterDist * 0.5);
          
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
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

function ConnectionLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        
        <filter id="glow">
          <feGaussianBlur stdDeviation="0.3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Top left to center */}
      <path
        d="M 18 28 C 30 35, 42 45, 50 52"
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="0.15"
      />
      <path
        d="M 18 28 C 30 35, 42 45, 50 52"
        fill="none"
        stroke="url(#lineGrad)"
        strokeWidth="0.3"
        filter="url(#glow)"
        className="energy-line"
      />
      
      {/* Bottom left to center */}
      <path
        d="M 18 72 C 30 65, 42 55, 50 52"
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="0.15"
      />
      <path
        d="M 18 72 C 30 65, 42 55, 50 52"
        fill="none"
        stroke="url(#lineGrad)"
        strokeWidth="0.3"
        filter="url(#glow)"
        className="energy-line-slow"
      />
      
      {/* Center to right */}
      <path
        d="M 50 52 C 60 48, 72 45, 82 52"
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="0.2"
      />
      <path
        d="M 50 52 C 60 48, 72 45, 82 52"
        fill="none"
        stroke="url(#lineGrad)"
        strokeWidth="0.4"
        filter="url(#glow)"
        className="energy-line"
        style={{ animationDuration: "3s" }}
      />
      
      {/* Center point */}
      <circle cx="50" cy="52" r="0.5" fill="white" filter="url(#glow)">
        <animate attributeName="r" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function FloatingCards() {
  return (
    <>
      {/* Top Left - Red Shoe Card */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute top-[15%] left-[8%] md:left-[12%] z-20 pointer-events-auto animate-float-slow"
      >
        <div className="relative group">
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden glass-panel shadow-2xl transition-transform duration-500 hover:scale-105">
            {/* Red Background */}
            <div className="absolute inset-0 bg-[#dc2626]" />
            
            {/* Shoe Image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full relative">
                 <img 
                  src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=400&fit=crop" 
                  alt="Red Shoe"
                  className="w-full h-full object-cover mix-blend-overlay opacity-90"
                />
              </div>
            </div>
            
            {/* Label */}
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10">
              <span className="text-xs font-semibold text-white">Monk Running</span>
            </div>
            
            {/* Percentage */}
            <div className="absolute top-4 right-4 text-xs font-medium text-white/80">60%</div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Left - Businessman Card */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute top-[45%] left-[5%] md:left-[10%] z-20 pointer-events-auto animate-float-medium"
      >
        <div className="relative group">
          <div className="w-40 h-52 md:w-44 md:h-60 rounded-2xl overflow-hidden glass-panel shadow-2xl transition-transform duration-500 hover:scale-105">
            <img 
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=500&fit=crop" 
              alt="Businessman"
              className="w-full h-full object-cover"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Label */}
            <div className="absolute top-4 left-4">
              <span className="text-xs font-medium text-white/90">Image Gen</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right - Output Card with Variants */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute top-[20%] right-[5%] md:right-[8%] z-20 pointer-events-auto animate-float-slow"
      >
        <div className="relative group">
          <div className="w-72 md:w-80 rounded-2xl overflow-hidden glass-panel shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <span className="text-xs font-medium text-white/60">Output</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-emerald-400">Live</span>
              </div>
            </div>
            
            {/* Main Image - Businessman */}
            <div className="relative h-48 bg-[#1a1a1a]">
              <img 
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop" 
                alt="Output"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent" />
            </div>
            
            {/* Thumbnail Grid */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-[#0a0a0a]">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#dc2626]">
                <img 
                  src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=200&h=150&fit=crop" 
                  alt="Variant 1"
                  className="w-full h-full object-cover mix-blend-overlay"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#84cc16]">
                <img 
                  src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=150&fit=crop" 
                  alt="Variant 2"
                  className="w-full h-full object-cover mix-blend-multiply"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white">
                <img 
                  src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=200&h=150&fit=crop" 
                  alt="Variant 3"
                  className="w-full h-full object-cover mix-blend-multiply"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

function LogoBar() {
  const logos = ["Kornely", "Alibaba", "Superside", "Stanford", "USC", "Milk", "Harvey", "R+V", "Tomorrow Bureau", "Journee", "Base", "BILT"];
  
  return (
    <section className="py-12 border-y border-white/[0.04] bg-white/[0.01] overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#030303] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#030303] to-transparent z-10" />
      
      <div className="flex animate-scroll hover:[animation-play-state:paused]">
        {[...logos, ...logos].map((logo, i) => (
          <div key={i} className="flex-none px-8 md:px-12">
            <span className="text-sm md:text-base text-white/20 font-medium tracking-wide uppercase whitespace-nowrap">
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
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    { icon: <Sparkles className="w-5 h-5" />, title: "Inpainting", desc: "Remove and replace elements with AI precision" },
    { icon: <Layers className="w-5 h-5" />, title: "Outpainting", desc: "Extend images beyond their boundaries" },
    { icon: <Zap className="w-5 h-5" />, title: "Smart Crop", desc: "AI-powered composition aware framing" },
    { icon: <Cloud className="w-5 h-5" />, title: "Cloud Sync", desc: "Real-time collaboration across devices" },
    { icon: <Cpu className="w-5 h-5" />, title: "4K Exports", desc: "High resolution output for any project" },
    { icon: <Database className="w-5 h-5" />, title: "Version History", desc: "Never lose your creative progress" }
  ];

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">Tools that work as one</h2>
        <p className="text-white/40">Seamlessly integrated AI tools for your creative workflow</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-white/[0.03] flex items-center justify-center text-white/40 mb-4 group-hover:text-emerald-400 transition-colors">
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

function ArchitectureSection() {
  return (
    <section className="py-32 bg-white/[0.01] border-y border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight">
              Built for the
              <br />
              <span className="text-white/40">future of creation</span>
            </h2>
            <p className="text-lg text-white/30 mb-8 leading-relaxed">
              Enterprise-grade infrastructure designed for creative teams. Scale from individual projects to studio-wide deployments.
            </p>
            
            <div className="space-y-4">
              {[
                { label: "Cloud GPU", value: "A100 H100" },
                { label: "Inference", value: "<100ms" },
                { label: "Uptime", value: "99.99%" }
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between py-4 border-b border-white/[0.06]">
                  <span className="text-white/40">{stat.label}</span>
                  <span className="text-white font-medium">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 mt-8">
              <div className="h-40 rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/20 p-6 flex flex-col justify-end">
                <Cloud className="w-6 h-6 text-emerald-400/60 mb-2" />
                <div className="text-sm font-medium text-white/80">Cloud Native</div>
              </div>
              <div className="h-48 rounded-2xl bg-cyan-500/[0.03] border border-cyan-500/20 p-6 flex flex-col justify-end">
                <Globe className="w-6 h-6 text-cyan-400/60 mb-2" />
                <div className="text-sm font-medium text-white/80">Global Edge</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-48 rounded-2xl bg-purple-500/[0.03] border border-purple-500/20 p-6 flex flex-col justify-end">
                <Cpu className="w-6 h-6 text-purple-400/60 mb-2" />
                <div className="text-sm font-medium text-white/80">AI Engine</div>
              </div>
              <div className="h-40 rounded-2xl bg-amber-500/[0.03] border border-amber-500/20 p-6 flex flex-col justify-end">
                <Database className="w-6 h-6 text-amber-400/60 mb-2" />
                <div className="text-sm font-medium text-white/80">Vector DB</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "0",
      desc: "For individuals exploring AI",
      features: ["Watermarked exports", "720p output", "Community support", "5 projects"],
      popular: false
    },
    {
      name: "Pro",
      price: "29",
      desc: "For professional creators",
      features: ["No watermark", "4K output", "Priority queue", "Unlimited projects", "API access"],
      popular: true
    },
    {
      name: "Studio",
      price: "99",
      desc: "For teams and studios",
      features: ["Everything in Pro", "8K output", "Custom models", "Team collaboration", "Dedicated support"],
      popular: false
    }
  ];

  return (
    <section className="py-32 px-6 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">Simple pricing</h2>
        <p className="text-white/40">Upgrade or downgrade at any time</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative rounded-3xl p-8 ${plan.popular ? 'bg-white text-black' : 'bg-white/[0.02] border border-white/[0.06]'}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-black text-xs font-bold rounded-full">
                MOST POPULAR
              </div>
            )}
            
            <div className="mb-6">
              <h3 className={`text-lg font-semibold mb-1 ${plan.popular ? 'text-black' : 'text-white'}`}>
                {plan.name}
              </h3>
              <p className={`text-sm ${plan.popular ? 'text-black/50' : 'text-white/30'}`}>
                {plan.desc}
              </p>
            </div>
            
            <div className="mb-6">
              <span className={`text-4xl font-bold ${plan.popular ? 'text-black' : 'text-white'}`}>
                ${plan.price}
              </span>
              <span className={plan.popular ? 'text-black/40' : 'text-white/30'}>/mo</span>
            </div>
            
            <ul className="space-y-3 mb-8">
              {plan.features.map((f, j) => (
                <li key={j} className={`flex items-center gap-3 text-sm ${plan.popular ? 'text-black/60' : 'text-white/40'}`}>
                  <div className={`w-1 h-1 rounded-full ${plan.popular ? 'bg-emerald-600' : 'bg-emerald-500'}`} />
                  {f}
                </li>
              ))}
            </ul>
            
            <button className={`w-full py-3 rounded-xl font-medium transition-colors ${plan.popular ? 'bg-black text-white hover:bg-black/90' : 'bg-white/10 text-white hover:bg-white/15'}`}>
              {plan.popular ? 'Get Started' : 'Choose Plan'}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    { q: "How does the AI inpainting work?", a: "Our AI analyzes the surrounding context of any selected area and seamlessly fills it with relevant content, matching lighting, texture, and perspective." },
    { q: "Can I use FLORA commercially?", a: "Yes, all paid plans include commercial usage rights. The Starter plan is for personal use only." },
    { q: "What file formats are supported?", a: "We support all major formats including PSD, PNG, JPG, WebP, TIFF, and export to MP4 for video content." }
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
        <div className={`w-6 h-6 rounded-full border border-white/10 flex items-center justify-center transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          <span className="text-lg leading-none text-white/60">+</span>
        </div>
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

function FinalCTA() {
  return (
    <section className="py-32 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-semibold mb-6 tracking-tight">
          Ready to create?
        </h2>
        <p className="text-lg text-white/40 mb-10">
          Join thousands of creators using FLORA today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-black rounded-full font-medium hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
            Get started for free
          </button>
          <button className="px-8 py-4 border border-white/10 rounded-full font-medium hover:bg-white/5 transition-colors">
            View documentation
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
          <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
            <span className="text-black font-bold text-xs">F</span>
          </div>
          <span className="text-white font-semibold text-sm">FLORA</span>
        </div>
        
        <div className="flex gap-8 text-sm text-white/30">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
        
        <div className="text-sm text-white/20">
          © {new Date().getFullYear()} FLORA AI
        </div>
      </div>
    </footer>
  );
}