"use client";

import { useState, useEffect } from "react";

/**
 * Détecte si l'appareil est "modeste" (peu de cœurs CPU ou peu de RAM).
 * Utilisé pour désactiver les effets lourds (CursorGlow, 3D tilt, parallaxe vélocité).
 */
export function useIsLowPerf() {
  const [isLowPerf, setIsLowPerf] = useState(false);

  useEffect(() => {
    const check = () => {
      const cores = (navigator as Navigator & { hardwareConcurrency?: number }).hardwareConcurrency || 8;
      const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 8;
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      setIsLowPerf(cores <= 4 || memory <= 4 || isTouch);
    };
    check();
  }, []);

  return isLowPerf;
}
