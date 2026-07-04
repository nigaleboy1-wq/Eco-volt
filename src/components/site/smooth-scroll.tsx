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
  /** Vélocité instantanée du scroll en pixels/frame (positif = vers le bas) */
  velocity: MotionValue<number>;
  /** Position Y actuelle du scroll (interpolée) */
  scrollY: MotionValue<number>;
  /** Vélocité normalisée 0→1 (absolue, plafonnée) pour usage facile */
  velocityNorm: MotionValue<number>;
};

// Valeurs par défaut (module-level pour stabilité)
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

const lerp = (a: number, b: number, n: number) => a + (b - a) * n;
const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const targetY = useRef(0);
  const currentY = useRef(0);
  const raf = useRef(0);

  // MotionValues stables pour exposer la vélocité sans re-renders
  const velocityMV = motionValue(0);
  const scrollYMV = motionValue(0);
  const velocityNormMV = motionValue(0);

  useEffect(() => {
    // Désactivé sur mobile/touch et si l'utilisateur préfère réduire le mouvement
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Override du scroll-behavior: smooth CSS (sinon conflit)
    const prevScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";

    targetY.current = window.scrollY;
    currentY.current = window.scrollY;

    let mode: "idle" | "wheel" | "anchor" | "key" = "idle";
    let modeTimer = 0;
    const setMode = (m: "wheel" | "anchor" | "key") => {
      mode = m;
      window.clearTimeout(modeTimer);
      // Pour les ancres, on garde le mode actif plus longtemps (le lerp prend du temps)
      // Le mode repassera à idle automatiquement quand la cible sera atteinte
      const duration = m === "anchor" ? 3000 : 200;
      modeTimer = window.setTimeout(() => {
        mode = "idle";
      }, duration);
    };

    // === Intercepte la molette ===
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setMode("wheel");
      // Multiplicateur pour un scroll un peu plus réactif
      const delta = e.deltaY * 1.15;
      const maxY =
        document.documentElement.scrollHeight - window.innerHeight;
      targetY.current = clamp(targetY.current + delta, 0, maxY);
    };

    // === Intercepte le clavier (navigation accessible) ===
    const onKey = (e: KeyboardEvent) => {
      let delta = 0;
      const vh = window.innerHeight;
      switch (e.key) {
        case "PageDown":
        case " ":
          if (e.shiftKey) return; // Shift+Space = vers le haut
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
          delta =
            document.documentElement.scrollHeight - window.scrollY;
          break;
        default:
          return;
      }
      e.preventDefault();
      setMode("key");
      const maxY =
        document.documentElement.scrollHeight - window.innerHeight;
      targetY.current = clamp(targetY.current + delta, 0, maxY);
    };

    // === Intercepte les clics sur ancres (#section) ===
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href) as HTMLElement | null;
      if (!el) return;
      e.preventDefault();
      setMode("anchor");
      // Offset pour la navbar fixe (~80px)
      const rect = el.getBoundingClientRect();
      const offset = 70;
      targetY.current = window.scrollY + rect.top - offset;
    };

    // === Boucle d'animation principale ===
    const tick = () => {
      // Quand on est idle (scrollbar drag, touch, etc.), on sync la cible
      if (mode === "idle") {
        targetY.current = window.scrollY;
      }

      const prev = currentY.current;
      // Lerp doux — 0.1 = premium et fluide, ni trop lent ni trop rapide
      currentY.current = lerp(currentY.current, targetY.current, 0.1);

      // Snap quand on est assez proche pour éviter les calculs inutiles
      if (Math.abs(currentY.current - targetY.current) < 0.5) {
        currentY.current = targetY.current;
        // Si on était en mode anchor/key, on repasse à idle (cible atteinte)
        if (mode === "anchor" || mode === "key") {
          mode = "idle";
          window.clearTimeout(modeTimer);
        }
      }

      const v = currentY.current - prev;
      velocityMV.set(v);
      scrollYMV.set(currentY.current);
      // Vélocité normalisée: |v| / 35 plafonnée à 1
      velocityNormMV.set(Math.min(Math.abs(v) / 35, 1));

      // N'applique le scrollTo que s'il y a du mouvement réel
      if (Math.abs(currentY.current - prev) > 0.1) {
        window.scrollTo(0, currentY.current);
      }

      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf.current);
      document.documentElement.style.scrollBehavior = prevScrollBehavior;
      window.clearTimeout(modeTimer);
    };
  }, [velocityMV, scrollYMV, velocityNormMV]);

  return (
    <ScrollCtx.Provider
      value={{
        velocity: velocityMV,
        scrollY: scrollYMV,
        velocityNorm: velocityNormMV,
      }}
    >
      {children}
    </ScrollCtx.Provider>
  );
}
