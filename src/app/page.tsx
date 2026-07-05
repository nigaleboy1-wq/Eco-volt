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

        <SectionTransition fromColor="#07241c" toColor="#F8F7F2" />
        <About />

        <SectionTransition fromColor="#F8F7F2" toColor="#ffffff" />
        <Services />

        <SectionTransition fromColor="#ffffff" toColor="#ffffff" />
        <Approach />

        <SectionTransition fromColor="#ffffff" toColor="#07241c" />
        <WhyUs />

        <SectionTransition fromColor="#07241c" toColor="#F8F7F2" />
        <Projects />

        <SectionTransition fromColor="#F8F7F2" toColor="#F8F7F2" />
        <Process />

        <SectionTransition fromColor="#F8F7F2" toColor="#0E3B2E" />
        <Stats />

        <SectionTransition fromColor="#0E3B2E" toColor="#F8F6F1" />
        <Testimonials />

        <SectionTransition fromColor="#F8F6F1" toColor="#ffffff" />
        <Contact />
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
