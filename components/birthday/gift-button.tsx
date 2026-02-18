"use client"

import { Gift } from "lucide-react"

export function GiftButton({ onClick, show }: { onClick: () => void; show: boolean }) {
  if (!show) return null

  return (
    <div className="relative z-40" style={{
      animation: "gift-appear 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
    }}>
      <button
        onClick={onClick}
        className="group relative cursor-pointer overflow-hidden rounded-full px-10 py-5 font-sans text-lg font-bold tracking-wide transition-all duration-500 hover:scale-110 active:scale-95 md:px-14 md:py-6 md:text-xl"
        style={{
          background: "linear-gradient(135deg, #c4a0e8 0%, #a880d0 50%, #8b6bb0 100%)",
          color: "#0a0a0a",
          boxShadow: "0 0 30px rgba(196, 160, 232, 0.4), 0 0 60px rgba(196, 160, 232, 0.2), inset 0 1px 0 rgba(255,255,255,0.3)",
        }}
        aria-label="Abrir sorpresa de regalo"
      >
        {/* Shimmer effect */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            animation: "shimmer 2s ease-in-out infinite",
          }}
        />

        {/* Glow ring */}
        <div
          className="absolute -inset-1 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: "linear-gradient(135deg, #c4a0e8, #daa520, #c4a0e8)",
            filter: "blur(8px)",
            zIndex: -1,
          }}
        />

        <span className="relative z-10 flex items-center gap-3">
          <Gift className="h-6 w-6 transition-transform duration-500 group-hover:rotate-12 md:h-7 md:w-7" />
          <span>Espero que te guste</span>
          <span className="text-xl transition-transform duration-500 group-hover:scale-125 md:text-2xl">
            {">>>"}
          </span>
        </span>
      </button>

      {/* Orbiting dots */}
      <div className="absolute inset-0 -z-10" style={{ animation: "orbit 6s linear infinite" }}>
        <div className="absolute -left-2 top-1/2 h-2 w-2 rounded-full" style={{ background: "#daa520", boxShadow: "0 0 10px #daa520" }} />
      </div>
      <div className="absolute inset-0 -z-10" style={{ animation: "orbit 6s linear 2s infinite" }}>
        <div className="absolute -right-2 top-1/2 h-1.5 w-1.5 rounded-full" style={{ background: "#c4a0e8", boxShadow: "0 0 8px #c4a0e8" }} />
      </div>
      <div className="absolute inset-0 -z-10" style={{ animation: "orbit 6s linear 4s infinite" }}>
        <div className="absolute left-1/2 -top-2 h-1.5 w-1.5 rounded-full" style={{ background: "#e8d0f8", boxShadow: "0 0 8px #e8d0f8" }} />
      </div>

      <style jsx>{`
        @keyframes gift-appear {
          0% { opacity: 0; transform: scale(0.5); }
          70% { transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
