"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { YoutubeIcon, TwitterIcon, FacebookIcon } from "../Icons";
import siteMetadata from "@/src/utils/siteMetaData";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Header = () => {
  const [click, setClick] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // State to track scroll
  const headerRef = useRef(null);
  const pathname = usePathname();

  // NavLink component for active state styling
  const NavLink = ({ href, children, className = "" }) => {
    const isActive = pathname === href;
    const activeClasses = isActive 
      ? `border-b-2 ${isScrolled ? 'border-dark' : 'border-light'}` 
      : '';
    
    return (
      <Link 
        href={href} 
        className={`${className} ${activeClasses} transition-all ease duration-200 pb-1`}
      >
        {children}
      </Link>
    );
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header || typeof window === "undefined") return;

    let headerAnimation;
    const initAnimation = () => {
      gsap.set(header, {
        backgroundColor: "transparent",
      });

      headerAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "80px",
          scrub: 0.2,
          onUpdate: (self) => {
            setIsScrolled(self.progress > 0);
          },
        },
      });

      headerAnimation.to(header, {
        backgroundColor: "white",
        duration: 0.3,
        ease: "none",
      });
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(initAnimation, 100);

    return () => {
      clearTimeout(timeoutId);
      if (headerAnimation?.scrollTrigger) {
        headerAnimation.scrollTrigger.kill();
      }
    };
  }, []);

  const toggle = () => {
    setClick(!click);
  };

  return (
    <header
      ref={headerRef}
      className="w-full p-4 px-5 sm:px-10 flex items-center justify-between fixed top-0 left-0 right-0 z-50"
    >
      <Logo />

      <button
        className="inline-block sm:hidden z-50"
        onClick={toggle}
        aria-label="Hamburger Menu"
      >
        <div className="w-6 cursor-pointer transition-all ease duration-300">
          <div className="relative">
            <span
              className={`absolute top-0 inline-block w-full h-0.5 rounded transition-all ease duration-200 ${
                isScrolled ? "bg-dark" : "bg-light"
              }`}
              style={{
                transform: click
                  ? "rotate(-45deg) translateY(0)"
                  : "rotate(0deg) translateY(6px)",
              }}
            >
              &nbsp;
            </span>
            <span
              className={`absolute top-0 inline-block w-full h-0.5 rounded transition-all ease duration-200 ${
                isScrolled ? "bg-dark" : "bg-light"
              }`}
              style={{
                opacity: click ? 0 : 1,
              }}
            >
              &nbsp;
            </span>
            <span
              className={`absolute top-0 inline-block w-full h-0.5 rounded transition-all ease duration-200 ${
                isScrolled ? "bg-dark" : "bg-light"
              }`}
              style={{
                transform: click
                  ? "rotate(45deg) translateY(0)"
                  : "rotate(0deg) translateY(-6px)",
              }}
            >
              &nbsp;
            </span>
          </div>
        </div>
      </button>

      {/* Mobile navigation */}
      <nav
        className={`w-max py-3 px-6 sm:px-8 border border-solid border-dark rounded-full font-medium capitalize items-center flex sm:hidden
        fixed top-0 right-1/2 translate-x-1/2 bg-light/80 backdrop-blur-sm z-50
        transition-all ease duration-300 text-sm ${
          isScrolled ? "text-dark" : "text-light"
        }`}
        style={{
          top: click ? "4rem" : "-5rem",
        }}
        onClick={() => setClick(false)}
      >
        <NavLink href="/" className="mr-2">
          Home
        </NavLink>
        <NavLink href="/about" className="mx-2">
          About
        </NavLink>
        {/* <NavLink href="/contact" className="mx-2">
          Contact
        </NavLink> */}
        <NavLink href="/get-involved" className="mx-2">
          Get Involved
        </NavLink>
        <NavLink href="/resources" className="mx-2">
          Resources
        </NavLink>
      </nav>
      {/* Desktop navigation */}
      <nav
        className={`w-max py-3 px-8 font-medium capitalize items-center hidden sm:flex text-sm ${
          isScrolled ? "text-dark" : "text-light"
        }`}
      >
        <NavLink href="/" className="mr-2">
          Home
        </NavLink>
        <NavLink href="/about" className="mx-2">
          About
        </NavLink>
        <NavLink href="/get-involved" className="mx-2">
          Get Involved
        </NavLink>
        <NavLink href="/resources" className="mx-2">
          Resources
        </NavLink>
        <NavLink href="/donate" className="mx-2">
          Donate
        </NavLink>
        <NavLink href="/blogs" className="mx-2">
          Blogs
        </NavLink>
      </nav>

      {/* Social media icons */}
      <div className="hidden sm:flex items-center">
        <a
          href={siteMetadata.facebook}
          rel="noopener noreferrer"
          className="inline-block w-6 h-6 mr-4"
          aria-label="Follow The James Foundation on Facebook"
          target="_blank"
        >
          <FacebookIcon
            className={`hover:scale-125 transition-all ease duration-200 ${
              isScrolled ? "text-dark" : "text-light"
            }`}
          />
        </a>
        <a
          href={siteMetadata.twitter}
          rel="noopener noreferrer"
          className="inline-block w-6 h-6 mr-4"
          aria-label="Follow The James Foundation on Twitter"
          target="_blank"
        >
          <TwitterIcon
            className={`hover:scale-125 transition-all ease duration-200 ${
              isScrolled ? "text-dark" : "text-light"
            }`}
          />
        </a>
        <a
          href={siteMetadata.youtube}
          rel="noopener noreferrer"
          className="inline-block w-6 h-6 mr-4"
          aria-label="Subscribe to The James Foundation on YouTube"
          target="_blank"
        >
          <YoutubeIcon
            className={`hover:scale-125 transition-all ease duration-200 ${
              isScrolled ? "text-dark" : "text-light"
            }`}
          />
        </a>
      </div>
    </header>
  );
};

export default Header;
