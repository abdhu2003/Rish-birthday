"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, Sparkles, Heart, Film, AlertCircle } from "lucide-react";
import { birthdayConfig } from "@/config/birthdayConfig";
import { fireSparkles, fireHeartExplosion, fireCelebrationConfetti } from "@/utils/confetti";
import { audioController } from "@/utils/audio";
import ShinobiCharacterImage from "./ShinobiCharacterImage";

export default function AnimeWeddingVideoSection() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeText, setCurrentTimeText] = useState("0:00");
  const [durationText, setDurationText] = useState("0:24");
  const [showControls, setShowControls] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleStartWatch = () => {
    setHasStarted(true);
    fireSparkles(0.5, 0.4);
    audioController.playSharinganSound();

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Unmuted autoplay restricted by browser policy. Retrying muted:", err);
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch((e) => {
              console.error("Play error:", e);
            });
          }
        });
      }
    }
  };

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
      }
    } else {
      videoRef.current.pause();
    }
  };

  const handleToggleMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 24;
    setProgress((cur / dur) * 100);
    setCurrentTimeText(formatTime(cur));
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDurationText(formatTime(videoRef.current.duration || 24));
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setHasEnded(true);
    fireHeartExplosion(0.5, 0.45);
    setTimeout(() => {
      fireCelebrationConfetti();
    }, 300);
    audioController.playSparkleSound();
  };

  const handleReplayVideo = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    setHasEnded(false);
    videoRef.current.play().catch(() => {});
    audioController.playChakraSurgeSound();
  };

  const handleFullscreen = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetTime = ratio * (videoRef.current.duration || 24);
    videoRef.current.currentTime = targetTime;
  };

  return (
    <section id="wedding-video" className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">
      {/* Background Anime Ambient Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[750px] h-[340px] sm:h-[750px] bg-gradient-to-tr from-rose-500/20 via-pink-600/15 to-purple-700/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 w-full text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-400/40 text-pink-200 text-xs sm:text-sm font-semibold mb-4 shadow-[0_0_20px_rgba(255,105,180,0.3)]"
        >
          <Film className="w-3.5 h-3.5 text-pink-400" />
          <span>Cinematic Anime Premiere</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight glow-text-pink mb-3 px-2"
        >
          💍 A Special Shinobi Wedding Surprise 🌸
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-pink-100/80 text-xs sm:text-base max-w-xl mx-auto italic font-light mb-10 px-3"
        >
          A cinematic Naruto Shippuden fantasy ceremony created especially for {birthdayConfig.friendName}!
        </motion.p>

        {/* Featured Wedding Shinobi Couple Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10 max-w-xl mx-auto">
          <ShinobiCharacterImage
            name="Kakashi Hatake"
            src="/images/characters/kakashi.png"
            alt="Kakashi Hatake Wedding Attire"
            clan="Hatake Clan"
            chakraColor="#00BFFF"
            badge="The Groom ⚡"
          />
          <ShinobiCharacterImage
            name="Kushina Uzumaki"
            src="/images/characters/kushina.png"
            alt="Kushina Uzumaki Wedding Kimono"
            clan="Uzumaki Clan"
            chakraColor="#FF1493"
            badge="The Bride ❤️"
          />
        </div>

        {/* Video Theater Glassmorphism Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl p-3 sm:p-7 bg-gradient-to-b from-[#1f0923]/95 via-[#130517]/95 to-[#0b020d] border-2 border-pink-400/40 shadow-[0_20px_60px_rgba(255,105,180,0.3)] backdrop-blur-2xl overflow-hidden"
        >
          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-3xl border border-pink-300/30 pointer-events-none" />

          {/* Video Container (ALWAYS in DOM for instant buffering) */}
          <div
            className="relative aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-pink-400/40 shadow-inner group select-none"
            onClick={hasStarted ? handleTogglePlay : undefined}
          >
            <video
              ref={videoRef}
              src="/videos/naruto-wedding-surprise.mp4"
              poster="/images/characters/scene1_village.png"
              playsInline
              preload="auto"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleVideoEnded}
              className="w-full h-full object-cover cursor-pointer"
            />

            {/* Muted Indicator Pill (if browser auto-muted) */}
            {hasStarted && isMuted && isPlaying && (
              <button
                onClick={handleToggleMute}
                className="absolute top-4 right-4 z-30 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-pink-400/60 text-xs font-bold text-pink-200 flex items-center gap-1.5 shadow-lg animate-pulse hover:scale-105 transition-all"
              >
                <VolumeX className="w-3.5 h-3.5 text-pink-400" />
                <span>Tap to Unmute 🔊</span>
              </button>
            )}

            {/* Center Play Button Overlay when Paused */}
            {hasStarted && !isPlaying && !hasEnded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTogglePlay();
                }}
                className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-500 flex items-center justify-center shadow-[0_0_40px_rgba(255,105,180,0.85)] border-2 border-white/80 hover:scale-110 active:scale-95 transition-all">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white ml-1" />
                </div>
              </motion.div>
            )}

            {/* Teaser Opening Overlay (Sits on top until user clicks Watch) */}
            <AnimatePresence>
              {!hasStarted && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 z-30 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center border border-pink-400/30"
                >
                  {/* Background ambient poster image */}
                  <div className="absolute inset-0 opacity-40 pointer-events-none">
                    <Image
                      src="/images/characters/scene1_village.png"
                      alt="Wedding Surprise Preview"
                      fill
                      className="object-cover blur-sm"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/80 pointer-events-none" />

                  <div className="relative z-10 flex flex-col items-center">
                    <div
                      onClick={handleStartWatch}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-orange-500 flex items-center justify-center shadow-[0_0_40px_rgba(255,105,180,0.8)] border-2 border-white/80 mb-5 animate-pulse cursor-pointer hover:scale-110 active:scale-95 transition-all"
                    >
                      <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white ml-1" />
                    </div>

                    <h3 className="font-serif text-2xl sm:text-4xl font-extrabold text-white glow-text-pink mb-3">
                      Ready for a magical surprise? 💖
                    </h3>

                    <p className="text-pink-100/90 text-xs sm:text-base max-w-md italic font-light mb-8 px-2">
                      Step inside the Hidden Leaf Village for a fairytale wedding celebration under the golden sunset sakura trees.
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(255,105,180,0.9)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleStartWatch}
                      className="px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 text-white font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-[0_0_25px_rgba(255,105,180,0.7)] border border-pink-200/60 flex items-center gap-3 transition-all min-h-[48px] cursor-pointer"
                    >
                      <Sparkles className="w-5 h-5 text-amber-200" />
                      <span>Watch the Wedding Surprise 🍥</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Custom Player Controls Bar (Visible during playback) */}
            {hasStarted && (
              <div
                className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col gap-2 opacity-95 group-hover:opacity-100 transition-opacity z-20"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Progress Bar (Clickable/Seekable) */}
                <div
                  onClick={handleSeek}
                  className="w-full h-2 bg-white/20 hover:h-2.5 rounded-full overflow-hidden cursor-pointer transition-all relative"
                >
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 via-rose-400 to-amber-400 shadow-[0_0_8px_#FF69B4]"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-white text-xs pt-1">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleTogglePlay}
                      className="p-1.5 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
                    </button>
                    <button
                      onClick={handleToggleMute}
                      className="p-1.5 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <VolumeX className="w-5 h-5 text-pink-300" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <span className="text-[11px] text-pink-200/90 font-mono">
                      {currentTimeText} / {durationText}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleReplayVideo}
                      className="p-1.5 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
                      title="Replay Video"
                    >
                      <RotateCcw className="w-4 h-4 text-pink-200" />
                    </button>
                    <button
                      onClick={handleFullscreen}
                      className="p-1.5 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
                      title="Fullscreen"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* After Video Ends Celebration Banner */}
          <AnimatePresence>
            {hasEnded && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-6 p-6 rounded-2xl bg-black/60 border border-pink-400/40 text-center relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-amber-300 to-rose-500" />
                <div className="inline-flex p-2.5 rounded-full bg-pink-500/20 text-pink-300 mb-2">
                  <Heart className="w-5 h-5 fill-pink-400 text-pink-400 animate-pulse" />
                </div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-white glow-text-pink mb-2">
                  Some moments are just too magical to forget. 💍✨
                </h4>
                <p className="text-xs sm:text-sm text-pink-100/80 italic mb-4">
                  May your days always be filled with friendship, laughter, and beautiful fairytales! 🌸
                </p>
                <button
                  onClick={handleReplayVideo}
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay Video ✨</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
