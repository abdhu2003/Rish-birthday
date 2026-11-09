"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Wand2 } from "lucide-react";
import { birthdayConfig } from "@/birthdayConfig";
import { fireSparkles } from "@/utils/confetti";
import { audioController } from "@/utils/audio";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [stageText, setStageText] = useState("Gathering stardust & sweet memories...");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsReady(true);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 8) + 4;
        const bounded = Math.min(next, 100);

        if (bounded < 30) {
          setStageText("Gathering stardust & sweet memories...");
        } else if (bounded < 65) {
          setStageText("Sprinkling butterfly magic & joy...");
        } else if (bounded < 95) {
          setStageText("Wrapping your surprise with all our love...");
        } else {
          setStageText("Your birthday surprise is ready! ✨💖");
        }

        return bounded;
      });
    }, 80);

    return () => clearInterval(timer);
  }, []);

  const handleStart = () => {
    fireSparkles(0.5, 0.5);
    audioController.playSparkleSound();
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#0c0418] via-[#1a0b2e] to-[#260c38] px-4 overflow-hidden text-center"
    >
      {/* Background ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-56 sm:w-80 h-56 sm:h-80 rounded-full bg-pink-500/20 blur-[80px] sm:blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-purple-600/20 blur-[90px] sm:blur-[120px] pointer-events-none" />

      {/* Floating starry sparks */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${(i * 19 + 7) % 90}%`,
              left: `${(i * 23 + 11) % 92}%`,
            }}
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 2.2 + (i % 4) * 0.4,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-300/60" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-md w-full flex flex-col items-center px-4">
        {/* Animated magical pulsating heart */}
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative mb-6 sm:mb-8"
        >
          <div className="absolute -inset-4 rounded-full bg-pink-500/25 blur-xl animate-pulse" />
          <div className="absolute -inset-8 rounded-full bg-purple-500/20 blur-2xl" />

          <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-pink-600 via-rose-500 to-purple-500 flex items-center justify-center shadow-[0_0_35px_rgba(255,105,180,0.6)] border border-pink-300/40">
            <Heart className="w-10 h-10 sm:w-14 sm:h-14 text-white fill-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
          </div>
        </motion.div>

        {/* Loading Headings */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-serif text-xl sm:text-3xl text-pink-100 font-bold tracking-tight mb-2 glow-text-pink px-2"
        >
          {birthdayConfig.loadingScreen.message}
        </motion.h1>

        <motion.p
          key={stageText}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-pink-200/80 text-xs sm:text-base font-light mb-6 sm:mb-8 h-5 sm:h-6 italic px-2"
        >
          {stageText}
        </motion.p>

        {/* Progress Bar Container */}
        <div className="w-56 sm:w-80 h-2.5 bg-purple-950/80 rounded-full border border-pink-400/25 p-[2px] shadow-inner relative overflow-hidden mb-4 sm:mb-5">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 shadow-[0_0_15px_rgba(255,105,180,0.8)]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        <span className="text-[11px] sm:text-xs tracking-widest uppercase text-pink-300/70 font-semibold mb-6">
          {progress}% Magic Loaded
        </span>

        {/* Interactive button on complete */}
        <AnimatePresence>
          {isReady && (
            <motion.button
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="w-full sm:w-auto max-w-xs px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-medium text-sm sm:text-base shadow-[0_0_25px_rgba(255,105,180,0.6)] border border-pink-200/40 flex items-center justify-center gap-2 group transition-all min-h-[44px]"
            >
              <Wand2 className="w-4 h-4 text-yellow-200 group-hover:rotate-12 transition-transform" />
              <span>Step into the Magic ✨</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
