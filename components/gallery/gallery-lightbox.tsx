"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface LightboxImage {
  src: string
  alt: string
  caption: string
  date: string
}

interface GalleryLightboxProps {
  images: LightboxImage[]
  initialIndex: number
  isOpen: boolean
  onClose: () => void
}

export function GalleryLightbox({ images, initialIndex, isOpen, onClose }: GalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  const goNext = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setTimeout(() => setIsAnimating(false), 400)
  }, [images.length, isAnimating])

  const goPrev = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setTimeout(() => setIsAnimating(false), 400)
  }, [images.length, isAnimating])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") goNext()
      if (e.key === "ArrowLeft") goPrev()
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose, goNext, goPrev])

  if (!isOpen) return null

  const current = images[currentIndex]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Galeria de imagenes"
    >
      <div
        className="relative flex h-full w-full max-w-6xl flex-col items-center justify-center gap-6 p-6 md:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-background/10 p-2 text-primary-foreground/80 transition-colors duration-300 hover:bg-background/20 hover:text-primary-foreground md:right-8 md:top-8"
          aria-label="Cerrar galeria"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Image */}
        <div className="relative aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-lg">
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            fill
            className="animate-fade-in object-contain"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
          />
        </div>

        {/* Caption */}
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="font-serif text-xl text-primary-foreground md:text-2xl">{current.caption}</span>
          <span className="text-xs uppercase tracking-widest text-primary-foreground/50">{current.date}</span>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          <button
            onClick={goPrev}
            className="rounded-full border border-primary-foreground/10 bg-background/5 p-3 text-primary-foreground/70 transition-all duration-300 hover:border-primary-foreground/30 hover:bg-background/10 hover:text-primary-foreground"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <span className="text-xs tracking-widest text-primary-foreground/40">
            {currentIndex + 1} / {images.length}
          </span>

          <button
            onClick={goNext}
            className="rounded-full border border-primary-foreground/10 bg-background/5 p-3 text-primary-foreground/70 transition-all duration-300 hover:border-primary-foreground/30 hover:bg-background/10 hover:text-primary-foreground"
            aria-label="Imagen siguiente"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
