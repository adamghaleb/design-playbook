import { notFound } from "next/navigation";
import Link from "next/link";
import { getPlaybook, getPlaybookSlugs } from "@/lib/playbooks";
import { getAllArticles, getCategoryColorLight } from "@/lib/data";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Badge } from "@/components/badge";
import { Clock, Calendar, FileText } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getPlaybookSlugs().map((playbook) => ({ playbook }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ playbook: string }>;
}): Promise<Metadata> {
  const { playbook } = await params;
  const pb = getPlaybook(playbook);
  if (!pb) return {};
  return {
    title: `Research — ${pb.name}`,
    description: `Research articles and deep dives for ${pb.name}`,
  };
}

export default async function ResearchPage({
  params,
}: {
  params: Promise<{ playbook: string }>;
}) {
  const { playbook } = await params;
  const pb = getPlaybook(playbook);
  if (!pb) notFound();

  const articles = getAllArticles(playbook);

  return (
    <div>
      <Breadcrumbs items={[{ label: "Research" }]} basePath={`/${playbook}`} />

      <div className="mb-16">
        <h1 className="mb-3 font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
          Research
        </h1>
        <p className="text-base text-muted-foreground">
          {articles.length} articles exploring the evidence behind the
          practices.
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FileText className="mb-4 h-10 w-10 text-muted-foreground/30" />
          <h2 className="mb-2 font-serif text-lg font-medium text-muted-foreground">
            No articles yet
          </h2>
          <p className="text-sm text-muted-foreground/70">
            Research articles for this playbook are coming soon.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {articles.map((article) => {
            const color = getCategoryColorLight(playbook, article.category);
            return (
              <Link
                key={article.slug}
                href={`/${playbook}/research/${article.slug}`}
                className="group rounded-xl border border-border-subtle bg-surface-1 p-6 transition-all duration-300 hover:border-border-hover hover:bg-surface-2 card-elevated noise"
              >
                {/* Category + date */}
                <div className="mb-3 flex items-center gap-3">
                  <Badge color={color}>{article.category}</Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(article.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* Title */}
                <h2 className="mb-2 font-serif text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">
                  {article.title}
                </h2>

                {/* Description */}
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {article.description}
                </p>

                {/* Meta row */}
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {article.readingTime} min read
                  </span>
                  {article.tags.length > 0 && (
                    <div className="flex gap-1.5">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
