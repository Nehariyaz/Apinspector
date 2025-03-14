import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from '../assets/apilogo.jpg';
import "../styles/HorizontalNavbar.css";

const HorizontalNavbar = () => {
  const userName = "John Doe"; // Replace with the logged-in user's name

  return (
    <nav className="custom-navbar">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo and Brand Name */}
        <Link className="logoContainer navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="Logo"
            width="40"
            height="40"
            className="d-inline-block align-top me-2"
          />
          <span className="logoHeading">APInspector</span>
        </Link>

        {/* User Icon and Username */}
        <div className="d-flex align-items-center">
        <i className="bi bi-person-circle me-2" style={{ fontSize: '1.5rem' }}></i>
          <span className="text-dark">{userName}</span>
        </div>
      </div>
    </nav>
  );
};

export default HorizontalNavbar;