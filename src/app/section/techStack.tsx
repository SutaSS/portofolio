"use client";
import React, { useRef, useLayoutEffect } from "react";
import { techStacks } from "../data/techStack";
import Image from "next/image";
import gsap from "gsap";

const TechStack = () => {
  const iconsRef = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      iconsRef.current.forEach((el, index) => {
        if (!el) return;
        gsap.to(el, {
          y: -12,
          duration: 1.5 + (index % 3) * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.1,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="tech-stack"
      className="min-h-fit bg-soft-stone text-ink relative overflow-hidden py-24 border-b border-border-light"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        {/* Title */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h4 className="mono-label text-coral mb-2">Keahlian & Alat</h4>
          <h2 className="section-display text-primary mb-4">
            Tech Stack
          </h2>
          <p className="body-large text-body-muted">
            A concise display of the languages, frameworks, and architectural tools I employ to build premium, high-performance applications.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-center items-center">
          {techStacks.map((tech, index) => (
            <div
              key={tech.id}
              ref={(el) => {
                iconsRef.current[index] = el;
              }}
              className="card-lift bg-canvas border border-card-border rounded-2xl p-6 flex flex-col items-center justify-center gap-4 shadow-sm hover:border-coral hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-16 h-16 relative flex items-center justify-center p-2 rounded-xl bg-soft-stone border border-hairline group-hover:bg-primary transition-colors duration-300">
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  width={48}
                  height={48}
                  className="object-contain filter transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="mono-label text-primary text-center text-xs group-hover:text-coral transition-colors duration-300">
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
