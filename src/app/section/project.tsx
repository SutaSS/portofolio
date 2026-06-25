"use client";
import React, { useState, useEffect, useRef } from "react";
import { projects } from "../data/projects";
import { projectCategories } from "../data/ProjectCategories";
import { FaGithub, FaExternalLinkAlt, FaStar, FaArrowRight, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { Project } from "../types/project";

const ProjectSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects as unknown as Project[]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Drag to scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      const allProjects = projects as unknown as Project[];
      if (activeCategory === "all") {
        setFilteredProjects(allProjects);
      } else {
        setFilteredProjects(
          allProjects.filter((project) => project.category === activeCategory),
        );
      }
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [activeCategory]);

  // Intercept wheel events intelligently to allow seamless vertical scroll when at boundaries
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const atLeft = container.scrollLeft === 0;
      const atRight = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;

      if (e.deltaY > 0 && !atRight) {
        container.scrollLeft += e.deltaY;
        e.preventDefault();
      } else if (e.deltaY < 0 && !atLeft) {
        container.scrollLeft += e.deltaY;
        e.preventDefault();
      }
      // If at boundary, let default vertical scroll happen seamlessly!
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // Mouse Drag Handlers for horizontal scrolling
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section
      id="projects"
      className="min-h-screen bg-canvas bg-grid-pattern text-ink relative overflow-hidden py-24 border-b border-border-light w-full"
    >
      {/* Title Area (Centered Container) */}
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl mb-16">
        <div className="max-w-3xl space-y-4">
          <h4 className="mono-label text-coral mb-2 text-lg font-bold">Portfolio Showcase</h4>
          <h2 className="text-[3.5rem] lg:text-[5rem] font-black tracking-tight text-shiny-dark mb-4">
            Featured Projects
          </h2>
          <p className="body-large text-body-muted text-xl leading-relaxed">
            Explore my body of work across fullstack applications, UI/UX design documentation, and artwork. Hover or click and drag sideways on the projects to scroll horizontally through the timeline.
          </p>
        </div>
      </div>

      {/* Sidebar + Horizontal Slider Layout (Full Screen Width) */}
      <div className="w-full pl-6 lg:pl-12 pr-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
          {/* Sidebar Category Selector (Left 2 cols on LG) */}
          <div className="lg:col-span-2 lg:sticky lg:top-36 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-hide w-full z-10 pr-4">
            {projectCategories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`btn-shiny text-left px-5 py-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group flex-shrink-0 lg:flex-shrink-0 hover:cursor-pointer ${
                    isActive
                      ? "bg-primary text-white border-primary shadow-lg shadow-black/10 font-bold scale-105"
                      : "bg-soft-stone text-ink border-card-border hover:border-coral hover:bg-white/80 font-medium"
                  }`}
                >
                  <span className="mono-label text-xs tracking-wide font-bold">
                    {category.label}
                  </span>
                  <span
                    className={`hidden lg:block w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive ? "bg-coral scale-125" : "bg-hairline group-hover:bg-coral"
                    }`}
                  ></span>
                </button>
              );
            })}
          </div>

          {/* Project Horizontal Scroll Content (Right 10 cols on LG - Spans full right width) */}
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`lg:col-span-10 flex flex-row gap-8 overflow-x-auto scrollbar-hide py-4 pl-4 pr-12 lg:pr-24 w-full transition-all duration-700 ease-in-out select-none ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            } ${
              isTransitioning ? "opacity-0 translate-y-4 scale-98" : "opacity-100 translate-y-0 scale-100"
            }`}
          >
            {filteredProjects.map((project, index) => {
              const isHighlighted = index === 0 || project.featured;
              const imageUrl = project.imageUrl || "/assets/Hero-1.jpg";
              const techList = project.technologies || [];
              const isArtwork = project.category === "artwork";

              return (
                <div
                  key={project.id}
                  className={`card-vibrate group relative bg-soft-stone border rounded-[28px] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 w-[340px] md:w-[420px] flex-shrink-0 ${
                    isHighlighted ? "border-coral/60 shadow-md shadow-coral/10" : "border-card-border hover:border-coral"
                  }`}
                >
                  {/* Highlight Badge */}
                  {isHighlighted && (
                    <div className="absolute top-4 left-4 z-20 bg-coral text-primary mono-label px-4 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5">
                      <FaStar className="text-primary animate-pulse" /> Highlighted Project
                    </div>
                  )}

                  {/* Project Image Link / Preview */}
                  <Link href={`/project/${project.id}`} className="relative w-full h-64 overflow-hidden block bg-primary/10">
                    <Image
                      src={imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <span className="btn-shiny px-6 py-3 bg-canvas text-primary mono-label rounded-full text-xs font-bold shadow-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {isArtwork ? "View on Instagram" : "View Full Story"} <FaArrowRight />
                      </span>
                    </div>
                  </Link>

                  {/* Project Details */}
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Title */}
                      <Link href={`/project/${project.id}`}>
                        <h3 className="card-heading text-primary group-hover:text-coral transition-colors duration-300 mb-3 text-2xl font-bold">
                          {project.title}
                        </h3>
                      </Link>

                      {/* Description */}
                      <p className="body text-body-muted mb-6 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      {/* Tech Stack Chips */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {techList.map((tech) => (
                          <span
                            key={tech}
                            className="micro px-3 py-1 bg-white border border-hairline text-ink rounded-full font-medium shadow-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Links Bar */}
                      <div className="pt-6 border-t border-hairline flex items-center justify-between">
                        <Link
                          href={`/project/${project.id}`}
                          className="btn-shiny inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white hover:bg-coral hover:text-primary rounded-full mono-label text-xs font-bold transition-all duration-300"
                        >
                          {isArtwork ? "Go to Instagram" : "Story Details"} <FaArrowRight />
                        </Link>

                        <div className="flex items-center gap-3">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-full bg-white border border-hairline flex items-center justify-center text-ink hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
                              aria-label="GitHub Repository"
                            >
                              <FaGithub size={18} />
                            </a>
                          )}
                          {project.liveUrl && !isArtwork && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-full bg-white border border-hairline flex items-center justify-center text-ink hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
                              aria-label="Live Demo"
                            >
                              <FaExternalLinkAlt size={16} />
                            </a>
                          )}
                          {isArtwork && (
                            <a
                              href={project.liveUrl || "https://instagram.com/andikahernadi"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-full bg-white border border-hairline flex items-center justify-center text-ink hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
                              aria-label="Instagram Artwork"
                            >
                              <FaInstagram size={18} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
