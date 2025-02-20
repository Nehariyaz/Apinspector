import ReCAPTCHA from "react-google-recaptcha";
import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleCaptchaChange = (captchaToken) => {
    console.log("CAPTCHA Token:", captchaToken);
    setCaptchaToken(captchaToken);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (!captchaToken) {
      setErrorMessage("Please verify the CAPTCHA.");
      return;
    }
    console.log("Sending request with:", { email, password, captchaToken });

    try {
      const response = await fetch("http://localhost:3000/api/register", {  // Use full backend URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password,captchaToken }),
      });

      console.log("Server Response:", response.data);

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! Please log in.");
        navigate("/login"); 
      } else {
        setErrorMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };


  return (
    <div className="container-fluid app-container">
      <div className="row align-items-stretch">
        {/* Signup Form Section */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="card">
            <h2 className="text">Get Started Now</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {/* reCAPTCHA */}
              <div className="mb-3">
                <ReCAPTCHA
                  sitekey="6Lcak9wqAAAAABuhNvb8rOd5PDqozXUwr3xmaiap"// Replace with your actual site key
                  onChange={handleCaptchaChange}
                />
              </div>

              {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}

              <button className="custom-btn">Sign Up</button>
            </form>
          </div>
        </div>

        {/* Info Section */}
        <div className="col-md-6 bg-section d-flex flex-column">
          <img src="insurance.svg" alt="Illustration" className="img" />
          <div className="card-body text-center">
            <h3 className="mt-2">
              Confirm API endpoints, methods, and integrations are functioning as expected.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

