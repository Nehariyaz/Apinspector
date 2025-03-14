import React, { useState } from 'react';
import "@/styles/Assertion.css";
import "@/styles/VerticalNavbar.css";
import "@/styles/HorizontalNavbar.css";
import VerticalNavbar from "../components/VerticalNavbar";
import HorizontalNavbar from "../components/HorizontalNavbar"; 

const Assertion = () => {
  const [assertions, setAssertions] = useState([
    { testCase: 'User Login', assertionType: 'Status Code', condition: 'Equal', expectedValue: '290' },
    { testCase: 'User Profile', assertionType: 'Response Time', condition: 'Less Than', expectedValue: '500ms' }
  ]);

  const [newAssertion, setNewAssertion] = useState({
    testCase: '',
    assertionType: '',
    condition: '',
    expectedValue: ''
  });

  const [editingIndex, setEditingIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssertion({ ...newAssertion, [name]: value });
  };

  const handleCreateAssertion = () => {
    if (editingIndex !== null) {
      // If editing, update the existing assertion
      const updatedAssertions = [...assertions];
      updatedAssertions[editingIndex] = newAssertion;
      setAssertions(updatedAssertions);
      setEditingIndex(null); // Reset editing state
    } else {
      // If not editing, add a new assertion
      setAssertions([...assertions, newAssertion]);
    }
    setNewAssertion({ testCase: '', assertionType: '', condition: '', expectedValue: '' }); // Reset form
  };

  const handleDeleteAssertion = (index) => {
    const updatedAssertions = assertions.filter((_, i) => i !== index);
    setAssertions(updatedAssertions);
  };

  const handleEditAssertion = (index) => {
    const assertionToEdit = assertions[index];
    setNewAssertion(assertionToEdit); // Populate the form with the assertion to edit
    setEditingIndex(index); // Set the editing index
  };

  return (
    <div className="d-flex flex-column">
    <HorizontalNavbar />
    <div className="d-flex">
      <VerticalNavbar />
    <div className="content">
      <div className="create-assertion-container">
        <div className="create-assertion-form">
          <select name="testCase" value={newAssertion.testCase} onChange={handleInputChange}>
            <option value="">Select Test Case</option>
            <option value="User Login">User Login</option>
            <option value="User Profile">User Profile</option>
          </select>
          <select name="assertionType" value={newAssertion.assertionType} onChange={handleInputChange}>
            <option value="">Select Assertion Type</option>
            <option value="Status Code">Status Code Assertions</option>
            <option value="Header">Header Assertions</option>
            <option value="Response Body">Response Body Assertions</option>
            <option value="Response Time">Response Time Assertions</option>
            <option value="Custom Script">Custom Script Assertions</option>
          </select>
          <select name="condition" value={newAssertion.condition} onChange={handleInputChange}>
            <option value="">Select Condition</option>
            <option value="Equal">Equal</option>
            <option value="Less Than">Less Than</option>
          </select>
          <input
            type="text"
            name="expectedValue"
            value={newAssertion.expectedValue}
            onChange={handleInputChange}
            placeholder="Expected Value"
          />
        </div>
        <button className="create-button" onClick={handleCreateAssertion}>
          {editingIndex !== null ? 'Update Assertion' : '+ Create Assertion'}
        </button>
      </div>

      <h2>Existing Assertions</h2>
      <table className="testcase-table">
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
              <td>{assertion.assertionType}</td>
              <td>{assertion.condition}</td>
              <td>{assertion.expectedValue}</td>
              <td>
                <button className="edit-button" onClick={() => handleEditAssertion(index)}>Edit</button>
                <button className="delete-button" onClick={() => handleDeleteAssertion(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
};

export default Assertion;