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

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="min-h-screen bg-dark-bg relative overflow-visible pt-16 lg:pt-0"
    >
      <div className={`relative z-10 min-h-screen container mx-auto px-4 lg:px-8 justify-center flex flex-col py-16 lg:py-24 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}>
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className={`text-neon-aqua text-4xl lg:text-5xl font-orbitron font-bold mb-4 ${
            isVisible ? "animate-fade-in-down" : "animate-fade-out-up"
          }`}>
            Tech Stack
          </h2>

          <p className={`text-olive-green/80 mt-6 text-lg font-inter ${
            isVisible ? "animate-fade-in-up delay-200" : "animate-fade-out-down delay-200"
          }`}>
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {techStacks.map((tech, index) => {
            const rowNumber = Math.floor(index / 4); // Calculate row (0-based)
            const isOddRow = rowNumber % 2 === 0; // Row 0, 2, 4... = odd row (1, 3, 5...)
            
            return (
              <div
                key={tech.id}
                onMouseEnter={() => setHoveredTech(tech.id)}
                onMouseLeave={() => setHoveredTech(null)}
                className={`group relative ${
                  isOddRow
                    ? isVisible ? "animate-slide-in-left" : "animate-slide-out-right"
                    : isVisible ? "animate-slide-in-right" : "animate-slide-out-left"
                }`}
                style={{ animationDelay: `${(index % 4) * 100}ms` }}
              >
              {/* Card */}
              <div
                className="relative bg-navy-blue/50 rounded-2xl p-8 border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
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
                {/* Icon Container */}
                <div className="flex flex-col items-center justify-center space-y-4">
                  {/* Icon */}
                  <div
                    className="w-20 h-20 flex items-center justify-center transition-all duration-300"
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
                      width={80}
                      height={80}
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
                </div>

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
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
