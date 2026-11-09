"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, Heart, Utensils, Shield, HeartHandshake, CheckCircle2, RotateCcw } from "lucide-react";
import { birthdayConfig } from "@/config/birthdayConfig";
import { fireHeartExplosion, fireSparkles, fireCelebrationConfetti } from "@/utils/confetti";
import { audioController } from "@/utils/audio";

export default function SecretGiftBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [claimedVouchers, setClaimedVouchers] = useState<{ [index: number]: boolean }>({});

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
    audioController.playChakraSurgeSound();
  };

  const handleClaimVoucher = (index: number) => {
    setClaimedVouchers((prev) => ({ ...prev, [index]: true }));
    fireSparkles(0.5, 0.6);
    audioController.playSparkleSound();
  };

  const handleReset = () => {
    setIsOpen(false);
    audioController.playSparkleSound();
  };

  const getVoucherIcon = (iconName: string) => {
    switch (iconName) {
      case "Utensils":
        return <Utensils className="w-5 h-5 text-amber-300" />;
      case "Shield":
        return <Shield className="w-5 h-5 text-cyan-300" />;
      default:
        return <Heart className="w-5 h-5 text-rose-300 fill-rose-300" />;
    }
  };

  return (
    <section id="gift" className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden text-center">
      {/* Background ambient chakra aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[650px] h-[340px] sm:h-[650px] bg-gradient-to-tr from-orange-600/20 via-rose-600/15 to-purple-800/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs sm:text-sm font-semibold mb-4"
        >
          <Gift className="w-3.5 h-3.5 text-orange-400" />
          <span>Secret Shinobi Delivery</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight glow-text-gold mb-3 px-2"
        >
          {birthdayConfig.giftBox.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-orange-200/80 text-xs sm:text-base max-w-lg mx-auto italic font-light mb-10 px-3"
        >
          {birthdayConfig.giftBox.instruction}
        </motion.p>

        {/* Interactive Ninja Gift Box */}
        <div className="relative my-4 select-none flex flex-col items-center w-full">
          {!isOpen ? (
            <motion.div
              onClick={handleOpenBox}
              whileHover={{
                scale: 1.07,
                rotate: [0, -4, 4, -3, 3, 0],
                transition: { duration: 0.5 },
              }}
              whileTap={{ scale: 0.95 }}
              className="relative cursor-pointer group flex flex-col items-center"
            >
              {/* Chakra Glow Aura */}
              <div className="absolute -inset-6 rounded-3xl bg-orange-500/25 blur-xl group-hover:bg-orange-500/40 transition-colors" />

              {/* Gift Box Lid with Gold Ribbon & Uzumaki Seal */}
              <motion.div className="relative z-20 w-40 sm:w-52 h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-red-600 border-2 border-orange-200/80 shadow-xl flex items-center justify-center overflow-hidden">
                <div className="w-8 sm:w-10 h-full bg-gradient-to-r from-yellow-500 via-amber-200 to-yellow-500 shadow-md" />
                <div className="absolute -top-3 w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-yellow-400 border border-yellow-100 shadow-lg flex items-center justify-center text-[10px] text-stone-900 font-bold">
                  🍥
                </div>
              </motion.div>

              {/* Gift Box Body */}
              <div className="relative z-10 w-36 sm:w-48 h-32 sm:h-44 rounded-b-2xl sm:rounded-b-3xl bg-gradient-to-b from-[#1b0821] via-orange-950 to-[#0e0312] border-2 border-t-0 border-orange-400/50 shadow-2xl flex items-center justify-center overflow-hidden mt-[-3px]">
                <div className="w-8 sm:w-10 h-full bg-gradient-to-r from-yellow-500 via-amber-200 to-yellow-500 shadow-md" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-amber-200 animate-spin-slow drop-shadow" />
                </div>
              </div>

              {/* Instruction pill */}
              <div className="mt-5 px-4 py-1.5 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-200 text-xs font-semibold tracking-wide">
                Tap to Break Chakra Seal 🎁
              </div>
            </motion.div>
          ) : (
            /* Opened Surprise Reveal Card & Shinobi Vouchers */
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", damping: 20 }}
              className="w-full max-w-2xl flex flex-col items-center"
            >
              {/* Grand Quote Plaque */}
              <div className="w-full p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#210925] to-[#0e0413] border-2 border-orange-400/60 shadow-[0_20px_60px_rgba(255,140,0,0.35)] relative overflow-hidden mb-8">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-300 to-red-500" />
                <div className="inline-flex p-3 rounded-full bg-gradient-to-tr from-orange-600 to-red-600 text-white mb-4 shadow-lg">
                  <Heart className="w-7 h-7 fill-white drop-shadow" />
                </div>

                <h3 className="font-serif text-2xl sm:text-4xl font-extrabold text-white glow-text-gold mb-3">
                  {birthdayConfig.giftBox.revealedTitle}
                </h3>

                <p className="font-serif text-lg sm:text-2xl text-amber-100 font-light italic leading-relaxed max-w-xl mx-auto mb-3">
                  &ldquo;{birthdayConfig.giftBox.revealedMessage}&rdquo;
                </p>

                <p className="text-xs sm:text-sm text-orange-200/80 italic">
                  {birthdayConfig.giftBox.scrollSecret}
                </p>
              </div>

              {/* Shinobi Friendship Vouchers */}
              <div className="w-full space-y-4 mb-8">
                <h4 className="text-xs uppercase tracking-widest text-orange-300 font-bold mb-2">
                  Shinobi Friendship Vouchers (Redeemable Anytime!) 📜✨
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {birthdayConfig.giftBox.shinobiCoupons.map((coupon, idx) => {
                    const isClaimed = claimedVouchers[idx];
                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -4 }}
                        className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                          isClaimed
                            ? "bg-orange-950/70 border-orange-400/60 shadow-[0_0_20px_rgba(255,140,0,0.3)]"
                            : "bg-[#16061c]/80 border-orange-500/30 hover:border-orange-400/60"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="p-2 rounded-xl bg-orange-500/20 border border-orange-400/30">
                              {getVoucherIcon(coupon.icon)}
                            </div>
                            <span className="text-[10px] uppercase tracking-wider text-amber-300 font-bold">
                              {coupon.badge}
                            </span>
                          </div>
                          <h5 className="font-serif font-bold text-amber-100 text-base mb-1">
                            {coupon.title}
                          </h5>
                          <p className="text-orange-200/70 text-xs leading-relaxed mb-4">
                            {coupon.desc}
                          </p>
                        </div>

                        <button
                          onClick={() => handleClaimVoucher(idx)}
                          disabled={isClaimed}
                          className={`w-full py-2 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all min-h-[38px] ${
                            isClaimed
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
                              : "bg-gradient-to-r from-orange-500 via-amber-500 to-red-600 text-white shadow-md active:scale-95"
                          }`}
                        >
                          {isClaimed ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Voucher Claimed! 🍜</span>
                            </>
                          ) : (
                            <span>Claim Shinobi Pass 🎟️</span>
                          )}
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Reset Box Button */}
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/60 hover:bg-black/80 border border-orange-500/40 text-orange-200 text-xs font-semibold transition-all min-h-[38px]"
              >
                <RotateCcw className="w-3.5 h-3.5 text-orange-400" />
                <span>Reseal the Shinobi Gift Box 🎀</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

