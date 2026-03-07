import { useEffect, useState } from "react";

export function Timer({ initialTime, onTimeUp, isActive }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (!isActive) return;

    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isActive, onTimeUp]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const getTimeColor = () => {
    if (timeLeft <= 5) return "text-red-600";
    if (timeLeft <= 10) return "text-yellow-600";
    return "text-gray-700";
  };

  return (
    <div className={`font-mono text-xl font-bold ${getTimeColor()}`}>
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <span>{formatTime(timeLeft)}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
        <div
          className={`h-1.5 rounded-full transition-all duration-1000 ${
            timeLeft <= 5
              ? "bg-red-500"
              : timeLeft <= 10
              ? "bg-yellow-500"
              : "bg-indigo-500"
          }`}
          style={{ width: `${(timeLeft / initialTime) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}