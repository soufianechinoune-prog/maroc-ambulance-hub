import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { SITE_URL } from "@/lib/config";
import { getPostBySlug, getPostsByCity, getAllPosts } from "@/lib/blog";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useHashScroll } from "@/hooks/useHashScroll";

// Utils
const PHONE_DISPLAY = "0777 22 23 11";
const PHONE_TEL = "+212777722311";
const WHATSAPP_URL = `https://wa.me/212777722311?text=${encodeURIComponent("Bonjour, j’ai besoin d’une ambulance.")}`;

const slugify = (str: string) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const BlogPost = () => {
  console.log("[BLOGPOST] rendu avec slug param — si ceci apparaît sur /blog/ambulance-casablanca, c'est MAUVAIS.");
  const { slug = "" } = useParams();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <>
        <SEO
          title="Article introuvable – Blog Ambulance Maroc"
          description="Article introuvable. Découvrez nos guides sur l'ambulance au Maroc."
          canonical={`${SITE_URL}/blog/${slug || ""}`}
          noIndex
        />
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Article introuvable</h1>
          <p className="text-muted-foreground mb-6">L'article recherché n'existe pas ou a été déplacé.</p>
          <Link to="/blog" className="text-primary font-medium hover:underline">← Retour au blog</Link>
        </main>
        <Footer />
      </>
    );
  }

  const canonicalPath = `/blog/${post.slug}`;
  const canonical = `${SITE_URL}${canonicalPath}`;
  const image = post.coverImage || "/default-seo-image.jpg";

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: `${SITE_URL}${image}`,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    articleSection: post.city || undefined,
    mainEntityOfPage: canonical,
  };

  // Breadcrumbs JSON-LD: Accueil > Blog > [Ville?] > [Article]
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: post.city
      ? [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          {
            "@type": "ListItem",
            position: 3,
            name: post.city.charAt(0).toUpperCase() + post.city.slice(1),
            item: `${SITE_URL}/blog/ambulance-${post.city}`,
          },
          { "@type": "ListItem", position: 4, name: post.title, item: canonical },
        ]
      : [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: canonical },
        ],
  } as any;

  const content = post.content;
  const headings = useMemo(() => {
    const lines = post.content.split(/\n+/);
    const hs: Array<{ depth: 2 | 3; text: string; id: string }> = [];
    for (const line of lines) {
      if (line.startsWith("## ")) {
        const text = line.replace(/^##\s+/, "").trim();
        hs.push({ depth: 2, text, id: slugify(text) });
      } else if (line.startsWith("### ")) {
        const text = line.replace(/^###\s+/, "").trim();
        hs.push({ depth: 3, text, id: slugify(text) });
      }
    }
    return hs;
  }, [post.content]);

  const [activeId, setActiveId] = useState<string | null>(null);
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = articleRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: [0, 1] }
    );

    const els = root.querySelectorAll("h2[id], h3[id]");
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [content]);

  // Smooth hash scroll when navigating TOC links
  useHashScroll(88);

  const related = useMemo(() => {
    const max = 3;
    const byCity = post.city ? getPostsByCity(post.city).filter((p) => p.slug !== post.slug) : [];
    const others = getAllPosts().filter((p) => p.slug !== post.slug && (!post.city || p.city !== post.city));
    return [...byCity, ...others].slice(0, max);
  }, [post.city, post.slug]);

  return (
    <>
      <SEO
        title={`${post.title} | Blog Ambulance Maroc`}
        description={post.description}
        canonical={canonical}
        image={image}
        jsonLdMultiple={[articleLd, breadcrumbLd]}
      />
      <Header />
      <main className="container mx-auto px-4 lg:px-6 max-w-6xl py-10">
        {/* Breadcrumbs */}
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
            {post.city && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={`/blog/ambulance-${post.city}`}>
                      {post.city.charAt(0).toUpperCase() + post.city.slice(1)}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{post.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-start mt-6">
          {/* Article */}
          <article ref={articleRef} className="lg:col-span-8 xl:col-span-9 prose prose-lg lg:prose-xl leading-relaxed dark:prose-invert max-w-none [--tw-prose-body:75ch]">
            <header className="mb-6">
              {post.city && (
                <div className="mb-2">
                  <Link
                    to={`/blog/ambulance-${post.city}`}
                    className="inline-flex items-center rounded-full border px-3 py-1 text-xs md:text-sm font-medium text-foreground hover:text-primary transition-colors"
                    aria-label={`Catégorie ville: ${post.city}`}
                  >
                    {post.city.charAt(0).toUpperCase() + post.city.slice(1)}
                  </Link>
                </div>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">{post.title}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("fr-MA")}</time>
              </div>
              {/* Cover image */}
              {image && (
                <img
                  src={image}
                  alt={`${post.title} – ambulance ${post.city || "Maroc"}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto rounded-xl mt-4"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              )}

              {/* Practical info block */}
              <aside className="mt-6 rounded-lg border bg-card text-card-foreground p-4">
                <p className="text-sm text-muted-foreground">Urgence ambulance – 24/7</p>
                <div className="mt-1 text-lg font-semibold">{PHONE_DISPLAY}</div>
                {post.city && (
                  <p className="mt-1 text-sm text-muted-foreground">Zone couverte: {post.city.charAt(0).toUpperCase() + post.city.slice(1)} et environs</p>
                )}
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button asChild>
                    <a href={`tel:${PHONE_TEL}`} aria-label="Appeler maintenant">Appeler</a>
                  </Button>
                  <Button variant="secondary" asChild>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </aside>
            </header>

            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ node, ...props }) => (
                  <img
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 768px) 100vw, 1200px"
                    alt={props.alt || `${post.title} – ambulance ${post.city || "Maroc"}`}
                    {...props}
                  />
                ),
                h2: ({ node, children, ...props }) => {
                  const text = String(children as any);
                  const id = slugify(text);
                  return (
                    <h2 id={id} {...props}>
                      {children}
                    </h2>
                  );
                },
                h3: ({ node, children, ...props }) => {
                  const text = String(children as any);
                  const id = slugify(text);
                  return (
                    <h3 id={id} {...props}>
                      {children}
                    </h3>
                  );
                },
                a: ({ node, ...props }) => (
                  <a {...props} rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined} />
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </article>

          {/* TOC */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 lg:sticky lg:top-24">
            <div className="border rounded-lg p-4 bg-card text-card-foreground w-full lg:w-[260px] xl:w-[300px]">
              <p className="text-sm font-semibold mb-2">Sommaire</p>
              {headings.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucun sous-titre</p>
              ) : (
                <nav aria-label="Table des matières">
                  <ul className="space-y-1">
                    {headings.map((h) => (
                      <li key={h.id} className={h.depth === 3 ? "pl-4" : undefined}>
                        <a
                          href={`#${h.id}`}
                          className={`block text-sm leading-snug hover:text-primary transition-colors ${activeId === h.id ? "text-primary font-medium" : "text-muted-foreground"}`}
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          </aside>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="max-w-5xl mx-auto mt-12">
            <h2 className="text-xl font-semibold text-foreground mb-4">Articles similaires</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => {
                const path = `/blog/${r.slug}`;
                return (
                  <article key={r.slug} className="rounded-lg border bg-card text-card-foreground p-4">
                    <h3 className="text-base font-semibold">
                      <Link className="hover:underline" to={path}>{r.title}</Link>
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-3">{r.description}</p>
                    <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
                      <time dateTime={r.date}>{new Date(r.date).toLocaleDateString("fr-MA")}</time>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* Mobile sticky CTA */}
        <div className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-3 flex gap-2">
            <Button asChild className="flex-1">
              <a href={`tel:${PHONE_TEL}`} aria-label="Appeler maintenant">Appeler</a>
            </Button>
            <Button variant="secondary" asChild className="flex-1">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">WhatsApp</a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;
