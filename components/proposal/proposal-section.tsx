"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { useInView } from "framer-motion"
import Image from "next/image"
import { Heart, Music, Sparkles, Star, Moon } from "lucide-react"
import { FloatingHearts } from "./floating-hearts"

type Phase = "intro" | "lyrics" | "question" | "climax" | "yes" | "no-escape"

interface ProposalSectionProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export function ProposalSection({ audioRef }: ProposalSectionProps) {
  const [phase, setPhase] = useState<Phase>("intro")
  const [lyricIndex, setLyricIndex] = useState(0)
  const [showCharacters, setShowCharacters] = useState(false)
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 })
  const [noAttempts, setNoAttempts] = useState(0)
  const [accepted, setAccepted] = useState(false)
  const [shakeNo, setShakeNo] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  // Timestamps for synchronization (in seconds)
  // 0:23 -> Lyric 0
  // 0:29 -> Lyric 1
  // 0:36 -> Lyric 2
  // 0:44 -> Question Part 1 ("Puedo ser tu estrella...")
  // 0:53 -> Question Part 2 / Climax ("Yo puedo ser tu estrella...")

  const lyrics = [
    "Si estamos los dos en un mismo cuarto, el cielo no se ve tan alto",
    "Aqui esta mi corazon dentro de un frasco, sin ti que soy yo un disfraz barato",
    "Contigo soy yo, tu el motor del barco, si te tiras de un barranco, detras tuyo salto",
  ]

  const noMessages = [
    "No",
    "Segura?",
    "Piensalo bien...",
    "La estrella se pone triste",
    "Dale, di que si",
    "Ultima oportunidad",
  ]
  
  useEffect(() => {
    if (!isInView || !audioRef.current || phase === "yes" || phase === "no-escape") return;

    let animationFrameId: number;

    const checkTime = () => {
      const currentTime = audioRef.current?.currentTime || 0;

      if (currentTime >= 53) {
         if (phase !== "climax" && phase !== "no-escape" && phase !== "yes") {
             setPhase("climax");
         }
      } else if (currentTime >= 44) {
         if (phase !== "question" && phase !== "climax" && phase !== "no-escape" && phase !== "yes") {
             setPhase("question");
             setShowCharacters(true);
         }
      } else if (currentTime >= 36) {
         if (phase !== "lyrics") setPhase("lyrics");
         setLyricIndex(2);
      } else if (currentTime >= 29) {
         if (phase !== "lyrics") setPhase("lyrics");
         setLyricIndex(1);
      } else if (currentTime >= 23) {
         if (phase !== "lyrics") setPhase("lyrics");
         setLyricIndex(0);
      } else {
         // Before 23s, stay in intro
         if (phase !== "intro") setPhase("intro");
      }

      animationFrameId = requestAnimationFrame(checkTime);
    };

    animationFrameId = requestAnimationFrame(checkTime);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, audioRef, phase]);

  const handleNoHover = useCallback(() => {
    if (noAttempts >= 3) return
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const maxX = rect.width - 160
    const maxY = rect.height - 60
    setNoButtonPos({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    })
  }, [noAttempts])

  const handleNoClick = useCallback(() => {
    setShakeNo(true)
    setNoAttempts((prev) => {
      const next = prev + 1
      if (next >= noMessages.length) {
        setPhase("no-escape")
        setTimeout(() => {
          setPhase("question")
          setNoButtonPos({ x: 0, y: 0 })
        }, 2000)
        return 0
      }
      return next
    })
    setTimeout(() => setShakeNo(false), 500)
  }, [noMessages.length])

  const handleYes = useCallback(() => {
    setAccepted(true)
    setPhase("yes")
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-12"
    >
      <FloatingHearts active={accepted} />

      {/* Ambient glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-40 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--star-orange), transparent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-40 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--moon-blue), transparent)" }}
        aria-hidden="true"
      />

      {/* ─── INTRO PHASE ─── */}
      {phase === "intro" && (
        <div className="relative z-10 flex flex-col items-center gap-8 animate-slide-up">
          <div className="flex items-center gap-3">
            <Music className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-muted-foreground text-sm font-sans tracking-widest uppercase">
              Mora - Media Luna
            </span>
            <Music className="w-6 h-6 text-primary animate-pulse" />
          </div>

          <h1 className="text-4xl md:text-6xl font-sans font-bold text-foreground text-center text-balance leading-tight">
            {""}{" "}
            <span className="text-primary"></span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl text-center max-w-md font-sans">
            
          </p>

          {/* Preview characters small */}
          <div className="flex items-end gap-16 mt-8 opacity-60">
            <Image
              src="/images/characters/star-char.png"
              alt="Personaje estrella con gorra y tenis Jordan"
              width={96}
              height={96}
              className="w-20 h-20 md:w-24 md:h-24 object-contain animate-float-star"
            />
            <Image
              src="/images/characters/moon-char.png"
              alt="Personaje media luna con lentes de corazon"
              width={96}
              height={96}
              className="w-20 h-20 md:w-24 md:h-24 object-contain animate-float-moon"
            />
          </div>
        </div>
      )}

      {/* ─── LYRICS PHASE ─── */}
      {phase === "lyrics" && (
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="flex items-center gap-2 mb-4">
            <Music className="w-5 h-5 text-primary animate-bounce" />
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-1 bg-primary rounded-full"
                  style={{
                    height: `${Math.random() * 20 + 10}px`,
                    animation: `twinkle ${0.5 + i * 0.15}s ease-in-out infinite alternate`,
                  }}
                />
              ))}
            </div>
            <Music className="w-5 h-5 text-primary animate-bounce" />
          </div>

          <div className="min-h-[120px] flex items-center justify-center">
            {lyricIndex < lyrics.length && (
              <p
                key={lyricIndex}
                className="text-2xl md:text-4xl font-sans font-medium text-foreground text-center text-balance animate-slide-up max-w-lg leading-relaxed"
                style={{ fontStyle: "italic" }}
              >
                {`"${lyrics[lyricIndex]}"`}
              </p>
            )}
            {lyricIndex >= lyrics.length && (
              <div className="flex flex-col items-center gap-4 animate-slide-up">
                <Sparkles className="w-10 h-10 text-primary animate-spin" />
                <p className="text-xl text-muted-foreground font-sans">Y ahora viene lo importante...</p>
              </div>
            )}
          </div>

          {/* Progress dots */}
          <div className="flex gap-3 mt-6">
            {lyrics.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  i <= lyricIndex ? "bg-primary scale-110" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* ─── QUESTION & CLIMAX PHASE ─── */}
      {(phase === "question" || phase === "climax" || phase === "no-escape") && (
        <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-2xl">
          {/* Characters */}
          {showCharacters && (
            <div
              className="flex items-end justify-center animate-move-toward"
              style={{ gap: "8rem" }}
            >
              <div className="flex flex-col items-center gap-2">
                <Star className="w-6 h-6 text-primary animate-twinkle" />
                <img
                  src="/images/characters/star-char.png"
                  alt="Personaje estrella con gorra y tenis Jordan"
                  className="w-32 h-32 md:w-44 md:h-44 object-contain animate-float-star drop-shadow-[0_0_25px_rgba(234,170,50,0.4)]"
                />
                <span className="text-sm text-primary font-sans font-semibold tracking-wider uppercase">
                  La Estrella
                </span>
              </div>

              <Heart className="w-8 h-8 text-primary fill-black animate-pulse self-center mb-16" />

              <div className="flex flex-col items-center gap-2">
                <Moon className="w-6 h-6 text-accent animate-twinkle" />
                <img
                  src="/images/characters/moon-char.png"
                  alt="Personaje media luna con lentes de corazon"
                  className="w-32 h-32 md:w-44 md:h-44 object-contain animate-float-moon drop-shadow-[0_0_25px_rgba(100,100,200,0.4)]"
                />
                <span className="text-sm text-accent font-sans font-semibold tracking-wider uppercase">
                  La Media Luna
                </span>
              </div>
            </div>
          )}

          {/* Question Text */}
          <div className="mt-8 animate-slide-up" style={{ animationDelay: "0.5s", animationFillMode: "both" }}>
             {phase === "question" ? (
                <h2 className="text-3xl md:text-5xl font-sans font-bold text-foreground text-center text-balance leading-tight">
                  {"Puedo ser tu "}
                  <span className="text-primary drop-shadow-[0_0_15px_rgba(234,170,50,0.6)]">estrella</span>
                  <br />
                  {"y tu mi "}
                  <span className="text-accent drop-shadow-[0_0_15px_rgba(107,126,194,0.6)]">media luna</span>
                  {"?"}
                </h2>
             ) : (
                <h2 className="text-3xl md:text-6xl font-sans font-extrabold text-foreground text-center text-balance leading-tight animate-pulse-glow">
                  {"¿Yo puedo ser tu "}
                  <span className="text-primary drop-shadow-[0_0_20px_rgba(234,170,50,1)]">estrella</span>
                  <br />
                  {"y tú mi "}
                  {"media "}
                  <span className="text-accent drop-shadow-[0_0_20px_rgba(107,126,194,1)]">luna</span>
                  {"...?"}
                </h2>
             )}
          </div>

          {phase === "no-escape" && (
            <div className="animate-slide-up">
              <p className="text-lg text-muted-foreground font-sans text-center">
                {"No hay escapatoria... la estrella no acepta un no"}
              </p>
            </div>
          )}

          {/* Buttons - Only show in climax or no-escape */}
          {(phase === "climax" || phase === "no-escape") && (
            <div
              className="relative mt-8 w-full flex flex-col items-center"
              style={{ minHeight: "120px" }}
            >
              <div className="flex gap-6 items-center animate-slide-up" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
                {/* YES button */}
                <button
                  onClick={handleYes}
                  className="group relative px-12 py-5 rounded-full font-sans font-bold text-xl
                             bg-primary text-primary-foreground
                             transition-all duration-300 hover:scale-110 active:scale-95
                             animate-pulse-glow cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Heart className="w-6 h-6 group-hover:fill-primary-foreground transition-all" />
                    {"Si, quiero!"}
                  </span>
                </button>

                {/* NO button - escapes! */}
                <button
                  onMouseEnter={handleNoHover}
                  onTouchStart={handleNoHover}
                  onClick={handleNoClick}
                  className={`px-8 py-4 rounded-full font-sans font-semibold text-lg
                             bg-muted text-muted-foreground border border-border
                             transition-all duration-200 cursor-pointer
                             ${shakeNo ? "animate-shake-no" : ""}
                             ${noAttempts >= 3 ? "" : "hover:opacity-0"}`}
                  style={
                    noButtonPos.x || noButtonPos.y
                      ? {
                          position: "absolute",
                          left: `${noButtonPos.x}px`,
                          top: `${noButtonPos.y}px`,
                          transition: "left 0.3s, top 0.3s",
                          zIndex: 20,
                        }
                      : {}
                  }
                >
                  {noMessages[Math.min(noAttempts, noMessages.length - 1)]}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── YES / ACCEPTED PHASE ─── */}
      {phase === "yes" && (
        <div className="relative z-10 flex flex-col items-center gap-8 animate-slide-up">
          {/* Characters together */}
          <div className="flex items-end justify-center gap-2">
            <Image
              src="/images/characters/star-char.png"
              alt="Personaje estrella con gorra y tenis Jordan"
              width={192}
              height={192}
              className="w-36 h-36 md:w-48 md:h-48 object-contain drop-shadow-[0_0_35px_rgba(234,170,50,0.5)]"
              style={{ animation: "float-star 3s ease-in-out infinite" }}
            />
            <div className="flex flex-col items-center mb-20">
              <Heart className="w-12 h-12 text-primary fill-black animate-pulse" />
            </div>
            <Image
              src="/images/characters/moon-char.png"
              alt="Personaje media luna con lentes de corazon"
              width={192}
              height={192}
              className="w-36 h-36 md:w-48 md:h-48 object-contain drop-shadow-[0_0_35px_rgba(100,100,200,0.5)]"
              style={{ animation: "float-moon 3s ease-in-out infinite" }}
            />
          </div>

          <div className="flex flex-col items-center gap-4">
            <h2 className="text-4xl md:text-6xl font-sans font-bold text-foreground text-center text-balance">
              {" "}
              <span className="text-accent">Feliz cumpleañosss mi niñaaaa</span>
            </h2>

            <p className="text-xl md:text-2xl text-muted-foreground font-sans text-center mt-2" style={{ fontStyle: "italic" }}>
              {'"Espero hayas tenido un hermoso dia.."'}
            </p>

            <div className="flex items-center gap-4 mt-6">
              <Star className="w-8 h-8 text-primary animate-twinkle" />
              <Heart className="w-10 h-10 text-primary fill-black animate-pulse" />
              <Moon className="w-8 h-8 text-accent animate-twinkle" />
            </div>
          </div>

          {/* Sparkle ring */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {Array.from({ length: 12 }).map((_, i) => (
              <Sparkles
                key={i}
                className="absolute w-5 h-5 text-primary animate-twinkle"
                style={{
                  transform: `rotate(${i * 30}deg) translateY(-180px)`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
