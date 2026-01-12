"use client";
import React, { useState, useRef, useEffect } from "react";
import { experiences } from "../data/experience";

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cardVisibility, setCardVisibility] = useState<{[key: string]: boolean}>({});
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  const cardObserverRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const currentSection = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  // Separate effect for cards - only observe after section is visible with delay
  useEffect(() => {
    if (!isVisible) return;

    // Delay card observation to allow title animation to complete
    const timeoutId = setTimeout(() => {
      // Clean up previous observer if exists
      if (cardObserverRef.current) {
        cardObserverRef.current.disconnect();
      }

      cardObserverRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const cardId = entry.target.getAttribute('data-card-id');
            if (cardId && entry.isIntersecting) {
              // Only set to true, never back to false (once visible, stay visible)
              setCardVisibility(prev => ({
                ...prev,
                [cardId]: true
              }));
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px",
        }
      );

      // Observe all cards
      Object.values(cardRefs.current).forEach((ref) => {
        if (ref) cardObserverRef.current?.observe(ref);
      });
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      if (cardObserverRef.current) {
        cardObserverRef.current.disconnect();
      }
    };
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="min-h-screen bg-dark-bg relative overflow-visible pt-16 lg:pt-0"
    >
      <div className="relative z-10 container mx-auto px-4 lg:px-8 justify-center flex flex-col py-12 lg:py-20">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className={`text-neon-aqua text-4xl lg:text-5xl font-orbitron font-bold mb-4 ${
            isVisible ? "animate-fade-in-down" : "animate-fade-out-up"
          }`}>
            Experience
          </h2>
          <p className={`text-olive-green/80 mt-6 text-lg font-inter italic ${
            isVisible ? "animate-fade-in-up" : "animate-fade-out-down"
          }`}>
            The Begining of an Era
          </p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto w-full">
          <div className="relative">
            {/* Vertical Line */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-neon-aqua via-olive-green to-neon-aqua hidden lg:block transition-all duration-1000 origin-top z-0 ${
              isVisible ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
            }`}></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } flex-col lg:gap-0 gap-8`}
                >
                  {/* Content Box - Left/Right */}
                  <div
                    ref={(el) => { cardRefs.current[exp.id] = el; }}
                    data-card-id={exp.id}
                    className={`w-full lg:w-[calc(50%-2rem)] transition-all duration-700 ${
                      index % 2 === 0
                        ? "lg:text-right lg:pr-8"
                        : "lg:text-left lg:pl-8"
                    } ${
                      cardVisibility[exp.id] 
                        ? "opacity-100 translate-y-0" 
                        : "opacity-0 translate-y-10"
                    }`}
                  >
                    <div className="group">
                      {/* Card */}
                      <div className="bg-navy-blue/50 rounded-2xl p-6 border-2 border-olive-green/20 hover:border-neon-aqua/50 transition-all duration-300 hover:shadow-2xl hover:shadow-neon-aqua/20 transform hover:scale-105">
                        {/* Title & Company */}
                        <div className="space-y-2 mb-4">
                          <h3 className="text-neon-aqua text-xl font-orbitron font-bold">
                            {exp.title}
                          </h3>
                          <p className="text-soft-white font-inter font-semibold">
                            {exp.company}
                          </p>
                          <p className="text-olive-green/80 text-sm font-inter">
                            {exp.location}
                          </p>
                        </div>

                        {/* Period */}
                        <div className="mb-4">
                          <span
                            className={`inline-block px-4 py-1 rounded-full text-sm font-inter font-semibold ${
                              exp.current
                                ? "bg-neon-aqua/20 text-neon-aqua border border-neon-aqua/30"
                                : "bg-olive-green/20 text-olive-green border border-olive-green/30"
                            }`}
                          >
                            {exp.period}
                          </span>
                        </div>

                        {/* Description */}
                        <ul
                          className={`space-y-2 text-soft-white/80 text-sm font-inter ${
                            index % 2 === 0 ? "lg:text-right" : "lg:text-left"
                          }`}
                        >
                          {exp.description.map((desc, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span
                                className={`text-neon-aqua mt-1 flex-shrink-0 ${
                                  index % 2 === 0 ? "lg:order-2" : "lg:order-1"
                                }`}
                              >
                                •
                              </span>
                              <span
                                className={
                                  index % 2 === 0 ? "lg:order-1" : "lg:order-2"
                                }
                              >
                                {desc}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex items-center justify-center z-10">
                    <div
                      className={`w-6 h-6 rounded-full border-4 transition-all duration-500 hover:scale-125 ${
                        exp.current
                          ? "bg-neon-aqua border-neon-aqua shadow-lg shadow-neon-aqua/50"
                          : "bg-olive-green border-olive-green shadow-lg shadow-olive-green/50"
                      } ${
                        cardVisibility[exp.id] ? "scale-100 opacity-100" : "scale-0 opacity-0"
                      }`}
                    >
                      {exp.current && (
                        <div className="absolute inset-0 rounded-full bg-neon-aqua animate-ping opacity-75"></div>
                      )}
                    </div>
                  </div>

                  {/* Empty space for alignment on desktop */}
                  <div className="w-full lg:w-[calc(50%-2rem)] hidden lg:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 ${
          isVisible ? "animate-fade-in-up delay-700" : "animate-fade-out-down delay-700"
        }`}>
          <button
            className="inline-block px-8 py-4 bg-transparent border-2 border-neon-aqua text-neon-aqua font-orbitron rounded-lg hover:bg-neon-aqua hover:text-dark-bg transition-all duration-300 transform hover:scale-105"
          >
            Let&apos;s Work Together
          </button>
          {/* <a
            href="#contact"
            className="inline-block px-8 py-4 bg-transparent border-2 border-neon-aqua text-neon-aqua rounded-lg hover:bg-neon-aqua hover:text-dark-bg transition-all duration-300 transform hover:scale-105"
          >
            Let&apos;s Work Together
          </a> */}
        </div>
      </div>
    </section>
  );
};

export default Experience;
