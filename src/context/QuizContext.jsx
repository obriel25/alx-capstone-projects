import React, { createContext, useContext, useState, useEffect } from "react";
import { calculateScore } from "../utils/calculateScore";
import { getCurrentDateISO } from "../utils/formatDate";
import { fetchCategories, fetchQuizQuestions } from "../services/triviaApi";

const QuizContext = createContext();

const HISTORY_KEY = "quiz_history";

export function QuizProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState("medium");
  const [selectedAmount, setSelectedAmount] = useState(10);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [quizHistory, setQuizHistory] = useState([]);

  // Load quiz history
  useEffect(() => {
    const savedHistory = localStorage.getItem(HISTORY_KEY);

    if (savedHistory) {
      try {
        setQuizHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error("Failed to load history:", error);
      }
    }
  }, []);

  // Save quiz history
  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(quizHistory));
  }, [quizHistory]);

  const loadCategories = async () => {
    try {
      const cats = await fetchCategories();
      setCategories(cats);
    } catch (err) {
      console.error(err);
      setError("Failed to load categories");
    }
  };

  const startQuiz = async () => {
    setIsLoading(true);
    setError(null);
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setIsQuizComplete(false);

    try {
      const fetchedQuestions = await fetchQuizQuestions({
        amount: selectedAmount,
        category: selectedCategory,
        difficulty: selectedDifficulty,
        type: "multiple",
      });

      setQuestions(fetchedQuestions);
      setIsQuizActive(true);
    } catch (err) {
      setError("Failed to start quiz");
    } finally {
      setIsLoading(false);
    }
  };

  const answerQuestion = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];

    const result = {
      question: currentQuestion.question,
      userAnswer: answer,
      correctAnswer: currentQuestion.correct_answer,
      isCorrect: answer === currentQuestion.correct_answer,
    };

    setAnswers((prev) => [...prev, result]);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      const score = calculateScore(answers);

      const category = categories.find((c) => c.id === selectedCategory);

      const historyItem = {
        id: Date.now().toString(),
        date: getCurrentDateISO(),
        category: category?.name || "Mixed",
        difficulty: selectedDifficulty,
        score,
        results: answers,
      };

      setQuizHistory((prev) => [historyItem, ...prev]);

      setIsQuizComplete(true);
      setIsQuizActive(false);
    }
  };

  const resetQuiz = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setIsQuizActive(false);
    setIsQuizComplete(false);
    setError(null);
  };

  const clearHistory = () => {
    setQuizHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentQuestionIndex,
        answers,
        isQuizActive,
        isQuizComplete,
        categories,
        selectedCategory,
        selectedDifficulty,
        selectedAmount,
        isLoading,
        error,
        quizHistory,
        setSelectedCategory,
        setSelectedDifficulty,
        setSelectedAmount,
        loadCategories,
        startQuiz,
        answerQuestion,
        nextQuestion,
        resetQuiz,
        clearHistory,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error("useQuiz must be used inside QuizProvider");
  }

  return context;
}