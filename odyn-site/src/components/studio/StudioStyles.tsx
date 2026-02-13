"use client";

import React from "react";

export default function StudioStyles() {
  return (
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

      .studio-bg {
        background: #0a0a0a;
      }

      .sidebar-bg {
        background: #0c0c0c;
        border-right: 1px solid rgba(255, 255, 255, 0.05);
      }

      .studio-glass {
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.06);
      }

      .studio-input {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        transition: all 0.2s ease;
      }

      .studio-input:focus {
        background: rgba(255, 255, 255, 0.06);
        border-color: rgba(99, 102, 241, 0.4);
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.08);
        outline: none;
      }

      .glow-btn {
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #6366f1 100%);
        background-size: 200% 200%;
        animation: glow-shift 3s ease infinite;
        box-shadow: 0 0 25px rgba(99, 102, 241, 0.25);
        transition: all 0.3s ease;
      }

      .glow-btn:hover {
        box-shadow: 0 0 40px rgba(99, 102, 241, 0.4);
        transform: translateY(-1px);
      }

      .glow-btn:disabled {
        opacity: 0.4;
        cursor: not-allowed;
        box-shadow: none;
        transform: none;
      }

      @keyframes glow-shift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }

      @keyframes render-pulse {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.7; }
      }

      .render-pulse {
        animation: render-pulse 2s ease-in-out infinite;
      }

      /* ── Sidebar Premium Styles ── */

      .logo-glow {
        position: relative;
      }

      .logo-glow::after {
        content: '';
        position: absolute;
        inset: -6px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, transparent 70%);
        border-radius: 16px;
        z-index: -1;
        opacity: 0.8;
        filter: blur(8px);
        transition: opacity 0.3s ease;
      }

      .logo-glow:hover::after {
        opacity: 1;
      }

      .new-project-btn {
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.10) 100%);
        border: 1px solid rgba(99, 102, 241, 0.2);
        transition: all 0.2s ease-out;
      }

      .new-project-btn:hover {
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.18) 100%);
        border-color: rgba(99, 102, 241, 0.35);
        box-shadow: 0 4px 20px rgba(99, 102, 241, 0.15), 0 0 0 1px rgba(99, 102, 241, 0.1);
        transform: translateY(-1px);
      }

      .new-project-btn:active {
        transform: translateY(0);
      }

      .search-glass {
        background: rgba(255, 255, 255, 0.025);
        border: 1px solid rgba(255, 255, 255, 0.06);
        transition: all 0.25s ease-out;
      }

      .search-glass:focus-within {
        background: rgba(255, 255, 255, 0.04);
        border-color: rgba(99, 102, 241, 0.3);
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.06), 0 0 20px rgba(99, 102, 241, 0.06);
      }

      .nav-item {
        position: relative;
        transition: all 0.15s ease-out;
      }

      .nav-item:hover {
        background: rgba(255, 255, 255, 0.04);
      }

      .nav-item.active {
        background: linear-gradient(90deg, rgba(99, 102, 241, 0.08) 0%, rgba(99, 102, 241, 0.02) 100%);
      }

      .nav-item .accent-bar {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 3px;
        height: 0;
        border-radius: 0 4px 4px 0;
        background: linear-gradient(180deg, #6366f1, #8b5cf6);
        box-shadow: 0 0 8px rgba(99, 102, 241, 0.5);
        transition: height 0.2s ease-out;
      }

      .nav-item.active .accent-bar {
        height: 60%;
      }

      .nav-item:hover .accent-bar {
        height: 40%;
      }

      .project-item {
        transition: all 0.15s ease-out;
      }

      .project-item:hover {
        background: rgba(255, 255, 255, 0.03);
      }

      .upgrade-card {
        position: relative;
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.06) 0%, rgba(139, 92, 246, 0.04) 50%, rgba(99, 102, 241, 0.06) 100%);
        border: 1px solid transparent;
        overflow: hidden;
      }

      .upgrade-card::before {
        content: '';
        position: absolute;
        inset: -1px;
        border-radius: inherit;
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.35), rgba(139, 92, 246, 0.35), rgba(99, 102, 241, 0.35));
        background-size: 200% 200%;
        animation: glow-shift 4s ease infinite;
        z-index: -1;
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask-composite: exclude;
        -webkit-mask-composite: xor;
        padding: 1px;
        border-radius: inherit;
      }

      .upgrade-card::after {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(ellipse at 30% 20%, rgba(99, 102, 241, 0.06) 0%, transparent 50%);
        pointer-events: none;
      }

      .upgrade-btn {
        background: linear-gradient(135deg, #f59e0b, #d97706);
        transition: all 0.2s ease-out;
      }

      .upgrade-btn:hover {
        background: linear-gradient(135deg, #fbbf24, #f59e0b);
        box-shadow: 0 4px 25px rgba(245, 158, 11, 0.25);
        transform: translateY(-1px);
      }

      .upgrade-btn:hover .arrow-icon {
        transform: translateX(3px);
      }

      .upgrade-btn .arrow-icon {
        transition: transform 0.2s ease-out;
      }

      .crown-glow {
        position: relative;
      }

      .crown-glow::after {
        content: '';
        position: absolute;
        inset: -4px;
        border-radius: 12px;
        background: radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, transparent 70%);
        filter: blur(6px);
        z-index: -1;
      }

      .usage-bar-track {
        background: rgba(255, 255, 255, 0.06);
      }

      .usage-bar-fill {
        background: linear-gradient(90deg, #6366f1, #8b5cf6);
        transition: width 0.5s ease-out;
      }

      .bottom-input-bar {
        background: rgba(10, 10, 10, 0.95);
        backdrop-filter: blur(20px);
        border-top: 1px solid rgba(255, 255, 255, 0.06);
      }

      .select-styled {
        appearance: none;
        -webkit-appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 12px center;
        padding-right: 36px;
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
