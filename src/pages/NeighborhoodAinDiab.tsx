import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/config";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";

const NEIGHBORHOOD_NAME = "Ain Diab";
const NEIGHBORHOOD_SLUG = "ain-diab";
const PAGE_URL = `${SITE_URL}/ambulance-casablanca-${NEIGHBORHOOD_SLUG}`;

export default function NeighborhoodAinDiab() {
  const title = `Ambulance ${NEIGHBORHOOD_NAME} – Casablanca 24/7`;
  const description = `Ambulance à ${NEIGHBORHOOD_NAME} (Casablanca) : intervention rapide 24/7, accès Corniche et axes côtiers, transferts médicalisés et urgences.`;

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "EmergencyService",
    name: "Ambulance Maroc – Ain Diab",
    url: PAGE_URL,
    areaServed: "Ain Diab, Casablanca, Morocco",
    telephone: "+212777722311",
    availableService: [
      "Ambulance d'urgence",
      "Transport médicalisé",
      "Transfert inter-hôpitaux",
    ],
    servesLocation: {
      "@type": "Place",
      name: "Ain Diab, Casablanca",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Casablanca",
        addressRegion: "Casablanca-Settat",
        addressCountry: "MA",
      },
    },
  } as const;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Quel est le délai moyen d'intervention à Ain Diab ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le délai moyen est de 8 à 12 minutes selon la circulation sur la Corniche et les voies côtières.",
        },
      },
      {
        "@type": "Question",
        name: "Quels repères donner pour faciliter l'arrivée de l'ambulance ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Indiquez un repère clair comme la Corniche, Morocco Mall, une plage (Ain Diab, Lalla Meryem) ou un rond‑point à proximité.",
        },
      },
      {
        "@type": "Question",
        name: "Intervenez‑vous la nuit et le week‑end ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, notre équipe est disponible 24h/24 et 7j/7 avec personnel qualifié et matériel adapté.",
        },
      },
    ],
  } as const;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${title} | Ambulance Maroc`}
        description={description}
        canonical={PAGE_URL}
        keywords={[
          `ambulance ${NEIGHBORHOOD_NAME}`,
          "ambulance casablanca",
          "transport médicalisé casablanca",
          "ambulance corniche",
        ]}
        jsonLdMultiple={[businessSchema, faqSchema]}
      />

      <Header city={`Casablanca – ${NEIGHBORHOOD_NAME}`} />

      <main>
        {/* Hero */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden" aria-label={`Ambulance ${NEIGHBORHOOD_NAME}`}>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/src/assets/ambulance-hero.jpg')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
          </div>
          <img src="/src/assets/ambulance-hero.jpg" alt={`Ambulance ${NEIGHBORHOOD_NAME} – Casablanca`} className="sr-only" />

          <div className="relative container mx-auto px-4 py-16">
            <div className="max-w-4xl space-y-6 text-white">
              <div className="inline-flex items-center bg-card/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                <MapPin className="h-4 w-4 mr-2 text-emergency" />
                Intervention à Ain Diab (Casablanca)
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Ambulance à <span className="text-emergency">Ain Diab</span> – Intervention 24/7
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Accès rapides par la Corniche et les boulevards côtiers. Équipe qualifiée, matériel médical complet.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button variant="emergency" size="lg" className="text-lg px-8 py-4 h-auto" asChild>
                  <a href="tel:+212777722311" className="flex items-center justify-center">
                    <Phone className="h-6 w-6 mr-3" /> Appeler maintenant
                  </a>
                </Button>
                <Button variant="success" size="lg" className="text-lg px-8 py-4 h-auto" asChild>
                  <a href="https://wa.me/212777722311" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 mr-3" /> WhatsApp direct
                  </a>
                </Button>
                <Button variant="cta" size="lg" className="text-lg px-8 py-4 h-auto bg-white text-primary hover:bg-white/90" asChild>
                  <a href="#demande-ambulance">Demander une ambulance</a>
                </Button>
              </div>

              <div className="pt-4 flex flex-wrap gap-4 text-white/90">
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                  <Clock className="h-5 w-5 mr-2 text-success" />
                  <span className="font-medium">Délai moyen 8–12 min</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                  <span className="font-medium">Accès Corniche / axes côtiers</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                  <span className="font-medium">Personnel qualifié</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Points clés Ain Diab */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Points clés à Ain Diab</h2>
            <ul className="space-y-3 text-gray-700">
              <li>• Donnez un repère clair: Corniche, Morocco Mall, plage Ain Diab/Lalla Meryem, rond‑point.</li>
              <li>• En soirée et week‑end, la Corniche est très fréquentée: anticipez l'accès et indiquez l'entrée la plus proche.</li>
              <li>• Préparez l'accès à l'immeuble/parking, badge d'ascenseur si nécessaire.</li>
              <li>• Informez sur allergies, traitements en cours et état du patient.</li>
            </ul>
          </div>
        </section>

        {/* Itinéraires et accès */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Itinéraires et accès rapides</h2>
              <p className="text-gray-700 mb-4">Nos ambulances privilégient:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Boulevard de la Corniche et Boulevard de l'Océan Atlantique</li>
                <li>Sorties rapides vers Route d'Azemmour et Aïn Diab Extension</li>
                <li>Accès par Ghandi / Sidi Abderrahmane selon l'encombrement</li>
              </ul>
            </div>
            <div className="relative">
              <img
                src="/src/assets/medical-team.jpg"
                alt="Équipe médicale – Ambulance Ain Diab Casablanca"
                loading="lazy"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-lg" />
            </div>
          </div>
        </section>

        {/* FAQ rapide */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">FAQ – Ambulance Ain Diab</h2>
            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900">Comment optimiser l'arrivée de l'ambulance ?</h3>
                <p>Envoyez votre localisation, indiquez un repère (Corniche, plage, mall) et préparez l'accès au site.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Quels types de prises en charge ?</h3>
                <p>Urgences, transferts inter‑hôpitaux, transport médicalisé, assistance événements sur la Corniche.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA + lien vers page ville */}
        <section id="demande-ambulance" className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Besoin d'une ambulance à Ain Diab ?</h2>
              <p className="text-gray-700">Contact immédiat 24/7. Consultez aussi la page générale pour {""}
                <a href="/ambulance-casablanca" className="text-primary underline hover:opacity-90">Ambulance Casablanca</a>.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="emergency" asChild>
                <a href="tel:+212777722311"><Phone className="h-4 w-4 mr-2" /> Appeler</a>
              </Button>
              <Button variant="success" asChild>
                <a href="https://wa.me/212777722311" target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4 mr-2" /> WhatsApp</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
