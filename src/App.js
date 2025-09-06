import React from "react";
import {
  HashRouter as Router, // Use HashRouter for GitHub Pages
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Import Firebase functions
import { initializeApp } from "firebase/app";

// Page components
import Title from "./components/Title.jsx";
import AuthPage from "./components/AuthPage.jsx";
import Home from "./components/Home.jsx";
import Cart from "./components/Cart.jsx";
import About from "./components/About.jsx";
import Shop from "./components/Shop.jsx";
import Bookmark from "./components/Bookmark.jsx";
import Myaccount from "./components/Myaccount.jsx";
import Journal from "./components/Journal.jsx";
import Potli from "./components/Potli.jsx";
import Thankyou from "./components/Thankyou.jsx";
import Wishlist from "./components/Wishlist.jsx";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMHYzYMD8nTbXwNIhyGvQp7tBycZyVup4",
  authDomain: "pathtopage-a2647.firebaseapp.com",
  projectId: "pathtopage-a2647",
  storageBucket: "pathtopage-a2647.firebasestorage.app",
  messagingSenderId: "534518972421",
  appId: "1:534518972421:web:1d8186ccad4c7951a95c6c",
};

// Initialize Firebase
try {
  initializeApp(firebaseConfig);
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

// Temporary Payment Page
const Payment = () => (
  <div
    style={{
      padding: "4rem",
      textAlign: "center",
      fontFamily: "Poppins, sans-serif",
    }}
  >
    <h1>Payment Gateway</h1>
    <p>Proceed with your payment here.</p>
  </div>
);

// Simulated login check
const isAuthenticated = () => !!localStorage.getItem("user");

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="title" element={<Title />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="/" element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="about" element={<About />} />
        <Route path="cart" element={<Cart />} />
        <Route path="Myaccount" element={<Myaccount />} />
        <Route path="Bookmark" element={<Bookmark />} />
        <Route path="Journal" element={<Journal />} />
        <Route path="Potli" element={<Potli />} />
        <Route path="Thankyou" element={<Thankyou />} />
        <Route path="Wishlist" element={<Wishlist />} />
        <Route
          path="/payment"
          element={
            isAuthenticated() ? (
              <Payment />
            ) : (
              <Navigate to="/auth" replace state={{ from: "/payment" }} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
