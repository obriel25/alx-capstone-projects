import { AnswerOption } from "./AnswerOption";

export function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  isRevealed,
  onSelectAnswer,
}) {

  if (!question) return null;

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

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

  const answers = question.all_answers || [];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-500">
          Question {currentIndex + 1} of {totalQuestions}
        </span>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
            question.difficulty
          )}`}
        >
          {question.difficulty?.charAt(0).toUpperCase() +
            question.difficulty?.slice(1)}
        </span>
      </div>

      {/* Category */}
      <div className="mb-4">
        <span className="text-xs text-indigo-600 font-medium uppercase tracking-wide">
          {decodeHtml(question.category)}
        </span>
      </div>

      {/* Question */}
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
        {decodeHtml(question.question)}
      </h2>

      {/* Answers */}
      <div className="space-y-3">
        {answers.map((answer, index) => {
          const decodedAnswer = decodeHtml(answer);

          return (
            <AnswerOption
              key={index}
              answer={decodedAnswer}
              index={index}
              isSelected={selectedAnswer === decodedAnswer}
              isCorrect={decodedAnswer === decodeHtml(question.correct_answer)}
              isRevealed={isRevealed}
              onSelect={() => onSelectAnswer(decodedAnswer)}
              disabled={isRevealed}
            />
          );
        })}
      </div>
    </div>
  );
}