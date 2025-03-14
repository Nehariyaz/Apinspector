import ReCAPTCHA from "react-google-recaptcha";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import "@/styles/Login.css"
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
        if(response.status==409){
          setErrorMessage("User already exists");
        }else{
          console.error("Signup Error:", error);
          setErrorMessage("An error occurred. Please try again.");
        }
      }
  };

  return (
    <div class="container-fluid app-container">
      <div class="row align-items-stretch ">
        
        <div class="col-md-6 d-flex justify-content-center align-items-center">
          <div class="card">
            <h2 class="text">Get Started Now</h2>
            <form onSubmit={handleSubmit}>
              <div class="mb-3">
                <label class="form-label">Username</label>
                <input
                  type="text"
                  id="username"
                  class="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              
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
                  sitekey="6Lcak9wqAAAAABuhNvb8rOd5PDqozXUwr3xmaiap"
                  onChange={handleCaptchaChange}
                />
              </div>

              {errorMessage && <p class="text-danger text-center">{errorMessage}</p>}

              <button class="custom-btn">Sign Up</button>
            </form>
          </div>
        </div>
         
        <RightBg></RightBg>

      </div>
    </div>
  );
};

export default SignUp;
