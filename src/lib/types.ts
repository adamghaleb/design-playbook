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

export const CATEGORY_COLORS_LIGHT: Record<string, string> = {
  "Human Biases in Interfaces": "#C4906A",
  "Cognitive Load": "#BF7A7A",
  "Cognitive Psychology": "#B87A9E",
  "Behavioral Psychology": "#A882B8",
  "Reading Psychology": "#9A85B5",
  "Gestalt Principles": "#8E84B8",
  "Layout & Visual Hierarchy": "#8185B5",
  "Design Systems & Tokens": "#7A94B8",
  "Loading & Performance Perception": "#6FA0B5",
  "Interaction Patterns": "#6DA5AB",
  "Navigation & Information Architecture": "#72A89E",
  "Forms & Input": "#6FA898",
  "Feedback & Error Handling": "#7AAB8A",
  "Component Patterns": "#8EA87A",
  "Search Filter & Sort": "#B5A46A",
  "Design Process & Methodology": "#BFA06E",
  "Human-Centered Design": "#C4906A",
  "Product Strategy": "#C49A78",
  "Usability Heuristics": "#C4AA72",
  Accessibility: "#95A872",
  "Enterprise & B2B Patterns": "#72AB9E",
  Gamification: "#9E8ABF",
  "Dashboard Design": "#8A9EC4",
  "Data Display & Tables": "#7AA5C4",
  "Desktop-Specific Patterns": "#78AB95",
  "Onboarding & Empty States": "#C4AE7A",
  "Workflow & Multi-Step Processes": "#BF8A90",
};

export const CATEGORY_COLORS_DARK: Record<string, string> = {
  "Human Biases in Interfaces": "#D4A07A",
  "Cognitive Load": "#CF8A8A",
  "Cognitive Psychology": "#C88AAE",
  "Behavioral Psychology": "#B892C8",
  "Reading Psychology": "#AA95C5",
  "Gestalt Principles": "#9F8FC9",
  "Layout & Visual Hierarchy": "#9195C5",
  "Design Systems & Tokens": "#8AA4C8",
  "Loading & Performance Perception": "#7FB0C5",
  "Interaction Patterns": "#7DB5BB",
  "Navigation & Information Architecture": "#82B8AE",
  "Forms & Input": "#7FB8A8",
  "Feedback & Error Handling": "#8ABB9A",
  "Component Patterns": "#9EB88A",
  "Search Filter & Sort": "#C5B47A",
  "Design Process & Methodology": "#CFB07E",
  "Human-Centered Design": "#D4A07A",
  "Product Strategy": "#D4AA88",
  "Usability Heuristics": "#D4BA82",
  Accessibility: "#A5B882",
  "Enterprise & B2B Patterns": "#82BBAE",
  Gamification: "#AE9ACF",
  "Dashboard Design": "#9AAED4",
  "Data Display & Tables": "#8AB5D4",
  "Desktop-Specific Patterns": "#88BBA5",
  "Onboarding & Empty States": "#D4BE8A",
  "Workflow & Multi-Step Processes": "#CF9AA0",
};
