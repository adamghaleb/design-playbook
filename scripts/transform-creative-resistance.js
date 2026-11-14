const fs = require("fs");
const path = require("path");

const INPUT =
  "/Users/adamghaleb/Downloads/creative-resistance-playbook/playbook.json";
const OUT_DIR = path.resolve(__dirname, "../data/creative-resistance");

const raw = JSON.parse(fs.readFileSync(INPUT, "utf-8"));

// --- Helpers ---
function toSlug(str, maxLen = 80) {
  return str
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, maxLen);
}

// --- 1. practices.json ---
const practices = raw.map((entry) => {
  // Fix tags: split any comma-separated strings
  const tags = entry.tags.flatMap((t) =>
    t.includes(",") ? t.split(",").map((s) => s.trim()) : [t],
  );

  return {
    id: entry.id,
    title: entry.best_practice,
    slug: toSlug(entry.best_practice),
    category: entry.category,
    categorySlug: toSlug(entry.category),
    subcategory: entry.subcategory,
    context: entry.context,
    sources: entry.sources,
    practicalityScore: Math.round(entry.practicality_score),
    tags,
  };
});

// --- 2. categories.json ---
// Group 24 categories into 5 logical sections
const sectionMap = {
  "Accountability & Social Architecture": "Social & External",
  "ADHD & Dopamine-Deficit Resistance": "Neuroscience & Psychology",
  "Amateur vs Professional Mindset": "Identity & Mindset",
  "Anatomy of Resistance": "Understanding Resistance",
  "Creative Vocation & Calling": "Identity & Mindset",
  "Daily Practice & Showing Up": "Habits & Systems",
  "Ego, Identity & Creative Avoidance": "Identity & Mindset",
  "Environmental Design": "Habits & Systems",
  "Fear Architecture": "Neuroscience & Psychology",
  "Flow State Engineering": "Neuroscience & Psychology",
  "Gamification & Reward Design": "Habits & Systems",
  "Mastery & Technique Commitment": "Identity & Mindset",
  "Perfectionism & Inner Critic": "Understanding Resistance",
  "Procrastination Neuroscience": "Neuroscience & Psychology",
  "Professional Habits & Rituals": "Habits & Systems",
  "Resilience & Recovery from Failure": "Shipping & Resilience",
  "Resistance Disguises & Symptoms": "Understanding Resistance",
  "Resistance & Self-Sabotage Patterns": "Understanding Resistance",
  "Self-Validation & Detachment from Outcomes": "Shipping & Resilience",
  "Shadow Lives & Shadow Careers": "Understanding Resistance",
  "Shipping & Finishing": "Shipping & Resilience",
  "Start Mechanics & Activation Energy": "Habits & Systems",
  "Territory vs Hierarchy": "Identity & Mindset",
  "The Muse & Creative Source": "Shipping & Resilience",
};

// Distinct colors per category (warm-to-cool spectrum)
const colorPalettesLight = [
  "#C4906A",
  "#BF7A7A",
  "#B87A9E",
  "#A882B8",
  "#9A85B5",
  "#8E84B8",
  "#8185B5",
  "#7A94B8",
  "#6FA0B5",
  "#6DA5AB",
  "#72A89E",
  "#6FA898",
  "#7AAB8A",
  "#8EA87A",
  "#B5A46A",
  "#BFA06E",
  "#C4906A",
  "#C49A78",
  "#C4AA72",
  "#95A872",
  "#72AB9E",
  "#9E8ABF",
  "#8A9EC4",
  "#7AA5C4",
];

const colorPalettesDark = [
  "#D4A07A",
  "#CF8A8A",
  "#C88AAE",
  "#B892C8",
  "#AA95C5",
  "#9F8FC9",
  "#9195C5",
  "#8AA4C8",
  "#7FB0C5",
  "#7DB5BB",
  "#82B8AE",
  "#7FB8A8",
  "#8ABB9A",
  "#9EB88A",
  "#C5B47A",
  "#CFB07E",
  "#D4A07A",
  "#D4AA88",
  "#D4BA82",
  "#A5B882",
  "#82BBAE",
  "#AE9ACF",
  "#9AAED4",
  "#8AB5D4",
];

const uniqueCategories = [...new Set(raw.map((e) => e.category))];
const categories = uniqueCategories.map((name, i) => ({
  name,
  slug: toSlug(name),
  count: raw.filter((e) => e.category === name).length,
  section: sectionMap[name] || "Other",
  color: colorPalettesLight[i % colorPalettesLight.length],
}));

// --- 3. tags.json ---
const allTags = new Set();
practices.forEach((p) => p.tags.forEach((t) => allTags.add(t)));
const tags = [...allTags].sort();

// --- 4. meta.json ---
const sectionOrder = [
  "Understanding Resistance",
  "Neuroscience & Psychology",
  "Identity & Mindset",
  "Habits & Systems",
  "Shipping & Resilience",
];

const categorySections = {};
categories.forEach((c) => {
  categorySections[c.name] = c.section;
});

const categoryColorsLight = {};
const categoryColorsDark = {};
categories.forEach((c, i) => {
  categoryColorsLight[c.name] =
    colorPalettesLight[i % colorPalettesLight.length];
  categoryColorsDark[c.name] = colorPalettesDark[i % colorPalettesDark.length];
});

const meta = {
  sectionOrder,
  categorySections,
  categoryColorsLight,
  categoryColorsDark,
};

// --- Write files ---
fs.mkdirSync(OUT_DIR, { recursive: true });

const write = (name, data) => {
  const fp = path.join(OUT_DIR, name);
  fs.writeFileSync(fp, JSON.stringify(data, null, 2) + "\n");
  console.log(
    `Wrote ${fp} (${Array.isArray(data) ? data.length + " items" : "object"})`,
  );
};

write("practices.json", practices);
write("categories.json", categories);
write("tags.json", tags);
write("meta.json", meta);

// --- Validate ---
console.log("\nValidation:");
["practices.json", "categories.json", "tags.json", "meta.json"].forEach((f) => {
  try {
    JSON.parse(fs.readFileSync(path.join(OUT_DIR, f), "utf-8"));
    console.log(`  ${f}: valid JSON`);
  } catch (e) {
    console.error(`  ${f}: INVALID - ${e.message}`);
  }
});

console.log(`\nSummary:`);
console.log(`  Practices: ${practices.length}`);
console.log(`  Categories: ${categories.length}`);
console.log(`  Tags: ${tags.length}`);
console.log(`  Sections: ${sectionOrder.length}`);
