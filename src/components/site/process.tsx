"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Reveal, RevealHeadline } from "./reveal";
import { Phone, Search, PencilRuler, Boxes, Hammer, Headset, Check } from "lucide-react";
import { useSmoothScroll } from "./smooth-scroll";

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
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Détection de l'étape active basée sur le scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const idx = Math.min(
        Math.floor(v * STEPS.length),
        STEPS.length - 1
      );
      setActiveStep(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section
      id="process"
      className="relative bg-white overflow-hidden"
    >
      {/* En-tête */}
      <div className="py-24 md:py-32 mx-auto max-w-[1400px] px-5 md:px-10">
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
              Une méthode éprouvée qui sécurise chaque projet, du premier appel
              à la maintenance pluriannulaire. Vous savez à tout moment où en
              est votre installation.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Layout sticky : liste gauche + panneau droit */}
      <div
        ref={containerRef}
        className="relative mx-auto max-w-[1400px] px-5 md:px-10"
        style={{ height: "360vh" }}
      >
        <div className="sticky top-0 h-screen grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Colonne gauche : liste des étapes */}
          <div className="lg:col-span-6 h-full flex flex-col justify-center py-8">
            <div className="space-y-1">
              {STEPS.map((step, i) => (
                <StepRow
                  key={step.num}
                  step={step}
                  index={i}
                  active={activeStep === i}
                />
              ))}
            </div>
          </div>

          {/* Colonne droite : panneau sticky qui change */}
          <div className="hidden lg:block lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <StepPanel step={STEPS[activeStep]} index={activeStep} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Carte récapitulative bas */}
      <div className="py-16 md:py-24 mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 p-8 md:p-10 rounded-3xl bg-[#0d3b2e] text-white relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#f5b91a]/20 blur-[80px]" />
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
            <div className="p-8 rounded-3xl bg-[#f5b91a] text-[#07241c] flex flex-col justify-between">
              <div>
                <div className="font-display text-sm font-semibold uppercase tracking-wider">
                  Durée moyenne
                </div>
                <div className="mt-3 font-display text-5xl font-semibold tracking-tight leading-none">
                  3 à 6
                </div>
                <div className="mt-1 font-display text-lg font-medium">
                  semaines
                </div>
              </div>
              <div className="text-xs mt-4 opacity-80">
                Du premier contact à la mise en service — projet résidentiel type
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StepRow({
  step,
  index,
  active,
}: {
  step: (typeof STEPS)[number];
  index: number;
  active: boolean;
}) {
  return (
    <motion.div
      animate={{
        opacity: active ? 1 : 0.4,
        x: active ? 0 : -8,
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex items-center gap-5 py-4 cursor-pointer"
    >
      {/* Ligne verticale + point */}
      <div className="relative flex flex-col items-center">
        <div
          className={`relative grid place-items-center w-12 h-12 rounded-2xl transition-all duration-500 ${
            active
              ? "bg-[#0d3b2e] shadow-lg shadow-[#0d3b2e]/20 scale-110"
              : "bg-[#f6f4ee] border border-black/10"
          }`}
        >
          <step.icon
            className={`w-5 h-5 transition-colors duration-500 ${
              active ? "text-[#f5b91a]" : "text-[#0d3b2e]/50"
            }`}
          />
          {active && (
            <motion.span
              layoutId="step-dot"
              className="absolute -inset-1 rounded-2xl ring-2 ring-[#f5b91a]/40"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </div>
      </div>

      {/* Contenu */}
      <div className="flex-1 flex items-baseline gap-4">
        <span
          className={`font-display text-sm font-semibold tracking-widest transition-colors duration-500 ${
            active ? "text-[#f5b91a]" : "text-[#0d3b2e]/40"
          }`}
        >
          {step.num}
        </span>
        <div>
          <h3
            className={`font-display font-semibold tracking-tight transition-all duration-500 ${
              active
                ? "text-[clamp(1.4rem,2.4vw,2rem)] text-[#0a1f1a]"
                : "text-[clamp(1.1rem,1.8vw,1.4rem)] text-[#0a1f1a]/60"
            }`}
          >
            {step.title}
          </h3>
          {active && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="overflow-hidden lg:hidden"
            >
              <p className="mt-2 text-sm text-[#5a6b65] font-body leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          )}
        </div>
        <span className="hidden md:block text-xs text-[#5a6b65] font-body ml-auto whitespace-nowrap">
          {step.duration}
        </span>
      </div>
    </motion.div>
  );
}

function StepPanel({
  step,
  index,
}: {
  step: (typeof STEPS)[number];
  index: number;
}) {
  // Le grand numéro se déplace légèrement avec la vélocité du scroll
  const { velocity } = useSmoothScroll();
  const numX = useTransform(velocity, [-50, 0, 50], [-20, 0, 20]);
  const numScale = useTransform(velocity, [0, 50], [1, 1.05]);

  return (
    <div className="relative bg-[#f6f4ee] rounded-3xl p-8 md:p-10 border border-black/[0.06] min-h-[60vh] flex flex-col justify-between overflow-hidden">
      {/* Décor : grand numéro en filigrane animé par la vélocité */}
      <motion.span
        style={{ x: numX, scale: numScale }}
        className="absolute -top-8 -right-4 font-display text-[14rem] font-semibold text-[#0d3b2e]/5 leading-none pointer-events-none"
      >
        {step.num}
      </motion.span>

      {/* Halo */}
      <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-[#f5b91a]/10 blur-[80px]" />

      <div className="relative">
        {/* Catégorie courte */}
        <div className="text-xs font-display font-semibold text-[#0d3b2e] tracking-widest uppercase mb-4">
          Étape {step.num} — {step.short}
        </div>

        {/* Titre */}
        <h3 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-[#0a1f1a]">
          {step.title}
        </h3>

        {/* Description */}
        <p className="mt-5 text-base md:text-lg text-[#5a6b65] font-body leading-relaxed">
          {step.desc}
        </p>

        {/* Livrables */}
        <div className="mt-8">
          <div className="text-xs font-display font-semibold text-[#0d3b2e] uppercase tracking-wider mb-3">
            Livrables
          </div>
          <ul className="space-y-2.5">
            {step.deliverables.map((d, i) => (
              <motion.li
                key={d}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
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

      {/* Footer : durée + progression */}
      <div className="relative mt-8 pt-6 border-t border-black/10 flex items-center justify-between">
        <div>
          <div className="text-xs text-[#5a6b65] font-body uppercase tracking-wider">
            Durée
          </div>
          <div className="mt-1 font-display text-lg font-semibold text-[#0a1f1a]">
            {step.duration}
          </div>
        </div>
        <div className="text-xs font-display font-semibold text-[#0d3b2e]">
          {index + 1} / {STEPS.length}
        </div>
      </div>
    </div>
  );
}
