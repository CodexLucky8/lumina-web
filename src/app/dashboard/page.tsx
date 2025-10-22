"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import type { StressResult } from "@/lib/score";
import { determineStressLevel, getLevelRange } from "@/lib/score";
import { readResults } from "@/lib/storage";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Review your Lumina stress check history and track your wellbeing trends."
};

export default function DashboardPage() {
  const [results, setResults] = useState<StressResult[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    setResults(readResults());
  }, []);

  const sortedResults = useMemo(
    () => [...results].sort((a, b) => b.timestamp - a.timestamp),
    [results]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const width = canvas.width;
    const height = canvas.height;
    context.clearRect(0, 0, width, height);

    if (sortedResults.length === 0) {
      context.fillStyle = "rgba(58, 58, 58, 0.4)";
      context.font = "14px sans-serif";
      context.fillText("No data yet", 10, height / 2);
      return;
    }

    const scores = sortedResults.map((result) => result.score).reverse();
    const minScore = Math.min(...scores);
    const maxScore = Math.max(...scores);
    const range = Math.max(maxScore - minScore, 1);

    const padding = 20;
    const stepX = (width - padding * 2) / Math.max(scores.length - 1, 1);

    context.strokeStyle = "rgba(58, 58, 58, 0.2)";
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(padding, padding);
    context.lineTo(padding, height - padding);
    context.lineTo(width - padding, height - padding);
    context.stroke();

    context.strokeStyle = "#3A3A3A";
    context.fillStyle = "#F8E27A";
    context.lineWidth = 2;
    context.beginPath();

    scores.forEach((score, index) => {
      const x = padding + stepX * index;
      const y =
        height - padding - ((score - minScore) / range) * (height - padding * 2);
      if (index === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    });

    context.stroke();

    scores.forEach((score, index) => {
      const x = padding + stepX * index;
      const y =
        height - padding - ((score - minScore) / range) * (height - padding * 2);
      context.beginPath();
      context.arc(x, y, 4, 0, Math.PI * 2);
      context.fill();
    });
  }, [sortedResults]);

  const latest = sortedResults[0];
  const latestRange = latest ? getLevelRange(latest.level) : null;

  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-brand-charcoal">Your wellbeing trends</h1>
          <p className="text-brand-charcoal/70">
            Track assessment scores, spot shifts, and revisit helpful suggestions.
          </p>
        </div>
        <Button href="/assessments/stress-check">Run a new stress check</Button>
      </header>

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <Card title="Stress score trend" className="space-y-4">
          <canvas
            ref={canvasRef}
            aria-label="Stress score trend chart"
            role="img"
            width={600}
            height={240}
            className="w-full rounded-2xl border border-brand-charcoal/10 bg-white"
          />
          <p className="text-xs text-brand-charcoal/60">
            Scores are plotted from oldest to newest to show your change over time.
          </p>
        </Card>

        <Card title="Latest result" className="space-y-4">
          {latest ? (
            <div className="space-y-3 text-sm">
              <p className="text-2xl font-semibold text-brand-charcoal">{latest.score}</p>
              <p className="text-brand-charcoal/70">{latest.level}</p>
              <p className="text-xs text-brand-charcoal/60">
                Recorded {new Date(latest.timestamp).toLocaleString()}
              </p>
              {latestRange && (
                <p className="text-xs text-brand-charcoal/60">
                  Typical range: {latestRange.min} – {latestRange.max}
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-brand-charcoal/70">
              You haven't saved any assessments yet. Complete the stress check to view your history.
            </p>
          )}
        </Card>
      </div>

      <Card title="Assessment history" className="space-y-4">
        {sortedResults.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-brand-charcoal/10 text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-brand-charcoal/60">
                <tr>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Score</th>
                  <th className="px-4 py-2">Level</th>
                </tr>
              </thead>
              <tbody>
                {sortedResults.map((result) => (
                  <tr key={result.timestamp} className="odd:bg-brand-sunshine/20">
                    <td className="px-4 py-2 text-brand-charcoal/80">
                      {new Date(result.timestamp).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 font-medium text-brand-charcoal">{result.score}</td>
                    <td className="px-4 py-2 text-brand-charcoal/70">
                      {result.level ?? determineStressLevel(result.score)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-brand-charcoal/70">
            Once you complete the stress check, your history will appear here with gentle trends.
          </p>
        )}
      </Card>
    </div>
  );
}
