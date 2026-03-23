"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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

function PlaybookCard({ pb }: { pb: PlaybookWithStats }) {
  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2, ease }}>
      <Link
        href={`/${pb.slug}`}
        className="group relative block overflow-hidden rounded-xl border border-border-subtle bg-surface-1 p-8 transition-all duration-200 hover:border-border-hover hover:bg-surface-2 card-elevated noise"
      >
        {/* Accent dot + name */}
        <div className="mb-4 flex items-center gap-3">
          <span
            className="h-2.5 w-2.5 rounded-full shrink-0"
            style={{
              backgroundColor: pb.accentColor,
              boxShadow: `0 0 8px ${pb.accentColor}30`,
            }}
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
        <div
          className="absolute inset-x-0 bottom-0 h-[2px] opacity-60"
          style={{
            background: `linear-gradient(to right, transparent, ${pb.accentColor}, transparent)`,
          }}
        />
      </Link>
    </motion.div>
  );
}

function AnimatedLanding({
  playbooks,
  onSkip,
}: {
  playbooks: PlaybookWithStats[];
  onSkip: () => void;
}) {
  const [hintVisible, setHintVisible] = useState(false);

  useEffect(() => {
    const show = setTimeout(() => setHintVisible(true), 600);
    const hide = setTimeout(() => setHintVisible(false), 3500);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.code === "Space" && !e.repeat) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        e.preventDefault();
        onSkip();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSkip]);

  return (
    <>
      {/* Skip hint */}
      <AnimatePresence>
        {hintVisible && (
          <motion.div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.3 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-1/80 backdrop-blur-sm px-4 py-2 text-xs text-muted-foreground/60">
              <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px]">
                space
              </kbd>
              skip
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-24 sm:py-32">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h1 className="mb-6">
            {/* "The Ultimate" — ink write-on */}
            <span className="block font-bethany text-5xl sm:text-7xl tracking-tight text-foreground/90">
              {"The Ultimate".split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.08, delay: 0.3 + i * 0.04, ease }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>

            {/* "Playbook" */}
            <span className="block font-serif text-4xl sm:text-6xl font-semibold tracking-tight mt-1">
              {"Playbook".split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.08, delay: 0.95 + i * 0.04, ease }}
                >
                  {char}
                </motion.span>
              ))}
            </span>

            {/* Ink stroke underline */}
            <div className="flex justify-center mt-3">
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
            </div>
          </h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.6, ease }}
          >
            Research-backed playbooks for building better everything.
          </motion.p>
        </div>

        {/* Playbook cards grid */}
        <div className="w-full max-w-3xl mx-auto grid gap-5 sm:grid-cols-2">
          {playbooks.map((pb, index) => (
            <motion.div
              key={pb.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.8 + index * 0.12, ease }}
            >
              <PlaybookCard pb={pb} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        className="border-t border-border px-8 py-6 text-center text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 3.0, ease }}
      >
        Built with research. Designed with care.
      </motion.footer>
    </>
  );
}

function StaticLanding({ playbooks }: { playbooks: PlaybookWithStats[] }) {
  return (
    <>
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-24 sm:py-32">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h1 className="mb-6">
            <span className="block font-bethany text-5xl sm:text-7xl tracking-tight text-foreground/90">
              The Ultimate
            </span>
            <span className="block font-serif text-4xl sm:text-6xl font-semibold tracking-tight mt-1">
              Playbook
            </span>
            <div className="flex justify-center mt-3">
              <svg
                width="200"
                height="16"
                viewBox="0 0 300 16"
                fill="none"
                className="text-primary"
              >
                <path
                  d={strokePath}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.5"
                />
              </svg>
            </div>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Research-backed playbooks for building better everything.
          </p>
        </div>

        <div className="w-full max-w-3xl mx-auto grid gap-5 sm:grid-cols-2">
          {playbooks.map((pb) => (
            <PlaybookCard key={pb.slug} pb={pb} />
          ))}
        </div>
      </div>

      <footer className="border-t border-border px-8 py-6 text-center text-xs text-muted-foreground">
        Built with research. Designed with care.
      </footer>
    </>
  );
}

export function LandingClient({
  playbooks,
}: {
  playbooks: PlaybookWithStats[];
}) {
  const [skipped, setSkipped] = useState(false);
  const skip = useCallback(() => setSkipped(true), []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="fixed top-5 right-5 z-50">
        <ThemeToggle />
      </div>
      {skipped ? (
        <StaticLanding playbooks={playbooks} />
      ) : (
        <AnimatedLanding playbooks={playbooks} onSkip={skip} />
      )}
    </div>
  );
}
