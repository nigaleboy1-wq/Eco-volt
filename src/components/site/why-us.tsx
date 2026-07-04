"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Reveal, RevealHeadline } from "./reveal";
import {
  Award,
  Users,
  Boxes,
  ShieldCheck,
  Timer,
  Headset,
  SlidersHorizontal,
  Infinity as InfinityIcon,
} from "lucide-react";

const POINTS = [
  {
    icon: Award,
    title: "Ingénieurs certifiés",
    desc: "Une équipe technique formée aux standards internationaux, habilitée à intervenir sur tous types d'installations.",
    span: "md:col-span-2",
  },
  {
    icon: Boxes,
    title: "Équipements premium",
    desc: "Du matériel international de qualité, sélectionné pour sa résistance au climat ouest-africain.",
    span: "",
  },
  {
    icon: ShieldCheck,
    title: "Jusqu'à 25 ans de garantie",
    desc: "Des garanties constructeur étendues, sécurisées par notre accompagnement local.",
    span: "",
  },
  {
    icon: Timer,
    title: "Installation rapide",
    desc: "Des chantiers organisés au cordeau, respectant les délais annoncés sans compromis sur la qualité.",
    span: "",
  },
  {
    icon: Headset,
    title: "Service réactif",
    desc: "Une équipe support joignable, des interventions planifiées et un suivi transparent.",
    span: "",
  },
  {
    icon: SlidersHorizontal,
    title: "Solutions sur mesure",
    desc: "Chaque installation est conçue pour vos usages réels, vos contraintes et votre budget.",
    span: "md:col-span-2",
  },
];

export function WhyUs() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const xMarquee = useTransform(scrollYProgress, [0, 1], ["-15%", "-50%"]);

  return (
    <section
      id="trust"
      ref={ref}
      className="relative bg-[#07241c] text-white py-14 md:py-20 overflow-hidden"
    >
      {/* Halo solaire */}
      <div className="absolute top-1/4 -left-32 w-[40vw] h-[40vw] rounded-full bg-[#0d3b2e] blur-[120px] opacity-60" />
      <div className="absolute bottom-0 right-0 w-[35vw] h-[35vw] rounded-full bg-[#f5b91a]/10 blur-[120px]" />

      {/* Bandeau défilant infini */}
      <motion.div
        style={{ x: xMarquee }}
        className="absolute top-10 left-0 right-0 flex gap-12 whitespace-nowrap opacity-[0.04] pointer-events-none select-none"
      >
        {[...Array(2)].map((_, k) => (
          <span
            key={k}
            className="font-display text-[14rem] font-semibold tracking-tighter"
          >
            Confiance · Expertise · Solaire · EcoVolt ·
          </span>
        ))}
      </motion.div>

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="section-label text-white/60">
                <span className="w-8 h-px bg-[#f5b91a]" />
                Pourquoi EcoVolt
              </span>
            </Reveal>
            <h2 className="mt-6 font-display font-semibold tracking-[-0.03em] leading-[1.02] text-[clamp(2rem,4.5vw,3.6rem)] text-balance">
              <RevealHeadline text="Huit raisons de nous" />{" "}
              <RevealHeadline text="confier votre projet." delay={0.1} />
            </h2>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <p className="text-base md:text-lg text-white/70 font-body leading-relaxed text-pretty">
                Nous ne livrons pas simplement des panneaux. Nous livrons une
                promesse — celle d'une énergie fiable, durablement maîtrisée et
                accompagnée par des experts accessibles, année après année.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Grille bento des points forts */}
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {POINTS.map((p, i) => (
            <Reveal key={p.title} delay={0.05 * i} className={p.span}>
              <WhyUsCard point={p} index={i} />
            </Reveal>
          ))}

          {/* Carte finale CTA */}
          <Reveal delay={0.4} className="md:col-span-3">
            <div className="relative overflow-hidden rounded-3xl bg-[#f5b91a] text-[#07241c] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/20 blur-2xl" />
              <div className="relative">
                <InfinityIcon className="w-7 h-7 mb-3" />
                <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
                  Un accompagnement à long terme
                </h3>
                <p className="mt-2 text-sm md:text-base text-[#07241c]/80 font-body max-w-xl">
                  Au-delà de l'installation, nous restons à vos côtés pendant
                  toute la durée de vie de votre système. C'est ça, la signature
                  EcoVolt.
                </p>
              </div>
              <a
                href="#contact"
                className="relative inline-flex items-center gap-2 bg-[#07241c] text-white rounded-full px-6 py-3 font-display font-semibold text-sm hover:bg-[#0d3b2e] transition-colors"
              >
                Démarrer mon projet
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function WhyUsCard({ point, index }: { point: (typeof POINTS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 25 });

  // L'icône se déplace en profondeur au survol
  const iconX = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
  const iconY = useTransform(mouseY, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      className="group relative h-full glass rounded-3xl p-6 hover:bg-white/[0.08] transition-colors duration-500 overflow-hidden"
    >
      {/* Halo qui apparaît au hover */}
      <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-[#f5b91a]/0 group-hover:bg-[#f5b91a]/10 blur-[80px] transition-all duration-700" />
      <div className="relative flex items-start justify-between" style={{ transform: "translateZ(30px)" }}>
        <motion.div
          style={{ x: iconX, y: iconY, transform: "translateZ(20px)" }}
          className="w-12 h-12 rounded-2xl bg-[#f5b91a]/15 grid place-items-center group-hover:bg-[#f5b91a] transition-colors duration-500"
        >
          <point.icon className="w-5 h-5 text-[#f5b91a] group-hover:text-[#07241c] transition-colors duration-500" />
        </motion.div>
        <span className="font-display text-xs text-white/30 tracking-widest">
          0{index + 1}
        </span>
      </div>
      <h3 className="relative mt-6 font-display text-xl font-semibold tracking-tight" style={{ transform: "translateZ(25px)" }}>
        {point.title}
      </h3>
      <p className="relative mt-2.5 text-sm text-white/65 font-body leading-relaxed" style={{ transform: "translateZ(15px)" }}>
        {point.desc}
      </p>
    </motion.div>
  );
}
