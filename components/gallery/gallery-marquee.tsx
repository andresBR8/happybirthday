"use client"

import { useEffect, useRef, useState } from "react"

const words = [
  "Aventuras",
  "Recuerdos",
  "Alegrias",
  "Momentos",
  "Risas",
  "Abrazos",
  "Historias",
  "Sueños",
  "Felicidad",
]

export function GalleryMarquee() {
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
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const marqueeContent = words.map((word) => (
    <span key={word} className="flex items-center gap-8">
      <span className="whitespace-nowrap font-serif text-2xl text-muted-foreground/40 md:text-4xl">
        {word}
      </span>
      <span className="text-accent/40" aria-hidden="true">
        &#x2022;
      </span>
    </span>
  ))

  return (
    <div
      ref={ref}
      className={`w-full overflow-hidden py-8 ${isVisible ? "animate-fade-in" : "opacity-0"}`}
      style={{ animationDelay: "0.2s" }}
      aria-hidden="true"
    >
      <div className="flex animate-slide-left items-center gap-8">
        <div className="flex shrink-0 items-center gap-8">{marqueeContent}</div>
        <div className="flex shrink-0 items-center gap-8">{marqueeContent}</div>
      </div>
    </div>
  )
}
