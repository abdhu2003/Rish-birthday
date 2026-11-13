"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, ChevronDown, Flame, Shield, ArrowRight, Crown } from "lucide-react";
import { birthdayConfig } from "@/config/birthdayConfig";
import { fireHeartExplosion, fireCelebrationConfetti } from "@/utils/confetti";
import { audioController } from "@/utils/audio";

interface AnimeHeroProps {
  onEnter: (transitionType: "sharingan" | "chakra" | "rasengan") => void;
}

export default function AnimeHero({ onEnter }: AnimeHeroProps) {
  const handleEnterWorld = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    fireHeartExplosion(x, y);
    fireCelebrationConfetti();
    audioController.playChakraSurgeSound();

    // Trigger Rasengan or Chakra anime transition
    onEnter("chakra");

    setTimeout(() => {
      const el = document.getElementById("characters");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 450);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[95vh] sm:min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-20 sm:pt-28 pb-20 overflow-hidden"
    >
      {/* Background Anime Sunset Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[340px] sm:w-[700px] h-[340px] sm:h-[700px] bg-gradient-to-tr from-orange-600/25 via-rose-600/20 to-purple-800/30 rounded-full blur-[110px] sm:blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-60 sm:w-80 h-60 sm:h-80 bg-amber-500/15 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-red-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Stylized Hokage Monument Mountain Silhouette in Background */}
      <div className="absolute bottom-0 left-0 right-0 h-44 sm:h-64 pointer-events-none opacity-20 overflow-hidden flex items-end justify-center">
        <svg
          viewBox="0 0 1200 300"
          fill="currentColor"
          className="w-full text-stone-900"
          preserveAspectRatio="none"
        >
          {/* Mountain range & Hokage rock profile silhouettes */}
          <path d="M0 300 L0 180 Q150 120 300 170 Q450 100 600 160 Q750 110 900 150 Q1050 80 1200 190 L1200 300 Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center w-full">
        {/* Village Decree Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-950/80 to-purple-950/80 border border-orange-500/40 text-orange-200 text-xs sm:text-sm font-semibold mb-6 shadow-[0_0_25px_rgba(255,127,0,0.35)]"
        >
          <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
          <span>{birthdayConfig.hero.villageBadge}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
          <span className="text-amber-300">{birthdayConfig.birthdayDate}</span>
        </motion.div>

        {/* Main Anime Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.18] px-2"
        >
          Happy Birthday,{" "}
          <span className="block mt-2 bg-gradient-to-r from-orange-400 via-amber-300 to-rose-400 bg-clip-text text-transparent glow-text-gold font-serif">
            {birthdayConfig.friendNickname}! 🍥❤️
          </span>
        </motion.h1>

        {/* Subheading Quote */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="font-sans text-base sm:text-xl md:text-2xl text-orange-100/90 max-w-2xl font-light italic mb-6 sm:mb-8 leading-relaxed px-4 drop-shadow"
        >
          &ldquo;{birthdayConfig.hero.subheading}&rdquo;
        </motion.p>

        {/* Unique Shinobi Birthday Queen Spotlight Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-xs sm:max-w-sm w-full mx-auto mb-10 px-2"
        >
          {/* Shimmering Animated Chakra & Heart Halo */}
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 opacity-65 blur-xl animate-chakra-pulse pointer-events-none" />

          {/* Floating Heart Badges around the frame */}
          <motion.div
            animate={{ y: [-4, 4, -4], rotate: [-6, 6, -6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-3 -right-2 z-20 p-2 rounded-full bg-pink-500/90 border border-white/60 shadow-[0_0_15px_rgba(255,20,147,0.8)] pointer-events-none"
          >
            <Heart className="w-4 h-4 fill-white text-white" />
          </motion.div>

          <motion.div
            animate={{ y: [4, -4, 4], rotate: [6, -6, 6] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-2 -left-2 z-20 p-1.5 rounded-full bg-rose-600/90 border border-amber-300/60 shadow-[0_0_15px_rgba(255,105,180,0.8)] pointer-events-none"
          >
            <Heart className="w-3.5 h-3.5 fill-amber-200 text-amber-200" />
          </motion.div>

          {/* Glassmorphism Shinobi Frame */}
          <div
            onClick={() => {
              fireHeartExplosion(0.5, 0.45);
              fireCelebrationConfetti();
              audioController.playSparkleSound();
            }}
            className="relative rounded-3xl p-4 sm:p-5 bg-gradient-to-b from-[#280c2e]/95 via-[#1a0721]/95 to-[#0e0313] border-2 border-pink-400/70 shadow-[0_15px_50px_rgba(255,105,180,0.55)] backdrop-blur-2xl flex flex-col items-center text-center group hover:border-pink-300 transition-all duration-300 cursor-pointer"
          >
            {/* Top Crown Ribbon */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 via-pink-500 to-rose-500 border border-white/40 text-white text-xs font-bold shadow-[0_0_15px_rgba(255,180,0,0.6)] mb-3 group-hover:scale-105 transition-transform">
              <Crown className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />
              <span>Birthday Queen 👑</span>
            </div>

            {/* Birthday Girl Real Photo Frame */}
            <div className="relative w-48 h-60 sm:w-56 sm:h-72 rounded-2xl overflow-hidden border-2 border-pink-400/90 shadow-[0_0_35px_rgba(255,105,180,0.7)] group-hover:scale-105 transition-transform duration-500 mb-3 bg-black/60">
              <img
                src="/images/characters/rishdha_portrait.jpg"
                alt="Rishdha - The Birthday Girl"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />

              {/* Glowing Corner Accents */}
              <div className="absolute top-2 left-2 p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-pink-400/40 pointer-events-none">
                <Sparkles className="w-3 h-3 text-amber-300" />
              </div>
              <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-pink-400/40 pointer-events-none">
                <Heart className="w-3 h-3 fill-rose-400 text-rose-400 animate-pulse" />
              </div>

              <div className="absolute bottom-2.5 left-2 right-2 text-center pointer-events-none">
                <span className="text-[10px] uppercase tracking-wider text-amber-300 font-bold block mb-0.5">
                  Our Shining Star
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white glow-text-pink">
                  Rishdha 💖
                </h3>
              </div>
            </div>

            {/* Friendship Blessing Tag */}
            <div className="px-3.5 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-200 text-[11px] sm:text-xs italic font-medium shadow-inner flex items-center gap-1.5">
              <Heart className="w-3 h-3 fill-pink-400 text-pink-400" />
              <span>Konoha&apos;s Most Cherished Shinobi & Soul Sister ✨</span>
            </div>

            <span className="text-[10px] text-pink-300/70 mt-1.5 font-light">
              Tap photo for heart blessing 💖
            </span>
          </div>
        </motion.div>

        {/* Hero Flanking Shinobi Guardians: Naruto & Kakashi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="grid grid-cols-2 gap-4 sm:gap-8 max-w-md w-full mb-8 px-2"
        >
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-orange-400 shadow-[0_0_25px_rgba(255,140,0,0.6)] group">
              <img
                src="/images/characters/naruto.png"
                alt="Naruto Uzumaki"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <span className="absolute bottom-1 text-[11px] font-bold text-amber-200">Naruto 🍥</span>
            </div>
            <span className="text-[10px] text-orange-300/80 mt-1 font-semibold">Hero of the Leaf</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-[0_0_25px_rgba(0,191,255,0.6)] group">
              <img
                src="/images/characters/kakashi.png"
                alt="Kakashi Hatake"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <span className="absolute bottom-1 text-[11px] font-bold text-cyan-200">Kakashi ⚡</span>
            </div>
            <span className="text-[10px] text-cyan-300/80 mt-1 font-semibold">Sixth Hokage</span>
          </div>
        </motion.div>

        {/* Featured Shinobi Character Badges Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 max-w-xl"
        >
          {birthdayConfig.favoriteCharacters.map((charName, i) => (
            <div
              key={i}
              className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-orange-500/30 text-xs text-orange-200 font-medium flex items-center gap-1.5 shadow-md hover:border-orange-400/60 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_#FF7F00]" />
              <span>{charName}</span>
            </div>
          ))}
        </motion.div>

        {/* Cinematic CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="relative w-full sm:w-auto px-4 flex justify-center"
        >
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-red-600 blur-lg opacity-75 animate-chakra-pulse" />

          <motion.button
            onClick={handleEnterWorld}
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255,140,0,0.9)" }}
            whileTap={{ scale: 0.95 }}
            className="relative w-full sm:w-auto max-w-sm px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-red-600 text-white font-extrabold text-sm sm:text-lg tracking-wider uppercase shadow-[0_0_30px_rgba(255,127,0,0.6)] border border-orange-200/60 flex items-center justify-center gap-3 transition-all min-h-[50px]"
          >
            <Sparkles className="w-5 h-5 text-amber-200" />
            <span>{birthdayConfig.hero.ctaButton}</span>
            <ArrowRight className="w-5 h-5 text-amber-200 group-hover:translate-x-1.5 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Scroll Prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 sm:mt-16 flex flex-col items-center gap-1.5 text-orange-300/60 text-xs uppercase tracking-widest cursor-pointer hover:text-orange-200 transition-colors"
          onClick={() => {
            const el = document.getElementById("characters");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span>Scroll down for the Shinobi Celebration</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-orange-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

