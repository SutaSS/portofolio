import Footer from "./components/layout/Footer";
import Header from "./components/layout/Navbar";
import About from "./section/about";
import TechStack from "./section/techStack";
import Project from "./section/project";
import Hero from "./section/Hero";
import Experience from "./section/experience";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Project/>
      <TechStack />
      <Experience />
      <Footer />
    </main>
  );
}
