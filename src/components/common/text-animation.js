"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CodePenChallenge = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const slidebarRef = useRef(null);
  const barRef = useRef(null);
  const textOneRef = useRef(null);
  const textTwoRef = useRef(null);
  const textOneH1Ref = useRef(null);
  const textTwoH1Ref = useRef(null);

  // Handle dark/light mode toggle
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.style.setProperty("--text-color", "#181717");
      root.style.setProperty("--element-color", "#f1eaea");
    } else {
      root.style.setProperty("--text-color", "#ffffff");
      root.style.setProperty("--element-color", "#181717");
    }
  }, [isDarkMode]);

  // GSAP animations setup
  useEffect(() => {
    const slidebar = slidebarRef.current;
    const bar = barRef.current;
    const textOne = textOneRef.current;
    const textTwo = textTwoRef.current;
    const textOneH1 = textOneH1Ref.current;
    const textTwoH1 = textTwoH1Ref.current;

    // Initial setup
    gsap.set(textOne, { clipPath: "polygon(0 0, 18% 0, 8% 100%, 0% 100%)" });
    gsap.set(textTwo, {
      clipPath: "polygon(0 0, 18% 0, 8% 100%, 0% 100%)",
      opacity: 0,
    });
    gsap.set(bar, { scaleY: 0.1 });

    // Animation timeline
    const mainTL = gsap.timeline({
      repeat: -1,
      onRepeat: () => {
        // Reset everything for next cycle
        gsap.set(textOne, {
          clipPath: "polygon(0 0, 18% 0, 8% 100%, 0% 100%)",
          opacity: 1,
        });
        gsap.set(textTwo, {
          clipPath: "polygon(0 0, 18% 0, 8% 100%, 0% 100%)",
          opacity: 0,
        });
        gsap.set(bar, { scaleY: 0.1 });
      },
    });

    mainTL
      // Grow the bar
      .to(bar, {
        duration: 1,
        y: 125, // Reduced to fit smaller container
        scaleY: 0.7, // Reduced scale
        ease: "back.out",
      })

      // 1. Bar swipes left to right, first text is displayed
      .to(slidebar, {
        duration: 1.5,
        x: 400, // Reduced from 600 to fit smaller container
        delay: 0.5,
        ease: "back.inOut(0.8)",
      })
      .to(
        textOne,
        {
          duration: 1.5,
          clipPath: "polygon(0 0, 91% 0, 81% 100%, 0% 100%)",
          ease: "back.inOut(0.8)",
        },
        "<"
      ) // Sync with bar movement

      // 2. Bar swipes right to left, first text is erased
      .to(slidebar, {
        duration: 1.5,
        x: 0,
        delay: 0.5,
        ease: "back.inOut(0.8)",
      })
      .to(
        textOne,
        {
          duration: 1.5,
          clipPath: "polygon(0 0, 18% 0, 8% 100%, 0% 100%)",
          ease: "back.inOut(0.8)",
          onComplete: () => {
            // Hide first text completely and prepare second text
            gsap.set(textOne, { opacity: 0 });
            gsap.set(textTwo, { opacity: 1 });
          },
        },
        "<"
      ) // Sync with bar movement

      // 3. Bar swipes left to right again, second text is displayed
      .to(slidebar, {
        duration: 1.5,
        x: 400, // Reduced from 600 to fit smaller container
        delay: 0.5,
        ease: "back.inOut(0.8)",
      })
      .to(
        textTwo,
        {
          duration: 1.5,
          clipPath: "polygon(0 0, 91% 0, 81% 100%, 0% 100%)",
          ease: "back.inOut(0.8)",
        },
        "<"
      ) // Sync with bar movement

      // 4. Bar swipes right to left, second text is erased
      .to(slidebar, {
        duration: 1.5,
        x: 0,
        delay: 0.5,
        ease: "back.inOut(0.8)",
      })
      .to(
        textTwo,
        {
          duration: 1.5,
          clipPath: "polygon(0 0, 18% 0, 8% 100%, 0% 100%)",
          ease: "back.inOut(0.8)",
        },
        "<"
      ) // Sync with bar movement

      // Shrink the bar to complete the sequence
      .to(bar, {
        duration: 1,
        y: 225, // Adjusted from 500 to fit smaller container
        scaleY: 0.1,
        ease: "back.in",
      });

    return () => {
      mainTL.kill();
    };
  }, []);

  return (
    <div className="container">
      <div ref={slidebarRef} className="slide-bar">
        <div ref={barRef} className="bar" />
      </div>

      <div ref={textOneRef} className="text-block text-one">
        <h1 ref={textOneH1Ref}>Faith in action</h1>
      </div>

      <div ref={textTwoRef} className="text-block text-two">
        <h1 ref={textTwoH1Ref}>Love in motion</h1>
      </div>

      <button
        className="change-btn"
        onClick={() => setIsDarkMode(!isDarkMode)}
        aria-label="Toggle color mode"
      >
        &nbsp;
      </button>

      <style jsx global>{`
        :root {
          --text-color: #ffffff;
          --element-color: #181717;
        }

        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }

        body {
          height: 100vh;
          display: grid;
          place-items: center;
          background-color: transparent;
        }

        .container {
          width: 100%;
          max-width: 600px;
          height: 250px;
          position: relative;
          overflow: hidden;
        }

        .slide-bar {
          position: absolute;
          top: 50%;
          left: 80px; /* Adjusted from 100px to provide more space for animation */
          transform: translateY(-50%) rotateZ(15deg);
          width: 8px; /* Slightly thinner to maintain proportions */
          height: 400px; /* Reduced from 600px to fit smaller container */
          z-index: 10;
        }

        .bar {
          width: 100%;
          height: 130px; /* Reduced from 100px to maintain proportions */
          border-radius: 100px;
          background-color: #ffffff;
        }

        .text-block {
          position: absolute;
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          background-color: transparent;
        }

        .text-block h1 {
          font-family: "Raleway", sans-serif;
          font-size: 2.5rem; /* Reduced from 3rem to fit better in smaller container */
          font-weight: 800;
          font-style: italic;
          letter-spacing: 2px;
          position: relative;
          perspective: 500px;
          transform-style: preserve-3d;
          color: var(--text-color);
        }

        .text-block h1::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 70px; /* Reduced from 100px */
          left: 0;
          background: radial-gradient(var(--element-color), transparent 70%);
          transform: translateY(70px) rotateX(-60deg); /* Adjusted from 100px */
          opacity: 0.3;
        }

        .text-one {
          z-index: 6;
        }

        .text-two {
          z-index: 5;
        }

        .change-btn {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 3px solid var(--element-color);
          background-color: transparent;
          position: fixed;
          bottom: 20%;
          left: 50%;
          transform: translateX(-50%);
          cursor: pointer;
          opacity: 0.4;
          transition: opacity 0.3s;
        }

        .change-btn:hover {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default CodePenChallenge;
