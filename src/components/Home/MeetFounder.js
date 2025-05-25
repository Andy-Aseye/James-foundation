"use client";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MeetFounder = () => {
  const asideRef = useRef(null);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const backgroundRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const aside = asideRef.current;
    const image = imageRef.current;
    const background = backgroundRef.current;

    // Create luxury floating particles
    const createParticles = () => {
      for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'founder-particle';
        particle.style.cssText = `
          position: absolute;
          width: ${Math.random() * 3 + 1}px;
          height: ${Math.random() * 3 + 1}px;
          background: linear-gradient(45deg, #d4af37, #b8860b);
          border-radius: 50%;
          opacity: 0.4;
          pointer-events: none;
          z-index: 1;
        `;
        background.appendChild(particle);
        particlesRef.current.push(particle);
      }
    };

    createParticles();

    // Animate particles elegantly
    particlesRef.current.forEach((particle, index) => {
      gsap.set(particle, {
        x: Math.random() * container.offsetWidth,
        y: Math.random() * container.offsetHeight,
      });

      gsap.to(particle, {
        x: `+=${Math.random() * 100 - 50}`,
        y: `+=${Math.random() * 100 - 50}`,
        duration: Math.random() * 8 + 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.4,
      });
    });

    // Initial states
    gsap.set(aside, { 
      opacity: 0, 
      x: -50,
      scale: 0.95 
    });
    gsap.set(image, { 
      opacity: 0, 
      x: 50,
      scale: 0.95,
      rotation: 2 
    });

    // Split text animation for heading
    const heading = aside.querySelector('h1');
    const headingText = heading.textContent;
    const words = headingText.split(' ');
    heading.innerHTML = words.map(word => 
      `<span class="word" style="display: inline-block; overflow: hidden;">
        <span style="display: inline-block; transform: translateY(100%)">${word}</span>
      </span>`
    ).join(' ');

    // Split text animation for paragraphs
    const paragraphs = aside.querySelectorAll('p');
    paragraphs.forEach(paragraph => {
      const sentences = paragraph.textContent.split('. ');
      paragraph.innerHTML = sentences.map((sentence, index) => 
        `<span class="sentence" style="display: inline-block; opacity: 0; transform: translateY(20px)">
          ${sentence}${index < sentences.length - 1 ? '.' : ''}
        </span>`
      ).join(' ');
    });

    // Main animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse",
        markers: false,
      }
    });

    // Animate content entrance
    tl.to(aside, {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 1.2,
      ease: "expo.out",
    })
    .to(image, {
      opacity: 1,
      x: 0,
      scale: 1,
      rotation: 0,
      duration: 1.2,
      ease: "expo.out",
    }, "-=0.8")
    
    // Animate heading words
    .to(heading.querySelectorAll('.word span'), {
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power2.out",
    }, "-=0.6")
    
    // Animate paragraph sentences
    .to(paragraphs[0].querySelectorAll('.sentence'), {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
    }, "-=0.4")
    .to(paragraphs[1].querySelectorAll('.sentence'), {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
    }, "-=0.2");

    // Pinning animation with luxury easing
    let st = ScrollTrigger.create({
      trigger: container,
      start: "top 20%",
      end: "bottom 70%",
      pin: aside,
      pinSpacing: true,
      scrub: false,
      markers: false,
    });

    // Image hover animation
    const imageHoverTl = gsap.timeline({ paused: true });
    imageHoverTl.to(image, {
      scale: 1.05,
      rotation: -1,
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
      duration: 0.6,
      ease: "power2.out",
    });

    image.addEventListener('mouseenter', () => imageHoverTl.play());
    image.addEventListener('mouseleave', () => imageHoverTl.reverse());

    // Cleanup
    return () => {
      st && st.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      particlesRef.current.forEach(particle => particle.remove());
      particlesRef.current = [];
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex gap-16 my-20 mx-auto w-[90vw] min-h-[80vh] items-start bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-2xl overflow-hidden"
    >
      {/* Luxury Background */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100"
      />
      
      {/* Subtle texture overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} 
      />

      {/* Content Section */}
      <aside
        ref={asideRef}
        className="relative z-10 w-full max-w-[500px] p-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-8 text-slate-900 leading-tight tracking-tight">
          Meet Our Founder
        </h1>
        
        <p className="text-sm leading-relaxed mb-6 text-slate-600 font-light">
          Rev. James is a visionary leader with a profound commitment to
          spiritual growth and community development. Through this foundation,
          he aims to create a space where faith, education, and community
          service intersect to make a lasting impact on people's lives.
        </p>
        
        <p className=" text-sm leading-relaxed mb-8 text-slate-600 font-light">
          With years of pastoral experience and a heart for serving others, Rev.
          James established this foundation with a clear vision: to nurture
          spiritual growth, provide educational opportunities, and foster a
          strong sense of community among all who join us on this journey.
        </p>

        {/* Luxury CTA Button */}
        {/* <button className="group relative inline-flex items-center px-8 py-4 text-base font-semibold text-white rounded-full transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-slate-300/50 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                }}>
          <span className="mr-3">Learn More</span>
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          
          {/* Gold accent on hover */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
        {/* </button> */} 
      </aside>

      {/* Image Section */}
      <div className="relative z-10 py-12 pr-12 w-full max-w-[500px] flex items-center">
        <div 
          ref={imageRef}
          className="relative w-[28vw] h-[400px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500"
          style={{
            background: "url('/images/about.jpg')",
            backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Image overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          
          {/* Decorative border */}
          <div className="absolute inset-0 border-2 border-white/20 rounded-2xl"></div>
        </div>
      </div>

      {/* Luxury Decorative Elements */}
      <div className="absolute top-8 left-8 w-20 h-20 border border-slate-300/30 rounded-full opacity-60"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border border-slate-300/30 rounded-full opacity-60"></div>
      
      {/* Gold accent elements */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full opacity-50"></div>
      <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full opacity-50"></div>
    </section>
  );
};

export default MeetFounder;
