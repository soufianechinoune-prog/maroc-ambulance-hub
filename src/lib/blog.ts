// Lightweight frontmatter parser to avoid Node Buffer polyfills in browser
export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO string
  author?: string;
  tags?: string[];
  keywords?: string[];
  coverImage?: string; // public path like /default-seo-image.jpg
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
    data[key] = value;
  }
  return { data, content: body };
}

// Load all markdown files at build time in browser/CSR path (Vite transforms glob)
const modules = import.meta.glob("/src/content/blog/*.md", { eager: true, query: "?raw", import: "default" }) as Record<string, string>;

const posts: BlogPost[] = Object.entries(modules).map(([path, raw]) => {
  const { data, content } = parseFrontmatter(raw);
  // slug from frontmatter or filename
  const fileSlug = path.split("/").pop()?.replace(/\.md$/, "") || "";
  const slug: string = (data.slug as string) || fileSlug;
  return {
    slug,
    title: (data.title as string) || fileSlug,
    description: (data.description as string) || "",
    date: (data.date as string) || new Date().toISOString(),
    author: data.author as string | undefined,
    tags: (data.tags as string[]) || [],
    keywords: (data.keywords as string[]) || [],
    coverImage: (data.coverImage as string) || "/default-seo-image.jpg",
    content,
  } satisfies BlogPost;
});

// Sort newest first
posts.sort((a, b) => (a.date < b.date ? 1 : -1));

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
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
