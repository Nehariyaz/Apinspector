import ReCAPTCHA from "react-google-recaptcha";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "@/styles/Login.css"; // We'll reuse Login.css for now
import RightBg from '../components/RightBg';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);
  const navigate = useNavigate();

  const handleCaptchaChange = (token) => {
    console.log("CAPTCHA Token:", token);
    setCaptchaToken(token);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!captchaToken) {
      setErrorMessage("Please verify the CAPTCHA.");
      return;
    }

    console.log("Sending request with:", { username, email, password, captchaToken });

    try {
      const response = await axios.post("http://localhost:3000/api/register", {
        username,
        email,
        password,
        captchaToken,
      });

      console.log("Server Response:", response.data);

      if (response.status === 200) {
        alert("Registration successful! Redirecting...");
        navigate("/request");
      } else {
        setErrorMessage(response.data.message || "Registration failed.");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage("User already exists.");
      } else {
        console.error("Signup Error:", error);
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
            <h2 className="login-text">Get Started Now</h2>
            <form onSubmit={handleSubmit}>
              <div className="login-form-group">
                <label className="login-form-label">Username</label>
                <input
                  type="text"
                  id="username"
                  className="login-form-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

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

              <div className="login-form-group">
                <label className="login-form-label">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="login-form-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="login-recaptcha">
                <ReCAPTCHA
                  sitekey="6Lcak9wqAAAAABuhNvb8rOd5PDqozXUwr3xmaiap"
                  onChange={handleCaptchaChange}
                />
              </div>

              {errorMessage && <p className="login-error">{errorMessage}</p>}
              <button className="login-button">Sign Up</button>
              <div className="login-links">
                <span className="login-link-text">Already have an account? </span>
                <Link to="/login" className="login-link">
                  Login
                </Link>
              </div>
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

export default SignUp;