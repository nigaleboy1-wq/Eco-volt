"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./reveal";
import { Star, Quote, ArrowLeft, ArrowRight, Sun, Battery, Car, MessageSquare, BadgeCheck, Leaf, Zap } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "EcoVolt a transformé notre site de production. En six mois, notre facture énergétique a chuté de 70 % et nous bénéficions désormais d'une autonomie totale pendant les coupures. Le sérieux de l'équipe et la qualité du suivi font toute la différence.",
    name: "Aminata Ouédraogo",
    role: "Directrice générale",
    company: "Sahel Agro-Industries",
    location: "Bobo-Dioulasso",
  },
  {
    quote:
      "Pour un centre de santé, l'énergie est vitale. EcoVolt a conçu un système hybride avec stockage qui sécurise totalement notre service. L'intervention a été rapide, propre, parfaitement organisée. Je les recommande sans hésiter.",
    name: "Dr. Issa Sawadogo",
    role: "Médecin chef",
    company: "Clinique Notre Espoir",
    location: "Koudougou",
  },
  {
    quote:
      "Nous cherchions un partenaire capable d'installer des bornes de recharge VE couplées au solaire sur notre siège. EcoVolt a tout géré : conception, administration, installation, monitoring. Un projet pilote qui inspire aujourd'hui tout notre groupe.",
    name: "Karl Muller",
    role: "Directeur technique",
    company: "West Africa Logistics",
    location: "Abidjan",
  },
  {
    quote:
      "Installation solaire de 12 kWc sur ma villa, avec batteries. Travail soigné, équipes ponctuelles et pédagogues, mise en service conforme au devis. Trois ans plus tard, le suivi reste aussi réactif qu'au premier jour.",
    name: "Boukary Traoré",
    role: "Particulier",
    company: "Résidence privée",
    location: "Ouagadougou",
  },
];

// Positions des icônes flottantes autour de la glass card (en % de la colonne)
const FLOATING_ICONS = [
  { icon: Sun, top: "8%", left: "20%", delay: 0, size: 28 },
  { icon: Battery, top: "18%", left: "78%", delay: 0.5, size: 26 },
  { icon: Car, top: "50%", left: "88%", delay: 1, size: 26 },
  { icon: MessageSquare, top: "82%", left: "75%", delay: 1.5, size: 24 },
  { icon: BadgeCheck, top: "88%", left: "22%", delay: 2, size: 26 },
  { icon: Leaf, top: "70%", left: "8%", delay: 2.5, size: 26 },
  { icon: Zap, top: "32%", left: "8%", delay: 3, size: 24 },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const t = TESTIMONIALS[index];
  const sectionRef = useRef<HTMLDivElement>(null);

  const go = useCallback((dir: 1 | -1) => {
    setDirection(dir);
    setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), 7000);
    return () => clearInterval(id);
  }, [paused, go, index]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: "#F8F6F1" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* === Décor de fond === */}
      {/* Texture papier subtile (noise) */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      {/* Halo doré flou */}
      <div className="absolute -top-20 -left-20 w-[50vw] h-[50vw] rounded-full opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(216,169,40,0.18) 0%, transparent 60%)" }} />
      <div className="absolute -bottom-32 -right-32 w-[55vw] h-[55vw] rounded-full opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(14,59,46,0.08) 0%, transparent 60%)" }} />
      {/* Cercles fantomatiques */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full border border-[#0E3B2E]/[0.04] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full border border-[#D8A928]/[0.06] pointer-events-none" />
      {/* Points décoratifs */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #0E3B2E 0.5px, transparent 0.5px)",
          backgroundSize: "32px 32px",
          opacity: 0.025,
        }} />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* === COLONNE GAUCHE : Illustration flottante === */}
          <div className="lg:col-span-5 relative h-[400px] md:h-[520px] hidden lg:block">
            {/* Lignes courbes pointillées reliant les icônes */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 400 520"
              fill="none"
            >
              <motion.path
                d="M 80 60 Q 200 100, 320 120 T 350 280 T 200 420 T 60 380 T 50 200 T 80 60"
                stroke="#0E3B2E"
                strokeWidth="1"
                strokeDasharray="2 4"
                opacity="0.25"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <motion.path
                d="M 200 260 Q 280 200, 350 250"
                stroke="#D8A928"
                strokeWidth="1"
                strokeDasharray="2 3"
                opacity="0.3"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              />
            </svg>

            {/* Icônes flottantes */}
            {FLOATING_ICONS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute"
                style={{ top: item.top, left: item.left }}
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    x: [0, 4, 0],
                  }}
                  transition={{
                    duration: 6 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: item.delay,
                  }}
                  className="relative"
                >
                  <div
                    className="grid place-items-center rounded-2xl bg-white/60 backdrop-blur-sm border border-[#0E3B2E]/10 shadow-sm"
                    style={{ width: item.size + 18, height: item.size + 18 }}
                  >
                    <item.icon
                      className="text-[#0E3B2E]"
                      style={{ width: item.size - 6, height: item.size - 6 }}
                    />
                  </div>
                  {/* Petit accent doré */}
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#D8A928]" />
                </motion.div>
              </motion.div>
            ))}

            {/* Particules lumineuses flottantes */}
            {[
              { top: "25%", left: "45%", size: 4, delay: 0 },
              { top: "60%", left: "30%", size: 3, delay: 1 },
              { top: "40%", left: "65%", size: 5, delay: 2 },
              { top: "75%", left: "50%", size: 3, delay: 0.5 },
              { top: "15%", left: "55%", size: 4, delay: 1.5 },
            ].map((p, i) => (
              <motion.div
                key={`particle-${i}`}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.4, 1],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: "easeInOut",
                }}
                className="absolute rounded-full bg-[#D8A928]"
                style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
              />
            ))}

            {/* Glass card centrale */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, boxShadow: "0 24px 60px -12px rgba(14,59,46,0.18)" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 p-6 rounded-3xl"
              style={{
                background: "rgba(255,255,255,0.55)",
                backdropFilter: "blur(20px) saturate(140%)",
                WebkitBackdropFilter: "blur(20px) saturate(140%)",
                border: "1px solid rgba(255,255,255,0.6)",
                boxShadow: "0 16px 40px -12px rgba(14,59,46,0.12)",
              }}
            >
              <Quote className="w-8 h-8 text-[#D8A928] mb-3" />
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Star className="w-4 h-4 text-[#D8A928] fill-[#D8A928]" />
                  </motion.div>
                ))}
              </div>
              <p className="text-sm text-[#132C25] font-body leading-relaxed">
                « {TESTIMONIALS[index].quote.substring(0, 110)}... »
              </p>
              <div className="mt-4 pt-4 border-t border-[#0E3B2E]/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0E3B2E] grid place-items-center">
                  <span className="text-[#D8A928] text-xs font-display font-bold">
                    {TESTIMONIALS[index].name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-xs font-display font-semibold text-[#132C25]">
                    {TESTIMONIALS[index].name}
                  </div>
                  <div className="text-[0.65rem] text-[#0E3B2E]/60 font-body">
                    {TESTIMONIALS[index].company}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* === COLONNE DROITE : Témoignage === */}
          <div className="lg:col-span-7 relative">
            {/* Grand Quote icon en arrière-plan */}
            <Quote
              className="absolute -top-8 -left-4 w-32 h-32 md:w-40 md:h-40 text-[#0E3B2E] pointer-events-none"
              style={{ opacity: 0.05 }}
            />

            {/* Label */}
            <Reveal>
              <div className="flex items-center gap-4 mb-6 relative">
                <span className="w-12 h-px bg-[#D8A928]" />
                <span className="text-xs font-display font-semibold tracking-[0.3em] uppercase text-[#0E3B2E]">
                  Témoignages
                </span>
              </div>
            </Reveal>

            {/* Note moyenne */}
            <Reveal delay={0.1}>
              <div className="flex items-center gap-4 mb-8 relative">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                      whileHover={{ scale: 1.2 }}
                    >
                      <Star className="w-5 h-5 text-[#D8A928] fill-[#D8A928]" />
                    </motion.div>
                  ))}
                </div>
                <div>
                  <div className="font-display text-lg font-semibold text-[#132C25]">
                    4,9 / 5
                  </div>
                  <div className="text-xs text-[#0E3B2E]/60">
                    Satisfaction sur 320 avis vérifiés
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Témoignage */}
            <div className="relative min-h-[280px] md:min-h-[240px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.blockquote
                  key={index}
                  custom={direction}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                  style={{ maxWidth: 700 }}
                >
                  <p
                    className="font-display font-medium tracking-tight text-[#132C25] text-balance"
                    style={{
                      fontSize: "clamp(1.5rem, 2.8vw, 2.4rem)",
                      lineHeight: 1.15,
                    }}
                  >
                    « {t.quote} »
                  </p>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Auteur */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`author-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-10 flex items-center gap-5"
              >
                <div className="w-14 h-14 rounded-full bg-[#0E3B2E] grid place-items-center shrink-0 shadow-lg shadow-[#0E3B2E]/20">
                  <span className="text-[#D8A928] font-display text-xl font-semibold">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-display text-lg font-semibold text-[#132C25]">
                    {t.name}
                  </div>
                  <div className="text-sm text-[#0E3B2E]/70 font-body">
                    {t.role} — {t.company}, {t.location}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation + indicateurs */}
            <div className="mt-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={() => go(-1)}
                  aria-label="Témoignage précédent"
                  whileHover={{
                    backgroundColor: "#0E3B2E",
                    color: "#ffffff",
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="grid place-items-center w-12 h-12 rounded-full border border-[#0E3B2E]/15 text-[#0E3B2E] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={() => go(1)}
                  aria-label="Témoignage suivant"
                  whileHover={{
                    backgroundColor: "#0E3B2E",
                    color: "#ffffff",
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="grid place-items-center w-12 h-12 rounded-full border border-[#0E3B2E]/15 text-[#0E3B2E] transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <span className="ml-4 font-display text-sm text-[#0E3B2E]/60">
                  {String(index + 1).padStart(2, "0")} — {String(TESTIMONIALS.length).padStart(2, "0")}
                </span>
              </div>

              {/* Indicateurs de progression */}
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    aria-label={`Aller au témoignage ${i + 1}`}
                    className={`relative h-1.5 rounded-full transition-all duration-500 overflow-hidden ${
                      i === index ? "w-12 bg-[#0E3B2E]/15" : "w-3 bg-[#0E3B2E]/20 hover:bg-[#0E3B2E]/40"
                    }`}
                  >
                    {i === index && !paused && (
                      <motion.div
                        key={`prog-${index}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 7, ease: "linear" }}
                        className="absolute inset-0 bg-[#0E3B2E] origin-left"
                      />
                    )}
                    {i === index && paused && (
                      <div className="absolute inset-0 bg-[#0E3B2E]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
