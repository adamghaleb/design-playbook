"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { PlaybookConfig } from "@/lib/playbooks";

const PlaybookContext = createContext<PlaybookConfig | null>(null);

export function usePlaybook(): PlaybookConfig {
  const ctx = useContext(PlaybookContext);
  if (!ctx) throw new Error("usePlaybook must be used within PlaybookProvider");
  return ctx;
}

export function PlaybookProvider({
  playbook,
  children,
}: {
  playbook: PlaybookConfig;
  children: ReactNode;
}) {
  return (
    <PlaybookContext.Provider value={playbook}>
      {children}
    </PlaybookContext.Provider>
  );
}
