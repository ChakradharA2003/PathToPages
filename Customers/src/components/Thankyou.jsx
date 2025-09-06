import React, { useState, useEffect, useRef } from "react";

// The main component for the "Thank You" page.
const ThankYouPage = () => {
  const cardsRef = useRef([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // GSAP and Anime.js animations
  useEffect(() => {
    // Ensure the animation libraries are loaded before using them
    if (window.gsap) {
      window.gsap.from(".thankyou-title", { opacity: 0, y: -50, duration: 1 });
      window.gsap.from(".thankyou-message", {
        opacity: 0,
        y: 30,
        delay: 0.3,
        duration: 1,
      });

      cardsRef.current.forEach((card, i) => {
        window.gsap.from(card, {
          opacity: 0,
          y: 50,
          delay: 0.5 + i * 0.2,
          duration: 0.8,
          ease: "power3.out",
        });
      });
    }

    if (window.anime) {
      window.anime({
        targets: ".glow-icon",
        scale: [0.9, 1.1],
        duration: 1000,
        direction: "alternate",
        loop: true,
        easing: "easeInOutSine",
      });
    }
  }, []);

  const thankYouCards = [
    {
      title: "Order Confirmed",
      message: "We’ve received your order and are preparing it for delivery.",
      icon: "✅",
    },
    {
      title: "Gift Ready",
      message: "Your handmade item will soon reach your doorstep.",
      icon: "📦",
    },
    {
      title: "Gratitude",
      message: "Thank you for supporting local artisans and handmade goods!",
      icon: "❤️",
    },
  ];

  // Toggles the theme between light and dark
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap');

    html { scroll-behavior: smooth; }

    .thank-you-page {
      font-family: 'Poppins', sans-serif;
      background-color: #f8f4ed;
      padding: 4rem 2rem;
      min-height: 100vh;
      color: #3b3a30;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.4s, color 0.4s;
      position: relative;
    }
    
    /* Dark Mode Styles */
    .thank-you-page.dark-mode {
        background-color: #1a1d24;
        color: #e0e0e0;
    }
    .thank-you-page.dark-mode .thankyou-title {
        color: #ffffff;
    }
    .thank-you-page.dark-mode .thankyou-message {
        color: #a0a0a0;
    }
    .thank-you-page.dark-mode .thankyou-card {
        background-color: #2c303a;
        color: #e0e0e0;
        border-color: #4a4f5a;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
    }
    .thank-you-page.dark-mode .thankyou-card h3 {
        color: #ffffff;
    }
    .thank-you-page.dark-mode .thankyou-card p {
        color: #a0a0a0;
    }
    .thank-you-page.dark-mode .home-btn {
        background-color: #4a4f5a;
        border-color: #4a4f5a;
        color: #ffffff;
    }
    .thank-you-page.dark-mode .home-btn:hover {
        background-color: #5a5f6a;
    }
    .thank-you-page.dark-mode .styled-wrapper .button:before {
        border-color: #ffffff;
    }
    .thank-you-page.dark-mode .button-elem svg {
        fill: #ffffff;
    }

    .thankyou-container {
      max-width: 1000px;
      margin: 0 auto;
      text-align: center;
    }

    .thankyou-header {
      position: relative;
      margin-bottom: 3rem;
    }

    .thankyou-title {
      font-family: 'Playfair Display', serif;
      font-size: 3rem;
      margin-bottom: 1rem;
      transition: color 0.4s;
    }

    .thankyou-message {
      font-size: 1.3rem;
      color: #8c887e;
      margin-bottom: 2rem;
      transition: color 0.4s;
    }

    .home-btn {
      padding: 0.8rem 2rem;
      border: 1px solid #5c544b;
      border-radius: 50px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      background-color: #5c544b;
      color: #fff;
      transition: background-color 0.3s ease, border-color 0.3s ease;
      margin-top: 2rem;
    }

    .home-btn:hover {
      background-color: #4a453d;
    }

    .thankyou-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }

    .thankyou-card {
      background: #ffffff;
      border-radius: 10px;
      padding: 2rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.07);
      border: 1px solid #e5ded3;
      transition: transform 0.3s ease, background-color 0.4s, color 0.4s, border-color 0.4s;
    }

    .thankyou-card:hover {
      transform: translateY(-6px);
    }

    .card-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .glow-icon {
      display: inline-block;
    }

    .thankyou-card h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.4rem;
      margin-bottom: 0.5rem;
      transition: color 0.4s;
    }

    .thankyou-card p {
      color: #6e6a60;
      font-size: 1rem;
      transition: color 0.4s;
    }
    
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
      width: 56px;
      height: 56px;
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
      inset: 7px;
      border: 3px solid #3b3a30;
      transition:
        opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) 80ms,
        transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) 80ms,
        border-color 0.4s;
    }

    .styled-wrapper .button:after {
      content: "";
      position: absolute;
      border-radius: 50%;
      inset: 7px;
      border: 4px solid #599a53;
      transform: scale(1.3);
      transition:
        opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
        transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
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
      width: 20px;
      height: 20px;
      margin: 18px;
      transform: rotate(360deg);
    }
    
    .styled-wrapper .button-elem svg {
        fill: #3b3a30;
        transition: fill 0.4s;
    }

    .styled-wrapper .button:hover .button-box,
    .styled-wrapper .button:focus .button-box {
      transition: 0.4s;
      transform: translateX(-56px);
    }

    /* --- Theme Toggle Switch Styles --- */
    .theme-toggle-wrapper {
        position: absolute;
        top: 1.5rem;
        right: 2rem;
        z-index: 1000;
    }
    
    .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
    }

    .switch #theme-toggle-input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #2196f3;
      transition: 0.4s;
      z-index: 0;
      overflow: hidden;
    }

    .sun-moon {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: yellow;
      transition: 0.4s;
    }

    #theme-toggle-input:checked + .slider {
      background-color: black;
    }

    #theme-toggle-input:checked + .slider .sun-moon {
      transform: translateX(26px);
      background-color: white;
      animation: rotate-center 0.6s ease-in-out both;
    }

    .moon-dot {
      opacity: 0;
      transition: 0.4s;
      fill: gray;
    }

    #theme-toggle-input:checked + .slider .sun-moon .moon-dot {
      opacity: 1;
    }

    .slider.round {
      border-radius: 34px;
    }

    .slider.round .sun-moon {
      border-radius: 50%;
    }
    #moon-dot-1 { left: 10px; top: 3px; position: absolute; width: 6px; height: 6px; z-index: 4; }
    #moon-dot-2 { left: 2px; top: 10px; position: absolute; width: 10px; height: 10px; z-index: 4; }
    #moon-dot-3 { left: 16px; top: 18px; position: absolute; width: 3px; height: 3px; z-index: 4; }

    .cloud-light, .cloud-dark {
      position: absolute;
      animation-name: cloud-move;
      animation-duration: 6s;
      animation-iteration-count: infinite;
    }
    .cloud-light { fill: #eee; }
    .cloud-dark { fill: #ccc; animation-delay: 1s; }

    #cloud-1 { left: 30px; top: 15px; width: 40px; }
    #cloud-2 { left: 44px; top: 10px; width: 20px; }
    #cloud-3 { left: 18px; top: 24px; width: 30px; }
    #cloud-4 { left: 36px; top: 18px; width: 40px; }
    #cloud-5 { left: 48px; top: 14px; width: 20px; }
    #cloud-6 { left: 22px; top: 26px; width: 30px; }

    @keyframes cloud-move {
      0%, 100% { transform: translateX(0px); }
      50% { transform: translateX(5px); }
    }

    .stars {
      transform: translateY(-32px);
      opacity: 0;
      transition: 0.4s;
    }

    .star {
      fill: white;
      position: absolute;
      transition: 0.4s;
      animation-name: star-twinkle;
      animation-duration: 2s;
      animation-iteration-count: infinite;
    }

    #theme-toggle-input:checked + .slider .stars {
      transform: translateY(0);
      opacity: 1;
    }

    #star-1 { width: 20px; top: 2px; left: 3px; animation-delay: 0.3s; }
    #star-2 { width: 6px; top: 16px; left: 3px; }
    #star-3 { width: 12px; top: 20px; left: 10px; animation-delay: 0.6s; }
    #star-4 { width: 18px; top: 0px; left: 18px; animation-delay: 1.3s; }

    @keyframes star-twinkle {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.3); }
    }
    
    @keyframes rotate-center {
      0% { transform: translateX(0) rotate(0); }
      100% { transform: translateX(26px) rotate(360deg); }
    }
    
    @media (max-width: 600px) {
        .thank-you-page { padding: 2rem 1rem; }
        .thankyou-title { font-size: 2.2rem; }
        .thankyou-message { font-size: 1.1rem; }
        .styled-wrapper { top: 0.5rem; left: 0.5rem; }
        .theme-toggle-wrapper { top: 1rem; right: 1rem; }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className={`thank-you-page ${isDarkMode ? "dark-mode" : ""}`}>
        <div className="styled-wrapper">
          <button className="button" onClick={() => window.history.back()}>
            <div className="button-box">
              <span className="button-elem">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
                </svg>
              </span>
              <span className="button-elem">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
                </svg>
              </span>
            </div>
          </button>
        </div>

        <div className="theme-toggle-wrapper">
          <label className="switch">
            <input
              id="theme-toggle-input"
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleTheme}
            />
            <div className="slider round">
              <div className="sun-moon">
                <svg id="moon-dot-1" className="moon-dot" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
                <svg id="moon-dot-2" className="moon-dot" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
                <svg id="moon-dot-3" className="moon-dot" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
                <svg id="cloud-1" className="cloud-dark" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
                <svg id="cloud-2" className="cloud-dark" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
                <svg id="cloud-3" className="cloud-dark" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
                <svg id="cloud-4" className="cloud-light" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
                <svg id="cloud-5" className="cloud-light" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
                <svg id="cloud-6" className="cloud-light" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
              </div>
              <div className="stars">
                <svg id="star-1" className="star" viewBox="0 0 20 20">
                  <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
                </svg>
                <svg id="star-2" className="star" viewBox="0 0 20 20">
                  <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
                </svg>
                <svg id="star-3" className="star" viewBox="0 0 20 20">
                  <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
                </svg>
                <svg id="star-4" className="star" viewBox="0 0 20 20">
                  <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
                </svg>
              </div>
            </div>
          </label>
        </div>

        <div className="thankyou-container">
          <div className="thankyou-header">
            <h1 className="thankyou-title">Thank You!</h1>
            <p className="thankyou-message">
              Your purchase was successful. We hope you enjoy your new item!
            </p>

            <div className="thankyou-grid">
              {thankYouCards.map((card, index) => (
                <div
                  key={index}
                  className="thankyou-card"
                  ref={(el) => (cardsRef.current[index] = el)}
                >
                  <div className="card-icon glow-icon">{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.message}</p>
                </div>
              ))}
            </div>

            <button
              className="home-btn"
              onClick={() => (window.location.href = "/")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThankYouPage;
