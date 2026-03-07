/**
 * Calculate score from quiz results
 */
export function calculateScore(results) {
  const correctAnswers = results.filter(r => r.isCorrect).length;
  const totalQuestions = results.length;
  const incorrectAnswers = totalQuestions - correctAnswers;
  const percentage = totalQuestions > 0 
    ? Math.round((correctAnswers / totalQuestions) * 100) 
    : 0;

  return {
    totalQuestions,
    correctAnswers,
    incorrectAnswers,
    percentage
  };
}

/**
 * Get performance message based on score percentage
 */
export function getPerformanceMessage(percentage) {
  if (percentage >= 90) return 'Excellent! 🌟';
  if (percentage >= 70) return 'Great job! 👍';
  if (percentage >= 50) return 'Good effort! 💪';
  if (percentage >= 30) return 'Keep practicing! 📚';
  return 'Better luck next time! 🍀';
}

/**
 * Calculate average score from history
 */
export function calculateAverageScore(scores) {
  if (scores.length === 0) return 0;
  const sum = scores.reduce((acc, score) => acc + score, 0);
  return Math.round(sum / scores.length);
}

/**
 * Get best score from history
 */
export function getBestScore(scores) {
  if (scores.length === 0) return 0;
  return Math.max(...scores);
}