"use client";

import { motion } from "framer-motion";
import { CategoryCard } from "./category-card";
import { BookOpen, Layers, Tag, TrendingUp } from "lucide-react";
import type { Section } from "@/lib/types";

interface HomeContentProps {
  sections: Section[];
  stats: {
    totalPractices: number;
    totalCategories: number;
    totalTags: number;
    avgScore: number;
  };
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
  { icon: BookOpen, color: "text-indigo-400" },
  { icon: Layers, color: "text-violet-400" },
  { icon: Tag, color: "text-cyan-400" },
  { icon: TrendingUp, color: "text-emerald-400" },
];

export function HomeContent({ sections, stats }: HomeContentProps) {
  const statEntries = [
    { label: "Practices", value: stats.totalPractices },
    { label: "Categories", value: stats.totalCategories },
    { label: "Tags", value: stats.totalTags },
    { label: "Avg Score", value: stats.avgScore },
  ];

  return (
    <div>
      {/* Hero */}
      <motion.div
        className="relative mb-20 pt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease }}
      >
        <div className="hero-gradient absolute -inset-8 -z-10" />
        <motion.h1
          className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease }}
        >
          <span className="text-foreground">Design</span>
          <span className="text-primary"> / </span>
          <span className="text-foreground">Playbook</span>
        </motion.h1>
        <motion.p
          className="max-w-2xl text-base leading-relaxed text-muted-foreground"
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
        className="mb-20 grid grid-cols-2 gap-5 sm:grid-cols-4"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {statEntries.map((stat, i) => {
          const Icon = statIcons[i].icon;
          return (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="noise relative overflow-hidden rounded-xl border border-border-subtle bg-surface-1 p-6 card-elevated"
            >
              <div className="relative z-10 mb-2 flex items-center gap-2">
                <Icon className={`h-4 w-4 ${statIcons[i].color}`} />
                <span className="text-xs text-muted-foreground">
                  {stat.label}
                </span>
              </div>
              <div className="relative z-10 text-2xl font-bold">
                {stat.value}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Category grid by section */}
      {sections.map((section, sectionIdx) => (
        <motion.div
          key={section.name}
          className="mb-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1, ease }}
        >
          <div className="mb-6 flex items-center gap-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {section.name}
            </h2>
            <div className="section-line flex-1" />
          </div>
          <motion.div
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              animate: {
                transition: { staggerChildren: 0.05, delayChildren: 0.1 },
              },
            }}
          >
            {section.categories.map((cat) => (
              <motion.div key={cat.slug} variants={fadeUp}>
                <CategoryCard category={cat} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
