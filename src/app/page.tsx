import Footer from "./components/layout/Footer";
import Header from "./components/layout/Navbar";
import Project from "./section/Project";
import Hero from "./section/Hero";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Project />
      <Footer />
    </main>
  );
}
