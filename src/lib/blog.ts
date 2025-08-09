import matter from "gray-matter";
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

// Single, robust loader: only one content root
let modules = (import.meta as any).glob("/src/content/blog/**/*.md", { eager: true, as: "raw" }) as Record<string, string>;
if (Object.keys(modules).length === 0) {
  modules = (import.meta as any).glob("src/content/blog/**/*.md", { eager: true, as: "raw" }) as Record<string, string>;
}


function loadAll(): BlogPost[] {
  const entries = Object.entries(modules);
  let posts: BlogPost[] = entries.map(([path, raw]) => {
    const { data, content } = matter(raw);

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
    console.log("[BLOG] filesFound:", entries.length);
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
