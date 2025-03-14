import React, { useState } from "react";
import { Save, Share, Play } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/Request.css";
import VerticalNavbar from "../components/VerticalNavbar";
import HorizontalNavbar from "../components/HorizontalNavbar"; 

const Request = () => {
  const [method, setMethod] = useState("POST");
  const [url, setUrl] = useState("localhost:3000");
  const [contentType, setContentType] = useState("JSON");
  const [inputCode, setInputCode] = useState('{\n  "name": "Rahul"\n}');

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
              <button className="share btn d-flex align-items-center gap-2">
                <Share size={16} />
                Share
              </button>
            </div>
            <button className="send btn d-flex align-items-center gap-2">
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

          <div className="raw-json-body-container">
            <div className="raw-json-container">
              <button className="btn btn-secondary">Raw</button>
              <select
                className="form-select w-25"
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
              >
                <option value="JSON">JSON</option>
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