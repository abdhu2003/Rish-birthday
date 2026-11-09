"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, X, Zap, Flame, Shield, Award, Users } from "lucide-react";
import { birthdayConfig, ShinobiCharacter } from "@/config/birthdayConfig";
import { fireSparkles, fireHeartExplosion } from "@/utils/confetti";
import { audioController } from "@/utils/audio";

export default function CharacterGallery() {
  const [selectedCharacter, setSelectedCharacter] = useState<ShinobiCharacter | null>(null);

  const openCharacterModal = (char: ShinobiCharacter) => {
    setSelectedCharacter(char);
    audioController.playChakraSurgeSound();
    fireSparkles(0.5, 0.4);
  };

  const closeCharacterModal = () => {
    setSelectedCharacter(null);
  };

  return (
    <section id="characters" className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">
      {/* Background Chakra Aura Blobs */}
      <div className="absolute top-1/3 left-5 w-80 h-80 bg-orange-600/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-5 w-80 h-80 bg-cyan-600/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs sm:text-sm font-semibold mb-4"
          >
            <Users className="w-3.5 h-3.5 text-orange-400" />
            <span>Shinobi Allies & Legends</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight glow-text-gold mb-3 px-2"
          >
            Legendary Birthday Blessings 🍥✨
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-orange-100/80 text-xs sm:text-base max-w-xl mx-auto italic font-light px-3"
          >
            Tap each shinobi to unlock their personal birthday message and ninja way!
          </motion.p>
        </div>

        {/* Character Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {birthdayConfig.characters.map((char, idx) => (
            <motion.div
              key={char.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => openCharacterModal(char)}
              className="group relative cursor-pointer rounded-2xl overflow-hidden bg-gradient-to-b from-[#180924]/90 to-[#0e0417]/95 border border-orange-500/25 p-3.5 shadow-xl hover:shadow-[0_0_30px_rgba(255,140,0,0.35)] transition-all duration-300"
            >
              {/* Character Visual Box */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-black/60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={char.avatarUrl}
                  alt={char.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Jutsu badge */}
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-orange-400/30 text-[11px] font-semibold text-amber-200 shadow-md">
                  {char.badge}
                </div>

                {/* Character Name on Card Overlay */}
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[10px] uppercase tracking-wider text-orange-400 font-bold block mb-0.5">
                    {char.clan}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {char.name}
                  </h3>
                </div>
              </div>

              {/* Character Quote Preview */}
              <div className="p-2.5 pt-3">
                <p className="text-orange-200/70 text-xs italic line-clamp-2 font-light">
                  &ldquo;{char.birthdayWish}&rdquo;
                </p>
                <div className="mt-2 text-[11px] text-amber-400 font-semibold flex items-center justify-between">
                  <span>View Blessing</span>
                  <span>→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full-Screen Character Detail Modal */}
      <AnimatePresence>
        {selectedCharacter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/92 backdrop-blur-2xl"
            onClick={closeCharacterModal}
          >
            {/* Close Button */}
            <button
              onClick={closeCharacterModal}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all z-30 min-w-[42px] min-h-[42px] flex items-center justify-center"
              aria-label="Close character"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Modal Content Box */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-xl w-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#1e0a29] to-[#0c0312] border-2 border-orange-500/40 shadow-[0_0_60px_rgba(255,140,0,0.5)] p-6 sm:p-8 flex flex-col items-center text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Chakra Aura Halo */}
              <div
                className="absolute -top-10 w-48 h-48 rounded-full blur-3xl opacity-40 pointer-events-none"
                style={{ backgroundColor: selectedCharacter.chakraColor }}
              />

              {/* Character Avatar Round */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-orange-400 shadow-[0_0_30px_rgba(255,140,0,0.7)] mb-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedCharacter.avatarUrl}
                  alt={selectedCharacter.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Clan & Title */}
              <span className="text-xs uppercase tracking-widest text-orange-400 font-bold mb-1">
                {selectedCharacter.clan} • {selectedCharacter.badge}
              </span>

              <h3 className="font-serif text-2xl sm:text-4xl font-extrabold text-white mb-2 glow-text-gold">
                {selectedCharacter.name}
              </h3>

              <p className="text-xs sm:text-sm text-amber-200/80 italic mb-6">
                {selectedCharacter.title}
              </p>

              {/* Character Birthday Blessing Quote */}
              <div className="w-full p-5 sm:p-6 rounded-2xl bg-black/60 border border-orange-500/30 mb-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-300 to-red-500" />
                <p className="font-serif text-lg sm:text-2xl font-bold text-amber-100 leading-snug">
                  &ldquo;{selectedCharacter.birthdayWish}&rdquo;
                </p>
                <span className="block mt-3 text-xs text-orange-300/80 italic">
                  — Ninja Creed: &ldquo;{selectedCharacter.quote}&rdquo;
                </span>
              </div>

              {/* Send Chakra Love Back */}
              <button
                onClick={() => {
                  fireHeartExplosion(0.5, 0.5);
                  audioController.playSparkleSound();
                }}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-rose-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Send Shinobi Respect & Love 💖</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

