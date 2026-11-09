"use client";

import { motion } from "framer-motion";
import { Mail, Heart, Sparkles, Feather } from "lucide-react";
import { birthdayConfig } from "@/birthdayConfig";
import { fireHeartExplosion } from "@/utils/confetti";
import { audioController } from "@/utils/audio";

export default function LetterSection() {
  return (
    <section id="letter" className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[550px] h-[320px] sm:h-[550px] bg-gradient-to-tr from-pink-500/10 via-purple-600/15 to-rose-400/10 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-300 text-xs sm:text-sm font-medium mb-3 sm:mb-4"
          >
            <Feather className="w-3.5 h-3.5 text-pink-400" />
            <span>From the Heart</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight glow-text-pink mb-2 sm:mb-3 px-2"
          >
            {birthdayConfig.letter.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-pink-200/70 text-xs sm:text-base max-w-xl mx-auto italic font-light px-3"
          >
            {birthdayConfig.letter.tagline}
          </motion.p>
        </div>

        {/* Envelope & Parchment Letter Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative w-full"
        >
          {/* Glassmorphic Letter Card */}
          <div className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-10 md:p-12 glass-panel-pink border border-pink-300/30 shadow-[0_15px_50px_rgba(255,105,180,0.18)] backdrop-blur-2xl overflow-hidden">
            {/* Decorative Corner Ornaments */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-l-2 border-pink-400/40 rounded-tl-lg sm:rounded-tl-xl pointer-events-none" />
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-r-2 border-pink-400/40 rounded-tr-lg sm:rounded-tr-xl pointer-events-none" />
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-l-2 border-pink-400/40 rounded-bl-lg sm:rounded-bl-xl pointer-events-none" />
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-r-2 border-pink-400/40 rounded-br-lg sm:rounded-br-xl pointer-events-none" />

            {/* Top Wax Seal / Stamp Header */}
            <div className="flex items-center justify-between pb-4 sm:pb-6 mb-6 sm:mb-8 border-b border-pink-400/20">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-pink-600 to-rose-400 flex items-center justify-center shadow-lg border border-pink-200/40 shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-pink-300/70 font-semibold block">
                    Special Delivery
                  </span>
                  <span className="font-serif text-pink-100 font-semibold text-xs sm:text-base">
                    For {birthdayConfig.friendName} 🌸
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[11px] sm:text-xs text-yellow-300/90 bg-yellow-400/10 px-2.5 sm:px-3 py-1 rounded-full border border-yellow-400/30 font-medium shrink-0">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Bestie 💖</span>
              </div>
            </div>

            {/* Letter Content - Staggered Paragraphs */}
            <div className="space-y-4 sm:space-y-6 text-pink-50 leading-relaxed text-sm sm:text-lg font-light">
              {birthdayConfig.letter.paragraphs.map((paragraph, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + idx * 0.12 }}
                  className={
                    idx === 0
                      ? "font-serif text-lg sm:text-2xl text-pink-200 font-medium leading-snug"
                      : "text-pink-100/90"
                  }
                >
                  {paragraph}
                </motion.p>
              ))}

              {/* Sign-off Quote Box */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-pink-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <p className="font-handwriting text-xl sm:text-3xl text-pink-200 font-bold mb-1 leading-snug">
                    {birthdayConfig.letter.signOff}
                  </p>
                  <p className="text-xs sm:text-sm text-pink-300/80 italic">
                    {birthdayConfig.letter.signature} {birthdayConfig.senderName} 💖
                  </p>
                </div>

                {/* Interactive Heart stamp button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => {
                    fireHeartExplosion(0.5, 0.6);
                    audioController.playSparkleSound();
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-pink-500/20 hover:bg-pink-500/30 border border-pink-400/40 text-pink-200 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all shadow-md group min-h-[42px]"
                >
                  <Heart className="w-4 h-4 text-pink-400 group-hover:scale-125 transition-transform fill-pink-400" />
                  <span>Send Love Back 💗</span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
