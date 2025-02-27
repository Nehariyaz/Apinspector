import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './assets/apilogo.jpg';

const HorizontalNavbar = () => {
  const userProfileImage = "/path/to/user/profile.png"; // Update this path
  const userName = "John Doe"; // Replace with the logged-in user's name

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={{
        width: '100%', // Ensure the navbar takes up the full width
        maxWidth: '100%', // Ensure it doesn't exceed the screen width
        margin: 0, // Remove any default margins
        padding: '0 16px', // Add some padding to the sides
      }}
    >
      <div className="container-fluid">
        {/* Logo Image Area on the left */}
        <Link className="logoContainer navbar-brand" to="/">
          <img
            src={logo} // Replace with the path to your logo image
            alt="Logo"
            width="25"
            height="25"
            className="d-inline-block align-top me-4"
          />
          {' '}
          <div className="logoHeading">APInspector</div>
        </Link>

        {/* User Profile Area on the right */}
        <div className="ms-auto d-flex align-items-center">
          <span className="me-2">{userName}</span>
          <img
            src={userProfileImage}
            alt="User Profile"
            width="30"
            height="30"
            className="rounded-circle"
          />
        </div>
      </div>
    </nav>
  );
};

export default HorizontalNavbar;