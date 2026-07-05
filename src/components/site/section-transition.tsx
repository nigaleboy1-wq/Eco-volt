"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  /** Couleur de départ (haut) */
  fromColor?: string;
  /** Couleur d'arrivée (bas) */
  toColor?: string;
  /** Numéro de section optionnel */
  index?: number;
};

/**
 * Transition élégante entre sections.
 * Ligne dorée animée + dégradé de couleur + breathing glow.
 * Inspiré Linear.app / Stripe : minimaliste, premium, fluide.
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

  const lineScale = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);
  const dotOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8, 0.9], [0, 1, 1, 0]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  return (
    <section
      ref={ref}
      className="relative py-10 md:py-14 overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${fromColor} 0%, ${toColor} 100%)`,
      }}
    >
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col items-center">
          {/* Breathing glow doré */}
          <motion.div
            style={{ scale: glowScale }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full pointer-events-none"
          >
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(216,169,40,0.2) 0%, transparent 70%)",
              }}
            />
          </motion.div>

          {/* Ligne dorée animée */}
          <motion.div
            style={{ scaleX: lineScale }}
            className="relative h-px w-32 md:w-48 bg-gradient-to-r from-transparent via-[#D8A928] to-transparent origin-center"
          >
            {/* Point central pulsant */}
            <motion.div
              style={{ opacity: dotOpacity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#D8A928]"
            >
              <motion.div
                animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-[#D8A928]"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
