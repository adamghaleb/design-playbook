export interface PlaybookConfig {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  accentColor: string;
  icon: string;
  hasResearch: boolean;
}

const playbooks: PlaybookConfig[] = [
  {
    slug: "design",
    name: "UX Design Playbook",
    shortName: "UX Design",
    description:
      "UX & product design best practices backed by research. From cognitive psychology to component patterns.",
    accentColor: "#7c6f5e",
    icon: "Palette",
    hasResearch: false,
  },
  {
    slug: "adhd",
    name: "ADHD Playbook",
    shortName: "ADHD",
    description:
      "912 research-backed strategies for thriving with ADHD. Neuroscience, self-regulation, tools, and systems.",
    accentColor: "#e07c4f",
    icon: "Brain",
    hasResearch: false,
  },
  {
    slug: "gamification",
    name: "Gamification Playbook",
    shortName: "Gamification",
    description:
      "375 addictive game mechanics, dopamine design patterns, and engagement loops backed by behavioral science.",
    accentColor: "#8b5cf6",
    icon: "Gamepad2",
    hasResearch: false,
  },
  {
    slug: "metacognition",
    name: "Metacognition Playbook",
    shortName: "Metacognition",
    description:
      "580 strategies for thinking about thinking. Cognitive reappraisal, self-regulation, and mental model mastery.",
    accentColor: "#0ea5e9",
    icon: "Lightbulb",
    hasResearch: false,
  },
  {
    slug: "plugins",
    name: "Plugin Design Playbook",
    shortName: "Plugin Design",
    description:
      "508 best practices for Adobe plugin UI — knobs, dials, panels, and creative tool interfaces for AE & Premiere.",
    accentColor: "#f43f5e",
    icon: "Plug",
    hasResearch: false,
  },
  {
    slug: "micrographics",
    name: "Micrographics Playbook",
    shortName: "Micrographics",
    description:
      "483 techniques for micrography, calligrams, shaped text, and typographic illustration art.",
    accentColor: "#14b8a6",
    icon: "Type",
    hasResearch: false,
  },
];

const playbookBySlug = new Map<string, PlaybookConfig>();
playbooks.forEach((p) => playbookBySlug.set(p.slug, p));

export function getPlaybook(slug: string): PlaybookConfig | undefined {
  return playbookBySlug.get(slug);
}

export function getAllPlaybooks(): PlaybookConfig[] {
  return playbooks;
}

export function getPlaybookSlugs(): string[] {
  return playbooks.map((p) => p.slug);
}
