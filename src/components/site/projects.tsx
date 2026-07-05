"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, MapPin, ArrowRight, Filter } from "lucide-react";

const PROJECTS = [
  {
    title: "Centrale solaire industrielle",
    category: "Industriel",
    location: "Bobo-Dioulasso, Burkina Faso",
    size: "850 kWc",
    year: "2024",
    image: "https://sfile.chatglm.cn/images-ppt/718d965ed775.png",
    description: "Centrale solaire au sol de 850 kWc alimentant un site de production industrielle, avec monitoring temps réel et stockage de secours.",
  },
  {
    title: "Résidence autonome hors-réseau",
    category: "Résidentiel",
    location: "Ouagadougou, Burkina Faso",
    size: "12 kWc",
    year: "2024",
    image: "https://sfile.chatglm.cn/images-ppt/ece0c983a174.jpg",
    description: "Villa résidentielle autonome avec panneaux PV, batteries lithium et onduleur hybride pour une indépendance énergétique totale.",
  },
  {
    title: "Centre de santé connecté",
    category: "Institutionnel",
    location: "Koudougou, Burkina Faso",
    size: "60 kWc + stockage",
    year: "2023",
    image: "https://sfile.chatglm.cn/images-ppt/f3c98e521c94.jpg",
    description: "Système hybride avec stockage sécurisant l'alimentation d'un centre de santé : continuité de service garantie 24/7.",
  },
  {
    title: "Complexe scolaire solaire",
    category: "Éducation",
    location: "Bamako, Mali",
    size: "150 kWc",
    year: "2023",
    image: "https://sfile.chatglm.cn/images-ppt/b3461b3644bb.jpg",
    description: "Installation photovoltaïque couvrant les besoins d'un campus scolaire de 800 élèves, avec formation des équipes techniques.",
  },
  {
    title: "Siège social entreprise",
    category: "Tertiaire",
    location: "Abidjan, Côte d'Ivoire",
    size: "240 kWc + VE",
    year: "2024",
    image: "https://sfile.chatglm.cn/images-ppt/683967fad410.jpg",
    description: "Toiture solaire de 240 kWc avec bornes de recharge VE intégrées pour la flotte corporate du siège social.",
  },
  {
    title: "Stockage agroalimentaire",
    category: "Agro-industrie",
    location: "Ouahigouya, Burkina Faso",
    size: "180 kWc",
    year: "2023",
    image: "https://sfile.chatglm.cn/images-ppt/a205496c1e6a.jpg",
    description: "Centrale solaire pour chambre froide agroalimentaire, garantissant la conservation des produits sans dépendance réseau.",
  },
];

const CATEGORIES = ["Tous", "Industriel", "Résidentiel", "Institutionnel", "Éducation", "Tertiaire", "Agro-industrie"];

export function Projects() {
  const [filter, setFilter] = useState("Tous");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  const filtered = filter === "Tous" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: "#F8F7F2" }}
    >
      {/* Décor de fond */}
      <div className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(216,169,40,0.15) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-20 left-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-25 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(14,59,46,0.1) 0%, transparent 70%)" }} />

      {/* Grand chiffre décoratif */}
      <div className="absolute -top-10 right-0 font-display text-[16rem] md:text-[24rem] font-semibold text-[#0E3B2E]/[0.03] leading-none pointer-events-none select-none">
        06
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
        {/* === En-tête === */}
        <div className="mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-5"
          >
            <span className="w-10 h-px bg-[#D8A928]" />
            <span className="text-xs font-display font-semibold tracking-[0.3em] uppercase text-[#0E3B2E]">
              Réalisations · {PROJECTS.length} projets
            </span>
          </motion.div>

          <h2 className="font-display font-bold tracking-[-0.035em] leading-[1.05] text-[clamp(2rem,4.5vw,3.5rem)] text-[#132C25] text-balance mb-5">
            Des projets qui{" "}
            <span className="italic font-light text-[#D8A928]">parlent</span> pour nous.
          </h2>

          <motion.div
            style={{ scaleX: lineScale }}
            className="h-px bg-gradient-to-r from-[#0E3B2E]/30 via-[#D8A928]/40 to-transparent origin-left max-w-2xl mb-6"
          />

          <div className="grid lg:grid-cols-12 gap-6 items-end">
            <p className="lg:col-span-7 text-base md:text-lg text-[#0E3B2E]/70 font-body leading-relaxed text-pretty max-w-xl">
              Une sélection de nos installations à travers le Burkina Faso et
              l'Afrique de l'Ouest — du résidentiel autonome aux centrales
              industrielles. Chaque projet raconte une promesse tenue.
            </p>

            {/* Filtres */}
            <div className="lg:col-span-5 lg:justify-self-end flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-display font-semibold transition-all duration-300 ${
                    filter === cat
                      ? "bg-[#0E3B2E] text-white shadow-lg shadow-[#0E3B2E]/20"
                      : "bg-white text-[#0E3B2E] border border-[#0E3B2E]/12 hover:border-[#0E3B2E]/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* === Grille de projets === */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* === CTA bas === */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 flex flex-col md:flex-row items-center justify-between gap-5 p-8 md:p-10 rounded-3xl bg-[#0E3B2E] text-white relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#D8A928]/20 blur-[80px]" />
          <div className="relative">
            <h3 className="font-display text-xl md:text-2xl font-semibold tracking-tight">
              Et si votre projet était le prochain ?
            </h3>
            <p className="mt-2 text-sm text-white/70 font-body max-w-xl">
              Parlons de vos besoins énergétiques. Nous vous répondons sous
              48 heures avec une première proposition personnalisée.
            </p>
          </div>
          <a href="#contact" className="relative inline-flex items-center gap-2 bg-[#D8A928] text-[#0E3B2E] rounded-full px-6 py-3.5 font-display font-semibold text-sm hover:bg-[#FFF9EC] transition-colors shadow-lg shadow-[#D8A928]/20">
            Démarrer mon projet
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: (typeof PROJECTS)[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Effet 3D tilt au survol
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white rounded-3xl overflow-hidden border border-[#0E3B2E]/8 shadow-md shadow-[#0E3B2E]/[0.06] hover:shadow-2xl hover:shadow-[#0E3B2E]/15 transition-shadow duration-500"
    >
      {/* Image avec parallaxe interne */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.div
          style={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${project.image}')` }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E3B2E]/80 via-[#0E3B2E]/20 to-transparent" />

        {/* Catégorie en haut */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-[#0E3B2E] text-xs font-display font-semibold border border-white/40">
            {project.category}
          </span>
        </div>

        {/* Année en haut à droite */}
        <div className="absolute top-4 right-4 font-display text-sm text-white/80 tracking-widest">
          {project.year}
        </div>

        {/* Titre en bas de l'image */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white" style={{ transform: "translateZ(40px)" }}>
          <div className="flex items-center gap-1.5 text-xs text-white/70 mb-1.5 font-body">
            <MapPin className="w-3 h-3" />
            {project.location}
          </div>
          <h3 className="font-display text-lg md:text-xl font-semibold tracking-tight leading-tight">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-5" style={{ transform: "translateZ(20px)" }}>
        <p className="text-sm text-[#0E3B2E]/65 font-body leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Specs */}
        <div className="flex items-center justify-between pt-4 border-t border-[#0E3B2E]/8">
          <div>
            <div className="text-[0.65rem] text-[#0E3B2E]/50 font-body uppercase tracking-wider">
              Puissance
            </div>
            <div className="font-display font-bold text-[#0E3B2E]">
              {project.size}
            </div>
          </div>
          <motion.div
            animate={{ rotate: hovered ? 45 : 0, scale: hovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
            className="grid place-items-center w-9 h-9 rounded-full bg-[#0E3B2E] text-[#D8A928]"
          >
            <ArrowUpRight className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
