// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const formRef = useRef(null);

  // --- Login State and Logic ---
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });
  const [loginMessage, setLoginMessage] = useState(null);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const showLoginMessage = (text, type) => {
    setLoginMessage({ text, type });
    setTimeout(() => setLoginMessage(null), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const storedData = JSON.parse(localStorage.getItem("signupData"));
    if (
      storedData &&
      loginCredentials.username === storedData.username &&
      loginCredentials.password === storedData.password
    ) {
      localStorage.setItem("user", "loggedin");
      showLoginMessage("Login Successful! Redirecting...", "success");
      setTimeout(() => {
        window.location.href = "/home";
      }, 1500);
    } else {
      showLoginMessage("Invalid username or password.", "error");
    }
  };

  // --- Signup State and Logic ---
  const [signupFormData, setSignupFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [signupMessage, setSignupMessage] = useState(null);

  const showSignupMessage = (text, type) => {
    setSignupMessage({ text, type });
    setTimeout(() => setSignupMessage(null), 3000);
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (signupFormData.password !== signupFormData.confirmPassword) {
      showSignupMessage("Passwords do not match.", "error");
      return;
    }
    localStorage.setItem("signupData", JSON.stringify(signupFormData));
    showSignupMessage("Signup successful! Please log in.", "success");
    setTimeout(() => setIsLoginView(true), 1500);
  };

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap');

    .auth-page {
      font-family: 'Poppins', sans-serif;
      background-color: #fdf8f0; /* Parchment paper background */
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      color: #5c544b;
    }

    /* --- Animations --- */
    @keyframes slide-in-up {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .auth-title {
      font-family: 'Playfair Display', serif;
      font-size: 3.5rem;
      margin-bottom: 2rem;
      color: #5c544b;
      animation: slide-in-up 0.8s ease-out;
    }

    .auth-form {
      background: rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(5px);
      padding: 2.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      border: 1px solid #e0dccc;
      width: 100%;
      max-width: 400px;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      animation: slide-in-up 0.8s ease-out 0.2s backwards;
    }

    .auth-form input, .auth-form select {
      padding: 1rem;
      border: 1px solid #e0dccc;
      border-radius: 8px;
      font-size: 1rem;
      font-family: 'Poppins', sans-serif;
      background-color: #fff;
      color: #5c544b;
      transition: box-shadow 0.3s ease;
    }

    .auth-form input:focus, .auth-form select:focus {
      outline: none;
      box-shadow: 0 0 0 2px #b99a6b;
    }

    .auth-form button {
      padding: 1rem;
      border: none;
      border-radius: 50px;
      background-color: #b99a6b;
      color: #fff;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.3s ease;
    }

    .auth-form button:hover {
      background-color: #a3875a;
      transform: translateY(-2px);
    }
    
    .message-box {
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: #fff;
        font-weight: 600;
        text-align: center;
        margin-bottom: 1.5rem;
        animation: slide-in-up 0.5s ease-out;
    }
    
    .message-box.success { background-color: #7d9d9c; }
    .message-box.error { background-color: #c97b63; }
    
    .toggle-auth {
        margin-top: 1.5rem;
        text-align: center;
        color: #9a8c82;
    }
    
    .toggle-auth button {
        background: none;
        border: none;
        color: #b99a6b;
        font-weight: 600;
        cursor: pointer;
        font-size: 1rem;
    }

    /* --- Responsive Media Queries --- */
    @media (max-width: 480px) {
      .auth-page { padding: 1rem; }
      .auth-title { font-size: 2.5rem; }
      .auth-form { padding: 1.5rem; }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="auth-page">
        {isLoginView ? (
          <>
            <h2 className="auth-title">Welcome Back</h2>
            {loginMessage && (
              <div className={`message-box ${loginMessage.type}`}>
                {loginMessage.text}
              </div>
            )}
            <form className="auth-form" ref={formRef} onSubmit={handleLogin}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                onChange={handleLoginChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                onChange={handleLoginChange}
              />
              <button type="submit">Login</button>
              <div className="toggle-auth">
                Don't have an account?{" "}
                <button onClick={() => setIsLoginView(false)}>Sign Up</button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="auth-title">Create Your Account</h2>
            {signupMessage && (
              <div className={`message-box ${signupMessage.type}`}>
                {signupMessage.text}
              </div>
            )}
            <form className="auth-form" ref={formRef} onSubmit={handleSignup}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                onChange={handleSignupChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                onChange={handleSignupChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                onChange={handleSignupChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                onChange={handleSignupChange}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                onChange={handleSignupChange}
              />
              <button type="submit">Sign Up</button>
              <div className="toggle-auth">
                Already have an account?{" "}
                <button onClick={() => setIsLoginView(true)}>Login</button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default AuthPage;
