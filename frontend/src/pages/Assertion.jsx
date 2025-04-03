import React, { useState } from 'react';
import "@/styles/Assertion.css";
import "@/styles/VerticalNavbar.css";
import axios from 'axios';
import "@/styles/HorizontalNavbar.css";
import VerticalNavbar from "../components/VerticalNavbar";
import HorizontalNavbar from "../components/HorizontalNavbar";
import { useEffect } from "react";


const Assertion = () => {
  const [assertions, setAssertions] = useState([]);
  const [testCases, setTestCases] = useState([]);
  const [newAssertion, setNewAssertion] = useState({
    testCaseId: '',
    assertionType: '',
    condition: '',
    expectedValue: '',
    receivedValue: '-' // Added receivedValue field
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);



  useEffect(() => {
    const fetchTestCases = async () => {
      try {
        const response = await axios.get("http://localhost:3000/test-cases", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        console.log("Fetched testCases:", response.data);
  
        if (response.data.length > 0) {
          setTestCases(response.data);
          setNewAssertion((prev) => ({
            ...prev,
            testCaseId: prev.testCaseId || response.data[0].id, // Only set if not already set
          }));
        }
      } catch (error) {
        console.error("Error fetching test cases:", error);
      }
    };
  
    const fetchAssertions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/assertions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        console.log("Fetched Assertions:", response.data);
        setAssertions(response.data);
      } catch (error) {
        console.error("Error fetching assertions:", error);
      }
    };
  
    fetchTestCases();
    fetchAssertions();
  }, []); 
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssertion({ ...newAssertion, [name]: value });
  };

  // Mock function to simulate getting API response value
  const getReceivedValue = (assertion) => {
    // In a real implementation, this would come from your API response
    // For demo purposes, we'll return some mock values
    switch(assertion.assertionType) {
      case 'Status Code':
        return '200';
      case 'Header':
        return 'application/json';
      case 'Response Body':
        return '{"status":"success"}';
      case 'Response Time':
        return '150ms';
      default:
        return '-';
    }
  };

  const handleCreateAssertion = async () => {
    if (!newAssertion.testCaseId || !newAssertion.assertionType || 
        !newAssertion.condition || !newAssertion.expectedValue) {
        console.log(newAssertion.testCaseId);
        alert("Please fill in all required fields");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/test-cases/${newAssertion.testCaseId}/assertions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token-based auth
            },
            body: JSON.stringify({
                testCaseId: newAssertion.testCaseId, 
                assertionType: newAssertion.assertionType,
                condition: newAssertion.condition,
                expectedValue: newAssertion.expectedValue
            }),
        });
        console.log("Creating Assertion with:", newAssertion);
        if (!response.ok) {
            throw new Error("Failed to create assertion");
        }

        const createdAssertion = await response.json();

        // Update UI with new assertion including received value and status
        setAssertions([...assertions, createdAssertion]);

        setNewAssertion({ 
            testCase: '', 
            assertionType: '', 
            condition: '', 
            expectedValue: '',
            receivedValue: '-' 
        });
        setShowForm(false);

    } catch (error) {
        console.error("Error creating assertion:", error);
        alert("Error creating assertion");
    }
};

const handleDeleteAssertion = async (id) => {
  console.log("Attempting to delete assertion with ID:", id);
  if (window.confirm("Are you sure you want to delete this assertion?")) {
      try {
          const response = await axios.delete(`http://localhost:3000/assertions/${id}`, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
          });

          if (response.status === 200) { 
            setAssertions(assertions.filter(assertion => assertion.id !== id));
        } else {
            throw new Error("Failed to delete assertion");
        }

      } catch (error) {
          console.error("Error deleting assertion:", error);
          alert("Failed to delete assertion");
      }
  }
};


const handleUpdateAssertion = async (id) =>{
  if (!newAssertion.assertionType || !newAssertion.condition || !newAssertion.expectedValue) {
    alert("Please fill in all required fields.");
    return;
  }
  console.log("Updating assertion with UUID:", newAssertion.id); 
  try {
    const response = await axios.put(`http://localhost:3000/${newAssertion.id}`,{
      assertionType: newAssertion.assertionType,
      condition: newAssertion.condition,
      expectedValue: newAssertion.expectedValue,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 200) {
      const updatedAssertions = assertions.map((assertion) =>
        assertion.id === newAssertion.id ? response.data.assertion : assertion
      );
      setAssertions(updatedAssertions);
      alert("Assertion updated successfully!");
      setShowForm(false);
      setEditingIndex(null);
      setNewAssertion({
        testCaseId: '',
        assertionType: '',
        condition: '',
        expectedValue: '',
        receivedValue: '-',
      });
    } else {
      throw new Error("Failed to update assertion.");
    }
  } catch (error) {
    console.error("Error updating assertion:", error);
    alert("Error updating assertion.");
  }
}

const handleEditAssertion = async (index) => {
  
  const assertionToEdit = assertions[index];
  setNewAssertion({
    testCaseId: assertionToEdit.testCaseId, // Ensure testCaseId is set
    assertionType: assertionToEdit.assertionType,
    condition: assertionToEdit.condition,
    expectedValue: assertionToEdit.expectedValue,
    receivedValue: assertionToEdit.receivedValue || '-',
  });
    setNewAssertion(assertionToEdit);
    setEditingIndex(index);
    setShowForm(true);
};


  const handleCancelEdit = () => {
    setNewAssertion({ 
      
      testCase: '', 
      assertionType: '', 
      condition: '', 
      expectedValue: '',
      receivedValue: '-' 
    });
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
                      value={newAssertion.testCaseId || ""}
                      onChange={(e) => {
                      setNewAssertion((prev) => {
                        const updated = { ...prev, testCaseId: e.target.value };
                        return updated;
                    });
                  }}
                >    
                      {testCases.length > 0 ? (
                        testCases.map((testCase) => (
                        <option key={testCase.id} value={testCase.id}> {testCase.name} </option>
                       ))
                        ) : (
                            <option disabled>No testcases</option>
                          )}
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
                  <button className="primary-button" onClick={editingIndex !== null ? handleUpdateAssertion : handleCreateAssertion}>
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
                      <th>Received Value</th> {/* Added Received Value column */}
                      <th>Status</th> {/* Added Status column */}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assertions.map((assertion, index) => {
                      // Determine if the assertion passed
                      const isPassed = assertion.receivedValue !== '-' && 
                                      assertion.expectedValue === assertion.receivedValue;
                      
                      return (
                        <tr key={index}>
                          <td>{assertion.testCase.name}</td>
                          <td>
                            <span className="assertion-badge">{assertion.assertionType}</span>
                          </td>
                          <td>{assertion.condition}</td>
                          <td>{assertion.expectedValue}</td>
                          <td>{assertion.receivedValue}</td>
                          <td>
                            <span className={`status-badge ${isPassed ? 'passed' : 'failed'}`}>
                              {isPassed ? '✓ Passed' : '✗ Failed'}
                            </span>
                          </td>
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
                              onClick={() => handleDeleteAssertion(assertion.id)}
                              title="Delete"
                            >
                              <i className="fa fa-trash"></i>Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                <i className="fa fa-clipboard-check"></i>
                <div className="empty-icon">📋</div>
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