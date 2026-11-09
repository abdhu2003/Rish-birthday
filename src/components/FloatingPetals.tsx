"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Petal {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  sway: number;
  color: string;
}

export default function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const colors = [
      "rgba(255, 182, 193, 0.7)", // light pink
      "rgba(255, 105, 180, 0.65)", // hot pink
      "rgba(255, 192, 203, 0.8)", // pink
      "rgba(230, 230, 250, 0.6)", // lavender
    ];

    const items: Petal[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 95,
      size: Math.random() * 12 + 10,
      duration: Math.random() * 8 + 12,
      delay: Math.random() * 10,
      rotation: Math.random() * 360,
      sway: Math.random() * 60 + 30,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setPetals(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          initial={{
            top: "-5%",
            left: `${petal.x}%`,
            opacity: 0,
            rotate: petal.rotation,
          }}
          animate={{
            top: "105%",
            left: [
              `${petal.x}%`,
              `${petal.x + petal.sway / 15}%`,
              `${petal.x - petal.sway / 15}%`,
              `${petal.x}%`,
            ],
            rotate: [petal.rotation, petal.rotation + 180, petal.rotation + 360],
            opacity: [0, 0.8, 0.85, 0.4, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: petal.size,
            height: petal.size * 1.3,
          }}
        >
          {/* Petal SVG */}
          <svg viewBox="0 0 30 40" fill="none" className="w-full h-full drop-shadow-sm">
            <path
              d="M15 0 C25 10, 30 25, 15 40 C0 25, 5 10, 15 0 Z"
              fill={petal.color}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

