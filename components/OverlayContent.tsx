"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function OverlayContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // We share the scroll progress of the main container, or we just position absolute divs
  // at specific heights corresponding to the scroll sequence.
  // Since ScrollSequence is h-[800vh], we can position content at top, 200vh, 400vh, etc.

  return (
    <div className="absolute top-0 left-0 w-full h-[800vh] pointer-events-none z-10 flex flex-col justify-between font-sans">
      {/* Hero Section - 0 to 100vh */}
      <section className="h-screen flex flex-col items-center justify-start pt-32 md:pt-0 md:justify-center text-center p-6 bg-gradient-to-b from-black/60 via-transparent to-transparent">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.5 }}
           transition={{ duration: 1 }}
        >
            <h1 className="text-5xl md:text-9xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              
            </h1>
            <p className="text-lg md:text-2xl text-white/80 mt-4 font-light tracking-wide uppercase">
              
            </p>
        </motion.div>
      </section>

      {/* Feature 1 - "The Breakdown" - Around 200vh */}
      <section className="h-screen flex items-start md:items-center justify-center md:justify-end p-8 md:pr-32 absolute top-[200vh] w-full pt-32 md:pt-0">
         <motion.div
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           className="text-center md:text-right max-w-xs md:max-w-md bg-black/40 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-4 rounded-xl border border-white/10 md:border-none"
         >
            <h2 className="text-purple-400 text-3xl md:text-4xl font-semibold mb-2 drop-shadow-md">Espero y te guste</h2>
            <p className="text-white/90 text-base md:text-lg leading-relaxed shadow-black drop-shadow-md">
              Recuerda que te quiero mucho y que siempre estare para ti.
            </p>
         </motion.div>
      </section>

      {/* Feature 2 - "Empathy" - Around 400vh */}
      <section className="h-screen flex items-start md:items-center justify-center md:justify-start p-8 md:pl-32 absolute top-[400vh] w-full pt-32 md:pt-0">
         <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           className="text-center md:text-left max-w-xs md:max-w-md bg-black/40 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-4 rounded-xl border border-white/10 md:border-none"
         >
            <h2 className="text-champagne text-3xl md:text-4xl font-semibold mb-2 drop-shadow-md">Recuerda..</h2>
            <p className="text-white/90 text-base md:text-lg leading-relaxed shadow-black drop-shadow-md">
              No te rindas nunca, lucha por tus sueños y no dejes que nadie te diga que no puedes lograr tus metas.
            </p>
         </motion.div>
      </section>

       {/* Feature 3 - "Wisdom" - Around 600vh */}
       <section className="h-screen flex items-end justify-center p-8 absolute top-[600vh] w-full pb-32">
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 0, scale: 1 }}
    transition={{ duration: 0.8 }}
    className="max-w-xs md:max-w-xl bg-black/60 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl"
  />
</section>



      {/* Footer / Credits - End */}
      <section className="h-screen flex flex-col items-center justify-center p-6 absolute bottom-0 w-full pointer-events-auto bg-gradient-to-t from-midnight via-midnight/90 to-transparent">
         <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 1 }}
             className="text-center"
         >
             <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 md:mb-8 font-serif">
                 Feliz Cumpleaños Nuni.
             </h2>
             <p className="text-lg md:text-xl text-white/70 mb-8 md:mb-12 max-w-2xl mx-auto px-4 italic">
                 "El universo conspiró para hacerte así de maravillosa."
             </p>
             
             <div className="text-white/40 text-sm uppercase tracking-widest space-y-2 mb-12">
                <p>Creado por Andres para Nuria</p>
                <p>Felices 19 años</p>
             </div>

             <button 
                onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    // Logic to restart could be complex, simple scroll to top is a "Replay"
                    window.location.reload(); 
                }}
                className="text-white/50 hover:text-white transition-colors uppercase text-xs tracking-widest border-b border-transparent hover:border-white pb-1"
             >
                 Reproducir nuevamente
             </button>
         </motion.div>
      </section>
    </div>
  );
}
