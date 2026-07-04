"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, RevealHeadline } from "./reveal";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";

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

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = TESTIMONIALS[index];

  const go = (dir: 1 | -1) => {
    setIndex(
      (i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length
    );
  };

  return (
    <section className="relative bg-[#f6f4ee] py-24 md:py-36 overflow-hidden">
      <div className="absolute -bottom-32 -left-32 w-[40vw] h-[40vw] rounded-full bg-[#0d3b2e]/5 blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Colonne gauche : intro + navigation */}
          <div className="lg:col-span-4">
            <Reveal>
              <span className="section-label text-[#0d3b2e]">
                <span className="w-8 h-px bg-[#f5b91a]" />
                Témoignages
              </span>
            </Reveal>
            <h2 className="mt-6 font-display font-semibold tracking-[-0.03em] leading-[1.02] text-[clamp(2rem,4vw,3.4rem)] text-[#0a1f1a] text-balance">
              <RevealHeadline text="La parole" />{" "}
              <RevealHeadline text="à nos clients." delay={0.1} />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-6 text-base text-[#5a6b65] font-body leading-relaxed">
                Particuliers, entreprises, institutions : ils nous ont fait
                confiance pour leur indépendance énergétique. Voici ce qu'ils en
                disent.
              </p>
            </Reveal>

            {/* Note moyenne */}
            <Reveal delay={0.3}>
              <div className="mt-10 flex items-center gap-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-[#f5b91a] fill-[#f5b91a]"
                    />
                  ))}
                </div>
                <div>
                  <div className="font-display text-lg font-semibold text-[#0a1f1a]">
                    4,9 / 5
                  </div>
                  <div className="text-xs text-[#5a6b65]">
                    Satisfaction moyenne sur 320 avis vérifiés
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Flèches */}
            <div className="mt-10 flex items-center gap-3">
              <button
                onClick={() => go(-1)}
                aria-label="Témoignage précédent"
                className="grid place-items-center w-12 h-12 rounded-full border border-black/10 hover:bg-[#0d3b2e] hover:text-white hover:border-[#0d3b2e] transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Témoignage suivant"
                className="grid place-items-center w-12 h-12 rounded-full border border-black/10 hover:bg-[#0d3b2e] hover:text-white hover:border-[#0d3b2e] transition-all"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="ml-4 font-display text-sm text-[#5a6b65]">
                {String(index + 1).padStart(2, "0")} —{" "}
                {String(TESTIMONIALS.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Colonne droite : témoignage */}
          <div className="lg:col-span-8 relative">
            <Quote className="absolute -top-6 -left-2 w-24 h-24 text-[#0d3b2e]/8" />
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <p className="font-display text-2xl md:text-4xl lg:text-5xl font-medium leading-[1.15] tracking-tight text-[#0a1f1a] text-balance">
                  « {t.quote} »
                </p>

                <div className="mt-10 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#0d3b2e] grid place-items-center text-[#f5b91a] font-display text-xl font-semibold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-display text-lg font-semibold text-[#0a1f1a]">
                      {t.name}
                    </div>
                    <div className="text-sm text-[#5a6b65] font-body">
                      {t.role} — {t.company}, {t.location}
                    </div>
                  </div>
                </div>
              </motion.blockquote>
            </AnimatePresence>

            {/* Barre de progression */}
            <div className="mt-12 flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Aller au témoignage ${i + 1}`}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === index
                      ? "w-12 bg-[#0d3b2e]"
                      : "w-6 bg-black/15 hover:bg-black/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
