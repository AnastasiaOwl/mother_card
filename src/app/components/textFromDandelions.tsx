import React, { useEffect, useRef, useState } from "react";
import pointsDesktop from "../particle-points.json";
import pointsMobile from "../particle-points-mobile.json";
import { getFlowerCenters } from "./flowerStore";

type Point = { x: number; y: number };

type Props = {
  color?: string;
  duration?: number;
};

export default function TextFromDandelions({
  color = "yellow",
  duration = 2,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<Point[] | null>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 660 });
  const isMobile = window.innerWidth < 1024;

  useEffect(() => {
    setPoints(isMobile ? pointsMobile : pointsDesktop);
    setDimensions(isMobile ? { width: 700, height: 380 } : { width: 1200, height: 660 });
  }, [isMobile]);

  useEffect(() => {
    if (!points) return;

    const flowers = getFlowerCenters();
    if (!flowers.length) return;

    const { width, height } = dimensions;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles = points.map((to, i) => {
      const flower = flowers[i % flowers.length];
      return {
        from: {
          x: flower.x + Math.random() * 10 - 5,
          y: flower.y + Math.random() * 10 - 5,
        },
        to,
        delay: Math.random() * 1.5,
        t: 0,
        isPetal: true,
      };
    });

    let running = true;
    let start: number | null = null;

    function animate(now: number) {
      if (!running || !ctx) return;
      if (!start) start = now;
      const elapsed = (now - start) / 1000;
      ctx.clearRect(0, 0, width, height);

      let allParticlesCompleted = true;

      for (let p of particles) {
        const localElapsed = Math.max(0, elapsed - p.delay);
        const t =
          localElapsed < 0
            ? 0
            : localElapsed > duration
            ? 1
            : 1 - Math.pow(1 - localElapsed / duration, 2.3);

        if (t < 1) allParticlesCompleted = false;

        const windOffset = Math.sin(p.from.y * 0.05 + elapsed * 1.8) * 20 * (1 - t);
        const x = p.from.x + (p.to.x - p.from.x) * t + windOffset;
        const y = p.from.y + (p.to.y - p.from.y) * t;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.sin(elapsed + x * 0.01));

        if (t === 1) {
          p.isPetal = false;
        }

        if (p.isPetal) {
          ctx.beginPath();
           ctx.ellipse(
            0, 0,
            isMobile ? 3 : 6,
            isMobile ? 1.5 : 3,
            0, 0, Math.PI * 2
          );
        } else {
          ctx.beginPath();
            ctx.arc(
            0, 0,
            isMobile ? 2 : 4,
            0, Math.PI * 2
          );

        }

        ctx.fillStyle = color;
        ctx.globalAlpha = 0.8 * t;
        ctx.fill();
        ctx.restore();
      }

      ctx.globalAlpha = 1;
      if (elapsed < duration + 0.6 || !allParticlesCompleted) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
    return () => {
      running = false;
    };
  }, [points, dimensions, color, duration, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      style={{
        display: "block",
        margin: "0 auto",
        position: "fixed",
        left: "50%",
        top: "65%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 3000000,
        background: "transparent",
      }}
    />
  );
}
