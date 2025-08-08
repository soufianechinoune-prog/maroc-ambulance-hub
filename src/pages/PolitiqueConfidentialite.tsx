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
        <article className="prose prose-neutral max-w-3xl mx-auto">
          <h1>Politique de confidentialité</h1>

          <section>
            <h2>Données collectées</h2>
            <p>
              Nous collectons les informations fournies via le formulaire de contact, les clics d’appel et de WhatsApp, ainsi que des données d’usage (analytics).
            </p>
          </section>

          <section>
            <h2>Finalités</h2>
            <p>
              Mise en relation et réponse aux demandes, mesure d’audience, prévention de la fraude et amélioration du service.
            </p>
          </section>

          <section>
            <h2>Bases légales</h2>
            <p>
              Exécution de mesures pré‑contractuelles, consentement et intérêt légitime.
            </p>
          </section>

          <section>
            <h2>Durées de conservation</h2>
            <p>
              Leads: 24 mois ; journaux techniques: 12 mois, sauf obligation légale différente.
            </p>
          </section>

          <section>
            <h2>Destinataires</h2>
            <p>
              Équipes OPINEO, prestataires techniques et sociétés partenaires d’ambulance.
            </p>
          </section>

          <section>
            <h2>Transferts hors UE</h2>
            <p>
              Si certains outils (ex. analytics) impliquent des transferts vers des pays tiers, des garanties appropriées sont mises en place.
            </p>
          </section>

          <section>
            <h2>Droits RGPD</h2>
            <p>
              Vous disposez de droits d’accès, rectification, effacement, opposition, limitation et portabilité. Contact: {"{email_dpo_ou_contact_rgpd}"}.
            </p>
          </section>

          <section>
            <h2>Cookies</h2>
            <p>
              Un bandeau de gestion des cookies est proposé. Catégories: nécessaires, mesure d’audience, marketing.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              Pour toute question: {"{email_contact}"}.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
