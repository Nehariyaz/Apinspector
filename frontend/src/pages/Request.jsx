import React, { useState } from "react";
import { Save, Share, Play } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/Request.css";
import VerticalNavbar from "../components/VerticalNavbar";
import HorizontalNavbar from "../components/HorizontalNavbar"; 
import axios from "axios";

const Request = () => {
  const [method, setMethod] = useState("GET"); 
  const [url, setUrl] = useState("");  
  const [contentType, setContentType] = useState("application/json");
  const [inputCode, setInputCode] = useState("");  
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [queryParams, setQueryParams] = useState([{ key: '', value: '', description: '' }]);

  const handleSendRequest = async () => {
    if (!method || !url) {
      alert("Please select a method and enter a URL.");
      return;
    }

    setLoading(true);
    try {
      const requestData = contentType === "application/json" && inputCode ? JSON.parse(inputCode) : inputCode;
      
      // Construct the URL with query parameters
      const queryString = queryParams
        .filter(param => param.key && param.value)
        .map(param => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`)
        .join('&');
      const fullUrl = queryString ? `${url}?${queryString}` : url;

      console.log("Sending request with:", { method, fullUrl });
      const res = await axios({
        method,
        url: fullUrl,
        headers: { "Content-Type": contentType },
        data: method !== "GET" && inputCode ? requestData : null,
      });

      setResponse(res.data);
    } catch (error) {
      setResponse(error.response ? error.response.data : "Error sending request");
    } finally {
      setLoading(false);
    }
  };

  const handleQueryParamChange = (index, field, value) => {
    const updatedQueryParams = [...queryParams];
    updatedQueryParams[index][field] = value;
    setQueryParams(updatedQueryParams);
  };

  const addQueryParam = () => {
    setQueryParams([...queryParams, { key: '', value: '', description: '' }]);
  };

  return (
    <div className="d-flex flex-column">
      <HorizontalNavbar />
      <div className="d-flex">
        <VerticalNavbar />
        <div className="main">
          <div className="content-container">
            <div className="left-container">
              <div className="top-bar">
                <div className="left-buttons">
                  <button className="save btn d-flex align-items-center gap-2">
                    <Save size={16} />
                    Save
                  </button>
                </div>
                <button className="send btn d-flex align-items-center gap-2" onClick={handleSendRequest} disabled={loading}>
                  <Play size={16} />
                  Send
                </button>
              </div>

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
                </select>
                <input
                  type="text"
                  className="form-control url-input"
                  placeholder="Enter request URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>

              <div className="query-params-table-container mt-3">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Key</th>
                      <th>Value</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queryParams.map((param, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Key"
                            value={param.key}
                            onChange={(e) => handleQueryParamChange(index, 'key', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Value"
                            value={param.value}
                            onChange={(e) => handleQueryParamChange(index, 'value', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Description"
                            value={param.description}
                            onChange={(e) => handleQueryParamChange(index, 'description', e.target.value)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button onClick={addQueryParam} className="btn btn-secondary mt-2">
                  Add Query Param
                </button>
              </div>

              <div className="raw-json-body-container mt-3">
                <div className="raw-json-container">
                  <button className="btn btn-secondary">Raw</button>
                  <select
                    className="form-select w-25"
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                  >
                    <option value="application/json">JSON</option>
                  </select>
                </div>

                <div className="body-section">
                  <textarea
                    className="form-control body-textarea"
                    rows="6"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="right-container">
              <h2 className="title">Code Snippet</h2>
              <div className="code-box">
                {/* <pre>
                  {`curl --location 'localhost:3000' \\
  --header 'Content-Type: application/json' \\
  --data '{
    "name": "Rahul"
  }'`}
                </pre> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Request;