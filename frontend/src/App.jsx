import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword'; 
import SignUp from './pages/SignUp'; 
import TestCase from './pages/TestCase';
import Request from './pages/Request';
import Report from './pages/Report';
import Assertion from './pages/Assertion';
import ResetPassword from './pages/ResetPassword'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} /> 
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/testcase" element={<TestCase />} />
        <Route path="/request" element={<Request />} />
        <Route path="/assertion" element={<Assertion />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </Router>
  );
}

export default App;
