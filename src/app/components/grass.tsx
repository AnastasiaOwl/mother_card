"use client";
import React, { useEffect, useRef } from "react";

interface GrassProps {
  bladeCount?: number;
  color?: string;
  heightRange?: [number, number];
  swayAmount?: number;
  strokeWidth?: number;
  swayPhase?: number; // 🌿 New prop
  className?: string;
}

export default function Grass({
  bladeCount = 2000,
  color = "#228B22",
  heightRange = [50, 120],
  swayAmount = 10,
  strokeWidth = 0.8,
  swayPhase = 0,
  className = "",
}: GrassProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const zIndex = parseInt(className?.match(/z-(\d+)/)?.[1] || "0");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const blades = Array.from({ length: bladeCount }).map(() => {
      return {
        x: Math.random() * width,
        bladeHeight: heightRange[0] + Math.random() * (heightRange[1] - heightRange[0]),
        swaySpeed: 1 + Math.random(),
      };
    });

    function drawFrame(time: number) {
      ctx!.clearRect(0, 0, width, height);

      for (let i = 0; i < blades.length; i++) {
        const { x, bladeHeight, swaySpeed } = blades[i];
        const sway = Math.sin(time / 1000 * swaySpeed + swayPhase) * swayAmount;

        const gradient = ctx!.createLinearGradient(x, height, x, height - bladeHeight);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, `${color}00`);

        ctx!.beginPath();
        ctx!.moveTo(x, height);
        ctx!.quadraticCurveTo(x + sway, height - bladeHeight / 2, x, height - bladeHeight);
        ctx!.strokeStyle = gradient;
        ctx!.lineWidth = strokeWidth;
        ctx!.stroke();
      }

      requestAnimationFrame(drawFrame);
    }

    requestAnimationFrame(drawFrame);
  }, [bladeCount, color, heightRange, swayAmount, strokeWidth, swayPhase]);

  return (
    <div
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
