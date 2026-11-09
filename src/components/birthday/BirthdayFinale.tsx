"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, RotateCcw, Flame } from "lucide-react";
import { birthdayConfig } from "@/config/birthdayConfig";
import { fireGrandFireworks, fireCelebrationConfetti } from "@/utils/confetti";
import { audioController } from "@/utils/audio";

interface BirthdayFinaleProps {
  onRestart: () => void;
}

export default function BirthdayFinale({ onRestart }: BirthdayFinaleProps) {
  const handleFireworks = () => {
    fireGrandFireworks();
    audioController.playChakraSurgeSound();
  };

  const handleRestart = () => {
    fireCelebrationConfetti();
    audioController.playSparkleSound();
    onRestart();
  };

  return (
    <section
      id="finale"
      className="relative min-h-[95vh] sm:min-h-screen flex flex-col items-center justify-center py-20 sm:py-28 px-4 sm:px-6 overflow-hidden text-center"
    >
      {/* Grand Celestial Chakra Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[750px] h-[340px] sm:h-[750px] bg-gradient-to-tr from-orange-600/30 via-rose-600/25 to-purple-800/35 rounded-full blur-[160px] pointer-events-none" />

      {/* Floating Fireworks Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-amber-300/70"
            style={{
              top: `${(i * 21 + 8) % 85}%`,
              left: `${(i * 29 + 11) % 90}%`,
            }}
            animate={{
              scale: [0.6, 1.4, 0.6],
              opacity: [0.2, 0.95, 0.2],
            }}
            transition={{
              duration: 2.5 + (i % 3) * 0.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            <Sparkles className="w-5 h-5" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center w-full">
        {/* Massive Beating Heart & Uzumaki Emblem */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
          className="relative mb-6 sm:mb-8 cursor-pointer select-none"
          onClick={handleFireworks}
        >
          {/* Orbital Chakra Pulsing Rings */}
          <div className="absolute -inset-6 rounded-full bg-orange-500/35 blur-2xl animate-chakra-pulse" />

          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-orange-600 via-amber-500 to-rose-600 flex items-center justify-center shadow-[0_0_60px_rgba(255,140,0,0.8)] border-2 border-orange-200/80 animate-heart-pulse">
            <Heart className="w-14 h-14 sm:w-20 sm:h-20 text-white fill-white drop-shadow-[0_0_20px_rgba(255,255,255,0.9)]" />
          </div>

          <div className="absolute -bottom-2 -right-2 p-2 rounded-full bg-black/80 border border-orange-400 shadow-lg text-amber-300">
            <Sparkles className="w-5 h-5 animate-spin-slow" />
          </div>
        </motion.div>

        {/* Finale Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight glow-text-gold mb-6 px-2"
        >
          {birthdayConfig.finale.heading}
        </motion.h2>

        {/* Heartfelt Closing Message */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="space-y-4 max-w-2xl mx-auto mb-10 px-3"
        >
          <p className="font-serif text-lg sm:text-2xl text-amber-100 font-semibold leading-relaxed drop-shadow">
            &ldquo;{birthdayConfig.finale.message1}&rdquo;
          </p>
          <p className="font-sans text-sm sm:text-lg md:text-xl text-orange-200/90 font-light italic leading-relaxed whitespace-pre-line">
            {birthdayConfig.finale.message2}
          </p>
        </motion.div>

        {/* Restart Adventure Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full flex justify-center px-4"
        >
          <motion.button
            onClick={handleRestart}
            whileHover={{ scale: 1.05, boxShadow: "0 0 45px rgba(255,140,0,0.9)" }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto max-w-md px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-red-600 text-white font-extrabold text-sm sm:text-lg tracking-wider uppercase shadow-[0_0_35px_rgba(255,127,0,0.7)] border border-orange-200/60 flex items-center justify-center gap-3 transition-all min-h-[50px]"
          >
            <RotateCcw className="w-5 h-5 text-amber-200 shrink-0" />
            <span className="whitespace-nowrap">{birthdayConfig.finale.restartButton}</span>
            <Sparkles className="w-5 h-5 text-amber-200 animate-spin-slow shrink-0" />
          </motion.button>
        </motion.div>

        {/* Shinobi Quote & Signature Footer */}
        <div className="mt-16 sm:mt-20 pt-6 sm:pt-8 border-t border-orange-500/20 w-full flex flex-col items-center text-xs text-orange-300/70 font-light space-y-1.5 px-4">
          <p className="italic font-serif text-sm text-amber-200/80">
            &ldquo;{birthdayConfig.finale.closingQuote}&rdquo;
          </p>
          <p className="text-center">
            Dedicated with eternal Will of Fire for{" "}
            <span className="text-amber-200 font-bold">{birthdayConfig.friendName}</span> 🍥❤️
          </p>
          <p className="text-[11px] text-orange-400/60">
            A Konohagakure Birthday Legend • Forever Best Friends
          </p>
        </div>
      </div>
    </section>
  );
}

