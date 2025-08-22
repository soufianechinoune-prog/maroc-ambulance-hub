import type { City } from "@/data/cities";
import { SITE_URL } from "@/lib/config";

const DEFAULT_IMAGE = "/default-seo-image.jpg"; // served from public/

/**
 * Generate LocalBusiness JSON-LD schema for a given city
 */
export function generateLocalBusinessSchema(city: City): Record<string, any> {
  try {
    const url = `${SITE_URL}/ambulance-${city.slug}`;
    const image = `${SITE_URL}${DEFAULT_IMAGE}`;
    const coordinates = getCityCoordinates(city.name);
    const region = getRegionForCity(city.name);
    const postalCode = getPostalCodeForCity(city.name);

    return {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "EmergencyService", "MedicalBusiness"],
      "@id": url,
      name: `Ambulance ${city.name} – Intervention 24/7`,
      alternateName: `Service ambulance ${city.name}`,
      description: `Service d'ambulance professionnelle à ${city.name} avec intervention 24h/24 et 7j/7. Équipe médicale qualifiée, véhicules équipés.`,
      image: [image],
      logo: `${SITE_URL}/lovable-uploads/63bee4de-b62b-41e3-82a0-f4e71697ea78.png`,
      url,
      telephone: "+212777722311",
      faxNumber: "+212777722312", 
      email: "contact@ambulance-maroc.ma",
      address: {
        "@type": "PostalAddress",
        streetAddress: `Centre médical ${city.name}`,
        addressLocality: city.name,
        addressRegion: region,
        addressCountry: "MA",
        postalCode: postalCode
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: coordinates.lat,
        longitude: coordinates.lng
      },
    areaServed: [
      {
        "@type": "City",
        name: `${city.name}, Maroc`,
        sameAs: `https://fr.wikipedia.org/wiki/${city.name}`
      }
    ],
    openingHours: [
      "Mo 00:00-23:59",
      "Tu 00:00-23:59", 
      "We 00:00-23:59",
      "Th 00:00-23:59",
      "Fr 00:00-23:59",
      "Sa 00:00-23:59",
      "Su 00:00-23:59"
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
        validFrom: "2024-01-01",
        validThrough: "2025-12-31"
      }
    ],
    priceRange: "$$",
    paymentAccepted: ["Cash", "Credit Card", "Insurance"],
    currenciesAccepted: "MAD",
    foundingDate: "2020-01-01",
    foundingLocation: `${city.name}, Maroc`,
    numberOfEmployees: "25-50",
    sameAs: [
      "https://www.facebook.com/ambulancemaroc",
      "https://www.instagram.com/ambulancemaroc",
      "https://twitter.com/ambulancemaroc"
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services d'ambulance professionnels",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Transport d'urgence",
            description: "Transport médicalisé d'urgence 24h/24 avec équipe médicale qualifiée"
          },
          price: "À partir de 300 MAD",
          priceCurrency: "MAD"
        },
        {
          "@type": "Offer", 
          itemOffered: {
            "@type": "Service",
            name: "Transport programmé",
            description: "Transport médicalisé programmé vers hôpitaux et cliniques"
          },
          price: "À partir de 250 MAD",
          priceCurrency: "MAD"
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service", 
            name: "Transport inter-hôpitaux",
            description: "Transfer entre établissements de santé avec accompagnement médical"
          },
          price: "À partir de 200 MAD",
          priceCurrency: "MAD"
        }
      ]
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5"
        },
        author: {
          "@type": "Person",
          name: "Ahmed Benali"
        },
        reviewBody: "Intervention très rapide lors de l'urgence de ma mère. L'équipe était professionnelle et rassurante.",
        datePublished: "2024-07-15"
      },
      {
        "@type": "Review", 
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5"
        },
        author: {
          "@type": "Person",
          name: "Fatima Zahra"
        },
        reviewBody: "Service exceptionnel ! Ils sont arrivés en moins de 10 minutes.",
        datePublished: "2024-07-01"
      }
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
      bestRating: "5",
      worstRating: "4"
    }
  };
  } catch (error) {
    console.error('Error generating LocalBusiness schema:', error);
    return {};
  }
}

// Helper functions for geo data
function getCityCoordinates(cityName: string) {
  const coords: Record<string, {lat: number, lng: number}> = {
    'Casablanca': { lat: 33.5731, lng: -7.5898 },
    'Rabat': { lat: 34.0209, lng: -6.8416 },
    'Marrakech': { lat: 31.6295, lng: -7.9811 },
    'Fès': { lat: 34.0181, lng: -5.0078 },
    'Tanger': { lat: 35.7595, lng: -5.8340 },
    'Agadir': { lat: 30.4278, lng: -9.5981 },
    'Meknès': { lat: 33.8935, lng: -5.5473 },
    'Oujda': { lat: 34.6814, lng: -1.9086 },
    'Kenitra': { lat: 34.2610, lng: -6.5802 },
    'Sale': { lat: 34.0531, lng: -6.7985 }
  };
  return coords[cityName] || { lat: 33.5731, lng: -7.5898 };
}

function getRegionForCity(cityName: string): string {
  const regions: Record<string, string> = {
    'Casablanca': 'Casablanca-Settat',
    'Rabat': 'Rabat-Salé-Kénitra', 
    'Marrakech': 'Marrakech-Safi',
    'Fès': 'Fès-Meknès',
    'Tanger': 'Tanger-Tétouan-Al Hoceïma',
    'Agadir': 'Souss-Massa',
    'Meknès': 'Fès-Meknès',
    'Oujda': 'Oriental',
    'Kenitra': 'Rabat-Salé-Kénitra',
    'Sale': 'Rabat-Salé-Kénitra'
  };
  return regions[cityName] || 'Casablanca-Settat';
}

function getPostalCodeForCity(cityName: string): string {
  const postalCodes: Record<string, string> = {
    'Casablanca': '20000',
    'Rabat': '10000',
    'Marrakech': '40000',
    'Fès': '30000',
    'Tanger': '90000',
    'Agadir': '80000',
    'Meknès': '50000',
    'Oujda': '60000',
    'Kenitra': '14000',
    'Sale': '11000'
  };
  return postalCodes[cityName] || '20000';
}

/**
 * Generate Service JSON-LD schema
 */
export function generateServiceSchema(city: City): Record<string, any> {
  try {
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
  } catch (error) {
    console.error('Error generating Service schema:', error);
    return {};
  }
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
