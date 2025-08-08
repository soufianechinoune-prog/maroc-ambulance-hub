import { defineConfig } from "vite";
import type { Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    // Generate robots.txt and sitemap.xml at build with SITE_URL
    {
      name: 'generate-seo-assets',
      apply: 'build' as const,
      closeBundle() {
        const site = process.env.VITE_SITE_URL || "https://www.ambulance-maroc.ma";
        const distDir = path.resolve(__dirname, "dist");
        if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

        // robots.txt: generate minimal, index-all with dynamic sitemap
        const robots = `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`;
        fs.writeFileSync(path.resolve(distDir, "robots.txt"), robots);

        // sitemap.xml: generate canonical URLs only
        const cities = [
          { slug: "casablanca" }, { slug: "rabat" }, { slug: "marrakech" }, { slug: "tanger" }, { slug: "fes" }, { slug: "agadir" }, { slug: "meknes" }, { slug: "oujda" }, { slug: "tetouan" }, { slug: "laayoune" }, { slug: "mohammedia" }, { slug: "kenitra" }
        ];
        const services = [
          "ambulance-urgence",
          "transport-medicalise",
          "ambulance-privee",
          "rapatriement-sanitaire",
          "transport-inter-hopitaux",
        ];
        const legals = [
          "mentions-legales",
          "politique-confidentialite",
          "conditions-generales-utilisation",
        ];

        const today = new Date().toISOString().slice(0,10);
        const entries = [
          // Core pages
          { loc: `${site}/`, changefreq: 'daily', priority: '0.8' },
          { loc: `${site}/services`, changefreq: 'monthly', priority: '0.6' },
          { loc: `${site}/zones-d-intervention`, changefreq: 'monthly', priority: '0.6' },
          { loc: `${site}/contact`, changefreq: 'monthly', priority: '0.6' },
          // Service landing pages
          ...services.map((s) => ({ loc: `${site}/${s}`, changefreq: 'weekly', priority: '0.7' })),
          // City pages (canonical format)
          ...cities.map((c) => ({ loc: `${site}/ambulance-${c.slug}`, changefreq: 'weekly', priority: '0.7' })),
          // Legal pages
          ...legals.map((p) => ({ loc: `${site}/${p}`, changefreq: 'yearly', priority: '0.3' })),
        ];

        const body = entries
          .map(e => `<url><loc>${e.loc}</loc><lastmod>${today}</lastmod><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`) 
          .join("");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;
        fs.writeFileSync(path.resolve(distDir, "sitemap.xml"), xml);
      }
    } as Plugin
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
