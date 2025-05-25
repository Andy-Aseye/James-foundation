"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const FirstSlide = () => {
  const leftDivRef = useRef(null);
  const rightDivRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      // Set initial position - both divs together in center
      gsap.set([leftDivRef.current, rightDivRef.current], {
        x: 0,
        opacity: 0
      });

      // Create timeline for the animation sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom 80%",
          scrub: 1,
          markers: false,
          once: true, // Prevent re-triggering
        }
      });

      // Add animations to timeline
      tl.to([leftDivRef.current, rightDivRef.current], {
        opacity: 1,
        duration: 0.5
      })
      .to(leftDivRef.current, {
        x: -400, // Move left div to the left
        duration: 1.5,
        ease: "power2.out"
      })
      .to(rightDivRef.current, {
        x: 400, // Move right div to the right
        duration: 1.5,
        ease: "power2.out"
      }, "<"); // Start at same time as previous animation
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex justify-center flex-col items-center gap-8 w-full"
    >
      <div>
        <div ref={leftDivRef} className="text-[#90ffc2] text-start">
          <p className="mb-2">View achievements</p>
          <h1 className=" text-5xl font-bold">
            A foundation you <br /> can trust.
          </h1>
        </div>
        <div
          ref={rightDivRef}
          className="flex flex-row items-center gap-2 text-[#90ffc2]"
        >
          <p>View our achievements</p>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 7.25C0 6.69772 0.447715 6.25 1 6.25H13.5C14.0523 6.25 14.5 6.69772 14.5 7.25C14.5 7.80228 14.0523 8.25 13.5 8.25H1C0.447715 8.25 0 7.80228 0 7.25Z"
              fill="currentColor"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.54289 0.292893C6.93342 -0.0976311 7.56658 -0.0976311 7.95711 0.292893L14.2071 6.54289C14.5976 6.93342 14.5976 7.56658 14.2071 7.95711L7.95711 14.2071C7.56658 14.5976 6.93342 14.5976 6.54289 14.2071C6.15237 13.8166 6.15237 13.1834 6.54289 12.7929L12.0858 7.25L6.54289 1.70711C6.15237 1.31658 6.15237 0.683417 6.54289 0.292893Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
      <div className="w-full flex flex-row h-[40vh] mt-8">
        <img
          src={`/images/bg-1.jpg`}
          alt="image-1"
          className="w-full h-full object-cover"
        />
        <img
          src={`/images/bg-2.jpg`}
          alt="image-1"
          className="w-full h-full object-cover"
        />
        <img
          src={`/images/bg-3.jpg`}
          alt="image-1"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default FirstSlide;
