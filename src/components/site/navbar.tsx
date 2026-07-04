"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[#07241c]/85 backdrop-blur-xl border-b border-white/5"
            : "py-4 md:py-5 bg-[#07241c]/40 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid grid-cols-3 items-center">
          {/* Logo à gauche */}
          <Magnetic as="a" href="#top" strength={0.2} className="justify-self-start">
            <span className="flex items-center gap-2.5 group cursor-pointer">
              <span className="relative grid place-items-center w-9 h-9 rounded-full bg-[#f5b91a] overflow-hidden">
                <Sun className="w-4 h-4 text-[#07241c]" />
              </span>
              <span className="font-display text-[1.05rem] tracking-tight font-semibold text-white">
                EcoVolt<span className="text-[#f5b91a]">.</span>
              </span>
            </span>
          </Magnetic>

          {/* Navigation centrée */}
          <nav className="hidden lg:flex items-center gap-8 justify-self-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="link-underline text-[0.88rem] font-body text-white/75 hover:text-white transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Boutons à droite */}
          <div className="flex items-center gap-2.5 justify-self-end">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white px-4 py-2 text-sm font-display font-medium hover:bg-white/10 transition-all duration-300"
            >
              Se connecter
            </a>
            <Magnetic as="a" href="#contact" strength={0.25} className="hidden md:block">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f5b91a] text-[#07241c] px-5 py-2.5 text-sm font-semibold font-display tracking-tight hover:bg-[#ffd95c] transition-all duration-300 cursor-pointer">
                Demander un devis
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Magnetic>
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
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
                  className="font-display text-5xl md:text-7xl font-semibold tracking-tight hover:text-[#f5b91a] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="p-6 md:p-10 border-t border-white/10">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-solar w-full justify-center"
              >
                Demander un devis <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
