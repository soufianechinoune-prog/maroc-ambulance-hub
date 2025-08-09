import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { getAllPosts } from "@/lib/blog";

const slugify = (s = "") =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
   .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function BlogIndex() {
  // ✅ Avec la route path="ambulance-:city", city vaut "casablanca" (pas besoin de couper "ambulance-")
  const { city } = useParams(); 
  const citySlug = city ? slugify(city) : "";

  const all = useMemo(() => getAllPosts(), []);
  // Filtre ROBUSTE: ville OU "toutes-les-villes"
  const filtered = useMemo(() => {
    if (!citySlug) return all;
    return all.filter(p => {
      const cats = p.categories || [];
      const cf = slugify(p.city || "");
      return cats.includes("toutes-les-villes") || cats.includes(citySlug) || cf === citySlug;
    });
  }, [all, citySlug]);

  // 🔎 Logs temporaires (retire-les après)
  console.log("[BLOG] city param =", city, "→", citySlug, "| all:", all.length, "| filtered:", filtered.length);
  if (filtered.length === 0) {
    console.log("[BLOG] unique cats:", Array.from(new Set(all.flatMap(p => p.categories || []))));
  }

  return (
    <div className="container mx-auto px-4 lg:px-6 max-w-6xl">
      <div className="flex gap-3 mb-6">
        {/* ⚠️ Liens ABSOLUS si ces chips ne sont PAS rendus dans /blog */}
        <Link to="/blog" className="px-3 py-1 rounded-full border">Toutes les villes</Link>
        <Link to="/blog/ambulance-casablanca" className="px-3 py-1 rounded-full border">Casablanca</Link>
        <Link to="/blog/ambulance-rabat" className="px-3 py-1 rounded-full border">Rabat</Link>
        <Link to="/blog/ambulance-marrakech" className="px-3 py-1 rounded-full border">Marrakech</Link>
      </div>

      {/* Liste simple pour valider (tu remets ta grille habituelle après) */}
      <ul className="space-y-3">
        {filtered.map(post => (
          <li key={post.slug}>
            <Link to={`/blog/${post.slug}`} className="underline">{post.title}</Link>
            <span className="ml-2 text-sm text-gray-500">[{(post.categories||[]).join(", ")}]</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
