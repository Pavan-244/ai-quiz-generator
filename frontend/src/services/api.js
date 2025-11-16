const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

async function handleResponse(res) {
  const text = await res.text();
  try {
    const data = text ? JSON.parse(text) : null;

    // unwrap { id, quiz }
    if (data && typeof data === "object" && "quiz" in data) {
      return data.quiz; // return only quiz object
    }

    if (!res.ok) {
      const err =
        (data && data.detail) || (data && data.message) || res.statusText;
      throw new Error(`Server error: ${err}`);
    }

    return data;
  } catch (e) {
    if (res.ok) return text;
    throw new Error(`Server error: ${res.status} ${res.statusText}`);
  }
}

export async function generateQuiz(url, n = 10) {
  const res = await fetch(`${BASE_URL}/generate_quiz`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, n_questions: n }),
  });

  return await handleResponse(res);
}

export async function getHistory() {
  const res = await fetch(`${BASE_URL}/history`);
  return await handleResponse(res);
}

export async function getQuiz(id) {
  const res = await fetch(`${BASE_URL}/quiz/${id}`);
  return await handleResponse(res);
}
