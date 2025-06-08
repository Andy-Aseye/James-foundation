"use client";
import { sortBlogs } from "@/src/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import Tag from "../Elements/Tag";
import { slug } from "github-slugger";
import { gsap } from "gsap";

const HomeCoverSection = ({ blogs }) => {
  const sortedBlogs = sortBlogs(blogs);
  const blog = sortedBlogs[0];
  
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const taglineRef = useRef(null);
  const dividerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    const description = descriptionRef.current;
    const tagline = taglineRef.current;
    const divider = dividerRef.current;

    // Initial states
    gsap.set([title, description, tagline, divider], {
      opacity: 0,
      y: 30,
    });

    // Entrance animation timeline
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.to(divider, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    })
    .to(title, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out",
    }, "-=0.6")
    .to(description, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    }, "-=0.8")
    .to(tagline, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.6");

    // Subtle floating animation for decorative elements
    gsap.to(".floating-element", {
      y: "+=10",
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.5,
    });

  }, []);

  return (
    <div className="w-full inline-block relative">
      <article 
        ref={containerRef}
        className="flex flex-col items-start justify-end relative h-[90vh]"
      >
        {/* Enhanced gradient overlay for luxury feel */}
        <div className="absolute top-0 left-0 bottom-0 right-0 h-[100vh] bg-gradient-to-b from-black/40 via-black/30 to-black/80 z-10" />
        
        {/* Subtle texture overlay */}
        <div 
          className="absolute inset-0 opacity-10 z-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} 
        />

        {/* Video Background */}
        <video
          src="/videos/graduation.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-[100vh] object-center object-cover -z-10"
        />

        {/* Content Container - Original Layout Restored */}
        <div className="w-full p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col items-start justify-center z-30 text-white">
          
          {/* Elegant divider line */}
          <div 
            ref={dividerRef}
            className="w-full mb-6"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
          </div>

          {/* Original layout structure */}
          <div className="flex flex-row w-full justify-between">
            <div>
              <h1 
                ref={titleRef}
                className="font-bold capitalize text-lg sm:text-xl md:text-3xl lg:text-4xl"
              >
                <span className="font-in text-[#c3c2bb] sm:text-5xl md:text-6xl lg:text-7xl text-[4.5rem]">
                  THE JAMES FOUNDATION
                </span>
              </h1>
            </div>
            
            <div
              ref={descriptionRef}
              className="pl-6 ml-[6vw] mt-3"
              style={{ borderLeft: "1px solid #DF9D62" }}
            >
              <div className="max-w-[23vw]">
                <p className="text-xs leading-relaxed text-white/90">
                  The James Foundation is dedicated to transforming lives
                  through faith, compassion, and service. Inspired by Reverend
                  James, it supports families, nurtures spiritual growth, and
                  empowers communities for lasting change.
                </p>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <p 
            ref={taglineRef}
            className="hidden sm:inline-block mt-4 text-xs font-in text-white/70"
          >
            Building stronger communities through compassion and service.
          </p>
        </div>

        {/* Floating decorative elements */}
        <div className="floating-element absolute top-20 right-20 w-16 h-16 border border-white/20 rounded-full opacity-60 z-20"></div>
        <div className="floating-element absolute bottom-32 left-20 w-12 h-12 border border-white/20 rounded-full opacity-40 z-20"></div>
        <div className="floating-element absolute top-1/2 right-32 w-8 h-8 border border-white/20 rounded-full opacity-50 z-20"></div>
        
        {/* Gold accent dots */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full opacity-60 z-20"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full opacity-60 z-20"></div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="flex flex-col items-center text-white/60">
            <span className="text-xs mb-2 font-light">Scroll to explore</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent animate-pulse"></div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default HomeCoverSection;
