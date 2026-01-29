"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Box, Play } from "lucide-react";
import { HERO_PATHS, MERGE_X, MERGE_Y } from "./hero-paths";

// ============================================================================
// DOT GRID BACKGROUND - Canvas-based animated dot field
// ============================================================================
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

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const animate = (timestamp: number) => {
            if (!ctx || !canvas) return;

            const dt = timestamp - timeRef.current;
            timeRef.current = timestamp;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const mouseX = mouseRef.current.x;
            const mouseY = mouseRef.current.y;
            const hoverRadius = 100;

            const pathCurves = getPathCurves(canvas.width, canvas.height);
            const energyPositions: [number, number][] = [];

            const inputCycle = 5000;
            const inputT = (timestamp % inputCycle) / inputCycle;
            const delays = [0, 0.25, 0.5, 0.75];

            for (let i = 0; i < 4; i++) {
                const curve = pathCurves[i];
                const t1 = (inputT + delays[i % 4]) % 1;
                const pos1 = bezierPoint(t1, curve[0], curve[1], curve[2], curve[3]);
                energyPositions.push([pos1[0], pos1[1]]);
                const t2 = (inputT + delays[i % 4] + 0.5) % 1;
                const pos2 = bezierPoint(t2, curve[0], curve[1], curve[2], curve[3]);
                energyPositions.push([pos2[0], pos2[1]]);
            }

            const outputCycle = 3000;
            const outputT = (timestamp % outputCycle) / outputCycle;
            const outputCurve = pathCurves[4];
            const outputPos1 = bezierPoint(outputT, outputCurve[0], outputCurve[1], outputCurve[2], outputCurve[3]);
            energyPositions.push([outputPos1[0], outputPos1[1]]);
            const outputPos2 = bezierPoint((outputT + 0.5) % 1, outputCurve[0], outputCurve[1], outputCurve[2], outputCurve[3]);
            energyPositions.push([outputPos2[0], outputPos2[1]]);

            energyPositions.push([canvas.width * MERGE_X / 100, canvas.height * MERGE_Y / 100]);

            const energyRadius = 70;

            const energyBBox = {
                minX: Math.min(...energyPositions.map(p => p[0])) - energyRadius,
                maxX: Math.max(...energyPositions.map(p => p[0])) + energyRadius,
                minY: Math.min(...energyPositions.map(p => p[1])) - energyRadius,
                maxY: Math.max(...energyPositions.map(p => p[1])) + energyRadius,
            };

            dotsRef.current.forEach(dot => {
                const mouseDist = Math.sqrt((dot.x - mouseX) ** 2 + (dot.y - mouseY) ** 2);
                const hoverIntensity = Math.max(0, 1 - mouseDist / hoverRadius);

                let energyIntensity = 0;
                if (dot.x >= energyBBox.minX && dot.x <= energyBBox.maxX &&
                    dot.y >= energyBBox.minY && dot.y <= energyBBox.maxY) {
                    energyPositions.forEach(pos => {
                        const energyDist = Math.sqrt((dot.x - pos[0]) ** 2 + (dot.y - pos[1]) ** 2);
                        energyIntensity = Math.max(energyIntensity, Math.max(0, 1 - energyDist / energyRadius) * 0.6);
                    });
                }

                const idlePulse = (Math.sin(timestamp * 0.0006) + 1) * 0.02;
                const targetOpacity = Math.min(0.75, dot.baseOpacity + idlePulse + hoverIntensity * 0.4 + energyIntensity * 0.3);
                dot.currentOpacity += (targetOpacity - dot.currentOpacity) * 0.15;

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

// ============================================================================
// FLOATING DEMO CARDS - SVG connection system with animated energy flow
// ============================================================================
function FloatingDemoCards() {
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
        .energy-segment { animation: energyFlow 5s linear infinite; }
        .energy-segment-delayed-1 { animation: energyFlow 5s linear infinite; animation-delay: 1.25s; }
        .energy-segment-delayed-2 { animation: energyFlow 5s linear infinite; animation-delay: 2.5s; }
        .energy-segment-delayed-3 { animation: energyFlow 5s linear infinite; animation-delay: 3.75s; }
        .energy-output { animation: energyFlowOutput 2.2s linear infinite; }
        .energy-output-delayed { animation: energyFlowOutput 2.2s linear infinite; animation-delay: 1.1s; }
        @keyframes burstRing {
          0% { r: 1; opacity: 0.4; }
          100% { r: 3.5; opacity: 0; }
        }
        .burst-ring { animation: burstRing 2.5s ease-out infinite; }
        .burst-ring-delayed { animation: burstRing 2.5s ease-out infinite; animation-delay: 1.25s; }
      `}</style>

            {/* SVG Connection System */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                    <filter id="energyGlow" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="0.8" result="blur1" />
                        <feGaussianBlur stdDeviation="0.4" result="blur2" />
                        <feMerge>
                            <feMergeNode in="blur1" />
                            <feMergeNode in="blur2" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <radialGradient id="mergeGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                        <stop offset="50%" stopColor="rgba(139,92,246,0.2)" />
                        <stop offset="100%" stopColor="rgba(139,92,246,0)" />
                    </radialGradient>
                    <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                        <stop offset="30%" stopColor="rgba(255,255,255,0.7)" />
                        <stop offset="50%" stopColor="rgba(255,255,255,1)" />
                        <stop offset="70%" stopColor="rgba(255,255,255,0.7)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </linearGradient>
                </defs>

                {/* Dotted path backgrounds */}
                {Object.entries(paths).map(([key, d]) => (
                    <path key={`dots-${key}`} d={d} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.15" strokeDasharray="0.3 1.5" strokeLinecap="round" />
                ))}

                {/* Base lines */}
                <path d={paths.topLeft1} fill="none" stroke="rgba(139,92,246,0.35)" strokeWidth="0.4" />
                <path d={paths.topLeft2} fill="none" stroke="rgba(139,92,246,0.25)" strokeWidth="0.3" />
                <path d={paths.bottomLeft1} fill="none" stroke="rgba(139,92,246,0.35)" strokeWidth="0.4" />
                <path d={paths.bottomLeft2} fill="none" stroke="rgba(139,92,246,0.25)" strokeWidth="0.3" />
                <path d={paths.output} fill="none" stroke="rgba(6,182,212,0.4)" strokeWidth="0.5" />

                {/* Energy segments */}
                <path d={paths.topLeft1} fill="none" stroke="url(#energyGradient)" strokeWidth="0.35" strokeLinecap="round" strokeDasharray="8 92" filter="url(#energyGlow)" className="energy-segment" />
                <path d={paths.topLeft1} fill="none" stroke="url(#energyGradient)" strokeWidth="0.35" strokeLinecap="round" strokeDasharray="8 92" filter="url(#energyGlow)" className="energy-segment-delayed-2" />
                <path d={paths.topLeft2} fill="none" stroke="url(#energyGradient)" strokeWidth="0.3" strokeLinecap="round" strokeDasharray="6 94" filter="url(#energyGlow)" className="energy-segment-delayed-1" />
                <path d={paths.bottomLeft1} fill="none" stroke="url(#energyGradient)" strokeWidth="0.35" strokeLinecap="round" strokeDasharray="8 92" filter="url(#energyGlow)" className="energy-segment-delayed-1" />
                <path d={paths.bottomLeft1} fill="none" stroke="url(#energyGradient)" strokeWidth="0.35" strokeLinecap="round" strokeDasharray="8 92" filter="url(#energyGlow)" className="energy-segment-delayed-3" />
                <path d={paths.bottomLeft2} fill="none" stroke="url(#energyGradient)" strokeWidth="0.3" strokeLinecap="round" strokeDasharray="6 94" filter="url(#energyGlow)" className="energy-segment-delayed-2" />
                <path d={paths.output} fill="none" stroke="url(#energyGradient)" strokeWidth="0.45" strokeLinecap="round" strokeDasharray="12 48" filter="url(#energyGlow)" className="energy-output" />
                <path d={paths.output} fill="none" stroke="url(#energyGradient)" strokeWidth="0.45" strokeLinecap="round" strokeDasharray="12 48" filter="url(#energyGlow)" className="energy-output-delayed" />

                {/* Merge point */}
                <circle cx={MERGE_X} cy={MERGE_Y} r="4" fill="url(#mergeGlow)" opacity="0.6" />
                <circle cx={MERGE_X} cy={MERGE_Y} r="1.5" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.15" className="burst-ring" />
                <circle cx={MERGE_X} cy={MERGE_Y} r="1.5" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.1" className="burst-ring-delayed" />
                <motion.circle cx={MERGE_X} cy={MERGE_Y} r="0.8" fill="rgba(255,255,255,0.95)" filter="url(#energyGlow)" animate={{ opacity: [0.5, 1, 0.5], r: [0.6, 0.9, 0.6] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
                <motion.circle cx={MERGE_X} cy={MERGE_Y} r="1.2" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.1" animate={{ opacity: [0.2, 0.5, 0.2], r: [1.1, 1.4, 1.1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
            </svg>

            {/* Top Left Card */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="absolute top-[15%] left-[4%] md:left-[6%] z-30">
                <div className="relative group">
                    <div className="w-40 h-40 md:w-52 md:h-52 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/[0.08] shadow-2xl overflow-hidden transition-all duration-300 group-hover:border-white/[0.15] group-hover:bg-white/[0.05]">
                        <div className="px-3 py-2 flex items-center justify-between border-b border-white/[0.05]">
                            <span className="text-xs text-white/50 font-medium">Image Gen</span>
                            <span className="text-[10px] text-white/30">v2.1</span>
                        </div>
                        <div className="flex-1 flex items-center justify-center p-4 h-[calc(100%-36px)]">
                            <div className="w-16 h-14 md:w-20 md:h-16 bg-gradient-to-br from-purple-500/20 to-indigo-500/10 rounded-lg flex items-center justify-center">
                                <Box className="w-7 h-7 md:w-8 md:h-8 text-purple-400/60" />
                            </div>
                        </div>
                    </div>
                    <div className="absolute -inset-4 bg-purple-500/5 rounded-3xl blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </motion.div>

            {/* Bottom Left Card */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="absolute bottom-[12%] left-[4%] md:left-[6%] z-30">
                <div className="relative group">
                    <div className="w-36 h-44 md:w-48 md:h-56 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/[0.08] shadow-2xl overflow-hidden transition-all duration-300 group-hover:border-white/[0.15] group-hover:bg-white/[0.05]">
                        <div className="px-3 py-2 flex items-center justify-between border-b border-white/[0.05]">
                            <span className="text-xs text-white/50 font-medium">Video Render</span>
                            <span className="text-[10px] text-white/30">v1.8</span>
                        </div>
                        <div className="flex-1 flex items-center justify-center p-4 h-[calc(100%-36px)]">
                            <div className="w-14 h-20 md:w-16 md:h-24 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 rounded-lg flex items-center justify-center">
                                <Play className="w-5 h-5 md:w-6 md:h-6 text-cyan-400/60" />
                            </div>
                        </div>
                    </div>
                    <div className="absolute -inset-4 bg-cyan-500/5 rounded-3xl blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </motion.div>

            {/* Right Card - Output */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="absolute top-1/2 -translate-y-1/2 right-[4%] md:right-[6%] z-30">
                <div className="relative group">
                    <div className="w-52 h-44 md:w-72 md:h-56 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/[0.08] shadow-2xl overflow-hidden transition-all duration-300 group-hover:border-white/[0.15] group-hover:bg-white/[0.05]">
                        <div className="px-3 py-2 flex items-center justify-between border-b border-white/[0.05]">
                            <span className="text-xs text-white/50 font-medium">Final Output</span>
                            <span className="text-[10px] text-emerald-400/60">● Live</span>
                        </div>
                        <div className="flex-1 flex items-center justify-center p-4 h-[calc(100%-36px)] relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-teal-900/10" />
                            <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-white/10 to-white/5 rounded-full flex items-center justify-center">
                                <Play className="w-8 h-8 md:w-10 md:h-10 text-white/40" />
                            </div>
                            <motion.div className="absolute inset-0 bg-white/[0.02] rounded-lg" animate={{ opacity: [0, 0.04, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
                        </div>
                    </div>
                    <div className="absolute -inset-4 bg-emerald-500/5 rounded-3xl blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </motion.div>
        </>
    );
}

// ============================================================================
// HERO SECTION - Main hero component
// ============================================================================
export function Hero() {
    return (
        <section className="relative pt-32 pb-28 overflow-hidden min-h-screen">
            <DotGridBackground />

            {/* Glowing Orbs */}
            <div className="absolute inset-0 z-[1] pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative">
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
