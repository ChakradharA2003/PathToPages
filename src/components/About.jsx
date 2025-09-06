import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

const About = () => {
  const hasAnimated = useRef(false);
  const [theme, setTheme] = useState("light");

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
    // A single function to load all necessary animation libraries from a CDN.
    const loadScripts = () => {
      // Modern, widely-used public CDN links for better reliability and performance
      const scripts = [
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/js/all.min.js",
      ];
      let scriptsLoaded = 0;

      scripts.forEach((src) => {
        // Prevent adding duplicate scripts to the DOM
        if (document.querySelector(`script[src="${src}"]`)) {
          scriptsLoaded++;
          if (scriptsLoaded === scripts.length) initAnimations();
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        // Removing the crossOrigin attribute to avoid potential CORS issues
        script.onload = () => {
          scriptsLoaded++;
          if (scriptsLoaded === scripts.length) {
            initAnimations();
          }
        };
        document.body.appendChild(script);
      });
    };

    // Initializes all the animations once the libraries are loaded.
    const initAnimations = () => {
      // Check if GSAP is available before proceeding.
      if (hasAnimated.current || !window.gsap) return;
      hasAnimated.current = true;

      window.gsap.registerPlugin(window.ScrollTrigger);

      // Animate header text with a simple, performant fade-in
      window.gsap.from(".about-header h1, .about-header p", {
        scrollTrigger: {
          trigger: ".about-header",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
      });

      // Animate timeline items with a subtle, efficient fade-in from the side
      const items = document.querySelectorAll(".timeline-item");

      items.forEach((item, index) => {
        const content = item.querySelector(".timeline-content");
        const isLeft = item.classList.contains("left");

        window.gsap.from(content, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%", // Start animation when item is 85% from the top
            toggleActions: "play none none none",
          },
          x: isLeft ? -100 : 100, // Move from left or right
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: index * 0.1, // Stagger the animations
        });
      });
    };

    loadScripts();
  }, []);

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap');
    
    /* --- Theme Variables --- */
    body[data-theme='light'] {
        --about-bg-color: #fdf8f0; /* Parchment paper */
        --about-text-color: #5c544b; /* Dark Taupe */
        --about-container-bg: rgba(255, 255, 255, 0.7);
        --about-container-border: #e0dccc;
        --about-header-color: #5c544b;
        --about-subheader-color: #9a8c82;
        --about-accent-color: #b99a6b; /* Muted Gold */
        --about-divider-color: rgba(185, 154, 107, 0.75);
        --about-back-btn-border-color: #5c544b;
        --about-back-btn-arrow-color: #5c544b;
        --about-back-btn-hover-border: #b99a6b;
        --timeline-bg: #e0dccc;
        --timeline-card-bg: #ffffff;
        --timeline-point-bg: #b99a6b;
        --timeline-glow-1: #b99a6b;
        --timeline-glow-2: #81b29a;
    }

    body[data-theme='dark'] {
        --about-bg-color: #000000; /* True black */
        --about-text-color: #e0e0e0; /* Off-white for better contrast */
        --about-container-bg: rgba(0, 0, 0, 0.7); /* True black with transparency */
        --about-container-border: #333333;
        --about-header-color: #ffffff; /* White */
        --about-subheader-color: #cccccc;
        --about-accent-color: #e07a5f; /* Terracotta */
        --about-divider-color: rgba(224, 122, 95, 0.75);
        --about-back-btn-border-color: #e0e0e0;
        --about-back-btn-arrow-color: #e0e0e0;
        --about-back-btn-hover-border: #e07a5f;
        --timeline-bg: #222222;
        --timeline-card-bg: #111111; /* Darker black for card background */
        --timeline-point-bg: #e07a5f;
        --timeline-glow-1: #e07a5f;
        --timeline-glow-2: #81b29a;
    }
    /* --- End Theme Variables --- */

    .about-page {
      font-family: 'Poppins', sans-serif;
      background-color: var(--about-bg-color);
      padding: 6rem 2rem 2rem; /* Increased top padding */
      min-height: 100vh;
      color: var(--about-text-color);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      transition: background-color 0.4s ease, color 0.4s ease;
      width: 100%;
      box-sizing: border-box;
      overflow-x: hidden;
    }
    
    /* --- Top Controls --- */
    .about-top-left {
        position: fixed;
        top: 2rem;
        left: 2rem;
        z-index: 1002;
    }

    .about-top-right {
        position: fixed;
        top: 2rem;
        right: 2rem;
        z-index: 1002;
        display: flex;
        align-items: center;
        gap: 1rem;
    }


    .about-container {
      width: 100%;
      max-width: 1100px;
      margin: 0 auto;
      background: var(--about-container-bg);
      backdrop-filter: blur(5px);
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.1);
      border: 1px solid var(--about-container-border);
      transition: background-color 0.4s ease, border-color 0.4s ease;
      box-sizing: border-box;
    }

    .about-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .about-header h1 {
      font-family: 'Playfair Display', serif;
      font-size: 2.2rem;
      color: var(--about-header-color);
      margin: 0;
      font-weight: normal;
      transition: color 0.4s ease;
    }
    
    .about-header p {
      font-size: 1rem;
      color: var(--about-subheader-color);
      margin-top: 0.5rem;
      transition: color 0.4s ease;
    }
    
    .divider {
        border: 0;
        height: 1px;
        background-image: linear-gradient(to right, rgba(0,0,0,0), var(--about-divider-color), rgba(0,0,0,0));
        margin: 2rem 0;
    }
    
    /* --- Timeline Section --- */
    .timeline-section {
        padding: 2rem 0;
    }

    .timeline-container {
      position: relative;
      width: 100%;
      max-width: 900px;
      margin: 0 auto;
    }

    .timeline-container::after {
      content: '';
      position: absolute;
      width: 4px;
      background-color: var(--timeline-bg);
      top: 0;
      bottom: 0;
      left: 50%;
      margin-left: -2px;
      z-index: 1;
      transition: background-color 0.4s ease;
    }

    .timeline-item {
      padding: 10px 40px;
      position: relative;
      background-color: inherit;
      width: 50%;
      box-sizing: border-box;
      z-index: 2;
      contain: layout; /* Hint to the browser for better rendering performance */
    }

    .timeline-item.left {
      left: 0;
      padding-right: 25px;
    }

    .timeline-item.right {
      left: 50%;
      padding-left: 25px;
    }

    .timeline-item::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      right: -10px;
      background-color: var(--timeline-point-bg);
      border: 4px solid var(--about-bg-color);
      top: 15px;
      border-radius: 50%;
      z-index: 2;
      transition: background-color 0.4s ease, border-color 0.4s ease;
    }

    .timeline-item.right::after {
      left: -10px;
    }

    .timeline-content {
      padding: 3px; /* The border thickness */
      background-color: transparent;
      position: relative;
      border-radius: 0; /* Making the box square */
    }
    
    .timeline-content::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        padding: 3px; /* The border thickness */
        background: conic-gradient(from var(--gradient-angle), var(--timeline-glow-1), var(--timeline-glow-2), var(--timeline-glow-1));
        -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        animation:-rotate 4s linear infinite;
        opacity: 0.5;
        transition: opacity 0.3s;
    }
    
    .timeline-content:hover::before {
        opacity: 1;
    }
    
    .timeline-content-inner {
        padding: 15px; /* Reduced padding */
        background: var(--timeline-card-bg);
        border-radius: 0; /* Making the box square */
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        height: auto; /* Allows the box to grow with the content */
    }
    
    .timeline-content-inner p {
        margin: 0;
        line-height: 1.5; /* Slightly reduced line height */
        font-size: 0.9rem; /* Reduced font size */
    }
    
    @keyframes -rotate {
      to { --gradient-angle: 360deg; }
    }

    .timeline-content h2 {
        margin-top: 0;
        font-family: 'Playfair Display', serif;
        color: var(--about-accent-color);
        display: flex;
        align-items: center;
        gap: 8px; /* Reduced gap */
        margin-bottom: 0.75rem; /* Reduced margin */
        font-size: 1.1rem; /* Reduced font size */
    }
    
    .timeline-icon {
        font-size: 1em; /* Reduced icon size */
        opacity: 0.8;
    }

    /* --- Back Button Styles --- */
    .styled-wrapper .button {
      display: block;
      position: relative;
      width: 60px;
      height: 60px;
      margin: 0;
      overflow: hidden;
      outline: none;
      background-color: transparent;
      cursor: pointer;
      border: 0;
      transition: width 0.3s, height 0.3s;
    }

    .styled-wrapper .button:before {
      content: "";
      position: absolute;
      border-radius: 50%;
      inset: 6px;
      border: 2px solid var(--about-back-btn-border-color);
      transition:
        opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) 80ms,
        transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) 80ms,
        border-color 0.4s ease;
    }

    .styled-wrapper .button:after {
      content: "";
      position: absolute;
      border-radius: 50%;
      inset: 6px;
      border: 3px solid var(--about-back-btn-hover-border);
      transform: scale(1.3);
      transition:
        opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
        transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
        border-color 0.4s ease;
      opacity: 0;
    }

    .styled-wrapper .button:hover:before,
    .styled-wrapper .button:focus:before {
      opacity: 0;
      transform: scale(0.7);
      transition:
        opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
        transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .styled-wrapper .button:hover:after,
    .styled-wrapper .button:focus:after {
      opacity: 1;
      transform: scale(1);
      transition:
        opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) 80ms,
        transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) 80ms;
    }

    .styled-wrapper .button-box {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      transition: transform 0.4s;
    }

    .styled-wrapper .button-elem {
      display: block;
      width: 24px;
      height: 24px;
      margin: 18px 15px 0 18px;
      transform: rotate(360deg);
      transition: width 0.3s, height 0.3s, margin 0.3s;
    }
    
    .styled-wrapper .arrow-icon path {
        fill: var(--about-back-btn-arrow-color);
        transition: fill 0.4s ease;
    }

    .styled-wrapper .button:hover .button-box,
    .styled-wrapper .button:focus .button-box {
      transform: translateX(-57px);
    }

    /* --- Theme Toggle Styles --- */
    .theme-checkbox {
      --toggle-size: 12px;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      width: 6.25em;
      height: 3.125em;
      background: linear-gradient(to right, #efefef 50%, #2a2a2a 50%) no-repeat;
      background-size: 205%;
      background-position: 0;
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
      background: linear-gradient(to right, #efefef 50%, #2a2a2a 50%) no-repeat;
      background-size: 205%;
      background-position: 100%;
      border-radius: 50%;
      transition: 0.4s;
    }

    .theme-checkbox:checked::before {
      left: calc(100% - 2.25em - 0.438em);
      background-position: 0;
    }

    .theme-checkbox:checked {
      background-position: 100%;
    }

    /* --- Responsive --- */
    /* Mobile styles (applies to screens up to 767px) */
    @media (max-width: 767px) {
        .about-page { padding: 5rem 1rem 1rem; }
        .about-top-left { top: 1rem; left: 1rem; }
        .about-top-right { top: 1rem; right: 1rem; }
        .about-container { padding: 1.5rem; }
        .about-header h1 { font-size: 2rem; }
        
        .styled-wrapper .button {
            width: 50px;
            height: 50px;
        }
        .styled-wrapper .button-elem {
            width: 20px;
            height: 20px;
            margin: 15px 12px 0 15px;
        }
        .styled-wrapper .button:hover .button-box,
        .styled-wrapper .button:focus .button-box {
            transform: translateX(-47px);
        }
        
        /* Force single-column timeline on mobile */
        .timeline-container::after {
            left: 20px; /* Move the vertical line to the left side */
        }
        
        .timeline-item {
            width: 100%;
            padding-left: 50px; /* Adjust padding to make space for the line */
        }
        
        .timeline-item.left,
        .timeline-item.right {
            left: 0; /* Align all items to the left */
        }
        
        .timeline-item::after {
            left: 10px; /* Align the circle markers with the vertical line */
        }
    }

    /* Tablet and above styles */
    @media (min-width: 768px) {
      .about-container { padding: 3rem; }
      .about-header h1 { font-size: 3rem; }
      .about-header p { font-size: 1.2rem; }

      .timeline-container::after {
          left: 50%; /* Keep the line centered on tablets and desktops */
      }
      .timeline-item.left {
          left: 0;
          padding-right: 25px;
          padding-left: 40px;
      }
      .timeline-item.right {
          left: 50%;
          padding-left: 25px;
          padding-right: 40px;
      }
      .timeline-item::after {
          right: -10px;
          left: auto;
      }
      .timeline-item.right::after {
          left: -10px;
          right: auto;
      }
    }

    @media (min-width: 992px) {
      .about-header h1 { font-size: 3.5rem; }
      .about-container { padding: 4rem; }
    }

    @media (min-width: 1200px) {
       .about-container { max-width: 1200px; }
    }
  `;

  // Function to handle the back button click
  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <>
      <style>{styles}</style>
      <div className="about-page">
        <div className="about-top-left">
          <div className="styled-wrapper">
            <button
              className="button"
              onClick={handleBackClick}
              aria-label="Go Back"
            >
              <div className="button-box">
                <span className="button-elem">
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="arrow-icon"
                  >
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
                  </svg>
                </span>
                <span className="button-elem">
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="arrow-icon"
                  >
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
                  </svg>
                </span>
              </div>
            </button>
          </div>
        </div>
      

        <div className="about-container">
          <header className="about-header">
            <h1>Our Story</h1>
            <p>From a Passion for Travel to a Canvas for Memories</p>
          </header>

          <hr className="divider" />

          <section className="timeline-section">
            <div className="timeline-container">
              <div className="timeline-item left">
                <div className="timeline-content">
                  <div className="timeline-content-inner">
                    <h2>
                      <i className="fas fa-lightbulb timeline-icon"></i> The
                      Spark
                    </h2>
                    <p>
                      It all began with a dusty attic box filled with faded
                      photos and forgotten postcards. We realized our most
                      cherished travel memories deserved more than a digital
                      graveyard.
                    </p>
                  </div>
                </div>
              </div>
              <div className="timeline-item right">
                <div className="timeline-content">
                  <div className="timeline-content-inner">
                    <h2>
                      <i className="fas fa-pencil-ruler timeline-icon"></i>{" "}
                      First Draft
                    </h2>
                    <p>
                      Armed with leather, paper, and a whole lot of passion, we
                      crafted our first journal. It wasn't perfect, but it was
                      tangible, real, and ready to be filled with adventures.
                    </p>
                  </div>
                </div>
              </div>
              <div className="timeline-item left">
                <div className="timeline-content">
                  <div className="timeline-content-inner">
                    <h2>
                      <i className="fas fa-rocket timeline-icon"></i> Path to
                      Page is Born
                    </h2>
                    <p>
                      What started as a personal project quickly grew. We
                      launched Path to Page to share our love for tangible
                      memories with fellow travelers and storytellers.
                    </p>
                  </div>
                </div>
              </div>
              <div className="timeline-item right">
                <div className="timeline-content">
                  <div className="timeline-content-inner">
                    <h2>
                      <i className="fas fa-map-signs timeline-icon"></i> Looking
                      Ahead
                    </h2>
                    <p>
                      Our journey continues. We're constantly exploring new
                      materials and ideas to help you capture your adventures in
                      the most beautiful and lasting way possible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
