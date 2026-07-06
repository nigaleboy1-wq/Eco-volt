"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useIsLowPerf } from "./use-perf";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#0E3B2E] via-[#D8A928] to-[#0E3B2E]"
    />
  );
}

export function CursorGlow() {
  const isLowPerf = useIsLowPerf();
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Désactivé sur mobile/touch et appareils modestes
    if (isLowPerf) return;

    let rafId = 0;
    let lastX = 0;
    let lastY = 0;

    const move = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          setPos({ x: lastX, y: lastY });
          setVisible(true);
          rafId = 0;
        });
      }
    };

    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isLowPerf]);

  if (isLowPerf || !visible) return null;

  return (
    <motion.div
      animate={{
        opacity: visible ? 1 : 0,
        x: pos.x - 200,
        y: pos.y - 200,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 30, mass: 0.5 }}
      className="pointer-events-none fixed top-0 left-0 z-[65] w-[400px] h-[400px] rounded-full opacity-0 hidden md:block"
      style={{
        background: "radial-gradient(circle, rgba(245,185,26,0.06) 0%, rgba(245,185,26,0) 70%)",
      }}
    />
  );
}
