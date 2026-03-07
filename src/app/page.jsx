import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { fetchCategories } from "../services/triviaApi";
import { useQuiz } from "../context/QuizContext";

import Button from "../components/Button";
import {Loader} from "../components/loader";
import {ErrorMessage} from "../components/ErrorMessage";

export default function HomePage() {
  const { quizHistory } = useQuiz();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await fetchCategories();
        setCategories(cats);
      } catch (e) {
        setError("Failed to load categories");
      } finally {
        setIsLoading(false);
      }
    };
    loadCategories();
  }, []);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentQuizzes = quizHistory.slice(0, 3);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            🧠 QuizMaster
          </h1>

          <p className="text-xl md:text-2xl mb-8">
            Test your knowledge with fun quizzes!
          </p>

          <Link to="/quiz">
            <Button>
              Start Playing 🎮
            </Button>
          </Link>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Recent Activity */}
        {recentQuizzes.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              📈 Recent Activity
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              {recentQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="bg-white rounded-lg shadow-md p-4"
                >
                  <div className="flex justify-between mb-2">
                    <h3 className="font-semibold">
                      {quiz.category}
                    </h3>

                    <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(quiz.difficulty)}`}>
                      {quiz.difficulty}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">
                      {new Date(quiz.date).toLocaleDateString()}
                    </span>

                    <span className="text-lg font-bold">
                      {quiz.score.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Categories */}
        <section>
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">

            <h2 className="text-2xl font-bold">
              📚 Available Categories
            </h2>

            {/* Search */}
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-3 border rounded-lg"
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader message="Loading categories..." />
            </div>

          ) : error ? (
            <ErrorMessage message={error} />

          ) : filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              No categories found
            </div>

          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

              {filteredCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/quiz?category=${category.id}`}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg"
                >
                  <h3 className="font-semibold mb-2">
                    {category.name}
                  </h3>

                  <p className="text-indigo-600">
                    Click to play →
                  </p>
                </Link>
              ))}

            </div>
          )}
        </section>

      </div>
    </div>
  );
}