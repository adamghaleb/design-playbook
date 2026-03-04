"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSections } from "@/lib/data";
import { BookOpen, Search } from "lucide-react";
import { useCommandPalette } from "./command-palette";

const sections = getSections();

export function Sidebar() {
  const pathname = usePathname();
  const { setOpen } = useCommandPalette();

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[280px] border-r border-border bg-card lg:block">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-14 items-center gap-2 border-b border-border px-5">
          <BookOpen className="h-5 w-5 text-indigo-400" />
          <Link href="/" className="text-sm font-semibold tracking-tight">
            Design Playbook
          </Link>
        </div>

        {/* Search trigger */}
        <div className="px-3 pt-3">
          <button
            onClick={() => setOpen(true)}
            className="flex w-full items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-zinc-600 hover:text-foreground"
          >
            <Search className="h-4 w-4" />
            <span className="flex-1 text-left">Search...</span>
            <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px]">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-scroll flex-1 overflow-y-auto px-3 py-3">
          <div className="mb-2">
            <Link
              href="/browse"
              className={`flex items-center rounded-md px-2 py-1.5 text-sm transition-colors ${
                pathname === "/browse"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              Browse All
            </Link>
          </div>

          {sections.map((section) => (
            <div key={section.name} className="mb-4">
              <h3 className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                {section.name}
              </h3>
              {section.categories.map((cat) => {
                const isActive = pathname === `/category/${cat.slug}`;
                return (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className={`flex items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors ${
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span
                        className="h-2 w-2 rounded-full shrink-0"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="truncate">{cat.name}</span>
                    </span>
                    <span className="ml-2 shrink-0 rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {cat.count}
                    </span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
