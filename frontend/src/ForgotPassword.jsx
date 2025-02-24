

import React from 'react';

const ForgotPassword = () => {
  return (
    <div className="container-fluid app-container">
    <div className="row align-items-stretch g-0">
        
      <div className="col-md-6 d-flex justify-content-center align-items-center">
      <div className="card">
        <h2 className="text">Forgot Password</h2>
        <p>Please enter your email address to reset your password.</p>
          <form>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                required
              />
            </div>
            <button className="custom-btn">
              Reset Password
            </button>
          </form>
      </div>
      </div>

      <div className="col-md-6 bg-section d-flex flex-column">
            <img src="insurance.svg" alt="no image" className="img" />
            <div className="card-body text-center">
            <h4 className="m-2">
              Confirm API endpoints, methods and integrations are functioning as expected.</h4>
            </div>
          </div>

      </div>
      </div>
   
  );
};

export default ForgotPassword;
