"use client";

import { useEffect, useRef } from "react";

interface SakuraPetal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  swaySpeed: number;
  swayOffset: number;
  opacity: number;
  color: string;
}

interface ChakraParticle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  alpha: number;
  maxAlpha: number;
  fadeSpeed: number;
  color: string;
}

export default function SakuraParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Sakura petals setup
    const petalColors = [
      "rgba(255, 183, 197, ", // Soft Sakura Pink
      "rgba(255, 105, 180, ", // Hot Pink
      "rgba(254, 205, 211, ", // Gentle Blush
      "rgba(244, 114, 182, ", // Vibrant Cherry
    ];

    const petalCount = Math.min(Math.floor(width / 32), 40);
    const petals: SakuraPetal[] = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 10 + 8,
        speedY: Math.random() * 0.9 + 0.6,
        speedX: Math.random() * 0.6 + 0.3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.5,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayOffset: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.5 + 0.35,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
      });
    }

    // Glowing chakra particles (orange & cyan blue)
    const chakraColors = [
      "rgba(255, 140, 0, ",  // Naruto Nine-Tails Orange
      "rgba(255, 180, 0, ",  // Golden Chakra
      "rgba(0, 191, 255, ",  // Rasengan Cyan Blue
      "rgba(56, 189, 248, ", // Light Sky Blue
    ];

    const chakraCount = Math.min(Math.floor(width / 40), 30);
    const chakraParticles: ChakraParticle[] = [];

    for (let i = 0; i < chakraCount; i++) {
      chakraParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 1.2,
        speedY: -(Math.random() * 0.6 + 0.2),
        speedX: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.6 + 0.2,
        maxAlpha: Math.random() * 0.5 + 0.3,
        fadeSpeed: Math.random() * 0.012 + 0.005,
        color: chakraColors[Math.floor(Math.random() * chakraColors.length)],
      });
    }

    const drawPetal = (x: number, y: number, size: number, rot: number, color: string, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rot * Math.PI) / 180);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-size / 2, -size / 2, -size, size / 3, 0, size);
      ctx.bezierCurveTo(size, size / 3, size / 2, -size / 2, 0, 0);
      ctx.fillStyle = `${color}${opacity})`;
      ctx.fill();
      ctx.restore();
    };

    let tick = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      // Render glowing chakra sparks
      for (let i = 0; i < chakraParticles.length; i++) {
        const cp = chakraParticles[i];
        cp.y += cp.speedY;
        cp.x += cp.speedX;
        cp.alpha += cp.fadeSpeed;

        if (cp.alpha > cp.maxAlpha || cp.alpha < 0.1) {
          cp.fadeSpeed = -cp.fadeSpeed;
        }

        if (cp.y < -20) {
          cp.y = height + 10;
          cp.x = Math.random() * width;
        }
        if (cp.x < -10) cp.x = width + 10;
        if (cp.x > width + 10) cp.x = -10;

        ctx.beginPath();
        ctx.arc(cp.x, cp.y, cp.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${cp.color}${Math.max(0, Math.min(cp.alpha, 1))})`;
        ctx.shadowColor = cp.color.includes("140") ? "#FF7F00" : "#00BFFF";
        ctx.shadowBlur = 8;
        ctx.fill();
      }

      ctx.shadowBlur = 0;

      // Render falling sakura petals
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.x += Math.sin(tick * p.swaySpeed + p.swayOffset) * 0.8 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) {
          p.x = -20;
        }

        drawPetal(p.x, p.y, p.size, p.rotation, p.color, p.opacity);
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-80"
      aria-hidden="true"
    />
  );
}

