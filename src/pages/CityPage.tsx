
import { useParams } from "react-router-dom";
import { cities } from "@/data/cities";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReassuranceSection from "@/components/ReassuranceSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactForm from "@/components/ContactForm";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MessageCircle, MapPin, Clock, Users, CheckCircle } from "lucide-react";
const CityPage = () => {
  const { citySlug } = useParams();
  
  // Extract city slug from URL path (handle both /ambulance-city and /city formats)
  const extractSlugFromPath = () => {
    const path = window.location.pathname;
    if (path.startsWith('/ambulance-')) {
      return path.replace('/ambulance-', '');
    }
    return path.replace('/', '');
  };
  
  const slug = citySlug || extractSlugFromPath();
  const city = cities.find(c => c.slug === slug);
  const siteUrl = "https://www.ambulance-maroc.ma";

  // SEO data optimisé pour chaque ville
  const seoData = {
    casablanca: {
      title: "Ambulance Casablanca - Service d'Urgence 24h/24 | Ambulance Maroc",
      description: "Besoin d'une ambulance à Casablanca ? Service rapide, professionnel et disponible 24h/24 pour toutes vos urgences médicales. Contactez-nous immédiatement.",
    },
    rabat: {
      title: "Ambulance Rabat - Service d'Urgence 24h/24 | Ambulance Maroc",
      description: "Besoin d'une ambulance à Rabat ? Intervention rapide, 24h/24, dans tous les quartiers. Équipe médicale expérimentée, véhicules équipés. Appelez-nous dès maintenant.",
    },
    marrakech: {
      title: "🚑 Ambulance Marrakech - Intervention rapide 24h/24 | Ambulance Maroc",
      description: "Besoin d'une ambulance à Marrakech ? Nos équipes interviennent 24h/24 en moins de 15 min. Services médicaux, touristiques et urgences. 📞 +212 7777 223 11",
    },
    tanger: {
      title: "Ambulance Tanger - Service Médical 24h/24 | Ambulance Maroc",
      description: "Urgence ou transport médical à Tanger ? Nos ambulances sont prêtes à intervenir 24h/24, avec du personnel qualifié et une couverture sur toute la région.",
    },
    agadir: {
      title: "Ambulance Agadir - Service d'Urgence 24h/24 | Ambulance Maroc",
      description: "Besoin d'une ambulance à Agadir ? Service rapide, sécurisé et disponible 24h/24 pour tous types d'urgences médicales dans la région Souss-Massa.",
    },
    fes: {
      title: "Ambulance Fès - Service Médical d'Urgence 24h/24 | Ambulance Maroc",
      description: "Besoin d'une ambulance à Fès ? Intervention rapide 24h/24, personnel qualifié et véhicules équipés. Appelez dès maintenant pour une prise en charge immédiate.",
    },
    meknes: {
      title: "Ambulance Meknès - Intervention Médicale Rapide 24h/24 | Ambulance Maroc",
      description: "Ambulance à Meknès disponible 24h/24 pour urgences, transferts et hospitalisations. Service fiable, rapide et professionnel dans toute la région.",
    },
    oujda: {
      title: "Ambulance Oujda - Service d'Urgence 24h/24 | Ambulance Maroc",
      description: "Ambulance à Oujda disponible jour et nuit pour urgences médicales et transferts vers cliniques et hôpitaux. Intervention rapide et professionnelle 7j/7.",
    },
    tetouan: {
      title: "Ambulance Tétouan - Service d’Urgence 24h/24 | Ambulance Maroc",
      description: "Ambulance à Tétouan disponible 24h/24 pour toutes urgences médicales. Transferts vers hôpitaux, interventions rapides, et équipes qualifiées.",
    },
    laayoune: {
      title: "Ambulance Laâyoune - Transport Médical Rapid et Fiable",
      description: "Intervention ambulanciere à Laâyoune en urgence. Transfert hospitalier, assistance médicale, prise en charge rapide.",
    },
    mohammedia: {
      title: "Ambulance Mohammedia - Services Sanitaires Immédiats",
      description: "Ambulance privée à Mohammedia disponible pour urgence et hospitalisation. Intervention express et accompagnement médical.",
    },
    kenitra: {
      title: "Ambulance Kénitra - Intervention Médicale Urgente 24h/24 | Ambulance Maroc",
      description: "Ambulance à Kénitra disponible jour et nuit. Transferts hospitaliers, urgences, évacuations sanitaires. Équipe qualifiée. Appel immédiat possible.",
    },
  };

  const cityData = seoData[city?.slug] || {};
  const title = cityData.title || `Ambulance à ${city?.name} – Intervention rapide 24/7 | Ambulance Maroc` || "Ville non trouvée";
  const description = cityData.description || `Ambulance à ${city?.name}, intervention 24/7. Temps de réponse ${city?.responseTime}. ${city?.coverage}.` || "";
  const canonical = city ? `${siteUrl}/ambulance-${city.slug}` : `${siteUrl}/`;

  // JSON-LD spécifique pour Marrakech et Rabat
  const marrakechJsonLd = city?.slug === 'marrakech' ? {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Ambulance Marrakech",
    "image": "https://www.ambulance-maroc.ma/images/ambulance-marrakech.jpg",
    "url": "https://www.ambulance-maroc.ma/ambulance-marrakech",
    "telephone": "+212777722311",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Marrakech",
      "addressCountry": "MA"
    },
    "openingHours": "24/7",
    "areaServed": {
      "@type": "City",
      "name": "Marrakech"
    }
  } : undefined;

  const rabatJsonLd = city?.slug === 'rabat' ? {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Ambulance Rabat",
    "image": "https://www.ambulance-maroc.ma/images/ambulance-rabat.jpg",
    "url": "https://www.ambulance-maroc.ma/ambulance-rabat",
    "telephone": "+212777722311",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Rabat",
      "addressCountry": "MA"
    },
    "openingHours": "24/7",
    "areaServed": {
      "@type": "City",
      "name": "Rabat"
    }
  } : undefined;

  const fesJsonLd = city?.slug === 'fes' ? {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Ambulance Maroc - Fès",
    "image": "https://www.ambulance-maroc.ma/images/ambulance-fes.jpg",
    "@id": "https://www.ambulance-maroc.ma/ambulance-fes",
    "url": "https://www.ambulance-maroc.ma/ambulance-fes",
    "telephone": "+212600000000",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Fès",
      "addressCountry": "MA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 34.0331,
      "longitude": -4.9998
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "areaServed": {
      "@type": "Place",
      "name": "Fès, Saïss, Fès-Meknès"
    },
    "description": "Service d'ambulance médicalisée à Fès. Intervention rapide, 24h/24, personnel qualifié, zones desservies : Fès, Sefrou, Meknès, Imouzzer, etc."
  } : undefined;

  const agadirJsonLd = city?.slug === 'agadir' ? {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Ambulance Maroc - Agadir",
    "image": "https://www.ambulance-maroc.ma/images/ambulance-agadir.jpg",
    "@id": "https://www.ambulance-maroc.ma/ambulance-agadir",
    "url": "https://www.ambulance-maroc.ma/ambulance-agadir",
    "telephone": "+212600000000",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Agadir",
      "addressCountry": "MA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 30.4278,
      "longitude": -9.5981
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "areaServed": {
      "@type": "Place",
      "name": "Agadir, Souss-Massa"
    },
    "description": "Service d'ambulance à Agadir disponible 24h/24 pour les urgences, transferts et soins médicaux. Zones couvertes : centre-ville, Inezgane, Aït Melloul, Dcheira, Taroudant."
  } : undefined;

  const mohammediaJsonLd = city?.slug === 'mohammedia' ? {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Ambulance Maroc - Mohammedia",
    "image": "https://www.ambulance-maroc.ma/images/ambulance-mohammedia.jpg",
    "@id": "https://www.ambulance-maroc.ma/ambulance-mohammedia",
    "url": "https://www.ambulance-maroc.ma/ambulance-mohammedia",
    "telephone": "+212600000000",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mohammedia",
      "addressCountry": "MA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 33.6861,
      "longitude": -7.3847
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "areaServed": {
      "@type": "Place",
      "name": "Mohammedia et environs"
    },
    "description": "Ambulance à Mohammedia disponible 24h/24 pour urgences, transferts médicaux, évacuations sanitaires. Zones couvertes : centre-ville, plage, Zenata, Mansouria, zone industrielle."
  } : undefined;

  const kenitraJsonLd = city?.slug === 'kenitra' ? {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Ambulance Maroc - Kénitra",
    "image": "https://www.ambulance-maroc.ma/images/ambulance-kenitra.jpg",
    "@id": "https://www.ambulance-maroc.ma/ambulance-kenitra",
    "url": "https://www.ambulance-maroc.ma/ambulance-kenitra",
    "telephone": "+212600000000",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kénitra",
      "addressCountry": "MA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 34.2610,
      "longitude": -6.5790
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "areaServed": {
      "@type": "Place",
      "name": "Kénitra et région Gharb"
    },
    "description": "Ambulance à Kénitra – Urgences et transferts médicaux 24h/24 vers CHU, cliniques, Mehdia, Sidi Taïbi et toute la région. Équipe formée et matériel complet."
  } : undefined;

  const meknesJsonLd = city?.slug === 'meknes' ? {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Ambulance Maroc - Meknès",
    "image": "https://www.ambulance-maroc.ma/images/ambulance-meknes.jpg",
    "@id": "https://www.ambulance-maroc.ma/ambulance-meknes",
    "url": "https://www.ambulance-maroc.ma/ambulance-meknes",
    "telephone": "+212600000000",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Meknès",
      "addressCountry": "MA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 33.8950,
      "longitude": -5.5547
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "areaServed": {
      "@type": "Place",
      "name": "Meknès et région Fès-Meknès"
    },
    "description": "Service d’ambulance à Meknès 24h/24 – Urgences, transferts médicaux et hospitaliers, coordination avec les établissements de soins. Équipe expérimentée."
  } : undefined;

  const oujdaJsonLd = city?.slug === 'oujda' ? {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Ambulance Maroc - Oujda",
    "image": "https://www.ambulance-maroc.ma/images/ambulance-oujda.jpg",
    "@id": "https://www.ambulance-maroc.ma/ambulance-oujda",
    "url": "https://www.ambulance-maroc.ma/ambulance-oujda",
    "telephone": "+212600000000",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Oujda",
      "addressCountry": "MA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 34.6835,
      "longitude": -1.9086
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "areaServed": {
      "@type": "Place",
      "name": "Oujda et région de l’Oriental"
    },
    "description": "Service ambulance 24h/24 à Oujda pour urgences médicales, évacuations et transferts. Équipe qualifiée, véhicules équipés, intervention rapide."
  } : undefined;

  const tetouanJsonLd = city?.slug === 'tetouan' ? {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Ambulance Maroc - Tétouan",
    "image": "https://www.ambulance-maroc.ma/images/ambulance-tetouan.jpg",
    "@id": "https://www.ambulance-maroc.ma/ambulance-tetouan",
    "url": "https://www.ambulance-maroc.ma/ambulance-tetouan",
    "telephone": "+212600000000",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Tétouan",
      "addressCountry": "MA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 35.5714,
      "longitude": -5.3626
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "areaServed": {
      "@type": "Place",
      "name": "Tétouan, M’diq, Fnideq, Martil, Nord Maroc"
    },
    "description": "Service d'ambulance à Tétouan, disponible jour et nuit pour les urgences, transferts médicaux et interventions sanitaires dans toute la région Nord."
  } : undefined;

  const jsonLd = city ? (marrakechJsonLd || rabatJsonLd || fesJsonLd || agadirJsonLd || mohammediaJsonLd || kenitraJsonLd || meknesJsonLd || oujdaJsonLd || tetouanJsonLd || {
    "@context": "https://schema.org",
    "@type": "EmergencyService",
    "name": `Ambulance ${city.name}`,
    "areaServed": city.name,
    "url": canonical,
    "telephone": city.phone,
    "serviceArea": city.serviceArea,
    "availableService": ["Emergency medical transport", "Inter-hospital transfer", "Event standby"],
    "openingHours": "Mo-Su 00:00-23:59",
    "priceRange": "$$",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `Services d'ambulance à ${city.name}`,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Transport d'urgence",
            "description": `Service d'ambulance d'urgence 24h/24 à ${city.name}`
          }
        }
      ]
    }
  }) : undefined;

  if (!city) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Ville non trouvée</h1>
            <p className="text-xl text-gray-600 mb-8">
              Cette ville n'est pas encore dans notre zone de couverture.
            </p>
            <Button asChild>
              <a href="tel:+212777722311">Contactez-nous</a>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO title={title} description={description} canonical={canonical} jsonLd={jsonLd} />
      <Header city={city.name} />
      
      {/* Hero Section - Identique à la Home Page mais personnalisée */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden" aria-label={`Service d'ambulance à ${city.name}`}>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/src/assets/ambulance-hero.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
        </div>
        <img src="/src/assets/ambulance-hero.jpg" alt={`Ambulance à ${city.name} – intervention rapide au Maroc`} className="sr-only" />

        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl">
            <div className="space-y-6">
              {/* Location Badge */}
              <div className="inline-flex items-center bg-card/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                Service disponible à {city.name}
              </div>

               {/* Main Heading */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Ambulance à <span className="text-emergency">{city.name}</span> – Intervention 24/7
              </h1>
              
              <div className="text-xl md:text-2xl text-white/90 space-y-2">
                <p>Intervention rapide 24h/24 et 7j/7</p>
                <p className="font-semibold">Temps de réponse : {city.responseTime}</p>
              </div>

              {/* Key Features */}
              <div className="flex flex-wrap gap-4 text-white/90">
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                  <Clock className="h-5 w-5 mr-2 text-success" />
                  <span className="font-medium">Réponse {city.responseTime}</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                  <div className="h-5 w-5 mr-2 bg-success rounded-full flex items-center justify-center">
                    <div className="h-2 w-2 bg-white rounded-full"></div>
                  </div>
                  <span className="font-medium">Personnel qualifié</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                  <div className="h-5 w-5 mr-2 bg-emergency rounded-full flex items-center justify-center text-white text-xs font-bold">
                    +
                  </div>
                  <span className="font-medium">Équipement médical</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button 
                  variant="emergency" 
                  size="lg" 
                  className="text-lg px-8 py-4 h-auto"
                  asChild
                >
                  <a href="tel:+212777722311" className="flex items-center justify-center">
                    <Phone className="h-6 w-6 mr-3" />
                    📞 Appelez maintenant
                  </a>
                </Button>
                
                <Button 
                  variant="success" 
                  size="lg" 
                  className="text-lg px-8 py-4 h-auto"
                  asChild
                >
                  <a href="https://wa.me/212777722311" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 mr-3" />
                    💬 WhatsApp direct
                  </a>
                </Button>
                
                <Button 
                  variant="cta" 
                  size="lg" 
                  className="text-lg px-8 py-4 h-auto bg-white text-primary hover:bg-white/90"
                  asChild
                >
                  <a href="#demande-ambulance" className="flex items-center justify-center">
                    🚑 Demander une ambulance
                  </a>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-8 flex flex-wrap gap-6 text-white/80 text-sm">
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-success rounded-full mr-2"></div>
                  Agréé par le Ministère de la Santé
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-success rounded-full mr-2"></div>
                  + de 5000 interventions/an
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-success rounded-full mr-2"></div>
                  Couverture {city.region}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Emergency Contact (Mobile) */}
        <div className="fixed bottom-4 right-4 z-50 lg:hidden">
          <Button variant="emergency" size="lg" className="rounded-full shadow-2xl" asChild>
            <a href="tel:+212777722311">
              <Phone className="h-6 w-6" />
            </a>
          </Button>
        </div>
      </section>

      {/* City Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-emergency">Temps de Réponse</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">{city.responseTime}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle>Couverture</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">{city.coverage}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle>Population</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">{city.population}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle>Région</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-gray-900">{city.region}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* City Description */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Service d'Ambulance à {city.name}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {city.description}
              </p>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Spécificités locales :</h3>
                <ul className="space-y-3">
                  {city.specificities.map((spec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/src/assets/medical-team.jpg" 
                alt={`Équipe médicale ${city.name}`}
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu SEO spécifique pour Casablanca */}
      {city.slug === 'casablanca' && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Service Ambulance Casablanca 24h/24 et 7j/7</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Ambulance Maroc propose un <strong>service d'ambulance à Casablanca</strong> ultra-réactif, sécurisé et adapté à tous les types de situations : urgences vitales, transferts médicaux, hospitalisations planifiées ou soins à domicile.
              Nous opérons dans tous les quartiers de Casablanca : Maârif, Gauthier, Sidi Maarouf, Hay Hassani, Anfa, Ain Sebaâ, Derb Sultan, etc.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">👨‍⚕️ Ambulance privée à Casablanca avec personnel qualifié</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nos ambulances sont équipées pour le <strong>transport médicalisé à Casablanca</strong>. Chaque intervention est assurée par un personnel qualifié : auxiliaires ambulanciers, infirmiers, médecins d'urgence selon le cas.
              Le tout, dans un cadre réglementé, sécurisé et conforme aux standards nationaux et internationaux.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Disponibilité dans toute la région du Grand Casablanca</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nous intervenons dans les zones urbaines comme périphériques : Bouskoura, Dar Bouazza, Nouaceur, Lissasfa, Aïn Diab, etc.
              <strong> Notre centrale d'appel est disponible 24h/24</strong> pour vous orienter, répondre à vos questions ou planifier un transfert.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">💬 Comment nous contacter ?</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Un seul numéro pour toutes vos demandes à Casablanca : <strong>Appelez le <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline">+212 7777 223 11</a></strong> ou cliquez sur notre bouton WhatsApp pour une réponse immédiate.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Pourquoi choisir Ambulance Maroc ?</h3>
            <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
              <li>✅ Réactivité 24h/24 dans toute la ville</li>
              <li>✅ Personnel médical formé et expérimenté</li>
              <li>✅ Ambulances modernes et bien équipées</li>
              <li>✅ Intervention dans tous les arrondissements de Casablanca</li>
              <li>✅ Service d'<strong>ambulance privé Casablanca</strong> pour particuliers et entreprises</li>
            </ul>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
              <div className="space-y-2 text-gray-700">
                <p>📞 Téléphone : <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline font-semibold">+212 7777 223 11</a></p>
                <p>📍 Casablanca & périphérie</p>
                <p>🕐 Service 24h/24 – 7j/7</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contenu SEO spécifique pour Marrakech */}
      {city.slug === 'marrakech' && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Service Ambulance Marrakech 24h/24 et 7j/7</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Que vous soyez un résident, un professionnel de santé ou un visiteur, <strong>notre service d'ambulance à Marrakech</strong> est prêt à intervenir à tout moment. Nous couvrons toute la ville : Guéliz, Médina, Ménara, Hivernage, route de Casablanca, route de l'Ourika ou encore Targa.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">👨‍⚕️ Ambulance privée à Marrakech avec personnel qualifié</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Chaque intervention se fait avec un véhicule équipé, un brancard sécurisé et un personnel médical ou paramédical. 
              <strong>Urgence ou transfert programmé</strong>, nous assurons tous les types de déplacements vers les cliniques et hôpitaux de Marrakech.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Zone d'intervention à Marrakech et alentours</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nous intervenons à Marrakech mais aussi dans la région : Tahannaout, Amizmiz, Ourika, Aït Ourir, ou Chichaoua. 
              Appelez notre <strong>standard 24h/24</strong> pour organiser une intervention immédiate ou planifiée.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">💬 Contactez-nous</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Appelez-nous directement au <strong><a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline">+212 7777 223 11</a></strong> ou envoyez-nous un message sur WhatsApp via le bouton sur notre site.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Pourquoi faire appel à Ambulance Maroc à Marrakech ?</h3>
            <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
              <li>✅ Disponibilité 24h/24 – 7j/7</li>
              <li>✅ Ambulances modernes, climatisées et équipées</li>
              <li>✅ Équipe médicale formée et réactive</li>
              <li>✅ Couverture de Marrakech et sa région</li>
              <li>✅ Intervention rapide à domicile, clinique, hôtel ou lieu public</li>
            </ul>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
              <div className="space-y-2 text-gray-700">
                <p>📞 Téléphone : <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline font-semibold">+212 7777 223 11</a></p>
                <p>📍 Marrakech & alentours</p>
                <p>🕐 Disponible 24h/24 – 7j/7</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contenu SEO spécifique pour Tanger */}
      {city.slug === 'tanger' && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Service Ambulance Tanger 24h/24 et 7j/7</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Que vous soyez un résident, un professionnel ou un visiteur, <strong>notre service d'ambulance à Tanger</strong> est prêt à intervenir à tout moment pour répondre à vos besoins médicaux.
              Nous couvrons toutes les zones de Tanger : Malabata, centre-ville, Marshan, Branes, Mghogha, ainsi que la zone franche, l'aéroport ou le port de Tanger Med.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">👨‍⚕️ Ambulance privée à Tanger avec prise en charge complète</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Chaque intervention se fait avec un équipement médical complet, et une équipe formée : auxiliaires ambulanciers, infirmiers ou médecins selon les cas. 
              <strong>Nous assurons aussi bien les urgences que les transferts programmés</strong> vers les hôpitaux publics ou cliniques privées.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Zone d'intervention étendue sur toute la région de Tanger-Tétouan</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nous intervenons à Tanger mais aussi à Tétouan, Fnideq, M'diq, Assilah ou Ksar El Kebir. 
              Appelez notre <strong>centre de coordination disponible 24h/24</strong> pour planifier un transport ou demander une ambulance en urgence.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">💬 Comment nous joindre ?</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Vous pouvez nous appeler directement au <strong><a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline">+212 7777 223 11</a></strong> ou cliquer sur le bouton WhatsApp depuis notre site pour une réponse immédiate.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Pourquoi faire appel à Ambulance Maroc à Tanger ?</h3>
            <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
              <li>✅ Service disponible 24h/24 et 7j/7</li>
              <li>✅ Couverture de toute la région Nord</li>
              <li>✅ Ambulances équipées et climatisées</li>
              <li>✅ Personnel qualifié, parlant arabe, français et parfois espagnol</li>
              <li>✅ Assistance aux passagers de ferry, touristes ou entreprises</li>
            </ul>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
              <div className="space-y-2 text-gray-700">
                <p>📞 Téléphone : <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline font-semibold">+212 7777 223 11</a></p>
                <p>📍 Tanger & région Nord</p>
                <p>🕐 Service 24h/24 – 7j/7</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contenu SEO spécifique pour Rabat */}
      {city.slug === 'rabat' && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Service Ambulance Rabat 24h/24 et 7j/7</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Vous êtes à Rabat et avez besoin d'une intervention médicale rapide ? <strong>Notre service d'ambulance à Rabat</strong> couvre toutes les zones : Agdal, Hay Riad, Souissi, Centre-Ville, Yacoub El Mansour, Océan, et même Salé. Disponibles 24h/24 et 7j/7, nous intervenons en moins de 15 minutes.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">👨‍⚕️ Ambulance privée à Rabat avec équipement complet</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nos véhicules sont climatisés, équipés de tout le matériel nécessaire, et accompagnés d'un personnel formé : auxiliaires, infirmiers et médecins selon les besoins. 
              <strong>Transferts cliniques, urgences à domicile, évacuations</strong> : nous répondons à tous les besoins.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Zones couvertes à Rabat et périphérie</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nous intervenons à Rabat, mais aussi dans les zones périphériques comme Salé, Témara, Skhirat, Ain Atiq, Harhoura, et plus encore. 
              Notre standard est disponible <strong>24h/24</strong> pour toute demande d'ambulance privée ou médicalisée.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">💬 Contact rapide</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Appelez le <strong><a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline">+212 7777 223 11</a></strong> ou utilisez le bouton WhatsApp sur notre site pour nous contacter immédiatement.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Pourquoi choisir Ambulance Maroc à Rabat ?</h3>
            <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
              <li>✅ Réponse rapide 24h/24 – 7j/7</li>
              <li>✅ Couverture large : Rabat + périphérie</li>
              <li>✅ Ambulances équipées, climatisées, sécurisées</li>
              <li>✅ Personnel professionnel multilingue (FR/AR)</li>
              <li>✅ Adapté aux particuliers, entreprises, événements</li>
            </ul>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
              <div className="space-y-2 text-gray-700">
                <p>📞 Téléphone : <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline font-semibold">+212 7777 223 11</a></p>
                <p>📍 Rabat & régions alentours</p>
                <p>🕐 Disponible 24h/24 – 7j/7</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contenu SEO spécifique pour Fès */}
      {city.slug === 'fes' && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">🚑 Service Ambulance Fès disponible 24h/24 et 7j/7</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Avec Ambulance Maroc, bénéficiez d’un <strong>service d'ambulance à Fès</strong> fiable, professionnel et adapté à tous types de situations : urgence vitale, transfert médical, hospitalisation planifiée ou soins à domicile.
              Nos équipes couvrent tous les quartiers : Fès el Bali, Fès el Jadid, Agdal, Saïss, Route d’Imouzzer, etc.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">🩺 Ambulances privées à Fès avec personnel qualifié</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nos ambulances sont médicalisées et pilotées par du personnel qualifié : auxiliaires ambulanciers, infirmiers ou médecins en fonction de la situation.
              Chaque mission est encadrée dans le respect des normes de sécurité et de santé.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Zone d’intervention étendue dans le Saïss et la région de Fès-Meknès</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nous desservons également les alentours : Sefrou, Imouzzer Kandar, Bhalil, Meknès, ou encore El Hajeb.
              <strong>Appelez notre centrale 24h/24</strong> pour une intervention immédiate ou un transport planifié.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📞 Comment nous contacter ?</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Un simple appel suffit : <strong><a href="tel:+212600000000" className="text-primary hover:text-primary/80 underline">+212 6 00 00 00 00</a></strong> ou contactez-nous via WhatsApp pour une réponse instantanée.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Pourquoi faire confiance à Ambulance Maroc à Fès ?</h3>
            <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
              <li>✅ Intervention rapide dans tous les quartiers de Fès</li>
              <li>✅ Service disponible 24/7 même les jours fériés</li>
              <li>✅ Véhicules récents et parfaitement équipés</li>
              <li>✅ Personnel formé aux urgences et gestes de premiers secours</li>
              <li>✅ Couverture étendue à toute la région Fès-Saïss</li>
            </ul>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
              <div className="space-y-2 text-gray-700">
                <p>📞 Téléphone : <a href="tel:+212600000000" className="text-primary hover:text-primary/80 underline font-semibold">+212 6 00 00 00 00</a></p>
                <p>📍 Fès & région Fès-Meknès</p>
                <p>🕐 Service 24h/24 – 7j/7</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contenu SEO spécifique pour Agadir */}
      {city.slug === 'agadir' && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Service Ambulance Agadir 24h/24 et 7j/7</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              <strong>Ambulance Maroc intervient rapidement à Agadir</strong> pour toutes vos urgences : soins à domicile, transferts hospitaliers, évacuations médicales ou transport sanitaire.
              Nos véhicules couvrent le centre-ville ainsi que les zones périphériques comme Dcheira, Aït Melloul, Inezgane, Hay Mohammadi, Cité Dakhla, etc.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">👨‍⚕️ Ambulance privée à Agadir avec équipements complets</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nos ambulances sont équipées de matériel de réanimation et de surveillance. 
              Chaque intervention est assurée par du personnel qualifié : ambulanciers, infirmiers ou médecins, selon le niveau d'urgence.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Intervention dans toute la région Souss-Massa</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nous intervenons également dans les zones proches : Inezgane, Aït Melloul, Tikiouine, Drarga, ou même jusqu’à Taroudant si besoin.
              Appelez notre <strong>centre de régulation 24h/24</strong> pour une prise en charge rapide.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">💬 Comment nous joindre ?</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Contactez-nous immédiatement au <strong><a href="tel:+212600000000" className="text-primary hover:text-primary/80 underline">+212 6 00 00 00 00</a></strong> ou cliquez sur le bouton WhatsApp pour une réponse immédiate.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Pourquoi faire confiance à Ambulance Maroc à Agadir ?</h3>
            <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
              <li>✅ Disponibilité 24h/24 – 7j/7</li>
              <li>✅ Couverture large de toute la région Souss-Massa</li>
              <li>✅ Équipements médicaux de pointe</li>
              <li>✅ Personnel qualifié et bienveillant</li>
              <li>✅ Service d’ambulance privé pour particuliers, entreprises ou hôtels</li>
            </ul>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
              <div className="space-y-2 text-gray-700">
                <p>📞 Téléphone : <a href="tel:+212600000000" className="text-primary hover:text-primary/80 underline font-semibold">+212 6 00 00 00 00</a></p>
                <p>📍 Agadir & région Souss-Massa</p>
                <p>🕐 Service disponible 24h/24 et 7j/7</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contenu SEO spécifique pour Mohammedia */}
      {city.slug === 'mohammedia' && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Service Ambulance Mohammedia - Urgences 24h/24</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Notre service d'<strong>ambulance à Mohammedia</strong> est disponible à toute heure pour répondre à vos besoins : urgences, hospitalisations, soins à domicile ou transferts médicaux.
              Nous couvrons tous les quartiers : Al Wifaq, Sablettes, Al Houria, Hay Salam, El Alia, ainsi que la zone industrielle et la plage.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">👩‍⚕️ Équipe médicale professionnelle et véhicules équipés</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nos ambulances privées sont équipées pour assurer une prise en charge optimale avec brancards, oxygène, matériel de secours et défibrillateur. 
              <strong>Notre personnel est formé et certifié</strong> : auxiliaires, infirmiers et parfois médecin à bord selon le cas.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Zone couverte à Mohammedia et alentours</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nous intervenons aussi dans les environs : Zenata, Mansouria, Ben Yakhlef ou jusqu’à Aïn Harrouda. 
              Contactez notre <strong>standard 24h/24</strong> pour une intervention rapide ou une prise de rendez-vous.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📞 Comment nous contacter ?</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Appelez notre équipe au <strong><a href="tel:+212600000000" className="text-primary hover:text-primary/80 underline">+212 6 00 00 00 00</a></strong> ou utilisez le bouton WhatsApp de notre site pour une réponse immédiate.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Pourquoi faire confiance à Ambulance Maroc à Mohammedia ?</h3>
            <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
              <li>✅ Disponibilité 24/7</li>
              <li>✅ Intervention dans toute la région de Mohammedia</li>
              <li>✅ Équipements médicaux à bord</li>
              <li>✅ Personnel qualifié et empathique</li>
              <li>✅ Ambulances pour particuliers, hôtels, entreprises et professionnels de santé</li>
            </ul>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
              <div className="space-y-2 text-gray-700">
                <p>📞 Téléphone : <a href="tel:+212600000000" className="text-primary hover:text-primary/80 underline font-semibold">+212 6 00 00 00 00</a></p>
                <p>📍 Mohammedia & périphérie</p>
                <p>🕐 Service permanent 24h/24</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contenu SEO spécifique pour Kénitra */}
      {city.slug === 'kenitra' && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Ambulance Kénitra - Intervention 24h/24</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Vous êtes à <strong>Kénitra</strong> et avez besoin d’un transport médicalisé ? Que ce soit pour une urgence, une hospitalisation programmée ou un transfert médical,
              notre <strong>service d’ambulance à Kénitra</strong> est disponible 24h/24 et 7j/7.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Couverture complète de la ville et des alentours</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nous intervenons dans tous les quartiers : Maamora, Val Fleuri, Ouled Oujih, Centre-ville, Saknia, Université Ibn Tofail, et dans les communes périphériques : Mehdia, Sidi Taïbi, Sidi Yahya, Souk El Arbaa.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">🚑 Ambulances modernes et personnel qualifié</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nos ambulances privées sont équipées d’oxygène, de matériel de réanimation, de brancards confortables et d’une équipe médicale ou paramédicale selon le cas :
              auxiliaires, infirmiers ou médecin.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📞 Contactez-nous 24h/24</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Notre centre de régulation est joignable à tout moment. Appelez le <strong><a href="tel:+212600000000" className="text-primary hover:text-primary/80 underline">+212 6 00 00 00 00</a></strong> ou utilisez le bouton WhatsApp disponible sur notre site.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">✔️ Pourquoi faire confiance à Ambulance Maroc à Kénitra ?</h3>
            <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
              <li>✅ Disponibilité immédiate 24h/24</li>
              <li>✅ Couverture urbaine et rurale</li>
              <li>✅ Ambulances climatisées et médicalisées</li>
              <li>✅ Personnel expérimenté et bilingue</li>
              <li>✅ Transferts vers CHU, cliniques, centres de dialyse ou aéroports</li>
            </ul>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
              <div className="space-y-2 text-gray-700">
                <p>📞 Téléphone : <a href="tel:+212600000000" className="text-primary hover:text-primary/80 underline font-semibold">+212 6 00 00 00 00</a></p>
                <p>📍 Kénitra & région Gharb</p>
                <p>🕐 Service permanent 24h/24 – 7j/7</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contenu SEO spécifique pour Oujda */}
      {city.slug === 'oujda' && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Ambulance Oujda – Disponible 24h/24 et 7j/7</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              En cas d’urgence médicale à Oujda, notre service d’ambulance intervient rapidement dans tous les quartiers de la ville, de <strong>Sidi Yahya</strong> à <strong>Hay El Qods</strong>,
              en passant par <strong>Al Boustane</strong>, <strong>Hay Al Matar</strong>, et <strong>Centre-ville</strong>. Nous couvrons également l’aéroport, la zone industrielle, et les localités proches comme <strong>Ahfir</strong>, <strong>Jerada</strong> et <strong>Berkane</strong>.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">👨‍⚕️ Équipe professionnelle et véhicules médicalisés</h3>
            <p className="mb-4 text-gray-700 leading-relaxed">
              Nos ambulances sont climatisées, bien équipées et conduites par des professionnels formés. Nous assurons :
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
              <li>✅ Les urgences médicales</li>
              <li>✅ Les transferts inter-hôpitaux</li>
              <li>✅ Les rapatriements privés</li>
            </ul>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Chaque intervention peut inclure un auxiliaire ambulancier, un infirmier ou un médecin selon le besoin.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📞 Contact rapide</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Appelez notre standard 24/24 au <strong><a href="tel:+212600000000" className="text-primary hover:text-primary/80 underline">+212 6 00 00 00 00</a></strong> ou contactez-nous par WhatsApp pour une réponse immédiate.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">✔️ Pourquoi Ambulance Maroc à Oujda ?</h3>
            <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
              <li>✅ Intervention rapide à Oujda et ses environs</li>
              <li>✅ Ambulances modernes, propres et climatisées</li>
              <li>✅ Couverture 24h/24 – 7j/7</li>
              <li>✅ Coordination avec les cliniques et CHU de l’Oriental</li>
              <li>✅ Équipe multilingue (arabe, français)</li>
            </ul>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
              <div className="space-y-2 text-gray-700">
                <p>📞 Téléphone : <a href="tel:+212600000000" className="text-primary hover:text-primary/80 underline font-semibold">+212 6 00 00 00 00</a></p>
                <p>📍 Oujda & région de l'Oriental</p>
                <p>🕐 Service permanent 24h/24 – 7j/7</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contenu SEO spécifique pour Tétouan */}
      {city.slug === 'tetouan' && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Service Ambulance à Tétouan – 24h/24 et 7j/7</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Besoin d’une ambulance à Tétouan ou dans les environs ? Notre service est disponible à tout moment pour les urgences ou les transferts médicaux.
              Nous couvrons tous les quartiers de Tétouan : <strong>El Balad, Al Mandar Al Jamil, Avenue des FAR, Hay Kharroub</strong>, ainsi que les villes côtières comme <strong>Fnideq, M’diq, Martil et Cabo Negro</strong>.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">👨‍⚕️ Équipe qualifiée et matériel médical complet</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nos ambulances sont modernes, climatisées et équipées pour tous types de situations : <strong>urgence, évacuation, transport inter-hôpitaux, etc.</strong><br/>
              Notre personnel est composé d’ambulanciers diplômés, infirmiers et médecins d’urgence si besoin.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Zone d’intervention étendue – Nord Maroc</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nous intervenons rapidement sur toute la région de Tétouan et ses alentours, jusqu’à Fnideq, M’diq, Chefchaouen, Ksar El Kebir et Tanger.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📞 Contact rapide – 24h/24</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Appelez le <strong><a href="tel:+212600000000" className="text-primary hover:text-primary/80 underline">+212 6 00 00 00 00</a></strong> ou cliquez sur le bouton WhatsApp pour une assistance immédiate.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">✅ Pourquoi choisir Ambulance Maroc à Tétouan ?</h3>
            <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
              <li>✅ Intervention rapide dans tout le Nord</li>
              <li>✅ Service disponible 24h/24 – 7j/7</li>
              <li>✅ Ambulances équipées et climatisées</li>
              <li>✅ Équipe multilingue : arabe, français, espagnol</li>
              <li>✅ Partenariat avec hôpitaux et cliniques privées</li>
            </ul>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
              <div className="space-y-2 text-gray-700">
                <p>📞 Téléphone : <a href="tel:+212600000000" className="text-primary hover:text-primary/80 underline font-semibold">+212 6 00 00 00 00</a></p>
                <p>📍 Tétouan & région Nord</p>
                <p>🕐 Service 24h/24 – 7j/7</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Reassurance Section */}
      <ReassuranceSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Emergency CTA */}
      <section className="bg-emergency text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Urgence Médicale à {city.name} ?
          </h2>
          <p className="text-xl mb-8">
            Notre équipe intervient rapidement dans toute la ville en {city.responseTime} en moyenne
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="tel:+212777722311" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Appelez: +212 7777 223 11
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20" asChild>
              <a href="https://wa.me/212777722311" className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                WhatsApp Direct
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Contact Form */}
      <div id="demande-ambulance" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Demande d'Intervention à {city.name}
            </h2>
            <p className="text-xl text-gray-600">
              Formulaire pour les demandes non urgentes
            </p>
          </div>
          <ContactForm />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CityPage;
