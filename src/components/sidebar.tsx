"use client";

import Link from "next/link";
import { BookOpen, Search, ArrowLeft } from "lucide-react";
import { useCommandPalette } from "./command-palette";
import { usePlaybook } from "./playbook-context";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";
import type { Section } from "@/lib/types";

interface SidebarProps {
  sections: Section[];
  colorsLight: Record<string, string>;
  hasResearch?: boolean;
}

export function Sidebar({ sections, colorsLight, hasResearch }: SidebarProps) {
  const { setOpen } = useCommandPalette();
  const playbook = usePlaybook();

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[280px] border-r border-border-subtle bg-gradient-to-b from-surface-2 to-card lg:block">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-14 items-center gap-2 border-b border-border-subtle px-5">
          <BookOpen className="h-5 w-5 text-primary" />
          <Link
            href={`/${playbook.slug}`}
            className="font-serif text-sm font-medium tracking-tight"
          >
            {playbook.name}
          </Link>
        </div>

        {/* Search trigger — UX-327: Persistent global search */}
        <div className="px-3 pt-3">
          <button
            onClick={() => setOpen(true)}
            className="flex w-full items-center gap-2 rounded-md border border-border-subtle bg-background px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-border-hover hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            <Search className="h-4 w-4" />
            <span className="flex-1 text-left">Search...</span>
            <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px]">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Navigation — UX-276: Left-side vertical nav for complex IA */}
        <nav className="sidebar-scroll flex-1 overflow-y-auto overflow-x-hidden px-3 py-3">
          <NavLinks
            sections={sections}
            colorsLight={colorsLight}
            hasResearch={hasResearch}
          />
        </nav>

        {/* Footer */}
        <div className="border-t border-border-subtle px-3 py-3 space-y-2">
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground/50 transition-all duration-200 hover:bg-surface-2/60 hover:text-muted-foreground"
          >
            <ArrowLeft className="h-3 w-3 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span>All Playbooks</span>
          </Link>
          <div className="flex items-center justify-between px-2">
            <span className="font-mono text-[10px] text-muted-foreground/40">
              v1.0
            </span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </aside>
  );
}
