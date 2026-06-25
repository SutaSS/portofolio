"use client";
import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-primary text-on-dark py-16 border-t border-white/10">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start">
          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="mono-label text-white font-bold text-lg">Navigation</h4>
            <ul className="space-y-3 body text-sm text-white/70">
              <li><Link href="/#home" className="hover:text-coral transition-colors">Hero</Link></li>
              <li><Link href="/#about" className="hover:text-coral transition-colors">About</Link></li>
              <li><Link href="/#experience" className="hover:text-coral transition-colors">Experience</Link></li>
              <li><Link href="/#projects" className="hover:text-coral transition-colors">Projects</Link></li>
              <li><Link href="/#tech-stack" className="hover:text-coral transition-colors">Tech Stack</Link></li>
              <li><Link href="/#contact" className="hover:text-coral transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Connect Links */}
          <div className="space-y-4">
            <h4 className="mono-label text-white font-bold text-lg">Connect</h4>
            <ul className="space-y-3 body text-sm text-white/70">
              <li>
                <a href="https://linkedin.com/in/andika-hernadi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-coral transition-colors">
                  <FaLinkedin size={18} /> LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com/SutaSS" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-coral transition-colors">
                  <FaGithub size={18} /> GitHub
                </a>
              </li>
              <li>
                <a href="https://instagram.com/andikahernadi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-coral transition-colors">
                  <FaInstagram size={18} /> Instagram
                </a>
              </li>
            </ul>
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
