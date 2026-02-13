"use client";

import React, { useEffect, useState } from "react";

export default function CursorGlow() {
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
