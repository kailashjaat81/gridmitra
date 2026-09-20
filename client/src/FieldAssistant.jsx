import { useState, useRef } from "react";
import "./FieldAssistant.css";

function FieldAssistant({ asset, onBack }) {
  const [observation, setObservation] = useState("");
  const [result, setResult] = useState(null);
  const [isListening, setIsListening] = useState(false);
const recognitionRef = useRef(null);


       const handleVoiceInput = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Voice input is not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "hi-IN";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    setIsListening(true);
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;

    setObservation((current) =>
      current ? `${current} ${transcript}` : transcript
    );
  };

  recognition.onerror = (event) => {
    console.error("Voice input error:", event.error);
    alert("Unable to capture voice.");
  };

  recognition.onend = () => {
    setIsListening(false);
  };

  recognitionRef.current = recognition;
  recognition.start();
};

              const handleTextToVoice = () => {
  if (!observation.trim()) {
    alert("Please enter an observation first.");
    return;
  }

  const speech = new SpeechSynthesisUtterance(observation);
  speech.lang = "hi-IN";
  speech.rate = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
};

          const handleAnalyze = async () => {
  if (!observation.trim()) {
    alert("Please enter your field observation.");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:4000/api/assistant",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          assetId: asset?.id || "T-182",
          observation: observation
        })
      }
    );

    const data = await response.json();

    if (data.success) {
      setResult(data.result);
    } else {
      alert(data.message || "Unable to structure observation.");
    }

  } catch (error) {
    console.error("Field Assistant error:", error);
    alert("Unable to connect to backend.");
  }
};

  return (
    <div className="field-assistant-page">

      <header className="field-assistant-header">
        <button
          className="field-back-btn"
          onClick={onBack}
        >
          ← Back
        </button>

        <div>
          <h1>Field-Language Assistant</h1>
          <p>Turn field language into structured observations</p>
        </div>
      </header>

      <section className="field-assistant-card">

        <div className="field-asset">
          <span>ASSET</span>
          <strong>⚡ {asset?.id || "T-182"}</strong>
        </div>

        <label>
          Your Field Observation
        </label>

        <textarea
          value={observation}
          onChange={(e) => setObservation(e.target.value)}
          placeholder="Example: Transformer ke neeche tel jaisa kuch dikh raha hai..."
          rows="7"
        />



                  <button
  className="voice-input-btn"
  onClick={handleVoiceInput}
>
  {isListening ? "🔴 Listening..." : "🎙️ Speak Observation"}
</button>

            <button
  className="text-to-voice-btn"
  onClick={handleTextToVoice}
>
  🔊 Read Observation
</button>

        <button
          className="analyze-btn"
          onClick={handleAnalyze}
        >
          🧠 Structure Observation
        </button>

        {result && (
          <div className="assistant-result">

            <h2>Structured Observation</h2>

            <div className="result-item">
              <span>Summary</span>
              <strong>{result.summary}</strong>
            </div>

            <div className="result-item">
              <span>Category</span>
              <strong>{result.category}</strong>
            </div>

            <div className="result-item">
              <span>Priority</span>
              <strong>{result.priority}</strong>
            </div>

            <div className="result-item">
              <span>Confidence</span>
              <strong>{result.confidence}</strong>
            </div>

            <p className="assistant-note">
              AI output is an observation aid and must be reviewed
              by authorized personnel before any safety-critical action.
            </p>

          </div>
        )}

      </section>

    </div>
  );
}

export default FieldAssistant;
