"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"

interface FloatingHeart {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export function FloatingHearts({ active }: { active: boolean }) {
  const [hearts, setHearts] = useState<FloatingHeart[]>([])

  useEffect(() => {
    if (!active) return

    const interval = setInterval(() => {
      const newHeart: FloatingHeart = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: 100,
        size: Math.random() * 20 + 14,
        duration: Math.random() * 3 + 2,
        delay: 0,
      }
      setHearts((prev) => [...prev.slice(-20), newHeart])
    }, 200)

    return () => clearInterval(interval)
  }, [active])

  if (!active) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 50 }}>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            bottom: "-20px",
            animation: `floatUp ${heart.duration}s ease-out forwards`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          <Heart
            size={heart.size}
            className="text-primary fill-primary"
            style={{ opacity: 0.8 }}
          />
        </div>
      ))}
      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh) scale(0.3) rotate(${Math.random() > 0.5 ? "" : "-"}45deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
