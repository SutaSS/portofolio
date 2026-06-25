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

      const totalWidth = slider.scrollWidth - window.innerWidth;

      if (totalWidth > 0 && window.innerWidth >= 1024) {
        gsap.to(slider, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1.5,
            start: "top top",
            end: () => `+=${slider.scrollWidth}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
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
      className="h-screen bg-deep-green bg-grid-pattern text-white relative z-20 -mt-20 lg:-mt-32 rounded-t-[40px] lg:rounded-t-[64px] shadow-[0_-20px_50px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col border-b border-white/10"
    >
      {/* Title block — fixed height at top */}
      <div className="flex-shrink-0 px-6 lg:px-12 pt-10 pb-4">
        <div className="max-w-3xl">
          <h4 className="mono-label text-coral mb-1">Riwayat Kerja & Organisasi</h4>
          <h2 className="text-[2.8rem] lg:text-[4.5rem] font-black tracking-tight text-shiny-white mb-2 leading-tight">
            Experience Timeline
          </h2>
          <p className="body-large text-white/70 text-sm lg:text-base">
            Scroll down to explore my professional journey. On desktop, the timeline slides left as you scroll.
          </p>
        </div>
      </div>

      {/* Card slider — fills remaining height */}
      <div className="flex-1 min-h-0 flex items-stretch overflow-x-hidden pl-6 lg:pl-12 pr-6 pb-10">
        <div ref={sliderRef} className="flex gap-6 lg:gap-8 w-max">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="card-lift w-[320px] md:w-[400px] lg:w-[460px] h-full bg-primary rounded-3xl border border-white/10 shadow-xl flex-shrink-0 relative group flex flex-col"
            >
              {/* Card body — scrollable if content overflows */}
              <div className="flex-1 overflow-y-auto scrollbar-hide p-6 lg:p-8">
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
                <ul className="space-y-3 text-white/80 body">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-coral mt-1 flex-shrink-0">•</span>
                      <span className="leading-relaxed">{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer — always stuck at bottom */}
              <div className="flex-shrink-0 px-6 lg:px-8 py-4 border-t border-white/10 flex items-center justify-between">
                <span className="micro text-white/50">Engineering Chapter</span>
                <div className="w-2 h-2 rounded-full bg-coral group-hover:scale-150 transition-transform duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
