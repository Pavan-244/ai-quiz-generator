import { useState } from "react";
import { generateQuiz } from "../services/api";
import QuizDisplay from "../components/QuizDisplay";

export default function GenerateQuizTab() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState(null);

  async function handleGenerate() {
    if (!url) return;
    setLoading(true);
    setError(null);
    try {
      const data = await generateQuiz(url);
      setQuiz(data);
    } catch (err) {
      setError(err?.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="form-row">
        <input
          type="text"
          placeholder="Enter Wikipedia URL"
          className="input-url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          aria-label="Wikipedia URL"
        />

        <button
          className="btn btn-primary"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? (
            <span
              style={{ display: "inline-flex", gap: 8, alignItems: "center" }}
            >
              <span className="spinner" /> Generating...
            </span>
          ) : (
            "Generate Quiz"
          )}
        </button>
      </div>

      {error && (
        <p className="muted" style={{ color: "#ff6b6b", marginTop: 12 }}>
          {error}
        </p>
      )}
      <QuizDisplay quiz={quiz} />
    </div>
  );
}
