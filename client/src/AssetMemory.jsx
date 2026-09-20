import { useState, useEffect } from "react";
import "./AssetMemory.css";
import Observation from "./Observation";
import PhotoEvidence from "./PhotoEvidence";
import EvidencePackage from "./EvidencePackage";

function AssetMemory({ onBack }) {
    const [showObservation, setShowObservation] = useState(false);
    const [showPhotoEvidence, setShowPhotoEvidence] = useState(false);
    const [showEvidencePackage, setShowEvidencePackage] = useState(false);

   const [assets, setAssets] = useState({});
   const [observations, setObservations] = useState([]);
const [loading, setLoading] = useState(true);


useEffect(() => {
  const fetchAssets = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/assets");
      const data = await response.json();

      if (data.success) {
        const assetMap = {};

        data.assets.forEach((asset) => {
          assetMap[asset.id] = {
            ...asset,
            installed: "Not available",
            workers: [],
          };
        });

        setAssets(assetMap);
      }
    } catch (error) {
      console.error("Failed to fetch assets:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchAssets();
}, []);

   useEffect(() => {
  const fetchObservations = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/observations/T-182"
      );

      const data = await response.json();

      if (data.success) {
        setObservations(data.observations);
      }
    } catch (error) {
      console.error("Failed to fetch observations:", error);
    }
  };

  fetchObservations();
}, []);

   const [searchInput, setSearchInput] = useState("T-182");
const [selectedAsset, setSelectedAsset] = useState(null);
const [notFound, setNotFound] = useState(false);

   const handleSearch = async () => {
  const id = searchInput.trim().toUpperCase();

  if (!assets[id]) {
    setSelectedAsset(null);
    setNotFound(true);
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:4000/api/assets/${id}`
    );

    const data = await response.json();

    if (data.success) {
      setSelectedAsset(data.asset);
      setNotFound(false);
    } else {
      setSelectedAsset(null);
      setNotFound(true);
    }
  } catch (error) {
    console.error("Failed to fetch asset details:", error);
    alert("Unable to load asset details.");
  }
};

  if (showObservation) {
  return (
    <Observation
     asset={selectedAsset}
      onBack={() => setShowObservation(false)}
    />
  );
}
       if (showEvidencePackage) {
  return (
    <EvidencePackage
      asset={selectedAsset}
      onBack={() => setShowEvidencePackage(false)}
    />
  );
}

if (showPhotoEvidence) {
  return (
    <PhotoEvidence
      asset={selectedAsset}
      onBack={() => setShowPhotoEvidence(false)}
    />
  );
}

if (loading) {
  return (
    <div className="asset-page">
      <h2>Loading assets...</h2>
    </div>
  );
}

    

  return (
    <div className="asset-page">

      {/* HEADER */}
      <header className="asset-header">

        <button className="back-btn" onClick={onBack}>
          ← Dashboard
        </button>

        <div>
          <h1>Asset Memory</h1>
          <p>Find previous field knowledge for an asset</p>
        </div>

      </header>

      {/* SEARCH */}
      <section className="asset-search-card">

        <label>Search Asset</label>

        <div className="asset-search">

          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="Enter Asset ID e.g. T-182"
          />

          <button onClick={handleSearch}>
            Search
          </button>

        

        </div>

      </section>

      {/* NOT FOUND */}
      {notFound && (
        <section className="asset-card">
           

          <h2>Asset Not Found</h2>

          <p>
            No asset record found for <strong>{searchInput}</strong>.
          </p>

        </section>
      )}

      {/* ASSET DATA */}
      {selectedAsset && !notFound && (
        <>
          {/* ASSET PREVIEW */}
          <section className="asset-card">

            <div className="asset-title">

              <div>
                <span className="asset-label">
                  ASSET ID
                </span>

                <h2>⚡ {selectedAsset.id}</h2>
              </div>

              <span className="status-badge">
                Active
              </span>

            </div>

            <div className="asset-info-grid">

              <div>
                <span>Asset Type</span>
                <strong>{selectedAsset.type}</strong>
              </div>

              <div>
                <span>Location</span>
                <strong>{selectedAsset.location}</strong>
              </div>

              <div>
                <span>Installed</span>
                <strong>{selectedAsset.installed}</strong>
              </div>

              <div>
                <span>Last Visit</span>
                <strong>{selectedAsset.lastVisit}</strong>
              </div>

            </div>

            <div className="observation-action">
  <button
    className="add-observation-btn"
    onClick={() => setShowObservation(true)}
  >
    📝 Add Observation
  </button>

   <button
    className="add-photo-btn"
    onClick={() => setShowPhotoEvidence(true)}
  >
    📸 Add Photo Evidence
  </button>
           <button
  className="add-evidence-btn"
  onClick={() => setShowEvidencePackage(true)}
>
  📦 Generate Evidence Package
</button>
</div>

          </section>

          {/* PREVIOUS KNOWLEDGE */}
          <section className="knowledge-section">

            <div className="section-title">

              <h2>Previous Worker Knowledge</h2>

              <span>
                {selectedAsset.workers.length} records
              </span>

            </div>

            {selectedAsset.workers.map((worker, index) => (

              <div className="knowledge-card" key={index}>

                <div className="worker-info">

                  <div className="worker-avatar">
                    {worker.name.charAt(0)}
                  </div>

                  <div>
                    <strong>{worker.name}</strong>

                    <span>
                      Field Worker · {worker.date}
                    </span>
                  </div>

                </div>

                <p>
                  {worker.observation}
                </p>

                <div className="knowledge-tags">

                  {worker.tags.map((tag, tagIndex) => (
                    <span key={tagIndex}>
                      {tag}
                    </span>
                  ))}

                </div>

               
              </div>

            ))}

          </section>

             {observations.map((item) => (
  <div className="knowledge-card" key={`new-${item.id}`}>
    <div className="worker-info">
      <div className="worker-avatar">W</div>

      <div>
        <strong>{item.worker}</strong>
        <span>
          Field Worker · {new Date(item.date).toLocaleDateString()}
        </span>
      </div>
    </div>

    <p>{item.observation}</p>

    <div className="knowledge-tags">
      <span>New Observation</span>
    </div>
  </div>
))}

          {/* PHOTOS */}
          <section className="photos-section">

            <div className="section-title">

              <h2>Recent Evidence</h2>

              <span>3 Photos</span>

            </div>

            <div className="photo-grid">

              <div className="photo-placeholder">
                📷
                <span>Transformer Photo</span>
              </div>

              <div className="photo-placeholder">
                📷
                <span>Inspection Photo</span>
              </div>

              <div className="photo-placeholder">
                📷
                <span>Connection Photo</span>
              </div>

            </div>

          </section>
        </>
      )}

    </div>
  );
}

export default AssetMemory;
