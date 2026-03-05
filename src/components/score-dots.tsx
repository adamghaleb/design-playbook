"use client";

import { motion } from "framer-motion";

interface ScoreDotsProps {
  score: number;
  size?: "sm" | "md";
}

const dotColors: Record<number, { bg: string; glow: string }> = {
  1: {
    bg: "bg-[#C49080]",
    glow: "shadow-[0_0_6px_rgba(196,144,128,0.3)]",
  },
  2: {
    bg: "bg-[#C4A078]",
    glow: "shadow-[0_0_6px_rgba(196,160,120,0.3)]",
  },
  3: {
    bg: "bg-[#B8A882]",
    glow: "shadow-[0_0_6px_rgba(184,168,130,0.3)]",
  },
  4: {
    bg: "bg-[#8AAB90]",
    glow: "shadow-[0_0_6px_rgba(138,171,144,0.3)]",
  },
  5: {
    bg: "bg-[#7AA898]",
    glow: "shadow-[0_0_6px_rgba(122,168,152,0.3)]",
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
              filled ? `${color!.bg} ${color!.glow}` : "bg-surface-3"
            }`}
          />
        );
      })}
    </div>
  );
}
