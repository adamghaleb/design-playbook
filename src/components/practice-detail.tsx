"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.25, 0.1, 0.25, 1] as const;

export function PracticeDetailWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease }}
    >
      {children}
    </motion.div>
  );
}

export function PracticeHeader({
  color,
  children,
}: {
  color: string;
  children: ReactNode;
}) {
  return (
    <div className="relative mb-8">
      <div
        className="pointer-events-none absolute -inset-8 -z-10 rounded-3xl"
        style={{
          background: `radial-gradient(ellipse 50% 40% at 20% 50%, ${color}0c 0%, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}
