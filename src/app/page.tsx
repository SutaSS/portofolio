import Footer from "./components/footer";
import Header from "./components/header";
import About from "./section/about";
import TechStack from "./section/techStack";

export default function Home() {
  return (
    <main>
      <Header />
      <About />
      <TechStack />
      <Footer />
    </main>
  );
}
