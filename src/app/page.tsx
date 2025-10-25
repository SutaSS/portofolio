import Footer from "./components/layout/Footer";
import Header from "./components/layout/Navbar";
import Project from "./section/project";
import About from "./section/about";
import TechStack from "./section/techStack";
import Hero from "./section/Hero";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Project/>
      <TechStack />
      <Footer />
    </main>
  );
}
