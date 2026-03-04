import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllPractices,
  getPracticeById,
  getAdjacentPractices,
  getCategoryBySlug,
  getCategoryColor,
} from "@/lib/data";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Badge } from "@/components/badge";
import { ScoreDots } from "@/components/score-dots";
import {
  PracticeDetailWrapper,
  PracticeHeader,
} from "@/components/practice-detail";
import { ArrowLeft, ArrowRight, ExternalLink, BookOpen } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllPractices().map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const practice = getPracticeById(id);
  if (!practice) return {};
  return {
    title: `${practice.title} — Design Playbook`,
    description: practice.context.slice(0, 160),
  };
}

function parseSources(sources: string): { text: string; url?: string }[] {
  if (!sources) return [];

  const parts: { text: string; url?: string }[] = [];
  const segments = sources.split(/,\s+(?=[A-Z]|http)/);

  let current = "";
  for (const seg of segments) {
    if (seg.startsWith("http")) {
      if (current) {
        parts.push({ text: current.trim(), url: seg.trim() });
        current = "";
      } else {
        parts.push({ text: seg.trim(), url: seg.trim() });
      }
    } else {
      if (current) {
        parts.push({ text: current.trim() });
      }
      current = seg;
    }
  }
  if (current) {
    const urlMatch = current.match(/(https?:\/\/\S+)/);
    if (urlMatch) {
      const textPart = current
        .replace(urlMatch[0], "")
        .trim()
        .replace(/,\s*$/, "");
      parts.push({ text: textPart || urlMatch[0], url: urlMatch[0] });
    } else {
      parts.push({ text: current.trim() });
    }
  }

  return parts.filter((p) => p.text);
}

export default async function PracticePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const practice = getPracticeById(id);
  if (!practice) notFound();

  const category = getCategoryBySlug(practice.categorySlug);
  const color = getCategoryColor(practice.category);
  const { prev, next } = getAdjacentPractices(id, practice.categorySlug);
  const sources = parseSources(practice.sources);

  return (
    <PracticeDetailWrapper>
      <div className="max-w-3xl">
        <Breadcrumbs
          items={[
            {
              label: practice.category,
              href: `/category/${practice.categorySlug}`,
            },
            {
              label:
                practice.title.length > 40
                  ? practice.title.slice(0, 40) + "…"
                  : practice.title,
            },
          ]}
        />

        {/* Header */}
        <PracticeHeader color={color}>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-muted-foreground">
              {practice.id}
            </span>
            <Badge color={color}>{practice.category}</Badge>
            {practice.subcategory && (
              <Badge variant="outline">{practice.subcategory}</Badge>
            )}
          </div>
          <h1 className="mb-5 text-2xl font-bold tracking-tight">
            {practice.title}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                Practicality
              </span>
              <ScoreDots score={practice.practicalityScore} />
            </div>
          </div>
        </PracticeHeader>

        {/* Context */}
        <div className="noise relative mb-12 overflow-hidden rounded-xl border border-border-subtle bg-surface-1 p-7 pl-10 card-elevated">
          {/* Left color accent strip */}
          <div
            className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full"
            style={{ backgroundColor: color, opacity: 0.6 }}
          />
          <div className="relative z-10 mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
            <BookOpen className="h-4 w-4" />
            Context
          </div>
          <p className="relative z-10 text-sm leading-relaxed text-muted-foreground">
            {practice.context}
          </p>
        </div>

        {/* Tags */}
        {practice.tags.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Tags
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {practice.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Sources */}
        {sources.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Sources
            </h2>
            <div className="space-y-3">
              {sources.map((source, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border-subtle bg-surface-1 px-5 py-4 text-sm text-muted-foreground"
                >
                  {source.url ? (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      {source.text}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    source.text
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prev/Next navigation */}
        <div className="flex items-center justify-between border-t border-border pt-10">
          {prev ? (
            <Link
              href={`/practice/${prev.id}`}
              className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
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
              href={`/practice/${next.id}`}
              className="group flex items-center gap-2 rounded-lg px-3 py-2 text-right text-sm text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
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
    </PracticeDetailWrapper>
  );
}
