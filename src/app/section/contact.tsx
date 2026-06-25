"use client";
import React, { useState, useRef, useLayoutEffect } from "react";
import { FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaCheck } from "react-icons/fa";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      // Use send-contact API as requested by user
      const res = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to send message. Please try emailing directly.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
      setStatus("error");
    }
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="min-h-screen bg-soft-stone text-ink relative overflow-hidden py-24 flex flex-col justify-center border-b border-border-light"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
        {/* Title */}
        <div className="text-center mb-16 max-w-2xl mx-auto contact-anim">
          <h4 className="mono-label text-coral mb-2">Informasi Kontak</h4>
          <h2 className="text-[3.5rem] lg:text-[5rem] font-black tracking-tight text-shiny mb-4">
            Get In Touch
          </h2>
          <p className="body-large text-body-muted">
            Let&apos;s build something phenomenal together. Fill out the secure contact form below or connect with me directly via LinkedIn and Email.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Direct Channels & Info (Left 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8 contact-anim">
            <div className="card-lift bg-primary border border-white/10 rounded-3xl p-8 lg:p-10 shadow-xl flex-1 flex flex-col justify-between">
              <div>
                <h3 className="card-heading text-white mb-6">
                  Direct Contacts
                </h3>
                <p className="body text-white/80 mb-8 leading-relaxed">
                  Whether you are seeking a fullstack engineer, a clean architecture consultant, or just want to talk about marathons and running gear, my inbox is always open.
                </p>

                <div className="space-y-6">
                  {/* Email */}
                  <a
                    href="mailto:andikahernadi@gmail.com"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-coral hover:bg-white/10 transition-all duration-300 group hover:cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-coral/20 text-coral flex items-center justify-center group-hover:bg-coral group-hover:text-primary transition-all duration-300">
                      <FaEnvelope size={20} />
                    </div>
                    <div>
                      <h4 className="mono-label text-white/60 group-hover:text-coral transition-colors">Email</h4>
                      <p className="body font-medium text-white">andikahernadi@gmail.com</p>
                    </div>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://linkedin.com/in/andika-hernadi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-coral hover:bg-white/10 transition-all duration-300 group hover:cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-coral/20 text-coral flex items-center justify-center group-hover:bg-coral group-hover:text-primary transition-all duration-300">
                      <FaLinkedin size={20} />
                    </div>
                    <div>
                      <h4 className="mono-label text-white/60 group-hover:text-coral transition-colors">LinkedIn</h4>
                      <p className="body font-medium text-white">Connect with me</p>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center">
                      <FaMapMarkerAlt size={20} />
                    </div>
                    <div>
                      <h4 className="mono-label text-white/60">Location</h4>
                      <p className="body font-medium text-white">Indonesia</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="pt-8 border-t border-white/10 mt-8 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-coral animate-pulse"></div>
                <span className="mono-label text-white/80 text-xs">Available for opportunities</span>
              </div>
            </div>
          </div>

          {/* Contact Form Card (Right 7 cols) */}
          <div className="lg:col-span-7 flex flex-col contact-anim">
            <div className="card-lift bg-canvas border border-card-border rounded-3xl p-8 lg:p-12 shadow-xl flex-1 flex flex-col justify-between">
              <div>
                <h3 className="card-heading text-primary mb-2">Send a Message</h3>
                <p className="body text-body-muted mb-8">
                  Fill out the fields below to send an inquiry directly to my email inbox via secure API.
                </p>

                {/* Premium Success State */}
                {status === "success" && (
                  <div className="mb-8 p-8 bg-pale-green border-2 border-green-400 rounded-3xl flex items-center gap-6 text-deep-green animate-fade-in shadow-lg">
                    <div className="w-14 h-14 bg-deep-green text-white rounded-2xl flex items-center justify-center flex-shrink-0 font-bold text-xl shadow-md">
                      <FaCheck />
                    </div>
                    <div>
                      <h4 className="mono-label text-deep-green font-black text-lg mb-1">Message Sent Successfully!</h4>
                      <p className="body text-sm text-deep-green/80 leading-relaxed">Thank you for reaching out. Your transmission has been verified and delivered to my primary inbox. I will respond promptly.</p>
                    </div>
                  </div>
                )}

                {/* Premium Error State */}
                {status === "error" && (
                  <div className="mb-8 p-6 bg-red-50 border-2 border-red-300 rounded-3xl text-error animate-fade-in shadow-md">
                    <h4 className="mono-label font-bold mb-1 text-base">Error Sending Message</h4>
                    <p className="body text-sm">{errorMessage}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="mono-label text-primary block mb-2 text-xs font-bold">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-soft-stone border border-hairline rounded-2xl px-5 py-4 text-ink placeholder-muted focus:outline-none focus:border-coral transition-colors body text-sm shadow-inner"
                      />
                    </div>
                    <div>
                      <label className="mono-label text-primary block mb-2 text-xs font-bold">Your Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-soft-stone border border-hairline rounded-2xl px-5 py-4 text-ink placeholder-muted focus:outline-none focus:border-coral transition-colors body text-sm shadow-inner"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mono-label text-primary block mb-2 text-xs font-bold">Subject</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Project Opportunity / Clean Architecture Consultation"
                      className="w-full bg-soft-stone border border-hairline rounded-2xl px-5 py-4 text-ink placeholder-muted focus:outline-none focus:border-coral transition-colors body text-sm shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="mono-label text-primary block mb-2 text-xs font-bold">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project, goals, or timeline..."
                      className="w-full bg-soft-stone border border-hairline rounded-2xl p-5 text-ink placeholder-muted focus:outline-none focus:border-coral transition-colors body text-sm resize-none shadow-inner"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-shiny w-full py-5 bg-primary text-white hover:bg-coral hover:text-primary rounded-full font-bold mono-label text-sm tracking-widest uppercase shadow-xl transition-all duration-300 flex items-center justify-center gap-3 hover:cursor-pointer disabled:opacity-50"
                  >
                    {status === "loading" ? (
                      <span className="animate-pulse flex items-center gap-3">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Transmitting...
                      </span>
                    ) : (
                      <>
                        <FaPaperPlane /> Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;