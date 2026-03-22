"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlaybook } from "./playbook-context";
import type { Section } from "@/lib/types";

interface NavLinksProps {
  sections: Section[];
  colorsLight: Record<string, string>;
  hasResearch?: boolean;
  onNavigate?: () => void;
}

export function NavLinks({
  sections,
  colorsLight,
  hasResearch,
  onNavigate,
}: NavLinksProps) {
  const pathname = usePathname();
  const playbook = usePlaybook();
  const basePath = `/${playbook.slug}`;

  return (
    <>
      <div className="mb-2">
        <Link
          href={`${basePath}/browse`}
          onClick={onNavigate}
          className={`relative flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
            pathname === `${basePath}/browse`
              ? "bg-primary-glow text-foreground"
              : "text-muted-foreground hover:bg-surface-2/60 hover:text-foreground hover:translate-x-0.5"
          }`}
        >
          {pathname === `${basePath}/browse` && (
            <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full bg-primary transition-all duration-300" />
          )}
          Browse All
        </Link>
      </div>

      {sections.map((section) => (
        <NavSection
          key={section.name}
          section={section}
          colorsLight={colorsLight}
          basePath={basePath}
          pathname={pathname}
          onNavigate={onNavigate}
        />
      ))}

      {hasResearch && (
        <div className="mb-2 mt-4 border-t border-border-subtle pt-4">
          <Link
            href={`${basePath}/research`}
            onClick={onNavigate}
            className={`relative flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
              pathname === `${basePath}/research` ||
              pathname.startsWith(`${basePath}/research/`)
                ? "bg-primary-glow text-foreground"
                : "text-muted-foreground hover:bg-surface-2/60 hover:text-foreground hover:translate-x-0.5"
            }`}
          >
            {(pathname === `${basePath}/research` ||
              pathname.startsWith(`${basePath}/research/`)) && (
              <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full bg-primary transition-all duration-300" />
            )}
            Research
          </Link>
        </div>
      )}
    </>
  );
}

function NavSection({
  section,
  colorsLight,
  basePath,
  pathname,
  onNavigate,
}: {
  section: Section;
  colorsLight: Record<string, string>;
  basePath: string;
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
          pathname === `${basePath}/category/${cat.slug}` ||
          pathname.startsWith(`${basePath}/category/${cat.slug}/`);
        const mutedColor = colorsLight[cat.name] || cat.color;
        return (
          <Link
            key={cat.slug}
            href={`${basePath}/category/${cat.slug}`}
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
