export type SectionType = "math" | "reading_writing";

export type QuestionOptionId = "A" | "B" | "C" | "D";

export interface QuestionOption {
  id: QuestionOptionId;
  text: string;
}

export interface QuestionExplanation {
  summary: string;
  steps: string[];
  keyConcept?: string;
}

export interface Question {
  id: string;
  section: SectionType;
  domain: string; // e.g. "Algebra", "Advanced Math", "Craft and Structure", "Information and Ideas"
  subtopic: string; // e.g. "Linear Equations", "Standard English Conventions"
  difficultyRating: number; // Elo scale (1000 - 2000+)
  passage?: string; // Long passage or reading excerpt
  prompt: string; // The core prompt / question
  options: QuestionOption[];
  correctAnswer: QuestionOptionId;
  explanation: QuestionExplanation;
}

export interface UserStats {
  rating: number; // Elo rating (starts ~1500)
  scoreEstimate: number; // 200 - 800
  questionsAnswered: number;
  correctAnswers: number;
  streak: number;
  bestStreak: number;
  domainMastery: Record<string, { total: number; correct: number }>;
}

export interface UserProfile {
  username: string;
  pin: string;
  math: UserStats;
  readingWriting: UserStats;
  history: AttemptHistory[];
  lastActive: string;
}

export interface AttemptHistory {
  questionId: string;
  section: SectionType;
  domain: string;
  difficultyRating: number;
  userAnswer: QuestionOptionId;
  correctAnswer: QuestionOptionId;
  isCorrect: boolean;
  ratingBefore: number;
  ratingAfter: number;
  scoreBefore: number;
  scoreAfter: number;
  timestamp: string;
}
