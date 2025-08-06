import { writeFileSync } from "fs";

// Données des villes (copie des données principales)
const cities = [
  { name: "Casablanca", slug: "casablanca" },
  { name: "Rabat", slug: "rabat" },
  { name: "Marrakech", slug: "marrakech" },
  { name: "Tanger", slug: "tanger" },
  { name: "Fès", slug: "fes" },
  { name: "Agadir", slug: "agadir" },
  { name: "Meknès", slug: "meknes" },
  { name: "Oujda", slug: "oujda" },
  { name: "Tétouan", slug: "tetouan" },
  { name: "Laâyoune", slug: "laayoune" },
  { name: "Mohammedia", slug: "mohammedia" },
  { name: "Kénitra", slug: "kenitra" }
];

const site = "https://www.ambulance-maroc.ma";
const urls = [
  `${site}/`,
  `${site}/services`,
  `${site}/zones`,
  `${site}/contact`,
  ...cities.map(c => `${site}/${c.slug}`),
  ...cities.map(c => `${site}/ville/${c.slug}`)
];

const today = new Date().toISOString().slice(0,10);
const body = urls.map(u => `<url><loc>${u}</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>0.8</priority></url>`).join("");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;

writeFileSync("public/sitemap.xml", xml);
console.log("sitemap.xml generated");