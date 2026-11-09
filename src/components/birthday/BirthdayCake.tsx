"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cake, Sparkles, Wind, RotateCcw, Flame } from "lucide-react";
import { birthdayConfig } from "@/config/birthdayConfig";
import { fireCelebrationConfetti, fireGrandFireworks } from "@/utils/confetti";
import { audioController } from "@/utils/audio";

interface SakuraBurstPetal {
  id: number;
  x: number;
  delay: number;
  color: string;
}

export default function BirthdayCake() {
  const [candlesLit, setCandlesLit] = useState(true);
  const [hasBlown, setHasBlown] = useState(false);
  const [burstPetals, setBurstPetals] = useState<SakuraBurstPetal[]>([]);

  const handleBlowCandles = () => {
    if (!candlesLit) return;

    audioController.playBlowSound();
    setCandlesLit(false);
    setHasBlown(true);

    // Confetti blast & grand fireworks
    fireCelebrationConfetti();
    setTimeout(() => {
      fireGrandFireworks();
      audioController.playChakraSurgeSound();
    }, 350);

    // Spawn floating celebration sakura petals
    const colors = ["#FF7F00", "#FF69B4", "#FFD700", "#FFB6C1", "#00BFFF"];
    const petals: SakuraBurstPetal[] = Array.from({ length: 14 }).map((_, i) => ({
      id: Date.now() + i,
      x: (i * 7 + Math.random() * 5) % 90 + 5,
      color: colors[i % colors.length],
      delay: Math.random() * 0.7,
    }));
    setBurstPetals(petals);
  };

  const handleRelight = () => {
    setCandlesLit(true);
    setHasBlown(false);
    setBurstPetals([]);
    audioController.playSparkleSound();
  };

  return (
    <section id="cake" className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden text-center">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[650px] h-[340px] sm:h-[650px] bg-gradient-to-tr from-orange-600/20 via-pink-600/15 to-amber-500/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Floating burst sakura blossoms */}
      <AnimatePresence>
        {burstPetals.map((p) => (
          <motion.div
            key={p.id}
            initial={{ bottom: "-10%", left: `${p.x}%`, opacity: 0, scale: 0.6 }}
            animate={{ bottom: "110%", opacity: [0, 0.95, 0.95, 0], scale: 1.2, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 6, delay: p.delay, ease: "easeOut" }}
            className="fixed pointer-events-none z-40"
          >
            <div
              className="w-8 h-10 rounded-[50%_0_50%_50%] shadow-lg"
              style={{
                backgroundColor: p.color,
                boxShadow: `0 0 15px ${p.color}88`,
              }}
            />
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
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs sm:text-sm font-semibold mb-4"
        >
          <Cake className="w-3.5 h-3.5 text-orange-400" />
          <span>Shinobi Birthday Ritual</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight glow-text-gold mb-3 px-2"
        >
          {birthdayConfig.cake.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-orange-200/80 text-xs sm:text-base max-w-lg mx-auto italic font-light mb-12 px-3"
        >
          {birthdayConfig.cake.instruction}
        </motion.p>

        {/* Naruto-Themed 3D-Style Birthday Cake */}
        <div
          className="relative my-6 cursor-pointer select-none flex flex-col items-center w-full"
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
                          y: -12,
                          transition: { duration: 0.5 },
                        }}
                        className="relative mb-1 flex items-center justify-center"
                      >
                        <div className="absolute w-7 h-7 rounded-full bg-orange-400/50 blur-md pointer-events-none" />
                        <div className="w-3.5 sm:w-4 h-5 sm:h-6 rounded-full bg-gradient-to-t from-orange-600 via-amber-400 to-white animate-flicker shadow-[0_0_15px_#FF8C00]" />
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

                  <div className="w-[2px] h-2 bg-gray-300" />

                  {/* Candle Body: Konoha Orange & Gold stripes */}
                  <div className="w-3.5 sm:w-4 h-10 sm:h-12 rounded-t-sm bg-gradient-to-r from-orange-400 via-amber-200 to-orange-400 border-x border-orange-500/40 shadow-md relative overflow-hidden">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,69,0,0.5)_4px,rgba(255,69,0,0.5)_8px)]" />
                  </div>
                </div>
              ))}
            </div>

            {/* Cake Top Tier: Naruto Orange Frosting & Konoha Leaf Crest */}
            <div className="relative w-40 sm:w-56 h-16 sm:h-20 rounded-t-2xl sm:rounded-t-3xl bg-gradient-to-b from-orange-400 via-amber-300 to-orange-500 border-2 border-orange-200/80 shadow-lg z-10 flex items-center justify-center overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-3 bg-white/70 rounded-full blur-[1px]" />
              {/* Konoha Leaf Symbol on Cake */}
              <div className="flex items-center gap-2 text-stone-900 font-extrabold text-xs sm:text-sm uppercase tracking-wider drop-shadow-sm">
                <span>🍃</span>
                <span>Believe It!</span>
                <span>🍥</span>
              </div>
            </div>

            {/* Cake Bottom Tier: Crimson & Midnight Purple base */}
            <div className="relative w-60 sm:w-80 h-18 sm:h-24 rounded-t-xl sm:rounded-t-2xl bg-gradient-to-b from-red-600 via-orange-600 to-[#1e071e] border-2 border-orange-300/60 shadow-2xl z-0 flex items-center justify-center overflow-hidden">
              <div className="absolute top-1 flex justify-around w-full px-2">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-2.5 h-2.5 rounded-full bg-amber-200 shadow-sm" />
                ))}
              </div>
              <p className="font-handwriting text-2xl sm:text-3xl font-extrabold text-amber-200 drop-shadow">
                Happy Birthday, Shinobi! 💖
              </p>
            </div>

            {/* Golden Base Stand */}
            <div className="w-68 sm:w-96 h-5 rounded-full bg-gradient-to-r from-amber-700 via-yellow-400 to-amber-700 border border-yellow-200 shadow-[0_10px_30px_rgba(255,140,0,0.4)] mt-[-2px] relative z-[-1]" />
          </div>
        </div>

        {/* Action Button: Blow / Relight */}
        <div className="mt-4 mb-8 w-full flex justify-center px-4">
          {candlesLit ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBlowCandles}
              className="w-full sm:w-auto max-w-xs px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-red-600 text-white font-bold text-sm sm:text-base shadow-[0_0_25px_rgba(255,127,0,0.7)] border border-orange-200/50 flex items-center justify-center gap-2 group transition-all min-h-[46px]"
            >
              <Wind className="w-5 h-5 text-amber-200 group-hover:translate-x-1 transition-transform" />
              <span>Blow Out the Candles 💨🕯️</span>
            </motion.button>
          ) : (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRelight}
              className="px-6 py-2.5 rounded-full bg-black/60 hover:bg-black/80 text-orange-200 text-xs sm:text-sm font-semibold border border-orange-500/40 flex items-center justify-center gap-2 transition-all shadow-md min-h-[40px]"
            >
              <RotateCcw className="w-4 h-4 text-orange-400" />
              <span>Relight with Chakra Flame ✨</span>
            </motion.button>
          )}
        </div>

        {/* Revealed Birthday Wish Announcement */}
        <AnimatePresence>
          {hasBlown && (
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="w-full max-w-xl p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#1f0923] to-[#0e0413] border-2 border-orange-400/50 shadow-[0_15px_50px_rgba(255,140,0,0.35)] text-center relative overflow-hidden mx-2"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-300 to-pink-500" />
              <div className="inline-flex p-3 rounded-full bg-orange-500/20 text-amber-300 mb-3 border border-orange-500/40">
                <Sparkles className="w-6 h-6 animate-spin-slow" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white glow-text-gold mb-2">
                {birthdayConfig.cake.wishBlownText}
              </h3>
              <p className="text-orange-100/90 text-xs sm:text-base italic font-light">
                {birthdayConfig.cake.subWishText}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

