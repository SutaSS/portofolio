"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { achievements } from "../data/achievements";
import { FaTrophy, FaMedal, FaAward, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Achievements = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});
  const [isVisible, setIsVisible] = useState(false);
  const [cardVisibility, setCardVisibility] = useState<{[key: string]: boolean}>({});
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: "0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Observer for individual cards
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardId = entry.target.getAttribute('data-card-id');
          if (cardId) {
            setCardVisibility(prev => ({
              ...prev,
              [cardId]: entry.isIntersecting
            }));
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px",
      }
    );

    // Observe all cards
    Object.values(cardRefs.current).forEach((ref) => {
      if (ref) cardObserver.observe(ref);
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      Object.values(cardRefs.current).forEach((ref) => {
        if (ref) cardObserver.unobserve(ref);
      });
    };
  }, []);

  const handleNextImage = (achievementId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [achievementId]: ((prev[achievementId] || 0) + 1) % totalImages
    }));
  };

  const handlePrevImage = (achievementId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [achievementId]: ((prev[achievementId] || 0) - 1 + totalImages) % totalImages
    }));
  };

  const getAwardIcon = (award: string) => {
    if (award.includes('1st') || award.includes('Winner')) return <FaTrophy className="text-yellow-400" />;
    if (award.includes('2nd')) return <FaMedal className="text-gray-300" />;
    if (award.includes('3rd')) return <FaMedal className="text-orange-400" />;
    return <FaAward className="text-neon-aqua" />;
  };

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="min-h-screen bg-dark-bg relative overflow-visible pt-16 lg:pt-0"
    >
      <div className={`relative z-10 min-h-screen container mx-auto px-4 lg:px-8 justify-center flex flex-col py-16 lg:py-24 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}>
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className={`text-neon-aqua text-4xl lg:text-5xl font-orbitron font-bold mb-4 ${
            isVisible ? "animate-fade-in-down" : "animate-fade-out-up"
          }`}>
            Achievements
          </h2>
          
          <p className={`text-olive-green/80 mt-6 text-lg font-inter ${
            isVisible ? "animate-fade-in-up delay-200" : "animate-fade-out-down delay-200"
          }`}>
            Milestones and recognition in my journey
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {achievements.map((achievement) => {
            const currentIndex = currentImageIndex[achievement.id] || 0;
            
            return (
              <div
                key={achievement.id}
                ref={(el) => { cardRefs.current[achievement.id] = el; }}
                data-card-id={achievement.id}
                className={`group bg-navy-blue/50 rounded-2xl overflow-hidden border-2 border-olive-green/20 hover:border-neon-aqua/50 transition-all duration-500 hover:shadow-2xl hover:shadow-neon-aqua/20 transform hover:scale-105 ${
                  cardVisibility[achievement.id]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                {/* Image Carousel */}
                <div className="relative h-64 bg-gradient-to-br from-olive-green/20 to-neon-aqua/20 overflow-hidden">
                  {/* Image */}
                  <Image
                    src={achievement.images[currentIndex]}
                    alt={`${achievement.title} - Image ${currentIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-blue/80 via-transparent to-transparent"></div>

                  {/* Navigation Arrows */}
                  {achievement.images.length > 1 && (
                    <>
                      <button
                        onClick={() => handlePrevImage(achievement.id, achievement.images.length)}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-dark-bg/80 hover:bg-neon-aqua/80 rounded-full flex items-center justify-center text-neon-aqua hover:text-dark-bg transition-all duration-300 opacity-0 group-hover:opacity-100"
                        aria-label="Previous image"
                      >
                        <FaChevronLeft size={20} />
                      </button>
                      <button
                        onClick={() => handleNextImage(achievement.id, achievement.images.length)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-dark-bg/80 hover:bg-neon-aqua/80 rounded-full flex items-center justify-center text-neon-aqua hover:text-dark-bg transition-all duration-300 opacity-0 group-hover:opacity-100"
                        aria-label="Next image"
                      >
                        <FaChevronRight size={20} />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  {achievement.images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-dark-bg/80 px-3 py-1 rounded-full text-neon-aqua text-sm font-semibold">
                      {currentIndex + 1} / {achievement.images.length}
                    </div>
                  )}

                  {/* Award Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-dark-bg/80 px-4 py-2 rounded-full border border-neon-aqua/30">
                    {getAwardIcon(achievement.award)}
                    <span className="text-soft-white font-semibold text-sm">
                      {achievement.award}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Title & Event */}
                  <div>
                    <h3 className="text-2xl font-orbitron font-bold text-neon-aqua mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-olive-green font-inter font-semibold">
                      {achievement.event}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-soft-white/80 text-sm font-inter leading-relaxed">
                    {achievement.description}
                  </p>

                  {/* Date & Category */}
                  <div className="flex items-center justify-between pt-4 border-t border-olive-green/20">
                    <span className="text-olive-green/80 text-sm font-inter">
                      {achievement.date}
                    </span>
                    <span className="px-3 py-1 bg-olive-green/10 text-olive-green text-xs font-inter rounded-full border border-olive-green/20 capitalize">
                      {achievement.category}
                    </span>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="h-1 bg-gradient-to-r from-olive-green to-neon-aqua transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            );
          })}
        </div>

        {/* Stats Summary (Optional) */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16 ${
          isVisible ? "animate-fade-in-up delay-400" : "animate-fade-out-down delay-400"
        }`}>
          <div className="bg-navy-blue/50 rounded-xl p-6 border border-olive-green/20 text-center">
            <div className="text-4xl font-orbitron font-bold text-neon-aqua mb-2">
              {achievements.length}
            </div>
            <div className="text-olive-green/80 text-sm font-inter">
              Total Achievements
            </div>
          </div>
          <div className="bg-navy-blue/50 rounded-xl p-6 border border-olive-green/20 text-center">
            <div className="text-4xl font-orbitron font-bold text-neon-aqua mb-2">
              {achievements.filter(a => a.category === 'hackathon').length}
            </div>
            <div className="text-olive-green/80 text-sm font-inter">
              Hackathons
            </div>
          </div>
          <div className="bg-navy-blue/50 rounded-xl p-6 border border-olive-green/20 text-center">
            <div className="text-4xl font-orbitron font-bold text-neon-aqua mb-2">
              2025
            </div>
            <div className="text-olive-green/80 text-sm font-inter">
              Latest Year
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;