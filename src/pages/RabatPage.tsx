import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SmartBreadcrumb from "@/components/SmartBreadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MessageCircle, MapPin, Clock, Users, CheckCircle, Shield, Star, Zap, Hospital, Globe, Award } from "lucide-react";
import { CallButton, WhatsAppButton } from "@/components/ContactCTA";
import ContactForm from "@/components/ContactForm";
import { SITE_URL } from "@/lib/config";

const RabatPage = () => {
  const canonical = `${SITE_URL}/ambulance-rabat`;
  
  const jsonLdMultiple = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Ambulance Rabat - Service d'Urgence 24h/24",
      "description": "Service d'ambulance privée à Rabat disponible 24h/24 pour urgences médicales, transferts inter-hôpitaux et transport médicalisé dans toute l'agglomération Rabat-Salé-Témara.",
      "url": canonical,
      "telephone": "+212777722311",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Rabat",
        "addressCountry": "MA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "34.0209",
        "longitude": "-6.8416"
      },
      "openingHours": "Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59",
      "priceRange": "$$",
      "areaServed": [
        {
          "@type": "City",
          "name": "Rabat"
        },
        {
          "@type": "City", 
          "name": "Salé"
        },
        {
          "@type": "City",
          "name": "Témara"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Quel est le délai moyen d'intervention à Rabat ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Notre délai d'intervention moyen à Rabat est de 12-15 minutes dans les quartiers centraux (Hassan, Agdal, Hay Riad) et jusqu'à 20 minutes dans l'agglomération élargie (Salé, Témara, Skhirat)."
          }
        },
        {
          "@type": "Question", 
          "name": "Couvrez-vous Salé et Témara ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, nous couvrons entièrement l'agglomération Rabat-Salé-Témara-Skhirat avec nos ambulances équipées 24h/24. Nos équipes connaissent parfaitement tous les quartiers et axes de circulation."
          }
        },
        {
          "@type": "Question",
          "name": "Proposez-vous un service adapté aux ambassades ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolument. En tant que capitale diplomatique, nous proposons des services spécialisés pour les ambassades, consulats et institutions internationales avec personnel multilingue et protocoles adaptés."
          }
        }
      ]
    }
  ];

  return (
    <>
      <SEO
        title="🚑 Ambulance privée à Rabat – Urgence 24h/24 & transport médicalisé"
        description="Ambulance Rabat disponible 24h/24 pour urgences vitales. Intervention rapide dans tous quartiers, transferts CHU Ibn Sina, service diplomatique. ☎️ +212 7777 223 11"
        canonical={canonical}
        jsonLdMultiple={jsonLdMultiple}
        keywords={["ambulance Rabat", "ambulance privée Rabat", "transport médicalisé Rabat", "urgence ambulance Rabat", "ambulance 24h/24 Rabat", "CHU Ibn Sina", "ambulance Agdal", "ambulance Hassan", "ambulance Hay Riad", "ambulance Souissi"]}
      />
      <Header />
      
      <main className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
        <div className="container mx-auto px-4 py-8">
          <SmartBreadcrumb />
          
          {/* H1 + Intro locale */}
          <section className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 flex items-center justify-center gap-3">
              🚑 Ambulance privée à Rabat – Urgence 24h/24 & transport médicalisé
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              En tant que capitale administrative du Maroc, Rabat requiert des services d'ambulance adaptés aux spécificités diplomatiques et institutionnelles. 
              Notre équipe intervient 24h/24 dans toute l'agglomération Rabat-Salé-Témara pour répondre aux besoins urgents des résidents, 
              diplomates et visiteurs internationaux avec un niveau de service exemplaire.
            </p>
          </section>

          {/* Spécificités locales à Rabat */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
              <Globe className="h-8 w-8 text-primary" />
              Spécificités locales à Rabat
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Service diplomatique prioritaire
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Intervention prioritaire pour ambassades, consulats et ministères avec personnel multilingue et protocoles spécialisés adaptés aux exigences diplomatiques de Rabat.</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Couverture complète agglomération
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Service étendu à toute l'agglomération Rabat-Salé-Témara-Skhirat avec connaissance parfaite des axes de circulation et points stratégiques de la capitale.</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Autorisation transports officiels
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Habilitation pour transports diplomatiques et officiels avec respect des protocoles de sécurité requis dans la capitale administrative du Maroc.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Nos Services */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
              <Zap className="h-8 w-8 text-primary" />
              Nos Services à Rabat
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Phone className="h-6 w-6 text-primary" />
                  Urgences vitales 24h/24
                </h3>
                <p className="text-muted-foreground mb-4">
                  Intervention d'urgence immédiate à Rabat pour toutes situations critiques. Nos ambulances équipées interviennent en moins de 15 minutes 
                  dans les quartiers centraux de Rabat (Hassan, Agdal, Hay Riad, Souissi).
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Hospital className="h-6 w-6 text-primary" />
                  Transferts inter-hôpitaux Rabat
                </h3>
                <p className="text-muted-foreground mb-4">
                  Transport médicalisé sécurisé entre les établissements de santé de Rabat : CHU Ibn Sina, Hôpital Cheikh Zaid, 
                  Hôpital Avicenne, et Hôpital Militaire Mohamed V avec accompagnement médical spécialisé.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-primary" />
                  Transports longue distance depuis Rabat
                </h3>
                <p className="text-muted-foreground mb-4">
                  Évacuations médicalisées de Rabat vers Casablanca, Fès, Marrakech et autres villes du Maroc. 
                  Transport sécurisé avec équipe médicale dédiée pour les trajets longue distance.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Assistance événements officiels
                </h3>
                <p className="text-muted-foreground mb-4">
                  Couverture médicale pour conférences internationales, manifestations officielles et événements diplomatiques 
                  organisés dans la capitale Rabat avec équipes d'intervention dédiées.
                </p>
              </div>
            </div>
          </section>

          {/* Zones couvertes */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
              <MapPin className="h-8 w-8 text-primary" />
              Zones couvertes à Rabat
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Quartiers de Rabat</CardTitle>
                  <CardDescription>Intervention rapide dans tous les secteurs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="bg-primary/10 px-3 py-1 rounded-full text-sm">Hay Riad</span>
                    <span className="bg-primary/10 px-3 py-1 rounded-full text-sm">Agdal</span>
                    <span className="bg-primary/10 px-3 py-1 rounded-full text-sm">Hassan</span>
                    <span className="bg-primary/10 px-3 py-1 rounded-full text-sm">Souissi</span>
                    <span className="bg-primary/10 px-3 py-1 rounded-full text-sm">Yacoub El Mansour</span>
                    <span className="bg-primary/10 px-3 py-1 rounded-full text-sm">Océan</span>
                    <span className="bg-primary/10 px-3 py-1 rounded-full text-sm">Aviation</span>
                    <span className="bg-primary/10 px-3 py-1 rounded-full text-sm">Médina</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Agglomération élargie</CardTitle>
                  <CardDescription>Couverture complète métropole</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="bg-secondary/10 px-3 py-1 rounded-full text-sm">Salé</span>
                    <span className="bg-secondary/10 px-3 py-1 rounded-full text-sm">Témara</span>
                    <span className="bg-secondary/10 px-3 py-1 rounded-full text-sm">Skhirat</span>
                    <span className="bg-secondary/10 px-3 py-1 rounded-full text-sm">Bouknadel</span>
                    <span className="bg-secondary/10 px-3 py-1 rounded-full text-sm">Harhoura</span>
                    <span className="bg-secondary/10 px-3 py-1 rounded-full text-sm">Ain Atiq</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Équipe médicale */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              Équipe médicale Rabat
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center border-primary/20">
                <CardHeader>
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Ambulanciers diplômés</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Personnel formé aux urgences pré-hospitalières avec certification du Ministère de la Santé du Maroc et connaissance approfondie de Rabat.</p>
                </CardContent>
              </Card>

              <Card className="text-center border-primary/20">
                <CardHeader>
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Infirmiers spécialisés</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Équipe d'infirmiers expérimentés en soins d'urgence et transport médicalisé, disponibles 24h/24 à Rabat pour interventions critiques.</p>
                </CardContent>
              </Card>

              <Card className="text-center border-primary/20">
                <CardHeader>
                  <Hospital className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Médecins d'urgence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Médecins urgentistes disponibles pour interventions complexes et transports médicalisés longue distance depuis Rabat vers autres régions.</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Matériel médical conforme
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nos ambulances à Rabat sont équipées selon les normes strictes du Ministère de la Santé marocain : 
                  défibrillateurs, respirateurs, moniteurs de signes vitaux, matériel de réanimation et pharmacie d'urgence complète. 
                  Contrôles techniques réguliers et maintenance préventive assurés pour garantir une intervention optimale à Rabat.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Hôpitaux et partenaires locaux */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
              <Hospital className="h-8 w-8 text-primary" />
              Hôpitaux et partenaires à Rabat
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>CHU Ibn Sina Rabat</CardTitle>
                  <CardDescription>Centre hospitalier universitaire principal</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Partenariat privilégié avec le CHU Ibn Sina de Rabat pour transferts d'urgence et hospitalisations. 
                  Connaissance parfaite des procédures d'admission et coordination directe avec les services d'urgence.</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Hôpital Militaire Mohamed V</CardTitle>
                  <CardDescription>Établissement militaire spécialisé</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Transports autorisés vers l'Hôpital Militaire Mohamed V de Rabat avec respect des protocoles de sécurité 
                  et coordination avec les autorités militaires pour les transferts urgents.</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Hôpital Cheikh Zaid</CardTitle>
                  <CardDescription>Spécialités chirurgicales et cardiologie</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Évacuations vers l'Hôpital Cheikh Zaid de Rabat pour urgences cardiologiques et interventions chirurgicales spécialisées. 
                  Protocoles adaptés aux pathologies complexes.</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Hôpital Avicenne</CardTitle>
                  <CardDescription>Urgences pédiatriques et maternité</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Transferts spécialisés vers l'Hôpital Avicenne de Rabat pour urgences pédiatriques, obstétriques et néonatales. 
                  Équipement adapté au transport de nouveau-nés et femmes enceintes.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Témoignages Rabat */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
              <Star className="h-8 w-8 text-primary" />
              Témoignages clients Rabat
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">Mme Fatima K. - Hay Riad</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "Intervention très rapide à Hay Riad pour ma mère. L'équipe était professionnelle et rassurante. 
                    Transport jusqu'au CHU Ibn Sina en 12 minutes. Service exemplaire à Rabat !"
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">M. Ahmed B. - Agdal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "Transfert d'urgence depuis Agdal vers Casablanca parfaitement organisé. Personnel médical compétent, 
                    véhicule bien équipé. Je recommande ce service d'ambulance à Rabat."
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">Ambassade du Canada - Souissi</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "Service diplomatique irréprochable lors d'une urgence médicale. Personnel multilingue, 
                    discrétion assurée et protocole respecté. Partenaire de confiance à Rabat."
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* FAQ Rabat */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
              <MessageCircle className="h-8 w-8 text-primary" />
              Questions fréquentes - Ambulance Rabat
            </h2>
            
            <div className="space-y-6">
              <Card className="border-primary/20">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Quel est le délai moyen d'intervention à Rabat ?</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Notre délai d'intervention moyen à Rabat est de 12-15 minutes dans les quartiers centraux (Hassan, Agdal, Hay Riad, Souissi) 
                    et jusqu'à 20 minutes dans l'agglomération élargie (Salé, Témara, Skhirat). Ces délais peuvent varier selon les conditions de circulation 
                    dans la capitale, particulièrement aux heures de pointe.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Couvrez-vous Salé et Témara ?</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Oui, nous couvrons entièrement l'agglomération Rabat-Salé-Témara-Skhirat avec nos ambulances équipées 24h/24. 
                    Nos équipes connaissent parfaitement tous les quartiers, axes de circulation et points d'accès rapides dans cette zone métropolitaine. 
                    Service identique dans toute l'agglomération de Rabat.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Proposez-vous un service adapté aux ambassades ?</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Absolument. En tant que capitale diplomatique du Maroc, Rabat abrite de nombreuses ambassades et consulats. 
                    Nous proposons des services spécialisés avec personnel multilingue (français, anglais, arabe), protocoles de discrétion renforcés 
                    et procédures adaptées aux exigences diplomatiques. Intervention prioritaire pour les missions diplomatiques à Rabat.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Quels sont vos tarifs à Rabat ?</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Nos tarifs à Rabat varient selon le type d'intervention : urgences vitales, transferts programmés, ou transports longue distance. 
                    Tarification transparente communiquée avant intervention. Possibilité de prise en charge par assurances santé. 
                    Devis gratuit sur demande pour transports programmés depuis Rabat.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Comment vous contacter en urgence à Rabat ?</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Pour toute urgence à Rabat, appelez directement le +212 7777 223 11. Notre centrale d'appels est opérationnelle 24h/24 
                    avec géolocalisation automatique pour intervention rapide. WhatsApp disponible pour demandes non urgentes. 
                    Temps de décrochage moyen : moins de 3 sonneries à Rabat.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section Contact */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
              <Phone className="h-8 w-8 text-primary" />
              Contact Urgent - Ambulance Rabat
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">🚨 Urgence Immédiate</CardTitle>
                  <CardDescription className="text-center">Intervention rapide à Rabat 24h/24</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <CallButton
                      phone="+212777722311"
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90 px-8 py-3 rounded-lg font-semibold text-lg flex items-center justify-center gap-2"
                    >
                      <Phone className="h-5 w-5" />
                      Appeler Maintenant
                    </CallButton>
                    
                    <WhatsAppButton
                      phone="+212777722311"
                      text="Urgence ambulance Rabat - Intervention immédiate demandée"
                      className="bg-green-600 text-white hover:bg-green-700 px-8 py-3 rounded-lg font-semibold text-lg flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="h-5 w-5" />
                      WhatsApp Urgent
                    </WhatsAppButton>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    ⏱️ Intervention en 12-15 min à Rabat centre<br />
                    🌍 Couverture Rabat-Salé-Témara-Skhirat<br />
                    🏥 Transport direct CHU Ibn Sina
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Demande non urgente</CardTitle>
                  <CardDescription>Transport programmé ou devis</CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </section>

          <div className="text-center mt-12 p-6 bg-primary/5 rounded-lg">
            <p className="text-muted-foreground text-sm">
              <strong>Ambulance Maroc</strong> est une plateforme de mise en relation avec des prestataires d'ambulances privées à Rabat. 
              Nous facilitons l'accès aux services d'urgence médicale dans toute l'agglomération de Rabat 
              en connectant patients et professionnels qualifiés 24h/24.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default RabatPage;