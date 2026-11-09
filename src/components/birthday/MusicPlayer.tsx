"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Sparkles, Flame } from "lucide-react";
import { audioController } from "@/utils/audio";
import { birthdayConfig } from "@/config/birthdayConfig";

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
      audioController.playChakraSurgeSound();
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
            className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-orange-500/40 text-xs text-orange-200 shadow-[0_0_20px_rgba(255,140,0,0.3)]"
          >
            <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
            <span className="font-semibold tracking-wide truncate max-w-[150px]">
              {birthdayConfig.music.trackTitle}
            </span>
            {/* Visualizer bars */}
            <div className="flex items-end gap-[2px] h-3 ml-1">
              {[0.5, 0.9, 0.7, 1, 0.6].map((scale, i) => (
                <motion.span
                  key={i}
                  className="w-[2px] bg-orange-400 rounded-full"
                  animate={{
                    height: isPlaying ? ["3px", "14px", "5px", "15px", "3px"] : "3px",
                  }}
                  transition={{
                    duration: 0.7 + i * 0.12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.08,
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
              ? "bg-gradient-to-r from-orange-600/50 to-red-600/50 border-orange-400/80 shadow-[0_0_20px_rgba(255,127,0,0.5)] text-orange-200"
              : "bg-black/70 border-orange-500/30 text-orange-300 hover:border-orange-400/60"
          }`}
          aria-label={isPlaying ? "Mute soundtrack" : "Play Shinobi soundtrack"}
        >
          {isPlaying ? (
            <div className="relative">
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-orange-300" />
              <motion.span
                className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_#FF7F00]"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center relative">
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-orange-300/80" />
            </div>
          )}
        </motion.button>

        {/* Hover Tooltip on desktop */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="hidden sm:block absolute top-full mt-2 right-0 whitespace-nowrap px-3 py-1 bg-black/90 backdrop-blur-md rounded-lg text-xs text-orange-200 border border-orange-500/30 shadow-lg pointer-events-none"
            >
              {isPlaying ? "Pause music 🎵" : "Play Naruto theme music 🎶"}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

