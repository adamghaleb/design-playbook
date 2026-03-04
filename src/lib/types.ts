export interface Practice {
  id: string;
  title: string;
  slug: string;
  category: string;
  categorySlug: string;
  subcategory: string;
  context: string;
  sources: string;
  practicalityScore: number;
  tags: string[];
}

export interface Category {
  name: string;
  slug: string;
  count: number;
  section: SectionName;
  color: string;
}

export type SectionName =
  | "Psychology"
  | "Visual Design"
  | "Interaction"
  | "Process"
  | "Domain-Specific";

export interface Section {
  name: SectionName;
  categories: Category[];
}

export const SECTION_ORDER: SectionName[] = [
  "Psychology",
  "Visual Design",
  "Interaction",
  "Process",
  "Domain-Specific",
];

export const CATEGORY_SECTIONS: Record<string, SectionName> = {
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

export const CATEGORY_COLORS: Record<string, string> = {
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
