import React, { useState } from "react";
import { Save, Share, Play } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/Request.css";
import VerticalNavbar from "../components/VerticalNavbar";
import HorizontalNavbar from "../components/HorizontalNavbar"; 


const Request = () => {
  const [method, setMethod] = useState(""); 
  const [url, setUrl] = useState("");  
  const [contentType, setContentType] = useState("application/json");
  const [inputCode, setInputCode] = useState("");  
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSendRequest = async () => {
    console.log("Helllooo");
    if (!method || !url) {
      alert("Please select a method and enter a URL.");
      return;
    }

    setLoading(true);
    try {
      const requestData = contentType === "application/json" && inputCode ? JSON.parse(inputCode) : inputCode;
      console.log("Sending request with:", { method, url});
      const res = await axios.post({
        method,
        url,
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