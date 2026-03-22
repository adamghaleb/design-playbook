"use client";

import { motion } from "framer-motion";
import { CategoryCard } from "./category-card";
import { MasonryGrid } from "./masonry-grid";
import { BookOpen, Layers, Tag, TrendingUp, FileText } from "lucide-react";
import type { Section } from "@/lib/types";

interface HomeContentProps {
  sections: Section[];
  stats: {
    totalPractices: number;
    totalCategories: number;
    totalTags: number;
    avgScore: number;
  };
  basePath?: string;
  playbookName?: string;
  colorsLight?: Record<string, string>;
  hasResearch?: boolean;
  totalArticles?: number;
}

const ease = [0.25, 0.1, 0.25, 1] as const;

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.04 },
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
};

const statIcons = [
  { icon: BookOpen },
  { icon: Layers },
  { icon: Tag },
  { icon: TrendingUp },
  { icon: FileText },
];

export function HomeContent({
  sections,
  stats,
  basePath = "/",
  playbookName = "Design / Playbook",
  colorsLight = {},
  hasResearch,
  totalArticles,
}: HomeContentProps) {
  // Split playbookName for the hero title styling
  // If the name contains " / ", use that as the separator
  // Otherwise split on space and put " / " between first and rest
  const titleParts = playbookName.includes(" / ")
    ? playbookName.split(" / ")
    : (() => {
        const words = playbookName.split(" ");
        if (words.length >= 2) {
          return [words[0], words.slice(1).join(" ")];
        }
        return [playbookName];
      })();

  const statEntries = [
    { label: "Practices", value: stats.totalPractices },
    { label: "Categories", value: stats.totalCategories },
    { label: "Tags", value: stats.totalTags },
    { label: "Avg Score", value: stats.avgScore },
    ...(hasResearch && totalArticles
      ? [{ label: "Articles", value: totalArticles }]
      : []),
  ];

  return (
    <div>
      {/* Hero */}
      <motion.div
        className="relative mb-28 pt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease }}
      >
        <div className="hero-gradient absolute -inset-8 -z-10" />
        <motion.h1
          className="mb-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease }}
        >
          {titleParts.length >= 2 ? (
            <>
              <span className="text-foreground">{titleParts[0]}</span>
              <span className="text-primary"> / </span>
              <span className="text-foreground">{titleParts[1]}</span>
            </>
          ) : (
            <span className="text-foreground">{titleParts[0]}</span>
          )}
        </motion.h1>
        <motion.p
          className="max-w-2xl text-lg leading-relaxed text-muted-foreground"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease }}
        >
          <span className="font-mono text-sm text-primary">
            {stats.totalPractices}
          </span>{" "}
          UX &amp; product design practices across{" "}
          <span className="font-mono text-sm text-primary">
            {stats.totalCategories}
          </span>{" "}
          categories. Research-backed principles for building better products.
        </motion.p>
      </motion.div>

      {/* Stats */}
      <motion.div
        className={`mb-24 grid grid-cols-2 gap-6 ${statEntries.length > 4 ? "sm:grid-cols-5" : "sm:grid-cols-4"}`}
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {statEntries.map((stat, i) => {
          const Icon = statIcons[i % statIcons.length].icon;
          return (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="noise relative overflow-hidden rounded-md border border-border-subtle bg-surface-1 p-8 card-elevated"
            >
              <div className="relative z-10 mb-2 flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" />
                <span className="text-sm tracking-wide uppercase text-muted-foreground">
                  {stat.label}
                </span>
              </div>
              <div className="relative z-10 font-serif text-2xl font-medium">
                {stat.value}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Category grid by section */}
      {sections.map((section) => (
        <motion.div
          key={section.name}
          className="mb-24"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1, ease }}
        >
          <div className="mb-6 flex items-center gap-4">
            <h2 className="font-serif text-xl font-medium text-foreground">
              {section.name}
            </h2>
            <div className="section-line flex-1" />
          </div>
          <MasonryGrid columns={{ sm: 2, lg: 3 }}>
            {section.categories.map((cat, i) => (
              <CategoryCard
                key={cat.slug}
                category={cat}
                featured={i === 0}
                basePath={basePath}
                colorsLight={colorsLight}
              />
            ))}
          </MasonryGrid>
        </motion.div>
      ))}
    </div>
  );
}
