import { Link, useNavigate } from 'react-router-dom'; 
import React from 'react';
import "@/styles/Login.css"
import RightBg from '../components/RightBg';

const ForgotPassword = () => {
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
              />
            </div>
            <button class="custom-btn">
              Reset Password
            </button>
          </form>
      </div>
      </div>

      <RightBg></RightBg>

      </div>
      </div>
   
  );
};

export default ForgotPassword;
