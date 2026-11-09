"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Sparkles, Heart, Coffee, HeartHandshake, CheckCircle2, RotateCcw } from "lucide-react";
import { birthdayConfig } from "@/birthdayConfig";
import { fireHeartExplosion, fireSparkles, fireCelebrationConfetti } from "@/utils/confetti";
import { audioController } from "@/utils/audio";

export default function GiftBoxSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [redeemedCoupons, setRedeemedCoupons] = useState<{ [index: number]: boolean }>({});

  const handleOpenBox = (e: React.MouseEvent) => {
    if (isOpen) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    setIsOpen(true);
    fireHeartExplosion(x, y);
    fireSparkles(x, y);
    setTimeout(() => {
      fireCelebrationConfetti();
    }, 300);
    audioController.playSparkleSound();
  };

  const handleRedeemCoupon = (index: number) => {
    setRedeemedCoupons((prev) => ({ ...prev, [index]: true }));
    fireSparkles(0.5, 0.6);
    audioController.playSparkleSound();
  };

  const handleReset = () => {
    setIsOpen(false);
    audioController.playSparkleSound();
  };

  const getPerkIcon = (name: string) => {
    switch (name) {
      case "Sparkles":
        return <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />;
      case "Coffee":
        return <Coffee className="w-4 h-4 sm:w-5 sm:h-5 text-pink-300" />;
      default:
        return <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5 text-rose-300" />;
    }
  };

  return (
    <section id="gift" className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden text-center">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] bg-gradient-to-tr from-purple-700/20 via-pink-600/15 to-rose-400/15 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-300 text-xs sm:text-sm font-medium mb-3 sm:mb-4"
        >
          <Gift className="w-3.5 h-3.5 text-pink-400" />
          <span>Surprise Delivery</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight glow-text-pink mb-2 sm:mb-3 px-2"
        >
          {birthdayConfig.giftBox.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-pink-200/80 text-xs sm:text-base max-w-lg mx-auto italic font-light mb-8 sm:mb-12 px-3"
        >
          {birthdayConfig.giftBox.instruction}
        </motion.p>

        {/* Interactive Gift Box */}
        <div className="relative my-4 sm:my-6 select-none flex flex-col items-center w-full">
          {!isOpen ? (
            <motion.div
              onClick={handleOpenBox}
              whileHover={{
                scale: 1.06,
                rotate: [0, -3, 3, -2, 2, 0],
                transition: { duration: 0.5 },
              }}
              whileTap={{ scale: 0.95 }}
              className="relative cursor-pointer group flex flex-col items-center"
            >
              {/* Pulsing Aura */}
              <div className="absolute -inset-6 rounded-3xl bg-pink-500/20 blur-xl group-hover:bg-pink-500/35 transition-colors" />

              {/* Gift Box Lid */}
              <motion.div className="relative z-20 w-36 sm:w-52 h-11 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 border-2 border-pink-200/60 shadow-xl flex items-center justify-center overflow-hidden">
                <div className="w-8 sm:w-10 h-full bg-gradient-to-r from-yellow-500 via-amber-300 to-yellow-500 shadow-md" />
                <div className="absolute -top-2.5 sm:-top-3 w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-yellow-400 border border-yellow-200 shadow-lg" />
              </motion.div>

              {/* Gift Box Body */}
              <div className="relative z-10 w-32 sm:w-48 h-28 sm:h-44 rounded-b-2xl sm:rounded-b-3xl bg-gradient-to-b from-purple-900 via-pink-900 to-[#1d0630] border-2 border-t-0 border-pink-300/40 shadow-2xl flex items-center justify-center overflow-hidden mt-[-3px]">
                <div className="w-8 sm:w-10 h-full bg-gradient-to-r from-yellow-500 via-amber-300 to-yellow-500 shadow-md" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-200 animate-spin-slow drop-shadow" />
                </div>
              </div>

              {/* Instruction pill */}
              <div className="mt-5 sm:mt-6 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-200 text-xs font-medium tracking-wide">
                Tap to Open Surprise 🎀
              </div>
            </motion.div>
          ) : (
            /* Opened Surprise Reveal Card & Coupons */
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", damping: 20 }}
              className="w-full max-w-2xl flex flex-col items-center"
            >
              {/* Grand Quote Plaque */}
              <div className="w-full p-6 sm:p-10 rounded-2xl sm:rounded-3xl glass-panel-pink border-2 border-pink-300/50 shadow-[0_20px_60px_rgba(255,105,180,0.3)] relative overflow-hidden mb-6 sm:mb-8">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400" />
                <div className="inline-flex p-2.5 sm:p-3 rounded-full bg-gradient-to-tr from-pink-600 to-rose-400 text-white mb-3 sm:mb-4 shadow-lg">
                  <Heart className="w-6 h-6 sm:w-7 sm:h-7 fill-white drop-shadow" />
                </div>

                <h3 className="font-serif text-xl sm:text-3xl md:text-4xl font-bold text-white glow-text-pink mb-3 sm:mb-4">
                  {birthdayConfig.giftBox.revealedTitle}
                </h3>

                <p className="font-serif text-base sm:text-2xl text-pink-100 font-light italic leading-relaxed max-w-xl mx-auto">
                  &ldquo;{birthdayConfig.giftBox.revealedMessage}&rdquo;
                </p>
              </div>

              {/* Bestie Friendship Coupons */}
              <div className="w-full space-y-3.5 sm:space-y-4 mb-6 sm:mb-8">
                <h4 className="text-[11px] sm:text-xs uppercase tracking-widest text-pink-300/80 font-semibold mb-2">
                  Special Bestie Vouchers (Redeemable Anytime!) 🎟️
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
                  {birthdayConfig.giftBox.perks.map((perk, idx) => {
                    const isRedeemed = redeemedCoupons[idx];
                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -3 }}
                        className={`p-4 sm:p-5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                          isRedeemed
                            ? "bg-pink-950/60 border-pink-400/50 shadow-[0_0_20px_rgba(255,105,180,0.3)]"
                            : "glass-card border-pink-400/20 hover:border-pink-400/40"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2.5">
                            <div className="p-1.5 sm:p-2 rounded-xl bg-pink-500/20 border border-pink-400/30">
                              {getPerkIcon(perk.icon)}
                            </div>
                            <span className="text-[10px] uppercase tracking-wider text-pink-300/70 font-semibold">
                              VIP Coupon
                            </span>
                          </div>
                          <h5 className="font-serif font-bold text-pink-100 text-sm sm:text-base mb-1">
                            {perk.title}
                          </h5>
                          <p className="text-pink-200/70 text-xs leading-relaxed mb-4">
                            {perk.description}
                          </p>
                        </div>

                        <button
                          onClick={() => handleRedeemCoupon(idx)}
                          disabled={isRedeemed}
                          className={`w-full py-2 px-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all min-h-[38px] ${
                            isRedeemed
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                              : "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90 shadow-md active:scale-95"
                          }`}
                        >
                          {isRedeemed ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Redeemed with Love 💖</span>
                            </>
                          ) : (
                            <span>Claim Coupon ✨</span>
                          )}
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Close / Replay Button */}
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-purple-950/50 hover:bg-purple-900/60 border border-pink-400/30 text-pink-300 text-xs font-medium transition-all min-h-[38px]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Re-wrap Gift Box 🎁</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
