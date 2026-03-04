import type { Metadata } from "next";
import { getAllPractices, getAllCategories, getAllTags } from "@/lib/data";
import { BrowseClient } from "./browse-client";

export const metadata: Metadata = {
  title: "Browse All — Design Playbook",
  description: "Search and filter all 633 UX design best practices",
};

export default function BrowsePage() {
  const practices = getAllPractices();
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <BrowseClient practices={practices} categories={categories} tags={tags} />
  );
}
