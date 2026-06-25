"use client";
import React, { useRef, useLayoutEffect } from "react";
import { techStacks } from "../data/techStack";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const TechStack = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bubblesRef = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // When scrolling into section for the first time, fade in the bubbles
      gsap.fromTo(
        bubblesRef.current,
        { opacity: 0, scale: 0.4, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            onEnter: () => {
              // Start floating bubble animation after fade-in
              bubblesRef.current.forEach((el, index) => {
                if (!el) return;
                gsap.to(el, {
                  y: -16,
                  duration: 2 + (index % 3) * 0.4,
                  repeat: -1,
                  yoyo: true,
                  ease: "power1.inOut",
                  delay: 1.2 + index * 0.1,
                });
              });
            },
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="min-h-screen bg-soft-stone text-ink relative overflow-hidden py-32 border-b border-border-light flex flex-col justify-center items-center"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl flex flex-col items-center justify-center relative z-10">
        {/* Title Centered in Section */}
        <div className="text-center mb-20 max-w-3xl mx-auto space-y-4">
          <h4 className="mono-label text-coral text-lg font-bold">Keahlian & Alat</h4>
          <h2 className="section-display text-primary font-black tracking-tight">
            Tech Stack
          </h2>
          <p className="body-large text-body-muted text-xl leading-relaxed">
            A concise display of the languages, frameworks, and architectural tools I employ to build premium, high-performance applications.
          </p>
        </div>

        {/* Tech Floating Bubbles Grid */}
        <div className="flex flex-wrap gap-8 justify-center items-center max-w-6xl mx-auto">
          {techStacks.map((tech, index) => (
            <div
              key={tech.id}
              ref={(el) => {
                bubblesRef.current[index] = el;
              }}
              className="card-lift w-28 h-28 sm:w-36 sm:h-36 bg-canvas/90 backdrop-blur-xl border border-card-border rounded-full p-4 flex flex-col items-center justify-center gap-2 sm:gap-3 shadow-xl hover:border-coral hover:shadow-2xl transition-all duration-300 group hover:cursor-pointer"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 relative flex items-center justify-center p-2 rounded-full bg-soft-stone border border-hairline group-hover:bg-primary transition-colors duration-300 shadow-inner">
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  width={48}
                  height={48}
                  className="object-contain filter transition-transform duration-300 group-hover:scale-115 w-8 h-8 sm:w-12 sm:h-12"
                />
              </div>
              <span className="mono-label text-primary text-center text-[10px] sm:text-xs font-bold group-hover:text-coral transition-colors duration-300 line-clamp-1">
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
