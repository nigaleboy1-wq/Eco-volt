"use client";

import { useRef, useState, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  /** Intensité de l'effet tilt en degrés (défaut: 12) */
  intensity?: number;
  /** Élément à transformer en 3D */
  as?: "div" | "article" | "section";
};

/**
 * Carte avec effet 3D tilt au survol de la souris.
 * La carte pivote sur les axes X et Y en fonction de la position du curseur.
 * Inclut un effet de profondeur (perspective) et un glow qui suit la souris.
 */
export function Card3D({
  children,
  className = "",
  intensity = 12,
  as = "div",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Position de la souris relative à la carte (-0.5 à 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs pour un mouvement fluide
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 300,
    damping: 30,
  });

  // Position du glow qui suit la souris
  const glowX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref as never}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      className={`relative ${className}`}
    >
      {/* Glow qui suit la souris */}
      <motion.div
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(circle at ${x} ${y}, rgba(245,185,26,${hovered ? 0.25 : 0}), transparent 60%)`
          ),
        }}
        className="absolute inset-0 rounded-[inherit] pointer-events-none z-20 transition-opacity duration-300"
      />
      {/* Contenu avec profondeur 3D */}
      <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </MotionTag>
  );
}
