import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useQuiz } from "../context/QuizContext";
import { useAuth } from "../context/AuthContext";

import { formatDate } from "../utils/formatDate";
import {calculateAverageScore} from "../utils/calculateScore";
import {getBestScore} from "../utils/calculateScore";

import Button from "../components/Button";
import {Loader} from "../components/loader";

export default function HistoryPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { quizHistory, clearHistory } = useQuiz();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader message="Loading..." />
      </div>
    );
  }

  const scores = quizHistory.map((h) => h.score.percentage);
  const averageScore = calculateAverageScore(scores);
  const bestScore = getBestScore(scores);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            📊 Quiz History
          </h1>

          {quizHistory.length > 0 && (
            <Button onClick={clearHistory}>
              Clear History
            </Button>
          )}
        </div>

        {/* Stats */}
        {quizHistory.length > 0 && (
          <div className="grid md:grid-cols-3 gap-4 mb-8">

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-sm text-gray-500 mb-1">
                Total Quizzes
              </div>
              <div className="text-3xl font-bold text-indigo-600">
                {quizHistory.length}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-sm text-gray-500 mb-1">
                Average Score
              </div>
              <div className="text-3xl font-bold text-indigo-600">
                {averageScore}%
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-sm text-gray-500 mb-1">
                Best Score
              </div>
              <div className="text-3xl font-bold text-green-600">
                {bestScore}%
              </div>
            </div>

          </div>
        )}

        {/* No history */}
        {quizHistory.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">

            <div className="text-6xl mb-4">📝</div>

            <h2 className="text-xl font-semibold mb-2">
              No Quiz History Yet
            </h2>

            <p className="text-gray-600 mb-6">
              Take your first quiz to see your history here!
            </p>

            <Button onClick={() => navigate("/quiz")}>
              Start Quiz
            </Button>

          </div>

        ) : (

          <div className="space-y-4">

            {quizHistory.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-6"
              >

                <div className="flex justify-between">

                  <div>
                    <h3 className="text-lg font-semibold">
                      {item.category}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {formatDate(item.date)}
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {item.score.percentage}%
                    </div>
                    <div className="text-xs text-gray-500">
                      Score
                    </div>
                  </div>

                </div>

                {/* Progress Bar */}

                <div className="mt-4 bg-gray-200 rounded-full h-2">

                  <div
                    className="h-2 rounded-full bg-indigo-500"
                    style={{ width: `${item.score.percentage}%` }}
                  ></div>

                </div>

              </div>
            ))}

          </div>

        )}

      </div>
    </div>
  );
}