import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Import cart utilities
import {
  getCartItems,
  removeFromCart as removeFromCartUtil,
  clearCart as clearCartUtil,
  updateCartItemQuantity,
} from "./cartUtils";

const Cart = () => {
  const navigate = useNavigate();

  // Initialize cart from localStorage using utility
  const [cartItems, setCartItems] = useState(() => getCartItems());
  const [isUpiOpen, setIsUpiOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const upiDetailsRef = useRef(null);
  const upiContentRef = useRef(null);
  const hasAnimated = useRef(false);

  // Listen for cart updates from other components (like Shop.jsx)
  useEffect(() => {
    const handleCartUpdate = () => {
      setCartItems(getCartItems());
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  // GSAP animation on component mount - Fixed to prevent dull content
  useEffect(() => {
    // Set loaded immediately to prevent dull content
    setIsLoaded(true);

    const timer = setTimeout(() => {
      if (window.gsap && !hasAnimated.current) {
        const timeline = window.gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        timeline
          .from(".back-button", { opacity: 0, x: -20, duration: 0.6 })
          .from(
            ".checkout-title",
            { opacity: 0, y: -20, duration: 0.6 },
            "-=0.4"
          )
          .from(
            ".cart-content, .empty-cart",
            { opacity: 0, y: 30, duration: 0.8 },
            "-=0.4"
          );

        hasAnimated.current = true;
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Anime.js animation for expanding/collapsing UPI details
  useEffect(() => {
    if (window.anime && upiDetailsRef.current && upiContentRef.current) {
      const upiDetailsEl = upiDetailsRef.current;
      const upiContentEl = upiContentRef.current;

      window.anime.set(upiDetailsEl, {
        height: isUpiOpen ? 0 : upiContentEl.offsetHeight,
        opacity: isUpiOpen ? 0 : 1,
      });

      window.anime.set(upiContentEl.children, {
        opacity: isUpiOpen ? 0 : 1,
      });

      if (isUpiOpen) upiDetailsEl.classList.add("visible");

      const timeline = window.anime.timeline({
        duration: 400,
        easing: "easeOutExpo",
        complete: () => {
          if (!isUpiOpen) upiDetailsEl.classList.remove("visible");
        },
      });

      timeline
        .add({
          targets: upiDetailsEl,
          height: isUpiOpen
            ? [0, upiContentEl.offsetHeight]
            : [upiContentEl.offsetHeight, 0],
        })
        .add(
          {
            targets: upiContentEl.children,
            opacity: isUpiOpen ? [0, 1] : [1, 0],
            delay: window.anime.stagger(100, { start: -150 }),
          },
          "-=400"
        );
    }
  }, [isUpiOpen]);

  // Calculate total
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Update quantity using utility
  const updateQuantity = (id, change) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity >= 1) {
        updateCartItemQuantity(id, newQuantity);
        setCartItems(getCartItems());
      }
    }
  };

  // Remove item permanently using utility
  const removeItem = (id) => {
    removeFromCartUtil(id);
    setCartItems(getCartItems());
  };

  // Clear cart permanently using utility
  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      clearCartUtil();
      setCartItems([]);
    }
  };

  // Handle back button click
  const handleGoBack = () => {
    navigate(-1);
  };

  // Handle explore collections button - navigate to shop
  const handleExploreCollections = () => {
    navigate("/shop");
  };

  // Handle checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("Proceeding to checkout...");
    // Add your checkout logic here
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .cart-container {
          width: 100%;
          min-height: 100vh;
          background: #fdf8f0;
          padding: 40px 20px;
          font-family: 'Georgia', serif;
          opacity: ${isLoaded ? "1" : "0"};
          transition: opacity 0.3s ease;
        }

        .cart-wrapper {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Animated Back Button Styles */
        .styled-wrapper {
          margin-bottom: 30px;
        }

        .styled-wrapper .button {
          display: block;
          position: relative;
          width: 76px;
          height: 76px;
          margin: 0;
          overflow: hidden;
          outline: none;
          background-color: transparent;
          cursor: pointer;
          border: 0;
          transition: transform 0.3s ease;
        }

        .styled-wrapper .button:hover {
          transform: scale(1.05);
        }

        .styled-wrapper .button:before {
          content: "";
          position: absolute;
          border-radius: 50%;
          inset: 7px;
          border: 3px solid #5c544b;
          transition: opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) 80ms,
            transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) 80ms;
        }

        .styled-wrapper .button:after {
          content: "";
          position: absolute;
          border-radius: 50%;
          inset: 7px;
          border: 4px solid #b99a6b;
          transform: scale(1.3);
          transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
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
          width: 30px;
          height: 30px;
          margin: 24px 18px 0 22px;
          transform: rotate(360deg);
          fill: #5c544b;
        }

        .styled-wrapper .button:hover .button-box,
        .styled-wrapper .button:focus .button-box {
          transition: 0.4s;
          transform: translateX(-69px);
        }

        .arrow-icon {
          width: 100%;
          height: 100%;
        }

        /* Cart Content */
        .checkout-title {
          font-size: 36px;
          font-weight: bold;
          color: #5c544b;
          margin-bottom: 30px;
          text-align: center;
          font-family: 'Georgia', serif;
        }

        .cart-content {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 30px;
        }

        .cart-items-section {
          background: #fff;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(185, 154, 107, 0.2);
        }

        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 2px solid #b99a6b;
          flex-wrap: wrap;
          gap: 15px;
        }

        .cart-count {
          font-size: 20px;
          font-weight: 600;
          color: #5c544b;
        }

        .clear-cart-btn {
          background: #c97b63;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          font-family: 'Georgia', serif;
        }

        .clear-cart-btn:hover {
          background: #d88c75;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(201, 123, 99, 0.4);
        }

        .cart-items-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .cart-item {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px;
          border: 2px solid rgba(185, 154, 107, 0.3);
          border-radius: 8px;
          transition: all 0.3s ease;
          background: #fff;
        }

        .cart-item:hover {
          border-color: #b99a6b;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .item-image {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 8px;
          border: 2px solid #b99a6b;
          flex-shrink: 0;
        }

        .item-details {
          flex: 1;
          min-width: 0;
        }

        .item-name {
          font-size: 18px;
          font-weight: 600;
          color: #5c544b;
          margin-bottom: 8px;
          word-wrap: break-word;
          font-family: 'Georgia', serif;
        }

        .item-price {
          font-size: 20px;
          font-weight: bold;
          color: #c97b63;
          margin-bottom: 10px;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-top: 10px;
          flex-wrap: wrap;
        }

        .quantity-btn {
          width: 35px;
          height: 35px;
          border: 2px solid #b99a6b;
          background: white;
          color: #b99a6b;
          border-radius: 50%;
          cursor: pointer;
          font-size: 18px;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .quantity-btn:hover {
          background: #b99a6b;
          color: white;
          transform: scale(1.1);
        }

        .quantity-display {
          font-size: 18px;
          font-weight: 600;
          min-width: 30px;
          text-align: center;
          color: #5c544b;
        }

        .remove-btn {
          background: #c97b63;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          flex-shrink: 0;
          font-family: 'Georgia', serif;
        }

        .remove-btn:hover {
          background: #d88c75;
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(201, 123, 99, 0.4);
        }

        /* Summary Section */
        .cart-summary {
          background: #fff;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          height: fit-content;
          position: sticky;
          top: 20px;
          border: 1px solid rgba(185, 154, 107, 0.2);
        }

        .summary-title {
          font-size: 24px;
          font-weight: bold;
          color: #5c544b;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 2px solid #b99a6b;
          font-family: 'Georgia', serif;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          font-size: 16px;
          gap: 10px;
        }

        .summary-label {
          color: #5c544b;
          opacity: 0.8;
        }

        .summary-value {
          font-weight: 600;
          color: #5c544b;
          text-align: right;
        }

        .summary-total {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 2px solid #b99a6b;
          font-size: 24px;
          font-weight: bold;
          gap: 10px;
        }

        .total-label {
          color: #5c544b;
        }

        .total-value {
          color: #c97b63;
          text-align: right;
        }

        .checkout-btn {
          width: 100%;
          background: #c97b63;
          color: white;
          border: none;
          padding: 16px;
          border-radius: 6px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          margin-top: 20px;
          transition: all 0.3s ease;
          font-family: 'Georgia', serif;
        }

        .checkout-btn:hover {
          background: #d88c75;
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(201, 123, 99, 0.4);
        }

        /* Empty Cart */
        .empty-cart {
          background: #fff;
          border-radius: 8px;
          padding: 60px 30px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(185, 154, 107, 0.2);
        }

        .empty-cart-icon {
          font-size: 80px;
          margin-bottom: 20px;
        }

        .empty-cart-title {
          font-size: 28px;
          font-weight: bold;
          color: #5c544b;
          margin-bottom: 10px;
          font-family: 'Georgia', serif;
        }

        .empty-cart-text {
          font-size: 16px;
          color: #5c544b;
          opacity: 0.8;
          margin-bottom: 30px;
        }

        .explore-btn {
          background: #c97b63;
          color: white;
          border: none;
          padding: 14px 32px;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Georgia', serif;
        }

        .explore-btn:hover {
          background: #d88c75;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(201, 123, 99, 0.4);
        }

        /* Payment Section */
        .payment-section {
          margin-top: 30px;
          background: #fff;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(185, 154, 107, 0.2);
        }

        .payment-title {
          font-size: 24px;
          font-weight: bold;
          color: #5c544b;
          margin-bottom: 20px;
          font-family: 'Georgia', serif;
        }

        .payment-options {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .payment-option {
          display: flex;
          align-items: center;
          padding: 15px;
          border: 2px solid rgba(185, 154, 107, 0.3);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #fff;
        }

        .payment-option:hover {
          border-color: #b99a6b;
          background: rgba(253, 248, 240, 0.5);
        }

        .payment-option input[type="radio"] {
          margin-right: 12px;
          width: 20px;
          height: 20px;
          cursor: pointer;
          flex-shrink: 0;
          accent-color: #c97b63;
        }

        .payment-option span {
          flex: 1;
          color: #5c544b;
        }

        .upi-details {
          overflow: hidden;
          margin-top: 10px;
          background: rgba(253, 248, 240, 0.5);
          border-radius: 6px;
          padding: 0 15px;
          border: 1px solid rgba(185, 154, 107, 0.2);
        }

        .upi-details.visible {
          padding: 15px;
        }

        .upi-content p {
          margin: 8px 0;
          color: #5c544b;
        }

        /* Responsive Design - Comprehensive Media Queries */
        
        /* Large Tablets and Small Laptops */
        @media (max-width: 1024px) {
          .cart-content {
            grid-template-columns: 1fr;
          }

          .cart-summary {
            position: relative;
            top: 0;
          }

          .checkout-title {
            font-size: 32px;
          }
        }

        /* Tablets */
        @media (max-width: 768px) {
          .cart-container {
            padding: 30px 15px;
          }

          .checkout-title {
            font-size: 28px;
            margin-bottom: 25px;
          }

          .cart-items-section,
          .cart-summary,
          .payment-section {
            padding: 20px;
          }

          .cart-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .item-image {
            width: 100%;
            height: 200px;
          }

          .styled-wrapper .button {
            width: 60px;
            height: 60px;
          }

          .styled-wrapper .button-elem {
            width: 24px;
            height: 24px;
            margin: 18px 14px 0 18px;
          }

          .empty-cart {
            padding: 40px 20px;
          }

          .empty-cart-icon {
            font-size: 60px;
          }

          .empty-cart-title {
            font-size: 24px;
          }

          .summary-total {
            font-size: 20px;
          }

          .checkout-btn {
            font-size: 16px;
            padding: 14px;
          }
        }

        /* Mobile Devices */
        @media (max-width: 480px) {
          .cart-container {
            padding: 20px 10px;
          }

          .checkout-title {
            font-size: 24px;
            margin-bottom: 20px;
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

          .cart-items-section,
          .cart-summary,
          .payment-section {
            padding: 15px;
          }

          .cart-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .cart-count {
            font-size: 18px;
          }

          .clear-cart-btn {
            width: 100%;
            padding: 12px;
          }

          .item-image {
            height: 180px;
          }

          .item-name {
            font-size: 16px;
          }

          .item-price {
            font-size: 18px;
          }

          .quantity-btn {
            width: 32px;
            height: 32px;
            font-size: 16px;
          }

          .quantity-display {
            font-size: 16px;
          }

          .remove-btn {
            width: 100%;
            padding: 12px;
            margin-top: 10px;
          }

          .summary-title {
            font-size: 20px;
          }

          .summary-row {
            font-size: 14px;
          }

          .summary-total {
            font-size: 18px;
          }

          .checkout-btn {
            font-size: 15px;
            padding: 12px;
          }

          .empty-cart {
            padding: 30px 15px;
          }

          .empty-cart-icon {
            font-size: 50px;
          }

          .empty-cart-title {
            font-size: 20px;
          }

          .empty-cart-text {
            font-size: 14px;
          }

          .explore-btn {
            width: 100%;
            padding: 12px 24px;
          }

          .payment-title {
            font-size: 20px;
          }

          .payment-option {
            padding: 12px;
            font-size: 14px;
          }
        }

        /* Extra Small Mobile Devices */
        @media (max-width: 360px) {
          .cart-container {
            padding: 15px 8px;
          }

          .checkout-title {
            font-size: 20px;
          }

          .cart-items-section,
          .cart-summary,
          .payment-section {
            padding: 12px;
          }

          .item-image {
            height: 150px;
          }

          .item-name {
            font-size: 14px;
          }

          .item-price {
            font-size: 16px;
          }

          .summary-total {
            font-size: 16px;
          }
        }

        /* Landscape Mobile */
        @media (max-width: 812px) and (orientation: landscape) {
          .cart-container {
            padding: 20px 15px;
          }

          .empty-cart {
            padding: 30px 20px;
          }

          .cart-item {
            flex-direction: row;
          }

          .item-image {
            width: 120px;
            height: 120px;
          }
        }
      `}</style>

      <div className="cart-container">
        <div className="cart-wrapper">
          {/* Animated Back Button */}
          <div className="styled-wrapper back-button">
            <button className="button" onClick={handleGoBack}>
              <div className="button-box">
                <span className="button-elem">
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="arrow-icon"
                  >
                    <path
                      fill="#5c544b"
                      d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                    ></path>
                  </svg>
                </span>
                <span className="button-elem">
                  <svg
                    fill="#5c544b"
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

          <h1 className="checkout-title">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h2 className="empty-cart-title">Your cart is empty</h2>
              <p className="empty-cart-text">
                Items added to your cart will appear here.
              </p>
              <button
                className="explore-btn"
                onClick={handleExploreCollections}
              >
                Explore Collections
              </button>
            </div>
          ) : (
            <div className="cart-content">
              {/* Cart Items */}
              <div className="cart-items-section">
                <div className="cart-header">
                  <div className="cart-count">
                    Cart Items ({cartItems.length})
                  </div>
                  <button className="clear-cart-btn" onClick={clearCart}>
                    Clear Cart
                  </button>
                </div>

                <div className="cart-items-list">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="item-image"
                      />
                      <div className="item-details">
                        <h3 className="item-name">{item.name}</h3>
                        <p className="item-price">₹{item.price.toFixed(2)}</p>
                        <div className="quantity-controls">
                          <button
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            −
                          </button>
                          <span className="quantity-display">
                            {item.quantity}
                          </span>
                          <button
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cart Summary */}
              <div className="cart-summary">
                <h2 className="summary-title">Order Summary</h2>
                <div className="summary-row">
                  <span className="summary-label">Subtotal</span>
                  <span className="summary-value">
                    ₹{calculateTotal().toFixed(2)}
                  </span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Shipping</span>
                  <span className="summary-value">Free</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Tax (18%)</span>
                  <span className="summary-value">
                    ₹{(calculateTotal() * 0.18).toFixed(2)}
                  </span>
                </div>
                <div className="summary-total">
                  <span className="total-label">Total</span>
                  <span className="total-value">
                    ₹{(calculateTotal() * 1.18).toFixed(2)}
                  </span>
                </div>
                <button className="checkout-btn" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}

          {/* Payment Section */}
          {cartItems.length > 0 && (
            <div className="payment-section">
              <h2 className="payment-title">Payment Options</h2>
              <div className="payment-options">
                <label className="payment-option">
                  <input type="radio" name="payment" />
                  <span>Credit/Debit Card</span>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    onChange={() => setIsUpiOpen(!isUpiOpen)}
                  />
                  <span>UPI Payment</span>
                </label>
                <div
                  ref={upiDetailsRef}
                  className="upi-details"
                  style={{ height: 0, opacity: 0 }}
                >
                  <div ref={upiContentRef} className="upi-content">
                    <p>
                      <strong>UPI ID:</strong> merchant@upi
                    </p>
                    <p>Scan QR code or enter UPI ID in your payment app</p>
                  </div>
                </div>
                <label className="payment-option">
                  <input type="radio" name="payment" />
                  <span>Net Banking</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" />
                  <span>Cash on Delivery</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
