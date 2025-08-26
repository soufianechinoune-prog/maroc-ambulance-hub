import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SmartBreadcrumb from "@/components/SmartBreadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, MessageCircle, MapPin, Clock, Users, CheckCircle, Shield, Star, Zap, Hospital, Globe, Award, AlertCircle, Calendar, ExternalLink, Timer, Badge, Ship, Plane, Factory } from "lucide-react";
import { CallButton, WhatsAppButton } from "@/components/ContactCTA";
import { SITE_URL } from "@/lib/config";
import { track } from "@/lib/track";
import ambulanceTangerImage from "@/assets/ambulance-tanger-med.webp";

const TangerPage = () => {
  const canonical = `${SITE_URL}/ambulance-tanger`;
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    service: "",
    city: "Tanger",
    datetime: "",
    details: ""
  });

  const testimonials = [
    {
      name: "Fatima K.",
      location: "Tanger Med",
      text: "Intervention rapide dans la zone franche. Personnel très professionnel et équipement médical moderne. Service portuaire impeccable.",
      rating: 5
    },
    {
      name: "Ahmed M.",
      location: "Malabata, Tanger", 
      text: "Transport médicalisé Tanger-Casablanca parfaitement organisé, personnel qualifié et très rassurant pendant tout le trajet.",
      rating: 5
    },
    {
      name: "Samir B.",
      location: "Tétouan",
      text: "Urgence cardiaque à domicile, intervention en 15 min, prise en charge immédiate. Équipe très professionnelle.",
      rating: 5
    },
    {
      name: "Nadia L.",
      location: "Iberia, Tanger",
      text: "Service rassurant lors d'un transfert urgent Tanger–Rabat. Personnel bienveillant et véhicule très propre.",
      rating: 5
    },
    {
      name: "Youssef A.",
      location: "Organisateur d'événement",
      text: "Couverture médicale impeccable pour notre salon professionnel à la TFZ. Équipe disponible et efficace.",
      rating: 5
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    track('form_submit_non_urgent', {
      city: 'Tanger',
      service: formData.service
    });
    // Handle form submission
  };

  const handleCallClick = () => {
    track('click_call', { city: 'Tanger', source: 'hero' });
  };

  const handleWhatsAppClick = () => {
    track('click_whatsapp', { city: 'Tanger', source: 'hero' });
  };

  const handleStickyClick = (type: 'call' | 'whatsapp') => {
    track('sticky_bar_click', { city: 'Tanger', type });
  };
  
  const jsonLdMultiple = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Ambulance Privée Maroc – Tanger",
      "url": canonical,
      "telephone": "+212777722311",
      "areaServed": ["Tanger","Tétouan","Fnideq","M'diq","Assilah","Ksar El Kebir","Tanger Med"],
      "address": { 
        "@type": "PostalAddress", 
        "addressLocality": "Tanger", 
        "addressCountry": "MA" 
      },
      "openingHours": "Mo-Su 00:00-23:59",
      "image": `${SITE_URL}/images/ambulance-hero-tanger.jpg`,
      "sameAs": []
    },
    {
      "@context": "https://schema.org",
      "@type": "EmergencyService",
      "name": "Ambulance Tanger - Service d'Urgence 24h/24",
      "description": "Service d'ambulance privée à Tanger disponible 24h/24 pour urgences médicales, transferts inter-hôpitaux et transport médicalisé dans toute la région Nord.",
      "url": canonical,
      "telephone": "+212777722311",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Tanger",
        "addressCountry": "MA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "35.7595",
        "longitude": "-5.8340"
      },
      "openingHours": "Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59",
      "priceRange": "$$",
      "areaServed": [
        {
          "@type": "City",
          "name": "Tanger"
        },
        {
          "@type": "City", 
          "name": "Tétouan"
        },
        {
          "@type": "City",
          "name": "Fnideq"
        },
        {
          "@type": "City",
          "name": "M'diq"
        }
      ],
      "availableService": [
        {
          "@type": "MedicalProcedure",
          "name": "Transport médical d'urgence"
        },
        {
          "@type": "MedicalProcedure",
          "name": "Transfert inter-hôpitaux"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Quel est le temps moyen d'arrivée d'une ambulance privée à Tanger ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Notre délai d'intervention moyen à Tanger est de 12-15 minutes dans les quartiers centraux (Médina, Marshan, Iberia) et jusqu'à 20 minutes dans les zones périphériques (Tanger Med, Beni Makada)."
          }
        },
        {
          "@type": "Question", 
          "name": "Couvrez-vous Tanger Med et la zone franche TFZ ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, nous couvrons entièrement Tanger Med et la zone franche TFZ avec nos ambulances équipées 24h/24. Nos équipes disposent des autorisations nécessaires et connaissent parfaitement ces secteurs industriels et portuaires."
          }
        },
        {
          "@type": "Question",
          "name": "Est-il possible de réserver un transport médicalisé longue distance depuis Tanger ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolument. Nous proposons des transports médicalisés longue distance depuis Tanger vers toutes les villes du Maroc : Casablanca (3h), Rabat (2h30), Fès (4h), Marrakech (6h) avec équipement médical complet."
          }
        },
        {
          "@type": "Question",
          "name": "Intervenez-vous jusqu'à Tétouan, Asilah ou Larache ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, notre service d'ambulance privée couvre toute la région Nord : Tétouan (45 min depuis Tanger), Asilah (30 min), Larache (1h15), ainsi que Fnideq et M'diq. Nos équipes connaissent parfaitement tous les axes routiers de la région."
          }
        },
        {
          "@type": "Question",
          "name": "Proposez-vous un service adapté aux entreprises industrielles ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, nous proposons des services spécialisés pour les entreprises de Tanger Med, de la zone franche TFZ et du secteur industriel avec des protocoles adaptés et du personnel formé aux interventions en milieu industriel."
          }
        },
        {
          "@type": "Question",
          "name": "Vos ambulances sont-elles équipées pour les urgences cardiaques/pédiatriques ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nos ambulances à Tanger sont équipées d'un défibrillateur, monitoring cardiaque, matériel de réanimation adulte et pédiatrique conformément aux normes du Ministère de la Santé marocain."
          }
        },
        {
          "@type": "Question",
          "name": "Est-ce que le service est disponible pour événements et festivals à Tanger ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, nous couvrons tous les événements à Tanger : festivals, conférences internationales, manifestations publiques et rassemblements avec des équipes médicales dédiées et du matériel d'urgence sur site."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Accueil",
          "item": SITE_URL
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Ambulance Tanger",
          "item": canonical
        }
      ]
    }
  ];

  return (
    <>
      <SEO
        title="Ambulance privée à Tanger – Urgence 24h/24 & transport médicalisé"
        description="Service d'ambulance privée à Tanger disponible 24h/24. Urgences vitales, transferts inter-hôpitaux, transports médicalisés longue distance et assistance événements. Temps moyen d'intervention : 12–15 min."
        canonical={canonical}
        jsonLdMultiple={jsonLdMultiple}
        keywords={["ambulance Tanger", "ambulance privée Tanger", "transport médicalisé Tanger", "urgence ambulance Tanger", "ambulance 24h/24 Tanger", "Tanger Med", "ambulance zone franche", "ambulance port Tanger", "urgence médicale Tanger Nord"]}
      />
      <Header />
      
      {/* Barre d'urgence 150 fine et discrète */}
      <div className="bg-emergency text-emergency-foreground text-center py-2 text-sm font-medium">
        🚨 URGENCE VITALE : Composez le 150 (SAMU) | Pour ambulance privée : +212 777 722 311
      </div>
      
      <main className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
        <div className="container mx-auto px-4 py-8">
          <SmartBreadcrumb />
          
          {/* Hero Section 2 colonnes */}
          <section className="mb-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Colonne gauche */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Ambulance privée à Tanger – Urgence 24h/24 & transport médicalisé
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Service d'ambulance professionnel à Tanger, porte d'entrée vers l'Europe. 
                  Intervention rapide pour urgences et transferts médicalisés dans toute la région Nord.
                </p>
                
                {/* Badges de confiance en liste UL avec aria-label */}
                <ul className="space-y-3 mb-8" role="list" aria-label="Badges de confiance et certifications">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-5 w-5 text-success" aria-hidden="true" />
                    <span>✅ Agréé Ministère de la Santé</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Star className="h-5 w-5 text-primary" aria-hidden="true" />
                    <span>⭐ 4.9/5 basé sur +4000 interventions</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Timer className="h-5 w-5 text-primary" aria-hidden="true" />
                    <span>⏱ Temps moyen d'intervention à Tanger : 12–15 min</span>
                  </li>
                </ul>
                
                {/* CTA groupés */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <CallButton
                    phone="+212777722311"
                    onClick={handleCallClick}
                    className="bg-emergency hover:bg-emergency-hover text-emergency-foreground px-8 py-4 text-lg font-semibold rounded-lg flex items-center justify-center gap-2"
                    aria-label="Appeler ambulance Tanger maintenant"
                    data-analytics="cta_call_tanger_hero"
                  >
                    <Phone className="h-5 w-5" />
                    Appeler maintenant
                  </CallButton>
                  <WhatsAppButton
                    phone="+212777722311"
                    text="Urgence ambulance Tanger - Intervention immédiate demandée"
                    onClick={handleWhatsAppClick}
                    className="bg-success hover:bg-success/90 text-success-foreground px-8 py-4 text-lg font-semibold rounded-lg flex items-center justify-center gap-2"
                    aria-label="Contacter WhatsApp ambulance Tanger"
                    data-analytics="cta_wa_tanger_hero"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp direct
                  </WhatsAppButton>
                </div>
              </div>
              
              {/* Colonne droite - Image - Hero avec loading="eager" */}
              <div className="relative">
                <img 
                  src={ambulanceTangerImage} 
                  alt="Ambulance privée à Tanger devant le port Tanger Med"
                  className="w-full h-96 object-cover rounded-xl shadow-lg"
                  loading="eager"
                  width="600"
                  height="384"
                  onError={(e) => {
                    e.currentTarget.src = "/lovable-uploads/30143fda-0279-47a1-a749-2f87bda36d98.png";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-xl"></div>
              </div>
            </div>
          </section>

          {/* Spécificités locales à Tanger */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
              <Globe className="h-8 w-8 text-primary" />
              Spécificités locales à Tanger
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ship className="h-5 w-5 text-primary" />
                    Service portuaire spécialisé
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Intervention prioritaire au port Tanger Med avec autorisations spéciales et protocoles adaptés aux zones portuaires et logistiques stratégiques.</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Factory className="h-5 w-5 text-primary" />
                    Zone franche TFZ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Couverture complète de la zone franche de Tanger avec équipes formées aux interventions en milieu industriel et logistique international.</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plane className="h-5 w-5 text-primary" />
                    Transport ferry/aéroport
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Service spécialisé pour transports vers ferry (direction Espagne) et aéroport Ibn Battouta avec coordination internationale.</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Coordination internationale
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Partenariats transfrontaliers pour évacuations vers l'Espagne et coordination avec les services d'urgence européens.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Nos Services */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
              <Zap className="h-8 w-8 text-primary" />
              Nos services à Tanger
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Urgences vitales - Rouge pour urgence */}
              <Card className="border-emergency/30 bg-emergency/5 hover:bg-emergency/10 transition-colors">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <AlertCircle className="h-6 w-6 text-emergency" />
                    Urgences vitales 24h/24
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Intervention d'urgence immédiate à Tanger pour toutes situations critiques. Nos ambulances équipées interviennent en moins de 15 minutes 
                    dans les quartiers centraux (Médina, Marshan, Iberia, Malabata) et zones industrielles (Tanger Med, TFZ).
                  </p>
                  <Button className="bg-emergency hover:bg-emergency-hover text-emergency-foreground">
                    <Phone className="mr-2 h-4 w-4" />
                    Appel Urgence
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Hospital className="h-6 w-6 text-primary" />
                    Transferts inter-hôpitaux Tanger
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Transport médicalisé sécurisé entre les établissements de santé de Tanger : CHU de Tanger, Hôpital Mohammed V, 
                    cliniques privées (Excel, Andalus) avec accompagnement médical spécialisé et coordination régionale.
                  </p>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <Hospital className="mr-2 h-4 w-4" />
                    Planifier Transfert
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-primary" />
                    Transports longue distance depuis Tanger
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Évacuations médicalisées de Tanger vers Casablanca (3h), Rabat (2h30), Fès (4h), Marrakech (6h) et autres villes du Maroc. 
                    Transport sécurisé avec équipe médicale dédiée et suivi médical continu pendant tout le trajet.
                  </p>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    Devis Longue Distance
                  </Button>
                </CardContent>
              </Card>

              {/* Assistance événements - Avec CTA WhatsApp vert */}
              <Card className="border-success/30 bg-success/5 hover:bg-success/10 transition-colors">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-success" />
                    Assistance événements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Couverture médicale pour festivals (Tanjazz, événements culturels), conférences internationales, salons professionnels 
                    et événements sportifs organisés à Tanger avec équipes d'intervention dédiées et matériel d'urgence sur site.
                  </p>
                  <Button className="bg-success hover:bg-success/90 text-success-foreground">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp Direct
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA de section après Services */}
          <div className="mb-12 text-center p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border">
            <h3 className="text-xl font-semibold text-foreground mb-4">Besoin d'une intervention à Tanger ?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CallButton
                phone="+212777722311"
                onClick={() => track('cta_call_section_services', { city: 'Tanger' })}
                className="bg-emergency hover:bg-emergency-hover text-emergency-foreground px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                aria-label="Appeler ambulance Tanger depuis section services"
                data-analytics="cta_call_tanger_services"
              >
                <Phone className="h-4 w-4" />
                Appeler
              </CallButton>
              <WhatsAppButton
                phone="+212777722311"
                text="Demande ambulance Tanger - Services médicalisés"
                onClick={() => track('cta_whatsapp_section_services', { city: 'Tanger' })}
                className="bg-success hover:bg-success/90 text-success-foreground px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                aria-label="Contacter WhatsApp ambulance Tanger depuis section services"
                data-analytics="cta_wa_tanger_services"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </WhatsAppButton>
            </div>
          </div>

          {/* Zones couvertes avec carte statique */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
              <MapPin className="h-8 w-8 text-primary" />
              Zones couvertes à Tanger
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle>Quartiers de Tanger</CardTitle>
                    <CardDescription>Intervention rapide dans tous les secteurs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="bg-primary/10 px-3 py-1 rounded-full text-sm">Médina</span>
                      <span className="bg-primary/10 px-3 py-1 rounded-full text-sm">Marshan</span>
                      <span className="bg-primary/10 px-3 py-1 rounded-full text-sm">Beni Makada</span>
                      <span className="bg-primary/10 px-3 py-1 rounded-full text-sm">Malabata</span>
                      <span className="bg-primary/10 px-3 py-1 rounded-full text-sm">Iberia</span>
                      <span className="bg-primary/10 px-3 py-1 rounded-full text-sm">Tanger Med</span>
                      <span className="bg-primary/10 px-3 py-1 rounded-full text-sm">Zone Franche TFZ</span>
                      <span className="bg-primary/10 px-3 py-1 rounded-full text-sm">Aéroport</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle>Région Nord</CardTitle>
                    <CardDescription>Couverture complète région</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="bg-secondary/10 px-3 py-1 rounded-full text-sm">Tétouan</span>
                      <span className="bg-secondary/10 px-3 py-1 rounded-full text-sm">Asilah</span>
                      <span className="bg-secondary/10 px-3 py-1 rounded-full text-sm">Larache</span>
                      <span className="bg-secondary/10 px-3 py-1 rounded-full text-sm">Ksar El Kebir</span>
                      <span className="bg-secondary/10 px-3 py-1 rounded-full text-sm">Fnideq</span>
                      <span className="bg-secondary/10 px-3 py-1 rounded-full text-sm">Martil</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Carte statique optimisée */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Carte Tanger-Nord
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <img 
                    src="/images/carte-tanger-nord.webp"
                    alt="Carte zone intervention ambulance Tanger région Nord"
                    className="w-full h-64 object-cover rounded-lg"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback vers carte Google Maps embed
                      const iframe = document.createElement('iframe');
                      iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d104216.31882467138!2d-5.9339065!3d35.7594651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b265e6402d907%3A0x91548980ce97ea0c!2sTangier%2C%20Morocco!5e0!3m2!1sen!2s!4v1635000000000!5m2!1sen!2s";
                      iframe.width = "100%";
                      iframe.height = "256";
                      iframe.style.border = "0";
                      iframe.loading = "lazy";
                      iframe.className = "rounded-lg";
                      e.currentTarget.parentNode?.replaceChild(iframe, e.currentTarget);
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA de section après Zones couvertes */}
          <div className="mb-12 text-center p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border">
            <h3 className="text-xl font-semibold text-foreground mb-4">Besoin d'une intervention à Tanger ?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CallButton
                phone="+212777722311"
                onClick={() => track('cta_call_section_zones', { city: 'Tanger' })}
                className="bg-emergency hover:bg-emergency-hover text-emergency-foreground px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                aria-label="Appeler ambulance Tanger depuis section zones"
                data-analytics="cta_call_tanger_zones"
              >
                <Phone className="h-4 w-4" />
                Appeler
              </CallButton>
              <WhatsAppButton
                phone="+212777722311"
                text="Demande ambulance Tanger - Couverture zones"
                onClick={() => track('cta_whatsapp_section_zones', { city: 'Tanger' })}
                className="bg-success hover:bg-success/90 text-success-foreground px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                aria-label="Contacter WhatsApp ambulance Tanger depuis section zones"
                data-analytics="cta_wa_tanger_zones"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </WhatsAppButton>
            </div>
          </div>

          {/* Équipe médicale avec photos */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              Équipe médicale à Tanger
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center border-primary/20">
                <CardHeader>
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <img 
                      src="/images/equipe/ambulancier-tanger.webp"
                      alt="Ambulancier diplômé Tanger"
                      className="w-full h-full object-cover rounded-full"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const icon = e.currentTarget.nextElementSibling as HTMLElement;
                        if (icon) icon.style.display = 'block';
                      }}
                    />
                    <Users className="h-12 w-12 text-primary mx-auto hidden" />
                  </div>
                  <CardTitle>Ambulanciers diplômés</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Personnel formé aux urgences pré-hospitalières avec certification du Ministère de la Santé du Maroc et connaissance approfondie de Tanger et la région Nord.</p>
                </CardContent>
              </Card>

              <Card className="text-center border-primary/20">
                <CardHeader>
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <img 
                      src="/images/equipe/infirmier-tanger.webp"
                      alt="Infirmier spécialisé urgences Tanger"
                      className="w-full h-full object-cover rounded-full"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const icon = e.currentTarget.nextElementSibling as HTMLElement;
                        if (icon) icon.style.display = 'block';
                      }}
                    />
                    <Shield className="h-12 w-12 text-primary mx-auto hidden" />
                  </div>
                  <CardTitle>Infirmiers spécialisés urgences & transport</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Équipe d'infirmiers expérimentés en soins d'urgence et transport médicalisé, disponibles 24h/24 à Tanger pour interventions critiques et transferts longue distance.</p>
                </CardContent>
              </Card>

              <Card className="text-center border-primary/20">
                <CardHeader>
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <img 
                      src="/images/equipe/medecin-urgence-tanger.webp"
                      alt="Médecin urgentiste Tanger"
                      className="w-full h-full object-cover rounded-full"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const icon = e.currentTarget.nextElementSibling as HTMLElement;
                        if (icon) icon.style.display = 'block';
                      }}
                    />
                    <Hospital className="h-12 w-12 text-primary mx-auto hidden" />
                  </div>
                  <CardTitle>Médecins urgentistes disponibles 24/7</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Médecins urgentistes disponibles pour interventions complexes, transports médicalisés longue distance depuis Tanger et coordination avec les services européens.</p>
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
                  Nos ambulances à Tanger sont équipées selon les normes strictes du Ministère de la Santé marocain : 
                  défibrillateurs, respirateurs, moniteurs de signes vitaux, matériel de réanimation et pharmacie d'urgence complète. 
                  Contrôles techniques réguliers et maintenance préventive assurés pour garantir une intervention optimale dans la région Nord.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Hôpitaux partenaires à Tanger & Nord */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
              <Hospital className="h-8 w-8 text-primary" />
              Hôpitaux partenaires à Tanger & Nord
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <img 
                      src="/images/logos/chu-tanger-logo.webp"
                      alt="Logo CHU de Tanger"
                      className="w-12 h-12 object-contain"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <div>
                      <CardTitle>CHU de Tanger</CardTitle>
                      <CardDescription>Centre hospitalier universitaire principal</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Partenariat privilégié avec le CHU de Tanger pour transferts d'urgence et hospitalisations. 
                  Connaissance parfaite des procédures d'admission et coordination directe avec les services d'urgence.</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <img 
                      src="/images/logos/hopital-mohammed-v-tanger-logo.webp"
                      alt="Logo Hôpital Mohammed V Tanger"
                      className="w-12 h-12 object-contain"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <div>
                      <CardTitle>Hôpital Mohammed V Tanger</CardTitle>
                      <CardDescription>Établissement public spécialisé</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Transports réguliers vers l'Hôpital Mohammed V de Tanger avec protocoles optimisés 
                  et coordination avec les services d'urgence pour les transferts critiques.</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <img 
                      src="/images/logos/clinique-excel-tanger-logo.webp"
                      alt="Logo Clinique Excel Tanger"
                      className="w-12 h-12 object-contain"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <div>
                      <CardTitle>Cliniques privées (Excel, Andalus)</CardTitle>
                      <CardDescription>Établissements privés spécialisés</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Partenariat avec les principales cliniques privées de Tanger pour transferts spécialisés, 
                  interventions chirurgicales et soins de haute technicité.</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <img 
                      src="/images/logos/hopital-tetouan-logo.webp"
                      alt="Logo Hôpital Tétouan"
                      className="w-12 h-12 object-contain"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <div>
                      <CardTitle>Partenariat région Nord</CardTitle>
                      <CardDescription>Tétouan, Asilah, Larache</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Coordination avec les hôpitaux de Tétouan, Asilah et Larache pour transferts inter-régionaux 
                  et couverture médicale complète de toute la région Nord du Maroc.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Témoignages clients */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
              <Star className="h-8 w-8 text-primary" />
              Témoignages clients Tanger
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-primary/20">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <CardDescription>{testimonial.location}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-primary" />
              Questions fréquentes – Ambulance Tanger
            </h2>
            
            <div className="grid gap-4 max-w-4xl mx-auto">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">Quel est le temps moyen d'arrivée d'une ambulance privée à Tanger ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Notre délai d'intervention moyen à Tanger est de 12-15 minutes dans les quartiers centraux (Médina, Marshan, Iberia, Malabata) 
                    et jusqu'à 20 minutes dans les zones périphériques comme Tanger Med et Beni Makada. Nos équipes sont stratégiquement 
                    positionnées pour optimiser les temps de réponse dans toute l'agglomération de Tanger.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">Couvrez-vous Tanger Med et la zone franche TFZ ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Absolument. Nous couvrons intégralement Tanger Med et la zone franche TFZ avec nos ambulances équipées 24h/24. 
                    Nos équipes disposent des autorisations nécessaires pour accéder à ces secteurs industriels et portuaires stratégiques 
                    et connaissent parfaitement les protocoles de sécurité spécifiques à ces zones.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">Est-il possible de réserver un transport médicalisé longue distance depuis Tanger ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Oui, nous proposons des transports médicalisés longue distance depuis Tanger vers toutes les villes du Maroc : 
                    Casablanca (3h), Rabat (2h30), Fès (4h), Marrakech (6h). Nos ambulances sont équipées d'un matériel médical complet 
                    et accompagnées de personnel qualifié pour assurer un suivi médical continu pendant tout le trajet.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">Intervenez-vous jusqu'à Tétouan, Asilah ou Larache ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Oui, notre service d'ambulance privée couvre toute la région Nord : Tétouan (45 min depuis Tanger), 
                    Asilah (30 min), Larache (1h15), ainsi que Fnideq et M'diq. Nos équipes connaissent parfaitement 
                    tous les axes routiers de la région et peuvent intervenir rapidement dans ces villes voisines.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">Proposez-vous un service adapté aux entreprises industrielles ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Oui, nous proposons des services spécialisés pour les entreprises de Tanger Med, de la zone franche TFZ 
                    et du secteur industriel avec des protocoles adaptés et du personnel formé aux interventions en milieu industriel. 
                    Nous proposons également des contrats de couverture médicale pour événements et sites industriels.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">Vos ambulances sont-elles équipées pour les urgences cardiaques/pédiatriques ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Nos ambulances à Tanger sont équipées d'un défibrillateur, monitoring cardiaque, matériel de réanimation 
                    adulte et pédiatrique conformément aux normes du Ministère de la Santé marocain. Notre personnel est formé 
                    aux urgences vitales et au transport néonatal pour prendre en charge tous types de patients.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">Est-ce que le service est disponible pour événements et festivals à Tanger ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Oui, nous couvrons tous les événements à Tanger : festivals (Tanjazz, événements culturels), conférences internationales, 
                    manifestations publiques et rassemblements avec des équipes médicales dédiées et du matériel d'urgence sur site. 
                    Nous proposons des devis personnalisés selon la durée et le nombre de participants.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Contact urgent - 2 colonnes comme Rabat */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
              <Phone className="h-8 w-8 text-primary" />
              Contact urgent – Ambulance Tanger
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Colonne gauche - Urgence immédiate */}
              <Card className="border-emergency/30 bg-emergency/5">
                <CardHeader>
                  <CardTitle className="text-2xl text-emergency flex items-center gap-2">
                    <AlertCircle className="h-6 w-6" />
                    Urgence immédiate
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Pour une intervention d'urgence à Tanger
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center p-4 bg-background rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Numéro d'urgence</p>
                    <p className="text-3xl font-bold text-foreground">+212 777 722 311</p>
                  </div>
                  
                  <div className="space-y-3">
                    <CallButton
                      phone="+212777722311"
                      onClick={() => track('cta_call_contact', { city: 'Tanger', type: 'urgent' })}
                      className="w-full bg-emergency hover:bg-emergency-hover text-emergency-foreground px-6 py-4 text-lg font-semibold rounded-lg flex items-center justify-center gap-2"
                      aria-label="Appeler ambulance Tanger urgence"
                      data-analytics="cta_call_tanger_urgent"
                    >
                      <Phone className="h-5 w-5" />
                      🚑 Urgence 24/7 (Appeler)
                    </CallButton>
                    
                    <WhatsAppButton
                      phone="+212777722311"
                      text="URGENCE AMBULANCE TANGER - Intervention immédiate demandée"
                      onClick={() => track('cta_whatsapp_contact', { city: 'Tanger', type: 'urgent' })}
                      className="w-full bg-success hover:bg-success/90 text-success-foreground px-6 py-4 text-lg font-semibold rounded-lg flex items-center justify-center gap-2"
                      aria-label="WhatsApp ambulance Tanger urgence"
                      data-analytics="cta_wa_tanger_urgent"
                    >
                      <MessageCircle className="h-5 w-5" />
                      WhatsApp direct
                    </WhatsAppButton>
                  </div>
                  
                  <div className="text-sm text-muted-foreground space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Intervention sous 15 min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Zone couverte Nord</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Hospital className="h-4 w-4" />
                      <span>Transport CHU</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Colonne droite - Demande non urgente */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary flex items-center gap-2">
                    <Calendar className="h-6 w-6" />
                    Demande non urgente
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Planification et informations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nom complet</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Votre nom"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="06 XX XX XX XX"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="service">Type de service</Label>
                        <Select value={formData.service} onValueChange={(value) => setFormData({...formData, service: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir le service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="transfert">Transfert inter-hôpitaux</SelectItem>
                            <SelectItem value="longue-distance">Transport longue distance</SelectItem>
                            <SelectItem value="evenement">Couverture événement</SelectItem>
                            <SelectItem value="consultation">Consultation domicile</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="datetime">Date/Heure souhaitée</Label>
                        <Input
                          id="datetime"
                          type="datetime-local"
                          value={formData.datetime}
                          onChange={(e) => setFormData({...formData, datetime: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="details">Message (optionnel)</Label>
                      <Textarea
                        id="details"
                        value={formData.details}
                        onChange={(e) => setFormData({...formData, details: e.target.value})}
                        placeholder="Précisions sur votre demande..."
                        rows={3}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-lg font-semibold"
                    >
                      📞 Être rappelé en 2–3 minutes
                    </Button>
                    
                    <p className="text-sm text-success text-center">
                      ✅ Réponse en moins de 5 min – Service disponible 24/7
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>

        {/* Barre sticky mobile */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 lg:hidden z-50">
          <div className="flex gap-2">
            <CallButton
              phone="+212777722311"
              onClick={() => handleStickyClick('call')}
              className="flex-1 bg-emergency hover:bg-emergency-hover text-emergency-foreground px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
              aria-label="Appeler ambulance Tanger mobile"
              data-analytics="sticky_call_tanger"
            >
              <Phone className="h-4 w-4" />
              🚑 Urgence 24/7
            </CallButton>
            <WhatsAppButton
              phone="+212777722311"
              text="Urgence ambulance Tanger - Mobile"
              onClick={() => handleStickyClick('whatsapp')}
              className="flex-1 bg-success hover:bg-success/90 text-success-foreground px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
              aria-label="WhatsApp ambulance Tanger mobile"
              data-analytics="sticky_wa_tanger"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp direct
            </WhatsAppButton>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default TangerPage;