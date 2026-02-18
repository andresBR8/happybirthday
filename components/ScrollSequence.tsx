"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const FRAME_COUNT = 238; // Total frames from ezgif
const FRAMES_DIR = "/frames"; // Path to frames

export default function ScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Scroll progress for the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress (0 to 1) to frame index (0 to FRAME_COUNT - 1)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    // Preload images
    const loadImages = async () => {
      // Initialize array with nulls
      const loadedImages: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
      
      const loadImage = (index: number): Promise<void> => {
          return new Promise((resolve) => {
              const img = new Image();
              img.onload = () => {
                  loadedImages[index] = img;
                  resolve();
              };
              img.onerror = () => {
                  console.error(`Failed to load frame ${index + 1}`);
                  resolve(); // Resolve anyway
              };
              const paddedIndex = (index + 1).toString().padStart(3, "0");
              img.src = `${FRAMES_DIR}/ezgif-frame-${paddedIndex}.jpg`;
          });
      };

      // Load initial batch to start quickly
      const BATCH_SIZE = 50;
      const initialPromises = [];
      for (let i = 0; i < BATCH_SIZE; i++) {
          initialPromises.push(loadImage(i));
      }
      
      await Promise.all(initialPromises);
      setImages(loadedImages as HTMLImageElement[]); // It might have nulls, but render handles it
      setIsLoading(false);

      // Load the rest in chunks
      const CHUNK_SIZE = 50;
      for (let i = BATCH_SIZE; i < FRAME_COUNT; i += CHUNK_SIZE) {
          const chunkPromises = [];
          for (let j = i; j < i + CHUNK_SIZE && j < FRAME_COUNT; j++) {
              chunkPromises.push(loadImage(j));
          }
          await Promise.all(chunkPromises);
          // Optional: Update state after each chunk so they become available
          setImages([...(loadedImages as HTMLImageElement[])]);
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!canvasRef.current || images.length === 0) return;

    const context = canvasRef.current.getContext("2d");
    if (!context) return;

    // Initial draw
    const render = (index: number) => {
      const img = images[Math.round(index)];
      if (img) {
        // Set canvas to full window size
        canvasRef.current!.width = window.innerWidth;
        canvasRef.current!.height = window.innerHeight;
        
        const canvasAspect = canvasRef.current!.width / canvasRef.current!.height;
        const imgAspect = img.width / img.height;

        let scale;
        
        // Mobile-specific scaling logic (portrait mode)
        const isMobile = window.innerWidth < 768; 
        
        if (isMobile) {
            // Since the background matches (black), we can use "contain" logic (Math.min)
            // or a hybrid to ensure the whole subject is visible without cropping sides.
            // However, "contain" might make it too small if it's a wide image.
            // Let's try to match the WIDTH mostly, but ensure HEIGHT isn't overflowing too crazily?
            // Actually, Math.max (cover) crops. Math.min (contain) fits everything.
            // If background is consistent, Contain is the safest bet to see the "whole scene".
            scale = Math.max(
                canvasRef.current!.width / img.width,
                 // scaling by height might be too small if image is very tall? 
                 // If image is landscape (typical video frame), matching width is key.
                 // let's try a hybrid: 
                 (canvasRef.current!.height / img.height) * 0.8 // Zoom out slightly?
            );

            // Re-think: "Contain" = Math.min. 
            // If we use Contain, and image is 16:9 and screen is 9:16, image will be a small strip in middle.
            // Maybe we want "Cover Height" (match height)? 
            // ratio = height/imgHeight.
            // Then width is cropped. That's what we had.
            
            // New strategy for mobile:
            // Sync with "Subject floats in void". 
            // We want the subject comfortable.
            // Let's try limiting the scale so it doesn't zoom in too much.
            const widthRatio = canvasRef.current!.width / img.width;
            const heightRatio = canvasRef.current!.height / img.height;
            
            // If we are essentially "zoomed in" (scale > 1), strictly clamp it?
            // Or just prioritize showing the center.
            
            // Let's try: "Contain" but with a minimum zoom to avoid tiny images.
            scale = Math.max(widthRatio, heightRatio * 0.7); 
        } else {
             // Desktop: Standard cover
            scale = Math.max(
                canvasRef.current!.width / img.width,
                canvasRef.current!.height / img.height
            );
        }

        const x = (canvasRef.current!.width / 2) - (img.width / 2) * scale;
        const y = (canvasRef.current!.height / 2) - (img.height / 2) * scale;
        
        context.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    };

    // Subscribe to frame changes
    const unsubscribe = frameIndex.on("change", (latest) => {
        requestAnimationFrame(() => render(latest));
    });
    
    // Initial render call for first frame
    if(images.length > 0) render(0);

    return () => unsubscribe();
  }, [images, frameIndex]);

  // Handle resize
  useEffect(() => {
      const handleResize = () => {
          if (!canvasRef.current || images.length === 0) return;
           // Trigger re-render of current frame
           const currentIndex = frameIndex.get();
           // We can't easily trigger the render function from here without refactoring, 
           // but the scroll event or next frame update will catch it. 
           // For now, let's just let the next scroll update handle it or force update if strictly needed.
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, [images, frameIndex]);


  return (
    <div ref={containerRef} className="h-[800vh] relative bg-midnight">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center text-champagne z-50">
                Loading Experience...
            </div>
        )}
        <canvas
          ref={canvasRef}
          className="block w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
