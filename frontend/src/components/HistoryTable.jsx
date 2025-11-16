export default function HistoryTable({ history, openQuiz }) {
  return (
    <table className="history-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {history.map((item) => (
          <tr key={item.id} className="history-row">
            <td style={{ width: 60 }}>{item.id}</td>
            <td>{item.title}</td>
            <td>
              <button
                className="btn btn-ghost"
                onClick={() => openQuiz(item.id)}
              >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
