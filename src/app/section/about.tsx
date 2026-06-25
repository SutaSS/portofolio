"use client";
import React, { useEffect, useRef, useLayoutEffect } from "react";
import { FaLaptopCode, FaRunning, FaSearch, FaUserGraduate, FaHeart, FaChartLine, FaCheck } from "react-icons/fa";
import TiltedCard from "../components/animations/TiltedCard";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const About = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [dimensions, setDimensions] = React.useState({
    containerHeight: "400px",
    containerWidth: "300px",
    imageHeight: "400px",
    imageWidth: "300px",
  });

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        gsap.from(".about-anim", {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (window.innerWidth >= 1024) {
        setDimensions({
          containerHeight: "420px",
          containerWidth: "380px",
          imageHeight: "420px",
          imageWidth: "380px",
        });
      } else {
        setDimensions({
          containerHeight: "340px",
          containerWidth: "280px",
          imageHeight: "340px",
          imageWidth: "280px",
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-fit bg-canvas bg-grid-pattern text-ink relative z-10 overflow-hidden pt-24 pb-24 border-t border-border-light"
    >
      <div className="relative z-10 container mx-auto px-6 lg:px-12 max-w-7xl justify-center flex flex-col">
        {/* Title */}
        <div className="text-center mb-16 about-anim">
          <h2 className="text-[3.5rem] lg:text-[5rem] font-black tracking-tight text-shiny-dark mb-4">
            About Me
          </h2>
          <p className="body-large text-body-muted max-w-2xl mx-auto">
            A tale of two passions: Engineering robust digital products and pursuing physical mastery through recreational sports.
          </p>
        </div>

        {/* 2 Pillars Layout */}
        <div className="grid lg:grid-cols-2 gap-10 items-stretch w-full mb-20 about-anim">
          {/* Pillar 1: The Software Engineer */}
          <div className="card-vibrate bg-soft-stone border border-card-border rounded-3xl p-8 lg:p-12 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center mb-8 shadow-md">
                <FaLaptopCode className="text-2xl text-coral" />
              </div>
              <h3 className="card-heading text-primary mb-4">
                The Software Engineer
              </h3>
              <p className="body text-body-muted leading-relaxed mb-8">
                I specialize in crafting high-performance web and mobile applications adhering to clean architecture principles. With deep expertise in React, Next.js, Flutter, and backend systems, I build software that is both highly scalable and aesthetically uncompromising.
              </p>
            </div>

            {/* Key Focuses */}
            <div className="space-y-3 pt-6 border-t border-hairline">
              <div className="flex items-center gap-3">
                <FaCheck className="text-coral flex-shrink-0" />
                <span className="body text-ink font-medium">Clean Architecture & Scalable Systems</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheck className="text-coral flex-shrink-0" />
                <span className="body text-ink font-medium">Fullstack Engineering (Next.js, Laravel, Jetpack Compose)</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheck className="text-coral flex-shrink-0" />
                <span className="body text-ink font-medium">UI/UX Excellence</span>
              </div>
            </div>
          </div>

          {/* Pillar 2: The Recreational Sports Enjoyer */}
          <div className="card-vibrate bg-deep-green text-on-dark rounded-3xl p-8 lg:p-12 flex flex-col justify-between shadow-md">
            <div>
              <div className="w-14 h-14 bg-white text-deep-green rounded-2xl flex items-center justify-center mb-8 shadow-md">
                <FaRunning className="text-2xl text-coral" />
              </div>
              <h3 className="card-heading text-white mb-4">
                Recreational Sports Enjoyer
              </h3>
              <p className="body text-white/80 leading-relaxed mb-8">
                Outside the editor, I am dedicated to endurance training and running. My personal fitness journey took me from 94 kg down to 68 kg—a profound physical and mental transformation that instilled in me an unwavering appreciation for discipline, consistency, and daily incremental progress.
              </p>
            </div>

            {/* Key Accomplishments */}
            <div className="space-y-3 pt-6 border-t border-white/20">
              <div className="flex items-center gap-3">
                <FaCheck className="text-coral flex-shrink-0" />
                <span className="body text-white font-medium">94 kg to 68 kg Fitness Transformation</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheck className="text-coral flex-shrink-0" />
                <span className="body text-white font-medium">Endurance Running & Marathon Training</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheck className="text-coral flex-shrink-0" />
                <span className="body text-white font-medium">Unshakable Discipline & Daily Consistency</span>
              </div>
            </div>
          </div>
        </div>

        {/* Character & Photo Section */}
        <div className="grid lg:grid-cols-12 gap-12 items-center w-full about-anim">
          {/* Left - Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative card-vibrate bg-soft-stone p-4 rounded-[28px] border border-card-border shadow-sm">
              <TiltedCard
                imageSrc="/assets/Run-1.jpg"
                altText="Andika Running"
                captionText="I really love running!"
                containerHeight={dimensions.containerHeight}
                containerWidth={dimensions.containerWidth}
                imageHeight={dimensions.imageHeight}
                imageWidth={dimensions.imageWidth}
                scaleOnHover={1.05}
                rotateAmplitude={12}
                showMobileWarning={false}
                showTooltip={true}
              />
            </div>
          </div>

          {/* Right - Character Traits */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <h4 className="mono-label text-coral">Core Principles</h4>
              <h3 className="section-heading text-primary">
                My Character Traits
              </h3>
              <p className="body text-body-muted">
                How I approach engineering, teamwork, and personal self-improvement every single day.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Curious */}
              <div className="card-vibrate bg-soft-stone border border-card-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                    <FaSearch className="text-coral text-lg" />
                  </div>
                  <div>
                    <h5 className="mono-label text-primary mb-1">
                      Curious
                    </h5>
                    <p className="micro text-body-muted leading-relaxed">
                      Always exploring new paradigms and cutting-edge technologies.
                    </p>
                  </div>
                </div>
              </div>

              {/* Disciplined */}
              <div className="card-vibrate bg-soft-stone border border-card-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                    <FaUserGraduate className="text-coral text-lg" />
                  </div>
                  <div>
                    <h5 className="mono-label text-primary mb-1">
                      Disciplined
                    </h5>
                    <p className="micro text-body-muted leading-relaxed">
                      Executing consistently regardless of immediate motivation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Humble */}
              <div className="card-vibrate bg-soft-stone border border-card-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                    <FaHeart className="text-coral text-lg" />
                  </div>
                  <div>
                    <h5 className="mono-label text-primary mb-1">
                      Humble
                    </h5>
                    <p className="micro text-body-muted leading-relaxed">
                      Eager for feedback, unattached to ego, and dedicated to collective success.
                    </p>
                  </div>
                </div>
              </div>

              {/* Growth-oriented */}
              <div className="card-vibrate bg-soft-stone border border-card-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                    <FaChartLine className="text-coral text-lg" />
                  </div>
                  <div>
                    <h5 className="mono-label text-primary mb-1">
                      Growth-oriented
                    </h5>
                    <p className="micro text-body-muted leading-relaxed">
                      Constantly striving to improve metrics, code quality, and physical benchmarks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
