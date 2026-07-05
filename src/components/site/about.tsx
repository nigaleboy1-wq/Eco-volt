"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  FromLeft,
  FromRight,
  FromBottom,
  StaggerGroup,
  StaggerItem,
  PhotoReveal,
  BreathingGlow,
  FloatingIcon,
} from "./scroll-anim";
import {
  ShieldCheck,
  Sparkles,
  Leaf,
  Users,
  Sun,
  Battery,
  Zap,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

// === Données ===
const VALUES = [
  {
    icon: ShieldCheck,
    title: "Professionnalisme",
    desc: "Ingénieurs certifiés, méthodologie éprouvée, engagement total sur chaque chantier.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    desc: "Équipements internationaux de pointe, sélectionnés pour leur fiabilité et longévité.",
  },
  {
    icon: Leaf,
    title: "Durabilité",
    desc: "Solutions énergétiques propres, pensées pour durer et réduire votre empreinte carbone.",
  },
  {
    icon: Users,
    title: "Proximité",
    desc: "Équipe humaine et accessible, qui vous accompagne bien au-delà de l'installation initiale.",
  },
];

// 3 cartes statistiques flottantes — positions exactes selon spec
const FLOATING_STATS = [
  {
    value: 2500,
    prefix: "+",
    label: "Projets livrés",
    color: "dark" as const,
    // Top-left corner, -30px from left, 180px from top
    style: { top: "180px", left: "-30px" },
  },
  {
    value: 98,
    suffix: "%",
    label: "Clients satisfaits",
    color: "light" as const,
    // Middle-left, -20px, 360px from top
    style: { top: "360px", left: "-20px" },
  },
  {
    value: 15,
    prefix: "+",
    label: "Ingénieurs certifiés",
    color: "light" as const,
    // Bottom-right, 40px outside image
    style: { bottom: "40px", right: "-40px" },
  },
];

// 6 icônes décoratives — positions obligatoires
const DECORATIVE_ICONS = [
  { icon: Sun, top: "-20px", left: "-30px", size: 28, delay: 0, duration: 7 },
  { icon: Leaf, bottom: "-15px", left: "-25px", size: 26, delay: 1.5, duration: 6.5 },
  { icon: Zap, top: "45%", right: "-30px", size: 26, delay: 0.8, duration: 7.5 }, // Solar panel middle-right
  { icon: Battery, bottom: "20%", left: "-35px", size: 24, delay: 2.2, duration: 6.8 }, // Lower-left
  { icon: Users, top: "150px", left: "180px", size: 22, delay: 1, duration: 7.2 }, // Near first stat card
  { icon: ShieldCheck, bottom: "60px", right: "-20px", size: 22, delay: 3, duration: 6.6 }, // Near bottom stat card
];

// Stats en ligne (4 colonnes égales)
const INLINE_STATS = [
  { value: 2018, label: "Création" },
  { value: 2500, prefix: "+", label: "Projets" },
  { value: 98, suffix: "%", label: "Satisfaits" },
  { value: 15, prefix: "+", label: "Experts" },
];

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
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundColor: "#F8F7F2",
        padding: "120px 120px",
      }}
    >
      {/* === DÉCOR DE FOND === */}
      {/* Grand glow jaune flou derrière l'image */}
      <BreathingGlow
        className="absolute pointer-events-none rounded-full blur-[120px]"
        style={{
          top: "10%",
          left: "5%",
          width: "500px",
          height: "500px",
        } as React.CSSProperties}
        color="radial-gradient(circle, rgba(216,169,40,0.22) 0%, transparent 70%)"
        duration={8}
      />
      {/* Grand cercle vert flou derrière le texte */}
      <BreathingGlow
        className="absolute pointer-events-none rounded-full blur-[140px]"
        style={{
          top: "20%",
          right: "0%",
          width: "600px",
          height: "600px",
        } as React.CSSProperties}
        color="radial-gradient(circle, rgba(14,59,46,0.12) 0%, transparent 70%)"
        duration={9}
      />
      {/* Dotted pattern top-right */}
      <div
        className="absolute top-10 right-10 w-64 h-64 pointer-events-none opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle, #0E3B2E 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          maskImage: "radial-gradient(circle, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle, black 0%, transparent 70%)",
        }}
      />
      {/* Lignes organiques courbes derrière l'image */}
      <svg
        className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none opacity-[0.06]"
        viewBox="0 0 600 600"
        fill="none"
      >
        <path
          d="M 100 100 Q 300 50, 500 200 T 400 500"
          stroke="#0E3B2E"
          strokeWidth="1.5"
        />
        <path
          d="M 50 300 Q 200 250, 350 350 T 550 400"
          stroke="#D8A928"
          strokeWidth="1"
        />
      </svg>
      {/* Particules lumineuses */}
      {[
        { top: "15%", left: "45%", size: 4, delay: 0 },
        { top: "60%", left: "35%", size: 3, delay: 1.5 },
        { top: "75%", left: "55%", size: 5, delay: 2.5 },
        { top: "25%", left: "70%", size: 3, delay: 0.8 },
        { top: "85%", left: "40%", size: 4, delay: 3 },
      ].map((p, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.7, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{ duration: 5 + i, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          className="absolute rounded-full bg-[#D8A928] pointer-events-none"
          style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
        />
      ))}

      {/* === CONTENU : 2 colonnes 40/60 === */}
      <div
        className="relative mx-auto w-full flex flex-col lg:flex-row gap-16 lg:gap-20 items-start"
        style={{ maxWidth: "1440px" }}
      >
        {/* === COLONNE GAUCHE : 40% — Photo + cartes flottantes + icônes === */}
        <div className="relative w-full lg:w-[40%] shrink-0">
          <FromLeft distance={80}>
            <div className="relative" style={{ width: "520px", maxWidth: "100%" }}>
              {/* Glow subtil derrière l'image */}
              <div
                className="absolute -inset-6 rounded-[36px] pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(216,169,40,0.15) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              {/* Photo principale */}
              <PhotoReveal className="relative" delay={0}>
                <div
                  className="relative overflow-hidden"
                  style={{
                    width: "520px",
                    maxWidth: "100%",
                    aspectRatio: "4 / 5",
                    borderRadius: "30px",
                    boxShadow:
                      "0 30px 80px -20px rgba(14,59,46,0.35), 0 12px 32px -8px rgba(14,59,46,0.18)",
                  }}
                >
                  <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "url('https://sfile.chatglm.cn/images-ppt/61a3c59c2370.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E3B2E]/25 to-transparent" />
                </div>
              </PhotoReveal>

              {/* === Lignes courbes pointillées reliant les icônes === */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ overflow: "visible" }}
                fill="none"
              >
                <motion.path
                  d="M 0 30 Q 100 60, 50 180"
                  stroke="#0E3B2E"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                  opacity="0.2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                />
                <motion.path
                  d="M 520 250 Q 580 350, 520 450"
                  stroke="#D8A928"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                  opacity="0.25"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 1 }}
                />
                <motion.path
                  d="M 50 450 Q 150 550, 250 500"
                  stroke="#0E3B2E"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                  opacity="0.18"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 1.2 }}
                />
              </svg>

              {/* === 6 Icônes décoratives flottantes === */}
              {DECORATIVE_ICONS.map((item, i) => (
                <FloatingIcon
                  key={i}
                  className="absolute z-30"
                  style={
                    {
                      top: item.top,
                      left: item.left,
                      bottom: item.bottom,
                      right: item.right,
                    } as React.CSSProperties
                  }
                  duration={item.duration}
                  delay={item.delay}
                  amplitude={10}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                    className="grid place-items-center rounded-2xl bg-white/70 backdrop-blur-md border border-[#0E3B2E]/10 shadow-md"
                    style={{ width: item.size + 16, height: item.size + 16 }}
                  >
                    <item.icon
                      className="text-[#0E3B2E]"
                      style={{ width: item.size - 6, height: item.size - 6 }}
                    />
                    {/* Accent doré */}
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#D8A928]" />
                  </motion.div>
                </FloatingIcon>
              ))}

              {/* === 3 Cartes statistiques flottantes — positions exactes === */}
              <StaggerGroup stagger={0.25} delay={0.8}>
                {FLOATING_STATS.map((stat, i) => (
                  <StaggerItem key={i} from="bottom" distance={30}>
                    <FloatingStatCard stat={stat} index={i} />
                  </StaggerItem>
                ))}
              </StaggerGroup>

              {/* === Statistics Strip — 4 colonnes sous l'image === */}
              <FromBottom delay={1.5} className="mt-10">
                <div
                  className="rounded-2xl bg-white p-5 grid grid-cols-4 gap-2"
                  style={{
                    boxShadow: "0 12px 32px -8px rgba(14,59,46,0.1)",
                    border: "1px solid rgba(14,59,46,0.06)",
                  }}
                >
                  {INLINE_STATS.map((s, i) => (
                    <div
                      key={i}
                      className={`text-center ${
                        i < INLINE_STATS.length - 1 ? "border-r border-[#0E3B2E]/8" : ""
                      }`}
                    >
                      <CountUp
                        value={s.value}
                        prefix={s.prefix}
                        suffix={s.suffix}
                        className="block font-display font-bold text-xl text-[#0E3B2E]"
                      />
                      <div className="text-[0.65rem] text-[#0E3B2E]/55 font-body mt-0.5 uppercase tracking-wider">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </FromBottom>
            </div>
          </FromLeft>
        </div>

        {/* === COLONNE DROITE : 60% — Contenu === */}
        <div className="w-full lg:w-[60%] text-left">
          {/* 1. Label */}
          <FromRight distance={40}>
            <div className="flex items-center gap-4 mb-8">
              <span className="w-10 h-px bg-[#D8A928]" />
              <span className="text-xs font-display font-semibold tracking-[0.3em] uppercase text-[#0E3B2E]">
                À propos d'EcoVolt
              </span>
            </div>
          </FromRight>

          {/* 2. Titre principal 72px — reveal line by line */}
          <h2
            className="font-display font-bold tracking-[-0.035em] text-[#132C25] mb-8"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              lineHeight: 1.05,
              maxWidth: "700px",
            }}
          >
            <RevealLine text="Construire l'avenir" delay={0.3} />
            <RevealLine text="énergétique du Burkina" delay={0.4} />
            <RevealLine text="Faso grâce à" delay={0.5} />
            <RevealLine text="l'" delay={0.6} className="inline" />
            <RevealLine
              text="énergie solaire"
              delay={0.65}
              className="inline italic font-light"
              highlight="#D8A928"
            />
            <span>.</span>
          </h2>

          {/* 3. Paragraphe 1 */}
          <FromBottom delay={0.9} className="mb-6">
            <p
              className="text-[#0E3B2E]/70 font-body leading-relaxed text-pretty"
              style={{ maxWidth: "620px", fontSize: "1.0625rem" }}
            >
              Basée à Ouagadougou, EcoVolt Solutions accompagne les particuliers,
              entreprises et institutions du Burkina Faso et des pays voisins
              dans leur transition vers une énergie propre, fiable et économique.
              Nous transformons l'abondance du soleil africain en puissance
              électrique utile, mesurable et durable.
            </p>
          </FromBottom>

          {/* 4. Paragraphe 2 */}
          <FromBottom delay={1} className="mb-10">
            <p
              className="text-[#0E3B2E]/70 font-body leading-relaxed text-pretty"
              style={{ maxWidth: "620px", fontSize: "1.0625rem" }}
            >
              Chaque projet commence par une écoute attentive, se construit avec
              des ingénieurs certifiés et s'achève par un accompagnement à long
              terme. Notre conviction est simple : une installation solaire
              n'est pas un produit, c'est un partenariat de plusieurs décennies.
            </p>
          </FromBottom>

          {/* 5. Cartes valeurs 2x2 — stagger */}
          <StaggerGroup
            stagger={0.12}
            delay={1.2}
            className="grid grid-cols-2 gap-6 mb-10"
          >
            {VALUES.map((v) => (
              <StaggerItem key={v.title} from="bottom" distance={30}>
                <motion.div
                  whileHover={{
                    y: -6,
                    boxShadow: "0 24px 48px -12px rgba(14,59,46,0.2)",
                  }}
                  className="group bg-white rounded-3xl p-6 border border-[#0E3B2E]/8 transition-colors h-full"
                  style={{
                    boxShadow: "0 8px 24px -8px rgba(14,59,46,0.08)",
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0E3B2E] grid place-items-center group-hover:bg-[#D8A928] transition-colors duration-500">
                      <v.icon className="w-6 h-6 text-[#D8A928] group-hover:text-[#0E3B2E] transition-colors duration-500" />
                    </div>
                    <motion.div
                      whileHover={{ rotate: 45, scale: 1.1 }}
                      className="grid place-items-center w-8 h-8 rounded-full bg-[#FFF9EC] text-[#0E3B2E]"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </motion.div>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[#132C25] tracking-tight mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-[#0E3B2E]/60 font-body leading-relaxed">
                    {v.desc}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          {/* 6. CTA Button — fond vert plein */}
          <FromBottom delay={1.8}>
            <motion.a
              href="#projects"
              whileHover={{
                scale: 1.04,
                boxShadow: "0 16px 40px -8px rgba(14,59,46,0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#0E3B2E] text-white text-sm font-display font-semibold shadow-xl shadow-[#0E3B2E]/25 transition-all duration-300"
            >
              Découvrir notre histoire
              <motion.div
                whileHover={{ x: 4 }}
                className="grid place-items-center w-6 h-6 rounded-full bg-[#D8A928] text-[#0E3B2E]"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.div>
            </motion.a>
          </FromBottom>
        </div>
      </div>
    </section>
  );
}

// === Sous-composants ===

/** Carte statistique flottante — taille uniforme, position exacte */
function FloatingStatCard({
  stat,
  index,
}: {
  stat: (typeof FLOATING_STATS)[number];
  index: number;
}) {
  const isDark = stat.color === "dark";
  return (
    <FloatingIcon duration={5 + index} delay={index * 0.5} amplitude={6}>
      <motion.div
        whileHover={{ scale: 1.06, y: -4 }}
        className={`absolute z-20 w-[180px] p-4 rounded-2xl backdrop-blur-md border text-center ${
          isDark
            ? "bg-[#0E3B2E] text-white border-[#0E3B2E]"
            : "bg-white/90 text-[#132C25] border-[#0E3B2E]/10"
        }`}
        style={{
          ...stat.style,
          boxShadow: "0 16px 40px -12px rgba(14,59,46,0.25)",
        }}
      >
        <CountUp
          value={stat.value}
          prefix={stat.prefix}
          suffix={stat.suffix}
          className={`block font-display font-bold text-3xl ${
            isDark ? "text-[#D8A928]" : "text-[#0E3B2E]"
          }`}
        />
        <div
          className={`text-xs mt-1.5 font-body leading-tight uppercase tracking-wider ${
            isDark ? "text-white/75" : "text-[#0E3B2E]/60"
          }`}
        >
          {stat.label}
        </div>
      </motion.div>
    </FloatingIcon>
  );
}

/** Compteur animé (count-up) */
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
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const duration = 2000;
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

/** Révélation ligne par ligne avec highlight optionnel */
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
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        className={`block ${className ?? ""}`}
        style={highlight ? { color: highlight } : undefined}
      >
        {text}
      </motion.span>
    </span>
  );
}
