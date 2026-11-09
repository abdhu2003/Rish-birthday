"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Heart, X, ChevronLeft, ChevronRight, Calendar, MapPin, Maximize2 } from "lucide-react";
import { birthdayConfig, MemoryPhoto } from "@/birthdayConfig";
import { fireHeartExplosion } from "@/utils/confetti";
import { audioController } from "@/utils/audio";

export default function MemoriesSection() {
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [likes, setLikes] = useState<{ [id: string]: number }>({});

  const openLightbox = (photo: MemoryPhoto, index: number) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
    audioController.playSparkleSound();
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % birthdayConfig.memories.photos.length;
    setCurrentIndex(nextIdx);
    setSelectedPhoto(birthdayConfig.memories.photos[nextIdx]);
  };

  const handlePrev = () => {
    const prevIdx =
      (currentIndex - 1 + birthdayConfig.memories.photos.length) % birthdayConfig.memories.photos.length;
    setCurrentIndex(prevIdx);
    setSelectedPhoto(birthdayConfig.memories.photos[prevIdx]);
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    fireHeartExplosion(0.5, 0.5);
    audioController.playHeartbeatSound();
  };

  return (
    <section id="memories" className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-2 w-64 sm:w-96 h-64 sm:h-96 bg-purple-600/15 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-2 w-64 sm:w-96 h-64 sm:h-96 bg-pink-500/15 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-300 text-xs sm:text-sm font-medium mb-3 sm:mb-4"
          >
            <Camera className="w-3.5 h-3.5 text-pink-400" />
            <span>Cherished Moments</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight glow-text-pink mb-2 sm:mb-4 px-2"
          >
            {birthdayConfig.memories.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-pink-200/80 text-xs sm:text-base max-w-xl mx-auto italic font-light mb-2 px-3"
          >
            {birthdayConfig.memories.subheading}
          </motion.p>

          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-[11px] sm:text-xs text-pink-300/60 uppercase tracking-widest font-medium"
          >
            {birthdayConfig.memories.instructionNote}
          </motion.span>
        </div>

        {/* Bento / Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {birthdayConfig.memories.photos.map((photo, index) => {
            const photoLikes = likes[photo.id] || 0;
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                onClick={() => openLightbox(photo, index)}
                className="group relative cursor-pointer rounded-2xl sm:rounded-3xl overflow-hidden glass-card border border-pink-400/25 p-3 sm:p-3.5 shadow-xl hover:shadow-[0_0_35px_rgba(255,105,180,0.35)] transition-all duration-400"
              >
                {/* Photo Image Container */}
                <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-purple-950/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Expand icon pill */}
                  <div className="absolute top-2.5 right-2.5 p-1.5 sm:p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/80 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>

                  {/* Like button overlay */}
                  <button
                    onClick={(e) => handleLike(photo.id, e)}
                    className="absolute top-2.5 left-2.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-pink-400/30 text-white flex items-center gap-1 text-xs font-medium active:scale-95 transition-transform"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        photoLikes > 0 ? "fill-pink-400 text-pink-400" : "text-white"
                      }`}
                    />
                    <span>{photoLikes > 0 ? photoLikes : "Love"}</span>
                  </button>

                  {/* Date badge */}
                  {photo.date && (
                    <div className="absolute bottom-2.5 left-2.5 text-[11px] sm:text-xs text-pink-200/90 font-medium flex items-center gap-1 bg-purple-950/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-pink-400/20">
                      <Calendar className="w-3 h-3 text-pink-400" />
                      <span>{photo.date}</span>
                    </div>
                  )}
                </div>

                {/* Photo Description Box */}
                <div className="p-2.5 sm:p-3 pt-3 sm:pt-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-serif text-base sm:text-lg font-semibold text-pink-100 group-hover:text-pink-300 transition-colors truncate">
                      {photo.title}
                    </h3>
                    {photo.location && (
                      <span className="text-[11px] sm:text-xs text-pink-300/60 flex items-center gap-1 shrink-0 ml-2">
                        <MapPin className="w-3 h-3 text-pink-400" />
                        <span className="truncate max-w-[100px]">{photo.location}</span>
                      </span>
                    )}
                  </div>
                  <p className="text-pink-200/70 text-xs sm:text-sm line-clamp-2 italic font-light">
                    &ldquo;{photo.caption}&rdquo;
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Interactive Lightbox Modal - Mobile Optimized */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/92 backdrop-blur-xl"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-3 right-3 sm:top-5 sm:right-5 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all z-30 min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label="Close photo"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-2 sm:left-6 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/20 transition-all z-30 min-w-[38px] min-h-[38px] flex items-center justify-center"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-2 sm:right-6 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/20 transition-all z-30 min-w-[38px] min-h-[38px] flex items-center justify-center"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Main Modal Card */}
            <motion.div
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-3xl w-full max-h-[90vh] rounded-2xl sm:rounded-3xl overflow-hidden glass-panel border border-pink-400/30 flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-1 min-h-[260px] sm:min-h-[440px] bg-black/60 overflow-hidden flex items-center justify-center p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="max-h-[50vh] sm:max-h-[65vh] w-auto max-w-full object-contain rounded-lg"
                />
              </div>

              {/* Caption Footer */}
              <div className="p-4 sm:p-6 bg-[#16072b]/95 border-t border-pink-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-serif text-lg sm:text-2xl font-bold text-pink-100 truncate">
                      {selectedPhoto.title}
                    </h3>
                    {selectedPhoto.date && (
                      <span className="text-[11px] sm:text-xs text-pink-300 bg-pink-500/20 px-2 py-0.5 rounded-full border border-pink-400/30 shrink-0">
                        {selectedPhoto.date}
                      </span>
                    )}
                  </div>
                  <p className="text-pink-200/80 text-xs sm:text-base italic line-clamp-3">
                    &ldquo;{selectedPhoto.caption}&rdquo;
                  </p>
                </div>

                <button
                  onClick={(e) => handleLike(selectedPhoto.id, e)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all min-h-[40px] shrink-0"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Send Love {likes[selectedPhoto.id] ? `(${likes[selectedPhoto.id]})` : "💖"}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
