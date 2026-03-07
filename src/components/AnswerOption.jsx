const optionLabels = ["A", "B", "C", "D"];

export default function AnswerOption({
  answer,
  index,
  isSelected,
  isCorrect,
  isRevealed,
  onSelect,
  disabled,
}) {
  const getOptionStyles = () => {
    if (!isRevealed) {
      return isSelected
        ? "bg-indigo-100 border-indigo-500"
        : "bg-white border-gray-300 hover:bg-gray-50";
    }

    if (isCorrect) {
      return "bg-green-100 border-green-500";
    }

    if (isSelected && !isCorrect) {
      return "bg-red-100 border-red-500";
    }

    return "bg-white border-gray-300 opacity-60";
  };

  return (
    <button
      onClick={() => onSelect(answer)}
      disabled={disabled}
      className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200 flex items-center gap-3 ${getOptionStyles()} ${
        disabled ? "cursor-not-allowed" : "cursor-pointer hover:shadow-md"
      }`}
    >
      {/* Option Label */}
      <span
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
          isSelected && !isRevealed
            ? "bg-indigo-500 text-white"
            : isRevealed && isCorrect
            ? "bg-green-500 text-white"
            : isRevealed && isSelected && !isCorrect
            ? "bg-red-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        {optionLabels[index]}
      </span>

      {/* Answer Text */}
      <span className="flex-1 text-gray-800">{answer}</span>

      {/* Correct Icon */}
      {isRevealed && isCorrect && (
        <span className="text-green-500 font-bold">✔</span>
      )}

      {/* Wrong Icon */}
      {isRevealed && isSelected && !isCorrect && (
        <span className="text-red-500 font-bold">✖</span>
      )}
    </button>
  );
}