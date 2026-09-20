import { useState } from "react";
import "./EvidencePackage.css";

function EvidencePackage({ asset, onBack }) {
  const [observation, setObservation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [generated, setGenerated] = useState(false);

             const handlePhotoChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onloadend = () => {
    setPhoto(reader.result);
  };

  reader.readAsDataURL(file);
};

           const handleGenerate = async () => {
  if (!observation.trim()) {
    alert("Please enter an observation.");
    return;
  }

  if (!photo) {
    alert("Please upload a field photo.");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:4000/api/evidence-packages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          assetId: asset?.id || "T-182",
          location: asset?.location || "Field Site",
          observation: observation,
          photoAttached: true,
          image: photo
        })
      }
    );

    const data = await response.json();

    if (data.success) {
      setGenerated(true);
    } else {
      alert(data.message || "Unable to generate evidence package.");
    }
  } catch (error) {
    console.error("Evidence package error:", error);
    alert("Unable to connect to backend.");
  }
};

  return (
    <div className="evidence-package-page">
      <header className="evidence-package-header">
        <button
          className="evidence-back-btn"
          onClick={onBack}
        >
          ← Back
        </button>

        <div>
          <h1>Evidence Package</h1>
          <p>Create a complete field evidence report</p>
        </div>
      </header>

      <section className="evidence-package-card">

        <div className="evidence-asset">
          <span>ASSET</span>
          <strong>⚡ {asset?.id || "T-182"}</strong>
        </div>
        <p>Location: {asset?.location || "No location"}</p>

        <div className="evidence-section">
          <h2>Field Observation</h2>

          <textarea
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            placeholder="Example: Transformer ke neeche tel jaisa kuch dikh raha hai..."
            rows="6"
          />
        </div>

        <div className="evidence-section">
          <h2>Photo Evidence</h2>

          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handlePhotoChange}
          />

          {photo && (
            <div className="evidence-photo-preview">
              <img
                src={photo}
                alt="Field evidence"
              />
            </div>
          )}
        </div>

        <button
          className="generate-package-btn"
          onClick={handleGenerate}
        >
          📦 Generate Evidence Package
        </button>

        {generated && (
          <div className="generated-package">

            <h2>Evidence Package Generated</h2>

            <div className="package-row">
              <span>Asset ID</span>
              <strong>{asset?.id || "T-182"}</strong>
            </div>

            <div className="package-row">
              <span>Date</span>
              <strong>18 Sep 2026</strong>
            </div>

            <div className="package-row">
              <span>Status</span>
              <strong>Ready for Review</strong>
            </div>

            <div className="package-observation">
              <span>Observation</span>
              <p>{observation}</p>
            </div>

            <div className="package-note">
              This package is prepared for field documentation.
              Safety-critical decisions must follow authorized
              personnel and utility procedures.
            </div>

          </div>
        )}

      </section>
    </div>
  );
}

export default EvidencePackage;