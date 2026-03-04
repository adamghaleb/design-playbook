"use client";

import { motion } from "framer-motion";

interface ScoreDotsProps {
  score: number;
  size?: "sm" | "md";
}

const dotColors: Record<number, { bg: string; glow: string }> = {
  1: { bg: "bg-red-400", glow: "shadow-[0_0_6px_rgba(248,113,113,0.4)]" },
  2: {
    bg: "bg-orange-400",
    glow: "shadow-[0_0_6px_rgba(251,146,60,0.4)]",
  },
  3: {
    bg: "bg-yellow-400",
    glow: "shadow-[0_0_6px_rgba(250,204,21,0.4)]",
  },
  4: { bg: "bg-green-400", glow: "shadow-[0_0_6px_rgba(74,222,128,0.4)]" },
  5: {
    bg: "bg-emerald-400",
    glow: "shadow-[0_0_6px_rgba(52,211,153,0.4)]",
  },
};

const ease = [0.25, 0.1, 0.25, 1] as const;

export function ScoreDots({ score, size = "md" }: ScoreDotsProps) {
  const dotSize = size === "sm" ? "h-2 w-2" : "h-2.5 w-2.5";
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`Practicality score: ${score} out of 5`}
      title={`Practicality: ${score}/5`}
    >
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = i <= score;
        const color = filled ? dotColors[i] : null;
        return (
          <motion.span
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, delay: i * 0.04, ease }}
            className={`rounded-full ${dotSize} ${
              filled ? `${color!.bg} ${color!.glow}` : "bg-zinc-700"
            }`}
          />
        );
      })}
    </div>
  );
}
