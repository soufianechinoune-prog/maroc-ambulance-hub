import type { City } from "@/data/cities";
import { SITE_URL } from "@/lib/config";

const DEFAULT_IMAGE = "/default-seo-image.jpg"; // served from public/

/**
 * Generate LocalBusiness JSON-LD schema for a given city
 */
export function generateLocalBusinessSchema(city: City): Record<string, any> {
  const url = `${SITE_URL}/ambulance-${city.slug}`;
  const image = `${SITE_URL}${DEFAULT_IMAGE}`;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": url,
    name: `Ambulance ${city.name} – Intervention 24/7`,
    description: `Service d'ambulance professionnelle à ${city.name} avec intervention 24h/24 et 7j/7. Équipe médicale qualifiée, véhicules équipés.`,
    image: [image],
    url,
    telephone: "+212777722311",
    email: "contact@ambulance-maroc.ma",
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: "Maroc",
      addressCountry: "MA",
      postalCode: "20000"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 33.5731,
      longitude: -7.5898
    },
    areaServed: {
      "@type": "City",
      name: `${city.name}, Maroc`
    },
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: "$$",
    sameAs: [
      "https://www.facebook.com/ambulancemaroc",
      "https://www.instagram.com/ambulancemaroc"
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services d'ambulance",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Transport d'urgence",
            description: "Transport médicalisé d'urgence 24h/24"
          }
        },
        {
          "@type": "Offer", 
          itemOffered: {
            "@type": "Service",
            name: "Transport programmé",
            description: "Transport médicalisé programmé vers hôpitaux et cliniques"
          }
        }
      ]
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "4.8",
        bestRating: "5"
      },
      author: {
        "@type": "Person",
        name: "Clients vérifiés"
      },
      reviewBody: "Service d'ambulance fiable et professionnel à ${city.name}"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
      bestRating: "5"
    }
  };
}

/**
 * Generate Service JSON-LD schema
 */
export function generateServiceSchema(city: City): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/ambulance-${city.slug}#service`,
    name: `Service d'ambulance à ${city.name}`,
    description: `Transport médicalisé d'urgence et programmé à ${city.name}. Intervention 24h/24, équipe médicale qualifiée.`,
    provider: {
      "@type": "LocalBusiness",
      name: `Ambulance ${city.name}`,
      "@id": `${SITE_URL}/ambulance-${city.slug}`
    },
    areaServed: `${city.name}, Maroc`,
    serviceType: "Transport médicalisé",
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: "+212777722311",
      availableLanguage: ["French", "Arabic"]
    },
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59"
    }
  };
}

/**
 * Generate FAQ JSON-LD schema
 */
export function generateFAQSchema(): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Dans quelles villes intervenez-vous au Maroc ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nous intervenons dans plus de 15 villes marocaines incluant Casablanca, Rabat, Marrakech, Tanger, Fès, Agadir, Meknès, Oujda, Kenitra, Sale, Mohammedia, Tétouan et Laâyoune."
        }
      },
      {
        "@type": "Question", 
        name: "Quel est votre délai d'intervention moyen ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Notre délai d'intervention moyen est de 12-15 minutes en zone urbaine et 20-30 minutes en zone périurbaine."
        }
      },
      {
        "@type": "Question",
        name: "Comment est assurée la prise en charge médicale ?",
        acceptedAnswer: {
          "@type": "Answer", 
          text: "Chaque ambulance est équipée d'un matériel médical complet (défibrillateur, oxygène, monitoring) et notre personnel est formé aux gestes d'urgence."
        }
      },
      {
        "@type": "Question",
        name: "Peut-on réserver une ambulance à l'avance ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, nous acceptons les réservations pour les transports médicalisés programmés. Pour les urgences, nous intervenons immédiatement."
        }
      }
    ]
  };
}
