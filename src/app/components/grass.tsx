"use client";
import React, { useEffect, useState } from "react";

interface GrassProps {
  bladeCount?: number;
  color?: string;
  heightRange?: [number, number];
  animationDelayRange?: [number, number];
  strokeWidth?: number;
  opacity?: number;
}

interface Blade {
  height: number;
  left: number;
  delay: number;
}

export default function Grass({
  bladeCount = 200,
  color = "#228B22",
  heightRange = [50, 120],
  animationDelayRange = [0, 2],
  opacity = 1,
  strokeWidth = 0.8,
}: GrassProps) {
  const [blades, setBlades] = useState<Blade[] | null>(null);

  useEffect(() => {
    const newBlades = Array.from({ length: bladeCount }).map(() => ({
      height: heightRange[0] + Math.random() * (heightRange[1] - heightRange[0]),
      left: Math.random() * 100,
      delay:
        animationDelayRange[0] +
        Math.random() * (animationDelayRange[1] - animationDelayRange[0]),
    }));
    setBlades(newBlades);
  }, []);

  if (!blades) return null;

  return (
    <>
      {blades.map((blade, idx) => (
        <svg
          key={idx}
          viewBox="0 0 10 100"
          className="absolute bottom-0"
          style={{
            height: `${blade.height}px`,
            left: `${blade.left}%`,
            opacity,
            animationDelay: `${blade.delay}s`,
          }}
        >
          <path
            d="M5,100 C5,75 0,25 5,0"
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            className="animate-sway"
          />
        </svg>
      ))}
    </>
  );
}
