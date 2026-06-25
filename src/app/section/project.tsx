"use client";
import React, { useState, useEffect, useRef } from "react";
import { projects } from "../data/projects";
import { projectCategories } from "../data/ProjectCategories";
import { FaGithub, FaExternalLinkAlt, FaStar, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { Project } from "../types/project";

const ProjectSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects as unknown as Project[]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

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

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="min-h-screen bg-canvas text-ink relative overflow-hidden py-24 border-b border-border-light"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        {/* Title */}
        <div className="mb-16 max-w-3xl">
          <h4 className="mono-label text-coral mb-2">Portfolio Showcase</h4>
          <h2 className="section-display text-primary mb-4">
            Featured Projects
          </h2>
          <p className="body-large text-body-muted">
            Explore my body of work across fullstack applications, UI/UX design documentation, and artwork. Use the category sidebar to filter by project type.
          </p>
        </div>

        {/* Sidebar + Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Sidebar Category Selector (Left 3 cols on LG) */}
          <div className="lg:col-span-3 lg:sticky lg:top-32 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-hide w-full z-10">
            {projectCategories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`btn-shiny text-left px-6 py-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group flex-shrink-0 lg:flex-shrink-0 hover:cursor-pointer ${
                    isActive
                      ? "bg-primary text-white border-primary shadow-lg shadow-black/10 font-bold scale-105"
                      : "bg-soft-stone text-ink border-card-border hover:border-coral hover:bg-white/80 font-medium"
                  }`}
                >
                  <span className="mono-label text-sm tracking-wide">
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

          {/* Project Grid Content (Right 9 cols on LG) */}
          <div
            className={`lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-500 ease-in-out ${
              isTransitioning ? "opacity-0 translate-y-4 scale-98" : "opacity-100 translate-y-0 scale-100"
            }`}
          >
            {filteredProjects.map((project, index) => {
              const isHighlighted = index === 0 || project.featured;
              const imageUrl = project.imageUrl || "/assets/Hero-1.jpg";
              const techList = project.technologies || [];

              return (
                <div
                  key={project.id}
                  className={`card-vibrate group relative bg-soft-stone border rounded-[28px] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 ${
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
                    <img
                      src={imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <span className="btn-shiny px-6 py-3 bg-canvas text-primary mono-label rounded-full text-xs font-bold shadow-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        View Full Story <FaArrowRight />
                      </span>
                    </div>
                  </Link>

                  {/* Project Details */}
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Title */}
                      <Link href={`/project/${project.id}`}>
                        <h3 className="card-heading text-primary group-hover:text-coral transition-colors duration-300 mb-3">
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
                          className="btn-shiny inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white hover:bg-coral hover:text-primary rounded-full mono-label text-xs font-bold transition-all duration-300"
                        >
                          Story Details <FaArrowRight />
                        </Link>

                        <div className="flex items-center gap-4">
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
                          {project.liveUrl && (
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
