import Footer from "./components/layout/Footer";
import Header from "./components/layout/Navbar";
import About from "./section/About";
import TechStack from "./section/TechStack";
import Project from "./section/Project";
import Hero from "./section/Hero";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <TechStack />
      <Project />
      <Footer />
    </main>
  );
}
