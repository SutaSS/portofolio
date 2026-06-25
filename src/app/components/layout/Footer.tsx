"use client";
import React from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaTrophy, FaRunning, FaLaptopCode } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-primary text-on-dark py-20 border-t border-white/10">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
          {/* Left Side: Achievement Showcase Gallery & Profile (7 cols) */}
          <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl space-y-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              {/* User Photo */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 relative rounded-full overflow-hidden border-2 border-coral shadow-xl flex-shrink-0 bg-soft-stone">
                <Image
                  src="/assets/Hero-1.jpg"
                  alt="Andika Saktidana Hernadi"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="card-heading text-white text-2xl mb-2">Andika Saktidana Hernadi</h3>
                <p className="body text-white/70 leading-relaxed text-sm">
                  Fullstack Engineer & recreational athlete dedicated to continuous improvement and rigorous architectural execution.
                </p>
              </div>
            </div>

            {/* Achievements Showcase Gallery (Displaying images from public/assets/achievements) */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <h4 className="mono-label text-coral text-xs font-bold tracking-wider uppercase">Gallery & Achievements</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-36 sm:h-44 rounded-2xl overflow-hidden border border-white/20 shadow-lg group bg-soft-stone/10">
                  <Image
                    src="/assets/achievements/IFEST-1.jpg"
                    alt="IFEST Achievement 1"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="mono-label text-[10px] text-white font-bold tracking-wide">IFEST Showcase 1</span>
                  </div>
                </div>
                <div className="relative h-36 sm:h-44 rounded-2xl overflow-hidden border border-white/20 shadow-lg group bg-soft-stone/10">
                  <Image
                    src="/assets/achievements/IFEST-2.jpg"
                    alt="IFEST Achievement 2"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="mono-label text-[10px] text-white font-bold tracking-wide">IFEST Showcase 2</span>
                  </div>
                </div>
                <div className="relative h-36 sm:h-44 rounded-2xl overflow-hidden border border-white/20 shadow-lg group bg-soft-stone/10">
                  <Image
                    src="/assets/achievements/Technoday-1.jpg"
                    alt="Technoday Achievement 1"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="mono-label text-[10px] text-white font-bold tracking-wide">Technoday 1</span>
                  </div>
                </div>
                <div className="relative h-36 sm:h-44 rounded-2xl overflow-hidden border border-white/20 shadow-lg group bg-soft-stone/10">
                  <Image
                    src="/assets/achievements/Technoday-2.jpg"
                    alt="Technoday Achievement 2"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="mono-label text-[10px] text-white font-bold tracking-wide">Technoday 2</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Milestones */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <h4 className="mono-label text-coral text-xs font-bold tracking-wider uppercase">Milestone Benchmarks</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3 shadow-sm">
                  <FaTrophy className="text-coral text-lg mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="mono-label text-white text-xs font-bold mb-1">Vice Design Porsimaba</h5>
                    <p className="micro text-white/70">Led visual branding & design asset engineering for Porsimaba 2025.</p>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3 shadow-sm">
                  <FaRunning className="text-coral text-lg mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="mono-label text-white text-xs font-bold mb-1">94kg to 68kg Benchmark</h5>
                    <p className="micro text-white/70">Successfully transformed fitness metrics through disciplined endurance running.</p>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3 shadow-sm sm:col-span-2">
                  <FaLaptopCode className="text-coral text-lg mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="mono-label text-white text-xs font-bold mb-1">Enterprise Clean Architecture</h5>
                    <p className="micro text-white/70">Robust fullstack deployment leveraging Next.js, Flutter, and GSAP micro-animations.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Quick Links & Social (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8 lg:pl-8 pt-4 lg:pt-0">
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
