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
// Removed blogCityUrls - these URLs don't exist in routes

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
    // Always use /blog/:slug format (city redirected to this format)
    const url = `${site}/blog/${slug}`;
    
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

// Add blog category pages (actual routes that exist)
const blogCategoryUrls = [
  `${site}/blog/casablanca`,
  `${site}/blog/rabat`, 
  `${site}/blog/marrakech`,
  `${site}/blog/fes`,
  `${site}/blog/tanger`,
  `${site}/blog/meknes`,
  `${site}/blog/agadir`,
  `${site}/blog/kenitra`,
  `${site}/blog/sale`,
  `${site}/blog/temara`,
  `${site}/blog/oujda`
];
blogCategoryUrls.forEach(url => urlModDates.set(url, lastWeek));

const urls = [...baseUrls, ...cityUrls, ...blogCategoryUrls, ...blogArticleUrls];

const toUrlXml = (u) => {
  let priority = 0.6; // Default priority lowered
  let changefreq = "monthly";
  
  // Get the real modification date for this URL
  const lastmod = urlModDates.get(u) || today;

  // Home page - maximum priority
  if (u === `${site}/`) {
    priority = 1.0;
    changefreq = "daily";
  }
  
  // Services page - very high priority (business critical)
  else if (u.includes("/services")) {
    priority = 0.9;
    changefreq = "weekly";
  }
  
  // Main city pages - high priority (business targets)
  else if (u.includes("/ambulance-") && !u.includes("/blog/")) {
    const citySlug = u.split("/ambulance-")[1];
    // Major cities get higher priority
    if (["casablanca", "rabat", "marrakech", "tanger", "fes", "agadir"].includes(citySlug)) {
      priority = 0.8;
    } else {
      priority = 0.7;
    }
    changefreq = "weekly";
  }
  
  // Zones page - important for business
  else if (u.includes("/zones-d-intervention")) {
    priority = 0.8;
    changefreq = "weekly";
  }
  
  // Contact page - important conversion page
  else if (u.includes("/contact")) {
    priority = 0.8;
    changefreq = "monthly";
  }

  // Blog index - content hub
  else if (u === `${site}/blog`) {
    priority = 0.7;
    changefreq = "weekly";
  }

  // Blog categories by city - moderate priority  
  else if (u.match(/\/blog\/(casablanca|rabat|marrakech|fes|tanger|meknes|agadir|kenitra|sale|temara|oujda)$/)) {
    priority = 0.6;
    changefreq = "weekly";
  }

  // Blog articles - content priority
  else if (u.includes("/blog/") && u !== `${site}/blog`) {
    priority = 0.6;
    changefreq = "monthly";
  }

  // Legal pages - low priority
  else if (
    u.includes("/mentions-legales") ||
    u.includes("/politique-confidentialite") ||
    u.includes("/conditions-generales-utilisation")
  ) {
    priority = 0.3;
    changefreq = "yearly";
  }

  return `<url><loc>${u}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
};

const body = urls.map(toUrlXml).join("");
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;

writeFileSync("public/sitemap.xml", xml);
console.log("sitemap.xml generated");