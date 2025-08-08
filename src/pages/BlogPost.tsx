import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { SITE_URL } from "@/lib/config";
import { addInternalLinks, getPostBySlug } from "@/lib/blog";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BlogPost = () => {
  const { slug = "" } = useParams();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <>
        <SEO
          title="Article introuvable – Blog Ambulance Casablanca"
          description="Article introuvable. Découvrez nos guides sur l'ambulance à Casablanca."
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

  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const image = post.coverImage || "/default-seo-image.jpg";

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: `${SITE_URL}${image}`,
    author: { "@type": "Organization", name: post.author || "Ambulance Maroc" },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: canonical,
  };

  const content = addInternalLinks(post.content);

  return (
    <>
      <SEO
        title={`${post.title} | Blog Ambulance Casablanca`}
        description={post.description}
        canonical={canonical}
        image={image}
        keywords={post.keywords}
        author={post.author}
        jsonLd={articleLd}
      />
      <Header />
      <main className="container mx-auto px-4 py-10">
        <article className="prose prose-neutral max-w-3xl mx-auto">
          <header className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{post.title}</h1>
            <p className="text-sm text-muted-foreground mt-2">{new Date(post.date).toLocaleDateString("fr-MA")} • {post.author || "Ambulance Maroc"}</p>
            {image && (
              <img src={image} alt={`${post.title} – ambulance Casablanca`} loading="lazy" className="w-full rounded-lg mt-4" />
            )}
          </header>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({ node, ...props }) => (
                // ensure lazy
                <img loading="lazy" alt={props.alt || `${post.title} – ambulance Casablanca`} {...props} />
              ),
              a: ({ node, ...props }) => (
                <a {...props} rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined} />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
        <nav className="max-w-3xl mx-auto mt-10">
          <Link to="/blog" className="text-primary font-medium hover:underline">← Tous les articles</Link>
        </nav>
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;
