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
        "name": "Quel est le temps moyen d'arrivée d'une ambulance privée à Tanger ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le temps moyen d'arrivée de nos ambulances à Tanger est de 15-20 minutes en zone urbaine. Pour les quartiers périphériques ou Tanger Med, comptez 20-30 minutes selon la localisation."
        }
      },
      {
        "@type": "Question", 
        "name": "Quel est le prix d'une ambulance privée à Tanger ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le tarif de notre ambulance privée à Tanger varie de 500 à 1400 MAD selon le type d'intervention : urgences locales, transferts inter-hôpitaux ou transport longue distance. Devis gratuit par téléphone."
        }
      },
      {
        "@type": "Question", 
        "name": "Intervenez-vous jusqu'à Tétouan, Fnideq et M'diq ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, notre service d'ambulance privée couvre toute la région Nord : Tétouan (45 min depuis Tanger), Fnideq et M'diq (1h), ainsi qu'Assilah et Ksar El Kebir. Tarification adaptée selon la distance."
        }
      },
      {
        "@type": "Question",
        "name": "Est-ce que vous couvrez Tanger Med et la zone franche TFZ ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolument. Nous couvrons intégralement Tanger Med, la zone franche TFZ et toutes les zones industrielles et portuaires de Tanger. Nos équipes sont habituées aux interventions dans ces secteurs stratégiques et disposent des autorisations nécessaires."
        }
      },
      {
        "@type": "Question",
        "name": "Peut-on réserver un transport médicalisé longue distance depuis Tanger ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, nous proposons des transports médicalisés longue distance depuis Tanger vers toutes les villes du Maroc : Casablanca (3h), Rabat (2h30), Fès (4h), Marrakech (6h). Équipement médical complet et personnel qualifié à bord."
        }
      },
      {
        "@type": "Question",
        "name": "Vos ambulances sont-elles équipées pour les urgences cardiaques ou pédiatriques ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nos ambulances à Tanger sont équipées d'un défibrillateur, monitoring cardiaque, matériel de réanimation adulte et pédiatrique. Personnel formé aux urgences vitales et transport néonatal."
        }
      },
      {
        "@type": "Question",
        "name": "Est-ce que le service est disponible pour les événements à Tanger ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, nous proposons une couverture médicale pour tous types d'événements à Tanger : festivals, conférences internationales, salons professionnels, événements sportifs ou culturels. Devis personnalisé selon la durée et le nombre de participants."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Ambulance privée à Tanger | Urgences 24/7, transport médicalisé & inter-hôpitaux</title>
        <meta name="description" content="Ambulance privée agréée à Tanger. Urgences médicales 24/7, transferts inter-hôpitaux, transport médicalisé région Nord et Tanger Med. Intervention rapide." />
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
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-blue-900/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center lg:text-left">
            <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20">
              <MapPin className="w-4 h-4 mr-2" />
              Tanger - Porte de l'Europe
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Ambulance privée à <span className="text-yellow-400">Tanger</span> – Urgences médicales 24h/24, transferts inter-hôpitaux & transport médicalisé région Nord
            </h1>
            
            <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed">
              Temps de réponse moyen 15–20 minutes • Couverture Tanger & région Nord • Service agréé Ministère de la Santé
            </p>

            {/* Texte introductif riche SEO */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 text-left">
              <p className="text-lg text-blue-50 leading-relaxed">
                <strong className="text-white">Tanger, capitale économique du Nord du Maroc</strong>, bénéficie d'un service d'ambulance privée d'excellence adapté aux besoins spécifiques de cette métropole stratégique. Avec le <strong className="text-yellow-200">port Tanger Med</strong>, la <strong className="text-yellow-200">zone franche TFZ</strong> et un secteur industriel en pleine expansion, notre <strong className="text-white">ambulance privée à Tanger</strong> répond aux exigences des entreprises, résidents et visiteurs. 
              </p>
              <p className="text-lg text-blue-50 leading-relaxed mt-3">
                Nos équipes spécialisées en <strong className="text-yellow-200">transport médicalisé Tanger</strong> maîtrisent parfaitement les infrastructures locales : autoroutes vers Tétouan, accès rapide à <strong className="text-yellow-200">Tanger Med</strong>, coordination avec les établissements de santé régionaux. Que ce soit pour une <strong className="text-white">urgence médicale à Tanger</strong>, un transfert inter-hôpitaux ou un transport longue distance, notre service garantit sécurité et réactivité 24h/24.
              </p>
            </div>

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
                  <p className="text-gray-700 mb-4">
                    <strong>Nous intervenons dans tous les quartiers stratégiques de Tanger et jusqu'aux principales villes de la région Nord.</strong>
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <Link to="#medina" className="flex items-center hover:text-primary transition-colors group">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600 group-hover:text-primary" /> 
                      <span className="underline decoration-dotted">Médina</span>
                    </Link>
                    <Link to="#malabata" className="flex items-center hover:text-primary transition-colors group">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600 group-hover:text-primary" /> 
                      <span className="underline decoration-dotted">Malabata</span>
                    </Link>
                    <Link to="#marshan" className="flex items-center hover:text-primary transition-colors group">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600 group-hover:text-primary" /> 
                      <span className="underline decoration-dotted">Marshan</span>
                    </Link>
                    <Link to="#iberia" className="flex items-center hover:text-primary transition-colors group">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600 group-hover:text-primary" /> 
                      <span className="underline decoration-dotted">Iberia</span>
                    </Link>
                    <Link to="#beni-makada" className="flex items-center hover:text-primary transition-colors group">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600 group-hover:text-primary" /> 
                      <span className="underline decoration-dotted">Beni Makada</span>
                    </Link>
                    <Link to="#tanger-med" className="flex items-center hover:text-primary transition-colors group">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600 group-hover:text-primary" /> 
                      <span className="underline decoration-dotted">Tanger Med</span>
                    </Link>
                    <Link to="#zone-franche-tfz" className="flex items-center hover:text-primary transition-colors group">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600 group-hover:text-primary" /> 
                      <span className="underline decoration-dotted">Zone Franche TFZ</span>
                    </Link>
                    <Link to="#aeroport" className="flex items-center hover:text-primary transition-colors group">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600 group-hover:text-primary" /> 
                      <span className="underline decoration-dotted">Aéroport</span>
                    </Link>
                    <Link to="#tetouan" className="flex items-center hover:text-primary transition-colors group">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600 group-hover:text-primary" /> 
                      <span className="underline decoration-dotted">Tétouan</span>
                    </Link>
                    <Link to="#fnideq" className="flex items-center hover:text-primary transition-colors group">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600 group-hover:text-primary" /> 
                      <span className="underline decoration-dotted">Fnideq</span>
                    </Link>
                    <Link to="#mdiq" className="flex items-center hover:text-primary transition-colors group">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600 group-hover:text-primary" /> 
                      <span className="underline decoration-dotted">M'diq</span>
                    </Link>
                    <Link to="#assilah" className="flex items-center hover:text-primary transition-colors group">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600 group-hover:text-primary" /> 
                      <span className="underline decoration-dotted">Assilah</span>
                    </Link>
                    <Link to="#ksar-el-kebir" className="flex items-center hover:text-primary transition-colors group">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600 group-hover:text-primary" /> 
                      <span className="underline decoration-dotted">Ksar El Kebir</span>
                    </Link>
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
                <p className="text-gray-500 text-sm mt-2">Équipement médical complet à bord, personnel qualifié aux urgences vitales.</p>
                <p className="text-gray-500 text-sm">Temps de réponse moyen : 15 minutes en zone urbaine.</p>
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
                <p className="text-gray-500 text-sm mt-2">Coordination avec les hôpitaux publics et privés de Tanger.</p>
                <p className="text-gray-500 text-sm">Monitoring médical continu pendant le transport.</p>
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
                <p className="text-gray-500 text-sm mt-2">Casablanca (3h), Rabat (2h30), Fès (4h), Marrakech (6h).</p>
                <p className="text-gray-500 text-sm">Équipe médicale dédiée et équipement adapté au trajet.</p>
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
                <p className="text-gray-500 text-sm mt-2">Festivals internationaux, salons professionnels, événements sportifs.</p>
                <p className="text-gray-500 text-sm">Équipe sur site et ambulance en standby selon vos besoins.</p>
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    "Service professionnel lors d'un transfert Tanger-Rabat. Personnel rassurant et matériel médical complet."
                  </blockquote>
                  <cite className="text-sm text-gray-500">— Samir B., Tétouan</cite>
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
                    "Équipe très réactive pour une urgence cardiaque à domicile. Prise en charge immédiate et transport rapide vers l'hôpital."
                  </blockquote>
                  <cite className="text-sm text-gray-500">— Nadia L., Iberia</cite>
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
                    "Couverture médicale parfaite lors de notre salon au Tanger Med. Personnel disponible et discret."
                  </blockquote>
                  <cite className="text-sm text-gray-500">— Youssef A., Organisateur d'événements</cite>
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
                <AccordionTrigger>Quel est le temps moyen d'arrivée d'une ambulance privée à Tanger ?</AccordionTrigger>
                <AccordionContent>
                  Le temps moyen d'arrivée de nos ambulances à Tanger est de 15-20 minutes en zone urbaine. Pour les quartiers périphériques ou Tanger Med, comptez 20-30 minutes selon la localisation exacte.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="prix">
                <AccordionTrigger>Quel est le prix d'une ambulance privée à Tanger ?</AccordionTrigger>
                <AccordionContent>
                  Le tarif de notre ambulance privée à Tanger varie de 500 à 1400 MAD selon le type d'intervention : urgences locales (500-800 MAD), transferts inter-hôpitaux (600-1000 MAD) ou transport longue distance (1000-1400 MAD). Devis gratuit par téléphone.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="region-nord">
                <AccordionTrigger>Intervenez-vous jusqu'à Tétouan, Fnideq et M'diq ?</AccordionTrigger>
                <AccordionContent>
                  Oui, notre service d'ambulance privée couvre toute la région Nord : Tétouan (45 min depuis Tanger), Fnideq et M'diq (1h), ainsi qu'Assilah et Ksar El Kebir. Tarification adaptée selon la distance.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="tanger-med">
                <AccordionTrigger>Est-ce que vous couvrez Tanger Med et la zone franche TFZ ?</AccordionTrigger>
                <AccordionContent>
                  Absolument. Nous couvrons intégralement Tanger Med, la zone franche TFZ et toutes les zones industrielles et portuaires de Tanger. Nos équipes sont habituées aux interventions dans ces secteurs stratégiques et disposent des autorisations nécessaires.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="longue-distance">
                <AccordionTrigger>Peut-on réserver un transport médicalisé longue distance depuis Tanger ?</AccordionTrigger>
                <AccordionContent>
                  Oui, nous proposons des transports médicalisés longue distance depuis Tanger vers toutes les villes du Maroc : Casablanca (3h), Rabat (2h30), Fès (4h), Marrakech (6h). Équipement médical complet et personnel qualifié à bord.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="equipement">
                <AccordionTrigger>Vos ambulances sont-elles équipées pour les urgences cardiaques ou pédiatriques ?</AccordionTrigger>
                <AccordionContent>
                  Nos ambulances à Tanger sont équipées d'un défibrillateur, monitoring cardiaque, matériel de réanimation adulte et pédiatrique. Personnel formé aux urgences vitales et transport néonatal.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="evenements">
                <AccordionTrigger>Est-ce que le service est disponible pour les événements à Tanger ?</AccordionTrigger>
                <AccordionContent>
                  Oui, nous proposons une couverture médicale pour tous types d'événements à Tanger : festivals, conférences internationales, salons professionnels, événements sportifs ou culturels. Devis personnalisé selon la durée et le nombre de participants.
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
                  
                  <div className="text-center mt-4">
                    <p className="text-green-600 font-medium text-sm">
                      ⏱ Réponse en moins de 5 minutes – service disponible 24/7.
                    </p>
                  </div>
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

      {/* Sticky Bottom Bar Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-gray-200 shadow-lg">
        <div className="flex">
          <CallButton
            phone={PHONE}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 px-4 flex items-center justify-center font-semibold transition-colors"
          >
            <Phone className="w-5 h-5 mr-2" />
            📞 Urgence 24/7
          </CallButton>
          
          <WhatsAppButton
            phone={PHONE}
            text={WHATSAPP_TEXT}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 px-4 flex items-center justify-center font-semibold transition-colors"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            💬 WhatsApp direct
          </WhatsAppButton>
        </div>
      </div>

      {/* Spacer for sticky bar on mobile */}
      <div className="h-16 lg:hidden" />
    </>
  );
}