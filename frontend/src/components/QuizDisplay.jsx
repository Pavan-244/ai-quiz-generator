import { useState } from "react";

function renderChoice(choice) {
  if (choice == null) return null;
  if (typeof choice === "string") return choice;
  if (typeof choice === "object")
    return choice.text ?? choice.choice ?? JSON.stringify(choice);
  return String(choice);
}

export default function QuizDisplay({ quiz }) {
  const [showAnswers, setShowAnswers] = useState(false);

  // NEW: Track user answers
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  if (!quiz) return null;

  if (typeof quiz !== "object" || !quiz) {
    return (
      <div className="card">
        <h2>Invalid quiz data</h2>
        <p className="muted">
          The quiz returned from the server is not valid JSON.
        </p>
      </div>
    );
  }

  const questions = Array.isArray(quiz.questions) ? quiz.questions : [];

  // NEW: User clicks a choice
  function handleSelectAnswer(qid, choice) {
    if (submitted) return; // no changes after submission
    setUserAnswers((prev) => ({ ...prev, [qid]: choice }));
  }

  // NEW: Submit quiz
  function handleSubmitQuiz() {
    let sc = 0;
    questions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (ans && ans.trim() === q.correct_answer.trim()) sc++;
    });
    setScore(sc);
    setSubmitted(true);
    setShowAnswers(true); // automatically reveal answers
  }

  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>{quiz.title || "Untitled Quiz"}</h2>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span className="muted">
            {questions.length} question{questions.length !== 1 ? "s" : ""}
          </span>

          {/* hide/show only when not submitted */}
          {!submitted && (
            <button
              className="btn btn-ghost"
              onClick={() => setShowAnswers((s) => !s)}
              aria-pressed={showAnswers}
            >
              {showAnswers ? "Hide answers" : "Show answers"}
            </button>
          )}
        </div>
      </div>

      <p className="muted">{quiz.summary || "No summary available."}</p>

      <h3 style={{ marginTop: 12, marginBottom: 8 }}>Questions:</h3>

      {questions.length === 0 ? (
        <p className="muted">No questions were generated.</p>
      ) : (
        questions.map((q, idx) => {
          const qId = q.id ?? idx + 1;
          const choices = Array.isArray(q.choices) ? q.choices : [];
          const correct = q.correct_answer ?? null;

          return (
            <div key={qId} className="question" style={{ marginBottom: 20 }}>
              <p style={{ fontWeight: 600, margin: 0 }}>
                {qId}. {q.question || "(no question text)"}
              </p>

              {/* Multiple-choice display */}
              {choices.length > 0 && (
                <div style={{ marginTop: 8 }}>
                  {choices.map((c, i) => {
                    const text = renderChoice(c);

                    const isCorrect =
                      showAnswers &&
                      String(correct).trim() === String(text).trim();

                    const isWrong =
                      submitted && userAnswers[qId] === text && !isCorrect;

                    return (
                      <label
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: 6,
                          padding: "6px 8px",
                          borderRadius: 6,
                          background: isCorrect
                            ? "#16a34a55"
                            : isWrong
                            ? "#dc262655"
                            : "rgba(255,255,255,0.04)",
                        }}
                      >
                        <input
                          type="radio"
                          name={`q-${qId}`}
                          disabled={submitted}
                          checked={userAnswers[qId] === text}
                          onChange={() => handleSelectAnswer(qId, text)}
                        />
                        <span style={{ marginLeft: 8 }}>{text}</span>
                      </label>
                    );
                  })}
                </div>
              )}

              {/* Short-answer (rare) */}
              {choices.length === 0 && (
                <p className="muted" style={{ marginTop: 8 }}>
                  This question has no choices.
                </p>
              )}

              {showAnswers && q.answer_explanation && (
                <div style={{ marginTop: 8 }} className="muted">
                  Explanation: {q.answer_explanation}
                </div>
              )}
            </div>
          );
        })
      )}

      {/* NEW: Submit button OR Score */}
      {!submitted ? (
        <button
          className="btn btn-primary"
          onClick={handleSubmitQuiz}
          style={{ marginTop: 20 }}
        >
          Submit Quiz
        </button>
      ) : (
        <div style={{ marginTop: 20 }}>
          <h2>
            Your Score: {score} / {questions.length}
          </h2>
        </div>
      )}

      {quiz.source_url && (
        <p style={{ marginTop: 12 }} className="muted">
          Source: <a href={quiz.source_url}>{quiz.source_url}</a>
        </p>
      )}
    </div>
  );
}
