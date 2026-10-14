"use client";

import React, { useState, useEffect } from "react";
import { UserProfile } from "@/types/sat";
import { loginOrRegister, getAllProfilesList } from "@/lib/storage";
import { getSatPercentile } from "@/lib/scoring";
import { Sparkles, Shield, User, ArrowRight, UserCheck } from "lucide-react";

interface LoginModalProps {
  onSuccess: (profile: UserProfile) => void;
}

export function LoginModal({ onSuccess }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [savedProfiles, setSavedProfiles] = useState<UserProfile[]>([]);
  const [selectedSavedUser, setSelectedSavedUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const list = getAllProfilesList();
    setSavedProfiles(list);
    if (list.length === 1) {
      // Pre-select if there's only 1 profile on the device
      setUsername(list[0].displayName || list[0].username);
    }
  }, []);

  const handleSelectSaved = (saved: UserProfile) => {
    setSelectedSavedUser(saved);
    setUsername(saved.displayName || saved.username);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter your name or nickname.");
      return;
    }

    if (!pin.trim()) {
      setError("Please enter your 4-digit PIN.");
      return;
    }

    const result = loginOrRegister(username, pin);
    if (!result.success) {
      setError(result.error);
      return;
    }

    setError(null);
    onSuccess(result.profile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Icon & Title */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 mb-2.5">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-white">
            SAT Prep Adaptive
          </h2>
          <p className="mt-1 text-xs font-semibold text-zinc-600 dark:text-zinc-300">
            Practice adapts to your level and tracks your percentile among SAT test writers.
          </p>
        </div>

        {/* Saved Profiles Shortcut (Prevents Accidental Reset) */}
        {savedProfiles.length > 0 && (
          <div className="mt-5 space-y-2 border-b border-zinc-200 pb-4 dark:border-zinc-800">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Saved Profiles on this Device
            </span>
            <div className="space-y-1.5 max-h-36 overflow-y-auto">
              {savedProfiles.map((p) => {
                const totalScore = p.math.scoreEstimate + p.readingWriting.scoreEstimate;
                const percentileInfo = getSatPercentile(totalScore);
                const isSelected = (selectedSavedUser?.username || username.toLowerCase()) === p.username.toLowerCase();

                return (
                  <button
                    key={p.username}
                    type="button"
                    onClick={() => handleSelectSaved(p)}
                    className={`flex w-full items-center justify-between rounded-xl p-2.5 text-left transition border ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50/90 dark:border-indigo-500 dark:bg-indigo-950/40"
                        : "border-zinc-200 bg-zinc-50 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800/60 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-xs uppercase">
                        {(p.displayName || p.username).slice(0, 2)}
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-zinc-900 dark:text-zinc-100 capitalize">
                          {p.displayName || p.username}
                        </span>
                        <span className="block text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
                          {p.history.length} questions practiced
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="block text-xs font-black text-indigo-600 dark:text-indigo-400">
                        {totalScore}
                      </span>
                      <span className="block text-[10px] font-semibold text-zinc-600 dark:text-zinc-300">
                        {percentileInfo.formatted} %ile
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 mb-1.5">
              Your Name / Nickname
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setSelectedSavedUser(null);
                }}
                placeholder="e.g. Mike"
                className="w-full rounded-xl border border-zinc-300 bg-zinc-50 py-3 pl-10 pr-4 text-sm font-semibold text-zinc-950 placeholder:text-zinc-400 outline-none transition focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 dark:focus:bg-zinc-800 dark:focus:border-indigo-400"
                autoComplete="off"
                autoFocus
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                4-Digit PIN
              </label>
              <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
                Secures your score
              </span>
            </div>
            <div className="relative">
              <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
              <input
                type="password"
                inputMode="numeric"
                maxLength={8}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                className="w-full rounded-xl border border-zinc-300 bg-zinc-50 py-3 pl-10 pr-4 text-sm font-bold tracking-widest text-zinc-950 placeholder:text-zinc-400 outline-none transition focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 dark:focus:bg-zinc-800 dark:focus:border-indigo-400"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-700 active:scale-[0.98] dark:bg-indigo-600 dark:hover:bg-indigo-500"
          >
            <span>{selectedSavedUser ? "Resume Practice" : "Start Practicing"}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
