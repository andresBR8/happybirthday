"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SongProgressProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isStarted: boolean;
}

export function SongProgress({ audioRef, isStarted }: SongProgressProps) {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!isStarted) return;

    let audio: HTMLAudioElement | null = null;
    let intervalId: NodeJS.Timeout;

    const init = () => {
        if (audioRef.current) {
            audio = audioRef.current;
            audio.addEventListener("timeupdate", updateProgress);
            if (intervalId) clearInterval(intervalId);
        }
    };

    const updateProgress = () => {
      if (audio && audio.duration) {
        const currentProgress = (audio.currentTime / audio.duration) * 100;
        setProgress(currentProgress);
        setTimeLeft(Math.ceil(audio.duration - audio.currentTime));
      }
    };

    // Try to init immediately
    init();

    // If not ready, poll until it is
    if (!audio) {
        intervalId = setInterval(init, 500);
    }

    return () => {
        if (intervalId) clearInterval(intervalId);
        if (audio) audio.removeEventListener("timeupdate", updateProgress);
    };
  }, [isStarted, audioRef]);

  if (!isStarted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-4 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
    >
      <div className="relative w-8 h-8 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="16"
            cy="16"
            r="14"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            className="text-white/20"
          />
          <circle
            cx="16"
            cy="16"
            r="14"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={88}
            strokeDashoffset={88 - (88 * progress) / 100}
            className="text-champagne transition-all duration-300 ease-linear"
          />
        </svg>
        <span className="absolute text-[10px] font-mono text-white font-bold">
            {timeLeft > 0 ? timeLeft : "✓"}
        </span>
      </div>
      <div className="flex flex-col">
          <span className="text-xs text-white/80 font-medium tracking-wide uppercase">Canción</span>
          <span className="text-[10px] text-white/50">Tiempo restante</span>
      </div>
    </motion.div>
  );
}
