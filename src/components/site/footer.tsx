"use client";

import { Sun, ArrowUpRight, Facebook, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Reveal } from "./reveal";

const FOOTER_LINKS = [
  {
    title: "Services",
    links: [
      "Systèmes photovoltaïques",
      "Stockage par batteries",
      "Onduleurs",
      "Bornes de recharge VE",
      "Maintenance & SAV",
      "Audit énergétique",
    ],
  },
  {
    title: "Entreprise",
    links: ["À propos", "Nos projets", "Notre processus", "Témoignages", "Carrières", "Partenaires"],
  },
  {
    title: "Ressources",
    links: ["Centre d'aide", "Documentation", "Études de cas", "Blog", "FAQ", "Politique qualité"],
  },
];

export function Footer() {
  return (
    <footer className="relative bg-[#07241c] text-white overflow-hidden">
      {/* Halo */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-[#0d3b2e]/60 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] rounded-full bg-[#f5b91a]/5 blur-[120px]" />

      {/* Bande supérieure : CTA géant */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-16 md:py-24">
          <Reveal>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
              <h2 className="font-display font-semibold tracking-[-0.035em] leading-[0.95] text-[clamp(2rem,5vw,4.5rem)] text-balance max-w-3xl">
                Prêt à passer à{" "}
                <span className="italic font-light text-[#f5b91a]">l'énergie solaire</span> ?
              </h2>
              <a href="#contact" className="btn-solar shrink-0">
                Demander un devis <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bande principale */}
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10 py-16 md:py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <a href="#top" className="flex items-center gap-2.5">
              <span className="relative grid place-items-center w-10 h-10 rounded-full bg-[#0d3b2e] ring-1 ring-[#f5b91a]/40">
                <Sun className="w-4 h-4 text-[#f5b91a]" />
              </span>
              <span className="font-display text-xl font-semibold tracking-tight">
                EcoVolt<span className="text-[#f5b91a]">.</span>
              </span>
            </a>
            <p className="mt-5 text-sm text-white/60 font-body leading-relaxed max-w-xs">
              Solutions d'énergie renouvelable premium pour l'Afrique de l'Ouest.
              Conçues, installées et maintenues par des ingénieurs certifiés à
              Ouagadougou.
            </p>

            {/* Coordonnées rapides */}
            <div className="mt-6 space-y-2.5 text-sm">
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="w-4 h-4 text-[#f5b91a]" />
                Ouaga 2000, Ouagadougou, Burkina Faso
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Phone className="w-4 h-4 text-[#f5b91a]" />
                +226 70 00 00 00
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Mail className="w-4 h-4 text-[#f5b91a]" />
                contact@ecovolt.bf
              </div>
            </div>
          </div>

          {/* Liens */}
          <div className="lg:col-span-6 grid sm:grid-cols-3 gap-8">
            {FOOTER_LINKS.map((col) => (
              <div key={col.title}>
                <h3 className="font-display text-sm font-semibold text-white/90 uppercase tracking-wider">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="link-underline text-sm text-white/65 hover:text-white font-body"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold text-white/90 uppercase tracking-wider">
              Newsletter
            </h3>
            <p className="mt-4 text-xs text-white/65 font-body leading-relaxed">
              Recevez nos actualités et études de cas.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex items-center bg-white/5 border border-white/10 rounded-full p-1 pl-4"
            >
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent outline-none text-sm text-white placeholder:text-white/40 flex-1 min-w-0"
              />
              <button
                type="submit"
                aria-label="S'abonner"
                className="grid place-items-center w-9 h-9 rounded-full bg-[#f5b91a] text-[#07241c] hover:scale-105 transition-transform"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bande inférieure */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/60 font-body">
            © {new Date().getFullYear()} EcoVolt Solutions. Tous droits réservés.
            Conçu avec exigence à Ouagadougou.
          </p>
          <div className="flex items-center gap-3">
            {[
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Facebook, label: "Facebook" },
              { icon: Instagram, label: "Instagram" },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="grid place-items-center w-9 h-9 rounded-full border border-white/10 hover:bg-[#f5b91a] hover:text-[#07241c] hover:border-[#f5b91a] transition-all"
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
