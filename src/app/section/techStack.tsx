"use client";
import React, { useState } from "react";
import Image from "next/image";
import { techStacks } from "../data/techStack";

const TechStack = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <section
      id="tech-stack"
      className="min-h-screen bg-dark-bg relative overflow-visible pt-24 lg:pt-0"
    >
      <div className="relative z-10 min-h-screen container mx-auto px-8 justify-center flex flex-col py-20">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-neon-aqua text-4xl lg:text-5xl font-bold mb-4">
            Tech Stack
          </h2>

          <p className="text-olive-green/80 mt-6 text-lg">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {techStacks.map((tech) => (
            <div
              key={tech.id}
              onMouseEnter={() => setHoveredTech(tech.id)}
              onMouseLeave={() => setHoveredTech(null)}
              className="group relative"
            >
              {/* Card */}
              <div
                className="relative bg-navy-blue/50 rounded-2xl p-8 border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                style={{
                  borderColor: hoveredTech === tech.id ? tech.color : 'rgba(112, 141, 129, 0.2)',
                  boxShadow: hoveredTech === tech.id ? `0 0 30px ${tech.color}40` : 'none',
                }}
              >
                {/* Icon Container */}
                <div className="flex flex-col items-center justify-center space-y-4">
                  {/* Icon */}
                  <div 
                    className="w-20 h-20 flex items-center justify-center transition-all duration-300"
                    style={{
                      filter: hoveredTech === tech.id ? 'none' : 'grayscale(100%) opacity(0.7)',
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
                      color: hoveredTech === tech.id ? tech.color : '#708D81',
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
          ))}
        </div>

        {/* Category Legend (Optional) */}
        {/* <div className="flex flex-wrap justify-center gap-4 mt-16">
          <div className="flex items-center gap-2 px-4 py-2 bg-navy-blue/50 rounded-lg border border-olive-green/20">
            <div className="w-3 h-3 bg-neon-aqua rounded-full"></div>
            <span className="text-olive-green text-sm">Frontend</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-navy-blue/50 rounded-lg border border-olive-green/20">
            <div className="w-3 h-3 bg-olive-green rounded-full"></div>
            <span className="text-olive-green text-sm">Backend</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-navy-blue/50 rounded-lg border border-olive-green/20">
            <div className="w-3 h-3 bg-neon-aqua/70 rounded-full"></div>
            <span className="text-olive-green text-sm">Database</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-navy-blue/50 rounded-lg border border-olive-green/20">
            <div className="w-3 h-3 bg-soft-white rounded-full"></div>
            <span className="text-olive-green text-sm">Tools & Mobile</span>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default TechStack;
