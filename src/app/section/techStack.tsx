"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { techStacks } from "../data/techStack";

const TechStack = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: "0px",
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
  }, []);

  // Group tech stack by category
  const frontendTech = techStacks.filter((tech) => tech.category === "frontend");
  const backendTech = techStacks.filter((tech) => tech.category === "backend");
  const mobileTech = techStacks.filter((tech) => tech.category === "mobile");
  const databaseTech = techStacks.filter((tech) => tech.category === "database");
  const toolsTech = techStacks.filter((tech) => tech.category === "tools");

  const renderTechCard = (tech: typeof techStacks[0], index: number, delay: number = 0) => (
    <div
      key={tech.id}
      onMouseEnter={() => setHoveredTech(tech.id)}
      onMouseLeave={() => setHoveredTech(null)}
      className={`group relative h-full ${
        isVisible ? "animate-fade-in-up" : "opacity-0"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className="relative bg-navy-blue/50 backdrop-blur-sm rounded-2xl p-6 border-2 h-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex flex-col items-center justify-center"
        style={{
          borderColor:
            hoveredTech === tech.id
              ? tech.color
              : "rgba(112, 141, 129, 0.2)",
          boxShadow:
            hoveredTech === tech.id
              ? `0 0 30px ${tech.color}40`
              : "none",
        }}
      >
        {/* Icon */}
        <div
          className="w-16 h-16 flex items-center justify-center transition-all duration-300 mb-3"
          style={{
            filter:
              hoveredTech === tech.id
                ? "none"
                : "grayscale(100%) opacity(0.7)",
          }}
        >
          <Image
            src={tech.icon}
            alt={tech.name}
            width={64}
            height={64}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Name */}
        <h3
          className="text-sm font-semibold text-center transition-all duration-300"
          style={{
            color: hoveredTech === tech.id ? tech.color : "#708D81",
          }}
        >
          {tech.name}
        </h3>

        {/* Glow effect on hover */}
        {hoveredTech === tech.id && (
          <div
            className="absolute inset-0 rounded-2xl blur-xl opacity-20 -z-10"
            style={{
              backgroundColor: tech.color,
            }}
          />
        )}
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="min-h-screen bg-dark-bg relative overflow-visible pt-16 lg:pt-0"
    >
      <div
        className={`relative z-10 min-h-screen container mx-auto px-4 lg:px-8 justify-center flex flex-col py-16 lg:py-24 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Title */}
        <div className="text-center mb-16">
          <h2
            className={`text-neon-aqua text-4xl lg:text-5xl font-orbitron font-bold mb-4 ${
              isVisible ? "animate-fade-in-down" : "animate-fade-out-up"
            }`}
          >
            Tech Stack
          </h2>

          <p
            className={`text-olive-green/80 mt-6 text-lg font-inter ${
              isVisible
                ? "animate-fade-in-up delay-200"
                : "animate-fade-out-down delay-200"
            }`}
          >
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="max-w-7xl mx-auto w-full space-y-6">
          {/* Row 1: Frontend (Full Width) */}
          <div className="bg-navy-blue/30 backdrop-blur-sm rounded-3xl p-6 border border-olive-green/20">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-neon-aqua text-xl font-orbitron font-bold">
                Frontend
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
              {frontendTech.map((tech, index) =>
                renderTechCard(tech, index, 300 + index * 100)
              )}
            </div>
          </div>

          {/* Row 2: Backend (Large) + Mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Backend - Takes 2 columns */}
            <div className="lg:col-span-2 bg-navy-blue/30 backdrop-blur-sm rounded-3xl p-6 border border-olive-green/20">
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-neon-aqua text-xl font-orbitron font-bold">
                  Backend
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {backendTech.map((tech, index) =>
                  renderTechCard(tech, index, 700 + index * 100)
                )}
              </div>
            </div>

            {/* Mobile - Takes 1 column */}
            <div className="bg-navy-blue/30 backdrop-blur-sm rounded-3xl p-6 border border-olive-green/20">
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-neon-aqua text-xl font-orbitron font-bold">
                  Mobile
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {mobileTech.map((tech, index) =>
                  renderTechCard(tech, index, 1300 + index * 100)
                )}
              </div>
            </div>
          </div>

          {/* Row 3: Database + Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Database */}
            <div className="bg-navy-blue/30 backdrop-blur-sm rounded-3xl p-6 border border-olive-green/20">
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-neon-aqua text-xl font-orbitron font-bold">
                  Database
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {databaseTech.map((tech, index) =>
                  renderTechCard(tech, index, 1500 + index * 100)
                )}
              </div>
            </div>

            {/* Tools */}
            <div className="bg-navy-blue/30 backdrop-blur-sm rounded-3xl p-6 border border-olive-green/20">
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-neon-aqua text-xl font-orbitron font-bold">
                  Tools
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {toolsTech.map((tech, index) =>
                  renderTechCard(tech, index, 1700 + index * 100)
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
