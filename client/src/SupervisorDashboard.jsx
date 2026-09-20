import { useEffect, useState } from "react";
import "./SupervisorDashboard.css";

        function SupervisorDashboard({ onBack }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/evidence-packages")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setReports(data.packages);
        }
      })
      .catch((error) => {
        console.error("Failed to load reports:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

                 if (selectedReport) {
  return (
    <div className="supervisor-page">

      <header className="supervisor-header">
        <button
          className="supervisor-back-btn"
          onClick={() => setSelectedReport(null)}
        >
          ← Reports
        </button>

        <div>
          <h1>Field Report</h1>
          <p>Review submitted evidence</p>
        </div>
      </header>

      <main className="supervisor-container">

        <section className="reports-card">

          <div className="report-top">
            <div>
              <span className="report-label">ASSET</span>
              <h3>⚡ {selectedReport.assetId}</h3>
            </div>

            <span className="report-status">
              {selectedReport.status}
            </span>
          </div>

          <div className="report-details">
            <p>
              <strong>Worker:</strong> {selectedReport.worker}
            </p>

            <p>
              <strong>Location:</strong> {selectedReport.location}
            </p>

            <p>
              <strong>Date:</strong> {selectedReport.date}
            </p>
          </div>

          <div className="report-observation">
            <span>Observation</span>
            <p>{selectedReport.observation}</p>
          </div>

          {selectedReport.image && (
            <div className="report-evidence">
              <span>Photo Evidence</span>

              <img
                src={selectedReport.image}
                alt="Field evidence"
              />
            </div>
          )}

        </section>

      </main>

    </div>
  );
}       
             const handleApprove = async (reportId) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/evidence-packages/${reportId}/approve`,
      {
        method: "POST"
      }
    );

    const data = await response.json();

    if (data.success) {
      setReports((currentReports) =>
        currentReports.map((report) =>
          report.id === reportId
            ? { ...report, status: "Approved" }
            : report
        )
      );
    } else {
      alert(data.message || "Unable to approve report.");
    }
  } catch (error) {
    console.error("Approve error:", error);
    alert("Unable to connect to backend.");
  }
};

           const handleRequestReview = async (reportId) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/evidence-packages/${reportId}/review`,
      {
        method: "POST"
      }
    );

    const data = await response.json();

    if (data.success) {
      setReports((currentReports) =>
        currentReports.map((report) =>
          report.id === reportId
            ? { ...report, status: "Review Requested" }
            : report
        )
      );
    } else {
      alert(data.message || "Unable to request review.");
    }
  } catch (error) {
    console.error("Request review error:", error);
    alert("Unable to connect to backend.");
  }
};

  return (
    <div className="supervisor-page">

      <header className="supervisor-header">
        <button
          className="supervisor-back-btn"
          onClick={onBack}
        >
          ← Dashboard
        </button>

        <div>
          <h1>Supervisor Dashboard</h1>
          <p>Review field work and submitted evidence</p>
        </div>
      </header>

      <main className="supervisor-container">

        <section className="supervisor-stats">

          <div className="supervisor-stat-card">
            <span>Total Reports</span>
            <strong>12</strong>
          </div>

          <div className="supervisor-stat-card">
            <span>Pending Review</span>
            <strong>4</strong>
          </div>

          <div className="supervisor-stat-card">
            <span>Completed</span>
            <strong>8</strong>
          </div>

          <div className="supervisor-stat-card">
            <span>Needs Inspection</span>
            <strong>2</strong>
          </div>

        </section>

        <section className="reports-card">

          <div className="reports-heading">
            <div>
              <h2>Recent Field Reports</h2>
              <p>Review submitted worker observations</p>
            </div>
          </div>

          <div className="reports-list">

            {reports.map((report) => (
              <article
                className="report-item"
                key={report.asset}
              >

                <div className="report-top">

                  <div>
                    <span className="report-label">
                      ASSET
                    </span>

                   <h3>⚡ {report.assetId}</h3>
                  </div>

                  <span className="report-status">
                    {report.status}
                  </span>

                </div>

                <div className="report-details">

                  <p>
                    <strong>Worker:</strong>{" "}
                    {report.worker}
                  </p>

                  <p>
                    <strong>Location:</strong>{" "}
                    {report.location}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {report.date}
                  </p>

                </div>

                <div className="report-observation">

                  <span>Observation</span>

                  <p>
                    {report.observation}
                  </p>

                </div>

                <div className="report-actions">

                  <button className="view-report-btn"
                  onClick={() => setSelectedReport(report)}>
                    View Report
                  </button>

                  <button className="approve-btn"
                     onClick={() => {
    console.log("APPROVE CLICKED:", report.id);
    handleApprove(report.id);
  }}
                  >
                    Approve
                  </button>

                  <button className="review-btn"
                   onClick={() => handleRequestReview(report.id)}>
                    Request Review
                  </button>

                </div>

              </article>
            ))}

          </div>

        </section>

      </main>

    </div>
  );
}

export default SupervisorDashboard;
