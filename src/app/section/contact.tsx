"use client";
import React, { useState, useRef, useLayoutEffect } from "react";
import { FaPaperPlane, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const Contact = () => {
  const [messages, setMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    {
      sender: "andika",
      text: "Hello! Thank you for visiting my portfolio. Do you have any questions or project opportunities you'd like to discuss?",
      time: "Just now",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      sender: "user",
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
    setTimeout(scrollToBottom, 100);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: "andika",
          text: "Thanks for reaching out! I have received your message. For immediate response, feel free to connect via WhatsApp or Email using the links beside.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setTimeout(scrollToBottom, 100);
    }, 1500);
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="min-h-screen bg-dark-navy text-white relative overflow-hidden py-24 flex flex-col justify-center"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
        {/* Title */}
        <div className="text-center mb-16 max-w-2xl mx-auto contact-anim">
          <h4 className="mono-label text-coral mb-2">Informasi Kontak</h4>
          <h2 className="section-display text-white mb-4">
            Get In Touch
          </h2>
          <p className="body-large text-white/80">
            Let&apos;s build something phenomenal together. Drop a message in the interactive chat box below or reach out via direct channels.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Direct Channels & Info (Left 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8 contact-anim">
            <div className="card-vibrate bg-primary border border-white/10 rounded-3xl p-8 lg:p-10 shadow-xl flex-1 flex flex-col justify-between">
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

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/628123456789" // replace with actual WA
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-coral hover:bg-white/10 transition-all duration-300 group hover:cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-coral/20 text-coral flex items-center justify-center group-hover:bg-coral group-hover:text-primary transition-all duration-300">
                      <FaWhatsapp size={20} />
                    </div>
                    <div>
                      <h4 className="mono-label text-white/60 group-hover:text-coral transition-colors">WhatsApp</h4>
                      <p className="body font-medium text-white">Let&apos;s chat directly</p>
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

          {/* Interactive Chat Box (Right 7 cols) */}
          <div className="lg:col-span-7 flex flex-col contact-anim">
            <div className="card-vibrate bg-primary border border-white/10 rounded-3xl overflow-hidden shadow-xl flex-1 flex flex-col h-[600px]">
              {/* Chat Header */}
              <div className="p-6 bg-white/5 border-b border-white/10 flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-coral">
                    <img src="/assets/Hero-1.jpg" alt="Andika" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-primary rounded-full"></div>
                </div>
                <div>
                  <h3 className="mono-label text-white font-bold">Andika Saktidana Hernadi</h3>
                  <p className="micro text-white/60">Fullstack Software Engineer & UI/UX Designer</p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 scrollbar-hide bg-black/20">
                {messages.map((msg, index) => {
                  const isAndika = msg.sender === "andika";
                  return (
                    <div key={index} className={`flex ${isAndika ? "justify-start" : "justify-end"}`}>
                      <div
                        className={`max-w-[80%] p-4 rounded-2xl body shadow-md ${
                          isAndika
                            ? "bg-white/10 text-white rounded-tl-none border border-white/10"
                            : "bg-coral text-primary font-medium rounded-tr-none"
                        }`}
                      >
                        <p className="leading-relaxed">{msg.text}</p>
                        <span
                          className={`micro block mt-2 text-right opacity-70 ${
                            isAndika ? "text-white/60" : "text-primary"
                          }`}
                        >
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 border border-white/10 text-white p-4 rounded-2xl rounded-tl-none flex items-center gap-2 shadow-md">
                      <div className="w-2 h-2 bg-coral rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-coral rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-coral rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Form */}
              <form onSubmit={handleSendMessage} className="p-4 bg-white/5 border-t border-white/10 flex gap-3 items-center">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Click here to type a message..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:border-coral transition-colors body"
                />
                <button
                  type="submit"
                  className="btn-shiny w-14 h-14 bg-coral text-primary rounded-full flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300 shadow-lg flex-shrink-0 hover:cursor-pointer"
                  aria-label="Send Message"
                >
                  <FaPaperPlane size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;