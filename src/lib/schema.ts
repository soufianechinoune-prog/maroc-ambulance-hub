import type { City } from "@/data/cities";
import { SITE_URL } from "@/lib/config";

const DEFAULT_IMAGE = "/default-seo-image.jpg"; // served from public/

/**
 * Generate EmergencyService JSON-LD for a given city
 * Uniform schema for all city pages
 */
export function generateLocalBusinessSchema(city: City): Record<string, any> {
  const url = `${SITE_URL}/ambulance-${city.slug}`;
  const image = `${SITE_URL}${DEFAULT_IMAGE}`;

  return {
    "@context": "https://schema.org",
    "@type": "EmergencyService",
    name: `Ambulance ${city.name} – Intervention 24/7`,
    image,
    url,
    telephone: "+212777722311",
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressCountry: "MA",
    },
    areaServed: `${city.name}, Maroc`,
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: "$$",
    "@id": url,
  };
}
