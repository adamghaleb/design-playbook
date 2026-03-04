"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSections } from "@/lib/data";
import type { Section } from "@/lib/types";

const sections = getSections();

interface NavLinksProps {
  onNavigate?: () => void;
}

export function NavLinks({ onNavigate }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <>
      <div className="mb-2">
        <Link
          href="/browse"
          onClick={onNavigate}
          className={`flex items-center rounded-md px-2 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 ${
            pathname === "/browse"
              ? "border-l-2 border-primary bg-primary-glow text-accent-foreground"
              : "text-muted-foreground hover:bg-surface-2 hover:text-foreground"
          }`}
        >
          Browse All
        </Link>
      </div>

      {sections.map((section) => (
        <NavSection
          key={section.name}
          section={section}
          pathname={pathname}
          onNavigate={onNavigate}
        />
      ))}
    </>
  );
}

function NavSection({
  section,
  pathname,
  onNavigate,
}: {
  section: Section;
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="mb-4">
      <h3 className="mb-1.5 px-2 pt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
        {section.name}
      </h3>
      {section.categories.map((cat) => {
        const isActive =
          pathname === `/category/${cat.slug}` ||
          pathname.startsWith(`/category/${cat.slug}/`);
        return (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            onClick={onNavigate}
            className={`group flex items-center justify-between rounded-md px-2 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 ${
              isActive
                ? "border-l-2 border-primary bg-primary-glow text-accent-foreground"
                : "text-muted-foreground hover:bg-surface-2 hover:text-foreground"
            }`}
          >
            <span className="flex items-center gap-2 truncate">
              <span
                className="h-2 w-2 rounded-full shrink-0 transition-all duration-200 group-hover:scale-125"
                style={{ backgroundColor: cat.color }}
                aria-hidden="true"
              />
              <span className="truncate">{cat.name}</span>
            </span>
            <span className="ml-2 shrink-0 rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              {cat.count}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
