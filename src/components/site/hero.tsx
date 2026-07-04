"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Magnetic } from "./magnetic";
import { useSmoothScroll } from "./smooth-scroll";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const { velocityNorm } = useSmoothScroll();

  // Parallaxe multi-couches
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);
  const yTitle = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const ySpring = useSpring(yTitle, { stiffness: 80, damping: 20 });

  // Effets vélocité
  const velocityBlur = useTransform(velocityNorm, [0, 0.5, 1], [0, 1.5, 4]);
  const velocityScale = useTransform(velocityNorm, [0, 1], [1, 0.99]);
  const filter = useMotionTemplate`blur(${velocityBlur}px)`;

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#07241c]"
    >
      {/* === Image de fond avec parallaxe === */}
      <motion.div
        style={{ y: yBg, scale: scaleBg }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://sfile.chatglm.cn/images-ppt/f51d87e7b462.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Overlay pour lisibilité du titre */}
        <div className="absolute inset-0 bg-[#07241c]/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07241c]/30 via-transparent to-[#07241c]/60" />
      </motion.div>

      {/* === Contenu centré === */}
      <motion.div
        style={{ y: ySpring, opacity, filter, scale: velocityScale }}
        className="relative z-10 h-full flex flex-col items-center justify-center px-5"
      >
        {/* Eyebrow / label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-8 md:mb-10"
        >
          <span className="w-10 h-px bg-[#f5b91a]" />
          <span className="text-[0.7rem] md:text-xs tracking-[0.3em] uppercase text-white/85 font-display font-medium whitespace-nowrap">
            Énergie solaire premium — Afrique de l'Ouest
          </span>
          <span className="w-10 h-px bg-[#f5b91a]" />
        </motion.div>

        {/* === Grand titre ECOVOLT en dégradé === */}
        <h1 className="font-display font-bold tracking-[-0.04em] leading-[0.85] text-center text-[clamp(4rem,16vw,16rem)]">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="block bg-gradient-to-b from-white via-white to-white/30 bg-clip-text text-transparent"
              style={{ filter: "drop-shadow(0 4px 24px rgba(7,36,28,0.35))" }}
            >
              ECO
              <span className="bg-gradient-to-b from-[#f5b91a] to-[#d99a05] bg-clip-text text-transparent">
                VOLT
              </span>
            </motion.span>
          </span>
        </h1>

        {/* === Sous-titre élégant === */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.9 }}
          className="mt-8 md:mt-10 text-center text-base md:text-xl font-body text-white/90 leading-relaxed max-w-2xl text-pretty"
        >
          L'énergie solaire, ingénierie de précision pour particuliers,
          entreprises et institutions à travers le Burkina Faso et le Sahel.
        </motion.p>

        {/* === Boutons CTA centrés === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          <Magnetic as="a" href="#contact" className="btn-solar">
            Demander un devis <ArrowUpRight className="w-4 h-4" />
          </Magnetic>
          <Magnetic as="a" href="#services" className="btn-ghost-light">
            Découvrir nos services
          </Magnetic>
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
        <span className="text-[0.65rem] tracking-[0.3em] uppercase font-display">
          Défiler
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>

      {/* === Badge latéral Ouagadougou === */}
      <div className="hidden xl:flex items-center gap-3 absolute right-6 top-1/2 -translate-y-1/2 z-10 [writing-mode:vertical-rl] rotate-180 text-white/40 text-[0.7rem] tracking-[0.3em] uppercase font-display">
        Ouagadougou · Burkina Faso
      </div>

      {/* === Compteur flottant en bas à gauche === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.9 }}
        style={{ opacity }}
        className="absolute bottom-8 left-6 md:left-10 z-10 hidden md:block"
      >
        <div className="flex items-center gap-3 text-white/80">
          <span className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
            2 500+
          </span>
          <span className="text-xs font-body leading-tight max-w-[8rem]">
            projets livrés depuis 2012
          </span>
        </div>
      </motion.div>

      {/* === Compteur flottant en bas à droite === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.9 }}
        style={{ opacity }}
        className="absolute bottom-8 right-6 md:right-10 z-10 hidden md:block"
      >
        <div className="flex items-center gap-3 text-white/80">
          <span className="text-xs font-body leading-tight max-w-[8rem] text-right">
            garantie maximale sur nos équipements
          </span>
          <span className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-[#f5b91a]">
            25 ans
          </span>
        </div>
      </motion.div>
    </section>
  );
}
