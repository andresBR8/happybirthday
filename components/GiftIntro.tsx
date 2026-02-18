"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface GiftIntroProps {
  onOpen: () => void;
}

export default function GiftIntro({ onOpen }: GiftIntroProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
        onOpen();
    }, 1000); // Wait for exit animation
  };

  if (isOpen) {
      return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[100] bg-black pointer-events-none"
        />
      );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      <div className="text-center cursor-pointer group" onClick={handleOpen}>
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
            {/* Gift Icon / Box Representation */}
            <div className="text-9xl mb-8 group-hover:rotate-6 transition-transform duration-500">
                🎁
            </div>
        </motion.div>
        
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-white text-3xl md:text-5xl font-bold tracking-widest font-serif uppercase mb-4"
        >
            Para Nuria
        </motion.h1>
        
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-white/60 text-sm md:text-base tracking-widest uppercase"
        >
            Tap to Open
        </motion.p>
      </div>
    </div>
  );
}
