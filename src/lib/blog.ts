// Lightweight frontmatter parser to avoid Node Buffer polyfills in browser
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
  readingTime: number; // minutes
  content: string; // markdown body
  categories?: string[]; // normalized categories incl. city and 'toutes-les-villes'
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

// Villes connues (slugifiées)
export const KNOWN_CITIES = ["casablanca", "rabat", "marrakech", "tanger", "fes", "agadir", "meknes", "oujda"];

export const slugify = (s: string) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

function inferCityFromSlug(slug: string) {
  const s = slugify(slug || "");
  for (const c of KNOWN_CITIES) {
    if (s.includes(`-${c}`) || s.startsWith(`${c}-`) || s.endsWith(`-${c}`)) return c;
  }
  return "";
}

function normalizeCityAndCategories(meta: any, helpers: { slug: string; filepath?: string }) {
  const set = new Set<string>(Array.isArray(meta?.categories) ? meta.categories.map(slugify) : []);
  const cityFront = slugify(meta?.city || (meta?.ville as string) || "");
  const cityFromPath = inferCityFromSlug(helpers.slug || helpers.filepath || "");
  const city = cityFront || cityFromPath;
  if (city) set.add(city);
  set.add("toutes-les-villes");
  return {
    ...meta,
    city: city || meta.city || undefined,
    categories: Array.from(set),
  };
}

// Load all markdown files - dynamic loading function
function loadBlogPosts(): BlogPost[] {
  let modules: Record<string, string> = {};
  
  try {
    modules = import.meta.glob("/src/content/blog/*.md", { eager: true, query: "?raw", import: "default" }) as Record<string, string>;
  } catch (error) {
    console.warn("Failed to load blog posts:", error);
    return [];
  }

  return Object.entries(modules).map(([path, raw]) => {
  const { data, content } = parseFrontmatter(raw);
  // slug from frontmatter or filename
  const fileSlug = path.split("/").pop()?.replace(/\.md$/, "") || "";
  const slug: string = (data.slug as string) || fileSlug;

  const date = (data.date as string) || new Date().toISOString().slice(0, 10);
  const updated = (data.updated as string) || date;
  const cityRaw = data.city as string | undefined;
  const city = cityRaw === "" ? "" : (cityRaw || "casablanca");
  const service = ((data.service as string | undefined) || "");
  const coverImage = ((data.cover as string) || (data.coverImage as string) || "/default-seo-image.jpg");

  const calcReadingTime = (txt: string) => {
    const words = txt.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
  };
  const rt = data.readingTime as unknown;
  const readingTime = typeof rt === "number" ? rt : calcReadingTime(content);

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
    readingTime,
    content,
  } satisfies BlogPost;
  });
}

// Cache for posts - will reload in development
let cachedPosts: BlogPost[] | null = null;

function getPosts(): BlogPost[] {
  if (!cachedPosts || import.meta.env.DEV) {
    const rawPosts = loadBlogPosts();
    // Sort newest first
    rawPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
    cachedPosts = rawPosts;
  }
  return cachedPosts;
}

export function getAllPosts(): BlogPost[] {
  // Normalize city and categories for each post
  const posts = getPosts();
  return posts.map((p: any) => {
    const meta = normalizeCityAndCategories(p, { slug: p.slug });
    return { ...p, ...meta } as BlogPost;
  });
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getPosts();
  return posts.find((p) => p.slug === slug);
}

export function getPostsByCity(city: string): BlogPost[] {
  const c = slugify(city || "");
  return getAllPosts().filter((p: any) => {
    const cats = Array.isArray((p as any).categories) ? (p as any).categories : [];
    return cats.includes(c) || slugify(p.city || "") === c;
  });
}

export function getPostByCityAndSlug(city: string, slug: string): BlogPost | undefined {
  const c = slugify(city || "");
  const s = slugify(slug || "");
  return getAllPosts().find((p: any) => {
    const cats = Array.isArray((p as any).categories) ? (p as any).categories : [];
    return slugify(p.slug) === s && (cats.includes(c) || slugify(p.city || "") === c);
  });
}

// Enhanced auto-internal-linking with better anchor texts and cross-linking
export function addInternalLinks(md: string): string {
  const replacements: Array<{ re: RegExp; link: string }> = [
    // Ville principale
    { re: /\bambulance\s+casablanca\b/gi, link: "[service d'ambulance à Casablanca](/ambulance-casablanca)" },
    { re: /\bambulance\s+rabat\b/gi, link: "[urgences médicales à Rabat](/ambulance-rabat)" },
    { re: /\bambulance\s+marrakech\b/gi, link: "[transport sanitaire à Marrakech](/ambulance-marrakech)" },
    { re: /\bambulance\s+tanger\b/gi, link: "[ambulance d'urgence à Tanger](/ambulance-tanger)" },
    
    // Services
    { re: /\bambulance\s+priv[ée]e\b/gi, link: "[ambulance privée sur réservation](/services)" },
    { re: /\btransport\s+m[ée]dicalis[ée]\b/gi, link: "[transport médicalisé professionnel](/services#transport-medicalise)" },
    { re: /\btransport\s+inter[\-\s]h[ôo]pitaux?\b/gi, link: "[transfert inter-hôpitaux sécurisé](/services#inter-hopitaux)" },
    { re: /\brapatriement\s+sanitaire\b/gi, link: "[rapatriement sanitaire national](/services#rapatriement)" },
    { re: /\burgences?\s+m[ée]dicales?\b/gi, link: "[prise en charge des urgences médicales](/services#urgences)" },
    
    // Quartiers populaires pour cross-linking
    { re: /\bquartier\s+ma[âa]rif\b/gi, link: "[ambulance quartier Maârif](/ambulance-casablanca-maarif)" },
    { re: /\bquartier\s+californie\b/gi, link: "[intervention Californie Casablanca](/ambulance-casablanca-californie)" },
    { re: /\bcentre[\-\s]ville\s+casablanca\b/gi, link: "[ambulance centre-ville Casablanca](/ambulance-casablanca-centre)" },
    { re: /\bagdal\s+rabat\b/gi, link: "[service médical Agdal](/ambulance-rabat-agdal)" },
    
    // Mots-clés génériques
    { re: /\bd[ée]lai\s+d['\']intervention\b/gi, link: "[temps de réponse ambulance](/)" },
    { re: /\bservice\s+24h?\/24\b/gi, link: "[service d'urgence 24h/24](/)" },
    { re: /\bnum[ée]ro\s+d['\']urgence\b/gi, link: "[numéro d'ambulance](/contact)" },
  ];
  
  let out = md;
  for (const { re, link } of replacements) {
    // Éviter de remplacer si déjà dans un lien
    const segments = out.split(/(\[.*?\]\(.*?\))/);
    out = segments.map(segment => {
      if (segment.startsWith('[') && segment.includes('](')) {
        return segment; // Ne pas modifier les liens existants
      }
      return segment.replace(re, link);
    }).join('');
  }
  return out;
}
