import type { StressResult } from "@/lib/score";

const RESULTS_KEY = "lumina-stress-results";

type StoredResults = StressResult[];

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function readResults(): StoredResults {
  if (!isBrowser()) {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(RESULTS_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    return parsed as StoredResults;
  } catch (error) {
    console.warn("Failed to read stored results", error);
    return [];
  }
}

export function writeResult(result: StressResult) {
  if (!isBrowser()) {
    return;
  }

  const existing = readResults();
  const next = [result, ...existing].slice(0, 50);
  try {
    window.localStorage.setItem(RESULTS_KEY, JSON.stringify(next));
  } catch (error) {
    console.warn("Failed to persist stress result", error);
  }
}
