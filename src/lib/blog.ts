import matter from "gray-matter";

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

// Load all markdown files at build time in browser/CSR path (Vite transforms glob)
const modules = import.meta.glob("/src/content/blog/*.md", { eager: true, query: "?raw", import: "default" }) as Record<string, string>;

const posts: BlogPost[] = Object.entries(modules).map(([path, raw]) => {
  const { data, content } = matter(raw);
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
