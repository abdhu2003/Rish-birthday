"use client";

import { motion } from "framer-motion";
import { Eye, Flame, Flower2, Scroll, Zap, Home, Users, Mail, Gem, Cake, Gift } from "lucide-react";
import { TransitionType } from "./AnimeTransitions";
import { audioController } from "@/utils/audio";

interface JutsuSelectorProps {
  onTriggerJutsu: (type: TransitionType) => void;
}

const jutsuButtons: { type: TransitionType; label: string; icon: any; color: string }[] = [
  { type: "sharingan", label: "Sharingan", icon: Eye, color: "text-red-400" },
  { type: "rasengan", label: "Rasengan", icon: Zap, color: "text-cyan-400" },
  { type: "chakra", label: "Chakra", icon: Flame, color: "text-orange-400" },
  { type: "sakura", label: "Sakura", icon: Flower2, color: "text-pink-400" },
  { type: "scroll", label: "Scroll", icon: Scroll, color: "text-amber-300" },
];

export default function JutsuSelector({ onTriggerJutsu }: JutsuSelectorProps) {
  const handleJutsuClick = (type: TransitionType) => {
    if (type === "sharingan") {
      audioController.playSharinganSound();
    } else {
      audioController.playChakraSurgeSound();
    }
    onTriggerJutsu(type);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1.5 max-w-[96vw]">
      {/* Jutsu Quick Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="px-2.5 sm:px-4 py-1.5 rounded-full bg-black/85 backdrop-blur-xl border border-orange-500/40 shadow-[0_10px_35px_rgba(0,0,0,0.8)] flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar"
      >
        <span className="hidden md:inline text-[11px] uppercase tracking-wider text-orange-400/80 font-bold px-1.5 border-r border-orange-500/30">
          Jutsu
        </span>

        {jutsuButtons.map(({ type, label, icon: Icon, color }) => (
          <button
            key={type}
            onClick={() => handleJutsuClick(type)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/5 hover:bg-orange-500/20 active:scale-95 transition-all text-orange-100 hover:text-white border border-transparent hover:border-orange-400/40 min-h-[34px]"
            title={`Cast ${label} Jutsu`}
          >
            <Icon className={`w-3.5 h-3.5 ${color}`} />
            <span className="text-[11px] sm:text-xs">{label}</span>
          </button>
        ))}
      </motion.div>
    </div>
  );
}

