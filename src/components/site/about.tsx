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
import { ShieldCheck, Sparkles, Leaf, Users, Sun, Battery, ArrowRight } from "lucide-react";

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

// Badges statistiques flottants sur la photo (uniquement — pas de redondance avec légende bas)
const FLOATING_STATS = [
  { value: 2500, prefix: "+", label: "Projets livrés", color: "dark" },
  { value: 98, suffix: "%", label: "Clients satisfaits", color: "light" },
  { value: 15, prefix: "+", label: "Ingénieurs experts", color: "light" },
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
      {/* === Décor de fond : breathing glows === */}
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

      {/* Icônes décoratives flottantes en bord de section */}
      <FloatingIcon
        className="absolute hidden lg:block opacity-20 text-[#0E3B2E] z-0"
        style={{ top: "10%", left: "92%" } as React.CSSProperties}
        duration={6}
        delay={0}
        amplitude={12}
      >
        <Sun className="w-6 h-6" />
      </FloatingIcon>
      <FloatingIcon
        className="absolute hidden lg:block opacity-20 text-[#0E3B2E] z-0"
        style={{ top: "85%", left: "94%" } as React.CSSProperties}
        duration={7}
        delay={2}
        amplitude={10}
      >
        <Battery className="w-5 h-5" />
      </FloatingIcon>

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* === COLONNE GAUCHE : Photo + badges flottants === */}
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

                {/* === Badges statistiques flottants (uniquement — pas de légende bas) === */}
                {/* Positionnés à droite de la photo, empilés verticalement, taille uniforme */}
                <div className="absolute -right-3 md:-right-6 top-[50%] -translate-y-1/2 space-y-3 z-20">
                  <StaggerGroup stagger={0.2} delay={0.6}>
                    {FLOATING_STATS.map((stat, i) => (
                      <StaggerItem key={i} from="right" distance={30}>
                        <FloatingStatCard stat={stat} index={i} />
                      </StaggerItem>
                    ))}
                  </StaggerGroup>
                </div>
              </div>
            </FromLeft>
          </div>

          {/* === COLONNE DROITE : Contenu === */}
          <div className="lg:col-span-7 lg:pl-6">
            {/* Label */}
            <FromRight distance={40}>
              <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-px bg-[#D8A928]" />
                <span className="text-xs font-display font-semibold tracking-[0.3em] uppercase text-[#0E3B2E]">
                  À propos d'EcoVolt
                </span>
              </div>
            </FromRight>

            {/* === Vrai titre H2 principal === */}
            <FromRight distance={40} delay={0.1}>
              <h2 className="font-display font-bold tracking-[-0.03em] leading-[1.05] text-[clamp(2rem,3.8vw,2.75rem)] text-[#132C25] mb-5">
                Qui sommes-nous ?
              </h2>
            </FromRight>

            {/* Sous-titre éditorial */}
            <h3 className="font-display font-semibold tracking-[-0.02em] leading-[1.1] text-[clamp(1.25rem,2vw,1.6rem)] text-[#0E3B2E] text-balance max-w-2xl mb-6">
              <RevealLine text="Construire l'avenir énergétique" delay={0.15} />
              <RevealLine text="du Burkina Faso grâce à l'énergie" delay={0.25} />
              <RevealLine text="solaire." delay={0.35} className="italic font-light text-[#0E3B2E]" />
            </h3>

            {/* Paragraphes — fade upward */}
            <FromBottom delay={0.5} className="mt-5">
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

            {/* === Cartes valeurs — contraste renforcé === */}
            <StaggerGroup stagger={0.12} delay={0.7} className="mt-8 grid sm:grid-cols-2 gap-4">
              {VALUES.map((v) => (
                <StaggerItem key={v.title} from="bottom" distance={30}>
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 16px 40px -8px rgba(14,59,46,0.18)" }}
                    className="group bg-white rounded-2xl p-5 border border-[#0E3B2E]/12 shadow-md shadow-[#0E3B2E]/[0.06] transition-colors"
                  >
                    {/* Icône agrandie + couleur vert EcoVolt marquée */}
                    <div className="w-12 h-12 rounded-xl bg-[#0E3B2E] grid place-items-center mb-4 group-hover:bg-[#D8A928] transition-colors duration-500">
                      <v.icon className="w-6 h-6 text-[#D8A928] group-hover:text-[#0E3B2E] transition-colors duration-500" />
                    </div>
                    <h4 className="font-display text-lg font-semibold text-[#132C25] tracking-tight">
                      {v.title}
                    </h4>
                    <p className="mt-2 text-sm text-[#0E3B2E]/65 font-body leading-relaxed">
                      {v.desc}
                    </p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            {/* === Bouton CTA renforcé : fond plein vert === */}
            <FromBottom delay={1.2} className="mt-8">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03, boxShadow: "0 12px 32px -6px rgba(14,59,46,0.35)" }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#0E3B2E] text-white text-sm font-display font-semibold hover:bg-[#0E3B2E]/90 transition-all duration-300 shadow-lg shadow-[#0E3B2E]/20"
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

/** Carte statistique flottante — taille uniforme */
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
        className={`w-[200px] p-4 rounded-2xl backdrop-blur-md border text-center ${
          isDark
            ? "bg-[#0E3B2E] text-white border-[#0E3B2E]"
            : "bg-white/90 text-[#132C25] border-[#0E3B2E]/10"
        } shadow-xl shadow-[#0E3B2E]/10`}
      >
        <CountUp
          value={stat.value}
          prefix={stat.prefix}
          suffix={stat.suffix}
          className={`block font-display font-bold text-2xl ${isDark ? "text-[#D8A928]" : "text-[#0E3B2E]"}`}
        />
        <div className={`text-xs mt-1.5 font-body leading-tight ${isDark ? "text-white/75" : "text-[#0E3B2E]/60"}`}>
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
