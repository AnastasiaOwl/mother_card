"use client";
import React, { useEffect, useState } from "react";

interface GrassProps {
  bladeCount?: number;
  color?: string;
  heightRange?: [number, number];
  animationDelayRange?: [number, number];
  strokeWidth?: number;
  opacity?: number;
  className?: string;
}

interface Blade {
  height: number;
  left: number;
  delay: number;
  sway: number;
  id: number;
}

export default function Grass({
  bladeCount = 200,
  color,
  heightRange = [50, 120],
  animationDelayRange = [0, 2],
  opacity = 1,
  strokeWidth = 0.8,
}: GrassProps) {
  const [blades, setBlades] = useState<Blade[] | null>(null);

  useEffect(() => {
    const newBlades = Array.from({ length: bladeCount }).map((_, i) => ({
      id: i,
      height: heightRange[0] + Math.random() * (heightRange[1] - heightRange[0]),
      left: (i / bladeCount) * 100 + Math.random(),
      delay: animationDelayRange[0] + Math.random() * (animationDelayRange[1] - animationDelayRange[0]),
      sway: (Math.random() - 0.5) * 30,
    }));
    setBlades(newBlades);
  }, [bladeCount, heightRange, animationDelayRange]);

  if (!blades) return null;

  return (
    <>
      {blades.map((blade, idx) => {
        const path = `M5,100 C5,75 ${5 + blade.sway},25 5,0`;

        return (
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
            <defs>
              <linearGradient
                id={`fade-stroke-${idx}`}
                x1="0"
                y1="0"
                x2="0"
                y2="100"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor={color} stopOpacity="0" />
                <stop offset="30%" stopColor={color} stopOpacity="0.4" />
                <stop offset="100%" stopColor={color} stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              d={path}
              stroke={`url(#fade-stroke-${idx})`}
              strokeWidth={strokeWidth}
              fill="none"
              className="animate-sway"
            />
          </svg>
        );
      })}
    </>
  );
}
