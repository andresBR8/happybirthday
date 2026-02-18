"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio("/cancion/birthday_song.mp3");
    audioRef.current.loop = true;
    
    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.error("Playback failed", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      onClick={togglePlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="fixed bottom-6 right-6 z-50 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full text-white hover:bg-white/20 transition-all hover:scale-110"
      aria-label={isPlaying ? "Pause Music" : "Play Music"}
    >
      {isPlaying ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="4" width="4" height="16"></rect>
          <rect x="14" y="4" width="4" height="16"></rect>
        </svg>
      ) : (
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      )}
    </motion.button>
  );
}
