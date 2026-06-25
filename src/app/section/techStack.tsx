"use client";
import React, { useRef, useLayoutEffect, useState } from "react";
import { techStacks } from "../data/techStack";
import Image from "next/image";
import gsap from "gsap";

const TechStack = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bubblesRef = useRef<Array<HTMLDivElement | null>>([]);
  const mobileBubblesRef = useRef<Array<HTMLDivElement | null>>([]);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // Bubbles stay visible from the start — float continuously without animation-in
      bubblesRef.current.forEach((el, index) => {
        if (!el) return;
        gsap.to(el, {
          y: -16,
          duration: 2 + (index % 3) * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.08,
        });
      });

      // Mobile bubbles
      mobileBubblesRef.current.forEach((el, index) => {
        if (!el) return;
        gsap.to(el, {
          y: -12,
          duration: 2 + (index % 3) * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.08,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Orbital positions: center shifted slightly right for balance
  // Center: x=480, y=390
  // Ring 1 (8 items): Radius X=320px, Radius Y=240px
  // Ring 2 (11 items): Radius X=500px, Radius Y=360px
  const getOrbitalPosition = (index: number) => {
    if (index < 8) {
      const angle = (index / 8) * 2 * Math.PI;
      const x = 480 + Math.round(Math.cos(angle) * 320);
      const y = 390 + Math.round(Math.sin(angle) * 240);
      return { left: `${x}px`, top: `${y}px` };
    } else {
      const subIndex = index - 8;
      const angle = (subIndex / 11) * 2 * Math.PI;
      const x = 480 + Math.round(Math.cos(angle) * 500);
      const y = 390 + Math.round(Math.sin(angle) * 360);
      return { left: `${x}px`, top: `${y}px` };
    }
  };

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      className="min-h-screen bg-soft-stone bg-grid-pattern text-ink relative overflow-hidden py-24 border-b border-border-light flex flex-col justify-center items-center"
    >
      {/* Floating Cursor Tooltip */}
      {hoveredTech && (
        <div
          className="fixed pointer-events-none z-50 bg-ink text-canvas mono-label text-xs font-bold px-4 py-2 rounded-xl shadow-2xl border border-coral flex items-center gap-2 backdrop-blur-md bg-opacity-95 transform -translate-x-1/2 -translate-y-12 transition-transform duration-75 ease-out"
          style={{ left: mousePos.x, top: mousePos.y }}
        >
          {hoveredTech}
        </div>
      )}
      {/* DESKTOP / TABLET ORBITAL LAYOUT (Perfectly Centered via Fixed Absolute Wrapper) */}
      <div className="hidden lg:block relative w-[1100px] h-[780px] my-12 pointer-events-none mx-auto">
        {/* Title Exactly in the Center of the Wrapper (550px, 390px) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md text-center pointer-events-none z-30 space-y-4">
          <h4 className="mono-label text-coral text-lg font-bold">Keahlian & Alat</h4>
          <h2 className="text-[3.5rem] lg:text-[5rem] font-black tracking-tight text-shiny-dark mb-4">
            Tech Stack
          </h2>
          <p className="body text-body-muted text-lg leading-relaxed">
            A concise display of the languages, frameworks, and architectural tools I employ to build premium, high-performance applications.
          </p>
        </div>

        {/* Orbiting Bubbles surrounding the Exact Center Text */}
        <div className="absolute inset-0 w-full h-full pointer-events-auto">
          {techStacks.map((tech, index) => {
            const pos = getOrbitalPosition(index);
            return (
              <div
                key={tech.id}
                ref={(el) => {
                  bubblesRef.current[index] = el;
                }}
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
                style={{ left: pos.left, top: pos.top }}
                className="absolute -translate-x-1/2 -translate-y-1/2 card-lift w-28 h-28 bg-canvas/90 backdrop-blur-xl border border-card-border rounded-full p-3 flex flex-col items-center justify-center gap-2 shadow-xl hover:border-coral hover:shadow-2xl transition-all duration-300 group hover:cursor-pointer z-20"
              >
                {/* Inner circle turns white/light with coral border on hover, NEVER black */}
                <div className="w-12 h-12 relative flex items-center justify-center p-2 rounded-full bg-soft-stone border border-hairline group-hover:bg-white group-hover:border-coral transition-all duration-300 shadow-inner">
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    width={48}
                    height={48}
                    className="object-contain filter transition-transform duration-300 group-hover:scale-115 w-8 h-8"
                  />
                </div>
                <span className="mono-label text-primary text-center text-[10px] font-bold group-hover:text-coral transition-colors duration-300 line-clamp-1">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* MOBILE / NARROW LAYOUT (shown on screens < lg) */}
      <div className="lg:hidden container mx-auto px-6 flex flex-col items-center justify-center relative z-10 space-y-16 py-12">
        {/* Title */}
        <div className="text-center max-w-xl mx-auto space-y-4">
          <h4 className="mono-label text-coral text-lg font-bold">Keahlian & Alat</h4>
          <h2 className="text-[3.5rem] lg:text-[5rem] font-black tracking-tight text-shiny-dark mb-4">
            Tech Stack
          </h2>
          <p className="body text-body-muted text-lg leading-relaxed">
            A concise display of the languages, frameworks, and architectural tools I employ to build premium, high-performance applications.
          </p>
        </div>

        {/* Tech Floating Bubbles Grid */}
        <div className="flex flex-wrap gap-6 justify-center items-center max-w-2xl mx-auto">
          {techStacks.map((tech, index) => (
            <div
              key={tech.id}
              ref={(el) => {
                mobileBubblesRef.current[index] = el;
              }}
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
              className="card-lift w-28 h-28 bg-canvas/90 backdrop-blur-xl border border-card-border rounded-full p-3 flex flex-col items-center justify-center gap-2 shadow-xl hover:border-coral hover:shadow-2xl transition-all duration-300 group hover:cursor-pointer"
            >
              {/* Inner circle turns white/light with coral border on hover, NEVER black */}
              <div className="w-12 h-12 relative flex items-center justify-center p-2 rounded-full bg-soft-stone border border-hairline group-hover:bg-white group-hover:border-coral transition-all duration-300 shadow-inner">
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  width={48}
                  height={48}
                  className="object-contain filter transition-transform duration-300 group-hover:scale-115 w-8 h-8"
                />
              </div>
              <span className="mono-label text-primary text-center text-[10px] font-bold group-hover:text-coral transition-colors duration-300 line-clamp-1">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
