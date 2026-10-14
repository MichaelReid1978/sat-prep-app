"use client";

import React, { useState } from "react";
import { Question, QuestionOptionId } from "@/types/sat";
import { MathText } from "@/components/MathText";
import { ChevronDown, ChevronUp, CheckCircle2, XCircle, ArrowRight, Lightbulb, Users } from "lucide-react";
import { getSatPercentile } from "@/lib/scoring";

interface QuestionCardProps {
  question: Question;
  selectedOption: QuestionOptionId | null;
  isSubmitted: boolean;
  onSelectOption: (optionId: QuestionOptionId) => void;
  onSubmit: () => void;
  onNext: () => void;
  ratingDelta: number | null;
  scoreDelta: number | null;
  totalScore?: number;
}

export function QuestionCard({
  question,
  selectedOption,
  isSubmitted,
  onSelectOption,
  onSubmit,
  onNext,
  scoreDelta,
  totalScore,
}: QuestionCardProps) {
  const [showPassage, setShowPassage] = useState(true);
  const isCorrect = selectedOption === question.correctAnswer;

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col px-4 pb-24">
      {/* Question Domain & Difficulty Pill */}
      <div className="flex items-center justify-between py-2 text-xs">
        <span className="rounded-lg bg-zinc-100 px-2.5 py-1 font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          {question.domain} • {question.subtopic}
        </span>
        <span className="font-medium text-zinc-400">
          Item Difficulty: {question.difficultyRating}
        </span>
      </div>

      {/* Reading Passage (if available) */}
      {question.passage && (
        <div className="mb-4 rounded-2xl border border-zinc-200 bg-amber-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-800/40">
          <button
            onClick={() => setShowPassage(!showPassage)}
            className="flex w-full items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400"
          >
            <span>Passage Excerpt</span>
            {showPassage ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {showPassage && (
            <p className="mt-2.5 text-sm leading-relaxed text-zinc-800 dark:text-zinc-200 font-serif">
              {question.passage}
            </p>
          )}
        </div>
      )}

      {/* Prompt / Question */}
      <div className="mb-5 rounded-2xl bg-white p-4 shadow-sm border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
        <h3 className="text-base font-semibold leading-relaxed text-zinc-900 dark:text-zinc-50">
          <MathText content={question.prompt} />
        </h3>
      </div>

      {/* Options A, B, C, D */}
      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedOption === option.id;
          const isAnswer = question.correctAnswer === option.id;

          let buttonClasses = "border-zinc-200 bg-white text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 hover:border-zinc-300";
          let badgeClasses = "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";

          if (isSubmitted) {
            if (isAnswer) {
              buttonClasses = "border-emerald-500 bg-emerald-50/70 text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-600 font-medium";
              badgeClasses = "bg-emerald-600 text-white";
            } else if (isSelected && !isCorrect) {
              buttonClasses = "border-rose-500 bg-rose-50/70 text-rose-950 dark:bg-rose-950/40 dark:text-rose-200 dark:border-rose-600";
              badgeClasses = "bg-rose-600 text-white";
            } else {
              buttonClasses = "opacity-50 border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900";
            }
          } else if (isSelected) {
            buttonClasses = "border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-600/30 text-indigo-950 dark:border-indigo-500 dark:bg-indigo-950/30 dark:text-indigo-200";
            badgeClasses = "bg-indigo-600 text-white";
          }

          return (
            <button
              key={option.id}
              onClick={() => !isSubmitted && onSelectOption(option.id)}
              disabled={isSubmitted}
              className={`flex w-full items-start gap-3.5 rounded-2xl border p-4 text-left transition active:scale-[0.99] ${buttonClasses}`}
            >
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${badgeClasses}`}>
                {option.id}
              </span>
              <span className="pt-0.5 text-sm leading-snug">
                <MathText content={option.text} />
              </span>
            </button>
          );
        })}
      </div>

      {/* Submit / Next Action Bar */}
      {!isSubmitted ? (
        <div className="mt-6">
          <button
            onClick={onSubmit}
            disabled={!selectedOption}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span>Submit Answer</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-300">
          {/* Outcome Result Card */}
          <div
            className={`flex items-center justify-between rounded-2xl p-4 ${
              isCorrect
                ? "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20"
                : "bg-rose-500/10 text-rose-800 dark:text-rose-300 border border-rose-500/20"
            }`}
          >
            <div className="flex items-center gap-2.5">
              {isCorrect ? (
                <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <XCircle className="h-6 w-6 text-rose-600 dark:text-rose-400" />
              )}
              <div>
                <h4 className="text-sm font-bold">
                  {isCorrect ? "Correct!" : `Incorrect (Correct: Option ${question.correctAnswer})`}
                </h4>
                <p className="text-xs opacity-80">
                  {isCorrect ? "Well done, keep up the momentum!" : "Review the breakdown below to master this concept."}
                </p>
              </div>
            </div>

            {scoreDelta !== null && scoreDelta !== 0 && (
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-black ${
                  scoreDelta > 0
                    ? "bg-emerald-600 text-white"
                    : "bg-rose-600 text-white"
                }`}
              >
                {scoreDelta > 0 ? `+${scoreDelta}` : scoreDelta} pts
              </span>
            )}
          </div>

          {/* Probable SAT Score & Writers Percentile Banner */}
          {totalScore !== undefined && (() => {
            const pInfo = getSatPercentile(totalScore);
            return (
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-indigo-100 bg-indigo-50/60 px-4 py-2.5 text-xs dark:border-indigo-900/40 dark:bg-indigo-950/30">
                <div className="flex items-center gap-1.5 font-bold text-zinc-800 dark:text-zinc-200">
                  <Users className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Probable SAT Score:</span>
                  <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">{totalScore}</span>
                  <span className="text-[10px] text-zinc-500 font-medium">/ 1600</span>
                </div>
                <div className="flex items-center gap-1.5 font-extrabold text-indigo-700 dark:text-indigo-300">
                  <span className="rounded-md bg-white px-2 py-0.5 text-[11px] shadow-sm dark:bg-zinc-800 border border-indigo-200 dark:border-indigo-800">
                    {pInfo.formatted} Percentile
                  </span>
                  <span className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium">
                    ({pInfo.label})
                  </span>
                </div>
              </div>
            );
          })()}

          {/* Explanation & Step-by-Step Breakdown */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
              <Lightbulb className="h-4 w-4" />
              <span>Explanation & Key Steps</span>
            </div>
            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 mb-3">
              <MathText content={question.explanation.summary} />
            </p>
            <div className="space-y-1.5 border-t border-zinc-100 pt-3 dark:border-zinc-800">
              {question.explanation.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  <span className="font-bold text-zinc-400">{idx + 1}.</span>
                  <span><MathText content={step} /></span>
                </div>
              ))}
            </div>

            {question.explanation.keyConcept && (
              <div className="mt-3 rounded-xl bg-indigo-50/70 p-3 text-xs text-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-300">
                <span className="font-bold">SAT Pro-Tip: </span>
                {question.explanation.keyConcept}
              </div>
            )}
          </div>

          {/* Next Question Button */}
          <button
            onClick={onNext}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-900 py-4 text-sm font-bold text-white shadow-lg transition active:scale-[0.98] hover:bg-zinc-800 dark:bg-indigo-600 dark:hover:bg-indigo-500"
          >
            <span>Next Question</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
