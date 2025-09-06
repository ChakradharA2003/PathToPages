import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// The main component for displaying the bookmark product grid.
const BookmarkPage = () => {
  const navigate = useNavigate();
  // State to hold the list of bookmarks with their details.
  const [bookmarks, setBookmarks] = useState([
    {
      id: 101,
      name: "Journal Book",
      price: 400.0,
      description: "Journal book",
      image: "https://placehold.co/600x400/EAE0D5/8E7968?text=Pearls",
      quantity: 1,
    },
    // {
    //   id: 102,
    //   name: "Jute Weaver Bookmark",
    //   price: 750.0,
    //   description: "Woven from natural, eco-friendly jute.",
    //   image: "https://placehold.co/600x400/D4BBAA/FFFFFF?text=Jute",
    //   quantity: 1,
    // },
    // {
    //   id: 103,
    //   name: "Tassel Charm Bookmark",
    //   price: 950.0,
    //   description: "Features a soft, handmade tassel.",
    //   image: "https://placehold.co/600x400/C78C5C/FFFFFF?text=Tassel",
    //   quantity: 1,
    // },
    // {
    //   id: 104,
    //   name: "Satin Ribbon Bookmark",
    //   price: 600.0,
    //   description: "A classic and smooth satin ribbon marker.",
    //   image: "https://placehold.co/600x400/A2B5CD/FFFFFF?text=Ribbon",
    //   quantity: 1,
    // },
  ]);

  // State for the notification message
  const [notification, setNotification] = useState("");
  // State for the dark mode toggle
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to handle quantity changes for a specific bookmark item.
  const handleQuantityChange = (id, amount) => {
    setBookmarks((prev) =>
      prev.map((bm) =>
        bm.id === id
          ? { ...bm, quantity: Math.max(1, bm.quantity + amount) }
          : bm
      )
    );
  };

  // Function to handle adding a bookmark to the shopping cart.
  const handleAddToCart = (bookmark) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === bookmark.id);

    if (existing) {
      existing.quantity += bookmark.quantity;
    } else {
      cart.push({ ...bookmark });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    setNotification(`${bookmark.name} has been added to your cart!`);
    setTimeout(() => {
      setNotification("");
      navigate("/cart");
    }, 1500);
  };

  // Save journal to wishlist
  const handleSaveToWishlist = (bookmark) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const existing = wishlist.find((item) => item.id === bookmark.id);

    if (!existing) {
      wishlist.push(bookmark);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }

    navigate("/wishlist");
  };



  // Toggles the theme between light and dark
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    // The 'className' changes based on the 'isDarkMode' state, which triggers the CSS for dark mode.
    <>
      <style>
        {`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap');

    html { scroll-behavior: smooth; }

    .bookmark-page {
      font-family: 'Poppins', sans-serif;
      background-color: #fdf8f0;
      padding: 4rem 2rem;
      min-height: 100vh;
      color: #5c544b;
      transition: background-color 0.4s, color 0.4s;
      position: relative;
    }
    
    /* Dark Mode Styles */
    .bookmark-page.dark-mode {
        background-color: #1a1d24;
        color: #e0e0e0;
    }
    .bookmark-page.dark-mode .bookmark-header h1 {
        color: #ffffff;
    }
    .bookmark-page.dark-mode .bookmark-header p {
        color: #a0a0a0;
    }
    .bookmark-page.dark-mode .bookmark-card {
        background-color: #2c303a;
        color: #e0e0e0;
        border-color: #4a4f5a;
        box-shadow: 0 4px 15px rgba(0,0,0,0.5);
    }
    .bookmark-page.dark-mode .bookmark-info h3 {
        color: #ffffff;
    }
    .bookmark-page.dark-mode .bookmark-info p {
        color: #a0a0a0;
    }
    .bookmark-page.dark-mode .bookmark-price {
        color: #d4b38a;
    }
    .bookmark-page.dark-mode .quantity-control {
        border-color: #4a4f5a;
    }
    .bookmark-page.dark-mode .quantity-control button {
        color: #e0e0e0;
    }
    .bookmark-page.dark-mode .add-to-cart-btn {
        background-color: #4a4f5a;
        border-color: #4a4f5a;
        color: #ffffff;
    }
    .bookmark-page.dark-mode .add-to-cart-btn:hover {
        background-color: #5a5f6a;
    }
    .bookmark-page.dark-mode .styled-wrapper .button:before {
        border-color: #ffffff;
    }
    .bookmark-page.dark-mode .button-elem svg {
        fill: #ffffff;
    }
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #3b3a30;
        color: #fff;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        z-index: 1001;
        animation: slideIn 0.5s ease forwards;
    }

    @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }

    .bookmark-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .bookmark-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .bookmark-header h1 {
      font-family: 'Playfair Display', serif;
      font-size: 3.5rem;
      color: #5c544b;
      margin: 0;
      transition: color 0.4s;
    }

    .bookmark-header p {
      font-size: 1.2rem;
      color: #9a8c82;
      margin-top: 0.5rem;
      transition: color 0.4s;
    }

    .bookmark-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2.5rem;
    }

    .bookmark-card {
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      border: 1px solid #e0dccc;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.4s, color 0.4s;
    }

    .bookmark-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 25px rgba(0,0,0,0.08);
    }

    .bookmark-image img {
      width: 100%;
      height: 220px;
      object-fit: cover;
    }

    .bookmark-info {
      padding: 1.5rem;
      text-align: center;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }

    .bookmark-info h3 {
      font-family: 'Playfair Display', serif;
      margin: 0 0 0.5rem;
      font-size: 1.4rem;
      transition: color 0.4s;
    }

    .bookmark-info p {
      color: #9a8c82;
      flex-grow: 1;
      transition: color 0.4s;
    }

    .bookmark-price {
      font-size: 1.2rem;
      font-weight: 600;
      color: #b99a6b;
      margin: 1rem 0;
      transition: color 0.4s;
    }

    .controls-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      margin-top: auto;
      flex-wrap: wrap;
    }

    .quantity-control {
      display: flex;
      align-items: center;
      border: 1px solid #e0dccc;
      border-radius: 50px;
      transition: border-color 0.4s;
    }

    .quantity-control button {
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 0.5rem 1rem;
      color: #5c544b;
      transition: color 0.4s;
    }

    .add-to-cart-btn {
      padding: 0.8rem 1.5rem;
      border: 1px solid #b99a6b;
      border-radius: 50px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      background-color: #b99a6b;
      color: #fff;
      transition: background-color 0.3s ease, border-color 0.3s ease;
    }

    .add-to-cart-btn:hover {
      background-color: #a3875a;
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
      border: 3px solid #5c544b;
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
        fill: #5c544b;
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
.add-to-wishlist-btn {
  margin-left: 10px;
  padding: 6px 12px;
  background-color: #ff69b4;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.add-to-wishlist-btn:hover {
  background-color: #ff1493;
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
        .bookmark-page { padding: 2rem 1rem; }
        .bookmark-header h1 { font-size: 2.5rem; }
        .bookmark-header p { font-size: 1rem; }
        .bookmark-grid { grid-template-columns: 1fr; gap: 1.5rem; }
        .styled-wrapper { top: 0.5rem; left: 0.5rem; }
        .theme-toggle-wrapper { top: 1rem; right: 1rem; }
    }
 `}
      </style>
      <div className={`bookmark-page ${isDarkMode ? "dark-mode" : ""}`}>
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

        {notification && <div className="notification">{notification}</div>}
        <div className="bookmark-container">
          <header className="bookmark-header">
            <h1>Handcrafted Bookmarks</h1>
            <p>Mark your page with a touch of elegance.</p>
          </header>

          <div className="bookmark-grid">
            {bookmarks.map((bm) => (
              <div key={bm.id} className="bookmark-card">
                <div className="bookmark-image">
                  <img src={bm.image} alt={bm.name} />
                </div>
                <div className="bookmark-info">
                  <h3>{bm.name}</h3>
                  <p>{bm.description}</p>
                  <div className="bookmark-price">₹{bm.price.toFixed(2)}</div>
                  <div className="controls-container">
                    <div className="quantity-control">
                      <button onClick={() => handleQuantityChange(bm.id, -1)}>
                        −
                      </button>
                      <span>{bm.quantity}</span>
                      <button onClick={() => handleQuantityChange(bm.id, 1)}>
                        +
                      </button>
                    </div>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(bm)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="add-to-wishlist-btn"
                      onClick={() => handleSaveToWishlist(bm)}
                    >
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookmarkPage;
