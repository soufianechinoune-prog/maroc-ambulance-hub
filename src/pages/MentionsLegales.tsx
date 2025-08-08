import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { SITE_URL } from "@/lib/config";

export default function MentionsLegales() {
  const title = "Mentions légales – Ambulance Maroc";
  const description = "Informations légales d’Ambulance Maroc (OPINEO) : éditeur, hébergeur, responsable de publication, coordonnées et identification légale.";
  const canonical = "/mentions-legales";
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OPINEO",
    legalName: "OPINEO",
    url: SITE_URL,
    logo: `${SITE_URL}/default-seo-image.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "229 RUE SAINT-HONORE",
      postalCode: "75001",
      addressLocality: "Paris",
      addressCountry: "FR",
    },
    vatID: "FR61952109692",
    email: "{email_contact}",
    telephone: "{téléphone_contact}",
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title={title} description={description} canonical={canonical} jsonLd={orgJsonLd} />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <article className="prose prose-neutral max-w-3xl mx-auto">
          <h1>Mentions légales</h1>

          <section>
            <h2>Éditeur du site</h2>
            <p>
              OPINEO, SAS au capital de 100,00 €<br />
              SIREN 952 109 692 – SIRET 952 109 692 00014 – TVA FR61952109692<br />
              Siège : 229 RUE SAINT‑HONORE, 75001 PARIS, France<br />
              Directeur de la publication : Boubakri Zakaria<br />
              Contact : {"{email_contact}"} – {"{téléphone_contact}"}
            </p>
          </section>

          <section>
            <h2>Hébergement</h2>
            <p>{"{nom_hébergeur}"}, {"{adresse_hébergeur}"}, {"{téléphone_hébergeur}"}</p>
          </section>

          <section>
            <h2>Activité</h2>
            <p>
              Plateforme de mise en relation entre demandeurs de transport en ambulance et sociétés d’ambulance partenaires.
              OPINEO n’exploite pas de flotte d’ambulances.
            </p>
          </section>

          <section>
            <h2>Propriété intellectuelle</h2>
            <p>
              Contenus, marques et visuels protégés. Toute reproduction nécessite autorisation écrite.
            </p>
          </section>

          <section>
            <h2>Responsabilité</h2>
            <p>
              Les informations publiées sont indicatives. OPINEO ne peut être tenu responsable d’un usage non conforme du site.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
