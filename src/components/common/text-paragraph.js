"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

const TextParagraphSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);
  const badgeRef = useRef(null);
  const backgroundRef = useRef(null);
  const particlesRef = useRef([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger, TextPlugin);

      const section = sectionRef.current;
      const heading = headingRef.current;
      const paragraph = paragraphRef.current;
      const button = buttonRef.current;
      const badge = badgeRef.current;
      const background = backgroundRef.current;

      // Create floating particles with luxury gold theme
      const createParticles = () => {
        for (let i = 0; i < 8; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: linear-gradient(45deg, #d4af37, #b8860b);
            border-radius: 50%;
            opacity: 0.6;
            pointer-events: none;
            box-shadow: 0 0 8px rgba(212, 175, 55, 0.4);
          `;
          background.appendChild(particle);
          particlesRef.current.push(particle);
        }
      };

      createParticles();

      // Animate particles with elegant movement
      particlesRef.current.forEach((particle, index) => {
        gsap.set(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        });

        gsap.to(particle, {
          x: `+=${Math.random() * 150 - 75}`,
          y: `+=${Math.random() * 150 - 75}`,
          duration: Math.random() * 8 + 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.3,
        });
      });

      // Split text for heading animation
      const headingText = heading.textContent;
      const words = headingText.split(' ');
      heading.innerHTML = words.map(word => 
        `<span class="word" style="display: inline-block; overflow: hidden;">
          <span style="display: inline-block; transform: translateY(100%)">${word}</span>
        </span>`
      ).join(' ');

      // Split text for paragraph animation
      const paragraphText = paragraph.textContent;
      const sentences = paragraphText.split('. ');
      paragraph.innerHTML = sentences.map((sentence, index) => 
        `<span class="sentence" style="display: inline-block; opacity: 0; transform: translateY(30px)">
          ${sentence}${index < sentences.length - 1 ? '.' : ''}
        </span>`
      ).join(' ');

      // Initial states with luxury theme
      gsap.set(badge, { scale: 0, rotation: -10 });
      gsap.set(button, { scale: 0.8, opacity: 0 });
      gsap.set(background, { 
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        filter: "blur(0px)"
      });

      // Main animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          markers: false,
        }
      });

      // Badge animation with luxury easing
      tl.to(badge, {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: "expo.out",
      })

      // Heading words animation with sophisticated timing
      .to(heading.querySelectorAll('.word span'), {
        y: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "power2.out",
      }, "-=0.3")

      // Paragraph sentences animation
      .to(paragraph.querySelectorAll('.sentence'), {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      }, "-=0.6")

      // Button animation with luxury entrance
      .to(button, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "expo.out",
      }, "-=0.4");

      // Luxury background gradient animation
      gsap.to(background, {
        background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 50%, #f8fafc 100%)",
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Luxury button hover animations
      const buttonHoverTl = gsap.timeline({ paused: true });
      buttonHoverTl
        .to(button, {
          scale: 1.05,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
          duration: 0.4,
          ease: "power2.out",
        })
        .to(button.querySelector('.button-text'), {
          x: -3,
          duration: 0.4,
          ease: "power2.out",
        }, 0)
        .to(button.querySelector('.button-icon'), {
          x: 3,
          rotation: 45,
          duration: 0.4,
          ease: "power2.out",
        }, 0);

      // Mouse events for button
      button.addEventListener('mouseenter', () => {
        setIsHovered(true);
        buttonHoverTl.play();
      });

      button.addEventListener('mouseleave', () => {
        setIsHovered(false);
        buttonHoverTl.reverse();
      });

      // Refined magnetic effect for button
      const handleMouseMove = (e) => {
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.08;
        const deltaY = (e.clientY - centerY) * 0.08;

        gsap.to(button, {
          x: deltaX,
          y: deltaY,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "expo.out",
        });
      };

      section.addEventListener('mousemove', handleMouseMove);
      section.addEventListener('mouseleave', handleMouseLeave);

      // Cleanup
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        section.removeEventListener('mousemove', handleMouseMove);
        section.removeEventListener('mouseleave', handleMouseLeave);
        particlesRef.current.forEach(particle => particle.remove());
        particlesRef.current = [];
      };
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative flex flex-col items-center mt-[10vh] justify-center py-20 px-5 w-full min-h-screen overflow-hidden"
    >
      {/* Luxury Animated Background */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        }}
      />
      
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-30" 
           style={{
             backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)`,
             backgroundSize: '20px 20px'
           }} 
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Luxury Badge */}
        <div 
          ref={badgeRef}
          className="inline-flex items-center px-6 py-3 mb-12 text-sm font-medium text-slate-700 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200 shadow-lg"
        >
          <span className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mr-3 animate-pulse"></span>
          Welcome to Our Foundation
        </div>

        {/* Luxury Heading */}
        <h2 
          ref={headingRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-12 text-slate-900 leading-tight tracking-tight"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Building Stronger Communities
        </h2>

        {/* Elegant Paragraph */}
        <p 
          ref={paragraphRef}
          className="text-lg md:text-xl text-slate-600 mb-16 max-w-3xl mx-auto leading-relaxed font-light"
        >
          At The James Foundation, we are committed to uplifting communities through faith-driven initiatives and compassionate outreach. Join us in making a lasting impact through love, service, and dedication to positive change.
        </p>

        {/* Luxury CTA Button */}
        <button 
          ref={buttonRef}
          className="group relative inline-flex items-center px-10 py-4 text-lg font-semibold text-white rounded-full transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-slate-300/50"
          style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          }}
        >
          <span className="button-text mr-3">Learn More About Our Mission</span>
          <svg 
            className="button-icon w-5 h-5 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17 8l4 4m0 0l-4 4m4-4H3" 
            />
          </svg>
          
          {/* Gold accent on hover */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
        </button>
      </div>

      {/* Luxury Decorative Elements */}
      <div className="absolute top-16 left-16 w-24 h-24 border border-slate-300/50 rounded-full animate-pulse"></div>
      <div className="absolute bottom-16 right-16 w-20 h-20 border border-slate-300/50 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-8 w-16 h-16 border border-slate-300/50 rounded-full animate-pulse delay-500"></div>
      
      {/* Gold accent elements */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full opacity-60 animate-pulse delay-700"></div>
      <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full opacity-60 animate-pulse delay-1200"></div>
    </section>
  );
};

export default TextParagraphSection;
