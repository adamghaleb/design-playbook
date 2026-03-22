import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllArticles,
  getArticleBySlug,
  getCategoryColorLight,
} from "@/lib/data";
import { getPlaybook, getPlaybookSlugs } from "@/lib/playbooks";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Badge } from "@/components/badge";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  const params: { playbook: string; slug: string }[] = [];
  for (const playbook of getPlaybookSlugs()) {
    for (const article of getAllArticles(playbook)) {
      params.push({ playbook, slug: article.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ playbook: string; slug: string }>;
}): Promise<Metadata> {
  const { playbook, slug } = await params;
  const pb = getPlaybook(playbook);
  const article = getArticleBySlug(playbook, slug);
  if (!pb || !article) return {};
  return {
    title: `${article.title} — ${pb.name}`,
    description: article.description,
  };
}

export default async function ResearchArticlePage({
  params,
}: {
  params: Promise<{ playbook: string; slug: string }>;
}) {
  const { playbook, slug } = await params;
  const pb = getPlaybook(playbook);
  if (!pb) notFound();

  const article = getArticleBySlug(playbook, slug);
  if (!article) notFound();

  const allArticles = getAllArticles(playbook);
  const currentIndex = allArticles.findIndex((a) => a.slug === slug);
  const prev = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const next =
    currentIndex < allArticles.length - 1
      ? allArticles[currentIndex + 1]
      : null;

  const color = getCategoryColorLight(playbook, article.category);

  return (
    <div className="max-w-3xl">
      <Breadcrumbs
        items={[
          { label: "Research", href: `/${playbook}/research` },
          {
            label:
              article.title.length > 40
                ? article.title.slice(0, 40) + "..."
                : article.title,
          },
        ]}
        basePath={`/${playbook}`}
      />

      {/* Header */}
      <div className="mb-12">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Badge color={color}>{article.category}</Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {article.readingTime} min read
          </span>
        </div>

        <h1 className="mb-4 font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
          {article.title}
        </h1>

        <p className="text-base leading-relaxed text-muted-foreground">
          {article.description}
        </p>
      </div>

      {/* Tags */}
      {article.tags.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Content — rendered as pre-formatted text for now */}
      <div className="prose-editorial mb-16">
        <div className="whitespace-pre-wrap text-base leading-relaxed text-foreground/90">
          {article.content}
        </div>
      </div>

      {/* Prev/Next navigation */}
      <div className="flex items-center justify-between border-t border-border pt-10">
        {prev ? (
          <Link
            href={`/${playbook}/research/${prev.slug}`}
            className="group flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <div>
              <div className="text-[10px] uppercase tracking-wider">
                Previous
              </div>
              <div className="font-medium text-foreground">{prev.title}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/${playbook}/research/${next.slug}`}
            className="group flex items-center gap-2 rounded-md px-3 py-2 text-right text-sm text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
          >
            <div>
              <div className="text-[10px] uppercase tracking-wider">Next</div>
              <div className="font-medium text-foreground">{next.title}</div>
            </div>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
