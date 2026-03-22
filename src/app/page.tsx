import { getAllPlaybooks } from "@/lib/playbooks";
import { getStats } from "@/lib/data";
import { LandingClient } from "@/components/landing-client";

export default function LandingPage() {
  const playbooks = getAllPlaybooks().map((pb) => ({
    ...pb,
    stats: getStats(pb.slug),
  }));

  return <LandingClient playbooks={playbooks} />;
}
