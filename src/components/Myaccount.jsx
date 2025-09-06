import React, { useEffect, useState, useRef } from "react";

const Home = () => {
  // State for user data
  const [userData, setUserData] = useState({
    name: "Wade Armstrong",
    dob: "December 24, 1991",
    gender: "Male",
    email: "wade.armstrong@email.com",
    username: "wadearmstrong28",
    password: "••••••••••",
  });

  // State for profile picture
  const [profilePic, setProfilePic] = useState(
    "https://placehold.co/128x128/f9a8d4/fce7f3?text=WA"
  );
  const fileInputRef = useRef(null);

  // State to manage which section is in edit mode
  const [editMode, setEditMode] = useState({
    basicInfo: false,
    accountInfo: false,
  });

  // State for other settings
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    monthlyReports: true,
  });
  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    twoFactor: false,
  });
  const [language, setLanguage] = useState("english");

  // State for mobile sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Temporary state to hold edits
  const [tempUserData, setTempUserData] = useState(userData);

  // Load profile picture from local storage on initial render
  useEffect(() => {
    const savedPic = localStorage.getItem("profilePic");
    if (savedPic) {
      setProfilePic(savedPic);
    }
  }, []);

  // Function to handle profile picture update
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPic = reader.result;
        setProfilePic(newPic);
        localStorage.setItem("profilePic", newPic);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to toggle edit mode and save/cancel changes
  const toggleEditMode = (section, save = false) => {
    if (save) {
      setUserData(tempUserData);
    } else {
      setTempUserData(userData); // Reset temp data on cancel
    }
    setEditMode((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    const sidebarItems = document.querySelectorAll("aside ul li");
    const contentSections = {
      Account: document.getElementById("account-content"),
      Notifications: document.getElementById("notifications-content"),
      Privacy: document.getElementById("privacy-content"),
      Languages: document.getElementById("languages-content"),
      Help: document.getElementById("help-content"),
    };

    sidebarItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        sidebarItems.forEach((li) => li.classList.remove("active"));

        const currentTarget = e.currentTarget;
        currentTarget.classList.add("active");

        const label = currentTarget.querySelector("span").textContent;

        Object.values(contentSections).forEach(
          (section) => (section.style.display = "none")
        );
        if (contentSections[label]) {
          contentSections[label].style.display = "block";
        }
        setIsSidebarOpen(false); // Close sidebar on item click
      });
    });
  }, []);

  const InfoRow = ({ label, value, name, isEditing, onChange }) => (
    <div className="info-row">
      <div className="info-row-content">
        <p className="info-label">{label}</p>
        {isEditing ? (
          <input
            type={name === "password" ? "password" : "text"}
            name={name}
            value={value}
            onChange={onChange}
            className="info-input"
          />
        ) : (
          <p className="info-value">{value}</p>
        )}
      </div>
      {!isEditing && <i className="fas fa-chevron-right info-chevron"></i>}
    </div>
  );

  return (
    <>
      <style>{`
                body {
                    font-family: 'Inter', sans-serif;
                    margin: 0;
                }
                .container {
                    background-color: #fdf2f8;
                    position: relative;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                    overflow-x: hidden;
                }
                .background-blob {
                    position: absolute;
                    border-radius: 9999px;
                    opacity: 0.6;
                    mix-blend-mode: multiply;
                    filter: blur(24px);
                    animation: blob 7s infinite;
                }
                .blob-1 { top: 2.5rem; left: 2.5rem; width: 12rem; height: 12rem; background-color: #fce7f3; }
                .blob-2 { top: 50%; left: 50%; transform: translate(-50%, -50%); width: 18rem; height: 18rem; background-color: #fbcfe8; animation-delay: 2s; }
                .blob-3 { bottom: 5rem; right: 5rem; width: 16rem; height: 16rem; background-color: #fce7f3; animation-delay: 4s; }
                
                @keyframes blob { 0% { transform: translate(0, 0) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0, 0) scale(1); } }
                
                .main-card {
                    background-color: white;
                    border-radius: 1.5rem;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                    padding: 2rem;
                    width: 100%;
                    max-width: 72rem;
                    display: flex;
                    position: relative;
                    z-index: 10;
                }
                .mobile-header { display: none; }
                
                .sidebar { width: 25%; padding: 1rem; border-radius: 1.5rem; background-color: rgba(249, 250, 251, 0.5); transition: transform 0.3s ease-in-out; }
                .sidebar h2 { font-size: 1.25rem; font-weight: 600; margin-bottom: 1.5rem; color: #1f2937; }
                .sidebar ul { list-style: none; padding: 0; margin: 0; }
                .sidebar li { display: flex; align-items: center; padding: 0.75rem; border-radius: 1rem; cursor: pointer; transition: all 0.2s ease-in-out; color: #4b5563; }
                .sidebar li:hover { background-color: #f3f4f6; }
                .sidebar li.active { background-color: #fbcfe8; color: #be185d; font-weight: 500; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1); }
                .sidebar li i { width: 1.25rem; height: 1.25rem; margin-right: 0.75rem; }

                .main-content { width: 75%; padding: 2rem; }
                .desktop-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; }
                .desktop-header .header-title { display: flex; align-items: center; }
                .desktop-header .back-arrow { color: #4b5563; transition: color 0.2s; margin-right: 1rem; }
                .desktop-header .back-arrow:hover { color: #1f2937; }
                .desktop-header h1 { font-size: 1.875rem; font-weight: 600; color: #1f2937; }
                .profile-pic-header { width: 3rem; height: 3rem; border-radius: 9999px; background-color: #d1d5db; overflow: hidden; }
                .profile-pic-header img { width: 100%; height: 100%; object-fit: cover; }
                
                .content-section { display: block; }
                .content-section.hidden { display: none; }
                .section-title { font-size: 1.25rem; font-weight: 600; color: #1f2937; }
                .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
                
                .profile-upload-section { display: flex; align-items: center; margin-bottom: 1.5rem; }
                .profile-pic-container { position: relative; width: 8rem; height: 8rem; border-radius: 9999px; overflow: hidden; margin-right: 1.5rem; cursor: pointer; }
                .profile-pic-container img { width: 100%; height: 100%; object-fit: cover; }
                .upload-icon { position: absolute; bottom: 0; right: 0; padding: 0.25rem; background-color: white; border-radius: 9999px; }
                .upload-icon i { color: #db2777; }
                .upload-text p:first-child { font-weight: 600; font-size: 1.125rem; color: #1f2937; }
                .upload-text p:last-child { color: #6b7280; font-size: 0.875rem; }

                .info-row { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #e5e7eb; padding: 0.75rem 0; }
                .info-row-content { flex: 1; }
                .info-label { color: #6b7280; font-size: 0.875rem; font-weight: 500; }
                .info-value { color: #1f2937; font-weight: 600; }
                .info-input { font-weight: 600; background-color: #f9fafb; border-radius: 0.25rem; padding: 0.25rem; width: 100%; margin-top: 0.25rem; border: 1px solid #e5e7eb; }
                .info-chevron { color: #9ca3af; }

                .delete-account-btn { font-size: 0.875rem; color: #ef4444; font-weight: 600; transition: color 0.2s; border: none; background: none; cursor: pointer; }
                .delete-account-btn:hover { color: #b91c1c; }
                
                .settings-card { display: flex; align-items: center; justify-content: space-between; padding: 1rem; background-color: #f9fafb; border-radius: 0.5rem; }
                .settings-card p:first-child { font-weight: 600; }
                .settings-card p:last-child { font-size: 0.875rem; color: #6b7280; }
                
                .toggle-switch { position: relative; display: inline-block; width: 2.5rem; margin-right: 0.5rem; vertical-align: middle; user-select: none; transition: all 0.2s ease-in; }
                .toggle-checkbox { position: absolute; display: block; width: 1.5rem; height: 1.5rem; border-radius: 9999px; background-color: white; border: 4px solid transparent; appearance: none; cursor: pointer; }
                .toggle-label { display: block; overflow: hidden; height: 1.5rem; border-radius: 9999px; background-color: #d1d5db; cursor: pointer; }
                .toggle-checkbox:checked { right: 0; border-color: #ec4899; }
                .toggle-checkbox:checked + .toggle-label { background-color: #ec4899; }

                .language-select { margin-top: 0.25rem; display: block; width: 100%; padding: 0.5rem 2.5rem 0.5rem 0.75rem; font-size: 0.875rem; border: 1px solid #d1d5db; border-radius: 0.375rem; }
                .language-select:focus { outline: none; ring: 2px solid #fb7185; border-color: #fb7185; }

                .help-list { list-style: disc; padding-left: 1.25rem; color: #db2777; }
                .help-list a { transition: text-decoration 0.2s; }
                .help-list a:hover { text-decoration: underline; }
                .contact-link { color: #db2777; transition: text-decoration 0.2s; }
                .contact-link:hover { text-decoration: underline; }

                .edit-button {
                    background-color: #f3f4f6; color: #374151; padding: 0.5rem 1rem; border-radius: 0.5rem;
                    font-size: 0.875rem; font-weight: 600; transition: all 0.3s ease;
                    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); border: none; cursor: pointer;
                }
                .edit-button:hover {
                    background-color: #e5e7eb;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                    transform: translateY(-2px);
                }
                .save-button { background-color: #ec4899; color: white; padding: 0.5rem 1rem; border-radius: 0.5rem; font-size: 0.875rem; font-weight: 600; border: none; cursor: pointer; }
                .cancel-button { background-color: #e5e7eb; color: #374151; padding: 0.5rem 1rem; border-radius: 0.5rem; font-size: 0.875rem; font-weight: 600; border: none; cursor: pointer; }
                
                .hamburger { display: none; cursor: pointer; }
                .hamburger input { display: none; }
                .hamburger svg { height: 2em; transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1); }
                .line { fill: none; stroke: #1f2937; stroke-linecap: round; stroke-linejoin: round; stroke-width: 3; transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1); }
                .line-top-bottom { stroke-dasharray: 12 63; }
                .hamburger input:checked + svg { transform: rotate(-45deg); }
                .hamburger input:checked + svg .line-top-bottom { stroke-dasharray: 20 300; stroke-dashoffset: -32.42; }

                .overlay { display: none; }

                /* Media Queries */
                @media (max-width: 1024px) {
                    .main-card { flex-direction: column; }
                    .sidebar, .main-content { width: 100%; }
                    .sidebar { margin-bottom: 1rem; }
                    .desktop-header { display: none; }
                    .mobile-header { display: flex; align-items: center; justify-content: space-between; width: 100%; }
                }

                @media (max-width: 768px) {
                    .container { padding: 0; }
                    .main-card { border-radius: 0; min-height: 100vh; }
                    .sidebar {
                        position: fixed;
                        top: 0;
                        left: 0;
                        height: 100%;
                        z-index: 100;
                        transform: translateX(-100%);
                        background-color: white;
                        width: 80%;
                        max-width: 300px;
                    }
                    .sidebar.open { transform: translateX(0); }
                    .hamburger { display: block; z-index: 101; }
                    .overlay {
                        display: block;
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0,0,0,0.5);
                        z-index: 99;
                    }
                    .mobile-header { padding: 1rem; }
                    .mobile-header h2 { font-size: 1.25rem; }
                }
            `}</style>
      {isSidebarOpen && (
        <div className="overlay" onClick={() => setIsSidebarOpen(false)}></div>
      )}
      <div className="container">
        {/* Background blobs */}
        <div className="background-blob blob-1"></div>
        <div className="background-blob blob-2"></div>
        <div className="background-blob blob-3"></div>

        {/* Main card container */}
        <div className="main-card">
          {/* Header (mobile) */}
          <header className="mobile-header">
            <div className="header-title">
              <label className="hamburger">
                <input
                  type="checkbox"
                  checked={isSidebarOpen}
                  onChange={() => setIsSidebarOpen(!isSidebarOpen)}
                />
                <svg viewBox="0 0 32 32">
                  <path
                    className="line line-top-bottom"
                    d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                  ></path>
                  <path className="line" d="M7 16 27 16"></path>
                </svg>
              </label>
              <a href="/" className="back-arrow" style={{ marginLeft: "1rem" }}>
                <i className="fas fa-arrow-left"></i>
              </a>
              <h2 style={{ marginLeft: "1rem" }}>Account Settings</h2>
            </div>
            <div className="profile-pic-header">
              <img src={profilePic} alt="Profile" />
            </div>
          </header>

          {/* Sidebar */}
          <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
            <h2>Settings</h2>
            <ul>
              <li className="active">
                <i className="fas fa-user"></i>
                <span>Account</span>
              </li>
              <li>
                <i className="fas fa-bell"></i>
                <span>Notifications</span>
              </li>
              <li>
                <i className="fas fa-lock"></i>
                <span>Privacy</span>
              </li>
              <li>
                <i className="fas fa-globe"></i>
                <span>Languages</span>
              </li>
              <li>
                <i className="fas fa-question-circle"></i>
                <span>Help</span>
              </li>
            </ul>
          </aside>

          {/* Main content area */}
          <main className="main-content">
            {/* Header for desktop */}
            <header className="desktop-header">
              <div className="header-title">
                <a href="/" className="back-arrow">
                  <i className="fas fa-arrow-left"></i>
                </a>
                <h1>Account Settings</h1>
              </div>
              <div className="profile-pic-header">
                <img src={profilePic} alt="Profile" />
              </div>
            </header>

            {/* Account Content */}
            <div id="account-content" className="content-section">
              <div>
                <div className="section-header">
                  <h2 className="section-title">Basic info</h2>
                  {editMode.basicInfo ? (
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        onClick={() => toggleEditMode("basicInfo", true)}
                        className="save-button"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => toggleEditMode("basicInfo", false)}
                        className="cancel-button"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => toggleEditMode("basicInfo")}
                      className="edit-button"
                    >
                      Edit
                    </button>
                  )}
                </div>
                <div className="profile-upload-section">
                  <div
                    className="profile-pic-container"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <img src={profilePic} alt="Profile" />
                    <div className="upload-icon">
                      <i className="fas fa-upload"></i>
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleProfilePicChange}
                      style={{ display: "none" }}
                      accept="image/*"
                    />
                  </div>
                  <div className="upload-text">
                    <p>upload new picture</p>
                    <p>minimum 800x800</p>
                  </div>
                </div>
                <div>
                  <InfoRow
                    label="Name"
                    name="name"
                    value={tempUserData.name}
                    isEditing={editMode.basicInfo}
                    onChange={handleInputChange}
                  />
                  <InfoRow
                    label="Date of Birth"
                    name="dob"
                    value={tempUserData.dob}
                    isEditing={editMode.basicInfo}
                    onChange={handleInputChange}
                  />
                  <InfoRow
                    label="Gender"
                    name="gender"
                    value={tempUserData.gender}
                    isEditing={editMode.basicInfo}
                    onChange={handleInputChange}
                  />
                  <InfoRow
                    label="Email"
                    name="email"
                    value={tempUserData.email}
                    isEditing={editMode.basicInfo}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div style={{ marginTop: "2rem" }}>
                <div className="section-header">
                  <h2 className="section-title">Account info</h2>
                  {editMode.accountInfo ? (
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        onClick={() => toggleEditMode("accountInfo", true)}
                        className="save-button"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => toggleEditMode("accountInfo", false)}
                        className="cancel-button"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => toggleEditMode("accountInfo")}
                      className="edit-button"
                    >
                      Edit
                    </button>
                  )}
                </div>
                <InfoRow
                  label="Username"
                  name="username"
                  value={tempUserData.username}
                  isEditing={editMode.accountInfo}
                  onChange={handleInputChange}
                />
                <InfoRow
                  label="Password"
                  name="password"
                  value={tempUserData.password}
                  isEditing={editMode.accountInfo}
                  onChange={handleInputChange}
                />
                <div style={{ paddingTop: "1rem" }}>
                  <button className="delete-account-btn">Delete Account</button>
                </div>
              </div>
            </div>

            {/* Notifications Content */}
            <div id="notifications-content" className="content-section hidden">
              <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
                Notifications
              </h2>
              <div className="settings-card">
                <div>
                  <p>Email Notifications</p>
                  <p>Get emails about your activity.</p>
                </div>
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    name="toggle"
                    id="email-toggle"
                    checked={notifications.email}
                    onChange={() =>
                      setNotifications((p) => ({ ...p, email: !p.email }))
                    }
                    className="toggle-checkbox"
                  />
                  <label
                    htmlFor="email-toggle"
                    className="toggle-label"
                  ></label>
                </div>
              </div>
            </div>

            {/* Privacy Content */}
            <div id="privacy-content" className="content-section hidden">
              <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
                Privacy
              </h2>
              <div className="settings-card">
                <div>
                  <p>Profile Visibility</p>
                  <p>Allow others to see your profile.</p>
                </div>
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    name="toggle"
                    id="privacy-toggle"
                    checked={privacy.profilePublic}
                    onChange={() =>
                      setPrivacy((p) => ({
                        ...p,
                        profilePublic: !p.profilePublic,
                      }))
                    }
                    className="toggle-checkbox"
                  />
                  <label
                    htmlFor="privacy-toggle"
                    className="toggle-label"
                  ></label>
                </div>
              </div>
            </div>

            {/* Languages Content */}
            <div id="languages-content" className="content-section hidden">
              <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
                Languages
              </h2>
              <div
                className="settings-card"
                style={{ flexDirection: "column", alignItems: "flex-start" }}
              >
                <label
                  htmlFor="language-select"
                  style={{ marginBottom: "0.5rem" }}
                >
                  Select Language
                </label>
                <select
                  id="language-select"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="language-select"
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                </select>
              </div>
            </div>

            {/* Help Content */}
            <div id="help-content" className="content-section hidden">
              <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
                Help & Support
              </h2>
              <div
                className="settings-card"
                style={{ flexDirection: "column", alignItems: "flex-start" }}
              >
                <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
                  Frequently Asked Questions
                </p>
                <ul className="help-list">
                  <li>
                    <a href="#">How to change my password?</a>
                  </li>
                  <li>
                    <a href="#">How to update my email?</a>
                  </li>
                  <li>
                    <a href="#">Where can I find my billing history?</a>
                  </li>
                </ul>
              </div>
              <div
                className="settings-card"
                style={{
                  marginTop: "1rem",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
                  Contact Us
                </p>
                <p>
                  If you need further assistance, please don't hesitate to reach
                  out to our support team at{" "}
                  <a href="mailto:support@example.com" className="contact-link">
                    support@example.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;
