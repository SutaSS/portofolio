"use client";
import React, { useEffect, useState } from "react";
import { navigationItems } from "../../data/navigation";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
const [isAnimating, setIsAnimating] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    const heroSection = document.getElementById("home");
    if (heroSection) {
      const heroHeight = heroSection.offsetHeight;
      const scrollPosition = window.scrollY;
      const shouldShow = scrollPosition > heroHeight * 0.6;

      if (shouldShow !== isVisible) {
        setIsAnimating(true);
        setIsVisible(shouldShow);
        setTimeout(() => setIsAnimating(false), 600);
      }
    }
  };
  handleScroll();
  window.addEventListener("scroll", handleScroll);
  
  return () => window.removeEventListener("scroll", handleScroll);
}, [isVisible]);

  return (
    <header
  className={`fixed top-4 left-0 right-0 z-50 flex justify-center px-4 py-4
    ${isVisible 
      ? "animate-fade-in-up" 
      : isAnimating 
        ? "animate-fade-out-down" 
        : "opacity-0 pointer-events-none"
    }
  `}
>
      {/* Desktop Bubble Navbar */}
      <nav
        className="hidden lg:flex items-center gap-2 
        bg-[#1A2A44]/30 border border-white/20 
        backdrop-blur-md rounded-full px-3 py-2 
        shadow-lg group hover:gap-1
        transition-all duration-fast"
      >
        {navigationItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="relative flex items-center gap-0 overflow-hidden rounded-full px-3 py-2 text-[#7FFFD4] hover:bg-[#708D81]/20 transition-all duration-300 group/item"
          >
            {/* Icon */}
            <span className="flex-shrink-0 transition-colors duration-500 group-hover/item:text-[#7FFFD4]">
              {item.icon}
            </span>

            {/* Label - hidden by default, shows on navbar hover */}
            <span className="max-w-0 opacity-0 whitespace-nowrap overflow-hidden text-sm text-[#F5F5F5] group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 transition-all duration-300 group-hover/item:text-[#7FFFD4]">
              {item.label}
            </span>
          </a>
        ))}
      </nav>

      {/* Mobile Navbar */}
      <nav className="lg:hidden w-full max-w-md">
        <div className="flex items-center justify-between bg-[#1A2A44]/30 border-white/20 backdrop-blur-md rounded-full px-4 py-3 shadow-lg">
          <h1 className="text-[#7FFFD4] font-semibold text-sm">Portfolio</h1>

          <button
            className="flex flex-col space-y-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-[#7FFFD4] transition-transform duration-200 ${
                menuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[#7FFFD4] transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[#7FFFD4] transition-transform duration-200 ${
                menuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="mt-2 bg-[#1A2A44] rounded-2xl shadow-lg p-4 space-y-1">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-[#F5F5F5] hover:text-[#7FFFD4] hover:bg-[#708D81]/20 px-3 py-2 rounded-lg transition-all duration-200"
              >
                <span className="flex items-center justify-center w-6 h-6 text-[#7FFFD4]">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
