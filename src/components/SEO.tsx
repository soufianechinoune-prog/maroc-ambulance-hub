import { Helmet } from "react-helmet-async";
import { SITE_URL } from "@/lib/config";

type Props = {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  jsonLd?: Record<string, any>;
  keywords?: string[];
  author?: string;
  noIndex?: boolean;
  jsonLdMultiple?: Record<string, any>[];
};

export default function SEO({ 
  title, 
  description, 
  canonical, 
  image, 
  jsonLd, 
  keywords, 
  author, 
  noIndex = false, 
  jsonLdMultiple 
}: Props) {
  const ogImg = image ?? "/default-ambulance.jpg";
  const absCanonical = canonical?.startsWith("http") ? canonical : `${SITE_URL}${canonical}`;
  
  return (
    <>
      <Helmet htmlAttributes={{ lang: "fr" }}>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content={author || "Ambulance Maroc"} />
        <link rel="canonical" href={absCanonical} />
        
        {/* Robots meta */}
        {noIndex ? (
          <meta name="robots" content="noindex, nofollow" />
        ) : (
          <meta name="robots" content="index, follow" />
        )}
        
        {/* Keywords meta */}
        {keywords && keywords.length > 0 && (
          <meta name="keywords" content={keywords.join(", ")} />
        )}
        
        {/* OpenGraph meta tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={absCanonical} />
        <meta property="og:image" content={ogImg} />
        <meta property="og:locale" content="fr_MA" />
        
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImg} />
      </Helmet>
      
      {/* JSON-LD single schema */}
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      
      {/* JSON-LD multiple schemas */}
      {jsonLdMultiple && jsonLdMultiple.map((schema, index) => (
        <script 
          key={index}
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} 
        />
      ))}
    </>
  );
}