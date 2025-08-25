import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SmartBreadcrumb from "@/components/SmartBreadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MessageCircle, MapPin, Clock, Users, CheckCircle, Shield, Star, Zap, Hospital, Globe, Award, ChevronLeft, ChevronRight, AlertCircle, Calendar, ExternalLink } from "lucide-react";
import { CallButton, WhatsAppButton } from "@/components/ContactCTA";
import ContactForm from "@/components/ContactForm";
import { SITE_URL } from "@/lib/config";

const RabatPage = () => {
  const canonical = `${SITE_URL}/ambulance-rabat`;
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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
    }
  ];

  return (
    <>
      <SEO
        title="Ambulance Rabat 24/7 – Urgences & Transport médicalisé privé"
        description="Ambulance privée à Rabat disponible 24/7. Urgences, transferts inter-hôpitaux, diplomatiques et longue distance. Temps moyen 12 min."
        canonical={canonical}
        jsonLdMultiple={jsonLdMultiple}
        keywords={["ambulance Rabat", "ambulance privée Rabat", "transport médicalisé Rabat", "urgence ambulance Rabat", "ambulance 24h/24 Rabat", "CHU Ibn Sina", "ambulance Agdal", "ambulance Hassan", "ambulance Hay Riad", "ambulance Souissi"]}
      />
      <Header />
      
      <main className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
        <div className="container mx-auto px-4 py-8">
          <SmartBreadcrumb />
          
          {/* Hero Section avec image de couverture */}
          <section className="relative mb-12 rounded-xl overflow-hidden">
            <div className="relative h-96 bg-gradient-to-r from-primary/20 to-primary/10 flex items-center justify-center">
              <img 
                src="/images/ambulance-hero-rabat.jpg" 
                alt="Ambulance privée Rabat devant CHU Ibn Sina"
                className="absolute inset-0 w-full h-full object-cover opacity-30"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  🚑 Ambulance privée à Rabat – Urgence 24h/24 & transport médicalisé
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  En tant que capitale administrative du Maroc, Rabat requiert des services d'ambulance adaptés aux spécificités diplomatiques et institutionnelles. 
                  Notre équipe intervient 24h/24 dans toute l'agglomération Rabat-Salé-Témara.
                </p>
                
                {/* CTA Héro */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-emergency hover:bg-emergency-hover text-emergency-foreground px-8 py-4 text-lg font-semibold">
                    <Phone className="mr-2 h-5 w-5" />
                    📞 Urgence Immédiate
                  </Button>
                  <Button size="lg" className="bg-success hover:bg-success/90 text-success-foreground px-8 py-4 text-lg font-semibold">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    💬 WhatsApp Direct
                  </Button>
                </div>
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
              Nos Services à Rabat
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

            {/* Mini carte Google Maps */}
            <div className="mt-8">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Zone d'intervention Rabat-Salé-Témara
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106673.9785120789!2d-6.906616199999999!3d34.020882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76b871f50c5c1%3A0x7ac946ed7408076b!2sRabat%2C%20Morocco!5e0!3m2!1sen!2s!4v1635000000000!5m2!1sen!2s"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                    ></iframe>
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

          {/* Témoignages Rabat - Carrousel */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
              <Star className="h-8 w-8 text-primary" />
              Témoignages clients Rabat
            </h2>
            
            {/* Carrousel */}
            <div className="relative">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <Card className="border-primary/20 max-w-2xl mx-auto">
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
                          <p className="text-muted-foreground text-lg italic">
                            "{testimonial.text}"
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation carrousel */}
              <div className="flex justify-center gap-4 mt-6">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentTestimonial(Math.max(0, currentTestimonial - 1))}
                  disabled={currentTestimonial === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Précédent
                </Button>
                <div className="flex items-center gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentTestimonial ? 'bg-primary' : 'bg-muted'
                      }`}
                      onClick={() => setCurrentTestimonial(index)}
                    />
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentTestimonial(Math.min(testimonials.length - 1, currentTestimonial + 1))}
                  disabled={currentTestimonial === testimonials.length - 1}
                >
                  Suivant
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
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
            
            {/* Maillage interne footer */}
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

        {/* Sticky CTA Mobile */}
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-sm border-t border-border shadow-lg p-4">
          <div className="flex gap-2">
            <CallButton
              phone="+212777722311"
              className="flex-1 bg-emergency hover:bg-emergency-hover text-emergency-foreground px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Phone className="h-4 w-4" />
              📞 Appeler
            </CallButton>
            
            <WhatsAppButton
              phone="+212777722311"
              text="Urgence ambulance Rabat - Intervention immédiate demandée"
              className="flex-1 bg-success hover:bg-success/90 text-success-foreground px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2"
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