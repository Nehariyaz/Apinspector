import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import VerticalNavbar from "../components/VerticalNavbar";
import HorizontalNavbar from "../components/HorizontalNavbar";
import { FaCalendarAlt, FaDownload, FaEye, FaCheckCircle, FaTimesCircle, FaChartPie } from 'react-icons/fa';
import "../styles/Report.css";

const Report = () => {
  const [startDate, setStartDate] = useState('2025-03-01');
  const [endDate, setEndDate] = useState('2025-03-13');
  const [successRate, setSuccessRate] = useState('78%');
  const [testsPassed, setTestsPassed] = useState(125);
  const [testsFailed, setTestsFailed] = useState(35);
  const [recentRuns, setRecentRuns] = useState([
    { id: 'RUN-1023', date: '03/13/2025', tests: '35/40', passRate: '87.5%', duration: '2m 43s' },
    { id: 'RUN-1022', date: '03/12/2025', tests: '38/40', passRate: '95.0%', duration: '2m 38s' },
    { id: 'RUN-1021', date: '03/11/2025', tests: '33/40', passRate: '82.5%', duration: '2m 55s' },
    { id: 'RUN-1020', date: '03/10/2025', tests: '37/40', passRate: '92.5%', duration: '2m 41s' }
  ]);

  useEffect(() => {
    // Replace with actual API call or data fetching logic
    const fetchData = async () => {
      try {
        // Example: Fetch data based on the selected date range
        const response = await fetch(`/api/report?startDate=${startDate}&endDate=${endDate}`);
        const data = await response.json();

        // Update state with fetched data
        setSuccessRate(data.successRate);
        setTestsPassed(data.testsPassed);
        setTestsFailed(data.testsFailed);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state
      }
    };

    // Comment out fetchData call for now to avoid actual API calls during development
    // fetchData();
  }, [startDate, endDate]);

  const handleApply = () => {
    // Logic to filter or fetch data based on the selected date range
    console.log('Applying date range:', startDate, 'to', endDate);
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

          <section className="recent-runs-section">
            <h2>Recent Test Runs</h2>
            <div className="table-responsive">
              <table className="runs-table">
                <thead>
                  <tr>
                    <th>Run ID</th>
                    <th>Date</th>
                    <th>Tests</th>
                    <th>Pass Rate</th>
                    <th>Duration</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRuns.map(run => (
                    <tr key={run.id}>
                      <td className="run-id">{run.id}</td>
                      <td>{run.date}</td>
                      <td>{run.tests}</td>
                      <td className="pass-rate">{run.passRate}</td>
                      <td>{run.duration}</td>
                      <td>
                        <button className="view-btn" onClick={() => handleViewRun(run.id)}>
                          <FaEye /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Report;