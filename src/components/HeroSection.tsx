"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, ChevronDown, Cake as CakeIcon } from "lucide-react";
import { birthdayConfig } from "@/birthdayConfig";
import { fireHeartExplosion, fireCelebrationConfetti } from "@/utils/confetti";
import { audioController } from "@/utils/audio";

interface HeroSectionProps {
  onOpenSurprise?: () => void;
}

export default function HeroSection({ onOpenSurprise }: HeroSectionProps) {
  const handleOpenSurprise = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    fireHeartExplosion(x, y);
    fireCelebrationConfetti();
    audioController.playSparkleSound();

    if (onOpenSurprise) {
      onOpenSurprise();
    }

    // Scroll smoothly to letter section
    setTimeout(() => {
      const letterEl = document.getElementById("letter");
      if (letterEl) {
        letterEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 350);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-20 sm:pt-24 pb-20 sm:pb-24 overflow-hidden"
    >
      {/* Background glow layers */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[650px] h-[280px] sm:h-[650px] bg-gradient-to-tr from-pink-600/20 via-purple-600/25 to-pink-400/15 rounded-full blur-[90px] sm:blur-[130px] pointer-events-none" />
      <div className="absolute top-12 left-5 w-48 sm:w-72 h-48 sm:h-72 bg-rose-500/15 rounded-full blur-[70px] sm:blur-[90px] pointer-events-none" />
      <div className="absolute bottom-20 right-5 w-56 sm:w-80 h-56 sm:h-80 bg-purple-700/20 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />

      {/* Floating decorative mini hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { top: "12%", left: "8%", size: 18, delay: 0 },
          { top: "20%", right: "10%", size: 24, delay: 1.2 },
          { top: "68%", left: "6%", size: 20, delay: 2.5 },
          { top: "75%", right: "8%", size: 26, delay: 1.8 },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            className="absolute text-pink-400/35"
            style={{
              top: item.top,
              left: (item as any).left,
              right: (item as any).right,
            }}
            animate={{
              y: [0, -14, 0],
              rotate: [0, 8, -8, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5 + idx,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Heart style={{ width: item.size, height: item.size }} className="fill-pink-400/20" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center w-full">
        {/* Top Celebration Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full glass-panel-pink border border-pink-400/40 text-pink-200 text-[11px] sm:text-sm font-medium mb-5 sm:mb-6 shadow-[0_0_20px_rgba(255,105,180,0.3)] max-w-[92vw]"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-300 animate-spin-slow shrink-0" />
          <span className="truncate">{birthdayConfig.hero.badge}</span>
          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-pink-400 shrink-0" />
          <span className="text-pink-300 font-semibold shrink-0">{birthdayConfig.birthdayDate}</span>
        </motion.div>

        {/* 3D-Style Animated Birthday Cake Icon Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.15 }}
          className="relative mb-5 sm:mb-6 group cursor-pointer"
          whileHover={{ scale: 1.08, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            fireHeartExplosion(0.5, 0.35);
            audioController.playSparkleSound();
          }}
        >
          <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 p-[2px] shadow-[0_0_35px_rgba(255,105,180,0.5)]">
            <div className="w-full h-full bg-gradient-to-br from-[#1d0833] to-[#2d0f4d] rounded-2xl sm:rounded-3xl flex items-center justify-center relative overflow-hidden backdrop-blur-xl">
              <div className="absolute inset-0 bg-pink-500/10 group-hover:bg-pink-500/20 transition-colors" />
              <CakeIcon className="w-8 h-8 sm:w-12 sm:h-12 text-pink-300 drop-shadow-[0_0_12px_rgba(255,105,180,0.8)]" />
              <motion.div
                className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-300" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Main Title - Responsive & Wrapping */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 sm:mb-6 leading-[1.2] px-2"
        >
          Happy Birthday,{" "}
          <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-pink-300 via-rose-200 to-purple-300 bg-clip-text text-transparent glow-text-pink font-serif">
            {birthdayConfig.friendNickname}! 🎂💗
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-sans text-base sm:text-xl md:text-2xl text-pink-100/90 max-w-2xl font-light italic mb-8 sm:mb-10 leading-relaxed px-3 drop-shadow"
        >
          &ldquo;{birthdayConfig.hero.subtitle}&rdquo;
        </motion.p>

        {/* Premium Surprise Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="relative w-full sm:w-auto px-4 flex justify-center"
        >
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 blur-lg opacity-70 animate-pulse-glow" />

          <motion.button
            onClick={handleOpenSurprise}
            whileHover={{ scale: 1.04, boxShadow: "0 0 35px rgba(255,105,180,0.8)" }}
            whileTap={{ scale: 0.95 }}
            className="relative w-full sm:w-auto max-w-sm px-6 sm:px-12 py-3.5 sm:py-5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-semibold text-sm sm:text-lg tracking-wide shadow-[0_0_25px_rgba(255,105,180,0.5)] border border-pink-200/50 flex items-center justify-center gap-2.5 sm:gap-3 group transition-all"
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-200 group-hover:rotate-45 transition-transform shrink-0" />
            <span className="whitespace-nowrap">{birthdayConfig.hero.ctaButton}</span>
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-200 fill-pink-200 group-hover:scale-125 transition-transform shrink-0" />
          </motion.button>
        </motion.div>

        {/* Scroll prompt arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 sm:mt-16 flex flex-col items-center gap-1.5 text-pink-300/60 text-[11px] sm:text-xs tracking-widest uppercase cursor-pointer hover:text-pink-200 transition-colors"
          onClick={() => {
            const el = document.getElementById("letter");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span>Scroll to uncover the magic</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
