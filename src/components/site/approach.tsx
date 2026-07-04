"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, RevealHeadline, Parallax } from "./reveal";

export function Approach() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  return (
    <section
      ref={ref}
      className="relative bg-white py-14 md:py-20 overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Image avec mouvement parallaxe */}
          <div className="relative order-2 lg:order-1">
            <Parallax amount={40}>
              <motion.div
                style={{ rotate }}
                className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-[#0d3b2e]/15"
              >
                <motion.div style={{ y }} className="absolute inset-0 scale-110">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "url('https://sfile.chatglm.cn/images-ppt/d579db7e55d7.png')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-tr from-[#07241c]/40 to-transparent" />
              </motion.div>
            </Parallax>

            {/* Carte flottante */}
            <div className="absolute -top-6 -right-4 md:-right-8 bg-[#f5b91a] text-[#07241c] rounded-2xl px-5 py-4 shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="font-display text-2xl font-semibold tracking-tight">
                −70%
              </div>
              <div className="text-xs mt-0.5 font-body">
                facture énergétique
              </div>
            </div>
          </div>

          {/* Texte */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="section-label text-[#0d3b2e]">
                <span className="w-8 h-px bg-[#f5b91a]" />
                Notre approche
              </span>
            </Reveal>
            <h2 className="mt-6 font-display font-semibold tracking-[-0.03em] leading-[1.02] text-[clamp(2rem,4vw,3.4rem)] text-[#0a1f1a] text-balance">
              <RevealHeadline text="L'énergie solaire," />{" "}
              <RevealHeadline text="pensée comme un" delay={0.1} />{" "}
              <RevealHeadline text="investissement," delay={0.2} />{" "}
              <RevealHeadline text="pas comme une dépense." delay={0.3} />
            </h2>

            <Reveal delay={0.2}>
              <p className="mt-7 text-base md:text-lg text-[#5a6b65] font-body leading-relaxed text-pretty">
                Chaque installation EcoVolt est conçue pour produire un retour
                sur investissement mesurable. Nous modélisons votre
                rentabilité, comparons les scénarios et vous accompagnons dans
                le financement de votre projet.
              </p>
            </Reveal>

            <div className="mt-10 space-y-6">
              {[
                {
                  k: "Économies",
                  v: "Jusqu'à 70 % de réduction sur votre facture électrique dès la première année.",
                },
                {
                  k: "Durabilité",
                  v: "Équipements premium garantis jusqu'à 25 ans, conçus pour le climat sahélien.",
                },
                {
                  k: "Valeur",
                  v: "Votre patrimoine prend de la valeur, votre empreinte carbone baisse.",
                },
              ].map((item, i) => (
                <Reveal key={item.k} delay={0.1 * i}>
                  <div className="flex items-start gap-5 group">
                    <span className="font-display text-sm font-semibold text-[#f5b91a] tracking-widest mt-1 w-24 shrink-0">
                      {item.k.toUpperCase()}
                    </span>
                    <div className="flex-1 pb-6 border-b border-black/10">
                      <p className="text-base text-[#0a1f1a] font-body leading-relaxed">
                        {item.v}
                      </p>
                    </div>
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
