import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { SITE_URL } from "@/lib/config";
import {
  addInternalLinks,
  getPostBySlug,
  getPostByCityAndSlug,
  getPostsByCity,
  getAllPosts,
} from "@/lib/blog";
import { useParams, Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
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
  const { city, slug = "" } = useParams();
  const post = slug
    ? (city ? getPostByCityAndSlug(city, slug) : getPostBySlug(slug))
    : undefined;

  // Runtime redirect from legacy URL /blog/:slug -> /blog/:city/:slug when applicable
  if (!city && post && post.city) {
    return <Navigate to={`/blog/${post.city}/${post.slug}`} replace />;
  }

  if (!post) {
    return (
      <>
        <SEO
          title="Article introuvable – Blog Ambulance Maroc"
          description="Article introuvable. Découvrez nos guides sur l'ambulance au Maroc."
          canonical={`${SITE_URL}${city ? `/blog/${city}/${slug || ""}` : `/blog/${slug || ""}`}`}
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

  const canonicalPath = post.city ? `/blog/${post.city}/${post.slug}` : `/blog/${post.slug}`;
  const canonical = `${SITE_URL}${canonicalPath}`;
  const image = post.coverImage || "/default-seo-image.jpg";
  const metaDescriptionRaw = post.description || "";
  const metaDescription =
    metaDescriptionRaw.length > 160 ? `${metaDescriptionRaw.slice(0, 157)}…` : metaDescriptionRaw;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: { "@type": "Organization", name: post.author || "Ambulance Maroc" },
    publisher: { "@type": "Organization", name: "Ambulance Maroc" },
    image: image ? [`${SITE_URL}${image}`] : undefined,
    mainEntityOfPage: canonical,
    articleSection: post.city || "toutes-les-villes",
    inLanguage: "fr-MA",
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

  // Prepare content & TOC
  const content = addInternalLinks(post.content);
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
    const byCity: typeof post[] = post.city ? getPostsByCity(post.city).filter((p) => p.slug !== post.slug) : [] as any;

    const currentTags = new Set(post.tags || []);
    const tagScore = (p: { tags?: string[]; service?: string; date: string }) => {
      let s = 0;
      if (post.service && p.service && p.service === post.service) s += 2;
      s += (p.tags || []).reduce((acc, t) => acc + (currentTags.has(t) ? 1 : 0), 0);
      s += new Date(p.date).getTime() / 1_000_000_000; // slight freshness bias
      return s;
    };

    let list = [...byCity].sort((a, b) => tagScore(b) - tagScore(a));
    if (list.length < max) {
      const others = getAllPosts()
        .filter((p) => p.slug !== post.slug && (!post.city || p.city !== post.city))
        .sort((a, b) => tagScore(b) - tagScore(a));
      for (const p of others) {
        if (list.length >= max) break;
        if (!list.find((x) => x.slug === p.slug)) list.push(p);
      }
    }
    return list.slice(0, max);
  }, [post.city, post.slug, post.service, post.tags, post.date]);

  const { prev, next } = useMemo(() => {
    const ordered = getAllPosts()
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const idx = ordered.findIndex((p) => p.slug === post.slug);
    return {
      prev: idx > 0 ? ordered[idx - 1] : undefined,
      next: idx >= 0 && idx < ordered.length - 1 ? ordered[idx + 1] : undefined,
    };
  }, [post.slug]);

  return (
    <>
      <SEO
        title={`${post.title} | Blog Ambulance Maroc`}
        description={metaDescription}
        canonical={canonical}
        image={image}
        keywords={post.keywords}
        author={post.author}
        jsonLdMultiple={[articleLd, breadcrumbLd]}
      />
      <Header />
      <main className="container mx-auto max-w-screen-2xl px-4 lg:px-8 py-10">
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

        <div className="lg:grid lg:grid-cols-12 lg:gap-8 mt-6">
          {/* Colonne principale */}
          <section className="col-span-12 lg:col-span-9 xl:col-span-9">
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
                <span aria-hidden>•</span>
                <span>{post.readingTime} min</span>
              </div>
              {/* Cover image */}
              {image && (
                <img
                  src={image}
                  alt={`${post.title} – ambulance ${post.city || "Maroc"}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto rounded-xl shadow-sm object-cover mt-4"
                  sizes="(min-width:1280px) 800px, 100vw"
                />
              )}

              {/* Practical info block */}
              <aside className="mt-6 rounded-xl border bg-card text-card-foreground p-4 shadow-sm">
                <p className="text-sm text-muted-foreground">Urgence ambulance – 24/7</p>
                <div className="mt-1 text-lg font-semibold">{PHONE_DISPLAY}</div>
                {post.city && (
                  <p className="mt-1 text-sm text-muted-foreground">Zone couverte: {post.city.charAt(0).toUpperCase() + post.city.slice(1)} et environs</p>
                )}
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button asChild>
                    <a href={`tel:${PHONE_TEL}`} aria-label="Appeler maintenant" rel="nofollow">Appeler</a>
                  </Button>
                  <Button variant="secondary" asChild>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </aside>
            </header>

            {/* TOC mobile */}
            {headings.length > 0 && (
              <div className="lg:hidden mb-4">
                <Accordion type="single" collapsible>
                  <AccordionItem value="toc">
                    <AccordionTrigger>Sommaire</AccordionTrigger>
                    <AccordionContent>
                      <nav aria-label="Table des matières (mobile)">
                        <ul className="space-y-1">
                          {headings.map((h) => (
                            <li key={h.id} className={h.depth === 3 ? "pl-4" : undefined}>
                              <a
                                href={`#${h.id}`}
                                aria-current={activeId === h.id ? "true" : undefined}
                                className={`block text-sm hover:text-primary transition-colors ${activeId === h.id ? "text-primary font-medium" : "text-muted-foreground"}`}
                              >
                                {h.text}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}

            <article
              ref={articleRef}
              className="prose prose-slate prose-lg lg:prose-xl max-w-none leading-relaxed md:leading-loose prose-headings:font-semibold prose-h1:text-3xl md:prose-h1:text-4xl prose-h2:mt-10 prose-h2:text-2xl md:prose-h2:text-3xl prose-h3:mt-6 prose-p:mb-6 prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4 prose-ol:pl-6 prose-ol:my-4 prose-li:my-2 prose-img:rounded-xl prose-img:shadow-sm prose-hr:my-10"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  img: ({ node, ...props }) => {
                    const { className, ...rest } = props as any;
                    return (
                      <img
                        loading="lazy"
                        decoding="async"
                        sizes="(min-width:1280px) 800px, 100vw"
                        className={`${className || ""} w-full h-auto rounded-xl shadow-sm`}
                        alt={props.alt || `${post.title} – ambulance ${post.city || "Maroc"}`}
                        {...rest}
                      />
                    );
                  },
                  h1: ({ node, children, ...props }) => {
                    const text = String(children as any);
                    const id = slugify(text);
                    const { className, ...rest } = props as any;
                    return (
                      <h2 id={id} className={`scroll-mt-24 ${className || ""}`} {...rest}>
                        {children}
                      </h2>
                    );
                  },
                  h2: ({ node, children, ...props }) => {
                    const text = String(children as any);
                    const id = slugify(text);
                    const { className, ...rest } = props as any;
                    return (
                      <h2 id={id} className={`scroll-mt-24 ${className || ""}`} {...rest}>
                        {children}
                      </h2>
                    );
                  },
                  h3: ({ node, children, ...props }) => {
                    const text = String(children as any);
                    const id = slugify(text);
                    const { className, ...rest } = props as any;
                    return (
                      <h3 id={id} className={`scroll-mt-24 ${className || ""}`} {...rest}>
                        {children}
                      </h3>
                    );
                  },
                  a: ({ node, children, ...props }) => {
                    const href = (props as any).href || "";
                    const isExternal = /^https?:\/\//.test(href) || href.startsWith("//");
                    const isWhatsApp = href.includes("wa.me") || href.startsWith("whatsapp:");
                    const isTel = href.startsWith("tel:");
                    const rel = isTel ? "nofollow" : (isExternal || isWhatsApp ? "noopener noreferrer" : undefined);
                    const target = isExternal || isWhatsApp ? "_blank" : undefined;
                    const ariaLabel = (props as any)["aria-label"] || (isTel ? "Appeler Ambulance Maroc" : undefined);
                    return (
                      <a {...props} target={target} rel={rel} aria-label={ariaLabel}>
                        {children}
                      </a>
                    );
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            </article>
          </section>

          {/* Sommaire (TOC) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 max-h-[80vh] overflow-auto pr-1 border rounded-lg p-4 bg-card text-card-foreground text-sm leading-snug">
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
                          aria-current={activeId === h.id ? "true" : undefined}
                          className={`block hover:text-primary transition-colors ${activeId === h.id ? "text-primary font-medium" : "text-muted-foreground"}`}
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
                const path = r.city ? `/blog/${r.city}/${r.slug}` : `/blog/${r.slug}`;
                return (
                  <article key={r.slug} className="rounded-lg border bg-card text-card-foreground p-4">
                    <h3 className="text-base font-semibold">
                      <Link className="hover:underline" to={path}>{r.title}</Link>
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-3">{r.description}</p>
                    <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
                      <time dateTime={r.date}>{new Date(r.date).toLocaleDateString("fr-MA")}</time>
                      <span aria-hidden>•</span>
                      <span>{r.readingTime} min</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {(prev || next) && (
          <nav aria-label="Navigation des articles" className="max-w-5xl mx-auto mt-10 flex justify-between items-center gap-4">
            {prev ? (
              <Link
                to={prev.city ? `/blog/${prev.city}/${prev.slug}` : `/blog/${prev.slug}`}
                rel="prev"
                className="text-sm font-medium hover:underline"
              >
                ← Article précédent: {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                to={next.city ? `/blog/${next.city}/${next.slug}` : `/blog/${next.slug}`}
                rel="next"
                className="text-sm font-medium hover:underline"
              >
                Article suivant: {next.title} →
              </Link>
            )}
          </nav>
        )}

        {/* Mobile sticky CTA */}
        <div className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-3 flex gap-2">
            <Button asChild className="flex-1">
              <a href={`tel:${PHONE_TEL}`} aria-label="Appeler maintenant" rel="nofollow">Appeler</a>
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
