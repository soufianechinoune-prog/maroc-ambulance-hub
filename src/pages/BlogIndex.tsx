import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { SITE_URL } from "@/lib/config";
import { getAllPosts } from "@/lib/blog";
import { Link, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const PER_PAGE = 9;

const BlogIndex = () => {
  const [params, setParams] = useSearchParams();
  const q = params.get("q")?.trim() || "";
  const page = Math.max(1, parseInt(params.get("page") || "1", 10) || 1);

  const all = getAllPosts();
  const filtered = useMemo(() => {
    if (!q) return all;
    const needle = q.toLowerCase();
    return all.filter((p) =>
      [p.title, p.description, ...(p.tags || []), ...(p.keywords || [])]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
  }, [all, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * PER_PAGE;
  const posts = filtered.slice(start, start + PER_PAGE);

  const handleSearch = (value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set("q", value); else next.delete("q");
    next.delete("page");
    setParams(next, { replace: true });
  };

  return (
    <>
      <SEO
        title="Blog Ambulance Casablanca – Guides & Conseils 24/7"
        description="Articles SEO sur l'ambulance à Casablanca: urgences, tarifs, quartiers, transport médicalisé et conseils."
        canonical={`${SITE_URL}/blog`}
        keywords={["ambulance Casablanca", "urgence ambulance", "transport médicalisé"]}
        image="/default-seo-image.jpg"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Blog Ambulance Casablanca",
          description: "Guides et conseils sur les services d'ambulance à Casablanca",
          url: `${SITE_URL}/blog`,
        }}
      />
      <Header />

      <main className="container mx-auto px-4 py-10">
        <header className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Blog Ambulance Casablanca</h1>
          <p className="text-muted-foreground mt-2">Guides pratiques, urgences, quartiers et tarifs pour bien vous orienter.</p>
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
                  <Link to={`/blog/${p.slug}`} className="hover:text-primary">
                    {p.title}
                  </Link>
                </CardTitle>
                <p className="text-sm text-muted-foreground">{new Date(p.date).toLocaleDateString("fr-MA")}</p>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>{p.description}</p>
                <div className="mt-4">
                  <Link to={`/blog/${p.slug}`} className="text-primary font-medium hover:underline">Lire l'article →</Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

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
