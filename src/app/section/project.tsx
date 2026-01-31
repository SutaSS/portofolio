"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { projects } from "../data/projects";
import { projectCategories } from "../data/ProjectCategories";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [isVisible, setIsVisible] = useState(false);
  const [, setHasAnimated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [, setIsFiltering] = useState(false);
  const [showProjects, setShowProjects] = useState(true);
  const [cardVisibility, setCardVisibility] = useState<{[key: string]: boolean}>({});
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Gunakan intersection observer untuk mobile dan desktop
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        setHasAnimated(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 20% of section is visible
        rootMargin: "0px", // Adjust for earlier/later trigger
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isMobile]);

  // Observer for individual project cards
  useEffect(() => {
    if (!isVisible) return;

    const timeoutId = setTimeout(() => {
      const cardObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const cardId = entry.target.getAttribute('data-card-id');
            if (cardId) {
              setCardVisibility(prev => ({
                ...prev,
                [cardId]: entry.isIntersecting
              }));
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: "-50px",
        }
      );

      // Observe all cards
      Object.values(cardRefs.current).forEach((ref) => {
        if (ref) cardObserver.observe(ref);
      });

      return () => {
        Object.values(cardRefs.current).forEach((ref) => {
          if (ref) cardObserver.unobserve(ref);
        });
      };
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [isVisible, filteredProjects]);

  const handleCategoryFilter = (categoryId: string) => {
    if (categoryId === activeCategory) return;

    setIsFiltering(true);
    setShowProjects(false);
    setCardVisibility({});

    setTimeout(() => {
      setActiveCategory(categoryId);
      if (categoryId === "all") {
        setFilteredProjects(projects);
      } else {
        setFilteredProjects(
          projects.filter((project) => project.category === categoryId)
        );
      }

      setTimeout(() => {
        setShowProjects(true);
        setIsFiltering(false);
      }, 50);
    }, 300); // Simulate filtering delay
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="min-h-screen bg-dark-bg relative overflow-visible pt-16 lg:pt-0"
    >
      <div className="absolute inset-0 bg-gradient-to-br to-dark-bg"></div>
      <div
        className={`relative z-10 container mx-auto px-4 lg:px-8 justify-center flex flex-col py-12 lg:py-20 transition-all duration-700 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Title */}
        <div className="text-center mb-12 lg:mb-16">
          <h2
            className={`text-neon-aqua text-3xl lg:text-5xl font-bold mb-6 lg:mb-8 transition-all duration-700 ${
              isVisible ? "animate-fade-in-up delay-100" : "animate-fade-out-down"
            }`}
          >
            Projects
          </h2>

          {/* Category Filter */}
          <div
            className={`flex flex-wrap justify-center gap-3 lg:gap-4 mt-8 lg:mt-12 transition-all duration-700 ${
              isVisible ? "animate-fade-in-down delay-100" : "animate-fade-out-up"
            }`}
          >
            {projectCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryFilter(category.id)}
                className={`px-4 lg:px-6 py-2 lg:py-3 rounded-lg border text-sm lg:text-base transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-neon-aqua text-dark-bg border-neon-aqua"
                    : "bg-navy-blue/50 text-olive-green border-olive-green/30 hover:border-neon-aqua/50 hover:text-neon-aqua hover:cursor-pointer"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {showProjects ? (
            // Real projects
            filteredProjects.map((project) => (
              <div
                key={project.id}
                ref={(el) => { cardRefs.current[project.id] = el; }}
                data-card-id={project.id}
                className={`group relative bg-navy-blue/50 rounded-2xl overflow-hidden border border-olive-green/20 hover:border-neon-aqua/50 transition-all duration-700 transform hover:scale-105 ${
                  cardVisibility[project.id] 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-10"
                }`}
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-olive-green/20 to-neon-aqua/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={400}
                    height={192}
                    className="w-full h-full object-cover"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />

                  {/* Hover Overlay with Links */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-4">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-dark-bg/80 rounded-full flex items-center justify-center text-neon-aqua hover:bg-neon-aqua hover:text-dark-bg transition-all duration-300"
                        >
                          <FaGithub size={20} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-dark-bg/80 rounded-full flex items-center justify-center text-neon-aqua hover:bg-neon-aqua hover:text-dark-bg transition-all duration-300"
                        >
                          <FaExternalLinkAlt size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-orbitron font-bold text-neon-aqua group-hover:text-soft-white transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-olive-green/80 text-sm font-inter leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-olive-green/10 text-olive-green text-xs font-inter rounded-full border border-olive-green/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-olive-green to-neon-aqua transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            ))
          ) : (
            // Skeleton placeholders
            [1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative bg-navy-blue/30 rounded-2xl overflow-hidden border border-olive-green/10 h-96 animate-pulse"
              >
                <div className="h-48 bg-olive-green/10"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-olive-green/10 rounded w-3/4"></div>
                  <div className="h-4 bg-olive-green/10 rounded w-full"></div>
                  <div className="h-4 bg-olive-green/10 rounded w-5/6"></div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-olive-green/10 rounded-full w-16"></div>
                    <div className="h-6 bg-olive-green/10 rounded-full w-20"></div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
