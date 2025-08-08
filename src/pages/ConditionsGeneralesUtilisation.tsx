import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

export default function ConditionsGeneralesUtilisation() {
  const title = "Conditions générales d’utilisation – Ambulance Maroc";
  const description = "CGU d’Ambulance Maroc : objet, services, responsabilité, compte utilisateur, disponibilité, droit applicable.";
  const canonical = "/conditions-generales-utilisation";

  return (
    <div className="min-h-screen bg-background">
      <SEO title={title} description={description} canonical={canonical} />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <article className="prose prose-neutral max-w-3xl mx-auto">
          <h1>Conditions générales d’utilisation</h1>

          <section>
            <h2>Objet</h2>
            <p>
              Les présentes CGU définissent le cadre d’utilisation de la plateforme de mise en relation Ambulance Maroc.
            </p>
          </section>

          <section>
            <h2>Services</h2>
            <p>
              Formulaire de demande, contact direct et transmission sécurisée des informations aux partenaires ambulanciers.
            </p>
          </section>

          <section>
            <h2>Responsabilités</h2>
            <p>
              Informations fournies à titre indicatif. Disponibilité du service non garantie. Qualité des prestations sous la responsabilité des partenaires. Cas de force majeure exclus.
            </p>
          </section>

          <section>
            <h2>Utilisation loyale</h2>
            <p>
              Il est interdit d’utiliser la plateforme à des fins frauduleuses, abusives ou contraires à la loi.
            </p>
          </section>

          <section>
            <h2>Droit applicable</h2>
            <p>
              Le présent site est régi par le droit français. En cas de litige, les tribunaux compétents seront ceux de Paris, sauf dispositions légales impératives contraires.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
