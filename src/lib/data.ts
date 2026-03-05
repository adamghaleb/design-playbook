import practicesJson from "./practices.json";
import categoriesJson from "./categories.json";
import tagsJson from "./tags.json";
import {
  type Practice,
  type Category,
  type Section,
  SECTION_ORDER,
  CATEGORY_SECTIONS,
  CATEGORY_COLORS,
  CATEGORY_COLORS_LIGHT,
  CATEGORY_COLORS_DARK,
} from "./types";

const practices: Practice[] = practicesJson as Practice[];
const categories: Category[] = categoriesJson as Category[];
const tags: string[] = tagsJson as string[];

// Index maps for O(1) lookups
const practiceById = new Map<string, Practice>();
const practicesByCategory = new Map<string, Practice[]>();
const categoryBySlug = new Map<string, Category>();

practices.forEach((p) => {
  practiceById.set(p.id, p);
  const list = practicesByCategory.get(p.categorySlug) || [];
  list.push(p);
  practicesByCategory.set(p.categorySlug, list);
});

categories.forEach((c) => {
  categoryBySlug.set(c.slug, c);
});

export function getAllPractices(): Practice[] {
  return practices;
}

export function getPracticeById(id: string): Practice | undefined {
  return practiceById.get(id);
}

export function getPracticesByCategory(slug: string): Practice[] {
  return practicesByCategory.get(slug) || [];
}

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categoryBySlug.get(slug);
}

export function getAllTags(): string[] {
  return tags;
}

export function getSections(): Section[] {
  return SECTION_ORDER.map((name) => ({
    name,
    categories: categories
      .filter((c) => c.section === name)
      .sort((a, b) => b.count - a.count),
  }));
}

export function getAdjacentPractices(
  id: string,
  categorySlug: string,
): { prev: Practice | null; next: Practice | null } {
  const list = practicesByCategory.get(categorySlug) || [];
  const idx = list.findIndex((p) => p.id === id);
  return {
    prev: idx > 0 ? list[idx - 1] : null,
    next: idx < list.length - 1 ? list[idx + 1] : null,
  };
}

export function getStats() {
  return {
    totalPractices: practices.length,
    totalCategories: categories.length,
    totalTags: tags.length,
    avgScore:
      Math.round(
        (practices.reduce((sum, p) => sum + p.practicalityScore, 0) /
          practices.length) *
          10,
      ) / 10,
  };
}

export function getCategoryColor(categoryName: string): string {
  return CATEGORY_COLORS[categoryName] || "#6366f1";
}

export function getCategoryColorLight(categoryName: string): string {
  return CATEGORY_COLORS_LIGHT[categoryName] || "#8185B5";
}

export function getCategoryColorDark(categoryName: string): string {
  return CATEGORY_COLORS_DARK[categoryName] || "#9195C5";
}

export function getCategorySection(categoryName: string): string {
  return CATEGORY_SECTIONS[categoryName] || "Domain-Specific";
}
