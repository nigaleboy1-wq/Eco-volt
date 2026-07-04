"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Trust", href: "#trust" },
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
            ? "py-3 bg-white/80 backdrop-blur-xl border-b border-black/5"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5 group">
            <span className="relative grid place-items-center w-9 h-9 rounded-full bg-[#0d3b2e] overflow-hidden">
              <Sun className="w-4 h-4 text-[#f5b91a]" />
              <span className="absolute inset-0 rounded-full ring-1 ring-[#f5b91a]/40 group-hover:ring-[#f5b91a] transition-all" />
            </span>
            <span className="font-display text-[1.05rem] tracking-tight font-semibold text-[#0d3b2e]">
              EcoVolt<span className="text-[#f5b91a]">.</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="link-underline text-[0.92rem] font-body text-[#0a1f1a]/80 hover:text-[#0d3b2e] transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-[#0d3b2e] text-white px-5 py-2.5 text-sm font-semibold font-display tracking-tight hover:bg-[#07241c] transition-all duration-300 hover:shadow-lg hover:shadow-[#0d3b2e]/20"
            >
              Request a Quote
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="lg:hidden grid place-items-center w-10 h-10 rounded-full border border-black/10 hover:bg-black/5 transition-colors"
            >
              <Menu className="w-5 h-5 text-[#0d3b2e]" />
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
                aria-label="Close menu"
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
                Request a Quote <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
