"use client"

import { useEffect, useState } from "react"

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  color: string
}

export function Sparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    const colors = ["#c4a0e8", "#e8d0f8", "#daa520", "#f0c040", "#ffffff"]
    const generated: Sparkle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setSparkles(generated)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute rounded-full"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: sparkle.size,
            height: sparkle.size,
            backgroundColor: sparkle.color,
            boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}`,
            animation: `sparkle-twinkle ${sparkle.duration}s ease-in-out ${sparkle.delay}s infinite`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes sparkle-twinkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
