import type {
  Practice,
  Category,
  Section,
  Article,
  PlaybookMeta,
} from "./types";

// Static imports for each playbook's data
import designPractices from "../../data/design/practices.json";
import designCategories from "../../data/design/categories.json";
import designTags from "../../data/design/tags.json";
import designMeta from "../../data/design/meta.json";

import adhdPractices from "../../data/adhd/practices.json";
import adhdCategories from "../../data/adhd/categories.json";
import adhdTags from "../../data/adhd/tags.json";
import adhdMeta from "../../data/adhd/meta.json";

import gamificationPractices from "../../data/gamification/practices.json";
import gamificationCategories from "../../data/gamification/categories.json";
import gamificationTags from "../../data/gamification/tags.json";
import gamificationMeta from "../../data/gamification/meta.json";

import metacognitionPractices from "../../data/metacognition/practices.json";
import metacognitionCategories from "../../data/metacognition/categories.json";
import metacognitionTags from "../../data/metacognition/tags.json";
import metacognitionMeta from "../../data/metacognition/meta.json";

import pluginsPractices from "../../data/plugins/practices.json";
import pluginsCategories from "../../data/plugins/categories.json";
import pluginsTags from "../../data/plugins/tags.json";
import pluginsMeta from "../../data/plugins/meta.json";

// Registry of all playbook data (add new playbooks here)
const PLAYBOOK_DATA: Record<
  string,
  {
    practices: Practice[];
    categories: Category[];
    tags: string[];
    articles: Article[];
    meta: PlaybookMeta;
  }
> = {
  design: {
    practices: designPractices as Practice[],
    categories: designCategories as Category[],
    tags: designTags as string[],
    articles: [],
    meta: designMeta as PlaybookMeta,
  },
  adhd: {
    practices: adhdPractices as Practice[],
    categories: adhdCategories as Category[],
    tags: adhdTags as string[],
    articles: [],
    meta: adhdMeta as PlaybookMeta,
  },
  gamification: {
    practices: gamificationPractices as Practice[],
    categories: gamificationCategories as Category[],
    tags: gamificationTags as string[],
    articles: [],
    meta: gamificationMeta as PlaybookMeta,
  },
  metacognition: {
    practices: metacognitionPractices as Practice[],
    categories: metacognitionCategories as Category[],
    tags: metacognitionTags as string[],
    articles: [],
    meta: metacognitionMeta as PlaybookMeta,
  },
  plugins: {
    practices: pluginsPractices as Practice[],
    categories: pluginsCategories as Category[],
    tags: pluginsTags as string[],
    articles: [],
    meta: pluginsMeta as PlaybookMeta,
  },
};

// Per-playbook indexed cache
interface PlaybookData {
  practices: Practice[];
  categories: Category[];
  tags: string[];
  articles: Article[];
  meta: PlaybookMeta;
  practiceById: Map<string, Practice>;
  practicesByCategory: Map<string, Practice[]>;
  categoryBySlug: Map<string, Category>;
  articleBySlug: Map<string, Article>;
}

const cache = new Map<string, PlaybookData>();

function loadPlaybookData(playbookSlug: string): PlaybookData {
  const cached = cache.get(playbookSlug);
  if (cached) return cached;

  const raw = PLAYBOOK_DATA[playbookSlug];
  if (!raw) {
    return {
      practices: [],
      categories: [],
      tags: [],
      articles: [],
      meta: {
        sectionOrder: [],
        categorySections: {},
        categoryColorsLight: {},
        categoryColorsDark: {},
      },
      practiceById: new Map(),
      practicesByCategory: new Map(),
      categoryBySlug: new Map(),
      articleBySlug: new Map(),
    };
  }

  const practiceById = new Map<string, Practice>();
  const practicesByCategory = new Map<string, Practice[]>();
  const categoryBySlug = new Map<string, Category>();
  const articleBySlug = new Map<string, Article>();

  raw.practices.forEach((p) => {
    practiceById.set(p.id, p);
    const list = practicesByCategory.get(p.categorySlug) || [];
    list.push(p);
    practicesByCategory.set(p.categorySlug, list);
  });

  raw.categories.forEach((c) => {
    categoryBySlug.set(c.slug, c);
  });

  raw.articles.forEach((a) => {
    articleBySlug.set(a.slug, a);
  });

  const data: PlaybookData = {
    ...raw,
    practiceById,
    practicesByCategory,
    categoryBySlug,
    articleBySlug,
  };

  cache.set(playbookSlug, data);
  return data;
}

export function getAllPractices(playbook: string): Practice[] {
  return loadPlaybookData(playbook).practices;
}

export function getPracticeById(
  playbook: string,
  id: string,
): Practice | undefined {
  return loadPlaybookData(playbook).practiceById.get(id);
}

export function getPracticesByCategory(
  playbook: string,
  slug: string,
): Practice[] {
  return loadPlaybookData(playbook).practicesByCategory.get(slug) || [];
}

export function getAllCategories(playbook: string): Category[] {
  return loadPlaybookData(playbook).categories;
}

export function getCategoryBySlug(
  playbook: string,
  slug: string,
): Category | undefined {
  return loadPlaybookData(playbook).categoryBySlug.get(slug);
}

export function getAllTags(playbook: string): string[] {
  return loadPlaybookData(playbook).tags;
}

export function getAllArticles(playbook: string): Article[] {
  return loadPlaybookData(playbook).articles;
}

export function getArticleBySlug(
  playbook: string,
  slug: string,
): Article | undefined {
  return loadPlaybookData(playbook).articleBySlug.get(slug);
}

export function getSections(playbook: string): Section[] {
  const data = loadPlaybookData(playbook);
  return data.meta.sectionOrder.map((name) => ({
    name,
    categories: data.categories
      .filter((c) => c.section === name)
      .sort((a, b) => b.count - a.count),
  }));
}

export function getAdjacentPractices(
  playbook: string,
  id: string,
  categorySlug: string,
): { prev: Practice | null; next: Practice | null } {
  const list =
    loadPlaybookData(playbook).practicesByCategory.get(categorySlug) || [];
  const idx = list.findIndex((p) => p.id === id);
  return {
    prev: idx > 0 ? list[idx - 1] : null,
    next: idx < list.length - 1 ? list[idx + 1] : null,
  };
}

export function getStats(playbook: string) {
  const data = loadPlaybookData(playbook);
  return {
    totalPractices: data.practices.length,
    totalCategories: data.categories.length,
    totalTags: data.tags.length,
    totalArticles: data.articles.length,
    avgScore:
      data.practices.length > 0
        ? Math.round(
            (data.practices.reduce((sum, p) => sum + p.practicalityScore, 0) /
              data.practices.length) *
              10,
          ) / 10
        : 0,
  };
}

export function getCategoryColor(
  playbook: string,
  categoryName: string,
): string {
  const cat = loadPlaybookData(playbook).categories.find(
    (c) => c.name === categoryName,
  );
  return cat?.color || "#6366f1";
}

export function getCategoryColorLight(
  playbook: string,
  categoryName: string,
): string {
  return (
    loadPlaybookData(playbook).meta.categoryColorsLight[categoryName] ||
    "#8185B5"
  );
}

export function getCategoryColorDark(
  playbook: string,
  categoryName: string,
): string {
  return (
    loadPlaybookData(playbook).meta.categoryColorsDark[categoryName] ||
    "#9195C5"
  );
}

export function getCategorySection(
  playbook: string,
  categoryName: string,
): string {
  return (
    loadPlaybookData(playbook).meta.categorySections[categoryName] || "General"
  );
}

export function getCategoryColorsLight(
  playbook: string,
): Record<string, string> {
  return loadPlaybookData(playbook).meta.categoryColorsLight;
}

export function getCategoryColorsDark(
  playbook: string,
): Record<string, string> {
  return loadPlaybookData(playbook).meta.categoryColorsDark;
}
