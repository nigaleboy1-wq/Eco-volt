"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

// === Variants pour animations scroll ===
// Chaque élément vient d'une direction et retrouve sa position

export function FromLeft({
  children,
  className,
  delay = 0,
  duration = 0.8,
  distance = 60,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -distance }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FromRight({
  children,
  className,
  delay = 0,
  duration = 0.8,
  distance = 60,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: distance }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FromBottom({
  children,
  className,
  delay = 0,
  duration = 0.8,
  distance = 50,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FromTop({
  children,
  className,
  delay = 0,
  duration = 0.8,
  distance = 50,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Stagger container pour animer des enfants un par un */
export function StaggerGroup({
  children,
  className,
  stagger = 0.1,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Enfant de StaggerGroup — vient du bas */
export function StaggerItem({
  children,
  className,
  from = "bottom",
  distance = 40,
}: {
  children: ReactNode;
  className?: string;
  from?: "bottom" | "left" | "right" | "top";
  distance?: number;
}) {
  const offset =
    from === "bottom"
      ? { y: distance, x: 0 }
      : from === "top"
      ? { y: -distance, x: 0 }
      : from === "left"
      ? { y: 0, x: -distance }
      : { y: 0, x: distance };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, ...offset },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Photo avec fade in + scale 1.08 → 1 */
export function PhotoReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.08 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Halo qui "respire" (breathing animation) */
export function BreathingGlow({
  className,
  color = "rgba(216,169,40,0.15)",
  duration = 6,
}: {
  className?: string;
  color?: string;
  duration?: number;
}) {
  return (
    <motion.div
      animate={{
        opacity: [0.4, 0.8, 0.4],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
      style={{ background: color }}
    />
  );
}

/** Icône qui flotte lentement */
export function FloatingIcon({
  children,
  className,
  duration = 6,
  delay = 0,
  amplitude = 10,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  amplitude?: number;
}) {
  return (
    <motion.div
      animate={{
        y: [0, -amplitude, 0],
        x: [0, amplitude * 0.3, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
