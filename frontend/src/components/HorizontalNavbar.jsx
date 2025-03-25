import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from '../assets/apilogo.jpg';
import "../styles/HorizontalNavbar.css";

const HorizontalNavbar = () => {
  const [user, setUser] = useState({
    name: "User", // Default username
    profilePic: "https://lh3.googleusercontent.com/a/default-user" // Default profile picture
  });
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user")

    if (savedUser) {
      try {
        setUser({
          name: savedUser || "User",
          profilePic: "https://lh3.googleusercontent.com/a/default-user"
        });
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="custom-navbar">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link className="logoContainer navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Logo" width="40" height="40" className="d-inline-block align-top me-2" />
          <span className="logoHeading">APInspector</span>
        </Link>

        {/* User Profile Dropdown */}
        <div className="dropdown">
          <button className="btn text-dark d-flex align-items-center border-0 bg-transparent text-truncate" 
                  id="userDropdown" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                  style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <img src={user.profilePic} 
                 alt="User" 
                 width="32" 
                 height="32" 
                 className="rounded-circle me-2" />
            {user.name}
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
            <li>
              <button className="dropdown-item d-flex align-items-center" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-2"></i> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HorizontalNavbar;