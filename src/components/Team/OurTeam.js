"use client"
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const OurTeam = () => {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);

  useEffect(() => {
    const images = imageRefs.current;
    
    // Create parallax effect for each image
    images.forEach((image, index) => {
      if (image) {
        gsap.fromTo(
          image,
          {
            y: 50,
            scale: 0.9,
            opacity: 0.8,
          },
          {
            y: -50,
            scale: 1.1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: image.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );

        // Add hover animation
        const handleMouseEnter = () => {
          gsap.to(image, {
            scale: 1.15,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(image, {
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        image.addEventListener("mouseenter", handleMouseEnter);
        image.addEventListener("mouseleave", handleMouseLeave);

        // Cleanup
        return () => {
          image.removeEventListener("mouseenter", handleMouseEnter);
          image.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    });

    // Animate the header section texts separately
    gsap.fromTo(
      ".header-tag",
      {
        x: -50,
        opacity: 0,
        scale: 0.8,
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".header-section",
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".header-title",
      {
        x: 50,
        opacity: 0,
        y: 20,
      },
      {
        x: 0,
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".header-section",
          start: "top 80%",
        },
      }
    );

    // Animate each word in the title
    gsap.fromTo(
      ".header-title .word",
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".header-section",
          start: "top 80%",
        },
      }
    );

    // Animate team cards
    gsap.fromTo(
      ".team-card",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".team-cards-container",
          start: "top 80%",
        },
      }
    );
  }, []);

  const teamMembers = [
    {
      image: "/images/about.jpg",
      name: "James Sarpong",
      title: "Founder & CEO",
    },
    {
      image: "/team-woman.png",
      name: "Ama Mensah",
      title: "Director of Operations",
    },
    {
      image: "/images/team-man.png",
      name: "Kwame Boateng",
      title: "Head of Programs",
    },
  ];

  return (
    <div ref={containerRef} className="mx-auto my-[8vh] w-[90vw] overflow-hidden">
      <div className="header-section flex flex-row justify-between items-start py-8">
        <div className="flex-1">
          <div className="header-tag w-[9vw] bg-[#DAD9D5] rounded-md p-2">
            <p className="text-sm text-gray-600 font-medium">
              People & leadership
            </p>
          </div>
        </div>
        <div className="flex-1 pl-8">
          <h1 className="header-title text-4xl font-bold text-gray-900 leading-tight">
            <span className="word">James</span>{" "}
            <span className="word">Sarpong</span>{" "}
            <span className="word">Foundation</span>{" "}
            <span className="word">is</span>{" "}
            <span className="word">under</span>{" "}
            <span className="word">the</span>{" "}
            <span className="word">guidance</span>{" "}
            <span className="word">of</span>{" "}
            <span className="word">dedicated,</span>{" "}
            <span className="word">focused</span>{" "}
            <span className="word">and</span>{" "}
            <span className="word">experienced</span>{" "}
            <span className="word">leadership</span>
          </h1>
        </div>
      </div>
      
      <div className="team-cards-container flex flex-wrap justify-center gap-8 mt-8">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="team-card flex flex-col items-center p-6 w-full sm:w-[45%] lg:w-[30%] min-w-[250px] overflow-hidden"
          >
            <div className="relative w-full h-50 mb-4 overflow-hidden rounded-lg">
              <img
                ref={(el) => (imageRefs.current[idx] = el)}
                src={member.image}
                alt={member.name}
                className="w-full h-[47vh] object-cover transition-transform duration-300"
                onError={(e) => {
                  e.target.src = "/character.png"; 
                }}
              />
            </div>
            <div className="text-left w-full">
              <h2 className="text-md font-semibold text-gray-900">{member.name}</h2>
              <p className="text-sm text-gray-600 mb-4">{member.title}</p>
             <p className="text-xs text-gray-500 mb-4">
                READ MORE
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
