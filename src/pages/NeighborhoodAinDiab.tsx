import CityPage from "@/pages/CityPage";
import SEO from "@/components/SEO";
import { SITE_URL } from "@/lib/config";

// ⚙️ Si tu veux un autre quartier, change ces 2 constantes :
const NEIGHBORHOOD_NAME = "Ain Diab";
const NEIGHBORHOOD_SLUG = "ain-diab"; // slug kebab-case sans accents

/**
 * Page "quartier" minimale : on DUPLIQUE le contenu de Casablanca
 * en réutilisant CityPage(city="casablanca"). Le canonical reste
 * volontairement sur la page ville pour éviter le duplicate-content.
 * Quand on rédigera un contenu unique, on basculera le canonical
 * vers cette URL.
 */
export default function NeighborhoodAinDiab() {
  const title = `Ambulance à ${NEIGHBORHOOD_NAME} – Casablanca`;

  return (
    <>
      <SEO
        title={`${title} | Ambulance Maroc`}
        description={`Ambulance ${NEIGHBORHOOD_NAME} (Casablanca) : intervention rapide 24/7, délais moyens 8–12 min, transport médicalisé et équipe soignante qualifiée.`}
        // Canonical pointé sur la page ville pour le moment :
        canonical={`${SITE_URL}/ambulance-casablanca`}
        keywords={[`ambulance ${NEIGHBORHOOD_NAME}`, "ambulance casablanca", "transport médicalisé casablanca"]}
      />
      {/* Contenu temporaire : on réutilise la page Casablanca telle quelle */}
      <CityPage />
    </>
  );
}
