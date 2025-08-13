import { Phone, MessageCircle, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CallButton, WhatsAppButton } from "@/components/ContactCTA";
import ambulanceHero from "@/assets/ambulance-hero.jpg";

interface HeroSectionProps {
  city?: string;
  h1?: string;
  subtitle?: string;
  quarterVariant?: string;
}

const HeroSection = ({ city = "Casablanca", h1, subtitle, quarterVariant }: HeroSectionProps) => {
  // Configuration spécifique par quartier de Casablanca
  const getQuarterConfig = (variant: string) => {
    switch (variant) {
      case 'californie':
        return {
          title: "🚑 Ambulance Casablanca Californie – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Intervention rapide (8-12 min) dans tout le quartier Californie et ses environs – couverture locale complète – équipe médicale qualifiée.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Qualité protocolaire" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture Californie & quartiers voisins" }
          ]
        };
      case 'ain-diab':
        return {
          title: "🚑 Ambulance Casablanca Aïn Diab – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Réponse rapide (8-12 min) à Aïn Diab et front de mer – personnel médical qualifié – service disponible jour et nuit.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Spécialiste front de mer" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture Aïn Diab & Corniche" }
          ]
        };
      case 'maarif':
        return {
          title: "🚑 Ambulance Casablanca Maârif – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Intervention rapide (10-15 min) dans le quartier Maârif et zones commerçantes – équipe expérimentée – disponible 24h/24.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Zone commerciale & résidentielle" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture Maârif & Centre-Ville" }
          ]
        };
      case 'gauthier':
        return {
          title: "🚑 Ambulance Casablanca Gauthier – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Réponse rapide (8-12 min) dans le quartier Gauthier et zones résidentielles – personnel qualifié – service continu jour et nuit.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Zone résidentielle premium" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture Gauthier & Racine" }
          ]
        };
      case 'bourgogne':
        return {
          title: "🚑 Ambulance Casablanca Bourgogne – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Intervention rapide (10-15 min) dans le quartier Bourgogne et environs – équipe médicale expérimentée – disponibilité 24h/24.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Zone résidentielle & commerciale" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture Bourgogne & alentours" }
          ]
        };
      case 'ain-sebaa':
        return {
          title: "🚑 Ambulance Casablanca Aïn Sebaâ – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Réponse rapide (10-15 min) dans Aïn Sebaâ et zones industrielles voisines – personnel médical expérimenté – service disponible jour et nuit.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Interventions industrielles & résidentielles" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture Aïn Sebaâ & Sidi Bernoussi" }
          ]
        };
      case 'oasis':
        return {
          title: "🚑 Ambulance Casablanca Oasis – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Intervention rapide (10-15 min) dans le quartier Oasis et zones résidentielles – équipe qualifiée – service continu 24h/24.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Zone résidentielle moderne" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture Oasis & Hay Hassani" }
          ]
        };
      case 'sidi-maarouf':
        return {
          title: "🚑 Ambulance Casablanca Sidi Maârouf – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Réponse rapide (8-12 min) dans Sidi Maârouf et zones d'affaires – personnel expérimenté – couverture entreprises et résidences.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Spécialiste zones d'affaires" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture Sidi Maârouf & CFC" }
          ]
        };
      case 'sidi-belyout':
        return {
          title: "🚑 Ambulance Casablanca Sidi Belyout – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Intervention rapide (8-12 min) dans le quartier Sidi Belyout et zones centrales – équipe médicale qualifiée – service disponible 24h/24.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Centre-ville & zones d'affaires" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture Sidi Belyout & Centre" }
          ]
        };
      case 'ain-chock':
        return {
          title: "🚑 Ambulance Casablanca Aïn Chock – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Intervention rapide (10-15 min) dans Aïn Chock et zones universitaires – équipe médicale qualifiée – service disponible 24h/24.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Zone universitaire & résidentielle" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture Aïn Chock & environs" }
          ]
        };
      case 'bouskoura':
        return {
          title: "🚑 Ambulance Bouskoura – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Réponse rapide (12-18 min) dans Bouskoura et communes avoisinantes – personnel médical expérimenté – couverture résidentielle et industrielle.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Zones résidentielles & industrielles" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture Bouskoura & Nouaceur" }
          ]
        };
      case 'sidi-bernoussi':
        return {
          title: "🚑 Ambulance Casablanca Sidi Bernoussi – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Intervention rapide (10-15 min) dans Sidi Bernoussi et zones industrielles – équipe expérimentée – service continu jour et nuit.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Spécialiste zones industrielles" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture Sidi Bernoussi & Port" }
          ]
        };
      case 'derb-sultan':
        return {
          title: "🚑 Ambulance Casablanca Derb Sultan – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Réponse rapide (8-12 min) dans Derb Sultan et centre administratif – personnel qualifié – couverture commerciale et résidentielle.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Centre administratif & commercial" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture Derb Sultan & Centre-Ville" }
          ]
        };
      default:
        return {
          title: h1 || `Ambulance à ${city} – Intervention 24/7`,
          subtitle: subtitle || "Intervention rapide 24h/24 et 7j/7",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Qualité protocolaire" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture nationale" }
          ]
        };
    }
  };

  const config = quarterVariant ? getQuarterConfig(quarterVariant) : getQuarterConfig('default');

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden" aria-label={`Section présentation – ambulance à ${city}`}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${ambulanceHero})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
      </div>
      
      {/* SEO and Accessibility Image */}
      <img 
        src={ambulanceHero} 
        alt={`Ambulance à ${city} – intervention rapide 24/7`} 
        className="sr-only" 
        loading="lazy"
      />

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl">
          <div className="space-y-6">
            {/* Location Badge */}
            <div className="inline-flex items-center bg-card/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
              <MapPin className="h-4 w-4 mr-2 text-primary" />
              {config.badge}
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {config.title}
            </h1>
            
            <div className="text-xl md:text-2xl text-white/90 space-y-2">
              <p>{config.subtitle}</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                variant="emergency" 
                size="lg" 
                className="text-lg px-8 py-4 h-auto"
                asChild
              >
                <CallButton phone="+212777722311" className="flex items-center justify-center">
                  <Phone className="h-6 w-6 mr-3" />
                  📞 Appelez maintenant
                </CallButton>
              </Button>
              
              <Button 
                variant="success" 
                size="lg" 
                className="text-lg px-8 py-4 h-auto"
                asChild
              >
                <WhatsAppButton phone="+212777722311" className="flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 mr-3" />
                  💬 WhatsApp direct
                </WhatsAppButton>
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

            {/* Trust Indicators - Spécifiques au quartier */}
            <div className="pt-8 flex flex-wrap gap-6 text-white/80 text-sm">
              {config.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="h-2 w-2 bg-success rounded-full mr-2"></div>
                  {feature.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Emergency Contact (Mobile) */}
      <div className="fixed bottom-4 right-4 z-50 lg:hidden">
        <Button variant="emergency" size="lg" className="rounded-full shadow-2xl" asChild>
          <CallButton phone="+212777722311" className="rounded-full shadow-2xl" aria-label="Appel d'urgence">
            <Phone className="h-6 w-6" />
            <span className="sr-only">Appeler maintenant</span>
          </CallButton>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;