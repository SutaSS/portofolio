import Footer from "./components/footer";
import Header from "./components/header";
import About from "./section/about";
import TechStack from "./section/techStack";
import Project from "./section/project";

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
