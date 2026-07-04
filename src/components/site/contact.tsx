"use client";

import { useState } from "react";
import { Reveal, RevealHeadline } from "./reveal";
import { useToast } from "@/hooks/use-toast";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const CLIENT_TYPES = [
  "Particulier",
  "Entreprise PME",
  "Grand compte / Industriel",
  "Institution / ONG",
  "École / Santé",
];

const SERVICES_OPTIONS = [
  "Système photovoltaïque",
  "Stockage par batteries",
  "Onduleurs",
  "Bornes de recharge VE",
  "Maintenance",
  "Audit énergétique",
  "Conseil technique",
];

export function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulation d'envoi
    await new Promise((r) => setTimeout(r, 1400));
    setSubmitting(false);
    setDone(true);
    toast({
      title: "Merci ! Votre demande a bien été envoyée.",
      description: "Notre équipe vous répond sous 48 heures.",
    });
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setDone(false), 4000);
  };

  return (
    <section
      id="contact"
      className="relative bg-white py-24 md:py-36 overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Colonne gauche : titre + coordonnées */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="section-label text-[#0d3b2e]">
                <span className="w-8 h-px bg-[#f5b91a]" />
                Demande de devis
              </span>
            </Reveal>
            <h2 className="mt-6 font-display font-semibold tracking-[-0.03em] leading-[1.02] text-[clamp(2rem,4.5vw,3.6rem)] text-[#0a1f1a] text-balance">
              <RevealHeadline text="Parlons de votre" />{" "}
              <RevealHeadline text="projet énergétique." delay={0.1} />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-6 text-base text-[#5a6b65] font-body leading-relaxed max-w-md">
                Remplissez le formulaire et notre équipe technique vous
                recontactera sous 48 heures avec une première analyse et une
                proposition adaptée à votre site et à votre budget.
              </p>
            </Reveal>

            {/* Coordonnées */}
            <div className="mt-10 grid sm:grid-cols-2 gap-5">
              {[
                {
                  icon: MapPin,
                  label: "Adresse",
                  value: "Ouaga 2000, Ouagadougou, Burkina Faso",
                },
                {
                  icon: Phone,
                  label: "Téléphone",
                  value: "+226 70 00 00 00",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "contact@ecovolt.bf",
                },
                {
                  icon: Clock,
                  label: "Horaires",
                  value: "Lun — Sam · 8h à 18h",
                },
              ].map((item, i) => (
                <Reveal key={item.label} delay={0.1 * i}>
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#f6f4ee] border border-black/[0.05]">
                    <div className="w-10 h-10 rounded-xl bg-[#0d3b2e] grid place-items-center shrink-0">
                      <item.icon className="w-4 h-4 text-[#f5b91a]" />
                    </div>
                    <div>
                      <div className="text-xs text-[#5a6b65] font-body uppercase tracking-wider">
                        {item.label}
                      </div>
                      <div className="mt-0.5 font-display text-sm font-semibold text-[#0a1f1a]">
                        {item.value}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Carte de couverture */}
            <Reveal delay={0.4}>
              <div className="mt-6 p-5 rounded-2xl bg-[#0d3b2e] text-white">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#f5b91a] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-display text-sm font-semibold">
                      Zone d'intervention
                    </div>
                    <p className="text-sm text-white/70 mt-1 leading-relaxed">
                      Burkina Faso, Mali, Côte d'Ivoire, Niger, Togo, Bénin. Au-delà ? Contactez-nous, on étudie votre projet.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Colonne droite : formulaire */}
          <div className="lg:col-span-7">
            <Reveal delay={0.2}>
              <form
                onSubmit={handleSubmit}
                className="relative bg-[#f6f4ee] rounded-3xl p-6 md:p-10 border border-black/[0.05]"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Nom complet" required>
                    <input
                      required
                      type="text"
                      placeholder="Votre nom"
                      className="input-premium"
                    />
                  </Field>
                  <Field label="Email" required>
                    <input
                      required
                      type="email"
                      placeholder="vous@exemple.com"
                      className="input-premium"
                    />
                  </Field>
                  <Field label="Téléphone">
                    <input
                      type="tel"
                      placeholder="+226 ..."
                      className="input-premium"
                    />
                  </Field>
                  <Field label="Type de client" required>
                    <select required className="input-premium" defaultValue="">
                      <option value="" disabled>
                        Sélectionnez
                      </option>
                      {CLIENT_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="mt-5">
                  <Field label="Service souhaité" required>
                    <div className="flex flex-wrap gap-2">
                      {SERVICES_OPTIONS.map((s) => (
                        <ChipInput key={s} label={s} />
                      ))}
                    </div>
                  </Field>
                </div>

                <div className="mt-5">
                  <Field label="Décrivez votre projet" required>
                    <textarea
                      required
                      rows={4}
                      placeholder="Localisation, surface disponible, consommation actuelle, objectifs…"
                      className="input-premium resize-none"
                    />
                  </Field>
                </div>

                <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <p className="text-xs text-[#5a6b65] font-body max-w-sm">
                    En soumettant ce formulaire, vous acceptez d'être recontacté
                    par EcoVolt Solutions. Vos données ne sont jamais partagées.
                  </p>
                  <button
                    type="submit"
                    disabled={submitting || done}
                    className={`btn-solar w-full sm:w-auto justify-center ${
                      done ? "!bg-[#0d3b2e] !text-white" : ""
                    }`}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Envoi en cours…
                      </>
                    ) : done ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Demande envoyée
                      </>
                    ) : (
                      <>
                        Envoyer ma demande <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Style des inputs injecté */}
      <style jsx>{`
        :global(.input-premium) {
          width: 100%;
          background: #ffffff;
          border: 1px solid rgba(13, 59, 46, 0.12);
          border-radius: 14px;
          padding: 0.85rem 1rem;
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: #0a1f1a;
          transition: all 0.3s ease;
          outline: none;
        }
        :global(.input-premium::placeholder) {
          color: #9aa7a2;
        }
        :global(.input-premium:focus) {
          border-color: #0d3b2e;
          box-shadow: 0 0 0 4px rgba(13, 59, 46, 0.08);
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-display font-semibold text-[#0d3b2e] uppercase tracking-wider mb-2">
        {label} {required && <span className="text-[#f5b91a]">*</span>}
      </span>
      {children}
    </label>
  );
}

function ChipInput({ label }: { label: string }) {
  const [active, setActive] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setActive((a) => !a)}
      className={`px-3.5 py-1.5 rounded-full text-sm font-body transition-all duration-300 border ${
        active
          ? "bg-[#0d3b2e] text-white border-[#0d3b2e]"
          : "bg-white text-[#0d3b2e] border-[#0d3b2e]/15 hover:border-[#0d3b2e]/40"
      }`}
    >
      {label}
    </button>
  );
}
