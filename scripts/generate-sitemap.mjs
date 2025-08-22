import { readFileSync, writeFileSync, statSync } from "fs";

// Use cities defined in src/data/cities.ts as single source of truth
const tsContent = readFileSync("src/data/cities.ts", "utf8");
const slugMatches = [...tsContent.matchAll(/slug:\s*"([^"]+)"/g)];
const uniqueSlugs = Array.from(new Set(slugMatches.map((m) => m[1])));

const site = process.env.VITE_SITE_URL || "https://www.ambulance-privee.ma";

const baseUrls = [
  `${site}/`,
  `${site}/services`,
  `${site}/zones-d-intervention`,
  `${site}/contact`,
  `${site}/mentions-legales`,
  `${site}/politique-confidentialite`,
  `${site}/conditions-generales-utilisation`,
  `${site}/blog`, // blog index
];

const cityUrls = uniqueSlugs.map((slug) => `${site}/ambulance-${slug}`);
const blogCityUrls = uniqueSlugs.map((slug) => `${site}/blog/ambulance-${slug}`);

// Build blog article URLs from markdown frontmatter (fallback city=casablanca)
import { readdirSync, readFileSync as rfs } from "fs";
const blogDir = "src/content/blog";
let blogArticleUrls = [];
const urlModDates = new Map(); // Store modification dates for each URL

try {
  const files = readdirSync(blogDir).filter((f) => f.endsWith(".md"));
  for (const f of files) {
    const filePath = `${blogDir}/${f}`;
    const raw = rfs(filePath, "utf8");
    const fmMatch = raw.startsWith("---") ? raw.slice(3).split("\n---")[0] : "";
    const get = (k) => {
      const m = fmMatch.match(new RegExp(`^${k}:(.*)$`, "m"));
      return m ? m[1].trim().replace(/^['\"]|['\"]$/g, "") : "";
    };
    const slug = get("slug") || f.replace(/\.md$/, "");
    const city = get("city") || "casablanca";
    const url = city ? `${site}/blog/${city}/${slug}` : `${site}/blog/${slug}`;
    
    // Get real file modification date
    const stats = statSync(filePath);
    const modDate = stats.mtime.toISOString().slice(0, 10);
    
    blogArticleUrls.push(url);
    urlModDates.set(url, modDate);
  }
} catch {}

// Set different base dates for different content types
const today = new Date().toISOString().slice(0, 10);
const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
const lastMonth = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

// Set modification dates for different URL types
baseUrls.forEach(url => {
  if (url.includes("/mentions-legales") || url.includes("/politique-confidentialite") || url.includes("/conditions-generales-utilisation")) {
    urlModDates.set(url, lastMonth); // Legal pages updated less frequently
  } else if (url === `${site}/`) {
    urlModDates.set(url, today); // Homepage updated most recently
  } else {
    urlModDates.set(url, lastWeek); // Other pages updated weekly
  }
});

cityUrls.forEach(url => urlModDates.set(url, lastWeek));
blogCityUrls.forEach(url => urlModDates.set(url, lastWeek));

const urls = [...baseUrls, ...cityUrls, ...blogCityUrls, ...blogArticleUrls];

const toUrlXml = (u) => {
  let priority = 0.8;
  let changefreq = "daily";
  
  // Get the real modification date for this URL
  const lastmod = urlModDates.get(u) || today;

  // Home
  if (u === `${site}/`) {
    priority = 1.0;
  }

  // Legal pages
  if (
    u.includes("/mentions-legales") ||
    u.includes("/politique-confidentialite") ||
    u.includes("/conditions-generales-utilisation")
  ) {
    priority = 0.3;
    changefreq = "yearly";
  }

  // Blog categories by city
  if (u.includes("/blog/ambulance-")) {
    priority = 0.4;
    changefreq = "weekly";
  }

  // Blog articles (city or general)
  const isBlogArticle = /\/blog\/(?!villes\/|ambulance-).+/.test(u) && u !== `${site}/blog`;
  if (isBlogArticle) {
    priority = 0.5;
    changefreq = "weekly";
  }

  return `<url><loc>${u}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
};

const body = urls.map(toUrlXml).join("");
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;

writeFileSync("public/sitemap.xml", xml);
console.log("sitemap.xml generated");