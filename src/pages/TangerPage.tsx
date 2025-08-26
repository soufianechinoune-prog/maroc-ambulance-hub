import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { 
  Phone, 
  MessageCircle, 
  Clock, 
  MapPin, 
  Shield, 
  Users, 
  Zap,
  CheckCircle,
  Anchor,
  Building2,
  Plane,
  Ship
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CallButton, WhatsAppButton } from "@/components/ContactCTA";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { useState } from "react";

const PHONE = "+212777722311";
const WHATSAPP_TEXT = "Bonjour, j'ai besoin d'une ambulance à Tanger";

export default function TangerPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.service) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    toast.success("Demande envoyée ! Nous vous rappelons sous 2 minutes.");
    setFormData({ name: "", phone: "", service: "", date: "", message: "" });
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Ambulance Privée Tanger - Ambulance Maroc",
    "description": "Service d'ambulance privée à Tanger disponible 24/7. Intervention rapide, transport médicalisé et urgences médicales dans toute la région Nord.",
    "url": "https://www.ambulance-privee.ma/ambulance-tanger",
    "telephone": "+212777722311",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Tanger",
      "addressRegion": "Tanger-Tétouan-Al Hoceïma",
      "addressCountry": "MA"
    },
    "openingHours": "Mo-Su 00:00-23:59",
    "priceRange": "500-1400 MAD",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 35.7595,
        "longitude": -5.8340
      },
      "geoRadius": "50000"
    },
    "medicalSpecialty": [
      "Emergency Medicine",
      "Patient Transport",
      "Medical Equipment Transport"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Quel est le temps moyen d'arrivée d'une ambulance à Tanger ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le temps moyen d'arrivée de nos ambulances à Tanger est de 15-20 minutes en zone urbaine. Pour les quartiers périphériques ou Tanger Med, comptez 20-30 minutes selon la localisation."
        }
      },
      {
        "@type": "Question", 
        "name": "Est-ce que vous couvrez Tanger Med et la zone franche ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, nous couvrons intégralement Tanger Med, la zone franche TFZ et toutes les zones industrielles et portuaires de Tanger. Nos équipes sont habituées aux interventions dans ces secteurs stratégiques."
        }
      },
      {
        "@type": "Question",
        "name": "Puis-je réserver un transport médicalisé longue distance depuis Tanger ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolument. Nous proposons des transports médicalisés longue distance depuis Tanger vers toutes les villes du Maroc : Casablanca, Rabat, Fès, Marrakech. Devis sur mesure selon la destination."
        }
      },
      {
        "@type": "Question",
        "name": "Est-ce que le service est disponible pour les événements à Tanger ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, nous proposons une couverture médicale pour tous types d'événements à Tanger : festivals, conférences, salons, événements sportifs ou culturels. Devis personnalisé selon vos besoins."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Ambulance privée Tanger — Intervention rapide 24/7</title>
        <meta name="description" content="Ambulance privée à Tanger disponible 24/7. Temps de réponse moyen 15 min. Urgences, transferts, longue distance et événements. Appelez dès maintenant !" />
        <link rel="canonical" href="https://www.ambulance-privee.ma/ambulance-tanger" />
        <meta name="keywords" content="ambulance Tanger, ambulance privée Tanger, transport médicalisé Tanger, ambulance urgence Tanger, ambulance port Tanger Med, ambulance zone franche Tanger" />
        
        {/* OpenGraph */}
        <meta property="og:title" content="Ambulance privée Tanger — Intervention rapide 24/7" />
        <meta property="og:description" content="Ambulance privée à Tanger disponible 24/7. Temps de réponse moyen 15 min. Urgences, transferts, longue distance et événements." />
        <meta property="og:url" content="https://www.ambulance-privee.ma/ambulance-tanger" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ambulance privée Tanger — Intervention rapide 24/7" />
        <meta name="twitter:description" content="Service d'ambulance à Tanger 24/7. Intervention rapide en 15 min." />
      </Helmet>

      {/* JSON-LD Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center lg:text-left">
            <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20">
              <MapPin className="w-4 h-4 mr-2" />
              Tanger - Porte de l'Europe
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Ambulance privée à <span className="text-yellow-400">Tanger</span> — Intervention rapide 24/7
            </h1>
            
            <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed">
              Temps de réponse moyen 15–20 minutes • Couverture Tanger & région Nord • Service agréé Ministère de la Santé
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              <div className="flex items-center bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <Shield className="w-5 h-5 mr-2 text-green-400" />
                <span>Agréé Ministère</span>
              </div>
              <div className="flex items-center bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <Clock className="w-5 h-5 mr-2 text-yellow-400" />
                <span>15 min moyenne</span>
              </div>
              <div className="flex items-center bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <Users className="w-5 h-5 mr-2 text-blue-400" />
                <span>+4000 interventions/an</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <CallButton
                phone={PHONE}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                Appeler maintenant
              </CallButton>
              
              <WhatsAppButton
                phone={PHONE}
                text={WHATSAPP_TEXT}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </WhatsAppButton>
            </div>
          </div>
        </div>

        {/* Floating Emergency Contact */}
        <div className="fixed bottom-4 right-4 z-50 lg:hidden">
          <CallButton
            phone={PHONE}
            className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-2xl animate-pulse"
          >
            <Phone className="w-6 h-6" />
          </CallButton>
        </div>
      </section>

      {/* Bloc spécifique Tanger */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
              Tanger : Service d'ambulance transfrontalier et régional
            </h2>
            
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed">
                <strong>Tanger, porte de l'Europe</strong>, bénéficie d'un service d'ambulance transfrontalier et régional adapté à la zone portuaire, industrielle et touristique. Notre équipe spécialisée intervient dans toute la région Nord avec une parfaite connaissance des spécificités locales.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                    Zones couvertes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> Médina</span>
                    <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> Malabata</span>
                    <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> Marshan</span>
                    <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> Iberia</span>
                    <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> Beni Makada</span>
                    <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> Tanger Med</span>
                    <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> Zone Franche TFZ</span>
                    <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> Aéroport</span>
                    <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> Tétouan</span>
                    <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> Fnideq</span>
                    <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> M'diq</span>
                    <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> Assilah</span>
                    <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-600" /> Ksar El Kebir</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="w-5 h-5 mr-2 text-primary" />
                    Particularités Tanger
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start">
                    <Ship className="w-5 h-5 mr-2 mt-1 text-blue-600" />
                    <span className="text-sm">Service portuaire spécialisé (Tanger Med)</span>
                  </div>
                  <div className="flex items-start">
                    <Plane className="w-5 h-5 mr-2 mt-1 text-green-600" />
                    <span className="text-sm">Transport ferry/aéroport</span>
                  </div>
                  <div className="flex items-start">
                    <Building2 className="w-5 h-5 mr-2 mt-1 text-orange-600" />
                    <span className="text-sm">Couverture entreprises industrielles</span>
                  </div>
                  <div className="flex items-start">
                    <Anchor className="w-5 h-5 mr-2 mt-1 text-blue-800" />
                    <span className="text-sm">Coordination internationale</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services principaux */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Nos services d'ambulance à Tanger
          </h2>
          
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            <Card className="group hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                  <Zap className="w-8 h-8 text-red-600" />
                </div>
                <CardTitle className="text-xl">Urgences médicales 24/7</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">Intervention immédiate pour toute urgence médicale dans Tanger et sa région.</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <Building2 className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Transport inter-hôpitaux</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">Transferts sécurisés entre établissements de santé à Tanger.</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <MapPin className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Transport longue distance</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">Transports médicalisés vers toutes les villes du Maroc depuis Tanger.</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Couverture événements</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">Couverture médicale pour festivals, conférences et salons à Tanger.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Preuve sociale & crédibilité */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Agréé Ministère de la Santé</h3>
                <p className="text-gray-600 text-sm">Certification officielle et contrôles qualité réguliers</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">+4 000 interventions/an</h3>
                <p className="text-gray-600 text-sm">Dans la région Nord du Maroc</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-10 h-10 text-yellow-600" />
                </div>
                <h3 className="font-semibold mb-2">15 minutes</h3>
                <p className="text-gray-600 text-sm">Temps moyen d'intervention à Tanger</p>
              </div>
            </div>

            {/* Témoignages */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-lg">★</span>
                      ))}
                    </div>
                  </div>
                  <blockquote className="text-gray-700 mb-4">
                    "Intervention très rapide suite à un malaise dans la zone franche. L'équipe était professionnelle et très rassurante. Merci !"
                  </blockquote>
                  <cite className="text-sm text-gray-500">— Fatima K., Tanger Med</cite>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-lg">★</span>
                      ))}
                    </div>
                  </div>
                  <blockquote className="text-gray-700 mb-4">
                    "Transport médicalisé Tanger-Casablanca parfaitement organisé. Ma mère était en sécurité durant tout le trajet."
                  </blockquote>
                  <cite className="text-sm text-gray-500">— Ahmed M., Malabata</cite>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Infos pratiques */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Informations pratiques
          </h2>
          
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-semibold mb-2">⏱️ Temps moyen</h3>
              <p className="text-gray-600">15 minutes d'intervention</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">📍 Zones couvertes</h3>
              <p className="text-gray-600">Tanger & région Nord</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">📞 Numéro unique</h3>
              <p className="text-gray-600">+212 7777 223 11</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">💬 WhatsApp</h3>
              <p className="text-gray-600">Disponible 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Questions fréquentes sur nos services à Tanger
            </h2>
            
            <Accordion type="single" collapsible>
              <AccordionItem value="temps-arrivee">
                <AccordionTrigger>Quel est le temps moyen d'arrivée d'une ambulance à Tanger ?</AccordionTrigger>
                <AccordionContent>
                  Le temps moyen d'arrivée de nos ambulances à Tanger est de 15-20 minutes en zone urbaine. Pour les quartiers périphériques ou Tanger Med, comptez 20-30 minutes selon la localisation exacte.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="tanger-med">
                <AccordionTrigger>Est-ce que vous couvrez Tanger Med et la zone franche ?</AccordionTrigger>
                <AccordionContent>
                  Oui, nous couvrons intégralement Tanger Med, la zone franche TFZ et toutes les zones industrielles et portuaires de Tanger. Nos équipes sont habituées aux interventions dans ces secteurs stratégiques.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="longue-distance">
                <AccordionTrigger>Puis-je réserver un transport médicalisé longue distance depuis Tanger ?</AccordionTrigger>
                <AccordionContent>
                  Absolument. Nous proposons des transports médicalisés longue distance depuis Tanger vers toutes les villes du Maroc : Casablanca, Rabat, Fès, Marrakech. Devis sur mesure selon la destination.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="evenements">
                <AccordionTrigger>Est-ce que le service est disponible pour les événements à Tanger ?</AccordionTrigger>
                <AccordionContent>
                  Oui, nous proposons une couverture médicale pour tous types d'événements à Tanger : festivals, conférences, salons, événements sportifs ou culturels. Devis personnalisé selon vos besoins.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Formulaire de demande */}
      <section className="py-16" id="demande">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                🚑 Demander une ambulance à Tanger
              </h2>
              <p className="text-gray-600">
                Remplissez ce formulaire et nous vous rappelons immédiatement
              </p>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nom complet *</label>
                      <Input 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Votre nom"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Téléphone *</label>
                      <Input 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+212..."
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Type de service *</label>
                      <Select value={formData.service} onValueChange={(value) => setFormData({...formData, service: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir un service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="urgence">Urgence médicale</SelectItem>
                          <SelectItem value="transport">Transport inter-hôpitaux</SelectItem>
                          <SelectItem value="longue-distance">Transport longue distance</SelectItem>
                          <SelectItem value="evenement">Couverture événement</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Date/Heure souhaitée</label>
                      <Input 
                        type="datetime-local"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message complémentaire</label>
                    <Textarea 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Détails de votre demande..."
                      rows={4}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-3">
                    📞 Demander une ambulance maintenant
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <div className="text-center mt-6">
              <p className="text-gray-600 mb-4">Ou contactez-nous directement :</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CallButton
                  phone={PHONE}
                  className="inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Appeler
                </CallButton>
                
                <WhatsAppButton
                  phone={PHONE}
                  text={WHATSAPP_TEXT}
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
                </WhatsAppButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer localisé */}
      <section className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">
            Disponible 24/7 — Tanger & toute la région Nord
          </h3>
          <p className="text-xl mb-6 text-blue-100">
            Numéro d'urgence : <span className="font-bold text-yellow-400">+212 777 722 311</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CallButton
              phone={PHONE}
              className="inline-flex items-center justify-center px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              Appeler maintenant
            </CallButton>
            
            <WhatsAppButton
              phone={PHONE}
              text={WHATSAPP_TEXT}
              className="inline-flex items-center justify-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp rapide
            </WhatsAppButton>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}