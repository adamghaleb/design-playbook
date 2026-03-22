"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Menu, X, Search, ArrowLeft } from "lucide-react";
import { useCommandPalette } from "./command-palette";
import { usePlaybook } from "./playbook-context";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";
import type { Section } from "@/lib/types";

const ease = [0.25, 0.1, 0.25, 1] as const;

interface MobileNavProps {
  sections: Section[];
  colorsLight: Record<string, string>;
  hasResearch?: boolean;
}

export function MobileNav({
  sections,
  colorsLight,
  hasResearch,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const { setOpen: setCommandOpen } = useCommandPalette();
  const playbook = usePlaybook();

  const closeDrawer = useCallback(() => setOpen(false), []);

  return (
    <>
      {/* Mobile header */}
      <header className="fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between border-b border-border-subtle bg-card/80 backdrop-blur-sm px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <Link
            href={`/${playbook.slug}`}
            className="font-serif text-sm font-medium"
          >
            {playbook.name}
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            onClick={() => setCommandOpen(true)}
            className="rounded-md p-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-md p-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile spacer */}
      <div className="h-14 lg:hidden" />

      {/* Drawer — UX-277: Always expose navigation */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={closeDrawer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.nav
              className="sidebar-scroll fixed top-14 left-0 bottom-0 z-50 w-[280px] overflow-y-auto bg-card border-r border-border-subtle lg:hidden"
              aria-label="Main navigation"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.25, ease }}
            >
              <div className="p-3">
                <Link
                  href="/"
                  onClick={closeDrawer}
                  className="group mb-3 flex items-center gap-2 rounded-md px-3 py-2 text-xs text-muted-foreground/50 transition-all duration-200 hover:bg-surface-2/60 hover:text-muted-foreground"
                >
                  <ArrowLeft className="h-3 w-3 transition-transform duration-200 group-hover:-translate-x-0.5" />
                  <span>All Playbooks</span>
                </Link>
                <NavLinks
                  sections={sections}
                  colorsLight={colorsLight}
                  hasResearch={hasResearch}
                  onNavigate={closeDrawer}
                />
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
