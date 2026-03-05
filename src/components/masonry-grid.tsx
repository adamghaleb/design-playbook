"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface MasonryGridProps {
  children: ReactNode[];
  columns?: { sm: number; lg?: number };
}

const ease = [0.25, 0.1, 0.25, 1] as const;

export function MasonryGrid({
  children,
  columns = { sm: 2 },
}: MasonryGridProps) {
  const items = children.filter(Boolean);
  const colCount = columns.lg ?? columns.sm;

  // Distribute items round-robin into columns
  const cols: { node: ReactNode; index: number }[][] = Array.from(
    { length: colCount },
    () => [],
  );
  items.forEach((child, i) => {
    cols[i % colCount].push({ node: child, index: i });
  });

  return (
    <div
      className={`grid gap-6 ${
        colCount === 3
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2"
      }`}
      style={{ alignItems: "start" }}
    >
      {cols.map((col, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-6">
          {col.map(({ node, index }) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.06,
                ease,
              }}
            >
              {node}
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
}
