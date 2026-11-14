#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const SOURCE = path.join(
  require("os").homedir(),
  "Downloads/plugins playbook.json",
);
const OUT_DIR = path.resolve(__dirname, "../data/plugins");

const raw = JSON.parse(fs.readFileSync(SOURCE, "utf-8"));

// --- Helpers ---
function toSlug(str, maxLen = 80) {
  return str
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, maxLen);
}

function splitTags(tagsArr) {
  const result = [];
  for (const t of tagsArr) {
    for (const part of t.split(",")) {
      const trimmed = part.trim();
      if (trimmed && !result.includes(trimmed)) {
        result.push(trimmed);
      }
    }
  }
  return result;
}

// --- 1. practices.json ---
const practices = raw.map((entry) => ({
  id: entry.id,
  title: entry.best_practice,
  slug: toSlug(entry.best_practice),
  category: entry.category,
  categorySlug: toSlug(entry.category),
  subcategory: entry.subcategory,
  context: entry.context,
  sources: entry.sources,
  practicalityScore: Math.round(entry.practicality_score),
  tags: splitTags(entry.tags),
}));

// --- 2. categories.json ---
// Group categories into sections
const sectionMap = {
  "Knob & Dial Design": "Controls & Interaction",
  "Slider & Fader Design": "Controls & Interaction",
  "Direct Manipulation & Spatial Controls": "Controls & Interaction",
  "Input Modes & Text Entry": "Controls & Interaction",
  "Keyboard Shortcuts & Power User Efficiency": "Controls & Interaction",
  "Neo-Skeumorphic Fundamentals": "Visual & Aesthetic",
  "Dark Mode & Color Systems": "Visual & Aesthetic",
  "Depth, Shadow & Lighting": "Visual & Aesthetic",
  "Typography & Value Display": "Visual & Aesthetic",
  "Animation & Micro-Interactions": "Visual & Aesthetic",
  "Visual Feedback & Meters": "Visual & Aesthetic",
  "Progressive Disclosure Patterns": "Information Architecture",
  "Preset Systems & Content Discovery": "Information Architecture",
  "Parameter Organization & Grouping": "Information Architecture",
  "Contextual Controls & Conditional UI": "Information Architecture",
  "Expert Mode & Layout Switching": "Information Architecture",
  "Perceived Responsiveness & Latency": "Experience & Polish",
  "Tactile & Haptic Feel in Digital Controls": "Experience & Polish",
  "Emotional Design & Visceral Quality": "Experience & Polish",
  "Onboarding & First-Use Experience": "Experience & Polish",
  "Accessibility in Creative Tools": "Experience & Polish",
  "Feature Gating & Tier Design": "Business & Monetization",
  "Upgrade Path & Monetization UX": "Business & Monetization",
  "Pricing Psychology for Plugins": "Business & Monetization",
  "Design Tokens & Theming": "Architecture & Systems",
  "Component Architecture (Atomic Design)": "Architecture & Systems",
  "Config-Driven Plugin Assembly": "Architecture & Systems",
  "Monorepo & Build Pipeline": "Architecture & Systems",
  "Update Propagation & Versioning": "Architecture & Systems",
};

// Distinct colors for 29 categories
const categoryColors = [
  "#E85D75",
  "#D94E8A",
  "#C74DB8",
  "#A855D6",
  "#8B5CF6",
  "#6D6FF0",
  "#4F7FE8",
  "#3B95E0",
  "#2DABD4",
  "#22BFC2",
  "#20C997",
  "#38D67A",
  "#5ACC5A",
  "#7EC843",
  "#A8C030",
  "#CCB820",
  "#E0A820",
  "#E89030",
  "#E87842",
  "#D46854",
  "#C9607A",
  "#B868A0",
  "#A070C0",
  "#8878D8",
  "#7080E8",
  "#5898E0",
  "#40B0D0",
  "#30C8B8",
  "#48D098",
];

const catCounts = {};
for (const p of practices) {
  catCounts[p.category] = (catCounts[p.category] || 0) + 1;
}

const uniqueCats = [...new Set(raw.map((d) => d.category))];
const categories = uniqueCats.map((name, i) => ({
  name,
  slug: toSlug(name),
  count: catCounts[name] || 0,
  section: sectionMap[name] || "Other",
  color: categoryColors[i % categoryColors.length],
}));

// --- 3. tags.json ---
const allTagsSet = new Set();
for (const p of practices) {
  for (const t of p.tags) {
    allTagsSet.add(t);
  }
}
const tags = [...allTagsSet].sort();

// --- 4. meta.json ---
const sectionOrder = [
  "Controls & Interaction",
  "Visual & Aesthetic",
  "Information Architecture",
  "Experience & Polish",
  "Business & Monetization",
  "Architecture & Systems",
];

const categorySections = {};
for (const cat of categories) {
  categorySections[cat.name] = cat.section;
}

// Light colors: muted versions
const categoryColorsLight = {};
const categoryColorsDark = {};
for (const cat of categories) {
  const hex = cat.color;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  // Muted: blend toward gray
  const lr = Math.round(r * 0.7 + 128 * 0.3);
  const lg = Math.round(g * 0.7 + 128 * 0.3);
  const lb = Math.round(b * 0.7 + 128 * 0.3);
  categoryColorsLight[cat.name] =
    "#" +
    lr.toString(16).padStart(2, "0") +
    lg.toString(16).padStart(2, "0") +
    lb.toString(16).padStart(2, "0");
  // Bright: lighten
  const dr = Math.min(255, Math.round(r * 1.15));
  const dg = Math.min(255, Math.round(g * 1.15));
  const db = Math.min(255, Math.round(b * 1.15));
  categoryColorsDark[cat.name] =
    "#" +
    dr.toString(16).padStart(2, "0") +
    dg.toString(16).padStart(2, "0") +
    db.toString(16).padStart(2, "0");
}

const meta = {
  sectionOrder,
  categorySections,
  categoryColorsLight,
  categoryColorsDark,
};

// --- Write files ---
fs.mkdirSync(OUT_DIR, { recursive: true });

fs.writeFileSync(
  path.join(OUT_DIR, "practices.json"),
  JSON.stringify(practices, null, 2),
);
fs.writeFileSync(
  path.join(OUT_DIR, "categories.json"),
  JSON.stringify(categories, null, 2),
);
fs.writeFileSync(
  path.join(OUT_DIR, "tags.json"),
  JSON.stringify(tags, null, 2),
);
fs.writeFileSync(
  path.join(OUT_DIR, "meta.json"),
  JSON.stringify(meta, null, 2),
);

console.log(`Wrote ${practices.length} practices`);
console.log(`Wrote ${categories.length} categories`);
console.log(`Wrote ${tags.length} tags`);
console.log(`Wrote meta.json with ${sectionOrder.length} sections`);

// --- Validate ---
for (const file of [
  "practices.json",
  "categories.json",
  "tags.json",
  "meta.json",
]) {
  try {
    JSON.parse(fs.readFileSync(path.join(OUT_DIR, file), "utf-8"));
    console.log(`  ${file} — valid JSON`);
  } catch (e) {
    console.error(`  ${file} — INVALID JSON: ${e.message}`);
    process.exit(1);
  }
}
