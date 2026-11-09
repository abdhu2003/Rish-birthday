"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Wand2, Award } from "lucide-react";
import { birthdayConfig } from "@/birthdayConfig";
import { fireHeartExplosion } from "@/utils/confetti";
import { audioController } from "@/utils/audio";

interface FloatingHeartItem {
  id: number;
  x: number;
  y: number;
}

export default function HeartExperienceSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeartItem[]>([]);

  const handleHeartClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    // Heart explosion & sound
    fireHeartExplosion(x, y);
    audioController.playHeartbeatSound();

    // Advance message
    setCurrentIndex((prev) => (prev + 1) % birthdayConfig.heartExperience.messages.length);
    setClickCount((prev) => prev + 1);

    // Add mini floating hearts
    const newId = Date.now() + Math.random();
    setFloatingHearts((prev) => [
      ...prev.slice(-6),
      { id: newId, x: (Math.random() - 0.5) * 100, y: (Math.random() - 0.5) * 50 },
    ]);
  };

  const currentMessage = birthdayConfig.heartExperience.messages[currentIndex];

  return (
    <section id="heart" className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden text-center">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] bg-gradient-to-tr from-pink-600/20 via-rose-500/15 to-purple-700/20 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-300 text-xs sm:text-sm font-medium mb-3 sm:mb-4"
        >
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
          <span>Tap For Pure Love</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight glow-text-pink mb-2 sm:mb-3 px-2"
        >
          {birthdayConfig.heartExperience.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-pink-200/80 text-xs sm:text-base max-w-lg mx-auto italic font-light mb-8 sm:mb-12 px-3"
        >
          {birthdayConfig.heartExperience.subheading}
        </motion.p>

        {/* Center Glowing Heart Container */}
        <div className="relative my-4 sm:my-6 cursor-pointer select-none" onClick={handleHeartClick}>
          {/* Pulsing Aura Rings */}
          <motion.div
            className="absolute -inset-6 sm:-inset-8 rounded-full bg-pink-500/20 blur-xl sm:blur-2xl pointer-events-none"
            animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Main Interactive Heart */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.88 }}
            className="relative w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-pink-600 via-rose-500 to-purple-500 flex items-center justify-center shadow-[0_0_40px_rgba(255,105,180,0.65)] border-2 border-pink-200/60 animate-heart-pulse"
          >
            <Heart className="w-16 h-16 sm:w-24 sm:h-24 text-white fill-white drop-shadow-[0_0_18px_rgba(255,255,255,0.9)]" />

            {/* Sparkle badge */}
            <div className="absolute top-2 right-2">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 animate-spin-slow drop-shadow" />
            </div>
          </motion.div>

          {/* Mini Floating Hearts on click */}
          <AnimatePresence>
            {floatingHearts.map((fh) => (
              <motion.div
                key={fh.id}
                initial={{ opacity: 1, scale: 0.6, x: fh.x, y: 0 }}
                animate={{ opacity: 0, scale: 1.4, x: fh.x + (Math.random() - 0.5) * 30, y: -100 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30"
              >
                <Heart className="w-5 h-5 text-pink-400 fill-pink-400 drop-shadow-md" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Tap Instruction Pill */}
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-widest text-pink-300/70 font-semibold mb-6 sm:mb-8">
          <Wand2 className="w-3.5 h-3.5 text-yellow-300" />
          <span>{birthdayConfig.heartExperience.instruction}</span>
        </div>

        {/* Revealed Touching Friendship Message Card */}
        <div className="w-full max-w-xl min-h-[110px] sm:min-h-[140px] flex items-center justify-center px-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.96 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full p-5 sm:p-8 rounded-2xl sm:rounded-3xl glass-panel-pink border border-pink-300/40 shadow-[0_10px_35px_rgba(255,105,180,0.25)] text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
              <p className="font-serif text-lg sm:text-2xl md:text-3xl font-semibold text-pink-100 glow-text-pink leading-snug">
                &ldquo;{currentMessage}&rdquo;
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Love & Appreciation Meter */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-pink-200/80 bg-purple-950/50 border border-pink-400/20 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full backdrop-blur-md max-w-[94vw]">
          <div className="flex items-center gap-1.5 shrink-0">
            <Award className="w-4 h-4 text-yellow-300" />
            <span className="font-semibold text-pink-100">Love Meter:</span>
          </div>
          <span className="truncate">
            {clickCount === 0
              ? "100% (Unconditional)"
              : clickCount < 5
              ? `Level ${clickCount}: Pure Magic 💖`
              : clickCount < 10
              ? `Level ${clickCount}: Soul Bestie 🌟`
              : `Level ${clickCount}: Priceless Royalty 👑`}
          </span>
          <span className="text-pink-400 font-bold shrink-0">({clickCount} taps)</span>
        </div>
      </div>
    </section>
  );
}
