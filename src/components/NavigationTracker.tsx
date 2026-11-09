"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Mail, Image as ImageIcon, Cake, Gift, Sparkles, Home } from "lucide-react";

const sections = [
  { id: "hero", label: "Home", icon: Home },
  { id: "letter", label: "Letter", icon: Mail },
  { id: "memories", label: "Memories", icon: ImageIcon },
  { id: "heart", label: "Special", icon: Heart },
  { id: "cake", label: "Cake", icon: Cake },
  { id: "gift", label: "Surprise", icon: Gift },
  { id: "finale", label: "Finale", icon: Sparkles },
];

export default function NavigationTracker() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-40 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full glass-panel-pink border border-pink-400/30 shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl flex items-center gap-1 sm:gap-2 max-w-[96vw] overflow-x-auto no-scrollbar"
      aria-label="Experience navigation"
    >
      {sections.map(({ id, label, icon: Icon }) => {
        const isActive = activeSection === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={`relative flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 min-h-[36px] sm:min-h-[38px] ${
              isActive
                ? "text-white font-semibold"
                : "text-pink-200/70 hover:text-pink-100 active:bg-pink-500/10"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activePill"
                className="absolute inset-0 bg-gradient-to-r from-pink-500/80 via-rose-500/80 to-purple-600/80 rounded-full shadow-[0_0_15px_rgba(255,105,180,0.6)]"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <Icon
              className={`relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                isActive ? "text-yellow-200 scale-110" : ""
              } transition-transform`}
            />
            <span className="relative z-10 text-[11px] sm:text-xs whitespace-nowrap">{label}</span>
          </button>
        );
      })}
    </motion.nav>
  );
}
