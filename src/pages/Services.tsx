import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SmartBreadcrumb from "@/components/SmartBreadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ambulance, Clock, Users, Shield, Phone, MessageCircle, Search, Network, Star, CheckCircle } from "lucide-react";
import { useHashScroll } from "@/hooks/useHashScroll";
import { CallButton, WhatsAppButton } from "@/components/ContactCTA";
import ServiceArticleLinks from "@/components/ServiceArticleLinks";

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

  useHashScroll(96);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Services d'Ambulance – Urgence 24/7 au Maroc | Ambulance Privée Maroc"
        description="Plateforme de mise en relation avec les meilleurs services d'ambulance. Transport d'urgence, inter-hôpitaux, longue distance. Intervention 24/7 partout au Maroc."
        canonical="/services"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Services d'ambulance au Maroc",
          "provider": {"@type": "Organization", "name": "Ambulance Privée Maroc", "telephone": "+212777722311"},
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
      <SmartBreadcrumb />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-dark to-secondary text-white py-24 relative overflow-hidden" aria-label="Présentation des services d'ambulance">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
            <CheckCircle className="h-4 w-4 mr-2" />
            Plateforme de confiance certifiée
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Nos Services d'<span className="text-secondary">Ambulance</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
            Plateforme digitale de mise en relation avec les meilleurs services d'ambulance 24h/24 et 7j/7 partout au Maroc
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="shadow-lg hover:shadow-xl transition-all">
              <CallButton phone="+212777722311" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Appelez maintenant
              </CallButton>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20 shadow-lg" asChild>
              <WhatsAppButton phone="+212777722311" className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </WhatsAppButton>
            </Button>
          </div>
        </div>
      </section>

      {/* Notre Plateforme Section */}
      <section className="py-20 bg-gradient-to-r from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold mb-6">
              <Network className="h-4 w-4 mr-2" />
              Notre Mission
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Plateforme Digitale de <span className="text-primary">Mise en Relation</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Nous ne possédons pas nos propres ambulances, mais nous sommes votre partenaire de confiance pour vous connecter 
              rapidement avec les meilleures sociétés d'ambulance du Maroc.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-primary/5">
              <CardHeader className="text-center pb-4">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold">Recherche Optimisée</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Nous analysons votre demande et trouvons l'ambulance la plus proche et la mieux équipée pour votre situation
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-secondary/5">
              <CardHeader className="text-center pb-4">
                <div className="bg-secondary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Network className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-xl font-bold">Réseau Partenaire</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Plus de 50 sociétés d'ambulance certifiées et vérifiées dans notre réseau à travers tout le Maroc
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-success/5">
              <CardHeader className="text-center pb-4">
                <div className="bg-success/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Star className="h-8 w-8 text-success" />
                </div>
                <CardTitle className="text-xl font-bold">Qualité Garantie</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Toutes nos sociétés partenaires sont évaluées selon des critères stricts de qualité et de réactivité
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Comment nous fonctionnons ?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Vous nous contactez</h4>
                      <p className="text-muted-foreground">Appelez-nous ou envoyez un message WhatsApp avec votre besoin</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Nous recherchons pour vous</h4>
                      <p className="text-muted-foreground">Notre équipe identifie la meilleure ambulance disponible selon vos critères</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Mise en relation directe</h4>
                      <p className="text-muted-foreground">Nous vous connectons directement avec la société d'ambulance sélectionnée</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-8 text-center">
                <h4 className="text-xl font-bold text-foreground mb-4">Pourquoi nous choisir ?</h4>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="text-muted-foreground">Gain de temps précieux</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="text-muted-foreground">Meilleur prix garanti</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="text-muted-foreground">Qualité vérifiée</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="text-muted-foreground">Disponibilité 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-muted/30" aria-label="Liste des services d'ambulance">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold mb-6">
              <Ambulance className="h-4 w-4 mr-2" />
              Services Disponibles
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Services <span className="text-primary">Professionnels</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Notre réseau de partenaires offre une gamme complète de services d'ambulance adaptés à tous vos besoins médicaux
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const ids = ["urgence", "inter-hopitaux", "longue-distance", "evenements"] as const;
              const sectionId = ids[index] || `service-${index}`;
              return (
                <section key={sectionId} id={sectionId} className="scroll-mt-24">
                  <Card className="hover:shadow-xl transition-all duration-300 border-none bg-gradient-to-br from-white to-primary/5 h-full">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-primary to-primary-dark p-4 rounded-xl shadow-lg">
                          <service.icon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold text-foreground">{service.title}</CardTitle>
                        </div>
                      </div>
                      <CardDescription className="text-base text-muted-foreground leading-relaxed">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-foreground">
                            <div className="h-2 w-2 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                            <span className="font-medium">{feature}</span>
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
            <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-all">
              <CallButton phone="+212777722311" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Urgence: +212 7777 223 11
              </CallButton>
            </Button>
            <Button size="lg" variant="outline" asChild className="shadow-lg">
              <WhatsAppButton phone="+212777722311" className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </WhatsAppButton>
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
      
      {/* ServiceArticleLinks: From services to related blog articles */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <ServiceArticleLinks 
            context="service-to-blog"
            maxLinks={6}
          />
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