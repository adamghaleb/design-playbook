#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const SOURCE = path.join(
  require("os").homedir(),
  "Downloads/micrographics research/playbook.json",
);
const OUT_DIR = path.resolve(__dirname, "../data/micrographics");

const raw = JSON.parse(fs.readFileSync(SOURCE, "utf-8"));

// --- Helpers ---

function toSlug(str, maxLen = 80) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, maxLen);
}

function splitTags(tags) {
  const out = [];
  for (const t of tags) {
    if (t.includes(",")) {
      t.split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach((s) => out.push(s));
    } else {
      out.push(t.trim());
    }
  }
  return out;
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

// Group categories into logical sections (3-5 sections for 22 categories)
const sectionMap = {
  "Historical Micrography & Calligrams": "Foundations",
  "Typography Fundamentals for Text Art": "Foundations",
  "Perception & Readability Science": "Foundations",
  "Vector Field & Streamline Generation": "Rendering Techniques",
  "Tone & Density Mapping": "Rendering Techniques",
  "Halftone & Dithering Techniques": "Rendering Techniques",
  "GPU & Shader-Based Rendering": "Rendering Techniques",
  "Text Placement & Layout Algorithms": "Layout & Composition",
  "Portrait & Photo-to-Text Conversion": "Layout & Composition",
  "ASCII & Character Art Systems": "Layout & Composition",
  "Mosaic & Tile-Based Composition": "Layout & Composition",
  "Generative & Parametric Typography": "Generative & AI",
  "AI & Neural Text-Image Synthesis": "Generative & AI",
  "Editor UX & Interaction Patterns": "Tools & Production",
  "Preview & Real-Time Feedback Systems": "Tools & Production",
  "Customization & Parameter Controls": "Tools & Production",
  "Export, Format & Production Pipeline": "Tools & Production",
  "Batch Processing & Automation": "Tools & Production",
  "Existing Tools & Competitive Analysis": "Strategy & Applications",
  "Market Positioning & Monetization": "Strategy & Applications",
  "Use Cases & Application Domains": "Strategy & Applications",
  "Plugin Architecture & Integration": "Strategy & Applications",
};

// Distinct colors for 22 categories
const categoryColors = [
  "#e06050",
  "#d47040",
  "#c88030",
  "#b89030",
  "#a89840",
  "#88a040",
  "#60a850",
  "#40a870",
  "#30a890",
  "#30a0a8",
  "#3090b0",
  "#3080c0",
  "#4070c8",
  "#5060d0",
  "#6850c8",
  "#8040c0",
  "#9838b0",
  "#b030a0",
  "#c03088",
  "#d03070",
  "#d84060",
  "#e05050",
];

const catCounts = {};
for (const p of practices) {
  catCounts[p.category] = (catCounts[p.category] || 0) + 1;
}

const uniqueCats = [...new Set(raw.map((e) => e.category))];
const categories = uniqueCats.map((name, i) => ({
  name,
  slug: toSlug(name),
  count: catCounts[name] || 0,
  section: sectionMap[name] || "Other",
  color: categoryColors[i % categoryColors.length],
}));

// --- 3. tags.json ---

const tagSet = new Set();
for (const p of practices) {
  for (const t of p.tags) {
    tagSet.add(t);
  }
}
const tags = [...tagSet].sort();

// --- 4. meta.json ---

const sectionOrder = [
  "Foundations",
  "Rendering Techniques",
  "Layout & Composition",
  "Generative & AI",
  "Tools & Production",
  "Strategy & Applications",
];

const categorySections = {};
for (const cat of categories) {
  categorySections[cat.name] = cat.section;
}

// Light colors: muted versions
const lightColors = [
  "#C48A72",
  "#BF9472",
  "#B89E6A",
  "#A8A06A",
  "#96A46E",
  "#80A86E",
  "#6AAB7A",
  "#6AAB90",
  "#6AA8A0",
  "#6AA0A8",
  "#6A96B0",
  "#6A8CB8",
  "#7A84BF",
  "#887ABF",
  "#9472BF",
  "#A46AB8",
  "#AE6AAE",
  "#B86AA0",
  "#BF6A90",
  "#C46A80",
  "#C47272",
  "#C47A72",
];

const darkColors = [
  "#D49A82",
  "#CFA482",
  "#C8AE7A",
  "#B8B07A",
  "#A6B47E",
  "#90B87E",
  "#7ABB8A",
  "#7ABBA0",
  "#7AB8B0",
  "#7AB0B8",
  "#7AA6C0",
  "#7A9CC8",
  "#8A94CF",
  "#988ACF",
  "#A482CF",
  "#B47AC8",
  "#BE7ABE",
  "#C87AB0",
  "#CF7AA0",
  "#D47A90",
  "#D48282",
  "#D48A82",
];

const categoryColorsLight = {};
const categoryColorsDark = {};
uniqueCats.forEach((name, i) => {
  categoryColorsLight[name] = lightColors[i % lightColors.length];
  categoryColorsDark[name] = darkColors[i % darkColors.length];
});

const meta = {
  sectionOrder,
  categorySections,
  categoryColorsLight,
  categoryColorsDark,
};

// --- Write output ---

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

console.log(`practices.json: ${practices.length} entries`);
console.log(`categories.json: ${categories.length} categories`);
console.log(`tags.json: ${tags.length} unique tags`);
console.log(`meta.json: ${sectionOrder.length} sections`);
console.log("All files written to", OUT_DIR);
