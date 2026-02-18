"use client"

import { useEffect, useRef, useState } from "react"

export function GalleryHeader() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="flex flex-col items-center gap-6 px-6 text-center">
      <span
        className={`text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground ${
          isVisible ? "animate-fade-in" : "opacity-0"
        }`}
      >
        Las fotos que me encantan
      </span>

      <h2
        className={`max-w-2xl font-serif text-4xl leading-tight text-foreground md:text-5xl lg:text-6xl ${
          isVisible ? "animate-fade-up" : "opacity-0"
        }`}
        style={{ animationDelay: "0.15s" }}
      >
        <span className="text-balance">Mejores Momentos</span>
      </h2>

      <div
        className={`h-px w-16 bg-accent ${isVisible ? "animate-fade-in" : "opacity-0"}`}
        style={{ animationDelay: "0.35s" }}
      />

      <p
        className={`max-w-lg text-base leading-relaxed text-muted-foreground ${
          isVisible ? "animate-fade-up" : "opacity-0"
        }`}
        style={{ animationDelay: "0.45s" }}
      >
        Una galeria de fotos que guadan recuerdos.
      </p>
    </div>
  )
}
