import { notFound } from "next/navigation";
import { getPlaybook, getPlaybookSlugs } from "@/lib/playbooks";
import {
  getSections,
  getStats,
  getCategoryColorsLight,
  getAllArticles,
} from "@/lib/data";
import { HomeContent } from "@/components/home-content";
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
    title: `${pb.name}`,
    description: pb.description,
  };
}

export default async function PlaybookHomePage({
  params,
}: {
  params: Promise<{ playbook: string }>;
}) {
  const { playbook } = await params;
  const pb = getPlaybook(playbook);
  if (!pb) notFound();

  const sections = getSections(playbook);
  const stats = getStats(playbook);
  const colorsLight = getCategoryColorsLight(playbook);
  const articles = getAllArticles(playbook);

  return (
    <HomeContent
      sections={sections}
      stats={stats}
      basePath={`/${playbook}`}
      playbookName={pb.name}
      colorsLight={colorsLight}
      hasResearch={pb.hasResearch}
      totalArticles={articles.length}
    />
  );
}
