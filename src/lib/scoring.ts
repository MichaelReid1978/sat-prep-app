import { UserStats } from "@/types/sat";

/**
 * Baseline Elo parameters:
 * Elo scale 1000 - 2200 maps to official SAT section scale 200 - 800.
 */
export const MIN_RATING = 1000;
export const MAX_RATING = 2200;
export const DEFAULT_RATING = 1500; // corresponds to ~500 SAT section score

/**
 * Converts Elo rating to official Digital SAT 200 - 800 section score,
 * rounded to the standard 10-point increment.
 */
export function ratingToSatScore(rating: number): number {
  const clamped = Math.max(MIN_RATING, Math.min(MAX_RATING, rating));
  // Linear interpolation with standard rounding to nearest 10
  const rawScore = 200 + ((clamped - MIN_RATING) / (MAX_RATING - MIN_RATING)) * 600;
  return Math.min(800, Math.max(200, Math.round(rawScore / 10) * 10));
}

/**
 * Calculates expected probability of student answering correctly
 * based on student rating Rs and question difficulty rating Rq.
 */
export function getExpectedProbability(studentRating: number, questionRating: number): number {
  return 1 / (1 + Math.pow(10, (questionRating - studentRating) / 400));
}

/**
 * Determines dynamic K-factor:
 * High K-factor (36) for early questions to rapidly find appropriate difficulty,
 * stabilizing to 16 for established rating accuracy.
 */
export function getKFactor(questionsAnswered: number): number {
  if (questionsAnswered < 10) return 36;
  if (questionsAnswered < 25) return 24;
  return 16;
}

/**
 * Updates user rating and stats after an answer attempt.
 */
export function calculateUpdatedStats(
  currentStats: UserStats,
  questionDifficulty: number,
  isCorrect: boolean,
  domain: string
): { updatedStats: UserStats; ratingDelta: number; scoreDelta: number } {
  const expected = getExpectedProbability(currentStats.rating, questionDifficulty);
  const actual = isCorrect ? 1 : 0;
  const k = getKFactor(currentStats.questionsAnswered);

  const rawDelta = k * (actual - expected);
  const newRating = Math.max(MIN_RATING, Math.min(MAX_RATING, Math.round(currentStats.rating + rawDelta)));
  const newScore = ratingToSatScore(newRating);

  const prevScore = currentStats.scoreEstimate;
  const ratingDelta = newRating - currentStats.rating;
  const scoreDelta = newScore - prevScore;

  const currentDomain = currentStats.domainMastery[domain] || { total: 0, correct: 0 };
  const updatedDomain = {
    total: currentDomain.total + 1,
    correct: currentDomain.correct + (isCorrect ? 1 : 0),
  };

  const newStreak = isCorrect ? currentStats.streak + 1 : 0;
  const bestStreak = Math.max(currentStats.bestStreak, newStreak);

  const updatedStats: UserStats = {
    rating: newRating,
    scoreEstimate: newScore,
    questionsAnswered: currentStats.questionsAnswered + 1,
    correctAnswers: currentStats.correctAnswers + (isCorrect ? 1 : 0),
    streak: newStreak,
    bestStreak,
    domainMastery: {
      ...currentStats.domainMastery,
      [domain]: updatedDomain,
    },
  };

  return { updatedStats, ratingDelta, scoreDelta };
}

export function createInitialStats(): UserStats {
  return {
    rating: DEFAULT_RATING,
    scoreEstimate: ratingToSatScore(DEFAULT_RATING), // 500
    questionsAnswered: 0,
    correctAnswers: 0,
    streak: 0,
    bestStreak: 0,
    domainMastery: {},
  };
}
