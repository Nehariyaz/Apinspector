import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import "@/styles/Login.css";
import RightBg from '../components/RightBg';

const OtpVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [errorMessage, setErrorMessage] = useState('');
  const [resendMessage, setResendMessage] = useState('');
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleChange = (element, index) => {
    if (!isNaN(element.value) && element.value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = element.value;
      setOtp(newOtp);
      
      if (element.nextSibling && element.value) {
        element.nextSibling.focus();
      }
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const otpValue = otp.join('');
    
    try {
      const response = await axios.post('http://localhost:3000/api/verify-otp', { email, otp: otpValue });
      alert(response.data.message);
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'OTP verification failed!');
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/resend-otp', { email });
      setResendMessage(response.data.message || 'OTP has been resent!');
    } catch (error) {
      setResendMessage(error.response?.data?.message || 'Failed to resend OTP. Try again!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-row">
        {/* Left Side: Card */}
        <div className="login-column login-left">
          <div className="login-card">
            <h2 className="login-text">Enter OTP sent to your email</h2>
            <form onSubmit={handleSubmit}>
              <div className="otp-input-container">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    className="otp-input"
                    value={digit}
                    maxLength="1"
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                  />
                ))}
              </div>
              {errorMessage && <p className="login-error">{errorMessage}</p>}
              <button className="login-button" type="submit">Verify OTP</button>
            </form>
            <div className="login-links">
              <span className="login-link-text">Didn't receive the OTP? </span>
              <button className="login-link login-resend" onClick={handleResendOtp}>Resend OTP</button>
            </div>
            {resendMessage && <p className="login-error">{resendMessage}</p>}
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

export default OtpVerification;