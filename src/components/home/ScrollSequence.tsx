"use client";

import { useMotionValueEvent, useTransform, MotionValue } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

interface ScrollSequenceProps {
    progress: MotionValue<number>;
}

const frameCount = 192;
const images: HTMLImageElement[] = [];

// Preload images immediately
if (typeof window !== "undefined") {
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = `/hero-sequence/ezgif-frame-${i.toString().padStart(3, "0")}.jpg`;
        images.push(img);
    }
}

export default function ScrollSequence({ progress }: ScrollSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Map scroll progress (0-1) to frame index (0-191)
    // We clamp it to make sure we don't exceed bounds
    const frameIndex = useTransform(progress, [0, 1], [0, frameCount - 1]);

    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = images[index];
        if (!img || !img.complete) return;

        // Calculate aspect ratio "cover" logic
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgWidth = img.width;
        const imgHeight = img.height;

        const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
        const centerShift_x = (canvasWidth - imgWidth * ratio) / 2;
        const centerShift_y = (canvasHeight - imgHeight * ratio) / 2;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(
            img,
            0,
            0,
            imgWidth,
            imgHeight,
            centerShift_x,
            centerShift_y,
            imgWidth * ratio,
            imgHeight * ratio
        );
    }, []);

    // Listen to frame index changes
    useMotionValueEvent(frameIndex, "change", (latest) => {
        renderFrame(Math.round(latest));
    });

    // Initial render and resize handling
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                renderFrame(Math.round(frameIndex.get()));
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Set initial size

        // Mark as loaded when at least the first image is ready
        if (images[0].complete) {
            setIsLoaded(true);
            renderFrame(0);
        } else {
            images[0].onload = () => {
                setIsLoaded(true);
                renderFrame(0);
            };
        }

        return () => window.removeEventListener("resize", handleResize);
    }, [renderFrame, frameIndex]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full block object-cover"
            style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.5s ease" }}
        />
    );
}
