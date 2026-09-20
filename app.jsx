import { useState,useEffect} from "react";
import "./App.css";
import Dashboard from "./Dashboard";
import Home from "./Home";

const translations = {
  en: {
    appName: "GridMitra",
    tagline: "AI Field Knowledge & Evidence Assistant",
    login: "Login",
    register: "Register",
    workerLogin: "Worker Login",
    createAccount: "Create Worker Account",
    name: "Full Name",
    mobile: "Mobile Number",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    employeeId: "Employee ID",
    department: "Department",
    selectDepartment: "Select Department",
    electrical: "Electrical",
    maintenance: "Maintenance",
    fieldOperations: "Field Operations",
    loginButton: "Login",
    registerButton: "Create Account",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    registerNow: "Register Now",
    loginNow: "Login Now",
    language: "Language",
    remember: "Remember me",
    forgot: "Forgot Password?",
    secure: "Secure Field Access",
  },

  hi: {
    appName: "GridMitra",
    tagline: "AI फील्ड नॉलेज और एविडेंस असिस्टेंट",
    login: "लॉगिन",
    register: "रजिस्टर",
    workerLogin: "वर्कर लॉगिन",
    createAccount: "वर्कर अकाउंट बनाएं",
    name: "पूरा नाम",
    mobile: "मोबाइल नंबर",
    email: "ईमेल",
    password: "पासवर्ड",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    employeeId: "कर्मचारी आईडी",
    department: "विभाग",
    selectDepartment: "विभाग चुनें",
    electrical: "इलेक्ट्रिकल",
    maintenance: "मेंटेनेंस",
    fieldOperations: "फील्ड ऑपरेशंस",
    loginButton: "लॉगिन करें",
    registerButton: "अकाउंट बनाएं",
    noAccount: "अकाउंट नहीं है?",
    haveAccount: "पहले से अकाउंट है?",
    registerNow: "अभी रजिस्टर करें",
    loginNow: "अभी लॉगिन करें",
    language: "भाषा",
    remember: "मुझे याद रखें",
    forgot: "पासवर्ड भूल गए?",
    secure: "सुरक्षित फील्ड एक्सेस",
  },

  ta: {
    appName: "GridMitra",
    tagline: "AI கள அறிவு மற்றும் ஆதார உதவியாளர்",
    login: "உள்நுழைவு",
    register: "பதிவு",
    workerLogin: "பணியாளர் உள்நுழைவு",
    createAccount: "பணியாளர் கணக்கை உருவாக்கவும்",
    name: "முழு பெயர்",
    mobile: "மொபைல் எண்",
    email: "மின்னஞ்சல்",
    password: "கடவுச்சொல்",
    confirmPassword: "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
    employeeId: "பணியாளர் ID",
    department: "துறை",
    selectDepartment: "துறையைத் தேர்ந்தெடுக்கவும்",
    electrical: "மின்சாரம்",
    maintenance: "பராமரிப்பு",
    fieldOperations: "கள செயல்பாடுகள்",
    loginButton: "உள்நுழைக",
    registerButton: "கணக்கை உருவாக்கவும்",
    noAccount: "கணக்கு இல்லையா?",
    haveAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
    registerNow: "இப்போது பதிவு செய்யவும்",
    loginNow: "இப்போது உள்நுழைக",
    language: "மொழி",
    remember: "என்னை நினைவில் வைத்துக்கொள்ளவும்",
    forgot: "கடவுச்சொல் மறந்துவிட்டதா?",
    secure: "பாதுகாப்பான கள அணுகல்",
  },

  te: {
    appName: "GridMitra",
    tagline: "AI ఫీల్డ్ నాలెడ్జ్ & ఎవిడెన్స్ అసిస్టెంట్",
    login: "లాగిన్",
    register: "రిజిస్టర్",
    workerLogin: "వర్కర్ లాగిన్",
    createAccount: "వర్కర్ ఖాతాను సృష్టించండి",
    name: "పూర్తి పేరు",
    mobile: "మొబైల్ నంబర్",
    email: "ఇమెయిల్",
    password: "పాస్‌వర్డ్",
    confirmPassword: "పాస్‌వర్డ్ నిర్ధారించండి",
    employeeId: "ఉద్యోగి ID",
    department: "విభాగం",
    selectDepartment: "విభాగాన్ని ఎంచుకోండి",
    electrical: "ఎలక్ట్రికల్",
    maintenance: "మెయింటెనెన్స్",
    fieldOperations: "ఫీల్డ్ ఆపరేషన్స్",
    loginButton: "లాగిన్ చేయండి",
    registerButton: "ఖాతా సృష్టించండి",
    noAccount: "ఖాతా లేదా?",
    haveAccount: "ఇప్పటికే ఖాతా ఉందా?",
    registerNow: "ఇప్పుడే రిజిస్టర్ చేయండి",
    loginNow: "ఇప్పుడే లాగిన్ చేయండి",
    language: "భాష",
    remember: "నన్ను గుర్తుంచుకోండి",
    forgot: "పాస్‌వర్డ్ మర్చిపోయారా?",
    secure: "సురక్షిత ఫీల్డ్ యాక్సెస్",
  },

  mr: {
    appName: "GridMitra",
    tagline: "AI फील्ड नॉलेज आणि एव्हिडन्स असिस्टंट",
    login: "लॉगिन",
    register: "नोंदणी",
    workerLogin: "वर्कर लॉगिन",
    createAccount: "वर्कर खाते तयार करा",
    name: "पूर्ण नाव",
    mobile: "मोबाइल नंबर",
    email: "ईमेल",
    password: "पासवर्ड",
    confirmPassword: "पासवर्डची पुष्टी करा",
    employeeId: "कर्मचारी ID",
    department: "विभाग",
    selectDepartment: "विभाग निवडा",
    electrical: "इलेक्ट्रिकल",
    maintenance: "देखभाल",
    fieldOperations: "फील्ड ऑपरेशन्स",
    loginButton: "लॉगिन करा",
    registerButton: "खाते तयार करा",
    noAccount: "खाते नाही?",
    haveAccount: "आधीपासून खाते आहे?",
    registerNow: "आता नोंदणी करा",
    loginNow: "आता लॉगिन करा",
    language: "भाषा",
    remember: "मला लक्षात ठेवा",
    forgot: "पासवर्ड विसरलात?",
    secure: "सुरक्षित फील्ड प्रवेश",
  },

  bn: {
    appName: "GridMitra",
    tagline: "AI ফিল্ড নলেজ ও এভিডেন্স অ্যাসিস্ট্যান্ট",
    login: "লগইন",
    register: "রেজিস্টার",
    workerLogin: "কর্মী লগইন",
    createAccount: "কর্মী অ্যাকাউন্ট তৈরি করুন",
    name: "পুরো নাম",
    mobile: "মোবাইল নম্বর",
    email: "ইমেইল",
    password: "পাসওয়ার্ড",
    confirmPassword: "পাসওয়ার্ড নিশ্চিত করুন",
    employeeId: "কর্মী ID",
    department: "বিভাগ",
    selectDepartment: "বিভাগ নির্বাচন করুন",
    electrical: "ইলেকট্রিক্যাল",
    maintenance: "রক্ষণাবেক্ষণ",
    fieldOperations: "ফিল্ড অপারেশন",
    loginButton: "লগইন করুন",
    registerButton: "অ্যাকাউন্ট তৈরি করুন",
    noAccount: "অ্যাকাউন্ট নেই?",
    haveAccount: "ইতিমধ্যে অ্যাকাউন্ট আছে?",
    registerNow: "এখনই রেজিস্টার করুন",
    loginNow: "এখনই লগইন করুন",
    language: "ভাষা",
    remember: "আমাকে মনে রাখুন",
    forgot: "পাসওয়ার্ড ভুলে গেছেন?",
    secure: "নিরাপদ ফিল্ড অ্যাক্সেস",
  },

  gu: {
    appName: "GridMitra",
    tagline: "AI ફીલ્ડ નોલેજ અને એવિડન્સ આસિસ્ટન્ટ",
    login: "લોગિન",
    register: "રજીસ્ટર",
    workerLogin: "વર્કર લોગિન",
    createAccount: "વર્કર એકાઉન્ટ બનાવો",
    name: "પૂરું નામ",
    mobile: "મોબાઇલ નંબર",
    email: "ઇમેઇલ",
    password: "પાસવર્ડ",
    confirmPassword: "પાસવર્ડની પુષ્ટિ કરો",
    employeeId: "કર્મચારી ID",
    department: "વિભાગ",
    selectDepartment: "વિભાગ પસંદ કરો",
    electrical: "ઇલેક્ટ્રિકલ",
    maintenance: "મેન્ટેનન્સ",
    fieldOperations: "ફીલ્ડ ઓપરેશન્સ",
    loginButton: "લોગિન કરો",
    registerButton: "એકાઉન્ટ બનાવો",
    noAccount: "એકાઉન્ટ નથી?",
    haveAccount: "પહેલેથી એકાઉન્ટ છે?",
    registerNow: "હમણાં રજીસ્ટર કરો",
    loginNow: "હમણાં લોગિન કરો",
    language: "ભાષા",
    remember: "મને યાદ રાખો",
    forgot: "પાસવર્ડ ભૂલી ગયા?",
    secure: "સુરક્ષિત ફીલ્ડ ઍક્સેસ",
  },

  kn: {
    appName: "GridMitra",
    tagline: "AI ಫೀಲ್ಡ್ ಜ್ಞಾನ ಮತ್ತು ಎವಿಡೆನ್ಸ್ ಸಹಾಯಕ",
    login: "ಲಾಗಿನ್",
    register: "ನೋಂದಣಿ",
    workerLogin: "ವರ್ಕರ್ ಲಾಗಿನ್",
    createAccount: "ವರ್ಕರ್ ಖಾತೆ ರಚಿಸಿ",
    name: "ಪೂರ್ಣ ಹೆಸರು",
    mobile: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    email: "ಇಮೇಲ್",
    password: "ಪಾಸ್‌ವರ್ಡ್",
    confirmPassword: "ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ",
    employeeId: "ಉದ್ಯೋಗಿ ID",
    department: "ವಿಭಾಗ",
    selectDepartment: "ವಿಭಾಗ ಆಯ್ಕೆಮಾಡಿ",
    electrical: "ಎಲೆಕ್ಟ್ರಿಕಲ್",
    maintenance: "ನಿರ್ವಹಣೆ",
    fieldOperations: "ಫೀಲ್ಡ್ ಆಪರೇಷನ್ಸ್",
    loginButton: "ಲಾಗಿನ್ ಮಾಡಿ",
    registerButton: "ಖಾತೆ ರಚಿಸಿ",
    noAccount: "ಖಾತೆ ಇಲ್ಲವೇ?",
    haveAccount: "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?",
    registerNow: "ಈಗ ನೋಂದಣಿ ಮಾಡಿ",
    loginNow: "ಈಗ ಲಾಗಿನ್ ಮಾಡಿ",
    language: "ಭಾಷೆ",
    remember: "ನನ್ನನ್ನು ನೆನಪಿಡಿ",
    forgot: "ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿದ್ದೀರಾ?",
    secure: "ಸುರಕ್ಷಿತ ಫೀಲ್ಡ್ ಪ್ರವೇಶ",
  },

  ml: {
    appName: "GridMitra",
    tagline: "AI ഫീൽഡ് നോളജ് & എവിഡൻസ് അസിസ്റ്റന്റ്",
    login: "ലോഗിൻ",
    register: "രജിസ്റ്റർ",
    workerLogin: "വർക്കർ ലോഗിൻ",
    createAccount: "വർക്കർ അക്കൗണ്ട് സൃഷ്ടിക്കുക",
    name: "പൂർണ്ണ പേര്",
    mobile: "മൊബൈൽ നമ്പർ",
    email: "ഇമെയിൽ",
    password: "പാസ്‌വേഡ്",
    confirmPassword: "പാസ്‌വേഡ് സ്ഥിരീകരിക്കുക",
    employeeId: "ജീവനക്കാരൻ ID",
    department: "വകുപ്പ്",
    selectDepartment: "വകുപ്പ് തിരഞ്ഞെടുക്കുക",
    electrical: "ഇലക്ട്രിക്കൽ",
    maintenance: "പരിപാലനം",
    fieldOperations: "ഫീൽഡ് ഓപ്പറേഷൻസ്",
    loginButton: "ലോഗിൻ ചെയ്യുക",
    registerButton: "അക്കൗണ്ട് സൃഷ്ടിക്കുക",
    noAccount: "അക്കൗണ്ട് ഇല്ലേ?",
    haveAccount: "ഇതിനകം അക്കൗണ്ട് ഉണ്ടോ?",
    registerNow: "ഇപ്പോൾ രജിസ്റ്റർ ചെയ്യുക",
    loginNow: "ഇപ്പോൾ ലോഗിൻ ചെയ്യുക",
    language: "ഭാഷ",
    remember: "എന്നെ ഓർക്കുക",
    forgot: "പാസ്‌വേഡ് മറന്നോ?",
    secure: "സുരക്ഷിത ഫീൽഡ് ആക്സസ്",
  },

  pa: {
    appName: "GridMitra",
    tagline: "AI ਫੀਲਡ ਨੌਲਿਜ ਅਤੇ ਐਵੀਡੈਂਸ ਅਸਿਸਟੈਂਟ",
    login: "ਲਾਗਇਨ",
    register: "ਰਜਿਸਟਰ",
    workerLogin: "ਵਰਕਰ ਲਾਗਇਨ",
    createAccount: "ਵਰਕਰ ਖਾਤਾ ਬਣਾਓ",
    name: "ਪੂਰਾ ਨਾਮ",
    mobile: "ਮੋਬਾਈਲ ਨੰਬਰ",
    email: "ਈਮੇਲ",
    password: "ਪਾਸਵਰਡ",
    confirmPassword: "ਪਾਸਵਰਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ",
    employeeId: "ਕਰਮਚਾਰੀ ID",
    department: "ਵਿਭਾਗ",
    selectDepartment: "ਵਿਭਾਗ ਚੁਣੋ",
    electrical: "ਇਲੈਕਟ੍ਰਿਕਲ",
    maintenance: "ਮੇਨਟੇਨੈਂਸ",
    fieldOperations: "ਫੀਲਡ ਓਪਰੇਸ਼ਨਜ਼",
    loginButton: "ਲਾਗਇਨ ਕਰੋ",
    registerButton: "ਖਾਤਾ ਬਣਾਓ",
    noAccount: "ਖਾਤਾ ਨਹੀਂ ਹੈ?",
    haveAccount: "ਪਹਿਲਾਂ ਹੀ ਖਾਤਾ ਹੈ?",
    registerNow: "ਹੁਣੇ ਰਜਿਸਟਰ ਕਰੋ",
    loginNow: "ਹੁਣੇ ਲਾਗਇਨ ਕਰੋ",
    language: "ਭਾਸ਼ਾ",
    remember: "ਮੈਨੂੰ ਯਾਦ ਰੱਖੋ",
    forgot: "ਪਾਸਵਰਡ ਭੁੱਲ ਗਏ?",
    secure: "ਸੁਰੱਖਿਅਤ ਫੀਲਡ ਐਕਸੈਸ",
  },

  or: {
    appName: "GridMitra",
    tagline: "AI ଫିଲ୍ଡ ଜ୍ଞାନ ଏବଂ ଏଭିଡେନ୍ସ ଆସିଷ୍ଟାଣ୍ଟ",
    login: "ଲଗଇନ",
    register: "ପଞ୍ଜୀକରଣ",
    workerLogin: "କର୍ମଚାରୀ ଲଗଇନ",
    createAccount: "କର୍ମଚାରୀ ଆକାଉଣ୍ଟ ତିଆରି କରନ୍ତୁ",
    name: "ପୂର୍ଣ୍ଣ ନାମ",
    mobile: "ମୋବାଇଲ ନମ୍ବର",
    email: "ଇମେଲ",
    password: "ପାସୱାର୍ଡ",
    confirmPassword: "ପାସୱାର୍ଡ ନିଶ୍ଚିତ କରନ୍ତୁ",
    employeeId: "କର୍ମଚାରୀ ID",
    department: "ବିଭାଗ",
    selectDepartment: "ବିଭାଗ ବାଛନ୍ତୁ",
    electrical: "ଇଲେକ୍ଟ୍ରିକାଲ",
    maintenance: "ରକ୍ଷଣାବେକ୍ଷଣ",
    fieldOperations: "ଫିଲ୍ଡ ଅପରେସନ",
    loginButton: "ଲଗଇନ କରନ୍ତୁ",
    registerButton: "ଆକାଉଣ୍ଟ ତିଆରି କରନ୍ତୁ",
    noAccount: "ଆକାଉଣ୍ଟ ନାହିଁ?",
    haveAccount: "ଆଗରୁ ଆକାଉଣ୍ଟ ଅଛି?",
    registerNow: "ବର୍ତ୍ତମାନ ପଞ୍ଜୀକରଣ କରନ୍ତୁ",
    loginNow: "ବର୍ତ୍ତମାନ ଲଗଇନ କରନ୍ତୁ",
    language: "ଭାଷା",
    remember: "ମୋତେ ମନେ ରଖନ୍ତୁ",
    forgot: "ପାସୱାର୍ଡ ଭୁଲିଗଲେ?",
    secure: "ସୁରକ୍ଷିତ ଫିଲ୍ଡ ଆକ୍ସେସ",
  },

  as: {
    appName: "GridMitra",
    tagline: "AI ফিল্ড জ্ঞান আৰু এভিডেন্স সহায়ক",
    login: "লগইন",
    register: "পঞ্জীয়ন",
    workerLogin: "কৰ্মী লগইন",
    createAccount: "কৰ্মী একাউণ্ট সৃষ্টি কৰক",
    name: "সম্পূৰ্ণ নাম",
    mobile: "মোবাইল নম্বৰ",
    email: "ইমেইল",
    password: "পাছৱৰ্ড",
    confirmPassword: "পাছৱৰ্ড নিশ্চিত কৰক",
    employeeId: "কৰ্মচাৰী ID",
    department: "বিভাগ",
    selectDepartment: "বিভাগ বাছনি কৰক",
    electrical: "ইলেক্ট্ৰিকেল",
    maintenance: "ৰক্ষণাবেক্ষণ",
    fieldOperations: "ফিল্ড অপাৰেচন",
    loginButton: "লগইন কৰক",
    registerButton: "একাউণ্ট সৃষ্টি কৰক",
    noAccount: "একাউণ্ট নাই?",
    haveAccount: "ইতিমধ্যে একাউণ্ট আছে?",
    registerNow: "এতিয়াই পঞ্জীয়ন কৰক",
    loginNow: "এতিয়াই লগইন কৰক",
    language: "ভাষা",
    remember: "মোক মনত ৰাখক",
    forgot: "পাছৱৰ্ড পাহৰিলে?",
    secure: "সুৰক্ষিত ফিল্ড এক্সেছ",
  },
};

const languageNames = {
  en: "English",
  hi: "हिन्दी",
  ta: "தமிழ்",
  te: "తెలుగు",
  mr: "मराठी",
  bn: "বাংলা",
  gu: "ગુજરાતી",
  kn: "ಕನ್ನಡ",
  ml: "മലയാളം",
  pa: "ਪੰਜਾਬੀ",
  or: "ଓଡ଼ିଆ",
  as: "অসমীয়া",
};

function App() {
  const [language, setLanguage] = useState("en");
  const [mode, setMode] = useState("login");
  const [showDashboard, setShowDashboard] = useState(false);
  const [showHome, setShowHome] = useState(true);
  useEffect(() => {
  window.history.replaceState({ page: "home" }, "", "#home");
}, []);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    employeeId: "",
    department: "",
  });

  const t = translations[language];

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (mode === "register" && form.password !== form.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  if (mode === "login") {
    setShowDashboard(true);
    return;
  }

  alert("Registration frontend is working!");
};

if (showHome) {
  return (
    <Home
      onGetStarted={() => setShowHome(false)}
    />
  );
}

if (showDashboard) {
  return (
    <Dashboard
      language={language}
      setLanguage={setLanguage}
      onLogout={() => setShowDashboard(false)}
    />
  );
}

  return (
    <div className="auth-page">

      {/* LEFT / BRAND SECTION */}
      <section className="brand-section">
        <div className="brand-content">

          <div className="logo">
            ⚡
          </div>

          <h1>{t.appName}</h1>

          <p className="tagline">
            {t.tagline}
          </p>

          <div className="brand-features">
            <div className="brand-feature">
              <span>🧠</span>
              <div>
                <strong>AI Field Assistant</strong>
                <small>Smart field knowledge</small>
              </div>
            </div>

            <div className="brand-feature">
              <span>📷</span>
              <div>
                <strong>Evidence Management</strong>
                <small>Organize work photos</small>
              </div>
            </div>

            <div className="brand-feature">
              <span>🗂️</span>
              <div>
                <strong>Asset Memory</strong>
                <small>Previous work history</small>
              </div>
            </div>
          </div>

          <p className="secure-text">
            🔒 {t.secure}
          </p>

        </div>
      </section>

      {/* AUTH SECTION */}
      <section className="auth-section">

        <div className="auth-top">

          <label htmlFor="language">
            🌐 {t.language}
          </label>

          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {Object.entries(languageNames).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>

        </div>

        <div className="auth-card">

          {/* LOGIN / REGISTER TABS */}
          <div className="auth-tabs">

            <button
              type="button"
              className={mode === "login" ? "tab active" : "tab"}
              onClick={() => setMode("login")}
            >
              {t.login}
            </button>

            <button
              type="button"
              className={mode === "register" ? "tab active" : "tab"}
              onClick={() => setMode("register")}
            >
              {t.register}
            </button>

          </div>

          <div className="auth-heading">

            <h2>
              {mode === "login"
                ? t.workerLogin
                : t.createAccount}
            </h2>

            <p>
              {mode === "login"
                ? "Access your field workspace"
                : "Join the GridMitra field network"}
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            {mode === "register" && (
              <>
                <div className="form-group">
                  <label>{t.name}</label>

                  <input
                    type="text"
                    name="name"
                    placeholder={t.name}
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>{t.employeeId}</label>

                  <input
                    type="text"
                    name="employeeId"
                    placeholder={t.employeeId}
                    value={form.employeeId}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label>{t.mobile}</label>

              <input
                type="tel"
                name="mobile"
                placeholder="+91 XXXXX XXXXX"
                value={form.mobile}
                onChange={handleChange}
                required
              />
            </div>

            {mode === "register" && (
              <div className="form-group">
                <label>{t.email}</label>

                <input
                  type="email"
                  name="email"
                  placeholder="worker@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="form-group">
              <label>{t.password}</label>

              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                minLength="6"
              />
            </div>

            {mode === "register" && (
              <>
                <div className="form-group">
                  <label>{t.confirmPassword}</label>

                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength="6"
                  />
                </div>

                <div className="form-group">
                  <label>{t.department}</label>

                  <select
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      {t.selectDepartment}
                    </option>

                    <option value="electrical">
                      {t.electrical}
                    </option>

                    <option value="maintenance">
                      {t.maintenance}
                    </option>

                    <option value="field">
                      {t.fieldOperations}
                    </option>
                  </select>
                </div>
              </>
            )}

            {mode === "login" && (
              <div className="login-options">

                <label className="remember">
                  <input type="checkbox" />
                  <span>{t.remember}</span>
                </label>

                <button
                  type="button"
                  className="forgot-button"
                  onClick={() =>
                    alert("Forgot password will be connected later.")
                  }
                >
                  {t.forgot}
                </button>

              </div>
            )}

            <button className="submit-button" type="submit">

              {mode === "login"
                ? `⚡ ${t.loginButton}`
                : `👷 ${t.registerButton}`}

            </button>

          </form>

          <div className="switch-auth">

            {mode === "login" ? (
              <>
                <span>{t.noAccount}</span>

                <button onClick={() => setMode("register")}>
                  {t.registerNow}
                </button>
              </>
            ) : (
              <>
                <span>{t.haveAccount}</span>

                <button onClick={() => setMode("login")}>
                  {t.loginNow}
                </button>
              </>
            )}

          </div>

        </div>

        <p className="copyright">
          GridMitra • AI Field Knowledge & Evidence Assistant
        </p>

      </section>

    </div>
  );
}

export default App;