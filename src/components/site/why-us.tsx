"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { FromLeft, FromRight, FromBottom, StaggerGroup, StaggerItem } from "./scroll-anim";
import {
  Award,
  Boxes,
  ShieldCheck,
  Timer,
  Headset,
  SlidersHorizontal,
  Infinity as InfinityIcon,
  ArrowUpRight,
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
      className="relative bg-[#0E3B2E] text-white py-20 md:py-28 overflow-hidden"
    >
      {/* Halo solaire */}
      <div className="absolute top-1/4 -left-32 w-[40vw] h-[40vw] rounded-full bg-[#0E3B2E] blur-[120px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[35vw] h-[35vw] rounded-full bg-[#D8A928]/10 blur-[120px] pointer-events-none" />

      {/* Bandeau défilant infini */}
      <motion.div
        style={{ x: xMarquee }}
        className="absolute top-10 left-0 right-0 flex gap-12 whitespace-nowrap opacity-[0.04] pointer-events-none select-none"
      >
        {[...Array(2)].map((_, k) => (
          <span key={k} className="font-display text-[14rem] font-semibold tracking-tighter">
            Confiance · Expertise · Solaire · EcoVolt ·
          </span>
        ))}
      </motion.div>

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
        {/* En-tête avec animations de mise en page */}
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <FromRight distance={40}>
              <div className="flex items-center gap-4 mb-5">
                <span className="w-10 h-px bg-[#D8A928]" />
                <span className="text-xs font-display font-semibold tracking-[0.3em] uppercase text-white/60">
                  Pourquoi EcoVolt
                </span>
              </div>
            </FromRight>

            <h2 className="font-display font-bold tracking-[-0.035em] leading-[1.05] text-[clamp(1.75rem,4vw,3.25rem)] text-balance">
              <RevealLine text="Huit raisons de nous" delay={0.15} />
              <RevealLine text="confier votre projet." delay={0.25} className="italic font-light text-[#D8A928]" />
            </h2>
          </div>
          <div className="lg:col-span-5">
            <FromBottom delay={0.3}>
              <p className="text-base md:text-lg text-white/70 font-body leading-relaxed text-pretty">
                Nous ne livrons pas simplement des panneaux. Nous livrons une
                promesse — celle d'une énergie fiable, durablement maîtrisée et
                accompagnée par des experts accessibles, année après année.
              </p>
            </FromBottom>
          </div>
        </div>

        {/* Grille bento avec stagger animation */}
        <StaggerGroup stagger={0.1} delay={0.4} className="grid md:grid-cols-3 gap-4">
          {POINTS.map((p) => (
            <StaggerItem key={p.title} from="bottom" distance={30} className={p.span}>
              <WhyUsCard point={p} index={POINTS.indexOf(p)} />
            </StaggerItem>
          ))}

          {/* Carte finale CTA */}
          <StaggerItem from="bottom" distance={30} delay={0.2} className="md:col-span-3">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative overflow-hidden rounded-3xl bg-[#D8A928] text-[#0E3B2E] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/20 blur-2xl" />
              <div className="relative">
                <InfinityIcon className="w-7 h-7 mb-3" />
                <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
                  Un accompagnement à long terme
                </h3>
                <p className="mt-2 text-sm md:text-base text-[#0E3B2E]/80 font-body max-w-xl">
                  Au-delà de l'installation, nous restons à vos côtés pendant
                  toute la durée de vie de votre système. C'est ça, la signature
                  EcoVolt.
                </p>
              </div>
              <a
                href="#contact"
                className="relative inline-flex items-center gap-2 bg-[#0E3B2E] text-white rounded-full px-6 py-3 font-display font-semibold text-sm hover:bg-[#07241c] transition-colors"
              >
                Démarrer mon projet
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>
          </StaggerItem>
        </StaggerGroup>
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
      <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-[#D8A928]/0 group-hover:bg-[#D8A928]/10 blur-[80px] transition-all duration-700" />
      <div className="relative flex items-start justify-between" style={{ transform: "translateZ(30px)" }}>
        <motion.div
          style={{ x: iconX, y: iconY, transform: "translateZ(20px)" }}
          className="w-12 h-12 rounded-2xl bg-[#D8A928]/15 grid place-items-center group-hover:bg-[#D8A928] transition-colors duration-500"
        >
          <point.icon className="w-5 h-5 text-[#D8A928] group-hover:text-[#0E3B2E] transition-colors duration-500" />
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

/** Révélation ligne par ligne */
function RevealLine({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "110%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        className={`block ${className ?? ""}`}
      >
        {text}
      </motion.span>
    </span>
  );
}
