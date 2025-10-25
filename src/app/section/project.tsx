"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { projects, } from "../data/projects";
import { projectCategories, } from "../data/ProjectCategories";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const handleCategoryFilter = (categoryId: string) => {
    setActiveCategory(categoryId);
    if (categoryId === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === categoryId));
    }
  };

  return (
    <section
      id="projects"
      className="min-h-screen bg-dark-bg relative overflow-visible pt-24 lg:pt-0"
    >
      <div className="absolute inset-0 bg-gradient-to-br to-dark-bg"></div>
      <div className="relative z-10 min-h-screen container mx-auto px-8 justify-center flex flex-col py-20">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-neon-aqua text-4xl lg:text-5xl font-bold mb-8">
            Projects
          </h2>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {projectCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryFilter(category.id)}
                className={`px-6 py-3 rounded-lg border transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-neon-aqua text-dark-bg border-neon-aqua'
                    : 'bg-navy-blue/50 text-olive-green border-olive-green/30 hover:border-neon-aqua/50 hover:text-neon-aqua hover:cursor-pointer'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-navy-blue/50 rounded-2xl overflow-hidden border border-olive-green/20 hover:border-neon-aqua/50 transition-all duration-300 transform hover:scale-105"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-olive-green/20 to-neon-aqua/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-navy-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Placeholder for project image */}
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
                <h3 className="text-xl font-bold text-neon-aqua group-hover:text-soft-white transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-olive-green/80 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-olive-green/10 text-olive-green text-xs rounded-full border border-olive-green/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-olive-green to-neon-aqua transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;