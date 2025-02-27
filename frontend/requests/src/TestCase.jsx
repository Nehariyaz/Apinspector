import React, { useState } from "react";
import { Save, Share, Play } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import './TestCase.css';


const ApiRequestBuilder = () => {
  const [method, setMethod] = useState("POST");
  const [url, setUrl] = useState("localhost:3000");
  const [contentType, setContentType] = useState("JSON");
  const [inputCode, setInputCode] = useState('{\n  "name": "%ahul;"\n}');
  const [activeTab, setActiveTab] = useState("body");

  return (
    <div className="main">
    <div className="left container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
       
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-2">
          <button className="save btn d-flex align-items-center gap-2">
            <Save size={16} />
            Save
          </button>
          <button className="share btn d-flex align-items-center gap-2">
            <Share size={16} />
            Share
          </button>
        </div>
        <button className="btn btn-success d-flex align-items-center gap-2">
          <Play size={16} />
          Send
        </button>
      </div>

      {/* Method & URL Input */}
      <div className="d-flex gap-2 mb-3">
        <select
          className="form-select w-25"
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
          className="form-control"
          placeholder="Enter request URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "body" ? "active" : ""}`}
            onClick={() => setActiveTab("body")}
          >
            Body
          </button>
        </li>

      </ul>

      {/* Tab Content */}
      {activeTab === "body" ? (
        <div>
          {/* Raw & JSON/XML Selector */}
          <div className="d-flex gap-2 align-items-center mb-2">
            <button className="btn btn-secondary">Raw</button>
            <select
              className="selector form-select w-25"
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
            >
              <option value="JSON">JSON</option>
            </select>
          </div>

          <textarea
            className="form-control"
            rows="6"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
          />
        </div>
      ) : (
        <textarea
          className="form-control"
          rows="6"
          readOnly
          value={`curl --location 'localhost:3869' \\
  --header 'Content-Type: application/json' \\
  --data '{
    "name": "%ahul;"
  }'`}
        />
      )}
    </div>
    <div>
    <div className="right">
      <h2 className="title">Code Snippet</h2>
      <div className="code-box">
        <pre>
          {`cURL
1--location 'localhost:3000'\\
2--header 'Content-Type:application/json'\\
3--data '{
  "name": "Rahul"
}'`}
        </pre>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ApiRequestBuilder;