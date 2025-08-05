import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ZonesSection from "@/components/ZonesSection";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, MapPin } from "lucide-react";

const Zones = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Zones d'Intervention
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Couverture nationale avec intervention rapide dans toutes les grandes villes du Maroc
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="tel:+212600000000" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Appelez maintenant
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20" asChild>
              <a href="https://wa.me/212600000000" className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Coverage Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Couverture Nationale</h3>
              <p className="text-gray-600">Intervention dans toutes les grandes villes du Maroc</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24h/24 - 7j/7</h3>
              <p className="text-gray-600">Service d'urgence disponible à tout moment</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Temps de Réponse</h3>
              <p className="text-gray-600">Intervention rapide en moins de 15 minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Zones Section */}
      <ZonesSection />

      <Footer />
    </div>
  );
};

export default Zones;