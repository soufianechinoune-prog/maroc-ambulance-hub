import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { SITE_URL } from "@/lib/config";
import { getAllPosts } from "@/lib/blog";
import { Link, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { MapPin, List } from "lucide-react";

const PER_PAGE = 10;

interface Props {
  cityName: string;
  citySlug: string;
  selectedSlugs?: string[];
}

const ALL_CITIES = [
  { name: "Casablanca", slug: "casablanca" },
  { name: "Rabat", slug: "rabat" },
  { name: "Marrakech", slug: "marrakech" },
  { name: "Fès", slug: "fes" },
  { name: "Tanger", slug: "tanger" },
  { name: "Meknès", slug: "meknes" },
  { name: "Agadir", slug: "agadir" },
  { name: "Kenitra", slug: "kenitra" },
  { name: "Salé", slug: "sale" },
  { name: "Oujda", slug: "oujda" },
];

const BlogCategoryCity = ({ cityName, citySlug, selectedSlugs = [] }: Props) => {
  const [params] = useSearchParams();
  const page = Math.max(1, parseInt(params.get("page") || "1", 10) || 1);

  const allSelected = useMemo(() => {
    const all = getAllPosts();
    return all
      .filter((p) => selectedSlugs.includes(p.slug))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedSlugs]);

  const totalPages = Math.max(1, Math.ceil(allSelected.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * PER_PAGE;
  const posts = allSelected.slice(start, start + PER_PAGE);

  const canonical = `${SITE_URL}/blog/${citySlug}`;
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: cityName, item: canonical },
    ],
  } as const;

  return (
    <>
      <SEO
        title={`Blog Ambulance Maroc – ${cityName}`}
        description={`Retrouvez tous nos articles sur les ambulances et services d'urgence à ${cityName}.`}
        canonical={canonical}
        image="/default-seo-image.jpg"
        jsonLd={breadcrumbLd}
        keywords={[`blog ambulance ${cityName}`, `urgence ${cityName}`, `transport medicalise ${cityName}`]}
      />
      <Header />
      <main className="container mx-auto px-4 py-10">
        {/* Breadcrumb */}
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
              <BreadcrumbPage>{cityName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <header className="max-w-3xl mt-6 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Blog Ambulance {cityName}</h1>
          <p className="text-muted-foreground mt-2">
            Guides pratiques, urgences, quartiers et tarifs à {cityName}.
          </p>
        </header>

        <nav aria-label="Navigation catégories" className="mt-2 flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/blog">
              <span className="inline-flex items-center"><List size={16} className="mr-2" />Tous les articles</span>
            </Link>
          </Button>
          {ALL_CITIES.map((c) => (
            <Button key={c.slug} asChild variant={c.slug === citySlug ? "secondary" : "outline"} size="sm">
              <Link to={`/blog/${c.slug}`}>
                <span className="inline-flex items-center">
                  {c.slug === citySlug ? <MapPin size={16} className="mr-2" /> : null}
                  {c.name}
                </span>
              </Link>
            </Button>
          ))}
        </nav>

        {/* Liste des articles */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <Card key={p.slug} className="h-full flex flex-col overflow-hidden">
              {p.coverImage && (
                <img
                  src={p.coverImage}
                  alt={`Article: ${p.title} - ambulance ${cityName} transport médicalisé`}
                  loading="lazy"
                  width="400"
                  height="200"
                  decoding="async"
                  className="w-full h-44 object-cover"
                />
              )}
              <CardHeader>
                <CardTitle>
                  <Link to={`/blog/${p.slug}`} className="hover:text-primary">
                    {p.title}
                  </Link>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  <time dateTime={p.date}>{new Date(p.date).toLocaleDateString("fr-MA")}</time>
                  {typeof p.readingTime === "number" && (
                    <>
                      <span aria-hidden> • </span>
                      <span>{p.readingTime} min</span>
                    </>
                  )}
                </p>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>{p.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        {posts.length === 0 && (
          <div className="py-10 text-center text-muted-foreground">
            Aucun article n'a été sélectionné pour l'instant.
          </div>
        )}

        {totalPages > 1 && (
          <nav className="mt-10 flex justify-center">
            <Pagination>
              <PaginationContent>
                {current > 1 && (
                  <PaginationItem>
                    <PaginationPrevious href={`?${new URLSearchParams({ page: String(current - 1) })}`} />
                  </PaginationItem>
                )}
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href={`?${new URLSearchParams({ page: String(i + 1) })}`}
                      isActive={i + 1 === current}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {current < totalPages && (
                  <PaginationItem>
                    <PaginationNext href={`?${new URLSearchParams({ page: String(current + 1) })}`} />
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

export default BlogCategoryCity;
