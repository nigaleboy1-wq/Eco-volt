"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  /** Numéro de la section (ex: "02") */
  num: string;
  /** Nom de la section suivante (ex: "Services") */
  nextLabel: string;
  /** Couleur de fond de la section précédente (départ du dégradé) */
  fromColor?: string;
  /** Couleur de fond de la section suivante (arrivée du dégradé) */
  toColor?: string;
};

/**
 * Transition cinématique entre deux sections.
 * Affiche un grand chiffre, une ligne dorée animée, et le nom de la section suivante.
 */
export function SectionTransition({
  num,
  nextLabel,
  fromColor = "#ffffff",
  toColor = "#ffffff",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Le grand chiffre se déplace et s'estompe
  const numY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const numOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.5, 0.15]);

  // La ligne dorée se dessine
  const lineScale = useTransform(scrollYProgress, [0.05, 0.5], [0, 1]);

  // Le label apparaît tôt et reste visible
  const labelOpacity = useTransform(scrollYProgress, [0.15, 0.4, 0.7, 0.95], [0, 1, 1, 0]);
  const labelY = useTransform(scrollYProgress, [0.15, 0.4], [20, 0]);

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-24 overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${fromColor} 0%, ${toColor} 100%)`,
      }}
    >
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col items-center justify-center text-center gap-6">
          {/* Grand numéro en filigrane */}
          <motion.span
            style={{ y: numY, opacity: numOpacity }}
            className="font-display font-bold text-[clamp(8rem,20vw,18rem)] leading-none tracking-tighter text-[#0d3b2e]/10 select-none"
          >
            {num}
          </motion.span>

          {/* Ligne dorée */}
          <motion.div
            style={{ scaleX: lineScale }}
            className="h-px w-32 md:w-48 bg-gradient-to-r from-transparent via-[#f5b91a] to-transparent origin-center"
          />

          {/* Label section suivante */}
          <motion.div
            style={{ opacity: labelOpacity, y: labelY }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs font-display font-semibold tracking-[0.3em] uppercase text-[#5a6b65]">
              Section suivante
            </span>
            <span className="font-display font-semibold text-2xl md:text-3xl tracking-tight text-[#0d3b2e]">
              {nextLabel}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
