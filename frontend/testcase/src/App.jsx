import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import VerticalNavbar from './VerticalNavbar';
import HorizontalNavbar from './HorizontalNavbar'; // Import the HorizontalNavbar component
import Request from './Request';
import Testcase from './pages/Testcase';
import Assertion from './pages/Assertion';
import Report from './pages/Report';
import './App.css';

function App() {
  return (
    <Router>
     
      <div className="container-fluid d-flex flex-column p-0 m-0">
        {/* Add the HorizontalNavbar at the top */}
        <HorizontalNavbar/>
        <div className="d-flex flex-grow-1">
          
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
      </div>
    </Router>
  );
}

export default App;