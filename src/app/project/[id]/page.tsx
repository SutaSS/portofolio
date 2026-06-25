import React from "react";
import { projects } from "../../data/projects";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaGithub, FaExternalLinkAlt, FaCheck, FaStar, FaInstagram } from "react-icons/fa";
import Footer from "../../components/layout/Footer";
import { Project } from "../../types/project";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const allProjects = projects as unknown as Project[];
  return allProjects.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const allProjects = projects as unknown as Project[];
  const project = allProjects.find((p) => p.id === id);
  if (!project) {
    return { title: "Project Not Found" };
  }
  const imageUrl = project.imageUrl || "/assets/Hero-1.jpg";
  return {
    title: `${project.title} — Project Story`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Project Story`,
      description: project.description,
      images: [imageUrl],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const allProjects = projects as unknown as Project[];
  const project = allProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <main className="min-h-screen bg-canvas text-ink flex flex-col items-center justify-center p-6">
        <div className="card-lift max-w-md w-full bg-soft-stone border border-card-border rounded-3xl p-8 text-center shadow-xl">
          <h2 className="section-heading text-primary mb-4">Project Not Found</h2>
          <p className="body text-body-muted mb-8">The project story you are looking for does not exist or has been moved.</p>
          <Link href="/" className="btn-shiny px-8 py-4 bg-primary text-white rounded-full font-bold mono-label inline-block">
            Back to Portfolio
          </Link>
        </div>
      </main>
    );
  }

  const imageUrl = project.imageUrl || "/assets/Hero-1.jpg";
  const techList = project.technologies || [];
  const isInstagramProject = project.category === "artwork" || project.category === "design-docs";
  const artworkUrl = project.liveUrl || "https://instagram.com/andikahernadi";

  const getNarrative = () => {
    if (project.id === "8" || project.id === "9" || project.id === "3") {
      // Final Assessment projects (PAPB, SolarQuiz, FFOUND)
      return {
        ch1Title: "Project Overview & The Challenge",
        ch1P1: `"${project.title}" was architected to deliver a robust and impactful solution addressing the core objective to ${project.description.toLowerCase()}.`,
        ch1P2: `The primary challenge encountered during this final assessment was architecting a highly reliable system, structuring an efficient database schema, and delivering an intuitive user interface under tight academic deadlines.`,
        ch2Title: "The Solution & Engineering Execution",
        ch2P1: `To accomplish our objectives for this final assessment, I worked within a collaborative group where we divided engineering and design tasks evenly among all team members.`,
        ch2P2: `We implemented rigorous project management by organizing structured schedules and agile sprint cycles. This systematic approach ensured that every core feature of ${project.title} was delivered on time with clean, maintainable, and scalable code.`,
        bullets: [
          "Engineered with clean, modular architecture for academic excellence",
          "Structured database schema optimized for real-time synchronization",
          "Balanced team task distribution with rigorous sprint management"
        ]
      };
    } else if (project.id === "1") {
      // Hackathon (OptiMind 2.0)
      return {
        ch1Title: "Project Overview & The Challenge",
        ch1P1: `"${project.title}" is an innovative digital solution born out of an intensive Hackathon/Technoday competition, focusing specifically on ${project.description.toLowerCase()}.`,
        ch1P2: `In this high-pressure competitive environment, the primary challenge was conceptualizing a high-value product, designing seamless user journeys, and validating the underlying business mechanics within an extremely short timeframe.`,
        ch2Title: "The Solution & Engineering Execution",
        ch2P1: `To achieve the winning solution, I took on the dual roles of Frontend Developer and UI/UX Designer, crafting an elegant, highly interactive, and intuitive prototype.`,
        ch2P2: `Beyond spearheading the visual aesthetics and frontend engineering, I rapidly learned and formulated the entire business model in record time—ensuring flawless alignment between our beautiful interface and the product's ultimate market viability.`,
        bullets: [
          "High-impact prototype engineered for rapid business model validation",
          "Premium UI/UX design featuring intuitive, friction-free user journeys",
          "State-of-the-art frontend architecture built under intensive time constraints"
        ]
      };
    } else if (project.id === "5") {
      // MMD FILKOM UB Kelompok 38
      return {
        ch1Title: "Project Overview & The Challenge",
        ch1P1: `"${project.title}" carries a vital community development mission, focusing heavily on ${project.description.toLowerCase()}.`,
        ch1P2: `The primary challenge during this Mahasiswa Membangun Desa (MMD) initiative was capturing the village's full potential, publishing social activities, and establishing robust digital awareness effectively and aesthetically.`,
        ch2Title: "The Solution & Team Execution",
        ch2P1: `As the definitive communication and visualization solution, I was appointed as the head of the Design, Documentation, and Media (DDM) division for the full 1-month tenure on location.`,
        ch2P2: `Together with my DDM team, we executed comprehensive media coverage, crafted a captivating visual identity, and produced in-depth digital publications—establishing an inspiring digital footprint that brought immense real-world value to the local community.`,
        bullets: [
          "High-fidelity visual identity crafted for impactful community engagement",
          "Structured social media architecture and digital awareness campaigns",
          "Spearheaded by the Design, Documentation, and Media (DDM) division"
        ]
      };
    } else if (project.id === "6") {
      // Design Documentation Porsimaba 2025
      return {
        ch1Title: "Project Overview & The Challenge",
        ch1P1: `"${project.title}" was established as the grand design documentation and visual identity foundation to celebrate and elevate ${project.description.toLowerCase()}.`,
        ch1P2: `The large-scale challenge inherent in this flagship event was maintaining absolute consistency in visual direction, coordinating diverse publication assets, and unifying the aesthetic vision across all organizing committees.`,
        ch2Title: "The Solution & Team Management",
        ch2P1: `To resolve the complexities of large-scale visual coordination, I actively participated as Vice Chairman / Vice Lead of Infrastructure Technology & Design.`,
        ch2P2: `I successfully managed and directed the entire design and documentation team, established highly efficient design workflows, and supervised asset production to ensure every deliverable adhered to the highest standards of visual excellence.`,
        bullets: [
          "Comprehensive design system establishing a grand visual hierarchy",
          "Scalable publication assets ensuring multi-platform brand consistency",
          "Rigorous team workflow managed by Vice Lead of Infrastructure & Design"
        ]
      };
    } else if (project.category === "artwork" || project.id === "7") {
      // Digital Artwork
      return {
        ch1Title: "Project Overview & Artistic Vision",
        ch1P1: `The "${project.title}" collection represents an immersive exploration of visual storytelling and digital illustration centered around ${project.description.toLowerCase()}.`,
        ch1P2: `The primary challenge in this ongoing project is finding the perfect harmony between color theory composition, dramatic lighting, and a distinct, expressive illustration style.`,
        ch2Title: "The Solution & Creative Expression",
        ch2P1: `As a creative solution, crafting these digital illustrations serves as a profound avenue for self-expression and a deeply fulfilling personal hobby outside of daily software engineering.`,
        ch2P2: `Each piece is executed with uncompromising dedication to detail, blending pure passion, aesthetic exploration, and authentic, evocative visual storytelling.`,
        bullets: [
          "Distinctive illustrative style driven by advanced color theory composition",
          "Rich visual storytelling demonstrating deep creative expression",
          "Meticulous attention to texture, dramatic lighting, and aesthetic detail"
        ]
      };
    } else {
      // General web-mobile (e.g. Serenia)
      return {
        ch1Title: "Project Overview & The Challenge",
        ch1P1: `"${project.title}" was custom-architected to deliver a powerful, seamless digital solution addressing the core need for ${project.description.toLowerCase()}.`,
        ch1P2: `The primary challenge involved establishing a solid architectural model, ensuring reliable state management, and designing an uncompromised, beautiful user interface.`,
        ch2Title: "The Solution & Engineering Execution",
        ch2P1: `As a solution, we adopted clean architecture principles to decouple core business logic from UI rendering concerns, ensuring long-term maintainability and instant data synchronization.`,
        ch2P2: `Through structured team collaboration and disciplined iterative development, the entire vision was executed into a premium, high-performance digital product.`,
        bullets: [
          "Engineered for absolute performance, robust accessibility, and reliability",
          "Strict clean architecture decoupling domain logic from UI rendering",
          "Complemented by rich, dynamic micro-animations and custom design tokens"
        ]
      };
    }
  };

  const narrative = getNarrative();

  return (
    <main className="min-h-screen bg-canvas text-ink flex flex-col justify-between overflow-x-hidden">
      {/* Top Navbar Bar */}
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 py-4 pointer-events-none">
        <nav className="pointer-events-auto flex items-center justify-between gap-6 bg-primary/90 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 shadow-lg shadow-black/20 max-w-4xl w-full">
          <Link href="/#projects" className="btn-shiny flex items-center gap-2 text-white hover:text-coral transition-colors duration-300 font-inter text-sm font-bold tracking-wide">
            <FaArrowLeft className="text-coral" /> Back to Projects
          </Link>
          <span className="mono-label text-coral hidden sm:block">
            Project Storytelling
          </span>
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-coral hover:text-primary transition-all duration-300"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>
            )}
            {project.liveUrl && !isInstagramProject && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-coral hover:text-primary transition-all duration-300"
                aria-label="Live Demo"
              >
                <FaExternalLinkAlt size={16} />
              </a>
            )}
            {isInstagramProject && (
              <a
                href={artworkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-coral hover:text-primary transition-all duration-300"
                aria-label="View on Instagram"
              >
                <FaInstagram size={18} />
              </a>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Header Section */}
      <section className="pt-36 pb-20 px-6 lg:px-12 container mx-auto max-w-6xl">
        <div className="space-y-6 mb-12">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="mono-label px-4 py-1.5 bg-primary text-white rounded-full text-xs font-bold shadow-sm">
              {project.category.toUpperCase()}
            </span>
            {project.featured && (
              <span className="mono-label px-4 py-1.5 bg-coral text-primary rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5">
                <FaStar /> FEATURED STORY
              </span>
            )}
          </div>
          <h1 className="product-display text-primary">
            {project.title}
          </h1>
        </div>

        {/* Hero Photo Card */}
        <div className="card-lift relative w-full h-[400px] md:h-[540px] lg:h-[640px] rounded-[32px] overflow-hidden bg-soft-stone border border-card-border shadow-2xl mb-20">
          <Image src={imageUrl} alt={project.title} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-10">
            <div className="flex flex-wrap gap-2">
              {techList.map((tech) => (
                <span key={tech} className="mono-label px-4 py-2 bg-white/90 backdrop-blur-md text-primary rounded-full text-xs font-bold shadow-lg border border-white/20">
                  {tech}
                </span>
              ))}
            </div>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shiny px-8 py-4 bg-coral text-primary rounded-full font-bold mono-label text-sm tracking-wide shadow-xl hover:bg-white transition-all duration-300 flex items-center gap-2 justify-center"
              >
                {isInstagramProject ? (
                  <>View on Instagram <FaInstagram size={18} /></>
                ) : (
                  <>Launch Live Demo <FaExternalLinkAlt /></>
                )}
              </a>
            )}
          </div>
        </div>

        {/* Storytelling Narrative Band */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Summary Box (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 card-lift bg-soft-stone border border-card-border rounded-3xl p-8 shadow-sm space-y-6">
            <h3 className="card-heading text-primary">Project Overview</h3>
            <p className="body-large text-body-muted leading-relaxed">
              {project.description}
            </p>
            <div className="space-y-4 pt-6 border-t border-hairline">
              {narrative.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <FaCheck className="text-coral mt-1 flex-shrink-0" />
                  <span className="body text-ink font-medium">{bullet}</span>
                </div>
              ))}
            </div>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shiny w-full py-4 bg-primary text-white rounded-full font-bold mono-label text-xs tracking-wide shadow-lg hover:bg-ink transition-all duration-300 flex items-center justify-center gap-2 mt-4"
              >
                <FaGithub size={18} /> View Code on GitHub
              </a>
            )}
          </div>

          {/* Right Deep Narrative Box (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Problem Statement */}
            <div className="card-lift bg-deep-green text-white rounded-3xl p-8 lg:p-12 shadow-xl space-y-6">
              <h4 className="mono-label text-coral">Chapter 1</h4>
              <h2 className="card-heading text-white">{narrative.ch1Title}</h2>
              <p className="body-large text-white/80 leading-relaxed">
                {narrative.ch1P1}
              </p>
              <p className="body text-white/70 leading-relaxed">
                {narrative.ch1P2}
              </p>
            </div>

            {/* Solution & Architecture / Creative Process */}
            <div className="card-lift bg-primary text-white rounded-3xl p-8 lg:p-12 shadow-xl space-y-6">
              <h4 className="mono-label text-coral">Chapter 2</h4>
              <h2 className="card-heading text-white">{narrative.ch2Title}</h2>
              <p className="body-large text-white/80 leading-relaxed">
                {narrative.ch2P1}
              </p>
              <p className="body text-white/70 leading-relaxed">
                {narrative.ch2P2}
              </p>
              {isInstagramProject && artworkUrl && (
                <a
                  href={artworkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shiny inline-flex items-center gap-3 px-8 py-4 bg-coral text-primary rounded-full font-bold mono-label text-sm tracking-wide shadow-xl hover:bg-white transition-all duration-300 mt-2"
                >
                  <FaInstagram size={18} /> View on Instagram
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Conclusion / Back CTA */}
        <div className="text-center pt-12 border-t border-border-light">
          <Link href="/#projects" className="btn-shiny inline-flex items-center gap-3 px-10 py-5 bg-primary text-white hover:bg-coral hover:text-primary rounded-full font-bold mono-label text-sm tracking-wide shadow-xl transition-all duration-300">
            <FaArrowLeft /> Explore More Projects
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
