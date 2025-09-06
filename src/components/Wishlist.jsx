import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import anime from "animejs/lib/anime.es.js";

// This is the Wishlist component. It's designed to be a standalone page.
const Wishlist = () => {
  // Initialize the useNavigate hook to programmatically navigate between pages.
  const navigate = useNavigate();

  // State to manage dark mode for this specific page.
  const [isDarkMode, setIsDarkMode] = useState(false);
  // A ref to the container of the wishlist items for animation.
  const cardGridRef = useRef(null);
  // A ref for the title animation.
  const titleRef = useRef(null);

  // The wishlist items are now loaded from localStorage, so we start with an empty array.
  const [wishlistItems, setWishlistItems] = useState([]);

  // This function removes an item from the wishlist.
  const handleRemoveItem = (idToRemove) => {
    // Update the state to remove the item.
    setWishlistItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== idToRemove);
      // Also update localStorage to keep it in sync.
      localStorage.setItem("wishlist", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  // This function toggles the dark mode state.
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // 'useEffect' runs code after the component has rendered.
  useEffect(() => {
    // Load wishlist items from localStorage when the component mounts.
    const savedItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(savedItems);

    // GSAP Animation: Stagger the appearance of wishlist cards.
    // This animation will only run if there are items in the wishlist.
    if (savedItems.length > 0 && cardGridRef.current) {
      gsap.from(cardGridRef.current.children, {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: "power3.out",
      });
    }

    // Anime.js Animation: Animate the letters of the title.
    if (titleRef.current) {
      // Wrap every letter in a span to animate them individually.
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
  }, []); // The empty dependency array ensures this effect runs only once on mount.

  // All the CSS for this component is stored in this string.
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap');
    
    html { scroll-behavior: smooth; }

    .wishlist-page-wrapper {
      font-family: 'Poppins', sans-serif;
      background-color: #f8f4ed;
      padding: 4rem 2rem;
      min-height: 100vh;
      color: #3b3a30;
      transition: background-color 0.4s, color 0.4s;
      position: relative;
      overflow: hidden; /* Hide overflow for the star animation */
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

    .wishlist-container {
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 20; /* Ensure content is above the animation */
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
    
    /* Animation for the back button */
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

/* Circle effects */
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

/* Hover / Focus effects */
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

/* Icon inside button */
.styled-wrapper .button-elem {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%; /* match parent button */
  height: 100%;
}


.styled-wrapper .button-elem svg {
    width: 20px;
    height: 20px;
    position: relative;
    top 25px;
    margin:auto;
    fill: black; /* Makes the icon visible */
}

.styled-wrapper .button:hover .button-box,
.styled-wrapper .button:focus .button-box {
    transform: translateX(-56px);
}


    /* Animation for the theme toggle */
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
    left: 0.2rem; /* Start at left */
    transition: left 0.4s;
}

.theme-checkbox:checked {
    background: #3b3a30;
}

.theme-checkbox:checked::before {
    left: calc(100% - 1.8rem - 0.2rem); /* Snap to right exactly */
}


    /* Notification box */
    .notification {
        position: fixed;
        top: 2rem;
        right: 2rem;
        background-color: #48bb78;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        animation: fadein 0.5s, fadeout 0.5s 1.5s;
        z-index: 9999;
    }
    @keyframes fadein {
        from { opacity: 0; transform: translateY(-20px); }
        to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeout {
        from { opacity: 1; }
        to   { opacity: 0; }
    }

    /* For Tablets and larger mobile phones (up to 992px wide). */
    @media (max-width: 992px) {
      .journal-page {
        padding: 4rem 1.5rem;
      }
      .journal-header h1 {
        font-size: 3rem;
      }
      .journal-grid {
        grid-template-columns: repeat(2, 1fr); /* 2 columns for large phones. */
      }
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

    /* For smaller mobile phones (up to 600px wide). */
    @media (max-width: 600px) {
      .journal-page {
        padding: 4rem 1rem;
      }
      .journal-header h1 {
        font-size: 2.5rem;
      }
      .journal-grid {
        grid-template-columns: 1fr; /* 1 column for small phones. */
      }
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
        .styled-wrapper .button { width: 48px; height: 48px; }
        .styled-wrapper .button-elem { width: 16px; height: 16px; margin: 16px; }
        .styled-wrapper .button:hover .button-box,
        .styled-wrapper .button:focus .button-box { transform: translateX(-48px); }
        .theme-toggle-wrapper { top: 1rem; right: 1rem; }
        .notification {
            width: calc(100% - 2rem);
            right: 1rem;
            top: 1rem;
        }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className={`wishlist-page-wrapper ${isDarkMode ? "dark-mode" : ""}`}>
        {/* Back button */}
        <div className="styled-wrapper">
          <button className="button" onClick={() => navigate("/")}>
            <div className="button-box">
              
              <span className="button-elem">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
                </svg>
              </span>
            </div>
          </button>
        </div>

        {/* Dark mode toggle */}


        <div className="wishlist-container">
          <header className="wishlist-header">
            <h1 ref={titleRef}>My Wishlist</h1>
            {wishlistItems.length === 0 ? (
              <p>
                Your wishlist is a blank canvas. Time to create a masterpiece!
              </p>
            ) : (
              <p>Your collection of saved treasures.</p>
            )}
          </header>

          {/* Grid for wishlist items */}
          {wishlistItems.length > 0 && (
            <div className="wishlist-grid" ref={cardGridRef}>
              {wishlistItems.map((item) => (
                <div key={item.id} className="wishlist-card">
                  <div
                    className="wishlist-image"
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>
                  <div className="wishlist-content">
                    <h3 className="wishlist-name">{item.name}</h3>
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
