import React, { useState } from "react";
import axios from "axios";

function App() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!symptoms) return;

    setLoading(true);

    try {
      
      const response = await axios.post("https://ai-symptom-triage-assistant.onrender.com/analyze", {
        symptoms: symptoms,
        age: 21,
        gender: "male"
      });

      setResult(response.data);
    } catch (error) {
      setResult({ error: "Something went wrong" });
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>AI Symptom Triage Assistant</h1>

      <textarea
        rows="5"
        placeholder="Enter your symptoms..."
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        style={styles.textarea}
      />

      <button onClick={handleSubmit} style={styles.button}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <div style={styles.card}>
          <h3>Conditions</h3>
          <ul>
            {result.conditions?.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>

          <h3>Urgency</h3>
          <p style={{
            color:
              result.urgency === "High"
                ? "red"
                : result.urgency === "Medium"
                ? "orange"
                : "green"
          }}>
            {result.urgency}
          </p>

          <h3>Next Steps</h3>
          <ul>
            {result.steps?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <p style={styles.disclaimer}>{result.disclaimer}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    fontFamily: "Arial",
    padding: "20px"
  },
  title: {
    textAlign: "center"
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "10px"
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer"
  },
  card: {
    marginTop: "20px",
    padding: "15px",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  },
  disclaimer: {
    marginTop: "10px",
    fontSize: "12px",
    color: "gray"
  }
};

export default App;