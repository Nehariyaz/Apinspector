import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import "@/styles/Login.css"
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
      setOtp(newOtp)
      
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
      const response = await axios.post('http://localhost:3000/api/verify-otp', {
        email,
        otp: otpValue,
      });
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
    <div className="container-fluid app-container">
      <div className="row align-items-stretch">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
           <div className="card">
            <h2 className="text">Enter OTP sent to your email</h2>
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
              {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
              <button className="custom-btn" type="submit">Verify OTP</button>
            </form>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <span className="text-muted">Didn't receive the OTP?</span>
              <button className="text-primary text-decoration-none border-0 bg-transparent" onClick={handleResendOtp}>Resend OTP</button>
            </div>
            {resendMessage && <p className="text-danger text-center">{resendMessage}</p>}
          </div>
        </div>

        <RightBg></RightBg>
      </div>
    </div>
  );
};

export default OtpVerification;
