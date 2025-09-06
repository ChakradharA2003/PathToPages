import React, { useState, useEffect, useRef } from "react";

const CheckoutPage = () => {
  const [isUpiOpen, setIsUpiOpen] = useState(false);
  const upiDetailsRef = useRef(null);
  const upiContentRef = useRef(null);

  // GSAP animation on component mount
  useEffect(() => {
    if (window.gsap) {
      const timeline = window.gsap.timeline({
        defaults: { ease: "power3.out" },
      });
      timeline
        .from(".back-button", { opacity: 0, x: -20, duration: 0.6 })
        .from(".checkout-title", { opacity: 0, y: -20, duration: 0.6 }, "-=0.4")
        .from(".payment-section", { opacity: 0, y: 30, duration: 0.8 }, "-=0.4");
    }
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
      window.anime.set(upiContentEl.children, { opacity: isUpiOpen ? 0 : 1 });

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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .checkout-body { background-color: #f4f7f9; font-family: 'Inter', sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; color: #1a202c; }
        .checkout-container { width: 100%; max-width: 450px; padding: 2rem; box-sizing: border-box; }
        .checkout-header { display: flex; align-items: center; position: relative; margin-bottom: 2rem; justify-content: center; }
        .back-button { position: absolute; left: 0; display: flex; align-items: center; gap: 0.5rem; background: none; border: none; cursor: pointer; font-size: 1rem; color: #4a5568; font-weight: 500; padding: 0.5rem; border-radius: 8px; transition: background-color 0.2s ease, color 0.2s ease; }
        .back-button:hover { background-color: #e9d8ff; color: #6B46C1; }
        .back-button svg { width: 20px; height: 20px; transition: transform 0.2s ease; }
        .back-button:hover svg { transform: translateX(-3px); }
        .checkout-title { font-size: 1.75rem; font-weight: 700; text-align: center; margin: 0; }
        .payment-section { background-color: #ffffff; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05); overflow: hidden; }
        .payment-option { padding: 1.5rem; cursor: pointer; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; transition: background-color 0.2s ease; }
        .payment-option:last-child { border-bottom: none; }
        .payment-option:hover { background-color: #fafafa; }
        .payment-option-title { font-size: 1.1rem; font-weight: 600; }
        .upi-icon { font-weight: 700; color: #6B46C1; background-color: #f3e8ff; padding: 0.5rem 0.75rem; border-radius: 6px; }
        .upi-details { padding: 0 1.5rem 1.5rem 1.5rem; box-sizing: border-box; height: 0; overflow: hidden; visibility: hidden; }
        .upi-details.visible { visibility: visible; }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; color: #4a5568; }
        .upi-input { width: 100%; padding: 0.75rem 1rem; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 1rem; box-sizing: border-box; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
        .upi-input:focus { outline: none; border-color: #6B46C1; box-shadow: 0 0 0 3px rgba(107, 70, 193, 0.2); }
        .pay-button { width: 100%; padding: 0.85rem 1rem; background-color: #6B46C1; color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: background-color 0.2s ease, transform 0.1s ease; }
        .pay-button:hover { background-color: #553c9a; }
        .pay-button:active { transform: scale(0.98); }
      `}</style>
      <div className="checkout-body">
        <div className="checkout-container">
          <header className="checkout-header">
            <button
              className="back-button"
              onClick={() => window.history.back()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              Back
            </button>
            <h1 className="checkout-title">Checkout</h1>
          </header>
          <main>
            <div className="payment-section">
              <div
                className="payment-option"
                onClick={() => setIsUpiOpen((p) => !p)}
              >
                <span className="payment-option-title">Pay with UPI</span>
                <span className="upi-icon">UPI</span>
              </div>
              <div className="upi-details" ref={upiDetailsRef}>
                <div ref={upiContentRef}>
                  <div className="form-group">
                    <label htmlFor="upi-id">Enter your UPI ID</label>
                    <input
                      id="upi-id"
                      type="text"
                      className="upi-input"
                      placeholder="yourname@bank"
                    />
                  </div>
                  <button className="pay-button">Pay Now</button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
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
    window.location.hash = "/Checkout";
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
                <a href="#/Shop">Explore Collections</a>
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
