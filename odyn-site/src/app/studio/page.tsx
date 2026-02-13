"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Menu } from "lucide-react";
import StudioStyles from "@/components/studio/StudioStyles";
import Sidebar from "@/components/studio/StudioNav";
import PromptInput from "@/components/studio/PromptInput";
import ChatArea from "@/components/studio/PreviewPanel";
import type { ChatMessage } from "@/components/studio/PreviewPanel";

export default function StudioPage() {
    const [mounted, setMounted] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Prompt state
    const [prompt, setPrompt] = useState("");

    // Settings state
    const [template, setTemplate] = useState("intro");
    const [resolution, setResolution] = useState("720p");
    const [duration, setDuration] = useState(5);
    const [fps, setFps] = useState(30);

    // Chat messages
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        setMounted(true);
        return () => {
            if (progressRef.current) clearInterval(progressRef.current);
        };
    }, []);

    const handleGenerate = useCallback(() => {
        if (!prompt.trim()) return;

        // Check if already rendering
        const isRendering = messages.some((m) => m.status === "rendering");
        if (isRendering) return;

        const userMsg: ChatMessage = {
            id: `user-${Date.now()}`,
            type: "user",
            text: prompt.trim(),
        };

        const systemId = `system-${Date.now()}`;
        const systemMsg: ChatMessage = {
            id: systemId,
            type: "system",
            text: prompt.trim(),
            status: "rendering",
            progress: 0,
        };

        setMessages((prev) => [...prev, userMsg, systemMsg]);
        setPrompt("");

        // Simulate rendering progress
        progressRef.current = setInterval(() => {
            setMessages((prev) => {
                const msgIndex = prev.findIndex((m) => m.id === systemId);
                if (msgIndex === -1) return prev;

                const msg = prev[msgIndex];
                const currentProgress = msg.progress || 0;

                if (currentProgress >= 100) {
                    if (progressRef.current) clearInterval(progressRef.current);
                    const updated = [...prev];
                    updated[msgIndex] = { ...msg, status: "complete", progress: 100 };
                    return updated;
                }

                const increment = currentProgress < 30 ? 4 : currentProgress < 70 ? 2 : currentProgress < 90 ? 3 : 5;
                const updated = [...prev];
                updated[msgIndex] = { ...msg, progress: Math.min(100, currentProgress + increment) };
                return updated;
            });
        }, 200);
    }, [prompt, messages]);

    if (!mounted) return <div className="min-h-screen bg-[#0a0a0a]" />;

    const isRendering = messages.some((m) => m.status === "rendering");

    return (
        <div className="h-screen studio-bg text-white antialiased flex overflow-hidden">
            <StudioStyles />

            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(false)} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col lg:ml-[300px] min-w-0">
                {/* Mobile header */}
                <div className="lg:hidden flex items-center px-5 py-4 border-b border-white/[0.06]">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/[0.05] transition-colors"
                    >
                        <Menu className="w-6 h-6 text-white/60" />
                    </button>
                    <span className="ml-3 text-base font-semibold text-white/60">Odyn Studio</span>
                </div>

                {/* Chat Area */}
                <ChatArea messages={messages} />

                {/* Bottom Input Bar */}
                <PromptInput
                    prompt={prompt}
                    setPrompt={setPrompt}
                    onGenerate={handleGenerate}
                    isRendering={isRendering}
                    template={template}
                    setTemplate={setTemplate}
                    resolution={resolution}
                    setResolution={setResolution}
                    duration={duration}
                    setDuration={setDuration}
                    fps={fps}
                    setFps={setFps}
                />
            </div>
        </div>
    );
}
