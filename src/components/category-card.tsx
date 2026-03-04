"use client";

import Link from "next/link";
import type { Category } from "@/lib/types";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryCardProps {
  category: Category;
}

const ease = [0.25, 0.1, 0.25, 1] as const;

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.15, ease }}>
      <Link
        href={`/category/${category.slug}`}
        className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border-subtle bg-surface-1 p-7 transition-all duration-200 hover:border-border-hover card-elevated hover:card-elevated-hover noise"
        style={{ "--cat-color": `${category.color}12` } as React.CSSProperties}
      >
        {/* Top gradient accent bar */}
        <div
          className="absolute inset-x-0 top-0 h-[2px]"
          style={{
            background: `linear-gradient(to right, transparent, ${category.color}, transparent)`,
          }}
        />

        {/* Hover glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${category.color}12 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10">
          <div className="mb-3 flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full transition-shadow duration-200 group-hover:shadow-[0_0_8px_var(--cat-color)]"
              style={
                {
                  backgroundColor: category.color,
                  "--cat-color": category.color,
                } as React.CSSProperties
              }
            />
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {category.section}
            </span>
          </div>
          <h3 className="text-sm font-semibold leading-tight text-foreground">
            {category.name}
          </h3>
        </div>
        <div className="relative z-10 mt-5 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {category.count} practices
          </span>
          <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      </Link>
    </motion.div>
  );
}
