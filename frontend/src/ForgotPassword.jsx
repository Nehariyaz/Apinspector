

import React from 'react';

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

      <div class="col-md-6 bg-section d-flex flex-column">
      <img src="insurance.svg" alt="no image" class="img" />
            <div class="card-body text-center">
            <h3 class="mt-2">confirm  API's endpoints, methods, and integrations are functioning as expected.</h3>
            </div>
      </div>

      </div>
      </div>
   
  );
};

export default ForgotPassword;
