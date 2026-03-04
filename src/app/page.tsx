import { getSections, getStats } from "@/lib/data";
import { HomeContent } from "@/components/home-content";

export default function HomePage() {
  const sections = getSections();
  const stats = getStats();

  return <HomeContent sections={sections} stats={stats} />;
}
