import React, { useState, useEffect, useRef } from "react";

//==================================================================
// 1. CHECKOUT COMPONENT
//==================================================================
const CheckoutPage = () => {
  const containerRef = useRef(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [isUpiVerified, setIsUpiVerified] = useState(false);

  // Sample product data
  const [products] = useState([
    { id: 1, name: "Wireless Headphones", price: 29.99, quantity: 1 },
    { id: 2, name: "USB-C Cable", price: 5.0, quantity: 2 },
    { id: 3, name: "Phone Stand", price: 9.99, quantity: 1 },
  ]);

  // Calculate subtotal dynamically
  const subtotal = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const shipping = 5.0;
  const total = subtotal + shipping;

  // GSAP for page-load animation - loaded via CDN
  useEffect(() => {
    // Check if gsap is available on the window object
    if (window.gsap) {
      window.gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  // Anime.js for payment selection micro-interaction - loaded via CDN
  useEffect(() => {
    // Check if anime is available on the window object
    if (window.anime && paymentMethod) {
      window.anime({
        targets: `#${paymentMethod}`,
        scale: [{ value: 1.05 }, { value: 1 }],
        borderColor: "#007BFF",
        duration: 500,
        easing: "easeInOutQuad",
      });
      window.anime({
        targets: `.payment-option:not(#${paymentMethod})`,
        scale: 1,
        borderColor: "#ddd",
        duration: 500,
        easing: "easeInOutQuad",
      });
    }
  }, [paymentMethod]);

  const showMessage = (message) => {
    if (document.querySelector(".custom-modal")) return;
    const modal = document.createElement("div");
    Object.assign(modal.style, {
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "1rem 2rem",
      background: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
      zIndex: "10000",
      opacity: "0",
      transition: "opacity 0.3s ease",
    });
    modal.className = "custom-modal";
    modal.innerText = message;
    document.body.appendChild(modal);
    setTimeout(() => (modal.style.opacity = "1"), 10);
    setTimeout(() => {
      modal.style.opacity = "0";
      setTimeout(() => document.body.removeChild(modal), 300);
    }, 2700);
  };

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
  };

  const handleBack = () => {
    window.location.hash = "/";
  };

  const handlePlaceOrder = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleUpiVerify = () => {
    if (upiId.includes("@")) {
      setIsUpiVerified(true);
      showMessage("UPI ID Verified!");
    } else {
      showMessage("Please enter a valid UPI ID.");
    }
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          
          .checkout-body {
            --primary-color: #007BFF;
            --secondary-color: #f4f7f9;
            --text-color: #333;
            --border-color: #ddd;
            --shadow-color: rgba(0, 0, 0, 0.05);
            --font-family: 'Inter', sans-serif;
            background-color: var(--secondary-color);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .checkout-container {
            font-family: var(--font-family);
            padding: 2rem;
            max-width: 900px;
            width: 100%;
            margin: 2rem auto;
            border-radius: 1.5rem;
            box-shadow: 0 10px 30px var(--shadow-color);
            display: flex;
            flex-direction: column;
            gap: 2rem;
            animation: fadeIn 1s ease-out;
            transition: all 0.3s ease;
            background-color: #fff;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .checkout-header {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            border-bottom: 2px solid var(--border-color);
            padding-bottom: 1.5rem;
            position: relative;
          }
          
          .back-button {
            background: none;
            border: none;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            color: var(--text-color);
            transition: transform 0.2s ease, color 0.2s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          
          .back-button:hover {
            transform: translateX(-5px);
            color: var(--primary-color);
          }

          .title {
            font-size: 2rem;
            font-weight: 700;
            color: var(--primary-color);
            margin: 0 auto;
          }

          .checkout-content {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 2rem;
            transition: all 0.3s ease;
          }

          @media (max-width: 768px) {
            .checkout-content {
              grid-template-columns: 1fr;
            }
          }

          .shipping-info, .payment-section, .order-summary {
            background-color: #fff;
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
            transition: transform 0.3s ease;
          }
          
          .shipping-info:hover, .payment-section:hover, .order-summary:hover {
            transform: translateY(-5px);
          }

          h2 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            color: var(--primary-color);
            border-bottom: 2px solid #f0f0f0;
            padding-bottom: 0.5rem;
          }

          form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .input-group {
            display: flex;
            flex-direction: column;
          }
          
          .input-group-row {
            display: flex;
            gap: 1rem;
          }
          
          .half-width {
            flex: 1;
          }

          label {
            font-size: 0.9rem;
            color: #777;
            margin-bottom: 0.5rem;
          }

          input {
            padding: 0.8rem 1rem;
            border: 1px solid var(--border-color);
            border-radius: 0.5rem;
            font-size: 1rem;
            transition: border-color 0.3s ease;
          }
          
          input:focus {
            outline: none;
            border-color: var(--primary-color);
          }

          .payment-options {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .payment-option {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            border: 2px solid var(--border-color);
            border-radius: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .payment-option:hover {
            transform: scale(1.02);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          }
          
          .payment-option.selected {
            border-color: var(--primary-color);
            background-color: #e6f0ff;
          }

          .payment-option .upi-logo,
          .payment-option .card-logo,
          .payment-option .netbanking-logo {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .payment-option svg {
            width: 100%;
            height: 100%;
          }

          .upi-details {
            margin-top: 1.5rem;
          }

          .order-summary .summary-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.8rem;
            font-size: 1rem;
            color: #555;
          }
          
          .order-summary .summary-item.total {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--primary-color);
            border-top: 2px dashed #eee;
            padding-top: 1rem;
            margin-top: 1rem;
          }

          .place-order-button {
            width: 100%;
            padding: 1rem;
            font-size: 1.1rem;
            font-weight: 600;
            color: #fff;
            background-color: var(--primary-color);
            border: none;
            border-radius: 0.75rem;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.2s ease;
          }
          
          .place-order-button:hover {
            background-color: #0056b3;
            transform: translateY(-2px);
          }
          
          /* Pop-up Modal Styling */
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }

          .modal-content {
            background-color: #fff;
            padding: 2rem;
            border-radius: 1.5rem;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            text-align: center;
            position: relative;
            transform: scale(0.95);
            animation: modalPopIn 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
          }

          @keyframes modalPopIn {
            from { transform: scale(0.7); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          
          .close-button {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #aaa;
            transition: color 0.2s ease;
          }
          
          .close-button:hover {
            color: #555;
          }
          
          .qr-code-container {
            padding: 1.5rem;
            background-color: #f8f8f8;
            border-radius: 1rem;
            margin: 1.5rem 0;
          }
          
          .qr-code {
            width: 200px;
            height: 200px;
            background-color: #fff;
            border: 1px solid #ddd;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto;
          }

          .qr-code-placeholder {
            font-size: 0.9rem;
            color: #888;
          }
          
          .payment-apps {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            margin-top: 1.5rem;
          }
          
          .app-logo {
            width: 48px;
            height: 48px;
          }
        `}
      </style>
      <div className="checkout-body">
        <div className="checkout-container" ref={containerRef}>
          <div className="checkout-header">
            <button onClick={handleBack} className="back-button">
              &larr; Back to Cart
            </button>
            <h1 className="title">Checkout</h1>
          </div>

          <div className="checkout-content">
            <div className="shipping-info">
              <h2>Shipping Information</h2>
              <form>
                <div className="input-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" placeholder="John Doe" />
                </div>
                <div className="input-group">
                  <label htmlFor="address">Address</label>
                  <input type="text" id="address" placeholder="123 Main St" />
                </div>
                <div className="input-group">
                  <label htmlFor="city">City</label>
                  <input type="text" id="city" placeholder="Springfield" />
                </div>
                <div className="input-group-row">
                  <div className="input-group half-width">
                    <label htmlFor="state">State</label>
                    <input type="text" id="state" placeholder="CA" />
                  </div>
                  <div className="input-group half-width">
                    <label htmlFor="zip">ZIP Code</label>
                    <input type="text" id="zip" placeholder="90210" />
                  </div>
                </div>
              </form>
            </div>

            <div className="payment-section">
              <h2>Payment Method</h2>
              <div className="payment-options">
                <div
                  className={`payment-option ${
                    paymentMethod === "upi" ? "selected" : ""
                  }`}
                  id="upi"
                  onClick={() => handlePaymentSelect("upi")}
                >
                  <div className="upi-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                      <path
                        fill="#2196F3"
                        d="M24,42.5c-10.2,0-18.5-8.3-18.5-18.5S13.8,5.5,24,5.5s18.5,8.3,18.5,18.5S34.2,42.5,24,42.5z"
                      />
                      <path
                        fill="#fff"
                        d="M12.4,14.6h5.8L12.9,24.8l5.8,10.2h-5.8l5.2-9.1L12.4,14.6z"
                      />
                      <path
                        fill="#fff"
                        d="M35.6,14.6h-5.8l5.2,9.1-5.2,9.1h5.8l-5.8-10.2L35.6,14.6z"
                      />
                    </svg>
                  </div>
                  <p>UPI</p>
                </div>
                <div
                  className={`payment-option ${
                    paymentMethod === "card" ? "selected" : ""
                  }`}
                  id="card"
                  onClick={() => handlePaymentSelect("card")}
                >
                  <div className="card-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                      <path
                        fill="#FFC107"
                        d="M43,10H5c-1.1,0-2,0.9-2,2v24c0,1.1,0.9,2,2,2h38c1.1,0,2-0.9,2-2V12C45,10.9,44.1,10,43,10z"
                      />
                      <path
                        fill="#E65100"
                        d="M43,18H5c-1.1,0-2-0.9-2-2v-4c0-1.1,0.9-2,2-2h38c1.1,0,2,0.9,2,2v4C45,17.1,44.1,18,43,18z"
                      />
                      <path
                        fill="#FFD54F"
                        d="M43,18H5c-1.1,0-2-0.9-2-2v-4c0-1.1,0.9-2,2-2h38c1.1,0,2,0.9,2,2v4C45,17.1,44.1,18,43,18z"
                      />
                      <path
                        fill="#2196F3"
                        d="M15,28H9c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h6c0.6,0,1,0.4,1,1v4C16,27.6,15.6,28,15,28z"
                      />
                    </svg>
                  </div>
                  <p>Card</p>
                </div>
                <div
                  className={`payment-option ${
                    paymentMethod === "netbanking" ? "selected" : ""
                  }`}
                  id="netbanking"
                  onClick={() => handlePaymentSelect("netbanking")}
                >
                  <div className="netbanking-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                      <path
                        fill="#4CAF50"
                        d="M42,24c0,9.9-8.1,18-18,18S6,33.9,6,24S14.1,6,24,6S42,14.1,42,24z"
                      />
                      <path
                        fill="#fff"
                        d="M24,10c-7.7,0-14,6.3-14,14s6.3,14,14,14s14-6.3,14-14S31.7,10,24,10z M24,34c-5.5,0-10-4.5-10-10s4.5-10,10-10s10,4.5,10,10S29.5,34,24,34z"
                      />
                      <path
                        fill="#F44336"
                        d="M29,20c0-2.8-2.2-5-5-5s-5,2.2-5,5s2.2,5,5,5S29,22.8,29,20z"
                      />
                    </svg>
                  </div>
                  <p>Net Banking</p>
                </div>
              </div>
              {paymentMethod === "upi" && (
                <div className="upi-details">
                  <h3>UPI Details</h3>
                  <div className="input-group">
                    <label htmlFor="upi-id">Enter your UPI ID</label>
                    <input
                      type="text"
                      id="upi-id"
                      placeholder="yourname@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                  </div>
                  <button onClick={handleUpiVerify} className="verify-upi-btn">
                    Verify
                  </button>
                  {isUpiVerified && (
                    <p className="upi-verified-msg">UPI ID Verified!</p>
                  )}
                </div>
              )}
            </div>
            <div className="order-summary">
              <h2>Order Summary</h2>
              <div className="summary-item">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-item">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="summary-item total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="place-order-button" onClick={handlePlaceOrder}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closePopup}>
              &times;
            </button>
            <h2>Scan & Pay</h2>
            <p>
              Use your preferred UPI app to scan the QR code and complete the
              payment.
            </p>
            <div className="product-list">
              {products.map((product) => (
                <div key={product.id} className="product-item">
                  <div className="product-item-details">
                    <span className="product-name">{product.name}</span>
                    <span className="product-qty-price">
                      {" "}
                      {product.quantity} x ${product.price.toFixed(2)}{" "}
                    </span>
                  </div>
                  <span className="product-total-price">
                    ${(product.price * product.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="qr-code-container">
              <div className="qr-code">
                <span className="qr-code-placeholder">QR Code Placeholder</span>
              </div>
            </div>
            <div className="payment-apps">
              <img
                src="https://placehold.co/48x48/000000/FFFFFF?text=GPay"
                alt="GPay Logo"
                className="app-logo"
              />
              <img
                src="https://placehold.co/48x48/000000/FFFFFF?text=PhonePe"
                alt="PhonePe Logo"
                className="app-logo"
              />
              <img
                src="https://placehold.co/48x48/000000/FFFFFF?text=Paytm"
                alt="Paytm Logo"
                className="app-logo"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

//==================================================================
// 2. CART COMPONENT
//==================================================================
const CartPage = () => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart && JSON.parse(savedCart).length > 0)
        return JSON.parse(savedCart);
      return [
        {
          id: 1,
          name: "Elegant Journal",
          price: 850,
          quantity: 1,
          image: "https://placehold.co/100x100/F8F5F2/333?text=Journal",
        },
        {
          id: 2,
          name: "Handcrafted Potli",
          price: 1200,
          quantity: 1,
          image: "https://placehold.co/100x100/F8F5F2/333?text=Potli",
        },
      ];
    } catch {
      return [];
    }
  });

  const [exitingItems, setExitingItems] = useState({});

  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current)
      localStorage.setItem("cart", JSON.stringify(cartItems));
    else didMount.current = true;
  }, [cartItems]);

  const handleQuantityChange = (id, amount) => {
    setCartItems((p) =>
      p.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setExitingItems((p) => ({ ...p, [id]: true }));
    setTimeout(() => {
      setCartItems((p) => p.filter((item) => item.id !== id));
      setExitingItems((p) => {
        const n = { ...p };
        delete n[id];
        return n;
      });
    }, 500);
  };

  const handleClearCart = () => {
    if (cartItems.length === 0) return;
    const allIds = cartItems.reduce(
      (acc, it) => ((acc[it.id] = true), acc),
      {}
    );
    setExitingItems(allIds);
    setTimeout(() => {
      setCartItems([]);
      setExitingItems({});
    }, 500);
  };

  const showMessage = (message) => {
    if (document.querySelector(".custom-modal")) return;
    const modal = document.createElement("div");
    Object.assign(modal.style, {
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "1rem 2rem",
      background: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
      zIndex: "10000",
      opacity: "0",
      transition: "opacity 0.3s ease",
    });
    modal.className = "custom-modal";
    modal.innerText = message;
    document.body.appendChild(modal);
    setTimeout(() => (modal.style.opacity = "1"), 10);
    setTimeout(() => {
      modal.style.opacity = "0";
      setTimeout(() => document.body.removeChild(modal), 300);
    }, 2700);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showMessage("Your cart is empty!");
      return;
    }
    showMessage("Redirecting to checkout...");
    window.location.hash = "/checkout";
  };

  const subtotal = cartItems.reduce(
    (acc, it) => acc + it.price * it.quantity,
    0
  );
  const shippingCost = subtotal > 4000 ? 0 : 150;
  const taxAmount = subtotal * 0.18;
  const total = subtotal + shippingCost + taxAmount;
  const headerText = "Your Cart".split("").map((letter, index) => (
    <span
      key={index}
      className="letter"
      style={{ animationDelay: `${index * 0.03}s` }}
    >
      {letter === " " ? "\u00A0" : letter}
    </span>
  ));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap');
        .cart-body { --bg-color: #F8F5F2; --text-color: #333; --card-bg: #FFFFFF; --border-color: #EAEAEA; --shadow-color: rgba(0,0,0,0.07); --checkout-btn-bg: #A2B5CD; --checkout-btn-hover-bg: #8E9EAD; font-family: 'Poppins', sans-serif; background-color: var(--bg-color); color: var(--text-color); padding: 2rem 1rem; min-height: 100vh; }
        .cart-container { max-width: 1200px; margin: 0 auto; padding-top: 6rem; display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; }
        .cart-header-container { grid-column: 1 / -1; margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center; }
        @keyframes text-fade-in { from { transform: translateY(-100px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .cart-header .letter { display: inline-block; opacity: 0; animation: text-fade-in 1.4s ease-out forwards; }
        .cart-header { font-family: 'Playfair Display', serif; font-size: 2.5rem; margin: 0; }
        .cart-items-list, .cart-summary { background: var(--card-bg); border-radius: 15px; padding: 2rem; box-shadow: 0 10px 30px var(--shadow-color); }
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .cart-item { display: flex; align-items: center; margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); opacity: 0; animation: fade-in 0.5s ease-out forwards; }
        .cart-item.exiting { transition: opacity 0.5s ease-in, transform 0.5s ease-in; opacity: 0; transform: translateX(-100px); }
        .cart-item:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .cart-item-image img { width: 100px; height: 100px; object-fit: cover; border-radius: 10px; margin-right: 1.5rem; }
        .cart-item-details { flex-grow: 1; }
        .cart-item-details h3 { margin: 0 0 0.5rem; font-size: 1.2rem; }
        .cart-item-details p { margin: 0; color: #777; }
        .cart-item-actions { display: flex; align-items: center; gap: 1rem; }
        .quantity-control { display: flex; align-items: center; border: 1px solid #ddd; border-radius: 50px; }
        .quantity-control button { background: none; border: none; font-size: 1.2rem; cursor: pointer; padding: 0.5rem 1rem; color: #777; }
        .quantity-control span { padding: 0 0.5rem; font-weight: 600; }
        .remove-btn { background: none; border: none; color: #ff6b6b; cursor: pointer; font-size: 1.2rem; transition: color 0.3s; }
        .remove-btn:hover { color: #e03131; }
        .cart-summary { align-self: start; }
        .cart-summary h2 { font-family: 'Playfair Display', serif; margin-top: 0; }
        .summary-row { display: flex; justify-content: space-between; margin-bottom: 1rem; }
        .summary-row.total { font-weight: 600; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color); }
        .checkout-btn { width: 100%; padding: 1rem; background-color: var(--checkout-btn-bg); color: #fff; font-size: 1.1rem; font-weight: 600; border: none; border-radius: 50px; cursor: pointer; transition: all 0.3s ease; margin-top: 1rem; }
        .checkout-btn:hover { background-color: var(--checkout-btn-hover-bg); transform: translateY(-3px); }
        .empty-cart-container { grid-column: 1 / -1; display: flex; align-items: center; justify-content: center; min-height: 60vh; text-align: center; }
        .empty-cart-message a { display: inline-block; margin-top: 1.5rem; padding: 0.8rem 2rem; background-color: #5c544b; color: #fff; text-decoration: none; border-radius: 50px; transition: background-color 0.3s; }
        .empty-cart-message a:hover { background-color: #4a453d; }
        .clear-cart-btn { background: #ff6b6b; color: white; border: none; padding: 0.5rem 1rem; border-radius: 50px; cursor: pointer; transition: background 0.3s; font-weight: 600; }
        .clear-cart-btn:hover { background: #e03131; }
        @media (max-width: 768px) { .cart-container { grid-template-columns: 1fr; } }
      `}</style>
      <div className="cart-body">
        <div className="cart-container">
          {cartItems.length > 0 ? (
            <>
              <div className="cart-header-container">
                <h1 className="cart-header">{headerText}</h1>
                <button className="clear-cart-btn" onClick={handleClearCart}>
                  Clear Cart
                </button>
              </div>
              <div className="cart-items-list">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`cart-item ${
                      exitingItems[item.id] ? "exiting" : ""
                    }`}
                    style={{ animationDelay: `${index * 0.2 + 0.2}s` }}
                  >
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-item-details">
                      <h3>{item.name}</h3>
                      <p>₹{item.price.toFixed(2)}</p>
                    </div>
                    <div className="cart-item-actions">
                      <div className="quantity-control">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-summary">
                <h2>Order Summary</h2>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>
                    {shippingCost === 0
                      ? "Free"
                      : `₹${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="summary-row">
                  <span>Tax (18% GST)</span>
                  <span>₹{taxAmount.toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <button className="checkout-btn" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            </>
          ) : (
            <div className="empty-cart-container">
              <div className="empty-cart-message">
                <h2>Your cart is currently empty.</h2>
                <p>Items added to your cart will appear here.</p>
                <a href="#/">Explore Collections</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

//==================================================================
// 3. MAIN APP COMPONENT (WITH ROUTER)
//==================================================================
function App() {
  const [route, setRoute] = useState(window.location.hash || "#/");

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || "#/");
    };

    window.addEventListener("hashchange", handleHashChange);
    // Set initial route
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Simple router logic
  const renderPage = () => {
    switch (route) {
      case "#/checkout":
        return <CheckoutPage />;
      case "#/":
      default:
        return <CartPage />;
    }
  };

  return <div>{renderPage()}</div>;
}

export default App;
