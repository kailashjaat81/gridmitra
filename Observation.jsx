import { useState } from "react";
import "./Observation.css";

function Observation({ onBack ,asset}) {

  const [observation, setObservation] = useState("");

    const handleSave = async () => {
  if (!observation.trim()) {
    alert("Please enter an observation.");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:4000/api/observations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          assetId: asset.id,
          observation: observation
        })
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Observation saved successfully!");
    } else {
      alert(data.message);
    }

  } catch (error) {
    console.error("Failed to save observation:", error);
    alert("Unable to connect to backend.");
  }
};

  return (
    <div className="observation-page">

      <header className="observation-header">

        <button
          className="observation-back-btn"
          onClick={onBack}
        >
          ← Dashboard
        </button>

        <div>
          <h1>Add Observation</h1>
          <p>Record what you observed during the field visit</p>
        </div>

      </header>

      <section className="observation-card">

        <div className="observation-asset">
          <span>ASSET</span>
          <strong>⚡  {asset?.id}</strong>
        </div>

        <label>
          Field Observation
        </label>

        <textarea
          value={observation}
          onChange={(e) => setObservation(e.target.value)}
          placeholder="Example: Transformer ke neeche oil jaisa kuch dikha..."
          rows="8"
        />

        <div className="observation-actions">

          <button
            className="cancel-btn"
            onClick={onBack}
          >
            Cancel
          </button>

          <button
            className="save-observation-btn"
            onClick={handleSave}
          >
            Save Observation
          </button>

        </div>

      </section>

    </div>
  );
}

export default Observation;