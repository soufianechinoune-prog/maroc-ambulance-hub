import { slugify } from "@/lib/slugify";
import matter from "gray-matter";
// Lightweight frontmatter parser to avoid Node Buffer polyfills in browser
// Node/CJS fallback support
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const require: any;
export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  updated: string; // YYYY-MM-DD
  author?: string;
  tags?: string[];
  keywords?: string[];
  coverImage?: string; // public path like /default-seo-image.jpg
  city?: string; // e.g., "casablanca" or "" for general
  service?: string; // optional service slug
  categories?: string[]; // normalized slugs: ["toutes-les-villes", city]
  readingTime: number; // minutes
  content: string; // markdown body
};

function parseFrontmatter(raw: string): { data: Record<string, any>; content: string } {
  if (!raw.startsWith("---")) return { data: {}, content: raw };
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { data: {}, content: raw };
  const fm = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).replace(/^\s*\n/, "");
  const data: Record<string, any> = {};
  for (const line of fm.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    // quoted string
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      data[key] = value.slice(1, -1);
      continue;
    }
    // array
    if (value.startsWith("[") && value.endsWith("]")) {
      try {
        const json = value.replace(/'/g, '"');
        data[key] = JSON.parse(json);
      } catch {
        data[key] = [];
      }
      continue;
    }
    // booleans
    if (value === "true" || value === "false") {
      data[key] = value === "true";
      continue;
    }
    // numbers
    if (/^-?\d+(?:\.\d+)?$/.test(value)) {
      data[key] = Number(value);
      continue;
    }
    data[key] = value;
  }
  return { data, content: body };
}

// Load all markdown files both in browser (Vite) and Node/SSG fallback
let modules: Record<string, string> = {} as any;
try {
  // @ts-ignore - available in Vite/browser build
  const anyMeta = (import.meta as any);
  if (anyMeta && typeof anyMeta.glob === "function") {
    modules = {
      ...anyMeta.glob("/src/content/blog/*.md", { eager: true, as: "raw" }),
      ...anyMeta.glob("/src/content/blog/**/*.md", { eager: true, as: "raw" }),
      ...anyMeta.glob("/src/content/blog/*.md", { eager: true, query: "?raw", import: "default" }),
      ...anyMeta.glob("/src/content/blog/**/*.md", { eager: true, query: "?raw", import: "default" }),
      ...anyMeta.glob("src/content/blog/*.md", { eager: true, as: "raw" }),
      ...anyMeta.glob("src/content/blog/**/*.md", { eager: true, as: "raw" }),
      ...anyMeta.glob("src/content/blog/*.md", { eager: true, query: "?raw", import: "default" }),
      ...anyMeta.glob("src/content/blog/**/*.md", { eager: true, query: "?raw", import: "default" }),
    } as Record<string, string>;

    // User-requested debug logs for patterns
    for (const p of [
      "/src/content/blog/**/*.md",
      "/content/blog/**/*.md",
      "/src/blog/**/*.md",
      "/public/blog/**/*.md",
    ]) {
      try {
        const o = anyMeta.glob(p, { eager: true, as: "raw" });
        console.log(`[BLOG] glob(${p}) ->`, Object.keys(o).length, Object.keys(o).slice(0, 4));
      } catch (e) {
        console.log(`[BLOG] glob(${p}) failed`, e);
      }
    }

    if (Object.keys(modules).length === 0) {
      console.warn("[BLOG] No markdown files matched any of: /src|src/content/blog/**/*.md");
    }

  } else {
    throw new Error("no import.meta.glob");
  }
} catch {
  try {
    const fs = require("fs");
    const path = require("path");
    const dir = path.resolve(process.cwd(), "src/content/blog");
    const collect = (d: string) => {
      if (!fs.existsSync(d)) return;
      for (const entry of fs.readdirSync(d)) {
        const full = path.join(d, entry);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) collect(full);
        else if (entry.endsWith(".md")) {
          const raw = fs.readFileSync(full, "utf8");
          modules[path.join("/src", full.split("/src")[1] || full)] = raw;
        }
      }
    };
    collect(dir);
  } catch {}
}

const posts: BlogPost[] = Object.entries(modules).filter(([, v]) => typeof v === "string").map(([path, raw]) => {
  const { data, content } = matter(raw);
  // slug from frontmatter or filename
  const fileSlug = path.split("/").pop()?.replace(/\.md$/, "") || "";
  const slug: string = (data.slug as string) || fileSlug;

  const date = (data.date as string) || new Date().toISOString().slice(0, 10);
  const updated = (data.updated as string) || date;
  const cityLabel = typeof data.city === "string" ? (data.city as string) : "";
  const city = cityLabel ? slugify(cityLabel) : "";
  const service = ((data.service as string | undefined) || "");
  const coverImage = ((data.cover as string) || (data.coverImage as string) || "/default-seo-image.jpg");

  const calcReadingTime = (txt: string) => {
    const words = txt.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
  };
  const rt = data.readingTime as unknown;
  const readingTime = typeof rt === "number" ? rt : calcReadingTime(content);

  // Categories normalized: always ["toutes-les-villes", city?]
  const categories = [
    "toutes-les-villes",
    ...(city ? [city] : []),
  ];

  return {
    slug,
    title: (data.title as string) || fileSlug,
    description: (data.description as string) || "",
    date,
    updated,
    author: data.author as string | undefined,
    tags: (data.tags as string[]) || [],
    keywords: (data.keywords as string[]) || [],
    coverImage,
    city,
    service,
    categories,
    readingTime,
    content,
  } satisfies BlogPost;
});

// Sort newest first (by updated or date)
posts.sort((a, b) => ((b.updated || b.date).localeCompare(a.updated || a.date)));

// Dev logs
try {
  // @ts-ignore
  if ((import.meta as any).env?.DEV) {
    console.log("[BLOG] loaded:", posts.length);
    console.log("[BLOG] sample:", posts.slice(0, 2).map(p => ({ slug: p.slug, city: p.city, cat: p.categories })));
  }
} catch {}

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByCity(city: string): BlogPost[] {
  const c = slugify(city);
  const list = posts.filter((p) => (p.categories || []).includes(c) || (p.categories || []).includes("toutes-les-villes"));
  try {
    // @ts-ignore
    if ((import.meta as any).env?.DEV) console.log(`[BLOG] ${c} count:`, list.length);
  } catch {}
  return list;
}

export function getPostByCityAndSlug(city: string, slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug && (p.city || "") === city);
}

// Very light auto-internal-linking for a few primary keywords
export function addInternalLinks(md: string): string {
  const replacements: Array<{ re: RegExp; link: string }> = [
    { re: /ambulance\s+casablanca/gi, link: "[ambulance Casablanca](/ambulance-casablanca)" },
    { re: /ambulance\s+priv[ée]e/gi, link: "[ambulance privée](/services)" },
    { re: /transport\s+m[ée]dicalis[ée]/gi, link: "[transport médicalisé](/services#longue-distance)" },
    { re: /rapatriement\s+sanitaire/gi, link: "[rapatriement sanitaire](/rapatriement-sanitaire)" },
  ];
  let out = md;
  for (const { re, link } of replacements) {
    out = out.replace(re, link);
  }
  return out;
}
