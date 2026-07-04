"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Reveal } from "./reveal";

const STATS = [
  { value: 2500, suffix: "+", label: "Projets livrés", sub: "Depuis 2012" },
  { value: 18, suffix: " MWc", label: "Puissance installée", sub: "Cumulée" },
  { value: 25, suffix: " ans", label: "Garantie maximale", sub: "Sur équipements" },
  { value: 48, suffix: "h", label: "Délai d'intervention", sub: "Sur le terrain" },
];

function Counter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const duration = 2000;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString("fr-FR")}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative bg-[#0d3b2e] text-white py-20 md:py-28 overflow-hidden">
      {/* Halo */}
      <div className="absolute top-0 left-1/3 w-[40vw] h-[40vw] rounded-full bg-[#f5b91a]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={0.1 * i}>
              <div className="relative">
                <span className="block font-display font-semibold tracking-tighter text-[clamp(3rem,6vw,5.5rem)] leading-none">
                  <Counter value={s.value} suffix={s.suffix} />
                </span>
                <div className="mt-3 h-px w-12 bg-[#f5b91a]" />
                <div className="mt-3 font-display text-base font-semibold">
                  {s.label}
                </div>
                <div className="text-sm text-white/55 font-body mt-0.5">
                  {s.sub}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bande de partenaires */}
        <Reveal delay={0.4}>
          <div className="mt-20 pt-12 border-t border-white/10">
            <div className="text-xs tracking-[0.25em] uppercase text-white/40 font-display text-center mb-8">
              Équipements certifiés & partenaires internationaux
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
              {["Canadian Solar", "Huawei", "Victron Energy", "Jinko", "BYD", "Schneider"].map(
                (p) => (
                  <span
                    key={p}
                    className="font-display text-lg md:text-xl font-semibold tracking-tight"
                  >
                    {p}
                  </span>
                )
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
