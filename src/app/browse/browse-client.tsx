"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Fuse from "fuse.js";
import type { Practice, Category } from "@/lib/types";
import { PracticeCard } from "@/components/practice-card";
import { MasonryGrid } from "@/components/masonry-grid";
import { EmptyState } from "@/components/empty-state";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Search, X, SlidersHorizontal } from "lucide-react";

interface BrowseClientProps {
  practices: Practice[];
  categories: Category[];
  tags: string[];
}

const fuse = new Fuse<Practice>([], {
  keys: [
    { name: "title", weight: 0.5 },
    { name: "context", weight: 0.25 },
    { name: "category", weight: 0.15 },
    { name: "tags", weight: 0.1 },
  ],
  threshold: 0.4,
});

const ease = [0.25, 0.1, 0.25, 1] as const;

export function BrowseClient({
  practices,
  categories,
  tags,
}: BrowseClientProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [minScore, setMinScore] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 40;
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Debounce search input (UX-270)
  useEffect(() => {
    debounceRef.current = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  // Initialize Fuse with data
  useMemo(() => {
    fuse.setCollection(practices);
  }, [practices]);

  const filtered = useMemo(() => {
    let results = practices;

    // Text search (uses debounced value)
    if (debouncedQuery.trim()) {
      results = fuse.search(debouncedQuery).map((r) => r.item);
    }

    // Category filter
    if (selectedCategory) {
      results = results.filter((p) => p.categorySlug === selectedCategory);
    }

    // Tag filter (AND — must match ALL selected tags)
    if (selectedTags.length > 0) {
      results = results.filter((p) =>
        selectedTags.every((tag) => p.tags.includes(tag)),
      );
    }

    // Score filter
    if (minScore > 0) {
      results = results.filter((p) => p.practicalityScore >= minScore);
    }

    return results;
  }, [practices, debouncedQuery, selectedCategory, selectedTags, minScore]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, selectedCategory, selectedTags, minScore]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const hasActiveFilters =
    selectedCategory || selectedTags.length > 0 || minScore > 0;

  function clearFilters() {
    setSelectedCategory(null);
    setSelectedTags([]);
    setMinScore(0);
    setQuery("");
  }

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  return (
    <div>
      <div className="mb-16">
        <h1 className="mb-3 font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
          Browse All Practices
        </h1>
        <p className="text-base text-muted-foreground">
          {filtered.length} of {practices.length} practices
        </p>
      </div>

      {/* Search + Filter toggle */}
      <div className="mb-6 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search practices..."
            className="w-full rounded-md border border-border-subtle bg-surface-1 py-2.5 pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-border-hover"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 rounded-md border px-4 py-2.5 text-sm transition-colors ${
            showFilters || hasActiveFilters
              ? "border-primary/50 bg-primary-glow text-primary"
              : "border-border-subtle bg-surface-1 text-muted-foreground hover:text-foreground"
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-background">
              {(selectedCategory ? 1 : 0) +
                selectedTags.length +
                (minScore > 0 ? 1 : 0)}
            </span>
          )}
        </button>
      </div>

      {/* Filter panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            className="overflow-hidden"
          >
            <div className="mb-8 rounded-md border border-border-subtle bg-surface-1 p-8">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-serif text-sm font-medium">Filters</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-primary hover:text-primary-dim"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Category filter */}
              <div className="mb-4">
                <label className="mb-2 block text-xs font-medium text-muted-foreground">
                  Category
                </label>
                <select
                  value={selectedCategory || ""}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                  className="w-full rounded-md border border-border-subtle bg-background px-3 py-2 text-sm outline-none"
                >
                  <option value="">All categories</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name} ({c.count})
                    </option>
                  ))}
                </select>
              </div>

              {/* Score filter */}
              <div className="mb-4">
                <label className="mb-2 block text-xs font-medium text-muted-foreground">
                  Minimum practicality score
                </label>
                <div className="flex items-center gap-2">
                  {[0, 1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      onClick={() => setMinScore(score)}
                      className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                        minScore === score
                          ? "border-primary/50 bg-primary-glow text-primary"
                          : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {score === 0 ? "Any" : `${score}+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tag filter (UX-325: clarify AND logic) */}
              <div>
                <label className="mb-2 block text-xs font-medium text-muted-foreground">
                  Tags{" "}
                  {selectedTags.length > 1 && (
                    <span className="text-muted-foreground/60">
                      (matching all)
                    </span>
                  )}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`rounded-full border px-2.5 py-1 text-[11px] transition-colors ${
                        selectedTags.includes(tag)
                          ? "border-primary/50 bg-primary-glow text-primary"
                          : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results (UX-268: paginated) */}
      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <MasonryGrid
            key={`${page}-${debouncedQuery}-${selectedCategory}`}
            columns={{ sm: 2 }}
          >
            {paginated.map((p) => (
              <PracticeCard key={p.id} practice={p} showCategory />
            ))}
          </MasonryGrid>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-14 flex items-center justify-center gap-3">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-3 text-sm text-muted-foreground">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      <ScrollToTop />
    </div>
  );
}
