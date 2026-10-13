"use client";

import React from "react";
import { SectionType } from "@/types/sat";
import { Calculator, BookOpen } from "lucide-react";

interface SectionSelectorProps {
  currentSection: SectionType;
  onSelect: (section: SectionType) => void;
  disabled?: boolean;
}

export function SectionSelector({ currentSection, onSelect, disabled }: SectionSelectorProps) {
  return (
    <div className="mx-auto grid max-w-lg grid-cols-2 gap-2 p-3">
      <button
        onClick={() => onSelect("reading_writing")}
        disabled={disabled}
        className={`flex items-center justify-center gap-2 rounded-2xl py-3 px-4 text-xs font-bold transition active:scale-[0.98] ${
          currentSection === "reading_writing"
            ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
            : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <BookOpen className="h-4 w-4" />
        <span>Reading & Writing</span>
      </button>

      <button
        onClick={() => onSelect("math")}
        disabled={disabled}
        className={`flex items-center justify-center gap-2 rounded-2xl py-3 px-4 text-xs font-bold transition active:scale-[0.98] ${
          currentSection === "math"
            ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
            : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <Calculator className="h-4 w-4" />
        <span>Math</span>
      </button>
    </div>
  );
}
