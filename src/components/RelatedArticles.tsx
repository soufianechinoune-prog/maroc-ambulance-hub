import { Link } from "react-router-dom";

interface RelatedArticlesProps {
  currentSlug?: string;
  city?: string;
  variant?: 'city' | 'neighborhood' | 'service';
  maxArticles?: number;
}

const RelatedArticles = ({ 
  currentSlug, 
  city = 'casablanca', 
  variant = 'city',
  maxArticles = 6 
}: RelatedArticlesProps) => {
  
  const getRelatedLinks = () => {
    switch(variant) {
      case 'neighborhood':
        if (city === 'casablanca') {
          return [
            {
              title: "Guide complet ambulance Casablanca centre-ville",
              slug: "/blog/ambulance-casablanca-centre",
              description: "Repères utiles, accès immeubles et axes prioritaires"
            },
            {
              title: "Urgences médicales quartier Maârif Casablanca", 
              slug: "/blog/ambulance-casablanca-maarif",
              description: "Zones couvertes, itinéraires rapides, délais d'arrivée"
            },
            {
              title: "Transport sanitaire Californie Casablanca",
              slug: "/blog/ambulance-casablanca-californie", 
              description: "Intervention rapide dans le quartier résidentiel"
            },
            {
              title: "Ambulance Aïn Diab et front de mer",
              slug: "/blog/ambulance-casablanca-ain-diab",
              description: "Service spécialisé zones touristiques et corniche"
            },
            {
              title: "Service médical d'urgence Bourgogne",
              slug: "/blog/ambulance-casablanca-bourgogne", 
              description: "Axes rapides et repères pour intervention efficace"
            },
            {
              title: "Comment appeler une ambulance à Casablanca",
              slug: "/blog/comment-appeler-ambulance-casablanca",
              description: "Numéros, procédures et conseils pratiques"
            }
          ];
        } else if (city === 'rabat') {
          return [
            {
              title: "Ambulance Rabat Agdal : zones universitaires",
              slug: "/blog/ambulance-rabat-agdal", 
              description: "Service spécialisé quartier universitaire et résidentiel"
            },
            {
              title: "Transport médicalisé Hassan Rabat",
              slug: "/blog/ambulance-rabat-hassan",
              description: "Intervention dans le centre administratif"
            },
            {
              title: "Urgences Hay Riad Rabat",
              slug: "/blog/ambulance-rabat-hay-riad",
              description: "Couverture zones d'affaires et résidentielles"
            },
            {
              title: "Service ambulance Souissi Rabat", 
              slug: "/blog/ambulance-rabat-souissi",
              description: "Quartier diplomatique et zones VIP"
            },
            {
              title: "Nouveau CHU Ibn Sina Rabat",
              slug: "/blog/nouveau-chu-ibn-sina-rabat",
              description: "Transferts et coordination avec le nouveau CHU"
            }
          ];
        }
        break;
        
      case 'service':
        return [
          {
            title: "Transport médicalisé Casablanca : guide complet",
            slug: "/blog/transport-medicalise-casablanca-guide",
            description: "Équipements, personnel, tarifs et procédures"
          },
          {
            title: "Tarifs ambulance Casablanca : prix et conseils",
            slug: "/blog/tarifs-ambulance-casablanca-prix-conseils", 
            description: "Grille tarifaire transparente et facteurs de coût"
          },
          {
            title: "Temps d'intervention ambulance Casablanca",
            slug: "/blog/temps-intervention-ambulance-casablanca",
            description: "Délais moyens selon zones et optimisation"
          },
          {
            title: "Consultation à domicile avec ambulance privée",
            slug: "/blog/consultation-domicile-ambulance-privee-casablanca",
            description: "Service médical à domicile et transport sécurisé"
          },
          {
            title: "Rapatriement sanitaire au Maroc",
            slug: "/blog/rapatriement-sanitaire-maroc",
            description: "Procédures, assurances et coordination médicale"
          },
          {
            title: "Transport inter-hôpitaux Casablanca",
            slug: "/blog/inter-hopitaux-casablanca-transfert-patients",
            description: "Transferts sécurisés entre établissements"
          }
        ];
        
      default: // city
        return [
          {
            title: "Transport médicalisé professionnel",
            slug: "/services",
            description: "Découvrez tous nos services d'ambulance"
          },
          {
            title: "Zones d'intervention nationales", 
            slug: "/zones-d-intervention",
            description: "Couverture territoriale complète au Maroc"
          },
          {
            title: "Contact et demande d'intervention",
            slug: "/contact", 
            description: "Numéros d'urgence et formulaire de contact"
          }
        ];
    }
    
    return [];
  };

  const relatedLinks = getRelatedLinks()
    .filter(link => link.slug !== currentSlug)
    .slice(0, maxArticles);

  if (relatedLinks.length === 0) return null;

  return (
    <section className="py-12 bg-muted/30 border-t" aria-label="Articles connexes">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Articles connexes sur les services d'ambulance
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedLinks.map((article, index) => (
            <article key={index} className="bg-background rounded-lg border p-6 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-foreground mb-3 leading-tight">
                <Link 
                  to={article.slug}
                  className="hover:text-primary transition-colors"
                >
                  {article.title}
                </Link>
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {article.description}
              </p>
              <Link 
                to={article.slug}
                className="text-primary text-sm font-medium hover:underline inline-flex items-center"
              >
                Lire l'article
                <svg 
                  className="ml-1 h-4 w-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link 
            to="/blog"
            className="inline-flex items-center text-primary font-medium hover:underline"
          >
            <svg 
              className="mr-2 h-5 w-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Voir tous nos articles et guides médicaux
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;