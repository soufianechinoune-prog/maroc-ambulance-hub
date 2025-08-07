import type { City } from "@/data/cities";

const BASE_URL = "https://www.ambulance-maroc.ma";
const DEFAULT_IMAGE = "/default-seo-image.jpg"; // served from public/

/**
 * Generate LocalBusiness JSON-LD for a given city
 * Ensures consistent fields for all city pages and SSR-friendly output via react-helmet-async
 */
export function generateLocalBusinessSchema(city: City): Record<string, any> {
  const url = `${BASE_URL}/ambulance-${city.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Ambulance ${city.name} - Ambulance Maroc`,
    image: `${BASE_URL}${DEFAULT_IMAGE}`,
    url,
    telephone: city.phone || "+212600000000",
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressCountry: "MA",
    },
    openingHours: "Mo-Su 00:00-23:59",
    areaServed: {
      "@type": "Place",
      name: city.name,
    },
    "@id": url,
  };
}
