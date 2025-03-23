import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import "@/styles/Login.css";
import RightBg from '../components/RightBg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const navigate = useNavigate(); 

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
      localStorage.setItem("token", response.data.token);
      alert(response.data.message); 
      navigate('/otp-verification');  
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-row">
        {/* Left Side: Card */}
        <div className="login-column login-left">
          <div className="login-card">
            <h2 className="login-text">Enter Your Credentials to access your account</h2>
            <form onSubmit={handleSubmit}>
              <div className="login-form-group">
                <label className="login-form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="login-form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
        
              <div className="login-form-group">
                <label className="login-form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="login-form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="login-recaptcha">
                <ReCAPTCHA
                  sitekey={siteKey}
                  onChange={handleCaptchaChange}
                />
              </div>

              {errorMessage && <p className="login-error">{errorMessage}</p>}
              <button className="login-button" disabled={!captchaVerified}>Login</button>
            </form>

            <div className="login-links">
              <Link to="/forgot-password" className="login-link">
                Forgot Password?
              </Link>
              <div>
                <span className="login-link-text">Don't have an account? </span>
                <Link to="/signup" className="login-link">
                  Sign Up
                </Link>
              </div>
            </div>
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

export default Login;