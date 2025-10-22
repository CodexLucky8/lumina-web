export const SCORE_MIN = 10;
export const SCORE_MAX = 50;

export type StressLevel =
  | "Excellent"
  | "Strong"
  | "Good"
  | "Promising"
  | "Developing"
  | "Needs Support";

export type StressResult = {
  score: number;
  level: StressLevel;
  timestamp: number;
};

const LEVELS: Array<{ level: StressLevel; min: number; max: number }> = (() => {
  const step = (SCORE_MAX - SCORE_MIN + 1) / 6;
  return [
    "Excellent",
    "Strong",
    "Good",
    "Promising",
    "Developing",
    "Needs Support"
  ].map((level, index) => {
    const min = Math.round(SCORE_MIN + step * index);
    const max = Math.round(min + step - 1);
    return {
      level: level as StressLevel,
      min: index === 0 ? SCORE_MIN : min,
      max: index === 5 ? SCORE_MAX : max
    };
  });
})();

const SUGGESTIONS: Record<StressLevel, string[]> = {
  Excellent: [
    "Celebrate the habits that keep you grounded.",
    "Share your techniques with a teammate who could use them.",
    "Schedule a mini-retreat or mindful moment as a reward."
  ],
  Strong: [
    "Keep a gratitude list at the end of each week.",
    "Book a walking 1:1 instead of another video call.",
    "Continue leveraging short breathing resets before big tasks."
  ],
  Good: [
    "Identify one stress trigger and plan a calming ritual around it.",
    "Block 15-minute focus windows without notifications.",
    "Check in with a teammate for mutual accountability."
  ],
  Promising: [
    "Experiment with a guided meditation during lunch.",
    "Review your workload with a manager to rebalance priorities.",
    "Use Lumina+ prompts to unwind after work."
  ],
  Developing: [
    "Take a restorative break away from screens today.",
    "Schedule a therapy consultation to explore support options.",
    "List three tasks you can delegate or defer this week."
  ],
  "Needs Support": [
    "Reach out to a trusted colleague or friend for real-time support.",
    "Book a Lumina therapist session as soon as possible.",
    "Create a simple plan with your manager to reduce immediate pressure."
  ]
};

export function determineStressLevel(score: number): StressLevel {
  const normalized = Math.min(Math.max(score, SCORE_MIN), SCORE_MAX);
  const match = LEVELS.find((level) => normalized <= level.max);
  return match?.level ?? "Needs Support";
}

export function getLevelRange(level: StressLevel) {
  const match = LEVELS.find((entry) => entry.level === level);
  return match ? { min: match.min, max: match.max } : null;
}

export function getSuggestions(level: StressLevel) {
  return SUGGESTIONS[level];
}
