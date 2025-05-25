"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const StarRating = ({ rating, animated = false }) => {
  const starsRef = useRef([]);
  
  useEffect(() => {
    if (animated && starsRef.current.length > 0) {
      gsap.fromTo(
        starsRef.current,
        { scale: 0, rotation: -180 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.3,
        }
      );
    }
  }, [animated]);

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          ref={(el) => (starsRef.current[index] = el)}
          className={`w-4 h-4 transition-all duration-300 ${
            index < rating
              ? "text-yellow-400 drop-shadow-sm"
              : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const ReviewCard = ({ review, index }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power2.out",
        }
      );
    }
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="review-card flex-shrink-0 w-80 mx-4 p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/15 group"
    >
      {/* Profile Section */}
      <div className="flex items-center mb-4">
        <div className="relative">
          <img
            src={review.image}
            alt={review.name}
            className="w-14 h-14 rounded-full object-cover border-3 border-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg group-hover:scale-110 transition-transform duration-300"
            style={{
              border: "3px solid",
              borderImage: "linear-gradient(45deg, #fbbf24, #f59e0b) 1",
            }}
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-bold text-white group-hover:text-yellow-300 transition-colors duration-300">
            {review.name}
          </h3>
          <StarRating rating={review.rating} animated={true} />
        </div>
      </div>

      {/* Review Text */}
      <div className="relative">
        <svg
          className="absolute -top-2 -left-2 w-8 h-8 text-yellow-400/30"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
        </svg>
        <p className="text-gray-200 leading-relaxed pl-6 italic group-hover:text-white transition-colors duration-300">
          "{review.review}"
        </p>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-4 left-4 w-1 h-1 bg-yellow-400 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300"></div>
    </div>
  );
};

const ThirdSlide = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  
  const reviews = [
    {
      name: "John Doe",
      review: "Reverend James has been a guiding light in my spiritual journey.",
      image: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
      rating: 5,
    },
    {
      name: "Jane Smith",
      review: "His dedication to the community is unmatched.",
      image: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
      rating: 5,
    },
    {
      name: "Michael Brown",
      review: "Reverend James has a unique ability to connect with people of all ages.",
      image: "https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.webp?a=1&b=1&s=612x612&w=0&k=20&c=OnzQRmrTWj779-DI4_aEykdTKuwL-Ubphs1cdQ3tyxE=",
      rating: 5,
    },
    {
      name: "Emily Davis",
      review: "I always leave his sermons feeling uplifted and encouraged.",
      image: "https://media.istockphoto.com/id/482913249/photo/richard-kirstin-balcony-laptop-038.webp?a=1&b=1&s=612x612&w=0&k=20&c=MF6ayGnarYyW2rX6PuJgF9ItdpRo0j5q1QPDCbgXcBg=",
      rating: 4,
    },
    {
      name: "Chris Wilson",
      review: "His teachings are always rooted in love and truth.",
      image: "https://images.unsplash.com/photo-1602471615287-d733c59b79c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
      rating: 5,
    },
    {
      name: "Sarah Johnson",
      review: "Reverend James has a way of making everyone feel seen and valued.",
      image: "https://media.istockphoto.com/id/2162083704/photo/creative-portrait-and-happy-business-woman-in-office-company-or-startup-workplace-with-bokeh.webp?a=1&b=1&s=612x612&w=0&k=20&c=QEkxfPr2UbqVBp2dxARSKcyMLPKqlhVCYnAJ3yf5PxU=",
      rating: 5,
    },
    {
      name: "David Lee",
      review: "I've learned so much from Reverend James. His wisdom and compassion are evident.",
      image: "https://media.istockphoto.com/id/1338134336/photo/headshot-portrait-african-30s-man-smile-look-at-camera.webp?a=1&b=1&s=612x612&w=0&k=20&c=lAaidtOTLitNf6beCpMyD62mQBQvZFjgoilUMP0wfSY=",
      rating: 4,
    },
    {
      name: "Sophia Martinez",
      review: "Reverend James has a remarkable ability to bring scripture to life.",
      image: "https://via.placeholder.com/150",
      rating: 5,
    },
  ];

  // Duplicate reviews for seamless infinite scroll
  const duplicatedReviews = [...reviews, ...reviews];

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      const scrollWidth = scrollContainer.scrollWidth;
      const containerWidth = scrollContainer.offsetWidth;
      
      // Create infinite scroll animation
      gsap.to(scrollContainer, {
        x: -(scrollWidth / 2),
        duration: 30,
        ease: "none",
        repeat: -1,
      });

      // Pause animation on hover
      const handleMouseEnter = () => {
        gsap.globalTimeline.pause();
      };
      
      const handleMouseLeave = () => {
        gsap.globalTimeline.resume();
      };

      containerRef.current?.addEventListener("mouseenter", handleMouseEnter);
      containerRef.current?.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        containerRef.current?.removeEventListener("mouseenter", handleMouseEnter);
        containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <div className="text-start w-full">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-4">
          Community Reviews
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Hear what our community members have to say about Reverend James and his impact on their spiritual journey.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Reviews Carousel */}
      <div 
        ref={containerRef}
        className="relative overflow-hidden py-8"
      >
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-slate-800 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-slate-800 to-transparent z-10 pointer-events-none"></div>
        
        {/* Scrolling Container */}
        <div 
          ref={scrollRef}
          className="flex items-center"
          style={{ width: 'fit-content' }}
        >
          {duplicatedReviews.map((review, index) => (
            <ReviewCard 
              key={`${review.name}-${index}`} 
              review={review} 
              index={index % reviews.length}
            />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-16 grid grid-cols-3 gap-8 text-center">
        <div className="group">
          <div className="text-3xl font-bold text-yellow-400 group-hover:scale-110 transition-transform duration-300">
            {reviews.length}+
          </div>
          <div className="text-gray-300 mt-2">Happy Members</div>
        </div>
        <div className="group">
          <div className="text-3xl font-bold text-yellow-400 group-hover:scale-110 transition-transform duration-300">
            4.8
          </div>
          <div className="text-gray-300 mt-2">Average Rating</div>
        </div>
        <div className="group">
          <div className="text-3xl font-bold text-yellow-400 group-hover:scale-110 transition-transform duration-300">
            100%
          </div>
          <div className="text-gray-300 mt-2">Satisfaction</div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ThirdSlide;
