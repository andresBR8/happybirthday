"use client"

import { useEffect, useState } from "react"

interface ConfettiPiece {
  id: number
  x: number
  y: number
  color: string
  size: number
  delay: number
  duration: number
  rotateEnd: number
  xDrift: number
}

export function ConfettiBurst({ show }: { show: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    if (!show) return
    const colors = ["#c4a0e8", "#e8d0f8", "#daa520", "#f0c040", "#ffffff", "#a880d0", "#8b6bb0"]
    const generated: ConfettiPiece[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: 40 + Math.random() * 20,
      y: 30 + Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      delay: Math.random() * 0.5,
      duration: Math.random() * 2 + 2,
      rotateEnd: Math.random() * 720 - 360,
      xDrift: (Math.random() - 0.5) * 200,
    }))
    setPieces(generated)
  }, [show])

  if (!show) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            animation: `confetti-explode ${piece.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${piece.delay}s forwards`,
            ["--x-drift" as string]: `${piece.xDrift}px`,
            ["--rotate-end" as string]: `${piece.rotateEnd}deg`,
          }}
        >
          <div
            style={{
              width: piece.size,
              height: piece.size * 0.6,
              backgroundColor: piece.color,
              borderRadius: piece.id % 3 === 0 ? "50%" : "2px",
              boxShadow: `0 0 ${piece.size}px ${piece.color}40`,
            }}
          />
        </div>
      ))}
      <style jsx>{`
        @keyframes confetti-explode {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(0);
            opacity: 1;
          }
          20% {
            transform: translate(calc(var(--x-drift) * 0.3), -100px) rotate(calc(var(--rotate-end) * 0.3)) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--x-drift), 300px) rotate(var(--rotate-end)) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
