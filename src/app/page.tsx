"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import AnimeLoadingScreen from "@/components/birthday/AnimeLoadingScreen";
import SakuraParticles from "@/components/birthday/SakuraParticles";
import AnimeTransitions, { TransitionType } from "@/components/birthday/AnimeTransitions";
import MusicPlayer from "@/components/birthday/MusicPlayer";
import JutsuSelector from "@/components/birthday/JutsuSelector";
import AnimeHero from "@/components/birthday/AnimeHero";
import CharacterGallery from "@/components/birthday/CharacterGallery";
import BirthdayLetter from "@/components/birthday/BirthdayLetter";
import AnimeWeddingVideoSection from "@/components/birthday/AnimeWeddingVideoSection";
import BirthdayCake from "@/components/birthday/BirthdayCake";
import SecretGiftBox from "@/components/birthday/SecretGiftBox";
import BirthdayFinale from "@/components/birthday/BirthdayFinale";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [activeTransition, setActiveTransition] = useState<TransitionType>(null);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setHasInteracted(true);
    // Play an entry Rasengan or Sakura storm transition
    setActiveTransition("sakura");
  };

  const handleTriggerJutsu = (type: TransitionType) => {
    setActiveTransition(type);
  };

  const handleRestart = () => {
    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen bg-shinobi-gradient text-orange-50 selection:bg-orange-500 selection:text-white overflow-hidden">
      {/* 1. Naruto Anime Intro Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && <AnimeLoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* 2. Falling Sakura Petals & Glowing Chakra Atmosphere */}
      <SakuraParticles />

      {/* 3. Cinematic Anime Transitions (Sharingan, Chakra, Sakura, Scroll, Rasengan) */}
      <AnimeTransitions
        activeTransition={activeTransition}
        onTransitionEnd={() => setActiveTransition(null)}
      />

      {/* 4. Anime Music Player & Jutsu Trigger Bar */}
      <MusicPlayer hasStartedInteraction={hasInteracted} />
      <JutsuSelector onTriggerJutsu={handleTriggerJutsu} />

      {/* 5. Naruto Shippuden Birthday Experience Sections */}
      <div className="relative z-20 flex flex-col space-y-12 sm:space-y-20 pb-20">
        {/* 2. Hero Section */}
        <AnimeHero onEnter={(type) => setActiveTransition(type)} />

        {/* 3. Anime Character Interactive Gallery */}
        <CharacterGallery />

        {/* 4. Naruto Anime Birthday Letter */}
        <BirthdayLetter />

        {/* 5. Special Shinobi Wedding Surprise Video Section */}
        <AnimeWeddingVideoSection />

        {/* 6. Anime Birthday Cake Surprise */}
        <BirthdayCake />

        {/* 8. Secret Anime Gift Box */}
        <SecretGiftBox />

        {/* 9. Final Naruto-Inspired Birthday Finale */}
        <BirthdayFinale onRestart={handleRestart} />
      </div>
    </main>
  );
}
