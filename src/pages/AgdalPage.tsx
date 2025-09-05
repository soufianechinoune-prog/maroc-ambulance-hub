import { useState } from 'react';
import { Phone, MapPin, Clock, Star, Users, Heart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SmartBreadcrumb from '@/components/SmartBreadcrumb';
import { CallButton, WhatsAppButton } from '@/components/ContactCTA';
import { track } from '@/lib/track';

export default function AgdalPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    track('agdal_contact_form_submit', { location: 'agdal' });
    console.log('Form submitted:', formData);
    setFormData({ name: '', phone: '', message: '' });
  };

  const handleCallClick = () => {
    track('agdal_call_click', { location: 'agdal' });
  };

  const handleWhatsAppClick = () => {
    track('agdal_whatsapp_click', { location: 'agdal' });
  };

  const jsonLdMultiple = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Ambulance Privée Agdal Rabat",
      "description": "Service d'ambulance privée à Agdal, Rabat. Intervention rapide 24h/24, transport médicalisé, équipe qualifiée.",
      "url": "https://www.ambulance-privee.ma/ambulance-rabat-agdal",
      "telephone": "+212777722311",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Agdal, Rabat",
        "addressCountry": "MA"
      },
      "openingHours": "Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59",
      "availableService": [
        {
          "@type": "MedicalService",
          "name": "Transport d'urgence Agdal",
          "description": "Intervention d'urgence 24h/24 dans le quartier Agdal"
        },
        {
          "@type": "MedicalService", 
          "name": "Transport médicalisé Agdal",
          "description": "Transport médicalisé sécurisé entre établissements de soins"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Quel est le temps d'intervention pour une ambulance à Agdal ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Notre temps d'intervention moyen à Agdal est de 8 à 15 minutes, optimisé grâce à notre connaissance parfaite du quartier et de ses axes de circulation."
          }
        },
        {
          "@type": "Question", 
          "name": "L'ambulance peut-elle accéder facilement aux résidences d'Agdal ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, nos ambulances sont parfaitement adaptées aux voies d'Agdal, y compris l'accès aux résidences, aux établissements universitaires et aux cliniques du quartier."
          }
        }
      ]
    }
  ];

  return (
    <>
      <SEO
        title="Ambulance Rabat Agdal – Ambulance privée Agdal 24/7"
        description="Ambulance Rabat Agdal: intervention rapide 24/7 à Agdal. Ambulance privée Agdal, transport médicalisé. Appelez +212 7777 223 11."
        canonical="https://www.ambulance-privee.ma/ambulance-rabat-agdal"
        keywords={["Ambulance Rabat Agdal", "ambulance privée Agdal", "ambulance rabat", "ambulance privée rabat", "transport médicalisé Agdal", "urgence médicale Agdal"]}
        jsonLdMultiple={jsonLdMultiple}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        <SmartBreadcrumb />
        
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                  Ambulance Rabat Agdal – Intervention 24/7
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Service d'ambulance privée spécialisé dans le quartier Agdal à Rabat. 
                  Intervention rapide 8-15 minutes, équipe médicale qualifiée, transport médicalisé sécurisé.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <CallButton 
                    phone="+212777722311" 
                    className="flex-1" 
                    onClick={handleCallClick}
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Appel d'urgence
                  </CallButton>
                  <WhatsAppButton 
                    phone="+212777722311" 
                    text="Urgence ambulance Agdal"
                    className="flex-1"
                    onClick={handleWhatsAppClick}
                  >
                    WhatsApp
                  </WhatsAppButton>
                </div>
                
                {/* Spécificités d'Agdal */}
                <Card className="bg-white/50 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-primary" />
                      Couverture spécialisée Agdal
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Campus universitaire Mohammed V</li>
                      <li>• Cliniques et cabinets médicaux d'Agdal</li>
                      <li>• Résidences et quartiers résidentiels</li>
                      <li>• Avenue Moulay Hassan et axes principaux</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="relative">
                <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-center">
                    <Zap className="h-16 w-16 text-primary mx-auto mb-4" />
                    <p className="text-xl font-semibold">Intervention Express Agdal</p>
                    <p className="text-muted-foreground">8-15 minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Services d'ambulance à Agdal</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="mr-2 h-5 w-5 text-primary" />
                    Urgences 24h/24
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Intervention d'urgence immédiate dans tout le quartier Agdal, 
                    avec accès facilité au campus universitaire et aux résidences.
                  </p>
                  <ul className="text-sm space-y-2">
                    <li>• Malaises et accidents</li>
                    <li>• Urgences médicales</li>
                    <li>• Évacuations sanitaires</li>
                    <li>• Transport vers CHU Ibn Sina</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="mr-2 h-5 w-5 text-primary" />
                    Transport médicalisé
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Transferts programmés entre les cliniques d'Agdal et les hôpitaux, 
                    avec accompagnement médical personnalisé.
                  </p>
                  <ul className="text-sm space-y-2">
                    <li>• Transferts inter-hôpitaux</li>
                    <li>• Rendez-vous médicaux</li>
                    <li>• Dialyse et chimiothérapie</li>
                    <li>• Retours à domicile</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5 text-primary" />
                    Équipe spécialisée
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Professionnels de santé expérimentés, parfaitement formés aux 
                    spécificités du quartier Agdal et du milieu universitaire.
                  </p>
                  <ul className="text-sm space-y-2">
                    <li>• Ambulanciers diplômés</li>
                    <li>• Matériel de réanimation</li>
                    <li>• Formation continue</li>
                    <li>• Protocoles d'urgence</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Zone de couverture */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Zone d'intervention Agdal</h2>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-6">Couverture complète du quartier Agdal</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Campus universitaire</h4>
                      <p className="text-sm text-muted-foreground">
                        Université Mohammed V, résidences étudiantes, cités universitaires
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Établissements médicaux</h4>
                      <p className="text-sm text-muted-foreground">
                        Cliniques privées d'Agdal, cabinets médicaux spécialisés
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Zones résidentielles</h4>
                      <p className="text-sm text-muted-foreground">
                        Quartiers résidentiels, villas, appartements d'Agdal
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Axes principaux</h4>
                      <p className="text-sm text-muted-foreground">
                        Avenue Moulay Hassan, Boulevard Mohamed V, Avenue Al Michlifen
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-primary" />
                    Temps d'intervention
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-primary mb-2">8-15 min</div>
                    <p className="text-muted-foreground">Délai moyen d'arrivée à Agdal</p>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Campus universitaire:</span>
                      <span className="font-medium">5-10 min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Centre d'Agdal:</span>
                      <span className="font-medium">8-12 min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Périphérie d'Agdal:</span>
                      <span className="font-medium">12-15 min</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Questions fréquentes - Ambulance Agdal</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quel est le temps d'intervention pour une ambulance à Agdal ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Notre temps d'intervention moyen à Agdal est de 8 à 15 minutes, optimisé grâce à notre 
                    connaissance parfaite du quartier et de ses axes de circulation. Pour le campus universitaire, 
                    nous arrivons généralement en 5-10 minutes.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">L'ambulance peut-elle accéder facilement aux résidences d'Agdal ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Oui, nos ambulances sont parfaitement adaptées aux voies d'Agdal, y compris l'accès aux 
                    résidences, aux établissements universitaires et aux cliniques du quartier. Nous connaissons 
                    toutes les voies d'accès et les parkings disponibles.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quels hôpitaux desservez-vous depuis Agdal ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Nous assurons le transport vers tous les hôpitaux de Rabat : CHU Ibn Sina, Hôpital des Spécialités, 
                    cliniques privées de Rabat et Salé. Nous choisissons l'établissement le plus adapté selon l'urgence 
                    et les besoins médicaux.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Vos tarifs pour les interventions à Agdal ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Nos tarifs sont transparents et adaptés aux distances parcourues dans Agdal. 
                    Contactez-nous au +212 777 722 311 pour un devis personnalisé selon votre situation 
                    et destination. Prise en charge possible par certaines assurances.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Contact Ambulance Agdal</h2>
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-6">Demande non urgente</h3>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <Input
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                  <Input
                    placeholder="Votre téléphone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                  <Textarea
                    placeholder="Décrivez votre besoin (transport programmé, devis...)"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={4}
                  />
                  <Button type="submit" className="w-full">
                    Envoyer la demande
                  </Button>
                </form>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-6">Urgence - Contact immédiat</h3>
                <div className="space-y-4">
                  <CallButton 
                    phone="+212777722311" 
                    className="w-full" 
                    onClick={handleCallClick}
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    +212 777 722 311
                  </CallButton>
                  
                  <WhatsAppButton 
                    phone="+212777722311" 
                    text="Urgence ambulance Agdal Rabat"
                    className="w-full"
                    onClick={handleWhatsAppClick}
                  >
                    WhatsApp Urgence
                  </WhatsAppButton>
                </div>
                
                <div className="mt-8 p-4 bg-primary/10 rounded-lg">
                  <h4 className="font-medium mb-2">Service 24h/24 - 7j/7</h4>
                  <p className="text-sm text-muted-foreground">
                    Notre équipe d'ambulanciers qualifiés est disponible en permanence 
                    pour toute urgence médicale dans le quartier Agdal et ses environs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Sticky Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 lg:hidden z-50">
          <div className="flex gap-2">
            <CallButton 
              phone="+212777722311" 
              className="flex-1" 
              onClick={handleCallClick}
            >
              <Phone className="mr-2 h-4 w-4" />
              Appeler
            </CallButton>
            <WhatsAppButton 
              phone="+212777722311" 
              text="Urgence ambulance Agdal"
              className="flex-1"
              onClick={handleWhatsAppClick}
            >
              WhatsApp
            </WhatsAppButton>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}