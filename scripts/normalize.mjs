import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const raw = JSON.parse(
  readFileSync(join(ROOT, "data/raw/notion_bestpractices.json"), "utf-8"),
);

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const CATEGORY_SECTIONS = {
  "Human Biases in Interfaces": "Psychology",
  "Cognitive Load": "Psychology",
  "Cognitive Psychology": "Psychology",
  "Behavioral Psychology": "Psychology",
  "Reading Psychology": "Psychology",
  "Gestalt Principles": "Visual Design",
  "Layout & Visual Hierarchy": "Visual Design",
  "Design Systems & Tokens": "Visual Design",
  "Loading & Performance Perception": "Visual Design",
  "Interaction Patterns": "Interaction",
  "Navigation & Information Architecture": "Interaction",
  "Forms & Input": "Interaction",
  "Feedback & Error Handling": "Interaction",
  "Component Patterns": "Interaction",
  "Search Filter & Sort": "Interaction",
  "Design Process & Methodology": "Process",
  "Human-Centered Design": "Process",
  "Product Strategy": "Process",
  "Usability Heuristics": "Process",
  Accessibility: "Process",
  "Enterprise & B2B Patterns": "Domain-Specific",
  Gamification: "Domain-Specific",
  "Dashboard Design": "Domain-Specific",
  "Data Display & Tables": "Domain-Specific",
  "Desktop-Specific Patterns": "Domain-Specific",
  "Onboarding & Empty States": "Domain-Specific",
  "Workflow & Multi-Step Processes": "Domain-Specific",
};

const CATEGORY_COLORS = {
  "Human Biases in Interfaces": "#f97316",
  "Cognitive Load": "#ef4444",
  "Cognitive Psychology": "#ec4899",
  "Behavioral Psychology": "#d946ef",
  "Reading Psychology": "#a855f7",
  "Gestalt Principles": "#8b5cf6",
  "Layout & Visual Hierarchy": "#6366f1",
  "Design Systems & Tokens": "#3b82f6",
  "Loading & Performance Perception": "#0ea5e9",
  "Interaction Patterns": "#06b6d4",
  "Navigation & Information Architecture": "#14b8a6",
  "Forms & Input": "#10b981",
  "Feedback & Error Handling": "#22c55e",
  "Component Patterns": "#84cc16",
  "Search Filter & Sort": "#eab308",
  "Design Process & Methodology": "#f59e0b",
  "Human-Centered Design": "#f97316",
  "Product Strategy": "#fb923c",
  "Usability Heuristics": "#fbbf24",
  Accessibility: "#a3e635",
  "Enterprise & B2B Patterns": "#2dd4bf",
  Gamification: "#c084fc",
  "Dashboard Design": "#60a5fa",
  "Data Display & Tables": "#38bdf8",
  "Desktop-Specific Patterns": "#34d399",
  "Onboarding & Empty States": "#fcd34d",
  "Workflow & Multi-Step Processes": "#fb7185",
};

// Normalize practices
const practices = raw.map((entry) => {
  const tags = (entry.tags || []).flatMap((t) =>
    t
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  );

  return {
    id: entry.id,
    title: entry.best_practice,
    slug: slugify(entry.best_practice),
    category: entry.category,
    categorySlug: slugify(entry.category),
    subcategory: entry.subcategory || "",
    context: entry.context || "",
    sources: entry.sources || "",
    practicalityScore: entry.practicality_score || 0,
    tags: [...new Set(tags)],
  };
});

// Sort by ID number
practices.sort((a, b) => {
  const numA = parseInt(a.id.replace("UX-", ""));
  const numB = parseInt(b.id.replace("UX-", ""));
  return numA - numB;
});

// Build categories
const catMap = {};
practices.forEach((p) => {
  if (!catMap[p.category]) {
    catMap[p.category] = {
      name: p.category,
      slug: p.categorySlug,
      count: 0,
      section: CATEGORY_SECTIONS[p.category] || "Domain-Specific",
      color: CATEGORY_COLORS[p.category] || "#6366f1",
    };
  }
  catMap[p.category].count++;
});

const categories = Object.values(catMap).sort((a, b) =>
  a.name.localeCompare(b.name),
);

// Collect all unique tags
const allTags = [...new Set(practices.flatMap((p) => p.tags))].sort();

// Write output
const outDir = join(ROOT, "data");
mkdirSync(outDir, { recursive: true });

writeFileSync(
  join(outDir, "practices.json"),
  JSON.stringify(practices, null, 2),
);
writeFileSync(
  join(outDir, "categories.json"),
  JSON.stringify(categories, null, 2),
);
writeFileSync(join(outDir, "tags.json"), JSON.stringify(allTags, null, 2));

console.log(`✓ ${practices.length} practices`);
console.log(`✓ ${categories.length} categories`);
console.log(`✓ ${allTags.length} tags`);
