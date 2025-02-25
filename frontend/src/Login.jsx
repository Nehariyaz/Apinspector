
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import RightBg from "./RightBg.jsx";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [captchaToken, setCaptchaToken] = useState("");
  const[captchaVerified , setCaptchaVerified] = useState(false)
  const siteKey = "6Lcak9wqAAAAABuhNvb8rOd5PDqozXUwr3xmaiap";

  const handleCaptchaChange = (value) => {
    console.log("CAPTCHA Value:", value);
    if (value) {
      setCaptchaToken(value); 
      setCaptchaVerified(true);
    } else {
      setCaptchaToken(""); 
      setCaptchaVerified(false);
    }
  };



const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    console.log(password)
    const response = await axios.post("http://localhost:3000/api/login", {
      email,
      password,
      captchaToken, 
    });

    localStorage.setItem("token", response.data.token); 
    alert(response.data.message); 
  } catch (error) {
    setErrorMessage(error.response?.data?.message || "Login failed!");
    alert(error)
  }
};


  return (
    <div className="container-fluid app-container">
    <div className="row align-items-stretch g-0">

        <div className="col-md-6 d-flex justify-content-center align-items-center ">
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
                  sitekey= "6Lcak9wqAAAAABuhNvb8rOd5PDqozXUwr3xmaiap"
                  onChange={handleCaptchaChange}
                  />
                  </div>

                  {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
                
                  <button className="custom-btn" disabled={!captchaVerified}>Login</button>
              </form>

              <div className="d-flex justify-content-between mt-3">
                <Link to="/forgot-password" className="text1">
                  Forgot Password?
                </Link>
                <div className="mb-3">
                <label className="form-label" >Don't have an Account? </label>
                <Link to="/signup" className="text1">
                  Sign Up
                </Link>
                </div>
              </div>
            </div>
          </div>
        

          <RightBg />
        

      
      </div>
    </div>


    
  
    



  );
};

export default Login;
