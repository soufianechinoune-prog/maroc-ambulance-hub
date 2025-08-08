import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

export default function PolitiqueConfidentialite() {
  const title = "Politique de confidentialité – Ambulance Maroc";
  const description = "Données collectées, finalités, base légale, conservation, droits RGPD, cookies et contact pour Ambulance Maroc (OPINEO).";
  const canonical = "/politique-confidentialite";

  return (
    <div className="min-h-screen bg-background">
      <SEO title={title} description={description} canonical={canonical} />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <article className="mx-auto max-w-[800px] leading-relaxed">
          <header className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Politique de confidentialité</h1>
          </header>

          <section className="mb-6">
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary" aria-hidden="true">
                  {/* Lock icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </span>
                <h2 className="text-xl font-semibold">Données collectées</h2>
              </div>
              <p className="text-muted-foreground">
                Nous collectons les informations fournies via le formulaire de contact, les clics d’appel et de WhatsApp, ainsi que des données d’usage (analytics).
              </p>
            </div>
          </section>

          <section className="mb-6">
            <div className="rounded-xl border bg-muted/40 text-foreground shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-2">Finalités</h2>
              <p className="text-muted-foreground">Mise en relation et réponse aux demandes, mesure d’audience, prévention de la fraude et amélioration du service.</p>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2 mb-6">
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-2">Bases légales</h2>
              <p className="text-muted-foreground">Exécution de mesures pré‑contractuelles, consentement et intérêt légitime.</p>
            </div>
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-2">Durées de conservation</h2>
              <p className="text-muted-foreground">Leads: 24 mois ; journaux techniques: 12 mois, sauf obligation légale différente.</p>
            </div>
          </section>

          <section className="mb-6">
            <div className="rounded-xl border bg-muted/40 text-foreground shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-2">Destinataires</h2>
              <p className="text-muted-foreground">Équipes OPINEO, prestataires techniques et sociétés partenaires d’ambulance.</p>
            </div>
          </section>

          <section className="mb-6">
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-2">Transferts hors UE</h2>
              <p className="text-muted-foreground">Si certains outils (ex. analytics) impliquent des transferts vers des pays tiers, des garanties appropriées sont mises en place.</p>
            </div>
          </section>

          <section className="mb-6">
            <div className="rounded-xl border bg-muted/40 text-foreground shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-2">Droits RGPD</h2>
              <p className="text-muted-foreground">Vous disposez de droits d’accès, rectification, effacement, opposition, limitation et portabilité. Contact: {"{email_dpo_ou_contact_rgpd}"}.</p>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2 mb-6">
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-2">Cookies</h2>
              <p className="text-muted-foreground">Un bandeau de gestion des cookies est proposé. Catégories: nécessaires, mesure d’audience, marketing.</p>
            </div>
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-2">Contact</h2>
              <p className="text-muted-foreground">Pour toute question: {"{email_contact}"}.</p>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
