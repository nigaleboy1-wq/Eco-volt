"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

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
      className="fixed top-0 left-0 right-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#0d3b2e] via-[#f5b91a] to-[#0d3b2e]"
    />
  );
}

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Désactivé sur mobile/touch
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

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
        background:
          "radial-gradient(circle, rgba(245,185,26,0.08) 0%, rgba(245,185,26,0) 70%)",
      }}
    />
  );
}
