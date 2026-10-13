"use client";

import React, { useState } from "react";
import { UserProfile } from "@/types/sat";
import { loginOrRegister } from "@/lib/storage";
import { Sparkles, Shield, User } from "lucide-react";

interface LoginModalProps {
  onSuccess: (profile: UserProfile) => void;
}

export function LoginModal({ onSuccess }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !pin.trim()) {
      setError("Please enter your name and a 4-digit PIN.");
      return;
    }

    if (pin.length < 4) {
      setError("PIN must be at least 4 digits.");
      return;
    }

    const result = loginOrRegister(username, pin);
    if (!result) {
      setError("Incorrect PIN for this username. Please try again.");
      return;
    }

    setError(null);
    onSuccess(result.profile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400 mb-3">
            <Sparkles className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            SAT Prep Adaptive
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Enter your name & PIN to sync your practice history & SAT score.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
              Your Name / Nickname
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. Mike"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 pl-10 pr-4 text-sm font-medium text-zinc-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                autoComplete="off"
                autoFocus
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
              4-Digit PIN
            </label>
            <div className="relative">
              <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="password"
                inputMode="numeric"
                maxLength={8}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 pl-10 pr-4 text-sm font-medium tracking-widest text-zinc-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </div>
          </div>

          {error && (
            <p className="rounded-lg bg-rose-500/10 p-2.5 text-xs font-medium text-rose-600 dark:text-rose-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition active:scale-[0.98] hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            Start Practicing
          </button>
        </form>
      </div>
    </div>
  );
}
