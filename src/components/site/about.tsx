"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, RevealHeadline, Parallax } from "./reveal";
import { ShieldCheck, Sparkles, Leaf, Users } from "lucide-react";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Professionnalisme",
    desc: "Des ingénieurs certifiés, une méthodologie éprouvée et un engagement total sur chaque chantier.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    desc: "Des équipements internationaux de pointe, sélectionnés pour leur fiabilité et leur longévité.",
  },
  {
    icon: Leaf,
    title: "Durabilité",
    desc: "Des solutions énergétiques propres, pensées pour durer et réduire durablement votre empreinte carbone.",
  },
  {
    icon: Users,
    title: "Proximité",
    desc: "Une équipe humaine, accessible, qui vous accompagne bien au-delà de l'installation initiale.",
  },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const numY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative bg-[#f6f4ee] py-20 md:py-28 overflow-hidden"
    >
      {/* Décor */}
      <div className="absolute top-20 right-0 w-[40vw] h-[40vw] rounded-full bg-[#0d3b2e]/5 blur-[120px]" />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Colonne gauche : image + parallaxe */}
          <div className="lg:col-span-5 relative">
            <Parallax amount={30}>
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-[#0d3b2e]/10">
                <motion.div
                  style={{ y: imgY }}
                  className="absolute inset-0 scale-110"
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=1400&q=80')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#07241c]/40 via-transparent to-transparent" />

                {/* Carte flottante superposée */}
                <motion.div
                  style={{ y: numY }}
                  className="absolute -bottom-8 -right-4 md:-right-8 bg-white rounded-2xl p-5 shadow-xl shadow-[#0d3b2e]/15 w-48 z-20"
                >
                  <div className="font-display text-4xl font-semibold text-[#0d3b2e] tracking-tight leading-none">
                    +12
                  </div>
                  <div className="text-xs text-[#5a6b65] mt-2 font-body leading-snug">
                    ans d'expertise sur le terrain ouest-africain
                  </div>
                </motion.div>
              </div>
            </Parallax>

            {/* Statistiques verticales à gauche de l'image */}
            <div className="hidden lg:flex flex-col gap-3 absolute -left-6 top-1/2 -translate-y-1/2 z-20">
              <div className="bg-[#0d3b2e] text-white rounded-2xl p-4 w-36 shadow-lg shadow-[#0d3b2e]/20">
                <div className="font-display text-2xl font-semibold leading-none">2 500+</div>
                <div className="text-xs text-white/70 mt-2">Projets livrés</div>
              </div>
              <div className="bg-[#f5b91a] text-[#07241c] rounded-2xl p-4 w-36 shadow-lg shadow-[#f5b91a]/30">
                <div className="font-display text-2xl font-semibold leading-none">98%</div>
                <div className="text-xs mt-2 opacity-80">Clients satisfaits</div>
              </div>
            </div>
          </div>

          {/* Colonne droite : contenu */}
          <div className="lg:col-span-7 lg:pl-10">
            <Reveal>
              <span className="section-label text-[#0d3b2e]">
                <span className="w-8 h-px bg-[#f5b91a]" />
                À propos d'EcoVolt
              </span>
            </Reveal>

            <h2 className="mt-6 font-display font-semibold tracking-[-0.03em] leading-[1.02] text-[clamp(2rem,4.5vw,3.6rem)] text-[#0a1f1a] text-balance">
              <RevealHeadline text="Une expertise solaire" />{" "}
              <RevealHeadline text="au service de votre" delay={0.1} />{" "}
              <RevealHeadline text="indépendance énergétique." delay={0.2} />
            </h2>

            <Reveal delay={0.2}>
              <p className="mt-7 text-base md:text-lg text-[#5a6b65] font-body leading-relaxed text-pretty max-w-2xl">
                Basée à Ouagadougou, EcoVolt Solutions accompagne les
                particuliers, entreprises et institutions du Burkina Faso et des
                pays voisins dans leur transition vers une énergie propre,
                fiable et économique. Nous transformons l'abondance du soleil
                africain en puissance électrique utile, mesurable et durable.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="mt-4 text-base text-[#5a6b65] font-body leading-relaxed text-pretty max-w-2xl">
                Chaque projet commence par une écoute attentive, se construit
                avec des ingénieurs certifiés et s'achève par un accompagnement
                à long terme. Notre conviction est simple : une installation
                solaire n'est pas un produit, c'est un partenariat de plusieurs
                décennies.
              </p>
            </Reveal>

            {/* Valeurs en grille */}
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {VALUES.map((v, i) => (
                <Reveal key={v.title} delay={0.1 * i}>
                  <div className="lift group bg-white rounded-2xl p-5 border border-black/[0.06] hover:border-[#0d3b2e]/20 hover:shadow-xl hover:shadow-[#0d3b2e]/5">
                    <div className="w-10 h-10 rounded-xl bg-[#e8f1ec] grid place-items-center mb-3 group-hover:bg-[#0d3b2e] transition-colors duration-500">
                      <v.icon className="w-4 h-4 text-[#0d3b2e] group-hover:text-[#f5b91a] transition-colors duration-500" />
                    </div>
                    <h3 className="font-display text-base font-semibold text-[#0a1f1a] tracking-tight">
                      {v.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-[#5a6b65] font-body leading-relaxed">
                      {v.desc}
                    </p>
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
