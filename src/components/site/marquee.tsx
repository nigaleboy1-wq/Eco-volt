"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  text: string;
  separator?: string;
  className?: string;
  /** Vitesse de défilement en secondes pour une boucle */
  duration?: number;
  reverse?: boolean;
};

/**
 * Bandeau marquee cinématique.
 * Le texte se répète en boucle infinie, avec une légère accélération
 * liée au scroll pour un effet premium.
 */
export function Marquee({
  text,
  separator = " · ",
  className = "",
  duration = 30,
  reverse = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Accélération subtile liée au scroll
  const xShift = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? ["-5%", "5%"] : ["5%", "-5%"]
  );

  const items = Array.from({ length: 8 }, () => text).join(separator);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden py-6 md:py-8 ${className}`}
    >
      <motion.div
        style={{ x: xShift }}
        className="relative flex whitespace-nowrap will-change-transform"
      >
        <div
          className="flex shrink-0"
          style={{
            animation: `${reverse ? "marquee-rev" : "marquee"} ${duration}s linear infinite`,
          }}
        >
          <span className="px-8">{items}</span>
          <span className="px-8" aria-hidden>
            {items}
          </span>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-rev {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
