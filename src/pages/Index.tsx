import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, MapPin, Clock, ShieldCheck, Users } from "lucide-react";
import CityGrid, { mainCitySlugs } from "@/components/CityGrid";

import ReassuranceSection from "@/components/ReassuranceSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactForm from "@/components/ContactForm";
import { cities } from "@/data/cities";
import { SITE_URL } from "@/lib/config";
import heroImage from "@/assets/ambulance-hero.jpg";
import medicalTeam from "@/assets/medical-team.jpg";

const Index = () => {
  // SEO
  const title = "Ambulance au Maroc — Intervention 24h/24 & 7j/7 | Ambulance Maroc";
  const description = "Besoin d’une ambulance en urgence ou d’un transport médicalisé au Maroc ? Intervention 24h/24 et 7j/7, prise en charge rapide, coordination hôpitaux et cliniques. Appelez +212 7777 223 11.";
  const canonical = "/";
  const seoImage = "/default-seo-image.jpg";

  // JSON-LD
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ambulance Maroc",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    sameAs: [SITE_URL, "https://wa.me/212777722311", "tel:+212777722311"],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ambulance Maroc",
    url: SITE_URL,
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Ambulance & Transport Sanitaire",
    areaServed: { "@type": "Country", name: "MA" },
    provider: { "@type": "Organization", name: "Ambulance Maroc", url: SITE_URL },
  };

  const jsonLdMultiple = [org, website, service];

  // Cities split
  const orderSet = new Set(mainCitySlugs);
  const mainCities = cities.filter(c => orderSet.has(c.slug));
  const otherCities = cities.filter(c => !orderSet.has(c.slug));

  return (
    <div className="min-h-screen bg-background">
      <SEO title={title} description={description} canonical={canonical} image={seoImage} jsonLdMultiple={jsonLdMultiple} />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden" aria-label="Présentation – Ambulance Maroc">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Ambulance au Maroc – intervention d'urgence"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
          </div>
          <img src={heroImage} alt="Ambulance en intervention au Maroc, de nuit" className="sr-only" loading="lazy" />

          <div className="relative container mx-auto px-4 py-20">
            <div className="max-w-4xl space-y-6">
              <div className="inline-flex items-center bg-card/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                Service disponible partout au Maroc — 24/7
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Ambulance au Maroc — Intervention 24h/24 et 7j/7
              </h1>

              <p className="text-xl md:text-2xl text-white/90">
                Temps de réponse moyen : 8–15 min • Couverture nationale • Personnel qualifié
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button variant="emergency" size="lg" className="text-lg px-8 py-4 h-auto" asChild>
                  <a href="tel:+212777722311" aria-label="Appeler maintenant Ambulance Maroc">
                    <Phone className="h-6 w-6 mr-3" /> 📞 Appelez maintenant
                  </a>
                </Button>
                <Button variant="success" size="lg" className="text-lg px-8 py-4 h-auto" asChild>
                  <a href="https://wa.me/212777722311" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp direct Ambulance Maroc">
                    <MessageCircle className="h-6 w-6 mr-3" /> 💬 WhatsApp direct
                  </a>
                </Button>
                <Button variant="cta" size="lg" className="text-lg px-8 py-4 h-auto bg-white text-primary hover:bg-white/90" asChild>
                  <a href="#demande-ambulance" aria-label="Demander une ambulance (formulaire)">🚑 Demander une ambulance</a>
                </Button>
              </div>

              {/* Trust mini row */}
              <div className="pt-6 flex flex-wrap gap-6 text-white/80 text-sm">
                <div className="flex items-center"><div className="h-2 w-2 bg-success rounded-full mr-2"></div>Agréé</div>
                <div className="flex items-center"><div className="h-2 w-2 bg-success rounded-full mr-2"></div>Qualité protocolaire</div>
                <div className="flex items-center"><div className="h-2 w-2 bg-success rounded-full mr-2"></div>Intervention rapide</div>
                <div className="flex items-center"><div className="h-2 w-2 bg-success rounded-full mr-2"></div>Couverture nationale</div>
              </div>
            </div>
          </div>

          {/* Floating call button (mobile) */}
          <div className="fixed bottom-4 right-4 z-50 lg:hidden">
            <Button variant="emergency" size="lg" className="rounded-full shadow-2xl" asChild>
              <a href="tel:+212777722311" aria-label="Appel d'urgence">
                <Phone className="h-6 w-6" />
                <span className="sr-only">Appeler maintenant</span>
              </a>
            </Button>
          </div>
        </section>

        {/* KPI cards */}
        <section className="py-12 bg-secondary/30" role="region" aria-labelledby="kpi-heading">
          <div className="container mx-auto px-4">
            <h2 id="kpi-heading" className="sr-only">Indicateurs clés</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-xl border bg-card p-6 text-center">
                <p className="text-sm text-muted-foreground">Temps de réponse</p>
                <p className="text-2xl md:text-3xl font-bold text-foreground">8–15 min</p>
              </div>
              <div className="rounded-xl border bg-card p-6 text-center">
                <p className="text-sm text-muted-foreground">Couverture</p>
                <p className="text-2xl md:text-3xl font-bold text-foreground">100% grandes villes</p>
              </div>
              <div className="rounded-xl border bg-card p-6 text-center">
                <p className="text-sm text-muted-foreground">Villes couvertes</p>
                <p className="text-2xl md:text-3xl font-bold text-foreground">{cities.length}</p>
              </div>
              <div className="rounded-xl border bg-card p-6 text-center">
                <p className="text-sm text-muted-foreground">Disponibilité</p>
                <p className="text-2xl md:text-3xl font-bold text-foreground">24/7</p>
              </div>
            </div>
          </div>
        </section>

        {/* Intro two-columns */}
        <section className="py-16" role="region" aria-labelledby="intro-heading">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 id="intro-heading" className="text-2xl md:text-3xl font-semibold text-foreground">Service d’ambulance national</h2>
              <ul className="mt-6 space-y-3 text-muted-foreground">
                <li className="flex items-start"><Clock className="h-5 w-5 text-success mt-0.5 mr-3" />Réponse en 8–15 min en zone urbaine</li>
                <li className="flex items-start"><ShieldCheck className="h-5 w-5 text-primary mt-0.5 mr-3" />Coordination cliniques & hôpitaux</li>
                <li className="flex items-start"><ShieldCheck className="h-5 w-5 text-primary mt-0.5 mr-3" />Ambulances équipées (oxygène, monitoring, défibrillateur)</li>
                <li className="flex items-start"><Users className="h-5 w-5 text-primary mt-0.5 mr-3" />Personnel certifié (auxiliaires, infirmiers, médecin si besoin)</li>
                <li className="flex items-start"><MapPin className="h-5 w-5 text-primary mt-0.5 mr-3" />Couverture grandes villes & périphéries</li>
              </ul>
            </div>
            <div className="relative">
              <img src={medicalTeam} alt="Équipe médicale au Maroc" className="rounded-2xl shadow-xl w-full h-80 object-cover" loading="lazy" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Grille des villes */}
        <section className="py-16 bg-muted/30 border-y" role="region" aria-labelledby="cities-heading">
          <div className="container mx-auto px-4">
            <h2 id="cities-heading" className="text-2xl md:text-3xl font-semibold text-foreground">Villes principales</h2>
            <div className="mt-6">
              <CityGrid />
            </div>

            {/* Autres villes couvertes */}
            {otherCities.length > 0 && (
              <div className="mt-10">
                <h3 className="text-lg font-semibold text-foreground">Autres villes couvertes</h3>
                <nav className="mt-4 flex flex-wrap gap-2" aria-label="Autres villes couvertes">
                  {otherCities.map((c) => (
                    <a
                      key={c.slug}
                      href={`/ambulance-${c.slug}`}
                      className="rounded-full border bg-card px-3 py-1 text-sm hover:text-primary transition-colors"
                      aria-label={`Ambulance à ${c.name}`}
                    >
                      {c.name}
                    </a>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </section>

        {/* Réassurance */}
        <ReassuranceSection />

        {/* Services */}
        <ServicesSection />

        {/* Témoignages */}
        <TestimonialsSection />

        {/* CTA urgence bande rouge */}
        <section className="py-8 bg-emergency text-emergency-foreground" role="region" aria-label="Urgence médicale">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-lg font-semibold">Urgence médicale ? Appelez +212 7777 223 11 ou WhatsApp Direct</p>
            <div className="flex gap-3">
              <Button variant="emergency" asChild>
                <a href="tel:+212777722311" aria-label="Appeler +212 7777 223 11">Appeler</a>
              </Button>
              <Button variant="success" asChild>
                <a href="https://wa.me/212777722311" target="_blank" rel="noopener noreferrer" aria-label="Ouvrir WhatsApp direct">WhatsApp</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Formulaire ancré */}
        <ContactForm />

        {/* Maillage interne */}
        <section className="py-16" role="region" aria-labelledby="popular-pages-heading">
          <div className="container mx-auto px-4">
            <h2 id="popular-pages-heading" className="text-2xl md:text-3xl font-semibold text-foreground">Pages populaires</h2>
            <nav className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3" aria-label="Pages populaires">
              {[
                { name: "Casablanca", slug: "casablanca" },
                { name: "Rabat", slug: "rabat" },
                { name: "Marrakech", slug: "marrakech" },
                { name: "Tanger", slug: "tanger" },
                { name: "Fès", slug: "fes" },
                { name: "Oujda", slug: "oujda" },
              ].map((c) => (
                <a 
                  key={c.slug}
                  href={`/ambulance-${c.slug}`}
                  className="rounded-lg border bg-card px-4 py-3 hover:text-primary transition-colors"
                  aria-label={`Ambulance à ${c.name}`}
                >
                  Ambulance {c.name}
                </a>
              ))}
            </nav>
          </div>
        </section>
        {/* Bloc éditorial SEO national */}
        <section
          className="py-8 md:py-12"
          role="region"
          aria-labelledby="seo-editorial-heading"
        >
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2
                id="seo-editorial-heading"
                className="text-2xl md:text-3xl font-semibold text-foreground"
              >
                Ambulance au Maroc : un service d’urgence et de transport médicalisé 24h/24
              </h2>

              {/* Intro */}
              <p className="text-muted-foreground mt-6 mb-6">
                🚑 Avec <strong>Ambulance Maroc</strong>, vous accédez à un réseau national d’ambulances disponibles
                en <strong>urgence 24h/24</strong> et pour le <strong>transport médicalisé</strong> planifié. Présents dans les
                grandes agglomérations et leurs périphéries, nous assurons une <strong>prise en charge rapide</strong>,
                coordonnée et sécurisée. Notre <strong>temps de réponse rapide</strong> en zone urbaine est en moyenne de 8 à 15 minutes,
                avec une disponibilité continue, y compris la nuit, les week‑ends et jours fériés.
              </p>
              <p className="text-muted-foreground mb-6">
                Grâce à une organisation rigoureuse et à des partenaires locaux qualifiés, <strong>l’ambulance au Maroc</strong>{" "}
                conjugue proximité, réactivité et conformité aux protocoles. Que vous soyez en centre‑ville ou dans une
                zone plus isolée, la centrale identifie l’équipe la plus proche et la mieux adaptée à la situation.
              </p>

              {/* H3 – Interventions rapides */}
              <h3
                id="interventions-rapides"
                className="text-xl md:text-2xl font-semibold text-foreground mt-10"
              >
                ⏱️ Des interventions rapides dans toutes les grandes villes
              </h3>
              <p className="text-muted-foreground mb-6">
                En milieu urbain, nos équipes atteignent généralement le lieu d’intervention en 8 à 15 minutes, selon
                la distance et le trafic. Notre dispositif fonctionne <strong>24h/24 et 7j/7</strong> et couvre les principales
                métropoles du pays — Casablanca, Rabat, Marrakech, Tanger, Fès, Agadir, Meknès, Oujda — ainsi que leurs
                périphéries (zones industrielles, communes limitrophes, axes autoroutiers). Chaque appel est priorisé et
                orienté vers l’ambulance la plus proche pour réduire les délais.
              </p>

              {/* H3 – Réseau national */}
              <h3
                id="reseau-national-ambulances"
                className="text-xl md:text-2xl font-semibold text-foreground mt-10"
              >
                🚑 Un réseau national d’ambulances équipées
              </h3>
              <p className="text-muted-foreground mb-6">
                Nos véhicules sont modernes et dotés de l’équipement nécessaire à un <strong>transport médicalisé</strong> sûr :
                brancards, oxygène, monitorage, défibrillateurs et consommables d’urgence. Selon le niveau requis,
                l’équipe embarquée adapte le matériel pour garantir une prise en charge optimale, du simple transfert à
                la surveillance rapprochée.
              </p>
              <ul className="list-disc pl-5 text-muted-foreground mb-6">
                <li>Brancards, matelas coquille et immobilisation</li>
                <li>Oxygénothérapie et aspirations</li>
                <li>Monitoring et défibrillation si besoin</li>
                <li>Hygiène et désinfection selon protocole</li>
              </ul>
              <p className="text-muted-foreground mb-6">
                Maillage national avec des pages locales dédiées :
                <a className="ml-1 text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-sm" href="/ambulance-casablanca">Ambulance à Casablanca</a>,
                <a className="ml-1 text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-sm" href="/ambulance-rabat">Ambulance à Rabat</a>,
                <a className="ml-1 text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-sm" href="/ambulance-marrakech">Ambulance à Marrakech</a>,
                <a className="ml-1 text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-sm" href="/ambulance-tanger">Ambulance à Tanger</a>,
                <a className="ml-1 text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-sm" href="/ambulance-fes">Ambulance à Fès</a>,
                <a className="ml-1 text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-sm" href="/ambulance-agadir">Ambulance à Agadir</a>,
                <a className="ml-1 text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-sm" href="/ambulance-meknes">Ambulance à Meknès</a>,
                <a className="ml-1 text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-sm" href="/ambulance-oujda">Ambulance à Oujda</a>.
              </p>

              {/* H3 – Personnel médical */}
              <h3
                id="personnel-medical-forme"
                className="text-xl md:text-2xl font-semibold text-foreground mt-10"
              >
                👩‍⚕️ Un personnel médical formé et certifié
              </h3>
              <p className="text-muted-foreground mb-6">
                Les interventions sont réalisées par des <strong>auxiliaires ambulanciers</strong>, <strong>infirmiers</strong> et, lorsque
                nécessaire, par un <strong>médecin urgentiste</strong>. Les équipes appliquent des protocoles validés et conformes
                aux recommandations du Ministère de la Santé, avec une traçabilité des gestes effectués et un dossier de
                transmission remis à l’établissement receveur.
              </p>

              {/* H3 – Coordination */}
              <h3
                id="coordination-hopitaux-cliniques"
                className="text-xl md:text-2xl font-semibold text-foreground mt-10"
              >
                🏥 Coordination avec les hôpitaux et cliniques
              </h3>
              <p className="text-muted-foreground mb-6">
                Du premier appel à l’admission, nous assurons une <strong>coordination hôpitaux</strong> et cliniques fluide :
                choix de la structure la plus adaptée, transmission des informations utiles, préparation à l’accueil du
                patient. Nos équipes interviennent aussi en entreprises, hôtels, établissements scolaires, maisons de
                retraite et <strong>zones industrielles</strong>, en lien avec les référents sécurité.
              </p>

              {/* H3 – Comment demander ? */}
              <h3
                id="comment-demander-ambulance-maroc"
                className="text-xl md:text-2xl font-semibold text-foreground mt-10"
              >
                📞 Comment demander une ambulance au Maroc ?
              </h3>
              <p className="text-muted-foreground mb-6">
                Pour une prise en charge immédiate, appelez le
                <a
                  href="tel:+212777722311"
                  className="ml-1 text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-sm"
                  aria-label="Appeler Ambulance Maroc"
                >
                  +212 7777 223 11
                </a>
                , écrivez sur
                <a
                  href="https://wa.me/212777722311"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-sm"
                  aria-label="Contacter Ambulance Maroc sur WhatsApp"
                >
                  WhatsApp
                </a>
                , ou utilisez le
                <a
                  href="#demande-ambulance"
                  className="ml-1 text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-sm"
                  aria-label="Ouvrir le formulaire Demander une ambulance"
                >
                  formulaire en ligne
                </a>
                . Notre centrale évalue la situation, précise la localisation et oriente vers <strong>l’ambulance au Maroc</strong>
                la plus proche, afin d’assurer un départ immédiat et un transfert sécurisé.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
