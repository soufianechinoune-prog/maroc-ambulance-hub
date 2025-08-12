import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import { cities } from "@/data/cities";

const Index = () => {
  const title = "Ambulance Maroc – Urgences 24/7";
  const description = "Ambulance Maroc: interventions rapides 24/7 dans toutes les grandes villes. Appelez ou WhatsApp pour une prise en charge immédiate.";
  const canonical = `/`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EmergencyService",
    "name": "Ambulance Maroc",
    "areaServed": "Maroc",
    "url": canonical,
    "telephone": "+212777722311",
    "openingHours": "Mo-Su 00:00-23:59",
    "priceRange": "$$",
  };

  const mainCities = cities.filter((c) => c.isMain);
  const otherCities = cities.filter((c) => !c.isMain);

  return (
    <div className="min-h-screen bg-background">
      <SEO title={title} description={description} canonical={canonical} jsonLd={jsonLd} />
      <Header />

      <main>
        {/* Hero */}
        <section className="border-b">
          <div className="container mx-auto px-4 py-16 md:py-24 grid gap-6 md:grid-cols-2 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                Ambulance Maroc – Intervention d'urgence 24/7
              </h1>
              <p className="mt-4 text-muted-foreground max-w-prose">
                Page d’accueil générale. Contenu placeholder pour valider la structure. Intervention rapide dans toutes les grandes villes du Maroc.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="emergency" size="lg" asChild>
                  <a href="tel:+212777722311" aria-label="Appeler Ambulance Maroc">
                    <Phone className="h-5 w-5 mr-2" /> Appeler
                  </a>
                </Button>
                <Button variant="success" size="lg" asChild>
                  <a href="https://wa.me/212777722311" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp direct Ambulance Maroc">
                    <MessageCircle className="h-5 w-5 mr-2" /> WhatsApp direct
                  </a>
                </Button>
              </div>
            </div>
            <div className="rounded-xl border bg-card p-6 text-muted-foreground">
              <p className="font-medium text-foreground">Bloc visuel placeholder</p>
              <p className="mt-2">Espace réservé (image/illustration à intégrer plus tard).</p>
            </div>
          </div>
        </section>

        {/* Présentation SEO */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            <h2>Présentation du service (placeholder)</h2>
            <p>
              Texte SEO d’introduction. Ce contenu fictif sera remplacé par une description complète du service national d’ambulance, des zones couvertes et du protocole d’intervention.
            </p>
            <p>
              Objectif: rassurer, expliquer les délais moyens, l’équipement, les équipes et le numéro d’urgence à utiliser en priorité.
            </p>
          </article>
        </section>

        {/* Villes principales */}
        <section className="bg-muted/30 border-y">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Villes principales</h2>
            <nav className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3" aria-label="Villes principales">
              {mainCities.map((c) => (
                <a
                  key={c.slug}
                  href={`/ambulance-${c.slug}`}
                  className="rounded-lg border bg-card px-4 py-3 hover:text-primary transition-colors"
                  aria-label={`Ambulance ${c.name}`}
                >
                  Ambulance {c.name}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* Autres villes couvertes */}
        <section>
          <div className="container mx-auto px-4 py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Autres villes couvertes</h2>
            <nav className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3" aria-label="Autres villes couvertes">
              {otherCities.map((c) => (
                <a
                  key={c.slug}
                  href={`/ambulance-${c.slug}`}
                  className="rounded-lg border bg-card px-4 py-3 hover:text-primary transition-colors"
                  aria-label={`Ambulance ${c.name}`}
                >
                  Ambulance {c.name}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* Arguments & preuves sociales */}
        <section className="bg-muted/30 border-t">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Pourquoi nous faire confiance</h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-lg border bg-card p-4">
                <p className="text-sm text-muted-foreground">Temps de réponse moyen</p>
                <p className="text-xl font-bold text-foreground">10–18 minutes</p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <p className="text-sm text-muted-foreground">Équipes qualifiées</p>
                <p className="text-xl font-bold text-foreground">Personnel diplômé</p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <p className="text-sm text-muted-foreground">Agréments & conformité</p>
                <p className="text-xl font-bold text-foreground">Normes sanitaires</p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <p className="text-sm text-muted-foreground">Interventions annuelles</p>
                <p className="text-xl font-bold text-foreground">5 000+ (placeholder)</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
