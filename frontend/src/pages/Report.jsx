import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import VerticalNavbar from "../components/VerticalNavbar";
import HorizontalNavbar from "../components/HorizontalNavbar";
import { FaCalendarAlt, FaDownload, FaEye, FaCheckCircle, FaTimesCircle, FaChartPie } from 'react-icons/fa';
import "../styles/Report.css";

const Report = () => {
  const [startDate, setStartDate] = useState('2025-03-01');
  const [endDate, setEndDate] = useState('2025-03-13');
  const [successRate, setSuccessRate] = useState('0%');
  const [testsPassed, setTestsPassed] = useState(0);
  const [testsFailed, setTestsFailed] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    
  }, [startDate, endDate]);
  
    const fetchReportData = async () => {
      setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:3000/report?startDate=${startDate}&endDate=${endDate}`,{  
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if(response.status==200){
        alert ("No tests run in the given dates");
        return
      }
      const data = await response.json();

      setSuccessRate(data.successRate);
      setTestsPassed(data.testsPassed);
      setTestsFailed(data.testsFailed);
    } catch (err) {
      console.error("Error fetching report:", err);
      setError("Failed to load report data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

    

  const handleApply = () => {
   
      fetchReportData();
   
  };

  const handleExport = () => {
    // Logic to handle the export functionality
    console.log('Exporting report...');
  };

  const handleViewRun = (runId) => {
    console.log('Viewing run:', runId);
  };

  return (
    <div className="app-container">
      <HorizontalNavbar />
      <div className="content-wrapper">
        <VerticalNavbar />
        <main className="report-container">
          <header className="report-header">
            <div className="report-title">
              <h1>Test Run Summary</h1>
              <p className="text-muted">Overview of test execution results</p>
            </div>
            <button className="export-btn" onClick={handleExport}>
              <FaDownload /> Export Report
            </button>
          </header>

          <section className="date-filter-section">
            <div className="date-filter-card">
              <h2 className="filter-title">
                <FaCalendarAlt /> Date Range
              </h2>
              <div className="date-inputs">
                <div className="date-field">
                  <label>From</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="date-separator">to</div>
                <div className="date-field">
                  <label>To</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <button className="apply-btn" onClick={handleApply}>
                  Apply
                </button>
              </div>
            </div>
          </section>

          <section className="metrics-section">
            <div className="metric-card success-rate">
              <div className="metric-icon">
                <FaChartPie />
              </div>
              <div className="metric-content">
                <h3>Success Rate</h3>
                <div className="metric-value">{successRate}</div>
              </div>
            </div>
            <div className="metric-card tests-passed">
              <div className="metric-icon">
                <FaCheckCircle />
              </div>
              <div className="metric-content">
                <h3>Tests Passed</h3>
                <div className="metric-value">{testsPassed}</div>
              </div>
            </div>
            <div className="metric-card tests-failed">
              <div className="metric-icon">
                <FaTimesCircle />
              </div>
              <div className="metric-content">
                <h3>Tests Failed</h3>
                <div className="metric-value">{testsFailed}</div>
              </div>
            </div>
          </section>

          </main>
      </div>
    </div>
  );
};

export default Report;