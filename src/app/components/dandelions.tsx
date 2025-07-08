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

    const flowers: { x: number; y: number; r: number; delay: number }[] = [];
    let attempts = 0;
    while (flowers.length < count && attempts < count * 10) {
      attempts++;
      const r = radiusRange[0] + Math.random() * (radiusRange[1] - radiusRange[0]);
      const x = Math.random() * (width - 2 * r) + r;
      const y = height - Math.random() * height * 0.65;
      const delay = Math.random() * 2000;

      const overlaps = flowers.some(f => {
        const dx = f.x - x;
        const dy = f.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist < f.r + r + 5;
      });

      if (!overlaps) flowers.push({ x, y, r, delay });
    }

    let startTime: number | null = null;

    function drawFrame(time: number) {
      if (startTime === null) startTime = time;
      const elapsed = time - startTime;

      ctx!.clearRect(0, 0, width, height);

        for (const { x, y, r, delay } of flowers) {
            const localTime = Math.max(0, elapsed - delay);
            const progress = Math.min(localTime / 2000, 1);

            const centerRadius = r * 0.3 * progress;
            const centerGradient = ctx!.createRadialGradient(x, y, 0, x, y, centerRadius);
            centerGradient.addColorStop(0, color);
            centerGradient.addColorStop(1, `${color}00`);
            ctx!.beginPath();
            ctx!.arc(x, y, centerRadius, 0, Math.PI * 2);
            ctx!.fillStyle = centerGradient;
            ctx!.fill();


            const centerPetalCount = 8;
            const centerFlowerRadius = r * 0.5 * progress;

            for (let i = 0; i < centerPetalCount; i++) {
              const angle = (i / centerPetalCount) * Math.PI * 2;
              const cx = x + Math.cos(angle) * centerFlowerRadius;
              const cy = y + Math.sin(angle) * centerFlowerRadius;

              const petalRadius = r * 0.35 * progress;
              const gradient = ctx!.createRadialGradient(cx, cy, 0, cx, cy, petalRadius);
              gradient.addColorStop(0, color);
              gradient.addColorStop(1, `${color}00`);

              ctx!.beginPath();
              ctx!.arc(cx, cy, petalRadius, 0, Math.PI * 2);
              ctx!.fillStyle = gradient;
              ctx!.fill();
            }

            const petalCount = 14;
            for (let i = 0; i < petalCount; i++) {
              const angle = (i / petalCount) * Math.PI * 2;
              const px = x + Math.cos(angle) * r * progress;
              const py = y + Math.sin(angle) * r * progress;

              const petalRadius = r * 0.6 * progress;
              const gradient = ctx!.createRadialGradient(px, py, 0, px, py,  petalRadius);
              gradient.addColorStop(0, color);
              gradient.addColorStop(1, `${color}00`);

              ctx!.beginPath();
              ctx!.arc(px, py,  petalRadius, 0, Math.PI * 2);
              ctx!.fillStyle = gradient;
              ctx!.fill();
            }
          }
          requestAnimationFrame(drawFrame);
        }
        requestAnimationFrame(drawFrame);
        }, [count, color, radiusRange]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute top-0 left-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 1100 }}
    />
  );
}

