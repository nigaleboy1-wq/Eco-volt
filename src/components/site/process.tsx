"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, RevealHeadline } from "./reveal";
import { Phone, Search, PencilRuler, Boxes, Hammer, Headset } from "lucide-react";

const STEPS = [
  {
    num: "01",
    icon: Phone,
    title: "Premier contact",
    desc: "Nous échangeons sur vos besoins, votre site, vos contraintes budgétaires et vos objectifs énergétiques. Première réponse sous 48 heures.",
  },
  {
    num: "02",
    icon: Search,
    title: "Audit & analyse",
    desc: "Visite technique, analyse de vos consommations, évaluation du gisement solaire de votre site et identification des contraintes d'installation.",
  },
  {
    num: "03",
    icon: PencilRuler,
    title: "Conception & devis",
    desc: "Dimensionnement précis, sélection des équipements, plan d'implantation et proposition commerciale chiffrée et transparente.",
  },
  {
    num: "04",
    icon: Boxes,
    title: "Approvisionnement",
    desc: "Commande des équipements premium auprès de nos partenaires internationaux, contrôle qualité et logistique jusqu'à votre site.",
  },
  {
    num: "05",
    icon: Hammer,
    title: "Installation & mise en service",
    desc: "Pose par nos équipes certifiées, respect des normes, tests de performance, formation à l'usage et mise en service officielle.",
  },
  {
    num: "06",
    icon: Headset,
    title: "Suivi & maintenance",
    desc: "Télémétrie, contrats de maintenance préventive, interventions correctives rapides et accompagnement sur toute la durée de vie.",
  },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Défilement horizontal des étapes
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-78%"]);
  // Ligne de progression horizontale
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
              à la maintenance pluriannuelle. Vous savez à tout moment où en
              est votre installation.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Section sticky horizontale */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: "360vh" }}
      >
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          {/* Ligne de progression en haut */}
          <div className="absolute top-[18%] left-0 right-0 px-5 md:px-10">
            <div className="mx-auto max-w-[1400px]">
              <div className="relative h-px bg-black/10">
                <motion.div
                  style={{ width: lineWidth }}
                  className="absolute left-0 top-0 h-px bg-gradient-to-r from-[#0d3b2e] to-[#f5b91a]"
                />
              </div>
            </div>
          </div>

          <motion.div
            style={{ x }}
            className="relative flex gap-6 md:gap-10 px-5 md:px-10 will-change-transform"
          >
            {STEPS.map((step, i) => (
              <StepCard key={step.num} step={step} index={i} total={STEPS.length} />
            ))}
          </motion.div>

          {/* Indicateur progression bas */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
            <span className="text-[0.65rem] tracking-[0.25em] uppercase text-[#5a6b65] font-display">
              Étapes
            </span>
            <div className="w-32 h-1 bg-black/10 rounded-full overflow-hidden">
              <motion.div
                style={{ scaleX: scrollYProgress }}
                className="h-full bg-[#0d3b2e] origin-left"
              />
            </div>
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

function StepCard({
  step,
  index,
  total,
}: {
  step: (typeof STEPS)[number];
  index: number;
  total: number;
}) {
  return (
    <div className="shrink-0 w-[80vw] md:w-[40vw] lg:w-[30vw] relative">
      <div className="relative bg-[#f6f4ee] rounded-3xl p-8 md:p-10 border border-black/[0.06] min-h-[60vh] flex flex-col justify-between overflow-hidden group hover:border-[#0d3b2e]/20 transition-colors">
        {/* Décor : grand numéro en filigrane */}
        <span className="absolute -top-6 -right-2 font-display text-[12rem] font-semibold text-[#0d3b2e]/5 leading-none pointer-events-none">
          {step.num}
        </span>

        {/* Halo qui apparaît au hover */}
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-[#f5b91a]/0 group-hover:bg-[#f5b91a]/10 blur-[80px] transition-all duration-700" />

        <div className="relative">
          {/* Icône */}
          <div className="relative inline-grid place-items-center w-16 h-16 rounded-2xl bg-white border border-black/10 shadow-lg shadow-[#0d3b2e]/10 mb-6">
            <step.icon className="w-6 h-6 text-[#0d3b2e]" />
            <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#f5b91a] text-[#07241c] grid place-items-center text-xs font-display font-bold border-2 border-[#f6f4ee]">
              {index + 1}
            </span>
          </div>

          {/* Titre */}
          <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-[#0a1f1a]">
            {step.title}
          </h3>

          {/* Description */}
          <p className="mt-4 text-base text-[#5a6b65] font-body leading-relaxed">
            {step.desc}
          </p>
        </div>

        {/* Footer de la carte */}
        <div className="relative mt-8 pt-6 border-t border-black/10 flex items-center justify-between">
          <span className="text-xs font-display font-semibold text-[#0d3b2e] tracking-widest">
            ÉTAPE {step.num}
          </span>
          <span className="text-xs text-[#5a6b65] font-body">
            {index + 1} / {total}
          </span>
        </div>
      </div>
    </div>
  );
}
