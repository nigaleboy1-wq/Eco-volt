"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  /** Couleur de départ (haut) */
  fromColor?: string;
  /** Couleur d'arrivée (bas) */
  toColor?: string;
};

/**
 * Transition élégante entre sections : ligne dorée pleine largeur
 * cohérente avec le style des sections Services et Process.
 * Inspirée Linear.app / Stripe : minimaliste, premium, fluide.
 */
export function SectionTransition({
  fromColor = "#ffffff",
  toColor = "#ffffff",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // La ligne dorée se dessine de gauche à droite au scroll
  const lineScale = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative py-8 md:py-10 overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${fromColor} 0%, ${toColor} 100%)`,
      }}
    >
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Ligne dorée pleine largeur animée */}
        <motion.div
          style={{ scaleX: lineScale }}
          className="relative h-px w-full bg-gradient-to-r from-transparent via-[#D8A928] to-transparent origin-center"
        >
          {/* Point central subtil */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#D8A928]"
          >
            <motion.div
              animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-[#D8A928]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
