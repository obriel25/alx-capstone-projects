import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import {ErrorMessage} from "../components/ErrorMessage";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, signup, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const result = login(email, password);

        if (!result.success) {
          setError(result.error);
        } else {
          navigate("/");
        }

      } else {
        const result = signup(name, email, password);

        if (!result.success) {
          setError(result.error);
        } else {
          navigate("/");
        }
      }

    } catch {
      setError("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-500 py-12 px-4">

      <div className="max-w-md w-full">

        <div className="bg-white rounded-2xl shadow-xl p-8">

          <div className="text-center mb-8">

            <h1 className="text-3xl font-bold">
              {isLogin ? "Welcome Back!" : "Create Account"}
            </h1>

            <p className="text-gray-600 mt-2">
              {isLogin
                ? "Sign in to continue your quiz journey"
                : "Join us and start taking quizzes"}
            </p>

          </div>

          {error && <ErrorMessage message={error} />}

          <form onSubmit={handleSubmit} className="space-y-6">

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                  className="w-full px-4 py-3 rounded-lg border"
                  placeholder="John Doe"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-lg border"
                placeholder="••••••••"
              />

              {!isLogin && (
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 6 characters
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-lg"
            >
              {loading
                ? "Please wait..."
                : isLogin
                ? "Sign In"
                : "Create Account"}
            </Button>

          </form>

          <div className="mt-6 text-center">

            <p className="text-gray-600">

              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}

              <button
                onClick={toggleMode}
                className="text-indigo-600 ml-2 font-medium"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>

            </p>

          </div>

          <div className="mt-4 text-center">

            <Link
              to="/"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back to Home
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}