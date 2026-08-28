import Loader from "@/components/ui/Loader";
import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Loader />
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Projects />
      <Testimonials />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
