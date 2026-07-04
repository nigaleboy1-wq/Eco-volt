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
      "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=1600&q=80",
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
      "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=1600&q=80",
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
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1600&q=80",
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
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1600&q=80",
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
      "https://images.unsplash.com/photo-1581092446327-9b52bd1570c2?auto=format&fit=crop&w=1600&q=80",
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
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
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
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
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
        style={{ height: `${(SERVICES.length + 1) * 100}vh` }}
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
                <Reveal>
                  <span className="section-label text-[#0d3b2e]">
                    <span className="w-8 h-px bg-[#f5b91a]" />
                    Nos services
                  </span>
                </Reveal>
                <h2 className="mt-6 font-display font-semibold tracking-[-0.03em] leading-[1.02] text-[clamp(2rem,4.5vw,3.6rem)] text-[#0a1f1a] text-balance max-w-3xl">
                  <RevealHeadline text="Une gamme complète" />{" "}
                  <RevealHeadline text="pour chaque besoin" delay={0.1} />{" "}
                  <RevealHeadline text="énergétique." delay={0.2} />
                </h2>
                <Reveal delay={0.2}>
                  <p className="mt-7 text-base md:text-lg text-[#5a6b65] font-body leading-relaxed max-w-2xl">
                    De l'étude initiale à la maintenance pluriannuelle, nous
                    couvrons l'ensemble du cycle de vie de votre installation
                    solaire. Faites défiler pour découvrir nos 7 expertises,
                    l'une après l'autre.
                  </p>
                </Reveal>
                <Reveal delay={0.3}>
                  <div className="mt-10 inline-flex items-center gap-3 px-5 py-3 rounded-full bg-[#0d3b2e] text-white text-sm font-display">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-[#f5b91a] opacity-75 animate-ping" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#f5b91a]" />
                    </span>
                    Faites défiler pour explorer nos services
                  </div>
                </Reveal>
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
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 h-full items-center py-16">
                  {/* Colonne gauche : image */}
                  <div className="lg:col-span-7 relative h-[40vh] md:h-[55vh] lg:h-[70vh] rounded-3xl overflow-hidden bg-[#07241c] shadow-2xl shadow-[#0d3b2e]/20">
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
                  <div className="lg:col-span-5 flex flex-col justify-center">
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
                        <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#0a1f1a] leading-[1.05] text-balance">
                          {currentService.title}
                        </h3>
                        <p className="mt-5 text-base md:text-lg text-[#5a6b65] font-body leading-relaxed text-pretty">
                          {currentService.desc}
                        </p>

                        {/* Points clés */}
                        <div className="mt-7 flex flex-wrap gap-2">
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
                      {String(SERVICES.length).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-[0.65rem] tracking-[0.25em] uppercase text-[#5a6b65] font-display">
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
