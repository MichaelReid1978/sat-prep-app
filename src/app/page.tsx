"use client";

import React, { useState, useEffect, useCallback } from "react";
import { UserProfile, SectionType, Question, QuestionOptionId } from "@/types/sat";
import { getStoredProfiles, getActiveUsername, setActiveUsername, saveUserProfile } from "@/lib/storage";
import { selectAdaptiveQuestion } from "@/lib/questionSelector";
import { calculateUpdatedStats } from "@/lib/scoring";
import { HeaderStats } from "@/components/HeaderStats";
import { SectionSelector } from "@/components/SectionSelector";
import { QuestionCard } from "@/components/QuestionCard";
import { LoginModal } from "@/components/LoginModal";
import confetti from "canvas-confetti";

export default function Home() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState<SectionType>("reading_writing");
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<QuestionOptionId | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ratingDelta, setRatingDelta] = useState<number | null>(null);
  const [scoreDelta, setScoreDelta] = useState<number | null>(null);

  // Initialize and load active user
  useEffect(() => {
    const activeUsername = getActiveUsername();
    if (activeUsername) {
      const profiles = getStoredProfiles();
      const existing = profiles[activeUsername];
      if (existing) {
        setProfile(existing);
      }
    }
    setLoading(false);
  }, []);

  // Fetch adaptive question based on section and rating
  const loadNextQuestion = useCallback(
    (targetSection: SectionType, activeProfile: UserProfile) => {
      const stats = targetSection === "math" ? activeProfile.math : activeProfile.readingWriting;
      const historyIds = activeProfile.history
        .filter((h) => h.section === targetSection)
        .map((h) => h.questionId);

      const nextQ = selectAdaptiveQuestion(targetSection, stats.rating, historyIds);
      setCurrentQuestion(nextQ);
      setSelectedOption(null);
      setIsSubmitted(false);
      setRatingDelta(null);
      setScoreDelta(null);
    },
    []
  );

  // When profile or section changes, load appropriate question
  useEffect(() => {
    if (profile && !currentQuestion) {
      loadNextQuestion(currentSection, profile);
    }
  }, [profile, currentSection, currentQuestion, loadNextQuestion]);

  const handleSwitchSection = (section: SectionType) => {
    if (!profile || isSubmitted) return;
    setCurrentSection(section);
    loadNextQuestion(section, profile);
  };

  const handleSelectOption = (optionId: QuestionOptionId) => {
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    if (!profile || !currentQuestion || !selectedOption || isSubmitted) return;

    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    const currentStats = currentSection === "math" ? profile.math : profile.readingWriting;

    const { updatedStats, ratingDelta: rDelta, scoreDelta: sDelta } = calculateUpdatedStats(
      currentStats,
      currentQuestion.difficultyRating,
      isCorrect,
      currentQuestion.domain
    );

    // Confetti effect if correct!
    if (isCorrect) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    }

    const updatedProfile: UserProfile = {
      ...profile,
      [currentSection === "math" ? "math" : "readingWriting"]: updatedStats,
      history: [
        {
          questionId: currentQuestion.id,
          section: currentSection,
          domain: currentQuestion.domain,
          difficultyRating: currentQuestion.difficultyRating,
          userAnswer: selectedOption,
          correctAnswer: currentQuestion.correctAnswer,
          isCorrect,
          ratingBefore: currentStats.rating,
          ratingAfter: updatedStats.rating,
          scoreBefore: currentStats.scoreEstimate,
          scoreAfter: updatedStats.scoreEstimate,
          timestamp: new Date().toISOString(),
        },
        ...profile.history,
      ],
    };

    saveUserProfile(updatedProfile);
    setProfile(updatedProfile);
    setIsSubmitted(true);
    setRatingDelta(rDelta);
    setScoreDelta(sDelta);
  };

  const handleNext = () => {
    if (!profile) return;
    loadNextQuestion(currentSection, profile);
  };

  const handleLogout = () => {
    setActiveUsername(null);
    setProfile(null);
    setCurrentQuestion(null);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans selection:bg-indigo-500 selection:text-white">
      {!profile && <LoginModal onSuccess={(p) => setProfile(p)} />}

      {profile && (
        <>
          <HeaderStats
            username={profile.username}
            mathStats={profile.math}
            rwStats={profile.readingWriting}
            onLogout={handleLogout}
          />

          <main className="mx-auto max-w-lg">
            <SectionSelector
              currentSection={currentSection}
              onSelect={handleSwitchSection}
              disabled={isSubmitted}
            />

            {currentQuestion ? (
              <QuestionCard
                question={currentQuestion}
                selectedOption={selectedOption}
                isSubmitted={isSubmitted}
                onSelectOption={handleSelectOption}
                onSubmit={handleSubmit}
                onNext={handleNext}
                ratingDelta={ratingDelta}
                scoreDelta={scoreDelta}
              />
            ) : (
              <div className="p-8 text-center text-sm text-zinc-500">Loading next question...</div>
            )}
          </main>
        </>
      )}
    </div>
  );
}
