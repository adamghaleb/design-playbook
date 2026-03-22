"use client";

import Link from "next/link";
import type { Practice } from "@/lib/types";
import { ScoreDots } from "./score-dots";
import { Badge } from "./badge";
import { motion } from "framer-motion";

interface PracticeCardProps {
  practice: Practice;
  showCategory?: boolean;
  basePath?: string;
  color?: string;
}

const ease = [0.25, 0.1, 0.25, 1] as const;

export function PracticeCard({
  practice,
  showCategory = false,
  basePath = "/",
  color = "#8185B5",
}: PracticeCardProps) {
  return (
    <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.15, ease }}>
      <Link
        href={`${basePath}/practice/${practice.id}`}
        className="group relative block overflow-hidden rounded-md border border-border-subtle bg-surface-1 p-8 pl-10 transition-all duration-200 hover:border-border-hover card-elevated"
      >
        {/* Left color strip */}
        <div
          className="absolute left-0 top-5 bottom-5 w-[3px] rounded-full opacity-40 transition-opacity duration-200 group-hover:opacity-80"
          style={{ backgroundColor: color }}
        />

        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-xs text-muted-foreground">
            {practice.id}
          </span>
          <ScoreDots score={practice.practicalityScore} size="sm" />
        </div>
        <h3 className="mb-3 font-serif text-lg font-medium leading-snug text-foreground group-hover:text-foreground">
          {practice.title}
        </h3>
        {practice.context && (
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
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
    </motion.div>
  );
}
