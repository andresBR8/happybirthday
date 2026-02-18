"use client"

import { useState, useCallback } from "react"
import { GalleryHeader } from "./gallery-header"
import { GalleryGridWithLightbox } from "./gallery-grid-lightbox"
import { GalleryMarquee } from "./gallery-marquee"
import { GalleryLightbox } from "./gallery-lightbox"
import { GalleryQuote } from "./gallery-quote"

const moments = [
  {
    src: "/galeria/foto1.png",
    alt: "Un dia especial",
    caption: "Esos ojitos",
    date: "MAYO 2025",
    aspect: "portrait" as const,
  },
  {
    src: "/galeria/20251213_214628.jpg",
    alt: "Un dia cualquiera",
    caption: "Una mirada hermosa",
    date: "En cualquier momento",
    aspect: "landscape" as const,
  },
  {
    src: "/galeria/foto3.png",
    alt: "Como se ve que no te faltan flores ehhh",
    caption: "De lo que me perdi ese dia :(",
    date: "Finales de 2025",
    aspect: "square" as const,
  },
  {
    src: "/galeria/IMG_4336 2.png",
    alt: "Las wawas",
    caption: "Go pueblito",
    date: "2024",
    aspect: "portrait" as const,
  },
  {
    src: "/galeria/IMG_8837 4.png",
    alt: "Quien lo hubiera dicho",
    caption: "¿De donde salio esa foto?",
    date: "Desde el principio de los tiempos",
    aspect: "landscape" as const,
  },
  {
    src: "/galeria/foto4.jpg",
    alt: "Kemba digo baby",
    caption: "El niñooooo",
    date: "2025",
    aspect: "square" as const,
  },
  {
    src: "/galeria/foto2.png",
    alt: "Pufff lo que costo adornar esa cama jaja",
    caption: "18?",
    date: "Febrero 2024",
    aspect: "portrait" as const,
  },
  {
    src: "/galeria/20251031_174534.jpg",
    alt: "No me mates pls",
    caption: "Y esa flor de atras?",
    date: "2025",
    aspect: "landscape" as const,
  },
]

export function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }, [])

  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      {/* Subtle background texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative flex flex-col gap-16 md:gap-24">
        <GalleryHeader />

        <GalleryMarquee />

        <GalleryGridWithLightbox moments={moments} onOpenLightbox={openLightbox} />

        <GalleryQuote />
      </div>

      <GalleryLightbox
        images={moments}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  )
}
