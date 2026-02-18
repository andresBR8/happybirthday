"use client"

import { useEffect, useState } from "react"

export function FallingCake({ show }: { show: boolean }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setVisible(true), 600)
      return () => clearTimeout(timer)
    }
  }, [show])

  if (!visible) return null

  return (
    <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2" style={{
      animation: "cake-fall 1.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
    }}>
      <div className="relative">
        {/* Candle flame */}
        <div className="mx-auto mb-1 flex justify-center">
          <div className="relative">
            <div
              className="h-5 w-3 rounded-full"
              style={{
                background: "radial-gradient(circle, #f0c040 0%, #daa520 50%, transparent 70%)",
                boxShadow: "0 0 15px #f0c040, 0 0 30px #daa520, 0 -10px 20px rgba(240,192,64,0.3)",
                animation: "flame-flicker 0.5s ease-in-out infinite alternate",
              }}
            />
          </div>
        </div>
        {/* Candle */}
        <div className="mx-auto mb-0.5 h-8 w-2 rounded-sm" style={{ background: "linear-gradient(to right, #e8d0f8, #c4a0e8)" }} />
        {/* Cake top tier */}
        <div className="mx-auto rounded-t-lg" style={{
          width: 80,
          height: 35,
          background: "linear-gradient(135deg, #d4b0f0 0%, #c4a0e8 40%, #a880d0 100%)",
          boxShadow: "0 4px 20px rgba(196, 160, 232, 0.4)",
        }}>
          {/* Frosting drip */}
          <div className="flex justify-around px-2 pt-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-b-full"
                style={{
                  width: 8,
                  height: 10 + Math.random() * 8,
                  background: "#e8d0f8",
                  animation: `drip-down 2s ease-in-out ${i * 0.3}s infinite alternate`,
                }}
              />
            ))}
          </div>
        </div>
        {/* Cake middle tier */}
        <div className="mx-auto" style={{
          width: 100,
          height: 30,
          background: "linear-gradient(135deg, #b890d8 0%, #a880d0 40%, #9070b8 100%)",
          borderBottom: "3px solid #e8d0f8",
        }}>
          <div className="flex items-center justify-center gap-3 pt-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-2 w-2 rounded-full" style={{
                background: "#f0c040",
                boxShadow: "0 0 6px #daa520",
              }} />
            ))}
          </div>
        </div>
        {/* Cake bottom tier */}
        <div className="mx-auto rounded-b-lg" style={{
          width: 120,
          height: 35,
          background: "linear-gradient(135deg, #a070c0 0%, #9060b0 40%, #7850a0 100%)",
          boxShadow: "0 8px 30px rgba(120, 80, 160, 0.5)",
        }}>
          <div className="flex items-center justify-center gap-2 pt-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-1.5 w-1.5 rounded-full" style={{
                background: "#daa520",
                boxShadow: "0 0 4px #f0c040",
              }} />
            ))}
          </div>
        </div>
        {/* Cake plate */}
        <div className="mx-auto" style={{
          width: 140,
          height: 8,
          borderRadius: "0 0 50% 50%",
          background: "linear-gradient(to right, #3a3a3a, #555555, #3a3a3a)",
          boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
        }} />
      </div>
      <style jsx>{`
        @keyframes cake-fall {
          0% { transform: translateX(-50%) translateY(-200px) rotate(-5deg); opacity: 0; }
          60% { transform: translateX(-50%) translateY(20px) rotate(2deg); opacity: 1; }
          80% { transform: translateX(-50%) translateY(-10px) rotate(-1deg); }
          100% { transform: translateX(-50%) translateY(0) rotate(0deg); opacity: 1; }
        }
        @keyframes flame-flicker {
          0% { transform: scaleY(1) scaleX(1); }
          50% { transform: scaleY(1.2) scaleX(0.8); }
          100% { transform: scaleY(0.9) scaleX(1.1); }
        }
        @keyframes drip-down {
          0% { height: 10px; }
          100% { height: 18px; }
        }
      `}</style>
    </div>
  )
}
