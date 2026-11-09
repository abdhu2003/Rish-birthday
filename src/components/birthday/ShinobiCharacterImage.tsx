"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface ShinobiCharacterImageProps {
  name: string;
  src: string;
  alt: string;
  clan?: string;
  chakraColor?: string; // hex or rgba for glow
  badge?: string;
  className?: string;
  aspect?: string;
  priority?: boolean;
  onImageClick?: () => void;
}

export default function ShinobiCharacterImage({
  name,
  src,
  alt,
  clan,
  chakraColor = "#FF7F00",
  badge,
  className = "",
  aspect = "aspect-[3/4]",
  priority = false,
  onImageClick,
}: ShinobiCharacterImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ duration: 0.3 }}
      onClick={onImageClick}
      className={`group relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#1c0a22]/90 to-[#0e0414] border border-orange-500/30 p-2 shadow-xl hover:shadow-[0_0_25px_rgba(255,140,0,0.4)] ${className}`}
    >
      {/* Outer Glow Halo */}
      <div
        className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-35 blur-xl transition-opacity pointer-events-none"
        style={{ backgroundColor: chakraColor }}
      />

      <div className={`relative w-full ${aspect} rounded-xl overflow-hidden bg-black/60 flex items-center justify-center`}>
        {/* Next.js Image component */}
        {!hasError ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-b from-orange-950/40 to-black">
            <span className="text-3xl mb-2">🍥</span>
            <span className="text-xs font-bold text-orange-200">{name}</span>
            <span className="text-[10px] text-pink-300/80">{clan || "Shinobi"}</span>
          </div>
        )}

        {/* Gradient shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

        {/* Badge */}
        {badge && (
          <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-orange-400/40 text-[10px] font-bold text-amber-200 flex items-center gap-1 shadow-md">
            <Sparkles className="w-2.5 h-2.5 text-amber-300" />
            <span>{badge}</span>
          </div>
        )}

        {/* Name and Clan Tag */}
        <div className="absolute bottom-2 left-2 right-2">
          {clan && (
            <span className="text-[10px] uppercase tracking-wider text-orange-400 font-bold block mb-0.5">
              {clan}
            </span>
          )}
          <h4 className="font-serif text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors truncate">
            {name}
          </h4>
        </div>
      </div>
    </motion.div>
  );
}

