import React from 'react';
import TestCase from './TestCase';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VerticalNavbar from './VerticalNavbar';


function App() {
  return (
      <Router>
      <div className="container-fluid d-flex p-0 m-0">
        <VerticalNavbar />
        <div className="content flex-grow-1 w-100 m-0 p-0">
      <Routes>
        <Route path="/" element={<TestCase />} />
      </Routes>
    </div>
   </div>
    </Router>
  );
}

export default App;
