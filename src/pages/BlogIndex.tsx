import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { SITE_URL } from "@/lib/config";
import { getAllPosts } from "@/lib/blog";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

import { MapPin, List } from "lucide-react";

const slugify = (s: string) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

// --- tiny helpers ---
const normalize = (s?: string) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

// City is obtained from route params; no path parsing needed
// --- end helpers ---

const PER_PAGE = 9;

const BlogIndex = () => {
  const [params, setParams] = useSearchParams();
  const q = params.get("q")?.trim() || "";
  const page = Math.max(1, parseInt(params.get("page") || "1", 10) || 1);

const all = useMemo(() => {
  const list = getAllPosts() || [];
  // we do not mutate source; we just ensure we have predictable strings to search in
  return list.map((p: any) => ({
    ...p,
    _blob: normalize(`${p?.slug || ""} ${p?.title || ""} ${p?.filepath || p?.path || ""}`),
    _cats: Array.isArray(p?.categories)
      ? p.categories.map((c: any) => normalize(String(c)))
      : [],
  }));
}, []);
const filtered = useMemo(() => {
  const term = q.toLowerCase();
  if (!term) return all;
  return all.filter((p) =>
    [p.title, p.description, ...(p.tags || []), ...(p.keywords || [])]
      .join(" ")
      .toLowerCase()
      .includes(term)
  );
}, [all, q]);

useEffect(() => {
  // Debug: count totals
  // console.log("[BLOG] total =", all.length, "| filtered =", filtered.length);
}, [all.length, filtered.length]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * PER_PAGE;
  const posts = filtered.slice(start, start + PER_PAGE);
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog Ambulance Maroc",
    description: "Guides et conseils sur les services d'ambulance au Maroc",
    url: `${SITE_URL}/blog`,
  } as const;

  

  const handleSearch = (value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set("q", value); else next.delete("q");
    next.delete("page");
    setParams(next, { replace: true });
  };
  return (
    <>
      <SEO
        title="Blog Ambulance Maroc – Guides & Conseils 24/7"
        description="Articles SEO nationaux sur l'ambulance au Maroc: urgences, tarifs, transport médicalisé et conseils."
        canonical={`${SITE_URL}/blog`}
        keywords={["ambulance Maroc", "urgence ambulance", "transport médicalisé"]}
        image="/default-seo-image.jpg"
        jsonLd={collectionLd}
      />
      <Header />

      <main className="container mx-auto px-4 py-10">
        <header className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Blog Ambulance Maroc</h1>
          <p className="text-muted-foreground mt-2">Guides pratiques, urgences, quartiers et tarifs pour bien vous orienter au Maroc.</p>

          <nav aria-label="Catégories par ville" className="mt-6 flex flex-wrap gap-2 justify-center">
            <Button asChild variant="secondary" size="sm">
              <Link to="/blog">
                <span className="inline-flex items-center"><List size={16} className="mr-2" />Tous les articles</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/blog/casablanca">
                <span className="inline-flex items-center"><MapPin size={16} className="mr-2" />Casablanca</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm"><Link to="/blog?q=rabat">Rabat</Link></Button>
            <Button asChild variant="outline" size="sm"><Link to="/blog?q=marrakech">Marrakech</Link></Button>
            <Button asChild variant="outline" size="sm"><Link to="/blog?q=fès">Fès</Link></Button>
            <Button asChild variant="outline" size="sm"><Link to="/blog?q=tanger">Tanger</Link></Button>
            <Button asChild variant="outline" size="sm"><Link to="/blog?q=meknès">Meknès</Link></Button>
            <Button asChild variant="outline" size="sm"><Link to="/blog?q=agadir">Agadir</Link></Button>
            <Button asChild variant="outline" size="sm"><Link to="/blog?q=kenitra">Kenitra</Link></Button>
            <Button asChild variant="outline" size="sm"><Link to="/blog?q=salé">Salé</Link></Button>
            <Button asChild variant="outline" size="sm"><Link to="/blog?q=oujda">Oujda</Link></Button>
          </nav>

          <div className="mt-6">
            <Input
              type="search"
              defaultValue={q}
              placeholder="Rechercher un article (ex: tarifs, Ain Diab, urgence)"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <Card key={p.slug} className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>
                  <Link to={`${p.city ? `/blog/${p.city}/${p.slug}` : `/blog/${p.slug}`}`} className="hover:text-primary">
                    {p.title}
                  </Link>
                </CardTitle>
                <p className="text-sm text-muted-foreground">{new Date(p.date).toLocaleDateString("fr-MA")}</p>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>{p.description}</p>
                <div className="mt-4">
                  <Link to={`${p.city ? `/blog/${p.city}/${p.slug}` : `/blog/${p.slug}`}`} className="text-primary font-medium hover:underline">Lire l'article →</Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {posts.length === 0 && (
          <div className="py-10 text-center text-muted-foreground">
            Aucun article pour cette ville pour le moment.
          </div>
        )}

        {totalPages > 1 && (
          <nav className="mt-10 flex justify-center">
            <Pagination>
              <PaginationContent>
                {current > 1 && (
                  <PaginationItem>
                    <PaginationPrevious href={`?${new URLSearchParams({ q, page: String(current - 1) })}`} />
                  </PaginationItem>
                )}
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href={`?${new URLSearchParams({ q, page: String(i + 1) })}`}
                      isActive={i + 1 === current}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {current < totalPages && (
                  <PaginationItem>
                    <PaginationNext href={`?${new URLSearchParams({ q, page: String(current + 1) })}`} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </nav>
        )}
      </main>
      <Footer />
    </>
  );
};

export default BlogIndex;
