import { Ambulance, Hospital, Route, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ServicesSection = () => {
  const services = [
    {
      icon: Ambulance,
      title: "Ambulance médicale d'urgence",
      description: "Intervention immédiate pour les urgences médicales avec équipe de secours qualifiée",
      features: [
        "Réanimation cardio-pulmonaire",
        "Soins d'urgence pré-hospitaliers",
        "Transport vers l'hôpital le plus proche",
        "Équipement médical de pointe"
      ],
      price: "Devis gratuit",
      urgent: true
    },
    {
      icon: Hospital,
      title: "Transport inter-hôpitaux",
      description: "Transfert sécurisé de patients entre établissements de santé",
      features: [
        "Transport médicalisé",
        "Accompagnement médical spécialisé",
        "Coordination avec les hôpitaux",
        "Suivi médical pendant le transport"
      ],
      price: "À partir de 500 DH",
      urgent: false
    },
    {
      icon: Route,
      title: "Transport longue distance",
      description: "Transport médical pour les déplacements inter-villes au Maroc",
      features: [
        "Ambulances équipées pour longs trajets",
        "Personnel médical qualifié",
        "Confort optimal du patient",
        "Coordination logistique complète"
      ],
      price: "Sur devis",
      urgent: false
    },
    {
      icon: Calendar,
      title: "Événements & Rassemblements",
      description: "Couverture médicale pour événements sportifs et rassemblements",
      features: [
        "Poste de secours mobile",
        "Équipe médicale dédiée",
        "Intervention préventive",
        "Coordination avec organisateurs"
      ],
      price: "Sur devis",
      urgent: false
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nos Services d'Ambulance
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une gamme complète de services médicaux d'urgence et de transport 
            sanitaire adaptés à tous vos besoins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index}
                className={`relative overflow-hidden hover:shadow-lg transition-all duration-300 ${
                  service.urgent ? 'border-emergency/30 bg-emergency/5' : 'border-border'
                }`}
              >
                {service.urgent && (
                  <div className="absolute top-4 right-4 bg-emergency text-emergency-foreground text-xs font-bold px-2 py-1 rounded-full">
                    URGENT
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${
                      service.urgent ? 'bg-emergency text-emergency-foreground' : 'bg-primary text-primary-foreground'
                    }`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                      <CardDescription className="text-base">
                        {service.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 bg-success rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-semibold text-foreground">{service.price}</p>
                        {service.urgent && (
                          <p className="text-xs text-emergency font-medium">Intervention immédiate</p>
                        )}
                      </div>
                      <Button 
                        variant={service.urgent ? "emergency" : "default"}
                        size="sm"
                        asChild
                      >
                        <a href={service.urgent ? "tel:+212522000000" : "#contact"}>
                          {service.urgent ? "Appeler maintenant" : "Demander un devis"}
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center bg-accent/50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Besoin d'une ambulance maintenant ?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Notre équipe est disponible 24h/24 pour toute urgence médicale. 
            N'hésitez pas à nous contacter immédiatement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="emergency" size="lg" asChild>
              <a href="tel:+212522000000" className="flex items-center">
                <Ambulance className="h-5 w-5 mr-2" />
                Urgence : +212 522 000 000
              </a>
            </Button>
            <Button variant="cta" size="lg" asChild>
              <a href="#demande-ambulance">
                Formulaire de demande
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;