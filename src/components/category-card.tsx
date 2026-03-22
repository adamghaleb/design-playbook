"use client";

import Link from "next/link";
import type { Category } from "@/lib/types";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryCardProps {
  category: Category;
  featured?: boolean;
  basePath?: string;
  colorsLight?: Record<string, string>;
}

const ease = [0.25, 0.1, 0.25, 1] as const;

export function CategoryCard({
  category,
  featured = false,
  basePath = "/",
  colorsLight = {},
}: CategoryCardProps) {
  const mutedColor = colorsLight[category.name] || category.color;

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.15, ease }}>
      <Link
        href={`${basePath}/category/${category.slug}`}
        className={`group relative flex flex-col justify-between overflow-hidden rounded-md border border-border-subtle bg-surface-1 transition-all duration-200 hover:border-border-hover card-elevated noise ${
          featured ? "p-10" : "p-8"
        }`}
        style={{ "--cat-color": `${mutedColor}12` } as React.CSSProperties}
      >
        {/* Hover glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-md opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{
            background: `radial-gradient(ellipse at 50% 100%, ${mutedColor}12 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10">
          <div className="mb-3 flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full transition-shadow duration-200 group-hover:shadow-[0_0_8px_var(--cat-color)]"
              style={
                {
                  backgroundColor: mutedColor,
                  "--cat-color": mutedColor,
                } as React.CSSProperties
              }
            />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {category.section}
            </span>
          </div>
          <h3
            className={`font-serif font-medium leading-tight text-foreground ${featured ? "text-xl" : "text-lg"}`}
          >
            {category.name}
          </h3>
          {featured && (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {category.count} curated practices
            </p>
          )}
        </div>
        <div className="relative z-10 mt-5 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {!featured && `${category.count} practices`}
          </span>
          <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>

        {/* Bottom gradient accent bar */}
        <div
          className="absolute inset-x-0 bottom-0 h-[2px]"
          style={{
            background: `linear-gradient(to right, transparent, ${mutedColor}, transparent)`,
          }}
        />
      </Link>
    </motion.div>
  );
}
