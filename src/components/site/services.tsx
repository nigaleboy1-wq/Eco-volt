"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Sun,
  Battery,
  Zap,
  Car,
  Wrench,
  ClipboardCheck,
  Lightbulb,
  ArrowUpRight,
} from "lucide-react";
import { Reveal, RevealHeadline } from "./reveal";

const SERVICES = [
  {
    id: "solar",
    num: "01",
    icon: Sun,
    title: "Systèmes photovoltaïques",
    short: "Production solaire",
    desc: "Conception et installation de centrales solaires adaptées à votre toiture ou à votre terrain, dimensionnées pour maximiser votre autonomie énergétique.",
    points: ["Surimposition & intégration toiture", "Centrales solaires au sol", "Systèmes hybrides & isolés"],
    image:
      "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "storage",
    num: "02",
    icon: Battery,
    title: "Stockage par batteries",
    short: "Énergie disponible 24/7",
    desc: "Des bancs de batteries lithium intelligentes qui stockent votre énergie solaire pour la restituer la nuit ou en cas de coupure, garantissant une continuité de service totale.",
    points: ["Batteries lithium LiFePO4", "Autonomie personnalisée", "Gestion intelligente de l'énergie"],
    image:
      "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "inverter",
    num: "03",
    icon: Zap,
    title: "Onduleurs & conversion",
    short: "Électricité propre et stable",
    desc: "Sélection et intégration d'onduleurs de pointe qui transforment le courant continu produit par vos panneaux en électricité alternative parfaite, compatible avec vos usages.",
    points: ["Onduleurs string & centralisés", "Onduleurs hybrides intelligents", "Monitoring en temps réel"],
    image:
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "ev",
    num: "04",
    icon: Car,
    title: "Bornes de recharge VE",
    short: "Mobilité électrique",
    desc: "Installation de bornes de recharge pour véhicules électriques, en maison comme en entreprise, intégrant la recharge solaire pour une mobilité réellement décarbonée.",
    points: ["Bornes AC & DC", "Recharge solaire directe", "Gestion de flotte & facturation"],
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "maintenance",
    num: "05",
    icon: Wrench,
    title: "Maintenance & SAV",
    short: "Préventive & corrective",
    desc: "Contrats de maintenance préventive et intervention corrective rapide pour préserver la performance de votre installation sur toute sa durée de vie.",
    points: ["Contrats annuels sur mesure", "Intervention sous 48h", "Télémétrie & alertes intelligentes"],
    image:
      "https://images.unsplash.com/photo-1581092446327-9b52bd1570c2?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "audit",
    num: "06",
    icon: ClipboardCheck,
    title: "Audit énergétique",
    short: "Diagnostic & recommandations",
    desc: "Analyse complète de vos consommations et de vos gisements d'économie, accompagnée d'un plan d'action chiffré et hiérarchisé pour réduire durablement votre facture.",
    points: ["Bilan de consommation détaillé", "Modélisation des économies", "Plan d'action priorisé"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "consulting",
    num: "07",
    icon: Lightbulb,
    title: "Conseil technique",
    short: "Expertise & ingénierie",
    desc: "Accompagnement technique pour porteurs de projet, institutions et industriels : dimensionnement, choix d'équipements, supervision de chantier et formation.",
    points: ["Études de faisabilité", "Supervision de chantier", "Formation de vos équipes"],
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
  },
];

export function Services() {
  const [active, setActive] = useState(0);

  // Le panneau d'image reste collé pendant le défilement des cartes
  return (
    <section
      id="services"
      className="relative bg-white py-24 md:py-36 overflow-hidden"
    >
      {/* En-tête */}
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <Reveal>
              <span className="section-label text-[#0d3b2e]">
                <span className="w-8 h-px bg-[#f5b91a]" />
                Nos services
              </span>
            </Reveal>
            <h2 className="mt-6 font-display font-semibold tracking-[-0.03em] leading-[1.02] text-[clamp(2rem,4.5vw,3.6rem)] text-[#0a1f1a] text-balance max-w-2xl">
              <RevealHeadline text="Une gamme complète" />{" "}
              <RevealHeadline text="pour chaque besoin" delay={0.1} />{" "}
              <RevealHeadline text="énergétique." delay={0.2} />
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="text-base text-[#5a6b65] font-body leading-relaxed max-w-sm">
              De l'étude initiale à la maintenance pluriannuelle, nous couvrons
              l'ensemble du cycle de vie de votre installation solaire avec la
              même exigence d'excellence.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Layout sticky : image à gauche, liste défilante à droite */}
      <div
        className="mt-16 md:mt-24 mx-auto max-w-[1400px] px-5 md:px-10 grid lg:grid-cols-2 gap-8 lg:gap-16"
      >
        {/* Colonne image collante */}
        <div className="hidden lg:block">
          <div className="sticky top-24 h-[70vh] rounded-3xl overflow-hidden bg-[#07241c] shadow-2xl shadow-[#0d3b2e]/20">
            <AnimatePresence mode="wait">
              <motion.div
                key={SERVICES[active].id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url('${SERVICES[active].image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07241c] via-[#07241c]/40 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Numéro géant */}
            <div className="absolute top-8 left-8 font-display text-7xl font-semibold text-white/15">
              {SERVICES[active].num}
            </div>

            {/* Contenu superposé */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={SERVICES[active].id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {(() => {
                    const Icon = SERVICES[active].icon;
                    return <Icon className="w-7 h-7 text-[#f5b91a] mb-4" />;
                  })()}
                  <h3 className="font-display text-3xl font-semibold tracking-tight">
                    {SERVICES[active].title}
                  </h3>
                  <p className="mt-3 text-white/75 font-body text-sm leading-relaxed max-w-md">
                    {SERVICES[active].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Barre de progression */}
            <div className="absolute top-8 right-8 flex flex-col gap-2">
              {SERVICES.map((s, i) => (
                <span
                  key={s.id}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === active ? "w-8 bg-[#f5b91a]" : "w-4 bg-white/25"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Colonne liste de services */}
        <div className="flex flex-col">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              active={active}
              setActive={setActive}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
  active,
  setActive,
}: {
  service: (typeof SERVICES)[number];
  index: number;
  active: number;
  setActive: (i: number) => void;
}) {
  const localRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: localRef,
    offset: ["start 70%", "start 30%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [20, 0]);

  const isActive = active === index;

  return (
    <motion.div
      ref={localRef}
      style={{ opacity }}
      onMouseEnter={() => setActive(index)}
      className="group relative border-b border-black/10 py-8 lg:py-10 cursor-pointer"
    >
      <motion.div style={{ x }} className="relative flex items-baseline gap-5 lg:gap-7">
        {/* Numéro */}
        <span
          className={`font-display text-sm font-semibold tracking-widest transition-colors duration-500 shrink-0 pt-2 ${
            isActive ? "text-[#f5b91a]" : "text-[#0d3b2e]/40"
          }`}
        >
          {service.num}
        </span>

        {/* Contenu */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <h3
              className={`font-display font-semibold tracking-tight transition-all duration-500 ${
                isActive
                  ? "text-[clamp(1.6rem,2.6vw,2.4rem)] text-[#0a1f1a]"
                  : "text-[clamp(1.3rem,2vw,1.8rem)] text-[#0a1f1a]/60"
              }`}
            >
              {service.title}
            </h3>
            <motion.div
              animate={{
                rotate: isActive ? 45 : 0,
                backgroundColor: isActive ? "#0d3b2e" : "rgba(13,59,46,0.08)",
                color: isActive ? "#f5b91a" : "#0d3b2e",
              }}
              transition={{ duration: 0.4 }}
              className="grid place-items-center w-10 h-10 rounded-full shrink-0"
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Résumé mobile / desktop */}
          <p className="mt-3 text-sm md:text-base text-[#5a6b65] font-body leading-relaxed max-w-2xl">
            {service.desc}
          </p>

          {/* Points clés (uniquement sur la version mobile) */}
          <div className="lg:hidden mt-4 flex flex-wrap gap-2">
            {service.points.map((p) => (
              <span
                key={p}
                className="text-xs px-3 py-1 rounded-full bg-[#e8f1ec] text-[#0d3b2e]"
              >
                {p}
              </span>
            ))}
          </div>

          {/* Points clés animés desktop */}
          <motion.div
            initial={false}
            animate={{
              height: isActive ? "auto" : 0,
              opacity: isActive ? 1 : 0,
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block overflow-hidden"
          >
            <div className="pt-5 flex flex-wrap gap-2.5">
              {service.points.map((p) => (
                <span
                  key={p}
                  className="text-xs px-3.5 py-1.5 rounded-full bg-[#e8f1ec] text-[#0d3b2e] font-medium"
                >
                  {p}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
