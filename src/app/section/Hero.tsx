"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaDownload } from "react-icons/fa";
import TiltedCard from "../components/animations/TiltedCard";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: "0px",
      },
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/cv/CV_Andika Saktidana Hernadi.pdf";
    link.download = "CV_Andika Saktidana Hernadi.pdf";
    link.click();
  };

  const quickMenuItems = [
    {
      id: "about",
      label: "About",
      description: "Get to know me",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 text-coral"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M6 20c1.5-3 4.5-5 6-5s4.5 2 6 5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "experience",
      label: "Experience",
      description: "Work history",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 text-coral"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="3" y="7" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "projects",
      label: "Projects",
      description: "View my work",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 text-coral"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 7h16M4 12h16M4 17h16"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "tech-stack",
      label: "Tech Stack",
      description: "My skills",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 text-coral"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="3" y="3" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
          <rect x="3" y="15" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7 9v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "contact",
      label: "Contact",
      description: "Get in touch",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 text-coral"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M3 8l9 6 9-6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen bg-soft-stone/40 bg-grid-pattern text-ink relative overflow-hidden pt-24 pb-32 lg:pb-48 border-b border-border-light z-0"
    >
      <div className="relative z-10 container mx-auto px-6 lg:px-12 min-h-[calc(100vh-6rem)] flex flex-col justify-center items-center py-12">
        <div
          className={`w-full max-w-7xl transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Top Section: Title & Photo */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
            {/* Name & Title (Left 7 cols) */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-8">
              <h1
                className={`hero-display text-primary ${isVisible ? "animate-fade-in-up" : "animate-fade-out-down"}`}
              >
                Andika Saktidana Hernadi
              </h1>

              <div
                className={`relative ${isVisible ? "animate-fade-in-up delay-200" : "animate-fade-out-down delay-200"}`}
              >
                <h2 className="section-heading text-ink">
                  Fullstack Software Engineer & UI/UX Designer
                </h2>
              </div>

              <p
                className={`body-large text-body-muted max-w-xl ${isVisible ? "animate-fade-in-up delay-300" : "animate-fade-out-down delay-300"}`}
              >
                Crafting clean architecture web and mobile applications with enterprise precision, fueled by a passion for recreational endurance and strength training.
              </p>

              {/* Download CV Button + Social Links */}
              <div
                className={`flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 ${isVisible ? "animate-fade-in-up delay-400" : "animate-fade-out-down delay-400"}`}
              >
                {/* Download CV Button */}
                <button
                  onClick={handleDownloadCV}
                  className="btn-shiny px-8 py-4 bg-primary text-on-primary rounded-full font-inter font-medium text-sm tracking-wide shadow-lg hover:bg-ink hover:cursor-pointer transition-all duration-300 flex items-center gap-3 group"
                >
                  <FaDownload className="group-hover:translate-y-0.5 transition-transform" />
                  Download CV
                </button>

                {/* Divider */}
                <div className="hidden sm:block w-px h-8 bg-hairline"></div>

                {/* Social Links */}
                <div className="flex gap-4">
                  <a
                    href="https://github.com/SutaSS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full border border-hairline flex items-center justify-center text-ink hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
                    aria-label="GitHub"
                  >
                    <FaGithub size={20} />
                  </a>
                  <a
                    href="https://linkedin.com/in/andika-hernadi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full border border-hairline flex items-center justify-center text-ink hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin size={20} />
                  </a>
                  <a
                    href="https://instagram.com/andikahernadi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full border border-hairline flex items-center justify-center text-ink hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <FaInstagram size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Profile Photo (Right 5 cols) */}
            <div
              className={`lg:col-span-5 flex justify-center ${isVisible ? "animate-fade-in delay-200" : "animate-fade-out delay-200"}`}
            >
              <div className="relative card-vibrate bg-soft-stone p-4 rounded-[28px] border border-card-border shadow-sm">
                <TiltedCard
                  imageSrc="/assets/Hero-1.jpg"
                  altText="Andika Saktidana Hernadi"
                  captionText="Hello! I'm Andika."
                  containerHeight="360px"
                  containerWidth="360px"
                  imageHeight="360px"
                  imageWidth="360px"
                  scaleOnHover={1.04}
                  rotateAmplitude={10}
                  showMobileWarning={false}
                  showTooltip={true}
                />
              </div>
            </div>
          </div>

          {/* Quick Menu */}
          <div
            className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ${isVisible ? "animate-fade-in-down delay-500" : "animate-fade-out-up delay-500"}`}
          >
            {quickMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`card-vibrate group relative bg-soft-stone border border-card-border rounded-2xl p-6 text-left hover:border-coral transition-all duration-300 hover:shadow-md hover:cursor-pointer flex flex-col justify-between h-full ${
                  item.id === "contact" ? "col-span-2 md:col-span-1" : "col-span-1"
                }`}
              >
                <div className="mb-4 text-primary group-hover:text-coral transition-colors duration-300">
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="mono-label text-primary group-hover:text-coral transition-colors duration-300">
                    {item.label}
                  </h3>
                  <p className="micro text-body-muted">
                    {item.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
