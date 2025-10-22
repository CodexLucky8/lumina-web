"use client";

import { useMemo, useState } from "react";
import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import {
  determineStressLevel,
  getSuggestions,
  SCORE_MAX,
  SCORE_MIN,
  type StressLevel
} from "@/lib/score";
import { writeResult } from "@/lib/storage";

export const metadata: Metadata = {
  title: "Stress Check Assessment",
  description:
    "Complete Lumina's 10-question Likert assessment to understand your stress level and receive caring suggestions."
};

const QUESTIONS = [
  "I feel calm and balanced throughout the workday.",
  "I can disconnect from work communications after hours.",
  "I feel supported by my teammates when challenges arise.",
  "I have the tools to manage unexpected stressors.",
  "I take meaningful breaks that help me reset.",
  "I can focus on one task without constant interruption.",
  "I feel aligned with my workload and priorities.",
  "I have energy left for life outside of work.",
  "I can share how I'm feeling with someone I trust.",
  "I feel optimistic about the week ahead."
];

const LIKERT_OPTIONS = [
  { value: 1, label: "Rarely" },
  { value: 2, label: "Occasionally" },
  { value: 3, label: "Sometimes" },
  { value: 4, label: "Often" },
  { value: 5, label: "Always" }
];

type FormState = number[];

export default function StressCheckPage() {
  const [responses, setResponses] = useState<FormState>(Array(QUESTIONS.length).fill(0));
  const [submittedLevel, setSubmittedLevel] = useState<StressLevel | null>(null);
  const [submittedScore, setSubmittedScore] = useState<number | null>(null);

  const score = useMemo(
    () =>
      responses.reduce((total, value) => {
        return total + (value || 0);
      }, 0),
    [responses]
  );

  const isComplete = responses.every((response) => response > 0);
  const remaining = QUESTIONS.length - responses.filter(Boolean).length;

  const handleChange = (questionIndex: number, value: number) => {
    setResponses((prev) => {
      const next = [...prev];
      next[questionIndex] = value;
      return next;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isComplete) return;
    const level = determineStressLevel(score);
    setSubmittedLevel(level);
    setSubmittedScore(score);
    writeResult({
      score,
      level,
      timestamp: Date.now()
    });
  };

  const suggestions = submittedLevel ? getSuggestions(submittedLevel) : [];

  return (
    <div className="space-y-12">
      <div className="space-y-4 text-center md:text-left">
        <h1 className="text-3xl font-semibold text-brand-charcoal">Stress Check</h1>
        <p className="text-brand-charcoal/70">
          Respond to each statement based on the past two weeks. Select the option that best reflects how frequently the statement has been true for you.
        </p>
        <p className="text-xs uppercase tracking-wide text-brand-charcoal/50">
          Score range {SCORE_MIN} – {SCORE_MAX}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {QUESTIONS.map((question, index) => (
          <Card key={question} className="space-y-4" title={`Question ${index + 1}`}>
            <p>{question}</p>
            <div className="grid gap-2 sm:grid-cols-5">
              {LIKERT_OPTIONS.map((option) => {
                const isActive = responses[index] === option.value;
                return (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer flex-col items-center rounded-2xl border p-3 text-center text-sm transition ${
                      isActive
                        ? "border-brand-charcoal bg-brand-sunshine/70"
                        : "border-brand-charcoal/10 bg-white hover:border-brand-charcoal/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option.value}
                      checked={isActive}
                      onChange={() => handleChange(index, option.value)}
                      className="sr-only"
                    />
                    <span className="text-lg font-semibold">{option.value}</span>
                    <span className="mt-1 text-xs text-brand-charcoal/70">{option.label}</span>
                  </label>
                );
              })}
            </div>
          </Card>
        ))}

        <div className="flex flex-col gap-4 rounded-3xl bg-white/80 p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 text-sm text-brand-charcoal/80">
            <p>
              {isComplete
                ? "You're ready to see your personalized recommendations."
                : `Answer ${remaining} more ${remaining === 1 ? "question" : "questions"} to unlock your insights.`}
            </p>
            <p className="text-xs text-brand-charcoal/60">Current total: {score}</p>
          </div>
          <Button type="submit" disabled={!isComplete} className={!isComplete ? "opacity-60" : undefined}>
            Reveal my stress level
          </Button>
        </div>
      </form>

      {submittedLevel && submittedScore !== null && (
        <Card
          title={`Your stress level: ${submittedLevel}`}
          description={`Total score ${submittedScore}`}
          className="bg-brand-sunshine/40"
        >
          <p className="text-sm text-brand-charcoal/80">
            These caring nudges can help you move forward with intention:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm text-brand-charcoal/90">
            {suggestions.map((suggestion) => (
              <li key={suggestion}>{suggestion}</li>
            ))}
          </ul>
          <p className="text-xs text-brand-charcoal/60">
            Your results are stored locally on this device so you can revisit them on the dashboard.
          </p>
        </Card>
      )}
    </div>
  );
}
