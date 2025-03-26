import Hero from "@/components/hero";
// import Grid from "@/components/Grid";
import Skills from "@/components/skills";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import { FloatingNav } from "@/components/ui/FloatingNav";
import Projects from "@/components/Projects";
import { navItems } from "@/data";



export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        {/* <Grid /> */}
        <Skills />
        <Projects />
        <Contact />
      </div>
      <Footer />
    </main>

  );
}
