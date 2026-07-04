"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sun, Zap, Battery } from "lucide-react";
import { Magnetic } from "./magnetic";
import { useSmoothScroll } from "./smooth-scroll";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const { velocityNorm } = useSmoothScroll();

  // Parallaxe multi-couches (depth layers)
  const yBgFar = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yBgMid = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const yBgNear = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1.1, 1.4]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const scrollBlur = useTransform(scrollYProgress, [0, 0.8], [0, 6]);
  const ySpring = useSpring(yText, { stiffness: 80, damping: 20 });

  // Halo solaire suit le scroll
  const haloX = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const haloOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  // === Effets basés sur la vélocité du scroll ===
  // Blur dynamique : plus on scroll vite, plus le texte floute (motion blur)
  const velocityBlur = useTransform(velocityNorm, [0, 0.5, 1], [0, 2, 5]);
  // Scale léger : le texte se rétracte légèrement quand on scroll vite
  const velocityScale = useTransform(velocityNorm, [0, 1], [1, 0.985]);
  // Combinaison des deux blurs (scroll position + vélocité)
  const totalBlur = useTransform(
    [scrollBlur, velocityBlur],
    (vals: number[]) => (vals[0] as number) + (vals[1] as number)
  );
  const filter = useMotionTemplate`blur(${totalBlur}px)`;
  // Légère parallaxe verticale induite par la vélocité sur l'image de fond
  const velocityBgY = useTransform(velocityNorm, [0, 1], [0, -15]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[110svh] min-h-[680px] w-full overflow-hidden bg-[#07241c] text-white"
    >
      {/* === Couche 1 : image de fond avec ken burns + parallaxe lent === */}
      <motion.div
        style={{ y: yBgFar, scale: scaleBg, x: velocityBgY }}
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#07241c]/75 via-[#07241c]/55 to-[#07241c]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07241c]/85 via-transparent to-transparent" />
      </motion.div>

      {/* === Couche 2 : halos lumineux (parallaxe moyen) === */}
      <motion.div
        style={{ y: yBgMid, opacity: haloOpacity }}
        className="absolute inset-0 z-[1] pointer-events-none"
      >
        <motion.div
          style={{ x: haloX }}
          className="absolute -top-32 -right-32 w-[55vw] h-[55vw] rounded-full bg-[#f5b91a]/20 blur-[120px] animate-glow"
        />
        <div className="absolute bottom-0 left-1/3 w-[40vw] h-[40vw] rounded-full bg-[#0d3b2e]/60 blur-[100px]" />
      </motion.div>

      {/* === Couche 3 : particules solaires (parallaxe rapide) === */}
      <motion.div
        style={{ y: yBgNear }}
        className="absolute inset-0 z-[2] pointer-events-none"
      >
        {[
          { left: "12%", top: "30%", size: 4, delay: 0 },
          { left: "85%", top: "20%", size: 6, delay: 0.5 },
          { left: "70%", top: "65%", size: 3, delay: 1 },
          { left: "25%", top: "75%", size: 5, delay: 1.5 },
          { left: "50%", top: "15%", size: 4, delay: 0.8 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#f5b91a]"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.9, 0.2],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* === Badge de localisation flottant === */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute top-[12vh] left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center gap-3 px-4 py-2 rounded-full glass text-xs text-white/85 font-body whitespace-nowrap"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#f5b91a] opacity-75 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#f5b91a]" />
        </span>
        Ouagadougou · Burkina Faso — Au service de l'Afrique de l'Ouest
      </motion.div>

      {/* === Contenu principal avec parallaxe texte === */}
      <motion.div
        style={{ y: ySpring, opacity, filter, scale: velocityScale }}
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
          <Magnetic as="a" href="#contact" className="btn-solar">
            Demander un devis <ArrowUpRight className="w-4 h-4" />
          </Magnetic>
          <Magnetic as="a" href="#services" className="btn-ghost-light">
            Découvrir nos services
          </Magnetic>
        </motion.div>

        {/* === Pastilles flottantes avec stagger === */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15, delayChildren: 1.4 } },
          }}
          className="mt-14 hidden md:grid grid-cols-3 gap-4 max-w-2xl"
        >
          {[
            { icon: Sun, label: "25 ans", sub: "Garanties équipements" },
            { icon: Zap, label: "Installation rapide", sub: "Délais maîtrisés" },
            { icon: Battery, label: "24/7", sub: "Support à long terme" },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-2xl p-4 hover:bg-white/10 transition-colors group"
            >
              <item.icon className="w-4 h-4 text-[#f5b91a] mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-display text-base font-semibold">
                {item.label}
              </div>
              <div className="text-xs text-white/65 mt-0.5">{item.sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* === Indicateur de défilement === */}
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

      {/* === Étiquette latérale verticale === */}
      <div className="hidden xl:flex items-center gap-3 absolute right-6 top-1/2 -translate-y-1/2 z-10 [writing-mode:vertical-rl] rotate-180 text-white/40 text-[0.7rem] tracking-[0.3em] uppercase font-display">
        EcoVolt Solutions · Établi à Ouagadougou
      </div>
    </section>
  );
}
