"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Variant = "light-to-cream" | "cream-to-light" | "light-to-dark" | "dark-to-cream" | "cream-to-cream" | "dark-to-light";

type Props = {
  variant?: Variant;
  fromColor?: string;
  toColor?: string;
};

const COLORS: Record<Variant, { from: string; to: string }> = {
  "light-to-cream": { from: "#ffffff", to: "#F8F7F2" },
  "cream-to-light": { from: "#F8F7F2", to: "#ffffff" },
  "light-to-dark": { from: "#ffffff", to: "#07241c" },
  "dark-to-cream": { from: "#07241c", to: "#F8F7F2" },
  "cream-to-cream": { from: "#F8F7F2", to: "#F8F7F2" },
  "dark-to-light": { from: "#0E3B2E", to: "#F8F6F1" },
};

/**
 * Transition élégante entre sections.
 * Ligne dorée animée + point pulsant + dégradé de couleur.
 * Compacte (py-6) pour ne pas créer d'espace vide.
 */
export function SectionTransition({
  variant = "cream-to-light",
  fromColor,
  toColor,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const colors = COLORS[variant];
  const from = fromColor ?? colors.from;
  const to = toColor ?? colors.to;

  // Ligne qui se dessine de gauche à droite
  const lineScale = useTransform(scrollYProgress, [0.15, 0.5], [0, 1]);
  // Opacité du point central
  const dotOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative py-6 md:py-8 overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${from} 0%, ${to} 100%)`,
      }}
    >
      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
        {/* Ligne dorée animée pleine largeur */}
        <motion.div
          style={{ scaleX: lineScale }}
          className="relative h-px w-full bg-gradient-to-r from-transparent via-[#D8A928] to-transparent origin-center"
        >
          {/* Point central pulsant */}
          <motion.div
            style={{ opacity: dotOpacity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#D8A928]"
          >
            <motion.div
              animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-[#D8A928]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
