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
        <div className="card-vibrate max-w-md w-full bg-soft-stone border border-card-border rounded-3xl p-8 text-center shadow-xl">
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
  const isArtwork = project.category === "artwork";
  const artworkUrl = project.liveUrl || "https://instagram.com/andikahernadi";

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
            {project.liveUrl && !isArtwork && (
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
            {isArtwork && (
              <a
                href={artworkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-coral hover:text-primary transition-all duration-300"
                aria-label="Instagram Artwork"
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
          <p className="section-heading text-ink font-normal max-w-4xl text-2xl lg:text-3xl leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Hero Photo Card */}
        <div className="card-vibrate relative w-full h-[400px] md:h-[540px] lg:h-[640px] rounded-[32px] overflow-hidden bg-soft-stone border border-card-border shadow-2xl mb-20">
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
            {isArtwork ? (
              <a
                href={artworkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shiny px-8 py-4 bg-coral text-primary rounded-full font-bold mono-label text-sm tracking-wide shadow-xl hover:bg-white transition-all duration-300 flex items-center gap-2 justify-center"
              >
                Go to Instagram <FaInstagram size={18} />
              </a>
            ) : project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shiny px-8 py-4 bg-coral text-primary rounded-full font-bold mono-label text-sm tracking-wide shadow-xl hover:bg-white transition-all duration-300 flex items-center gap-2 justify-center"
              >
                Launch Live Demo <FaExternalLinkAlt />
              </a>
            ) : null}
          </div>
        </div>

        {/* Storytelling Narrative Band */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Summary Box (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 card-vibrate bg-soft-stone border border-card-border rounded-3xl p-8 shadow-sm space-y-6">
            <h3 className="card-heading text-primary">Project Overview</h3>
            <p className="body text-body-muted leading-relaxed">
              This initiative exemplifies clean architecture, scalability, and seamless user interaction. Built to solve critical workflow challenges while maintaining extreme aesthetic discipline.
            </p>
            <div className="space-y-4 pt-6 border-t border-hairline">
              <div className="flex items-start gap-3">
                <FaCheck className="text-coral mt-1 flex-shrink-0" />
                <span className="body text-ink font-medium">Engineered for absolute performance and reliability</span>
              </div>
              <div className="flex items-start gap-3">
                <FaCheck className="text-coral mt-1 flex-shrink-0" />
                <span className="body text-ink font-medium">Adheres to modular, decoupled architecture design</span>
              </div>
              <div className="flex items-start gap-3">
                <FaCheck className="text-coral mt-1 flex-shrink-0" />
                <span className="body text-ink font-medium">Complemented by rich, dynamic micro-animations</span>
              </div>
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
            <div className="card-vibrate bg-deep-green text-white rounded-3xl p-8 lg:p-12 shadow-xl space-y-6">
              <h4 className="mono-label text-coral">Chapter 1</h4>
              <h2 className="card-heading text-white">The Challenge & Problem Space</h2>
              <p className="body-large text-white/80 leading-relaxed">
                When embarking on this project, the primary challenge was bridging the gap between highly complex backend logic and a seamless, intuitive frontend interface. Users frequently encounter cognitive overload when interacting with traditional solutions in this domain.
              </p>
              <p className="body text-white/70 leading-relaxed">
                Our objective was to strip away unnecessary clutter, establish a rock-solid data pipeline, and construct an experience that felt both highly performant and deeply responsive to user input.
              </p>
            </div>

            {/* Solution & Architecture */}
            <div className="card-vibrate bg-primary text-white rounded-3xl p-8 lg:p-12 shadow-xl space-y-6">
              <h4 className="mono-label text-coral">Chapter 2</h4>
              <h2 className="card-heading text-white">The Solution & Execution</h2>
              <p className="body-large text-white/80 leading-relaxed">
                By implementing a strict clean architecture paradigm, we isolated the domain models from external UI concerns. Using state-of-the-art frameworks and state management, we ensured that data synchronization happens instantly without rendering bottlenecks.
              </p>
              <p className="body text-white/70 leading-relaxed">
                Every component was built using custom design tokens, ensuring visual consistency while enabling robust accessibility and responsiveness across all devices and viewport dimensions.
              </p>
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
