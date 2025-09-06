import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Journal = () => {
  const navigate = useNavigate();

  // Journal product list
  const [journals, setJournals] = useState([
    {
      id: 201,
      name: "Leather-Bound Journal",
      price: 2500.0,
      description:
        "Hand-stitched leather cover with thick, cream-colored pages.",
      image:
        "https://i.pinimg.com/1200x/04/19/75/04197548c7016df0e3f283d231d6de2d.jpg",
      quantity: 1,
    },
    {
      id: 202,
      name: "Canvas Field Notebook",
      price: 1500.0,
      description:
        "Durable canvas cover, perfect for outdoor sketching and notes.",
      image:
        "https://i.pinimg.com/736x/52/64/5b/52645b4bf4a5e954cc2a501203a72990.jpg",
      quantity: 1,
    },
    {
      id: 203,
      name: "Linen Softcover Diary",
      price: 1800.0,
      description: "Elegant linen cover with a delicate floral pattern.",
      image:
        "https://i.pinimg.com/736x/16/6a/9a/166a9a275cf4de93dfafdb2e43cc6fbd.jpg",
      quantity: 1,
    },
    {
      id: 204,
      name: "Recycled Paper Sketchbook",
      price: 1200.0,
      description: "Eco-friendly journal with recycled kraft paper pages.",
      image:
        "https://i.pinimg.com/736x/24/26/07/24260783e4fb2fe6fa70363fe62a9eb3.jpg",
      quantity: 1,
    },
  ]);

  const [notification, setNotification] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Update journal quantity
  const handleQuantityChange = (id, amount) => {
    setJournals((prev) =>
      prev.map((journal) =>
        journal.id === id
          ? { ...journal, quantity: Math.max(1, journal.quantity + amount) }
          : journal
      )
    );
  };

  // Add journal to cart
  const handleAddToCart = (journal) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === journal.id);

    if (existing) {
      existing.quantity += journal.quantity;
    } else {
      cart.push({ ...journal });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    setNotification(`${journal.name} has been added to your cart!`);
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

  // Toggle dark mode
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    // The 'className' changes based on the 'isDarkMode' state, which triggers the CSS for dark mode.
    <>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap');
    
        html { scroll-behavior: smooth; }

        .journal-page {
            font-family: 'Poppins', sans-serif;
            background-color: #f8f4ed;
            padding: 4rem 2rem;
            min-height: 100vh;
            color: #3b3a30;
            transition: background-color 0.4s, color 0.4s;
            position: relative;
            overflow: hidden; /* Hide overflow for the star animation */
        }

        .journal-page.dark-mode {
            background-color: #000000;
            color: #e0e0e0;
        }
        
        .journal-page.dark-mode .journal-header h1 {
            color: #ffffff;
        }
        
        .journal-page.dark-mode .journal-header p {
            color: #a0a0a0;
        }

        .journal-page.dark-mode .journal-card {
            background-color: #2c303a;
            color: #e0e0e0;
            box-shadow: 1px 1px 12px rgba(0, 0, 0, 0.5);
        }

        .journal-page.dark-mode .journal-name, .journal-page.dark-mode .journal-price {
            color: #ffffff;
        }
        
        .journal-page.dark-mode .styled-wrapper .button:before {
            border-color: #ffffff;
        }
        
        .journal-page.dark-mode .button-elem svg {
            fill: #ffffff;
        }
        
        .journal-page.dark-mode .quantity-control button {
            background-color: #4a5568;
            color: #e0e0e0;
        }
        
        .journal-page.dark-mode .CartBtn {
            background-color: #4a5568;
            color: #e0e0e0;
        }
        
        .journal-page.dark-mode .CartBtn:hover {
            background-color: #2d3748;
        }
        
        .journal-page.dark-mode .save-btn {
            background-color: #2d3748;
            color: #e0e0e0;
        }
        
        .journal-page.dark-mode .save-btn:hover {
            background-color: #1a202c;
        }

        .journal-container {
            max-width: 1200px;
            margin: 0 auto;
            position: relative;
            z-index: 20; /* Ensure content is above the animation */
        }

        .journal-header {
            text-align: center;
            margin-bottom: 3rem;
        }

        .journal-header h1 {
            font-family: 'Playfair Display', serif;
            font-size: 3.5rem;
            color: #3b3a30;
            margin: 0;
            transition: color 0.4s;
            overflow: hidden;
        }

        .journal-header p {
            font-size: 1.2rem;
            color: #8c887e;
            margin-top: 0.5rem;
            transition: color 0.4s;
        }

        .journal-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
        }

        .journal-card {
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            transition: all 0.3s ease;
        }

        .journal-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.12);
        }

        .journal-image {
            height: 220px;
            width: 100%;
            background-size: cover;
            background-position: center;
        }

        .journal-content {
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            flex-grow: 1;
        }

        .journal-name {
            font-family: 'Playfair Display', serif;
            font-size: 1.2rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: auto;
        }

        .journal-price {
            font-family: 'Playfair Display', serif;
            font-size: 1.2rem;
            font-weight: 600;
            color: #555;
        }

        .controls-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            width: 100%;
            margin-top: 1rem;
        }

        .quantity-control {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .quantity-control button {
            background-color: #e2e8f0;
            color: #4a5568;
            border: none;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            font-size: 1.2rem;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .quantity-control button:hover {
            background-color: #cbd5e0;
        }

        .CartBtn, .save-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            width: 100%;
            max-width: 250px;
            padding: 0.8rem 1.5rem;
            border-radius: 50px;
            cursor: pointer;
            font-weight: 600;
            transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .CartBtn {
            background-color: #38b2ac;
            color: white;
            box-shadow: 0 4px 10px rgba(56, 178, 172, 0.2);
        }

        .CartBtn:hover {
            background-color: #319795;
            transform: translateY(-2px);
        }

        .CartBtn .IconContainer {
            margin-right: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .save-btn {
            position: relative;
            font-family: 'Poppins', sans-serif;
            background-color: #cbd5e0;
            color: #4a5568;
            box-shadow: 0 4px 10px rgba(203, 213, 224, 0.2);
            overflow: hidden;
            border: 2px solid #a0aec0;
            text-align: center;
            padding: 0.6rem 1.5rem;
        }

        .save-btn:hover {
            background-color: #a0aec0;
            color: #2d3748;
        }

        .save-btn .svg-wrapper-1 {
            position: relative;
            display: inline-block;
            vertical-align: middle;
        }

        .save-btn .svg-wrapper {
            display: inline-block;
        }

        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #2d3748;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1001;
            animation: slide-in 0.5s ease-out forwards;
        }

        @keyframes slide-in {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .back-button-wrapper { 
            position: fixed; 
            top: 1.5rem; 
            left: 1.5rem; 
            z-index: 1000; 
        }
        .back-button { 
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
        .back-button:before { 
            content: ""; 
            position: absolute; 
            border-radius: 50%; 
            inset: 5px; 
            border: 2px solid var(--text-color); 
            transition: all 0.4s; 
        }
        .back-button:after { 
            content: ""; 
            position: absolute; 
            border-radius: 50%; 
            inset: 5px; 
            border: 3px solid #599a53; 
            transform: scale(1.3); 
            transition: all 0.4s; 
            opacity: 0; 
        }
        .back-button:hover:before, .back-button:focus:before { 
            opacity: 0; 
            transform: scale(0.7); 
        }
        .back-button:hover:after, .back-button:focus:after { 
            opacity: 1; 
            transform: scale(1); 
        }
        .back-button-box { 
            display: flex; 
            position: absolute; 
            top: 0; 
            left: 0; 
        }
        .back-button-elem { 
            display: block; 
            width: 16px; 
            height: 16px; 
            margin: 14px; 
            transform: rotate(360deg); 
        }
        .back-button-elem svg { 
            fill: var(--text-color); 
            transition: fill 0.4s; 
        }
        .back-button:hover .back-button-box, .back-button:focus .back-button-box { 
            transition: 0.4s; 
            transform: translateX(-44px); 
        }
        `}
      </style>
      <div className={`journal-page ${isDarkMode ? "dark-mode" : ""}`}>
        {/* Back Button */}
        <div className="back-button-wrapper">
          <button
            className="back-button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <div className="back-button-box">
              <span className="back-button-elem">
                <svg viewBox="0 0 24 24">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
              </span>
              <span className="back-button-elem">
                <svg viewBox="0 0 24 24">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
              </span>
            </div>
          </button>
        </div>

        {/* Notification */}
        {notification && <div className="notification">{notification}</div>}

        {/* Journal Collection */}
        <div className="journal-container">
          <div className="journal-header">
            <h1>Our Journal Collection</h1>
            <p>
              Handcrafted journals for your thoughts, dreams, and adventures.
            </p>
          </div>

          <div className="journal-grid">
            {journals.map((journal) => (
              <div key={journal.id} className="journal-card">
                <div
                  className="journal-image"
                  style={{ backgroundImage: `url(${journal.image})` }}
                ></div>

                <div className="journal-content">
                  <h3 className="journal-name">{journal.name}</h3>
                  <p className="journal-price">₹{journal.price.toFixed(2)}</p>

                  {/* Quantity + Actions */}
                  <div className="controls-container">
                    <div className="quantity-control">
                      <button
                        onClick={() => handleQuantityChange(journal.id, -1)}
                      >
                        -
                      </button>
                      <span>{journal.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(journal.id, 1)}
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Cart */}
                    <button
                      className="CartBtn"
                      onClick={() => handleAddToCart(journal)}
                    >
                      <span className="IconContainer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                          fill="white"
                          height="1em"
                          className="cart"
                        >
                          <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                        </svg>
                      </span>
                      <p className="text">Add to Cart</p>
                    </button>

                    {/* Save to Wishlist */}
                    <button
                      className="save-btn"
                      onClick={() => handleSaveToWishlist(journal)}
                    >
                      <div className="svg-wrapper-1">
                        <div className="svg-wrapper">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 12V7H4v14h9.5M18 5L20 7L22 5" />
                            <path d="M12 2v20c0-10 1-12 5-16s7 5 7 5" />
                            <path d="M4 14l9 9" />
                          </svg>
                        </div>
                      </div>
                      <span>Save</span>
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

export default Journal;
