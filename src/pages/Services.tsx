import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ambulance, Clock, Users, Shield, Phone, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

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

  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Services d'Ambulance – Urgence 24/7 au Maroc | Ambulance Maroc"
        description="Transports d'urgence, inter-hôpitaux, longue distance et événements. Intervention 24/7 partout au Maroc."
        canonical="/services"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Services d'ambulance au Maroc",
          "provider": {"@type": "Organization", "name": "Ambulance Maroc", "telephone": "+212600000000"},
          "areaServed": "MA",
          "availableChannel": "OnSite",
          "offers": {
            "@type": "OfferCatalog",
            "name": "Catalogue de services",
            "itemListElement": [
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Transport d'urgence", "description": "Intervention rapide 24/7 avec équipement de réanimation."}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Transport inter-hôpitaux", "description": "Transfert sécurisé entre établissements avec surveillance continue."}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Transport longue distance", "description": "Accompagnement médical pour trajets nationaux et internationaux."}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Couverture d'événements", "description": "Équipes sur site, premiers secours et évacuation d'urgence."}}
            ]
          }
        }}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20" aria-label="Présentation des services d'ambulance">
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
              <a href="https://wa.me/212777722311" className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20" aria-label="Liste des services d'ambulance">
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
            {services.map((service, index) => {
              const ids = ["urgence", "inter-hopitaux", "longue-distance", "evenements"] as const;
              const sectionId = ids[index] || `service-${index}`;
              return (
                <section key={sectionId} id={sectionId} className="scroll-mt-24">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <service.icon className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl">{service.title}</h3>
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
                </section>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interventions par ville */}
      <section className="py-16 bg-white" aria-label="Interventions par ville">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Interventions par ville
          </h2>
          <p className="text-gray-600 mb-8">
            Nos services d'ambulance sont disponibles dans toutes les principales villes du Maroc
          </p>
          <ul className="flex flex-wrap gap-3 justify-center">
            <li><a className="underline hover:no-underline text-primary font-medium" href="/ambulance-casablanca">Ambulance Casablanca</a></li>
            <li><a className="underline hover:no-underline text-primary font-medium" href="/ambulance-rabat">Ambulance Rabat</a></li>
            <li><a className="underline hover:no-underline text-primary font-medium" href="/ambulance-tanger">Ambulance Tanger</a></li>
            <li><a className="underline hover:no-underline text-primary font-medium" href="/ambulance-marrakech">Ambulance Marrakech</a></li>
            <li><a className="underline hover:no-underline text-primary font-medium" href="/ambulance-fes">Ambulance Fès</a></li>
            <li><a className="underline hover:no-underline text-primary font-medium" href="/ambulance-agadir">Ambulance Agadir</a></li>
            <li><a className="underline hover:no-underline text-primary font-medium" href="/ambulance-meknes">Ambulance Meknès</a></li>
            <li><a className="underline hover:no-underline text-primary font-medium" href="/ambulance-oujda">Ambulance Oujda</a></li>
          </ul>
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
              <a href="https://wa.me/212777722311" className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Questions Fréquentes
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                En combien de temps intervenez-vous ?
              </h3>
              <p className="text-gray-700">
                Temps de réponse moyen 8–20 minutes selon la ville.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Pouvez-vous assurer un transfert inter-hôpitaux ?
              </h3>
              <p className="text-gray-700">
                Oui, avec personnel qualifié et matériel adapté.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Couvrez-vous les événements ?
              </h3>
              <p className="text-gray-700">
                Oui, équipes dédiées et protocole d'évacuation.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "En combien de temps intervenez-vous ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Temps de réponse moyen 8–20 minutes selon la ville."
              }
            },
            {
              "@type": "Question", 
              "name": "Pouvez-vous assurer un transfert inter-hôpitaux ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Oui, avec personnel qualifié et matériel adapté."
              }
            },
            {
              "@type": "Question",
              "name": "Couvrez-vous les événements ?", 
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Oui, équipes dédiées et protocole d'évacuation."
              }
            }
          ]
        })
      }} />

      <Footer />
    </div>
  );
};

export default Services;