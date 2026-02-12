"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import {
  ArrowRight,
  Play,
  Video,
  FileText,
  Layers,
  Zap,
  Download,
  Code,
  Sparkles,
  Terminal,
  Check,
  ChevronDown
} from "lucide-react";

// --- Types & Interfaces ---
interface Template {
  name: string;
  duration: string;
  style: string;
  popular: boolean;
}

interface FAQItemProps {
  q: string;
  a: string;
}

// --- Enhanced Components ---

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#030303]" />;

  return (
    <main className="min-h-screen bg-[#030303] text-white antialiased overflow-x-hidden selection:bg-indigo-500/30 selection:text-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&display=swap');
        
        .font-serif-italic {
          font-family: 'Playfair Display', serif;
          font-style: italic;
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(-1deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        
        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }

        .glass-panel-hover:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(99, 102, 241, 0.3);
          box-shadow: 0 8px 40px rgba(99, 102, 241, 0.15);
        }

        .text-gradient-bright {
          background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 30%, #c7d2fe 60%, #a5b4fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .neon-glow {
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.4), 0 0 40px rgba(99, 102, 241, 0.2);
        }

        .noise-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.02;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        .cursor-glow {
          pointer-events: none;
          position: fixed;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.05) 40%, transparent 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          z-index: 0;
          transition: opacity 0.3s;
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div className="noise-overlay" />
      <CursorGlow />
      <ProgressBar scaleX={scaleX} />

      <Nav />
      {/* Kept Original Hero as requested */}
      <Hero />
      <HowItWorks />
      <CodeShowcase />
      <Capabilities />
      <TemplatesShowcase />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}

// --- Interactive Elements ---

function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [isVisible]);

  return (
    <div
      className="cursor-glow hidden md:block"
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
        opacity: isVisible ? 1 : 0
      }}
    />
  );
}

function ProgressBar({ scaleX }: { scaleX: any }) {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 origin-left z-[100]"
      style={{ scaleX }}
    />
  );
}

// --- Navigation ---

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-6 inset-x-0 z-50 px-6 pointer-events-none">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 bg-white/[0.03] backdrop-blur-md border border-white/[0.08] px-4 py-2 rounded-2xl"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center neon-glow shadow-lg">
            <Video className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">MotionAI</span>
        </motion.div>

        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex items-center gap-1 bg-white/[0.03] backdrop-blur-md border border-white/[0.08] px-2 py-1.5 rounded-full"
        >
          {["How it Works", "Templates", "API", "Docs"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-full transition-all duration-300 font-medium"
            >
              {item}
            </a>
          ))}
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <button className="hidden md:block px-5 py-2.5 text-sm text-white/70 hover:text-white transition-colors font-medium bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-xl hover:bg-white/[0.08]">
            Sign in
          </button>
          <button className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300">
            Get Started
          </button>
        </motion.div>
      </div>
    </header>
  );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const x = (clientX - left - width / 2) * 0.2;
    const y = (clientY - top - height / 2) * 0.2;
    setPosition({ x, y });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const { x, y } = position;
  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      className="transition-transform duration-200 ease-out"
    >
      {children}
    </div>
  );
}

// --- Original Hero Section (Preserved) ---

function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / 50);
    mouseY.set((e.clientY - centerY) / 50);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-10 overflow-hidden"
    >
      <ParticleField />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-indigo-500/[0.03] rounded-full blur-[150px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/[0.03] rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6">
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <ConnectionLines />
          <FloatingCards mouseX={mouseX} mouseY={mouseY} />
        </div>

        <div className="relative z-20 flex flex-col items-center text-center max-w-2xl mx-auto pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8 hover:bg-indigo-500/20 transition-colors cursor-pointer group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider group-hover:translate-x-0.5 transition-transform">Now in Beta v2.0</span>
            <ArrowRight className="w-3 h-3 text-indigo-400" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1]"
          >
            Your{" "}
            <span className="relative inline-block">
              <span className="font-serif-italic text-gradient-bright">creative</span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              />
              <motion.div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-indigo-500/40 blur-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              />
              <motion.div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              />
            </span>{" "}
            <br className="hidden md:block" />
            motion studio.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-xl md:text-2xl text-white/40 font-light leading-relaxed max-w-3xl"
          >
            Type a prompt. Get cinematic motion graphics in seconds.
            <br className="hidden md:block" />
            <span className="text-white/60">No After Effects. No templates. Just results.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <MagneticButton>
              <button className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium text-base hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-105">
                Start creating free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </MagneticButton>

            <button className="group flex items-center gap-3 px-8 py-4 rounded-full font-medium text-base border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all duration-300 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-3 h-3 text-white ml-0.5" />
              </div>
              See it in action
            </button>
          </motion.div>


        </div>
      </div>
    </section>
  );
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    };

    resize();
    window.addEventListener("resize", resize);

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.x -= dx * force * 0.02;
          p.y -= dy * force * 0.02;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.5})`;
        ctx.fill();

        // Connect nearby particles
        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60" />;
}

function FloatingCards({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
  const x1 = useTransform(mouseX, [-20, 20], [-15, 15]);
  const y1 = useTransform(mouseY, [-20, 20], [-15, 15]);
  const x2 = useTransform(mouseX, [-20, 20], [10, -10]);
  const y2 = useTransform(mouseY, [-20, 20], [10, -10]);
  const x3 = useTransform(mouseX, [-20, 20], [-8, 8]);
  const y3 = useTransform(mouseY, [-20, 20], [-8, 8]);

  const [typedText, setTypedText] = useState("");
  const fullText = "A cinematic intro with glitch text and neon glow...";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        setTimeout(() => {
          index = 0;
          setTypedText("");
        }, 2000);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <motion.div
        style={{ x: x1, y: y1 }}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.4, type: "spring" }}
        className="absolute top-[15%] left-[2%] lg:left-[5%] z-20 pointer-events-auto animate-float-slow hidden md:block"
      >
        <div className="w-72 p-5 rounded-2xl glass-panel glass-panel-hover transition-all duration-500">
          <div className="flex items-center gap-2 mb-4 text-white/40 text-xs uppercase tracking-wider">
            <Terminal className="w-4 h-4" />
            <span>Prompt Input</span>
          </div>
          <div className="space-y-3 font-mono text-sm">
            <div className="h-2 bg-white/10 rounded-full w-full overflow-hidden">
              <div className="h-full bg-indigo-500/50 rounded-full w-2/3 animate-pulse" />
            </div>
            <div className="p-3 rounded-lg bg-black/30 border border-white/10 text-white/70 text-xs leading-relaxed min-h-[60px]">
              {typedText}
              <span className="inline-block w-0.5 h-4 bg-indigo-400 ml-0.5 animate-pulse" />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            {["4K", "Neon", "Cinematic"].map((tag) => (
              <span key={tag} className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-white/60 border border-white/10 hover:bg-indigo-500/20 hover:border-indigo-500/30 transition-colors cursor-pointer">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ x: x2, y: y2 }}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6, type: "spring" }}
        className="absolute top-[55%] left-[0%] lg:left-[3%] z-20 pointer-events-auto animate-float-medium hidden md:block"
      >
        <div className="w-60 p-5 rounded-2xl glass-panel glass-panel-hover transition-all duration-500">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-white/40 font-medium">Templates</span>
            <Layers className="w-4 h-4 text-white/30" />
          </div>
          <div className="space-y-2">
            {[
              { icon: Film, label: "Intro", active: false },
              { icon: FileText, label: "Lower Third", active: true },
              { icon: Video, label: "Reel Opener", active: false }
            ].map((item, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg flex items-center gap-3 cursor-pointer transition-all ${item.active
                  ? "bg-indigo-500/20 border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                  : "bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06]"
                  }`}
              >
                <item.icon className={`w-4 h-4 ${item.active ? "text-indigo-400" : "text-white/50"}`} />
                <span className={`text-sm ${item.active ? "text-white font-medium" : "text-white/70"}`}>
                  {item.label}
                </span>
                {item.active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ x: x3, y: y3 }}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.8, type: "spring" }}
        className="absolute top-[18%] right-[1%] lg:right-[4%] z-20 pointer-events-auto animate-float-slow hidden xl:block"
      >
        <div className="w-[400px] rounded-2xl overflow-hidden glass-panel glass-panel-hover transition-all duration-500 shadow-2xl">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500/80" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
              <div className="w-2 h-2 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs text-white/40 font-mono">Preview</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-medium text-green-400">Rendering...</span>
            </div>
          </div>

          <div className="relative aspect-video bg-gradient-to-br from-indigo-900/30 to-purple-900/20 flex items-center justify-center overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=450&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent" />

            <button className="relative z-10 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:scale-110 transition-all duration-300 group-hover:bg-white/20">
              <Play className="w-6 h-6 text-white ml-1" />
            </button>

            <div className="absolute bottom-4 left-4 right-4">
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-white/40 font-mono">
                <span>00:00</span>
                <span>00:15</span>
              </div>
            </div>
          </div>

          <div className="p-5 flex items-center justify-between bg-black/20">
            <div>
              <div className="text-sm text-white/80 font-medium flex items-center gap-2">
                final_render.mp4
                <Check className="w-3 h-3 text-green-400" />
              </div>
              <div className="text-xs text-white/40 mt-0.5 font-mono">1920 &times; 1080 &bull; 30fps &bull; MP4</div>
            </div>
            <button className="p-2.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/30 transition-colors group">
              <Download className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// Helper for Floating Cards (Added back because I missed it in step above)
import { Film } from "lucide-react"; // Forgot to import Film at the top level

function ConnectionLines() {
  return (
    <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(99, 102, 241, 0)" />
          <stop offset="50%" stopColor="rgba(168, 85, 247, 0.8)" />
          <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
        </linearGradient>
      </defs>
      {[0, 1, 2].map((i) => (
        <motion.path
          key={i}
          d={`M ${15 + i * 5} ${30 + i * 15} C ${30 + i * 5} ${35 + i * 10}, 40 ${48 - i * 5}, 50 52`}
          fill="none"
          stroke="url(#grad1)"
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
        />
      ))}
    </svg>
  );
}

// --- New Sections (Replaced) ---

function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Define",
      desc: "Input your creative requirements. 'Cinematic intro, glitch style, 5 seconds'.",
      icon: <FileText className="w-5 h-5" />,
      color: "from-blue-500 to-indigo-500"
    },
    {
      num: "02",
      title: "Customize",
      desc: "Select aspect ratio, duration, and brand themes. AI suggests optimal motion patterns.",
      icon: <Layers className="w-5 h-5" />,
      color: "from-indigo-500 to-purple-500"
    },
    {
      num: "03",
      title: "Generate",
      desc: "Remotion compiles your video deterministically. No randomness, perfect pixels every time.",
      icon: <Zap className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      num: "04",
      title: "Export",
      desc: "Download MP4 in 1080p or 4K. Edit the React code if you need precise adjustments.",
      icon: <Download className="w-5 h-5" />,
      color: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-6 max-w-7xl mx-auto relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="text-center max-w-2xl mx-auto mb-24 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          Process
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-semibold mb-6 tracking-tight"
        >
          From prompt to <span className="text-gradient-bright">pixels</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg text-white/40"
        >
          Four steps to professional motion graphics
        </motion.p>
      </div>

      <div className="grid md:grid-cols-4 gap-8 relative">
        <div className="absolute top-12 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent hidden lg:block" />

        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="relative"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-white mb-6 relative z-10 glass-panel shadow-lg">
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-20`} />
              {step.icon}
            </div>
            <div className="text-7xl font-bold text-white/[0.03] absolute -top-4 -right-1 select-none">
              {step.num}
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">{step.title}</h3>
            <p className="text-sm text-white/40 leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CodeShowcase() {
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
              Don't get locked into proprietary tools. MotionAI generates clean, standard Remotion code.
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

function Capabilities() {
  const features = [
    {
      title: "Deterministic Output",
      desc: "Unlike AI diffusion, Remotion generates programmable motion. The same prompt always produces the same result.",
      icon: <Terminal className="w-6 h-6" />
    },
    {
      title: "Code Export",
      desc: "Get the underlying React code. Edit timing, easing, and layers with developer precision.",
      icon: <Code className="w-6 h-6" />
    },
    {
      title: "Instant Preview",
      desc: "See changes in real-time. No waiting for renders to check if your timing is right.",
      icon: <Play className="w-6 h-6" />
    },
    {
      title: "Scale to 4K",
      desc: "Vector-based graphics scale infinitely. Render once, export in any resolution up to 4K60.",
      icon: <Video className="w-6 h-6" />
    }
  ];

  return (
    <section id="capabilities" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 mb-6"
          >
            <Sparkles className="w-3 h-3" />
            <span>Why MotionAI?</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-semibold mb-6"
          >
            Built for <span className="font-serif-italic text-gradient-bright">reliability</span>
          </motion.h2>
          <p className="text-lg text-white/40 leading-relaxed">Built on Remotion for reliable, scalable video generation without the chaos.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl glass-panel hover:bg-white/[0.05] transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-indigo-300 transition-colors">{f.title}</h3>
                  <p className="text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">{f.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TemplatesShowcase() {
  const templates: Template[] = [
    { name: "Channel Intro", duration: "5s", style: "Cinematic", popular: true },
    { name: "Lower Third", duration: "3s", style: "Minimal", popular: false },
    { name: "Quote Card", duration: "10s", style: "Typographic", popular: false },
    { name: "Reel Opener", duration: "15s", style: "Dynamic", popular: true },
    { name: "Product Showcase", duration: "20s", style: "Corporate", popular: false },
    { name: "Subtitle Overlay", duration: "Variable", style: "Clean", popular: false }
  ];

  return (
    <section id="templates" className="py-24 px-6 max-w-7xl mx-auto relative">
      <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">Start with a <span className="font-serif-italic text-gradient-bright">foundation</span></h2>
          <p className="text-white/40 text-lg">Start with a foundation, customize with prompts.</p>
        </div>
        <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/5 hover:bg-indigo-500/10 border border-indigo-500/20">
          Browse all templates <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative aspect-[16/10] rounded-2xl overflow-hidden glass-panel cursor-pointer hover:border-indigo-500/30 transition-colors"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="w-12 h-12 text-white/30 group-hover:text-white/80 group-hover:scale-110 transition-all duration-300" />
            </div>
            {t.popular && (
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-indigo-500/90 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm">
                Popular
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white text-lg mb-1 group-hover:text-indigo-300 transition-colors">{t.name}</div>
                  <div className="text-xs text-white/50">{t.style} &bull; {t.duration}</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm border border-white/20">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Do I need to know After Effects?", a: "No. MotionAI uses natural language prompts and Remotion's programmatic approach. You describe what you want, we generate the code." },
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

function CTA() {
  return (
    <section className="py-32 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-transparent to-indigo-500/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-sm text-indigo-300 mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>Start for free today</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-semibold mb-8 tracking-tight"
        >
          Ready to streamline your <span className="font-serif-italic text-gradient-bright">production</span>?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-white/40 mb-12 max-w-2xl mx-auto"
        >
          Join creators generating motion graphics in seconds, not hours. No credit card required.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="px-10 py-5 bg-white text-black rounded-full font-semibold text-lg hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)] transition-all duration-300 hover:scale-105 flex items-center gap-2">
            Get started free
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="px-10 py-5 border border-white/20 rounded-full font-semibold text-lg hover:bg-white/5 hover:border-white/30 transition-all duration-300 backdrop-blur-sm">
            View documentation
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-16 bg-[#020202] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <Video className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">MotionAI</span>
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
          Â© {new Date().getFullYear()} MotionAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}