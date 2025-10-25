import React from "react";
import { FaSearch, FaUserGraduate, FaHeart, FaChartLine } from "react-icons/fa";
import Image from "next/image";

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen bg-dark-bg relative overflow-visible pt-24 lg:pt-18"
    >
      <div className="absolute inset-0 bg-dark-bg"></div>
      <div className="relative z-10 min-h-screen container mx-auto px-8 justify-center flex flex-col">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-neon-aqua text-4xl lg:text-5xl font-orbitron font-bold mb-4">
            About Me
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left - Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Glowing border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-olive-green to-neon-aqua rounded-2xl blur-lg opacity-30 animate-pulse"></div>
              
              {/* Image container */}
              <div className="relative bg-navy-blue p-1 rounded-2xl">
                <div className="w-80 h-96 md:w-96 md:h-[450px] rounded-xl overflow-hidden">
                  <Image
                    src="/assets/Run-1.jpg"
                    alt="Andika Saktidana Hernadi"
                    width={384}
                    height={450}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-olive-green rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-neon-aqua rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            
            {/* Main Description */}
            <div className="space-y-4">
              <h3 className="font-orbitron text-2xl font-bold font-orbitron text-neon-aqua">
                Passionate Developer and Designer
              </h3>
              <p className="text-soft-white/80 text-lg font-inter leading-relaxed">
                I&apos;m Andika, a Software Engineer passionate about building web and
                mobile applications with clean architecture and purpose. Beyond
                tech, I&apos;m dedicated to fitness and running, a journey from 94 kg
                to 68 kg that taught me discipline, consistency, and growth.
              </p>
            </div>

            {/* Character Traits */}
            <div className="space-y-4">
              <h4 className="font-orbitron text-xl font-semibold text-neon-aqua">
                Character
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Curious */}
                <div className="bg-navy-blue/50 border border-olive-green/20 rounded-lg p-4 hover:border-neon-aqua/50 transition-colors duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-neon-aqua/10 rounded-lg flex items-center justify-center mt-1">
                      <FaSearch className="text-neon-aqua text-sm" />
                    </div>
                    <div>
                      <h5 className="font-orbitron font-semibold text-neon-aqua text-sm mb-1">Curious</h5>
                      <p className="text-olive-green text-xs leading-relaxed">
                        Always learning new technologies
                      </p>
                    </div>
                  </div>
                </div>

                {/* Disciplined */}
                <div className="bg-navy-blue/50 border border-olive-green/20 rounded-lg p-4 hover:border-neon-aqua/50 transition-colors duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-neon-aqua/10 rounded-lg flex items-center justify-center mt-1">
                      <FaUserGraduate className="text-neon-aqua text-sm" />
                    </div>
                    <div>
                      <h5 className="font-orbitron font-semibold text-neon-aqua text-sm mb-1">Disciplined</h5>
                      <p className="text-olive-green text-xs leading-relaxed">
                        Consistent in work and habits
                      </p>
                    </div>
                  </div>
                </div>

                {/* Humble */}
                <div className="bg-navy-blue/50 border border-olive-green/20 rounded-lg p-4 hover:border-neon-aqua/50 transition-colors duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-olive-green/10 rounded-lg flex items-center justify-center mt-1">
                      <FaHeart className="text-neon-aqua text-sm" />
                    </div>
                    <div>
                      <h5 className="font-orbitron font-semibold text-neon-aqua text-sm mb-1">Humble</h5>
                      <p className="text-olive-green/80 text-xs leading-relaxed">
                        Open to feedback and growth
                      </p>
                    </div>
                  </div>
                </div>

                {/* Growth-oriented */}
                <div className="bg-navy-blue/50 border border-olive-green/20 rounded-lg p-4 hover:border-neon-aqua/50 transition-colors duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-olive-green/10 rounded-lg flex items-center justify-center mt-1">
                      <FaChartLine className="text-neon-aqua text-sm" />
                    </div>
                    <div>
                      <h5 className="font-orbitron font-semibold text-neon-aqua text-sm mb-1">Growth-oriented</h5>
                      <p className="text-olive-green text-xs leading-relaxed">
                        Focused on continuous improvement
                      </p>
                    </div>
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
