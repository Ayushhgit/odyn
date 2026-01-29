"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll } from "framer-motion";

// Component imports
import { GlobalStyles } from "@/components/GlobalStyles";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import {
  Why,
  DemoSection,
  Features,
  Architecture,
  Showcase,
  Pricing,
  FAQ,
  FinalCta,
  Footer
} from "@/components/Sections";

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
