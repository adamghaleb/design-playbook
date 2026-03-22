import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = JSON.parse(
  readFileSync(
    "/Users/adamghaleb/Downloads/metacognition research/metacognition-playbook.json",
    "utf8",
  ),
);

// --- Helpers ---
function toSlug(str, maxLen = 80) {
  return str
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, maxLen);
}

function splitTags(tagsArr) {
  const out = [];
  for (const t of tagsArr) {
    for (const part of t.split(",")) {
      const trimmed = part.trim();
      if (trimmed) out.push(trimmed);
    }
  }
  return [...new Set(out)];
}

// --- 1. practices.json ---
const practices = src.map((entry) => ({
  id: entry.id,
  title: entry.best_practice,
  slug: toSlug(entry.best_practice),
  context: entry.context,
  category: entry.category,
  categorySlug: toSlug(entry.category),
  subcategory: entry.subcategory,
  tags: splitTags(entry.tags),
  practicalityScore: Math.round(entry.practicality_score),
  sources: entry.sources,
}));

writeFileSync(
  join(__dirname, "practices.json"),
  JSON.stringify(practices, null, 2),
);

// --- 2. categories.json ---
// Group 26 categories into 5 logical sections
const sectionMap = {
  "Cognitive Reappraisal & Reframing": "Cognitive Strategies",
  "Attention Redirection & Inhibition": "Cognitive Strategies",
  "Strategy Selection & Deployment": "Cognitive Strategies",
  "Working Memory & Executive Function": "Cognitive Strategies",
  "Attentional Control": "Cognitive Strategies",

  "Emotional Regulation": "Awareness & Regulation",
  "Interoceptive Awareness": "Awareness & Regulation",
  "State Awareness & Emotional Granularity": "Awareness & Regulation",
  "Ego Observation & Non-Identification": "Awareness & Regulation",
  "Thought Labeling & Verbalization": "Awareness & Regulation",

  "Perspective-Taking & Decentering": "Monitoring & Evaluation",
  "Decision Hygiene & Calibration": "Monitoring & Evaluation",
  "Metacognitive Monitoring Judgments": "Monitoring & Evaluation",
  "Error Detection & Conflict Monitoring": "Monitoring & Evaluation",
  "Bias & Heuristic Detection": "Monitoring & Evaluation",
  "Discriminative Awareness & Signal Detection": "Monitoring & Evaluation",

  "Mental Model Surfacing & Revision": "Models & Systems",
  "Systems Perception & Pattern Recognition": "Models & Systems",
  "Social & Collective Metacognition": "Models & Systems",
  "Ecological Transfer & Contextual Sensitivity": "Models & Systems",
  "Implementation Intentions & Habit Design": "Models & Systems",

  "Contemplative Practice Methods": "Practice & Application",
  "Metacognitive Measurement & Assessment": "Practice & Application",
  "Training Protocols & Dose-Response": "Practice & Application",
  "ADHD-Optimized Design Patterns": "Practice & Application",
  "Adaptive Learning & Gamification Systems": "Practice & Application",
};

// Distinct color palette for 26 categories
const colorPalette = [
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
  "#78AB95",
  "#C4AE7A",
];

const colorPaletteDark = [
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
  "#88BBA5",
  "#D4BE8A",
];

const catNames = [...new Set(src.map((e) => e.category))];
const catCounts = {};
for (const e of src) {
  catCounts[e.category] = (catCounts[e.category] || 0) + 1;
}

const categories = catNames.map((name, i) => ({
  name,
  slug: toSlug(name),
  count: catCounts[name],
  section: sectionMap[name] || "Practice & Application",
  color: colorPalette[i % colorPalette.length],
}));

writeFileSync(
  join(__dirname, "categories.json"),
  JSON.stringify(categories, null, 2),
);

// --- 3. tags.json ---
const allTags = new Set();
for (const p of practices) {
  for (const t of p.tags) allTags.add(t);
}
writeFileSync(
  join(__dirname, "tags.json"),
  JSON.stringify([...allTags].sort(), null, 2),
);

// --- 4. meta.json ---
const sectionOrder = [
  "Cognitive Strategies",
  "Awareness & Regulation",
  "Monitoring & Evaluation",
  "Models & Systems",
  "Practice & Application",
];

const categorySections = {};
for (const cat of categories) {
  categorySections[cat.name] = cat.section;
}

const categoryColorsLight = {};
const categoryColorsDark = {};
catNames.forEach((name, i) => {
  categoryColorsLight[name] = colorPalette[i % colorPalette.length];
  categoryColorsDark[name] = colorPaletteDark[i % colorPaletteDark.length];
});

const meta = {
  sectionOrder,
  categorySections,
  categoryColorsLight,
  categoryColorsDark,
};
writeFileSync(join(__dirname, "meta.json"), JSON.stringify(meta, null, 2));

// --- Summary ---
console.log(`Practices: ${practices.length}`);
console.log(`Categories: ${categories.length}`);
console.log(`Tags: ${allTags.size}`);
console.log(
  "Files written: practices.json, categories.json, tags.json, meta.json",
);
