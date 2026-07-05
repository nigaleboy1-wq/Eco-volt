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

        {/* Hero (dark) → About (cream) */}
        <SectionTransition variant="dark-to-cream" />
        <About />

        {/* About (cream) → Services (white) */}
        <SectionTransition variant="cream-to-light" />
        <Services />

        {/* Services (white) → Approach (white) */}
        <SectionTransition variant="cream-to-light" fromColor="#ffffff" toColor="#ffffff" />
        <Approach />

        {/* Approach (white) → WhyUs (dark) */}
        <SectionTransition variant="light-to-dark" />
        <WhyUs />

        {/* WhyUs (dark) → Projects (cream) */}
        <SectionTransition variant="dark-to-cream" />
        <Projects />

        {/* Projects (cream) → Process (cream) */}
        <SectionTransition variant="cream-to-cream" />
        <Process />

        {/* Process (cream) → Stats (dark green) */}
        <SectionTransition variant="cream-to-light" fromColor="#F8F7F2" toColor="#0E3B2E" />
        <Stats />

        {/* Stats (dark green) → Testimonials (cream) */}
        <SectionTransition variant="dark-to-light" />
        <Testimonials />

        {/* Testimonials (cream) → Contact (white) */}
        <SectionTransition variant="cream-to-light" />
        <Contact />
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
