"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  ShieldCheck,
  Sparkles,
  Leaf,
  Users,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Professionnalisme",
    desc: "Ingénieurs certifiés, méthodologie éprouvée, engagement total sur chaque chantier.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    desc: "Équipements internationaux de pointe, sélectionnés pour fiabilité et longévité.",
  },
  {
    icon: Leaf,
    title: "Durabilité",
    desc: "Solutions propres, pensées pour durer et réduire votre empreinte carbone.",
  },
  {
    icon: Users,
    title: "Proximité",
    desc: "Équipe humaine et accessible, qui vous accompagne bien au-delà de l'installation.",
  },
];

const STATS = [
  { value: 2018, label: "Création" },
  { value: 2500, prefix: "+", label: "Projets" },
  { value: 98, suffix: "%", label: "Satisfaits" },
  { value: 15, prefix: "+", label: "Experts" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ backgroundColor: "#F8F7F2" }}
    >
      {/* Décor de fond */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-40 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(216,169,40,0.15) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(14,59,46,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
        {/* === EN-TÊTE === */}
        <div className="text-center mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="w-8 h-px bg-[#D8A928]" />
            <span className="text-xs font-display font-semibold tracking-[0.3em] uppercase text-[#0E3B2E]">
              À propos d'EcoVolt
            </span>
            <span className="w-8 h-px bg-[#D8A928]" />
          </motion.div>

          <h2
            className="font-display font-bold tracking-[-0.035em] leading-[1.1] text-[#132C25] text-balance mx-auto"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", maxWidth: "800px" }}
          >
            <RevealLine text="Construire l'avenir énergétique" delay={0.1} />
            <RevealLine text="du Burkina Faso grâce à" delay={0.18} />
            <RevealLine
              text="l'énergie solaire."
              delay={0.26}
              className="italic font-light"
              highlight="#D8A928"
            />
          </h2>
        </div>

        {/* === LAYOUT 2 COLONNES === */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* COLONNE GAUCHE : Image + badges */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative"
          >
            {/* Glow derrière l'image */}
            <div
              className="absolute -inset-4 rounded-[32px] pointer-events-none"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(216,169,40,0.15) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />

            {/* Image principale */}
            <div
              className="relative overflow-hidden"
              style={{
                aspectRatio: "4 / 5",
                borderRadius: "20px",
                boxShadow: "0 24px 64px -16px rgba(14,59,46,0.3), 0 8px 24px -6px rgba(14,59,46,0.15)",
              }}
            >
              <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: "url('https://sfile.chatglm.cn/images-ppt/61a3c59c2370.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E3B2E]/20 to-transparent" />
            </div>

            {/* Badge flottant +2500 (haut-droite) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
              className="absolute -top-5 -right-5 bg-[#0E3B2E] text-white rounded-2xl p-4 shadow-2xl shadow-[#0E3B2E]/30 w-40 text-center z-20"
            >
              <CountUp
                value={2500}
                prefix="+"
                className="block font-display font-bold text-2xl text-[#D8A928] leading-tight"
              />
              <div className="text-[0.65rem] text-white/75 mt-1 font-body uppercase tracking-wider">
                Projets livrés
              </div>
            </motion.div>

            {/* Badge flottant 98% (bas-gauche) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.65, duration: 0.6, ease: EASE }}
              className="absolute -bottom-5 -left-5 bg-white text-[#132C25] rounded-2xl p-4 shadow-2xl shadow-[#0E3B2E]/15 w-40 text-center border border-[#0E3B2E]/8 z-20"
            >
              <CountUp
                value={98}
                suffix="%"
                className="block font-display font-bold text-2xl text-[#0E3B2E] leading-tight"
              />
              <div className="text-[0.65rem] text-[#0E3B2E]/60 mt-1 font-body uppercase tracking-wider">
                Clients satisfaits
              </div>
            </motion.div>
          </motion.div>

          {/* COLONNE DROITE : Contenu */}
          <div className="text-left">
            {/* Paragraphes */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            >
              <p className="text-base md:text-lg text-[#0E3B2E]/70 font-body leading-relaxed text-pretty mb-4">
                Basée à Ouagadougou, EcoVolt Solutions accompagne les
                particuliers, entreprises et institutions du Burkina Faso et des
                pays voisins dans leur transition vers une énergie propre, fiable
                et économique.
              </p>
              <p className="text-base md:text-lg text-[#0E3B2E]/70 font-body leading-relaxed text-pretty mb-8">
                Chaque projet commence par une écoute attentive, se construit
                avec des ingénieurs certifiés et s'achève par un accompagnement à
                long terme. Une installation solaire n'est pas un produit, c'est
                un partenariat de plusieurs décennies.
              </p>
            </motion.div>

            {/* Cartes valeurs 2x2 */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease: EASE }}
                  whileHover={{ y: -4 }}
                  className="group bg-white rounded-2xl p-4 border border-[#0E3B2E]/10"
                  style={{ boxShadow: "0 4px 16px -6px rgba(14,59,46,0.06)" }}
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-10 h-10 rounded-lg bg-[#0E3B2E] grid place-items-center shrink-0 group-hover:bg-[#D8A928] transition-colors duration-300">
                      <v.icon className="w-4 h-4 text-[#D8A928] group-hover:text-[#0E3B2E] transition-colors duration-300" />
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#0E3B2E]/30 group-hover:text-[#D8A928] transition-colors duration-300 ml-auto" />
                  </div>
                  <h3 className="font-display text-sm font-semibold text-[#132C25] tracking-tight mb-1">
                    {v.title}
                  </h3>
                  <p className="text-xs text-[#0E3B2E]/60 font-body leading-relaxed">
                    {v.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Stats strip + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              {/* Stats compact */}
              <div className="flex items-center gap-4 bg-white rounded-2xl px-5 py-3 shadow-lg shadow-[#0E3B2E]/8 border border-[#0E3B2E]/6">
                {STATS.map((s, i) => (
                  <div
                    key={i}
                    className={`text-center ${
                      i < STATS.length - 1 ? "border-r border-[#0E3B2E]/10 pr-4" : ""
                    }`}
                  >
                    <CountUp
                      value={s.value}
                      prefix={s.prefix}
                      suffix={s.suffix}
                      className="block font-display font-bold text-base text-[#0E3B2E] leading-tight"
                    />
                    <div className="text-[0.55rem] text-[#0E3B2E]/55 font-body uppercase tracking-wider mt-0.5">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#0E3B2E] text-white text-sm font-display font-semibold shadow-lg shadow-[#0E3B2E]/20 transition-all duration-300"
              >
                Découvrir notre histoire
                <span className="grid place-items-center w-5 h-5 rounded-full bg-[#D8A928] text-[#0E3B2E]">
                  <ArrowRight className="w-3 h-3" />
                </span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// === Sous-composants ===

function CountUp({
  value,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1800;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplay(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("fr-FR")}
      {suffix}
    </span>
  );
}

function RevealLine({
  text,
  delay = 0,
  className,
  highlight,
}: {
  text: string;
  delay?: number;
  className?: string;
  highlight?: string;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "110%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, delay, ease: EASE }}
        className={`block ${className ?? ""}`}
        style={highlight ? { color: highlight } : undefined}
      >
        {text}
      </motion.span>
    </span>
  );
}
