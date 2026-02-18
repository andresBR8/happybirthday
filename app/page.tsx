"use client";

import ScrollSequence from "@/components/ScrollSequence";
import OverlayContent from "@/components/OverlayContent";
import AudioPlayer from "@/components/AudioPlayer";
import { BirthdayScene } from "@/components/birthday/birthday-scene";
import { GallerySection } from "@/components/gallery/gallery-section";
import { ProposalSection } from "@/components/proposal/proposal-section";
import { SongProgress } from "@/components/SongProgress";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Use a ref to track unlocked state for the animation loop
  const isUnlockedRef = useRef(isUnlocked);

  // Sync ref with state
  useEffect(() => {
    isUnlockedRef.current = isUnlocked;
  }, [isUnlocked]);

  useEffect(() => {
    if (isStarted) {
        // Auto-scroll logic
        const scrollSpeed = 0.5; // Tunable speed
        // const scrollSpeed = 1.0; // Faster
        let animationFrameId: number;

        const autoScroll = () => {
             // Stop if unlocked (song ended)
            if (isUnlockedRef.current) {
                return;
            }

            window.scrollBy(0, 6); // Increased speed further as requested
            
            // Check if we reached the bottom
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                 // Stop or loop? For now stop.
                 return;
            }
            
            animationFrameId = requestAnimationFrame(autoScroll);
        };

        // Start playing audio
        if (!audioRef.current) {
             audioRef.current = new Audio("/cancion/birthday_song.mp3");
             audioRef.current.loop = false;
             audioRef.current.onended = () => {
                 setIsUnlocked(true);
             };
        }
        audioRef.current.play().catch(e => console.log("Audio play failed", e));

        animationFrameId = requestAnimationFrame(autoScroll);

        return () => cancelAnimationFrame(animationFrameId);
    }
  }, [isStarted]);

  // Disable manual scroll interactions but allow programmatic scroll
  useEffect(() => {
      if (isStarted && !isUnlocked) {
          // Hide scrollbar
          document.body.classList.add("no-scrollbar");
          
          // Block user inputs that cause scrolling
          const preventDefault = (e: Event) => e.preventDefault();
          const preventKeys = (e: KeyboardEvent) => {
              if (['ArrowUp', 'ArrowDown', 'Space', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.code)) {
                  e.preventDefault();
              }
          };

          window.addEventListener('wheel', preventDefault, { passive: false });
          window.addEventListener('touchmove', preventDefault, { passive: false });
          window.addEventListener('keydown', preventKeys, { passive: false });

          return () => {
              document.body.classList.remove("no-scrollbar");
              window.removeEventListener('wheel', preventDefault);
              window.removeEventListener('touchmove', preventDefault);
              window.removeEventListener('keydown', preventKeys);
          };
      }
  }, [isStarted, isUnlocked]);

  return (
    <main className="relative bg-midnight min-h-screen">
      {!isStarted && <BirthdayScene onOpen={() => setIsStarted(true)} />}
      
      {/* Hidden legacy player logic if we want manual toggle later, but for now completely automated */}
      {/* <AudioPlayer /> */} 
      
      {/* We render content but it might be hidden behind intro initially */}
      <div className={isStarted ? "opacity-100 transition-opacity duration-1000" : "opacity-0"}>
          <ScrollSequence />
          <OverlayContent />
          <GallerySection />
          <ProposalSection audioRef={audioRef} />
      </div>
      <SongProgress audioRef={audioRef} isStarted={isStarted} />
    </main>
  );
}
