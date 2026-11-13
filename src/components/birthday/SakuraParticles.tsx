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

interface FloatingHeart {
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

interface ClickHeart {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  rotation: number;
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

    // 1. Sakura petals setup
    const petalColors = [
      "rgba(255, 183, 197, ", // Soft Sakura Pink
      "rgba(255, 105, 180, ", // Hot Pink
      "rgba(254, 205, 211, ", // Gentle Blush
      "rgba(244, 114, 182, ", // Vibrant Cherry
    ];

    const petalCount = Math.min(Math.floor(width / 34), 32);
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

    // 2. Floating Romantic Hearts Setup
    const heartColors = [
      "rgba(255, 20, 147, ",  // Deep Pink
      "rgba(255, 105, 180, ", // Hot Pink
      "rgba(244, 63, 94, ",   // Rose Red
      "rgba(251, 113, 133, ", // Warm Peach Pink
      "rgba(217, 70, 239, ",  // Fuchsia
    ];

    const heartCount = Math.min(Math.floor(width / 45), 24);
    const hearts: FloatingHeart[] = [];

    for (let i = 0; i < heartCount; i++) {
      hearts.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 12 + 10,
        speedY: -(Math.random() * 0.8 + 0.4), // Float upwards
        speedX: (Math.random() - 0.5) * 0.4,
        rotation: (Math.random() - 0.5) * 30,
        rotationSpeed: (Math.random() - 0.5) * 0.8,
        swaySpeed: Math.random() * 0.025 + 0.012,
        swayOffset: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.45 + 0.35,
        color: heartColors[Math.floor(Math.random() * heartColors.length)],
      });
    }

    // 3. Interactive Click Hearts Array
    const clickHearts: ClickHeart[] = [];

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      for (let i = 0; i < 7; i++) {
        const angle = (Math.PI * 2 * i) / 7 + (Math.random() - 0.5) * 0.6;
        const speed = Math.random() * 2.8 + 1.2;
        clickHearts.push({
          x: clientX,
          y: clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.8,
          size: Math.random() * 9 + 8,
          alpha: 1.0,
          color: heartColors[Math.floor(Math.random() * heartColors.length)],
          rotation: (Math.random() - 0.5) * 45,
        });
      }
    };
    window.addEventListener("pointerdown", handlePointerDown);

    // 4. Glowing chakra particles (orange & cyan blue)
    const chakraColors = [
      "rgba(255, 140, 0, ",  // Naruto Nine-Tails Orange
      "rgba(255, 180, 0, ",  // Golden Chakra
      "rgba(0, 191, 255, ",  // Rasengan Cyan Blue
      "rgba(56, 189, 248, ", // Light Sky Blue
    ];

    const chakraCount = Math.min(Math.floor(width / 45), 22);
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

    const drawHeart = (
      x: number,
      y: number,
      size: number,
      rot: number,
      color: string,
      opacity: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rot * Math.PI) / 180);
      ctx.beginPath();
      const topCurveHeight = size * 0.35;
      ctx.moveTo(0, topCurveHeight);
      ctx.bezierCurveTo(-size / 2, -topCurveHeight, -size, size / 3, 0, size);
      ctx.bezierCurveTo(size, size / 3, size / 2, -topCurveHeight, 0, topCurveHeight);
      ctx.closePath();
      ctx.fillStyle = `${color}${opacity})`;
      ctx.shadowColor = "#FF1493";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    };

    let tick = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      // 1. Render glowing chakra sparks
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

      // 2. Render falling sakura petals
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

      // 3. Render floating romantic hearts (rising upward)
      for (let i = 0; i < hearts.length; i++) {
        const h = hearts[i];
        h.y += h.speedY;
        h.x += Math.sin(tick * h.swaySpeed + h.swayOffset) * 0.9 + h.speedX;
        h.rotation += h.rotationSpeed;

        if (h.y < -30) {
          h.y = height + 20;
          h.x = Math.random() * width;
        }
        if (h.x < -20) h.x = width + 20;
        if (h.x > width + 20) h.x = -20;

        drawHeart(h.x, h.y, h.size, h.rotation, h.color, h.opacity);
      }

      // 4. Render interactive click hearts
      for (let i = clickHearts.length - 1; i >= 0; i--) {
        const ch = clickHearts[i];
        ch.x += ch.vx;
        ch.y += ch.vy;
        ch.vy += 0.05; // Gentle float
        ch.alpha -= 0.015;
        ch.rotation += 1.2;

        if (ch.alpha <= 0) {
          clickHearts.splice(i, 1);
        } else {
          drawHeart(ch.x, ch.y, ch.size, ch.rotation, ch.color, Math.max(0, ch.alpha));
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointerdown", handlePointerDown);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-85"
      aria-hidden="true"
    />
  );
}
