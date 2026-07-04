import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Services } from "@/components/site/services";
import { Approach } from "@/components/site/approach";
import { WhyUs } from "@/components/site/why-us";
import { Projects } from "@/components/site/projects";
import { Process } from "@/components/site/process";
import { Stats } from "@/components/site/stats";
import { Testimonials } from "@/components/site/testimonials";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { ScrollProgress, CursorGlow } from "@/components/site/scroll-progress";
import { Marquee } from "@/components/site/marquee";

export default function Home() {
  return (
    <main className="relative bg-white min-h-screen flex flex-col">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <Hero />

      {/* Marquee diviseur cinématique */}
      <div className="relative bg-[#07241c] text-white py-4 border-y border-white/5">
        <Marquee
          text="Énergie solaire premium"
          separator=" ✦ "
          className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-white/30"
          duration={28}
        />
      </div>

      <About />
      <Services />

      {/* Marquee diviseur */}
      <div className="relative bg-[#0d3b2e] text-white py-4 overflow-hidden">
        <Marquee
          text="Solaire · Stockage · Onduleurs · Recharge VE · Maintenance · Audit"
          separator=" — "
          className="font-display text-base md:text-lg font-medium text-white/40"
          duration={35}
          reverse
        />
      </div>

      <Approach />
      <WhyUs />
      <Projects />
      <Process />
      <Stats />
      <Testimonials />

      {/* Marquee diviseur pré-contact */}
      <div className="relative bg-[#f5b91a] text-[#07241c] py-3 overflow-hidden">
        <Marquee
          text="Demandez votre devis gratuit"
          separator=" → "
          className="font-display text-xl md:text-2xl font-bold tracking-tight"
          duration={25}
        />
      </div>

      <Contact />
      <Footer />
    </main>
  );
}
