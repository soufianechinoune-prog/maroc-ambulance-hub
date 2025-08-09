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

function readAllMarkdown(): Record<string, string> {
  let files: Record<string, string> = {};
  try {
    // Use Vite glob in browser/ESM build
    const anyMeta = (import.meta as any);
    if (anyMeta && typeof anyMeta.glob === "function") {
      files = anyMeta.glob("/src/content/blog/**/*.md", { eager: true, query: "?raw", import: "default" }) as Record<string, string>;
    }
  } catch {}

  // Node/CJS fallback for SSG build
  if (Object.keys(files).length === 0) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const req: any = (globalThis as any).require || (eval("require") as any);
      const fs = req("fs");
      const path = req("path");
      const root = path.resolve(process.cwd(), "src/content/blog");
      const out: Record<string, string> = {};
      const walk = (dir: string) => {
        if (!fs.existsSync(dir)) return;
        for (const entry of fs.readdirSync(dir)) {
          const full = path.join(dir, entry);
          const stat = fs.statSync(full);
          if (stat.isDirectory()) walk(full);
          else if (entry.endsWith(".md")) {
            const raw = fs.readFileSync(full, "utf8");
            const key = "/src/" + full.split("/src/").pop();
            out[key] = raw;
          }
        }
      };
      walk(root);
      files = out;
    } catch {}
  }

  try {
    // Safe dev logging (ignore if unavailable in CJS)
    if ((import.meta as any)?.env?.DEV) {
      console.log("[BLOG] filesFound:", Object.keys(files).length, Object.keys(files));
    }
  } catch {}

  return files;
}

function loadAll(): BlogPost[] {
  const files = readAllMarkdown();
  const posts: BlogPost[] = Object.entries(files).map(([path, raw]) => {
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

  // Newest first
  posts.sort((a, b) => (b.updated || b.date).localeCompare(a.updated || a.date));
  return posts;
}

let CACHE: BlogPost[] | null = null;
export function getAllPosts(): BlogPost[] {
  if (CACHE) return CACHE;
  CACHE = loadAll();
  return CACHE;
}

export function getPostsByCity(city: string): BlogPost[] {
  const c = slugify(city);
  return getAllPosts().filter((p) => p.categories?.includes(c) || p.categories?.includes("toutes-les-villes"));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const s = slugify(slug);
  return getAllPosts().find((p) => p.slug === s);
}
