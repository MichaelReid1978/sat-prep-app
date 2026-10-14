"use client";

import React from "react";
import { UserStats } from "@/types/sat";
import { getSatPercentile, getSectionPercentile } from "@/lib/scoring";
import { Flame, Target, Award, Users } from "lucide-react";

interface HeaderStatsProps {
  username: string;
  displayName?: string;
  mathStats: UserStats;
  rwStats: UserStats;
  onLogout: () => void;
}

export function HeaderStats({ username, displayName, mathStats, rwStats, onLogout }: HeaderStatsProps) {
  const totalScore = mathStats.scoreEstimate + rwStats.scoreEstimate;
  const currentStreak = Math.max(mathStats.streak, rwStats.streak);
  const totalPercentile = getSatPercentile(totalScore);
  const mathPercentile = getSectionPercentile("math", mathStats.scoreEstimate);
  const rwPercentile = getSectionPercentile("reading_writing", rwStats.scoreEstimate);

  const shownName = displayName || username;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90 shadow-sm">
      <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white font-black text-sm shadow-sm">
            {shownName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Student
            </span>
            <span className="block text-sm font-black text-zinc-950 dark:text-white leading-none capitalize">
              {shownName}
            </span>
          </div>
        </div>

        {/* Total Score & Percentile Badge */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Est. SAT
              </span>
              <span
                className="inline-flex items-center gap-0.5 rounded-md bg-indigo-50 px-1.5 py-0.5 text-[10px] font-extrabold text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80"
                title={`${totalPercentile.formatted} percentile of SAT test writers (${totalPercentile.label})`}
              >
                <Users className="h-2.5 w-2.5" />
                <span>{totalPercentile.formatted} %ile</span>
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black tracking-tight text-indigo-600 dark:text-indigo-400">
                {totalScore}
              </span>
              <span className="text-[10px] text-zinc-500 font-bold dark:text-zinc-400">/ 1600</span>
            </div>
          </div>

          {currentStreak > 0 && (
            <div
              className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-black text-amber-600 dark:bg-amber-400/10 dark:text-amber-400"
              title={`${currentStreak} question streak`}
            >
              <Flame className="h-3.5 w-3.5 fill-current" />
              <span>{currentStreak}</span>
            </div>
          )}

          <button
            onClick={onLogout}
            className="rounded-lg border border-zinc-200 px-2 py-1 text-[11px] font-bold text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white transition"
            title="Switch Student Profile"
          >
            Switch
          </button>
        </div>
      </div>

      {/* Writers Percentile Summary Bar */}
      <div className="mx-auto flex max-w-lg items-center justify-between border-t border-zinc-100 bg-zinc-50/70 px-4 py-1.5 text-[11px] dark:border-zinc-800/70 dark:bg-zinc-900/40">
        <span className="font-semibold text-zinc-700 dark:text-zinc-300">
          Rank:{" "}
          <strong className="text-indigo-600 dark:text-indigo-400 font-bold">
            {totalPercentile.formatted} Percentile
          </strong>{" "}
          of test writers
        </span>
        <span className="font-bold text-emerald-600 dark:text-emerald-400">
          {totalPercentile.label}
        </span>
      </div>

      {/* Section Score Breakdown Pills */}
      <div className="mx-auto flex max-w-lg justify-between border-t border-zinc-200/60 px-4 py-1.5 text-xs font-semibold dark:border-zinc-800/60">
        <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
          <Target className="h-3.5 w-3.5 text-sky-500 shrink-0" />
          <span>Math:</span>
          <span className="font-black text-zinc-950 dark:text-white">{mathStats.scoreEstimate}</span>
          <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
            ({mathPercentile.formatted} %ile • {mathStats.questionsAnswered} done)
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
          <Award className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
          <span>R&W:</span>
          <span className="font-black text-zinc-950 dark:text-white">{rwStats.scoreEstimate}</span>
          <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
            ({rwPercentile.formatted} %ile • {rwStats.questionsAnswered} done)
          </span>
        </div>
      </div>
    </header>
  );
}
