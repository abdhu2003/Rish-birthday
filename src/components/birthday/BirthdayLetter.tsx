"use client";

import { motion } from "framer-motion";
import { Scroll, Heart, Sparkles, Flame, ShieldCheck } from "lucide-react";
import { birthdayConfig } from "@/config/birthdayConfig";
import { fireHeartExplosion } from "@/utils/confetti";
import { audioController } from "@/utils/audio";

export default function BirthdayLetter() {
  return (
    <section id="letter" className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] bg-gradient-to-tr from-orange-600/15 via-red-600/15 to-purple-800/20 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs sm:text-sm font-semibold mb-4"
          >
            <Scroll className="w-3.5 h-3.5 text-orange-400" />
            <span>Sacred Shinobi Bond</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight glow-text-gold mb-3 px-2"
          >
            {birthdayConfig.letter.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-orange-200/80 text-xs sm:text-base max-w-xl mx-auto italic font-light px-3"
          >
            {birthdayConfig.letter.scrollSubtitle}
          </motion.p>
        </div>

        {/* Shinobi Scroll Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full"
        >
          {/* Scroll Outer Frame */}
          <div className="relative rounded-3xl p-6 sm:p-12 bg-gradient-to-b from-[#1c0a1a] via-[#150616] to-[#0c030d] border-2 border-orange-500/40 shadow-[0_15px_60px_rgba(255,140,0,0.25)] backdrop-blur-2xl overflow-hidden">
            {/* Top Wooden Rod Graphic */}
            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-orange-800 via-amber-600 to-orange-800 shadow-md" />
            {/* Bottom Wooden Rod Graphic */}
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-orange-800 via-amber-600 to-orange-800 shadow-md" />

            {/* Glowing Corner Accents */}
            <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-orange-400/50 rounded-tl-xl pointer-events-none" />
            <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-orange-400/50 rounded-tr-xl pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-orange-400/50 rounded-bl-xl pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-orange-400/50 rounded-br-xl pointer-events-none" />

            {/* Scroll Header with Uzumaki Crest */}
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-orange-500/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-rose-400 shadow-[0_0_15px_rgba(255,20,147,0.6)] shrink-0">
                  <img
                    src="/images/characters/kushina.png"
                    alt="Kushina Uzumaki"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-orange-400 font-bold block">
                    Kushina&apos;s Blessing • Uzumaki Clan
                  </span>
                  <span className="font-serif text-amber-100 font-bold text-sm sm:text-base">
                    Dedicated to {birthdayConfig.friendName} 🌸
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-amber-300 bg-orange-950/70 px-3 py-1 rounded-full border border-orange-500/30 font-semibold shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                <span>Will of Fire 🔥</span>
              </div>
            </div>

            {/* Letter Content - Staggered Paragraphs */}
            <div className="space-y-5 sm:space-y-6 text-orange-50 leading-relaxed text-sm sm:text-lg font-light">
              {birthdayConfig.letter.paragraphs.map((p, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + idx * 0.1 }}
                  className={
                    idx === 0
                      ? "font-serif text-xl sm:text-2xl text-amber-200 font-bold leading-snug"
                      : idx === birthdayConfig.letter.paragraphs.length - 1
                      ? "font-serif text-base sm:text-xl text-rose-300 font-semibold"
                      : "text-orange-100/90"
                  }
                >
                  {p}
                </motion.p>
              ))}

              {/* Sign-Off Footer */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-8 pt-6 border-t border-orange-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <p className="font-handwriting text-2xl sm:text-3xl text-amber-300 font-bold mb-1 leading-snug">
                    {birthdayConfig.letter.signOff}
                  </p>
                  <p className="text-xs sm:text-sm text-orange-300/80 italic">
                    {birthdayConfig.letter.signature} {birthdayConfig.yourName} 💖
                  </p>
                </div>

                {/* Stamp Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    fireHeartExplosion(0.5, 0.6);
                    audioController.playChakraSurgeSound();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(255,127,0,0.5)] border border-orange-300/40 min-h-[42px]"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Send Love Across the Leaf 🍥</span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

