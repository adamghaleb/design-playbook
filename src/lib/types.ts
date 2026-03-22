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

export type SectionName = string;

export interface Section {
  name: SectionName;
  categories: Category[];
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  content: string;
  readingTime: number;
  tags: string[];
  publishedAt: string;
}

export interface PlaybookMeta {
  sectionOrder: string[];
  categorySections: Record<string, string>;
  categoryColorsLight: Record<string, string>;
  categoryColorsDark: Record<string, string>;
}
