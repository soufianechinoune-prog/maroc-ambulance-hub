import { defineConfig } from "vite";
import type { Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";
import * as esbuild from "esbuild";
import { fileURLToPath, pathToFileURL } from "url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

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
      async writeBundle() {
        const site = process.env.VITE_SITE_URL || "https://www.ambulance-privee.ma";
        const distDir = path.resolve(rootDir, "dist");
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

        // Blog posts (from src/content/blog/*.md)
        const blogDir = path.resolve(rootDir, "src/content/blog");
        let blogSlugs: string[] = [];
        if (fs.existsSync(blogDir)) {
          const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"));
          blogSlugs = files.map((f) => {
            const raw = fs.readFileSync(path.resolve(blogDir, f), "utf8");
            const m = raw.match(/slug:\s*"([^"]+)"/);
            return m ? m[1] : f.replace(/\.md$/, "");
          });
        }

        const today = new Date().toISOString().slice(0,10);
        const entries = [
          // Core pages
          { loc: `${site}/`, changefreq: 'daily', priority: '0.8' },
          { loc: `${site}/services`, changefreq: 'monthly', priority: '0.6' },
          { loc: `${site}/zones-d-intervention`, changefreq: 'monthly', priority: '0.6' },
          { loc: `${site}/contact`, changefreq: 'monthly', priority: '0.6' },
          { loc: `${site}/blog`, changefreq: 'weekly', priority: '0.6' },
          // Service landing pages
          ...services.map((s) => ({ loc: `${site}/${s}`, changefreq: 'weekly', priority: '0.7' })),
          // City pages (canonical format)
          ...cities.map((c) => ({ loc: `${site}/ambulance-${c.slug}`, changefreq: 'weekly', priority: '0.7' })),
          // Blog posts
          ...blogSlugs.map((slug) => ({ loc: `${site}/blog/${slug}`, changefreq: 'weekly', priority: '0.6' })),
          // Legal pages
          ...legals.map((p) => ({ loc: `${site}/${p}`, changefreq: 'yearly', priority: '0.3' })),
        ];

        const body = entries
          .map(e => `<url><loc>${e.loc}</loc><lastmod>${today}</lastmod><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`) 
          .join("");
        const xml = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">${body}</urlset>`;
        fs.writeFileSync(path.resolve(distDir, "sitemap.xml"), xml);

        // --- SSG prerender for SEO-critical routes (simulated ISR 24h via daily rebuild) ---
        const ssgTmpDir = path.resolve(rootDir, "dist-ssg");
        if (!fs.existsSync(ssgTmpDir)) fs.mkdirSync(ssgTmpDir, { recursive: true });
        const serverEntry = path.resolve(ssgTmpDir, "entry-ssg.cjs");

        await esbuild.build({
          entryPoints: [path.resolve(rootDir, "src/entry-ssg.tsx")],
          outfile: serverEntry,
          bundle: true,
          format: "cjs",
          platform: "node",
          sourcemap: false,
          jsx: "automatic",
          banner: { js: 'var React = require("react");' },
          loader: {
            ".jpg": "dataurl",
            ".jpeg": "dataurl",
            ".png": "dataurl",
            ".gif": "dataurl",
            ".svg": "dataurl",
            ".webp": "dataurl",
          },
          define: {
            "import.meta.env.VITE_SITE_URL": JSON.stringify(process.env.VITE_SITE_URL || "https://www.ambulance-privee.ma"),
          },
        });

        const mod: any = await import(pathToFileURL(serverEntry).href);
        const render = (mod.render || mod.default?.render) as undefined | ((url: string) => { html: string; head: string; htmlAttrs?: string; bodyAttrs?: string });
        if (!render) {
          throw new Error("entry-ssg.tsx doit exporter `render(url)` ou `default.render(url)`");
        }

        const templatePath = path.resolve(distDir, "index.html");
        if (!fs.existsSync(templatePath)) {
          throw new Error(`Fichier modèle introuvable: ${templatePath}`);
        }
        const template = fs.readFileSync(templatePath, "utf8");

        const baseRoutes = [
          "/",
          "/contact",
          "/mentions-legales",
          "/politique-confidentialite",
          "/conditions-generales-utilisation",
          ...services.map((s) => `/${s}`),
        ];

        const cityTsPath = path.resolve(rootDir, "src/data/cities.ts");
        let cityRoutes: string[] = [];
        if (fs.existsSync(cityTsPath)) {
          const cityTs = fs.readFileSync(cityTsPath, "utf8");
          const citySlugs = Array.from(new Set([...cityTs.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1])));
          cityRoutes = citySlugs.map((slug) => `/ambulance-${slug}`);
        }

        const routes = Array.from(new Set([...baseRoutes, ...cityRoutes]));

        for (const route of routes) {
          const { html, head } = (render as (url: string) => { html: string; head: string }).call(null, route);
          let page = template.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
          page = page.replace("</head>", `${head}\n</head>`);

          if (route === "/") {
            fs.writeFileSync(path.resolve(distDir, "index.html"), page, "utf8");
          } else {
            const outDir = path.resolve(distDir, route.replace(/^\//, ""));
            fs.mkdirSync(outDir, { recursive: true });
            fs.writeFileSync(path.resolve(outDir, "index.html"), page, "utf8");
          }
        }

        // Build timestamp to help external schedulers verify freshness
        fs.writeFileSync(path.resolve(distDir, "ssg-build.txt"), new Date().toISOString());
      }
    } as Plugin
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "./src"),
    },
  },
  build: {
    rollupOptions: {
      external: ['fs', 'path'],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-accordion', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
}));
