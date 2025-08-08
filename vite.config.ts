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

        // robots.txt: preserve existing rules, update Sitemap line
        const robotsSrc = path.resolve(__dirname, "public", "robots.txt");
        let robotsContent = fs.existsSync(robotsSrc) ? fs.readFileSync(robotsSrc, "utf-8") : "User-agent: *\nAllow: /\n";
        robotsContent = robotsContent.replace(/Sitemap:.*$/m, `Sitemap: ${site}/sitemap.xml`);
        fs.writeFileSync(path.resolve(distDir, "robots.txt"), robotsContent);

        // sitemap.xml: generate canonical URLs only
        const cities = [
          { slug: "casablanca" }, { slug: "rabat" }, { slug: "marrakech" }, { slug: "tanger" }, { slug: "fes" }, { slug: "agadir" }, { slug: "meknes" }, { slug: "oujda" }, { slug: "tetouan" }, { slug: "laayoune" }, { slug: "mohammedia" }, { slug: "kenitra" }
        ];
        const urls = [
          `${site}/`,
          `${site}/services`,
          `${site}/zones-d-intervention`,
          `${site}/contact`,
          ...cities.map(c => `${site}/ambulance-${c.slug}`),
        ];
        const today = new Date().toISOString().slice(0,10);
        const body = urls.map(u => `<url><loc>${u}</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>0.8</priority></url>`).join("");
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
