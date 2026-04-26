import React, { useState } from "react";
import axios from "axios";
import background from "./background.png";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [language, setLanguage] = useState("en");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    setError(null);
    setResult(null);
    if (!file) return setError("Please choose a file first.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post(
        `${API_URL}/predict/?language=${language}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 20000,
        }
      );

      if (res.data && res.data.error) {
        setError(res.data.error);
      } else {
        setResult(res.data);
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "30px",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.15)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          textAlign: "center",
          color: "white",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>
           Smart Plant Disease Detector
        </h1>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "8px",
            border: "none",
            marginBottom: "15px",
          }}
        >
          <option value="en">English</option>
          <option value="bn">Bengali</option>
          <option value="hi">Hindi</option>
        </select>

        <br />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginBottom: "15px" }}
        />

        {preview && (
          <div style={{ marginBottom: "15px" }}>
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "100%",
                borderRadius: "12px",
                maxHeight: "200px",
                objectFit: "cover",
              }}
            />
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={loading}
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            border: "none",
            background: "#28a745",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
            width: "100%",
            transition: "0.3s",
          }}
        >
          {loading ? "Analyzing..." : "Analyze Plant"}
        </button>

        {error && (
          <div style={{ marginTop: "15px", color: "#ff4d4d" }}>
            <strong>{error}</strong>
          </div>
        )}

        {result && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              borderRadius: "12px",
              background: "rgba(0,0,0,0.4)",
            }}
          >
            <h2>Disease:</h2>
            <p>{result.disease}</p>

            <h3>Solution:</h3>
            <p>{result.solution}</p>

            {result.confidence && (
              <p>Confidence: {(result.confidence * 100).toFixed(2)}%</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;