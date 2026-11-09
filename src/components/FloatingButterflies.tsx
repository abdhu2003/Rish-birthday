"use client";

import { motion } from "framer-motion";

interface ButterflyProps {
  delay?: number;
  startX?: number;
  startY?: number;
  size?: number;
  color?: string;
  duration?: number;
}

const Butterfly = ({
  delay = 0,
  startX = 10,
  startY = 40,
  size = 32,
  color = "#FF69B4",
  duration = 18,
}: ButterflyProps) => {
  return (
    <motion.div
      className="fixed pointer-events-none z-10"
      initial={{
        x: `${startX}vw`,
        y: `${startY}vh`,
        opacity: 0,
        scale: 0.6,
      }}
      animate={{
        x: [`${startX}vw`, `${(startX + 35) % 95}vw`, `${(startX + 70) % 95}vw`, `${startX}vw`],
        y: [
          `${startY}vh`,
          `${Math.max(10, (startY - 25 + 100) % 80)}vh`,
          `${Math.min(85, (startY + 20) % 85)}vh`,
          `${startY}vh`,
        ],
        opacity: [0, 0.85, 0.9, 0.75, 0],
        rotate: [0, 15, -12, 10, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ width: size, height: size }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Left Wing */}
        <motion.div
          className="absolute right-1/2 origin-right w-1/2 h-full"
          animate={{
            rotateY: [0, 65, 0, 75, 0],
          }}
          transition={{
            duration: 0.35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 50 60" fill="none" className="w-full h-full drop-shadow-[0_0_8px_rgba(255,105,180,0.6)]">
            <path
              d="M50 30 C30 5, 0 10, 5 35 C10 48, 35 48, 50 35 Z"
              fill={color}
              fillOpacity="0.85"
            />
            <path
              d="M50 30 C35 38, 15 45, 20 55 C28 62, 42 50, 50 35 Z"
              fill={color}
              fillOpacity="0.65"
            />
            <circle cx="20" cy="28" r="4" fill="#FFF" fillOpacity="0.7" />
          </svg>
        </motion.div>

        {/* Body */}
        <div className="w-[3px] h-3/4 bg-amber-100 rounded-full z-10 shadow-sm" />

        {/* Right Wing */}
        <motion.div
          className="absolute left-1/2 origin-left w-1/2 h-full"
          animate={{
            rotateY: [0, -65, 0, -75, 0],
          }}
          transition={{
            duration: 0.35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            viewBox="0 0 50 60"
            fill="none"
            className="w-full h-full drop-shadow-[0_0_8px_rgba(255,105,180,0.6)] scale-x-[-1]"
          >
            <path
              d="M50 30 C30 5, 0 10, 5 35 C10 48, 35 48, 50 35 Z"
              fill={color}
              fillOpacity="0.85"
            />
            <path
              d="M50 30 C35 38, 15 45, 20 55 C28 62, 42 50, 50 35 Z"
              fill={color}
              fillOpacity="0.65"
            />
            <circle cx="20" cy="28" r="4" fill="#FFF" fillOpacity="0.7" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function FloatingButterflies() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      <Butterfly delay={0} startX={8} startY={25} size={36} color="#FF69B4" duration={22} />
      <Butterfly delay={4} startX={82} startY={45} size={30} color="#BA55D3" duration={26} />
      <Butterfly delay={8} startX={45} startY={70} size={34} color="#FFB6C1" duration={24} />
      <Butterfly delay={12} startX={20} startY={60} size={28} color="#FFD700" duration={20} />
      <Butterfly delay={16} startX={75} startY={20} size={32} color="#EE82EE" duration={25} />
    </div>
  );
}

