import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/Report.css";
import "@/styles/VerticalNavbar.css";
import "@/styles/HorizontalNavbar.css";
import VerticalNavbar from "../components/VerticalNavbar";
import HorizontalNavbar from "../components/HorizontalNavbar";

const Report = () => {
  const [startDate, setStartDate] = useState('2025-03-01');
  const [endDate, setEndDate] = useState('2025-03-13');
  const [successRate, setSuccessRate] = useState('78%'); // Dynamic success rate
  const [testsPassed, setTestsPassed] = useState(125); // Dynamic tests passed
  const [testsFailed, setTestsFailed] = useState(35); // Dynamic tests failed

  // Simulate fetching data (e.g., from an API)
  useEffect(() => {
    // Replace this with actual API call or data fetching logic
    const fetchData = async () => {
      // Example: Fetch data based on the selected date range
      const response = await fetch(`/api/report?startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();

      // Update state with fetched data
      setSuccessRate(data.successRate);
      setTestsPassed(data.testsPassed);
      setTestsFailed(data.testsFailed);
    };

    fetchData();
  }, [startDate, endDate]); // Re-fetch data when date range changes

  const handleApply = () => {
    // Logic to filter or fetch data based on the selected date range
    console.log('Applying date range:', startDate, 'to', endDate);
  };

  const handleExport = () => {
    // Logic to handle the export functionality
    console.log('Exporting report...');
  };

  return (
    <div className="d-flex flex-column">
      <HorizontalNavbar />
      <div className="d-flex">
        <VerticalNavbar />
        <div className="container mt-4 content">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Test Run Summary</h2>
            <button className="btn btn-success" onClick={handleExport}>
              Export Report
            </button>
          </div>

          <div className="mt-4">
            <table className="table table-bordered testcase-table">
              <thead>
                <tr>
                  <th colSpan="5">Date Range:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="form-control"
                    />
                  </td>
                  <td>to</td>
                  <td>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <button className="btn btn-success" onClick={handleApply}>
                      Apply
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Success Rate, Tests Passed, and Tests Failed in 3 boxes */}
            <div className="row mt-3">
              <div className="col-md-4 metric-box-container">
                <div className="metric-box bg-light-blue">
                  <div className="metric-title text-dark-blue">Success Rate</div>
                  <div className="metric-value text-dark-blue">{successRate}</div>
                </div>
              </div>
              <div className="col-md-4 metric-box-container">
                <div className="metric-box bg-light-green">
                  <div className="metric-title text-dark-green">Tests Passed</div>
                  <div className="metric-value text-dark-green">{testsPassed}</div>
                </div>
              </div>
              <div className="col-md-4 metric-box-container">
                <div className="metric-box bg-light-pink">
                  <div className="metric-title text-dark-pink">Tests Failed</div>
                  <div className="metric-value text-dark-pink">{testsFailed}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h2>Recent Test Runs</h2>
            <table className="table table-bordered testcase-table">
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
                <tr>
                  <td>RUN-1023</td>
                  <td>03/13/2025</td>
                  <td>35/40</td>
                  <td>87.5%</td>
                  <td>2m 43s</td>
                  <td>
                    <button className="btn btn-success">View</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;