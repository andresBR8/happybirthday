"use client"

export function GlowRings() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden">
      {/* Center glow */}
      <div
        className="absolute rounded-full"
        style={{
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(196, 160, 232, 0.08) 0%, transparent 70%)",
          animation: "glow-pulse 4s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(218, 165, 32, 0.05) 0%, transparent 70%)",
          animation: "glow-pulse 4s ease-in-out 2s infinite",
        }}
      />

      {/* Corner accents */}
      <div
        className="absolute -left-20 -top-20 rounded-full"
        style={{
          width: 300,
          height: 300,
          background: "radial-gradient(circle, rgba(196, 160, 232, 0.1) 0%, transparent 70%)",
          animation: "glow-drift 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -bottom-20 -right-20 rounded-full"
        style={{
          width: 300,
          height: 300,
          background: "radial-gradient(circle, rgba(218, 165, 32, 0.08) 0%, transparent 70%)",
          animation: "glow-drift 8s ease-in-out 4s infinite",
        }}
      />

      <style jsx>{`
        @keyframes glow-pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        @keyframes glow-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -20px) scale(1.1); }
          66% { transform: translate(-10px, 10px) scale(0.9); }
        }
      `}</style>
    </div>
  )
}
