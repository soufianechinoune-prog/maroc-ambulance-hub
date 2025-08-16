import { Clock, Heart, Stethoscope, Phone, MapPin, Shield } from "lucide-react";

const WhyChooseUsSection = () => {
  const advantages = [
    {
      icon: Clock,
      title: "Intervention Ultra-Rapide",
      description: "Délai d'intervention moyen de 12 minutes en zone urbaine. Service médical d'urgence disponible en continu, jour et nuit, toute l'année."
    },
    {
      icon: Heart,
      title: "Équipement Médical Avancé",
      description: "Véhicules sanitaires équipés de défibrillateurs, système d'oxygénation, matériel de réanimation cardiaque et dispositifs de monitoring vital."
    },
    {
      icon: Stethoscope,
      title: "Personnel Soignant Certifié",
      description: "Équipes paramédicales formées aux techniques d'urgence, secourisme avancé et transport médicalisé sécurisé."
    },
    {
      icon: Phone,
      title: "Coordination Hospitalière",
      description: "Liaison directe avec les services d'urgence et préparation de l'accueil patient."
    },
    {
      icon: MapPin,
      title: "Couverture Nationale",
      description: "Présence dans plus de 15 villes marocaines avec maillage territorial complet."
    },
    {
      icon: Shield,
      title: "Sécurité & Conformité",
      description: "Agréments officiels, assurances complètes et respect des protocoles sanitaires."
    }
  ];

  return (
    <section className="py-16 bg-background" aria-label="Pourquoi nous choisir">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Pourquoi Choisir Notre Service d'Ambulance ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Plus de 10 ans d'expérience dans le transport sanitaire d'urgence et médicalisé au Maroc
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div key={index} className="group">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <advantage.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {advantage.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;