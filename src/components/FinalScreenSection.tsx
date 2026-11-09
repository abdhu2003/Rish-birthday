"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, RotateCcw } from "lucide-react";
import { birthdayConfig } from "@/birthdayConfig";
import { fireGrandFireworks, fireCelebrationConfetti } from "@/utils/confetti";
import { audioController } from "@/utils/audio";

interface FinalScreenSectionProps {
  onReplay?: () => void;
}

export default function FinalScreenSection({ onReplay }: FinalScreenSectionProps) {
  const handleFinaleCelebrate = () => {
    fireGrandFireworks();
    audioController.playSparkleSound();
  };

  const handleReplay = () => {
    fireCelebrationConfetti();
    audioController.playSparkleSound();

    if (onReplay) {
      onReplay();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section
      id="finale"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-center py-20 sm:py-28 px-4 sm:px-6 overflow-hidden text-center"
    >
      {/* Grand Celestial Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[700px] h-[320px] sm:h-[700px] bg-gradient-to-tr from-pink-600/25 via-purple-600/30 to-rose-400/20 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none" />

      {/* Decorative Fireworks Sparkles Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-300/60"
            style={{
              top: `${(i * 23 + 10) % 85}%`,
              left: `${(i * 31 + 8) % 90}%`,
            }}
            animate={{
              scale: [0.6, 1.4, 0.6],
              opacity: [0.2, 0.9, 0.2],
            }}
            transition={{
              duration: 2.5 + (i % 3) * 0.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center w-full">
        {/* Massive Heart Emblem with Golden Rings */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
          className="relative mb-6 sm:mb-8 cursor-pointer"
          onClick={handleFinaleCelebrate}
        >
          {/* Orbital Glowing Aura */}
          <div className="absolute -inset-5 sm:-inset-6 rounded-full bg-pink-500/30 blur-xl sm:blur-2xl animate-pulse" />

          <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 flex items-center justify-center shadow-[0_0_50px_rgba(255,105,180,0.7)] border-2 border-pink-200/60 animate-heart-pulse">
            <Heart className="w-12 h-12 sm:w-20 sm:h-20 text-white fill-white drop-shadow-[0_0_18px_rgba(255,255,255,0.9)]" />
          </div>

          <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 p-1.5 sm:p-2 rounded-full bg-purple-950/80 border border-pink-400/40 shadow-lg text-yellow-300">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-spin-slow" />
          </div>
        </motion.div>

        {/* Finale Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight glow-text-pink mb-4 sm:mb-6 px-2"
        >
          {birthdayConfig.finalScreen.heading}
        </motion.h2>

        {/* Emotion-Packed Friendship Quotes */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="space-y-3 sm:space-y-4 max-w-2xl mx-auto mb-8 sm:mb-10 px-3"
        >
          <p className="font-serif text-lg sm:text-2xl text-pink-100 font-medium leading-relaxed drop-shadow">
            &ldquo;{birthdayConfig.finalScreen.message1}&rdquo;
          </p>
          <p className="font-sans text-sm sm:text-lg md:text-xl text-pink-200/90 font-light italic leading-relaxed">
            {birthdayConfig.finalScreen.message2}
          </p>
        </motion.div>

        {/* Replay Magic Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full flex justify-center px-4"
        >
          <motion.button
            onClick={handleReplay}
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255,105,180,0.8)" }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto max-w-xs px-8 sm:px-10 py-3.5 sm:py-5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-semibold text-sm sm:text-lg tracking-wide shadow-[0_0_30px_rgba(255,105,180,0.6)] border border-pink-200/50 flex items-center justify-center gap-2.5 sm:gap-3 transition-all min-h-[46px]"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-200 shrink-0" />
            <span className="whitespace-nowrap">{birthdayConfig.finalScreen.replayButton}</span>
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-200 animate-spin-slow shrink-0" />
          </motion.button>
        </motion.div>

        {/* Footer Credit & Signature */}
        <div className="mt-14 sm:mt-20 pt-6 sm:pt-8 border-t border-pink-400/20 w-full flex flex-col items-center text-[11px] sm:text-xs text-pink-300/60 font-light space-y-1 px-4">
          <p className="text-center">
            Crafted with all the love in the universe for{" "}
            <span className="text-pink-200 font-semibold">{birthdayConfig.friendName}</span> 💖
          </p>
          <p className="text-center">Happy Birthday, Bestie! Forever grateful for our friendship ✨</p>
        </div>
      </div>
    </section>
  );
}
