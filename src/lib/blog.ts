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

// Absolute-from-root glob (Vite)
const files = (import.meta as any).glob("/src/content/blog/**/*.md", { eager: true, as: "raw" }) as Record<string, string>;

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

function loadAll(): BlogPost[] {
  const entries = Object.entries(files);
  let posts: BlogPost[] = entries.map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw);

    const title = (data.title ?? "Sans titre").toString();
    const description = (data.description ?? "").toString();
    const slug = slugify((data.slug ?? title).toString());
    const date = ((data.date ?? "").toString() || new Date().toISOString().slice(0, 10)).slice(0, 10);
    const updated = ((data.updated ?? date).toString() || date).slice(0, 10);

    const citySlug = data.city ? slugify(data.city.toString()) : "";
    const categories = ["toutes-les-villes", ...(citySlug ? [citySlug] : [])];

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

  // Sort newest first by updated or date
  posts.sort((a, b) => (b.updated || b.date).localeCompare(a.updated || a.date));

  if ((import.meta as any).env?.DEV) {
    console.log("[BLOG] filesFound:", Object.keys(files).length, Object.keys(files));
    console.table(posts.slice(0, 5).map((p) => ({ slug: p.slug, city: p.city, cat: (p.categories || []).join(","), path: p._path })));
  }

  return posts;
}

let _cache: BlogPost[] | null = null;
export function getAllPosts(): BlogPost[] {
  if (_cache) return _cache;
  _cache = loadAll();
  return _cache;
}

export function getPostsByCity(city: string): BlogPost[] {
  const c = slugify(city);
  const all = getAllPosts();
  const list = all.filter((p) => p.categories?.includes(c) || p.categories?.includes("toutes-les-villes"));
  if ((import.meta as any).env?.DEV) console.log(`[BLOG] list for ${c}:`, list.length);
  return list;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const s = slugify(slug);
  return getAllPosts().find((p) => p.slug === s);
}
