import { Phone, MessageCircle, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import ambulanceHero from "@/assets/ambulance-hero.jpg";

interface HeroSectionProps {
  city?: string;
  h1?: string;
  subtitle?: string;
}

const HeroSection = ({ city = "Casablanca", h1, subtitle }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${ambulanceHero})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl">
          <div className="space-y-6">
            {/* Location Badge */}
            <div className="inline-flex items-center bg-card/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
              <MapPin className="h-4 w-4 mr-2 text-primary" />
              Service disponible à {city}
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              {h1 ? (
                <>
                  <span className="text-primary">Ambulance</span> à <span className="text-emergency">{city}</span> – <span className="text-success">Intervention 24/7</span>
                </>
              ) : (
                <>
                  Ambulance à <span className="text-emergency">{city}</span>
                </>
              )}
            </h1>
            
            <div className="text-xl md:text-2xl text-white/90 space-y-2">
              {subtitle ? (
                <p>{subtitle}</p>
              ) : (
                <>
                  <p>Intervention rapide 24h/24 et 7j/7</p>
                  <p className="font-semibold">Partout au Maroc</p>
                </>
              )}
            </div>

            {/* Key Features */}
            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <Clock className="h-5 w-5 mr-2 text-success" />
                <span className="font-medium">Réponse &lt; 15 min</span>
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
                <a href="tel:+212522000000" className="flex items-center justify-center">
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
                <a href="https://wa.me/212522000000" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
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
                Couverture nationale
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Emergency Contact (Mobile) */}
      <div className="fixed bottom-4 right-4 z-50 lg:hidden">
        <Button variant="emergency" size="lg" className="rounded-full shadow-2xl" asChild>
          <a href="tel:+212522000000">
            <Phone className="h-6 w-6" />
          </a>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;