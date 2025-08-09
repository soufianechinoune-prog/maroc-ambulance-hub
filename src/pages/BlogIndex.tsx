import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { SITE_URL } from "@/lib/config";
import { getAllPosts } from "@/lib/blog";
import { Link, useSearchParams, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { cities } from "@/data/cities";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";

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
  const { city } = useParams();
  const q = params.get("q")?.trim() || "";
  const page = Math.max(1, parseInt(params.get("page") || "1", 10) || 1);

  const citySlug = useMemo(() => slugify(city || ""), [city]);

const normalizedCity = useMemo(() => normalize(citySlug || ""), [citySlug]);

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
  let base = all;
  if (normalizedCity) {
    const want = normalizedCity;
    base = all.filter((p: any) => {
      const postCity = normalize(p.city || "");
      return p._cats?.includes("toutes-les-villes") || p._cats?.includes(want) || postCity === want;
    });
  }
  if (!q) return base;
  const needle = q.toLowerCase();
  return base.filter((p) =>
    [p.title, p.description, ...(p.tags || []), ...(p.keywords || [])]
      .join(" ")
      .toLowerCase()
      .includes(needle)
  );
}, [all, q, normalizedCity]);

useEffect(() => {
  try {
    console.log(
      "[BLOG] city =",
      city || "(none)",
      "| total =",
      all.length,
      "| filtered =",
      filtered.length
    );
  } catch {}
}, [city, all.length, filtered.length]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * PER_PAGE;
  const posts = filtered.slice(start, start + PER_PAGE);
  const cityName = city ? city.charAt(0).toUpperCase() + city.slice(1) : null;
  const selectedCity = city ? cities.find((c) => c.slug === city) : undefined;

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: city ? `Blog Ambulance ${cityName}` : "Blog Ambulance Maroc",
    description: city
      ? `Guides et conseils sur les services d'ambulance à ${cityName}`
      : "Guides et conseils sur les services d'ambulance au Maroc",
    url: `${SITE_URL}${city ? `/blog/ambulance-${city}` : "/blog"}`,
  } as const;

  const breadcrumbLd = city
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: "Villes" },
          { "@type": "ListItem", position: 4, name: cityName, item: `${SITE_URL}/blog/ambulance-${city}` },
        ],
      }
    : undefined;

  const handleSearch = (value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set("q", value); else next.delete("q");
    next.delete("page");
    setParams(next, { replace: true });
  };
  return (
    <>
      <SEO
        title={city ? `Blog Ambulance ${cityName} – Guides & Conseils 24/7` : "Blog Ambulance Maroc – Guides & Conseils 24/7"}
        description={city ? `Articles SEO sur l'ambulance à ${cityName}: urgences, tarifs, quartiers, transport médicalisé.` : "Articles SEO nationaux sur l'ambulance au Maroc: urgences, tarifs, transport médicalisé et conseils."}
        canonical={`${SITE_URL}${city ? `/blog/ambulance-${city}` : "/blog"}`}
        keywords={city ? ["ambulance", city] : ["ambulance Maroc", "urgence ambulance", "transport médicalisé"]}
        image="/default-seo-image.jpg"
        {...(city
          ? { jsonLdMultiple: [collectionLd, breadcrumbLd!] }
          : { jsonLd: collectionLd })}
      />
      <Header />

      <main className="container mx-auto px-4 py-10">
        {city && (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Accueil</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/blog">Blog</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span className="text-muted-foreground">Villes</span>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{cityName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )}
        <header className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">{city ? `Blog Ambulance ${cityName}` : "Blog Ambulance Maroc"}</h1>
          {city ? (
            <>
              <p className="text-muted-foreground mt-2">{selectedCity?.description || `Guides pratiques et actualités locales pour ${cityName}.`}</p>
              <p className="text-muted-foreground">{`Temps d'intervention moyen: ${selectedCity?.avgEtaMin ?? 12} min · Couverture ${selectedCity?.coverage ?? "étendue"}.`}</p>
            </>
          ) : (
            <p className="text-muted-foreground mt-2">Guides pratiques, urgences, quartiers et tarifs pour bien vous orienter au Maroc.</p>
          )}

          {/* Cities chips */}
          <nav className="mt-5 flex gap-2 overflow-x-auto py-1" aria-label="Filtrer par ville">
            <Link
              to="/blog"
              className={`whitespace-nowrap inline-flex items-center rounded-full border px-3 py-1 text-sm transition-colors ${!city ? "bg-primary/10 text-primary border-primary" : "text-foreground hover:text-primary"}`}
              aria-current={!city ? "page" : undefined}
            >
              Toutes les villes
            </Link>
            {cities.map((c) => (
              <Link
                key={c.slug}
                to={`/blog/ambulance-${c.slug}`}
                className={`whitespace-nowrap inline-flex items-center rounded-full border px-3 py-1 text-sm transition-colors ${city === c.slug ? "bg-primary/10 text-primary border-primary" : "text-foreground hover:text-primary"}`}
                aria-current={city === c.slug ? "page" : undefined}
              >
                {c.name}
              </Link>
            ))}
          </nav>

          <div className="mt-6">
            <Input
              type="search"
              defaultValue={q}
              placeholder={city ? `Rechercher à ${cityName} (ex: tarifs, quartiers, urgence)` : "Rechercher un article (ex: tarifs, Ain Diab, urgence)"}
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
