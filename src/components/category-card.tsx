import Link from "next/link";
import type { Category } from "@/lib/types";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all hover:border-zinc-600 hover:bg-accent"
    >
      <div>
        <div className="mb-3 flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: category.color }}
          />
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {category.section}
          </span>
        </div>
        <h3 className="text-sm font-semibold leading-tight text-foreground">
          {category.name}
        </h3>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {category.count} practices
        </span>
        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
