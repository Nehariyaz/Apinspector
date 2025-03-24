import React, { useState } from 'react';
import "@/styles/Assertion.css";
import "@/styles/VerticalNavbar.css";
import "@/styles/HorizontalNavbar.css";
import VerticalNavbar from "../components/VerticalNavbar";
import HorizontalNavbar from "../components/HorizontalNavbar";

const Assertion = () => {
  const [assertions, setAssertions] = useState([]);
  const [newAssertion, setNewAssertion] = useState({
    testCase: '',
    assertionType: '',
    condition: '',
    expectedValue: ''
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssertion({ ...newAssertion, [name]: value });
  };

  const handleCreateAssertion = () => {
    if (!newAssertion.testCase || !newAssertion.assertionType || !newAssertion.condition || !newAssertion.expectedValue) {
      alert("Please fill in all fields");
      return;
    }

    if (editingIndex !== null) {
      const updatedAssertions = [...assertions];
      updatedAssertions[editingIndex] = newAssertion;
      setAssertions(updatedAssertions);
      setEditingIndex(null);
    } else {
      setAssertions([...assertions, newAssertion]);
    }
    setNewAssertion({ testCase: '', assertionType: '', condition: '', expectedValue: '' });
    setShowForm(false);
  };

  const handleDeleteAssertion = (index) => {
    if (window.confirm("Are you sure you want to delete this assertion?")) {
      const updatedAssertions = assertions.filter((_, i) => i !== index);
      setAssertions(updatedAssertions);
    }
  };

  const handleEditAssertion = (index) => {
    const assertionToEdit = assertions[index];
    setNewAssertion(assertionToEdit);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setNewAssertion({ testCase: '', assertionType: '', condition: '', expectedValue: '' });
    setEditingIndex(null);
    setShowForm(false);
  };

  return (
    <div className="app-container">
      <HorizontalNavbar />
      <div className="main-content">
        <VerticalNavbar />
        <div className="assertion-content">
          <div className="rounded-container">
            <div className="page-header">
              <button 
                className="primary-button"
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? '− Cancel' : '+ New Assertion'}
              </button>
            </div>

            {showForm && (
              <div className="assertion-form-card">
                <h2>{editingIndex !== null ? 'Update Assertion' : 'Create New Assertion'}</h2>
                <div className="assertion-form">
                  <div className="form-group">
                    <label htmlFor="testCase">Test Case</label>
                    <select 
                      id="testCase" 
                      name="testCase" 
                      value={newAssertion.testCase} 
                      onChange={handleInputChange}
                    >
                      <option value="">Select Test Case</option>
                      <option value="User Login">User Login</option>
                      <option value="User Profile">User Profile</option>
                      <option value="Data Fetch">Data Fetch</option>
                      <option value="Checkout Process">Checkout Process</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="assertionType">Assertion Type</label>
                    <select 
                      id="assertionType" 
                      name="assertionType" 
                      value={newAssertion.assertionType} 
                      onChange={handleInputChange}
                    >
                      <option value="">Select Assertion Type</option>
                      <option value="Status Code">Status Code Assertions</option>
                      <option value="Header">Header Assertions</option>
                      <option value="Response Body">Response Body Assertions</option>
                      <option value="Response Time">Response Time Assertions</option>
                      <option value="Custom Script">Custom Script Assertions</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="condition">Condition</label>
                    <select 
                      id="condition" 
                      name="condition" 
                      value={newAssertion.condition} 
                      onChange={handleInputChange}
                    >
                      <option value="">Select Condition</option>
                      <option value="Equal">Equal</option>
                      <option value="Not Equal">Not Equal</option>
                      <option value="Contains">Contains</option>
                      <option value="Less Than">Less Than</option>
                      <option value="Greater Than">Greater Than</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="expectedValue">Expected Value</label>
                    <input
                      id="expectedValue"
                      type="text"
                      name="expectedValue"
                      value={newAssertion.expectedValue}
                      onChange={handleInputChange}
                      placeholder="e.g. 200, 500ms, true"
                    />
                  </div>
                </div>
                <div className="form-actions">
                  <button className="secondary-button" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                  <button className="primary-button" onClick={handleCreateAssertion}>
                    {editingIndex !== null ? 'Update' : 'Create'}
                  </button>
                </div>
              </div>
            )}

            {assertions.length > 0 ? (
              <div className="assertions-table-container">
                <table className="assertions-table">
                  <thead>
                    <tr>
                      <th>Test Case</th>
                      <th>Assertion Type</th>
                      <th>Condition</th>
                      <th>Expected Value</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assertions.map((assertion, index) => (
                      <tr key={index}>
                        <td>{assertion.testCase}</td>
                        <td>
                          <span className="assertion-badge">{assertion.assertionType}</span>
                        </td>
                        <td>{assertion.condition}</td>
                        <td>{assertion.expectedValue}</td>
                        <td className="action-buttons">
                          <button 
                            className="edit-button" 
                            onClick={() => handleEditAssertion(index)}
                            title="Edit"
                          >
                            <i className="fa fa-edit"></i>Edit
                          </button>
                          <button 
                            className="delete-button" 
                            onClick={() => handleDeleteAssertion(index)}
                            title="Delete"
                          >
                            <i className="fa fa-trash"></i>Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                <i className="fa fa-clipboard-check"></i>
                <h3>No Assertions Yet</h3>
                <p>Create your first assertion to get started with API testing</p>
                <button className="primary-button" onClick={() => setShowForm(true)}>
                  Create First Assertion
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assertion;