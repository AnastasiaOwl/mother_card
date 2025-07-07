"use client";
import React, { useEffect, useRef } from "react";

interface DandelionProps {
  count?: number;
  color?: string;
  radiusRange?: [number, number];
  className?: string;
}

export default function Dandelions({
  count = 300,
  color = "#ffeb3b",
  radiusRange = [20, 23],
  className = "",
}: DandelionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const flowers = Array.from({ length: count }).map(() => {
      const x = Math.random() * width;
      const y = height - Math.random() * height * 0.65;
      const r = radiusRange[0] + Math.random() * (radiusRange[1] - radiusRange[0]);
      return { x, y, r };
    });

    for (const { x, y, r } of flowers) {
      const centerGradient = ctx.createRadialGradient(x, y, 0, x, y, r * 0.9);
      centerGradient.addColorStop(0, color);
      centerGradient.addColorStop(1, `${color}00`);

      ctx.beginPath();
      ctx.arc(x, y, r * 1, 0, Math.PI * 2);
      ctx.fillStyle = centerGradient;
      ctx.fill();

      const petalCount = 14;
      for (let i = 0; i < petalCount; i++) {
        const angle = (i / petalCount) * Math.PI * 2;
        const px = x + Math.cos(angle) * r;
        const py = y + Math.sin(angle) * r;
        const gradient = ctx.createRadialGradient(px, py, 0, px, py, r * 0.6);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, `${color}00`);

        ctx.beginPath();
        ctx.arc(px, py, r * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }
  }, [count, color, radiusRange]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute top-0 left-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 1100 }}
    />
  );
}

