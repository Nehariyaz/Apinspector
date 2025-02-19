
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const siteKey = "YOUR_SITE_KEY";

  const handleCaptchaChange = (value) => {
    console.log("CAPTCHA Value:", value);
    if (value) {
      setCaptchaVerified(true);
    } else {
      setCaptchaVerified(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please fill in both fields.');
    } 
    if (!captchaVerified) {
      setErrorMessage("Please verify the CAPTCHA");
    }
    else {
      setErrorMessage('');
      console.log('Logging in with:', { email, password });
    }
  };

  return (
    <div class="container-fluid app-container">
    <div class="row align-items-stretch">

        <div class="col-md-6 d-flex justify-content-center align-items-center ">
            <div class="card">
              <h2 class="text">Enter Your Credentials to access your account</h2>
              <form onSubmit={handleSubmit}>
                  <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      class="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
            
                  <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input
                      type="password"
                      id="password"
                      class="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div class="grecaptcha-badge">
                  <ReCAPTCHA
                  sitekey="6LdIPdwqAAAAAD1gd2GBzNscfI6z2iGA2X5juaBt"
                  onChange={handleCaptchaChange}
                  />
                  </div>

                  {errorMessage && <p class="text-danger text-center">{errorMessage}</p>}
                
                  <button class="custom-btn" disabled={!captchaVerified}>Login</button>
              </form>

              <div class="d-flex justify-content-between mt-3">
                <Link to="/forgot-password" class="text-decoration-none text-primary">
                  Forgot Password?
                </Link>
                <div class="mb-3">
                <label class="form-label" >Don't have an Account? </label>
                <Link to="/signup" class="text-decoration-none text-primary">
                  Sign Up
                </Link>
                </div>
              </div>
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

export default Login;
