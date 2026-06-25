"use client";
import React, { useRef, useLayoutEffect } from "react";
import { FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaGithub, FaInstagram, FaTrophy, FaRunning, FaLaptopCode } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const Contact = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (containerRef.current) {
        gsap.from(".contact-anim", {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="contact"
      className="bg-primary bg-grid-pattern text-on-dark relative overflow-hidden pt-24 pb-12 border-t border-white/10"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
        {/* Title */}
        <div className="text-center mb-16 max-w-2xl mx-auto contact-anim">
          <h4 className="mono-label text-coral mb-2">Informasi Kontak </h4>
          <h2 className="text-[3.5rem] lg:text-[5rem] font-black tracking-tight text-white mb-4">
            Get In Touch
          </h2>
          <p className="body-large text-white/70">
            Let&apos;s build something phenomenal together. Reach out to me directly through my professional channels or explore my milestone benchmarks below.
          </p>
        </div>

        {/* Contact & Footer Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
          {/* Left Side: Profile, Gallery Achievements & Milestones (7 cols) */}
          <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl space-y-8 contact-anim">
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

            {/* Achievements Showcase Gallery */}
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
                    <span className="mono-label text-[10px] text-white font-bold tracking-wide">IFEST</span>
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
                    <span className="mono-label text-[10px] text-white font-bold tracking-wide">IFEST</span>
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
                    <span className="mono-label text-[10px] text-white font-bold tracking-wide">Technoday</span>
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
                    <span className="mono-label text-[10px] text-white font-bold tracking-wide">Technoday</span>
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
                    <h5 className="mono-label text-white text-xs font-bold mb-1">Vice Infrastructure Technology</h5>
                    <p className="micro text-white/70">Led infrastructure team coordination & technical sub-division strategy for Raion Community.</p>
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

          {/* Right Side: Direct Contact (including Connect) & Navigation (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8 lg:pl-4 contact-anim">
            {/* Direct Contact & Connect */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl space-y-6">
              <div>
                <h3 className="card-heading text-white mb-2">Direct Contact</h3>
                <p className="body text-white/70 text-sm leading-relaxed mb-6">
                  Whether you are seeking a fullstack engineer, a clean architecture consultant, or just want to talk about marathons, connect with me directly:
                </p>

                <div className="space-y-4">
                  {/* Email */}
                  <a
                    href="mailto:andikasaktih@gmail.com"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-coral hover:bg-white/10 transition-all duration-300 group hover:cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-xl bg-coral/20 text-coral flex items-center justify-center group-hover:bg-coral group-hover:text-primary transition-all duration-300 flex-shrink-0">
                      <FaEnvelope size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="mono-label text-white/60 text-xs group-hover:text-coral transition-colors">Email</h4>
                      <p className="body font-medium text-white text-sm truncate">andikasaktih@gmail.com</p>
                    </div>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://linkedin.com/in/andika-hernadi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-coral hover:bg-white/10 transition-all duration-300 group hover:cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-xl bg-coral/20 text-coral flex items-center justify-center group-hover:bg-coral group-hover:text-primary transition-all duration-300 flex-shrink-0">
                      <FaLinkedin size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="mono-label text-white/60 text-xs group-hover:text-coral transition-colors">LinkedIn</h4>
                      <p className="body font-medium text-white text-sm truncate">andika-hernadi</p>
                    </div>
                  </a>

                  {/* GitHub */}
                  <a
                    href="https://github.com/SutaSS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-coral hover:bg-white/10 transition-all duration-300 group hover:cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-xl bg-coral/20 text-coral flex items-center justify-center group-hover:bg-coral group-hover:text-primary transition-all duration-300 flex-shrink-0">
                      <FaGithub size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="mono-label text-white/60 text-xs group-hover:text-coral transition-colors">GitHub</h4>
                      <p className="body font-medium text-white text-sm truncate">SutaSS</p>
                    </div>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://instagram.com/andikahernadi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-coral hover:bg-white/10 transition-all duration-300 group hover:cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-xl bg-coral/20 text-coral flex items-center justify-center group-hover:bg-coral group-hover:text-primary transition-all duration-300 flex-shrink-0">
                      <FaInstagram size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="mono-label text-white/60 text-xs group-hover:text-coral transition-colors">Instagram</h4>
                      <p className="body font-medium text-white text-sm truncate">@andikahernadi</p>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-11 h-11 rounded-xl bg-white/10 text-white flex items-center justify-center flex-shrink-0">
                      <FaMapMarkerAlt size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="mono-label text-white/60 text-xs">Location</h4>
                      <p className="body font-medium text-white text-sm truncate">Indonesia</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="pt-6 border-t border-white/10 flex items-center gap-3">
                <span className="mono-label text-white/80 text-xs">Available for opportunities</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl space-y-4">
              <h4 className="mono-label text-white font-bold text-lg">Navigation</h4>
              <div className="grid grid-cols-2 gap-3 body text-sm text-white/70">
                <Link href="/#home" className="hover:text-coral transition-colors flex items-center gap-2">➔ Hero</Link>
                <Link href="/#about" className="hover:text-coral transition-colors flex items-center gap-2">➔ About</Link>
                <Link href="/#experience" className="hover:text-coral transition-colors flex items-center gap-2">➔ Experience</Link>
                <Link href="/#projects" className="hover:text-coral transition-colors flex items-center gap-2">➔ Projects</Link>
                <Link href="/#tech-stack" className="hover:text-coral transition-colors flex items-center gap-2">➔ Tech Stack</Link>
                <Link href="/#contact" className="hover:text-coral transition-colors flex items-center gap-2">➔ Contact</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-white/10 flex justify-between items-center gap-4 text-white/50 micro">
          <p>&copy; {new Date().getFullYear()} Andika Saktidana Hernadi. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;