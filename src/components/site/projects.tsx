"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, RevealHeadline, Parallax } from "./reveal";
import { ArrowUpRight, MapPin, ArrowRight } from "lucide-react";

const PROJECTS = [
  {
    title: "Centrale solaire industrielle",
    category: "Industriel",
    location: "Bobo-Dioulasso, Burkina Faso",
    size: "850 kWc",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=80",
    featured: true,
  },
  {
    title: "Résidence autonome hors-réseau",
    category: "Résidentiel",
    location: "Ouagadougou, Burkina Faso",
    size: "12 kWc",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1561375894-7e9f71c1c7f0?auto=format&fit=crop&w=1600&q=80",
    featured: false,
  },
  {
    title: "Centre de santé connecté",
    category: "Institutionnel",
    location: "Koudougou, Burkina Faso",
    size: "60 kWc + stockage",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1631805782872-f3b91c87f3a8?auto=format&fit=crop&w=1600&q=80",
    featured: false,
  },
  {
    title: "Complexe scolaire solaire",
    category: "Éducation",
    location: "Bamako, Mali",
    size: "150 kWc",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    featured: false,
  },
  {
    title: "Siège social entreprise",
    category: "Tertiaire",
    location: "Abidjan, Côte d'Ivoire",
    size: "240 kWc + VE",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80",
    featured: false,
  },
  {
    title: "Stockage agroalimentaire",
    category: "Agro-industrie",
    location: "Ouahigouya, Burkina Faso",
    size: "180 kWc",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1600&q=80",
    featured: false,
  },
];

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Ligne dorée décorative qui se dessine au scroll
  const lineScale = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative bg-[#f6f4ee] py-24 md:py-36 overflow-hidden"
    >
      {/* Décor : grand chiffre en filigrane */}
      <div className="absolute -top-10 right-0 font-display text-[16rem] md:text-[24rem] font-semibold text-[#0d3b2e]/[0.03] leading-none pointer-events-none select-none">
        06
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        {/* En-tête */}
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-16 md:mb-20">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="section-label text-[#0d3b2e]">
                <span className="w-8 h-px bg-[#f5b91a]" />
                Réalisations
              </span>
            </Reveal>
            <h2 className="mt-6 font-display font-semibold tracking-[-0.03em] leading-[1.02] text-[clamp(2rem,4.5vw,3.6rem)] text-[#0a1f1a] text-balance">
              <RevealHeadline text="Des projets qui" />{" "}
              <RevealHeadline text="parlent pour nous." delay={0.1} />
            </h2>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <p className="text-base text-[#5a6b65] font-body leading-relaxed text-pretty">
                Une sélection de nos installations à travers le Burkina Faso et
                l'Afrique de l'Ouest — du résidentiel autonome aux centrales
                industrielles. Chaque projet raconte une promesse tenue.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Ligne dorée animée */}
        <motion.div
          style={{ scaleX: lineScale }}
          className="h-px bg-gradient-to-r from-transparent via-[#f5b91a] to-transparent mb-12 origin-left"
        />

        {/* Projet vedette (featured) — grand format */}
        <Reveal>
          <FeaturedProject project={PROJECTS[0]} />
        </Reveal>

        {/* Grille des autres projets */}
        <div className="mt-6 md:mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PROJECTS.slice(1).map((p, i) => (
            <Reveal key={p.title} delay={0.08 * i}>
              <ProjectCard project={p} index={i + 1} />
            </Reveal>
          ))}
        </div>

        {/* CTA bas */}
        <Reveal delay={0.2}>
          <div className="mt-16 md:mt-20 flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-10 rounded-3xl bg-[#0d3b2e] text-white relative overflow-hidden">
            {/* Halo */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#f5b91a]/20 blur-[80px]" />
            <div className="relative">
              <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
                Et si votre projet était le prochain ?
              </h3>
              <p className="mt-2 text-white/70 font-body max-w-xl">
                Parlons de vos besoins énergétiques. Nous vous répondons sous
                48 heures avec une première proposition personnalisée.
              </p>
            </div>
            <a
              href="#contact"
              className="relative btn-solar shrink-0"
            >
              Démarrer mon projet <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FeaturedProject({ project }: { project: (typeof PROJECTS)[number] }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative grid lg:grid-cols-12 gap-6 lg:gap-10 items-center cursor-pointer"
    >
      {/* Image avec parallaxe interne */}
      <div className="lg:col-span-8 relative aspect-[16/10] md:aspect-[16/9] rounded-3xl overflow-hidden bg-[#07241c] shadow-2xl shadow-[#0d3b2e]/15">
        <motion.div style={{ y }} className="absolute inset-0 scale-110">
          <div
            className="absolute inset-0 transition-transform duration-[1.5s] ease-out group-hover:scale-105"
            style={{
              backgroundImage: `url('${project.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#07241c]/80 via-[#07241c]/20 to-transparent" />

        {/* Badge "Projet vedette" */}
        <div className="absolute top-6 left-6">
          <span className="inline-flex items-center gap-2 text-xs px-3.5 py-1.5 rounded-full bg-[#f5b91a] text-[#07241c] font-semibold font-display">
            ★ Projet vedette
          </span>
        </div>

        {/* Année */}
        <div className="absolute top-6 right-6 font-display text-sm text-white/80 tracking-widest">
          {project.year}
        </div>

        {/* Contenu bas de l'image */}
        <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10 text-white">
          <div className="flex items-center gap-2 text-xs text-white/70 mb-2 font-body">
            <MapPin className="w-3.5 h-3.5" />
            {project.location}
          </div>
          <h3 className="font-display text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05] max-w-2xl">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Panneau latéral : infos */}
      <div className="lg:col-span-4 lg:pl-4">
        <div className="text-xs font-display font-semibold text-[#0d3b2e] tracking-widest uppercase mb-3">
          {project.category}
        </div>
        <div className="space-y-5">
          <div>
            <div className="text-xs text-[#5a6b65] font-body uppercase tracking-wider">
              Puissance installée
            </div>
            <div className="mt-1 font-display text-2xl font-semibold text-[#0a1f1a]">
              {project.size}
            </div>
          </div>
          <div className="h-px bg-black/10" />
          <div>
            <div className="text-xs text-[#5a6b65] font-body uppercase tracking-wider">
              Localisation
            </div>
            <div className="mt-1 font-display text-base font-semibold text-[#0a1f1a]">
              {project.location}
            </div>
          </div>
          <div className="h-px bg-black/10" />
          <div>
            <div className="text-xs text-[#5a6b65] font-body uppercase tracking-wider">
              Année de livraison
            </div>
            <div className="mt-1 font-display text-base font-semibold text-[#0a1f1a]">
              {project.year}
            </div>
          </div>
        </div>

        {/* Bouton découvrir */}
        <motion.div
          animate={{ x: hovered ? 6 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="mt-8 inline-flex items-center gap-2 text-sm font-display font-semibold text-[#0d3b2e]"
        >
          Découvrir ce projet
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: (typeof PROJECTS)[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Légère parallaxe verticale sur l'image
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#07241c] cursor-pointer lift"
    >
      {/* Image avec parallaxe */}
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <div
          className="absolute inset-0 transition-transform duration-[1.5s] ease-out group-hover:scale-110"
          style={{
            backgroundImage: `url('${project.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </motion.div>

      {/* Overlay dégradé */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07241c] via-[#07241c]/30 to-transparent" />

      {/* Halo qui apparaît au hover */}
      <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-[#f5b91a]/0 group-hover:bg-[#f5b91a]/15 blur-[80px] transition-all duration-700" />

      {/* Numéro */}
      <div className="absolute top-6 left-6 font-display text-sm text-white/70 tracking-widest">
        {String(index).padStart(2, "0")}
      </div>

      {/* Catégorie */}
      <div className="absolute top-6 right-6">
        <span className="text-xs px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium font-body">
          {project.category}
        </span>
      </div>

      {/* Contenu bas */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7 text-white">
        <div className="flex items-center gap-2 text-xs text-white/70 mb-2 font-body">
          <MapPin className="w-3.5 h-3.5" />
          {project.location}
        </div>
        <h3 className="font-display text-xl md:text-2xl font-semibold tracking-tight leading-tight">
          {project.title}
        </h3>

        {/* Détails qui se révèlent au hover */}
        <motion.div
          initial={false}
          animate={{
            height: hovered ? "auto" : 0,
            opacity: hovered ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div className="pt-4 flex items-center justify-between">
            <div>
              <div className="text-[0.7rem] text-white/60 uppercase tracking-wider">
                {project.year}
              </div>
              <div className="text-sm text-white/90 font-display font-semibold">
                {project.size}
              </div>
            </div>
            <motion.div
              animate={{ rotate: hovered ? 45 : 0 }}
              className="grid place-items-center w-9 h-9 rounded-full bg-[#f5b91a] text-[#07241c]"
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.div>
          </div>
        </motion.div>

        {/* Ligne dorée qui se dessine au hover */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 h-px bg-gradient-to-r from-[#f5b91a] to-transparent origin-left"
        />
      </div>
    </div>
  );
}
