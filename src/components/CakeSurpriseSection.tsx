"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cake, Sparkles, Wind, RotateCcw } from "lucide-react";
import { birthdayConfig } from "@/birthdayConfig";
import { fireCelebrationConfetti, fireGrandFireworks } from "@/utils/confetti";
import { audioController } from "@/utils/audio";

interface Balloon {
  id: number;
  x: number;
  color: string;
  delay: number;
}

export default function CakeSurpriseSection() {
  const [candlesLit, setCandlesLit] = useState(true);
  const [hasBlown, setHasBlown] = useState(false);
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  const handleBlowCandles = () => {
    if (!candlesLit) return;

    audioController.playBlowSound();
    setCandlesLit(false);
    setHasBlown(true);

    // Confetti blast & fireworks
    fireCelebrationConfetti();
    setTimeout(() => {
      fireGrandFireworks();
      audioController.playSparkleSound();
    }, 400);

    // Spawn celebratory floating balloons
    const balloonColors = ["#FF69B4", "#BA55D3", "#FFD700", "#FFB6C1", "#87CEEB"];
    const newBalloons: Balloon[] = Array.from({ length: 10 }).map((_, i) => ({
      id: Date.now() + i,
      x: (i * 9 + Math.random() * 5) % 90 + 5,
      color: balloonColors[i % balloonColors.length],
      delay: Math.random() * 0.8,
    }));
    setBalloons(newBalloons);
  };

  const handleRelight = () => {
    setCandlesLit(true);
    setHasBlown(false);
    setBalloons([]);
    audioController.playSparkleSound();
  };

  return (
    <section id="cake" className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden text-center">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[650px] h-[320px] sm:h-[650px] bg-gradient-to-tr from-pink-500/15 via-purple-600/15 to-yellow-500/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      {/* Floating balloons when candles are blown */}
      <AnimatePresence>
        {balloons.map((b) => (
          <motion.div
            key={b.id}
            initial={{ bottom: "-10%", left: `${b.x}%`, opacity: 0, scale: 0.8 }}
            animate={{ bottom: "110%", opacity: [0, 0.9, 0.9, 0], scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 6.5, delay: b.delay, ease: "easeOut" }}
            className="fixed pointer-events-none z-40"
          >
            <div className="flex flex-col items-center">
              <div
                className="w-10 sm:w-14 h-14 sm:h-18 rounded-full shadow-lg"
                style={{
                  backgroundColor: b.color,
                  borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
                  boxShadow: `0 0 18px ${b.color}88`,
                }}
              />
              <div className="w-[1px] h-10 sm:h-14 bg-white/40" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-300 text-xs sm:text-sm font-medium mb-3 sm:mb-4"
        >
          <Cake className="w-3.5 h-3.5 text-pink-400" />
          <span>Birthday Ritual</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight glow-text-pink mb-2 sm:mb-3 px-2"
        >
          {birthdayConfig.cake.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-pink-200/80 text-xs sm:text-base max-w-lg mx-auto italic font-light mb-8 sm:mb-12 px-3"
        >
          {birthdayConfig.cake.instruction}
        </motion.p>

        {/* 3D-Style Illustrated Birthday Cake - Fully Mobile Scaled */}
        <div
          className="relative my-4 sm:my-8 cursor-pointer group select-none flex flex-col items-center w-full"
          onClick={candlesLit ? handleBlowCandles : undefined}
        >
          <div className="relative flex flex-col items-center">
            {/* Candles Row */}
            <div className="flex justify-center items-end gap-5 sm:gap-8 mb-[-4px] relative z-20">
              {[0, 1, 2].map((idx) => (
                <div key={idx} className="flex flex-col items-center relative">
                  {/* Candle Flame */}
                  <AnimatePresence>
                    {candlesLit ? (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{
                          scale: [1, 1.4, 0],
                          opacity: [1, 0.8, 0],
                          y: -10,
                          transition: { duration: 0.5 },
                        }}
                        className="relative mb-1 flex items-center justify-center"
                      >
                        <div className="absolute w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-yellow-400/40 blur-md pointer-events-none" />
                        <div className="w-3.5 sm:w-4 h-5 sm:h-6 rounded-full bg-gradient-to-t from-orange-500 via-yellow-400 to-white animate-flicker shadow-[0_0_12px_#FFD700]" />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0.8, y: 0, scale: 0.5 }}
                        animate={{ opacity: 0, y: -20, scale: 1.4 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="w-2 h-3 rounded-full bg-gray-400/50 blur-[2px] mb-1"
                      />
                    )}
                  </AnimatePresence>

                  {/* Candle Wick */}
                  <div className="w-[2px] h-1.5 sm:h-2 bg-gray-300" />

                  {/* Candle Stick */}
                  <div className="w-3 sm:w-3.5 h-10 sm:h-12 rounded-t-sm bg-gradient-to-r from-pink-300 via-white to-pink-200 border-x border-pink-400/30 shadow-md relative overflow-hidden">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,105,180,0.5)_4px,rgba(255,105,180,0.5)_8px)]" />
                  </div>
                </div>
              ))}
            </div>

            {/* Cake Top Tier */}
            <div className="relative w-40 sm:w-56 h-14 sm:h-20 rounded-t-2xl sm:rounded-t-3xl bg-gradient-to-b from-pink-300 via-rose-200 to-pink-300 border-2 border-pink-200/60 shadow-lg z-10 flex items-center justify-center overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-3 sm:h-4 bg-white/70 rounded-full blur-[1px]" />
              <div className="flex items-center gap-1.5 text-pink-500">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="font-serif text-[10px] sm:text-xs uppercase tracking-wider text-pink-600 font-bold">
                  Sweetest Bestie
                </span>
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
            </div>

            {/* Cake Bottom Tier */}
            <div className="relative w-56 sm:w-80 h-16 sm:h-24 rounded-t-xl sm:rounded-t-2xl bg-gradient-to-b from-purple-300 via-pink-200 to-purple-400 border-2 border-pink-200/60 shadow-2xl z-0 flex items-center justify-center overflow-hidden">
              <div className="absolute top-1 flex justify-around w-full px-2">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-white shadow-sm" />
                ))}
              </div>
              <p className="font-handwriting text-xl sm:text-3xl font-bold text-purple-900 drop-shadow-sm">
                Happy Birthday! 💖
              </p>
            </div>

            {/* Golden Cake Stand */}
            <div className="w-64 sm:w-96 h-4 sm:h-5 rounded-full bg-gradient-to-r from-yellow-600 via-amber-300 to-yellow-600 border border-yellow-200 shadow-[0_10px_30px_rgba(255,215,0,0.3)] mt-[-2px] relative z-[-1]" />
          </div>
        </div>

        {/* Action Button: Blow Candles / Relight */}
        <div className="mt-4 mb-6 sm:mb-8 w-full flex justify-center px-4">
          {candlesLit ? (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBlowCandles}
              className="w-full sm:w-auto max-w-xs px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-medium text-sm sm:text-base shadow-[0_0_25px_rgba(255,105,180,0.6)] border border-pink-200/50 flex items-center justify-center gap-2 group transition-all min-h-[44px]"
            >
              <Wind className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-200 group-hover:translate-x-1 transition-transform" />
              <span>Blow Out the Candles 💨🕯️</span>
            </motion.button>
          ) : (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRelight}
              className="px-5 sm:px-6 py-2.5 rounded-full bg-purple-900/60 hover:bg-purple-800/80 text-pink-200 text-xs sm:text-sm font-medium border border-pink-400/30 flex items-center justify-center gap-2 transition-all shadow-md min-h-[40px]"
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-300" />
              <span>Light Candles Again ✨</span>
            </motion.button>
          )}
        </div>

        {/* Revealed Wish Message when blown */}
        <AnimatePresence>
          {hasBlown && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="w-full max-w-xl p-6 sm:p-8 rounded-2xl sm:rounded-3xl glass-panel-pink border border-pink-300/50 shadow-[0_15px_45px_rgba(255,105,180,0.3)] text-center relative overflow-hidden mx-2"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
              <div className="inline-flex p-2.5 sm:p-3 rounded-full bg-yellow-400/20 text-yellow-300 mb-3 sm:mb-4 border border-yellow-400/40">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 animate-spin-slow" />
              </div>
              <h3 className="font-serif text-xl sm:text-3xl font-bold text-white glow-text-gold mb-2 sm:mb-3">
                {birthdayConfig.cake.wishBlownText}
              </h3>
              <p className="text-pink-100/90 text-xs sm:text-base italic font-light">
                {birthdayConfig.cake.subWishText}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
