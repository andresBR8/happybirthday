"use client"

import { useEffect, useState } from "react"

interface Sunflower {
  id: number
  x: number
  delay: number
  duration: number
  size: number
  rotation: number
}

function SunflowerSVG({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Petals */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180
        const cx = 50 + Math.cos(angle) * 25
        const cy = 50 + Math.sin(angle) * 25
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx={12}
            ry={6}
            transform={`rotate(${i * 30}, ${cx}, ${cy})`}
            fill={i % 2 === 0 ? "#f0c040" : "#daa520"}
            opacity={0.9}
          />
        )
      })}
      {/* Center */}
      <circle cx={50} cy={50} r={14} fill="#6b4226" />
      <circle cx={50} cy={50} r={10} fill="#8b5a2b" />
      {/* Seeds pattern */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180
        const cx = 50 + Math.cos(angle) * 5
        const cy = 50 + Math.sin(angle) * 5
        return <circle key={i} cx={cx} cy={cy} r={1.5} fill="#4a2a12" />
      })}
    </svg>
  )
}

export function FloatingSunflowers({ show }: { show: boolean }) {
  const [flowers, setFlowers] = useState<Sunflower[]>([])

  useEffect(() => {
    if (!show) return
    const generated: Sunflower[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 4,
      duration: Math.random() * 4 + 6,
      size: Math.random() * 30 + 30,
      rotation: Math.random() * 360,
    }))
    setFlowers(generated)
  }, [show])

  if (!show) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {flowers.map((flower) => (
        <div
          key={flower.id}
          className="absolute"
          style={{
            left: `${flower.x}%`,
            top: "-10%",
            animation: `sunflower-fall ${flower.duration}s linear ${flower.delay}s infinite`,
          }}
        >
          <div style={{
            animation: `sunflower-spin ${flower.duration * 0.8}s linear infinite`,
            transform: `rotate(${flower.rotation}deg)`,
          }}>
            <SunflowerSVG size={flower.size} />
          </div>
        </div>
      ))}
      <style jsx>{`
        @keyframes sunflower-fall {
          0% { transform: translateY(-10vh) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(110vh) translateX(30px); opacity: 0; }
        }
        @keyframes sunflower-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
