import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
  const navbarRef = useRef(null);
  const hasAnimated = useRef(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const location = useLocation();

  // Effect for setting the theme from localStorage on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.setAttribute("data-theme", savedTheme);
  }, []);

  // Function to toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    const loadScripts = () => {
      const scripts = [
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js",
      ];

      let scriptsLoaded = 0;

      scripts.forEach((src) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          scriptsLoaded++;
          if (scriptsLoaded === scripts.length) initAnimations();
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => {
          scriptsLoaded++;
          if (scriptsLoaded === scripts.length) {
            initAnimations();
          }
        };
        document.body.appendChild(script);
      });
    };

    const initAnimations = () => {
      if (hasAnimated.current || !window.gsap || !window.anime) return;
      hasAnimated.current = true;

      // Register ScrollTrigger
      window.gsap.registerPlugin(window.ScrollTrigger);

      // Navbar animation
      window.gsap.from(navbarRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Anime.js Hero title animation
      const textWrapper = document.querySelector(".hero-title");
      if (textWrapper && !textWrapper.querySelector(".letter")) {
        textWrapper.innerHTML = textWrapper.textContent.replace(
          /\S/g,
          "<span class='letter'>$&</span>"
        );
        window.anime.timeline({ loop: false }).add({
          targets: ".hero-title .letter",
          translateY: [-100, 0],
          opacity: [0, 1],
          easing: "easeOutExpo",
          duration: 1400,
          delay: (el, i) => 30 * i,
        });
      }

      // Other GSAP scroll animations
      window.gsap.from(".hero p, .cta-button", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        delay: 0.5,
        ease: "power3.out",
      });

      window.gsap.from(".featured-products h2", {
        scrollTrigger: {
          trigger: ".featured-products h2",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      window.gsap.from(".product-card", {
        scrollTrigger: {
          trigger: ".featured-products",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });

      window.gsap.from(".footer-content > *", {
        scrollTrigger: {
          trigger: ".footer",
          start: "top 95%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    };

    loadScripts();

    const handleScroll = () => {
      if (navbarRef.current) {
        if (window.scrollY > 50) {
          navbarRef.current.classList.add("scrolled");
        } else {
          navbarRef.current.classList.remove("scrolled");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Smooth scroll function
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70, // Offset for navbar
        behavior: "smooth",
      });
      setIsMenuOpen(false);
    }
  };

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&display=swap');
    
    /* --- Theme Variables --- */
 body[data-theme='light'] {
  --bg-color: #faf7f2; /* soft parchment */
  --text-color: #2c2c2c; /* deep gray */
  --nav-scroll-bg: rgba(250, 247, 242, 0.9);
  --card-bg: #ffffff;
  --card-shadow: rgba(0, 0, 0, 0.05);
  --card-hover-shadow: rgba(0, 0, 0, 0.1);
  --footer-bg: #2c2c2c;
  --footer-text: #f4f4f4;
  --accent-color-1: #b35c2e; /* soft terracotta */
  --accent-color-2: #d4b483; /* classic muted gold */
  --hero-text-color: #1a1a1a;
  --hero-overlay-bg: rgba(0, 0, 0, 0.3);
  --nav-link-color: #1a1a1a;
  --nav-scrolled-text: #2c2c2c;
  --hamburger-line-color: #2c2c2c;
  --hamburger-scrolled-line-color: #2c2c2c;
  --mobile-menu-bg: rgba(255, 255, 255, 0.95);
  --mobile-menu-text: #1a1a1a;
  --social-btn-before-bg: #ffffff;
  --social-icon-color: #2c2c2c;
}


body[data-theme='dark'] {
  --bg-color: #121212; /* near-black for depth */
  --text-color: #eaeaea; /* soft white */
  --nav-scroll-bg: rgba(18, 18, 18, 0.9);
  --card-bg: #1e1e1e;
  --card-shadow: rgba(0, 0, 0, 0.4);
  --card-hover-shadow: rgba(0, 0, 0, 0.6);
  --footer-bg: #0f0f0f;
  --footer-text: #eaeaea;
  --accent-color-1: #e67e22; /* warm amber */
  --accent-color-2: #cfa86a; /* antique gold */
  --hero-text-color: #ffffff;
  --hero-overlay-bg: rgba(0, 0, 0, 0.5);
  --nav-link-color: #eaeaea;
  --nav-scrolled-text: #eaeaea;
  --hamburger-line-color: #eaeaea;
  --hamburger-scrolled-line-color: #eaeaea;
  --mobile-menu-bg: rgba(24, 24, 24, 0.95);
  --mobile-menu-text: #eaeaea;
  --social-btn-before-bg: #1a1a1a;
  --social-icon-color: #eaeaea;
}

    /* --- End Theme Variables --- */

    html, body {
      margin: 0;
      padding: 0;
      font-family: 'Poppins', sans-serif;
      background-color: var(--bg-color);
      color: var(--text-color);
      transition: background-color 0.4s ease, color 0.4s ease;
      overflow-x: hidden;
    }

    #root, .home-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      box-sizing: border-box;
    }

    /* --- Disclaimer Banner --- */
    .disclaimer-banner {
      background-color: #111;
      color: #fff;
      text-align: center;
      padding: 0.5rem 1rem;
      font-size: 0.8rem;
      font-weight: 500;
      letter-spacing: 1px;
      z-index: 1001; /* Ensure it's above other content but below navbar */
      position: relative;
    }
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      position: fixed;
      top: 0; /* Will be adjusted if disclaimer is present */
      left: 0;
      width: 100%;
      z-index: 1000;
      transition: background-color 0.3s ease, box-shadow 0.3s ease,
        padding 0.3s ease, top 0.3s ease;
      box-sizing: border-box;
    }

    /* Adjust navbar top position based on disclaimer banner */
    body:has(.disclaimer-banner) .navbar {
      top: 36px; /* Adjust this value to match the height of your banner */
    }


    .navbar.scrolled {
      background-color: var(--nav-scroll-bg);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      padding: 0.5rem 2rem;
      top: 0; /* When scrolled, navbar sticks to the very top */
    }

 .logo {
  font-family: "Cinzel Decorative";
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--nav-link-color);
  transition: color 0.3s;
  z-index: 1001;
  display: flex;
  align-items: center;
  text-decoration: none;   /* 👈 remove underline */
}

.logo:hover {
  text-decoration: none;   /* 👈 also remove underline on hover */
}

.logo-text {
  margin-left: 0.5rem;     /* spacing between logo & text */
  text-decoration: none;   /* ensure span is clean */
  color: inherit;          /* inherits logo color */
}
}

    .logo-text {
      font-family: "Cinzel Decorative";
      font-size: 1.8rem;
      font-weight: 700;
      color: black;
      transition: color 0.3s;
    
    }

    .logo img {
      height: 40px;
      margin-right: 10px;
    }

    .nav-links {
      display: flex;
      gap: 2rem;
      align-items: center;
    }

    .nav-links a {
      text-decoration: none;
      color: var(--nav-link-color);
      font-weight: 600;
      position: relative;
      transition: color 0.3s;
    }

    .navbar.scrolled .logo,
    .navbar.scrolled .nav-links a {
      color: var(--nav-scrolled-text);
    }

    .nav-links a::after {
      content: "";
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -5px;
      left: 0;
      background-color: var(--accent-color-2);
      transition: width 0.3s;
    }

    .nav-links a:hover::after {
      width: 100%;
    }
.product-button {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.7rem 1.5rem;
  background-color: var(--accent-color-1);
  color: #fff;
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.product-button:hover {
  background-color: #d88c75;
  transform: translateY(-2px);
}

    /* --- Hamburger Menu Styles --- */
    .hamburger {
      display: none;
      cursor: pointer;
      z-index: 1001;
    }

    .hamburger input {
      display: none;
    }

    .hamburger svg {
      height: 2.5em;
      transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .line {
      fill: none;
      stroke: var(--hamburger-line-color);
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 3;
      transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
        stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1),
        stroke 0.3s ease;
    }
    .navbar.scrolled .line {
      stroke: var(--hamburger-scrolled-line-color);
    }

    .line-top-bottom {
      stroke-dasharray: 12 63;
    }

    .hamburger input:checked + svg {
      transform: rotate(-45deg);
    }

    .hamburger input:checked + svg .line-top-bottom {
      stroke-dasharray: 20 300;
      stroke-dashoffset: -32.42;
    }

    /* --- Mobile Menu --- */
    .mobile-menu {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: var(--mobile-menu-bg);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transform: translateX(100%);
      transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
      z-index: 999;
    }

    .mobile-menu.open {
      transform: translateX(0);
    }

    .mobile-menu a {
      text-decoration: none;
      color: var(--mobile-menu-text);
      font-size: 2rem;
      margin: 1.5rem 0;
      font-weight: 600;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.4s ease, transform 0.4s ease;
    }

    .mobile-menu.open a {
      opacity: 1;
      transform: translateY(0);
    }
    /* Staggered animation for mobile menu links */
    .mobile-menu.open a:nth-child(1) {
      transition-delay: 0.2s;
    }
    .mobile-menu.open a:nth-child(2) {
      transition-delay: 0.3s;
    }
    .mobile-menu.open a:nth-child(3) {
      transition-delay: 0.4s;
    }
    .mobile-menu.open a:nth-child(4) {
      transition-delay: 0.5s;
    }
    .mobile-menu.open a:nth-child(5) {
      transition-delay: 0.6s;
    }
    .mobile-menu.open a:nth-child(6) {
      transition-delay: 0.7s;
    }
    .mobile-menu.open a:nth-child(7) {
      transition-delay: 0.8s;
    }
    .hero {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: var(--hero-text-color);
      position: relative;
      overflow: hidden;
    }

    .hero-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: -2;
      filter: brightness(0.8);
    }

    .hero::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--hero-overlay-bg);
      z-index: -1;
    }

    .hero-title {
      font-family: "Cinzel Decorative", serif;
      font-size: 5rem;
      font-weight: 900;
      margin: 0;
      letter-spacing: 5px;
      text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
    }

    .hero p {
     font-family: serif;
      font-size: 1.5rem;
      margin: 1rem 0 2rem;
      max-width: 600px;
      text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
    }

    .cta-button {
      padding: 1rem 2.5rem;
      background-color: var(--accent-color-1);
      color: #fff;
      text-decoration: none;
      border-radius: 50px;
      font-weight: 600;
      transition: background-color 0.3s, transform 0.3s;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .cta-button:hover {
      background-color: #d88c75; /* Lighter shade of accent-1 */
      transform: translateY(-3px);
    }

    /* --- Featured Products Section --- */
    .featured-products {
      padding: 5rem 2rem;
      text-align: center;
    }

    .featured-products h2 {
      font-family: "Playfair Display", serif;
      font-size: 2.8rem;
      margin-bottom: 3rem;
      color: var(--text-color);
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2.5rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .product-card {
      background: var(--card-bg);
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 5px 15px var(--card-shadow);
      transition: transform 0.3s, box-shadow 0.3s;
      text-decoration: none;
      color: var(--text-color);
    }

    .product-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 30px var(--card-hover-shadow);
    }

    .product-image {
      width: 100%;
      height: 300px;
      object-fit: cover;
    }

    .product-info {
      padding: 1.5rem;
    }

    .product-info h3 {
      margin: 0 0 0.5rem;
      font-family: "Playfair Display", serif;
      font-size: 1.5rem;
    }

    .product-info p {
      margin: 0;
      color: var(--text-color);
      opacity: 0.8;
    }
    /* --- Footer Styles --- */
    :root {
      --footer-bg-light: #fffaf0; /* floralwhite */
      --footer-text-light: #0c0c0cff; /* Darker grey for contrast */
      --footer-accent: #b99a6b; /* Muted Gold */
      --footer-shadow-light: rgba(0 0 0 / 0.1);
      --glass-bg-light: rgba(255 255 255 / 0.6);
      --glass-border-light: rgba(255 255 255 / 0.7);
      --social-btn-shadow: rgba(0 0 0 / 0.15);
      --footer-border-light: rgba(0 0 0 / 0.1);
    }

    .footer {
      background: var(--footer-bg-light);
      backdrop-filter: blur(10px) saturate(130%);
      -webkit-backdrop-filter: blur(10px) saturate(130%);
      box-shadow: 0 4px 24px var(--footer-shadow-light);
      border-top: 1px solid var(--footer-border-light);
      color: var(--footer-text-light);
      text-align: center;
      padding: 5rem 2rem;
      gap: 10px;
      //  margin-top: 4rem;
      transition: background-color 0.5s ease, color 0.5s ease;
      font-family: "Poppins", sans-serif;
      letter-spacing: 0.3px;
      user-select: none;
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --footer-bg-dark: #12131f; /* Darker blue-black */
        --footer-text-dark: #fdf8f0; /* Parchment */
        --glass-bg-dark: rgba(30 30 30 / 0.25);
        --glass-border-dark: rgba(255 255 255 / 0.12);
        --footer-border-dark: rgba(255 255 255 / 0.12);
        --footer-shadow-dark: rgba(0 0 0 / 0.4);
      }

      .footer {
        background-color: var(--footer-bg-dark);
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        box-shadow: none;
        border-top: 1px solid var(--footer-border-dark);
        color: var(--footer-text-dark);
      }
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 2.5rem;
      max-width: 1200px;
      margin: 0 auto;
      text-align: left;
    }

    .footer-section h3 {
      font-size: 1.4rem;
      margin-bottom: 1rem;
      font-family: "Playfair Display", serif;
      color: var(--footer-accent);
      font-weight: 700;
      letter-spacing: 1.1px;
      text-transform: uppercase;
    }

    .footer-links li {
      list-style: none;
      margin-bottom: 0.6rem;
      position:relative;
      right:38px;
    }

    .footer-links a {
      color: var(--footer-text-light);
      text-decoration: none;
      opacity: 0.85;
      transition: opacity 0.25s ease, color 0.25s ease;
      font-weight: 500;
    }

    .footer-links a:hover {
      opacity: 1;
      color: var(--footer-accent);
      text-decoration: underline;
    }

    /* Visually hidden label for accessibility */
    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }

    .footer-newsletter input {
      width: 100%;
      padding: 1rem 1.1rem;
      border-radius: 10px;
      border: 1.2px solid var(--glass-border-light);
      background: var(--glass-bg-light);
      backdrop-filter: blur(12px) saturate(120%);
      -webkit-backdrop-filter: blur(12px) saturate(120%);
      color: var(--footer-text-light);
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: 0.3px;
      box-sizing: border-box;
      margin-bottom: 1rem;
      box-shadow: 0 2px 10px var(--footer-shadow-light);
      transition: all 0.3s ease;
    }

    .footer-newsletter input::placeholder {
      color: rgba(245, 244, 244, 0.5);
      font-weight: 400;
    }

    .footer-newsletter input:focus {
      outline: none;
      border-color: var(--footer-accent);
      background: rgba(255 255 255 / 0.8);
      box-shadow: 0 0 15px var(--footer-accent);
      color: var(--footer-text-light);
    }

    @media (prefers-color-scheme: dark) {
      .footer-newsletter input {
        background: var(--glass-bg-dark);
        border-color: var(--glass-border-dark);
        color: var(--footer-text-dark);
        box-shadow: 0 2px 12px var(--footer-shadow-dark);
      }
      .footer-newsletter input::placeholder {
        color: rgba(238, 238, 238, 0.5);
      }
      .footer-newsletter input:focus {
        border-color: var(--footer-accent);
        background: rgba(74, 144, 226, 0.25);
        box-shadow: 0 0 15px var(--footer-accent);
        color: var(--footer-text-dark);
      }
    }

    .footer-newsletter button {
      width: 100%;
      padding: 1rem;
      border-radius: 10px;
      border: 1.8px solid transparent;
      background: linear-gradient(145deg, #ffe5b4ce);
      color: #fff;
      font-size: 1.05rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 6px 14px rgba(74, 144, 226, 0.45);
      transition: all 0.3s ease;
      letter-spacing: 0.4px;
      text-transform: uppercase;
      user-select: none;
    }

    .footer-newsletter button:hover {
      background: #ffe5b4;
      box-shadow: 0 8px 18px rgba(53, 122, 189, 0.7);
      transform: translateY(-2px);
      color: #08080893;
      border-color: #285a8e;
    }

    .footer-newsletter button:active {
      transform: translateY(0);
      box-shadow: 0 4px 10px rgba(53, 122, 189, 0.35);
    }

    .social-links {
      display: flex;
      gap: 1.2rem;
      margin-top: 2rem;
      justify-content: center;
    }

    .social-links .button {
      cursor: pointer;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 1.5px solid rgba(255 255 255 / 0.3);
      background: var(--glass-bg-light);
      backdrop-filter: blur(12px) saturate(130%);
      -webkit-backdrop-filter: blur(12px) saturate(130%);
      box-shadow: 0 3px 10px var(--footer-shadow-light);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease,
        border-color 0.3s ease;
      user-select: none;
      position: relative;
      overflow: hidden;
    }

    @media (prefers-color-scheme: dark) {
      .social-links .button {
        background: var(--glass-bg-dark);
        border-color: rgba(255 255 255 / 0.15);
        box-shadow: 0 3px 14px var(--footer-shadow-dark);
      }
    }

    .social-links .button svg {
      width: 26px;
      height: 26px;
      color: var(--footer-text-light);
      filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.15));
      transition: color 0.3s ease;
      z-index: 10;
    }

    @media (prefers-color-scheme: dark) {
      .social-links .button svg {
        color: var(--footer-text-dark);
        filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.25));
      }
    }

    .social-links .button:hover {
      transform: scale(1.1) translateY(-3px);
      box-shadow: 0 8px 20px rgba(74, 144, 226, 0.35);
      border-color: var(--footer-accent);
    }

    .social-links .button:hover svg {
      color: var(--footer-accent);
    }

    .social-links .button:active {
      transform: scale(0.95);
      box-shadow: 0 4px 10px rgba(74, 144, 226, 0.25);
    }

    .footer-bottom {
      text-align: center;
      margin-top: 3rem;
      border-top: 1px solid rgba(0, 0, 0, 0.05);
      padding-top: 1.2rem;
      font-size: 0.9rem;
      color: var(--footer-text-light);
      user-select: none;
      letter-spacing: 0.2px;
    }

    @media (prefers-color-scheme: dark) {
      .footer-bottom {
        border-top-color: rgba(255 255 255 / 0.1);
        color: var(--footer-text-dark);
      }
    }

    /* Override link colors for Quick Links and Information sections */
    /* Override link colors for Quick Links and Information sections */
    .footer-section.footer-quick-links .footer-links a,
    .footer-section.footer-information .footer-links a {
      color: white;
      opacity: 0.85;
      font-weight: 500;
      text-decoration: none;
      transition: opacity 0.25s ease, color 0.25s ease;
    }

    .footer-section.footer-quick-links .footer-links a:hover,
    .footer-section.footer-information .footer-links a:hover {
      color: var(--footer-accent);
      opacity: 1;
      text-decoration: underline;
    }

    /* --- Media Queries --- */
    @media (max-width: 992px) {
      .nav-links {
        display: none;
      }
      .hamburger {
        display: block;
      }
      .hero-title {
        font-size: 3.5rem;
      }
      .hero p {
        font-size: 1.2rem;
      }
      
        a.logo-text {
  text-decoration: none;
}

    }

    @media (max-width: 576px) {
      .hero-title {
        font-size: 2.5rem;
      }
      .hero p {
        font-size: 1rem;
        padding: 0 1rem;
      }
      .cta-button {
        padding: 0.8rem 2rem;
        font-size: 0.9rem;
      }
      .featured-products {
        padding: 4rem 1rem;
      }
      .featured-products h2 {
        font-size: 2.2rem;
      }
    }
    .theme-toggle-wrapper {
      position: fixed;
      top: 1.5rem;
      right: 1.5rem;
      z-index: 1002; /* Ensure it's above the navbar */
    }
.App {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  font-family: Arial, sans-serif;
}

/* The <a> acts like the button */
.instagram-button {
  text-decoration: none;
}

.button-content {
  background: none;
  border: none;
  cursor: pointer;
  color: #ffffffff; /* Instagram color */
  transition: transform 0.2s, color 0.2s;
  padding: 10px;
}

.button-content:hover {
  transform: scale(1.2);
  color: #C13584; /* Slightly darker on hover */
}

    .theme-checkbox {
      --toggle-size: 12px;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      width: 6.25em;
      height: 3.125em;
      background: -webkit-gradient(
          linear,
          left top,
          right top,
          color-stop(50%, #efefef),
          color-stop(50%, #2a2a2a)
        )
        no-repeat;
      background: -o-linear-gradient(left, #efefef 50%, #2a2a2a 50%) no-repeat;
      background: linear-gradient(to right, #efefef 50%, #2a2a2a 50%) no-repeat;
      background-size: 205%;
      background-position: 0;
      -webkit-transition: 0.4s;
      -o-transition: 0.4s;
      transition: 0.4s;
      border-radius: 99em;
      position: relative;
      cursor: pointer;
      font-size: var(--toggle-size);
    }

    .theme-checkbox::before {
      content: "";
      width: 2.25em;
      height: 2.25em;
      position: absolute;
      top: 0.438em;
      left: 0.438em;
      background: -webkit-gradient(
          linear,
          left top,
          right top,
          color-stop(50%, #efefef),
          color-stop(50%, #2a2a2a)
        )
        no-repeat;
      background: -o-linear-gradient(left, #efefef 50%, #2a2a2a 50%) no-repeat;
      background: linear-gradient(to right, #efefef 50%, #2a2a2a 50%) no-repeat;
      background-size: 205%;
      background-position: 100%;
      border-radius: 50%;
      -webkit-transition: 0.4s;
      -o-transition: 0.4s;
      transition: 0.4s;
    }

    .theme-checkbox:checked::before {
      left: calc(100% - 2.25em - 0.438em);
      background-position: 0;
    }

    .theme-checkbox:checked {
      background-position: 100%;
    }
    /* Base styles (mobile-first) = up to 375px */
/* Already covered by your default CSS */

/* Small devices: ≥ 376px to 575px (slightly larger phones) */
@media (min-width: 376px) and (max-width: 575px) {
  .hero-title {
    font-size: 2.2rem;
  }
  .hero p {
    font-size: 1rem;
    padding: 0 1rem;
  }
  .cta-button {
    font-size: 0.85rem;
    padding: 0.7rem 1.8rem;
  }
}

/* Medium devices: ≥ 576px to 767px (large phones & phablets) */
@media (min-width: 576px) and (max-width: 767px) {
  .hero-title {
    font-size: 2.6rem;
  }
  .hero p {
    font-size: 1.1rem;
  }
  .product-grid {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
}

/* Tablets: ≥ 768px to 991px */
@media (min-width: 768px) and (max-width: 991px) {
  .hero-title {
    font-size: 3.2rem;
  }
  .hero p {
    font-size: 1.3rem;
  }
  .featured-products {
    padding: 4rem 2rem;
  }
  .nav-links {
    gap: 1.5rem;
  }
}

/* Small laptops: ≥ 992px to 1199px */
@media (min-width: 992px) and (max-width: 1199px) {
  .hero-title {
    font-size: 4rem;
  }
  .hero p {
    font-size: 1.4rem;
  }
  .product-grid {
    gap: 2rem;
  }
}

/* Desktops: ≥ 1200px to 1439px */
@media (min-width: 1200px) and (max-width: 1439px) {
  .hero-title {
    font-size: 4.5rem;
  }
  .hero p {
    font-size: 1.5rem;
  }
  .featured-products h2 {
    font-size: 2.5rem;
  }
}

/* Large Desktops: ≥ 1440px and above */
@media (min-width: 1440px) {
  .hero-title {
    font-size: 5rem;
  }
  .hero p {
    font-size: 1.6rem;
    max-width: 700px;
  }
  .featured-products h2 {
    font-size: 3rem;
  }
  .product-grid {
    max-width: 1400px;
  }
}


  `;

  return (
    <>
      <style>{styles}</style>
      <div className="home-container">
        {/* <div className="disclaimer-banner">āś
          This is a project website for educational purposes only.
        </div> */}
        <nav ref={navbarRef} className="navbar">
          <Link to="/" className="logo">
            <img
              src={`${process.env.PUBLIC_URL}/logo.png`}
              alt="PathToPage Logo"
            />
            <span className="logo-text">PathToPage</span>
          </Link>

          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About</Link>
            <Link to="/cart">Cart</Link>

            <Link to="/Wishlist">Wishlist</Link>
            <Link to="/Myaccount">Profile</Link>
          </div>
          <label className="hamburger">
            <input
              type="checkbox"
              checked={isMenuOpen}
              onChange={() => setIsMenuOpen(!isMenuOpen)}
            />
            <svg viewBox="0 0 32 32">
              <path
                className="line line-top-bottom"
                d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
              ></path>
              <path className="line" d="M7 16 27 16"></path>
            </svg>
          </label>
        </nav>
        <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/shop" onClick={() => setIsMenuOpen(false)}>
            Shop
          </Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
          <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
            Cart
          </Link>

          <Link to="/Wishlist" onClick={() => setIsMenuOpen(false)}>
            Wishlist
          </Link>
          <Link to="/Myaccount" onClick={() => setIsMenuOpen(false)}>
            My Account
          </Link>
        </div>

        {/* <div className="theme-toggle-wrapper">
          <input
            type="checkbox"
            className="theme-checkbox"
            id="theme-toggle"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
        </div> */}
        <header className="hero">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hero-background"
            src="https://videos.pexels.com/video-files/6074191/6074191-uhd_2732_1440_25fps.mp4"
          ></video>
          <h1 className="hero-title">PathToPages</h1>
          <p>
            From snapshots to stories—keep your travel memories alive in a
            journal made for your adventures.
          </p>
          {/* <Link to="/shop" className="cta-button">
            Explore Collections
          </Link> */}
        </header>
        <main>
          {/* <section id="featured" className="featured-products">
            <h2>Featured Products</h2>
            <div className="product-grid">
              <Link to="/Journal" className="product-card">
                <img
                  src="https://i.pinimg.com/736x/e0/62/01/e06201d44f84f51fceb8fc621d690740.jpg"
                  alt="The Wanderer's Journal"
                  className="product-image"
                />
                <div className="product-info">
                  <h3>The Wanderer's Journal</h3>
                  <p>A handcrafted leather journal for your adventures.</p>
                </div>
              </Link>
              <Link to="/Bookmark" className="product-card">
                <img
                  src="https://i.pinimg.com/1200x/95/37/4a/95374a33b9561048e09172d1a93be3ff.jpg"
                  alt="Vintage Bookmarks"
                  className="product-image"
                />
                <div className="product-info">
                  <h3>Vintage Bookmarks</h3>
                  <p>A collection of unique, handcrafted bookmarks.</p>
                </div>
              </Link>
              <Link to="/Potli" className="product-card">
                <img
                  src="https://i.pinimg.com/1200x/4d/19/7d/4d197d92d0d727744b98a94773410cf2.jpg"
                  alt="Artisan Potli Bag"
                  className="product-image"
                />
                <div className="product-info">
                  <h3>Artisan Potli Bag</h3>
                  <p>Hand-stitched cloth bag for your travel essentials.</p>
                </div>
              </Link>
            </div>
          </section> */}
        </main>
        <main>
          <section id="featured" className="featured-products">
            <h2>Products</h2>
            <div className="product-grid">
              {/* Journal */}
              <div className="product-card">
                <img
                  src="https://i.pinimg.com/736x/e0/62/01/e06201d44f84f51fceb8fc621d690740.jpg"
                  alt="The Wanderer's Journal"
                  className="product-image"
                />
                <div className="product-info">
                  <h3>The Wanderer's Journal</h3>
                  {/* <p>A handcrafted leather journal for your adventures.</p> */}
                  <Link to="/Journal" className="product-button">
                    View Journal
                  </Link>
                </div>
              </div>

              {/* Bookmark */}
              <div className="product-card">
                <img
                  src="https://i.pinimg.com/1200x/95/37/4a/95374a33b9561048e09172d1a93be3ff.jpg"
                  alt="Vintage Bookmarks"
                  className="product-image"
                />
                <div className="product-info">
                  <h3>Vintage Bookmarks</h3>
                  {/* <p>A collection of unique, handcrafted bookmarks.</p> */}
                  <Link to="/Bookmark" className="product-button">
                    View Bookmark
                  </Link>
                </div>
              </div>

              {/* Potli */}
              {/* <div className="product-card">
                <img
                  src="https://i.pinimg.com/1200x/4d/19/7d/4d197d92d0d727744b98a94773410cf2.jpg"
                  alt="Artisan Potli Bag"
                  className="product-image"
                />
                <div className="product-info">
                  <h3>Artisan Potli Bag</h3>
                  <p>Hand-stitched cloth bag for your travel essentials.</p>
                  <Link to="/Potli" className="product-button">
                    View Potli
                  </Link>
                </div>
              </div> */}
            </div>
          </section>
        </main>
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section footer-quick-links">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li>
                  {/* This is the updated link for Shop */}
                  <Link to="/">Home</Link>
                </li>
                <li>
                  {/* This is the updated link for Shop */}
                  <Link to="/shop">Shop</Link>
                </li>
                <li>
                  {/* This is the updated link for About */}
                  <Link to="/about">About</Link>
                </li>
                <li>
                  {/* This is the updated link for Contact, now navigating to Myaccount */}
                  <Link to="/myaccount">MyAccount</Link>
                </li>
              </ul>
            </div>
            <div className="footer-section footer-information">
              <h3>Information</h3>
              <ul className="footer-links">
                <li>
                  <a
                    href="#shipping"
                    onClick={(e) => handleSmoothScroll(e, "shipping")}
                  >
                    Shipping & Returns
                  </a>
                </li>
                <li>
                  <a
                    href="#privacy"
                    onClick={(e) => handleSmoothScroll(e, "privacy")}
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#terms"
                    onClick={(e) => handleSmoothScroll(e, "terms")}
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-section footer-contact">
              <h3>Contact Us</h3>
              <p>Email: Pathtopages@gmail.com</p>
              <p>Phone: +91 8019418800</p>
              <p>Address: Telangana, India </p>
              <div className="social-links flex space-x-4">
                {/* Instagram Button */}
                <a
                  href="https://www.instagram.com/pathtopages"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <button
                    className="button-content hover:text-pink-500 transition-transform transform hover:scale-110"
                    aria-label="Instagram"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 448 512"
                      width="40"
                      height="40"
                    >
                      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9S160.5 370.8 224.1 370.8 339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8s-26.8-12-26.8-26.8 12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.2-26.2 26.2-34.4 58-36.2 93.9-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9 26.2 26.2 58 34.4 93.9 36.2 37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                    </svg>
                  </button>
                </a>

                {/* Threads Button */}
                <a
                  href="https://www.threads.net/@pathtopages"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Threads"
                >
                  <button
                    className="button-content hover:text-black transition-transform transform hover:scale-110"
                    aria-label="Threads"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                      width="40"
                      height="40"
                    >
                      <path d="M256 32C132.3 32 32 132.3 32 256s100.3 224 224 224 224-100.3 224-224S379.7 32 256 32zm63.2 319.7c-22.4 0-39.8-10.8-52.7-33.3-9.8 20.2-27.4 33.3-50.8 33.3-34.8 0-60.3-28.1-60.3-66.4 0-40.1 27.3-67.8 69.1-67.8 6.1 0 11.9.6 17.2 1.7 9.4-25.7 26.7-41.2 50.8-41.2 22.6 0 39.6 12.8 50 37.2 8.9 20.4 12.6 46.5 12.6 75.6 0 27.9-4.1 52.3-12.2 71.7-10.3 24.3-27.2 37.2-48.7 37.2zm-61.2-101.8c-7.4-1.6-15.4-2.4-24-2.4-22.9 0-37.2 13.3-37.2 35.2 0 19.9 11.7 33.5 28.8 33.5 19.2 0 32.7-15.7 32.7-39.9v-26.4c0-.1-.1-.1-.3 0z" />
                    </svg>
                  </button>
                </a>

                {/* WhatsApp Button */}
                <a
                  href="https://wa.me/918019418800" // replace with your WhatsApp number
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <button
                    className="button-content hover:text-green-500 transition-transform transform hover:scale-110"
                    aria-label="WhatsApp"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 448 512"
                      width="40"
                      height="40"
                    >
                      <path d="M380.9 97.1C339 55.1 283.2 32 224.3 32 106.8 32 10 128.8 10 246.3c0 43.4 11.5 85.7 33.4 122.9L0 480l115.8-42.9c35.3 19.3 74.7 29.5 114.5 29.5h.1c117.5 0 214.3-96.8 214.3-214.3 0-58.8-23.1-114.6-63.8-155.2zM224.4 426.3h-.1c-35.4 0-70.2-9.5-100.5-27.5l-7.2-4.3-68.7 25.5 25.8-66.9-4.7-7.4C53.8 319.5 44.4 283.8 44.4 246.4c0-99.3 80.8-180.1 180.1-180.1 48.1 0 93.3 18.7 127.3 52.7 34 34 52.7 79.2 52.7 127.3 0 99.3-80.8 180-180.1 180zM308.2 301c-5.1-2.6-30.2-14.9-34.9-16.6-4.7-1.7-8.1-2.6-11.6 2.6-3.4 5.1-13.3 16.6-16.3 20-3 3.4-6 3.9-11.1 1.3-5.1-2.6-21.5-7.9-41-25.2-15.2-13.5-25.5-30.2-28.5-35.3-3-5.1-.3-7.8 2.3-10.4 2.3-2.3 5.1-6 7.6-9s3.4-5.1 5.1-8.6c1.7-3.4.9-6.4-.4-9-1.3-2.6-11.6-27.9-15.9-38.2-4.2-10.1-8.5-8.7-11.6-8.9-3-.2-6.4-.2-9.8-.2s-9 1.3-13.8 6.4c-4.7 5.1-18.1 17.7-18.1 43.1s18.5 50 21 53.4c2.6 3.4 36.4 55.7 88.3 78.1 12.3 5.3 21.9 8.4 29.3 10.7 12.3 3.9 23.5 3.4 32.4 2.1 9.9-1.5 30.2-12.3 34.5-24.2 4.3-11.9 4.3-22.1 3-24.2-1.3-2.1-4.7-3.4-9.8-6z" />
                    </svg>
                  </button>
                </a>
              </div>
            </div>
            <div className="footer-section footer-newsletter">
              <h3>Stay Connected</h3>
              <p>Subscribe to our newsletter for exclusive updates.</p>
              <form>
                <label htmlFor="newsletter-email" className="visually-hidden">
                  Enter your email for the newsletter
                </label>
                <input
                  type="email"
                  id="newsletter-email"
                  placeholder="Enter your email"
                />
                <button type="submit" aria-label="Subscribe to newsletter">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Path to page. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
