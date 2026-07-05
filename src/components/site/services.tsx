"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Sun,
  Battery,
  Zap,
  Car,
  Wrench,
  ClipboardCheck,
  Lightbulb,
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
      "https://sfile.chatglm.cn/images-ppt/49533bf4be59.jpg",
  },
  {
    id: "storage",
    num: "02",
    icon: Battery,
    title: "Stockage par batteries",
    short: "Énergie disponible 24/7",
    desc: "Des bancs de batteries lithium intelligentes qui stockent votre énergie solaire pour la restituer la nuit ou en cas de coupure.",
    points: ["Batteries lithium LiFePO4", "Autonomie personnalisée", "Gestion intelligente de l'énergie"],
    image:
      "https://sfile.chatglm.cn/images-ppt/3048aba49cf9.jpg",
  },
  {
    id: "inverter",
    num: "03",
    icon: Zap,
    title: "Onduleurs & conversion",
    short: "Électricité propre et stable",
    desc: "Sélection et intégration d'onduleurs de pointe qui transforment le courant continu produit en électricité alternative parfaite.",
    points: ["Onduleurs string & centralisés", "Onduleurs hybrides intelligents", "Monitoring en temps réel"],
    image:
      "https://sfile.chatglm.cn/images-ppt/85ba21b90f30.jpg",
  },
  {
    id: "ev",
    num: "04",
    icon: Car,
    title: "Bornes de recharge VE",
    short: "Mobilité électrique",
    desc: "Installation de bornes de recharge pour véhicules électriques, intégrant la recharge solaire pour une mobilité décarbonée.",
    points: ["Bornes AC & DC", "Recharge solaire directe", "Gestion de flotte & facturation"],
    image:
      "https://sfile.chatglm.cn/images-ppt/3463dee91a77.jpg",
  },
  {
    id: "maintenance",
    num: "05",
    icon: Wrench,
    title: "Maintenance & SAV",
    short: "Préventive & corrective",
    desc: "Contrats de maintenance préventive et intervention corrective rapide pour préserver la performance de votre installation.",
    points: ["Contrats annuels sur mesure", "Intervention sous 48h", "Télémétrie & alertes intelligentes"],
    image:
      "https://sfile.chatglm.cn/images-ppt/a80178d2a800.jpg",
  },
  {
    id: "audit",
    num: "06",
    icon: ClipboardCheck,
    title: "Audit énergétique",
    short: "Diagnostic & recommandations",
    desc: "Analyse complète de vos consommations et de vos gisements d'économie, accompagnée d'un plan d'action chiffré et hiérarchisé.",
    points: ["Bilan de consommation détaillé", "Modélisation des économies", "Plan d'action priorisé"],
    image:
      "https://sfile.chatglm.cn/images-ppt/3b1748e0e055.png",
  },
  {
    id: "consulting",
    num: "07",
    icon: Lightbulb,
    title: "Conseil technique",
    short: "Expertise & ingénierie",
    desc: "Accompagnement technique pour porteurs de projet, institutions et industriels : dimensionnement, choix d'équipements, supervision.",
    points: ["Études de faisabilité", "Supervision de chantier", "Formation de vos équipes"],
    image:
      "https://sfile.chatglm.cn/images-ppt/866464a91477.jpg",
  },
];

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // L'étape active est calculée à partir de scrollYProgress
  // 0 = en-tête, 1..7 = services
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      // v va de 0 à 1 sur toute la section (en-tête + 7 services)
      // On réserve les 10% pour l'en-tête, puis on divise le reste en 7
      if (v < 0.1) {
        setActiveStep(0);
      } else {
        const step = Math.min(
          Math.floor(((v - 0.1) / 0.9) * SERVICES.length) + 1,
          SERVICES.length
        );
        setActiveStep(step);
      }
    });
    return () => unsub();
  }, [scrollYProgress]);

  const activeIndex = activeStep > 0 ? activeStep - 1 : -1;
  const currentService = activeIndex >= 0 ? SERVICES[activeIndex] : null;

  // La barre de progression dans le footer
  const progressWidth = useTransform(
    scrollYProgress,
    [0.1, 1],
    ["0%", "100%"]
  );

  return (
    <section
      id="services"
      className="relative bg-white"
    >
      {/* Container avec hauteur = en-tête (100vh) + 7 services (100vh chacun) */}
      <div
        ref={containerRef}
        style={{ height: `${(SERVICES.length + 1) * 80}vh` }}
        className="relative"
      >
        {/* Vue sticky qui reste fixée pendant tout le scroll */}
        <div className="sticky top-0 h-screen overflow-hidden">
          <AnimatePresence mode="wait">
            {/* En-tête (visible quand activeStep === 0) */}
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
                      Nos services · 07 expertises
                    </span>
                  </div>
                </Reveal>

                <h2 className="font-display font-bold tracking-[-0.04em] leading-[0.95] text-[clamp(2rem,5vw,4rem)] text-[#0a1f1a] text-balance max-w-4xl">
                  <RevealHeadline text="Une gamme" />{" "}
                  <RevealHeadline text="complète pour" delay={0.08} />{" "}
                  <RevealHeadline text="chaque besoin énergétique." delay={0.16} className="italic font-light text-[#0d3b2e]" />
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
                      d="M 80 40 Q 180 10, 280 40 T 480 40 T 680 40 T 880 40 T 1080 40 T 1120 40"
                      stroke="#f5b91a"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.4, duration: 1.5, ease: "easeInOut" }}
                    />
                  </svg>

                  {/* 7 services en ligne horizontale */}
                  <div className="relative grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-2">
                    {SERVICES.map((s, i) => (
                      <motion.div
                        key={s.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
                        className="flex flex-col items-center text-center group"
                      >
                        {/* Plateforme blanche avec icône */}
                        <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white shadow-lg shadow-[#0d3b2e]/10 grid place-items-center mb-3 group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 border border-black/[0.04]">
                          <s.icon className="w-5 h-5 md:w-6 md:h-6 text-[#0d3b2e]" />
                          {/* Pastille numéro */}
                          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#f5b91a] text-[#07241c] grid place-items-center text-[0.6rem] font-display font-bold border-2 border-white">
                            {i + 1}
                          </span>
                        </div>
                        {/* Numéro jaune */}
                        <span className="font-display font-bold text-xs text-[#f5b91a] mb-1">{s.num}</span>
                        {/* Titre service */}
                        <span className="text-[0.7rem] md:text-xs text-[#0a1f1a] font-body font-medium leading-tight max-w-[7rem]">
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
                      De l'étude initiale à la maintenance pluriannuelle, nous
                      couvrons l'ensemble du cycle de vie de votre installation
                      solaire. Faites défiler pour découvrir nos 7 expertises,
                      l'une après l'autre.
                    </p>
                  </Reveal>
                  <Reveal delay={0.4} className="lg:col-span-4 lg:justify-self-end">
                    <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-[#0d3b2e] text-white text-sm font-display font-medium shadow-lg shadow-[#0d3b2e]/20">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-[#f5b91a] opacity-75 animate-ping" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#f5b91a]" />
                      </span>
                      Faites défiler pour explorer
                    </div>
                  </Reveal>
                </div>
              </motion.div>
            )}

            {/* Vue service actif */}
            {currentService && (
              <motion.div
                key={currentService.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 mx-auto max-w-[1400px] px-5 md:px-10"
              >
                <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 h-full items-center py-12 md:py-10">
                  {/* Colonne gauche : image */}
                  <div className="lg:col-span-6 relative h-[38vh] md:h-[52vh] lg:h-[68vh] rounded-3xl overflow-hidden bg-[#07241c] shadow-2xl shadow-[#0d3b2e]/20">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentService.id}
                        initial={{ opacity: 0, scale: 1.08 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0"
                      >
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage: `url('${currentService.image}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#07241c] via-[#07241c]/40 to-transparent" />
                      </motion.div>
                    </AnimatePresence>

                    {/* Numéro géant */}
                    <div className="absolute top-6 left-6 font-display text-6xl md:text-7xl font-semibold text-white/15">
                      {currentService.num}
                    </div>

                    {/* Indicateur de progression vertical */}
                    <div className="absolute top-6 right-6 flex flex-col gap-2">
                      {SERVICES.map((s, i) => (
                        <motion.span
                          key={s.id}
                          animate={{
                            width: i === activeIndex ? 28 : 12,
                            backgroundColor:
                              i === activeIndex ? "#f5b91a" : "rgba(255,255,255,0.25)",
                          }}
                          transition={{ duration: 0.4 }}
                          className="h-1 rounded-full"
                        />
                      ))}
                    </div>

                    {/* Icône en bas à gauche */}
                    <div className="absolute bottom-6 left-6">
                      <div className="w-14 h-14 rounded-2xl glass grid place-items-center">
                        {(() => {
                          const Icon = currentService.icon;
                          return <Icon className="w-6 h-6 text-[#f5b91a]" />;
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* Colonne droite : contenu */}
                  <div className="lg:col-span-6 flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentService.id}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                      >
                        <div className="text-xs font-display font-semibold text-[#f5b91a] tracking-widest uppercase mb-4">
                          {currentService.short}
                        </div>
                        <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-[#0a1f1a] leading-[1.08] text-balance">
                          {currentService.title}
                        </h3>
                        <p className="mt-4 text-sm md:text-base text-[#5a6b65] font-body leading-relaxed text-pretty">
                          {currentService.desc}
                        </p>

                        {/* Points clés */}
                        <div className="mt-5 flex flex-wrap gap-2">
                          {currentService.points.map((p, i) => (
                            <motion.span
                              key={p}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 + i * 0.1 }}
                              className="text-xs px-3.5 py-1.5 rounded-full bg-[#e8f1ec] text-[#0d3b2e] font-medium font-body"
                            >
                              {p}
                            </motion.span>
                          ))}
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
                    {String(SERVICES.length).padStart(2, "0")}
                  </span>
                  <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[#5a6b65] font-display ml-2">
                    Service {activeStep} / {SERVICES.length}
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
