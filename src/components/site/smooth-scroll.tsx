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

/**
 * SmoothScrollProvider — Version native stable (anti-jitter).
 *
 * Au lieu d'intercepter les wheel events et de faire un lerp manuel
 * (qui cause du jitter/tremblement), on laisse le navigateur gérer
 * le scroll nativement. On expose juste la vélocité pour les animations.
 *
 * Avantages :
 * - Zéro jitter (scroll natif du navigateur)
 * - Performance maximale (pas de RAF en boucle)
 * - Compatible tous appareils (mobile, desktop, appareils modestes)
 * - Respecte les préférences système (trackpad momentum, etc.)
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const velocityMV = motionValue(0);
  const scrollYMV = motionValue(0);
  const velocityNormMV = motionValue(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let rafId = 0;

    const onScroll = () => {
      // Annuler le RAF précédent (throttle à 1 par frame)
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY;

        velocityMV.set(delta);
        scrollYMV.set(currentY);
        velocityNormMV.set(Math.min(Math.abs(delta) / 30, 1));

        lastScrollY = currentY;
        rafId = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
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
