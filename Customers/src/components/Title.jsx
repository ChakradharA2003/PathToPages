import { useEffect } from "react";

const Title = () => {
  // This effect now only handles the navigation.
  // The animations are handled by CSS for better performance and to avoid dependency issues.
  useEffect(() => {
    const timer = setTimeout(() => {
      // Use standard browser navigation for a self-contained component.
      window.location.href = "/signup";
    }, 10000); // Redirect after 10 seconds

    // Cleanup the timer if the component unmounts before the time is up.
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this runs only once.

  // All styles are embedded here to prevent conflicts with other component files.
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Poppins:wght@400;700&display=swap');

    .title-container {
      height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: linear-gradient(to top, #ff9966, #ffcc66, #87ceeb);
      overflow: hidden;
      position: relative;
      font-family: 'Poppins', sans-serif;
    }

    /* --- Animations --- */
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
      100% { transform: translateY(0px); }
    }
    
    @keyframes fadeInScaleUp {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }


    .clouds, .birds {
      position: absolute;
      font-size: 2.5rem;
      opacity: 0.6;
      pointer-events: none;
      animation: float 6s ease-in-out infinite;
    }
    
    .clouds {
      top: 15%;
      left: 10%;
    }
    
    .birds {
      top: 25%;
      right: 10%;
      font-size: 2rem;
      animation-duration: 8s; /* Birds float a bit differently */
    }

    .main-title {
      font-family: 'Montserrat', sans-serif;
      font-size: 4.5rem;
      font-weight: 700;
      color: #ffffff;
      text-shadow: 3px 5px 12px rgba(0, 0, 0, 0.25);
      margin: 0;
      animation: fadeInScaleUp 2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
    }

    .tagline {
      font-size: 1.5rem;
      margin-top: 1rem;
      color: #ffffff;
      opacity: 0; /* Starts hidden */
      text-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
      animation: fadeIn 2s ease-in-out 1s forwards; /* Fades in after 1s */
    }

    /* --- Responsive Media Queries --- */
    @media (max-width: 768px) {
      .main-title {
        font-size: 3rem;
      }
      .tagline {
        font-size: 1.2rem;
        padding: 0 20px;
        text-align: center;
      }
    }

    @media (max-width: 480px) {
      .main-title {
        font-size: 2.5rem;
      }
      .tagline {
        font-size: 1rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="title-container">
        <div className="clouds">☁ ☁</div>
        <div className="birds">🕊️</div>
        <h1 className="main-title">Path 2 Page</h1>
        <p className="tagline">
          Explore the world between sunrise and sunset ✈️
        </p>
      </div>
    </>
  );
};

export default Title;
