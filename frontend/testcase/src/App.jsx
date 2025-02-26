import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import VerticalNavbar from './VerticalNavbar';
import Request from './Request';
import Testcase from './pages/Testcase';
import Assertion from './pages/Assertion';
import Report from './pages/Report';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container-fluid d-flex p-0 m-0">
        <VerticalNavbar />
        <div className="content flex-grow-1 w-100 m-0 p-0">
          <Routes>
            <Route path="/" element={<Request />} />
            <Route path="/testcase" element={<Testcase />} />
            <Route path="/assertion" element={<Assertion />} />
            <Route path="/report" element={<Report />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
