"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { motionValue, MotionValue } from "framer-motion";

type ScrollContextType = {
  velocity: MotionValue<number>;
  scrollY: MotionValue<number>;
  velocityNorm: MotionValue<number>;
};

const _defaultVelocity = motionValue(0);
const _defaultScrollY = motionValue(0);
const _defaultVelocityNorm = motionValue(0);

const ScrollCtx = createContext<ScrollContextType>({
  velocity: _defaultVelocity,
  scrollY: _defaultScrollY,
  velocityNorm: _defaultVelocityNorm,
});

export function useSmoothScroll() {
  return useContext(ScrollCtx);
}

// Export global pour que d'autres composants puissent vérifier
export const isLowPerfDevice = () => {
  if (typeof window === "undefined") return false;
  const cores = (navigator as Navigator & { hardwareConcurrency?: number }).hardwareConcurrency || 8;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 8;
  return cores <= 4 || memory <= 4;
};

const lerp = (a: number, b: number, n: number) => a + (b - a) * n;
const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

/**
 * SmoothScrollProvider — Scroll fluide, stable et cinématique.
 *
 * Optimisations :
 * - Désactivé sur mobile/touch (scroll natif plus performant)
 * - RAF démarré uniquement quand on scroll (pas en continu)
 * - Lerp adaptatif : facteur dynamique selon la distance à la cible
 * - Delta accumulation : les wheel events s'accumulent dans le RAF
 * - Anti-jitter : snap à 1px + arrêt du RAF quand idle
 * - will-change: scroll-position pour optimisation GPU
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const targetY = useRef(0);
  const currentY = useRef(0);
  const raf = useRef(0);
  const deltaAccumulator = useRef(0);
  const isAnimating = useRef(false);

  const velocityMV = motionValue(0);
  const scrollYMV = motionValue(0);
  const velocityNormMV = motionValue(0);

  useEffect(() => {
    // Désactivé sur mobile/touch et prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const prevScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";

    targetY.current = window.scrollY;
    currentY.current = window.scrollY;

    let mode: "idle" | "wheel" | "anchor" | "key" = "idle";
    let modeTimer = 0;
    const setMode = (m: "wheel" | "anchor" | "key") => {
      mode = m;
      window.clearTimeout(modeTimer);
      const duration = m === "anchor" ? 3000 : 150;
      modeTimer = window.setTimeout(() => {
        mode = "idle";
      }, duration);
    };

    const startRAF = () => {
      if (!isAnimating.current) {
        isAnimating.current = true;
        raf.current = requestAnimationFrame(tick);
      }
    };

    // === Intercepte la molette — accumulation ===
    const onWheel = (e: WheelEvent) => {
      if ((e as WheelEvent & { __pinnedClaimed?: boolean }).__pinnedClaimed) {
        return;
      }
      e.preventDefault();

      // Accumuler le delta
      deltaAccumulator.current += e.deltaY;

      setMode("wheel");
      startRAF();
    };

    // === Intercepte le clavier ===
    const onKey = (e: KeyboardEvent) => {
      let delta = 0;
      const vh = window.innerHeight;
      switch (e.key) {
        case "PageDown":
        case " ":
          if (e.shiftKey) return;
          delta = vh * 0.9;
          break;
        case "PageUp":
          delta = -vh * 0.9;
          break;
        case "ArrowDown":
          delta = 100;
          break;
        case "ArrowUp":
          delta = -100;
          break;
        case "Home":
          delta = -window.scrollY;
          break;
        case "End":
          delta = document.documentElement.scrollHeight - window.scrollY;
          break;
        default:
          return;
      }
      e.preventDefault();
      setMode("key");
      const maxY = document.documentElement.scrollHeight - window.innerHeight;
      targetY.current = clamp(targetY.current + delta, 0, maxY);
      startRAF();
    };

    // === Intercepte les clics sur ancres ===
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href) as HTMLElement | null;
      if (!el) return;
      e.preventDefault();
      setMode("anchor");
      const rect = el.getBoundingClientRect();
      const offset = 70;
      targetY.current = window.scrollY + rect.top - offset;
      startRAF();
    };

    // === Boucle d'animation — lerp adaptatif + anti-jitter ===
    const tick = () => {
      // Navigation animée (navbar) : on laisse faire
      const navScrolling = (window as unknown as { __navScrolling?: boolean }).__navScrolling;
      if (navScrolling) {
        currentY.current = window.scrollY;
        targetY.current = window.scrollY;
        deltaAccumulator.current = 0;
        isAnimating.current = false;
        raf.current = 0;
        return;
      }

      // Appliquer les deltas accumulés
      if (mode === "wheel" && Math.abs(deltaAccumulator.current) > 0.1) {
        const maxY = document.documentElement.scrollHeight - window.innerHeight;
        targetY.current = clamp(targetY.current + deltaAccumulator.current, 0, maxY);
        deltaAccumulator.current = 0;
      }

      // Sync en mode idle
      if (mode === "idle") {
        targetY.current = window.scrollY;
      }

      const prev = currentY.current;
      const remaining = Math.abs(targetY.current - currentY.current);

      // === Lerp adaptatif ===
      // Grandes distances → facteur élevé (réactif)
      // Faibles distances → facteur réduit (doux, cinématique)
      let lerpFactor: number;
      if (remaining > 300) {
        lerpFactor = 0.16; // Rapide
      } else if (remaining > 100) {
        lerpFactor = 0.13; // Normal
      } else if (remaining > 20) {
        lerpFactor = 0.10; // Ralentissement
      } else if (remaining > 2) {
        lerpFactor = 0.08; // Très doux
      } else {
        // Snap — cible atteinte
        currentY.current = targetY.current;
        if (mode !== "idle") {
          mode = "idle";
          window.clearTimeout(modeTimer);
        }
        velocityMV.set(0);
        velocityNormMV.set(0);
        isAnimating.current = false;
        raf.current = 0;
        return; // Arrête le RAF (économie CPU)
      }

      currentY.current = lerp(currentY.current, targetY.current, lerpFactor);

      const v = currentY.current - prev;
      velocityMV.set(v);
      scrollYMV.set(currentY.current);
      velocityNormMV.set(Math.min(Math.abs(v) / 35, 1));

      // Appliquer le scrollTo uniquement si mouvement significatif
      if (Math.abs(v) > 0.05) {
        window.scrollTo(0, currentY.current);
      }

      raf.current = requestAnimationFrame(tick);
    };

    // === Sync au scroll natif (scrollbar, touchpad) ===
    const onNativeScroll = () => {
      if (mode === "idle" && !isAnimating.current) {
        targetY.current = window.scrollY;
        currentY.current = window.scrollY;
      }
    };

    // === Écouteurs ===
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    window.addEventListener("scroll", onNativeScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onNativeScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
      document.documentElement.style.scrollBehavior = prevScrollBehavior;
      window.clearTimeout(modeTimer);
      isAnimating.current = false;
      raf.current = 0;
    };
  }, [velocityMV, scrollYMV, velocityNormMV]);

  return (
    <ScrollCtx.Provider
      value={{ velocity: velocityMV, scrollY: scrollYMV, velocityNorm: velocityNormMV }}
    >
      {children}
    </ScrollCtx.Provider>
  );
}
