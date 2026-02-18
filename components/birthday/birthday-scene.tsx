"use client"

import { useState, useEffect, useCallback } from "react"
import { Sparkles } from "./sparkles"
import { FallingCake } from "./falling-cake"
import { FloatingSunflowers } from "./floating-sunflowers"
import { ConfettiBurst } from "./confetti-burst"
import { GiftButton } from "./gift-button"
import { AnimatedTitle } from "./animated-text"
import { GlowRings } from "./glow-rings"
import { CountdownTimer } from "./countdown-timer"
import { SecretCodeModal } from "./secret-code-modal"

type Phase = "intro" | "reveal" | "ready"

export function BirthdayScene({ onOpen }: { onOpen: () => void }) {
  const [phase, setPhase] = useState<Phase>("intro")
  const [showTitle, setShowTitle] = useState(false)
  const [showCake, setShowCake] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [showSunflowers, setShowSunflowers] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isLocked, setIsLocked] = useState(true)
  const [bypassCount, setBypassCount] = useState(0)
  const [shakeLocked, setShakeLocked] = useState(false)
  const [showSecretModal, setShowSecretModal] = useState(false)

  // Check lock status on mount
  useEffect(() => {
    const now = new Date()
    // Target: Feb 19, 2026, 17:00 Bolivia Time (UTC-4)
    const target = new Date("2026-02-19T17:00:00-04:00")
    
    if (now >= target) {
      setIsLocked(false)
    }
  }, [])

  // Intro sequence
  useEffect(() => {
    const timers: NodeJS.Timeout[] = []

    // Show title after a small delay
    timers.push(setTimeout(() => setShowTitle(true), 800))

    // Show cake falling
    timers.push(setTimeout(() => setShowCake(true), 1800))

    // Show sunflowers
    timers.push(setTimeout(() => setShowSunflowers(true), 2500))

    // Show confetti burst
    timers.push(setTimeout(() => setShowConfetti(true), 3000))

    // Show the gift button
    timers.push(setTimeout(() => {
      setShowButton(true)
      setPhase("reveal")
    }, 3800))

    return () => timers.forEach(clearTimeout)
  }, [])

  const handleTitleClick = () => {
    if (!isLocked) return // Already unlocked

    setBypassCount((prev) => {
      const newCount = prev + 1
      if (newCount === 7) {
        setShowSecretModal(true)
        return 0 // Reset count
      }
      return newCount
    })
  }

  const handleUnlock = () => {
    setIsLocked(false)
    setShowSecretModal(false)
    // Unlock celebration
    setShowConfetti(false)
    setTimeout(() => setShowConfetti(true), 100)
  }

  const handleOpenGift = useCallback(() => {
    if (isLocked) {
      setShakeLocked(true)
      setTimeout(() => setShakeLocked(false), 500)
      return
    }

    setPhase("ready")
    // Trigger another confetti burst
    setShowConfetti(false)
    setTimeout(() => setShowConfetti(true), 100)
    
    // Call onOpen after a delay to allow the "Preparando tu sorpresa..." animation to play
    setTimeout(() => {
        onOpen();
    }, 2000); // 2 seconds delay
  }, [onOpen, isLocked])

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden" style={{ background: "#000000" }}>
      {/* Secret Code Modal */}
      {showSecretModal && (
        <SecretCodeModal 
          onUnlock={handleUnlock} 
          onCancel={() => setShowSecretModal(false)} 
        />
      )}

      {/* Content wrapper with blur transition */}
      <div 
        className={`fixed inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
          phase === "ready" ? "opacity-0 blur-2xl scale-110 pointer-events-none" : "opacity-100 blur-0 scale-100"
        }`}
      >
        {/* Background effects */}
        <GlowRings />
        <Sparkles />

        {/* Floating sunflowers */}
        <FloatingSunflowers show={showSunflowers} />

        {/* Confetti */}
        <ConfettiBurst show={showConfetti} />

        {/* Main content container */}
        <div className="relative z-20 flex flex-col items-center gap-8 px-4 md:gap-12 w-full h-full justify-center">
          {/* Falling cake */}
          <div className="relative h-48 w-40 md:h-56 md:w-48">
            <FallingCake show={showCake} />
          </div>

          {/* Animated title */}
          <AnimatedTitle show={showTitle} onClick={handleTitleClick} />

          <div className={`flex flex-col items-center gap-4 transition-all duration-300 ${shakeLocked ? "animate-shake-horizontal" : ""}`}>
             {/* Timer - only if locked and button is shown */}
             {showButton && isLocked && (
               <div className="z-30">
                 <CountdownTimer 
                   targetDate={new Date("2026-02-19T17:00:00-04:00")} 
                   onComplete={() => setIsLocked(false)} 
                 />
                 <p className="text-[#a08cb8] text-center text-sm md:text-base font-serif italic mb-2">
                   La magia comienza en...
                 </p>
               </div>
             )}

            {/* Gift/Surprise button */}
            <div className={`transition-all duration-500 ${isLocked ? "grayscale opacity-80" : "grayscale-0 opacity-100"}`}>
               <GiftButton onClick={handleOpenGift} show={showButton} />
            </div>
          </div>

          {/* Subtle hint text */}
          {showButton && !isLocked && (
            <p
              className="mt-2 text-sm tracking-wide md:text-base"
              style={{
                color: "#a08cb8",
                animation: "hint-fade 2s ease-in-out infinite alternate",
                fontFamily: "var(--font-playfair), serif",
              }}
            >
              {"Toca para descubrir tu sorpresa..."}
            </p>
          )}
        </div>
      </div>

      {/* Transition overlay when gift is opened */}
      {phase === "ready" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            animation: "overlay-appear 1.5s ease-in-out forwards",
            background: "radial-gradient(circle, rgba(196, 160, 232, 0.15) 0%, rgba(0,0,0,0.95) 70%)",
          }}
        >
          <div style={{
            animation: "surprise-text 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s forwards",
            opacity: 0,
          }}>
            <p className="text-center text-4xl font-bold md:text-6xl" style={{
              fontFamily: "var(--font-dancing), cursive",
              color: "#e8d0f8",
              textShadow: "0 0 40px rgba(196, 160, 232, 0.6), 0 0 80px rgba(196, 160, 232, 0.3)",
            }}>
              {"Preparando tu sorpresa..."}
            </p>
            <div className="mx-auto mt-8 flex justify-center gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-3 w-3 rounded-full"
                  style={{
                    background: "#c4a0e8",
                    boxShadow: "0 0 10px #c4a0e8",
                    animation: `dot-bounce 1.4s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes hint-fade {
          0% { opacity: 0.4; }
          100% { opacity: 0.8; }
        }
        @keyframes overlay-appear {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes surprise-text {
          0% { opacity: 0; transform: scale(0.5); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-12px); }
        }
        @keyframes shake-horizontal {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-10px); }
          80% { transform: translateX(10px); }
        }
        .animate-shake-horizontal {
          animation: shake-horizontal 0.4s ease-in-out;
        }
      `}</style>
    </main>
  )
}
