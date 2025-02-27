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
            width="30"
            height="30"
            className="d-inline-block align-top me-4"
          />
          {' '}
          <div className="logoHeading">APInspector</div>
        </Link>

      </div>
    </nav>
  );
};

export default HorizontalNavbar;