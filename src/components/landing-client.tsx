"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, useAnimationControls } from "framer-motion";
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

const strokePath =
  "M0,8 C20,4 40,12 60,6 C80,0 100,10 120,8 C140,6 160,14 180,8 C200,2 220,12 240,8 C260,4 280,10 300,8";

function d(delay: number, duration: number) {
  return { duration, delay, ease };
}

export function LandingClient({
  playbooks,
}: {
  playbooks: PlaybookWithStats[];
}) {
  const [skipped, setSkipped] = useState(false);
  const skipHintControls = useAnimationControls();

  const skip = useCallback(() => {
    if (!skipped) setSkipped(true);
  }, [skipped]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.code === "Space" && !e.repeat) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        e.preventDefault();
        skip();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [skip]);

  useEffect(() => {
    if (skipped) {
      skipHintControls.start({ opacity: 0, transition: { duration: 0.2 } });
      return;
    }
    const timer = setTimeout(() => {
      skipHintControls.start({ opacity: 1, transition: { duration: 0.4 } });
    }, 600);
    return () => clearTimeout(timer);
  }, [skipped, skipHintControls]);

  useEffect(() => {
    if (skipped) return;
    const timer = setTimeout(() => {
      skipHintControls.start({ opacity: 0, transition: { duration: 0.5 } });
    }, 3500);
    return () => clearTimeout(timer);
  }, [skipped, skipHintControls]);

  return (
    <div
      className={`min-h-screen flex flex-col relative${skipped ? " landing-skipped" : ""}`}
    >
      {/* CSS override that forces all animations to end state when skipped */}
      {skipped && (
        <style>{`
          .landing-skipped * {
            opacity: 1 !important;
            transform: none !important;
          }
          .landing-skipped svg path,
          .landing-skipped svg rect {
            stroke-dashoffset: 0 !important;
          }
          .landing-skipped .accent-bar {
            opacity: 0.6 !important;
            transform: scaleX(1) !important;
          }
          .landing-skipped .ink-stroke path {
            opacity: 0.5 !important;
          }
        `}</style>
      )}

      {/* Theme toggle - top right */}
      <div className="fixed top-5 right-5 z-50">
        <ThemeToggle />
      </div>

      {/* Skip hint */}
      <motion.div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={skipHintControls}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-1/80 backdrop-blur-sm px-4 py-2 text-xs text-muted-foreground/60">
          <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px]">
            space
          </kbd>
          skip animation
        </span>
      </motion.div>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-24 sm:py-32">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h1
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={d(0, 0.3)}
          >
            {/* "The Ultimate" — ink write-on */}
            <motion.span
              className="block font-bethany text-5xl sm:text-7xl tracking-tight text-foreground/90"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={d(0.2, 0.6)}
            >
              {"The Ultimate".split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={d(0.3 + i * 0.04, 0.08)}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>

            {/* "Playbook" */}
            <motion.span
              className="block font-serif text-4xl sm:text-6xl font-semibold tracking-tight mt-1"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={d(0.9, 0.5)}
            >
              {"Playbook".split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={d(0.95 + i * 0.04, 0.08)}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>

            {/* Ink stroke underline */}
            <motion.div
              className="flex justify-center mt-3 ink-stroke"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={d(1.3, 0.2)}
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

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={d(1.6, 0.5)}
          >
            Research-backed playbooks for building better everything.
          </motion.p>
        </div>

        {/* Playbook cards grid */}
        <div className="w-full max-w-3xl mx-auto grid gap-5 sm:grid-cols-2">
          {playbooks.map((pb, index) => (
            <motion.div
              key={pb.slug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={d(1.8 + index * 0.12, 0.15)}
              whileHover={{ y: -3 }}
            >
              <Link
                href={`/${pb.slug}`}
                className="group relative block rounded-xl overflow-hidden"
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

                {/* Card content */}
                <motion.div
                  className="relative bg-surface-1 p-8 rounded-xl card-elevated noise transition-colors duration-200 group-hover:bg-surface-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={d(2.2 + index * 0.12, 0.4)}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <motion.span
                      className="h-2.5 w-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: pb.accentColor }}
                      initial={{ scale: 0 }}
                      animate={{
                        scale: 1,
                        boxShadow: `0 0 8px ${pb.accentColor}30`,
                      }}
                      transition={d(2.4 + index * 0.12, 0.3)}
                    />
                    <h2 className="font-serif text-xl font-semibold tracking-tight">
                      {pb.shortName}
                    </h2>
                  </div>

                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                    {pb.description}
                  </p>

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

                  <div className="flex items-center gap-1.5 text-sm font-medium text-primary">
                    <span>Explore</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>

                  {/* Bottom gradient accent bar */}
                  <motion.div
                    className="accent-bar absolute inset-x-0 bottom-0 h-[2px]"
                    style={{
                      background: `linear-gradient(to right, transparent, ${pb.accentColor}, transparent)`,
                    }}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 0.6, scaleX: 1 }}
                    transition={d(2.5 + index * 0.12, 0.5)}
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
        transition={d(3.2, 0.5)}
      >
        Built with research. Designed with care.
      </motion.footer>
    </div>
  );
}
