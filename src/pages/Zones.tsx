import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Ambulance, MapPin, Clock } from "lucide-react";
import TrustBlock from "@/components/TrustBlock";
import CityCardOptimized from "@/components/CityCardOptimized";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import ZonesFAQ from "@/components/ZonesFAQ";
import QuickContactForm from "@/components/QuickContactForm";
import MoroccoMap from "@/components/MoroccoMap";
import { cities } from "@/data/cities";

const Zones = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Zones d'Intervention Ambulance Maroc – Intervention Rapide dans plus de 15 villes"
        description="Service d'ambulance privée, médicalisée et d'urgence disponible 24h/24 et 7j/7 dans toutes les grandes villes du Maroc. Intervention rapide en moins de 15 minutes."
        canonical="/zones-d-intervention"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Ambulance Maroc",
          "areaServed": ["Casablanca", "Rabat", "Tanger", "Marrakech", "Fès", "Agadir", "Meknès", "Oujda", "Kenitra", "Sale", "Mohammedia", "Tétouan", "Laâyoune"],
          "serviceArea": "Maroc",
          "availableService": ["Emergency medical transport", "Inter-hospital transfer", "Event standby", "Medical consultation transport"],
          "openingHours": "Mo-Su 00:00-23:59",
          "url": "/zones-d-intervention"
        }}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20" aria-label="Présentation des zones d'intervention">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Zones d'Intervention Ambulance Maroc – Intervention Rapide dans plus de 15 villes
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
            Service d'ambulance privée, médicalisée et d'urgence disponible 24h/24 et 7j/7 dans toutes les grandes villes du Maroc. Intervention rapide en moins de 15 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="tel:+212600000000" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Appeler maintenant
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20" asChild>
              <a href="https://wa.me/212777722311" className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                WhatsApp Direct
              </a>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <a href="#contact-form" className="flex items-center gap-2">
                <Ambulance className="h-5 w-5" />
                Demander une Ambulance
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Bloc Confiance */}
      <TrustBlock />

      {/* Villes Principales */}
      <section className="py-16 bg-background" aria-label="Villes principales couvertes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Villes Principales Couvertes
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Service d'ambulance de qualité dans les métropoles marocaines avec intervention express
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {cities.filter(city => city.isMain).slice(0, 6).map((city) => (
              <CityCardOptimized
                key={city.slug}
                name={city.name}
                slug={city.slug}
                responseTime={city.responseTime}
                coverage={city.coverage}
                description={`Service d'ambulance ${city.responseTime} à ${city.name}. ${city.description.slice(0, 100)}...`}
                isMain={true}
                neighborhoods={['Centre-ville', 'Quartiers résidentiels', 'Zone industrielle']}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Autres Villes Couvertes */}
      <section className="py-16 bg-muted/50" aria-label="Autres villes couvertes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Autres Villes Couvertes
            </h2>
            <p className="text-lg text-muted-foreground">
              Extension de notre service dans l'ensemble du territoire marocain
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cities.filter(city => !city.isMain).map((city) => (
              <CityCardOptimized
                key={city.slug}
                name={city.name}
                slug={city.slug}
                responseTime={city.responseTime}
                coverage={city.coverage}
                description={`Ambulance disponible à ${city.name} avec ${city.responseTime}.`}
                isMain={false}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Carte interactive du Maroc */}
      <MoroccoMap />

      {/* Pourquoi nous choisir */}
      <WhyChooseUsSection />

      {/* FAQ */}
      <ZonesFAQ />

      {/* Formulaire de contact rapide */}
      <div id="contact-form">
        <QuickContactForm />
      </div>

      <Footer />
    </div>
  );
};

export default Zones;