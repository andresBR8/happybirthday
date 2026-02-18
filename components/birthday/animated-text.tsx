"use client"

import { useEffect, useState } from "react"

export function AnimatedTitle({ show, onClick }: { show: boolean; onClick?: () => void }) {
  const [lettersVisible, setLettersVisible] = useState(0)
  const title = "Feliz Cumpleaños Nuria"

  useEffect(() => {
    if (!show) return
    const interval = setInterval(() => {
      setLettersVisible((prev) => {
        if (prev >= title.length) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 100)
    return () => clearInterval(interval)
  }, [show, title.length])

  if (!show) return null

  return (
    <div 
      onClick={onClick}
      className="relative z-20 text-center select-none" 
      style={{
        animation: "title-float 3s ease-in-out infinite",
      }}
    >
      <h1 className="mb-2 text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl" style={{
        fontFamily: "var(--font-dancing), cursive",
        color: "#e8d0f8",
        textShadow: "0 0 40px rgba(196, 160, 232, 0.6), 0 0 80px rgba(196, 160, 232, 0.3), 0 2px 4px rgba(0,0,0,0.5)",
      }}>
        {title.split("").map((letter, i) => (
          <span
            key={i}
            className="inline-block"
            style={{
              opacity: i < lettersVisible ? 1 : 0,
              transform: i < lettersVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.5)",
              transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transitionDelay: `${i * 0.05}s`,
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </h1>

      <div
        className="mx-auto mt-4 h-0.5 rounded-full md:mt-6"
        style={{
          width: lettersVisible >= title.length ? "120px" : "0px",
          background: "linear-gradient(90deg, transparent, #daa520, transparent)",
          transition: "width 0.8s ease-in-out 0.5s",
          boxShadow: "0 0 10px rgba(218, 165, 32, 0.5)",
        }}
      />

      <p
        className="mt-4 text-lg tracking-widest uppercase md:mt-6 md:text-xl"
        style={{
          color: "#daa520",
          opacity: lettersVisible >= title.length ? 1 : 0,
          transform: lettersVisible >= title.length ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease-out 0.8s",
          textShadow: "0 0 20px rgba(218, 165, 32, 0.4)",
          letterSpacing: "0.3em",
        }}
      >
        Nunca olvides lo importante y especial que eres para mi
      </p>

      <style jsx>{`
        @keyframes title-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  )
}
