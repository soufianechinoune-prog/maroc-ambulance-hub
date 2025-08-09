import { slugify } from "@/lib/slugify";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  updated: string; // YYYY-MM-DD
  city?: string; // slug: casablanca
  categories?: string[]; // ["toutes-les-villes", city?]
  coverImage?: string;
  content: string;
  _path?: string; // debug only
};

// Minimal front-matter parser (browser-safe, no Buffer)
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
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      data[key] = value.slice(1, -1);
      continue;
    }
    if (value.startsWith("[") && value.endsWith("]")) {
      try {
        const json = value.replace(/'/g, '"');
        data[key] = JSON.parse(json);
      } catch {
        data[key] = [];
      }
      continue;
    }
    if (value === "true" || value === "false") {
      data[key] = value === "true";
      continue;
    }
    if (/^-?\d+(?:\.\d+)?$/.test(value)) {
      data[key] = Number(value);
      continue;
    }
    data[key] = value;
  }
  return { data, content: body };
}

export function readAllMarkdown(): Record<string, string> {
  const abs = import.meta.glob("/src/content/blog/**/*.md", { eager: true, as: "raw" }) as Record<string, string>;
  const rel = import.meta.glob("./src/content/blog/**/*.md", { eager: true, as: "raw" }) as Record<string, string>;
  const files = { ...abs, ...rel };

  const keys = Object.keys(files);
  console.log("[BLOG] filesFound:", keys.length, keys);
  return files;
}


function loadAll(): BlogPost[] {
  const files = readAllMarkdown();
  const posts: BlogPost[] = Object.entries(files).map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw || "");

    const title = (data.title ?? "Sans titre").toString();
    const description = (data.description ?? "").toString();
    const slug = slugify((data.slug ?? title).toString());
    const date = ((data.date ?? "").toString() || new Date().toISOString().slice(0, 10)).slice(0, 10);
    const updated = ((data.updated ?? date).toString() || date).slice(0, 10);

    // Normalize categories and city
    const toArray = (v: any): string[] =>
      Array.isArray(v) ? v : v ? [v] : [];
    const tagsRaw = toArray(data.tags);
    const catsRaw = toArray(data.categories);

    let citySlug = data.city ? slugify(String(data.city)) : "";
    if (!citySlug) {
      // Try infer from slug pattern: ambulance-<city>-...
      const m = slug.match(/^ambulance-([a-z0-9-]+?)(?:-|$)/);
      if (m) citySlug = m[1];
    }

    const catSet = new Set<string>();
    [...tagsRaw, ...catsRaw].forEach((v) => {
      const s = slugify(String(v || ""));
      if (s) catSet.add(s);
    });
    catSet.add("toutes-les-villes");
    if (citySlug) catSet.add(citySlug);
    const categories = Array.from(catSet);

    return {
      slug,
      title,
      description,
      date,
      updated,
      city: citySlug || undefined,
      categories,
      coverImage: (data.cover || data.coverImage || "/default-seo-image.jpg") as string,
      content,
      _path: path,
    } satisfies BlogPost;
  });

  // Newest first
  posts.sort((a, b) => (b.updated || b.date).localeCompare(a.updated || a.date));
  return posts;
}

let CACHE: BlogPost[] | null = null;
export function getAllPosts(): BlogPost[] {
  if (!CACHE || CACHE.length === 0) CACHE = loadAll();
  return CACHE;
}

export function getDebugFilesInfo() {
  const files = readAllMarkdown();
  const keys = Object.keys(files);
  return { filesFound: keys.length, keys };
}

export function getPostsByCity(city: string): BlogPost[] {
  const c = slugify(city);
  return getAllPosts().filter((p) => p.categories?.includes(c) || p.categories?.includes("toutes-les-villes"));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const s = slugify(slug);
  return getAllPosts().find((p) => p.slug === s);
}
