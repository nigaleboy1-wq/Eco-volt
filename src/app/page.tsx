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
import { SmoothScrollProvider } from "@/components/site/smooth-scroll";
import { SectionTransition } from "@/components/site/section-transition";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <main className="relative bg-white min-h-screen flex flex-col">
        <ScrollProgress />
        <CursorGlow />
        <Navbar />
        <Hero />
        <About />

        {/* Transition vers Services */}
        <SectionTransition
          num="02"
          nextLabel="Nos services"
          fromColor="#f6f4ee"
          toColor="#ffffff"
        />

        <Services />
        <Approach />
        <WhyUs />

        {/* Transition vers Réalisations */}
        <SectionTransition
          num="03"
          nextLabel="Réalisations"
          fromColor="#07241c"
          toColor="#f6f4ee"
        />

        <Projects />

        {/* Transition vers Processus */}
        <SectionTransition
          num="04"
          nextLabel="Notre processus"
          fromColor="#f6f4ee"
          toColor="#f6f4ee"
        />

        <Process />
        <Stats />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
