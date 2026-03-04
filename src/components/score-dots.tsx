interface ScoreDotsProps {
  score: number;
  size?: "sm" | "md";
}

export function ScoreDots({ score, size = "md" }: ScoreDotsProps) {
  const dotSize = size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2";
  return (
    <div className="flex items-center gap-1" title={`Practicality: ${score}/5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`rounded-full ${dotSize} ${
            i <= score ? "bg-emerald-400" : "bg-zinc-700"
          }`}
        />
      ))}
    </div>
  );
}
