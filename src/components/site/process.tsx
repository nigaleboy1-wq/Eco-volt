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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="process"
      ref={ref}
      className="relative bg-white py-24 md:py-36 overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Colonne gauche : titre sticky */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <Reveal>
                <span className="section-label text-[#0d3b2e]">
                  <span className="w-8 h-px bg-[#f5b91a]" />
                  Notre processus
                </span>
              </Reveal>
              <h2 className="mt-6 font-display font-semibold tracking-[-0.03em] leading-[1.02] text-[clamp(2rem,4vw,3.4rem)] text-[#0a1f1a] text-balance">
                <RevealHeadline text="Six étapes," />{" "}
                <RevealHeadline text="zéro surprise." delay={0.1} />
              </h2>
              <Reveal delay={0.2}>
                <p className="mt-6 text-base text-[#5a6b65] font-body leading-relaxed">
                  Une méthode éprouvée qui sécurise chaque projet, du premier
                  appel à la maintenance pluriannuelle. Vous savez à tout moment
                  où en est votre installation et ce qui reste à venir.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-8 p-5 rounded-2xl bg-[#e8f1ec] border border-[#0d3b2e]/10">
                  <div className="font-display text-sm font-semibold text-[#0d3b2e]">
                    Durée moyenne d'un projet résidentiel
                  </div>
                  <div className="mt-1 font-display text-3xl font-semibold text-[#0a1f1a]">
                    3 à 6 semaines
                  </div>
                  <div className="text-xs text-[#5a6b65] mt-1">
                    Du premier contact à la mise en service
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Colonne droite : timeline */}
          <div className="lg:col-span-8 relative">
            {/* Ligne verticale de fond */}
            <div className="absolute left-[28px] md:left-[44px] top-2 bottom-2 w-px bg-black/10" />
            {/* Ligne animée */}
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-[28px] md:left-[44px] top-2 w-px bg-gradient-to-b from-[#0d3b2e] to-[#f5b91a]"
            />

            <div className="flex flex-col gap-12 md:gap-16">
              {STEPS.map((step, i) => (
                <Reveal key={step.num} delay={0.05 * i}>
                  <div className="relative pl-20 md:pl-28">
                    {/* Nœud */}
                    <div className="absolute left-0 top-0 grid place-items-center w-[58px] md:w-[90px]">
                      <div className="relative grid place-items-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white border border-black/10 shadow-lg shadow-[#0d3b2e]/5">
                        <step.icon className="w-5 h-5 md:w-6 md:h-6 text-[#0d3b2e]" />
                        <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#f5b91a] text-[#07241c] grid place-items-center text-xs font-display font-bold">
                          {i + 1}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-baseline md:gap-6">
                      <span className="font-display text-5xl md:text-6xl font-semibold text-[#0d3b2e]/10 tracking-tighter leading-none">
                        {step.num}
                      </span>
                      <div className="mt-2 md:mt-0 flex-1">
                        <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-[#0a1f1a]">
                          {step.title}
                        </h3>
                        <p className="mt-3 text-base text-[#5a6b65] font-body leading-relaxed max-w-xl">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
