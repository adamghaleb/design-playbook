"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import type { PlaybookConfig } from "@/lib/playbooks";

interface PlaybookWithStats extends PlaybookConfig {
  stats: {
    totalPractices: number;
    totalCategories: number;
    totalTags: number;
    totalArticles: number;
    avgScore: number;
  };
}

const ease = [0.25, 0.1, 0.25, 1] as const;

// SVG path for the ink stroke underline
const strokePath =
  "M0,8 C20,4 40,12 60,6 C80,0 100,10 120,8 C140,6 160,14 180,8 C200,2 220,12 240,8 C260,4 280,10 300,8";

export function LandingClient({
  playbooks,
}: {
  playbooks: PlaybookWithStats[];
}) {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Theme toggle - top right */}
      <div className="fixed top-5 right-5 z-50">
        <ThemeToggle />
      </div>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-24 sm:py-32">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h1
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* "The Ultimate" — ink write-on effect */}
            <motion.span
              className="block font-bethany text-5xl sm:text-7xl tracking-tight text-foreground/90"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
            >
              {"The Ultimate".split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.08,
                    delay: 0.3 + i * 0.04,
                    ease,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>

            {/* "Playbook" — appears after "The Ultimate" */}
            <motion.span
              className="block font-serif text-4xl sm:text-6xl font-semibold tracking-tight mt-1"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9, ease }}
            >
              {"Playbook".split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.08,
                    delay: 0.95 + i * 0.04,
                    ease,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>

            {/* Ink stroke underline */}
            <motion.div
              className="flex justify-center mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              <svg
                width="200"
                height="16"
                viewBox="0 0 300 16"
                fill="none"
                className="text-primary"
              >
                <motion.path
                  d={strokePath}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{
                    pathLength: { duration: 0.8, delay: 1.3, ease },
                    opacity: { duration: 0.2, delay: 1.3 },
                  }}
                />
              </svg>
            </motion.div>
          </motion.h1>

          {/* Subtitle fades in after title */}
          <motion.p
            className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.6, ease }}
          >
            Research-backed playbooks for building better everything.
          </motion.p>
        </div>

        {/* Playbook cards grid — each card draws its border then fades content in */}
        <div className="w-full max-w-3xl mx-auto grid gap-5 sm:grid-cols-2">
          {playbooks.map((pb, index) => (
            <motion.div
              key={pb.slug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15, delay: 1.8 + index * 0.12 }}
            >
              <Link
                href={`/${pb.slug}`}
                className="group relative block rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.01]"
              >
                {/* SVG border draw-on */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  preserveAspectRatio="none"
                >
                  <motion.rect
                    x="0.5"
                    y="0.5"
                    width="calc(100% - 1px)"
                    height="calc(100% - 1px)"
                    rx="12"
                    ry="12"
                    fill="none"
                    stroke="var(--color-border-subtle)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      pathLength: {
                        duration: 0.6,
                        delay: 1.9 + index * 0.12,
                        ease,
                      },
                      opacity: {
                        duration: 0.1,
                        delay: 1.9 + index * 0.12,
                      },
                    }}
                  />
                </svg>

                {/* Card content fades in after border draws */}
                <motion.div
                  className="relative bg-surface-1 p-8 rounded-xl card-elevated noise"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 2.2 + index * 0.12,
                    ease,
                  }}
                >
                  {/* Accent dot + name */}
                  <div className="mb-4 flex items-center gap-3">
                    <motion.span
                      className="h-2.5 w-2.5 rounded-full shrink-0"
                      style={{
                        backgroundColor: pb.accentColor,
                      }}
                      initial={{ scale: 0 }}
                      animate={{
                        scale: 1,
                        boxShadow: `0 0 8px ${pb.accentColor}30`,
                      }}
                      transition={{
                        duration: 0.3,
                        delay: 2.4 + index * 0.12,
                        ease,
                      }}
                    />
                    <h2 className="font-serif text-xl font-semibold tracking-tight">
                      {pb.shortName}
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                    {pb.description}
                  </p>

                  {/* Stats row */}
                  <div className="mb-6 flex gap-6 text-xs text-muted-foreground">
                    <span>
                      <span className="font-medium text-foreground">
                        {pb.stats.totalPractices}
                      </span>{" "}
                      practices
                    </span>
                    <span>
                      <span className="font-medium text-foreground">
                        {pb.stats.totalCategories}
                      </span>{" "}
                      categories
                    </span>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center gap-1.5 text-sm font-medium text-primary">
                    <span>Explore</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>

                  {/* Bottom gradient accent bar */}
                  <motion.div
                    className="absolute inset-x-0 bottom-0 h-[2px]"
                    style={{
                      background: `linear-gradient(to right, transparent, ${pb.accentColor}, transparent)`,
                    }}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 0.6, scaleX: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 2.5 + index * 0.12,
                      ease,
                    }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        className="border-t border-border px-8 py-6 text-center text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 3.2, ease }}
      >
        Built with research. Designed with care.
      </motion.footer>
    </div>
  );
}
