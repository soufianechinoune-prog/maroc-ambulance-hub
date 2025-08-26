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
import { Phone, MessageCircle, MapPin, Clock, Users, CheckCircle, Shield, Star, Zap, Hospital, Globe, Award, AlertCircle, Calendar, ExternalLink, Timer, Badge } from "lucide-react";
import { CallButton, WhatsAppButton } from "@/components/ContactCTA";
import CityMap from "@/components/CityMap";
import { SITE_URL } from "@/lib/config";
import { track } from "@/lib/track";

const RabatPage = () => {
  const canonical = `${SITE_URL}/ambulance-rabat`;
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    service: "",
    city: "Rabat",
    datetime: "",
    details: ""
  });

  const testimonials = [
    {
      name: "Ahmed M.",
      location: "Hay Riad, Rabat",
      text: "Intervention rapide en 10 minutes à Hay Riad. Personnel très professionnel et équipement médical moderne. Service diplomatique impeccable.",
      rating: 5
    },
    {
      name: "Fatima L.",
      location: "Agdal, Rabat", 
      text: "Transport médicalisé parfait pour ma mère depuis l'hôpital Ibn Sina. Équipe bienveillante et véhicule très propre.",
      rating: 5
    },
    {
      name: "Dr. Karim B.",
      location: "Souissi, Rabat",
      text: "En tant que médecin, je recommande ce service. Matériel conforme aux normes, personnel qualifié. Excellent pour les urgences à Rabat.",
      rating: 5
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    track('form_submit_non_urgent', {
      city: 'Rabat',
      service: formData.service
    });
    // Handle form submission
  };

  const handleCallClick = () => {
    track('click_call', { city: 'Rabat', source: 'hero' });
  };

  const handleWhatsAppClick = () => {
    track('click_whatsapp', { city: 'Rabat', source: 'hero' });
  };

  const handleStickyClick = (type: 'call' | 'whatsapp') => {
    track('sticky_bar_click', { city: 'Rabat', type });
  };
  
  const jsonLdMultiple = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Ambulance Privée Maroc – Rabat",
      "url": canonical,
      "telephone": "+212777722311",
      "areaServed": ["Rabat","Salé","Témara","Skhirat","Harhoura"],
      "address": { 
        "@type": "PostalAddress", 
        "addressLocality": "Rabat", 
        "addressCountry": "MA" 
      },
      "openingHours": "Mo-Su 00:00-23:59",
      "image": `${SITE_URL}/images/ambulance-hero-rabat.jpg`,
      "sameAs": []
    },
    {
      "@context": "https://schema.org",
      "@type": "EmergencyService",
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
        },
        {
          "@type": "City",
          "name": "Skhirat"
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
        },
        {
          "@type": "Question",
          "name": "Proposez-vous un service d'ambulance pour événements à Rabat ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, nous couvrons les événements officiels, conférences diplomatiques, manifestations publiques et rassemblements à Rabat avec des équipes médicales dédiées et du matériel d'urgence sur site."
          }
        },
        {
          "@type": "Question",
          "name": "Intervenez-vous aussi dans la région Salé-Témara-Skhirat ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolument. Notre couverture s'étend à toute l'agglomération Rabat-Salé-Témara-Skhirat avec des temps d'intervention optimisés et une parfaite connaissance des axes routiers de la région."
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
          "name": "Ambulance Rabat",
          "item": canonical
        }
      ]
    }
  ];

  return (
    <>
      <SEO
        title="Ambulance Rabat – Urgence 24h/24, transfert médicalisé & WhatsApp | Ambulance Privée Maroc"
        description="Ambulance à Rabat 24/7 : intervention 12–15 min, transferts inter-hôpitaux, longue distance, événementiel. Appel & WhatsApp immédiat."
        canonical={canonical}
        jsonLdMultiple={jsonLdMultiple}
        keywords={["ambulance Rabat", "ambulance privée Rabat", "transport médicalisé Rabat", "urgence ambulance Rabat", "ambulance 24h/24 Rabat", "CHU Ibn Sina", "ambulance Agdal", "ambulance Hassan", "ambulance Hay Riad", "ambulance Souissi"]}
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
                  Ambulance privée à Rabat – Urgence 24h/24 & transport médicalisé
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Service d'ambulance professionnel dans la capitale administrative du Maroc. 
                  Intervention rapide pour urgences et transferts médicalisés.
                </p>
                
                {/* Badges de confiance en liste UL avec aria-label */}
                <ul className="space-y-3 mb-8" role="list" aria-label="Badges de confiance et certifications">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-5 w-5 text-success" aria-hidden="true" />
                    <span>✅ Agréé Ministère de la Santé</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Star className="h-5 w-5 text-primary" aria-hidden="true" />
                    <span>⭐ 4.9/5 basé sur +5000 interventions</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Timer className="h-5 w-5 text-primary" aria-hidden="true" />
                    <span>⏱ Temps moyen d'intervention à Rabat : 12–15 min</span>
                  </li>
                </ul>
                
                {/* CTA groupés */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <CallButton
                    phone="+212777722311"
                    onClick={handleCallClick}
                    className="bg-emergency hover:bg-emergency-hover text-emergency-foreground px-8 py-4 text-lg font-semibold rounded-lg flex items-center justify-center gap-2"
                    aria-label="Appeler ambulance Rabat maintenant"
                    data-analytics="cta_call_rabat_hero"
                  >
                    <Phone className="h-5 w-5" />
                    Appeler maintenant
                  </CallButton>
                  <WhatsAppButton
                    phone="+212777722311"
                    text="Urgence ambulance Rabat - Intervention immédiate demandée"
                    onClick={handleWhatsAppClick}
                    className="bg-success hover:bg-success/90 text-success-foreground px-8 py-4 text-lg font-semibold rounded-lg flex items-center justify-center gap-2"
                    aria-label="Contacter WhatsApp ambulance Rabat"
                    data-analytics="cta_wa_rabat_hero"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp immédiat
                  </WhatsAppButton>
                </div>
              </div>
              
              {/* Colonne droite - Image - Hero avec loading="eager" */}
              <div className="relative">
                <img 
                  src="/images/ambulance-hero-rabat.jpg" 
                  alt="Ambulance privée à Rabat devant un établissement de santé"
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
              Nos services à Rabat
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
                    Intervention d'urgence immédiate à Rabat pour toutes situations critiques. Nos ambulances équipées interviennent en moins de 15 minutes 
                    dans les quartiers centraux de Rabat (Hassan, Agdal, Hay Riad, Souissi).
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
                    Transferts inter-hôpitaux Rabat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Transport médicalisé sécurisé entre les établissements de santé de Rabat : CHU Ibn Sina, Hôpital Cheikh Zaid, 
                    Hôpital Avicenne, et Hôpital Militaire Mohamed V avec accompagnement médical spécialisé.
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
                    Transports longue distance depuis Rabat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Évacuations médicalisées de Rabat vers <a href="/ambulance-casablanca" className="text-primary hover:underline font-medium">Casablanca</a>, Fès, Marrakech et autres villes du Maroc. 
                    Transport sécurisé avec équipe médicale dédiée pour les trajets longue distance.
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
                    Assistance événements officiels
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Couverture médicale pour conférences internationales, manifestations officielles et événements diplomatiques 
                    organisés dans la capitale Rabat avec équipes d'intervention dédiées.
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
            <h3 className="text-xl font-semibold text-foreground mb-4">Besoin d'une intervention à Rabat ?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CallButton
                phone="+212777722311"
                onClick={() => track('cta_call_section_services', { city: 'Rabat' })}
                className="bg-emergency hover:bg-emergency-hover text-emergency-foreground px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                aria-label="Appeler ambulance Rabat depuis section services"
                data-analytics="cta_call_rabat_services"
              >
                <Phone className="h-4 w-4" />
                Appeler
              </CallButton>
              <WhatsAppButton
                phone="+212777722311"
                text="Demande ambulance Rabat - Services médicalisés"
                onClick={() => track('cta_whatsapp_section_services', { city: 'Rabat' })}
                className="bg-success hover:bg-success/90 text-success-foreground px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                aria-label="Contacter WhatsApp ambulance Rabat depuis section services"
                data-analytics="cta_wa_rabat_services"
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
              Zones couvertes à Rabat
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
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

              {/* Carte interactive Mapbox */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Carte Rabat-Salé-Témara
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CityMap
                    center={{ lng: -6.8416, lat: 34.0209 }}
                    zoom={11}
                    className="w-full h-64 rounded-lg"
                    showMarker={true}
                  />
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA de section après Zones couvertes */}
          <div className="mb-12 text-center p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border">
            <h3 className="text-xl font-semibold text-foreground mb-4">Besoin d'une intervention à Rabat ?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CallButton
                phone="+212777722311"
                onClick={() => track('cta_call_section_zones', { city: 'Rabat' })}
                className="bg-emergency hover:bg-emergency-hover text-emergency-foreground px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                aria-label="Appeler ambulance Rabat depuis section zones"
                data-analytics="cta_call_rabat_zones"
              >
                <Phone className="h-4 w-4" />
                Appeler
              </CallButton>
              <WhatsAppButton
                phone="+212777722311"
                text="Demande ambulance Rabat - Couverture zones"
                onClick={() => track('cta_whatsapp_section_zones', { city: 'Rabat' })}
                className="bg-success hover:bg-success/90 text-success-foreground px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                aria-label="Contacter WhatsApp ambulance Rabat depuis section zones"
                data-analytics="cta_wa_rabat_zones"
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
              Équipe médicale Rabat
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center border-primary/20">
                <CardHeader>
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <img 
                      src="/images/equipe/ambulancier-rabat.webp"
                      alt="Ambulancier diplômé Rabat"
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
                  <p>Personnel formé aux urgences pré-hospitalières avec certification du Ministère de la Santé du Maroc et connaissance approfondie de Rabat.</p>
                </CardContent>
              </Card>

              <Card className="text-center border-primary/20">
                <CardHeader>
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <img 
                      src="/images/equipe/infirmier-rabat.webp"
                      alt="Infirmier spécialisé urgences Rabat"
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
                  <CardTitle>Infirmiers spécialisés</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Équipe d'infirmiers expérimentés en soins d'urgence et transport médicalisé, disponibles 24h/24 à Rabat pour interventions critiques.</p>
                </CardContent>
              </Card>

              <Card className="text-center border-primary/20">
                <CardHeader>
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <img 
                      src="/images/equipe/medecin-urgence-rabat.webp"
                      alt="Médecin urgentiste Rabat"
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

          {/* Hôpitaux et partenaires avec logos */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
              <Hospital className="h-8 w-8 text-primary" />
              Hôpitaux partenaires à Rabat
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <img 
                      src="/images/logos/chu-ibn-sina-logo.webp"
                      alt="Logo CHU Ibn Sina Rabat"
                      className="w-12 h-12 object-contain"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <div>
                      <CardTitle>CHU Ibn Sina Rabat</CardTitle>
                      <CardDescription>Centre hospitalier universitaire principal</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Partenariat privilégié avec le CHU Ibn Sina de Rabat pour transferts d'urgence et hospitalisations. 
                  Connaissance parfaite des procédures d'admission et coordination directe avec les services d'urgence.</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <img 
                      src="/images/logos/hopital-militaire-mohamed-v-logo.webp"
                      alt="Logo Hôpital Militaire Mohamed V"
                      className="w-12 h-12 object-contain"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <div>
                      <CardTitle>Hôpital Militaire Mohamed V</CardTitle>
                      <CardDescription>Établissement militaire spécialisé</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Transports autorisés vers l'Hôpital Militaire Mohamed V de Rabat avec respect des protocoles de sécurité 
                  et coordination avec les autorités militaires pour les transferts urgents.</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <img 
                      src="/images/logos/cheikh-zaid-logo.webp"
                      alt="Logo Hôpital Cheikh Zaid"
                      className="w-12 h-12 object-contain"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <div>
                      <CardTitle>Hôpital Cheikh Zaid</CardTitle>
                      <CardDescription>Spécialités chirurgicales et cardiologie</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Évacuations vers l'Hôpital Cheikh Zaid de Rabat pour urgences cardiologiques et interventions chirurgicales spécialisées. 
                  Protocoles adaptés aux pathologies complexes.</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <img 
                      src="/images/logos/avicenne-logo.webp"
                      alt="Logo Hôpital Avicenne"
                      className="w-12 h-12 object-contain"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <div>
                      <CardTitle>Hôpital Avicenne</CardTitle>
                      <CardDescription>Urgences pédiatriques et maternité</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Transferts spécialisés vers l'Hôpital Avicenne de Rabat pour urgences pédiatriques, obstétriques et néonatales. 
                  Équipement adapté au transport de nouveau-nés et femmes enceintes.</p>
                </CardContent>
              </Card>
            </div>

            {/* Note globale */}
            <div className="mt-8 text-center p-6 bg-primary/5 rounded-lg border">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-2xl font-bold text-foreground">4.9/5</span> 
              </div>
              <p className="text-muted-foreground">Basé sur plus de 500 avis clients à Rabat</p>
            </div>
          </section>

          {/* Témoignages en grille (plus de carrousel) */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
              <Star className="h-8 w-8 text-primary" />
              Témoignages clients Rabat
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-primary/20">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <CardDescription>{testimonial.location}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">
                      "{testimonial.text}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* FAQ enrichie */}
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
                  <h3 className="text-xl font-semibold">Proposez-vous un service d'ambulance pour événements à Rabat ?</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Oui, nous proposons une couverture médicale complète pour tous types d'événements à Rabat : conférences internationales, 
                    manifestations diplomatiques, événements culturels et rassemblements publics. Nos équipes médicales se déploient sur site 
                    avec matériel d'urgence adapté et ambulances de standby pour intervention immédiate si nécessaire.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Intervenez-vous aussi dans la région Salé-Témara-Skhirat ?</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Absolument. Notre couverture s'étend à toute l'agglomération Rabat-Salé-Témara-Skhirat. Nous disposons d'équipes dédiées 
                    qui connaissent parfaitement les axes routiers, les raccourcis et les points d'accès rapides dans cette zone métropolitaine. 
                    Temps d'intervention optimisés même aux heures de pointe entre Rabat et les villes satellites.
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

              <Card className="border-primary/20">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Avez-vous des partenariats avec d'autres villes ?</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Oui, nous travaillons en réseau avec nos partenaires dans les principales villes du Maroc. Pour les transports longue distance 
                    depuis Rabat, nous coordonnons avec nos équipes <a href="/ambulance-casablanca" className="text-primary hover:underline font-medium">ambulance Casablanca</a>, 
                    Marrakech et Tanger. Consultez aussi notre guide sur <a href="/blog" className="text-primary hover:underline font-medium">"Comment choisir une ambulance privée au Maroc"</a> 
                    pour plus d'informations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA de section après FAQ */}
          <div className="mb-12 text-center p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border">
            <h3 className="text-xl font-semibold text-foreground mb-4">Besoin d'une intervention à Rabat ?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CallButton
                phone="+212777722311"
                onClick={() => track('cta_call_section_faq', { city: 'Rabat' })}
                className="bg-emergency hover:bg-emergency-hover text-emergency-foreground px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                aria-label="Appeler ambulance Rabat depuis section FAQ"
                data-analytics="cta_call_rabat_faq"
              >
                <Phone className="h-4 w-4" />
                Appeler
              </CallButton>
              <WhatsAppButton
                phone="+212777722311"
                text="Demande ambulance Rabat - Questions / réponses"
                onClick={() => track('cta_whatsapp_section_faq', { city: 'Rabat' })}
                className="bg-success hover:bg-success/90 text-success-foreground px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                aria-label="Contacter WhatsApp ambulance Rabat depuis section FAQ"
                data-analytics="cta_wa_rabat_faq"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </WhatsAppButton>
            </div>
          </div>

          {/* Contact urgent restructuré */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
              <Phone className="h-8 w-8 text-primary" />
              Contact urgent - Ambulance Rabat
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Urgence immédiate - carte rouge */}
              <Card className="border-emergency/30 bg-emergency/5">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl text-emergency mb-2">🚨 Urgence Immédiate</CardTitle>
                  <CardDescription className="text-lg">Intervention rapide à Rabat 24h/24</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <div className="text-4xl font-bold text-emergency">
                    +212 777 722 311
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <CallButton
                      phone="+212777722311"
                      onClick={() => handleStickyClick('call')}
                      className="bg-emergency text-emergency-foreground hover:bg-emergency-hover px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2"
                    >
                      <Phone className="h-5 w-5" />
                      Appeler maintenant
                    </CallButton>
                    
                    <WhatsAppButton
                      phone="+212777722311"
                      text="Urgence ambulance Rabat - Intervention immédiate demandée"
                      onClick={() => handleStickyClick('whatsapp')}
                      className="bg-success hover:bg-success/90 text-success-foreground px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="h-5 w-5" />
                      WhatsApp direct
                    </WhatsAppButton>
                  </div>
                  
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>⏱️ Intervention en 12-15 min à Rabat centre</p>
                    <p>🌍 Couverture Rabat-Salé-Témara-Skhirat</p>
                    <p>🏥 Transport direct CHU Ibn Sina</p>
                  </div>
                </CardContent>
              </Card>

              {/* Demande non urgente - formulaire */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl">Demande non urgente</CardTitle>
                  <CardDescription>Transport programmé, devis ou renseignements</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input 
                        id="phone"
                        type="tel"
                        inputMode="tel"
                        pattern="^(\+212|0)(6|7)\d{8}$"
                        placeholder="+212 6XX XXX XXX"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        autoComplete="tel"
                        aria-required="true"
                        required
                        autoFocus
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="name">Nom complet</Label>
                      <Input 
                        id="name"
                        type="text"
                        placeholder="Votre nom et prénom"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        autoComplete="name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="service">Type de service *</Label>
                      <Select value={formData.service} onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}>
                        <SelectTrigger aria-required="true">
                          <SelectValue placeholder="Sélectionnez un service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="urgence-non-vitale">Urgence non vitale</SelectItem>
                          <SelectItem value="transfert">Transfert inter-hôpitaux</SelectItem>
                          <SelectItem value="longue-distance">Longue distance</SelectItem>
                          <SelectItem value="evenement">Événement</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="city">Ville</Label>
                      <Input 
                        id="city"
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                        disabled
                        className="bg-muted"
                      />
                    </div>

                    <div>
                      <Label htmlFor="datetime">Date & heure souhaitées</Label>
                      <Input 
                        id="datetime"
                        type="datetime-local"
                        value={formData.datetime}
                        onChange={(e) => setFormData(prev => ({ ...prev, datetime: e.target.value }))}
                        min={new Date().toISOString().slice(0, 16)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Laissez vide pour "Dès que possible"
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="details">Détails de la demande *</Label>
                      <Textarea 
                        id="details"
                        placeholder="Ex: Transfert vers CHU Ibn Sina demain 09:00, fauteuil roulant requis"
                        value={formData.details}
                        onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
                        rows={3}
                        aria-required="true"
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-primary hover:bg-primary/90"
                      data-analytics="lead_submit_rabat"
                    >
                      Être rappelé en 2–3 minutes
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center">
                      ✅ Réponse sous 5 minutes • 🔒 Données protégées
                    </p>
                    
                    <p className="text-center text-sm text-muted-foreground">
                      ou <WhatsAppButton
                        phone="+212777722311"
                        text="Demande d'information ambulance Rabat"
                        className="text-primary hover:underline font-medium inline"
                        aria-label="Contacter sur WhatsApp pour demande non urgente"
                      >
                        contactez-nous sur WhatsApp
                      </WhatsAppButton>
                    </p>
                  </form>
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
            
            {/* Maillage interne footer optimisé */}
            <div className="mt-6 pt-6 border-t border-primary/20">
              <h4 className="font-semibold text-foreground mb-4">Nos services dans d'autres villes :</h4>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <a href="/ambulance-casablanca" className="text-primary hover:underline">Ambulance Casablanca</a>
                <a href="/ambulance-marrakech" className="text-primary hover:underline">Ambulance Marrakech</a>
                <a href="/ambulance-tanger" className="text-primary hover:underline">Ambulance Tanger</a>
                <a href="/blog" className="text-primary hover:underline">Blog Ambulance Maroc</a>
                <a href="/blog/comment-choisir-ambulance-privee-fiable-maroc" className="text-primary hover:underline">Guide: Choisir son ambulance</a>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky CTA Mobile amélioré avec aria-label et h-12 */}
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-sm border-t border-border shadow-lg p-3" role="navigation" aria-label="Actions rapides">
          <div className="flex gap-2">
            <CallButton
              phone="+212777722311"
              onClick={() => handleStickyClick('call')}
              className="flex-1 h-12 bg-emergency hover:bg-emergency/90 text-emergency-foreground px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 border border-emergency/50"
              aria-label="Appeler ambulance Rabat immédiatement"
              data-analytics="cta_call_rabat_sticky"
            >
              <Phone className="h-4 w-4" />
              📞 Appeler
            </CallButton>
            
            <WhatsAppButton
              phone="+212777722311"
              text="Urgence ambulance Rabat - Intervention immédiate demandée"
              onClick={() => handleStickyClick('whatsapp')}
              className="flex-1 h-12 bg-success hover:bg-success/90 text-success-foreground px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 border border-success/50"
              aria-label="Contacter WhatsApp ambulance Rabat immédiatement"
              data-analytics="cta_wa_rabat_sticky"
            >
              <MessageCircle className="h-4 w-4" />
              💬 WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default RabatPage;