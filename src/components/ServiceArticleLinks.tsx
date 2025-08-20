import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, FileText, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllPosts } from "@/lib/blog";
import type { BlogPost } from "@/lib/blog";

interface ServiceArticleLinksProps {
  context: 'service-to-blog' | 'blog-to-service';
  currentService?: 'urgence' | 'inter-hopitaux' | 'longue-distance' | 'evenements';
  currentCity?: string;
  currentSlug?: string;
  maxLinks?: number;
}

// Service mapping for contextual linking
const serviceMapping = {
  'urgence': {
    keywords: ['urgence', 'rapide', '24/7', 'intervention', 'appeler'],
    servicePage: '/services#urgence',
    title: 'Transport d\'urgence 24/7'
  },
  'inter-hopitaux': {
    keywords: ['transfert', 'hôpital', 'transport médicalisé', 'chu', 'clinique'],
    servicePage: '/services#inter-hopitaux', 
    title: 'Transport inter-hôpitaux'
  },
  'longue-distance': {
    keywords: ['longue distance', 'transport', 'rapatriement', 'déplacement'],
    servicePage: '/services#longue-distance',
    title: 'Transport longue distance'
  },
  'evenements': {
    keywords: ['événement', 'couverture', 'sportif', 'manifestation'],
    servicePage: '/services#evenements',
    title: 'Couverture événements'
  }
};

const ServiceArticleLinks = ({ 
  context, 
  currentService, 
  currentCity, 
  currentSlug, 
  maxLinks = 4 
}: ServiceArticleLinksProps) => {
  const [relevantContent, setRelevantContent] = useState<{
    articles?: BlogPost[];
    services?: Array<{title: string; href: string; description: string}>;
  }>({});

  useEffect(() => {
    if (context === 'service-to-blog') {
      // From service page to relevant blog articles
      const allPosts = getAllPosts();
      let filteredPosts = allPosts;

      // Filter by current service if specified
      if (currentService) {
        const serviceKeywords = serviceMapping[currentService]?.keywords || [];
        filteredPosts = allPosts.filter(post => 
          serviceKeywords.some(keyword => 
            post.title.toLowerCase().includes(keyword.toLowerCase()) ||
            post.description.toLowerCase().includes(keyword.toLowerCase()) ||
            post.keywords?.some(k => k.toLowerCase().includes(keyword.toLowerCase()))
          )
        );
      }

      // Filter by city if specified
      if (currentCity) {
        filteredPosts = filteredPosts.filter(post => 
          post.city === currentCity || 
          post.title.toLowerCase().includes(currentCity.toLowerCase())
        );
      }

      // Remove current article if we're on a blog post
      if (currentSlug) {
        filteredPosts = filteredPosts.filter(post => post.slug !== currentSlug);
      }

      // Sort by relevance and limit
      const sortedPosts = filteredPosts
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, maxLinks);

      setRelevantContent({ articles: sortedPosts });

    } else if (context === 'blog-to-service') {
      // From blog article to relevant services
      const services = [];
      
      // Analyze current context to suggest relevant services
      const contextText = `${currentSlug} ${currentCity}`.toLowerCase();
      
      for (const [serviceKey, serviceData] of Object.entries(serviceMapping)) {
        if (serviceData.keywords.some(keyword => contextText.includes(keyword.toLowerCase()))) {
          services.push({
            title: serviceData.title,
            href: serviceData.servicePage,
            description: getServiceDescription(serviceKey as keyof typeof serviceMapping, currentCity)
          });
        }
      }

      // Always add main services page
      if (services.length < maxLinks) {
        services.push({
          title: `Services ambulance ${currentCity ? currentCity.charAt(0).toUpperCase() + currentCity.slice(1) : 'Maroc'}`,
          href: '/services',
          description: `Découvrez tous nos services d'ambulance${currentCity ? ` à ${currentCity.charAt(0).toUpperCase() + currentCity.slice(1)}` : ' au Maroc'} : urgence, transferts, longue distance.`
        });
      }

      setRelevantContent({ services: services.slice(0, maxLinks) });
    }
  }, [context, currentService, currentCity, currentSlug, maxLinks]);

  const getServiceDescription = (service: keyof typeof serviceMapping, city?: string): string => {
    const cityStr = city ? ` à ${city.charAt(0).toUpperCase() + city.slice(1)}` : '';
    
    switch (service) {
      case 'urgence':
        return `Service ambulance d'urgence 24/7${cityStr}. Intervention rapide avec équipe médicale qualifiée.`;
      case 'inter-hopitaux':
        return `Transport médicalisé entre hôpitaux${cityStr}. Transferts sécurisés avec suivi médical.`;
      case 'longue-distance':
        return `Transport ambulance longue distance${cityStr}. Accompagnement médical pour trajets étendus.`;
      case 'evenements':
        return `Couverture médicale événements${cityStr}. Équipes sur site et intervention d'urgence.`;
      default:
        return `Service ambulance professionnel${cityStr}. Intervention 24/7 partout au Maroc.`;
    }
  };

  if ((!relevantContent.articles || relevantContent.articles.length === 0) && 
      (!relevantContent.services || relevantContent.services.length === 0)) {
    return null;
  }

  return (
    <section className="py-8 bg-muted/30 border rounded-lg" aria-label={context === 'service-to-blog' ? "Articles connexes" : "Services connexes"}>
      <div className="px-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          {context === 'service-to-blog' ? (
            <>
              <FileText className="h-5 w-5 mr-2 text-primary" />
              Articles sur nos services d'ambulance
            </>
          ) : (
            <>
              <ExternalLink className="h-5 w-5 mr-2 text-primary" />
              Nos services d'ambulance
            </>
          )}
        </h3>

        {context === 'service-to-blog' && relevantContent.articles && (
          <div className="grid gap-4 md:grid-cols-2">
            {relevantContent.articles.map((article) => (
              <Card key={article.slug} className="hover:shadow-md transition-shadow border-l-4 border-l-primary/30">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {article.city ? article.city.charAt(0).toUpperCase() + article.city.slice(1) : 'National'}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {article.readingTime} min de lecture
                    </span>
                  </div>
                  <h4 className="font-medium text-foreground mb-2 line-clamp-2">
                    <Link 
                      to={`/blog/${article.slug}`}
                      className="hover:text-primary transition-colors"
                      aria-label={`Lire l'article: ${article.title}`}
                    >
                      {article.title}
                    </Link>
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {article.description}
                  </p>
                  <Link 
                    to={`/blog/${article.slug}`}
                    className="inline-flex items-center text-sm text-primary font-medium hover:text-primary/80 transition-colors"
                    aria-label={`Lire l'article complet sur ${article.title}`}
                  >
                    Lire l'article complet
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {context === 'blog-to-service' && relevantContent.services && (
          <div className="space-y-4">
            {relevantContent.services.map((service, index) => (
              <div key={index} className="border-l-4 border-primary/30 pl-4 py-3 bg-background/50 rounded-r">
                <h4 className="font-medium text-foreground mb-2">
                  <Link 
                    to={service.href}
                    className="text-primary hover:text-primary/80 transition-colors flex items-center"
                    aria-label={`Découvrir ${service.title}`}
                  >
                    {service.title}
                    <ExternalLink className="h-4 w-4 ml-2 opacity-70" />
                  </Link>
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 p-4 bg-background/50 rounded border-l-4 border-primary/50">
          <p className="text-xs text-muted-foreground">
            💡 Ces liens vous aident à naviguer entre nos {context === 'service-to-blog' ? 'guides pratiques et nos services' : 'services et nos articles détaillés'}.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceArticleLinks;