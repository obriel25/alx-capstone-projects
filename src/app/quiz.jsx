import { useEffect, useState } from "react";
import { fetchQuizQuestions, decodeHtml } from "../services/triviaApi";

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const setup = {
      amount: 5,
      category: 0,      // 0 = any category
      difficulty: "",   // empty = any difficulty
      type: "multiple", // multiple-choice
    };

    async function loadQuestions() {
      try {
        const data = await fetchQuizQuestions(setup);
        if (!data || data.length === 0) {
          setError("No questions returned from the API.");
          return;
        }
        console.log("Fetched questions:", data); // Debug log
        setQuestions(data);
      } catch (err) {
        console.error("Failed to load questions:", err);
        setError(err.message || "Failed to load quiz questions.");
      } finally {
        setLoading(false);
      }
    }

    loadQuestions();
  }, []);

  const handleAnswerClick = (selected, correct) => {
    if (selected === correct) {
      alert("✅ Correct!");
    } else {
      alert(`❌ Wrong! Correct answer: ${decodeHtml(correct)}`);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">Loading questions...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        <h1>{error}</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quiz Questions</h1>

      {questions.map((q, index) => (
        <div
          key={index}
          className="mb-6 p-4 border rounded-lg shadow-sm bg-white"
        >
          <h2 className="font-semibold mb-3">
            {index + 1}. {decodeHtml(q.question)}
          </h2>

          <div className="space-y-2">
            {q.all_answers.map((answer, i) => (
              <button
                key={i}
                className="block w-full text-left px-4 py-2 border rounded hover:bg-gray-100"
                onClick={() => handleAnswerClick(answer, q.correct_answer)}
              >
                {decodeHtml(answer)}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}