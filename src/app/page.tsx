import Header from "./components/layout/Navbar";
import About from "./section/about";
import TechStack from "./section/techStack";
import Project from "./section/project";
import Hero from "./section/Hero";
import Experience from "./section/experience";
import Achievements from "./section/contact";

export default function Home() {
  return (
    <main className="bg-canvas text-ink min-h-screen overflow-hidden">
      <Header />
      <Hero />
      <About />
      <Experience />
      <Project />
      <TechStack />
      <Achievements />
    </main>
  );
}
