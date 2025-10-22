import Footer from "./components/layout/Footer";
import Header from "./components/layout/Navbar";
import About from "./section/About";
import TechStack from "./section/TechStack";
import Project from "./section/Project";

export default function Home() {
  return (
    <main>
      <Header />
      <About />
      <TechStack />
      <Project />
      <Footer />
    </main>
  );
}
