import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
    const [url, setUrl] = useState("http://localhost:5000/api");
    const [method, setMethod] = useState("POST");
    const [requestBody, setRequestBody] = useState("");
    const [response, setResponse] = useState("");
    const textAreaRef = useRef(null);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto";
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
        }
    }, [requestBody]);

    const handleSendRequest = async () => {
        try {
            const options = {
                method,
                headers: { "Content-Type": "application/json" },
            };

            if (method !== "GET") {
                options.body = requestBody;
            }
            const res = await fetch(url, options);
            const data = await res.json();
            setResponse(JSON.stringify(data, null, 2));
        } catch (error) {
            setResponse(`Error: ${error.message}`);
        }
    };

    return (
        <div className="container expanded">
            <div className="header">
                <div className="button-group">
                    <button className="btn">💾 Save</button>
                    <button className="btn">🔗 Share</button>
                </div>
            </div>
            <div className="content">
                <div className="left-section">
                    <div className="input-group">
                        <select 
                            value={method} 
                            onChange={(e) => setMethod(e.target.value)}
                            className="method-select"
                        >
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                            <option value="PUT">PUT</option>
                            <option value="DELETE">DELETE</option>
                            <option value="PATCH">PATCH</option>
                        </select>
                        <input 
                            type="text" 
                            value={url} 
                            onChange={(e) => setUrl(e.target.value)}
                            className="url-input"
                            placeholder="Enter API URL here..."
                        />
                        <button className="send-btn" onClick={handleSendRequest}>
                            Send
                        </button>
                    </div>
                    <div className="body-section">
                        <div className="body-header">
                            <button className="raw-btn">Raw</button>
                            <select 
                                className="format-select"
                                onChange={(e) => setRequestBody(e.target.value === "json" ? "{\n  \"key\": \"value\"\n}" : "<root>\n  <item>value</item>\n</root>")}
                            >
                                <option value="json">JSON</option>
                                <option value="xml">XML</option>
                            </select>
                        </div>
                        <div className="code-editor-container">
                            <textarea 
                                ref={textAreaRef}
                                className="code-textarea" 
                                value={requestBody}
                                onChange={(e) => setRequestBody(e.target.value)}
                                placeholder="Write your request body here..."
                            />
                        </div>
                    </div>
                </div>
                <div className="right-section code-snippet">
                    <h3 className="response-title">Code Snippet:</h3>
                    <pre className="response-box">{response}</pre>
                </div>
            </div>
        </div>
    );
}

export default App;
