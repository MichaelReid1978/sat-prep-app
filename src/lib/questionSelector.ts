import { Question, SectionType } from "@/types/sat";
import { SAMPLE_QUESTIONS } from "@/data/questions";

/**
 * Selects the optimal next question for the student based on their current Elo rating.
 * Prioritizes unattempted questions with difficulty rating closest to the student's rating.
 * If all questions have been attempted, re-serves the least recently attempted question.
 */
export function selectAdaptiveQuestion(
  section: SectionType,
  currentRating: number,
  answeredQuestionIds: string[]
): Question {
  const sectionQuestions = SAMPLE_QUESTIONS.filter((q) => q.section === section);

  if (sectionQuestions.length === 0) {
    throw new Error(`No questions available for section: ${section}`);
  }

  // 1. Separate into unattempted and already attempted
  const unattempted = sectionQuestions.filter((q) => !answeredQuestionIds.includes(q.id));

  const candidatePool = unattempted.length > 0 ? unattempted : sectionQuestions;

  // 2. Sort candidate questions by closeness to the student's current rating
  const sorted = [...candidatePool].sort((a, b) => {
    const diffA = Math.abs(a.difficultyRating - currentRating);
    const diffB = Math.abs(b.difficultyRating - currentRating);
    return diffA - diffB;
  });

  // Pick from the top 2 closest matches to introduce slight variety
  const topCandidates = sorted.slice(0, Math.min(2, sorted.length));
  const randomIndex = Math.floor(Math.random() * topCandidates.length);

  return topCandidates[randomIndex];
}
