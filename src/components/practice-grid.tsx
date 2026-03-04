"use client";

import { motion } from "framer-motion";
import { PracticeCard } from "./practice-card";
import type { Practice } from "@/lib/types";

interface PracticeGridProps {
  practices: Practice[];
  showCategory?: boolean;
}

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease } },
};

export function PracticeGrid({
  practices,
  showCategory = false,
}: PracticeGridProps) {
  return (
    <motion.div
      className="grid gap-5 sm:grid-cols-2"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={{
        animate: {
          transition: {
            staggerChildren: 0.04,
            delayChildren: 0.05,
          },
        },
      }}
    >
      {practices.map((p) => (
        <motion.div key={p.id} variants={fadeUp}>
          <PracticeCard practice={p} showCategory={showCategory} />
        </motion.div>
      ))}
    </motion.div>
  );
}
