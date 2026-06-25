"use client";
import React, { useRef, useLayoutEffect } from "react";
import { experiences } from "../data/experience";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const Experience = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const slider = sliderRef.current;
      if (!container || !slider) return;

      // We want to pin the container and slide the inner container to the left
      const totalWidth = slider.scrollWidth - window.innerWidth;

      if (totalWidth > 0 && window.innerWidth >= 1024) {
        gsap.to(slider, {
          x: -totalWidth - 80, // extra padding
          ease: "none",
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            end: () => `+=${slider.scrollWidth}`,
            invalidateOnRefresh: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="experience"
      className="min-h-screen bg-deep-green text-white relative overflow-hidden py-24 flex flex-col justify-center border-b border-white/10"
    >
      <div className="container mx-auto px-6 lg:px-12 mb-12 flex-shrink-0">
        {/* Title */}
        <div className="max-w-3xl">
          <h4 className="mono-label text-coral mb-2">Riwayat Kerja & Organisasi</h4>
          <h2 className="section-display text-white mb-4">
            Experience Timeline
          </h2>
          <p className="body-large text-white/80">
            Scroll down to explore my professional journey. On desktop, watch the timeline smoothly slide to the left as you scroll through the chapters of my engineering career.
          </p>
        </div>
      </div>

      {/* Horizontal Slider Container */}
      <div className="flex-1 flex items-center overflow-x-auto lg:overflow-x-visible pl-6 lg:pl-12 pr-6 py-8 scrollbar-hide">
        <div ref={sliderRef} className="flex gap-8 w-max items-stretch">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="card-vibrate w-[340px] md:w-[420px] lg:w-[480px] bg-primary rounded-3xl p-8 border border-white/10 flex flex-col justify-between shadow-xl flex-shrink-0 relative group"
            >
              <div>
                {/* Header / Period */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span
                    className={`mono-label px-4 py-1.5 rounded-full text-xs font-semibold ${
                      exp.current
                        ? "bg-coral text-primary font-bold shadow-md shadow-coral/20"
                        : "bg-white/10 text-white/80"
                    }`}
                  >
                    {exp.period}
                  </span>
                  <span className="mono-label text-coral text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                    0{index + 1}
                  </span>
                </div>

                {/* Title & Company */}
                <div className="space-y-2 mb-6">
                  <h3 className="card-heading text-white group-hover:text-coral transition-colors duration-300">
                    {exp.title}
                  </h3>
                  <p className="body-large text-white/90 font-medium">
                    {exp.company}
                  </p>
                  <p className="micro text-white/60">
                    {exp.location}
                  </p>
                </div>

                {/* Description */}
                <ul className="space-y-3 text-white/80 body mb-6">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-coral mt-1 flex-shrink-0">•</span>
                      <span className="leading-relaxed">{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Decorative Indicator */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="micro text-white/50">Engineering Chapter</span>
                <div className="w-2 h-2 rounded-full bg-coral group-hover:scale-150 transition-transform duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-6 lg:px-12 mt-12 text-center flex-shrink-0">
        <a
          href="#contact"
          className="btn-shiny inline-block px-8 py-4 bg-canvas text-primary rounded-full font-inter font-medium text-sm tracking-wide shadow-lg hover:bg-coral hover:text-primary transition-all duration-300 group"
        >
          Let&apos;s Work Together
        </a>
      </div>
    </section>
  );
};

export default Experience;
