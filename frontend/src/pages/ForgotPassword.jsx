import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import "@/styles/Login.css";
import RightBg from '../components/RightBg';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleForgotPassword = async (event) => {
    event.preventDefault();

    console.log("Sending request with:", { email });

    try {
      const response = await axios.post("http://localhost:3000/api/forgotpassword", {
        email,
      });

      console.log("Server Response:", response.data);

      if (response.status === 200) {
        alert("Password reset link sent to your email");
      } else {
        setErrorMessage(response.data.message || "Failed to send the password reset link");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setErrorMessage("User does not exist");
        } else if (error.response.status === 400) {
          setErrorMessage("Enter a valid email");
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      } else {
        console.error("Forgot Password Error:", error);
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-row">
        {/* Left Side: Card */}
        <div className="login-column login-left">
          <div className="login-card">
            <h2 className="login-text">Forgot Password</h2>
            <p>Please enter your email address to reset your password.</p>
            <form onSubmit={handleForgotPassword}>
              <div className="login-form-group">
                <label className="login-form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="login-form-input"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button className="login-button" type="submit">
                Reset Password
              </button>
              {errorMessage && <p className="login-error">{errorMessage}</p>}
            </form>
          </div>
        </div>

        {/* Right Side: RightBg */}
        <div className="login-column login-right">
          <RightBg />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;