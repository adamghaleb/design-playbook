import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  basePath?: string;
}

export function Breadcrumbs({ items, basePath = "/" }: BreadcrumbsProps) {
  return (
    <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
      <Link
        href={basePath}
        className="hover:text-foreground hover:underline transition-colors"
      >
        Home
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="h-3 w-3 opacity-40" />
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-foreground hover:underline transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-serif font-medium text-foreground">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
