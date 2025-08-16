import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SmartBreadcrumb from "@/components/SmartBreadcrumb";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Phone, MessageCircle, MapPin, Clock, ShieldCheck, Users } from "lucide-react";
import CityGrid, { mainCitySlugs } from "@/components/CityGrid";

import ReassuranceSection from "@/components/ReassuranceSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactForm from "@/components/ContactForm";
import { cities } from "@/data/cities";
import { SITE_URL } from "@/lib/config";
import EmergencyFAQ from "@/components/EmergencyFAQ";
import heroImage from "@/assets/ambulance-hero.jpg";
import medicalTeam from "@/assets/medical-team.jpg";
import NationalSeoBlock from "@/components/NationalSeoBlock";
import { CallButton, WhatsAppButton } from "@/components/ContactCTA";

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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Comment appeler une ambulance au Maroc ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Appelez le +212 777 722 311 ou contactez-nous sur WhatsApp. Notre centre d'appel est opérationnel 24/7 pour une prise en charge immédiate."
        }
      },
      {
        "@type": "Question",
        "name": "En combien de temps arrive l’ambulance ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Selon la localisation, nous visons en moyenne moins de 15 minutes dans les grandes villes. Nos équipes sont mobilisées 24/7."
        }
      },
      {
        "@type": "Question",
        "name": "Quels sont les tarifs d’un transport médicalisé ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le tarif dépend de la distance, du matériel requis et du niveau d’assistance. Un devis clair et transparent est fourni avant intervention."
        }
      },
      {
        "@type": "Question",
        "name": "Peut-on réserver une ambulance privée ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, l'ambulance privée est disponible sur réservation pour transferts programmés, consultations spécialisées et inter-hôpitaux."
        }
      }
    ]
  };

  const jsonLdMultiple = [org, website, service];

  // Cities split
  const orderSet = new Set(mainCitySlugs);
  const mainCities = cities.filter(c => orderSet.has(c.slug));
  const otherCities = cities.filter(c => !orderSet.has(c.slug));

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Ambulance au Maroc – Urgences 24h/24 | Ambulance privée & transport médicalisé"
        description="Service d'ambulance au Maroc disponible 24h/24 et 7j/7. Intervention rapide, ambulance privée, urgences médicales et transport médicalisé dans toutes les grandes villes."
        canonical="https://www.ambulance-privee.ma/"
        jsonLdMultiple={[...(jsonLdMultiple || []), faqJsonLd]}
      />
      <Header />
      <SmartBreadcrumb />

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
          <img 
            src={heroImage} 
            alt="Ambulance professionnelle en intervention d'urgence au Maroc - service médical 24h/24" 
            className="sr-only" 
            loading="lazy"
            width="1200"
            height="800"
          />

          <div className="relative container mx-auto px-4 py-20">
            <div className="max-w-4xl space-y-6">
              <div className="inline-flex items-center bg-card/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                Service disponible partout au Maroc — 24/7
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Ambulance au Maroc – Urgences 24h/24, ambulance privée et transport médicalisé
              </h1>

              <p className="text-xl md:text-2xl text-white/90">
                Temps de réponse moyen : 8–15 min • Couverture nationale • Personnel qualifié
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button variant="emergency" size="lg" className="text-lg px-8 py-4 h-auto" asChild>
                    <CallButton aria-label="Appeler maintenant Ambulance Maroc" phone="+212777722311">
                      <Phone className="h-6 w-6 mr-3" /> 📞 Appelez maintenant
                    </CallButton>
                </Button>
                <Button variant="success" size="lg" className="text-lg px-8 py-4 h-auto" asChild>
                    <WhatsAppButton phone="+212777722311" aria-label="WhatsApp direct Ambulance Maroc" utm="utm_source=site&utm_medium=whatsapp&utm_campaign=cta_principal">
                      <MessageCircle className="h-6 w-6 mr-3" /> 💬 WhatsApp direct
                    </WhatsAppButton>
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

          {/* Sticky mobile CTA (WhatsApp + Call) */}
          <div className="fixed inset-x-0 bottom-0 z-50 lg:hidden">
            <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container mx-auto px-4 py-3 flex gap-3">
                <Button variant="success" className="flex-1 rounded-full h-12" asChild>
                  <WhatsAppButton
                    phone="+212777722311"
                    aria-label="WhatsApp direct Ambulance Maroc"
                    utm="utm_source=site&utm_medium=whatsapp&utm_campaign=cta_principal"
                  >
                    <span className="inline-flex items-center gap-2">
                      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.1-.471-.149-.67.149-.198.297-.767.967-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.173.198-.297.297-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.718 2.006-1.412.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-4.676 6.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.003-5.45 4.444-9.89 9.893-9.89 2.64.001 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.003 5.45-4.444 9.89-9.897 9.89M20.52 3.482A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.336 11.893-11.893A11.82 11.82 0 0020.52 3.482"></path>
                      </svg>
                      <span className="font-semibold">WhatsApp</span>
                    </span>
                  </WhatsAppButton>
                </Button>
                <Button variant="emergency" className="flex-1 rounded-full h-12" asChild>
                  <CallButton aria-label="Appeler maintenant" phone="+212777722311">
                    <span className="inline-flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      <span className="font-semibold">Appeler</span>
                    </span>
                  </CallButton>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-[800px] mx-auto px-4 py-10 space-y-4">
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Service certifié • Assistance 24/7</span>
          </div>
          <h2 className="text-2xl font-semibold">Service d’ambulance au Maroc – Rapidité et professionnalisme</h2>
          <p>
            Besoin d’une <strong>ambulance</strong> au <strong>Maroc</strong> maintenant ? Nous intervenons
            <strong> 24h/24 et 7j/7</strong> avec des équipes qualifiées et une flotte équipée pour toute <strong>urgence médicale</strong>.
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Urgences et premiers secours</li>
            <li>Ambulance privée sur réservation</li>
            <li>Transport médicalisé court & longue distance</li>
            <li>Transferts inter‑hôpitaux et rapatriement</li>
          </ul>

          <p className="text-muted-foreground">
            Couverture nationale (Casablanca, Rabat, Marrakech, Tanger, Fès, Agadir…) et délais optimisés dans les grandes villes.
          </p>

          <div className="pt-2 flex justify-center">
            <Button variant="success" size="lg" className="w-full sm:w-auto rounded-full px-5 py-3 h-auto" asChild>
              <WhatsAppButton
                phone="+212777722311"
                aria-label="Contactez-nous sur WhatsApp"
                utm="utm_source=site&utm_medium=whatsapp&utm_campaign=cta_principal"
              >
                <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.1-.471-.149-.67.149-.198.297-.767.967-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.173.198-.297.297-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.718 2.006-1.412.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-4.676 6.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.003-5.45 4.444-9.89 9.893-9.89 2.64.001 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.003 5.45-4.444 9.89-9.897 9.89M20.52 3.482A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.336 11.893-11.893A11.82 11.82 0 0020.52 3.482"></path>
                </svg>
                <span className="font-semibold">Contactez-nous sur WhatsApp</span>
              </WhatsAppButton>
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
              <img 
                src={medicalTeam} 
                alt="Équipe médicale professionnelle ambulance Maroc - personnel qualifié transport médicalisé d'urgence" 
                className="rounded-2xl shadow-xl w-full h-80 object-cover" 
                loading="lazy"
                width="600"
                height="320"
              />
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

            <div className="text-center mt-4">
              <a href="/zones-d-intervention" className="underline">Voir toutes nos zones d’intervention</a>
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

        {/* Bloc SEO national — placé entre Villes principales et Pourquoi nous faire confiance */}
        <NationalSeoBlock />

        {/* Réassurance */}
        <ReassuranceSection />

        {/* Services */}
        <ServicesSection />
        {/* Témoignages avec structured data */}
        <TestimonialsSection withStructuredData={true} />
        
        {/* FAQ pour featured snippets */}
        <EmergencyFAQ withStructuredData={true} variant="general" />

        {/* CTA urgence bande rouge */}
        <section className="py-8 bg-emergency text-emergency-foreground" role="region" aria-label="Urgence médicale">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-lg font-semibold">Urgence médicale ? Appelez +212 7777 223 11 ou WhatsApp Direct</p>
            <div className="flex gap-3">
              <Button variant="emergency" asChild>
                <CallButton aria-label="Appeler +212 7777 223 11" phone="+212777722311">Appeler</CallButton>
              </Button>
               <Button variant="success" asChild>
                 <WhatsAppButton phone="+212777722311" aria-label="Ouvrir WhatsApp direct" utm="utm_source=site&utm_medium=whatsapp&utm_campaign=cta_principal">WhatsApp</WhatsAppButton>
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
        <section className="max-w-[800px] mx-auto px-4 py-10">
          <h2 className="text-2xl font-semibold mb-4">Questions fréquentes sur nos services d’ambulance au Maroc</h2>
          <Accordion type="single" collapsible className="w-full space-y-2 mt-4">
            <AccordionItem value="item-1">
              <AccordionTrigger><h3 className="text-left text-base md:text-lg font-medium">Comment appeler une ambulance au Maroc ?</h3></AccordionTrigger>
              <AccordionContent>
                Contactez-nous au <strong>+212 777 722 311</strong> ou sur WhatsApp. Centre d’appel disponible 24/7.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger><h3 className="text-left text-base md:text-lg font-medium">En combien de temps arrive l’ambulance ?</h3></AccordionTrigger>
              <AccordionContent>
                Nous visons en moyenne <strong>moins de 15 minutes</strong> dans les grandes villes, selon la localisation et le trafic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger><h3 className="text-left text-base md:text-lg font-medium">Quels sont les tarifs d’un transport médicalisé ?</h3></AccordionTrigger>
              <AccordionContent>
                Selon distance, équipements et assistance nécessaire. Un devis clair est fourni avant toute intervention.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger><h3 className="text-left text-base md:text-lg font-medium">Peut-on réserver une ambulance privée ?</h3></AccordionTrigger>
              <AccordionContent>
                Oui, sur réservation pour transferts programmés, consultations spécialisées et inter-hôpitaux.
              </AccordionContent>
            </AccordionItem>
           </Accordion>
           <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
             <Button variant="emergency" asChild>
               <CallButton aria-label="Appeler +212 7777 223 11" phone="+212777722311">Appeler maintenant</CallButton>
             </Button>
             <Button variant="success" asChild>
               <WhatsAppButton phone="+212777722311" aria-label="Ouvrir WhatsApp direct" utm="utm_source=site&utm_medium=whatsapp&utm_campaign=cta_principal">WhatsApp direct</WhatsAppButton>
             </Button>
           </div>
         </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
