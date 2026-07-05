"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) {
    return <ProcessMobile />;
  }
  return <ProcessDesktop />;
}

// === VERSION DESKTOP (sticky scroll pinned) ===
function ProcessDesktop() {
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
    <section id="process" className="relative bg-[#F8F7F2]">
      <div
        ref={containerRef}
        style={{ height: `${(STEPS.length + 1) * 80}vh` }}
        className="relative"
      >
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
                className="absolute inset-0 flex flex-col justify-center mx-auto max-w-[1280px] px-6 md:px-10"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-4 mb-5"
                >
                  <span className="w-10 h-px bg-[#D8A928]" />
                  <span className="text-xs font-display font-semibold tracking-[0.3em] uppercase text-[#0E3B2E]">
                    Notre processus · 06 étapes
                  </span>
                </motion.div>

                <h2 className="font-display font-bold tracking-[-0.04em] leading-[0.95] text-[clamp(2rem,5vw,4rem)] text-[#132C25] text-balance max-w-4xl">
                  Six étapes,{" "}
                  <span className="italic font-light text-[#D8A928]">zéro surprise.</span>
                </h2>

                {/* Timeline horizontale */}
                <div className="relative mt-12 md:mt-16 mb-8">
                  <svg
                    className="absolute top-10 left-0 right-0 w-full h-20 pointer-events-none hidden md:block"
                    viewBox="0 0 1200 80"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <motion.path
                      d="M 100 40 Q 200 10, 300 40 T 500 40 T 700 40 T 900 40 T 1100 40"
                      stroke="#D8A928"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.4, duration: 1.5, ease: "easeInOut" }}
                    />
                  </svg>

                  <div className="relative grid grid-cols-6 gap-2">
                    {STEPS.map((s, i) => (
                      <motion.div
                        key={s.num}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                        className="flex flex-col items-center text-center group"
                      >
                        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white shadow-lg shadow-[#0E3B2E]/10 grid place-items-center mb-3 group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 border border-black/[0.04]">
                          <s.icon className="w-6 h-6 md:w-7 md:h-7 text-[#0E3B2E]" />
                          <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#D8A928] text-[#0E3B2E] grid place-items-center text-[0.65rem] font-display font-bold border-2 border-[#F8F7F2]">
                            {i + 1}
                          </span>
                        </div>
                        <span className="font-display font-bold text-sm text-[#D8A928] mb-1">{s.num}</span>
                        <span className="text-xs md:text-sm text-[#132C25] font-body font-medium leading-tight max-w-[8rem]">
                          {s.title}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 grid lg:grid-cols-12 gap-5 items-center max-w-5xl">
                  <div className="lg:col-span-8">
                    <p className="text-sm md:text-base text-[#0E3B2E]/70 font-body leading-relaxed text-pretty">
                      Une méthode éprouvée qui sécurise chaque projet, du premier
                      appel à la maintenance pluriannulaire. Faites défiler pour
                      parcourir les 6 étapes, l'une après l'autre.
                    </p>
                  </div>
                  <div className="lg:col-span-4 lg:justify-self-end">
                    <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-[#0E3B2E] text-white text-sm font-display font-medium shadow-lg shadow-[#0E3B2E]/20">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-[#D8A928] opacity-75 animate-ping" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#D8A928]" />
                      </span>
                      Faites défiler pour découvrir
                    </div>
                  </div>
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
                className="absolute inset-0 mx-auto max-w-[1280px] px-6 md:px-10"
              >
                <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 h-full items-center py-8">
                  {/* Timeline gauche */}
                  <div className="lg:col-span-5 flex flex-col justify-center">
                    <div className="text-xs font-display font-semibold text-[#0E3B2E] tracking-widest uppercase mb-4">
                      Étape {currentStep.num} sur {STEPS.length}
                    </div>
                    <div className="space-y-0.5">
                      {STEPS.map((s, i) => {
                        const isActive = i === activeIndex;
                        const isDone = i < activeIndex;
                        return (
                          <motion.div
                            key={s.num}
                            animate={{ opacity: isActive ? 1 : isDone ? 0.55 : 0.35 }}
                            transition={{ duration: 0.4 }}
                            className="flex items-center gap-3.5 py-2"
                          >
                            <div className="relative flex items-center">
                              <motion.div
                                animate={{
                                  backgroundColor: isActive ? "#0E3B2E" : isDone ? "#0E3B2E" : "#ffffff",
                                  scale: isActive ? 1.15 : 1,
                                }}
                                transition={{ duration: 0.4 }}
                                className={`relative grid place-items-center w-11 h-11 rounded-2xl border ${
                                  isActive ? "border-[#0E3B2E] shadow-lg shadow-[#0E3B2E]/20" : "border-black/10"
                                }`}
                              >
                                {isDone ? (
                                  <Check className="w-4 h-4 text-[#D8A928]" />
                                ) : (
                                  <s.icon className={`w-4 h-4 ${isActive ? "text-[#D8A928]" : "text-[#0E3B2E]/50"}`} />
                                )}
                              </motion.div>
                            </div>
                            <div className="flex-1">
                              <div className={`font-display font-semibold tracking-tight ${isActive ? "text-xl md:text-2xl text-[#132C25]" : "text-base md:text-lg text-[#132C25]/60"}`}>
                                {s.title}
                              </div>
                            </div>
                            <span className={`text-xs font-display whitespace-nowrap ${isActive ? "text-[#0E3B2E] font-semibold" : "text-[#0E3B2E]/60"}`}>
                              {s.duration}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Panneau détails droite */}
                  <div className="lg:col-span-7">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep.num}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        className="relative bg-white rounded-3xl p-8 md:p-10 border border-[#0E3B2E]/8 shadow-xl shadow-[#0E3B2E]/5 overflow-hidden"
                      >
                        <span className="absolute -top-8 -right-4 font-display text-[14rem] font-semibold text-[#0E3B2E]/5 leading-none pointer-events-none">
                          {currentStep.num}
                        </span>
                        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-[#D8A928]/10 blur-[80px]" />

                        <div className="relative">
                          <div className="text-xs font-display font-semibold text-[#0E3B2E] tracking-widest uppercase mb-4">
                            {currentStep.short}
                          </div>
                          <h3 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-[#132C25]">
                            {currentStep.title}
                          </h3>
                          <p className="mt-5 text-base md:text-lg text-[#0E3B2E]/70 font-body leading-relaxed">
                            {currentStep.desc}
                          </p>

                          <div className="mt-8">
                            <div className="text-xs font-display font-semibold text-[#0E3B2E] uppercase tracking-wider mb-3">
                              Livrables
                            </div>
                            <ul className="space-y-2.5">
                              {currentStep.deliverables.map((d, i) => (
                                <motion.li
                                  key={d}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                                  className="flex items-center gap-3 text-sm text-[#132C25] font-body"
                                >
                                  <span className="grid place-items-center w-5 h-5 rounded-full bg-[#0E3B2E] shrink-0">
                                    <Check className="w-3 h-3 text-[#D8A928]" />
                                  </span>
                                  {d}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="relative mt-6 pt-4 border-t border-[#0E3B2E]/10 flex items-center justify-between">
                          <div>
                            <div className="text-xs text-[#0E3B2E]/60 font-body uppercase tracking-wider">Durée</div>
                            <div className="mt-1 font-display text-base font-semibold text-[#132C25]">
                              {currentStep.duration}
                            </div>
                          </div>
                          <div className="text-xs font-display font-semibold text-[#0E3B2E]">
                            {activeIndex + 1} / {STEPS.length}
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Progression bas */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
                  <span className="text-xs font-display font-semibold text-[#0E3B2E]">
                    {String(activeStep).padStart(2, "0")}
                  </span>
                  <div className="w-32 h-1 bg-[#0E3B2E]/10 rounded-full overflow-hidden">
                    <motion.div
                      style={{ width: progressWidth }}
                      className="h-full bg-gradient-to-r from-[#0E3B2E] to-[#D8A928] rounded-full"
                    />
                  </div>
                  <span className="text-xs font-display text-[#0E3B2E]/60">
                    {String(STEPS.length).padStart(2, "0")}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Récapitulatif bas */}
      <div className="py-16 md:py-24 mx-auto max-w-[1280px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid md:grid-cols-3 gap-6"
        >
          <div className="md:col-span-2 p-8 md:p-10 rounded-3xl bg-[#0E3B2E] text-white relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#D8A928]/20 blur-[80px]" />
            <div className="relative">
              <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
                Une méthode éprouvée, des résultats garantis
              </h3>
              <p className="mt-4 text-white/70 font-body leading-relaxed max-w-2xl">
                Chaque étape est documentée, chaque livraison est testée, chaque
                client est formé. C'est cette rigueur qui nous permet de garantir
                la performance de vos installations sur la durée.
              </p>
            </div>
          </div>
          <div className="p-8 rounded-3xl bg-[#D8A928] text-[#0E3B2E] flex flex-col justify-between">
            <div>
              <div className="font-display text-sm font-semibold uppercase tracking-wider">Durée moyenne</div>
              <div className="mt-3 font-display text-5xl font-semibold tracking-tight leading-none">3 à 6</div>
              <div className="mt-1 font-display text-lg font-medium">semaines</div>
            </div>
            <div className="text-xs mt-4 opacity-80">
              Du premier contact à la mise en service — projet résidentiel type
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// === VERSION MOBILE (layout vertical simple) ===
function ProcessMobile() {
  return (
    <section id="process" className="relative bg-[#F8F7F2] py-16 md:py-20 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-5">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-8 h-px bg-[#D8A928]" />
          <span className="text-[0.65rem] font-display font-semibold tracking-[0.25em] uppercase text-[#0E3B2E]">
            Notre processus · 06 étapes
          </span>
        </motion.div>

        <h2 className="font-display font-bold tracking-[-0.035em] leading-[1.05] text-[clamp(1.75rem,7vw,2.5rem)] text-[#132C25] text-balance mb-4">
          Six étapes,{" "}
          <span className="italic font-light text-[#D8A928]">zéro surprise.</span>
        </h2>

        <p className="text-sm text-[#0E3B2E]/70 font-body leading-relaxed mb-8">
          Une méthode éprouvée qui sécurise chaque projet, du premier appel à la
          maintenance pluriannulaire.
        </p>

        {/* Étapes en liste verticale */}
        <div className="space-y-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white rounded-2xl p-5 border border-[#0E3B2E]/8 shadow-md shadow-[#0E3B2E]/[0.05]"
            >
              {/* Numéro + icône + durée */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-xl bg-[#0E3B2E] grid place-items-center">
                    <s.icon className="w-5 h-5 text-[#D8A928]" />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#D8A928] text-[#0E3B2E] grid place-items-center text-[0.6rem] font-display font-bold border-2 border-white">
                      {i + 1}
                    </span>
                  </div>
                  <span className="font-display font-bold text-sm text-[#D8A928]">{s.num}</span>
                </div>
                <span className="text-xs font-display font-semibold text-[#0E3B2E] bg-[#FFF9EC] px-3 py-1 rounded-full">
                  {s.duration}
                </span>
              </div>

              {/* Titre */}
              <h3 className="font-display text-lg font-semibold tracking-tight text-[#132C25] mb-1.5">
                {s.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#0E3B2E]/65 font-body leading-relaxed mb-3">
                {s.desc}
              </p>

              {/* Livrables */}
              <div className="pt-3 border-t border-[#0E3B2E]/8">
                <div className="text-[0.65rem] font-display font-semibold text-[#0E3B2E] uppercase tracking-wider mb-2">
                  Livrables
                </div>
                <ul className="space-y-1.5">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-xs text-[#132C25] font-body">
                      <span className="grid place-items-center w-4 h-4 rounded-full bg-[#0E3B2E] shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#D8A928]" />
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Récapitulatif */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 p-6 rounded-3xl bg-[#D8A928] text-[#0E3B2E]"
        >
          <div className="font-display text-sm font-semibold uppercase tracking-wider">Durée moyenne</div>
          <div className="mt-2 font-display text-4xl font-semibold tracking-tight leading-none">3 à 6</div>
          <div className="mt-1 font-display text-base font-medium">semaines</div>
          <div className="text-xs mt-3 opacity-80">
            Du premier contact à la mise en service — projet résidentiel type
          </div>
        </motion.div>
      </div>
    </section>
  );
}
