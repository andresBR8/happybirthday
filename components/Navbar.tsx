"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex items-center justify-between bg-gradient-to-b from-black/90 to-transparent pointer-events-none"
    >
      <div className=" pointer-events-auto flex items-center justify-between w-full">
      {/* Left: Branding */}
      <div className="text-white font-medium tracking-tight">
        <span className="font-bold">NURIA</span>
        <span className="mx-2 text-white/50">|</span>
        <span className="text-white/70">FELICIDADES</span>
      </div>

      {/* Center: Links (Hidden on mobile for simplicity, or hamburger) */}
      <div className="hidden md:flex items-center space-x-8">
        {["Origins", "Journey", "Epic Moments", "Wishes"].map((item) => (
          <Link
            key={item}
            href="#"
            className="text-sm text-white/70 hover:text-white transition-colors uppercase tracking-wider"
          >
            {item}
          </Link>
        ))}
      </div>

      {/* Right: CTA */}
      <div>
        <button 
          onClick={() => {
            // @ts-ignore
            import('canvas-confetti').then((confetti) => {
              confetti.default({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.3 } // Confetti from top-ish
              });
            });
          }}
          className="bg-white/10 hover:bg-white hover:text-black text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border border-white/20 backdrop-blur-sm"
        >
          Send Gift
        </button>
      </div>
      </div>
    </motion.nav>
  );
}
