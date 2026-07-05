"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Reveal, RevealHeadline } from "./reveal";
import { Phone, Search, PencilRuler, Boxes, Hammer, Headset, Check } from "lucide-react";

const STEPS = [
  {
    num: "01",
    icon: Phone,
    title: "Premier contact",
    short: "Échange initial",
    desc: "Nous échangeons sur vos besoins, votre site, vos contraintes budgétaires et vos objectifs énergétiques. Première réponse sous 48 heures.",
    duration: "48h",
    deliverables: ["Analyse de votre besoin", "Première estimation gratuite", "Plan de rendez-vous"],
  },
  {
    num: "02",
    icon: Search,
    title: "Audit & analyse",
    short: "Étude de terrain",
    desc: "Visite technique, analyse de vos consommations, évaluation du gisement solaire de votre site et identification des contraintes d'installation.",
    duration: "1 semaine",
    deliverables: ["Visite technique détaillée", "Bilan de consommation", "Étude de faisabilité"],
  },
  {
    num: "03",
    icon: PencilRuler,
    title: "Conception & devis",
    short: "Ingénierie",
    desc: "Dimensionnement précis, sélection des équipements, plan d'implantation et proposition commerciale chiffrée et transparente.",
    duration: "1 à 2 semaines",
    deliverables: ["Schéma technique complet", "Devis détaillé", "Plan d'implantation 3D"],
  },
  {
    num: "04",
    icon: Boxes,
    title: "Approvisionnement",
    short: "Logistique",
    desc: "Commande des équipements premium auprès de nos partenaires internationaux, contrôle qualité et logistique jusqu'à votre site.",
    duration: "2 à 4 semaines",
    deliverables: ["Équipements certifiés", "Contrôle qualité usine", "Livraison sécurisée"],
  },
  {
    num: "05",
    icon: Hammer,
    title: "Installation & mise en service",
    short: "Chantier",
    desc: "Pose par nos équipes certifiées, respect des normes, tests de performance, formation à l'usage et mise en service officielle.",
    duration: "1 à 3 semaines",
    deliverables: ["Installation par équipes certifiées", "Tests & certification", "Formation utilisateur"],
  },
  {
    num: "06",
    icon: Headset,
    title: "Suivi & maintenance",
    short: "Long terme",
    desc: "Télémétrie, contrats de maintenance préventive, interventions correctives rapides et accompagnement sur toute la durée de vie.",
    duration: "25 ans",
    deliverables: ["Monitoring temps réel", "Maintenance préventive", "Support dédié 24/7"],
  },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      if (v < 0.1) {
        setActiveStep(0);
      } else {
        const step = Math.min(
          Math.floor(((v - 0.1) / 0.9) * STEPS.length) + 1,
          STEPS.length
        );
        setActiveStep(step);
      }
    });
    return () => unsub();
  }, [scrollYProgress]);

  const activeIndex = activeStep > 0 ? activeStep - 1 : -1;
  const currentStep = activeIndex >= 0 ? STEPS[activeIndex] : null;

  const progressWidth = useTransform(scrollYProgress, [0.1, 1], ["0%", "100%"]);

  return (
    <section
      id="process"
      className="relative bg-[#f6f4ee]"
    >
      <div
        ref={containerRef}
        style={{ height: `${(STEPS.length + 1) * 80}vh` }}
        className="relative"
      >
        {/* Vue sticky */}
        <div className="sticky top-0 h-screen overflow-hidden">
          <AnimatePresence mode="wait">
            {/* En-tête */}
            {activeStep === 0 && (
              <motion.div
                key="header"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col justify-center mx-auto max-w-[1400px] px-5 md:px-10"
              >
                {/* Label + Titre */}
                <Reveal>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="w-12 h-px bg-[#f5b91a]" />
                    <span className="text-xs font-display font-semibold tracking-[0.3em] uppercase text-[#0d3b2e]">
                      Notre processus · 06 étapes
                    </span>
                  </div>
                </Reveal>

                <h2 className="font-display font-bold tracking-[-0.04em] leading-[0.95] text-[clamp(2rem,5vw,4rem)] text-[#0a1f1a] text-balance max-w-4xl">
                  <RevealHeadline text="Six étapes," />{" "}
                  <RevealHeadline text="zéro surprise." delay={0.1} className="italic font-light text-[#0d3b2e]" />
                </h2>

                {/* === Timeline horizontale avec ligne courbe === */}
                <div className="relative mt-12 md:mt-16 mb-8">
                  {/* Ligne courbe SVG qui relie les étapes */}
                  <svg
                    className="absolute top-10 left-0 right-0 w-full h-20 pointer-events-none hidden md:block"
                    viewBox="0 0 1200 80"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <motion.path
                      d="M 100 40 Q 200 10, 300 40 T 500 40 T 700 40 T 900 40 T 1100 40"
                      stroke="#f5b91a"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.4, duration: 1.5, ease: "easeInOut" }}
                    />
                  </svg>

                  {/* 6 étapes en ligne horizontale */}
                  <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-2">
                    {STEPS.map((s, i) => (
                      <motion.div
                        key={s.num}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                        className="flex flex-col items-center text-center group"
                      >
                        {/* Plateforme blanche avec icône */}
                        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white shadow-lg shadow-[#0d3b2e]/10 grid place-items-center mb-3 group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 border border-black/[0.04]">
                          <s.icon className="w-6 h-6 md:w-7 md:h-7 text-[#0d3b2e]" />
                          {/* Pastille numéro */}
                          <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#f5b91a] text-[#07241c] grid place-items-center text-[0.65rem] font-display font-bold border-2 border-[#f6f4ee]">
                            {i + 1}
                          </span>
                        </div>
                        {/* Numéro jaune */}
                        <span className="font-display font-bold text-sm text-[#f5b91a] mb-1">{s.num}</span>
                        {/* Titre étape */}
                        <span className="text-xs md:text-sm text-[#0a1f1a] font-body font-medium leading-tight max-w-[8rem]">
                          {s.title}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Description + bouton */}
                <div className="mt-6 grid lg:grid-cols-12 gap-5 items-center max-w-5xl">
                  <Reveal delay={0.3} className="lg:col-span-8">
                    <p className="text-sm md:text-base text-[#5a6b65] font-body leading-relaxed text-pretty">
                      Une méthode éprouvée qui sécurise chaque projet, du premier
                      appel à la maintenance pluriannulaire. Faites défiler pour
                      parcourir les 6 étapes, l'une après l'autre.
                    </p>
                  </Reveal>
                  <Reveal delay={0.4} className="lg:col-span-4 lg:justify-self-end">
                    <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-[#0d3b2e] text-white text-sm font-display font-medium shadow-lg shadow-[#0d3b2e]/20">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-[#f5b91a] opacity-75 animate-ping" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#f5b91a]" />
                      </span>
                      Faites défiler pour découvrir
                    </div>
                  </Reveal>
                </div>
              </motion.div>
            )}

            {/* Vue étape active */}
            {currentStep && (
              <motion.div
                key={currentStep.num}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 mx-auto max-w-[1400px] px-5 md:px-10"
              >
                <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 h-full items-center py-10 md:py-8">
                  {/* Colonne gauche : timeline */}
                  <div className="lg:col-span-5 flex flex-col justify-center">
                    <div className="text-xs font-display font-semibold text-[#0d3b2e] tracking-widest uppercase mb-4">
                      Étape {currentStep.num} sur {STEPS.length}
                    </div>
                    <div className="space-y-0.5">
                      {STEPS.map((s, i) => {
                        const isActive = i === activeIndex;
                        const isDone = i < activeIndex;
                        return (
                          <motion.div
                            key={s.num}
                            animate={{
                              opacity: isActive ? 1 : isDone ? 0.55 : 0.35,
                            }}
                            transition={{ duration: 0.4 }}
                            className="flex items-center gap-3.5 py-2"
                          >
                            <div className="relative flex items-center">
                              <motion.div
                                animate={{
                                  backgroundColor: isActive ? "#0d3b2e" : isDone ? "#0d3b2e" : "#ffffff",
                                  scale: isActive ? 1.15 : 1,
                                }}
                                transition={{ duration: 0.4 }}
                                className={`relative grid place-items-center w-11 h-11 rounded-2xl border ${
                                  isActive ? "border-[#0d3b2e] shadow-lg shadow-[#0d3b2e]/20" : "border-black/10"
                                }`}
                              >
                                {isDone ? (
                                  <Check className="w-4 h-4 text-[#f5b91a]" />
                                ) : (
                                  <s.icon
                                    className={`w-4 h-4 transition-colors ${
                                      isActive ? "text-[#f5b91a]" : "text-[#0d3b2e]/50"
                                    }`}
                                  />
                                )}
                              </motion.div>
                              {isActive && (
                                <motion.span
                                  layoutId="process-active-ring"
                                  className="absolute -inset-1 rounded-2xl ring-2 ring-[#f5b91a]/40"
                                />
                              )}
                            </div>
                            <div className="flex-1">
                              <div
                                className={`font-display font-semibold tracking-tight transition-all duration-400 ${
                                  isActive
                                    ? "text-xl md:text-2xl text-[#0a1f1a]"
                                    : "text-base md:text-lg text-[#0a1f1a]/60"
                                }`}
                              >
                                {s.title}
                              </div>
                              {isActive && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  transition={{ duration: 0.3, delay: 0.15 }}
                                  className="overflow-hidden lg:hidden"
                                >
                                  <span className="text-xs text-[#5a6b65] font-body">
                                    {s.short} · {s.duration}
                                  </span>
                                </motion.div>
                              )}
                            </div>
                            <span className={`text-xs font-display whitespace-nowrap ${
                              isActive ? "text-[#0d3b2e] font-semibold" : "text-[#5a6b65]"
                            }`}>
                              {s.duration}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Colonne droite : panneau de détails */}
                  <div className="lg:col-span-7">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep.num}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        className="relative bg-white rounded-3xl p-8 md:p-10 border border-black/[0.06] shadow-xl shadow-[#0d3b2e]/5 overflow-hidden"
                      >
                        <span className="absolute -top-8 -right-4 font-display text-[14rem] font-semibold text-[#0d3b2e]/5 leading-none pointer-events-none">
                          {currentStep.num}
                        </span>
                        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-[#f5b91a]/10 blur-[80px]" />

                        <div className="relative">
                          <div className="text-xs font-display font-semibold text-[#0d3b2e] tracking-widest uppercase mb-4">
                            {currentStep.short}
                          </div>
                          <h3 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-[#0a1f1a]">
                            {currentStep.title}
                          </h3>
                          <p className="mt-5 text-base md:text-lg text-[#5a6b65] font-body leading-relaxed">
                            {currentStep.desc}
                          </p>

                          <div className="mt-8">
                            <div className="text-xs font-display font-semibold text-[#0d3b2e] uppercase tracking-wider mb-3">
                              Livrables
                            </div>
                            <ul className="space-y-2.5">
                              {currentStep.deliverables.map((d, i) => (
                                <motion.li
                                  key={d}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                                  className="flex items-center gap-3 text-sm text-[#0a1f1a] font-body"
                                >
                                  <span className="grid place-items-center w-5 h-5 rounded-full bg-[#0d3b2e] shrink-0">
                                    <Check className="w-3 h-3 text-[#f5b91a]" />
                                  </span>
                                  {d}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="relative mt-6 pt-4 border-t border-black/10 flex items-center justify-between">
                          <div>
                            <div className="text-xs text-[#5a6b65] font-body uppercase tracking-wider">
                              Durée
                            </div>
                            <div className="mt-1 font-display text-base font-semibold text-[#0a1f1a]">
                              {currentStep.duration}
                            </div>
                          </div>
                          <div className="text-xs font-display font-semibold text-[#0d3b2e]">
                            {activeIndex + 1} / {STEPS.length}
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Indicateur de progression bas */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
                  <span className="text-xs font-display font-semibold text-[#0d3b2e]">
                    {String(activeStep).padStart(2, "0")}
                  </span>
                  <div className="w-32 h-1 bg-black/10 rounded-full overflow-hidden">
                    <motion.div
                      style={{ width: progressWidth }}
                      className="h-full bg-gradient-to-r from-[#0d3b2e] to-[#f5b91a] rounded-full"
                    />
                  </div>
                  <span className="text-xs font-display text-[#5a6b65]">
                    {String(STEPS.length).padStart(2, "0")}
                  </span>
                  <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[#5a6b65] font-display ml-2">
                    Étape {activeStep} / {STEPS.length}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
