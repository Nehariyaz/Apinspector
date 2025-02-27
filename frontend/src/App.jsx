
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import ForgotPassword from './ForgotPassword'; 
import SignUp from './SignUp'; 
import './Login.css';
import VerticalNavbar from './VerticalNavbar';
import HorizontalNavbar from './HorizontalNavbar'; // Import the HorizontalNavbar component
import Testcase from './Testcase';
;


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
