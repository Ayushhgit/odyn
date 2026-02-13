"use client";

import React, { useEffect, useState } from "react";
import { useScroll, useSpring } from "framer-motion";

import GlobalStyles from "@/components/GlobalStyles";
import CursorGlow from "@/components/CursorGlow";
import ProgressBar from "@/components/ProgressBar";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import CodeShowcase from "@/components/CodeShowcase";
import Capabilities from "@/components/Capabilities";
import TemplatesShowcase from "@/components/TemplatesShowcase";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

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
      <GlobalStyles />

      <div className="noise-overlay" />
      <CursorGlow />
      <ProgressBar scaleX={scaleX} />

      <Nav />
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