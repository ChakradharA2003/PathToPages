import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Potli = () => {
  const navigate = useNavigate();

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

  const [notification, setNotification] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleQuantityChange = (id, amount) => {
    setPotliBags((prev) =>
      prev.map((potliBag) =>
        potliBag.id === id
          ? { ...potliBag, quantity: Math.max(1, potliBag.quantity + amount) }
          : potliBag
      )
    );
  };

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

  const handleSaveToWishlist = (potliBag) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const existing = wishlist.find((item) => item.id === potliBag.id);

    if (!existing) {
      wishlist.push(potliBag);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
    navigate("/wishlist");
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Georgia', serif;
        }

        /* Light Theme - Home.jsx Colors */
        .potli-page {
          min-height: 100vh;
          background: #fdf8f0;
          color: #5c544b;
          padding: 40px 20px;
          transition: background 0.3s ease, color 0.3s ease;
        }

        /* Dark Theme - Home.jsx Colors */
        .potli-page.dark-mode {
          background: #1a1b2a;
          color: #fdf8f0;
        }

        .potli-page.dark-mode .potli-card {
          background: #2c2e43;
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        .potli-page.dark-mode .potli-card:hover {
          border-color: #b99a6b;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4);
        }

        .potli-page.dark-mode .potli-name {
          color: #fdf8f0;
        }

        .potli-page.dark-mode .potli-description {
          color: rgba(253, 248, 240, 0.8);
        }

        .potli-page.dark-mode .quantity-btn {
          background: #2c2e43;
          border-color: #b99a6b;
          color: #b99a6b;
        }

        .potli-page.dark-mode .quantity-btn:hover {
          background: #b99a6b;
          color: #1a1b2a;
        }

        .potli-page.dark-mode .add-to-cart-btn {
          background: #c97b63;
        }

        .potli-page.dark-mode .add-to-cart-btn:hover {
          background: #d88c75;
        }

        .potli-page.dark-mode .wishlist-btn {
          border-color: #e07a5f;
          color: #e07a5f;
        }

        .potli-page.dark-mode .wishlist-btn:hover {
          background: #e07a5f;
          color: #1a1b2a;
        }

        .potli-page.dark-mode .back-btn:before {
          border-color: #fdf8f0;
        }

        .potli-page.dark-mode .back-btn:after {
          border-color: #b99a6b;
        }

        .potli-page.dark-mode .button-elem svg path {
          fill: #fdf8f0;
        }

        .potli-page.dark-mode .notification {
          background: #2c2e43;
          color: #fdf8f0;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
        }

        /* Container */
        .potli-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Header */
        .potli-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .potli-header h1 {
          font-family: 'Playfair Display', serif;
          font-size: 3rem;
          color: #5c544b;
          margin-bottom: 10px;
        }

        .potli-page.dark-mode .potli-header h1 {
          color: #fdf8f0;
        }

        .potli-header p {
          font-size: 1.1rem;
          color: #5c544b;
          opacity: 0.8;
        }

        .potli-page.dark-mode .potli-header p {
          color: #fdf8f0;
        }

        /* Grid */
        .potli-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        /* Card */
        .potli-card {
          background: #fff;
          border: 2px solid rgba(185, 154, 107, 0.2);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .potli-card:hover {
          transform: translateY(-5px);
          border-color: #b99a6b;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .potli-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
          border-bottom: 2px solid #b99a6b;
        }

        .potli-details {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex-grow: 1;
        }

        .potli-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          color: #5c544b;
          font-weight: 700;
        }

        .potli-description {
          font-size: 0.95rem;
          color: #5c544b;
          opacity: 0.8;
          line-height: 1.5;
          flex-grow: 1;
        }

        .potli-price {
          font-size: 1.5rem;
          font-weight: bold;
          color: #c97b63;
          margin: 10px 0;
        }

        /* Quantity Controls */
        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 15px;
          justify-content: center;
          margin: 15px 0;
        }

        .quantity-btn {
          width: 36px;
          height: 36px;
          border: 2px solid #b99a6b;
          background: #fff;
          color: #b99a6b;
          border-radius: 50%;
          cursor: pointer;
          font-size: 18px;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .quantity-btn:hover {
          background: #b99a6b;
          color: #fff;
          transform: scale(1.1);
        }

        .quantity-display {
          font-size: 1.2rem;
          font-weight: 600;
          min-width: 40px;
          text-align: center;
          color: #5c544b;
        }

        .potli-page.dark-mode .quantity-display {
          color: #fdf8f0;
        }

        /* Buttons */
        .potli-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .add-to-cart-btn {
          width: 100%;
          padding: 12px;
          background: #c97b63;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Georgia', serif;
        }

        .add-to-cart-btn:hover {
          background: #d88c75;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(201, 123, 99, 0.4);
        }

        .wishlist-btn {
          width: 100%;
          padding: 12px;
          background: transparent;
          color: #c97b63;
          border: 2px solid #c97b63;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Georgia', serif;
        }

        .wishlist-btn:hover {
          background: #c97b63;
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(201, 123, 99, 0.4);
        }

        /* Back Button */
        .back-button-wrapper {
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 1000;
        }

        .back-btn {
          display: block;
          position: relative;
          width: 60px;
          height: 60px;
          overflow: hidden;
          outline: none;
          background-color: transparent;
          cursor: pointer;
          border: 0;
          transition: transform 0.3s ease;
        }

        .back-btn:hover {
          transform: scale(1.05);
        }

        .back-btn:before {
          content: "";
          position: absolute;
          border-radius: 50%;
          inset: 6px;
          border: 3px solid #5c544b;
          transition: opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) 80ms,
            transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) 80ms;
        }

        .back-btn:after {
          content: "";
          position: absolute;
          border-radius: 50%;
          inset: 6px;
          border: 4px solid #b99a6b;
          transform: scale(1.3);
          transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
            transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          opacity: 0;
        }

        .back-btn:hover:before,
        .back-btn:focus:before {
          opacity: 0;
          transform: scale(0.7);
        }

        .back-btn:hover:after,
        .back-btn:focus:after {
          opacity: 1;
          transform: scale(1);
        }

        .button-box {
          display: flex;
          position: absolute;
          top: 0;
          left: 0;
        }

        .button-elem {
          display: block;
          width: 24px;
          height: 24px;
          margin: 18px 15px 0 18px;
          transform: rotate(360deg);
        }

        .button-elem svg path {
          fill: #5c544b;
        }

        .back-btn:hover .button-box,
        .back-btn:focus .button-box {
          transition: 0.4s;
          transform: translateX(-57px);
        }

        /* Theme Toggle */
        .theme-toggle-wrapper {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
        }

        .theme-checkbox {
          --toggle-size: 12px;
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

        /* Notification */
        .notification {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #fff;
          color: #5c544b;
          padding: 20px 40px;
          border-radius: 8px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
          font-size: 1.1rem;
          font-weight: 600;
          z-index: 2000;
          border: 2px solid #b99a6b;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -60%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .potli-header h1 {
            font-size: 2rem;
          }

          .potli-grid {
            grid-template-columns: 1fr;
          }

          .back-button-wrapper,
          .theme-toggle-wrapper {
            top: 10px;
          }

          .back-button-wrapper {
            left: 10px;
          }

          .theme-toggle-wrapper {
            right: 10px;
          }

          .back-btn {
            width: 50px;
            height: 50px;
          }

          .button-elem {
            width: 20px;
            height: 20px;
            margin: 15px 12px 0 15px;
          }

          .back-btn:hover .button-box,
          .back-btn:focus .button-box {
            transform: translateX(-47px);
          }
        }

        @media (max-width: 480px) {
          .potli-page {
            padding: 20px 10px;
          }

          .potli-header h1 {
            font-size: 1.8rem;
          }

          .potli-header p {
            font-size: 1rem;
          }

          .potli-card {
            margin: 0 10px;
          }
        }
      `}</style>

      <div className={`potli-page ${isDarkMode ? "dark-mode" : ""}`}>
        {/* Back Button */}
        <div className="back-button-wrapper">
          <button
            className="back-btn"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <div className="button-box">
              <span className="button-elem">
                <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                  <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
                </svg>
              </span>
              <span className="button-elem">
                <svg viewBox="0 0 46 40">
                  <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
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

        <div className="potli-container">
          <div className="potli-header">
            <h1>Artisan Potli Bags</h1>
            <p>Exquisite handcrafted bags for every occasion.</p>
          </div>

          <div className="potli-grid">
            {potliBags.map((potli) => (
              <div key={potli.id} className="potli-card">
                <img
                  src={potli.image}
                  alt={potli.name}
                  className="potli-image"
                />
                <div className="potli-details">
                  <h2 className="potli-name">{potli.name}</h2>
                  <p className="potli-description">{potli.description}</p>
                  <p className="potli-price">₹{potli.price.toFixed(2)}</p>

                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(potli.id, -1)}
                    >
                      −
                    </button>
                    <span className="quantity-display">{potli.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(potli.id, 1)}
                    >
                      +
                    </button>
                  </div>

                  <div className="potli-actions">
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(potli)}
                    >
                      🛒 Add to Cart
                    </button>
                    <button
                      className="wishlist-btn"
                      onClick={() => handleSaveToWishlist(potli)}
                    >
                      ❤️ Save to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {notification && <div className="notification">{notification}</div>}
      </div>
    </>
  );
};

export default Potli;
