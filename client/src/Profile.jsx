import "./Profile.css";

function Profile({ language, onBack }) {
  return (
    <div className="profile-page">

      <header className="profile-header">
        <button
          className="profile-back-btn"
          onClick={onBack}
        >
          ← Dashboard
        </button>

        <div>
          <h1>My Profile</h1>
          <p>View your field worker profile</p>
        </div>
      </header>

      <main className="profile-container">

        <section className="profile-card">

          <div className="profile-avatar">
            W
          </div>

          <div className="profile-info">
            <h2>Field Worker</h2>
            <p>GridMitra Field Operations</p>
          </div>

        </section>

        <section className="profile-details-card">

          <h2>Worker Information</h2>

          <div className="profile-detail">
            <span>Worker Name</span>
            <strong>Field Worker</strong>
          </div>

          <div className="profile-detail">
            <span>Worker ID</span>
            <strong>GM-W001</strong>
          </div>

          <div className="profile-detail">
            <span>Role</span>
            <strong>Field Worker</strong>
          </div>

          <div className="profile-detail">
            <span>Assigned Zone</span>
            <strong>Jaipur Zone 4</strong>
          </div>

          <div className="profile-detail">
            <span>Language</span>
            <strong>
              {language === "hi" ? "Hindi" : "English"}
            </strong>
          </div>

        </section>

      </main>

    </div>
  );
}

export default Profile;
