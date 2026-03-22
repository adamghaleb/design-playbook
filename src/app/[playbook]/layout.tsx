import { notFound } from "next/navigation";
import { getPlaybook } from "@/lib/playbooks";
import {
  getSections,
  getAllPractices,
  getAllCategories,
  getCategoryColorsLight,
} from "@/lib/data";
import { PlaybookProvider } from "@/components/playbook-context";
import { CommandPaletteProvider } from "@/components/command-palette";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { PageTransition } from "@/components/page-transition";

export default async function PlaybookLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ playbook: string }>;
}) {
  const { playbook: slug } = await params;
  const playbookConfig = getPlaybook(slug);
  if (!playbookConfig) notFound();

  const sections = getSections(slug);
  const practices = getAllPractices(slug);
  const categories = getAllCategories(slug);
  const colorsLight = getCategoryColorsLight(slug);
  const basePath = `/${slug}`;

  return (
    <PlaybookProvider playbook={playbookConfig}>
      <CommandPaletteProvider
        practices={practices}
        categories={categories}
        basePath={basePath}
      >
        <div className="flex min-h-screen">
          <Sidebar
            sections={sections}
            colorsLight={colorsLight}
            hasResearch={playbookConfig.hasResearch}
          />
          <MobileNav
            sections={sections}
            colorsLight={colorsLight}
            hasResearch={playbookConfig.hasResearch}
          />
          <main className="flex-1 lg:pl-[280px]">
            <div className="mx-auto max-w-5xl px-8 py-16 sm:px-10 lg:px-16">
              <PageTransition>{children}</PageTransition>
            </div>
          </main>
        </div>
      </CommandPaletteProvider>
    </PlaybookProvider>
  );
}
