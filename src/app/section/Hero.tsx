"use client";
import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import Image from "next/image";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen bg-navy-blue relative overflow-visible pt-24 lg:pt-0"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-blue/50 to-dark-bg"></div>

      <div className="relative z-10 container mx-auto px-8 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Main Name */}
            <h1 className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold">
              <span className="text-neon-aqua">Andika</span>{" "}
              <span className="text-neon-aqua">Saktidana</span>{" "}
              <span className="text-neon-aqua">Hernadi</span>
            </h1>

            {/* Subtitle with border */}
            <div className="border-l-4 border-neon-aqua pl-4">
              <h2 className="font-orbitron text-lg md:text-xl text-olive-green font-orbitron">
                Front-End & Mobile Developer + UI/UX Designer
              </h2>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button className="bg-neon-aqua text-dark-bg font-orbitron font-semibold px-6 py-3 rounded-lg hover:bg-neon-aqua/90 transition-all duration-300 transform hover:scale-105 hover:cursor-pointer">
                View My Work<span className="ml-2">🚀</span>
              </button>
              <button className="border-2 border-olive-green text-olive-green font-orbitron font-semibold px-6 py-3 rounded-lg hover:bg-olive-green hover:text-dark-bg transition-all duration-300 hover:cursor-pointer">
                Download CV<span className="ml-2">📄</span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex gap-6 pt-6">
              <a
                href="https://github.com/SutaSS"
                className="text-olive-green hover:text-neon-aqua transition-colors duration-300"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://linkedin.com/in/andika-hernadi"
                className="text-olive-green hover:text-neon-aqua transition-colors duration-300"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://instagram.com/andikahernadi"
                className="text-olive-green hover:text-neon-aqua transition-colors duration-300"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glowing border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-neon-aqua to-olive-green rounded-2xl blur-lg opacity-50 animate-pulse"></div>

              {/* Profile image container */}
              <div className="relative bg-navy-blue p-1 rounded-2xl">
                <div className="w-80 h-96 md:w-96 md:h-[385px] bg-gradient-to-br from-navy-blue to-dark-bg rounded-xl flex items-center justify-center">
                  {/* Placeholder - ganti dengan foto Anda */}
                  <div className="w-full h-full bg-gradient-to-br from-olive-green/20 to-neon-aqua/20 rounded-xl flex items-center justify-center">
                    <Image
                      src="/assets/Hero-1.jpg"
                      alt="Profile Photo"
                      width={400}
                      height={450}
                      className="rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-neon-aqua rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-olive-green rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;