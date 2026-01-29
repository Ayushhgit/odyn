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

// ============================================================================
// HERO_PATHS: Single source of truth for connection line geometry
// Both SVG and Canvas use this - prevents drift between visual systems
// ============================================================================
const MERGE_X = 50; // Centered horizontally
const MERGE_Y = 65; // Vertically below "environment." (in the gap before subtext)

const HERO_PATHS = {
  topLeft1: {
    svg: `M 15 25 C 28 35, 42 48, ${MERGE_X} ${MERGE_Y}`,
    bezier: [[15, 25], [28, 35], [42, 48], [MERGE_X, MERGE_Y]] as [number, number][]
  },
  topLeft2: {
    svg: `M 18 30 C 30 40, 45 52, ${MERGE_X} ${MERGE_Y}`,
    bezier: [[18, 30], [30, 40], [45, 52], [MERGE_X, MERGE_Y]] as [number, number][]
  },
  bottomLeft1: {
    svg: `M 15 78 C 28 72, 42 65, ${MERGE_X} ${MERGE_Y}`,
    bezier: [[15, 78], [28, 72], [42, 65], [MERGE_X, MERGE_Y]] as [number, number][]
  },
  bottomLeft2: {
    svg: `M 18 73 C 32 68, 46 62, ${MERGE_X} ${MERGE_Y}`,
    bezier: [[18, 73], [32, 68], [46, 62], [MERGE_X, MERGE_Y]] as [number, number][]
  },
  output: {
    svg: `M ${MERGE_X} ${MERGE_Y} C 62 54, 74 56, 88 ${MERGE_Y}`,
    bezier: [[MERGE_X, MERGE_Y], [62, 54], [74, 56], [88, MERGE_Y]] as [number, number][]
  }
} as const;

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
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4">
      {/* Glassmorphic pill container */}
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-lg shadow-black/20">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-400 flex items-center justify-center">
            <svg width="16\" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
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

function Hero() {
  return (
    <section className="relative pt-32 pb-28 overflow-hidden min-h-screen">
      {/* Animated Dot Grid Background */}
      <DotGridBackground />

      {/* Glowing Orbs - above canvas (z-0), below content */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Floating Demo Cards with Connection Lines */}
        <FloatingDemoCards />

        {/* Center Content */}
        <div className="relative z-20 flex flex-col items-center text-center pt-20">
          {/* Announcement Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-emerald-300">New</span>
            <span className="text-sm text-white/80">Inpaint, outpaint, and crop now live on Odyn</span>
            <button className="ml-2 px-3 py-1 bg-white/10 hover:bg-white/15 rounded-full text-sm text-white transition-colors">
              Try now
            </button>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold leading-tight tracking-tight max-w-4xl"
          >
            Your{' '}
            <span className="relative">
              <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white">
                creative
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </span>{' '}
            environment.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-lg md:text-xl text-[#8b959e] max-w-2xl leading-relaxed"
          >
            Bring your ideas to life faster than ever before.
            <br />
            Every creative AI tool, one unified process.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-10"
          >
            <button className="group relative px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-medium transition-all duration-300 overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Get started for free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DotGridBackground() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const mouseRef = React.useRef({ x: -1000, y: -1000 });
  const animationRef = React.useRef<number>(0);
  const timeRef = React.useRef(0);
  const dotsRef = React.useRef<{ x: number; y: number; baseOpacity: number; currentOpacity: number }[]>([]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Bezier curve interpolation function
    const bezierPoint = (t: number, p0: number[], p1: number[], p2: number[], p3: number[]) => {
      const u = 1 - t;
      return [
        u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
        u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]
      ];
    };

    // Use shared HERO_PATHS - scales bezier coordinates to screen size
    const getPathCurves = (w: number, h: number) => {
      const scale = (bezier: readonly [number, number][]) =>
        bezier.map(p => [p[0] * w / 100, p[1] * h / 100]);
      return [
        scale(HERO_PATHS.topLeft1.bezier),
        scale(HERO_PATHS.topLeft2.bezier),
        scale(HERO_PATHS.bottomLeft1.bezier),
        scale(HERO_PATHS.bottomLeft2.bezier),
        scale(HERO_PATHS.output.bezier),
      ];
    };

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDots();
    };

    // Initialize dots grid
    const initDots = () => {
      dotsRef.current = [];
      const spacing = 32;
      const cols = Math.ceil(canvas.width / spacing) + 1;
      const rows = Math.ceil(canvas.height / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          // Radial falloff from center for base visibility
          const centerX = canvas.width / 2;
          const centerY = canvas.height * 0.5;
          const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
          const maxDist = Math.sqrt(centerX ** 2 + centerY ** 2);
          const falloff = 1 - Math.min(dist / (maxDist * 0.8), 1);

          dotsRef.current.push({
            x,
            y,
            baseOpacity: 0.08 + falloff * 0.12,
            currentOpacity: 0.08 + falloff * 0.12
          });
        }
      }
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Animation loop
    const animate = (timestamp: number) => {
      if (!ctx || !canvas) return;

      const dt = timestamp - timeRef.current;
      timeRef.current = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const hoverRadius = 100;

      // Get current energy positions along each path
      // Sync with the 5s animation cycle for input paths, 3s for output
      const pathCurves = getPathCurves(canvas.width, canvas.height);
      const energyPositions: [number, number][] = [];

      // Input paths (5s cycle, offset by delays: 0, 1.25s, 2.5s, 3.75s)
      const inputCycle = 5000;
      const inputT = (timestamp % inputCycle) / inputCycle;
      const delays = [0, 0.25, 0.5, 0.75]; // normalized delays

      // Add energy positions for input paths
      for (let i = 0; i < 4; i++) {
        const curve = pathCurves[i];
        // Primary energy segment
        const t1 = (inputT + delays[i % 4]) % 1;
        const pos1 = bezierPoint(t1, curve[0], curve[1], curve[2], curve[3]);
        energyPositions.push([pos1[0], pos1[1]]);
        // Secondary segment (staggered)
        const t2 = (inputT + delays[i % 4] + 0.5) % 1;
        const pos2 = bezierPoint(t2, curve[0], curve[1], curve[2], curve[3]);
        energyPositions.push([pos2[0], pos2[1]]);
      }

      // Output path (3s cycle)
      const outputCycle = 3000;
      const outputT = (timestamp % outputCycle) / outputCycle;
      const outputCurve = pathCurves[4];
      const outputPos1 = bezierPoint(outputT, outputCurve[0], outputCurve[1], outputCurve[2], outputCurve[3]);
      energyPositions.push([outputPos1[0], outputPos1[1]]);
      const outputPos2 = bezierPoint((outputT + 0.5) % 1, outputCurve[0], outputCurve[1], outputCurve[2], outputCurve[3]);
      energyPositions.push([outputPos2[0], outputPos2[1]]);

      // Merge point always glowing (uses MERGE_X, MERGE_Y constants)
      energyPositions.push([canvas.width * MERGE_X / 100, canvas.height * MERGE_Y / 100]);

      const energyRadius = 70;

      // Bounding box optimization - skip expensive energy calc for dots outside energy area
      const energyBBox = {
        minX: Math.min(...energyPositions.map(p => p[0])) - energyRadius,
        maxX: Math.max(...energyPositions.map(p => p[0])) + energyRadius,
        minY: Math.min(...energyPositions.map(p => p[1])) - energyRadius,
        maxY: Math.max(...energyPositions.map(p => p[1])) + energyRadius,
      };

      dotsRef.current.forEach(dot => {
        // Calculate hover effect
        const mouseDist = Math.sqrt((dot.x - mouseX) ** 2 + (dot.y - mouseY) ** 2);
        const hoverIntensity = Math.max(0, 1 - mouseDist / hoverRadius);

        // Calculate energy proximity effect (animated) - with bounding box optimization
        let energyIntensity = 0;
        if (dot.x >= energyBBox.minX && dot.x <= energyBBox.maxX &&
          dot.y >= energyBBox.minY && dot.y <= energyBBox.maxY) {
          energyPositions.forEach(pos => {
            const energyDist = Math.sqrt((dot.x - pos[0]) ** 2 + (dot.y - pos[1]) ** 2);
            energyIntensity = Math.max(energyIntensity, Math.max(0, 1 - energyDist / energyRadius) * 0.6);
          });
        }

        // Idle pulse to keep background alive
        const idlePulse = (Math.sin(timestamp * 0.0006) + 1) * 0.02;

        // Target opacity combines base + idle + hover + energy
        const targetOpacity = Math.min(0.75, dot.baseOpacity + idlePulse + hoverIntensity * 0.4 + energyIntensity * 0.3);

        // Smooth transition
        dot.currentOpacity += (targetOpacity - dot.currentOpacity) * 0.15;

        // Draw dot with subtle glow
        ctx.shadowColor = "rgba(255,255,255,0.15)";
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${dot.currentOpacity})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ opacity: 1 }}
    />
  );
}

function FloatingDemoCards() {
  // Use shared HERO_PATHS for SVG paths - single source of truth
  const paths = {
    topLeft1: HERO_PATHS.topLeft1.svg,
    topLeft2: HERO_PATHS.topLeft2.svg,
    bottomLeft1: HERO_PATHS.bottomLeft1.svg,
    bottomLeft2: HERO_PATHS.bottomLeft2.svg,
    output: HERO_PATHS.output.svg
  };

  return (
    <>
      {/* Global CSS for energy flow animations */}
      <style jsx global>{`
        @keyframes energyFlow {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: -100; }
        }
        @keyframes energyFlowOutput {
          0% { stroke-dashoffset: 60; }
          100% { stroke-dashoffset: -60; }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 0.08; }
          50% { opacity: 0.2; }
        }
        .energy-segment {
          animation: energyFlow 5s linear infinite;
        }
        .energy-segment-delayed-1 {
          animation: energyFlow 5s linear infinite;
          animation-delay: 1.25s;
        }
        .energy-segment-delayed-2 {
          animation: energyFlow 5s linear infinite;
          animation-delay: 2.5s;
        }
        .energy-segment-delayed-3 {
          animation: energyFlow 5s linear infinite;
          animation-delay: 3.75s;
        }
        .energy-output {
          animation: energyFlowOutput 2.2s linear infinite;
        }
        .energy-output-delayed {
          animation: energyFlowOutput 2.2s linear infinite;
          animation-delay: 1.1s;
        }
        @keyframes burstRing {
          0% { r: 1; opacity: 0.4; }
          100% { r: 3.5; opacity: 0; }
        }
        .burst-ring {
          animation: burstRing 2.5s ease-out infinite;
        }
        .burst-ring-delayed {
          animation: burstRing 2.5s ease-out infinite;
          animation-delay: 1.25s;
        }
      `}</style>

      {/* SVG Connection System */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Glow filter for energy segments */}
          <filter id="energyGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="0.8" result="blur1" />
            <feGaussianBlur stdDeviation="0.4" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Subtle glow for dots */}
          <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.15" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Merge point glow */}
          <radialGradient id="mergeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="50%" stopColor="rgba(139,92,246,0.2)" />
            <stop offset="100%" stopColor="rgba(139,92,246,0)" />
          </radialGradient>

          {/* Energy gradient - white core with soft fade */}
          <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="30%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="50%" stopColor="rgba(255,255,255,1)" />
            <stop offset="70%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* ========== LAYER 1: SUBTLE DOTTED BACKGROUND PATHS ========== */}

        {/* Dotted path backgrounds - very subtle */}
        {Object.entries(paths).map(([key, d]) => (
          <path
            key={`dots-${key}`}
            d={d}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.15"
            strokeDasharray="0.3 1.5"
            strokeLinecap="round"
          />
        ))}

        {/* ========== LAYER 2: BASE PATH LINES ========== */}

        {/* Base lines - more prominent */}
        <path d={paths.topLeft1} fill="none" stroke="rgba(139,92,246,0.35)" strokeWidth="0.4" />
        <path d={paths.topLeft2} fill="none" stroke="rgba(139,92,246,0.25)" strokeWidth="0.3" />
        <path d={paths.bottomLeft1} fill="none" stroke="rgba(139,92,246,0.35)" strokeWidth="0.4" />
        <path d={paths.bottomLeft2} fill="none" stroke="rgba(139,92,246,0.25)" strokeWidth="0.3" />
        <path d={paths.output} fill="none" stroke="rgba(6,182,212,0.4)" strokeWidth="0.5" />

        {/* ========== LAYER 3: ANIMATED ENERGY SEGMENTS ========== */}

        {/* Energy segments on topLeft1 */}
        <path
          d={paths.topLeft1}
          fill="none"
          stroke="url(#energyGradient)"
          strokeWidth="0.35"
          strokeLinecap="round"
          strokeDasharray="8 92"
          filter="url(#energyGlow)"
          className="energy-segment"
        />
        <path
          d={paths.topLeft1}
          fill="none"
          stroke="url(#energyGradient)"
          strokeWidth="0.35"
          strokeLinecap="round"
          strokeDasharray="8 92"
          filter="url(#energyGlow)"
          className="energy-segment-delayed-2"
        />

        {/* Energy segments on topLeft2 */}
        <path
          d={paths.topLeft2}
          fill="none"
          stroke="url(#energyGradient)"
          strokeWidth="0.3"
          strokeLinecap="round"
          strokeDasharray="6 94"
          filter="url(#energyGlow)"
          className="energy-segment-delayed-1"
        />

        {/* Energy segments on bottomLeft1 */}
        <path
          d={paths.bottomLeft1}
          fill="none"
          stroke="url(#energyGradient)"
          strokeWidth="0.35"
          strokeLinecap="round"
          strokeDasharray="8 92"
          filter="url(#energyGlow)"
          className="energy-segment-delayed-1"
        />
        <path
          d={paths.bottomLeft1}
          fill="none"
          stroke="url(#energyGradient)"
          strokeWidth="0.35"
          strokeLinecap="round"
          strokeDasharray="8 92"
          filter="url(#energyGlow)"
          className="energy-segment-delayed-3"
        />

        {/* Energy segments on bottomLeft2 */}
        <path
          d={paths.bottomLeft2}
          fill="none"
          stroke="url(#energyGradient)"
          strokeWidth="0.3"
          strokeLinecap="round"
          strokeDasharray="6 94"
          filter="url(#energyGlow)"
          className="energy-segment-delayed-2"
        />

        {/* Energy segments on output (faster, more prominent) */}
        <path
          d={paths.output}
          fill="none"
          stroke="url(#energyGradient)"
          strokeWidth="0.45"
          strokeLinecap="round"
          strokeDasharray="12 48"
          filter="url(#energyGlow)"
          className="energy-output"
        />
        <path
          d={paths.output}
          fill="none"
          stroke="url(#energyGradient)"
          strokeWidth="0.45"
          strokeLinecap="round"
          strokeDasharray="12 48"
          filter="url(#energyGlow)"
          className="energy-output-delayed"
        />

        {/* ========== LAYER 4: MERGE POINT WITH CONVERGENCE BURST ========== */}

        {/* Outer ambient glow */}
        <circle cx={MERGE_X} cy={MERGE_Y} r="4" fill="url(#mergeGlow)" opacity="0.6" />

        {/* Convergence burst rings - expanding outward */}
        <circle
          cx={MERGE_X}
          cy={MERGE_Y}
          r="1.5"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="0.15"
          className="burst-ring"
        />
        <circle
          cx={MERGE_X}
          cy={MERGE_Y}
          r="1.5"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.1"
          className="burst-ring-delayed"
        />

        {/* Inner bright core */}
        <motion.circle
          cx={MERGE_X}
          cy={MERGE_Y}
          r="0.8"
          fill="rgba(255,255,255,0.95)"
          filter="url(#energyGlow)"
          animate={{
            opacity: [0.5, 1, 0.5],
            r: [0.6, 0.9, 0.6]
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Subtle outer core ring */}
        <motion.circle
          cx={MERGE_X}
          cy={MERGE_Y}
          r="1.2"
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="0.1"
          animate={{
            opacity: [0.2, 0.5, 0.2],
            r: [1.1, 1.4, 1.1]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* ========== INPUT CARDS (LEFT SIDE) ========== */}

      {/* Top Left Card */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="absolute top-[15%] left-[4%] md:left-[6%] z-30"
      >
        <div className="relative group">
          {/* Card with glassmorphism */}
          <div className="w-40 h-40 md:w-52 md:h-52 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/[0.08] shadow-2xl overflow-hidden transition-all duration-300 group-hover:border-white/[0.15] group-hover:bg-white/[0.05]">
            {/* Header */}
            <div className="px-3 py-2 flex items-center justify-between border-b border-white/[0.05]">
              <span className="text-xs text-white/50 font-medium">Image Gen</span>
              <span className="text-[10px] text-white/30">v2.1</span>
            </div>
            {/* Content */}
            <div className="flex-1 flex items-center justify-center p-4 h-[calc(100%-36px)]">
              <div className="w-16 h-14 md:w-20 md:h-16 bg-gradient-to-br from-purple-500/20 to-indigo-500/10 rounded-lg flex items-center justify-center">
                <Box className="w-7 h-7 md:w-8 md:h-8 text-purple-400/60" />
              </div>
            </div>
          </div>
          {/* Soft glow behind card */}
          <div className="absolute -inset-4 bg-purple-500/5 rounded-3xl blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </motion.div>

      {/* Bottom Left Card */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="absolute bottom-[12%] left-[4%] md:left-[6%] z-30"
      >
        <div className="relative group">
          {/* Card with glassmorphism */}
          <div className="w-36 h-44 md:w-48 md:h-56 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/[0.08] shadow-2xl overflow-hidden transition-all duration-300 group-hover:border-white/[0.15] group-hover:bg-white/[0.05]">
            {/* Header */}
            <div className="px-3 py-2 flex items-center justify-between border-b border-white/[0.05]">
              <span className="text-xs text-white/50 font-medium">Video Render</span>
              <span className="text-[10px] text-white/30">v1.8</span>
            </div>
            {/* Content */}
            <div className="flex-1 flex items-center justify-center p-4 h-[calc(100%-36px)]">
              <div className="w-14 h-20 md:w-16 md:h-24 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 md:w-6 md:h-6 text-cyan-400/60" />
              </div>
            </div>
          </div>
          {/* Soft glow behind card */}
          <div className="absolute -inset-4 bg-cyan-500/5 rounded-3xl blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </motion.div>

      {/* ========== OUTPUT CARD (RIGHT SIDE) ========== */}

      {/* Right Card - Output */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="absolute top-1/2 -translate-y-1/2 right-[4%] md:right-[6%] z-30"
      >
        <div className="relative group">
          {/* Card with glassmorphism */}
          <div className="w-52 h-44 md:w-72 md:h-56 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/[0.08] shadow-2xl overflow-hidden transition-all duration-300 group-hover:border-white/[0.15] group-hover:bg-white/[0.05]">
            {/* Header */}
            <div className="px-3 py-2 flex items-center justify-between border-b border-white/[0.05]">
              <span className="text-xs text-white/50 font-medium">Final Output</span>
              <span className="text-[10px] text-emerald-400/60">● Live</span>
            </div>
            {/* Content */}
            <div className="flex-1 flex items-center justify-center p-4 h-[calc(100%-36px)] relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-teal-900/10" />
              <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-white/10 to-white/5 rounded-full flex items-center justify-center">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-white/40" />
              </div>
              {/* Subtle pulse when energy arrives */}
              <motion.div
                className="absolute inset-0 bg-white/[0.02] rounded-lg"
                animate={{ opacity: [0, 0.04, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
          {/* Soft glow behind card */}
          <div className="absolute -inset-4 bg-emerald-500/5 rounded-3xl blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </motion.div>
    </>
  );
}



function DemoCard({
  title,
  tag,
  children,
  className = '',
  gradient = 'from-[#1a1a1a] to-[#0d0d0d]',
  isLarge = false
}: {
  title: string;
  tag: string;
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  isLarge?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br ${gradient} backdrop-blur-sm shadow-2xl ${className}`}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 px-3 py-2 flex items-center justify-between">
        <span className="text-xs text-white/60 font-medium">{title}</span>
        <span className="text-[10px] text-white/40">{tag}</span>
      </div>

      {/* Content */}
      <div className="pt-8 pb-2 px-2 h-full">
        {children}
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}

function GradientOrb() {
  return (
    <div className="absolute inset-0">
      <div className="absolute left-[-10%] top-[-10%] w-[55vw] h-[55vw] max-w-[900px] max-h-[900px] rounded-full filter blur-3xl opacity-60"
        style={{ background: "radial-gradient(circle at 20% 20%, rgba(16,185,129,0.12), transparent 20%), radial-gradient(circle at 80% 40%, rgba(6,182,212,0.08), transparent 20%)" }} />
      <div className="absolute right-[-10%] bottom-[-10%] w-[40vw] h-[40vw] max-w-[700px] max-h-[700px] rounded-full filter blur-2xl opacity-40"
        style={{ background: "radial-gradient(circle at 30% 30%, rgba(16,185,129,0.06), transparent 20%), radial-gradient(circle at 60% 60%, rgba(14,165,233,0.05), transparent 20%)" }} />
    </div>
  );
}

function Noise() {
  return <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')", mixBlendMode: "overlay" }} />;
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
