import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// The main component for displaying the potli bag product grid.
const PotliPage = () => {

  const navigate = useNavigate();
  
  // State to hold the list of potli bags with their details.
  const [potliBags, setPotliBags] = useState([
    {
      id: 301,
      name: "Embroidered Silk Potli",
      price: 3500.0,
      description:
        "Luxurious silk bag with intricate floral embroidery and a pearl handle.",
      image:
        "https://placehold.co/600x400/965A7C/FFFFFF?text=Embroidered+Potli",
      quantity: 1,
    },
    {
      id: 302,
      name: "Velvet Gota Potli",
      price: 2800.0,
      description:
        "Rich velvet fabric adorned with traditional golden gota patti work.",
      image: "https://placehold.co/600x400/C14953/FFFFFF?text=Velvet+Potli",
      quantity: 1,
    },
    {
      id: 303,
      name: "Mirror Work Potli",
      price: 2200.0,
      description:
        "Handcrafted with colorful thread, tassels, and delicate mirror work.",
      image: "https://placehold.co/600x400/F4B43B/333333?text=Mirror+Work",
      quantity: 1,
    },
    {
      id: 304,
      name: "Brocade Festive Potli",
      price: 1800.0,
      description:
        "Elegant brocade fabric with traditional zari patterns for a classic look.",
      image: "https://placehold.co/600x400/8B8C7A/FFFFFF?text=Brocade+Potli",
      quantity: 1,
    },
  ]);

  // State for the notification message
  const [notification, setNotification] = useState("");
  // State for the dark mode toggle
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to handle quantity changes for a specific potli bag item.
  const handleQuantityChange = (id, amount) => {
    setPotliBags((prev) =>
      prev.map((potliBag) =>
        potliBag.id === id
          ? { ...potliBag, quantity: Math.max(1, potliBag.quantity + amount) }
          : potliBag
      )
    );
  };

  // Function to handle adding a potli bag to the shopping cart.
  const handleAddToCart = (potliBag) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === potliBag.id);

    if (existing) {
      existing.quantity += potliBag.quantity;
    } else {
      cart.push({ ...potliBag });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    setNotification(`${potliBag.name} has been added to your cart!`);
    setTimeout(() => {
      setNotification("");
      navigate("/cart");
    }, 1500);
  };
 // Save journal to wishlist
  const handleSaveToWishlist = (journal) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const existing = wishlist.find((item) => item.id === journal.id);

    if (!existing) {
      wishlist.push(journal);
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

    .potli-page {
      font-family: 'Poppins', sans-serif;
      background-color: #fdf6f6;
      padding: 4rem 2rem;
      min-height: 100vh;
      color: #4a2d3e;
      transition: background-color 0.4s, color 0.4s;
      position: relative;
    }
    
    /* Dark Mode Styles */
    .potli-page.dark-mode {
        background-color: #1a1d24;
        color: #e0e0e0;
    }
    .potli-page.dark-mode .potli-header h1 {
        color: #ffffff;
    }
    .potli-page.dark-mode .potli-header p {
        color: #a0a0a0;
    }
    .potli-page.dark-mode .potli-card {
        background-color: #2c303a;
        color: #e0e0e0;
        border-color: #4a4f5a;
        box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    }
    .potli-page.dark-mode .potli-info h3 {
        color: #ffffff;
    }
    .potli-page.dark-mode .potli-info p {
        color: #a0a0a0;
    }
    .potli-page.dark-mode .potli-price {
        color: #e5b8a5;
    }
    .potli-page.dark-mode .quantity-control {
        border-color: #4a4f5a;
    }
    .potli-page.dark-mode .quantity-control button {
        color: #e0e0e0;
    }
    .potli-page.dark-mode .add-to-cart-btn {
        background-color: #4a4f5a;
        border-color: #4a4f5a;
        color: #ffffff;
    }
    .potli-page.dark-mode .add-to-cart-btn:hover {
        background-color: #5a5f6a;
    }
    .potli-page.dark-mode .styled-wrapper .button:before {
        border-color: #ffffff;
    }
    .potli-page.dark-mode .button-elem svg {
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

    .potli-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .potli-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .potli-header h1 {
      font-family: 'Playfair Display', serif;
      font-size: 3.5rem;
      color: #4a2d3e;
      margin: 0;
      transition: color 0.4s;
    }

    .potli-header p {
      font-size: 1.2rem;
      color: #7d6b79;
      margin-top: 0.5rem;
      transition: color 0.4s;
    }

    .potli-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2.5rem;
    }

    .potli-card {
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.07);
      border: 1px solid #f2e0e0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.4s, color 0.4s;
    }

    .potli-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 28px rgba(0,0,0,0.1);
    }

    .potli-image img {
      width: 100%;
      height: 240px;
      object-fit: cover;
    }

    .potli-info {
      padding: 1.5rem;
      text-align: center;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }

    .potli-info h3 {
      font-family: 'Playfair Display', serif;
      margin: 0 0 0.5rem;
      font-size: 1.4rem;
      transition: color 0.4s;
    }

    .potli-info p {
      color: #7d6b79;
      flex-grow: 1;
      transition: color 0.4s;
    }

    .potli-price {
      font-size: 1.2rem;
      font-weight: 600;
      color: #c14953;
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
      border: 1px solid #f2e0e0;
      border-radius: 50px;
      transition: border-color 0.4s;
    }

    .quantity-control button {
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 0.5rem 1rem;
      color: #4a2d3e;
      transition: color 0.4s;
    }

    .add-to-cart-btn {
      padding: 0.8rem 1.5rem;
      border: 1px solid #c14953;
      border-radius: 50px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      background-color: #c14953;
      color: #fff;
      transition: background-color 0.3s ease, border-color 0.3s ease;
    }

    .add-to-cart-btn:hover {
      background-color: #a13c45;
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
      border: 3px solid #4a2d3e;
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
        fill: #4a2d3e;
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
        .potli-page { padding: 4rem 1rem; }
        .potli-header h1 { font-size: 2.5rem; }
        .potli-header p { font-size: 1rem; }
        .potli-grid { grid-template-columns: 1fr; gap: 1.5rem; }
        .styled-wrapper { top: 0.5rem; left: 0.5rem; }
        .theme-toggle-wrapper { top: 1rem; right: 1rem; }
    }
`}
      </style>
      <div className={`potli-page ${isDarkMode ? "dark-mode" : ""}`}>
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

        {notification && <div className="notification">{notification}</div>}
        <div className="potli-container">
          <header className="potli-header">
            <h1>Artisanal Potli Bags</h1>
            <p>Carry your essentials in style.</p>
          </header>

          <div className="potli-grid">
            {potliBags.map((potli) => (
              <div key={potli.id} className="potli-card">
                <div className="potli-image">
                  <img src={potli.image} alt={potli.name} />
                </div>
                <div className="potli-info">
                  <h3>{potli.name}</h3>
                  <p>{potli.description}</p>
                  <div className="potli-price">₹{potli.price.toFixed(2)}</div>
                  <div className="controls-container">
                    <div className="quantity-control">
                      <button
                        onClick={() => handleQuantityChange(potli.id, -1)}
                      >
                        −
                      </button>
                      <span>{potli.quantity}</span>
                      <button onClick={() => handleQuantityChange(potli.id, 1)}>
                        +
                      </button>
                    </div>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(potli)}
                    >
                      Add to Cart
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

export default PotliPage;
