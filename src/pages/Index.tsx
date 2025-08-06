import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ReassuranceSection from "@/components/ReassuranceSection";
import ServicesSection from "@/components/ServicesSection";
import ZonesSection from "@/components/ZonesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  const siteUrl = "https://www.ambulance-maroc.ma";
  const title = "Ambulance à Casablanca – Intervention rapide 24/7 | Ambulance Maroc";
  const description = "Ambulance à Casablanca disponible 24h/24 et 7j/7. Service d'urgence médical professionnel avec temps de réponse moyen de 8-12 minutes. Couverture complète de la région Casablanca-Settat.";
  const canonical = `${siteUrl}/`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EmergencyService",
    "name": "Ambulance Maroc - Casablanca",
    "areaServed": "Casablanca",
    "url": canonical,
    "telephone": "+212612345678",
    "serviceArea": "Casablanca-Settat",
    "availableService": ["Emergency medical transport", "Inter-hospital transfer", "Event standby"],
    "openingHours": "Mo-Su 00:00-23:59",
    "priceRange": "$$",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services d'ambulance",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Transport d'urgence",
            "description": "Service d'ambulance d'urgence 24h/24"
          }
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title={title} description={description} canonical={canonical} jsonLd={jsonLd} />
      <Header city="Casablanca" />
      <HeroSection 
        city="Casablanca" 
        h1="Ambulance à Casablanca – Intervention 24/7"
        subtitle="Temps de réponse moyen : 8-12 min. Service d'urgence médical professionnel dans toute la région Casablanca-Settat."
      />
      <ReassuranceSection />
      <ServicesSection />
      <ZonesSection />
      <TestimonialsSection />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
