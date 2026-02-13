"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ProgressBar({ scaleX }: { scaleX: any }) {
    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 origin-left z-[100]"
            style={{ scaleX }}
        />
    );
}
