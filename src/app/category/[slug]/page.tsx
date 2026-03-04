import { notFound } from "next/navigation";
import {
  getAllCategories,
  getCategoryBySlug,
  getPracticesByCategory,
} from "@/lib/data";
import { PracticeCard } from "@/components/practice-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Badge } from "@/components/badge";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.name} — Design Playbook`,
    description: `${category.count} UX best practices in ${category.name}`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const practices = getPracticesByCategory(slug);

  return (
    <div>
      <Breadcrumbs items={[{ label: category.name }]} />

      <div className="mb-8">
        <div className="mb-3 flex items-center gap-3">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: category.color }}
          />
          <Badge color={category.color}>{category.section}</Badge>
        </div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight">
          {category.name}
        </h1>
        <p className="text-sm text-muted-foreground">
          {category.count} best practices
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {practices.map((p) => (
          <PracticeCard key={p.id} practice={p} />
        ))}
      </div>
    </div>
  );
}
