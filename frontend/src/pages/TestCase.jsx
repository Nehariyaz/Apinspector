import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/TestCase.css";
import "@/styles/VerticalNavbar.css";
import "@/styles/HorizontalNavbar.css";
import VerticalNavbar from "../components/VerticalNavbar";
import HorizontalNavbar from "../components/HorizontalNavbar";

const TestCase = () => {
  const [testCases, setTestCases] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTestCase, setNewTestCase] = useState({
    name: '',
    method: 'GET',
    url: '',
    queryParams: [{ key: '', value: '', description: '' }],
    headers: [{ key: '', value: '', description: '' }],
    body: '',
  });

  // Debug logging
  useEffect(() => {
    console.log("Current test cases:", testCases);
  }, [testCases]);

  // Open the modal
  const openModal = () => {
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
    // Reset the form
    setNewTestCase({
      name: '',
      method: 'GET',
      url: '',
      queryParams: [{ key: '', value: '', description: '' }],
      headers: [{ key: '', value: '', description: '' }],
      body: '',
    });
  };

  // Handle input changes in the modal form
  const handleInputChange = (field, value) => {
    setNewTestCase({ ...newTestCase, [field]: value });
  };

  // Handle query parameter changes
  const handleQueryParamChange = (paramIndex, field, value) => {
    const updatedQueryParams = [...newTestCase.queryParams];
    updatedQueryParams[paramIndex][field] = value;
    setNewTestCase({ ...newTestCase, queryParams: updatedQueryParams });
  };

  // Handle header changes
  const handleHeaderChange = (headerIndex, field, value) => {
    const updatedHeaders = [...newTestCase.headers];
    updatedHeaders[headerIndex][field] = value;
    setNewTestCase({ ...newTestCase, headers: updatedHeaders });
  };

  // Add a new query parameter field
  const addQueryParam = () => {
    setNewTestCase({
      ...newTestCase,
      queryParams: [...newTestCase.queryParams, { key: '', value: '', description: '' }],
    });
  };

  // Remove a query parameter field
  const removeQueryParam = (paramIndex) => {
    if (newTestCase.queryParams.length > 1) {
      const updatedQueryParams = newTestCase.queryParams.filter((_, index) => index !== paramIndex);
      setNewTestCase({ ...newTestCase, queryParams: updatedQueryParams });
    }
  };

  // Add a new header field
  const addHeader = () => {
    setNewTestCase({
      ...newTestCase,
      headers: [...newTestCase.headers, { key: '', value: '', description: '' }],
    });
  };

  // Remove a header field
  const removeHeader = (headerIndex) => {
    if (newTestCase.headers.length > 1) {
      const updatedHeaders = newTestCase.headers.filter((_, index) => index !== headerIndex);
      setNewTestCase({ ...newTestCase, headers: updatedHeaders });
    }
  };

  // Save the new test case
  const saveTestCase = () => {
    // Basic validation
    if (!newTestCase.name.trim()) {
      alert("Please enter a test case name");
      return;
    }

    // Add timestamp for unique identification
    const testCaseWithId = {
      ...newTestCase,
      id: Date.now(),
      createdAt: new Date().toLocaleString()
    };
    
    console.log("Saving test case:", testCaseWithId); // Debug log
    setTestCases([...testCases, testCaseWithId]);
    closeModal();
  };

  // Send a test case
  const sendTestCase = (index) => {
    console.log('Sending test case:', testCases[index]);
    // Add visual feedback here in a real app
  };

  // Get appropriate method badge color
  const getMethodColor = (method) => {
    switch (method) {
      case 'GET': return 'method-get';
      case 'POST': return 'method-post';
      case 'PUT': return 'method-put';
      case 'DELETE': return 'method-delete';
      default: return 'method-get';
    }
  };

  return (
    <div className="d-flex flex-column app-container">
      <HorizontalNavbar />
      <div className="d-flex">
        <VerticalNavbar />
        <div className="testcase-container container-fluid">
          <div className="header-section d-flex justify-content-between align-items-center">
            <div>
              {/* Removed the "API Test Cases" heading */}
            </div>
            <div className="d-flex gap-2">
              <button onClick={openModal} className="create-button">
                Create Test Case
              </button>
              {/* Removed the "Debug: Add Sample" button */}
            </div>
          </div>

          {/* Empty state when no test cases */}
          {testCases.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>No test cases yet</h3>
              <p>Create your first test case to get started!</p>
              <button onClick={openModal} className="btn btn-primary">Create Now</button>
            </div>
          )}

          {/* Display saved test cases in a table */}
          {testCases.length > 0 && (
            <div className="rounded-table">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Method</th>
                    <th>URL</th>
                    <th>Query Parameters</th>
                    <th>Headers</th>
                    <th>Body</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {testCases.map((testCase, index) => (
                    <tr key={testCase.id || index} className="table-row">
                      <td className="name-cell">
                        {testCase.name || <span className="text-muted">Unnamed</span>}
                      </td>
                      <td className="method-cell">
                        <span className={`method-badge ${getMethodColor(testCase.method)}`}>
                          {testCase.method}
                        </span>
                      </td>
                      <td className="url-cell">
                        {testCase.url ? 
                          <span title={testCase.url}>{testCase.url}</span> : 
                          <span className="text-muted">No URL</span>
                        }
                      </td>
                      <td className="params-cell">
                        {testCase.queryParams && testCase.queryParams.length > 0 && 
                         testCase.queryParams.some(param => param.key || param.value) ? (
                          <div className="param-container">
                            {testCase.queryParams.map((param, paramIndex) => (
                              param.key || param.value ? (
                                <div key={paramIndex} className="param-item">
                                  {param.key && <span className="param-key">{param.key}</span>}
                                  {param.value && <span className="param-value">{param.value}</span>}
                                </div>
                              ) : null
                            ))}
                          </div>
                        ) : (
                          <span className="text-muted">No parameters</span>
                        )}
                      </td>
                      <td className="headers-cell">
                        {testCase.headers && testCase.headers.length > 0 && 
                         testCase.headers.some(header => header.key || header.value) ? (
                          <div className="header-container">
                            {testCase.headers.map((header, headerIndex) => (
                              header.key || header.value ? (
                                <div key={headerIndex} className="header-item">
                                  {header.key && <span className="header-key">{header.key}</span>}
                                  {header.value && <span className="header-value">{header.value}</span>}
                                </div>
                              ) : null
                            ))}
                          </div>
                        ) : (
                          <span className="text-muted">No headers</span>
                        )}
                      </td>
                      <td className="body-cell">
                        {testCase.body ? (
                          <span className="body-preview">{testCase.body.substring(0, 20)}...</span>
                        ) : (
                          <span className="text-muted">Empty</span>
                        )}
                      </td>
                      <td className="actions-cell">
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => setTestCases(testCases.filter((_, i) => i !== index))}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => sendTestCase(index)}
                          >
                            Send
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Modal for creating a new test case */}
          {showModal && (
            <div className="modal-backdrop">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    <span className="modal-icon"></span> Create New Test Case
                  </h5>
                  <button type="button" className="close" onClick={closeModal}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newTestCase.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="My awesome API test"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Method</label>
                    <select
                      className="form-control"
                      value={newTestCase.method}
                      onChange={(e) => handleInputChange('method', e.target.value)}
                    >
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                      <option value="DELETE">DELETE</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>URL</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newTestCase.url}
                      onChange={(e) => handleInputChange('url', e.target.value)}
                      placeholder="https://example.com/api"
                    />
                  </div>
                  <div className="form-group">
                    <label>Query Parameters</label>
                    <div className="query-params-container">
                      {newTestCase.queryParams.map((param, paramIndex) => (
                        <div key={paramIndex} className="param-form-group">
                          <div className="param-header">
                            <span className="param-number">Parameter {paramIndex + 1}</span>
                            {newTestCase.queryParams.length > 1 && (
                              <button 
                                className="remove-param-btn" 
                                onClick={() => removeQueryParam(paramIndex)}
                                title="Remove parameter"
                              >
                                &times;
                              </button>
                            )}
                          </div>
                          <input
                            type="text"
                            className="form-control mb-1"
                            placeholder="Key"
                            value={param.key}
                            onChange={(e) => handleQueryParamChange(paramIndex, 'key', e.target.value)}
                          />
                          <input
                            type="text"
                            className="form-control mb-1"
                            placeholder="Value"
                            value={param.value}
                            onChange={(e) => handleQueryParamChange(paramIndex, 'value', e.target.value)}
                          />
                          <input
                            type="text"
                            className="form-control mb-1"
                            placeholder="Description (optional)"
                            value={param.description}
                            onChange={(e) => handleQueryParamChange(paramIndex, 'description', e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                    <button onClick={addQueryParam} className="btn btn-secondary btn-sm add-param-btn">
                      <span>+</span> Add Query Parameter
                    </button>
                  </div>
                  <div className="form-group">
                    <label>Headers</label>
                    <div className="headers-container">
                      {newTestCase.headers.map((header, headerIndex) => (
                        <div key={headerIndex} className="header-form-group">
                          <div className="header-header">
                            <span className="header-number">Header {headerIndex + 1}</span>
                            {newTestCase.headers.length > 1 && (
                              <button 
                                className="remove-header-btn" 
                                onClick={() => removeHeader(headerIndex)}
                                title="Remove header"
                              >
                                &times;
                              </button>
                            )}
                          </div>
                          <input
                            type="text"
                            className="form-control mb-1"
                            placeholder="Key (e.g. Content-Type)"
                            value={header.key}
                            onChange={(e) => handleHeaderChange(headerIndex, 'key', e.target.value)}
                          />
                          <input
                            type="text"
                            className="form-control mb-1"
                            placeholder="Value (e.g. application/json)"
                            value={header.value}
                            onChange={(e) => handleHeaderChange(headerIndex, 'value', e.target.value)}
                          />
                          <input
                            type="text"
                            className="form-control mb-1"
                            placeholder="Description (optional)"
                            value={header.description}
                            onChange={(e) => handleHeaderChange(headerIndex, 'description', e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                    <button onClick={addHeader} className="btn btn-secondary btn-sm add-header-btn">
                      <span>+</span> Add Header
                    </button>
                  </div>
                  <div className="form-group">
                    <label>Body</label>
                    <textarea
                      className="form-control"
                      rows="5"
                      value={newTestCase.body}
                      onChange={(e) => handleInputChange('body', e.target.value)}
                      placeholder="Enter JSON data"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={closeModal}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={saveTestCase}>
                    Save Test Case
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestCase;