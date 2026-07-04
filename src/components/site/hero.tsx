"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sun, Zap, Battery } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1.1, 1.35]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const ySpring = useSpring(yText, { stiffness: 80, damping: 20 });

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#07241c] text-white"
    >
      {/* Image de fond avec ken burns + parallaxe */}
      <motion.div
        style={{ y: yBg, scale: scaleBg }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 animate-kenburns"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2400&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Calques de dégradé */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07241c]/70 via-[#07241c]/55 to-[#07241c]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07241c]/85 via-transparent to-transparent" />
        {/* Halo solaire doux */}
        <div className="absolute -top-32 -right-32 w-[55vw] h-[55vw] rounded-full bg-[#f5b91a]/20 blur-[120px] animate-glow" />
        <div className="absolute bottom-0 left-1/3 w-[40vw] h-[40vw] rounded-full bg-[#0d3b2e]/60 blur-[100px]" />
      </motion.div>

      {/* Barre de statut flottante */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute top-[14vh] left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center gap-3 px-4 py-2 rounded-full glass text-xs text-white/85 font-body"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#f5b91a] opacity-75 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#f5b91a]" />
        </span>
        Ouagadougou · Burkina Faso — Au service de l'Afrique de l'Ouest
      </motion.div>

      {/* Contenu du hero */}
      <motion.div
        style={{ y: ySpring, opacity }}
        className="relative z-10 h-full mx-auto max-w-[1400px] px-5 md:px-10 flex flex-col justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="section-label text-white/70 mb-6"
        >
          <span className="w-8 h-px bg-[#f5b91a]" />
          Énergie renouvelable, ingénierie de précision
        </motion.div>

        <h1 className="font-display font-semibold tracking-[-0.035em] leading-[0.92] text-[clamp(2.8rem,8.5vw,8.5rem)] text-balance">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              Alimenter l'Afrique
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.65, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              de l'Ouest par le{" "}
              <span className="italic font-light text-[#f5b91a]">soleil</span>
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.9 }}
          className="mt-8 max-w-xl text-base md:text-lg font-body text-white/80 leading-relaxed text-pretty"
        >
          Nous concevons, installons et maintenons des systèmes photovoltaïques
          premium, du stockage par batteries et des infrastructures de recharge
          VE — ingérées par des professionnels certifiés pour les maisons,
          entreprises et institutions du Burkina Faso et du Sahel.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <a href="#contact" className="btn-solar">
            Demander un devis <ArrowUpRight className="w-4 h-4" />
          </a>
          <a href="#services" className="btn-ghost-light">
            Découvrir nos services
          </a>
        </motion.div>

        {/* Pastilles flottantes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-14 hidden md:grid grid-cols-3 gap-4 max-w-2xl"
        >
          {[
            { icon: Sun, label: "25 ans", sub: "Garanties équipements" },
            { icon: Zap, label: "Installation rapide", sub: "Délais maîtrisés" },
            { icon: Battery, label: "24/7", sub: "Support à long terme" },
          ].map((item, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-4 hover:bg-white/10 transition-colors"
            >
              <item.icon className="w-4 h-4 text-[#f5b91a] mb-2" />
              <div className="font-display text-base font-semibold">
                {item.label}
              </div>
              <div className="text-xs text-white/65 mt-0.5">{item.sub}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Indicateur de défilement */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70"
      >
        <span className="text-[0.7rem] tracking-[0.25em] uppercase font-display">
          Défiler
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>

      {/* Étiquette latérale rotative */}
      <div className="hidden lg:block absolute right-8 bottom-1/2 translate-y-1/2 z-10 rotate-90 origin-right text-white/50 text-xs tracking-[0.3em] uppercase font-display">
        EcoVolt Solutions / Établi à Ouagadougou
      </div>
    </section>
  );
}
