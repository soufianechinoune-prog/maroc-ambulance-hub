import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import { cities } from "@/data/cities";
import { SITE_URL } from "@/lib/config";

const Index = () => {
  const title = "Ambulance au Maroc — Intervention 24/7, Transport médicalisé | Ambulance Maroc";
  const description = "Besoin d’une ambulance au Maroc ? Intervention 24h/24 et 7j/7, transport médicalisé, coordination avec hôpitaux et cliniques. Délais rapides. Appelez +212 7777 223 11.";
  const canonical = `/`;
  const seoImage = "/default-seo-image.jpg";

  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ambulance Maroc",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "En combien de temps l’ambulance arrive‑t‑elle ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "En moyenne 8 à 15 minutes en zone urbaine (selon trafic et distance). En périphérie, un délai estimatif est annoncé à l’appel.",
        },
      },
      {
        "@type": "Question",
        name: "Avez‑vous des ambulances médicalisées ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui. Selon la situation, le transport peut être simple, assisté ou médicalisé (infirmier·e ou médecin à bord, matériel de réanimation).",
        },
      },
      {
        "@type": "Question",
        name: "Pouvez‑vous m’emmener dans la clinique de mon choix ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, sauf contre‑indication médicale. En cas d’urgence vitale, la priorité est l’établissement le plus adapté.",
        },
      },
      {
        "@type": "Question",
        name: "Intervenez‑vous la nuit et les jours fériés ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui. Service 24h/24 et 7j/7 sur tout le territoire couvert.",
        },
      },
      {
        "@type": "Question",
        name: "Quel est le coût d’un transport ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Il dépend de la distance, du niveau d’équipement et du personnel requis. Le tarif est annoncé dès la prise de contact.",
        },
      },
    ],
  };

  const jsonLdMultiple = [jsonLdOrganization, jsonLdFaq];

  const mainCities = cities.filter((c) => c.isMain);
  const otherCities = cities.filter((c) => !c.isMain);

  return (
    <div className="min-h-screen bg-background">
      <SEO title={title} description={description} canonical={canonical} image={seoImage} jsonLdMultiple={jsonLdMultiple} />
      <Header />

      <main>
        {/* Hero */}
        <section className="border-b">
          <div className="container mx-auto px-4 py-16 md:py-24 grid gap-6 md:grid-cols-2 items-center">
            <div>
              <p className="inline-flex items-center text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">
                Service disponible partout au Maroc — 24/7
              </p>
              <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                Ambulance au Maroc — Intervention 24h/24 et 7j/7
              </h1>
              <p className="mt-4 text-muted-foreground max-w-prose">
                Besoin d’une ambulance en urgence ou d’un transport médicalisé ? Nos équipes partenaires interviennent partout au Maroc, 24h/24 et 7j/7 : prise en charge rapide, coordination avec les hôpitaux et cliniques, transport sécurisé et accompagnement humain.
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
            <h2>Ambulance au Maroc — Intervention 24/7</h2>
            <p>
              Nos équipes partenaires interviennent partout au Maroc, 24h/24 et 7j/7 : prise en charge rapide, coordination avec les hôpitaux et cliniques, transport sécurisé et accompagnement humain.
            </p>
            <ul>
              <li>⏱️ Temps de réponse moyen : 8–15 min en zone urbaine</li>
              <li>🏥 Couverture nationale : grandes villes et périphéries</li>
              <li>👩‍⚕️ Personnel qualifié : auxiliaires, infirmiers, médecin selon le besoin</li>
              <li>🚑 Véhicules équipés : brancard, oxygène, monitorage, défibrillateur</li>
              <li>☎️ Centrale d’appel : +212 7777 223 11 (24/7) ou WhatsApp direct</li>
            </ul>

            <hr />

            <h2>Nos services d’ambulance</h2>
            <h3>Ambulance d’urgence (24/7)</h3>
            <p>
              Intervention immédiate à domicile, sur la voie publique, en entreprise ou dans un hôtel. Stabilisation, premiers soins, transfert vers l’établissement adapté.
            </p>
            <h3>Transport inter‑hôpitaux</h3>
            <p>
              Transferts planifiés ou urgents entre cliniques et hôpitaux, avec coordination médicale et dossier de transmission.
            </p>
            <h3>Transport médicalisé / surveillance</h3>
            <p>
              Ambulance avec personnel dédié (infirmier·e / médecin si nécessaire), matériel de réanimation et monitoring.
            </p>
            <h3>Longue distance & rapatriement privé</h3>
            <p>
              Transport inter‑villes sécurisé au Maroc, préparation logistique et accompagnement administratif si besoin.
            </p>
            <h3>Événements & dispositifs préventifs</h3>
            <p>
              Poste de secours mobile, équipe dédiée, coordination avec les organisateurs (sport, culture, entreprises).
            </p>
            <p>
              Appeler maintenant : <a href="tel:+212777722311">+212 7777 223 11</a> · WhatsApp : <a href="https://wa.me/212777722311" target="_blank" rel="noopener noreferrer">wa.me/212777722311</a>
            </p>

            <hr />

            <h2>Où intervenons‑nous ?</h2>
            <p>
              Nous couvrons l’ensemble du territoire avec des équipes locales dans les grandes agglomérations et leurs périphéries.
            </p>
            <p>
              Villes principales : Casablanca, Rabat, Marrakech, Tanger, Fès, Agadir, Meknès, Oujda, Tétouan, Kénitra, Mohammedia…<br />
              Périphéries : zones industrielles, communes limitrophes, axes autoroutiers.
            </p>
            <p>
              Sélectionnez votre ville depuis le bandeau en haut de page pour voir le détail local (quartiers, délais moyens, infos pratiques).
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
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Pourquoi nous faire confiance ?</h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-lg border bg-card p-4">
                <p className="text-sm text-muted-foreground">Disponibilité</p>
                <p className="text-xl font-bold text-foreground">Service 24/7</p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <p className="text-sm text-muted-foreground">Temps de réponse</p>
                <p className="text-xl font-bold text-foreground">&lt; 15 minutes</p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <p className="text-sm text-muted-foreground">Interventions/an</p>
                <p className="text-xl font-bold text-foreground">5 000+</p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <p className="text-sm text-muted-foreground">Satisfaction</p>
                <p className="text-xl font-bold text-foreground">98 %</p>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <article>
                <h3 className="text-xl font-semibold text-foreground">Qualité de soins</h3>
                <p className="text-muted-foreground">Protocoles d’urgence, hygiène contrôlée, matériel adapté.</p>
              </article>
              <article>
                <h3 className="text-xl font-semibold text-foreground">Parcours coordonné</h3>
                <p className="text-muted-foreground">Choix de la structure adaptée et transmission au service receveur.</p>
              </article>
              <article>
                <h3 className="text-xl font-semibold text-foreground">Réseau national</h3>
                <p className="text-muted-foreground">Équipes proches, délais maîtrisés, couverture urbaine et périurbaine.</p>
              </article>
              <article>
                <h3 className="text-xl font-semibold text-foreground">Accompagnement humain</h3>
                <p className="text-muted-foreground">Information des proches et gestion du stress.</p>
              </article>
            </div>
          </div>
        </section>

        <section>
          <div className="container mx-auto px-4 py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Comment ça marche ?</h2>
            <ol className="mt-6 list-decimal pl-5 space-y-2 text-muted-foreground">
              <li>Contact 24/7 — Appelez +212 7777 223 11 ou WhatsApp.</li>
              <li>Évaluation — Quelques questions pour qualifier l’urgence et la localisation.</li>
              <li>Déclenchement — Ambulance envoyée, consignes de sécurité transmises.</li>
              <li>Prise en charge — Équipe qualifiée, matériel adapté, dossier de transmission.</li>
              <li>Transfert — Vers la clinique/hôpital le plus pertinent ou selon votre choix.</li>
            </ol>
          </div>
        </section>

        <section className="bg-muted/30 border-y">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Infos pratiques</h2>
            <ul className="mt-6 list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Documents utiles (si possible) : pièce d’identité, carte de mutuelle, ordonnances.</li>
              <li>Accès : précisez l’adresse exacte, code d’immeuble, point de repère.</li>
              <li>Paiement : espèces, virement, ou prise en charge selon contrat (si applicable).</li>
            </ul>
          </div>
        </section>

        <section>
          <div className="container mx-auto px-4 py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Qui sommes‑nous ?</h2>
            <p className="mt-4 text-muted-foreground max-w-prose">
              Ambulance Maroc est une plateforme de mise en relation entre utilisateurs et services d’ambulance privés partenaires. Nous ne sommes pas une société d’ambulance : notre rôle est d’orienter, coordonner et vous connecter à l’équipe la plus proche et la plus adaptée, en assurant un standard de qualité uniforme (délais, équipement, protocole).
            </p>
            <p className="mt-4 text-muted-foreground">Pour toute demande : <a href="tel:+212777722311">+212 7777 223 11</a> — 24h/24</p>
          </div>
        </section>

        <section className="bg-muted/30 border-t">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Questions fréquentes (FAQ)</h2>
            <div className="mt-6 space-y-4">
              <details className="rounded-lg border bg-card p-4">
                <summary className="font-medium cursor-pointer">En combien de temps l’ambulance arrive‑t‑elle ?</summary>
                <p className="mt-2 text-muted-foreground">En moyenne 8 à 15 minutes en zone urbaine (selon trafic et distance). En périphérie, nous annonçons un délai estimatif à l’appel.</p>
              </details>
              <details className="rounded-lg border bg-card p-4">
                <summary className="font-medium cursor-pointer">Avez‑vous des ambulances médicalisées ?</summary>
                <p className="mt-2 text-muted-foreground">Oui. Selon la situation, le transport peut être simple, assisté ou médicalisé (infirmier·e ou médecin à bord, matériel de réanimation).</p>
              </details>
              <details className="rounded-lg border bg-card p-4">
                <summary className="font-medium cursor-pointer">Pouvez‑vous m’emmener dans la clinique de mon choix ?</summary>
                <p className="mt-2 text-muted-foreground">Oui, sauf contre‑indication médicale. En cas d’urgence vitale, la priorité est l’établissement le plus adapté.</p>
              </details>
              <details className="rounded-lg border bg-card p-4">
                <summary className="font-medium cursor-pointer">Intervenez‑vous la nuit et les jours fériés ?</summary>
                <p className="mt-2 text-muted-foreground">Oui. Service 24h/24 et 7j/7 sur tout le territoire couvert.</p>
              </details>
              <details className="rounded-lg border bg-card p-4">
                <summary className="font-medium cursor-pointer">Quel est le coût d’un transport ?</summary>
                <p className="mt-2 text-muted-foreground">Il dépend de la distance, du niveau d’équipement et du personnel requis. Nous annonçons le tarif dès la prise de contact.</p>
              </details>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
