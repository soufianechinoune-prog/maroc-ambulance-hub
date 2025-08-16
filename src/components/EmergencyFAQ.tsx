import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CallButton } from "@/components/ContactCTA";
import { Button } from "@/components/ui/button";

interface EmergencyFAQProps {
  withStructuredData?: boolean;
  city?: string;
  variant?: 'emergency' | 'transport' | 'general';
}

const EmergencyFAQ = ({ 
  withStructuredData = false, 
  city = "Maroc",
  variant = 'general'
}: EmergencyFAQProps) => {
  
  const getVariantFAQs = () => {
    switch(variant) {
      case 'emergency':
        return [
          {
            question: `Quel est le délai d'intervention d'une ambulance ${city !== "Maroc" ? `à ${city}` : 'au Maroc'} ?`,
            answer: `Le délai moyen d'intervention varie selon la zone : 8-12 minutes en centre-ville, 12-18 minutes en zone périurbaine${city !== "Maroc" ? ` à ${city}` : ''}. Nos équipes mobiles sont pré-positionnées stratégiquement pour optimiser les temps de réponse lors des urgences médicales.`
          },
          {
            question: "Comment savoir si j'ai besoin d'une ambulance ou des pompiers ?",
            answer: "Contactez une ambulance privée pour : malaises cardiaques, difficultés respiratoires, fractures, accouchements d'urgence, transport entre hôpitaux. Appelez les pompiers (15) pour : accidents de la route avec désincarcération, incendies, intoxications graves nécessitant des moyens spécialisés."
          },
          {
            question: "Que faire en attendant l'arrivée de l'ambulance ?",
            answer: "Restez calme et suivez ces étapes : gardez le patient conscient en lui parlant, ne le déplacez pas sauf danger immédiat, libérez ses voies respiratoires, couvrez-le pour éviter l'hypothermie, préparez ses documents médicaux et restez joignable par téléphone."
          },
          {
            question: "L'ambulance peut-elle entrer dans les résidences fermées ?",
            answer: "Oui, prévenez immédiatement le gardien ou la sécurité de l'arrivée imminente de l'ambulance. Communiquez-nous le nom exact de la résidence, le numéro de bloc/villa et un contact direct du gardien pour faciliter l'accès rapide."
          },
          {
            question: "Combien coûte une intervention d'ambulance d'urgence ?",
            answer: "Les tarifs varient selon la distance et le type d'intervention : 300-500 DH en zone urbaine, 500-800 DH pour les trajets inter-urbains. Le transport médicalisé avec réanimation peut nécessiter un supplément. Devis gratuit par téléphone."
          }
        ];
      
      case 'transport':
        return [
          {
            question: "Peut-on réserver une ambulance pour un transport programmé ?",
            answer: "Absolument. Nous gérons les transports programmés pour : sorties d'hospitalisation, rendez-vous médicaux spécialisés, dialyse, chimiothérapie, examens radiologiques. Réservation recommandée 24h à l'avance pour garantir la disponibilité."
          },
          {
            question: "Quelle différence entre ambulance de transport et ambulance de réanimation ?",
            answer: "L'ambulance de transport (ASSU) assure les transferts de patients stables avec surveillance de base. L'ambulance de réanimation (SMUR) dispose d'équipements avancés : défibrillateur, respirateur, médicaments d'urgence pour patients critiques."
          },
          {
            question: "L'ambulance prend-elle en charge les personnes âgées ou handicapées ?",
            answer: "Nos ambulances sont équipées pour le transport sécurisé de personnes à mobilité réduite : brancard hydraulique, fauteuil roulant, matériel d'aide au transfert. Personnel formé aux techniques de manutention respectueuses et sécurisées."
          },
          {
            question: "Peut-on accompagner un proche dans l'ambulance ?",
            answer: "En général, un accompagnant peut voyager dans l'ambulance, sauf si l'état du patient nécessite l'espace complet pour les soins médicaux. Nous privilégions toujours le confort psychologique du patient tout en garantissant sa sécurité médicale."
          }
        ];
      
      default:
        return [
          {
            question: `Dans quelles zones intervenez-vous ${city !== "Maroc" ? `à ${city}` : 'au Maroc'} ?`,
            answer: `Notre couverture s'étend sur${city !== "Maroc" ? ` tout ${city} et ses alentours` : ' plus de 15 villes marocaines'} : centres-villes, zones résidentielles, quartiers d'affaires, zones industrielles et axes routiers principaux. Intervention garantie 24h/24 dans toutes les zones accessibles par la route.`
          },
          {
            question: "Vos ambulances sont-elles agréées et assurées ?",
            answer: "Toutes nos ambulances possèdent les agréments officiels du ministère de la Santé, les autorisations de transport sanitaire et sont couvertes par une assurance responsabilité civile professionnelle complète pour votre sécurité."
          },
          {
            question: "Comment payer les services d'ambulance ?",
            answer: "Nous acceptons : espèces, cartes bancaires, virements, chèques d'entreprise. Pour les urgences, le paiement peut s'effectuer après intervention. Certaines mutuelles et assurances remboursent nos prestations sur présentation de facture détaillée."
          },
          {
            question: "Intervenez-vous pour les événements et rassemblements ?",
            answer: "Nous assurons la couverture sanitaire d'événements : concerts, manifestations sportives, rassemblements publics, tournages. Équipes médicales dédiées avec matériel d'urgence adapté. Devis personnalisé selon la nature et l'ampleur de l'événement."
          }
        ];
    }
  };

  const faqs = getVariantFAQs();

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

  const getTitle = () => {
    switch(variant) {
      case 'emergency': return `Questions Urgentes sur les Services d'Ambulance${city !== "Maroc" ? ` ${city}` : ''}`;
      case 'transport': return `FAQ Transport Médicalisé${city !== "Maroc" ? ` ${city}` : ''}`;
      default: return `Questions Fréquentes Ambulance${city !== "Maroc" ? ` ${city}` : ''}`;
    }
  };

  const getSubtitle = () => {
    switch(variant) {
      case 'emergency': return "Tout savoir sur nos interventions d'urgence et premiers secours";
      case 'transport': return "Informations essentielles sur le transport sanitaire programmé";
      default: return "Réponses aux questions les plus courantes sur nos services";
    }
  };

  return (
    <>
      {withStructuredData && faqStructuredData && (
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      )}
      <section className="py-16 bg-muted/30" aria-label="Questions fréquentes">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {getTitle()}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {getSubtitle()}
            </p>
            
            {variant === 'emergency' && (
              <div className="bg-emergency/10 border border-emergency/20 rounded-lg p-4 mb-8">
                <p className="text-emergency font-medium mb-3">
                  🚨 Urgence vitale immédiate ?
                </p>
                <CallButton
                  phone="+212777722311"
                  className="inline-flex items-center justify-center rounded-md bg-emergency px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-emergency/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  📞 Appelez immédiatement
                </CallButton>
              </div>
            )}
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-background rounded-lg border px-6">
                <AccordionTrigger className="text-left font-semibold hover:text-primary py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2 pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Une autre question ? Contactez-nous directement
            </p>
            <CallButton
              phone="+212777722311"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 mr-4"
            >
              📞 Appel gratuit
            </CallButton>
            <Button variant="outline" asChild>
              <a href="/contact" className="inline-flex items-center">
                ✉️ Formulaire de contact
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default EmergencyFAQ;