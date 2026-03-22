import { notFound } from "next/navigation";
import { getPlaybook, getPlaybookSlugs } from "@/lib/playbooks";
import { getAllPractices, getAllCategories, getAllTags } from "@/lib/data";
import { BrowseClient } from "./browse-client";
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
    title: `Browse All — ${pb.name}`,
    description: `Search and filter all best practices in ${pb.name}`,
  };
}

export default async function BrowsePage({
  params,
}: {
  params: Promise<{ playbook: string }>;
}) {
  const { playbook } = await params;
  const pb = getPlaybook(playbook);
  if (!pb) notFound();

  const practices = getAllPractices(playbook);
  const categories = getAllCategories(playbook);
  const tags = getAllTags(playbook);

  return (
    <BrowseClient
      practices={practices}
      categories={categories}
      tags={tags}
      basePath={`/${playbook}`}
    />
  );
}
