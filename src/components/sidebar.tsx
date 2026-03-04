"use client";

import Link from "next/link";
import { BookOpen, Search } from "lucide-react";
import { useCommandPalette } from "./command-palette";
import { NavLinks } from "./nav-links";

export function Sidebar() {
  const { setOpen } = useCommandPalette();

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[280px] border-r border-border-subtle bg-gradient-to-b from-surface-2 to-card lg:block">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-14 items-center gap-2 border-b border-border-subtle px-5">
          <BookOpen className="h-5 w-5 text-indigo-400" />
          <Link href="/" className="text-sm font-semibold tracking-tight">
            Design Playbook
          </Link>
        </div>

        {/* Search trigger — UX-327: Persistent global search */}
        <div className="px-3 pt-3">
          <button
            onClick={() => setOpen(true)}
            className="flex w-full items-center gap-2 rounded-lg border border-border-subtle bg-background px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-border-hover hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
          >
            <Search className="h-4 w-4" />
            <span className="flex-1 text-left">Search...</span>
            <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px]">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Navigation — UX-276: Left-side vertical nav for complex IA */}
        <nav className="sidebar-scroll flex-1 overflow-y-auto px-3 py-3">
          <NavLinks />
        </nav>

        {/* Version footer */}
        <div className="border-t border-border-subtle px-5 py-3">
          <span className="font-mono text-[10px] text-muted-foreground/40">
            v1.0
          </span>
        </div>
      </div>
    </aside>
  );
}
