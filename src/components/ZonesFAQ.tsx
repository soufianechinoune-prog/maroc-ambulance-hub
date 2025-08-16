import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ZonesFAQ = ({ withStructuredData = false }: { withStructuredData?: boolean }) => {
  const faqs = [
    {
      question: "Dans quelles villes intervenez-vous au Maroc ?",
      answer: "Nous intervenons dans plus de 15 villes marocaines incluant Casablanca, Rabat, Marrakech, Tanger, Fès, Agadir, Meknès, Oujda, Kenitra, Sale, Mohammedia, Tétouan et Laâyoune. Notre couverture s'étend également aux zones périurbaines et axes routiers principaux."
    },
    {
      question: "Quel est votre délai d'intervention moyen ?",
      answer: "Notre délai d'intervention moyen est de 12-15 minutes en zone urbaine et 20-30 minutes en zone périurbaine. Nous disposons d'ambulances stratégiquement positionnées pour optimiser les temps de réponse dans chaque ville."
    },
    {
      question: "Vos tarifs varient-ils selon les villes ?",
      answer: "Nos tarifs sont standardisés au niveau national avec des ajustements mineurs selon la distance et la complexité du transport. Nous pratiquons une tarification transparente sans frais cachés. Contactez-nous pour un devis personnalisé."
    },
    {
      question: "Comment est assurée la prise en charge médicale ?",
      answer: "Chaque ambulance est équipée d'un matériel médical complet (défibrillateur, oxygène, monitoring) et notre personnel est formé aux gestes d'urgence. Nous coordonnons avec les services hospitaliers pour préparer l'accueil du patient."
    },
    {
      question: "Intervenez-vous en zone rurale ou uniquement en ville ?",
      answer: "Nous intervenons prioritairement dans les zones urbaines et périurbaines. Pour les zones rurales éloignées, nous étudions chaque demande selon la faisabilité et pouvons coordonner avec les services locaux ou utiliser des moyens adaptés."
    },
    {
      question: "Peut-on réserver une ambulance à l'avance ?",
      answer: "Oui, nous acceptons les réservations pour les transports médicalisés programmés (sorties d'hôpital, consultations spécialisées, examens). Pour les urgences, nous intervenons immédiatement sans réservation préalable."
    }
  ];

  const faqStructuredData = withStructuredData ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  } : null;

  return (
    <>
      {withStructuredData && faqStructuredData && (
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      )}
      <section className="py-16 bg-muted/50" aria-label="Questions fréquentes">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Questions Fréquentes sur nos Zones d'Intervention
          </h2>
          <p className="text-lg text-muted-foreground">
            Tout ce que vous devez savoir sur notre couverture territoriale
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-background rounded-lg border px-6">
              <AccordionTrigger className="text-left font-semibold hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-2 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        </div>
      </section>
    </>
  );
};

export default ZonesFAQ;