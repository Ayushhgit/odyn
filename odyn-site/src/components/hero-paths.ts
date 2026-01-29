"use client";

// ============================================================================
// HERO_PATHS: Single source of truth for connection line geometry
// Both SVG and Canvas use this - prevents drift between visual systems
// ============================================================================
export const MERGE_X = 50; // Centered horizontally
export const MERGE_Y = 65; // Vertically below "environment." (in the gap before subtext)

export const HERO_PATHS = {
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
