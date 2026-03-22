"use client";

import { PracticeCard } from "./practice-card";
import { MasonryGrid } from "./masonry-grid";
import type { Practice } from "@/lib/types";

interface PracticeGridProps {
  practices: Practice[];
  showCategory?: boolean;
  basePath?: string;
}

export function PracticeGrid({
  practices,
  showCategory = false,
  basePath,
}: PracticeGridProps) {
  return (
    <MasonryGrid columns={{ sm: 2 }}>
      {practices.map((p) => (
        <PracticeCard
          key={p.id}
          practice={p}
          showCategory={showCategory}
          basePath={basePath}
        />
      ))}
    </MasonryGrid>
  );
}
