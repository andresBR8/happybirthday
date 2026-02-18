"use client"

import { useEffect, useRef, useState } from "react"

export function GalleryQuote() {
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
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center"
    >
      <div
        className={`h-px w-12 bg-border ${isVisible ? "animate-fade-in" : "opacity-0"}`}
        style={{ animationDelay: "0.1s" }}
      />

      <blockquote
        className={`font-serif text-xl italic leading-relaxed text-muted-foreground md:text-2xl lg:text-3xl ${
          isVisible ? "animate-fade-up" : "opacity-0"
        }`}
        style={{ animationDelay: "0.25s" }}
      >
        {'"Los mejores momentos de la vida no son los que posamos para la foto, sino los que nos sorprenden con una sonrisa genuina."'}
      </blockquote>

      <div
        className={`flex flex-col items-center gap-1 ${isVisible ? "animate-fade-in" : "opacity-0"}`}
        style={{ animationDelay: "0.45s" }}
      >
        <div className="h-px w-8 bg-accent/50" />
        <span className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground/60">
          Recuerda
        </span>
      </div>
    </div>
  )
}
