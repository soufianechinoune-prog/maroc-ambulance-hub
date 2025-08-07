
import { useParams } from "react-router-dom";
import { cities } from "@/data/cities";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReassuranceSection from "@/components/ReassuranceSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactForm from "@/components/ContactForm";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MessageCircle, MapPin, Clock, Users, CheckCircle } from "lucide-react";
const CityPage = () => {
  const { citySlug } = useParams();
  
  // Extract city slug from URL path (handle both /ambulance-city and /city formats)
  const extractSlugFromPath = () => {
    const path = window.location.pathname;
    if (path.startsWith('/ambulance-')) {
      return path.replace('/ambulance-', '');
    }
    return path.replace('/', '');
  };
  
  const slug = citySlug || extractSlugFromPath();
  const city = cities.find(c => c.slug === slug);
  const siteUrl = "https://www.ambulance-maroc.ma";

  // SEO data optimisé pour chaque ville
  const seoData = {
    casablanca: {
      title: "Ambulance Casablanca - Service d'Urgence 24h/24 | Ambulance Maroc",
      description: "Besoin d'une ambulance à Casablanca ? Service rapide, professionnel et disponible 24h/24 pour toutes vos urgences médicales. Contactez-nous immédiatement.",
    },
    rabat: {
      title: "Ambulance Rabat - Service d'Urgence Médicale & Transport Sanitaire",
      description: "Urgence médicale à Rabat ? Nos ambulances interviennent 7j/7. Transport patient, accident, hospitalisation. Réservez maintenant.",
    },
    marrakech: {
      title: "🚑 Ambulance Marrakech - Intervention rapide 24h/24 | Ambulance Maroc",
      description: "Besoin d'une ambulance à Marrakech ? Nos équipes interviennent 24h/24 en moins de 15 min. Services médicaux, touristiques et urgences. 📞 +212 7777 223 11",
    },
    tanger: {
      title: "Ambulance Tanger - Service Médical 24h/24 | Ambulance Maroc",
      description: "Urgence ou transport médical à Tanger ? Nos ambulances sont prêtes à intervenir 24h/24, avec du personnel qualifié et une couverture sur toute la région.",
    },
    agadir: {
      title: "Ambulance Agadir - Service 24h/24 pour Urgence & Transfert Médical",
      description: "Besoin d'une ambulance à Agadir ? Transport d'urgence, transfert médicalisé, assistance hospitalière. Contactez-nous immédiatement.",
    },
    fes: {
      title: "Ambulance Fès - Transport Sanitaire d'Urgence 24h/24",
      description: "Ambulance à Fès disponible 24/7. Service de transport médical, urgence, transfert vers hôpital. Appelez maintenant pour intervention rapide.",
    },
    meknes: {
      title: "Ambulance Meknès - Urgences Médicales & Transport Sanitaire",
      description: "Service d'ambulance rapide et efficace à Meknès. Transfert vers hôpitaux, urgence médicale, assistance 24h/24.",
    },
    oujda: {
      title: "Ambulance Oujda - Intervention Immédiate & Transfert Hospitalier",
      description: "Ambulance disponible à Oujda pour toute urgence. Transport médicalisé et hospitalisation. Appelez une équipe professionnelle 24h/24.",
    },
    tetouan: {
      title: "Ambulance Tétouan - Service Ambulancier 24/7",
      description: "Ambulance à Tétouan pour urgences, accident, hospitalisation ou transfert médical. Disponible tous les jours.",
    },
    laayoune: {
      title: "Ambulance Laâyoune - Transport Médical Rapid et Fiable",
      description: "Intervention ambulanciere à Laâyoune en urgence. Transfert hospitalier, assistance médicale, prise en charge rapide.",
    },
    mohammedia: {
      title: "Ambulance Mohammedia - Services Sanitaires Immédiats",
      description: "Ambulance privée à Mohammedia disponible pour urgence et hospitalisation. Intervention express et accompagnement médical.",
    },
    kenitra: {
      title: "Ambulance Kénitra - Transport Ambulancier Rapide 24h/24",
      description: "Service ambulance à Kénitra : urgences, transferts hospitaliers, accidents. Intervention immédiate avec équipe qualifiée.",
    },
  };

  const cityData = seoData[city?.slug] || {};
  const title = cityData.title || `Ambulance à ${city?.name} – Intervention rapide 24/7 | Ambulance Maroc` || "Ville non trouvée";
  const description = cityData.description || `Ambulance à ${city?.name}, intervention 24/7. Temps de réponse ${city?.responseTime}. ${city?.coverage}.` || "";
  const canonical = city ? `${siteUrl}/ambulance-${city.slug}` : `${siteUrl}/`;

  // JSON-LD spécifique pour Marrakech
  const marrakechJsonLd = city?.slug === 'marrakech' ? {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Ambulance Marrakech",
    "image": "https://www.ambulance-maroc.ma/images/ambulance-marrakech.jpg",
    "url": "https://www.ambulance-maroc.ma/ambulance-marrakech",
    "telephone": "+212777722311",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Marrakech",
      "addressCountry": "MA"
    },
    "openingHours": "24/7",
    "areaServed": {
      "@type": "City",
      "name": "Marrakech"
    }
  } : undefined;

  const jsonLd = city ? (marrakechJsonLd || {
    "@context": "https://schema.org",
    "@type": "EmergencyService",
    "name": `Ambulance ${city.name}`,
    "areaServed": city.name,
    "url": canonical,
    "telephone": city.phone,
    "serviceArea": city.serviceArea,
    "availableService": ["Emergency medical transport", "Inter-hospital transfer", "Event standby"],
    "openingHours": "Mo-Su 00:00-23:59",
    "priceRange": "$$",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `Services d'ambulance à ${city.name}`,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Transport d'urgence",
            "description": `Service d'ambulance d'urgence 24h/24 à ${city.name}`
          }
        }
      ]
    }
  }) : undefined;

  if (!city) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Ville non trouvée</h1>
            <p className="text-xl text-gray-600 mb-8">
              Cette ville n'est pas encore dans notre zone de couverture.
            </p>
            <Button asChild>
              <a href="tel:+212777722311">Contactez-nous</a>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO title={title} description={description} canonical={canonical} jsonLd={jsonLd} />
      <Header city={city.name} />
      
      {/* Hero Section - Identique à la Home Page mais personnalisée */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden" aria-label={`Service d'ambulance à ${city.name}`}>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/src/assets/ambulance-hero.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
        </div>
        <img src="/src/assets/ambulance-hero.jpg" alt={`Ambulance à ${city.name} – intervention rapide au Maroc`} className="sr-only" />

        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl">
            <div className="space-y-6">
              {/* Location Badge */}
              <div className="inline-flex items-center bg-card/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                Service disponible à {city.name}
              </div>

               {/* Main Heading */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Ambulance à <span className="text-emergency">{city.name}</span> – Intervention 24/7
              </h1>
              
              <div className="text-xl md:text-2xl text-white/90 space-y-2">
                <p>Intervention rapide 24h/24 et 7j/7</p>
                <p className="font-semibold">Temps de réponse : {city.responseTime}</p>
              </div>

              {/* Key Features */}
              <div className="flex flex-wrap gap-4 text-white/90">
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                  <Clock className="h-5 w-5 mr-2 text-success" />
                  <span className="font-medium">Réponse {city.responseTime}</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                  <div className="h-5 w-5 mr-2 bg-success rounded-full flex items-center justify-center">
                    <div className="h-2 w-2 bg-white rounded-full"></div>
                  </div>
                  <span className="font-medium">Personnel qualifié</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                  <div className="h-5 w-5 mr-2 bg-emergency rounded-full flex items-center justify-center text-white text-xs font-bold">
                    +
                  </div>
                  <span className="font-medium">Équipement médical</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button 
                  variant="emergency" 
                  size="lg" 
                  className="text-lg px-8 py-4 h-auto"
                  asChild
                >
                  <a href="tel:+212777722311" className="flex items-center justify-center">
                    <Phone className="h-6 w-6 mr-3" />
                    📞 Appelez maintenant
                  </a>
                </Button>
                
                <Button 
                  variant="success" 
                  size="lg" 
                  className="text-lg px-8 py-4 h-auto"
                  asChild
                >
                  <a href="https://wa.me/212777722311" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 mr-3" />
                    💬 WhatsApp direct
                  </a>
                </Button>
                
                <Button 
                  variant="cta" 
                  size="lg" 
                  className="text-lg px-8 py-4 h-auto bg-white text-primary hover:bg-white/90"
                  asChild
                >
                  <a href="#demande-ambulance" className="flex items-center justify-center">
                    🚑 Demander une ambulance
                  </a>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-8 flex flex-wrap gap-6 text-white/80 text-sm">
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-success rounded-full mr-2"></div>
                  Agréé par le Ministère de la Santé
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-success rounded-full mr-2"></div>
                  + de 5000 interventions/an
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-success rounded-full mr-2"></div>
                  Couverture {city.region}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Emergency Contact (Mobile) */}
        <div className="fixed bottom-4 right-4 z-50 lg:hidden">
          <Button variant="emergency" size="lg" className="rounded-full shadow-2xl" asChild>
            <a href="tel:+212777722311">
              <Phone className="h-6 w-6" />
            </a>
          </Button>
        </div>
      </section>

      {/* City Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-emergency">Temps de Réponse</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">{city.responseTime}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle>Couverture</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">{city.coverage}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle>Population</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">{city.population}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle>Région</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-gray-900">{city.region}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* City Description */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Service d'Ambulance à {city.name}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {city.description}
              </p>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Spécificités locales :</h3>
                <ul className="space-y-3">
                  {city.specificities.map((spec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/src/assets/medical-team.jpg" 
                alt={`Équipe médicale ${city.name}`}
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu SEO spécifique pour Casablanca */}
      {city.slug === 'casablanca' && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Service Ambulance Casablanca 24h/24 et 7j/7</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Ambulance Maroc propose un <strong>service d'ambulance à Casablanca</strong> ultra-réactif, sécurisé et adapté à tous les types de situations : urgences vitales, transferts médicaux, hospitalisations planifiées ou soins à domicile.
              Nous opérons dans tous les quartiers de Casablanca : Maârif, Gauthier, Sidi Maarouf, Hay Hassani, Anfa, Ain Sebaâ, Derb Sultan, etc.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">👨‍⚕️ Ambulance privée à Casablanca avec personnel qualifié</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nos ambulances sont équipées pour le <strong>transport médicalisé à Casablanca</strong>. Chaque intervention est assurée par un personnel qualifié : auxiliaires ambulanciers, infirmiers, médecins d'urgence selon le cas.
              Le tout, dans un cadre réglementé, sécurisé et conforme aux standards nationaux et internationaux.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Disponibilité dans toute la région du Grand Casablanca</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nous intervenons dans les zones urbaines comme périphériques : Bouskoura, Dar Bouazza, Nouaceur, Lissasfa, Aïn Diab, etc.
              <strong> Notre centrale d'appel est disponible 24h/24</strong> pour vous orienter, répondre à vos questions ou planifier un transfert.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">💬 Comment nous contacter ?</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Un seul numéro pour toutes vos demandes à Casablanca : <strong>Appelez le <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline">+212 7777 223 11</a></strong> ou cliquez sur notre bouton WhatsApp pour une réponse immédiate.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Pourquoi choisir Ambulance Maroc ?</h3>
            <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
              <li>✅ Réactivité 24h/24 dans toute la ville</li>
              <li>✅ Personnel médical formé et expérimenté</li>
              <li>✅ Ambulances modernes et bien équipées</li>
              <li>✅ Intervention dans tous les arrondissements de Casablanca</li>
              <li>✅ Service d'<strong>ambulance privé Casablanca</strong> pour particuliers et entreprises</li>
            </ul>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
              <div className="space-y-2 text-gray-700">
                <p>📞 Téléphone : <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline font-semibold">+212 7777 223 11</a></p>
                <p>📍 Casablanca & périphérie</p>
                <p>🕐 Service 24h/24 – 7j/7</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contenu SEO spécifique pour Marrakech */}
      {city.slug === 'marrakech' && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Service Ambulance Marrakech 24h/24 et 7j/7</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Que vous soyez un résident, un professionnel de santé ou un visiteur, <strong>notre service d'ambulance à Marrakech</strong> est prêt à intervenir à tout moment. Nous couvrons toute la ville : Guéliz, Médina, Ménara, Hivernage, route de Casablanca, route de l'Ourika ou encore Targa.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">👨‍⚕️ Ambulance privée à Marrakech avec personnel qualifié</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Chaque intervention se fait avec un véhicule équipé, un brancard sécurisé et un personnel médical ou paramédical. 
              <strong>Urgence ou transfert programmé</strong>, nous assurons tous les types de déplacements vers les cliniques et hôpitaux de Marrakech.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Zone d'intervention à Marrakech et alentours</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nous intervenons à Marrakech mais aussi dans la région : Tahannaout, Amizmiz, Ourika, Aït Ourir, ou Chichaoua. 
              Appelez notre <strong>standard 24h/24</strong> pour organiser une intervention immédiate ou planifiée.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">💬 Contactez-nous</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Appelez-nous directement au <strong><a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline">+212 7777 223 11</a></strong> ou envoyez-nous un message sur WhatsApp via le bouton sur notre site.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Pourquoi faire appel à Ambulance Maroc à Marrakech ?</h3>
            <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
              <li>✅ Disponibilité 24h/24 – 7j/7</li>
              <li>✅ Ambulances modernes, climatisées et équipées</li>
              <li>✅ Équipe médicale formée et réactive</li>
              <li>✅ Couverture de Marrakech et sa région</li>
              <li>✅ Intervention rapide à domicile, clinique, hôtel ou lieu public</li>
            </ul>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
              <div className="space-y-2 text-gray-700">
                <p>📞 Téléphone : <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline font-semibold">+212 7777 223 11</a></p>
                <p>📍 Marrakech & alentours</p>
                <p>🕐 Disponible 24h/24 – 7j/7</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contenu SEO spécifique pour Tanger */}
      {city.slug === 'tanger' && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Service Ambulance Tanger 24h/24 et 7j/7</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Que vous soyez un résident, un professionnel ou un visiteur, <strong>notre service d'ambulance à Tanger</strong> est prêt à intervenir à tout moment pour répondre à vos besoins médicaux.
              Nous couvrons toutes les zones de Tanger : Malabata, centre-ville, Marshan, Branes, Mghogha, ainsi que la zone franche, l'aéroport ou le port de Tanger Med.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">👨‍⚕️ Ambulance privée à Tanger avec prise en charge complète</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Chaque intervention se fait avec un équipement médical complet, et une équipe formée : auxiliaires ambulanciers, infirmiers ou médecins selon les cas. 
              <strong>Nous assurons aussi bien les urgences que les transferts programmés</strong> vers les hôpitaux publics ou cliniques privées.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Zone d'intervention étendue sur toute la région de Tanger-Tétouan</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nous intervenons à Tanger mais aussi à Tétouan, Fnideq, M'diq, Assilah ou Ksar El Kebir. 
              Appelez notre <strong>centre de coordination disponible 24h/24</strong> pour planifier un transport ou demander une ambulance en urgence.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">💬 Comment nous joindre ?</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Vous pouvez nous appeler directement au <strong><a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline">+212 7777 223 11</a></strong> ou cliquer sur le bouton WhatsApp depuis notre site pour une réponse immédiate.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Pourquoi faire appel à Ambulance Maroc à Tanger ?</h3>
            <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
              <li>✅ Service disponible 24h/24 et 7j/7</li>
              <li>✅ Couverture de toute la région Nord</li>
              <li>✅ Ambulances équipées et climatisées</li>
              <li>✅ Personnel qualifié, parlant arabe, français et parfois espagnol</li>
              <li>✅ Assistance aux passagers de ferry, touristes ou entreprises</li>
            </ul>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
              <div className="space-y-2 text-gray-700">
                <p>📞 Téléphone : <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline font-semibold">+212 7777 223 11</a></p>
                <p>📍 Tanger & région Nord</p>
                <p>🕐 Service 24h/24 – 7j/7</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Reassurance Section */}
      <ReassuranceSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Emergency CTA */}
      <section className="bg-emergency text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Urgence Médicale à {city.name} ?
          </h2>
          <p className="text-xl mb-8">
            Notre équipe intervient rapidement dans toute la ville en {city.responseTime} en moyenne
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="tel:+212777722311" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Appelez: +212 7777 223 11
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20" asChild>
              <a href="https://wa.me/212777722311" className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                WhatsApp Direct
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Contact Form */}
      <div id="demande-ambulance" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Demande d'Intervention à {city.name}
            </h2>
            <p className="text-xl text-gray-600">
              Formulaire pour les demandes non urgentes
            </p>
          </div>
          <ContactForm />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CityPage;
