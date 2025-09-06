import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// The main component for the shop page.
const ShopPage = () => {
  // State to manage whether dark mode is enabled or not.
  const [isDarkMode, setIsDarkMode] = useState(false);
  // Ref to track if the animations have already run to prevent re-triggering.
  const hasAnimated = useRef(false);

  // An array of product objects, each containing details for a product.
  const products = [
    {
      id: 1,
      name: "The Wanderer's Journal",
      price: 3500.0,
      description: "A handcrafted leather journal to document your journeys.",
      image:
        "https://i.pinimg.com/736x/e0/62/01/e06201d44f84f51fceb8fc621d690740.jpg",
      link: "/Journal", // Link to the specific product page.
    },
    {
      id: 2,
      name: "Vintage Bookmarks",
      price: 850.0,
      description: "A collection of unique, handcrafted bookmarks.",
      image:
        "https://i.pinimg.com/1200x/95/37/4a/95374a33b9561048e09172d1a93be3ff.jpg",
      link: "/Bookmark",
    },
  ];

  // Function to handle navigation to a different page.
  const handleNavigation = (path) => {
    // Uses window.location.href to navigate, adding '#' for HashRouter compatibility.
    window.location.href = `#${path}`;
  };

  // Function to handle smooth scrolling to an element on the same page.
  const handleSmoothScroll = (event, targetId) => {
    event.preventDefault(); // Prevents the default anchor link behavior.
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      // Scrolls the view smoothly to the target element.
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  };

  // Toggles the theme between light and dark mode.
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // useEffect hook to handle animations when the component mounts.
  useEffect(() => {
    // Function to load external animation scripts (GSAP).
    const loadScripts = () => {
      const scripts = [
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js",
      ];
      let scriptsLoaded = 0;
      scripts.forEach((src) => {
        // Check if the script is already on the page.
        if (document.querySelector(`script[src="${src}"]`)) {
          scriptsLoaded++;
          if (scriptsLoaded === scripts.length) initAnimations();
          return;
        }
        // If not, create a script tag and append it to the body.
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

    // Function to initialize the animations once scripts are loaded.
    const initAnimations = () => {
      if (hasAnimated.current || !window.gsap) return;

      window.gsap.registerPlugin(window.ScrollTrigger);

      // Animate the main header text.
      window.gsap.from(".shop-header h1", {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: "power3.out",
      });

      // Animate the header paragraph.
      window.gsap.from(".shop-header p", {
        duration: 1,
        y: -30,
        opacity: 0,
        delay: 0.3,
        ease: "power3.out",
      });

      // Animate each product card as it scrolls into view.
      window.gsap.utils.toArray(".product-card").forEach((card, i) => {
        window.gsap.from(card, {
          duration: 1,
          y: 60,
          opacity: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
      hasAnimated.current = true; // Mark animations as complete.
    };

    loadScripts();
  }, []); // Empty dependency array means this runs once on mount.

  // A template literal containing all the CSS styles for this component.
  const styles = `
    /* --- Google Fonts Import --- */
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap');

    /* --- Base Styles --- */
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      padding: 0;
      font-family: 'Poppins', sans-serif;
    }

    /* --- Shop Page Container --- */
    .shop-page {
      background-color: #f4f1eb;
      padding: 4rem 2rem;
      min-height: 100vh;
      color: #4a4a4a;
      transition: background-color 0.4s, color 0.4s;
      position: relative;
    }
    
    /* --- Dark Mode Styles --- */
    .shop-page.dark-mode {
      background-color: #0d0d0eff;
      color: #e0e0e0;
    }
    .shop-page.dark-mode .shop-header h1 { color: #ffffff; }
    .shop-page.dark-mode .shop-header p,
    .shop-page.dark-mode .product-info p { color: #a0a0a0; }
    .shop-page.dark-mode .product-card {
      background-color: #2c303a;
      color: #e0e0e0;
      box-shadow: 0 8px 20px rgba(0,0,0,0.5);
    }
    .shop-page.dark-mode .product-info h3 { color: #ffffff; }
    .shop-page.dark-mode .action-btn {
      background-color: #4a4f5a;
      color: #ffffff;
    }
    .shop-page.dark-mode .action-btn:hover { background-color: #5a5f6a; }
    .shop-page.dark-mode .styled-wrapper .button:before { border-color: #ffffff; }
    .shop-page.dark-mode .button-elem svg { fill: #ffffff; }

    /* --- Shop Content Container --- */
    .shop-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    /* --- Shop Header Section --- */
    .shop-header {
      text-align: center;
      margin-bottom: 4rem;
    }
    .shop-header h1 {
      font-family: 'Playfair Display', serif;
      font-size: 3.5rem;
      color: #333;
      margin: 0 0 0.5rem;
      transition: color 0.4s;
    }
    .shop-header p {
      font-size: 1.2rem;
      color: #777;
      transition: color 0.4s;
    }
    
    /* --- Product Grid --- */
    .shop-grid {
      display: grid;
      gap: 3rem;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      justify-items: center;
    }

    /* --- Individual Product Card --- */
    .product-card {
      background: #fff;
      border-radius: 10px;
      width: 450px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.08);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      transition: all 0.4s ease;
      padding: 2.5rem;
      align-items: center;
      text-align: center;
    }
    .product-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 15px 30px rgba(0,0,0,0.12);
    }
    
    /* --- Product Image Container --- */
    .product-image {
      width: 100%;
      position: relative;
      padding-bottom: 100%; /* Square aspect ratio */
      border-radius: 8px;
      overflow: hidden;
    }
    .product-image img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .product-card:hover .product-image img { transform: scale(1.05); }

    /* --- Product Information Section --- */
    .product-info {
      padding: 0;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex-grow: 1;
    }
    .product-info h3 {
      font-family: 'Playfair Display', serif;
      margin: 0 0 0.5rem;
      font-size: 1.8rem;
      transition: color 0.4s;
    }
    .product-info p {
      color: #666;
      margin-bottom: 2rem;
      font-size: 1.1rem;
      flex-grow: 1;
      transition: color 0.4s;
    }

    /* --- Action Button (e.g., "View Product") --- */
    .action-btn {
      padding: 1rem 2rem;
      border: none;
      border-radius: 50px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      background-color: #333;
      color: #fff;
      transition: background-color 0.3s ease;
      align-self: center;
      margin-top: auto;
    }
    .action-btn:hover { background-color: #555; }
    
    /* --- Back Button Styles --- */
    .styled-wrapper {
      position: absolute;
      top: 1rem;
      left: 1rem;
      z-index: 1000;
    }
    .styled-wrapper .button {
      display: block;
      position: relative;
      width: 44px;
      height: 44px;
      margin: 0;
      overflow: hidden;
      outline: none;
      background-color: transparent;
      cursor: pointer;
      border: 0;
    }
    .styled-wrapper .button:before {
      content: "";
      position: absolute;
      border-radius: 50%;
      inset: 5px;
      border: 2px solid #333;
      transition: all 0.4s;
    }
    .styled-wrapper .button:after {
      content: "";
      position: absolute;
      border-radius: 50%;
      inset: 5px;
      border: 3px solid #599a53;
      transform: scale(1.3);
      transition: all 0.4s;
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
    }
    .styled-wrapper .button-elem {
      display: block;
      width: 16px;
      height: 16px;
      margin: 14px;
      transform: rotate(360deg);
    }
    .styled-wrapper .button-elem svg {
      fill: #333;
      transition: fill 0.4s;
    }
    .styled-wrapper .button:hover .button-box,
    .styled-wrapper .button:focus .button-box {
      transition: 0.4s;
      transform: translateX(-44px);
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

    /* --- Theme Toggle Switch Styles --- */
    .theme-toggle-wrapper {
      position: absolute;
      top: 1.5rem;
      right: 2rem;
      z-index: 1000;
    }
    .theme-checkbox {
      --toggle-size: 10px;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      width: 5.5em;
      height: 2.75em;
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
      width: 2em;
      height: 2em;
      position: absolute;
      top: 0.375em;
      left: 0.375em;
      background: linear-gradient(to right, #efefef 50%, #2a2a2a 50%) no-repeat;
      background-size: 205%;
      background-position: 100%;
      border-radius: 50%;
      transition: 0.4s;
    }
    .theme-checkbox:checked::before {
      left: calc(100% - 2em - 0.375em);
      background-position: 0;
    }
    .theme-checkbox:checked { background-position: 100%; }
    
    /* --- CSS Variables for Footer Theming --- */
    :root {
      --footer-bg-light: #fffaf0;
      --footer-text-light: #0c0c0cff;
      --footer-accent: #b99a6b;
      --footer-shadow-light: rgba(0 0 0 / 0.1);
      --glass-bg-light: rgba(255 255 255 / 0.6);
      --glass-border-light: rgba(255 255 255 / 0.7);
      --social-btn-shadow: rgba(0 0 0 / 0.15);
      --footer-border-light: rgba(0 0 0 / 0.1);
    }

    /* --- Footer Styles --- */
    .footer {
      background: var(--footer-bg-light);
      backdrop-filter: blur(10px) saturate(130%);
      -webkit-backdrop-filter: blur(10px) saturate(130%);
      box-shadow: 0 4px 24px var(--footer-shadow-light);
      border-top: 1px solid var(--footer-border-light);
      color: var(--footer-text-light);
      text-align: center;
      padding: 5rem 2rem;
      gap:10px;
      transition: background-color 0.5s ease, color 0.5s ease;
      font-family: 'Poppins', sans-serif;
      letter-spacing: 0.3px;
      user-select: none;
    }

    /* --- Dark Mode Footer Styles --- */
    @media (prefers-color-scheme: dark) {
      :root {
        --footer-bg-dark: #12131f;
        --footer-text-dark: #fdf8f0;
        --glass-bg-dark: rgba(30 30 30 / 0.25);
        --glass-border-dark: rgba(255 255 255 / 0.12);
        --footer-border-dark: rgba(255 255 255 / 0.12);
        --footer-shadow-dark: rgba(0 0 0 / 0.4);
      }
      .footer {
        background-color: var(--footer-bg-dark);
        border-top: 1px solid var(--footer-border-dark);
        color: var(--footer-text-dark);
      }
    }

    /* --- Footer Content Grid --- */
    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 2.5rem;
      max-width: 1200px;
      margin: 0 auto;
      text-align: left;
    }

    /* --- Footer Section Titles --- */
    .footer-section h3 {
      font-size: 1.4rem;
      margin-bottom: 1rem;
      font-family: 'Playfair Display', serif;
      color: var(--footer-accent);
      font-weight: 700;
      letter-spacing: 1.1px;
      text-transform: uppercase;
    }

    /* --- Footer Links --- */
    .footer-links li {
     position:relative;
      right:38px;
      list-style: none;
      margin-bottom: 0.6rem;
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
  
    /* --- Accessibility Class for Hiding Labels --- */
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

    /* --- Newsletter Input Field --- */
    .footer-newsletter input {
      width: 100%;
      padding: 1rem 1.1rem;
      border-radius: 10px;
      border: 1.2px solid var(--glass-border-light);
      background: var(--glass-bg-light);
      color: var(--footer-text-light);
      font-size: 1rem;
      margin-bottom: 1rem;
    }
    .footer-newsletter input::placeholder {
      color: rgba(245, 244, 244, 0.5);
      font-weight: 400;
    }
    .footer-newsletter input:focus {
      outline: none;
      border-color: var(--footer-accent);
      box-shadow: 0 0 15px var(--footer-accent);
    }

    /* --- Newsletter Dark Mode Input --- */
    @media (prefers-color-scheme: dark) {
      .footer-newsletter input {
        background: var(--glass-bg-dark);
        border-color: var(--glass-border-dark);
        color: var(--footer-text-dark);
      }
    }

    /* --- Newsletter Subscribe Button --- */
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
    }
    .footer-newsletter button:hover {
      background:#FFE5B4;
      transform: translateY(-2px);
      color: #08080893;
    }

    /* --- Social Media Links --- */
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
      display: flex;
      align-items: center;
      justify-content: center;
    }
    @media (prefers-color-scheme: dark) {
      .social-links .button { background: var(--glass-bg-dark); }
    }
    .social-links .button svg {
      width: 26px;
      height: 26px;
      color: var(--footer-text-light);
    }
    @media (prefers-color-scheme: dark) {
      .social-links .button svg { color: var(--footer-text-dark); }
    }
    .social-links .button:hover {
      transform: scale(1.1) translateY(-3px);
      border-color: var(--footer-accent);
    }
    .social-links .button:hover svg { color: var(--footer-accent); }

    /* --- Footer Bottom Section (Copyright) --- */
    .footer-bottom {
      text-align: center;
      margin-top: 3rem;
      border-top: 1px solid rgba(0, 0, 0, 0.05);
      padding-top: 1.2rem;
      font-size: 0.9rem;
      color: var(--footer-text-light);
    }
    @media (prefers-color-scheme: dark) {
      .footer-bottom {
        border-top-color: rgba(255 255 255 / 0.1);
        color: var(--footer-text-dark);
      }
    }

    /* --- Link Color Overrides for Specific Footer Sections --- */
    .footer-section.footer-quick-links .footer-links a,
    .footer-section.footer-information .footer-links a {
      color: white;
    }
    .footer-section.footer-quick-links .footer-links a:hover,
    .footer-section.footer-information .footer-links a:hover {
      color: var(--footer-accent);
    }

    /* --- Media Queries for Responsive Design --- */
    @media (min-width: 480px) {
      /* Styles for small screens and up */
    }
    @media (min-width: 768px) {
      /* Styles for medium screens and up */
    }
  `;

  return (
    <>
      {/* The style tag injects all the CSS from the 'styles' variable into the component. */}
      <style>{styles}</style>
      {/* Main container for the shop page. Applies dark-mode class conditionally. */}
      <div className={`shop-page ${isDarkMode ? "dark-mode" : ""}`}>
        {/* Wrapper for the animated back button. */}
        <div className="styled-wrapper">
          {/* The back button itself. */}
          <button
            className="button"
            aria-label="Go back"
            onClick={() => window.history.back()}
          >
            {/* Box containing the two arrow icons for the animation. */}
            <div className="button-box">
              {/* First arrow icon. */}
              <span className="button-elem">
                <svg viewBox="0 0 44 44" preserveAspectRatio="xMidYMid meet">
                  <path d="M15.9,21.5L27.6,9.8c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4L18.7,22l10.3,10.3c0.4,0.4,0.4,1,0,1.4s-1,0.4-1.4,0L15.9,22.9 C15.5,22.5,15.5,21.9,15.9,21.5z"></path>
                </svg>
              </span>
              {/* Second arrow icon for the hover effect. */}
              <span className="button-elem">
                <svg viewBox="0 0 44 44" preserveAspectRatio="xMidYMid meet">
                  <path d="M15.9,21.5L27.6,9.8c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4L18.7,22l10.3,10.3c0.4,0.4,0.4,1,0,1.4s-1,0.4-1.4,0L15.9,22.9 C15.5,22.5,15.5,21.9,15.9,21.5z"></path>
                </svg>
              </span>
            </div>
          </button>
        </div>

        {/* Wrapper for the theme toggle switch. */}

        {/* Main content container for the shop. */}
        <div className="shop-container">
          {/* Header section with the title and subtitle. */}
          <header className="shop-header">
            <h1>Our Products</h1>
            <p>Handcrafted items and unique goods for the modern wanderer.</p>
          </header>

          {/* Main grid where the product cards are displayed. */}
          <main className="shop-grid">
            {/* Maps over the products array to create a card for each product. */}
            {products.map((product) => (
              // Unique key for each product card, essential for React lists.
              <div key={product.id} className="product-card">
                {/* Container for the product image. */}
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                {/* Container for the product name, description, and button. */}
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  {/* Button to view the product details page. */}
                  <button
                    className="action-btn"
                    onClick={() => handleNavigation(product.link)}
                  >
                    View Product
                  </button>
                </div>
              </div>
            ))}
          </main>
        </div>
      </div>
      {/* Footer section of the page. */}
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
            <p>Phone: +91 (555) 123-4567</p>
            <p>Address: Karimnagar, Telangana, India, 505001</p>
            <div className="social-links">
              {/* Instagram Button */}
              <a
                href="https://www.instagram.com/yourusername" // Replace with your Instagram URL
                target="_blank"
                rel="noopener noreferrer"
                className="instagram-button"
                aria-label="Instagram"
              >
                <button className="button-content" aria-label="Instagram">
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

              {/* Twitter Button */}
              <a
                href="mailto:yourmail@gmail.com" // Replace with your Gmail address
                target="_blank"
                rel="noopener noreferrer"
                className="gmail-button"
                aria-label="Gmail"
              >
                <button className="button-content" aria-label="Gmail">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 512 512"
                    width="40"
                    height="40"
                  >
                    <path d="M502.3 190.8c3.9-3 9.7-1.7 11.8 2.9L512 198v228c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V198l-1.5-4.3c-2.1-4.6 1.7-9.9 6.5-10l496-1.1zM256 320l192-144H64l192 144z" />
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
    </>
  );
};

export default ShopPage;
