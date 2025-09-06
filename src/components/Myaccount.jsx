import React, { useState, useEffect, useRef } from "react";

// --- SVG Icons ---
// Using inline SVGs is a good practice in React to avoid extra HTTP requests.
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);
const OrdersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);
const BillingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
);
const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);
const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const BackButtonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const contentRef = useRef(null);
  const isFirstRun = useRef(true);

  // This useEffect handles the GSAP intro animation on component mount.
  useEffect(() => {
    // We add a small delay to give the async scripts a better chance to load before we use them.
    const timer = setTimeout(() => {
      if (window.gsap) {
        window.gsap.from(".account-container", {
          duration: 0.8,
          opacity: 0,
          y: 50,
          ease: "power3.out",
        });
        window.gsap.from(".sidebar-nav li", {
          duration: 0.6,
          opacity: 0,
          x: -30,
          stagger: 0.1,
          delay: 0.4,
          ease: "power2.out",
        });
        window.gsap.from(".profile-header", {
          duration: 0.7,
          opacity: 0,
          scale: 0.9,
          delay: 0.2,
          ease: "back.out(1.7)",
        });
        // Animate the initial content section on load
        window.gsap.from(contentRef.current, {
          duration: 0.5,
          opacity: 0,
          y: 20,
          delay: 0.6,
          ease: "power2.out",
        });
      }
    }, 100); // 100ms delay

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  // This useEffect handles animations for subsequent tab changes.
  useEffect(() => {
    // We skip the animation on the first render because the mount animation handles it.
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    if (contentRef.current && window.gsap) {
      // Animate the content section when a new tab is selected
      window.gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { duration: 0.5, opacity: 1, y: 0, ease: "power3.out" }
      );
    }
  }, [activeTab]);

  // Function to handle tab changes
  const handleTabClick = (e, tab) => {
    e.preventDefault();
    setActiveTab(tab);
  };

  // --- RENDERABLE CONTENT FOR EACH TAB ---
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSection />;
      case "orders":
        return <OrdersSection />;
      case "billing":
        return <BillingSection />;
      case "settings":
        return <SettingsSection />;
      default:
        return <ProfileSection />;
    }
  };

  // --- MOCK DATA ---
  const user = {
    name: "Alexender Smith",
    email: "alex.smith@business.com",
    memberSince: "Jan 20, 2024",
    avatar: "https://placehold.co/100x100/EFEFEF/333?text=AS",
  };

  return (
    <>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js"
        async
      ></script>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"
        async
      ></script>

      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

                :root {
                    --primary-color: #4a90e2;
                    --secondary-color: #50e3c2;
                    --background-color: #f4f7f6;
                    --card-background: #ffffff;
                    --text-color: #333;
                    --text-light: #777;
                    --border-color: #eaeaea;
                    --shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
                    --border-radius: 12px;
                }

                body {
                    font-family: 'Poppins', sans-serif;
                    background-color: var(--background-color);
                    color: var(--text-color);
                    margin: 0;
                }

                .account-container {
                    display: flex;
                    width: 100%;
                    height: 100vh;
                    background-color: var(--card-background);
                    overflow: hidden;
                }

                /* Sidebar Styles */
                .sidebar {
                    width: 260px;
                    background-color: #fdfdfd;
                    padding: 30px 20px;
                    border-right: 1px solid var(--border-color);
                    display: flex;
                    flex-direction: column;
                }

                .back-btn {
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    color: var(--text-light);
                    padding: 10px;
                    margin-bottom: 10px;
                    align-self: flex-start;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 44px;
                    height: 44px;
                    transition: background-color 0.3s, color 0.3s;
                }

                .back-btn:hover {
                    background-color: #f0f0f0;
                }

                .profile-header {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    margin-bottom: 40px;
                }

                .profile-avatar {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-bottom: 15px;
                    border: 3px solid var(--primary-color);
                }

                .profile-name {
                    font-size: 1.1rem;
                    font-weight: 600;
                    margin: 0;
                }

                .profile-email {
                    font-size: 0.85rem;
                    color: var(--text-light);
                }
                
                .sidebar-nav {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    flex-grow: 1;
                }

                .sidebar-nav li {
                    margin-bottom: 10px;
                }

                .sidebar-nav a {
                    display: flex;
                    align-items: center;
                    padding: 12px 15px;
                    border-radius: 8px;
                    text-decoration: none;
                    color: var(--text-light);
                    font-weight: 500;
                    transition: background-color 0.3s, color 0.3s;
                }

                .sidebar-nav a svg {
                    margin-right: 15px;
                    width: 20px;
                    height: 20px;
                }
                
                .sidebar-nav a.active,
                .sidebar-nav a:hover {
                    background-color: var(--primary-color);
                    color: white;
                }

                .logout-btn {
                    display: flex;
                    align-items: center;
                    padding: 12px 15px;
                    border: none;
                    background: transparent;
                    color: var(--text-light);
                    font-weight: 500;
                    font-size: 1rem;
                    font-family: 'Poppins', sans-serif;
                    border-radius: 8px;
                    cursor: pointer;
                    width: 100%;
                    transition: background-color 0.3s, color 0.3s;
                }

                .logout-btn:hover {
                     background-color: #ff4d4d;
                     color: white;
                }
                
                .logout-btn svg {
                     margin-right: 15px;
                }

                /* Main Content Styles */
                .main-content {
                    flex: 1;
                    padding: 40px;
                    overflow-y: auto;
                }

                .content-header {
                    margin-bottom: 30px;
                }

                .content-header h1 {
                    font-size: 2rem;
                    font-weight: 700;
                    margin: 0;
                }
                
                .content-header p {
                    color: var(--text-light);
                    margin-top: 5px;
                }
                
                .form-group {
                    margin-bottom: 25px;
                }

                .form-group label {
                    display: block;
                    font-weight: 600;
                    margin-bottom: 8px;
                    font-size: 0.9rem;
                }

                .form-group input {
                    width: 100%;
                    padding: 12px 15px;
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    font-size: 1rem;
                    transition: border-color 0.3s, box-shadow 0.3s;
                }

                .form-group input:focus {
                    outline: none;
                    border-color: var(--primary-color);
                    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
                }

                .action-button {
                    padding: 12px 25px;
                    border: none;
                    background-image: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
                    color: white;
                    font-size: 1rem;
                    font-weight: 600;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: transform 0.2s, box-shadow 0.3s;
                }

                .action-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
                }

                /* Order History Styles */
                .order-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .order-table th, .order-table td {
                    padding: 15px;
                    text-align: left;
                    border-bottom: 1px solid var(--border-color);
                }
                .order-table th {
                    font-weight: 600;
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    color: var(--text-light);
                }
                .status {
                    padding: 5px 10px;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 600;
                }
                .status.delivered { background-color: #d4edda; color: #155724; }
                .status.pending { background-color: #fff3cd; color: #856404; }
                .status.cancelled { background-color: #f8d7da; color: #721c24; }
                
                /* Responsive Media Queries */
                
                /* For Tablets */
                @media (max-width: 1024px) {
                    .sidebar {
                        width: 220px;
                    }
                    .main-content {
                        padding: 30px;
                    }
                    .content-header h1 {
                        font-size: 1.8rem;
                    }
                }
                
                /* For Mobile Phones */
                @media (max-width: 768px) {
                    body {
                        padding: 0;
                    }
                    .account-container {
                        flex-direction: column;
                        height: 100vh;
                        border-radius: 0;
                    }
                    .sidebar {
                        width: 100%;
                        border-right: none;
                        border-bottom: 1px solid var(--border-color);
                        padding: 10px 15px;
                        flex-direction: row;
                        align-items: center;
                        justify-content: flex-start;
                    }
                    .back-btn {
                        margin-bottom: 0;
                        margin-right: 10px;
                    }
                    .profile-header {
                        display: none; /* Hide header in mobile, nav is enough */
                    }
                    .sidebar-nav {
                        display: flex;
                        width: 100%;
                        justify-content: space-around;
                    }
                    .sidebar-nav li {
                       flex: 1;
                       text-align: center;
                    }
                     .sidebar-nav a {
                        justify-content: center;
                     }
                    .sidebar-nav a span {
                        display: none; /* Hide text, show only icons */
                    }
                    .sidebar-nav a svg {
                        margin-right: 0;
                    }
                    .logout-btn {
                        display: none; /* Can be moved inside a dropdown menu */
                    }
                    .main-content {
                        padding: 20px;
                        flex-grow: 1;
                    }
                }

            `}</style>

      <div className="account-container">
        <aside className="sidebar">
          <button
            className="back-btn"
            onClick={() => window.history.back()}
            title="Go Back"
          >
            <BackButtonIcon />
          </button>
          <div className="profile-header">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="profile-avatar"
            />
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-email">{user.email}</p>
          </div>

          <ul className="sidebar-nav">
            <li>
              <a
                href="#profile"
                className={activeTab === "profile" ? "active" : ""}
                onClick={(e) => handleTabClick(e, "profile")}
              >
                <UserIcon /> <span>My Profile</span>
              </a>
            </li>
            <li>
              <a
                href="#orders"
                className={activeTab === "orders" ? "active" : ""}
                onClick={(e) => handleTabClick(e, "orders")}
              >
                <OrdersIcon /> <span>Orders</span>
              </a>
            </li>
            <li>
              <a
                href="#billing"
                className={activeTab === "billing" ? "active" : ""}
                onClick={(e) => handleTabClick(e, "billing")}
              >
                <BillingIcon /> <span>Billing</span>
              </a>
            </li>
            <li>
              <a
                href="#settings"
                className={activeTab === "settings" ? "active" : ""}
                onClick={(e) => handleTabClick(e, "settings")}
              >
                <SettingsIcon /> <span>Settings</span>
              </a>
            </li>
          </ul>

          <button className="logout-btn">
            <LogoutIcon /> Logout
          </button>
        </aside>

        <main className="main-content" ref={contentRef}>
          {renderContent()}
        </main>
      </div>
    </>
  );
};

// --- CONTENT SECTIONS AS SEPARATE COMPONENTS ---

const ProfileSection = () => (
  <div className="content-section">
    <div className="content-header">
      <h1>My Profile</h1>
      <p>Manage your personal information and contact details.</p>
    </div>
    <form>
      <div className="form-group">
        <label htmlFor="fullName">Full Name</label>
        <input type="text" id="fullName" defaultValue="Alexender Smith" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" defaultValue="alex.smith@business.com" />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input type="tel" id="phone" defaultValue="+1 234 567 890" />
      </div>
      <div className="form-group">
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          defaultValue="Creative Solutions Inc."
        />
      </div>
      <button
        type="submit"
        className="action-button"
        onMouseEnter={(e) =>
          window.anime &&
          window.anime({ targets: e.currentTarget, translateY: -3 })
        }
        onMouseLeave={(e) =>
          window.anime &&
          window.anime({ targets: e.currentTarget, translateY: 0 })
        }
      >
        Save Changes
      </button>
    </form>
  </div>
);

const OrdersSection = () => {
  // Mock data for orders
  const orders = [
    {
      id: "#12345",
      date: "Aug 15, 2025",
      total: "$150.00",
      status: "Delivered",
    },
    { id: "#12346", date: "Sep 01, 2025", total: "$85.50", status: "Pending" },
    {
      id: "#12347",
      date: "Jul 22, 2025",
      total: "$210.00",
      status: "Delivered",
    },
    {
      id: "#12348",
      date: "Jun 10, 2025",
      total: "$50.25",
      status: "Cancelled",
    },
  ];
  return (
    <div className="content-section">
      <div className="content-header">
        <h1>Order History</h1>
        <p>Track your past purchases and their status.</p>
      </div>
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>{order.total}</td>
              <td>
                <span className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const BillingSection = () => (
  <div className="content-section">
    <div className="content-header">
      <h1>Billing</h1>
      <p>Manage your payment methods and view invoices.</p>
    </div>
    <div className="form-group">
      <label>Primary Payment Method</label>
      <input type="text" readOnly defaultValue="Visa ending in •••• 4242" />
    </div>
    <button className="action-button">Add New Card</button>
  </div>
);

const SettingsSection = () => (
  <div className="content-section">
    <div className="content-header">
      <h1>Settings</h1>
      <p>Update your password and security preferences.</p>
    </div>
    <form>
      <div className="form-group">
        <label htmlFor="currentPassword">Current Password</label>
        <input type="password" id="currentPassword" />
      </div>
      <div className="form-group">
        <label htmlFor="newPassword">New Password</label>
        <input type="password" id="newPassword" />
      </div>
      <button type="submit" className="action-button">
        Update Password
      </button>
    </form>
  </div>
);

export default MyAccount;
