"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./reveal";

const STATS = [
  { value: 2500, suffix: "+", label: "Projets livrés", sub: "Depuis 2012" },
  { value: 18, suffix: " MWc", label: "Puissance installée", sub: "Cumulée" },
  { value: 25, suffix: " ans", label: "Garantie maximale", sub: "Sur équipements" },
  { value: 48, suffix: "h", label: "Délai d'intervention", sub: "Sur le terrain" },
];

const PARTNERS = [
  "Canadian Solar",
  "Huawei",
  "Victron Energy",
  "Jinko Solar",
  "BYD Battery",
  "Schneider Electric",
  "Fronius",
  "SMA Solar",
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
    const duration = 2200;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // Easing élastique pour un effet premium
      const eased = 1 - Math.pow(1 - p, 4);
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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yPattern = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={ref}
      className="relative bg-[#0d3b2e] text-white py-16 md:py-24 overflow-hidden"
    >
      {/* Motif géométrique animé en fond */}
      <motion.div
        style={{ y: yPattern }}
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(30deg, transparent 48%, #f5b91a 49%, #f5b91a 51%, transparent 52%)",
            backgroundSize: "60px 100px",
          }}
        />
      </motion.div>

      {/* Halo */}
      <div className="absolute top-0 left-1/3 w-[40vw] h-[40vw] rounded-full bg-[#f5b91a]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={0.1 * i}>
              <div className="relative group">
                <span className="block font-display font-semibold tracking-tighter text-[clamp(3rem,6vw,5.5rem)] leading-none bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent group-hover:from-[#f5b91a] group-hover:to-[#ffd95c] transition-all duration-500">
                  <Counter value={s.value} suffix={s.suffix} />
                </span>
                <div className="mt-3 h-px w-12 bg-[#f5b91a] group-hover:w-20 transition-all duration-500" />
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
      </div>

      {/* Marquee partenaires infini */}
      <div className="relative mt-14 pt-8 border-t border-white/10">
        <div className="text-center mb-6">
          <span className="text-xs tracking-[0.25em] uppercase text-white/40 font-display">
            Équipements certifiés & partenaires internationaux
          </span>
        </div>
        <div className="relative overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex gap-16 animate-marquee whitespace-nowrap will-change-transform">
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <span
                key={i}
                className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-white/40 hover:text-[#f5b91a] transition-colors cursor-default"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
