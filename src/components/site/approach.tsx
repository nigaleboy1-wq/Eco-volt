"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Reveal, RevealHeadline } from "./reveal";
import { TrendingDown, Calendar, Wallet, ArrowDownRight } from "lucide-react";

export function Approach() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // === Animation de transition entrée/sortie ===
  // Voile subtil qui apparaît à l'entrée et à la sortie
  const veilOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.12, 0.88, 0.95, 1],
    [0.6, 0.3, 0, 0, 0.3, 0.6]
  );
  // Contenu : fondu léger à l'entrée et à la sortie
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.12, 0.88, 0.95, 1],
    [0.5, 0.8, 1, 1, 0.8, 0.5]
  );
  const contentScale = useTransform(
    scrollYProgress,
    [0, 0.05, 0.12, 0.88, 0.95, 1],
    [0.98, 0.99, 1, 1, 0.99, 0.98]
  );

  // Animation de la courbe qui se dessine au scroll
  const pathLength = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);
  // Le point qui se déplace sur la courbe
  const dotX = useTransform(scrollYProgress, [0.1, 0.5], [50, 550]);
  const dotY = useTransform(scrollYProgress, [0.1, 0.5], [320, 80]);
  const dotOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.45, 0.5], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative bg-white py-16 md:py-24 overflow-hidden"
    >
      {/* Voile de transition (entrée/sortie) */}
      <motion.div
        style={{ opacity: veilOpacity }}
        className="absolute inset-0 bg-white pointer-events-none z-10"
      />

      <motion.div
        style={{ opacity: contentOpacity, scale: contentScale }}
        className="relative z-20 mx-auto max-w-[1280px] px-6 md:px-10"
      >
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* === COLONNE GAUCHE : Graphique animé === */}
          <div className="relative order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-[#F8F7F2] rounded-3xl p-6 md:p-8 border border-[#0E3B2E]/8 shadow-xl shadow-[#0E3B2E]/8"
            >
              {/* En-tête du graphique */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs font-display font-semibold tracking-[0.2em] uppercase text-[#0E3B2E]/60">
                    Évolution
                  </div>
                  <div className="font-display font-bold text-xl text-[#132C25] mt-1">
                    Facture énergétique
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-[#0E3B2E] text-white px-3 py-1.5 rounded-full text-xs font-display font-semibold">
                  <TrendingDown className="w-3 h-3 text-[#D8A928]" />
                  −70%
                </div>
              </div>

              {/* Graphique SVG animé */}
              <div className="relative">
                <svg
                  viewBox="0 0 600 400"
                  className="w-full h-auto"
                  fill="none"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Grille de fond */}
                  {[100, 200, 300].map((y) => (
                    <line
                      key={y}
                      x1="50"
                      y1={y}
                      x2="580"
                      y2={y}
                      stroke="#0E3B2E"
                      strokeOpacity="0.06"
                      strokeDasharray="4 4"
                    />
                  ))}

                  {/* Axe Y (€) */}
                  <text x="20" y="90" fill="#0E3B2E" fillOpacity="0.4" fontSize="11" fontFamily="sans-serif">100%</text>
                  <text x="20" y="200" fill="#0E3B2E" fillOpacity="0.4" fontSize="11" fontFamily="sans-serif">50%</text>
                  <text x="20" y="310" fill="#0E3B2E" fillOpacity="0.4" fontSize="11" fontFamily="sans-serif">0%</text>

                  {/* Barres : facture avant solaire (hautes, grises) */}
                  {[0, 1, 2].map((i) => (
                    <motion.rect
                      key={`before-${i}`}
                      x={90 + i * 60}
                      y={80}
                      width="32"
                      height={240}
                      rx="4"
                      fill="#0E3B2E"
                      fillOpacity="0.1"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: "bottom", transformBox: "fill-box" }}
                    />
                  ))}

                  {/* Barres : facture après solaire (basses, dorées) */}
                  {[0, 1, 2].map((i) => (
                    <motion.rect
                      key={`after-${i}`}
                      x={350 + i * 60}
                      y={220}
                      width="32"
                      height={100}
                      rx="4"
                      fill="#D8A928"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: "bottom", transformBox: "fill-box" }}
                    />
                  ))}

                  {/* Courbe de transition (se dessine au scroll) */}
                  <motion.path
                    d="M 130 90 Q 250 90, 280 200 T 470 230"
                    stroke="#D8A928"
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{ pathLength }}
                  />

                  {/* Point qui se déplace sur la courbe */}
                  <motion.circle
                    r="6"
                    fill="#0E3B2E"
                    stroke="#D8A928"
                    strokeWidth="2"
                    style={{ cx: dotX, cy: dotY, opacity: dotOpacity }}
                  />

                  {/* Labels mois */}
                  <text x="100" y="360" fill="#0E3B2E" fillOpacity="0.5" fontSize="11" fontFamily="sans-serif">Avant</text>
                  <text x="360" y="360" fill="#0E3B2E" fillOpacity="0.5" fontSize="11" fontFamily="sans-serif">Après solaire</text>

                  {/* Séparateur vertical */}
                  <line
                    x1="310"
                    y1="70"
                    x2="310"
                    y2="340"
                    stroke="#0E3B2E"
                    strokeOpacity="0.1"
                    strokeDasharray="3 3"
                  />
                  <text x="280" y="65" fill="#D8A928" fontSize="10" fontFamily="sans-serif" fontWeight="600">INSTALLATION</text>
                </svg>
              </div>

              {/* Légende en bas */}
              <div className="flex items-center gap-5 mt-4 pt-4 border-t border-[#0E3B2E]/8">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-[#0E3B2E]/15" />
                  <span className="text-xs text-[#0E3B2E]/60 font-body">Avant solaire</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-[#D8A928]" />
                  <span className="text-xs text-[#0E3B2E]/60 font-body">Après solaire</span>
                </div>
              </div>
            </motion.div>

            {/* Carte flottante −70% */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              className="absolute -top-6 -right-4 md:-right-8 bg-[#D8A928] text-[#0E3B2E] rounded-2xl px-5 py-4 shadow-xl"
            >
              <div className="font-display text-2xl font-semibold tracking-tight">
                −70%
              </div>
              <div className="text-xs mt-0.5 font-body">
                facture énergétique
              </div>
            </motion.div>
          </div>

          {/* === COLONNE DROITE : Texte === */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <div className="flex items-center gap-4 mb-5">
                <span className="w-10 h-px bg-[#D8A928]" />
                <span className="text-xs font-display font-semibold tracking-[0.3em] uppercase text-[#0E3B2E]">
                  Notre approche
                </span>
              </div>
            </Reveal>
            <h2 className="font-display font-bold tracking-[-0.035em] leading-[1.05] text-[clamp(1.75rem,3.5vw,3rem)] text-[#132C25] text-balance">
              <RevealHeadline text="L'énergie solaire," />{" "}
              <RevealHeadline text="pensée comme un" delay={0.08} />{" "}
              <RevealHeadline text="investissement," delay={0.16} />{" "}
              <RevealHeadline text="pas comme une dépense." delay={0.24} />
            </h2>

            <Reveal delay={0.2}>
              <p className="mt-6 text-base md:text-lg text-[#0E3B2E]/70 font-body leading-relaxed text-pretty">
                Chaque installation EcoVolt est conçue pour produire un retour
                sur investissement mesurable. Nous modélisons votre
                rentabilité, comparons les scénarios et vous accompagnons dans
                le financement de votre projet.
              </p>
            </Reveal>

            <div className="mt-8 space-y-5">
              {[
                {
                  icon: Wallet,
                  k: "Économies",
                  v: "Jusqu'à 70 % de réduction sur votre facture électrique dès la première année.",
                },
                {
                  icon: Calendar,
                  k: "Durabilité",
                  v: "Équipements premium garantis jusqu'à 25 ans, conçus pour le climat sahélien.",
                },
                {
                  icon: TrendingDown,
                  k: "Valeur",
                  v: "Votre patrimoine prend de la valeur, votre empreinte carbone baisse.",
                },
              ].map((item, i) => (
                <Reveal key={item.k} delay={0.3 + i * 0.1}>
                  <div className="flex items-start gap-4 group">
                    <div className="w-9 h-9 rounded-xl bg-[#FFF9EC] grid place-items-center shrink-0 group-hover:bg-[#0E3B2E] transition-colors duration-500">
                      <item.icon className="w-4 h-4 text-[#0E3B2E] group-hover:text-[#D8A928] transition-colors duration-500" />
                    </div>
                    <div className="flex-1 pb-5 border-b border-[#0E3B2E]/10">
                      <div className="font-display text-sm font-semibold text-[#D8A928] tracking-widest uppercase mb-1">
                        {item.k}
                      </div>
                      <p className="text-base text-[#132C25] font-body leading-relaxed">
                        {item.v}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
