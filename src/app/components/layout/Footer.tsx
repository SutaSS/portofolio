"use client";
import React from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-primary text-on-dark py-16 border-t border-white/10">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
          {/* Brand Info & Newsletter (Left 7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block px-3 py-1 bg-coral/10 border border-coral/20 rounded-full text-coral mono-label text-xs font-bold">
              AI Moves Fast
            </div>
            <h2 className="card-heading text-white max-w-lg">
              Stay ahead with enterprise clean architecture insights.
            </h2>
            <p className="body text-white/70 max-w-md leading-relaxed">
              Subscribe to my newsletter for deep-dives into Next.js, Flutter scalability, and recreational endurance benchmarks.
            </p>

            {/* Subscription Field */}
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-md bg-white/5 border border-white/20 rounded-full p-2 focus-within:border-coral transition-colors">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-transparent px-4 py-2 text-white placeholder-white/50 focus:outline-none body text-sm"
              />
              <button
                type="submit"
                className="btn-shiny w-10 h-10 bg-coral text-primary rounded-full flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300 flex-shrink-0 hover:cursor-pointer"
                aria-label="Subscribe"
              >
                <FaArrowRight size={14} />
              </button>
            </form>
            <p className="micro text-white/50">
              By subscribing, you agree to receive occasional high-value architectural updates. No spam, ever.
            </p>
          </div>

          {/* Quick Links & Social (Right 5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="mono-label text-white font-bold">Navigation</h4>
              <ul className="space-y-3 body text-sm text-white/70">
                <li><Link href="/#home" className="hover:text-coral transition-colors">Hero</Link></li>
                <li><Link href="/#about" className="hover:text-coral transition-colors">About</Link></li>
                <li><Link href="/#experience" className="hover:text-coral transition-colors">Experience</Link></li>
                <li><Link href="/#projects" className="hover:text-coral transition-colors">Projects</Link></li>
                <li><Link href="/#tech-stack" className="hover:text-coral transition-colors">Tech Stack</Link></li>
                <li><Link href="/#contact" className="hover:text-coral transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="mono-label text-white font-bold">Connect</h4>
              <ul className="space-y-3 body text-sm text-white/70">
                <li>
                  <a href="https://linkedin.com/in/andika-hernadi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-coral transition-colors">
                    <FaLinkedin size={16} /> LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://github.com/SutaSS" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-coral transition-colors">
                    <FaGithub size={16} /> GitHub
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/andikahernadi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-coral transition-colors">
                    <FaInstagram size={16} /> Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-white/50 micro">
          <p>&copy; {new Date().getFullYear()} Andika Saktidana Hernadi. All rights reserved.</p>
          <p>Engineered with Next.js, Tailwind CSS, & GSAP.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
