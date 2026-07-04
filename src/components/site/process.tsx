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
        style={{ height: `${(STEPS.length + 1) * 100}vh` }}
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
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                  <div>
                    <Reveal>
                      <span className="section-label text-[#0d3b2e]">
                        <span className="w-8 h-px bg-[#f5b91a]" />
                        Notre processus
                      </span>
                    </Reveal>
                    <h2 className="mt-6 font-display font-semibold tracking-[-0.03em] leading-[1.02] text-[clamp(2rem,4.5vw,3.6rem)] text-[#0a1f1a] text-balance">
                      <RevealHeadline text="Six étapes," />{" "}
                      <RevealHeadline text="zéro surprise." delay={0.1} />
                    </h2>
                  </div>
                  <Reveal delay={0.2}>
                    <p className="text-base text-[#5a6b65] font-body leading-relaxed max-w-sm">
                      Une méthode éprouvée qui sécurise chaque projet. Faites
                      défiler pour parcourir les 6 étapes, l'une après l'autre.
                    </p>
                  </Reveal>
                </div>
                <Reveal delay={0.3}>
                  <div className="mt-10 inline-flex items-center gap-3 px-5 py-3 rounded-full bg-[#0d3b2e] text-white text-sm font-display">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-[#f5b91a] opacity-75 animate-ping" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#f5b91a]" />
                    </span>
                    Faites défiler pour découvrir le processus
                  </div>
                </Reveal>
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
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 h-full items-center py-16">
                  {/* Colonne gauche : timeline */}
                  <div className="lg:col-span-5 flex flex-col justify-center">
                    <div className="text-xs font-display font-semibold text-[#0d3b2e] tracking-widest uppercase mb-6">
                      Étape {currentStep.num} sur {STEPS.length}
                    </div>
                    <div className="space-y-1">
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
                            className="flex items-center gap-4 py-2.5"
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

                        <div className="relative mt-8 pt-6 border-t border-black/10 flex items-center justify-between">
                          <div>
                            <div className="text-xs text-[#5a6b65] font-body uppercase tracking-wider">
                              Durée
                            </div>
                            <div className="mt-1 font-display text-lg font-semibold text-[#0a1f1a]">
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
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
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
                  </div>
                  <span className="text-[0.65rem] tracking-[0.25em] uppercase text-[#5a6b65] font-display">
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
