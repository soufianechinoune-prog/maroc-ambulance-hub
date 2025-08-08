import { readFileSync, writeFileSync } from "fs";

// Use cities defined in src/data/cities.ts as single source of truth
const tsContent = readFileSync("src/data/cities.ts", "utf8");
const slugMatches = [...tsContent.matchAll(/slug:\s*"([^"]+)"/g)];
const uniqueSlugs = Array.from(new Set(slugMatches.map((m) => m[1])));

const site = process.env.VITE_SITE_URL || "https://www.ambulance-maroc.ma";

const baseUrls = [
  `${site}/`,
  `${site}/services`,
  `${site}/zones-d-intervention`,
  `${site}/contact`,
  `${site}/mentions-legales`,
  `${site}/politique-confidentialite`,
  `${site}/conditions-generales-utilisation`,
];

const cityUrls = uniqueSlugs.map((slug) => `${site}/ambulance-${slug}`);
const urls = [...baseUrls, ...cityUrls];

const today = new Date().toISOString().slice(0, 10);
const toUrlXml = (u) => {
  let priority = 0.8;
  let changefreq = "daily";
  if (u === `${site}/`) {
    priority = 1.0;
  }
  if (
    u.includes("/mentions-legales") ||
    u.includes("/politique-confidentialite") ||
    u.includes("/conditions-generales-utilisation")
  ) {
    priority = 0.3;
    changefreq = "yearly";
  }
  return `<url><loc>${u}</loc><lastmod>${today}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
};

const body = urls.map(toUrlXml).join("");
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;

writeFileSync("public/sitemap.xml", xml);
console.log("sitemap.xml generated");