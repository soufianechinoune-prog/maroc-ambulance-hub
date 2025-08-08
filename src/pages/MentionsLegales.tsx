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
        <article className="mx-auto max-w-[800px] leading-relaxed">
          <header className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Mentions légales</h1>
          </header>

          <section className="mb-6">
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary" aria-hidden="true">
                  {/* Building icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M9 8h1"/><path d="M9 12h1"/><path d="M9 16h1"/><path d="M14 8h1"/><path d="M14 12h1"/><path d="M14 16h1"/><path d="M8 21V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14"/></svg>
                </span>
                <h2 className="text-xl font-semibold">Éditeur du site</h2>
              </div>
              <p className="text-muted-foreground">
                OPINEO, SAS au capital de 100,00 €<br />
                SIREN 952 109 692 – SIRET 952 109 692 00014 – TVA FR61952109692<br />
                Siège : 229 RUE SAINT‑HONORE, 75001 PARIS, France<br />
                Directeur de la publication : Boubakri Zakaria<br />
                Contact : {"{email_contact}"} – {"{téléphone_contact}"}
              </p>
            </div>
          </section>

          <section className="mb-6">
            <div className="rounded-xl border bg-muted/40 text-foreground shadow-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-secondary/20 text-secondary-foreground" aria-hidden="true">
                  {/* Server icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="8" rx="3"/><rect x="3" y="12" width="18" height="8" rx="3"/><path d="M7 8h.01"/><path d="M7 16h.01"/></svg>
                </span>
                <h2 className="text-xl font-semibold">Hébergement</h2>
              </div>
              <p className="text-muted-foreground">{"{nom_hébergeur}"}, {"{adresse_hébergeur}"}, {"{téléphone_hébergeur}"}</p>
            </div>
          </section>

          <section className="mb-6">
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary" aria-hidden="true">
                  {/* FileText icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
                </span>
                <h2 className="text-xl font-semibold">Activité</h2>
              </div>
              <p className="text-muted-foreground">
                Plateforme de mise en relation entre demandeurs de transport en ambulance et sociétés d’ambulance partenaires. OPINEO n’exploite pas de flotte d’ambulances.
              </p>
            </div>
          </section>

          <section className="mb-6">
            <div className="rounded-xl border bg-muted/40 text-foreground shadow-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-secondary/20 text-secondary-foreground" aria-hidden="true">
                  {/* Shield icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </span>
                <h2 className="text-xl font-semibold">Propriété intellectuelle</h2>
              </div>
              <p className="text-muted-foreground">
                Contenus, marques et visuels protégés. Toute reproduction nécessite autorisation écrite.
              </p>
            </div>
          </section>

          <section>
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary" aria-hidden="true">
                  {/* AlertCircle icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
                </span>
                <h2 className="text-xl font-semibold">Responsabilité</h2>
              </div>
              <p className="text-muted-foreground">
                Les informations publiées sont indicatives. OPINEO ne peut être tenu responsable d’un usage non conforme du site.
              </p>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
