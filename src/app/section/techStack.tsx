"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt, FaCode } from "react-icons/fa";
import { projects, } from "../data/projects";
import { projectCategories, } from "../data/ProjectCategories";

const TechStack = () => {

  return (
    <section
      id="tech-stack"
      className="min-h-screen bg-dark-bg relative overflow-visible pt-24 lg:pt-0"
    >
      <div className="absolute inset-0 bg-gradient-to-br to-dark-bg"></div>
      <div className="relative z-10 min-h-screen container mx-auto px-8 justify-center flex flex-col py-20">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-neon-aqua text-4xl lg:text-5xl font-bold mb-8">
            Skills
          </h2>

        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
        </div>
      </div>
    </section>
  );
};

export default TechStack;