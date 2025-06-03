"use client";
import React, { useState } from "react";
import GooeyNav from "../reactBits/GooeyNav/GooeyNav";

const items = [
  { label: "About", href: "#about me" },
  { label: "Tech Stack", href: "#tech stack" },
  { label: "Project", href: "#project" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white sticky top-0 p-4 z-50 shadow-lg">
      <nav className="relative w-full flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold">
          AndikaHernadi | Software Developer
        </h1>

        {/* Desktop Nav */}
        <div className="hidden lg:block" style={{ height: "30px", position: "relative" }}>
          <GooeyNav
            items={items}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            initialActiveIndex={0}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="lg:hidden flex flex-col space-y-1 z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="w-6 h-0.5 bg-white" />
          <span className="w-6 h-0.5 bg-white" />
          <span className="w-6 h-0.5 bg-white" />
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="lg:hidden mt-4 bg-gray-700 rounded-lg shadow-lg p-4 space-y-2">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block text-white hover:text-gray-300"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
