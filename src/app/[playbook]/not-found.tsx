import Link from "next/link";
import { Home } from "lucide-react";

export default function PlaybookNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <h1 className="mb-2 text-6xl font-medium text-muted-foreground/20">
        404
      </h1>
      <h2 className="mb-2 font-serif text-lg font-medium">Page not found</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist in this playbook.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-foreground hover:bg-surface-2 transition-colors"
      >
        <Home className="h-4 w-4" />
        Back to Playbooks
      </Link>
    </div>
  );
}
