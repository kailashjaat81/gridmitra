import { useEffect, useState } from "react";
import "./MyWork.css";

function MyWork({ onBack }) {
  const [workHistory, setWorkHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedWork, setSelectedWork] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/api/evidence-packages")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setWorkHistory(data.packages);
        }
      })
      .catch((error) => {
        console.error("Failed to load work history:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

            const handleViewEvidence = async (work) => {
  setSelectedWork(work);
  setLoadingPhotos(true);
  setPhotos([]);

  if (work.image) {
    setPhotos([
      {
        id: work.id,
        image: work.image,
        fileName: "Evidence Package Photo",
        description: "Photo attached to evidence package"
      }
    ]);

    setLoadingPhotos(false);
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:4000/api/photos/${work.assetId}`
    );

    const data = await response.json();

    if (data.success) {
      setPhotos(data.photos);
    }
  } catch (error) {
    console.error("Failed to load evidence photos:", error);
  } finally {
    setLoadingPhotos(false);
  }
};
  const totalVisits = workHistory.length;

  const completed = workHistory.filter(
    (work) => work.status === "Completed"
  ).length;

  const pending = workHistory.filter(
    (work) => work.status !== "Completed"
  ).length;

  return (
    <div className="my-work-page">
      <header className="my-work-header">
        <button className="my-work-back-btn" onClick={onBack}>
          ← Back
        </button>

        <div>
          <h1>My Work</h1>
          <p>View your previous field visits and evidence</p>
        </div>
      </header>

      <main className="my-work-container">
        <section className="work-summary">
          <div className="work-summary-card">
            <span>Total Visits</span>
            <strong>{totalVisits}</strong>
          </div>

          <div className="work-summary-card">
            <span>Completed</span>
            <strong>{completed}</strong>
          </div>

          <div className="work-summary-card">
            <span>Pending</span>
            <strong>{pending}</strong>
          </div>
        </section>

        <section className="work-history-card">
          <div className="history-heading">
            <h2>Field Visit History</h2>
            <span>Recent activity</span>
          </div>

          <div className="history-list">
            {loading ? (
              <p>Loading your work...</p>
            ) : workHistory.length === 0 ? (
              <p>No field work recorded yet.</p>
            ) : (
              workHistory.map((work) => (
                <article
                  className="history-item"
                  key={work.id}
                >
                  <div className="history-top">
                    <div>
                      <span className="asset-label">ASSET</span>
                      <h3>⚡ {work.assetId}</h3>
                    </div>

                    <span className="work-status">
                      {work.status}
                    </span>
                  </div>

                  <div className="history-details">
                    <p>
                      <strong>Type:</strong> Field Asset
                    </p>

                    <p>
                      <strong>Location:</strong> Field Site
                    </p>

                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(work.date).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="history-observation">
                    <span>Observation</span>
                    <p>{work.observation}</p>
                  </div>

                  <button
                    className="view-work-btn"
                    onClick={() => handleViewEvidence(work)}
                  >
                    View Evidence
                  </button>
                </article>
              ))
            )}
          </div>
        </section>

        {selectedWork && (
          <section className="evidence-view-card">
            <div className="history-heading">
              <h2>Evidence</h2>

              <button
                className="view-work-btn"
                onClick={() => setSelectedWork(null)}
              >
                Close
              </button>
            </div>

            <p>
              <strong>Asset:</strong> {selectedWork.assetId}
            </p>

            <p>
              <strong>Observation:</strong>{" "}
              {selectedWork.observation}
            </p>

            {loadingPhotos ? (
              <p>Loading evidence photo...</p>
            ) : photos.length === 0 ? (
              <p>No saved photo found for this asset.</p>
            ) : (
              <div className="evidence-photo-list">
                {photos.map((photo) => (
                  <div key={photo.id} className="evidence-photo-item">
                    <img
                      src={photo.image}
                      alt={photo.description || "Field evidence"}
                    />

                    {photo.description && (
                      <p>{photo.description}</p>
                    )}

                    <small>{photo.fileName}</small>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default MyWork;