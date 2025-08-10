import { useMemo } from "react"
import { useParams, Link, Navigate } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import SEO from "@/components/SEO"
import { SITE_URL } from "@/lib/config"
import { Button } from "@/components/ui/button"
import { neighborhoodsCasablanca } from "@/data/neighborhoodsCasablanca"

const PHONE_DISPLAY = "0777 22 23 11"
const PHONE_TEL = "+212777722311"
const WHATSAPP = `https://wa.me/212777722311?text=${encodeURIComponent(
  "Bonjour, j’ai besoin d’une ambulance à Casablanca."
)}`

export default function NeighborhoodPage() {
  const { district } = useParams()
  const n = useMemo(
    () => neighborhoodsCasablanca.find((q) => q.slug === (district || "").toLowerCase()),
    [district]
  )

  // Si aucun quartier ne correspond, redirige vers la page ville
  if (!n) return <Navigate to="/ambulance-casablanca" replace />

  const title = `Ambulance ${n.name} (Casablanca) – Intervention 24/7`
  const description =
    n.intro ||
    `Ambulance ${n.name} à Casablanca : intervention rapide 24h/24 et 7j/7, transport médicalisé et inter‑hôpitaux, numéros utiles et zones couvertes.`
  const canonical = `${SITE_URL}/ambulance-casablanca-${n.slug}`

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Ambulance Casablanca", item: `${SITE_URL}/ambulance-casablanca` },
      { "@type": "ListItem", position: 3, name: n.name, item: canonical },
    ],
  }

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Ambulance ${n.name} – Casablanca`,
    areaServed: { "@type": "City", name: "Casablanca", address: { "@type": "PostalAddress", addressLocality: n.name } },
    provider: { "@type": "Organization", name: "Ambulance Maroc" },
    url: canonical,
  }

  return (
    <>
      <SEO title={title} description={description} canonical={canonical} jsonLdMultiple={[breadcrumbLd, serviceLd]} />
      <Header />
      <main className="container mx-auto max-w-screen-2xl px-4 lg:px-8 py-10">
        {/* Fil d’Ariane light */}
        <nav aria-label="Fil d’Ariane" className="text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:underline">Accueil</Link> <span aria-hidden>›</span>{" "}
          <Link to="/ambulance-casablanca" className="hover:underline">Ambulance Casablanca</Link>{" "}
          <span aria-hidden>›</span> <span className="text-foreground">{n.name}</span>
        </nav>

        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Ambulance {n.name} – Casablanca
          </h1>
          <p className="mt-2 text-muted-foreground max-w-3xl">
            Intervention 24h/24 et 7j/7, transport sanitaire et médicalisé, transferts inter‑hôpitaux. Zones
            couvertes : {n.highlights?.slice(0, 3).join(", ") || "axes principaux"}.
          </p>
          <div className="mt-4 rounded-xl border bg-card text-card-foreground p-4 shadow-sm">
            <p className="text-sm text-muted-foreground">Urgence ambulance – 24/7</p>
            <div className="mt-1 text-lg font-semibold">{PHONE_DISPLAY}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button asChild><a href={`tel:${PHONE_TEL}`} aria-label="Appeler maintenant" rel="nofollow">Appeler</a></Button>
              <Button variant="secondary" asChild>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">WhatsApp</a>
              </Button>
            </div>
          </div>
        </header>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Colonne principale */}
          <section className="col-span-12 lg:col-span-9 xl:col-span-9">
            <article className="prose prose-slate prose-lg lg:prose-xl max-w-none leading-relaxed md:leading-loose prose-h2:mt-10 prose-h3:mt-6 prose-p:mb-6">
              {n.intro && <p className="text-muted-foreground">{n.intro}</p>}

              <h2>Urgence ambulance à {n.name}</h2>
              <p>
                Une équipe disponible <strong>24/7</strong> sur {n.name} et les quartiers voisins ({(n.nearby || []).join(", ") || "Casablanca centre"}).
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
                {(!n.highlights || n.highlights.length === 0) && <li>Axes principaux et voies rapides de Casablanca</li>}
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

          {/* Colonne latérale */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 rounded-lg border p-4 bg-card text-card-foreground text-sm">
              <p className="font-semibold mb-2">Autres quartiers proches</p>
              <ul className="space-y-1">
                {(n.nearby || []).map((q) => {
                  const nb = neighborhoodsCasablanca.find((x) => x.name.toLowerCase().replace(/\s+/g, "-") === q.toLowerCase().replace(/\s+/g, "-"))
                  const href = nb ? `/ambulance-casablanca-${nb.slug}` : "/ambulance-casablanca"
                  return (
                    <li key={q}>
                      <a href={href} className="hover:text-primary transition-colors">Ambulance {q}</a>
                    </li>
                  )
                })}
                {(!n.nearby || n.nearby.length === 0) && (
                  <li><a href="/ambulance-casablanca" className="hover:text-primary">Ambulance Casablanca</a></li>
                )}
              </ul>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  )
}
