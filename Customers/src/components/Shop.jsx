import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// Import utilities
import { addToCartUtil } from "./cartUtils";
import { addToWishlist } from "./wishlistUtils";

const ShopPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const hasAnimated = useRef(false);

  const products = [
    {
      id: 1,
      name: "The Wanderer's Journal",
      price: 3500.0,
      description: "A handcrafted leather journal to document your journeys.",
      image:
        "https://i.pinimg.com/736x/e0/62/01/e06201d44f84f51fceb8fc621d690740.jpg",
      link: "/Journal",
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
    // ,
    // {
    //   id: 3,
    //   name: "Artisan Potli Bag",
    //   price: 2500.0,
    //   description: "Hand-stitched cloth bag for your travel essentials.",
    //   image:
    //     "https://i.pinimg.com/736x/3d/bf/7f/3dbf7f85e9d89bdb7d82c9dfe83eb36a.jpg",
    //   link: "/PotliBag",
    // }
  ];

  const handleNavigation = (path) => {
    window.location.href = `#${path}`;
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handle Add to Cart
  const handleAddToCart = (product) => {
    try {
      addToCartUtil(product);
      alert(`✅ ${product.name} has been added to your cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("❌ Failed to add item to cart. Please try again.");
    }
  };

  // Handle Add to Wishlist
  const handleAddToWishlist = (product) => {
    const result = addToWishlist(product);
    alert(result.message);
  };

  useEffect(() => {
    const loadScripts = () => {
      const scripts = [
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js",
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

      window.gsap.registerPlugin(window.ScrollTrigger);

      window.gsap.from(".shop-header h1", {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: "power3.out",
      });

      window.gsap.from(".shop-header p", {
        duration: 1,
        y: -30,
        opacity: 0,
        delay: 0.3,
        ease: "power3.out",
      });

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

      hasAnimated.current = true;
    };

    loadScripts();
  }, []);

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap');

    html { scroll-behavior: smooth; }
    
    body {
      margin: 0;
      padding: 0;
      font-family: 'Poppins', sans-serif;
    }

    .shop-page {
      background-color: #fdf8f0;
      padding: 4rem 2rem;
      min-height: 100vh;
      color: #5c544b;
      transition: background-color 0.4s, color 0.4s;
      position: relative;
    }

    .shop-page.dark-mode {
      background-color: #1a1b2a;
      color: #fdf8f0;
    }

    .shop-page.dark-mode .shop-header h1 { color: #fdf8f0; }
    .shop-page.dark-mode .shop-header p { color: #fdf8f0; opacity: 0.8; }
    .shop-page.dark-mode .product-card {
      background-color: #2c2e43;
      color: #fdf8f0;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    }
    .shop-page.dark-mode .product-info h3 { color: #fdf8f0; }
    .shop-page.dark-mode .product-info p { color: rgba(253, 248, 240, 0.8); }
    .shop-page.dark-mode .action-btn {
      background-color: #3d405b;
      color: #fdf8f0;
    }
    .shop-page.dark-mode .action-btn:hover { 
      background-color: #5c544b;
      box-shadow: 0 6px 20px rgba(92, 84, 75, 0.4);
    }
    .shop-page.dark-mode .add-to-cart-btn {
      background-color: #b99a6b;
      color: #1a1b2a;
    }
    .shop-page.dark-mode .add-to-cart-btn:hover { 
      background-color: #c97b63;
      box-shadow: 0 6px 20px rgba(201, 123, 99, 0.4);
    }
    .shop-page.dark-mode .add-to-wishlist-btn {
      background-color: #e07a5f;
      color: #1a1b2a;
    }
    .shop-page.dark-mode .add-to-wishlist-btn:hover { 
      background-color: #d88c75;
      box-shadow: 0 6px 20px rgba(224, 122, 95, 0.4);
    }
    .shop-page.dark-mode .styled-wrapper .button:before { border-color: #fdf8f0; }
    .shop-page.dark-mode .button-elem svg { fill: #fdf8f0; }

    .shop-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .shop-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .shop-header h1 {
      font-family: 'Playfair Display', serif;
      font-size: 3.5rem;
      color: #5c544b;
      margin: 0 0 0.5rem;
      transition: color 0.4s;
    }

    .shop-header p {
      font-size: 1.2rem;
      color: #5c544b;
      opacity: 0.8;
      transition: color 0.4s;
    }

    .shop-grid {
      display: grid;
      gap: 3rem;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      justify-items: center;
    }

    .product-card {
      background: #fff;
      border-radius: 10px;
      width: 500px;
      height: 850px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 2.3rem;
      transition: all 0.4s ease;
      padding: 1.5rem;
      align-items: center;
      text-align: center;
      margin-bottom: 2rem;
      border: 1px solid rgba(185, 154, 107, 0.2);
    }

    .product-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
      border-color: #b99a6b;
    }

    .product-image {
      width: 100%;
      position: relative;
      padding-bottom: 100%;
      border-radius: 8px;
      overflow: hidden;
      border: 2px solid #b99a6b;
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

    .product-info {
      padding: 0;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex-grow: 1;
      width: 100%;
    }

    .product-info h3 {
      font-family: 'Playfair Display', serif;
      margin: 0 0 0.5rem;
      font-size: 1.8rem;
      transition: color 0.4s;
      color: #5c544b;
    }

    .product-info .product-price {
      font-size: 1.5rem;
      font-weight: 700;
      color: #c97b63;
      margin: 0.5rem 0;
    }

    .product-info p {
      color: #5c544b;
      opacity: 0.8;
      margin-bottom: 2rem;
      font-size: 1.1rem;
      flex-grow: 1;
      transition: color 0.4s;
    }

    .product-actions {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
    }

    .action-btn {
      padding: 1rem 2rem;
      border: 2px solid #5c544b;
      border-radius: 6px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      background-color: transparent;
      color: #5c544b;
      transition: all 0.3s ease;
      width: 100%;
      font-family: 'Georgia', serif;
    }

    .action-btn:hover { 
      background-color: #5c544b;
      color: #fdf8f0;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(92, 84, 75, 0.3);
    }

    .add-to-cart-btn {
      padding: 1rem 2rem;
      border: none;
      border-radius: 6px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      background-color: #c97b63;
      color: #fff;
      transition: all 0.3s ease;
      width: 100%;
      font-family: 'Georgia', serif;
    }

    .add-to-cart-btn:hover {
      background-color: #d88c75;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(201, 123, 99, 0.4);
    }

    .add-to-wishlist-btn {
      padding: 1rem 2rem;
      border: 2px solid #c97b63;
      border-radius: 6px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      background-color: transparent;
      color: #c97b63;
      transition: all 0.3s ease;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-family: 'Georgia', serif;
    }

    .add-to-wishlist-btn:hover {
      background-color: #c97b63;
      color: #fff;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(201, 123, 99, 0.4);
    }

    /* Back Button */
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
      border: 2px solid #5c544b;
      transition: all 0.4s;
    }

    .styled-wrapper .button:after {
      content: "";
      position: absolute;
      border-radius: 50%;
      inset: 5px;
      border: 3px solid #b99a6b;
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
      fill: #5c544b;
      transition: fill 0.4s;
    }

    .styled-wrapper .button:hover .button-box,
    .styled-wrapper .button:focus .button-box {
      transition: 0.4s;
      transform: translateX(-44px);
    }

    /* Theme Toggle */
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
      width: 2em;
      height: 2em;
      position: absolute;
      top: 0.375em;
      left: 0.375em;
      background: #b99a6b;
      border-radius: 50%;
      transition: 0.4s;
    }

    .theme-checkbox:checked::before {
      left: calc(100% - 2em - 0.375em);
      background: #c97b63;
    }

    .theme-checkbox:checked { 
      background-position: 100%; 
    }

    /* Responsive */
    @media (max-width: 768px) {
      .shop-page {
        padding: 3rem 1.5rem;
      }

      .shop-header h1 { 
        font-size: 2.5rem; 
      }

      .shop-grid { 
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .product-card {
        width: 100%;
        max-width: 350px;
      }

      .styled-wrapper {
        top: 0.5rem;
        left: 0.5rem;
      }

      .theme-toggle-wrapper {
        top: 0.5rem;
        right: 0.5rem;
      }
    }

    @media (max-width: 480px) {
      .shop-page {
        padding: 2rem 1rem;
      }

      .shop-header h1 { 
        font-size: 2rem; 
      }

      .shop-header p {
        font-size: 1rem;
      }

      .product-card {
        padding: 1.5rem;
      }

      .product-info h3 {
        font-size: 1.5rem;
      }

      .product-info .product-price {
        font-size: 1.3rem;
      }

      .product-info p {
        font-size: 1rem;
      }

      .action-btn,
      .add-to-cart-btn,
      .add-to-wishlist-btn {
        padding: 0.8rem 1.5rem;
        font-size: 1rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>

      <div className={`shop-page ${isDarkMode ? "dark-mode" : ""}`}>
        {/* Back Button */}
        <div className="styled-wrapper">
          <button
            className="button"
            onClick={() => window.history.back()}
            aria-label="Go back to previous page"
          >
            <div className="button-box">
              <span className="button-elem">
                <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                  <path
                    transform="scale(-1,1) translate(-46,0)"
                    d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                  ></path>
                </svg>
              </span>
              <span className="button-elem">
                <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                  <path
                    transform="scale(-1,1) translate(-46,0)"
                    d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                  ></path>
                </svg>
              </span>
            </div>
          </button>
        </div>

        {/* Main Content */}
        <div className="shop-container">
          <header className="shop-header">
            <h1>Our Collection</h1>
            <p>Handcrafted treasures for your journeys</p>
          </header>

          <div className="shop-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-price">₹{product.price.toFixed(2)}</p>
                  <p>{product.description}</p>
                  <div className="product-actions">
                    <button
                      className="action-btn"
                      onClick={() => handleNavigation(product.link)}
                    >
                      View Product
                    </button>

                    <button
                      className="add-to-wishlist-btn"
                      onClick={() => handleAddToWishlist(product)}
                    >
                      ❤️ Add to Wishlist
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

export default ShopPage;
