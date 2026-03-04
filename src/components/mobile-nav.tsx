"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSections } from "@/lib/data";
import { BookOpen, Menu, X, Search } from "lucide-react";
import { useCommandPalette } from "./command-palette";

const sections = getSections();

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { setOpen: setCommandOpen } = useCommandPalette();

  return (
    <>
      {/* Mobile header */}
      <header className="fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between border-b border-border bg-card/80 backdrop-blur-sm px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-indigo-400" />
          <Link href="/" className="text-sm font-semibold">
            Design Playbook
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCommandOpen(true)}
            className="rounded-md p-2 text-muted-foreground hover:text-foreground"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-md p-2 text-muted-foreground hover:text-foreground"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile spacer */}
      <div className="h-14 lg:hidden" />

      {/* Drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            onClick={() => setOpen(false)}
          />
          <nav className="sidebar-scroll fixed top-14 left-0 bottom-0 z-50 w-[280px] overflow-y-auto bg-card border-r border-border lg:hidden">
            <div className="p-3">
              <Link
                href="/browse"
                onClick={() => setOpen(false)}
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
              <div key={section.name} className="mb-4 px-3">
                <h3 className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                  {section.name}
                </h3>
                {section.categories.map((cat) => {
                  const isActive = pathname === `/category/${cat.slug}`;
                  return (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      onClick={() => setOpen(false)}
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
        </>
      )}
    </>
  );
}
