"use client";
import React, { useEffect, useState, useRef } from "react";
import { navigationItems } from "../../data/navigation";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Draggable bubble states
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const bubbleRef = useRef<HTMLDivElement>(null);

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

  // Lock body scroll when mobile menu is open to avoid layout shift
  useEffect(() => {
    if (menuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.dataset.prevOverflow = originalOverflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = document.body.dataset.prevOverflow || "";
        delete document.body.dataset.prevOverflow;
      };
    }
  }, [menuOpen]);

  // Draggable handlers for mobile bubble
  const handleTouchStart = (e: React.TouchEvent) => {
    if (menuOpen) return;
    setIsDragging(true);
    const touch = e.touches[0];
    setDragStart({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || menuOpen) return;
    const touch = e.touches[0];
    const newX = touch.clientX - dragStart.x;
    const newY = touch.clientY - dragStart.y;

    // Boundaries
    const maxX = window.innerWidth - 64;
    const maxY = window.innerHeight - 64;

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (menuOpen) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || menuOpen) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    const maxX = window.innerWidth - 64;
    const maxY = window.innerHeight - 64;

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (!isDragging) return;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleNavClick = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Close menu immediately (for mobile) or just perform smooth scroll (desktop)
    if (menuOpen) {
      setMenuOpen(false);
    }

    const targetId = href.replace(/^\/?#/, "");
    const element = document.getElementById(targetId || "home");
    if (element) {
      // Slight timeout so DOM updates (menu close) apply before scroll
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  };

  return (
    <>
      <header
        className={`fixed top-4 left-0 right-0 z-50 flex justify-center px-4 py-4
      ${
        isVisible
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
          bg-[#1A2A44]/40 border border-white/20 
          rounded-full px-3 py-2 
          shadow-lg shadow-[#7FFFD4]/10
          group hover:gap-1
          transition-all duration-300"
          style={{ 
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)'
          }}
        >
          {navigationItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={handleNavClick(item.href)}
              className="relative flex items-center gap-0 overflow-hidden rounded-full px-3 py-2 text-[#7FFFD4] hover:bg-[#708D81]/20 transition-all duration-300 group/item"
            >
              <span className="flex-shrink-0 transition-colors duration-500 group-hover/item:text-[#7FFFD4]">
                {item.icon}
              </span>
              <span className="max-w-0 opacity-0 whitespace-nowrap overflow-hidden text-sm text-[#F5F5F5] group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 transition-all duration-300 group-hover/item:text-[#7FFFD4]">
                {item.label}
              </span>
            </a>
          ))}
        </nav>
      </header>

      {/* Mobile Floating Draggable Bubble */}
      <div className="lg:hidden">
        {/* Blur Background Overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-[#0D1B2A]/80 backdrop-blur-md z-40 animate-fade-in"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* Draggable Bubble Button */}
        <div
          ref={bubbleRef}
          className={`fixed z-50 transition-all duration-200 ${
            isDragging ? "scale-110" : "scale-100"
          } ${menuOpen ? "scale-0 opacity-0" : ""}`}
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            cursor: isDragging ? "grabbing" : "grab",
            touchAction: "none",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isDragging) setMenuOpen(true);
            }}
            className="w-16 h-16 bg-gradient-to-br from-[#1A2A44] to-[#708D81] 
            border-2 border-[#7FFFD4]/30 rounded-full 
            shadow-lg shadow-[#7FFFD4]/20 
            flex items-center justify-center
            hover:shadow-xl hover:shadow-[#7FFFD4]/40
            active:scale-95
            transition-all duration-300"
            aria-label="Open menu"
          >
            {/* Burger Icon */}
            <div className="flex flex-col space-y-1.5">
              <span className="w-5 h-0.5 bg-[#7FFFD4] rounded-full" />
              <span className="w-5 h-0.5 bg-[#7FFFD4] rounded-full" />
              <span className="w-5 h-0.5 bg-[#7FFFD4] rounded-full" />
            </div>
          </button>
        </div>

        {/* Popup Menu with Blur Background */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            {/* Close Button Bubble */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 
              bg-gradient-to-br from-[#1A2A44] to-[#708D81] 
              border-2 border-[#7FFFD4]/30 rounded-full 
              shadow-lg shadow-[#7FFFD4]/20
              flex items-center justify-center
              hover:shadow-xl hover:shadow-[#7FFFD4]/40
              active:scale-95
              transition-all duration-300 animate-fade-in-down"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6 text-[#7FFFD4]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-sm w-full animate-fade-in-up delay-100">
              {navigationItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={handleNavClick(item.href)}
                  className={`group relative flex flex-col items-center justify-center gap-3 
                  bg-gradient-to-br from-[#1A2A44] to-[#708D81] 
                  border-2 border-[#7FFFD4]/20 rounded-3xl 
                  p-6 min-h-[120px]
                  shadow-lg shadow-[#7FFFD4]/10
                  hover:shadow-xl hover:shadow-[#7FFFD4]/30
                  hover:border-[#7FFFD4]/50
                  active:scale-95
                  transition-all duration-300 animate-fade-in-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Icon Bubble */}
                  <div
                    className="w-12 h-12 bg-[#7FFFD4]/10 rounded-full 
                    flex items-center justify-center
                    group-hover:bg-[#7FFFD4]/20
                    group-hover:scale-110
                    transition-all duration-300"
                  >
                    <span className="text-[#7FFFD4] text-2xl">{item.icon}</span>
                  </div>

                  {/* Label */}
                  <span
                    className="text-[#F5F5F5] text-sm font-medium 
                    group-hover:text-[#7FFFD4] transition-colors duration-300"
                  >
                    {item.label}
                  </span>

                  {/* Glow Effect on Hover */}
                  <div
                    className="absolute inset-0 rounded-3xl bg-[#7FFFD4]/0 
                    group-hover:bg-[#7FFFD4]/5 transition-all duration-300"
                  />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
