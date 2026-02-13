"use client";

import React from "react";

export default function GlobalStyles() {
    return (
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
    );
}
