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
      className="relative bg-white py-16 md:py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Image avec mouvement parallaxe */}
          <div className="relative order-2 lg:order-1">
            <Parallax amount={40}>
              <motion.div
                style={{ rotate }}
                className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-[#0E3B2E]/15"
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
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0E3B2E]/40 to-transparent" />
              </motion.div>
            </Parallax>

            {/* Carte flottante */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              className="absolute -top-6 -right-4 md:-right-8 bg-[#D8A928] text-[#0E3B2E] rounded-2xl px-5 py-4 shadow-xl"
            >
              <div className="font-display text-2xl font-semibold tracking-tight">
                −70%
              </div>
              <div className="text-xs mt-0.5 font-body">
                facture énergétique
              </div>
            </motion.div>
          </div>

          {/* Texte */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <div className="flex items-center gap-4 mb-5">
                <span className="w-10 h-px bg-[#D8A928]" />
                <span className="text-xs font-display font-semibold tracking-[0.3em] uppercase text-[#0E3B2E]">
                  Notre approche
                </span>
              </div>
            </Reveal>
            <h2 className="font-display font-bold tracking-[-0.035em] leading-[1.05] text-[clamp(1.75rem,3.5vw,3rem)] text-[#132C25] text-balance">
              <RevealHeadline text="L'énergie solaire," />{" "}
              <RevealHeadline text="pensée comme un" delay={0.08} />{" "}
              <RevealHeadline text="investissement," delay={0.16} />{" "}
              <RevealHeadline text="pas comme une dépense." delay={0.24} />
            </h2>

            <Reveal delay={0.2}>
              <p className="mt-6 text-base md:text-lg text-[#0E3B2E]/70 font-body leading-relaxed text-pretty">
                Chaque installation EcoVolt est conçue pour produire un retour
                sur investissement mesurable. Nous modélisons votre
                rentabilité, comparons les scénarios et vous accompagnons dans
                le financement de votre projet.
              </p>
            </Reveal>

            <div className="mt-8 space-y-5">
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
                <Reveal key={item.k} delay={0.3 + i * 0.1}>
                  <div className="flex items-start gap-5 group">
                    <span className="font-display text-sm font-semibold text-[#D8A928] tracking-widest mt-1 w-24 shrink-0">
                      {item.k.toUpperCase()}
                    </span>
                    <div className="flex-1 pb-5 border-b border-[#0E3B2E]/10">
                      <p className="text-base text-[#132C25] font-body leading-relaxed">
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
