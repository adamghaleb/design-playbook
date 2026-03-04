import Link from "next/link";
import type { Practice } from "@/lib/types";
import { ScoreDots } from "./score-dots";
import { Badge } from "./badge";
import { getCategoryColor } from "@/lib/data";

interface PracticeCardProps {
  practice: Practice;
  showCategory?: boolean;
}

export function PracticeCard({
  practice,
  showCategory = false,
}: PracticeCardProps) {
  const color = getCategoryColor(practice.category);

  return (
    <Link
      href={`/practice/${practice.id}`}
      className="group block rounded-xl border border-border bg-card p-5 transition-all hover:border-zinc-600 hover:bg-accent"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[11px] text-muted-foreground">
          {practice.id}
        </span>
        <ScoreDots score={practice.practicalityScore} size="sm" />
      </div>
      <h3 className="mb-2 text-sm font-semibold leading-snug text-foreground group-hover:text-white">
        {practice.title}
      </h3>
      {practice.context && (
        <p className="mb-3 text-xs leading-relaxed text-muted-foreground line-clamp-2">
          {practice.context}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-1.5">
        {showCategory && <Badge color={color}>{practice.category}</Badge>}
        {practice.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>
    </Link>
  );
}
