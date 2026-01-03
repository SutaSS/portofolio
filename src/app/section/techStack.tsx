"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { techStacks } from "../data/techStack";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TechStack = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  // Group tech stacks by category
  const groupedTechs = {
    frontend: techStacks.filter(t => t.category === 'frontend'),
    mobile: techStacks.filter(t => t.category === 'mobile'),
    backend: techStacks.filter(t => t.category === 'backend'),
    database: techStacks.filter(t => t.category === 'database'),
    tools: techStacks.filter(t => t.category === 'tools'),
  };

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.tech-card');

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 60,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        stagger: {
          amount: 0.6,
          from: 'start'
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 30%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="min-h-screen bg-dark-bg relative overflow-visible pt-24 lg:pt-0"
    >
      <div className="relative z-10 min-h-screen container mx-auto px-8 justify-center flex flex-col py-20">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-neon-aqua text-4xl lg:text-5xl font-orbitron font-bold mb-4">
            Tech Stack
          </h2>
          <p className="text-olive-green/80 mt-6 text-lg font-inter">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div ref={gridRef} className="max-w-7xl mx-auto w-full">
          {/* Grid container with custom layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[120px]">
            
            {/* Frontend - Large Featured Card (spans 2x2) */}
            <div className="tech-card col-span-2 row-span-2 bg-navy-blue/50 rounded-2xl p-6 border-2 border-olive-green/20 hover:border-neon-aqua/50 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-aqua/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-neon-aqua font-orbitron font-bold text-lg mb-4 relative z-10">Frontend</h3>
              <div className="grid grid-cols-3 gap-3 relative z-10">
                {groupedTechs.frontend.slice(0, 6).map(tech => (
                  <div
                    key={tech.id}
                    onMouseEnter={() => setHoveredTech(tech.id)}
                    onMouseLeave={() => setHoveredTech(null)}
                    className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-navy-blue/30 transition-all group/item"
                  >
                    <Image
                      src={tech.icon}
                      alt={tech.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 object-contain transition-all"
                      style={{
                        filter: hoveredTech === tech.id ? 'none' : 'grayscale(100%) opacity(0.7)'
                      }}
                    />
                    <span 
                      className="text-xs mt-1 text-center transition-colors"
                      style={{ color: hoveredTech === tech.id ? tech.color : '#708D81' }}
                    >
                      {tech.name.split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile - Medium Card (spans 2x1) */}
            <div className="tech-card col-span-2 row-span-1 bg-navy-blue/50 rounded-2xl p-4 border-2 border-olive-green/20 hover:border-neon-aqua/50 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-aqua/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-neon-aqua font-orbitron font-bold text-sm mb-2 relative z-10">Mobile</h3>
              <div className="flex gap-4 justify-center relative z-10">
                {groupedTechs.mobile.map(tech => (
                  <div
                    key={tech.id}
                    onMouseEnter={() => setHoveredTech(tech.id)}
                    onMouseLeave={() => setHoveredTech(null)}
                    className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-navy-blue/30 transition-all"
                  >
                    <Image
                      src={tech.icon}
                      alt={tech.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 object-contain"
                      style={{
                        filter: hoveredTech === tech.id ? 'none' : 'grayscale(100%) opacity(0.7)'
                      }}
                    />
                    <span 
                      className="text-xs mt-1"
                      style={{ color: hoveredTech === tech.id ? tech.color : '#708D81' }}
                    >
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Backend - Tall Card (spans 1x2) */}
            <div className="tech-card col-span-1 row-span-2 bg-navy-blue/50 rounded-2xl p-4 border-2 border-olive-green/20 hover:border-neon-aqua/50 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-aqua/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-neon-aqua font-orbitron font-bold text-sm mb-3 relative z-10">Backend</h3>
              <div className="flex flex-col gap-3 relative z-10">
                {groupedTechs.backend.map(tech => (
                  <div
                    key={tech.id}
                    onMouseEnter={() => setHoveredTech(tech.id)}
                    onMouseLeave={() => setHoveredTech(null)}
                    className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-navy-blue/30 transition-all"
                  >
                    <Image
                      src={tech.icon}
                      alt={tech.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain"
                      style={{
                        filter: hoveredTech === tech.id ? 'none' : 'grayscale(100%) opacity(0.7)'
                      }}
                    />
                    <span 
                      className="text-xs mt-1 text-center"
                      style={{ color: hoveredTech === tech.id ? tech.color : '#708D81' }}
                    >
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Database - Tall Card (spans 1x2) */}
            <div className="tech-card col-span-1 row-span-2 bg-navy-blue/50 rounded-2xl p-4 border-2 border-olive-green/20 hover:border-neon-aqua/50 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-aqua/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-neon-aqua font-orbitron font-bold text-sm mb-3 relative z-10">Database</h3>
              <div className="flex flex-col gap-3 relative z-10">
                {groupedTechs.database.map(tech => (
                  <div
                    key={tech.id}
                    onMouseEnter={() => setHoveredTech(tech.id)}
                    onMouseLeave={() => setHoveredTech(null)}
                    className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-navy-blue/30 transition-all"
                  >
                    <Image
                      src={tech.icon}
                      alt={tech.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain"
                      style={{
                        filter: hoveredTech === tech.id ? 'none' : 'grayscale(100%) opacity(0.7)'
                      }}
                    />
                    <span 
                      className="text-xs mt-1 text-center"
                      style={{ color: hoveredTech === tech.id ? tech.color : '#708D81' }}
                    >
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools - Medium Card (spans 2x1) */}
            <div className="tech-card col-span-2 row-span-1 bg-navy-blue/50 rounded-2xl p-4 border-2 border-olive-green/20 hover:border-neon-aqua/50 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-aqua/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-neon-aqua font-orbitron font-bold text-sm mb-2 relative z-10">Tools</h3>
              <div className="flex gap-4 justify-center relative z-10">
                {groupedTechs.tools.map(tech => (
                  <div
                    key={tech.id}
                    onMouseEnter={() => setHoveredTech(tech.id)}
                    onMouseLeave={() => setHoveredTech(null)}
                    className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-navy-blue/30 transition-all"
                  >
                    <Image
                      src={tech.icon}
                      alt={tech.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 object-contain"
                      style={{
                        filter: hoveredTech === tech.id ? 'none' : 'grayscale(100%) opacity(0.7)'
                      }}
                    />
                    <span 
                      className="text-xs mt-1"
                      style={{ color: hoveredTech === tech.id ? tech.color : '#708D81' }}
                    >
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
