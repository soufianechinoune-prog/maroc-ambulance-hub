import { Shield, TrendingUp, Users, Truck } from "lucide-react";

const TrustBlock = () => {
  const trustFeatures = [
    {
      icon: Shield,
      title: "Agréé Ministère de la Santé",
      description: "Autorisation officielle et conforme aux normes"
    },
    {
      icon: TrendingUp,
      title: "+5000 interventions/an",
      description: "Expérience prouvée dans l'urgence médicale"
    },
    {
      icon: Users,
      title: "Personnel médical qualifié",
      description: "Équipes formées aux premiers secours"
    },
    {
      icon: Truck,
      title: "Ambulances modernes",
      description: "Véhicules équipés du matériel médical avancé"
    }
  ];

  return (
    <section className="py-12 bg-muted/50" aria-label="Garanties de confiance">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {trustFeatures.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBlock;