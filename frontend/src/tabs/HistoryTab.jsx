import { useEffect, useState } from "react";
import { getHistory, getQuiz } from "../services/api";
import HistoryTable from "../components/HistoryTable";
import QuizDisplay from "../components/QuizDisplay";

export default function HistoryTab() {
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    const data = await getHistory();
    setHistory(data);
  }

  async function openQuiz(id) {
    const quiz = await getQuiz(id);
    setSelected(quiz);
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Generated Quiz History</h2>
      <HistoryTable history={history} openQuiz={openQuiz} />
      <QuizDisplay quiz={selected} />
    </div>
  );
}
