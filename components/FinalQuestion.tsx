import React from "react";
import { motion } from "framer-motion";

export const FinalQuestion = () => {
  return (
    <section className="flex min-h-[50vh] flex-col items-center justify-center bg-midnight pb-20 pt-10 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="font-serif text-3xl font-light text-champagne md:text-5xl lg:text-6xl"
      >
        ¿puedo ser tu estrella?
      </motion.h2>
    </section>
  );
};
