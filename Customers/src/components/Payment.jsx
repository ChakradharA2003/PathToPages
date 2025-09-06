import React, { useState, useEffect, useRef } from "react";

const Payment = () => {
  // State for form inputs
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // Refs for animation targets
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);

  // useEffect to handle animations after the component mounts
  useEffect(() => {
    // IMPORTANT: Make sure to add these script tags to your public/index.html file
    // for GSAP and anime.js to work.
    // <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"></script>
    // <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>

    // Check if the libraries are loaded before running animations
    if (window.gsap && window.anime) {
      // GSAP Animation: Animate the title and form container on load
      window.gsap.from(titleRef.current, {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: "power2.out",
      });

      window.gsap.from(formRef.current, {
        duration: 1.5,
        opacity: 0,
        scale: 0.9,
        ease: "back.out(1.7)",
        delay: 0.5,
      });

      // anime.js Animation: Animate input fields when they appear
      window.anime({
        targets: ".form-input",
        translateX: [-100, 0],
        opacity: [0, 1],
        delay: window.anime.stagger(100, { start: 1000 }), // stagger the animation
        duration: 800,
        easing: "easeOutQuad",
      });
    }
  }, []); // Empty dependency array ensures this runs once

  // Function to handle the button click animation
  const handlePaymentClick = () => {
    if (window.anime) {
      // anime.js Animation: Add a "pop" effect to the button on click
      window.anime({
        targets: buttonRef.current,
        scale: [
          { value: 1.1, duration: 100 },
          { value: 1, duration: 300 },
        ],
        backgroundColor: ["#2563EB", "#1D4ED8"],
        easing: "easeOutQuad",
      });
    }
    console.log("Payment button clicked!");
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { cardNumber, cardName, expiry, cvv });
    // In a real app, you would integrate a payment gateway here
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div
        ref={formRef}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2
          ref={titleRef}
          className="text-4xl font-bold text-center text-gray-800 mb-8"
        >
          Secure Payment
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Card Number */}
            <div>
              <label
                htmlFor="cardNumber"
                className="block text-gray-700 font-semibold mb-2"
              >
                Card Number
              </label>
              <input
                id="cardNumber"
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="XXXX XXXX XXXX XXXX"
                className="form-input w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
              />
            </div>

            {/* Name on Card */}
            <div>
              <label
                htmlFor="cardName"
                className="block text-gray-700 font-semibold mb-2"
              >
                Name on Card
              </label>
              <input
                id="cardName"
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="John Doe"
                className="form-input w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
              />
            </div>

            {/* Expiry and CVV */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label
                  htmlFor="expiry"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Expiry Date
                </label>
                <input
                  id="expiry"
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                  className="form-input w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  required
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="cvv"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  CVV
                </label>
                <input
                  id="cvv"
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="XXX"
                  className="form-input w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  required
                />
              </div>
            </div>

            {/* Payment Button */}
            <button
              ref={buttonRef}
              type="submit"
              onClick={handlePaymentClick}
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200 shadow-md"
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
