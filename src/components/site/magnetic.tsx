"use client";

import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "div" | "a" | "button";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export function Magnetic({
  children,
  className = "",
  strength = 0.35,
  as = "div",
  href,
  onClick,
  type,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setOffset({ x: x * strength, y: y * strength });
  };

  const reset = () => setOffset({ x: 0, y: 0 });

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref as never}
      href={href as never}
      type={type as never}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 250, damping: 18, mass: 0.4 }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
