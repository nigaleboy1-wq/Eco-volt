"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Reveal, RevealHeadline } from "./reveal";
import { ArrowUpRight, MapPin } from "lucide-react";

const PROJECTS = [
  {
    title: "Centrale solaire industrielle",
    category: "Industriel",
    location: "Bobo-Dioulasso, Burkina Faso",
    size: "850 kWc",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Résidence autonome hors-réseau",
    category: "Résidentiel",
    location: "Ouagadougou, Burkina Faso",
    size: "12 kWc",
    image:
      "https://images.unsplash.com/photo-1561375894-7e9f71c1c7f0?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Centre de santé connecté",
    category: "Institutionnel",
    location: "Koudougou, Burkina Faso",
    size: "60 kWc + stockage",
    image:
      "https://images.unsplash.com/photo-1631805782872-f3b91c87f3a8?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Complexe scolaire solaire",
    category: "Éducation",
    location: "Bamako, Mali",
    size: "150 kWc",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Siège social entreprise",
    category: "Tertiaire",
    location: "Abidjan, Côte d'Ivoire",
    size: "240 kWc + VE",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Stockage agroalimentaire",
    category: "Agro-industrie",
    location: "Ouahigouya, Burkina Faso",
    size: "180 kWc",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1600&q=80",
  },
];

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Défilement horizontal piloté par le scroll vertical
  // -68% pour laisser la carte CTA finale bien visible
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);

  return (
    <section
      id="projects"
      className="relative bg-[#f6f4ee] overflow-hidden"
    >
      {/* En-tête */}
      <div className="py-24 md:py-32 mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <Reveal>
              <span className="section-label text-[#0d3b2e]">
                <span className="w-8 h-px bg-[#f5b91a]" />
                Réalisations
              </span>
            </Reveal>
            <h2 className="mt-6 font-display font-semibold tracking-[-0.03em] leading-[1.02] text-[clamp(2rem,4.5vw,3.6rem)] text-[#0a1f1a] text-balance max-w-2xl">
              <RevealHeadline text="Des projets qui" />{" "}
              <RevealHeadline text="parlent pour nous." delay={0.1} />
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="text-base text-[#5a6b65] font-body leading-relaxed max-w-sm">
              Faites défiler pour explorer une sélection de nos installations,
              du résidentiel autonome aux centrales industrielles, à travers le
              Burkina Faso et l'Afrique de l'Ouest.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Section collante à défilement horizontal */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: "340vh" }}
      >
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <motion.div
            style={{ x }}
            className="relative flex gap-6 md:gap-8 px-5 md:px-10 will-change-transform"
          >
            {PROJECTS.map((p, i) => (
              <ProjectCard
                key={i}
                project={p}
                index={i}
                total={PROJECTS.length}
                progress={scrollYProgress}
              />
            ))}

            {/* Carte CTA finale */}
            <div className="shrink-0 w-[80vw] md:w-[36vw] lg:w-[28vw] aspect-[4/5] rounded-3xl bg-[#07241c] text-white p-10 flex flex-col justify-between relative overflow-hidden group">
              {/* Halo animé */}
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#f5b91a]/20 blur-[80px] group-hover:bg-[#f5b91a]/40 transition-all duration-700" />
              <div className="relative">
                <span className="section-label text-white/60">
                  <span className="w-8 h-px bg-[#f5b91a]" />
                  Votre tour
                </span>
                <h3 className="mt-6 font-display text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
                  Et si votre projet était le prochain ?
                </h3>
                <p className="mt-4 text-sm text-white/70 font-body max-w-xs leading-relaxed">
                  Parlons de vos besoins énergétiques. Nous vous répondons sous
                  48 heures avec une première proposition.
                </p>
              </div>
              <a
                href="#contact"
                className="btn-solar self-start relative z-10"
              >
                Démarrer <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Indicateur de progression horizontal avec label */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-[0.65rem] tracking-[0.25em] uppercase text-[#5a6b65] font-display">
              Faites défiler
            </span>
            <div className="w-48 h-1 bg-black/10 rounded-full overflow-hidden">
              <motion.div
                style={{ scaleX: scrollYProgress }}
                className="h-full bg-gradient-to-r from-[#0d3b2e] to-[#f5b91a] origin-left"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  total,
  progress,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Calcul de l'opacité et du scale en fonction de la position dans le scroll
  // Chaque carte a une "fenêtre" d'activation
  const segLen = 1 / (total + 1);
  const start = index * segLen;
  const center = start + segLen / 2;

  const scale = useTransform(
    progress,
    [start - segLen, center, start + segLen + segLen],
    [0.85, 1, 0.85]
  );
  const opacity = useTransform(
    progress,
    [start - segLen, start, center, start + segLen + segLen],
    [0.4, 0.7, 1, 0.7]
  );

  return (
    <motion.div
      style={{ scale, opacity }}
      className="group shrink-0 w-[80vw] md:w-[44vw] lg:w-[34vw] aspect-[4/5] relative rounded-3xl overflow-hidden bg-[#07241c]"
    >
      <div
        className="absolute inset-0 transition-transform duration-[1.5s] ease-out group-hover:scale-110"
        style={{
          backgroundImage: `url('${project.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07241c] via-[#07241c]/30 to-transparent" />

      {/* Numéro flottant */}
      <div className="absolute top-6 left-6 font-display text-sm text-white/70 tracking-widest">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>

      {/* Catégorie */}
      <div className="absolute top-6 right-6">
        <span className="text-xs px-3 py-1.5 rounded-full bg-[#f5b91a] text-[#07241c] font-semibold font-display">
          {project.category}
        </span>
      </div>

      {/* Contenu bas avec animation au hover */}
      <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
        <div className="flex items-center gap-2 text-xs text-white/70 mb-2 font-body">
          <MapPin className="w-3.5 h-3.5" />
          {project.location}
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
          {project.title}
        </h3>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-white/80 font-body">
            {project.size}
          </span>
          <motion.div
            whileHover={{ rotate: 45, scale: 1.1 }}
            className="grid place-items-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
          >
            <ArrowUpRight className="w-4 h-4" />
          </motion.div>
        </div>

        {/* Ligne dorée qui se dessine au hover */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          className="mt-4 h-px bg-gradient-to-r from-[#f5b91a] to-transparent origin-left"
        />
      </div>
    </motion.div>
  );
}
