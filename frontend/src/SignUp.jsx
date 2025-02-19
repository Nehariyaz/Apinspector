import ReCAPTCHA from "react-google-recaptcha";
import React, { useState } from 'react';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

        <div class="col-md-6 d-flex justify-content-center align-items-center">
            <div class="card" >
                <h2 class="text">Get Started Now</h2>
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

                  <div class="mb-3">
                    <label class="form-label">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      class="form-control"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div class="grecaptcha-badge">
                  <ReCAPTCHA
                  sitekey="6LeCHdwqAAAAAM_wlQpyMASYH2gajSULqi6qCv2u"
                  onChange={handleCaptchaChange}
                  />
                  </div>

                  {errorMessage && <p class="text-danger text-center">{errorMessage}</p>}

                  <button class="custom-btn">Sign Up</button>
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

export default SignUp;
