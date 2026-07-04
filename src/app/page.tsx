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

export default function Home() {
  return (
    <main className="relative bg-white min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Approach />
      <WhyUs />
      <Projects />
      <Process />
      <Stats />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
