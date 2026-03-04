"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import type { Practice, Category } from "@/lib/types";
import { PracticeCard } from "@/components/practice-card";
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

export function BrowseClient({
  practices,
  categories,
  tags,
}: BrowseClientProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [minScore, setMinScore] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  // Initialize Fuse with data
  useMemo(() => {
    fuse.setCollection(practices);
  }, [practices]);

  const filtered = useMemo(() => {
    let results = practices;

    // Text search
    if (query.trim()) {
      results = fuse.search(query).map((r) => r.item);
    }

    // Category filter
    if (selectedCategory) {
      results = results.filter((p) => p.categorySlug === selectedCategory);
    }

    // Tag filter
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
  }, [practices, query, selectedCategory, selectedTags, minScore]);

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
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold tracking-tight">
          Browse All Practices
        </h1>
        <p className="text-sm text-muted-foreground">
          {filtered.length} of {practices.length} practices
        </p>
      </div>

      {/* Search + Filter toggle */}
      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search practices..."
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-zinc-600"
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
          className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors ${
            showFilters || hasActiveFilters
              ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-400"
              : "border-border bg-card text-muted-foreground hover:text-foreground"
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <span className="rounded-full bg-indigo-500 px-1.5 py-0.5 text-[10px] text-white">
              {(selectedCategory ? 1 : 0) +
                selectedTags.length +
                (minScore > 0 ? 1 : 0)}
            </span>
          )}
        </button>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="mb-6 rounded-xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium">Filters</h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-indigo-400 hover:text-indigo-300"
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
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none"
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
                  className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                    minScore === score
                      ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {score === 0 ? "Any" : `${score}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Tag filter */}
          <div>
            <label className="mb-2 block text-xs font-medium text-muted-foreground">
              Tags
            </label>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full border px-2.5 py-1 text-[11px] transition-colors ${
                    selectedTags.includes(tag)
                      ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-400"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((p) => (
            <PracticeCard key={p.id} practice={p} showCategory />
          ))}
        </div>
      )}

      <ScrollToTop />
    </div>
  );
}
