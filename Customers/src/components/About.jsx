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
    const loadScripts = () => {
      const scripts = [
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/js/all.min.js",
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
      if (hasAnimated.current || !window.gsap) return;
      hasAnimated.current = true;

      window.gsap.registerPlugin(window.ScrollTrigger);

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

      const items = document.querySelectorAll(".timeline-item");
      items.forEach((item, index) => {
        const content = item.querySelector(".timeline-content");
        const isLeft = item.classList.contains("left");

        window.gsap.from(content, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          x: isLeft ? -100 : 100,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: index * 0.1,
        });
      });
    };

    loadScripts();
  }, []);

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap');

    /* --- Theme Variables with Home.jsx Colors --- */
    body[data-theme='light'] {
      --about-bg-color: #fdf8f0; /* Parchment - Home.jsx */
      --about-text-color: #5c544b; /* Dark Taupe - Home.jsx */
      --about-container-bg: rgba(255, 255, 255, 0.7);
      --about-container-border: rgba(185, 154, 107, 0.3);
      --about-header-color: #5c544b;
      --about-subheader-color: #5c544b;
      --about-accent-color: #c97b63; /* Terracotta - Home.jsx */
      --about-divider-color: rgba(185, 154, 107, 0.75);
      --about-back-btn-border-color: #5c544b;
      --about-back-btn-arrow-color: #5c544b;
      --about-back-btn-hover-border: #b99a6b; /* Muted Gold - Home.jsx */
      --timeline-bg: rgba(185, 154, 107, 0.3);
      --timeline-card-bg: #fff;
      --timeline-point-bg: #c97b63;
      --timeline-glow-1: #c97b63;
      --timeline-glow-2: #b99a6b;
    }

    body[data-theme='dark'] {
      --about-bg-color: #1a1b2a; /* Dark Blue-Black - Home.jsx */
      --about-text-color: #fdf8f0; /* Parchment - Home.jsx */
      --about-container-bg: rgba(44, 46, 67, 0.7);
      --about-container-border: rgba(255, 255, 255, 0.12);
      --about-header-color: #fdf8f0;
      --about-subheader-color: #fdf8f0;
      --about-accent-color: #e07a5f; /* Coral - Home.jsx */
      --about-divider-color: rgba(224, 122, 95, 0.75);
      --about-back-btn-border-color: #fdf8f0;
      --about-back-btn-arrow-color: #fdf8f0;
      --about-back-btn-hover-border: #b99a6b;
      --timeline-bg: rgba(255, 255, 255, 0.12);
      --timeline-card-bg: #2c2e43;
      --timeline-point-bg: #e07a5f;
      --timeline-glow-1: #e07a5f;
      --timeline-glow-2: #b99a6b;
    }

    .about-page {
      font-family: 'Georgia', serif;
      background-color: var(--about-bg-color);
      padding: 6rem 2rem 2rem;
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
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
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
      opacity: 0.8;
      margin-top: 0.5rem;
      transition: color 0.4s ease;
    }

    .divider {
      border: 0;
      height: 1px;
      background-image: linear-gradient(to right, rgba(0,0,0,0), var(--about-divider-color), rgba(0,0,0,0));
      margin: 2rem 0;
    }

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
      box-shadow: 0 0 10px var(--timeline-point-bg);
    }

    .timeline-item.right::after {
      left: -10px;
    }

    .timeline-content {
      padding: 3px;
      background-color: transparent;
      position: relative;
      border-radius: 6px;
    }

    .timeline-content::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 3px;
      background: conic-gradient(from var(--gradient-angle), var(--timeline-glow-1), var(--timeline-glow-2), var(--timeline-glow-1));
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      animation: rotate 4s linear infinite;
      opacity: 0.5;
      transition: opacity 0.3s;
    }

    .timeline-content:hover::before {
      opacity: 1;
    }

    .timeline-content-inner {
      padding: 15px;
      background: var(--timeline-card-bg);
      border-radius: 6px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      height: auto;
      transition: background-color 0.4s ease;
    }

    .timeline-content-inner p {
      margin: 0;
      line-height: 1.5;
      font-size: 0.9rem;
    }

    @keyframes rotate {
      to {
        --gradient-angle: 360deg;
      }
    }

    @property --gradient-angle {
      syntax: "<angle>";
      initial-value: 0deg;
      inherits: false;
    }

    .timeline-content h2 {
      margin-top: 0;
      font-family: 'Playfair Display', serif;
      color: var(--about-accent-color);
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 0.75rem;
      font-size: 1.1rem;
    }

    .timeline-icon {
      font-size: 1em;
      opacity: 0.8;
    }

    /* Back Button */
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
      transition: opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) 80ms,
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
      transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
        transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
        border-color 0.4s ease;
      opacity: 0;
    }

    .styled-wrapper .button:hover:before,
    .styled-wrapper .button:focus:before {
      opacity: 0;
      transform: scale(0.7);
    }

    .styled-wrapper .button:hover:after,
    .styled-wrapper .button:focus:after {
      opacity: 1;
      transform: scale(1);
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

    /* Theme Toggle */
    .theme-checkbox {
      --toggle-size: 12px;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      width: 6.25em;
      height: 3.125em;
      background: linear-gradient(to right, #fdf8f0 50%, #1a1b2a 50%) no-repeat;
      background-size: 205%;
      background-position: 0;
      transition: 0.4s;
      border-radius: 99em;
      position: relative;
      cursor: pointer;
      font-size: var(--toggle-size);
      border: 2px solid #b99a6b;
    }

    .theme-checkbox::before {
      content: "";
      width: 2.25em;
      height: 2.25em;
      position: absolute;
      top: 0.438em;
      left: 0.438em;
      background: #b99a6b;
      border-radius: 50%;
      transition: 0.4s;
    }

    .theme-checkbox:checked::before {
      left: calc(100% - 2.25em - 0.438em);
      background: #e07a5f;
    }

    .theme-checkbox:checked {
      background-position: 100%;
    }

    /* Responsive */
    @media (max-width: 767px) {
      .about-page {
        padding: 5rem 1rem 1rem;
      }

      .about-top-left {
        top: 1rem;
        left: 1rem;
      }

      .about-top-right {
        top: 1rem;
        right: 1rem;
      }

      .about-container {
        padding: 1.5rem;
      }

      .about-header h1 {
        font-size: 2rem;
      }

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

      .timeline-container::after {
        left: 20px;
      }

      .timeline-item {
        width: 100%;
        padding-left: 50px;
      }

      .timeline-item.left,
      .timeline-item.right {
        left: 0;
      }

      .timeline-item::after {
        left: 10px;
      }
    }

    @media (min-width: 768px) {
      .about-container {
        padding: 3rem;
      }

      .about-header h1 {
        font-size: 3rem;
      }

      .about-header p {
        font-size: 1.2rem;
      }

      .timeline-container::after {
        left: 50%;
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
      .about-header h1 {
        font-size: 3.5rem;
      }

      .about-container {
        padding: 4rem;
      }
    }

    @media (min-width: 1200px) {
      .about-container {
        max-width: 1200px;
      }
    }
  `;

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <>
      <style>{styles}</style>
      <div className="about-page">
        <div className="about-top-left">
          <div className="styled-wrapper">
            <button className="button" onClick={handleBackClick}>
              <div className="button-box">
                <span className="button-elem">
                  <svg
                    viewBox="0 0 46 40"
                    xmlns="http://www.w3.org/2000/svg"
                    className="arrow-icon"
                  >
                    <path
                      transform="scale(-1,1) translate(-46,0)"
                      d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                    ></path>
                  </svg>
                </span>
                <span className="button-elem">
                  <svg
                    viewBox="0 0 46 40"
                    xmlns="http://www.w3.org/2000/svg"
                    className="arrow-icon"
                  >
                    <path
                      transform="scale(-1,1) translate(-46,0)"
                      d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                    ></path>
                  </svg>
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* <div className="about-top-right">
          <input
            type="checkbox"
            className="theme-checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
        </div> */}

        <div className="about-container">
          <div className="about-header">
            <h1>Our Story</h1>
            <p>From a simple idea to a passion project</p>
          </div>

          <hr className="divider" />

          <div className="timeline-section">
            <div className="timeline-container">
              <div className="timeline-item left">
                <div className="timeline-content">
                  <div className="timeline-content-inner">
                    <h2>
                      <span className="timeline-icon">🏡</span>
                      The Beginning
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
                      <span className="timeline-icon">✂️</span>
                      Crafting Begins
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
                      <span className="timeline-icon">🚀</span>
                      Growing Dreams
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
                      <span className="timeline-icon">🌍</span>
                      Today & Beyond
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
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
