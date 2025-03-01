import React, { useState } from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/VerticalNavbar.css';

// Import logo images
import logoRequest from './assets/l.png';
import logoTestcase from './assets/looo.png';
import logoAssertion from './assets/loo.png';
import logoReport from './assets/lo.png';

// Import page components
import Request from './Request';
import Testcase from './pages/Testcase';
import Assertion from './pages/Assertion';
import Report from './pages/Report';

const VerticalNavbar = () => {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(location.pathname);

  const navItems = [
    { id: 1, label: 'Request', logo: logoRequest, path: '/' },
    { id: 2, label: 'Testcase', logo: logoTestcase, path: '/testcase' },
    { id: 3, label: 'Assertion', logo: logoAssertion, path: '/assertion' },
    { id: 4, label: 'Report', logo: logoReport, path: '/report' },
  ];

  return (
    <div className="d-flex">
      {/* Vertical Navbar */}
      <div className="d-flex flex-column align-items-center bg-light vh-100 p-2 border-end">
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.id}
            className={`nav-item d-flex flex-column align-items-center justify-content-center p-2 rounded ${selectedItem === item.path ? 'selected' : ''}`}
            onClick={() => setSelectedItem(item.path)}
          >
            <img src={item.logo} alt={`${item.label} logo`} className="nav-logo mb-1" />
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </div>

      {/* Content Area with Routing */}
      <div className="content flex-grow-1 w-100 m-0 p-0">
        <Routes>
          <Route path="/" element={<Request />} />
          <Route path="/testcase" element={<Testcase />} />
          <Route path="/assertion" element={<Assertion />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </div>
    </div>
  );
};

export default VerticalNavbar;