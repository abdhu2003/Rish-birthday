"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { audioController } from "@/utils/audio";
import { Sparkles, Eye, Flame, Flower2, Scroll, Zap } from "lucide-react";

export type TransitionType = "sharingan" | "chakra" | "sakura" | "scroll" | "rasengan" | null;

interface AnimeTransitionsProps {
  activeTransition: TransitionType;
  onTransitionEnd: () => void;
}

export default function AnimeTransitions({
  activeTransition,
  onTransitionEnd,
}: AnimeTransitionsProps) {
  return (
    <AnimatePresence>
      {activeTransition === "sharingan" && (
        <SharinganEffect onEnd={onTransitionEnd} />
      )}
      {activeTransition === "chakra" && (
        <ChakraExplosionEffect onEnd={onTransitionEnd} />
      )}
      {activeTransition === "sakura" && (
        <SakuraStormEffect onEnd={onTransitionEnd} />
      )}
      {activeTransition === "scroll" && (
        <ShinobiScrollEffect onEnd={onTransitionEnd} />
      )}
      {activeTransition === "rasengan" && (
        <RasenganEffect onEnd={onTransitionEnd} />
      )}
    </AnimatePresence>
  );
}

// 1. SHARINGAN TRANSITION
function SharinganEffect({ onEnd }: { onEnd: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onAnimationComplete={() => {
        setTimeout(onEnd, 1400);
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl overflow-hidden pointer-events-none"
    >
      {/* Red ambient surge */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: [0.2, 1.8, 12], opacity: [0, 1, 0] }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
        className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-red-600 via-rose-600 to-crimson-800 blur-2xl"
      />

      {/* Sharingan Eye Iris */}
      <motion.div
        initial={{ scale: 0.5, rotate: 0 }}
        animate={{ scale: [0.5, 1.2, 2.5], rotate: [0, 720, 1080] }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-[#b91c1c] border-8 border-black shadow-[0_0_80px_rgba(225,29,72,0.9)] flex items-center justify-center"
      >
        {/* Outer Ring */}
        <div className="absolute inset-4 rounded-full border-2 border-black/80" />

        {/* Pupil */}
        <div className="w-14 h-14 rounded-full bg-black shadow-inner flex items-center justify-center" />

        {/* 3 Tomoe (Sharingan Swirls) */}
        {[0, 120, 240].map((angle, idx) => (
          <div
            key={idx}
            className="absolute"
            style={{
              transform: `rotate(${angle}deg) translate(0, -65px)`,
            }}
          >
            <div className="w-6 h-6 rounded-full bg-black relative flex items-center justify-center">
              {/* Tomoe tail */}
              <div
                className="absolute w-3 h-5 bg-black rounded-b-full origin-top"
                style={{
                  transform: "rotate(40deg) translate(-2px, 2px)",
                  borderRadius: "0 0 100% 0",
                }}
              />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Screen flash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.9, 0] }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute inset-0 bg-red-600 mix-blend-screen"
      />
    </motion.div>
  );
}

// 2. CHAKRA EXPLOSION TRANSITION
function ChakraExplosionEffect({ onEnd }: { onEnd: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onAnimationComplete={() => {
        setTimeout(onEnd, 1200);
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl overflow-hidden pointer-events-none"
    >
      {/* Screen Shake container */}
      <motion.div
        animate={{
          x: [0, -12, 12, -8, 8, -4, 4, 0],
          y: [0, 8, -8, 6, -6, 2, -2, 0],
        }}
        transition={{ duration: 0.7 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* Swirling Orange Nine-Tails Aura */}
        <motion.div
          initial={{ scale: 0.1, opacity: 0 }}
          animate={{ scale: [0.1, 2, 6], opacity: [0, 1, 0] }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-red-600 blur-3xl shadow-[0_0_120px_#FF7F00]"
        />

        {/* Cyan Rasengan Shockwave */}
        <motion.div
          initial={{ scale: 0.1, opacity: 0 }}
          animate={{ scale: [0.1, 1.5, 5], opacity: [0, 0.9, 0] }}
          transition={{ duration: 1.1, delay: 0.1, ease: "easeOut" }}
          className="absolute w-80 h-80 rounded-full border-8 border-cyan-400 bg-cyan-500/20 blur-xl shadow-[0_0_100px_#00BFFF]"
        />

        {/* Kanji Seal Symbol Flash */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -45 }}
          animate={{ scale: [0, 1.3, 2.5], opacity: [0, 1, 0], rotate: [0, 90, 180] }}
          transition={{ duration: 1 }}
          className="text-8xl sm:text-9xl font-bold text-amber-200 select-none glow-text-gold"
        >
          忍
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// 3. SAKURA STORM TRANSITION
function SakuraStormEffect({ onEnd }: { onEnd: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onAnimationComplete={() => {
        setTimeout(onEnd, 1500);
      }}
      className="fixed inset-0 z-50 bg-[#14061a]/90 backdrop-blur-2xl overflow-hidden pointer-events-none flex items-center justify-center"
    >
      {/* 40 Fast flying sakura petals sweeping diagonally across screen */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: "-20vw",
            y: `${(i * 15) % 110}vh`,
            scale: 0.4,
            rotate: 0,
            opacity: 0,
          }}
          animate={{
            x: "120vw",
            y: `${((i * 15) % 110) - 30}vh`,
            scale: [0.4, 1.8, 1.2],
            rotate: [0, 360, 720],
            opacity: [0, 0.95, 0],
          }}
          transition={{
            duration: 1.1 + (i % 5) * 0.1,
            delay: (i % 8) * 0.05,
            ease: "easeInOut",
          }}
          className="absolute w-8 h-10 bg-gradient-to-tr from-pink-400 to-rose-300 rounded-[50%_0_50%_50%] shadow-[0_0_15px_rgba(255,105,180,0.8)]"
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 1, 0], scale: [0.8, 1.1, 1.3] }}
        transition={{ duration: 1.3 }}
        className="text-center z-10"
      >
        <span className="font-serif text-3xl sm:text-5xl font-bold text-pink-200 glow-text-pink block mb-2">
          Sakura Dance 🌸
        </span>
        <span className="text-xs uppercase tracking-widest text-pink-300">Konohagakure Spring Magic</span>
      </motion.div>
    </motion.div>
  );
}

// 4. SHINOBI SCROLL TRANSITION
function ShinobiScrollEffect({ onEnd }: { onEnd: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onAnimationComplete={() => {
        setTimeout(onEnd, 1400);
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-2xl overflow-hidden pointer-events-none p-4"
    >
      {/* Scroll Unfurling */}
      <motion.div
        initial={{ width: "20px", height: "300px" }}
        animate={{ width: ["20px", "90vw", "95vw"], height: ["300px", "450px", "500px"] }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-2xl bg-[#ffeed0] rounded-xl border-4 border-[#8b4513] shadow-[0_0_80px_rgba(255,140,0,0.7)] flex flex-col items-center justify-center overflow-hidden p-6 text-stone-900"
      >
        {/* Left Wooden Scroll Rod */}
        <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#5c2e0b] via-[#8b4513] to-[#3a1d07] rounded-l-md shadow-lg" />
        {/* Right Wooden Scroll Rod */}
        <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#3a1d07] via-[#8b4513] to-[#5c2e0b] rounded-r-md shadow-lg" />

        {/* Shinobi Seal stamp */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-20 h-20 rounded-full border-4 border-red-700 text-red-700 flex items-center justify-center font-bold text-3xl mb-4 shadow-sm"
        >
          封
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="font-serif text-2xl sm:text-4xl font-extrabold text-stone-900 text-center tracking-tight"
        >
          Secret Birthday Mission Unlocked!
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-stone-700 text-sm sm:text-base italic text-center mt-2 max-w-md"
        >
          &ldquo;By order of the Hokage: Celebrate this glorious day to the fullest!&rdquo; 🍥
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

// 5. RASENGAN TRANSITION
function RasenganEffect({ onEnd }: { onEnd: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onAnimationComplete={() => {
        setTimeout(onEnd, 1300);
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl overflow-hidden pointer-events-none"
    >
      {/* Rasengan Core Sphere */}
      <motion.div
        initial={{ scale: 0.2, rotate: 0 }}
        animate={{ scale: [0.2, 1.5, 14], rotate: [0, 720, 1800] }}
        transition={{ duration: 1.3, ease: [0.25, 1, 0.5, 1] }}
        className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-cyan-400 via-sky-300 to-white shadow-[0_0_120px_#00BFFF] flex items-center justify-center"
      >
        {/* Concentric swirling wind rings */}
        <div className="absolute inset-2 rounded-full border-4 border-cyan-200/70 animate-spin" />
        <div className="absolute inset-6 rounded-full border-4 border-blue-400/80 animate-spin-slow" />
        <div className="absolute inset-10 rounded-full border-4 border-white/90 animate-spin" />

        {/* Center glowing core */}
        <div className="w-24 h-24 rounded-full bg-white shadow-[0_0_50px_#ffffff]" />
      </motion.div>

      {/* Screen Flash burst */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.85, 0] }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="absolute inset-0 bg-cyan-400 mix-blend-screen"
      />
    </motion.div>
  );
}

