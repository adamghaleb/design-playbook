import { getSections, getStats } from "@/lib/data";
import { CategoryCard } from "@/components/category-card";
import { BookOpen, Layers, Tag, TrendingUp } from "lucide-react";

export default function HomePage() {
  const sections = getSections();
  const stats = getStats();

  return (
    <div>
      {/* Hero */}
      <div className="mb-12">
        <h1 className="mb-3 text-3xl font-bold tracking-tight">
          Design Playbook
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          A curated collection of{" "}
          <span className="text-foreground font-medium">
            {stats.totalPractices}
          </span>{" "}
          UX &amp; product design best practices across{" "}
          <span className="text-foreground font-medium">
            {stats.totalCategories}
          </span>{" "}
          categories. Research-backed principles for building better products.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard
          icon={<BookOpen className="h-4 w-4" />}
          label="Practices"
          value={stats.totalPractices}
        />
        <StatCard
          icon={<Layers className="h-4 w-4" />}
          label="Categories"
          value={stats.totalCategories}
        />
        <StatCard
          icon={<Tag className="h-4 w-4" />}
          label="Tags"
          value={stats.totalTags}
        />
        <StatCard
          icon={<TrendingUp className="h-4 w-4" />}
          label="Avg Score"
          value={stats.avgScore}
        />
      </div>

      {/* Category grid by section */}
      {sections.map((section) => (
        <div key={section.name} className="mb-10">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {section.name}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {section.categories.map((cat) => (
              <CategoryCard key={cat.slug} category={cat} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-2 flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
