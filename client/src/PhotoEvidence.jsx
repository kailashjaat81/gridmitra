import { useState, useEffect } from "react";
import "./PhotoEvidence.css";

function PhotoEvidence({ asset, onBack }) {
  const [photo, setPhoto] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");
  const [savedPhotos, setSavedPhotos] = useState([]);



  useEffect(() => {
  fetch(`http://localhost:4000/api/photos/${asset?.id}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        setSavedPhotos(data.photos);
      }
    })
    .catch((error) => {
      console.error("Failed to load saved photos:", error);
    });
}, [asset?.id]);

           const handlePhotoChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  setSelectedFile(file);

  const reader = new FileReader();

  reader.onloadend = () => {
    setPhoto(reader.result);
  };

  reader.readAsDataURL(file);
};

        const handleSave = async () => {
  if (!selectedFile) {
    alert("Please select a photo.");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:4000/api/photos",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
           body: JSON.stringify({
  assetId: asset.id,
  fileName: selectedFile.name,
  image: photo,
  description: description
})
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Photo evidence saved successfully!");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Failed to save photo:", error);
    alert("Unable to connect to backend.");
  }
};

  return (
    <div className="photo-evidence-page">

      <header className="photo-evidence-header">
        <button
          className="photo-back-btn"
          onClick={onBack}
        >
          ← Asset Memory
        </button>

        <div>
          <h1>Photo Evidence</h1>
          <p>Capture visual evidence for the field asset</p>
        </div>
      </header>

      <section className="photo-evidence-card">

        <div className="photo-asset">
          <span>ASSET</span>
          <strong>⚡ {asset?.id}</strong>
        </div>

        <label className="upload-label">
          Upload Field Photo
        </label>

        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handlePhotoChange}
        />

        {photo && (
          <div className="photo-preview">
            <img
              src={photo}
              alt="Field evidence preview"
            />
          </div>
        )}

        <label className="description-label">
          Photo Description
        </label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Example: Transformer ke neeche suspected oil leakage..."
          rows="5"
        />


            {savedPhotos.length > 0 && (
  <div className="saved-photos-section">
    <h2>Saved Photo Evidence</h2>

           {savedPhotos.map((item) => (
  <div className="saved-photo-card" key={item.id}>
    
    <strong>Asset: {item.assetId}</strong>

    {item.image && (
      <img
        src={item.image}
        alt="Saved field evidence"
        style={{
          width: "100%",
          maxWidth: "500px",
          marginTop: "12px",
          borderRadius: "10px"
        }}
      />
    )}

    <p>{item.description}</p>

    <small>
      {item.worker} ·{" "}
      {new Date(item.date).toLocaleString()}
    </small>

  </div>
))}
  </div>
)}

        <div className="photo-actions">

          <button
            className="photo-cancel-btn"
            onClick={onBack}
          >
            Cancel
          </button>

          <button
            className="save-photo-btn"
            onClick={handleSave}
          >
            Save Photo Evidence
          </button>

        </div>

      </section>

    </div>
  );
}

export default PhotoEvidence;
