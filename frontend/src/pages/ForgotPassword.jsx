import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import "@/styles/Login.css"
import RightBg from '../components/RightBg';

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    const handleForgotPassword = async (event) => {
      event.preventDefault();
  
  
  
      console.log("Sending request with:", { email});
  
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
          if (error.response.status == 404) {
            setErrorMessage("User does not exist");
          } else if (error.response.status == 400) {
            setErrorMessage("Enter a valid email");
          } else {
            setErrorMessage("An error occurred. Please try again.");
          }
        } else {
          console.error("Signup Error:", error);
          setErrorMessage("An error occurred. Please try again.");
        }
      }
      
    };
  
  return (
    <div class="container-fluid app-container">
    <div class="row align-items-stretch">
        
      <div class="col-md-6 d-flex justify-content-center align-items-center">
      <div class="card">
        <h2 class="text">Forgot Password</h2>
        <p>Please enter your email address to reset your password.</p>
          <form>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input
                type="email"
                id="email"
                class="form-control"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button class="custom-btn" onClick={handleForgotPassword}>
              Reset Password
            </button>
            {errorMessage && <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>}
          </form>
      </div>
      </div>

      <RightBg></RightBg>

      </div>
      </div>
   
  );
};

export default ForgotPassword;
