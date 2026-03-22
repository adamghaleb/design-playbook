import Link from "next/link";
import { getAllPlaybooks } from "@/lib/playbooks";
import { getStats } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  const playbooks = getAllPlaybooks();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-24 sm:py-32">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h1 className="mb-6">
            <span className="block font-bethany text-5xl sm:text-7xl tracking-tight text-foreground/90">
              The Ultimate
            </span>
            <span className="block font-serif text-4xl sm:text-6xl font-semibold tracking-tight mt-1">
              Playbook
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Research-backed playbooks for building better everything.
          </p>
        </div>

        {/* Playbook cards grid */}
        <div className="w-full max-w-3xl mx-auto grid gap-5 sm:grid-cols-2">
          {playbooks.map((pb) => {
            const stats = getStats(pb.slug);
            return (
              <Link
                key={pb.slug}
                href={`/${pb.slug}`}
                className="group relative rounded-xl border border-border-subtle bg-surface-1 p-8 transition-all duration-300 hover:border-border-hover hover:bg-surface-2 card-elevated noise"
              >
                {/* Accent dot + name */}
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{
                      backgroundColor: pb.accentColor,
                      boxShadow: `0 0 8px ${pb.accentColor}30`,
                    }}
                  />
                  <h2 className="font-serif text-xl font-semibold tracking-tight">
                    {pb.shortName}
                  </h2>
                </div>

                {/* Description */}
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  {pb.description}
                </p>

                {/* Stats row */}
                <div className="mb-6 flex gap-6 text-xs text-muted-foreground">
                  <span>
                    <span className="font-medium text-foreground">
                      {stats.totalPractices}
                    </span>{" "}
                    practices
                  </span>
                  <span>
                    <span className="font-medium text-foreground">
                      {stats.totalCategories}
                    </span>{" "}
                    categories
                  </span>
                </div>

                {/* Arrow */}
                <div className="flex items-center gap-1.5 text-sm font-medium text-primary">
                  <span>Explore</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border px-8 py-6 text-center text-xs text-muted-foreground">
        Built with research. Designed with care.
      </footer>
    </div>
  );
}
