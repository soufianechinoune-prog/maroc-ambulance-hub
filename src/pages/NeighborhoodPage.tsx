import { useMemo } from "react"
import { useParams, Link, Navigate, useLocation } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import SEO from "@/components/SEO"
import { SITE_URL } from "@/lib/config"
import { Button } from "@/components/ui/button"
import { neighborhoodsByCity } from "@/data/neighborhoods"
import { cities } from "@/data/cities"
import NeighborhoodCarousel from "@/components/NeighborhoodCarousel"
import ReassuranceSection from "@/components/ReassuranceSection"
import ServicesSection from "@/components/ServicesSection"
import TestimonialsSection from "@/components/TestimonialsSection"
import ContactForm from "@/components/ContactForm"
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react"
import { toSlug } from "@/lib/slug"

const PHONE_DISPLAY = "0777 22 23 11"
const PHONE_TEL = "+212777722311"

export default function NeighborhoodPage() {
  const { city: cityParam, district, slug: slugParam } = useParams()
  const location = useLocation()

  // Support both patterns:
  // 1) /ambulance-:city-:district (cityParam + district provided)
  // 2) /ambulance-:slug where slug = "city-district" (fallback)
  const parsed = useMemo(() => {
    if (cityParam || district) return null
    const s = slugParam || (location.pathname.startsWith('/ambulance-') ? location.pathname.replace('/ambulance-', '').replace(/\/$/, '') : '')
    if (!s) return null
    const idx = s.indexOf('-')
    if (idx === -1) return null
    const city = toSlug(s.slice(0, idx))
    const dist = toSlug(s.slice(idx + 1))
    return { city, district: dist }
  }, [cityParam, district, slugParam, location.pathname])

  const citySlug = (cityParam || parsed?.city || "casablanca").toLowerCase()
  const list = neighborhoodsByCity[citySlug] || neighborhoodsByCity["casablanca"]
  const districtSlug = toSlug((district || parsed?.district || "") as string)
  const n = useMemo(
    () => list.find((q) => q.slug === districtSlug),
    [districtSlug, list]
  )

  // Si aucun quartier ne correspond, redirige vers la page ville
  if (!n) return <Navigate to={`/ambulance-${citySlug}`} replace />

  const toTitle = (s: string) => s.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ')
const cityName = toTitle(citySlug)

  const city = useMemo(() => (
    cities.find((c) => c.slug === citySlug) || cities.find((c) => c.slug === "casablanca")!
  ), [citySlug])

  const title = `Ambulance ${n.name} (${cityName}) – Intervention 24/7`
  const description =
    n.intro ||
    `Ambulance ${n.name} à ${cityName} : intervention rapide 24h/24 et 7j/7, transport médicalisé et inter‑hôpitaux, numéros utiles et zones couvertes.`
  const canonical = `${SITE_URL}/ambulance-${citySlug}-${n.slug}`

  const WHATSAPP = `https://wa.me/212777722311?text=${encodeURIComponent(
    `Bonjour, j’ai besoin d’une ambulance à ${cityName}.`
  )}`

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: `Ambulance ${cityName}`, item: `${SITE_URL}/ambulance-${citySlug}` },
      { "@type": "ListItem", position: 3, name: n.name, item: canonical },
    ],
  }

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Ambulance ${n.name} – ${cityName}`,
    areaServed: { "@type": "City", name: cityName, address: { "@type": "PostalAddress", addressLocality: n.name } },
    provider: { "@type": "Organization", name: "Ambulance Maroc" },
    url: canonical,
  }

  return (
    <>
      <SEO title={title} description={description} canonical={canonical} jsonLdMultiple={[breadcrumbLd, serviceLd]} />
      <Header city={city.name} />

      {/* Bande contextuelle des quartiers (carrousel) */}
      <NeighborhoodCarousel citySlug={citySlug} cityName={cityName} />

      {/* Hero Section (identique au visuel ville, adapté au quartier) */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden" aria-label={`Service d'ambulance à ${n.name} (${cityName})`}>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/src/assets/ambulance-hero.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
        </div>
        <img src="/src/assets/ambulance-hero.jpg" alt={`Ambulance à ${n.name} – ${cityName}`} className="sr-only" />

        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl">
            <div className="space-y-6">
              {/* Badge localisation */}
              <div className="inline-flex items-center bg-card/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                Service disponible à {n.name} – {cityName}
              </div>

              {/* Titre principal */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Ambulance à <span className="text-emergency">{n.name}</span> – Intervention 24/7
              </h1>

              {/* Sous-titres */}
              <div className="text-xl md:text-2xl text-white/90 space-y-2">
                <p>Intervention rapide 24h/24 et 7j/7</p>
                <p className="font-semibold">Temps de réponse : {city.responseTime}</p>
              </div>

              {/* Points clés */}
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

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button 
                  variant="emergency" 
                  size="lg" 
                  className="text-lg px-8 py-4 h-auto"
                  asChild
                >
                  <a href={`tel:${PHONE_TEL}`} className="flex items-center justify-center">
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
                  <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
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

              {/* Indicateurs de confiance */}
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

        {/* Bouton urgence flottant (mobile) */}
        <div className="fixed bottom-4 right-4 z-50 lg:hidden">
          <Button variant="emergency" size="lg" className="rounded-full shadow-2xl" asChild>
            <a href={`tel:${PHONE_TEL}`}>
              <Phone className="h-6 w-6" />
            </a>
          </Button>
        </div>
      </section>

      {/* Statistiques ville */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center border rounded-lg bg-card">
              <div className="p-6">
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-emergency font-bold text-lg mb-1">Temps de Réponse</div>
                <div className="text-3xl font-bold text-foreground">{city.responseTime}</div>
              </div>
            </div>
            <div className="text-center border rounded-lg bg-card">
              <div className="p-6">
                <div className="text-primary mx-auto mb-2 font-semibold">Couverture</div>
                <div className="text-3xl font-bold text-foreground">{city.coverage}</div>
              </div>
            </div>
            <div className="text-center border rounded-lg bg-card">
              <div className="p-6">
                <div className="text-primary mx-auto mb-2 font-semibold">Population</div>
                <div className="text-3xl font-bold text-foreground">{city.population}</div>
              </div>
            </div>
            <div className="text-center border rounded-lg bg-card">
              <div className="p-6">
                <div className="text-primary mx-auto mb-2 font-semibold">Région</div>
                <div className="text-lg font-semibold text-foreground">{city.region}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description locale adaptée au quartier */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Service d'Ambulance à {n.name} ({city.name})
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                {city.description}
              </p>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Spécificités locales :</h3>
                <ul className="space-y-3">
                  {city.specificities.map((spec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="inline-block h-2 w-2 rounded-full bg-primary mt-2" />
                      <span className="text-foreground/80">{spec}</span>
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

      {/* Contenu quartier détaillé */}
      <section className="container mx-auto max-w-screen-2xl px-4 lg:px-8 py-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <section className="col-span-12 lg:col-span-9 xl:col-span-9">
            <article className="prose prose-slate prose-lg lg:prose-xl max-w-none leading-relaxed md:leading-loose prose-h2:mt-10 prose-h3:mt-6 prose-p:mb-6">
              {n.intro && <p className="text-muted-foreground">{n.intro}</p>}

              <h2>Urgence ambulance à {n.name}</h2>
              <p>
                Une équipe disponible <strong>24/7</strong> sur {n.name} et les quartiers voisins ({(n.nearby || []).join(", ") || `${cityName} centre`}).
                Délais d’intervention optimisés selon le trafic local et les axes recommandés.
              </p>

              <h2>Transport médicalisé & inter‑hôpitaux</h2>
              <p>
                Ambulance avec <strong>personnel soignant</strong> et matériel adapté (oxygène, monitoring…).
                Transferts <em>CHU / cliniques privées</em>, retours à domicile avec surveillance, évacuations programmées.
              </p>

              <h3>Itinéraires & axes</h3>
              <ul>
                {(n.highlights || []).map((h) => <li key={h}>{h}</li>)}
                {(!n.highlights || n.highlights.length === 0) && <li>Axes principaux et voies rapides de {cityName}</li>}
              </ul>

              <h2>Tarifs indicatifs</h2>
              <p>
                En urbain, la fourchette typique observée est <strong>400–1 500 MAD</strong> suivant la distance, le
                niveau d’assistance et le créneau. Contactez‑nous pour un devis précis.
              </p>

              <h2>FAQ quartier {n.name}</h2>
              <h3>Peut‑on réserver la nuit ?</h3>
              <p>Oui, interventions 24h/24 et 7j/7. Les délais peuvent varier selon l’affluence locale.</p>
              <h3>Assurance</h3>
              <p>Certaines mutuelles remboursent une partie du transport sanitaire selon justificatifs.</p>
            </article>
          </section>

          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 rounded-lg border p-4 bg-card text-card-foreground text-sm">
              <p className="font-semibold mb-2">Autres quartiers proches</p>
              <ul className="space-y-1">
                {(n.nearby || []).map((q) => {
                  const nb = list.find((x) => x.name.toLowerCase().replace(/\s+/g, "-") === q.toLowerCase().replace(/\s+/g, "-"))
                  const href = nb ? `/ambulance-${citySlug}-${nb.slug}` : `/ambulance-${citySlug}`
                  return (
                    <li key={q}>
                      <Link to={href} className="hover:text-primary transition-colors">Ambulance {q}</Link>
                    </li>
                  )
                })}
                {(!n.nearby || n.nearby.length === 0) && (
                  <li><Link to={`/ambulance-${citySlug}`} className="hover:text-primary">Ambulance {cityName}</Link></li>
                )}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Sections réassurance et services */}
      <ReassuranceSection />
      <ServicesSection />

      {/* Emergency CTA */}
      <section className="bg-emergency text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Urgence Médicale à {n.name} ({city.name}) ?
          </h2>
          <p className="text-xl mb-8">
            Notre équipe intervient rapidement sur {n.name} et dans tout {city.name} en {city.responseTime} en moyenne
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Appelez: {PHONE_DISPLAY}
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20" asChild>
              <a href={WHATSAPP} className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                WhatsApp Direct
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Témoignages et Contact */}
      <TestimonialsSection />

      <div id="demande-ambulance" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Demande d'Intervention à {n.name}
            </h2>
            <p className="text-xl text-gray-600">
              Formulaire pour les demandes non urgentes
            </p>
          </div>
          <ContactForm />
        </div>
      </div>

      {/* Maillage interne : autres quartiers de la ville */}
      <section className="mt-16 px-4 sm:px-6 lg:px-8 py-10 bg-muted/50 border-t border-border" aria-label={`Autres quartiers de ${city.name}`}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold mb-6 text-center">🏙️ Autres quartiers de {city.name}</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {list.filter((q) => q.slug !== n.slug).slice(0, 12).map((q) => (
              <li key={q.slug} className="group bg-card hover:bg-accent rounded-lg p-4 shadow-sm hover:shadow-md transition-colors ring-1 ring-border">
                <div className="text-lg font-medium text-foreground">{q.name}</div>
                <div className="text-sm text-muted-foreground">🚑 Intervention 24/7</div>
                <Link
                  to={`/ambulance-${citySlug}-${q.slug}`}
                  className="mt-2 inline-flex items-center gap-1 text-sm text-primary underline hover:text-primary/80 transition-colors"
                  aria-label={`Voir la page Ambulance ${q.name}`}
                >
                  👉 Voir la page
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </>
  )
}
