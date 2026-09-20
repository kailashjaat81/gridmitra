import { useState } from "react";
import "./Settings.css";

function Settings({ language, setLanguage, onBack }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const translations = {
    en: {
      settings: "Settings",
      subtitle: "Manage your GridMitra preferences",
      preferences: "Preferences",
      language: "Language",
      languageDesc: "Choose your preferred app language",
      notifications: "Notifications",
      notificationsDesc: "Receive updates about field work",
      darkMode: "Dark Mode",
      darkModeDesc: "Use a darker interface",
      account: "Account",
      accountStatus: "Account Status",
      active: "Active",
      role: "Role",
      fieldWorker: "Field Worker",
      back: "← Dashboard",
    },

    hi: {
      settings: "सेटिंग्स",
      subtitle: "अपनी GridMitra प्राथमिकताएं प्रबंधित करें",
      preferences: "प्राथमिकताएं",
      language: "भाषा",
      languageDesc: "अपनी पसंदीदा ऐप भाषा चुनें",
      notifications: "नोटिफिकेशन",
      notificationsDesc: "फील्ड कार्य के अपडेट प्राप्त करें",
      darkMode: "डार्क मोड",
      darkModeDesc: "गहरे इंटरफेस का उपयोग करें",
      account: "अकाउंट",
      accountStatus: "अकाउंट स्थिति",
      active: "सक्रिय",
      role: "भूमिका",
      fieldWorker: "फील्ड वर्कर",
      back: "← डैशबोर्ड",
    },

    ta: {
      settings: "அமைப்புகள்",
      subtitle: "GridMitra விருப்பங்களை நிர்வகிக்கவும்",
      preferences: "விருப்பங்கள்",
      language: "மொழி",
      languageDesc: "உங்கள் விருப்பமான பயன்பாட்டு மொழியைத் தேர்ந்தெடுக்கவும்",
      notifications: "அறிவிப்புகள்",
      notificationsDesc: "களப்பணி புதுப்பிப்புகளைப் பெறவும்",
      darkMode: "இருண்ட பயன்முறை",
      darkModeDesc: "இருண்ட இடைமுகத்தைப் பயன்படுத்தவும்",
      account: "கணக்கு",
      accountStatus: "கணக்கு நிலை",
      active: "செயலில்",
      role: "பங்கு",
      fieldWorker: "கள பணியாளர்",
      back: "← டாஷ்போர்டு",
    },

    te: {
      settings: "సెట్టింగ్స్",
      subtitle: "మీ GridMitra ప్రాధాన్యతలను నిర్వహించండి",
      preferences: "ప్రాధాన్యతలు",
      language: "భాష",
      languageDesc: "మీకు ఇష్టమైన యాప్ భాషను ఎంచుకోండి",
      notifications: "నోటిఫికేషన్లు",
      notificationsDesc: "ఫీల్డ్ పని నవీకరణలను పొందండి",
      darkMode: "డార్క్ మోడ్",
      darkModeDesc: "డార్క్ ఇంటర్‌ఫేస్ ఉపయోగించండి",
      account: "ఖాతా",
      accountStatus: "ఖాతా స్థితి",
      active: "యాక్టివ్",
      role: "పాత్ర",
      fieldWorker: "ఫీల్డ్ వర్కర్",
      back: "← డ్యాష్‌బోర్డ్",
    },

    mr: {
      settings: "सेटिंग्स",
      subtitle: "तुमच्या GridMitra प्राधान्यांचे व्यवस्थापन करा",
      preferences: "प्राधान्ये",
      language: "भाषा",
      languageDesc: "तुमची पसंतीची अॅप भाषा निवडा",
      notifications: "सूचना",
      notificationsDesc: "फील्ड कामाचे अपडेट मिळवा",
      darkMode: "डार्क मोड",
      darkModeDesc: "गडद इंटरफेस वापरा",
      account: "खाते",
      accountStatus: "खात्याची स्थिती",
      active: "सक्रिय",
      role: "भूमिका",
      fieldWorker: "फील्ड वर्कर",
      back: "← डॅशबोर्ड",
    },

    bn: {
      settings: "সেটিংস",
      subtitle: "আপনার GridMitra পছন্দগুলি পরিচালনা করুন",
      preferences: "পছন্দসমূহ",
      language: "ভাষা",
      languageDesc: "আপনার পছন্দের অ্যাপ ভাষা নির্বাচন করুন",
      notifications: "বিজ্ঞপ্তি",
      notificationsDesc: "ফিল্ড কাজের আপডেট পান",
      darkMode: "ডার্ক মোড",
      darkModeDesc: "গাঢ় ইন্টারফেস ব্যবহার করুন",
      account: "অ্যাকাউন্ট",
      accountStatus: "অ্যাকাউন্টের অবস্থা",
      active: "সক্রিয়",
      role: "ভূমিকা",
      fieldWorker: "ফিল্ড কর্মী",
      back: "← ড্যাশবোর্ড",
    },

    gu: {
      settings: "સેટિંગ્સ",
      subtitle: "તમારી GridMitra પસંદગીઓ મેનેજ કરો",
      preferences: "પસંદગીઓ",
      language: "ભાષા",
      languageDesc: "તમારી પસંદગીની એપ ભાષા પસંદ કરો",
      notifications: "નોટિફિકેશન્સ",
      notificationsDesc: "ફીલ્ડ કામના અપડેટ્સ મેળવો",
      darkMode: "ડાર્ક મોડ",
      darkModeDesc: "ડાર્ક ઇન્ટરફેસનો ઉપયોગ કરો",
      account: "એકાઉન્ટ",
      accountStatus: "એકાઉન્ટ સ્થિતિ",
      active: "સક્રિય",
      role: "ભૂમિકા",
      fieldWorker: "ફીલ્ડ વર્કર",
      back: "← ડેશબોર્ડ",
    },

    kn: {
      settings: "ಸೆಟ್ಟಿಂಗ್ಸ್",
      subtitle: "ನಿಮ್ಮ GridMitra ಆದ್ಯತೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
      preferences: "ಆದ್ಯತೆಗಳು",
      language: "ಭಾಷೆ",
      languageDesc: "ನಿಮ್ಮ ಮೆಚ್ಚಿನ ಆಪ್ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      notifications: "ಅಧಿಸೂಚನೆಗಳು",
      notificationsDesc: "ಫೀಲ್ಡ್ ಕೆಲಸದ ಅಪ್‌ಡೇಟ್‌ಗಳನ್ನು ಪಡೆಯಿರಿ",
      darkMode: "ಡಾರ್ಕ್ ಮೋಡ್",
      darkModeDesc: "ಡಾರ್ಕ್ ಇಂಟರ್ಫೇಸ್ ಬಳಸಿ",
      account: "ಖಾತೆ",
      accountStatus: "ಖಾತೆಯ ಸ್ಥಿತಿ",
      active: "ಸಕ್ರಿಯ",
      role: "ಪಾತ್ರ",
      fieldWorker: "ಫೀಲ್ಡ್ ವರ್ಕರ್",
      back: "← ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    },

    ml: {
      settings: "ക്രമീകരണങ്ങൾ",
      subtitle: "നിങ്ങളുടെ GridMitra മുൻഗണനകൾ നിയന്ത്രിക്കുക",
      preferences: "മുൻഗണനകൾ",
      language: "ഭാഷ",
      languageDesc: "നിങ്ങളുടെ ഇഷ്ടപ്പെട്ട ആപ്പ് ഭാഷ തിരഞ്ഞെടുക്കുക",
      notifications: "അറിയിപ്പുകൾ",
      notificationsDesc: "ഫീൽഡ് ജോലിയുടെ അപ്‌ഡേറ്റുകൾ നേടുക",
      darkMode: "ഡാർക്ക് മോഡ്",
      darkModeDesc: "ഡാർക്ക് ഇന്റർഫേസ് ഉപയോഗിക്കുക",
      account: "അക്കൗണ്ട്",
      accountStatus: "അക്കൗണ്ട് നില",
      active: "സജീവം",
      role: "പങ്ക്",
      fieldWorker: "ഫീൽഡ് വർക്കർ",
      back: "← ഡാഷ്ബോർഡ്",
    },

    pa: {
      settings: "ਸੈਟਿੰਗਾਂ",
      subtitle: "ਆਪਣੀਆਂ GridMitra ਪਸੰਦਾਂ ਨੂੰ ਮੈਨੇਜ ਕਰੋ",
      preferences: "ਪਸੰਦਾਂ",
      language: "ਭਾਸ਼ਾ",
      languageDesc: "ਆਪਣੀ ਪਸੰਦ ਦੀ ਐਪ ਭਾਸ਼ਾ ਚੁਣੋ",
      notifications: "ਸੂਚਨਾਵਾਂ",
      notificationsDesc: "ਫੀਲਡ ਕੰਮ ਦੇ ਅਪਡੇਟ ਪ੍ਰਾਪਤ ਕਰੋ",
      darkMode: "ਡਾਰਕ ਮੋਡ",
      darkModeDesc: "ਡਾਰਕ ਇੰਟਰਫੇਸ ਵਰਤੋ",
      account: "ਖਾਤਾ",
      accountStatus: "ਖਾਤੇ ਦੀ ਸਥਿਤੀ",
      active: "ਸਰਗਰਮ",
      role: "ਭੂਮਿਕਾ",
      fieldWorker: "ਫੀਲਡ ਵਰਕਰ",
      back: "← ਡੈਸ਼ਬੋਰਡ",
    },

    or: {
      settings: "ସେଟିଂସ୍",
      subtitle: "ଆପଣଙ୍କ GridMitra ପସନ୍ଦଗୁଡ଼ିକ ପରିଚାଳନା କରନ୍ତୁ",
      preferences: "ପସନ୍ଦଗୁଡ଼ିକ",
      language: "ଭାଷା",
      languageDesc: "ଆପଣଙ୍କ ପସନ୍ଦର ଆପ୍ ଭାଷା ବାଛନ୍ତୁ",
      notifications: "ବିଜ୍ଞପ୍ତି",
      notificationsDesc: "ଫିଲ୍ଡ କାମର ଅପଡେଟ୍ ପାଆନ୍ତୁ",
      darkMode: "ଡାର୍କ ମୋଡ୍",
      darkModeDesc: "ଡାର୍କ ଇଣ୍ଟରଫେସ୍ ବ୍ୟବହାର କରନ୍ତୁ",
      account: "ଆକାଉଣ୍ଟ",
      accountStatus: "ଆକାଉଣ୍ଟ ସ୍ଥିତି",
      active: "ସକ୍ରିୟ",
      role: "ଭୂମିକା",
      fieldWorker: "ଫିଲ୍ଡ କର୍ମଚାରୀ",
      back: "← ଡ୍ୟାଶବୋର୍ଡ",
    },

    as: {
      settings: "ছেটিংছ",
      subtitle: "আপোনাৰ GridMitra পছন্দসমূহ পৰিচালনা কৰক",
      preferences: "পছন্দসমূহ",
      language: "ভাষা",
      languageDesc: "আপোনাৰ পছন্দৰ এপ ভাষা বাছনি কৰক",
      notifications: "জাননী",
      notificationsDesc: "ফিল্ড কামৰ আপডেট লাভ কৰক",
      darkMode: "ডাৰ্ক মোড",
      darkModeDesc: "ডাৰ্ক ইণ্টাৰফেচ ব্যৱহাৰ কৰক",
      account: "একাউণ্ট",
      accountStatus: "একাউণ্টৰ অৱস্থা",
      active: "সক্ৰিয়",
      role: "ভূমিকা",
      fieldWorker: "ফিল্ড কৰ্মী",
      back: "← ড্যাশব’ৰ্ড",
    },
  };

  const t = translations[language] || translations.en;

  return (
    <div className={`settings-page ${darkMode ? "dark" : ""}`}>

      <header className="settings-header">

        <button
          className="settings-back-btn"
          onClick={onBack}
        >
          {t.back}
        </button>

        <div>
          <h1>{t.settings}</h1>
          <p>{t.subtitle}</p>
        </div>

      </header>

      <main className="settings-container">

        <section className="settings-card">

          <h2>{t.preferences}</h2>

          <div className="setting-row">

            <div>
              <strong>{t.language}</strong>
              <p>{t.languageDesc}</p>
            </div>

           <select
  value={language}
  onChange={(e) => {
  const value = e.target.value;
  setLanguage(value);
  alert("Language changed to: " + value);
}}>
  <option value="en">English</option>
  <option value="hi">Hindi</option>
  <option value="ta">Tamil</option>
  <option value="te">Telugu</option>
  <option value="mr">Marathi</option>
  <option value="bn">Bengali</option>
  <option value="gu">Gujarati</option>
  <option value="kn">Kannada</option>
  <option value="ml">Malayalam</option>
  <option value="pa">Punjabi</option>
  <option value="or">Odia</option>
  <option value="as">Assamese</option>
</select>

          </div>

          <div className="setting-row">

            <div>
              <strong>{t.notifications}</strong>
              <p>{t.notificationsDesc}</p>
            </div>

            <button
              className={`toggle ${notifications ? "active" : ""}`}
              onClick={() => setNotifications(!notifications)}
            >
              <span></span>
            </button>

          </div>

          <div className="setting-row">

            <div>
              <strong>{t.darkMode}</strong>
              <p>{t.darkModeDesc}</p>
            </div>

            <button
              className={`toggle ${darkMode ? "active" : ""}`}
              onClick={() => setDarkMode(!darkMode)}
            >
              <span></span>
            </button>

          </div>

        </section>

        <section className="settings-card">

          <h2>{t.account}</h2>

          <div className="account-row">
            <span>{t.accountStatus}</span>
            <strong>{t.active}</strong>
          </div>

          <div className="account-row">
            <span>{t.role}</span>
            <strong>{t.fieldWorker}</strong>
          </div>

        </section>

      </main>

    </div>
  );
}

export default Settings;