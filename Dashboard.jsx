import { useState } from "react";
import "./Dashboard.css";
import AssetMemory from "./AssetMemory";
import PhotoEvidence from "./PhotoEvidence";
import FieldAssistant from "./FieldAssistant";
import EvidencePackage from "./EvidencePackage";
import MyWork from "./MyWork";
import SupervisorDashboard from "./SupervisorDashboard";
import Profile from "./Profile";
import Settings from "./Settings";

function Dashboard({ language, setLanguage, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAssetMemory, setShowAssetMemory] = useState(false);
  const [showPhotoEvidence, setShowPhotoEvidence] = useState(false);
  const [showFieldAssistant, setShowFieldAssistant] = useState(false);
  const [showEvidencePackage, setShowEvidencePackage] = useState(false);
  const [showMyWork, setShowMyWork] = useState(false);
  const [showSupervisorDashboard, setShowSupervisorDashboard] =
    useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Notification states
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const [notificationsList, setNotificationsList] = useState([
    {
      id: 1,
      title: "Evidence Package Ready",
      message:
        "Evidence package for asset T-182 is ready for review.",
      read: false,
    },
    {
      id: 2,
      title: "Review Requested",
      message:
        "Supervisor requested a review for your field report.",
      read: false,
    },
  ]);

  const testBackend = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/health"
      );

      const data = await response.json();

      alert(data.message);
    } catch (error) {
      alert("Backend connection failed");
      console.error(error);
    }
  };

  const text = {
    en: {
      dashboard: "Dashboard",
      assets: "Asset Memory",
      evidence: "Photo Evidence",
      assistant: "Field Assistant",
      reports: "Evidence Packages",
      work: "My Work",
      profile: "Profile",
      settings: "Settings",
      logout: "Logout",

      goodMorning: "Good Morning",
      worker: "Field Worker",
      overview: "Here is your field work overview.",

      todayWork: "Today's Work",
      pending: "Pending",
      completed: "Completed",
      urgent: "Urgent",

      assetMemory: "Asset Memory",
      assetMemoryDesc:
        "View previous repair and maintenance history.",

      photoEvidence: "Photo Evidence",
      photoEvidenceDesc:
        "Capture and organize field work photos.",

      fieldAssistant: "Field Assistant",
      fieldAssistantDesc:
        "Convert field observations into structured information.",

      evidencePackage: "Evidence Package",
      evidencePackageDesc:
        "Create a complete work evidence package.",

      recentWork: "Recent Work",
      asset: "Asset",
      location: "Location",
      status: "Status",
      date: "Date",

      completedStatus: "Completed",
      pendingStatus: "Pending",
      inProgress: "In Progress",
    },

    hi: {
      dashboard: "डैशबोर्ड",
      assets: "एसेट मेमोरी",
      evidence: "फोटो एविडेंस",
      assistant: "फील्ड असिस्टेंट",
      reports: "एविडेंस पैकेज",
      work: "मेरा काम",
      profile: "प्रोफाइल",
      settings: "सेटिंग्स",
      logout: "लॉगआउट",

      goodMorning: "सुप्रभात",
      worker: "फील्ड वर्कर",
      overview: "यह आपके फील्ड काम का विवरण है।",

      todayWork: "आज का काम",
      pending: "पेंडिंग",
      completed: "पूर्ण",
      urgent: "जरूरी",

      assetMemory: "एसेट मेमोरी",
      assetMemoryDesc:
        "पिछले रिपेयर और मेंटेनेंस का इतिहास देखें।",

      photoEvidence: "फोटो एविडेंस",
      photoEvidenceDesc:
        "फील्ड कार्य की फोटो लें और व्यवस्थित करें।",

      fieldAssistant: "फील्ड असिस्टेंट",
      fieldAssistantDesc:
        "फील्ड ऑब्जर्वेशन को व्यवस्थित जानकारी में बदलें।",

      evidencePackage: "एविडेंस पैकेज",
      evidencePackageDesc:
        "पूरा कार्य एविडेंस पैकेज बनाएं।",

      recentWork: "हाल का काम",
      asset: "एसेट",
      location: "स्थान",
      status: "स्थिति",
      date: "तारीख",

      completedStatus: "पूर्ण",
      pendingStatus: "पेंडिंग",
      inProgress: "काम चल रहा है",
    },

    ta: {
      dashboard: "டாஷ்போர்டு",
      assets: "சொத்து நினைவகம்",
      evidence: "புகைப்பட ஆதாரம்",
      assistant: "கள உதவியாளர்",
      reports: "ஆதார தொகுப்புகள்",
      work: "எனது வேலை",
      profile: "சுயவிவரம்",
      settings: "அமைப்புகள்",
      logout: "வெளியேறு",

      goodMorning: "காலை வணக்கம்",
      worker: "கள பணியாளர்",
      overview: "உங்கள் களப்பணி விவரம் இங்கே உள்ளது.",

      todayWork: "இன்றைய வேலை",
      pending: "நிலுவையில்",
      completed: "முடிந்தது",
      urgent: "அவசரம்",

      assetMemory: "சொத்து நினைவகம்",
      assetMemoryDesc:
        "முந்தைய பழுது மற்றும் பராமரிப்பு வரலாற்றைப் பார்க்கவும்.",

      photoEvidence: "புகைப்பட ஆதாரம்",
      photoEvidenceDesc:
        "களப்பணி புகைப்படங்களை எடுத்து ஒழுங்குபடுத்தவும்.",

      fieldAssistant: "கள உதவியாளர்",
      fieldAssistantDesc:
        "களக் குறிப்புகளை ஒழுங்கமைக்கப்பட்ட தகவலாக மாற்றவும்.",

      evidencePackage: "ஆதார தொகுப்பு",
      evidencePackageDesc:
        "முழுமையான பணி ஆதார தொகுப்பை உருவாக்கவும்.",

      recentWork: "சமீபத்திய வேலை",
      asset: "சொத்து",
      location: "இடம்",
      status: "நிலை",
      date: "தேதி",

      completedStatus: "முடிந்தது",
      pendingStatus: "நிலுவையில்",
      inProgress: "நடைபெறுகிறது",
    },

    te: {
      dashboard: "డ్యాష్‌బోర్డ్",
      assets: "ఆస్తి మెమరీ",
      evidence: "ఫోటో ఎవిడెన్స్",
      assistant: "ఫీల్డ్ అసిస్టెంట్",
      reports: "ఎవిడెన్స్ ప్యాకేజీలు",
      work: "నా పని",
      profile: "ప్రొఫైల్",
      settings: "సెట్టింగ్స్",
      logout: "లాగ్ అవుట్",

      goodMorning: "శుభోదయం",
      worker: "ఫీల్డ్ వర్కర్",
      overview: "మీ ఫీల్డ్ పని వివరాలు ఇక్కడ ఉన్నాయి.",

      todayWork: "ఈరోజు పని",
      pending: "పెండింగ్",
      completed: "పూర్తయింది",
      urgent: "అత్యవసరం",

      assetMemory: "ఆస్తి మెమరీ",
      assetMemoryDesc:
        "మునుపటి రిపేర్ మరియు మెయింటెనెన్స్ చరిత్రను చూడండి.",

      photoEvidence: "ఫోటో ఎవిడెన్స్",
      photoEvidenceDesc:
        "ఫీల్డ్ పని ఫోటోలను తీసి నిర్వహించండి.",

      fieldAssistant: "ఫీల్డ్ అసిస్టెంట్",
      fieldAssistantDesc:
        "ఫీల్డ్ పరిశీలనలను క్రమబద్ధమైన సమాచారంగా మార్చండి.",

      evidencePackage: "ఎవిడెన్స్ ప్యాకేజ్",
      evidencePackageDesc:
        "పూర్తి పని ఎవిడెన్స్ ప్యాకేజీని సృష్టించండి.",

      recentWork: "ఇటీవలి పని",
      asset: "ఆస్తి",
      location: "స్థానం",
      status: "స్థితి",
      date: "తేదీ",

      completedStatus: "పూర్తయింది",
      pendingStatus: "పెండింగ్",
      inProgress: "పని జరుగుతోంది",
    },

    mr: {
      dashboard: "डॅशबोर्ड",
      assets: "अॅसेट मेमरी",
      evidence: "फोटो एव्हिडन्स",
      assistant: "फील्ड असिस्टंट",
      reports: "एव्हिडन्स पॅकेज",
      work: "माझे काम",
      profile: "प्रोफाइल",
      settings: "सेटिंग्स",
      logout: "लॉगआउट",

      goodMorning: "शुभ सकाळ",
      worker: "फील्ड वर्कर",
      overview: "तुमच्या फील्ड कामाचा आढावा येथे आहे.",

      todayWork: "आजचे काम",
      pending: "प्रलंबित",
      completed: "पूर्ण",
      urgent: "तातडीचे",

      assetMemory: "अॅसेट मेमरी",
      assetMemoryDesc:
        "मागील दुरुस्ती आणि देखभालीचा इतिहास पहा.",

      photoEvidence: "फोटो एव्हिडन्स",
      photoEvidenceDesc:
        "फील्ड कामाचे फोटो घ्या आणि व्यवस्थित करा.",

      fieldAssistant: "फील्ड असिस्टंट",
      fieldAssistantDesc:
        "फील्ड निरीक्षणे व्यवस्थित माहितीमध्ये बदला.",

      evidencePackage: "एव्हिडन्स पॅकेज",
      evidencePackageDesc:
        "पूर्ण कामाचे एव्हिडन्स पॅकेज तयार करा.",

      recentWork: "अलीकडील काम",
      asset: "अॅसेट",
      location: "स्थान",
      status: "स्थिती",
      date: "तारीख",

      completedStatus: "पूर्ण",
      pendingStatus: "प्रलंबित",
      inProgress: "काम सुरू आहे",
    },

    bn: {
      dashboard: "ড্যাশবোর্ড",
      assets: "অ্যাসেট মেমরি",
      evidence: "ফটো এভিডেন্স",
      assistant: "ফিল্ড অ্যাসিস্ট্যান্ট",
      reports: "এভিডেন্স প্যাকেজ",
      work: "আমার কাজ",
      profile: "প্রোফাইল",
      settings: "সেটিংস",
      logout: "লগআউট",

      goodMorning: "সুপ্রভাত",
      worker: "ফিল্ড কর্মী",
      overview:
        "আপনার ফিল্ড কাজের বিবরণ এখানে রয়েছে।",

      todayWork: "আজকের কাজ",
      pending: "অমীমাংসিত",
      completed: "সম্পন্ন",
      urgent: "জরুরি",

      assetMemory: "অ্যাসেট মেমরি",
      assetMemoryDesc:
        "আগের মেরামত ও রক্ষণাবেক্ষণের ইতিহাস দেখুন।",

      photoEvidence: "ফটো এভিডেন্স",
      photoEvidenceDesc:
        "ফিল্ড কাজের ছবি তুলুন এবং সাজান।",

      fieldAssistant: "ফিল্ড অ্যাসিস্ট্যান্ট",
      fieldAssistantDesc:
        "ফিল্ড পর্যবেক্ষণকে সংগঠিত তথ্যে রূপান্তর করুন।",

      evidencePackage: "এভিডেন্স প্যাকেজ",
      evidencePackageDesc:
        "সম্পূর্ণ কাজের এভিডেন্স প্যাকেজ তৈরি করুন।",

      recentWork: "সাম্প্রতিক কাজ",
      asset: "অ্যাসেট",
      location: "অবস্থান",
      status: "অবস্থা",
      date: "তারিখ",

      completedStatus: "সম্পন্ন",
      pendingStatus: "অমীমাংসিত",
      inProgress: "চলমান",
    },
  };

  const t = text[language] || text.en;

  if (showAssetMemory) {
    return (
      <AssetMemory
        onBack={() => setShowAssetMemory(false)}
      />
    );
  }

  if (showPhotoEvidence) {
    return (
      <PhotoEvidence
        asset={{ id: "T-182" }}
        onBack={() => setShowPhotoEvidence(false)}
      />
    );
  }

  if (showFieldAssistant) {
    return (
      <FieldAssistant
        asset={{ id: "T-182" }}
        onBack={() => setShowFieldAssistant(false)}
      />
    );
  }

  if (showEvidencePackage) {
    return (
      <EvidencePackage
        asset={{
          id: "T-182",
          location: "Jaipur Zone 04",
        }}
        onBack={() => setShowEvidencePackage(false)}
      />
    );
  }

  if (showMyWork) {
    return (
      <MyWork
        onBack={() => setShowMyWork(false)}
      />
    );
  }

  if (showSupervisorDashboard) {
    return (
      <SupervisorDashboard
        onBack={() =>
          setShowSupervisorDashboard(false)
        }
      />
    );
  }

  if (showProfile) {
    return (
      <Profile
        language={language}
        onBack={() => setShowProfile(false)}
      />
    );
  }

  if (showSettings) {
    return (
      <Settings
        language={language}
        setLanguage={setLanguage}
        onBack={() => setShowSettings(false)}
      />
    );
  }

  return (
    <div className="dashboard-page">

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`dashboard-sidebar ${
          sidebarOpen ? "open" : ""
        }`}
      >

        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            ⚡
          </div>

          <div>
            <h2>GridMitra</h2>
            <span>Field Assistant</span>
          </div>
        </div>

        <nav className="sidebar-nav">

          <button className="nav-item active">
            <span>🏠</span>
            {t.dashboard}
          </button>

          <button
            className="nav-item"
            onClick={() => setShowAssetMemory(true)}
          >
            <span>🗂️</span>
            {t.assets}
          </button>

          <button
            className="nav-item"
            onClick={() => setShowPhotoEvidence(true)}
          >
            <span>📷</span>
            {t.evidence}
          </button>

          <button
            className="nav-item"
            onClick={() => setShowFieldAssistant(true)}
          >
            <span>🎙️</span>
            {t.assistant}
          </button>

          <button
            className="nav-item"
            onClick={() =>
              setShowEvidencePackage(true)
            }
          >
            <span>📦</span>
            {t.reports}
          </button>

          <button
            className="nav-item"
            onClick={() => setShowMyWork(true)}
          >
            <span>🔧</span>
            {t.work}
          </button>

          <button
            className="nav-item"
            onClick={() =>
              setShowSupervisorDashboard(true)
            }
          >
            <span>👨‍💼</span>
            Supervisor
          </button>

        </nav>

        <div className="sidebar-bottom">

          <button
            className="nav-item"
            onClick={() => setShowProfile(true)}
          >
            <span>👤</span>
            {t.profile}
          </button>

          <button
            className="nav-item"
            onClick={() => setShowSettings(true)}
          >
            <span>⚙️</span>
            {t.settings}
          </button>

          <button
            className="nav-item logout"
            onClick={onLogout}
          >
            <span>↪️</span>
            {t.logout}
          </button>

        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">

        {/* HEADER */}
        <header className="dashboard-header">

          <button onClick={testBackend}>
            Test Backend
          </button>

          <button
            className="mobile-menu"
            onClick={() =>
              setSidebarOpen(true)
            }
          >
            ☰
          </button>

          <div className="header-title">
            <h1>
              {t.goodMorning},{" "}
              <span>{t.worker}</span> 👋
            </h1>

            <p>{t.overview}</p>
          </div>

          <div className="header-actions">

            {/* NOTIFICATION BUTTON */}
            <button
              className="notification-button"
              onClick={() => {
                setShowNotifications(
                  !showNotifications
                );
                setSelectedNotification(null);
              }}
            >
              🔔
              <span className="notification-dot"></span>
            </button>

            {/* NOTIFICATION PANEL */}
            {showNotifications && (
              <div className="notification-panel">

                {!selectedNotification ? (
                  <>
                    <h3>Notifications</h3>

                    {notificationsList.map(
                      (notification) => (
                        <div
                          className={`notification-item ${
                            notification.read
                              ? "read"
                              : "unread"
                          }`}
                          key={notification.id}
                          onClick={() => {

                            // Mark notification as read
                            setNotificationsList(
                              (currentNotifications) =>
                                currentNotifications.map(
                                  (item) =>
                                    item.id ===
                                    notification.id
                                      ? {
                                          ...item,
                                          read: true,
                                        }
                                      : item
                                )
                            );

                            // Open notification detail
                            setSelectedNotification(
                              notification
                            );
                          }}
                        >
                          <strong>
                            {notification.title}
                          </strong>

                          <p>
                            {notification.message}
                          </p>
                        </div>
                      )
                    )}
                  </>
                ) : (
                  <div className="notification-detail">

                    <button
                      className="notification-back-btn"
                      onClick={() =>
                        setSelectedNotification(null)
                      }
                    >
                      ← Notifications
                    </button>

                    <h3>
                      {selectedNotification.title}
                    </h3>

                    <p>
                      {selectedNotification.message}
                    </p>

                  </div>
                )}

              </div>
            )}

            <div className="worker-avatar">
              W
            </div>

          </div>

        </header>

        {/* STAT CARDS */}
        <section className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon blue">
              🔧
            </div>

            <div>
              <span>{t.todayWork}</span>
              <strong>12</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">
              ⏳
            </div>

            <div>
              <span>{t.pending}</span>
              <strong>4</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">
              ✓
            </div>

            <div>
              <span>{t.completed}</span>
              <strong>8</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon red">
              ⚠️
            </div>

            <div>
              <span>{t.urgent}</span>
              <strong>2</strong>
            </div>
          </div>

        </section>

        {/* FEATURE CARDS */}
        <section className="section">

          <div className="section-heading">
            <h2>Field Tools</h2>
          </div>

          <div className="tools-grid">

            <button
              className="tool-card"
              onClick={() =>
                setShowAssetMemory(true)
              }
            >
              <div className="tool-icon">
                🗂️
              </div>

              <h3>{t.assetMemory}</h3>

              <p>{t.assetMemoryDesc}</p>

              <span className="tool-arrow">
                →
              </span>
            </button>

            <button
              className="tool-card"
              onClick={() =>
                setShowPhotoEvidence(true)
              }
            >
              <div className="tool-icon">
                📷
              </div>

              <h3>{t.photoEvidence}</h3>

              <p>{t.photoEvidenceDesc}</p>

              <span className="tool-arrow">
                →
              </span>
            </button>

            <button
              className="tool-card"
              onClick={() =>
                setShowFieldAssistant(true)
              }
            >
              <div className="tool-icon">
                🎙️
              </div>

              <h3>{t.fieldAssistant}</h3>

              <p>{t.fieldAssistantDesc}</p>

              <span className="tool-arrow">
                →
              </span>
            </button>

            <button
              className="tool-card"
              onClick={() =>
                setShowEvidencePackage(true)
              }
            >
              <div className="tool-icon">
                📦
              </div>

              <h3>{t.evidencePackage}</h3>

              <p>{t.evidencePackageDesc}</p>

              <span className="tool-arrow">
                →
              </span>
            </button>

          </div>

        </section>

        {/* RECENT WORK */}
        <section className="section recent-section">

          <div className="section-heading">

            <h2>{t.recentWork}</h2>

            <button className="view-all">
              View all →
            </button>

          </div>

          <div className="work-table">

            <div className="table-header">
              <span>{t.asset}</span>
              <span>{t.location}</span>
              <span>{t.status}</span>
              <span>{t.date}</span>
            </div>

            <div className="work-row">
              <strong>T-182</strong>

              <span>
                Jaipur Zone 04
              </span>

              <span className="status completed">
                ✓ {t.completedStatus}
              </span>

              <span>
                17 Sep 2026
              </span>
            </div>

            <div className="work-row">
              <strong>P-047</strong>

              <span>
                Sector 12
              </span>

              <span className="status pending">
                ⏳ {t.pendingStatus}
              </span>

              <span>
                17 Sep 2026
              </span>
            </div>

            <div className="work-row">
              <strong>T-205</strong>

              <span>
                Zone 07
              </span>

              <span className="status progress">
                🔄 {t.inProgress}
              </span>

              <span>
                16 Sep 2026
              </span>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;