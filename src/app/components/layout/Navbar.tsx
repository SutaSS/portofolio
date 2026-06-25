"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { navigationItems } from "../../data/navigation";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Use refs for drag position to avoid re-render lag on every mousemove
  const bubbleRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 20, y: 20 });
  const rafRef = useRef<number | null>(null);

  // Apply position directly to DOM — no React state needed for smooth drag
  const applyPosition = useCallback((x: number, y: number) => {
    if (!bubbleRef.current) return;
    const maxX = window.innerWidth - 72;
    const maxY = window.innerHeight - 72;
    const clampedX = Math.max(0, Math.min(x, maxX));
    const clampedY = Math.max(0, Math.min(y, maxY));
    posRef.current = { x: clampedX, y: clampedY };
    bubbleRef.current.style.transform = `translate(${clampedX}px, ${clampedY}px)`;
  }, []);

  useEffect(() => {
    // Set initial position via DOM
    applyPosition(posRef.current.x, posRef.current.y);
  }, [applyPosition]);

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

  // Lock body scroll when mobile menu is open
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

  // --- Touch drag handlers ---
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (menuOpen) return;
    isDraggingRef.current = true;
    const touch = e.touches[0];
    dragStartRef.current = {
      x: touch.clientX - posRef.current.x,
      y: touch.clientY - posRef.current.y,
    };
  }, [menuOpen]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDraggingRef.current || menuOpen) return;
    e.preventDefault();
    const touch = e.touches[0];
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      applyPosition(
        touch.clientX - dragStartRef.current.x,
        touch.clientY - dragStartRef.current.y
      );
    });
  }, [menuOpen, applyPosition]);

  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  // --- Mouse drag handlers ---
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (menuOpen) return;
    e.preventDefault();
    isDraggingRef.current = true;
    if (bubbleRef.current) bubbleRef.current.style.cursor = "grabbing";
    dragStartRef.current = {
      x: e.clientX - posRef.current.x,
      y: e.clientY - posRef.current.y,
    };
  }, [menuOpen]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        applyPosition(
          e.clientX - dragStartRef.current.x,
          e.clientY - dragStartRef.current.y
        );
      });
    };

    const onMouseUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      if (bubbleRef.current) bubbleRef.current.style.cursor = "grab";
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [applyPosition]);

  const handleNavClick = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (menuOpen) setMenuOpen(false);
    const targetId = href.replace(/^\/?#/, "");
    const element = document.getElementById(targetId || "home");
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "instant" });
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
          bg-primary/90 backdrop-blur-xl border border-white/20 
          rounded-full px-3 py-2 
          shadow-lg shadow-black/20
          group hover:gap-1
          transition-all duration-300"
        >
          {navigationItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={handleNavClick(item.href)}
              className="btn-shiny relative flex items-center gap-0 overflow-hidden rounded-full px-4 py-2.5 text-coral hover:bg-white/10 transition-all duration-300 group/item"
            >
              <span className="flex-shrink-0 transition-colors duration-500 group-hover/item:text-coral">
                {item.icon}
              </span>
              <span className="mono-label max-w-0 opacity-0 whitespace-nowrap overflow-hidden text-xs text-white group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 transition-all duration-300 group-hover/item:text-coral">
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
            className="fixed inset-0 bg-primary/60 backdrop-blur-lg z-40 animate-fade-in"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* Draggable Bubble Button — uses transform for GPU-accelerated, jank-free motion */}
        <div
          ref={bubbleRef}
          className={`fixed z-50 top-0 left-0 will-change-transform ${
            menuOpen ? "scale-0 opacity-0 pointer-events-none" : ""
          }`}
          style={{
            cursor: "grab",
            touchAction: "none",
            transition: menuOpen ? "opacity 0.2s, transform 0.2s" : "none",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isDraggingRef.current) setMenuOpen(true);
            }}
            className="btn-shiny w-16 h-16 bg-primary/90 backdrop-blur-md
            border-2 border-coral/30 rounded-full 
            shadow-lg shadow-black/20 
            flex items-center justify-center
            hover:shadow-xl hover:shadow-coral/40
            active:scale-95
            transition-shadow duration-300"
            aria-label="Open menu"
          >
            {/* Burger Icon */}
            <div className="flex flex-col space-y-1.5">
              <span className="w-5 h-0.5 bg-coral rounded-full" />
              <span className="w-5 h-0.5 bg-coral rounded-full" />
              <span className="w-5 h-0.5 bg-coral rounded-full" />
            </div>
          </button>
        </div>

        {/* Popup Menu with Blur Background */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            {/* Close Button Bubble */}
            <button
              onClick={() => setMenuOpen(false)}
              className="btn-shiny absolute top-6 right-6 w-12 h-12 
              bg-primary/90 backdrop-blur-md
              border-2 border-coral/30 rounded-full 
              shadow-lg shadow-black/20
              flex items-center justify-center
              hover:shadow-xl hover:shadow-coral/40
              active:scale-95
              transition-all duration-300 animate-fade-in-down"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6 text-coral"
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
                  className={`btn-shiny group relative flex flex-col items-center justify-center gap-3 
                  bg-primary/90 backdrop-blur-md
                  border-2 border-coral/20 rounded-3xl 
                  p-6 min-h-[120px]
                  shadow-lg shadow-black/10
                  hover:shadow-xl hover:shadow-coral/30
                  hover:border-coral/50
                  active:scale-95
                  transition-all duration-300 animate-fade-in-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Icon Bubble */}
                  <div
                    className="w-12 h-12 bg-coral/10 rounded-full 
                    flex items-center justify-center
                    group-hover:bg-coral/20
                    group-hover:scale-110
                    transition-all duration-300"
                  >
                    <span className="text-coral text-2xl">{item.icon}</span>
                  </div>

                  {/* Label */}
                  <span
                    className="mono-label text-white text-sm font-medium 
                    group-hover:text-coral transition-colors duration-300"
                  >
                    {item.label}
                  </span>
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
