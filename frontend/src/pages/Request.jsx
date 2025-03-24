import React, { useState } from "react";
import { Save, Play, X } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Request.css";
import VerticalNavbar from "../components/VerticalNavbar";
import HorizontalNavbar from "../components/HorizontalNavbar"; 
import axios from "axios";

const Request = () => {
  // State management
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [contentType, setContentType] = useState("application/json");
  const [requestBody, setRequestBody] = useState('{\n  "key": "value"\n}');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Data for tables - now always visible
  const [queryParams, setQueryParams] = useState([
    { key: '', value: '', description: '' }
  ]);
  const [headers, setHeaders] = useState([
    { key: '', value: '', description: '' }
  ]);
  
  // State for selected option type in each section
  const [paramOption, setParamOption] = useState("custom");
  const [headerOption, setHeaderOption] = useState("custom");
  
  // State for active tab in the combined nav
  const [activeTab, setActiveTab] = useState("queryParams");
  
  // Predefined options for query parameters
  const queryParamOptions = {
    custom: [{ key: '', value: '', description: '' }],
    option1: [
      { key: 'page', value: '1', description: 'Page number' },
      { key: 'limit', value: '10', description: 'Items per page' }
    ],
    option2: [
      { key: 'sort', value: 'asc', description: 'Sort direction' },
      { key: 'filter', value: 'active', description: 'Filter by status' }
    ]
  };
  
  // Predefined options for headers
  const headerOptions = {
    custom: [{ key: '', value: '', description: '' }],
    option1: [
      { key: 'Authorization', value: 'Bearer token123', description: 'Auth token' },
      { key: 'Accept', value: 'application/json', description: 'Response format' }
    ],
    option2: [
      { key: 'Cache-Control', value: 'no-cache', description: 'Caching directive' },
      { key: 'X-API-Key', value: 'your-api-key', description: 'API key' }
    ]
  };
  
  // Handle changing parameter option
  const handleParamOptionChange = (option) => {
    setParamOption(option);
    setQueryParams(queryParamOptions[option]);
  };
  
  // Handle changing header option
  const handleHeaderOptionChange = (option) => {
    setHeaderOption(option);
    setHeaders(headerOptions[option]);
  };

  // Handle sending the request
  const handleSendRequest = async () => {
    if (!url) {
      alert("Please enter a URL.");
      return;
    }

    setLoading(true);
    try {
      // Parse request body if it's JSON
      const requestData = contentType === "application/json" && requestBody 
        ? JSON.parse(requestBody) 
        : requestBody;
      
      // Build query string from parameters
      const queryString = queryParams
        .filter(param => param.key && param.value)
        .map(param => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`)
        .join('&');
      
      // Combine URL with query string
      const fullUrl = queryString ? `${url}?${queryString}` : url;

      // Build headers object
      const requestHeaders = headers
        .filter(header => header.key && header.value)
        .reduce((acc, header) => {
          acc[header.key] = header.value;
          return acc;
        }, { "Content-Type": contentType });

      // Make the request
      const res = await axios({
        method,
        url: fullUrl,
        headers: requestHeaders,
        data: method !== "GET" && requestBody ? requestData : null,
      });

      setResponse(res.data);
    } catch (error) {
      setResponse(error.response ? error.response.data : "Error sending request");
    } finally {
      setLoading(false);
    }
  };

  // Table handlers
  const handleItemChange = (index, field, value, setter, items) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setter(updatedItems);
  };

  const addItem = (setter, items) => {
    setter([...items, { key: '', value: '', description: '' }]);
  };

  const removeItem = (index, setter, items) => {
    if (items.length > 1) {
      const updatedItems = [...items];
      updatedItems.splice(index, 1);
      setter(updatedItems);
    }
  };

  // Generate curl command
  const generateCurlCommand = () => {
    // Build query string
    const queryString = queryParams
      .filter(param => param.key && param.value)
      .map(param => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`)
      .join('&');
    
    const fullUrl = queryString ? `${url}?${queryString}` : url;
    
    // Start building the curl command
    let curlCommand = `curl --location '${fullUrl}' \\\n  --request ${method}`;
    
    // Add headers
    headers
      .filter(header => header.key && header.value)
      .forEach(header => {
        curlCommand += ` \\\n  --header '${header.key}: ${header.value}'`;
      });
    
    // Add body for non-GET requests
    if (method !== "GET" && requestBody) {
      curlCommand += ` \\\n  --data '${requestBody.replace(/'/g, "\\'")}'`;
    }
    
    return curlCommand;
  };

  return (
    <div className="d-flex flex-column">
      <HorizontalNavbar />
      <div className="d-flex">
        <VerticalNavbar />
        <div className="main">
          <div className="content-container">
            {/* Left container with request builder */}
            <div className="left-container">
              {/* Top action bar */}
              <div className="top-bar">
                <button className="save btn">
                  <Save size={16} />
                  Save
                </button>
                <button 
                  className="send btn" 
                  onClick={handleSendRequest} 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Play size={16} />
                      Send
                    </>
                  )}
                </button>
              </div>

              {/* Method and URL input */}
              <div className="combined-method-url-container">
                <select
                  className="form-select method-dropdown"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                  <option value="PATCH">PATCH</option>
                  <option value="HEAD">HEAD</option>
                  <option value="OPTIONS">OPTIONS</option>
                </select>
                <input
                  type="text"
                  className="form-control url-input"
                  placeholder="Enter request URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>

              {/* Combined Query Parameters and Headers Section */}
              <div className="combined-params-headers-container mt-4">
                {/* Navigation tabs for Query Params and Headers */}
                <ul className="navbar nav-tabs">
                  <li className="navbar-item">
                    <button
                      className={`navbar-link ${activeTab === 'queryParams' ? 'active' : ''}`}
                      onClick={() => setActiveTab('queryParams')}
                    >
                      Query Parameters
                    </button>
                  </li>
                  <li className="navbar-item">
                    <button
                      className={`navbar-link ${activeTab === 'headers' ? 'active' : ''}`}
                      onClick={() => setActiveTab('headers')}
                    >
                      Headers
                    </button>
                  </li>
                </ul>

                <div className="section-container mt-3">
                  {/* Query Parameters Panel */}
                  {activeTab === 'queryParams' && (
                    <div>
                      <div className="option-selector mb-3">
                        <select
                          className="form-select w-auto"
                          value={paramOption}
                          onChange={(e) => handleParamOptionChange(e.target.value)}
                        >
                          <option value="custom">Custom Parameters</option>
                          <option value="option1">Pagination Parameters</option>
                          <option value="option2">Filtering Parameters</option>
                        </select>
                      </div>
                      
                      <div className="table-container">
                        <table className="table">
                          <thead>
                            <tr>
                              <th width="25%">Key</th>
                              <th width="25%">Value</th>
                              <th width="40%">Description</th>
                              <th width="10%">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {queryParams.map((param, index) => (
                              <tr key={`param-${index}`}>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Key"
                                    value={param.key}
                                    onChange={(e) => handleItemChange(
                                      index, 'key', e.target.value, setQueryParams, queryParams
                                    )}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Value"
                                    value={param.value}
                                    onChange={(e) => handleItemChange(
                                      index, 'value', e.target.value, setQueryParams, queryParams
                                    )}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Description"
                                    value={param.description}
                                    onChange={(e) => handleItemChange(
                                      index, 'description', e.target.value, setQueryParams, queryParams
                                    )}
                                  />
                                </td>
                                <td className="text-center">
                                  <button 
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => removeItem(index, setQueryParams, queryParams)}
                                    disabled={queryParams.length === 1}
                                  >
                                    <X size={16} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <button 
                          onClick={() => addItem(setQueryParams, queryParams)} 
                          className="btn btn-primary"
                        >
                          Add Query Param
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Headers Panel */}
                  {activeTab === 'headers' && (
                    <div>
                      <div className="option-selector mb-3">
                        <select
                          className="form-select w-auto"
                          value={headerOption}
                          onChange={(e) => handleHeaderOptionChange(e.target.value)}
                        >
                          <option value="custom">Custom Headers</option>
                          <option value="option1">Authentication Headers</option>
                          <option value="option2">Cache & API Headers</option>
                        </select>
                      </div>
                      
                      <div className="table-container">
                        <table className="table">
                          <thead>
                            <tr>
                              <th width="25%">Key</th>
                              <th width="25%">Value</th>
                              <th width="40%">Description</th>
                              <th width="10%">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {headers.map((header, index) => (
                              <tr key={`header-${index}`}>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Key"
                                    value={header.key}
                                    onChange={(e) => handleItemChange(
                                      index, 'key', e.target.value, setHeaders, headers
                                    )}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Value"
                                    value={header.value}
                                    onChange={(e) => handleItemChange(
                                      index, 'value', e.target.value, setHeaders, headers
                                    )}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Description"
                                    value={header.description}
                                    onChange={(e) => handleItemChange(
                                      index, 'description', e.target.value, setHeaders, headers
                                    )}
                                  />
                                </td>
                                <td className="text-center">
                                  <button 
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => removeItem(index, setHeaders, headers)}
                                    disabled={headers.length === 1}
                                  >
                                    <X size={16} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <button 
                          onClick={() => addItem(setHeaders, headers)} 
                          className="btn btn-primary"
                        >
                          Add Header
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Request Body Section */}
              <div className="raw-json-body-container mt-4">
                <h5>Request Body</h5>
                <div className="raw-json-container">
                  <button className="btn btn-outline-secondary">Raw</button>
                  <select
                    className="form-select w-auto"
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                  >
                    <option value="application/json">JSON</option>
                    <option value="text/plain">Text</option>
                    <option value="application/xml">XML</option>
                    <option value="application/x-www-form-urlencoded">Form URL Encoded</option>
                  </select>
                </div>

                <div className="body-section">
                  <textarea
                    className="body-textarea"
                    rows="8"
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                    placeholder={contentType === "application/json" ? 
                      '{\n  "key": "value"\n}' : 
                      'Enter request body here...'
                    }
                  />
                </div>
              </div>
            </div>

            {/* Right container with code snippet */}
            <div className="right-container">
              <div className="card">
                <div className="card-header">
                  <h5>Code Snippet</h5>
                </div>
                <div className="card-body">
                  <pre>{generateCurlCommand()}</pre>
                </div>
              </div>
              
              {/* Response section - shown after request is sent */}
              {response && (
                <div className="card mt-4">
                  <div className="card-header">
                    <h5>Response</h5>
                  </div>
                  <div className="card-body">
                    <pre>
                      {typeof response === 'object' 
                        ? JSON.stringify(response, null, 2) 
                        : response}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Request;