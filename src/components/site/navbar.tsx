"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Menu, X, Sun, ArrowUpRight } from "lucide-react";
import { Magnetic } from "./magnetic";

const NAV_LINKS = [
  { label: "À propos", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projets", href: "#projects" },
  { label: "Processus", href: "#process" },
  { label: "Confiance", href: "#trust" },
  { label: "Contact", href: "#contact" },
];

// === Fonction de scroll animé avec easing ===
let isNavScrolling = false;

function smoothScrollTo(targetY: number, duration = 1200) {
  // Signaler au SmoothScrollProvider qu'une navigation est en cours
  isNavScrolling = true;
  (window as unknown as { __navScrolling?: boolean }).__navScrolling = true;

  const startY = window.scrollY;
  const diff = targetY - startY;
  const startTime = performance.now();

  // Easing easeInOutCubic
  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const animate = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);
    const currentY = startY + diff * eased;
    window.scrollTo(0, currentY);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // Fin de la navigation
      isNavScrolling = false;
      (window as unknown as { __navScrolling?: boolean }).__navScrolling = false;
    }
  };

  requestAnimationFrame(animate);
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [clickedLink, setClickedLink] = useState("");

  // Détection du scroll pour le style de la navbar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Détection de la section active
  useEffect(() => {
    const onScroll = () => {
      const sections = NAV_LINKS.map((l) => document.querySelector(l.href));
      const scrollPos = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i] as HTMLElement;
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(NAV_LINKS[i].href);
          return;
        }
      }
      setActiveSection("");
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // === Navigation animée ===
  const scrollToSection = useCallback((href: string) => {
    const el = document.querySelector(href) as HTMLElement;
    if (!el) return;

    const offset = 70; // Hauteur de la navbar
    // Utiliser getBoundingClientRect pour une position précise même avec sticky
    const rect = el.getBoundingClientRect();
    const targetY = window.scrollY + rect.top - offset;

    // Indicateur visuel : flash sur le lien cliqué
    setClickedLink(href);
    setTimeout(() => setClickedLink(""), 800);

    // Lancement de l'animation
    smoothScrollTo(targetY, 1200);
  }, []);

  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    // Petit délai pour fermer le menu mobile d'abord
    setTimeout(() => scrollToSection(href), open ? 300 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[#07241c]/85 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/10"
            : "py-4 md:py-5 bg-[#07241c]/40 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid grid-cols-3 items-center">
          {/* Logo à gauche */}
          <Magnetic as="a" href="#top" strength={0.2} className="justify-self-start">
            <span
              className="flex items-center gap-2.5 group cursor-pointer"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                smoothScrollTo(0, 1000);
              }}
            >
              <span className="relative grid place-items-center w-9 h-9 rounded-full bg-[#f5b91a] overflow-hidden">
                <Sun className="w-4 h-4 text-[#07241c]" />
              </span>
              <span className="font-display text-[1.05rem] tracking-tight font-semibold text-white">
                EcoVolt<span className="text-[#f5b91a]">.</span>
              </span>
            </span>
          </Magnetic>

          {/* Navigation centrée avec indicateur actif */}
          <nav className="hidden lg:flex items-center gap-7 justify-self-center relative">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href;
              const isClicked = clickedLink === link.href;
              return (
                <button
                  key={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="relative text-[0.88rem] font-body font-medium transition-colors duration-300 group"
                >
                  <span
                    className={`transition-colors duration-300 ${
                      isActive
                        ? "text-[#f5b91a]"
                        : "text-white/75 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </span>

                  {/* Soulignement animé */}
                  <motion.span
                    className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#f5b91a] rounded-full"
                    initial={false}
                    animate={{
                      scaleX: isActive ? 1 : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ originX: 0 }}
                  />

                  {/* Flash doré au clic */}
                  <AnimatePresence>
                    {isClicked && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                        transition={{ duration: 0.4 }}
                        className="absolute -inset-2 rounded-full bg-[#f5b91a]/20 pointer-events-none"
                      />
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </nav>

          {/* Boutons à droite */}
          <div className="flex items-center gap-2.5 justify-self-end">
            <button
              onClick={(e) => handleClick(e, "#contact")}
              className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white px-4 py-2 text-sm font-display font-medium hover:bg-white/10 transition-all duration-300"
            >
              Se connecter
            </button>
            <button
              onClick={(e) => handleClick(e, "#contact")}
              className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-[#f5b91a] text-[#07241c] px-5 py-2.5 text-sm font-semibold font-display tracking-tight hover:bg-[#ffd95c] transition-all duration-300 cursor-pointer"
            >
              Demander un devis
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              className="lg:hidden grid place-items-center w-10 h-10 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Menu mobile plein écran */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[#07241c] text-white flex flex-col"
          >
            <div className="flex items-center justify-between p-5 md:p-10">
              <span className="font-display text-xl font-semibold">
                EcoVolt<span className="text-[#f5b91a]">.</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
                className="grid place-items-center w-11 h-11 rounded-full border border-white/15 hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center px-6 md:px-10 gap-3">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
                  className="font-display text-5xl md:text-7xl font-semibold tracking-tight text-left hover:text-[#f5b91a] transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
            <div className="p-6 md:p-10 border-t border-white/10">
              <button
                onClick={(e) => handleClick(e, "#contact")}
                className="inline-flex items-center gap-2 bg-[#f5b91a] text-[#07241c] rounded-full px-6 py-3.5 w-full justify-center font-display font-semibold text-sm"
              >
                Demander un devis <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
