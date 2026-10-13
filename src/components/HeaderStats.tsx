"use client";

import React from "react";
import { UserStats } from "@/types/sat";
import { Flame, Target, Award } from "lucide-react";

interface HeaderStatsProps {
  username: string;
  mathStats: UserStats;
  rwStats: UserStats;
  onLogout: () => void;
}

export function HeaderStats({ username, mathStats, rwStats, onLogout }: HeaderStatsProps) {
  const totalScore = mathStats.scoreEstimate + rwStats.scoreEstimate;
  const currentStreak = Math.max(mathStats.streak, rwStats.streak);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-900/80">
      <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white font-bold text-sm shadow-sm">
            {username.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <span className="block text-xs font-medium text-zinc-400 capitalize">Student</span>
            <span className="block text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-none capitalize">
              {username}
            </span>
          </div>
        </div>

        {/* Total Score Badge */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              Est. SAT
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400">
                {totalScore}
              </span>
              <span className="text-[10px] text-zinc-400 font-medium">/ 1600</span>
            </div>
          </div>

          {currentStreak > 0 && (
            <div className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-600 dark:bg-amber-400/10 dark:text-amber-400">
              <Flame className="h-3.5 w-3.5 fill-current" />
              <span>{currentStreak}</span>
            </div>
          )}

          <button
            onClick={onLogout}
            className="ml-1 text-[11px] font-medium text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            title="Switch User"
          >
            Switch
          </button>
        </div>
      </div>

      {/* Section Score Breakdown Pills */}
      <div className="mx-auto flex max-w-lg justify-between border-t border-zinc-100 px-4 py-1.5 text-xs font-semibold dark:border-zinc-800/60">
        <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-300">
          <Target className="h-3.5 w-3.5 text-sky-500" />
          <span>Math:</span>
          <span className="font-bold text-zinc-900 dark:text-white">{mathStats.scoreEstimate}</span>
          <span className="text-[10px] text-zinc-400">({mathStats.questionsAnswered} done)</span>
        </div>

        <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-300">
          <Award className="h-3.5 w-3.5 text-emerald-500" />
          <span>Reading & Writing:</span>
          <span className="font-bold text-zinc-900 dark:text-white">{rwStats.scoreEstimate}</span>
          <span className="text-[10px] text-zinc-400">({rwStats.questionsAnswered} done)</span>
        </div>
      </div>
    </header>
  );
}
