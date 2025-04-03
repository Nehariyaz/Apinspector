import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "@/styles/Login.css"
import RightBg from '../components/RightBg';

const ResetPassword = () => {
  const { token } = useParams(); 
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
      
    if (!token) {
      setError("Invalid or missing token."); // Ensure token is present
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      console.log("Token before sending request:", token);
      const response = await axios.post(
        "http://localhost:3000/api/reset-password",
        { token, password },
        { headers: { "Content-Type": "application/json" } }
      );

      alert(response.data.message);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="container-fluid app-container">
      <div class="row align-items-stretch">


      <div class="col-md-6 d-flex justify-content-center align-items-center">
      <div class="card">
        <h2 class="text">Reset Password</h2>
        {error && <div class="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label class="form-label">New Password</label>
            <input
              type="password"
              class="form-control"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div class="mb-3">
            <label class="form-label">Confirm Password</label>
            <input
              type="password"
              class="form-control"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" class="custom-btn" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>

    <RightBg></RightBg>

    </div>
    </div>
  );
};

export default ResetPassword;
