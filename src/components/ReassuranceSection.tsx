import { Clock, Shield, Users, MapPin, Star, Zap } from "lucide-react";

const ReassuranceSection = ({ title, subtitle, features: featuresProp, stats }: { title?: string; subtitle?: string; features?: { icon: any; title: string; description: string; color: string }[]; stats?: { value: string; label: string }[]; }) => {
  const defaultFeatures = [
    {
      icon: Clock,
      title: "Service Médical Continu",
      description: "Transport sanitaire disponible jour et nuit, 365 jours par an, incluant week-ends et jours fériés",
      color: "text-primary"
    },
    {
      icon: Zap,
      title: "Réactivité Optimale",
      description: "Délai d'intervention inférieur à 15 minutes en agglomération, équipes mobiles pré-positionnées",
      color: "text-emergency"
    },
    {
      icon: Users,
      title: "Personnel qualifié",
      description: "Équipe de professionnels formés et certifiés aux premiers secours",
      color: "text-success"
    },
    {
      icon: MapPin,
      title: "Couverture nationale",
      description: "Service disponible dans toutes les villes principales du Maroc",
      color: "text-primary"
    },
    {
      icon: Shield,
      title: "Normes sanitaires",
      description: "Respect strict des protocoles sanitaires et des normes de sécurité",
      color: "text-success"
    },
    {
      icon: Star,
      title: "Excellence reconnue",
      description: "Service de qualité reconnu par nos clients et les autorités sanitaires",
      color: "text-emergency"
    }
  ];

  const features = featuresProp ?? defaultFeatures;

  const defaultStats = [
    { value: "24/7", label: "Service continu" },
    { value: "<15min", label: "Temps de réponse" },
    { value: "+5000", label: "Interventions/an" },
    { value: "12", label: "Villes couvertes" },
  ];

  const s = stats ?? defaultStats;

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title ?? "Pourquoi nous faire confiance ?"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle ?? "Notre engagement : vous offrir un service d'ambulance professionnel, rapide et fiable partout au Maroc."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-border hover:border-primary/20"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg bg-accent ${feature.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-primary">{s[0]?.value ?? "24/7"}</div>
            <div className="text-sm text-muted-foreground">{s[0]?.label ?? "Service continu"}</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-emergency">{s[1]?.value ?? "<15min"}</div>
            <div className="text-sm text-muted-foreground">{s[1]?.label ?? "Temps de réponse"}</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-success">{s[2]?.value ?? "+5000"}</div>
            <div className="text-sm text-muted-foreground">{s[2]?.label ?? "Interventions/an"}</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-primary">{s[3]?.value ?? "12"}</div>
            <div className="text-sm text-muted-foreground">{s[3]?.label ?? "Villes couvertes"}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReassuranceSection;