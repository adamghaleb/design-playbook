"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Fuse from "fuse.js";
import type { Practice, Category } from "@/lib/types";
import { Search, ArrowRight, FileText, Folder } from "lucide-react";
import { ScoreDots } from "./score-dots";

interface CommandPaletteContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CommandPaletteContext = createContext<CommandPaletteContextType>({
  open: false,
  setOpen: () => {},
});

export function useCommandPalette() {
  return useContext(CommandPaletteContext);
}

type SearchItem = {
  type: "practice" | "category";
  id: string;
  title: string;
  subtitle: string;
  href: string;
  score?: number;
};

const ease = [0.25, 0.1, 0.25, 1] as const;

interface CommandPaletteProviderProps {
  practices: Practice[];
  categories: Category[];
  basePath: string;
  children: ReactNode;
}

export function CommandPaletteProvider({
  practices,
  categories,
  basePath,
  children,
}: CommandPaletteProviderProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const searchItems = useMemo<SearchItem[]>(
    () => [
      ...categories.map((c) => ({
        type: "category" as const,
        id: c.slug,
        title: c.name,
        subtitle: `${c.count} practices · ${c.section}`,
        href: `${basePath}/category/${c.slug}`,
      })),
      ...practices.map((p) => ({
        type: "practice" as const,
        id: p.id,
        title: p.title,
        subtitle: `${p.id} · ${p.category}`,
        href: `${basePath}/practice/${p.id}`,
        score: p.practicalityScore,
      })),
    ],
    [practices, categories, basePath],
  );

  return (
    <CommandPaletteContext.Provider value={{ open, setOpen }}>
      {children}
      <AnimatePresence>
        {open && (
          <CommandPalette
            searchItems={searchItems}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </CommandPaletteContext.Provider>
  );
}

function CommandPalette({
  searchItems,
  onClose,
}: {
  searchItems: SearchItem[];
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(searchItems, {
        keys: [
          { name: "title", weight: 0.6 },
          { name: "subtitle", weight: 0.3 },
          { name: "id", weight: 0.1 },
        ],
        threshold: 0.4,
        includeScore: true,
      }),
    [searchItems],
  );

  // Focus trap (UX-003)
  useEffect(() => {
    function trapFocus(e: KeyboardEvent) {
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'input, button, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", trapFocus);
    return () => document.removeEventListener("keydown", trapFocus);
  }, []);

  const results =
    query.length > 0
      ? fuse.search(query, { limit: 20 }).map((r) => r.item)
      : searchItems.slice(0, 10);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const el = listRef.current?.children[selectedIndex] as HTMLElement;
    el?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  const navigate = useCallback(
    (item: SearchItem) => {
      router.push(item.href);
      onClose();
    },
    [router, onClose],
  );

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      navigate(results[selectedIndex]);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-command"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search practices"
        className="relative w-full max-w-lg overflow-hidden rounded-md border border-border bg-card shadow-2xl"
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 4 }}
        transition={{ duration: 0.2, ease }}
      >
        {/* Top accent line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search practices, categories..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div
          ref={listRef}
          className="max-h-[300px] overflow-y-auto p-2"
          role="listbox"
        >
          {results.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              No results found for &ldquo;{query}&rdquo;
            </div>
          )}
          {results.map((item, i) => (
            <button
              key={`${item.type}-${item.id}`}
              role="option"
              aria-selected={i === selectedIndex}
              onClick={() => navigate(item)}
              className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
                i === selectedIndex
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50"
              }`}
            >
              {item.type === "category" ? (
                <Folder className="h-4 w-4 shrink-0 text-primary" />
              ) : (
                <FileText className="h-4 w-4 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="truncate font-medium text-foreground">
                  {item.title}
                </div>
                <div className="truncate text-xs text-muted-foreground">
                  {item.subtitle}
                </div>
              </div>
              {item.score !== undefined && (
                <ScoreDots score={item.score} size="sm" />
              )}
              <ArrowRight className="h-3 w-3 shrink-0 opacity-40" />
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
