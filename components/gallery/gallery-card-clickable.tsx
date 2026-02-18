"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

interface GalleryCardClickableProps {
  src: string
  alt: string
  caption: string
  date: string
  aspect?: "portrait" | "landscape" | "square"
  delay?: number
  onClick: () => void
}

export function GalleryCardClickable({
  src,
  alt,
  caption,
  date,
  aspect = "portrait",
  delay = 0,
  onClick,
}: GalleryCardClickableProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const aspectClasses = {
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    square: "aspect-square",
  }

  return (
    <div
      ref={ref}
      className={`group relative cursor-pointer ${isVisible ? "animate-scale-in" : "opacity-0"}`}
      style={{ animationDelay: `${delay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick()
        }
      }}
      aria-label={`Ver imagen: ${caption}`}
    >
      <div className={`relative overflow-hidden rounded-lg ${aspectClasses[aspect]}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover transition-all duration-700 ease-out ${
            isHovered ? "scale-105" : "scale-100"
          }`}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />

        {/* Subtle shadow overlay at bottom always visible */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-foreground/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Overlay on hover */}
        <div
          className={`absolute inset-0 transition-all duration-500 ease-out ${
            isHovered ? "bg-foreground/10" : "bg-transparent"
          }`}
        />

        {/* Caption overlay */}
        <div
          className={`absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4 md:p-5 transition-all duration-500 ease-out ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <span className="text-[10px] font-medium uppercase tracking-widest text-primary-foreground/70 md:text-xs">
            {date}
          </span>
          <span className="font-serif text-sm text-primary-foreground md:text-lg">{caption}</span>
        </div>
      </div>
    </div>
  )
}
