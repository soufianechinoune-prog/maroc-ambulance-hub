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
        <article className="mx-auto max-w-[800px] leading-relaxed">
          <header className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Conditions générales d’utilisation</h1>
          </header>

          <section className="mb-6">
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary" aria-hidden="true">
                  {/* FileText icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
                </span>
                <h2 className="text-xl font-semibold">Objet</h2>
              </div>
              <p className="text-muted-foreground">Les présentes CGU définissent le cadre d’utilisation de la plateforme de mise en relation Ambulance Maroc.</p>
            </div>
          </section>

          <section className="mb-6">
            <div className="rounded-xl border bg-muted/40 text-foreground shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-2">Services</h2>
              <p className="text-muted-foreground">Formulaire de demande, contact direct et transmission sécurisée des informations aux partenaires ambulanciers.</p>
            </div>
          </section>

          <section className="mb-6">
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-2">Responsabilités</h2>
              <p className="text-muted-foreground">Informations fournies à titre indicatif. Disponibilité du service non garantie. Qualité des prestations sous la responsabilité des partenaires. Cas de force majeure exclus.</p>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border bg-muted/40 text-foreground shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-2">Utilisation loyale</h2>
              <p className="text-muted-foreground">Il est interdit d’utiliser la plateforme à des fins frauduleuses, abusives ou contraires à la loi.</p>
            </div>
            <div className="rounded-xl border bg-muted/40 text-foreground shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-2">Droit applicable</h2>
              <p className="text-muted-foreground">Le présent site est régi par le droit français. En cas de litige, les tribunaux compétents seront ceux de Paris, sauf dispositions légales impératives contraires.</p>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
