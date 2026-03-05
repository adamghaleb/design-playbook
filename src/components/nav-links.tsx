"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSections } from "@/lib/data";
import { CATEGORY_COLORS_LIGHT } from "@/lib/types";
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
          className={`relative flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
            pathname === "/browse"
              ? "bg-primary-glow text-foreground"
              : "text-muted-foreground hover:bg-surface-2/60 hover:text-foreground hover:translate-x-0.5"
          }`}
        >
          {pathname === "/browse" && (
            <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full bg-primary transition-all duration-300" />
          )}
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
      <h3 className="mb-1.5 px-3 pt-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
        {section.name}
      </h3>
      {section.categories.map((cat) => {
        const isActive =
          pathname === `/category/${cat.slug}` ||
          pathname.startsWith(`/category/${cat.slug}/`);
        const mutedColor = CATEGORY_COLORS_LIGHT[cat.name] || cat.color;
        return (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            onClick={onNavigate}
            className={`group relative flex items-center justify-between rounded-md px-3 py-2 text-sm transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
              isActive
                ? "bg-primary-glow text-foreground"
                : "text-muted-foreground hover:bg-surface-2/60 hover:text-foreground hover:translate-x-0.5"
            }`}
          >
            {isActive && (
              <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full bg-primary transition-all duration-300" />
            )}
            <span className="flex min-w-0 items-center gap-2.5">
              <span className="relative shrink-0 flex items-center justify-center w-4 h-4">
                <span
                  className="absolute h-2 w-2 rounded-full transition-all duration-300 ease-out group-hover:shadow-[0_0_6px_var(--dot-color)]"
                  style={
                    {
                      backgroundColor: mutedColor,
                      "--dot-color": mutedColor,
                      transform: isActive ? "scale(1.25)" : undefined,
                    } as React.CSSProperties
                  }
                  aria-hidden="true"
                />
              </span>
              <span className="truncate">{cat.name}</span>
            </span>
            <span
              className={`ml-2 shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground group-hover:bg-surface-3 group-hover:text-foreground"
              }`}
            >
              {cat.count}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
