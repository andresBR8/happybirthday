"use client"

import { GalleryCardClickable } from "./gallery-card-clickable"

interface Moment {
  src: string
  alt: string
  caption: string
  date: string
  aspect: "portrait" | "landscape" | "square"
}

interface GalleryGridWithLightboxProps {
  moments: Moment[]
  onOpenLightbox: (index: number) => void
}

export function GalleryGridWithLightbox({ moments, onOpenLightbox }: GalleryGridWithLightboxProps) {
  return (
    <div className="mx-auto w-full max-w-7xl px-6">
      {/* Desktop: Masonry-style 3-column layout */}
      <div className="hidden gap-5 md:grid md:grid-cols-3">
        {/* Column 1 */}
        <div className="flex flex-col gap-5">
          <GalleryCardClickable {...moments[0]} delay={0.1} onClick={() => onOpenLightbox(0)} />
          <GalleryCardClickable {...moments[3]} delay={0.25} onClick={() => onOpenLightbox(3)} />
          <GalleryCardClickable {...moments[5]} delay={0.4} onClick={() => onOpenLightbox(5)} />
        </div>

        {/* Column 2 - offset top for masonry feel */}
        <div className="flex flex-col gap-5 pt-12">
          <GalleryCardClickable {...moments[1]} delay={0.15} onClick={() => onOpenLightbox(1)} />
          <GalleryCardClickable {...moments[4]} delay={0.3} onClick={() => onOpenLightbox(4)} />
          <GalleryCardClickable {...moments[7]} delay={0.45} onClick={() => onOpenLightbox(7)} />
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-5 pt-6">
          <GalleryCardClickable {...moments[2]} delay={0.2} onClick={() => onOpenLightbox(2)} />
          <GalleryCardClickable {...moments[6]} delay={0.35} onClick={() => onOpenLightbox(6)} />
        </div>
      </div>

      {/* Mobile: 2-column staggered grid */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {/* Column 1 */}
        <div className="flex flex-col gap-3">
          {moments.filter((_, i) => i % 2 === 0).map((moment, idx) => {
            const originalIndex = idx * 2
            return (
              <GalleryCardClickable
                key={moment.src}
                {...moment}
                aspect={idx % 2 === 0 ? "portrait" : "square"}
                delay={idx * 0.1}
                onClick={() => onOpenLightbox(originalIndex)}
              />
            )
          })}
        </div>

        {/* Column 2 - offset */}
        <div className="flex flex-col gap-3 pt-8">
          {moments.filter((_, i) => i % 2 !== 0).map((moment, idx) => {
            const originalIndex = idx * 2 + 1
            return (
              <GalleryCardClickable
                key={moment.src}
                {...moment}
                aspect={idx % 2 === 0 ? "square" : "portrait"}
                delay={idx * 0.1 + 0.05}
                onClick={() => onOpenLightbox(originalIndex)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
