import { Phone, MessageCircle, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CallButton, WhatsAppButton } from "@/components/ContactCTA";
import ambulanceHero from "@/assets/ambulance-hero.jpg";

interface HeroSectionProps {
  city?: string;
  h1?: string;
  subtitle?: string;
  quarterVariant?: string;
}

const HeroSection = ({ city = "Casablanca", h1, subtitle, quarterVariant }: HeroSectionProps) => {
  // Configuration spécifique par quartier de Casablanca
  const getQuarterConfig = (variant: string) => {
    switch (variant) {
      case 'californie':
        return {
          title: "🚑 Ambulance Casablanca Californie – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Intervention rapide (8-12 min) dans tout le quartier Californie et ses environs – couverture locale complète – équipe médicale qualifiée.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Qualité protocolaire" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture Californie & quartiers voisins" }
          ]
        };
      case 'ain-diab':
        return {
          title: "🚑 Ambulance Casablanca Aïn Diab – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Réponse rapide (8-12 min) à Aïn Diab et front de mer – personnel médical qualifié – service disponible jour et nuit.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Spécialiste front de mer" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture Aïn Diab & Corniche" }
          ]
        };
      case 'maarif':
        return {
          title: "🚑 Ambulance Casablanca Maârif – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Intervention rapide (10-15 min) dans le quartier Maârif et zones commerçantes – équipe expérimentée – disponible 24h/24.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Zone commerciale & résidentielle" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture Maârif & Centre-Ville" }
          ]
        };
      case 'gauthier':
        return {
          title: "🚑 Ambulance Casablanca Gauthier – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Réponse rapide (8-12 min) dans le quartier Gauthier et zones résidentielles – personnel qualifié – service continu jour et nuit.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Zone résidentielle premium" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture Gauthier & Racine" }
          ]
        };
      case 'bourgogne':
        return {
          title: "🚑 Ambulance Casablanca Bourgogne – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Intervention rapide (10-15 min) dans le quartier Bourgogne et environs – équipe médicale expérimentée – disponibilité 24h/24.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Zone résidentielle & commerciale" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture Bourgogne & alentours" }
          ]
        };
      case 'ain-sebaa':
        return {
          title: "🚑 Ambulance Casablanca Aïn Sebaâ – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Réponse rapide (10-15 min) dans Aïn Sebaâ et zones industrielles voisines – personnel médical expérimenté – service disponible jour et nuit.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Interventions industrielles & résidentielles" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture Aïn Sebaâ & Sidi Bernoussi" }
          ]
        };
      case 'oasis':
        return {
          title: "🚑 Ambulance Casablanca Oasis – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Intervention rapide (10-15 min) dans le quartier Oasis et zones résidentielles – équipe qualifiée – service continu 24h/24.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Zone résidentielle moderne" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture Oasis & Hay Hassani" }
          ]
        };
      case 'sidi-maarouf':
        return {
          title: "🚑 Ambulance Casablanca Sidi Maârouf – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Réponse rapide (8-12 min) dans Sidi Maârouf et zones d'affaires – personnel expérimenté – couverture entreprises et résidences.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Spécialiste zones d'affaires" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture Sidi Maârouf & CFC" }
          ]
        };
      case 'sidi-belyout':
        return {
          title: "🚑 Ambulance Casablanca Sidi Belyout – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Intervention rapide (8-12 min) dans le quartier Sidi Belyout et zones centrales – équipe médicale qualifiée – service disponible 24h/24.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Centre-ville & zones d'affaires" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture Sidi Belyout & Centre" }
          ]
        };
      case 'ain-chock':
        return {
          title: "🚑 Ambulance Casablanca Aïn Chock – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Intervention rapide (10-15 min) dans Aïn Chock et zones universitaires – équipe médicale qualifiée – service disponible 24h/24.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Zone universitaire & résidentielle" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture Aïn Chock & environs" }
          ]
        };
      case 'bouskoura':
        return {
          title: "🚑 Ambulance Bouskoura – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Réponse rapide (12-18 min) dans Bouskoura et communes avoisinantes – personnel médical expérimenté – couverture résidentielle et industrielle.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Zones résidentielles & industrielles" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture Bouskoura & Nouaceur" }
          ]
        };
      case 'sidi-bernoussi':
        return {
          title: "🚑 Ambulance Casablanca Sidi Bernoussi – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Intervention rapide (10-15 min) dans Sidi Bernoussi et zones industrielles – équipe expérimentée – service continu jour et nuit.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Spécialiste zones industrielles" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture Sidi Bernoussi & Port" }
          ]
        };
      case 'derb-sultan':
        return {
          title: "🚑 Ambulance Casablanca Derb Sultan – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Réponse rapide (8-12 min) dans Derb Sultan et centre administratif – personnel qualifié – couverture commerciale et résidentielle.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Centre administratif & commercial" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture Derb Sultan & Centre-Ville" }
          ]
        };
      case 'casablanca':
        return {
          title: "🚑 Ambulance Casablanca – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Temps de réponse moyen : 8–15 min • Couverture nationale • Personnel qualifié",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Qualité protocolaire" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture nationale" }
          ]
        };
      case 'rabat':
        return {
          title: "🚑 Ambulance Rabat – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Temps de réponse moyen : 10–15 min • Couverture Rabat-Salé-Kénitra • Personnel qualifié",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Service prioritaire institutions" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Transport diplomatique autorisé" }
          ]
        };
      case 'marrakech':
        return {
          title: "🚑 Ambulance Marrakech – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Temps de réponse moyen : 12–18 min • Équipes multilingues • Accès médina optimisé",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Équipes multilingues (FR/EN/AR)" },
            { icon: "✔", text: "Accès optimisé médina" },
            { icon: "✔", text: "Service touristique 24h/24" }
          ]
        };
      case 'tanger':
        return {
          title: "🚑 Ambulance Tanger – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Temps de réponse moyen : 15–20 min • Service transfrontalier • Couverture zone industrielle",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Service transfrontalier" },
            { icon: "✔", text: "Couverture zone industrielle TFZ" },
            { icon: "✔", text: "Coordination internationale" }
          ]
        };
      case 'fes':
        return {
          title: "🚑 Ambulance Fès – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Temps de réponse moyen : 15–20 min • Véhicules adaptés médina • Service universitaire renforcé",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Véhicules adaptés médina" },
            { icon: "✔", text: "Service universitaire renforcé" },
            { icon: "✔", text: "Couverture zones historiques" }
          ]
        };
      case 'agadir':
        return {
          title: "🚑 Ambulance Agadir – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Temps de réponse moyen : 12–18 min • Urgences aquatiques • Service zones hôtelières",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Urgences aquatiques et nautiques" },
            { icon: "✔", text: "Service zones hôtelières" },
            { icon: "✔", text: "Équipes formées tourisme" }
          ]
        };
      case 'meknes':
        return {
          title: "🚑 Ambulance Meknès – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Temps de réponse moyen : 18–25 min • Couverture zones agricoles • Service sites historiques",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Couverture zones agricoles" },
            { icon: "✔", text: "Service sites historiques" },
            { icon: "✔", text: "Coordination avec Fès" }
          ]
        };
      case 'oujda':
        return {
          title: "🚑 Ambulance Oujda – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Temps de réponse moyen : 20–25 min • Service transfrontalier • Couverture zones commerciales",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Service transfrontalier" },
            { icon: "✔", text: "Couverture zones commerciales" },
            { icon: "✔", text: "Service zones rurales" }
          ]
        };
      case 'tetouan':
        return {
          title: "🚑 Ambulance Tétouan – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Temps de réponse moyen : 20–30 min • Interventions en altitude • Service zones montagneuses",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Interventions en altitude" },
            { icon: "✔", text: "Service zones montagneuses" },
            { icon: "✔", text: "Urgences rurales Rif" }
          ]
        };
      case 'laayoune':
        return {
          title: "🚑 Ambulance Laâyoune – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Temps de réponse moyen : 15–25 min • Véhicules tout-terrain • Service conditions désertiques",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Véhicules tout-terrain" },
            { icon: "✔", text: "Service conditions désertiques" },
            { icon: "✔", text: "Transport longue distance" }
          ]
        };
      case 'mohammedia':
        return {
          title: "🚑 Ambulance Mohammedia – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Temps de réponse moyen : 15–20 min • Coordination avec Casablanca • Service zones résidentielles",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Coordination avec Casablanca" },
            { icon: "✔", text: "Service zones résidentielles" },
            { icon: "✔", text: "Couverture littorale" }
          ]
        };
      case 'kenitra':
        return {
          title: "🚑 Ambulance Kénitra – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Temps de réponse moyen : 18–25 min • Service zones agricoles • Coordination avec Rabat",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Service zones agricoles" },
            { icon: "✔", text: "Coordination avec Rabat" },
            { icon: "✔", text: "Couverture Gharb" }
          ]
        };
      case 'sale':
        return {
          title: "🚑 Ambulance Salé – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Temps de réponse moyen : 12–18 min • Coordination avec Rabat • Service zones résidentielles",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Coordination avec Rabat" },
            { icon: "✔", text: "Service zones résidentielles" },
            { icon: "✔", text: "Couverture Bouregreg" }
          ]
        };
      
      // Quartiers de Rabat
      case 'agdal':
        return {
          title: "🚑 Ambulance Rabat Agdal – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Intervention rapide (10-15 min) dans Agdal et zones universitaires — équipe expérimentée — service continu jour et nuit.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Spécialiste zones universitaires" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture Agdal & Hassan" }
          ]
        };
      case 'hassan':
        return {
          title: "🚑 Ambulance Rabat Hassan – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Intervention rapide (8-12 min) dans Hassan et centre administratif — équipe expérimentée — service continu jour et nuit.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Spécialiste centre administratif" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture Hassan & Medina" }
          ]
        };
      case 'hay-riad':
        return {
          title: "🚑 Ambulance Rabat Hay Riad – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Intervention rapide (10-15 min) dans Hay Riad et résidences — équipe expérimentée — service continu jour et nuit.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Spécialiste résidences modernes" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture Hay Riad & Souissi" }
          ]
        };
      case 'souissi':
        return {
          title: "🚑 Ambulance Rabat Souissi – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Intervention rapide (12-18 min) dans Souissi et quartier diplomatique — équipe expérimentée — service continu jour et nuit.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Spécialiste quartier diplomatique" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture Souissi & Hay Riad" }
          ]
        };
      case 'yacoub-el-mansour':
        return {
          title: "🚑 Ambulance Rabat Yacoub El Mansour – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Intervention rapide (10-15 min) dans Yacoub El Mansour et zones résidentielles — équipe expérimentée — service continu jour et nuit.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Spécialiste zones résidentielles" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture Yacoub El Mansour & Hassan" }
          ]
        };
      case 'gueliz':
        return {
          title: "🚑 Ambulance Privée Marrakech Guéliz – Urgences 24h/24, transport médicalisé centre-ville",
          subtitle: "Intervention rapide (8-15 min) dans Guéliz — avenue Mohammed V, centres commerciaux, cliniques — ambulance privée professionnelle.",
          badge: "Service ambulance privée partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Ambulance privée agréée" },
            { icon: "✔", text: "Centre-ville & zones commerciales" },
            { icon: "✔", text: "Accès cliniques rapide" },
            { icon: "✔", text: "Équipes multilingues" }
          ]
        };
      case 'hivernage':
        return {
          title: "🚑 Ambulance Marrakech Hivernage – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Intervention rapide (10-15 min) dans Hivernage et zones hôtelières — équipe expérimentée — service continu jour et nuit.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Service premium hôtelier" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Clientèle internationale" }
          ]
        };
      case 'medina':
        return {
          title: "🚑 Ambulance Marrakech Médina – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Intervention rapide (10-15 min) dans la Médina et quartiers historiques — équipe expérimentée — service continu jour et nuit.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Accès Médina optimisé" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Connaissance patrimoine" }
          ]
        };
      case 'sidi-ghanem':
        return {
          title: "🚑 Ambulance Marrakech Sidi Ghanem – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Intervention rapide (10-15 min) dans Sidi Ghanem et zones industrielles — équipe expérimentée — service continu jour et nuit.",
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Zone industrielle" },
            { icon: "✔", text: "Accidents du travail" },
            { icon: "✔", text: "Protocoles spécialisés" }
          ]
        };
      case 'palmeraie':
        return {
          title: "🚑 Ambulance Privée Marrakech Palmeraie – Urgences 24h/24, ambulance privée et transport médicalisé",
          subtitle: "Intervention rapide (8-12 min) dans la Palmeraie — villas de prestige, golfs et résidences — ambulance privée professionnelle — service 24h/24.",
          badge: "Service ambulance privée partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Ambulance privée agréée" },
            { icon: "✔", text: "Zone résidentielle de prestige" },
            { icon: "✔", text: "Transport médicalisé discret" },
            { icon: "✔", text: "Service VIP & golf" }
          ]
        };
      default:
        return {
          title: h1 || `🚑 Ambulance ${city} – Urgences 24h/24, ambulance privée et transport médicalisé`,
          subtitle: subtitle || `Temps de réponse moyen : 15–25 min • Couverture régionale • Personnel qualifié`,
          badge: "Service disponible partout au Maroc — 24/7",
          features: [
            { icon: "✔", text: "Agréé" },
            { icon: "✔", text: "Qualité protocolaire" },
            { icon: "✔", text: "Intervention rapide" },
            { icon: "✔", text: "Couverture régionale" }
          ]
        };
    }
  };

  const config = quarterVariant ? getQuarterConfig(quarterVariant) : getQuarterConfig('default');

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden" aria-label={`Section présentation – ambulance à ${city}`}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${ambulanceHero})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
      </div>
      
      {/* SEO and Accessibility Image */}
      <img 
        src={ambulanceHero} 
        alt={`Ambulance à ${city} – intervention rapide 24/7`} 
        className="sr-only" 
        loading="lazy"
      />

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl">
          <div className="space-y-6">
            {/* Location Badge */}
            <div className="inline-flex items-center bg-card/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
              <MapPin className="h-4 w-4 mr-2 text-primary" />
              {config.badge}
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {config.title}
            </h1>
            
            <div className="text-xl md:text-2xl text-white/90 space-y-2">
              <p>{config.subtitle}</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                variant="emergency" 
                size="lg" 
                className="text-lg px-8 py-4 h-auto"
                asChild
              >
                <CallButton phone="+212777722311" className="flex items-center justify-center">
                  <Phone className="h-6 w-6 mr-3" />
                  📞 Appelez maintenant
                </CallButton>
              </Button>
              
              <Button 
                variant="success" 
                size="lg" 
                className="text-lg px-8 py-4 h-auto"
                asChild
              >
                <WhatsAppButton phone="+212777722311" className="flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 mr-3" />
                  💬 WhatsApp direct
                </WhatsAppButton>
              </Button>
              
              <Button 
                variant="cta" 
                size="lg" 
                className="text-lg px-8 py-4 h-auto bg-white text-primary hover:bg-white/90"
                asChild
              >
                <a href="#demande-ambulance" className="flex items-center justify-center">
                  🚑 Demander une ambulance
                </a>
              </Button>
            </div>

            {/* Trust Indicators - Spécifiques au quartier */}
            <div className="pt-8 flex flex-wrap gap-6 text-white/80 text-sm">
              {config.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="h-2 w-2 bg-success rounded-full mr-2"></div>
                  {feature.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Emergency Contact (Mobile) */}
      <div className="fixed bottom-4 right-4 z-50 lg:hidden">
        <Button variant="emergency" size="lg" className="rounded-full shadow-2xl" asChild>
          <CallButton phone="+212777722311" className="rounded-full shadow-2xl" aria-label="Appel d'urgence">
            <Phone className="h-6 w-6" />
            <span className="sr-only">Appeler maintenant</span>
          </CallButton>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;