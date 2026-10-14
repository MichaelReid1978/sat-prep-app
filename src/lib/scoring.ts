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

/**
 * Official College Board SAT Composite Score to User Group Percentile mapping.
 * Derived from recent high school graduating classes who wrote the SAT.
 */
const SAT_COMPOSITE_PERCENTILE_TABLE: [number, number][] = [
  [1600, 99],
  [1550, 99],
  [1520, 98],
  [1500, 97],
  [1470, 96],
  [1450, 95],
  [1420, 94],
  [1400, 93],
  [1380, 91],
  [1350, 89],
  [1330, 88],
  [1300, 85],
  [1270, 82],
  [1250, 80],
  [1220, 77],
  [1200, 75],
  [1170, 71],
  [1150, 69],
  [1120, 63],
  [1100, 59],
  [1070, 53],
  [1050, 51],
  [1030, 49],
  [1000, 45],
  [970, 39],
  [950, 36],
  [920, 31],
  [900, 28],
  [870, 23],
  [850, 20],
  [820, 16],
  [800, 13],
  [770, 10],
  [750, 8],
  [720, 5],
  [700, 3],
  [650, 1],
  [400, 1],
];

export function getOrdinalSuffix(n: number): string {
  const j = n % 10;
  const k = n % 100;
  if (j === 1 && k !== 11) return "st";
  if (j === 2 && k !== 12) return "nd";
  if (j === 3 && k !== 13) return "rd";
  return "th";
}

export function getSatPercentile(totalScore: number): {
  percentile: number;
  formatted: string;
  topPercent: number;
  label: string;
} {
  const clamped = Math.max(400, Math.min(1600, Math.round(totalScore)));

  let percentile = 1;
  for (let i = 0; i < SAT_COMPOSITE_PERCENTILE_TABLE.length - 1; i++) {
    const [scoreUpper, pUpper] = SAT_COMPOSITE_PERCENTILE_TABLE[i];
    const [scoreLower, pLower] = SAT_COMPOSITE_PERCENTILE_TABLE[i + 1];

    if (clamped >= scoreLower && clamped <= scoreUpper) {
      if (scoreUpper === scoreLower) {
        percentile = pUpper;
      } else {
        const ratio = (clamped - scoreLower) / (scoreUpper - scoreLower);
        percentile = Math.round(pLower + ratio * (pUpper - pLower));
      }
      break;
    }
  }

  percentile = Math.max(1, Math.min(99, percentile));
  const suffix = getOrdinalSuffix(percentile);
  const formatted = clamped >= 1580 ? "99th+" : `${percentile}${suffix}`;
  const topPercent = Math.max(1, 100 - percentile);
  const label = clamped >= 1580 ? "Top <1% of test writers" : `Top ${topPercent}% of test writers`;

  return {
    percentile,
    formatted,
    topPercent,
    label,
  };
}

const SAT_SECTION_PERCENTILE_TABLE: Record<"math" | "reading_writing", [number, number][]> = {
  math: [
    [800, 99],
    [750, 95],
    [700, 92],
    [650, 83],
    [600, 70],
    [550, 54],
    [500, 39],
    [450, 24],
    [400, 13],
    [350, 6],
    [300, 2],
    [200, 1],
  ],
  reading_writing: [
    [800, 99],
    [750, 98],
    [700, 93],
    [650, 85],
    [600, 72],
    [550, 58],
    [500, 43],
    [450, 28],
    [400, 16],
    [350, 8],
    [300, 3],
    [200, 1],
  ],
};

export function getSectionPercentile(section: "math" | "reading_writing", score: number): {
  percentile: number;
  formatted: string;
} {
  const table = SAT_SECTION_PERCENTILE_TABLE[section];
  const clamped = Math.max(200, Math.min(800, Math.round(score)));
  let percentile = 1;

  for (let i = 0; i < table.length - 1; i++) {
    const [scoreUpper, pUpper] = table[i];
    const [scoreLower, pLower] = table[i + 1];

    if (clamped >= scoreLower && clamped <= scoreUpper) {
      if (scoreUpper === scoreLower) {
        percentile = pUpper;
      } else {
        const ratio = (clamped - scoreLower) / (scoreUpper - scoreLower);
        percentile = Math.round(pLower + ratio * (pUpper - pLower));
      }
      break;
    }
  }

  percentile = Math.max(1, Math.min(99, percentile));
  const suffix = getOrdinalSuffix(percentile);
  const formatted = clamped >= 790 ? "99th+" : `${percentile}${suffix}`;
  return { percentile, formatted };
}
