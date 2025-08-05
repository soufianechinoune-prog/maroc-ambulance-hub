import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ambulance, Clock, Users, Shield, Phone, MessageCircle } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Ambulance,
      title: "Transport d'urgence",
      description: "Intervention rapide 24h/24 pour les urgences médicales avec équipement de réanimation.",
      features: ["Médecin à bord", "Équipement de réanimation", "Défibrillateur", "Oxygène médical"]
    },
    {
      icon: Clock,
      title: "Transport inter-hôpitaux",
      description: "Transfert sécurisé entre établissements de santé avec surveillance médicale continue.",
      features: ["Personnel qualifié", "Surveillance continue", "Matériel médical adapté", "Coordination établissements"]
    },
    {
      icon: Users,
      title: "Transport longue distance",
      description: "Accompagnement médical pour les transports sur de longues distances au Maroc et à l'étranger.",
      features: ["Accompagnement médical", "Confort patient", "Suivi médical", "Transport international"]
    },
    {
      icon: Shield,
      title: "Événements sportifs",
      description: "Couverture médicale pour événements sportifs et rassemblements avec équipes spécialisées.",
      features: ["Équipes sur site", "Intervention rapide", "Premier secours", "Évacuation d'urgence"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Nos Services d'Ambulance
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Services professionnels d'ambulance 24h/24 et 7j/7 partout au Maroc
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

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Services Professionnels
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous offrons une gamme complète de services d'ambulance adaptés à tous vos besoins médicaux
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <service.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700">
                        <div className="h-2 w-2 bg-primary rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Besoin d'une ambulance ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Contactez-nous immédiatement pour une intervention rapide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="tel:+212600000000" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Urgence: +212 6 00 00 00 00
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://wa.me/212600000000" className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;