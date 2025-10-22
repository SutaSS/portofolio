"use client";
import React, { useState } from "react";

const items = [
  {
    label: "Home",
    href: "#home",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 11.5L12 4l9 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 21V12.5h14V21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "About",
    href: "#about",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M6 20c1.5-3 4.5-5 6-5s4.5 2 6 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Tech Stack",
    href: "#tech-stack",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
        <rect x="3" y="15" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M7 9v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Project",
    href: "#project",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Experience",
    href: "#experience",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="7" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Achievement",
    href: "#achievement",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2l2.6 5.6L20 9l-4 3.6L17.2 20 12 16.9 6.8 20 8 12.6 4 9l5.4-1.4L12 2z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" fill="transparent"/>
      </svg>
    ),
  },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      {/* Desktop Bubble Navbar */}
      <nav className="hidden lg:flex items-center gap-2 
  bg-[#1A2A44]/30 border border-white/20 
  backdrop-blur-md rounded-full px-3 py-2 
  shadow-lg group hover:gap-1 
  transition-all duration-300">

        {items.map((item, index) => (
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
        <div className="flex items-center justify-between bg-[#1A2A44] rounded-full px-4 py-3 shadow-lg">
          <h1 className="text-[#7FFFD4] font-semibold text-sm">Portfolio</h1>
          
          <button
            className="flex flex-col space-y-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-[#7FFFD4] transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`w-6 h-0.5 bg-[#7FFFD4] transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-[#7FFFD4] transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="mt-2 bg-[#1A2A44] rounded-2xl shadow-lg p-4 space-y-1">
            {items.map((item) => (
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