"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import FirstSlide from "./Slides/FirstSlide";
import SecondSlide from "./Slides/SecondSlide";
import ThirdSlide from "./Slides/ThirdSlide";

const ScrollAnimation = () => {
  const sectionRef = useRef(null);
  const textSectionsRef = useRef([]);
  const particlesRef = useRef([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;

      // Create elegant floating particles
      const createParticles = () => {
        for (let i = 0; i < 8; i++) {
          const particle = document.createElement('div');
          particle.className = 'scroll-particle';
          particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: linear-gradient(45deg, #d4af37, #b8860b);
            border-radius: 50%;
            opacity: 0.6;
            pointer-events: none;
            z-index: 10;
            box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
          `;
          section.appendChild(particle);
          particlesRef.current.push(particle);
        }
      };

      createParticles();

      // Animate particles elegantly
      particlesRef.current.forEach((particle, index) => {
        gsap.set(particle, {
          x: Math.random() * window.innerWidth * 0.8,
          y: Math.random() * window.innerHeight,
        });

        gsap.to(particle, {
          x: `+=${Math.random() * 120 - 60}`,
          y: `+=${Math.random() * 120 - 60}`,
          duration: Math.random() * 8 + 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.4,
        });
      });

      // Initial setup - starts as a card
      gsap.set(section, {
        width: "85vw",
        background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
        borderRadius: "24px",
        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
      });

      // Card expansion animation - smooth width growth to full screen
      gsap.to(section, {
        width: "100vw",
        borderRadius: "0px",
        boxShadow: "0 0 0px rgba(0, 0, 0, 0)",
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 30%",
          scrub: 1.5,
          markers: false,
        },
      });

      // Enhanced text animations with luxury easing and state management
      textSectionsRef.current.forEach((textSection, index) => {
        // Set initial states
        gsap.set(textSection, {
          opacity: 0,
          y: 100,
          scale: 0.9,
        });

        // Single entrance animation that only triggers once
        gsap.to(textSection, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textSection,
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
            markers: false,
            once: true, // This ensures the animation only happens once
            onComplete: () => {
              // Mark element as animated to prevent re-triggering
              textSection.setAttribute('data-animated', 'true');
            }
          },
        });

        // Dominant background color transitions
        if (index < textSectionsRef.current.length - 1) {
          const backgrounds = [
            "linear-gradient(135deg, #1e293b 0%, #334155 100%)", // Dark slate
            "linear-gradient(135deg, #000000 0%, #1f2937 100%)", // Black to dark grey
            "linear-gradient(135deg, #111827 0%, #000000 100%)"  // Dark grey to black
          ];
          
          gsap.to(section, {
            background: backgrounds[index + 1],
            duration: 2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: textSectionsRef.current[index + 1],
              start: "top 70%",
              end: "top 40%",
              scrub: 2,
              markers: false,
            },
          });
        }
      });

      // Add elegant section dividers
      const createDividers = () => {
        textSectionsRef.current.forEach((textSection, index) => {
          if (index < textSectionsRef.current.length - 1) {
            const divider = document.createElement('div');
            divider.className = 'section-divider';
            divider.style.cssText = `
              position: absolute;
              top: ${(index + 1) * 33.33}%;
              left: 50%;
              transform: translateX(-50%);
              width: 80px;
              height: 2px;
              background: linear-gradient(90deg, transparent, #d4af37, #b8860b, transparent);
              opacity: 0;
              z-index: 5;
              border-radius: 1px;
            `;
            section.appendChild(divider);

            // Animate divider appearance
            gsap.to(divider, {
              opacity: 0.8,
              width: "160px",
              scrollTrigger: {
                trigger: textSectionsRef.current[index + 1],
                start: "top 65%",
                end: "top 45%",
                scrub: 1,
                markers: false,
              },
            });
          }
        });
      };

      // Wait for refs to be populated then create dividers
      setTimeout(createDividers, 100);

      // Cleanup function
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        particlesRef.current.forEach(particle => particle.remove());
        particlesRef.current = [];
        // Clean up dividers
        section.querySelectorAll('.section-divider').forEach(divider => divider.remove());
      };
    }
  }, []);

  // Add references to text sections
  const addToRefs = (el) => {
    if (el && !textSectionsRef.current.includes(el)) {
      textSectionsRef.current.push(el);
    }
  };

  return (
    <div className="w-full py-20 flex justify-center items-center bg-gradient-to-b from-slate-50 to-white">
      <div
        ref={sectionRef}
        className="relative mx-auto h-[340vh] flex flex-col justify-start overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
          borderRadius: "24px",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
          transition: "all 0.3s ease",
        }}
      >
        {/* Subtle texture overlay */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} 
        />

        {/* Text Sections with improved spacing */}
        <div className="w-full flex flex-col justify-around h-full py-24 relative z-10">
          <div
            ref={addToRefs}
            className="text-white text-center mx-auto my-32 w-full px-8"
          >
            <FirstSlide />
          </div>

          <div
            ref={addToRefs}
            className="text-white text-center px-12 mx-auto my-32"
          >
            <SecondSlide />
          </div>

          <div
            ref={addToRefs}
            className="text-white text-center px-12 my-32"
          >
            <ThirdSlide />
          </div>
        </div>

        {/* Luxury decorative elements */}
        <div className="absolute top-12 left-12 w-20 h-20 border border-white/20 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-12 right-12 w-16 h-16 border border-white/20 rounded-full opacity-60 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-12 w-12 h-12 border border-white/20 rounded-full opacity-60 animate-pulse delay-500"></div>
        
        {/* Gold accent elements */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full opacity-70 animate-pulse delay-700"></div>
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full opacity-70 animate-pulse delay-1200"></div>
        <div className="absolute top-2/3 left-1/3 w-1 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full opacity-70 animate-pulse delay-900"></div>
      </div>
    </div>
  );
};

export default ScrollAnimation;
