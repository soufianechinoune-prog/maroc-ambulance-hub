
import { useParams } from "react-router-dom";
import { cities } from "@/data/cities";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReassuranceSection from "@/components/ReassuranceSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MessageCircle, MapPin, Clock, Users, CheckCircle } from "lucide-react";
import { useEffect } from "react";

const CityPage = () => {
  const { citySlug } = useParams();
  
  // Find city by slug - handle both URL parameter and direct route
  const slug = citySlug || window.location.pathname.replace('/', '');
  const city = cities.find(c => c.slug === slug);

  useEffect(() => {
    if (city) {
      document.title = `Ambulance ${city.name} - Service d'urgence 24h/24 | Ambulance Maroc`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 
          `Service d'ambulance professionnel à ${city.name}. Intervention rapide 24h/24 et 7j/7. Temps de réponse: ${city.responseTime}. Appelez maintenant: +212 522 000 000`
        );
      }
    }
  }, [city]);

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
              <a href="tel:+212522000000">Contactez-nous</a>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header city={city.name} />
      
      {/* Hero Section - Identique à la Home Page mais personnalisée */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/src/assets/ambulance-hero.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
        </div>

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
                Ambulance à <span className="text-emergency">{city.name}</span>
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
                  Couverture {city.region}
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
              <a href="tel:+212522000000" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Appelez maintenant: +212 522 000 000
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20" asChild>
              <a href="https://wa.me/212522000000" className="flex items-center gap-2">
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
