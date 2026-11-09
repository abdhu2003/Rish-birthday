"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Sparkles } from "lucide-react";
import { audioController } from "@/utils/audio";
import { birthdayConfig } from "@/birthdayConfig";

interface MusicPlayerProps {
  hasStartedInteraction?: boolean;
}

export default function MusicPlayer({ hasStartedInteraction }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleToggle = () => {
    const nextState = audioController.toggleMusic(
      birthdayConfig.music.audioSrc,
      birthdayConfig.music.useProceduralLullabyFallback
    );
    setIsPlaying(nextState);
    if (nextState) {
      audioController.playSparkleSound();
    }
  };

  return (
    <div className="fixed top-3 right-3 sm:top-5 sm:right-5 z-50 flex items-center gap-2 sm:gap-3">
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-950/70 backdrop-blur-md border border-pink-400/30 text-xs text-pink-200 shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin-slow" />
            <span className="font-medium tracking-wide truncate max-w-[130px]">
              {birthdayConfig.music.trackTitle}
            </span>
            {/* Visualizer bars */}
            <div className="flex items-end gap-[2px] h-3 ml-1">
              {[0.4, 0.9, 0.6, 1, 0.5].map((scale, i) => (
                <motion.span
                  key={i}
                  className="w-[2px] bg-pink-400 rounded-full"
                  animate={{
                    height: isPlaying ? ["3px", "12px", "4px", "14px", "3px"] : "3px",
                  }}
                  transition={{
                    duration: 0.8 + i * 0.15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <motion.button
          onClick={handleToggle}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className={`relative p-2.5 sm:p-3 rounded-full backdrop-blur-lg border transition-all duration-300 shadow-xl ${
            isPlaying
              ? "bg-gradient-to-r from-pink-500/30 to-purple-500/30 border-pink-400/60 shadow-[0_0_20px_rgba(255,105,180,0.45)] text-pink-200"
              : "bg-purple-950/60 border-purple-400/20 text-purple-300 hover:border-pink-400/40"
          }`}
          aria-label={isPlaying ? "Mute music" : "Play music"}
        >
          {isPlaying ? (
            <div className="relative">
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-pink-300" />
              <motion.span
                className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-pink-400"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center relative">
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300/80" />
            </div>
          )}
        </motion.button>

        {/* Tooltip for desktop only */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="hidden sm:block absolute top-full mt-2 right-0 whitespace-nowrap px-3 py-1 bg-black/80 backdrop-blur-md rounded-lg text-xs text-pink-200 border border-pink-500/20 shadow-lg pointer-events-none"
            >
              {isPlaying ? "Pause music 🎵" : "Play birthday melody 🎶"}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
