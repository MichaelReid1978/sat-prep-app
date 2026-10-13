import { Question } from "@/types/sat";
import { MATH_QUESTIONS } from "./mathQuestions";
import { RW_QUESTIONS } from "./rwQuestions";

export const SAMPLE_QUESTIONS: Question[] = [
  ...MATH_QUESTIONS,
  ...RW_QUESTIONS,
];
