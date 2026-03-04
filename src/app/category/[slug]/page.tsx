import { notFound } from "next/navigation";
import {
  getAllCategories,
  getCategoryBySlug,
  getPracticesByCategory,
} from "@/lib/data";
import { PracticeGrid } from "@/components/practice-grid";
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

      <div className="relative mb-14">
        {/* Ambient category color glow */}
        <div
          className="pointer-events-none absolute -inset-8 -z-10 rounded-3xl opacity-60"
          style={{
            background: `radial-gradient(ellipse 60% 40% at 30% 50%, ${category.color}0a 0%, transparent 70%)`,
          }}
        />

        <div className="mb-3 flex items-center gap-3">
          <span
            className="h-3.5 w-3.5 rounded-full"
            style={{
              backgroundColor: category.color,
              boxShadow: `0 0 10px ${category.color}40`,
            }}
          />
          <Badge color={category.color}>{category.section}</Badge>
        </div>
        <h1 className="mb-3 text-2xl font-bold tracking-tight">
          {category.name}
        </h1>
        <p className="text-sm text-muted-foreground">
          {category.count} best practices
        </p>
      </div>

      <PracticeGrid practices={practices} />
    </div>
  );
}
