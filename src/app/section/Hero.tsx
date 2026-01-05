"use client";
import React, {useState, useRef, useEffect} from "react";
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
        threshold: 0.4, // Trigger when 40% of section is visible
        rootMargin: "0px" // Adjust for earlier/later trigger
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "auto" });
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
          className="w-8 h-8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="8"
            r="3"
            stroke="currentColor"
            strokeWidth="1.6"
          />
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
      id: "projects",
      label: "Projects",
      description: "View my work",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8"
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
          className="w-8 h-8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="3"
            y="3"
            width="18"
            height="6"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <rect
            x="3"
            y="15"
            width="18"
            height="6"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M7 9v6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
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
          className="w-8 h-8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="3"
            y="7"
            width="18"
            height="12"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.6"
          />
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
      id: "achievements",
      label: "Achievements",
      description: "My milestones",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2l2.6 5.6L20 9l-4 3.6L17.2 20 12 16.9 6.8 20 8 12.6 4 9l5.4-1.4L12 2z"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="transparent"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen bg-gradient-to-b from-navy-blue via-navy-blue to-dark-bg relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className={`absolute inset-0 overflow-hidden transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-20 left-10 w-72 h-72 bg-neon-aqua/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-olive-green/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-8 min-h-screen flex flex-col justify-center items-center py-20">
        {/* Main Content */}
        <div className={`w-full max-w-6xl transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Top Section: Photo + Name */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mb-16">
            {/* Profile Photo with TiltedCard */}
            <div className={`flex-shrink-0 ${isVisible ? 'animate-fade-in delay-100 ' : 'animate-fade-out delay-100'}`}>
              <div className="relative">
                {/* Glowing border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-olive-green to-neon-aqua rounded-full blur-2xl opacity-30 animate-pulse"></div>

                <TiltedCard
                  imageSrc="/assets/Hero-1.jpg"
                  altText="Andika Saktidana Hernadi"
                  captionText="its me!"
                  containerHeight="300px"
                  containerWidth="300px"
                  imageHeight="300px"
                  imageWidth="300px"
                  scaleOnHover={1.08}
                  rotateAmplitude={15}
                  showMobileWarning={false}
                  showTooltip={true}
                />

                {/* Floating decorative elements */}
                <div className="absolute -top-3 -left-3 w-6 h-6 bg-olive-green rounded-full animate-bounce"></div>
                <div className="absolute -bottom-3 -right-3 w-5 h-5 bg-neon-aqua rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Name & Title */}
            <div className="text-center lg:text-left space-y-6 flex-1">
              <h1 className={`font-orbitron font-bold text-4xl md:text-5xl lg:text-6xl ${isVisible ? 'animate-fade-in-up' : 'animate-fade-out-down'}`}>
                <span className="text-neon-aqua">Andika Saktidana Hernadi</span>
              </h1>

              <div className={`relative ${isVisible ? 'animate-fade-in-up delay-200' : 'animate-fade-out-down delay-200'}`}>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-orbitron font-semibold text-soft-white italic">
                  Fullstack Developer + UI/UX Designer
                </h2>
              </div>

              <p className={`text-olive-green text-lg md:text-xl font-inter ${isVisible ? 'animate-fade-in-up delay-300' : 'animate-fade-out-down delay-300'}`}>
                Recreational endurance and strength training
              </p>

              {/* Download CV Button + Social Links */}
              <div className={`flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 ${isVisible ? 'animate-fade-in-up delay-400' : 'animate-fade-out-down delay-400'}`}>
                {/* Download CV Button */}
                <button
                  onClick={handleDownloadCV}
                  className="group relative px-6 py-3 bg-gradient-to-r from-neon-aqua to-soft-white rounded-full font-orbitron font-semibold text-navy-blue hover:shadow-lg hover:shadow-neon-aqua/50 hover:cursor-pointer transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  <FaDownload className="group-hover:animate-bounce" />
                  Download CV
                </button>

                {/* Divider */}
                <div className="hidden sm:block w-px h-8 bg-olive-green/30"></div>

                {/* Social Links */}
                <div className="flex gap-3">
                  <a
                    href="https://github.com/SutaSS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border-2 border-olive-green/30 flex items-center justify-center text-olive-green hover:border-neon-aqua hover:text-neon-aqua hover:scale-110 transition-all duration-300"
                    aria-label="GitHub"
                  >
                    <FaGithub size={18} />
                  </a>
                  <a
                    href="https://linkedin.com/in/andika-hernadi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border-2 border-olive-green/30 flex items-center justify-center text-olive-green hover:border-neon-aqua hover:text-neon-aqua hover:scale-110 transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin size={18} />
                  </a>
                  <a
                    href="https://instagram.com/andikahernadi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border-2 border-olive-green/30 flex items-center justify-center text-olive-green hover:border-neon-aqua hover:text-neon-aqua hover:scale-110 transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <FaInstagram size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Menu - Updated with SVG icons */}
          <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ${isVisible ? 'animate-fade-in-down delay-500' : 'animate-fade-out-up delay-500'}`}>
            {quickMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="group relative bg-navy-blue/50 border-2 border-olive-green/20 rounded-xl p-6 hover:border-neon-aqua/50 transition-all duration-300 hover:scale-105 hover:add-shadow-lg hover:cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-neon-aqua/0 to-neon-aqua/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative text-center space-y-2">
                  <div className="text-neon-aqua flex justify-center">
                    {item.icon}
                  </div>
                  <h3 className="font-orbitron font-semibold text-neon-aqua text-sm">
                    {item.label}
                  </h3>
                  <p className="text-olive-green/80 text-xs">
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
