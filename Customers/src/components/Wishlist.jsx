import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import anime from "animejs/lib/anime.es.js";

const Wishlist = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const cardGridRef = useRef(null);
  const titleRef = useRef(null);
  const [wishlistItems, setWishlistItems] = useState([]);

  // Remove an item from wishlist
  const handleRemoveItem = (idToRemove) => {
    setWishlistItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== idToRemove);
      localStorage.setItem("wishlist", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  // Toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Navigate to shop
  const handleExploreShop = () => {
    navigate("/shop");
  };

  // Handle back button
  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    // Load wishlist items from localStorage
    const savedItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(savedItems);

    // GSAP Animation for wishlist cards
    if (savedItems.length > 0 && cardGridRef.current) {
      gsap.from(cardGridRef.current.children, {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: "power3.out",
      });
    }

    // Anime.js Animation for title letters
    if (titleRef.current) {
      titleRef.current.innerHTML = titleRef.current.textContent.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
      );
      anime.timeline({ loop: false }).add({
        targets: ".wishlist-header .letter",
        translateY: [-100, 0],
        easing: "easeOutExpo",
        duration: 1500,
        delay: (el, i) => 30 * i,
      });
    }

    // Listen for wishlist updates from other components
    const handleWishlistUpdate = () => {
      const updatedItems = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlistItems(updatedItems);
    };

    window.addEventListener("wishlistUpdated", handleWishlistUpdate);

    return () => {
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
    };
  }, []);

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap');

    html {
      scroll-behavior: smooth;
    }

    .wishlist-page-wrapper {
      font-family: 'Poppins', sans-serif;
      background-color: #f8f4ed;
      padding: 4rem 2rem;
      min-height: 100vh;
      color: #3b3a30;
      transition: background-color 0.4s, color 0.4s;
      position: relative;
      overflow: hidden;
    }

    .wishlist-page-wrapper.dark-mode {
      background-color: #000000;
      color: #e0e0e0;
    }

    .wishlist-page-wrapper.dark-mode .wishlist-header h1 {
      color: #ffffff;
    }

    .wishlist-page-wrapper.dark-mode .wishlist-header p {
      color: #a0a0a0;
    }

    .wishlist-page-wrapper.dark-mode .wishlist-card {
      background-color: #2c303a;
      color: #e0e0e0;
      box-shadow: 1px 1px 12px rgba(0, 0, 0, 0.5);
    }

    .wishlist-page-wrapper.dark-mode .wishlist-name {
      color: #ffffff;
    }

    .wishlist-page-wrapper.dark-mode .styled-wrapper .button:before {
      border-color: #ffffff;
    }

    .wishlist-page-wrapper.dark-mode .button-elem svg {
      fill: #ffffff;
    }

    .wishlist-page-wrapper.dark-mode .remove-btn {
      background-color: #fc8181;
      color: #2d3748;
    }

    .wishlist-page-wrapper.dark-mode .remove-btn:hover {
      background-color: #f56565;
    }

    .wishlist-page-wrapper.dark-mode .empty-wishlist {
      background-color: #2c303a;
      color: #e0e0e0;
    }

    .wishlist-page-wrapper.dark-mode .explore-btn {
      background-color: #599a53;
    }

    .wishlist-page-wrapper.dark-mode .explore-btn:hover {
      background-color: #4a8644;
    }

    .wishlist-container {
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 20;
    }

    .wishlist-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .wishlist-header h1 {
      font-family: 'Playfair Display', serif;
      font-size: 3.5rem;
      color: #3b3a30;
      margin: 0;
      transition: color 0.4s;
      overflow: hidden;
    }

    .wishlist-header .letter {
      display: inline-block;
    }

    .wishlist-header p {
      font-size: 1.2rem;
      color: #8c887e;
      margin-top: 0.5rem;
      transition: color 0.4s;
    }

    .wishlist-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .wishlist-card {
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;
    }

    .wishlist-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.12);
    }

    .wishlist-image {
      height: 220px;
      width: 100%;
      background-size: cover;
      background-position: center;
    }

    .wishlist-content {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      flex-grow: 1;
    }

    .wishlist-name {
      font-family: 'Playfair Display', serif;
      font-size: 1.2rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: auto;
    }

    .wishlist-price {
      font-size: 1.5rem;
      font-weight: 700;
      color: #27ae60;
      margin: 0.5rem 0;
    }

    .remove-btn {
      background-color: #e53e3e;
      color: white;
      border: none;
      padding: 0.6rem 1.5rem;
      border-radius: 50px;
      cursor: pointer;
      font-weight: 600;
      transition: background-color 0.3s ease;
      margin-top: 1rem;
    }

    .remove-btn:hover {
      background-color: #c53030;
    }

    /* Empty Wishlist State */
    .empty-wishlist {
      background: white;
      border-radius: 12px;
      padding: 60px 30px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      margin-top: 2rem;
    }

    .empty-wishlist-icon {
      font-size: 80px;
      margin-bottom: 20px;
    }

    .empty-wishlist-title {
      font-size: 28px;
      font-weight: bold;
      color: #3b3a30;
      margin-bottom: 10px;
      font-family: 'Playfair Display', serif;
    }

    .empty-wishlist-text {
      font-size: 16px;
      color: #8c887e;
      margin-bottom: 30px;
    }

    .explore-btn {
      background: #599a53;
      color: white;
      border: none;
      padding: 14px 32px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .explore-btn:hover {
      background: #4a8644;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(89, 154, 83, 0.3);
    }

    /* Fixed Back Button - Arrow Centered */
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
      border: 0;
      outline: none;
      cursor: pointer;
      background: transparent;
      overflow: hidden;
    }

    .styled-wrapper .button::before,
    .styled-wrapper .button::after {
      content: "";
      position: absolute;
      inset: 7px;
      border-radius: 50%;
      transition: opacity 0.4s, transform 0.5s;
    }

    .styled-wrapper .button::before {
      border: 3px solid #000;
    }

    .styled-wrapper .button::after {
      border: 4px solid #599a53;
      transform: scale(1.3);
      opacity: 0;
    }

    .styled-wrapper .button:hover::before,
    .styled-wrapper .button:focus::before {
      transform: scale(0.7);
      opacity: 0;
    }

    .styled-wrapper .button:hover::after,
    .styled-wrapper .button:focus::after {
      transform: scale(1);
      opacity: 1;
    }

    /* Fixed: Arrow centered properly */
    .styled-wrapper .button-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.4s;
    }

    .styled-wrapper .button-elem {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .styled-wrapper .button-elem svg {
      width: 20px;
      height: 20px;
      fill: #000;
      transform: rotate(180deg);
    }

    .styled-wrapper .button:hover .button-box,
    .styled-wrapper .button:focus .button-box {
      transform: translateX(-56px);
    }

    /* Theme Toggle */
    .theme-toggle-wrapper {
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 1000;
    }

    .theme-checkbox {
      appearance: none;
      width: 4.5rem;
      height: 2.2rem;
      background: #ccc;
      border-radius: 2.5rem;
      position: relative;
      cursor: pointer;
      outline: none;
      transition: background-color 0.4s;
    }

    .theme-checkbox::before {
      content: '';
      position: absolute;
      width: 1.8rem;
      height: 1.8rem;
      background: #fff;
      border-radius: 50%;
      top: 0.2rem;
      left: 0.2rem;
      transition: left 0.4s;
    }

    .theme-checkbox:checked {
      background: #3b3a30;
    }

    .theme-checkbox:checked::before {
      left: calc(100% - 1.8rem - 0.2rem);
    }

    /* Responsive Design */
    @media (max-width: 992px) {
      .wishlist-page-wrapper {
        padding: 4rem 1.5rem;
      }

      .wishlist-header h1 {
        font-size: 3rem;
      }

      .wishlist-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 600px) {
      .wishlist-page-wrapper {
        padding: 4rem 1rem;
      }

      .wishlist-header h1 {
        font-size: 2.5rem;
      }

      .wishlist-grid {
        grid-template-columns: 1fr;
      }

      .styled-wrapper {
        top: 0.5rem;
        left: 0.5rem;
      }

      .styled-wrapper .button {
        width: 48px;
        height: 48px;
      }

      .styled-wrapper .button-elem svg {
        width: 16px;
        height: 16px;
      }

      .styled-wrapper .button:hover .button-box,
      .styled-wrapper .button:focus .button-box {
        transform: translateX(-48px);
      }

      .theme-toggle-wrapper {
        top: 1rem;
        right: 1rem;
      }

      .empty-wishlist {
        padding: 40px 20px;
      }

      .empty-wishlist-icon {
        font-size: 60px;
      }

      .empty-wishlist-title {
        font-size: 24px;
      }

      .explore-btn {
        width: 100%;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className={`wishlist-page-wrapper ${isDarkMode ? "dark-mode" : ""}`}>
        {/* Back Button - Fixed Arrow */}
        <div className="styled-wrapper">
          <button
            className="button"
            onClick={handleGoBack}
            aria-label="Go back"
          >
            <div className="button-box">
              <span className="button-elem">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    transform="scale(-1,1) translate(-24,0)"
                    d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                  ></path>
                </svg>
              </span>
            </div>
          </button>
        </div>

        {/* Theme Toggle */}
        <div className="theme-toggle-wrapper">
          <input
            type="checkbox"
            className="theme-checkbox"
            checked={isDarkMode}
            onChange={toggleTheme}
            aria-label="Toggle dark mode"
          />
        </div>

        {/* Main Content */}
        <div className="wishlist-container">
          <div className="wishlist-header">
            <h1 ref={titleRef}>My Wishlist</h1>
            <p>Items you love, saved for later</p>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="empty-wishlist">
              <div className="empty-wishlist-icon">💝</div>
              <h2 className="empty-wishlist-title">Your wishlist is empty</h2>
              <p className="empty-wishlist-text">
                Start adding items you love to your wishlist!
              </p>
              <button className="explore-btn" onClick={handleExploreShop}>
                Explore Shop
              </button>
            </div>
          ) : (
            <div className="wishlist-grid" ref={cardGridRef}>
              {wishlistItems.map((item) => (
                <div className="wishlist-card" key={item.id}>
                  <div
                    className="wishlist-image"
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>
                  <div className="wishlist-content">
                    <h3 className="wishlist-name">{item.name}</h3>
                    {item.price && (
                      <p className="wishlist-price">₹{item.price.toFixed(2)}</p>
                    )}
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
