import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import "@/styles/Login.css"
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const navigate = useNavigate();  // Initialize navigate

  const siteKey = "6Lcak9wqAAAAABuhNvb8rOd5PDqozXUwr3xmaiap";

  const handleCaptchaChange = (value) => {
    console.log("CAPTCHA Value:", value);
    setCaptchaToken(value);
    setCaptchaVerified(!!value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
        captchaToken,
      });
      console.log("Login successful! Redirecting...");
      localStorage.setItem("token", response.data.token); // Store JWT token
      alert(response.data.message); // Show success message
      navigate('/testcase');  // Redirect to TestCase page after successful login
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="container-fluid app-container">
      <div className="row align-items-stretch">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="card">
            <h2 className="text">Enter Your Credentials to access your account</h2>
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

              <div className="grecaptcha-badge">
                <ReCAPTCHA
                  sitekey={siteKey}
                  onChange={handleCaptchaChange}
                />
              </div>

              {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
            
              <button className="custom-btn" disabled={!captchaVerified}>Login</button>
            </form>

            <div className="d-flex justify-content-between mt-3">
              <Link to="/forgot-password" className="text-decoration-none text-primary">
                Forgot Password?
              </Link>
              <div className="mb-3">
                <label className="form-label">Don't have an Account? </label>
                <Link to="/signup" className="text-decoration-none text-primary">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 bg-section d-flex flex-column">
          <img src="insurance.svg" alt="no image" className="img" />
          <div className="card-body text-center">
            <h3 className="mt-2">Confirm API endpoints, methods, and integrations are functioning as expected.</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
