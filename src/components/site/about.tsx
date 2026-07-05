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
import { ShieldCheck, Sparkles, Leaf, Users, Sun, Battery, Zap, ArrowRight } from "lucide-react";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Professionnalisme",
    desc: "Des ingénieurs certifiés, une méthodologie éprouvée et un engagement total sur chaque chantier.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    desc: "Des équipements internationaux de pointe, sélectionnés pour leur fiabilité et leur longévité.",
  },
  {
    icon: Leaf,
    title: "Durabilité",
    desc: "Des solutions énergétiques propres, pensées pour durer et réduire durablement votre empreinte carbone.",
  },
  {
    icon: Users,
    title: "Proximité",
    desc: "Une équipe humaine, accessible, qui vous accompagne bien au-delà de l'installation initiale.",
  },
];

// Statistiques flottantes sur la photo
const FLOATING_STATS = [
  { value: 2500, prefix: "+", label: "Projets livrés à travers le pays", color: "dark" },
  { value: 98, suffix: "%", label: "Clients satisfaits lors de nos missions", color: "light" },
  { value: 15, prefix: "+", label: "Ingénieurs experts à votre service", color: "light" },
];

// Stats en ligne (avec count-up)
const INLINE_STATS = [
  { value: 2018, label: "Création d'EcoVolt" },
  { value: 2500, prefix: "+", label: "Projets réalisés" },
  { value: 98, suffix: "%", label: "Clients satisfaits" },
  { value: 15, prefix: "+", label: "Ingénieurs certifiés" },
];

// Icônes décoratives flottantes
const DECORATIVE_ICONS = [
  { icon: Sun, top: "8%", left: "92%", size: 24, delay: 0 },
  { icon: Battery, top: "45%", left: "95%", size: 22, delay: 1.5 },
  { icon: Leaf, top: "82%", left: "92%", size: 24, delay: 3 },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ backgroundColor: "#F8F7F2" }}
    >
      {/* === Décor de fond === */}
      {/* Breathing glows */}
      <BreathingGlow
        className="absolute -top-20 -left-20 w-[40vw] h-[40vw] rounded-full blur-[100px] pointer-events-none"
        color="radial-gradient(circle, rgba(216,169,40,0.12) 0%, transparent 70%)"
        duration={7}
      />
      <BreathingGlow
        className="absolute -bottom-20 -right-20 w-[35vw] h-[35vw] rounded-full blur-[100px] pointer-events-none"
        color="radial-gradient(circle, rgba(14,59,46,0.08) 0%, transparent 70%)"
        duration={8}
      />

      {/* Icônes décoratives flottantes */}
      {DECORATIVE_ICONS.map((item, i) => (
        <FloatingIcon
          key={i}
          className={`absolute hidden lg:block opacity-20 text-[#0E3B2E] z-0`}
          duration={6 + i}
          delay={item.delay}
          amplitude={12}
        >
          <item.icon style={{ width: item.size, height: item.size }} />
        </FloatingIcon>
      ))}

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* === COLONNE GAUCHE : Photo + cartes flottantes === */}
          <div className="lg:col-span-5 relative">
            <FromLeft distance={80}>
              <div className="relative">
                {/* Photo avec scale 1.08 → 1 */}
                <PhotoReveal className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-[#0E3B2E]/15">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E3B2E]/30 to-transparent" />
                </PhotoReveal>

                {/* === Cartes statistiques flottantes === */}
                <div className="absolute -right-4 md:-right-8 top-[55%] space-y-3 z-20">
                  <StaggerGroup stagger={0.2} delay={0.6}>
                    {FLOATING_STATS.map((stat, i) => (
                      <StaggerItem key={i} from="right" distance={30}>
                        <FloatingStatCard stat={stat} index={i} />
                      </StaggerItem>
                    ))}
                  </StaggerGroup>
                </div>

                {/* === Stats en ligne en bas de la photo === */}
                <FromBottom delay={1} className="mt-6 grid grid-cols-4 gap-3">
                  {INLINE_STATS.map((s, i) => (
                    <div key={i} className="text-center">
                      <CountUp
                        value={s.value}
                        prefix={s.prefix}
                        suffix={s.suffix}
                        className="font-display font-bold text-lg md:text-xl text-[#0E3B2E]"
                      />
                      <div className="text-[0.6rem] md:text-xs text-[#0E3B2E]/60 font-body mt-0.5 leading-tight">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </FromBottom>
              </div>
            </FromLeft>
          </div>

          {/* === COLONNE DROITE : Contenu === */}
          <div className="lg:col-span-7 lg:pl-6">
            {/* Label */}
            <FromRight distance={40}>
              <div className="flex items-center gap-4 mb-5">
                <span className="w-12 h-px bg-[#D8A928]" />
                <span className="text-xs font-display font-semibold tracking-[0.3em] uppercase text-[#0E3B2E]">
                  À propos d'EcoVolt
                </span>
              </div>
            </FromRight>

            {/* Titre — reveal line by line */}
            <h2 className="font-display font-bold tracking-[-0.03em] leading-[1.05] text-[clamp(1.8rem,3.8vw,3rem)] text-[#132C25] text-balance max-w-2xl">
              <RevealLine text="Construire l'avenir" delay={0.1} />
              <RevealLine text="énergétique du Burkina" delay={0.2} />
              <RevealLine text="Faso grâce à l'énergie" delay={0.3} />
              <RevealLine text="solaire." delay={0.4} className="italic font-light text-[#0E3B2E]" />
            </h2>

            {/* Paragraphes — fade upward */}
            <FromBottom delay={0.5} className="mt-7">
              <p className="text-base text-[#0E3B2E]/70 font-body leading-relaxed text-pretty max-w-xl">
                Basée à Ouagadougou, EcoVolt Solutions accompagne les
                particuliers, entreprises et institutions du Burkina Faso et des
                pays voisins dans leur transition vers une énergie propre,
                fiable et économique. Nous transformons l'abondance du soleil
                africain en puissance électrique utile, mesurable et durable.
              </p>
            </FromBottom>
            <FromBottom delay={0.6} className="mt-4">
              <p className="text-base text-[#0E3B2E]/70 font-body leading-relaxed text-pretty max-w-xl">
                Chaque projet commence par une écoute attentive, se construit
                avec des ingénieurs certifiés et s'achève par un accompagnement
                à long terme. Notre conviction est simple : une installation
                solaire n'est pas un produit, c'est un partenariat de plusieurs
                décennies.
              </p>
            </FromBottom>

            {/* Cartes valeurs — stagger animation */}
            <StaggerGroup stagger={0.12} delay={0.7} className="mt-8 grid sm:grid-cols-2 gap-4">
              {VALUES.map((v) => (
                <StaggerItem key={v.title} from="bottom" distance={30}>
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 12px 32px -8px rgba(14,59,46,0.12)" }}
                    className="group bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-[#0E3B2E]/[0.06] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#FFF9EC] grid place-items-center mb-3 group-hover:bg-[#0E3B2E] transition-colors duration-500">
                      <v.icon className="w-4 h-4 text-[#0E3B2E] group-hover:text-[#D8A928] transition-colors duration-500" />
                    </div>
                    <h3 className="font-display text-base font-semibold text-[#132C25] tracking-tight">
                      {v.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-[#0E3B2E]/65 font-body leading-relaxed">
                      {v.desc}
                    </p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            {/* Bouton */}
            <FromBottom delay={1.2} className="mt-8">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#D8A928] bg-white text-[#0E3B2E] text-sm font-display font-semibold hover:bg-[#0E3B2E] hover:text-white hover:border-[#0E3B2E] transition-all duration-300"
              >
                Découvrir notre histoire
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </FromBottom>
          </div>
        </div>
      </div>
    </section>
  );
}

// === Sous-composants ===

/** Carte statistique flottante */
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
        whileHover={{ scale: 1.05, y: -4 }}
        className={`w-44 p-4 rounded-2xl backdrop-blur-md border ${
          isDark
            ? "bg-[#0E3B2E] text-white border-[#0E3B2E]"
            : "bg-white/80 text-[#132C25] border-white/60"
        } shadow-xl shadow-[#0E3B2E]/10`}
      >
        <div className="flex items-baseline gap-1">
          <CountUp
            value={stat.value}
            prefix={stat.prefix}
            suffix={stat.suffix}
            className={`font-display font-bold text-2xl ${isDark ? "text-[#D8A928]" : "text-[#0E3B2E]"}`}
          />
        </div>
        <div className={`text-xs mt-1 font-body leading-tight ${isDark ? "text-white/70" : "text-[#0E3B2E]/60"}`}>
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

/** Révélation ligne par ligne */
function RevealLine({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
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
