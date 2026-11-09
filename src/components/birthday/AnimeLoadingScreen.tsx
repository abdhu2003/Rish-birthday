"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Flame, Shield, ArrowRight } from "lucide-react";
import { birthdayConfig } from "@/config/birthdayConfig";
import { fireSparkles } from "@/utils/confetti";
import { audioController } from "@/utils/audio";

interface AnimeLoadingScreenProps {
  onComplete: () => void;
}

export default function AnimeLoadingScreen({ onComplete }: AnimeLoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(1);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsReady(true);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 7) + 5;
        const bounded = Math.min(next, 100);

        if (bounded >= 50 && stage === 1) {
          setStage(2);
        }

        return bounded;
      });
    }, 85);

    return () => clearInterval(timer);
  }, [stage]);

  const handleStart = () => {
    fireSparkles(0.5, 0.5);
    audioController.playChakraSurgeSound();
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#06020a] via-[#10051b] to-[#1a0808] px-4 overflow-hidden text-center"
    >
      {/* Background ambient glowing chakra orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-orange-600/20 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 sm:w-[450px] h-80 sm:h-[450px] rounded-full bg-red-600/15 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-600/10 blur-[140px] pointer-events-none" />

      {/* Floating starry chakra sparks */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(14)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${(i * 17 + 9) % 90}%`,
              left: `${(i * 23 + 7) % 92}%`,
            }}
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [0.7, 1.4, 0.7],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 2.5 + (i % 3) * 0.4,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          >
            <Sparkles className="w-4 h-4 text-orange-300/70" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-lg w-full flex flex-col items-center px-4">
        {/* Animated Konohagakure Spiral Crest with Glowing Chakra Aura */}
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative mb-8"
        >
          {/* Pulsing Orange Chakra Auras */}
          <div className="absolute -inset-6 rounded-full bg-orange-500/30 blur-2xl animate-pulse" />
          <div className="absolute -inset-10 rounded-full bg-red-500/20 blur-3xl" />

          {/* Uzumaki Spiral Symbol */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-orange-600 via-amber-500 to-red-600 flex items-center justify-center shadow-[0_0_50px_rgba(255,127,0,0.8)] border-2 border-orange-300/50">
            <svg
              viewBox="0 0 100 100"
              fill="none"
              stroke="white"
              strokeWidth="7"
              strokeLinecap="round"
              className="w-14 h-14 sm:w-18 sm:h-18 drop-shadow-[0_0_12px_rgba(255,255,255,0.9)] animate-spin-slow"
            >
              {/* Uzumaki Spiral Curve */}
              <path d="M50 50 A 5 5 0 0 1 55 55 A 10 10 0 0 1 45 65 A 18 18 0 0 1 32 47 A 26 26 0 0 1 58 24 A 36 36 0 0 1 86 50" />
            </svg>
          </div>
        </motion.div>

        {/* Cinematic Loading Headings */}
        <AnimatePresence mode="wait">
          {stage === 1 ? (
            <motion.div
              key="prep"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="mb-3"
            >
              <h1 className="font-serif text-2xl sm:text-3xl text-orange-200 font-bold tracking-tight glow-text-gold px-2">
                {birthdayConfig.loadingScreen.prepText}
              </h1>
              <p className="text-orange-300/70 text-xs sm:text-sm italic mt-1 font-light">
                {birthdayConfig.loadingScreen.subText}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="mission"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="mb-3"
            >
              <h1 className="font-serif text-2xl sm:text-3xl text-rose-200 font-bold tracking-tight glow-text-pink px-2">
                {birthdayConfig.loadingScreen.missionText}
              </h1>
              <p className="text-pink-300/80 text-xs sm:text-sm italic mt-1 font-light">
                Assigned by the Will of Fire to {birthdayConfig.friendName} 🌸
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Bar Container */}
        <div className="w-60 sm:w-80 h-3 bg-black/80 rounded-full border border-orange-500/40 p-[2px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] relative overflow-hidden mb-4 mt-4">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-red-500 shadow-[0_0_15px_rgba(255,140,0,0.9)]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-orange-400/80 mb-6">
          <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
          <span>{progress}% Chakra Charged</span>
        </div>

        {/* Enter Button on Ready */}
        <AnimatePresence>
          {isReady && (
            <motion.button
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-red-600 text-white font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(255,127,0,0.8)] border border-orange-200/50 flex items-center justify-center gap-2 group transition-all"
            >
              <span>ACCEPT MISSION & ENTER</span>
              <ArrowRight className="w-4 h-4 text-amber-200 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

