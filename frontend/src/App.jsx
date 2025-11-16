import { useState } from "react";
import GenerateQuizTab from "./tabs/GenerateQuizTab";
import HistoryTab from "./tabs/HistoryTab";

export default function App() {
  const [tab, setTab] = useState("generate");

  return (
    <div className="app-container">
      <header className="app-header flex items-center gap-3">
        <h1 className="app-title">AI Wiki Quiz Generator</h1>
      </header>

      <div className="panel">
        <div className="tabs" role="tablist" aria-label="Main tabs">
          <button
            className={`tab-btn ${tab === "generate" ? "active" : ""}`}
            onClick={() => setTab("generate")}
            role="tab"
            aria-selected={tab === "generate"}
          >
            Generate Quiz
          </button>

          <button
            className={`tab-btn ${tab === "history" ? "active" : ""}`}
            onClick={() => setTab("history")}
            role="tab"
            aria-selected={tab === "history"}
          >
            History
          </button>
        </div>

        {tab === "generate" ? <GenerateQuizTab /> : <HistoryTab />}
      </div>
    </div>
  );
}
