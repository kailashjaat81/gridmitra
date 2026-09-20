import "./Home.css";

function Home({ onGetStarted }) {
  return (
    <div className="home-page">

      {/* NAVBAR */}
      <nav className="home-navbar">
        <div className="home-logo">
          ⚡ <span>Grid<span>Mitra</span></span>
        </div>

        <div className="home-nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#about">About</a>
        </div>

        <div className="home-nav-buttons">
          <button
            className="login-btn"
            onClick={onGetStarted}
          >
            Login
          </button>

          <button
            className="register-btn"
            onClick={onGetStarted}
          >
            Register
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero-section" id="home">

        <div className="hero-content">

          <div className="hero-badge">
            ✨Field Assistant
          </div>

          <h1>
            Smarter Field Work.
            <br />
            <span>Stronger Grid.</span>
          </h1>

          <h2>
            Field Knowledge & Evidence Assistant
            for Electricity Field Workers
          </h2>

          <p>
            GridMitra helps field workers find previous asset
            history, record observations, organize photo evidence,
            and create structured work reports.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={onGetStarted}
            >
              Get Started →
            </button>

            <button className="secondary-btn">
              ▶ Watch Demo
            </button>
          </div>

        </div>

        <div className="hero-visual">

          <div className="visual-card"onClick={onGetStarted}>
            <div className="visual-icon">🗂️</div>
            <div>
              <strong>Previous History</strong>
              <p>Past repairs & observations</p>
            </div>
          </div>

          <div className="visual-card"onClick={onGetStarted}>
            <div className="visual-icon">📸</div>
            <div>
              <strong>Photo Evidence</strong>
              <p>Photos linked to asset</p>
            </div>
          </div>

          <div className="visual-card"onClick={onGetStarted}>
            <div className="visual-icon">🎙️</div>
            <div>
              <strong>Field Notes</strong>
              <p>Hindi / Hinglish / Local language</p>
            </div>
          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="features-section" id="features">

        <div className="section-heading">
          <span>WHAT GRIDMITRA DOES</span>
          <h2>Everything a Field Worker Needs</h2>
          <p>
            Keep asset knowledge, field observations and evidence
            together in one place.
          </p>
        </div>

        <div className="feature-grid">

          <div className="feature-card" onClick={onGetStarted}>
            <div className="feature-icon">🗂️</div>
            <h3>Remember the Asset</h3>
            <p>
              Find previous repairs, visits and worker knowledge
              for the same asset.
            </p>
          </div>

          <div className="feature-card" onClick={onGetStarted}>
            <div className="feature-icon">📸</div>
            <h3>Organize Evidence</h3>
            <p>
              Capture and manage field photos linked directly
              to the asset.
            </p>
          </div>

          <div className="feature-card" onClick={onGetStarted}>
            <div className="feature-icon">🎙️</div>
            <h3>Speak Your Observation</h3>
            <p>
              Record observations using Hindi, Hinglish or
              local languages.
            </p>
          </div>

          <div className="feature-card" onClick={onGetStarted}>
            <div className="feature-icon">📄</div>
            <h3>Create Work Evidence</h3>
            <p>
              Combine observations, photos and history into
              a structured report.
            </p>
          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how-it-works">

        <div className="section-heading">
          <span>HOW IT WORKS</span>
          <h2>From Field Visit to Structured Evidence</h2>
        </div>

        <div className="steps-grid">

          <div className="step"onClick={onGetStarted}>
            <div className="step-number">1</div>
            <h3>Find Asset</h3>
            <p>Search by Asset ID or scan QR code.</p>
          </div>

          <div className="step"onClick={onGetStarted}>
            <div className="step-number">2</div>
            <h3>Check History</h3>
            <p>View previous worker knowledge and reports.</p>
          </div>

          <div className="step"onClick={onGetStarted}>
            <div className="step-number">3</div>
            <h3>Record Evidence</h3>
            <p>Add observations, voice notes and photos.</p>
          </div>

          <div className="step"onClick={onGetStarted}>
            <div className="step-number">4</div>
            <h3>AI Structures Data</h3>
            <p>AI organizes field information into useful records.</p>
          </div>

          <div className="step"onClick={onGetStarted}>
            <div className="step-number">5</div>
            <h3>Create Report</h3>
            <p>Generate a complete evidence package.</p>
          </div>

        </div>

      </section>

      {/* ABOUT */}
      <section className="about-section" id="about">

        <div>
          <span>WHY GRIDMITRA?</span>

          <h2>
            Field knowledge should stay
            with the asset.
          </h2>

          <p>
            When a worker changes location or another worker
            visits the same asset, important field knowledge
            should not disappear with the previous worker.
          </p>

          <button
            className="primary-btn"
            onClick={onGetStarted}
          >
            Start Using GridMitra →
          </button>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="home-footer">

        <div className="home-logo">
          ⚡ <span>Grid<span>Mitra</span></span>
        </div>

        <p>
          Smarter Field Work. Stronger Grid.
        </p>

        <p className="copyright">
          © 2026 GridMitra
        </p>

      </footer>

    </div>
  );
}

export default Home;
