"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { achievements } from "../data/achievements";
import { FaTrophy, FaMedal, FaAward, FaChevronLeft, FaChevronRight, FaPaperPlane } from "react-icons/fa";
import { insertContactMessage } from "@/lib/contact";
import { ContactMessage, ChatMessage } from "../types/contact";

const Contact = () => {
  // Achievement slider state
  const [currentAchievementIndex, setCurrentAchievementIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      message: "Hi! I'm Andika's virtual assistant. I'd love to hear from you!",
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'bot',
      message: "What's your name?",
      timestamp: new Date()
    }
  ]);
  const [currentStep, setCurrentStep] = useState<'name' | 'email' | 'message'>('name');
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    message: ''
  });
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const sectionRef = useRef<HTMLElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Intersection Observer for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: "0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Auto scroll chat to bottom (only scroll within chat container)
  useEffect(() => {
    if (chatContainerRef.current && chatEndRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Focus input when step changes
  useEffect(() => {
    inputRef.current?.focus();
  }, [currentStep]);

  // Achievement navigation handlers
  const handleNextAchievement = () => {
    setCurrentAchievementIndex((prev) => (prev + 1) % achievements.length);
    setCurrentImageIndex(0);
  };

  const handlePrevAchievement = () => {
    setCurrentAchievementIndex((prev) => (prev - 1 + achievements.length) % achievements.length);
    setCurrentImageIndex(0);
  };

  const handleNextImage = () => {
    const currentAchievement = achievements[currentAchievementIndex];
    setCurrentImageIndex((prev) => (prev + 1) % currentAchievement.images.length);
  };

  const handlePrevImage = () => {
    const currentAchievement = achievements[currentAchievementIndex];
    setCurrentImageIndex((prev) => (prev - 1 + currentAchievement.images.length) % currentAchievement.images.length);
  };

  const getAwardIcon = (award: string) => {
    if (award.includes('1st') || award.includes('Winner')) return <FaTrophy className="text-yellow-400" />;
    if (award.includes('2nd')) return <FaMedal className="text-gray-300" />;
    if (award.includes('3rd')) return <FaMedal className="text-orange-400" />;
    return <FaAward className="text-neon-aqua" />;
  };

  // Chat handlers
  const addBotMessage = (message: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'bot',
      message,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (message: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, newMessage]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;

    const value = inputValue.trim();
    addUserMessage(value);
    setInputValue('');

    // Simulate bot thinking
    await new Promise(resolve => setTimeout(resolve, 800));

    switch (currentStep) {
      case 'name':
        setFormData(prev => ({ ...prev, name: value }));
        addBotMessage(`Nice to meet you, ${value}!`);
        await new Promise(resolve => setTimeout(resolve, 600));
        addBotMessage("What's your email address?");
        setCurrentStep('email');
        break;
        
      case 'email':
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          addBotMessage("Hmm, that doesn't look like a valid email. Can you try again?");
          return;
        }
        setFormData(prev => ({ ...prev, email: value }));
        addBotMessage("Great! What would you like to say?");
        setCurrentStep('message');
        break;
        
      case 'message':
        setFormData(prev => ({ ...prev, message: value }));
        setIsSubmitting(true);
        
        try {
          await insertContactMessage({
            name: formData.name,
            email: formData.email,
            message: value
          });
          
          addBotMessage("Thank you! Your message has been sent successfully.");
          await new Promise(resolve => setTimeout(resolve, 1000));
          addBotMessage("Andika will get back to you soon!");
          
          // Reset form after 3 seconds
          setTimeout(() => {
            setChatMessages([
              {
                id: '1',
                type: 'bot',
                message: "Hi! I'm Andika's virtual assistant. I'd love to hear from you!",
                timestamp: new Date()
              },
              {
                id: '2',
                type: 'bot',
                message: "What's your name?",
                timestamp: new Date()
              }
            ]);
            setCurrentStep('name');
            setFormData({ name: '', email: '', message: '' });
          }, 3000);
        } catch {
          addBotMessage("Oops! Something went wrong. Please try again later.");
        } finally {
          setIsSubmitting(false);
        }
        break;
    }
  };

  const currentAchievement = achievements[currentAchievementIndex];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="min-h-screen bg-dark-bg relative overflow-hidden pt-16 lg:pt-0"
    >
      <div className={`relative z-10 container mx-auto px-4 lg:px-8 py-12 lg:py-20 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}>
        
        {/* Title */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className={`text-neon-aqua text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold mb-3 lg:mb-4 ${
            isVisible ? "animate-fade-in-down" : ""
          }`}>
            Get In Touch
          </h2>
          <p className={`text-olive-green/80 text-base md:text-lg font-inter ${
            isVisible ? "animate-fade-in-up delay-200" : ""
          }`}>
            Let&apos;s start a conversation
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto items-stretch">
          
          {/* LEFT SIDE - Chat Form */}
          <div className={`bg-navy-blue/50 rounded-2xl border-2 border-olive-green/20 p-5 md:p-6 lg:p-8 flex flex-col ${
            isVisible ? "animate-fade-in-left" : ""
          }`}>
            <h3 className="text-lg md:text-xl font-orbitron font-bold text-neon-aqua mb-4">
              Sakti Mail
            </h3>

            {/* Chat Messages Container */}
            <div 
              ref={chatContainerRef}
              className="max-h-[350px] md:max-h-[400px] overflow-y-scroll mb-4 space-y-3 pr-2 scrollbar-thin scrollbar-thumb-neon-aqua/30 scrollbar-track-navy-blue/50 scroll-smooth"
            >
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      msg.type === 'user'
                        ? 'bg-neon-aqua text-dark-bg rounded-br-sm'
                        : 'bg-olive-green/20 text-soft-white border border-olive-green/30 rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm md:text-base font-inter break-words leading-relaxed">{msg.message}</p>
                    <span className="text-[10px] opacity-50 mt-1.5 block">
                      {msg.timestamp.toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex gap-3 mt-auto">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isSubmitting}
                placeholder={
                  currentStep === 'name' ? 'Type your name...' :
                  currentStep === 'email' ? 'Type your email...' :
                  'Type your message...'
                }
                className="flex-1 bg-dark-bg/50 border-2 border-olive-green/30 rounded-xl px-4 py-3 text-sm md:text-base text-soft-white placeholder:text-olive-green/50 focus:outline-none focus:border-neon-aqua transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isSubmitting || !inputValue.trim()}
                className="bg-neon-aqua hover:bg-neon-aqua/80 text-dark-bg px-5 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm md:text-base"
              >
                <FaPaperPlane className="text-sm" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>
          </div>

          {/* RIGHT SIDE - Achievement Slider */}
          <div className={`bg-navy-blue/50 rounded-2xl border-2 border-olive-green/20 overflow-hidden flex flex-col ${
            isVisible ? "animate-fade-in-right" : ""
          }`}>
            {/* Achievement Header */}
            <div className="p-5 md:p-6 border-b border-olive-green/20">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg md:text-xl font-orbitron font-bold text-neon-aqua">
                  Recent Achievements
                </h3>
                <div className="text-sm text-olive-green/80 font-inter">
                  {currentAchievementIndex + 1} / {achievements.length}
                </div>
              </div>
              <p className="text-sm text-soft-white/60 font-inter">
                Check out my latest accomplishments
              </p>
            </div>

            {/* Image Carousel */}
            <div className="relative h-44 md:h-52 lg:h-60 bg-gradient-to-br from-olive-green/20 to-neon-aqua/20 flex-shrink-0">
              <Image
                src={currentAchievement.images[currentImageIndex]}
                alt={`${currentAchievement.title} - Image ${currentImageIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-blue/90 via-transparent to-transparent"></div>

              {/* Image Navigation */}
              {currentAchievement.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-dark-bg/80 hover:bg-neon-aqua/80 rounded-full flex items-center justify-center text-neon-aqua hover:text-dark-bg transition-all"
                    aria-label="Previous image"
                  >
                    <FaChevronLeft size={16} className="md:w-[18px] md:h-[18px]" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-dark-bg/80 hover:bg-neon-aqua/80 rounded-full flex items-center justify-center text-neon-aqua hover:text-dark-bg transition-all"
                    aria-label="Next image"
                  >
                    <FaChevronRight size={16} className="md:w-[18px] md:h-[18px]" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {currentAchievement.images.length > 1 && (
                <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 bg-dark-bg/80 px-2 md:px-3 py-1 rounded-full text-neon-aqua text-xs md:text-sm font-semibold">
                  {currentImageIndex + 1} / {currentAchievement.images.length}
                </div>
              )}

              {/* Award Badge */}
              <div className="absolute top-2 md:top-4 left-2 md:left-4 flex items-center gap-1.5 md:gap-2 bg-dark-bg/90 px-2 md:px-4 py-1.5 md:py-2 rounded-full border border-neon-aqua/30">
                {getAwardIcon(currentAchievement.award)}
                <span className="text-soft-white font-semibold text-xs md:text-sm">
                  {currentAchievement.award}
                </span>
              </div>
            </div>

            {/* Achievement Content */}
            <div className="p-5 md:p-6 space-y-3 flex-1">
              <div>
                <h4 className="text-base md:text-lg font-orbitron font-bold text-neon-aqua mb-1">
                  {currentAchievement.title}
                </h4>
                <p className="text-olive-green font-inter font-medium text-sm">
                  {currentAchievement.event}
                </p>
              </div>

              <p className="text-soft-white/80 text-sm font-inter leading-relaxed line-clamp-3">
                {currentAchievement.description}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-olive-green/20">
                <span className="text-olive-green/80 text-sm font-inter">
                  {currentAchievement.date}
                </span>
                <span className="px-3 py-1 bg-olive-green/10 text-olive-green text-xs font-inter rounded-full border border-olive-green/20 capitalize">
                  {currentAchievement.category}
                </span>
              </div>
            </div>

            {/* Achievement Navigation */}
            <div className="px-5 md:px-6 pb-5 md:pb-6 flex gap-3 mt-auto">
              <button
                onClick={handlePrevAchievement}
                className="flex-1 bg-olive-green/10 hover:bg-olive-green/20 text-olive-green border border-olive-green/30 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
              >
                <FaChevronLeft className="text-xs" />
                Previous
              </button>
              <button
                onClick={handleNextAchievement}
                className="flex-1 bg-neon-aqua/10 hover:bg-neon-aqua/20 text-neon-aqua border border-neon-aqua/30 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
              >
                Next
                <FaChevronRight className="text-xs" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;