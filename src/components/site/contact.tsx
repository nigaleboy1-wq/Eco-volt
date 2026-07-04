"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, RevealHeadline } from "./reveal";
import { useToast } from "@/hooks/use-toast";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  User,
  Briefcase,
  Wrench,
  MessageSquare,
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

const STEPS = [
  { num: 1, label: "Vous", icon: User },
  { num: 2, label: "Projet", icon: Briefcase },
  { num: 3, label: "Détails", icon: MessageSquare },
];

export function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const { toast } = useToast();

  const toggleService = (s: string) => {
    setSelectedServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSubmitting(false);
    setDone(true);
    toast({
      title: "Merci ! Votre demande a bien été envoyée.",
      description: "Notre équipe vous répond sous 48 heures.",
    });
    (e.target as HTMLFormElement).reset();
    setStep(1);
    setSelectedServices([]);
    setTimeout(() => setDone(false), 4000);
  };

  return (
    <section
      id="contact"
      className="relative bg-white py-20 md:py-28 overflow-hidden"
    >
      {/* Décor */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-[#0d3b2e]/5 blur-[120px]" />

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
                Remplissez le formulaire en 3 étapes et notre équipe technique
                vous recontactera sous 48 heures avec une première analyse et
                une proposition adaptée à votre site et à votre budget.
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
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#f6f4ee] border border-black/[0.05] hover:border-[#0d3b2e]/20 transition-colors">
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
              <div className="mt-6 p-5 rounded-2xl bg-[#0d3b2e] text-white relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#f5b91a]/20 blur-[60px]" />
                <div className="flex items-start gap-3 relative">
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

          {/* Colonne droite : formulaire multi-step */}
          <div className="lg:col-span-7">
            <Reveal delay={0.2}>
              <form
                onSubmit={handleSubmit}
                className="relative bg-[#f6f4ee] rounded-3xl p-6 md:p-10 border border-black/[0.05]"
              >
                {/* Indicateur d'étapes */}
                <div className="flex items-center justify-between mb-8">
                  {STEPS.map((s, i) => {
                    const isActive = step === s.num;
                    const isDone = step > s.num;
                    return (
                      <div key={s.num} className="flex items-center flex-1 last:flex-none">
                        <div className="flex items-center gap-3">
                          <div
                            className={`relative grid place-items-center w-11 h-11 rounded-full transition-all duration-500 ${
                              isActive
                                ? "bg-[#0d3b2e] text-[#f5b91a]"
                                : isDone
                                ? "bg-[#f5b91a] text-[#07241c]"
                                : "bg-white text-[#5a6b65] border border-black/10"
                            }`}
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : (
                              <s.icon className="w-4 h-4" />
                            )}
                            {isActive && (
                              <motion.div
                                layoutId="step-ring"
                                className="absolute inset-0 rounded-full ring-2 ring-[#0d3b2e]/30"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              />
                            )}
                          </div>
                          <span className={`hidden sm:block text-sm font-display font-semibold transition-colors ${
                            isActive ? "text-[#0a1f1a]" : "text-[#5a6b65]"
                          }`}>
                            {s.label}
                          </span>
                        </div>
                        {i < STEPS.length - 1 && (
                          <div className="flex-1 h-px bg-black/10 mx-3 sm:mx-4 relative overflow-hidden">
                            <motion.div
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: step > s.num ? 1 : 0 }}
                              className="absolute inset-0 bg-[#0d3b2e] origin-left"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Étape 1 : Vous */}
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="grid sm:grid-cols-2 gap-5"
                    >
                      <Field label="Nom complet" required>
                        <input required type="text" placeholder="Votre nom" className="input-premium" />
                      </Field>
                      <Field label="Email" required>
                        <input required type="email" placeholder="vous@exemple.com" className="input-premium" />
                      </Field>
                      <Field label="Téléphone">
                        <input type="tel" placeholder="+226 ..." className="input-premium" />
                      </Field>
                      <Field label="Type de client" required>
                        <select required className="input-premium" defaultValue="">
                          <option value="" disabled>Sélectionnez</option>
                          {CLIENT_TYPES.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </Field>
                    </motion.div>
                  )}

                  {/* Étape 2 : Projet */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Field label="Service(s) souhaité(s)" required>
                        <div className="flex flex-wrap gap-2">
                          {SERVICES_OPTIONS.map((s) => {
                            const active = selectedServices.includes(s);
                            return (
                              <button
                                key={s}
                                type="button"
                                onClick={() => toggleService(s)}
                                className={`px-4 py-2 rounded-full text-sm font-body transition-all duration-300 border ${
                                  active
                                    ? "bg-[#0d3b2e] text-white border-[#0d3b2e] scale-105"
                                    : "bg-white text-[#0d3b2e] border-[#0d3b2e]/15 hover:border-[#0d3b2e]/40"
                                }`}
                              >
                                {active && <CheckCircle2 className="w-3.5 h-3.5 inline mr-1.5" />}
                                {s}
                              </button>
                            );
                          })}
                        </div>
                      </Field>
                      <div className="mt-5 grid sm:grid-cols-2 gap-5">
                        <Field label="Localisation du site">
                          <input type="text" placeholder="Ville, pays" className="input-premium" />
                        </Field>
                        <Field label="Budget estimé">
                          <select className="input-premium" defaultValue="">
                            <option value="" disabled>À définir</option>
                            <option value="lt5m">Moins de 5M FCFA</option>
                            <option value="5to20">5M — 20M FCFA</option>
                            <option value="20to100">20M — 100M FCFA</option>
                            <option value="gt100">Plus de 100M FCFA</option>
                          </select>
                        </Field>
                      </div>
                    </motion.div>
                  )}

                  {/* Étape 3 : Détails */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Field label="Décrivez votre projet" required>
                        <textarea
                          required
                          rows={5}
                          placeholder="Localisation, surface disponible, consommation actuelle, objectifs, contraintes, délai souhaité…"
                          className="input-premium resize-none"
                        />
                      </Field>
                      <div className="mt-5 p-4 rounded-2xl bg-white border border-[#0d3b2e]/10">
                        <div className="flex items-start gap-3">
                          <Wrench className="w-4 h-4 text-[#f5b91a] mt-0.5 shrink-0" />
                          <div className="text-xs text-[#5a6b65] font-body leading-relaxed">
                            <strong className="text-[#0a1f1a] font-display">Récapitulatif :</strong>{" "}
                            {selectedServices.length > 0
                              ? selectedServices.join(", ")
                              : "Aucun service sélectionné"}
                            . Notre équipe vous recontactera sous 48 heures avec une première analyse personnalisée.
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation entre étapes */}
                <div className="mt-8 flex items-center justify-between gap-4">
                  <p className="text-xs text-[#5a6b65] font-body max-w-sm hidden sm:block">
                    Étape {step} sur 3 · Vos données ne sont jamais partagées.
                  </p>
                  <div className="flex items-center gap-3 ml-auto">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={() => setStep((s) => s - 1)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/10 text-sm font-display font-semibold text-[#0d3b2e] hover:bg-black/5 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Retour
                      </button>
                    )}
                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setStep((s) => s + 1);
                        }}
                        className="inline-flex items-center gap-2 bg-[#0d3b2e] text-white px-5 py-2.5 rounded-full text-sm font-display font-semibold hover:bg-[#07241c] transition-colors"
                      >
                        Continuer
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={submitting || done}
                        className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-display font-semibold transition-all ${
                          done
                            ? "bg-[#0d3b2e] text-white"
                            : submitting
                            ? "bg-[#0d3b2e] text-white opacity-80"
                            : "btn-solar !px-6 !py-2.5"
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
                    )}
                  </div>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Style des inputs */}
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
