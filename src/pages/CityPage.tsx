
import { useParams, useLocation, Link } from "react-router-dom";
import { cities } from "@/data/cities";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReassuranceSection from "@/components/ReassuranceSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactForm from "@/components/ContactForm";
import SEO from "@/components/SEO";
import { generateLocalBusinessSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MessageCircle, MapPin, Clock, Users, CheckCircle, Shield, Star, Zap } from "lucide-react";
import { SITE_URL } from "@/lib/config";
import { CallButton, WhatsAppButton } from "@/components/ContactCTA";
import HeroSection from "@/components/HeroSection";
// Mapping des quartiers selon la logique fournie
const neighborhoodMapping = {
  // Quartiers de Casablanca
  'ain-diab': ['bourgogne', 'maarif', 'anfa', 'gauthier'],
  'bourgogne': ['ain-diab', 'maarif', 'racine', 'gauthier'],
  'maarif': ['bourgogne', 'racine', 'ain-diab', 'gauthier'],
  'racine': ['maarif', 'gauthier', 'bourgogne', 'anfa'],
  'anfa': ['ain-diab', 'racine', 'gauthier', 'maarif'],
  'gauthier': ['bourgogne', 'racine', 'maarif', 'anfa'],
  'ain-sebaa': ['sidi-bernoussi', 'roches-noires', 'hay-mohammadi', 'belvedere'],
  'sidi-bernoussi': ['ain-sebaa', 'roches-noires', 'hay-mohammadi', 'derb-sultan'],
  'roches-noires': ['belvedere', 'ain-sebaa', 'sidi-bernoussi', 'hay-mohammadi'],
  'belvedere': ['roches-noires', 'derb-sultan', 'hay-mohammadi', 'centre-ville'],
  'hay-mohammadi': ['roches-noires', 'belvedere', 'ain-sebaa', 'derb-sultan'],
  'derb-sultan': ['belvedere', 'hay-mohammadi', 'centre-ville', 'sidi-bernoussi'],
  'centre-ville': ['belvedere', 'gauthier', 'racine', 'maarif'],
  'oasis': ['sidi-maarouf', 'californie', 'bouskoura', 'ain-chock'],
  'sidi-maarouf': ['oasis', 'californie', 'bouskoura', 'ain-chock'],
  'californie': ['oasis', 'sidi-maarouf', 'bouskoura', 'ain-chock'],
  'bouskoura': ['oasis', 'sidi-maarouf', 'californie', 'ain-chock'],
  'ain-chock': ['oasis', 'sidi-maarouf', 'californie', 'bouskoura'],
  'sidi-belyout': ['gauthier', 'maarif', 'centre-ville', 'racine'],
  
  // Quartiers de Rabat
  'agdal': ['hassan', 'hay-riad', 'souissi', 'yacoub-el-mansour'],
  'hassan': ['agdal', 'yacoub-el-mansour', 'hay-riad', 'souissi'],
  'hay-riad': ['agdal', 'souissi', 'hassan', 'yacoub-el-mansour'],
  'souissi': ['hay-riad', 'agdal', 'hassan', 'yacoub-el-mansour'],
  'yacoub-el-mansour': ['hassan', 'agdal', 'hay-riad', 'souissi']
};

const neighborhoodLabels = {
  // Quartiers de Casablanca
  'ain-diab': 'Aïn Diab',
  'bourgogne': 'Bourgogne',
  'maarif': 'Maârif',
  'racine': 'Racine',
  'anfa': 'Anfa',
  'gauthier': 'Gauthier',
  'ain-sebaa': 'Aïn Sebaâ',
  'sidi-bernoussi': 'Sidi Bernoussi',
  'roches-noires': 'Roches Noires',
  'belvedere': 'Belvédère',
  'hay-mohammadi': 'Hay Mohammadi',
  'derb-sultan': 'Derb Sultan',
  'centre-ville': 'Centre-ville',
  'oasis': 'Oasis',
  'sidi-maarouf': 'Sidi Maârouf',
  'californie': 'Californie',
  'bouskoura': 'Bouskoura',
  'ain-chock': 'Aïn Chock',
  'sidi-belyout': 'Sidi Belyout',
  
  // Quartiers de Rabat
  'agdal': 'Agdal',
  'hassan': 'Hassan',
  'hay-riad': 'Hay Riad',
  'souissi': 'Souissi',
  'yacoub-el-mansour': 'Yacoub El Mansour'
};

const getRandomCities = (currentSlug: string, count = 4) => {
  const pool = cities
    .filter((c) => c.slug !== currentSlug)
    .map((c) => ({ name: c.name, slug: c.slug }));
  return pool.sort(() => 0.5 - Math.random()).slice(0, count);
};

const getRelatedNeighborhoods = (currentNeighborhood: string, currentCity: string) => {
  const related = neighborhoodMapping[currentNeighborhood] || [];
  return related.map(slug => ({
    name: neighborhoodLabels[slug] || slug,
    slug: `ambulance-${currentCity}-${slug}`
  }));
};

const CityPage = () => {
  const { citySlug } = useParams();
  const location = useLocation();
  
  // Extract city slug from URL path using react-router location (SSR-safe)
  const extractSlugFromPath = () => {
    const path = location?.pathname || "/";
    if (path.startsWith("/ambulance-")) {
      return path.replace("/ambulance-", "").replace(/\/$/, "");
    }
    const m = path.match(/^\/([^/]+)/);
    return m ? m[1] : "";
  };
  
  const rawSlug = citySlug || extractSlugFromPath();
  const baseCandidate = rawSlug.split('-')[0];
  const normalizedSlug = cities.some(c => c.slug === baseCandidate) ? baseCandidate : rawSlug;
  const city = cities.find(c => c.slug === normalizedSlug);
  const relatedCities = getRandomCities(normalizedSlug, 4);
  
  // Détection du quartier actuel pour le maillage interne
  const isNeighborhoodPage = location?.pathname?.includes("/ambulance-casablanca-") || location?.pathname?.includes("/ambulance-rabat-");
  let currentNeighborhood = null;
  let currentCity = null;
  
  if (isNeighborhoodPage) {
    if (location.pathname.includes("/ambulance-casablanca-")) {
      currentNeighborhood = location.pathname.replace("/ambulance-casablanca-", "").replace(/\/$/, "");
      currentCity = "casablanca";
    } else if (location.pathname.includes("/ambulance-rabat-")) {
      currentNeighborhood = location.pathname.replace("/ambulance-rabat-", "").replace(/\/$/, "");
      currentCity = "rabat";
    }
  }
  
  const relatedNeighborhoods = currentNeighborhood && currentCity ? getRelatedNeighborhoods(currentNeighborhood, currentCity) : [];
  const siteUrl = SITE_URL;
  // SEO data optimisé pour chaque ville
  const seoData = {
    casablanca: {
      title: "Ambulance Casablanca - Service d'Urgence 24h/24 | Ambulance Maroc",
      description: "Besoin d'une ambulance à Casablanca ? Service rapide, professionnel et disponible 24h/24 pour toutes vos urgences médicales. Contactez-nous immédiatement.",
    },
    rabat: {
      title: "Ambulance Rabat - Service d'Urgence 24h/24 | Ambulance Maroc",
      description: "Besoin d'une ambulance à Rabat ? Intervention rapide, 24h/24, dans tous les quartiers. Équipe médicale expérimentée, véhicules équipés. Appelez-nous dès maintenant.",
    },
    marrakech: {
      title: "🚑 Ambulance Marrakech - Intervention rapide 24h/24 | Ambulance Maroc",
      description: "Besoin d'une ambulance à Marrakech ? Nos équipes interviennent 24h/24 en moins de 15 min. Services médicaux, touristiques et urgences. 📞 +212 7777 223 11",
    },
    tanger: {
      title: "Ambulance Tanger - Service Médical 24h/24 | Ambulance Maroc",
      description: "Urgence ou transport médical à Tanger ? Nos ambulances sont prêtes à intervenir 24h/24, avec du personnel qualifié et une couverture sur toute la région.",
    },
    agadir: {
      title: "Ambulance Agadir - Service d'Urgence 24h/24 | Ambulance Maroc",
      description: "Besoin d'une ambulance à Agadir ? Service rapide, sécurisé et disponible 24h/24 pour tous types d'urgences médicales dans la région Souss-Massa.",
    },
    fes: {
      title: "Ambulance Fès - Service Médical d'Urgence 24h/24 | Ambulance Maroc",
      description: "Besoin d'une ambulance à Fès ? Intervention rapide 24h/24, personnel qualifié et véhicules équipés. Appelez dès maintenant pour une prise en charge immédiate.",
    },
    meknes: {
      title: "Ambulance Meknès - Intervention Médicale Rapide 24h/24 | Ambulance Maroc",
      description: "Ambulance à Meknès disponible 24h/24 pour urgences, transferts et hospitalisations. Service fiable, rapide et professionnel dans toute la région.",
    },
    oujda: {
      title: "Ambulance Oujda - Service d'Urgence 24h/24 | Ambulance Maroc",
      description: "Ambulance à Oujda disponible jour et nuit pour urgences médicales et transferts vers cliniques et hôpitaux. Intervention rapide et professionnelle 7j/7.",
    },
    tetouan: {
      title: "Ambulance Tétouan - Service d’Urgence 24h/24 | Ambulance Maroc",
      description: "Ambulance à Tétouan disponible 24h/24 pour toutes urgences médicales. Transferts vers hôpitaux, interventions rapides, et équipes qualifiées.",
    },
    laayoune: {
      title: "Ambulance Laâyoune - Transport Médical Rapid et Fiable",
      description: "Intervention ambulanciere à Laâyoune en urgence. Transfert hospitalier, assistance médicale, prise en charge rapide.",
    },
    mohammedia: {
      title: "Ambulance Mohammedia - Services Sanitaires Immédiats",
      description: "Ambulance privée à Mohammedia disponible pour urgence et hospitalisation. Intervention express et accompagnement médical.",
    },
    kenitra: {
      title: "Ambulance Kénitra - Intervention Médicale Urgente 24h/24 | Ambulance Maroc",
      description: "Ambulance à Kénitra disponible jour et nuit. Transferts hospitaliers, urgences, évacuations sanitaires. Équipe qualifiée. Appel immédiat possible.",
    },
  };

  const cityData = seoData[city?.slug] || {};
  const isCalifornieVariant = location?.pathname?.includes("/ambulance-casablanca-californie");
  const isAinDiabVariant = location?.pathname?.includes("/ambulance-casablanca-ain-diab");
  const isMaarifVariant = location?.pathname?.includes("/ambulance-casablanca-maarif");
  const isGauthierVariant = location?.pathname?.includes("/ambulance-casablanca-gauthier");
  const isBourgogeVariant = location?.pathname?.includes("/ambulance-casablanca-bourgogne");
  const isAinSebaaVariant = location?.pathname?.includes("/ambulance-casablanca-ain-sebaa");
  const isOasisVariant = location?.pathname?.includes("/ambulance-casablanca-oasis");
  const isSidiMaaroufVariant = location?.pathname?.includes("/ambulance-casablanca-sidi-maarouf");
  const isAinChockVariant = location?.pathname?.includes("/ambulance-casablanca-ain-chock");
  const isBouskouraVariant = location?.pathname?.includes("/ambulance-casablanca-bouskoura");
  const isSidiBernoussiVariant = location?.pathname?.includes("/ambulance-casablanca-sidi-bernoussi");
  const isDerbSultanVariant = location?.pathname?.includes("/ambulance-casablanca-derb-sultan");
  const isSidiBelyoutVariant = location?.pathname?.includes("/ambulance-casablanca-sidi-belyout");
  
  // Quartiers de Rabat
  const isAgdalVariant = location?.pathname?.includes("/ambulance-rabat-agdal");
  const isHassanVariant = location?.pathname?.includes("/ambulance-rabat-hassan");
  const isHayRiadVariant = location?.pathname?.includes("/ambulance-rabat-hay-riad");
  const isSouissiVariant = location?.pathname?.includes("/ambulance-rabat-souissi");
  const isYacoubElMansourVariant = location?.pathname?.includes("/ambulance-rabat-yacoub-el-mansour");
  const baseTitle = cityData.title || `Ambulance à ${city?.name} – Intervention rapide 24/7 | Ambulance Maroc` || "Ville non trouvée";
  const baseDescription = cityData.description || `Ambulance à ${city?.name}, intervention 24/7. Temps de réponse ${city?.responseTime}. ${city?.coverage}.` || "";
  const baseCanonical = city ? `${siteUrl}/ambulance-${city.slug}` : `${siteUrl}/`;

  const title = isCalifornieVariant
    ? "Ambulance Casablanca Californie – Ambulance privée Californie 24/7"
    : isAinDiabVariant
    ? "Ambulance Casablanca Ain Diab – Ambulance privée Ain Diab 24/7"
    : isMaarifVariant
    ? "Ambulance Casablanca Maârif – Ambulance privée Maârif 24/7"
    : isGauthierVariant
    ? "Ambulance Casablanca Gauthier – Ambulance privée Gauthier 24/7"
    : isBourgogeVariant
    ? "Ambulance Casablanca Bourgogne – Ambulance privée Bourgogne 24/7"
    : isAinSebaaVariant
    ? "Ambulance Casablanca Aïn Sebaâ – Ambulance privée Aïn Sebaâ 24/7"
    : isOasisVariant
    ? "Ambulance Casablanca Oasis – Ambulance privée Oasis 24/7"
    : isSidiMaaroufVariant
    ? "Ambulance Casablanca Sidi Maârouf – Ambulance privée Sidi Maârouf 24/7"
    : isAinChockVariant
    ? "Ambulance Casablanca Aïn Chock – Ambulance privée Aïn Chock 24/7"
    : isBouskouraVariant
    ? "Ambulance Bouskoura – Ambulance privée Bouskoura 24/7"
    : isSidiBernoussiVariant
    ? "Ambulance Casablanca Sidi Bernoussi – Ambulance privée Sidi Bernoussi 24/7"
    : isDerbSultanVariant
    ? "Ambulance Casablanca Derb Sultan – Ambulance privée Derb Sultan 24/7"
    : isSidiBelyoutVariant
    ? "Ambulance Casablanca Sidi Belyout – Ambulance privée Sidi Belyout 24/7"
    : isAgdalVariant
    ? "Ambulance Rabat Agdal – Ambulance privée Agdal 24/7"
    : isHassanVariant
    ? "Ambulance Rabat Hassan – Ambulance privée Hassan 24/7"
    : isHayRiadVariant
    ? "Ambulance Rabat Hay Riad – Ambulance privée Hay Riad 24/7"
    : isSouissiVariant
    ? "Ambulance Rabat Souissi – Ambulance privée Souissi 24/7"
    : isYacoubElMansourVariant
    ? "Ambulance Rabat Yacoub El Mansour – Ambulance privée Yacoub El Mansour 24/7"
    : baseTitle;

  const description = isCalifornieVariant
    ? "Ambulance Casablanca Californie: intervention rapide 24/7 à Californie. Ambulance privée Californie, transport médicalisé. Appelez +212 7777 223 11."
    : isAinDiabVariant
    ? "Ambulance Casablanca Ain Diab: intervention rapide 24/7 à Ain Diab. Ambulance privée Ain Diab, transport médicalisé. Appelez +212 7777 223 11."
    : isMaarifVariant
    ? "Ambulance Casablanca Maârif: intervention rapide 24/7 à Maârif. Ambulance privée Maârif, transport médicalisé. Appelez +212 7777 223 11."
    : isGauthierVariant
    ? "Ambulance Casablanca Gauthier: intervention rapide 24/7 à Gauthier. Ambulance privée Gauthier, transport médicalisé. Appelez +212 7777 223 11."
    : isBourgogeVariant
    ? "Ambulance Casablanca Bourgogne: intervention rapide 24/7 à Bourgogne. Ambulance privée Bourgogne, transport médicalisé. Appelez +212 7777 223 11."
    : isAinSebaaVariant
    ? "Ambulance Casablanca Aïn Sebaâ: intervention rapide 24/7 à Aïn Sebaâ. Ambulance privée Aïn Sebaâ, transport médicalisé. Appelez +212 7777 223 11."
    : isOasisVariant
    ? "Ambulance Casablanca Oasis: intervention rapide 24/7 à Oasis. Ambulance privée Oasis, transport médicalisé. Appelez +212 7777 223 11."
    : isSidiMaaroufVariant
    ? "Ambulance Casablanca Sidi Maârouf: intervention rapide 24/7 à Sidi Maârouf. Ambulance privée Sidi Maârouf, transport médicalisé. Appelez +212 7777 223 11."
    : isAinChockVariant
    ? "Ambulance Casablanca Aïn Chock: intervention rapide 24/7 à Aïn Chock. Ambulance privée Aïn Chock, transport médicalisé. Appelez +212 7777 223 11."
    : isBouskouraVariant
    ? "Ambulance Bouskoura: intervention rapide 24/7 à Bouskoura. Ambulance privée Bouskoura, transport médicalisé. Appelez +212 7777 223 11."
    : isSidiBernoussiVariant
    ? "Ambulance Casablanca Sidi Bernoussi: intervention rapide 24/7 à Sidi Bernoussi. Ambulance privée Sidi Bernoussi, transport médicalisé. Appelez +212 7777 223 11."
    : isDerbSultanVariant
    ? "Ambulance Casablanca Derb Sultan: intervention rapide 24/7 à Derb Sultan. Ambulance privée Derb Sultan, transport médicalisé. Appelez +212 7777 223 11."
    : isSidiBelyoutVariant
    ? "Ambulance Casablanca Sidi Belyout: intervention rapide 24/7 à Sidi Belyout. Ambulance privée Sidi Belyout, transport médicalisé. Appelez +212 7777 223 11."
    : isAgdalVariant
    ? "Ambulance Rabat Agdal: intervention rapide 24/7 à Agdal. Ambulance privée Agdal, transport médicalisé. Appelez +212 7777 223 11."
    : isHassanVariant
    ? "Ambulance Rabat Hassan: intervention rapide 24/7 à Hassan. Ambulance privée Hassan, transport médicalisé. Appelez +212 7777 223 11."
    : isHayRiadVariant
    ? "Ambulance Rabat Hay Riad: intervention rapide 24/7 à Hay Riad. Ambulance privée Hay Riad, transport médicalisé. Appelez +212 7777 223 11."
    : isSouissiVariant
    ? "Ambulance Rabat Souissi: intervention rapide 24/7 à Souissi. Ambulance privée Souissi, transport médicalisé. Appelez +212 7777 223 11."
    : isYacoubElMansourVariant
    ? "Ambulance Rabat Yacoub El Mansour: intervention rapide 24/7 à Yacoub El Mansour. Ambulance privée Yacoub El Mansour, transport médicalisé. Appelez +212 7777 223 11."
    : baseDescription;

  const keywords = isCalifornieVariant
    ? ["Ambulance Casablanca Californie","ambulance privée Californie","ambulance casablanca","ambulance privée casablanca"]
    : isAinDiabVariant
    ? ["Ambulance Casablanca Ain Diab","ambulance privée Ain Diab","ambulance casablanca","ambulance privée casablanca"]
    : isMaarifVariant
    ? ["Ambulance Casablanca Maârif","ambulance privée Maârif","ambulance casablanca","ambulance privée casablanca"]
    : isGauthierVariant
    ? ["Ambulance Casablanca Gauthier","ambulance privée Gauthier","ambulance casablanca","ambulance privée casablanca"]
    : isBourgogeVariant
    ? ["Ambulance Casablanca Bourgogne","ambulance privée Bourgogne","ambulance casablanca","ambulance privée casablanca"]
    : isAinSebaaVariant
    ? ["Ambulance Casablanca Aïn Sebaâ","ambulance privée Aïn Sebaâ","ambulance casablanca","ambulance privée casablanca"]
    : isOasisVariant
    ? ["Ambulance Casablanca Oasis","ambulance privée Oasis","ambulance casablanca","ambulance privée casablanca"]
    : isSidiMaaroufVariant
    ? ["Ambulance Casablanca Sidi Maârouf","ambulance privée Sidi Maârouf","ambulance casablanca","ambulance privée casablanca"]
    : isAinChockVariant
    ? ["Ambulance Casablanca Aïn Chock","ambulance privée Aïn Chock","ambulance casablanca","ambulance privée casablanca"]
    : isBouskouraVariant
    ? ["Ambulance Bouskoura","ambulance privée Bouskoura","ambulance casablanca","ambulance privée casablanca"]
    : isSidiBernoussiVariant
    ? ["Ambulance Casablanca Sidi Bernoussi","ambulance privée Sidi Bernoussi","ambulance casablanca","ambulance privée casablanca"]
    : isDerbSultanVariant
    ? ["Ambulance Casablanca Derb Sultan","ambulance privée Derb Sultan","ambulance casablanca","ambulance privée casablanca"]
    : isSidiBelyoutVariant
    ? ["Ambulance Casablanca Sidi Belyout","ambulance privée Sidi Belyout","ambulance casablanca","ambulance privée casablanca"]
    : isAgdalVariant
    ? ["Ambulance Rabat Agdal","ambulance privée Agdal","ambulance rabat","ambulance privée rabat"]
    : isHassanVariant
    ? ["Ambulance Rabat Hassan","ambulance privée Hassan","ambulance rabat","ambulance privée rabat"]
    : isHayRiadVariant
    ? ["Ambulance Rabat Hay Riad","ambulance privée Hay Riad","ambulance rabat","ambulance privée rabat"]
    : isSouissiVariant
    ? ["Ambulance Rabat Souissi","ambulance privée Souissi","ambulance rabat","ambulance privée rabat"]
    : isYacoubElMansourVariant
    ? ["Ambulance Rabat Yacoub El Mansour","ambulance privée Yacoub El Mansour","ambulance rabat","ambulance privée rabat"]
    : undefined;

  const canonical = isCalifornieVariant
    ? `${siteUrl}/ambulance-casablanca-californie`
    : isAinDiabVariant
    ? `${siteUrl}/ambulance-casablanca-ain-diab`
    : isMaarifVariant
    ? `${siteUrl}/ambulance-casablanca-maarif`
    : isGauthierVariant
    ? `${siteUrl}/ambulance-casablanca-gauthier`
    : isBourgogeVariant
    ? `${siteUrl}/ambulance-casablanca-bourgogne`
    : isAinSebaaVariant
    ? `${siteUrl}/ambulance-casablanca-ain-sebaa`
    : isOasisVariant
    ? `${siteUrl}/ambulance-casablanca-oasis`
    : isSidiMaaroufVariant
    ? `${siteUrl}/ambulance-casablanca-sidi-maarouf`
    : isAinChockVariant
    ? `${siteUrl}/ambulance-casablanca-ain-chock`
    : isBouskouraVariant
    ? `${siteUrl}/ambulance-casablanca-bouskoura`
    : isSidiBernoussiVariant
    ? `${siteUrl}/ambulance-casablanca-sidi-bernoussi`
    : isDerbSultanVariant
    ? `${siteUrl}/ambulance-casablanca-derb-sultan`
    : isSidiBelyoutVariant
    ? `${siteUrl}/ambulance-casablanca-sidi-belyout`
    : isAgdalVariant
    ? `${siteUrl}/ambulance-rabat-agdal`
    : isHassanVariant
    ? `${siteUrl}/ambulance-rabat-hassan`
    : isHayRiadVariant
    ? `${siteUrl}/ambulance-rabat-hay-riad`
    : isSouissiVariant
    ? `${siteUrl}/ambulance-rabat-souissi`
    : isYacoubElMansourVariant
    ? `${siteUrl}/ambulance-rabat-yacoub-el-mansour`
    : baseCanonical;

  const h1Text = isCalifornieVariant
    ? "Ambulance Casablanca Californie – Intervention 24/7"
    : isAinDiabVariant
    ? "Ambulance Casablanca Ain Diab – Intervention 24/7"
    : isMaarifVariant
    ? "Ambulance Casablanca Maârif – Intervention 24/7"
    : isGauthierVariant
    ? "Ambulance Casablanca Gauthier – Intervention 24/7"
    : isBourgogeVariant
    ? "Ambulance Casablanca Bourgogne – Intervention 24/7"
    : isAinSebaaVariant
    ? "Ambulance Casablanca Aïn Sebaâ – Intervention 24/7"
    : isOasisVariant
    ? "Ambulance Casablanca Oasis – Intervention 24/7"
    : isSidiMaaroufVariant
    ? "Ambulance Casablanca Sidi Maârouf – Intervention 24/7"
    : isAinChockVariant
    ? "Ambulance Casablanca Aïn Chock – Intervention 24/7"
    : isBouskouraVariant
    ? "Ambulance Bouskoura – Intervention 24/7"
    : isSidiBernoussiVariant
    ? "Ambulance Casablanca Sidi Bernoussi – Intervention 24/7"
    : isDerbSultanVariant
    ? "Ambulance Casablanca Derb Sultan – Intervention 24/7"
    : isSidiBelyoutVariant
    ? "Ambulance Casablanca Sidi Belyout – Intervention 24/7"
    : isAgdalVariant
    ? "Ambulance Rabat Agdal – Intervention 24/7"
    : isHassanVariant
    ? "Ambulance Rabat Hassan – Intervention 24/7"
    : isHayRiadVariant
    ? "Ambulance Rabat Hay Riad – Intervention 24/7"
    : isSouissiVariant
    ? "Ambulance Rabat Souissi – Intervention 24/7"
    : isYacoubElMansourVariant
    ? "Ambulance Rabat Yacoub El Mansour – Intervention 24/7"
    : `Ambulance à ${city?.name} – Intervention 24/7`;

  // EmergencyService JSON-LD (uniform across cities)
  const emergencySchema = city ? generateLocalBusinessSchema(city) : undefined;
  const jsonLdArray: Record<string, any>[] = [];
  if (emergencySchema) jsonLdArray.push(emergencySchema);


  if (!city) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Ville non trouvée</h1>
            <p className="text-xl text-gray-600 mb-8">
              Cette ville n'est pas encore dans notre zone de couverture.
            </p>
            <Button asChild>
            <CallButton phone="+212777722311">Contactez-nous</CallButton>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO title={title} description={description} canonical={canonical} jsonLdMultiple={jsonLdArray} keywords={keywords} />
      <Header city={city.name} />
      
      {/* Hero Section optimisé par quartier */}
      <HeroSection 
        city={city.name} 
        quarterVariant={
          isCalifornieVariant ? 'californie' :
          isAinDiabVariant ? 'ain-diab' :
          isMaarifVariant ? 'maarif' :
          isGauthierVariant ? 'gauthier' :
          isBourgogeVariant ? 'bourgogne' :
          isAinSebaaVariant ? 'ain-sebaa' :
          isOasisVariant ? 'oasis' :
          isSidiMaaroufVariant ? 'sidi-maarouf' :
          isAinChockVariant ? 'ain-chock' :
          isBouskouraVariant ? 'bouskoura' :
          isSidiBernoussiVariant ? 'sidi-bernoussi' :
          isDerbSultanVariant ? 'derb-sultan' :
          isSidiBelyoutVariant ? 'sidi-belyout' :
          isAgdalVariant ? 'agdal' :
          isHassanVariant ? 'hassan' :
          isHayRiadVariant ? 'hay-riad' :
          isSouissiVariant ? 'souissi' :
          isYacoubElMansourVariant ? 'yacoub-el-mansour' :
          (city?.slug === 'casablanca' ? 'casablanca' : 
           city?.slug === 'rabat' ? 'rabat' : undefined)
        }
      />

      {/* City Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-emergency">Temps de Réponse</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">{city.responseTime}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle>Couverture</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">{city.coverage}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle>Population</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">{city.population}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle>Région</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-gray-900">{city.region}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* City Description */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
{isCalifornieVariant ? (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Service d’Ambulance à Casablanca – Quartier Californie
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    Le prestigieux quartier Californie à Casablanca bénéficie de notre service d’ambulance haut de gamme, avec une présence renforcée pour répondre rapidement à toutes les urgences médicales. Grâce à notre flotte moderne et nos équipes qualifiées, nous assurons un temps d’intervention réduit et une prise en charge sécurisée, 24h/24 et 7j/7.
                  </p>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Spécificités locales :</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🚑 5 ambulances dédiées au quartier Californie, prêtes à intervenir en permanence</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">📍 Couverture complète des résidences, écoles internationales et zones résidentielles haut standing</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🤝 Partenariats privilégiés avec les cliniques privées et hôpitaux proches de Californie</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">👨‍💼 Service VIP et assistance premium pour particuliers et entreprises locales</span>
                      </li>
                    </ul>
                  </div>
                </>
              ) : isAinDiabVariant ? (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Service d'Ambulance à Casablanca – Quartier Ain Diab
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    Le dynamique quartier d'Ain Diab à Casablanca bénéficie de notre service d'ambulance de haute qualité, avec une couverture optimale pour répondre rapidement à toutes les urgences médicales. Notre équipe d'intervention spécialisée assure une prise en charge rapide et sécurisée, 24h/24 et 7j/7, dans ce secteur stratégique de la ville.
                  </p>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Spécificités locales :</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🚑 Couverture de la Corniche, Morocco Mall et complexes hôteliers</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">📍 Intervention rapide dans les zones résidentielles et touristiques</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🤝 Service premium adapté au secteur hôtelier et résidentiel</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🏥 Liaison directe avec les cliniques privées d'Ain Diab</span>
                      </li>
                    </ul>
                  </div>
                </>
              ) : isMaarifVariant ? (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Service d'Ambulance à Casablanca – Quartier Maârif
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    Le quartier résidentiel de Maârif à Casablanca bénéficie de notre service d'ambulance professionnel et réactif, avec une couverture étendue pour répondre efficacement à toutes les urgences médicales. Notre équipe expérimentée assure une prise en charge rapide et sécurisée, 24h/24 et 7j/7, dans ce secteur central de la ville.
                  </p>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Spécificités locales :</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🚑 Couverture complète des zones résidentielles et commerciales</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">📍 Intervention rapide vers Gauthier, Racine et Centre-Ville</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🤝 Service adapté aux entreprises et particuliers du secteur</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🏥 Accès privilégié aux centres médicaux de Maârif</span>
                      </li>
                    </ul>
                  </div>
                </>
              ) : isGauthierVariant ? (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Service d'Ambulance à Casablanca – Quartier Gauthier
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    Le quartier central de Gauthier à Casablanca bénéficie de notre service d'ambulance professionnel et efficace, avec une couverture optimale pour répondre rapidement à toutes les urgences médicales. Notre équipe qualifiée assure une prise en charge rapide et sécurisée, 24h/24 et 7j/7, dans ce secteur stratégique de la ville.
                  </p>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Spécificités locales :</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🚑 Couverture des zones résidentielles et commerciales</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">📍 Accès privilégié vers Maârif, Racine et Centre-Ville</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🤝 Service adapté aux bureaux et résidences du quartier</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🏥 Proximité avec les établissements médicaux de Gauthier</span>
                      </li>
                    </ul>
                  </div>
                </>
              ) : isBourgogeVariant ? (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Service d'Ambulance à Casablanca – Quartier Bourgogne
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    Le quartier résidentiel de Bourgogne à Casablanca bénéficie de notre service d'ambulance efficace et fiable, avec une couverture complète pour répondre rapidement à toutes les urgences médicales. Notre équipe spécialisée assure une prise en charge rapide et sécurisée, 24h/24 et 7j/7, dans ce secteur privilégié de la ville.
                  </p>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Spécificités locales :</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🚑 Couverture des zones résidentielles et commerciales</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">📍 Accès rapide vers Racine, Gauthier et Maârif</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🤝 Service adapté aux résidences et entreprises locales</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🏥 Liaison avec les centres médicaux du secteur</span>
                      </li>
                    </ul>
                  </div>
                </>
              ) : isAinSebaaVariant ? (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Service d'Ambulance à Casablanca – Quartier Aïn Sebaâ
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    Le quartier industriel et résidentiel d'Aïn Sebaâ à Casablanca bénéficie de notre service d'ambulance professionnel et réactif, avec une couverture étendue pour répondre efficacement à toutes les urgences médicales. Notre équipe expérimentée assure une prise en charge rapide et sécurisée, 24h/24 et 7j/7, dans ce secteur stratégique de la ville.
                  </p>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Spécificités locales :</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🚑 Couverture des zones résidentielles et industrielles</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">📍 Accès au Port et zones industrielles</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🤝 Service adapté aux entreprises et particuliers</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🏥 Liaison directe avec les centres médicaux d'Aïn Sebaâ</span>
                      </li>
                    </ul>
                  </div>
                </>
              ) : isOasisVariant ? (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Service d'Ambulance à Casablanca – Quartier Oasis
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    Le quartier moderne d'Oasis à Casablanca bénéficie de notre service d'ambulance professionnel et réactif, avec une couverture adaptée pour répondre efficacement à toutes les urgences médicales. Notre équipe expérimentée assure une prise en charge rapide et sécurisée, 24h/24 et 7j/7, dans ce secteur résidentiel en développement.
                  </p>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Spécificités locales :</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🚑 Couverture des nouvelles zones résidentielles et espaces verts</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">📍 Intervention rapide vers Hay Hassani et Oulfa</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🤝 Service adapté aux familles et résidences modernes</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🏥 Accès facilité aux centres médicaux environnants</span>
                      </li>
                    </ul>
                  </div>
                </>
              ) : isSidiMaaroufVariant ? (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Service d'Ambulance à Casablanca – Quartier Sidi Maârouf
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    Le quartier d'affaires de Sidi Maârouf à Casablanca bénéficie de notre service d'ambulance spécialisé et hautement réactif, avec une couverture optimale pour répondre aux urgences dans ce pôle économique majeur. Notre équipe expérimentée assure une prise en charge rapide et professionnelle, 24h/24 et 7j/7.
                  </p>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Spécificités locales :</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🚑 Couverture CFC, zones d'affaires et sièges sociaux</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">📍 Intervention rapide vers Aïn Chock et Nouaceur</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🤝 Service premium adapté aux entreprises et cadres</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🏥 Liaison directe avec les cliniques privées du secteur</span>
                      </li>
                    </ul>
                  </div>
                </>
              ) : isAinChockVariant ? (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Service d'Ambulance à Casablanca – Quartier Aïn Chock
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    Le quartier universitaire d'Aïn Chock à Casablanca bénéficie de notre service d'ambulance adapté et réactif, avec une couverture spécialisée pour répondre aux besoins spécifiques de cette zone estudiantine et résidentielle. Notre équipe qualifiée assure une prise en charge rapide et sécurisée, 24h/24 et 7j/7.
                  </p>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Spécificités locales :</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🚑 Couverture campus universitaires et cités étudiantes</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">📍 Intervention rapide vers Sidi Maârouf et Californie</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🤝 Service adapté étudiants, familles et jeunes professionnels</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🏥 Accès facilité aux centres de santé universitaires</span>
                      </li>
                    </ul>
                  </div>
                </>
              ) : isBouskouraVariant ? (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Service d'Ambulance à Bouskoura
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    La commune de Bouskoura bénéficie de notre service d'ambulance étendu et professionnel, avec une couverture adaptée pour répondre aux urgences dans cette zone résidentielle et industrielle en expansion. Notre équipe expérimentée assure une prise en charge rapide et sécurisée, 24h/24 et 7j/7.
                  </p>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Spécificités locales :</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🚑 Couverture zones résidentielles, industrielles et commerciales</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">📍 Intervention vers Nouaceur, Dar Bouazza et périphérie</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🤝 Service adapté entreprises industrielles et résidents</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🏥 Liaison avec centres médicaux régionaux</span>
                      </li>
                    </ul>
                  </div>
                </>
              ) : isSidiBernoussiVariant ? (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Service d'Ambulance à Casablanca – Quartier Sidi Bernoussi
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    Le quartier industriel de Sidi Bernoussi à Casablanca bénéficie de notre service d'ambulance spécialisé et robuste, avec une couverture adaptée aux spécificités de cette zone industrielle majeure. Notre équipe expérimentée assure une prise en charge rapide et efficace, 24h/24 et 7j/7, adaptée aux urgences industrielles et résidentielles.
                  </p>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Spécificités locales :</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🚑 Couverture zones industrielles, port et entreprises</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">📍 Intervention rapide vers Aïn Sebaâ et zones portuaires</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🤝 Service spécialisé accidents industriels et urgences</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🏥 Protocoles renforcés pour milieux industriels</span>
                      </li>
                    </ul>
                  </div>
                </>
              ) : isDerbSultanVariant ? (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Service d'Ambulance à Casablanca – Quartier Derb Sultan
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    Le quartier central de Derb Sultan à Casablanca bénéficie de notre service d'ambulance stratégiquement positionné, avec une couverture optimale pour ce secteur administratif et commercial majeur. Notre équipe expérimentée assure une prise en charge rapide et professionnelle, 24h/24 et 7j/7.
                  </p>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Spécificités locales :</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🚑 Couverture centre administratif et zones commerciales</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">📍 Intervention rapide vers Centre-Ville et Mers Sultan</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🤝 Service adapté administrations et entreprises centrales</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🏥 Accès privilégié aux hôpitaux du centre-ville</span>
                      </li>
                    </ul>
                  </div>
                </>
              ) : isSidiBelyoutVariant ? (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Service d'Ambulance à Casablanca – Quartier Sidi Belyout
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    Le quartier central de Sidi Belyout à Casablanca bénéficie de notre service d'ambulance stratégiquement positionné, avec une couverture optimale pour ce secteur résidentiel et d'affaires privilégié. Notre équipe expérimentée assure une prise en charge rapide et professionnelle, 24h/24 et 7j/7.
                  </p>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Spécificités locales :</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🚑 Couverture centre d'affaires et zones résidentielles</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">📍 Intervention rapide vers Maârif, Gauthier et Centre-Ville</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🤝 Service premium adapté aux entreprises et résidences</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🏥 Accès facilité aux cliniques privées du secteur</span>
                      </li>
                    </ul>
                  </div>
                </>
              ) : isAgdalVariant ? (
                <>
                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        🚨 Service Ambulance Rabat Agdal 24h/24 et 7j/7
                      </h2>
                      <p className="mb-6">
                        Vous êtes à Agdal et avez besoin d'une intervention médicale rapide ? Notre service d'ambulance à Rabat Agdal couvre toutes les situations : urgences vitales, transferts médicaux, hospitalisations programmées ou soins à domicile. Présents 24h/24 et 7j/7, nous intervenons dans tout Agdal et ses environs en moins de 15 minutes pour assurer une prise en charge rapide et sécurisée.
                      </p>
                    </div>

                    <div className="border-l-4 border-primary/20 pl-4">
                      <span className="text-gray-400">⸻</span>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        👨‍⚕️ Ambulance privée à Rabat Agdal avec équipement complet
                      </h3>
                      <p className="mb-6">
                        Nos ambulances sont climatisées, dotées de matériel médical de pointe et accompagnées d'un personnel qualifié : auxiliaires ambulanciers, infirmiers, médecins urgentistes selon le besoin. Transports médicalisés, urgences à domicile, transferts cliniques : nous assurons des interventions conformes aux normes nationales et internationales.
                      </p>
                    </div>

                    <div className="border-l-4 border-primary/20 pl-4">
                      <span className="text-gray-400">⸻</span>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        📍 Zones couvertes à Agdal et alentours
                      </h3>
                      <p className="mb-6">
                        Nous intervenons dans toutes les rues et zones résidentielles, universitaires et commerciales d'Agdal, ainsi que dans les quartiers voisins : Hay Riad, Souissi, Centre-Ville et Yacoub El Mansour. Notre centrale d'appel est disponible 24h/24 et 7j/7 pour organiser un transfert ou dépêcher une ambulance immédiatement.
                      </p>
                    </div>

                    <div className="border-l-4 border-primary/20 pl-4">
                      <span className="text-gray-400">⸻</span>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        💬 Contact rapide
                      </h3>
                      <p className="mb-6">
                        Appelez le +212 7777 223 11 ou utilisez notre bouton WhatsApp sur le site pour nous contacter directement et obtenir une intervention immédiate.
                      </p>
                    </div>

                    <div className="border-l-4 border-primary/20 pl-4">
                      <span className="text-gray-400">⸻</span>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        ✅ Pourquoi choisir Ambulance Maroc à Rabat Agdal ?
                      </h3>
                      <ul className="list-none space-y-2 mb-6">
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>🚑 Réponse rapide 24h/24 – 7j/7</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>🏥 Couverture large : Agdal + quartiers voisins</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>🚐 Ambulances modernes, climatisées, parfaitement équipées</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>👨‍⚕️ Personnel formé et expérimenté, bilingue FR/AR</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>📌 Service d'ambulance privée adapté aux particuliers, entreprises et événements</span>
                        </li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-primary/20 pl-4">
                      <span className="text-gray-400">⸻</span>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        ℹ️ Infos pratiques
                      </h3>
                      <div className="space-y-2">
                        <p className="flex items-center gap-2">
                          <span>📞</span>
                          <span>Téléphone : +212 7777 223 11</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <span>📍</span>
                          <span>Rabat – Quartier Agdal et environs</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <span>🕐</span>
                          <span>Disponible 24h/24 – 7j/7</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Spécificités locales :</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🚑 Couverture campus universitaires et zones étudiantes</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">📍 Intervention rapide vers Hassan, Hay Riad et zones universitaires</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🤝 Service adapté étudiants, professeurs et résidents</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🏥 Accès privilégié aux centres de santé universitaires</span>
                      </li>
                    </ul>
                  </div>
                </>
              ) : isHassanVariant ? (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Service d'Ambulance à Rabat – Quartier Hassan
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    Le quartier administratif de Hassan à Rabat bénéficie de notre service d'ambulance hautement professionnel, avec une couverture renforcée pour ce secteur gouvernemental et institutionnel. Notre équipe expérimentée assure une prise en charge rapide et sécurisée, 24h/24 et 7j/7.
                  </p>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Spécificités locales :</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🚑 Couverture ministères, administrations et centre-ville</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">📍 Intervention rapide vers Médina, Agdal et zones gouvernementales</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🤝 Service premium adapté fonctionnaires et professionnels</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🏥 Accès facilité aux centres médicaux du centre-ville</span>
                      </li>
                    </ul>
                  </div>
                </>
              ) : isHayRiadVariant ? (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Service d'Ambulance à Rabat – Quartier Hay Riad
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    Le quartier résidentiel haut standing de Hay Riad à Rabat bénéficie de notre service d'ambulance premium, avec une couverture adaptée pour ce secteur moderne et familial. Notre équipe qualifiée assure une prise en charge rapide et confortable, 24h/24 et 7j/7.
                  </p>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Spécificités locales :</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🚑 Couverture résidences modernes et centres commerciaux</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">📍 Intervention rapide vers Souissi, Agdal et Madinat Al Irfane</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🤝 Service adapté familles et résidents aisés</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🏥 Accès privilégié aux cliniques privées du secteur</span>
                      </li>
                    </ul>
                  </div>
                </>
              ) : isSouissiVariant ? (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Service d'Ambulance à Rabat – Quartier Souissi
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    Le quartier diplomatique de Souissi à Rabat bénéficie de notre service d'ambulance spécialisé et sécurisé, avec une couverture adaptée aux exigences de ce secteur sensible et résidentiel. Notre équipe expérimentée assure une prise en charge discrète et professionnelle, 24h/24 et 7j/7.
                  </p>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Spécificités locales :</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🚑 Couverture ambassades, résidences diplomatiques et villas</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">📍 Intervention rapide vers Hay Riad et zones sécurisées</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🤝 Service VIP adapté diplomates et hauts fonctionnaires</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🏥 Coordination avec services médicaux spécialisés</span>
                      </li>
                    </ul>
                  </div>
                </>
              ) : isYacoubElMansourVariant ? (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Service d'Ambulance à Rabat – Quartier Yacoub El Mansour
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    Le quartier populaire de Yacoub El Mansour à Rabat bénéficie de notre service d'ambulance accessible et réactif, avec une couverture complète pour ce secteur résidentiel dynamique. Notre équipe dévouée assure une prise en charge rapide et efficace, 24h/24 et 7j/7.
                  </p>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Spécificités locales :</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🚑 Couverture quartiers résidentiels et commerces de proximité</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">📍 Intervention rapide vers Hassan et centre-ville</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🤝 Service adapté familles et communauté locale</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">🏥 Accès aux centres de santé communautaires</span>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Service d'Ambulance à {city.name}
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    {city.description}
                  </p>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Spécificités locales :</h3>
                    <ul className="space-y-3">
                      {city.specificities.map((spec, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
            <div className="relative">
              <img 
                src="/src/assets/medical-team.jpg" 
                alt={`Équipe médicale ${city.name}`}
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {city.slug === 'casablanca' && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            {isCalifornieVariant ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Service Ambulance Casablanca Californie 24h/24 et 7j/7</h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Ambulance Maroc propose un <strong>service d'ambulance à Casablanca Californie</strong> ultra-réactif, sécurisé et adapté à tous les types de situations : urgences vitales, transferts médicaux, hospitalisations planifiées ou soins à domicile. Nous couvrons tout le quartier de Californie à Casablanca, ainsi que ses zones voisines, pour offrir un service rapide et fiable à toute heure.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">👨‍⚕️ Ambulance privée à Casablanca Californie avec personnel qualifié</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Nos ambulances sont équipées pour le <strong>transport médicalisé à Casablanca Californie</strong>. Chaque intervention est assurée par un personnel médical qualifié : auxiliaires ambulanciers, infirmiers et médecins d'urgence selon les besoins. Nous garantissons une prise en charge conforme aux normes sanitaires et de sécurité, pour particuliers comme pour entreprises.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Disponibilité dans tout le secteur de Californie et ses alentours</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Nous intervenons dans toutes les zones résidentielles et commerciales de Californie, ainsi que dans les quartiers voisins : Aïn Chock, Sidi Maârouf, Oasis et Hay Hassani. <strong>Notre centrale d'appel est ouverte 24h/24 et 7j/7</strong> pour répondre à vos questions, organiser un transfert ou envoyer une ambulance en urgence.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">💬 Comment nous contacter ?</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Pour toute demande dans le quartier Californie à Casablanca, <strong>appelez le <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline">+212 7777 223 11</a></strong> ou utilisez notre bouton WhatsApp pour une réponse immédiate.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">✅ Pourquoi choisir Ambulance Maroc pour Casablanca Californie ?</h3>
                <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
                  <li>Réactivité 24h/24 et 7j/7 dans tout le quartier</li>
                  <li>Personnel médical qualifié et expérimenté</li>
                  <li>Ambulances modernes et bien équipées</li>
                  <li>Couverture complète de Californie et des zones voisines</li>
                  <li>Service d'<strong>ambulance privée Casablanca</strong> pour particuliers et entreprises</li>
                </ul>

                <div className="bg-gray-100 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
                  <div className="space-y-2 text-gray-700">
                    <p>📞 Téléphone : <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline font-semibold">+212 7777 223 11</a></p>
                    <p>📍 Casablanca – Quartier Californie et alentours</p>
                    <p>🕐 Service 24h/24 – 7j/7</p>
                  </div>
                </div>
              </>
            ) : isMaarifVariant ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Ambulance Casablanca Maârif – Intervention 24h/24 et 7j/7</h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Ambulance Maroc met à votre disposition un <strong>service d'ambulance à Casablanca Maârif</strong> rapide, fiable et sécurisé, adapté à toutes les situations : urgences vitales, transferts médicaux programmés, hospitalisations ou assistance à domicile. Nous couvrons l'ensemble du quartier de Maârif ainsi que ses environs immédiats, garantissant une prise en charge efficace à toute heure, de jour comme de nuit.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">👨‍⚕️ Ambulance privée à Maârif avec équipe médicale qualifiée</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Nos véhicules sont entièrement équipés pour le <strong>transport médicalisé dans le quartier Maârif</strong>. Chaque mission est assurée par des professionnels de santé qualifiés : auxiliaires ambulanciers, infirmiers et, si nécessaire, médecins d'urgence. Nos interventions respectent strictement les protocoles sanitaires et de sécurité, et s'adressent aussi bien aux particuliers qu'aux entreprises locales.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Zone d'intervention : Maârif et quartiers voisins</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Nous intervenons dans toutes les zones résidentielles, commerciales et administratives de Maârif, ainsi que dans les quartiers limitrophes comme Gauthier, Racine, Bourgogne et le Centre-Ville. <strong>Notre centrale d'appel est opérationnelle en continu, 24h/24 et 7j/7</strong>, pour organiser un transfert ou envoyer une ambulance immédiatement.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">💬 Nous contacter</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Pour toute demande d'intervention dans le quartier Maârif à Casablanca, <strong>composez le <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline">+212 7777 223 11</a></strong> ou utilisez notre bouton WhatsApp pour un traitement rapide.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">✅ Les avantages Ambulance Maroc à Maârif</h3>
                <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
                  <li>Disponibilité 24/7 dans tout le secteur</li>
                  <li>Personnel médical certifié et expérimenté</li>
                  <li>Ambulances modernes et parfaitement équipées</li>
                  <li>Couverture complète de Maârif et des quartiers proches</li>
                  <li>Service d'<strong>ambulance privée Casablanca</strong> pour particuliers et entreprises</li>
                </ul>

                <div className="bg-gray-100 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Informations utiles</h4>
                  <div className="space-y-2 text-gray-700">
                    <p>📞 Téléphone : <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline font-semibold">+212 7777 223 11</a></p>
                    <p>📍 Casablanca – Quartier Maârif et alentours</p>
                    <p>🕐 Service : 24h/24 – 7j/7</p>
                  </div>
                </div>
              </>
            ) : isAinSebaaVariant ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Service Ambulance Casablanca Aïn Sebaâ 24h/24 et 7j/7</h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Ambulance Maroc propose un <strong>service d'ambulance à Casablanca Aïn Sebaâ</strong> rapide, fiable et sécurisé, parfaitement adapté à toutes les situations : urgences vitales, transferts médicaux, hospitalisations planifiées ou soins à domicile. Nous couvrons l'ensemble du quartier d'Aïn Sebaâ ainsi que ses zones voisines, pour assurer un service efficace à toute heure, de jour comme de nuit.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">👨‍⚕️ Ambulance privée à Casablanca Aïn Sebaâ avec personnel qualifié</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Nos ambulances sont équipées pour le <strong>transport médicalisé dans le quartier d'Aïn Sebaâ</strong>. Chaque intervention est assurée par un personnel médical qualifié : auxiliaires ambulanciers, infirmiers et médecins d'urgence selon les besoins. Nous suivons des protocoles stricts pour garantir la sécurité et le confort des patients, que ce soit pour des particuliers ou pour des entreprises.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Disponibilité dans tout Aïn Sebaâ et ses alentours</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Nous intervenons dans toutes les zones résidentielles, industrielles et commerciales d'Aïn Sebaâ, ainsi que dans les quartiers proches : Hay Mohammadi, Sidi Bernoussi, Roches Noires et le Port de Casablanca. <strong>Notre centrale d'appel est disponible 24h/24 et 7j/7</strong> pour organiser un transfert ou envoyer une ambulance immédiatement.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">💬 Comment nous contacter ?</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Pour toute demande d'ambulance dans le quartier Aïn Sebaâ à Casablanca, <strong>appelez le <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline">+212 7777 223 11</a></strong> ou utilisez notre bouton WhatsApp pour une réponse rapide.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">✅ Pourquoi choisir Ambulance Maroc pour Casablanca Aïn Sebaâ ?</h3>
                <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
                  <li>Réactivité 24h/24 et 7j/7 dans tout le quartier</li>
                  <li>Personnel médical qualifié et expérimenté</li>
                  <li>Ambulances modernes et bien équipées</li>
                  <li>Couverture complète d'Aïn Sebaâ et des zones voisines</li>
                  <li>Service d'<strong>ambulance privée Casablanca</strong> pour particuliers et entreprises</li>
                </ul>

                <div className="bg-gray-100 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
                  <div className="space-y-2 text-gray-700">
                    <p>📞 Téléphone : <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline font-semibold">+212 7777 223 11</a></p>
                    <p>📍 Casablanca – Quartier Aïn Sebaâ et alentours</p>
                    <p>🕐 Service : 24h/24 – 7j/7</p>
                  </div>
                </div>
              </>
            ) : isBourgogeVariant ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Service Ambulance Casablanca Bourgogne – 24h/24 et 7j/7</h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Ambulance Maroc assure un <strong>service d'ambulance à Casablanca Bourgogne</strong> rapide, sûr et adapté à toutes les situations : urgences vitales, transferts médicaux planifiés, hospitalisations ou soins à domicile. Nous couvrons l'ensemble du quartier de Bourgogne ainsi que les zones avoisinantes, garantissant une intervention efficace à toute heure du jour ou de la nuit.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">👨‍⚕️ Ambulance privée à Casablanca Bourgogne avec équipe expérimentée</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Nos ambulances sont spécialement équipées pour le <strong>transport médicalisé dans le quartier de Bourgogne</strong>. Chaque intervention est menée par un personnel médical qualifié : auxiliaires ambulanciers, infirmiers et, selon le cas, médecins d'urgence. Nous suivons des protocoles stricts afin d'assurer la sécurité et le confort du patient, que ce soit pour des particuliers ou des entreprises locales.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Zone d'intervention : Bourgogne et alentours</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Nous intervenons dans toutes les zones résidentielles et commerciales de Bourgogne, ainsi que dans les quartiers proches tels que Racine, Gauthier, Maârif et Anfa. <strong>Notre centrale d'appel reste ouverte 24h/24 et 7j/7</strong> pour organiser vos transferts ou envoyer une ambulance immédiatement.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">💬 Prise de contact rapide</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Pour toute demande d'ambulance dans le quartier Bourgogne à Casablanca, <strong>composez le <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline">+212 7777 223 11</a></strong> ou utilisez notre bouton WhatsApp pour un traitement immédiat.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">✅ Pourquoi choisir Ambulance Maroc pour Casablanca Bourgogne ?</h3>
                <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
                  <li>Intervention rapide 24h/24 et 7j/7</li>
                  <li>Personnel médical qualifié et expérimenté</li>
                  <li>Ambulances modernes et entièrement équipées</li>
                  <li>Couverture complète de Bourgogne et des zones voisines</li>
                  <li>Service d'<strong>ambulance privée Casablanca</strong> pour particuliers et entreprises</li>
                </ul>

                <div className="bg-gray-100 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
                  <div className="space-y-2 text-gray-700">
                    <p>📞 Téléphone : <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline font-semibold">+212 7777 223 11</a></p>
                    <p>📍 Casablanca – Quartier Bourgogne et alentours</p>
                    <p>🕐 Service : 24h/24 – 7j/7</p>
                  </div>
                </div>
              </>
            ) : isGauthierVariant ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Service Ambulance Casablanca Gauthier 24h/24 et 7j/7</h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Ambulance Maroc propose un <strong>service d'ambulance à Casablanca Gauthier</strong> rapide, sécurisé et parfaitement adapté à toutes les situations : urgences vitales, transferts médicaux, hospitalisations planifiées ou soins à domicile. Nous couvrons l'ensemble du quartier de Gauthier ainsi que ses zones voisines, garantissant un service fiable à toute heure, de jour comme de nuit.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">👨‍⚕️ Ambulance privée à Casablanca Gauthier avec personnel qualifié</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Nos ambulances sont équipées pour le <strong>transport médicalisé dans le quartier de Gauthier</strong>. Chaque intervention est assurée par un personnel médical qualifié : auxiliaires ambulanciers, infirmiers et médecins d'urgence selon les besoins. Nous respectons des protocoles stricts pour assurer la sécurité et le confort des patients, que ce soit pour les particuliers ou pour les entreprises.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Disponibilité dans tout Gauthier et ses alentours</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Nous intervenons dans toutes les zones résidentielles et commerciales de Gauthier, ainsi que dans les quartiers voisins : Maârif, Racine, Bourgogne et Centre-Ville. <strong>Notre centrale d'appel reste disponible 24h/24 et 7j/7</strong> pour organiser un transfert ou envoyer une ambulance immédiatement.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">💬 Comment nous contacter ?</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Pour toute demande dans le quartier Gauthier à Casablanca, <strong>appelez le <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline">+212 7777 223 11</a></strong> ou utilisez notre bouton WhatsApp pour une réponse rapide.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">✅ Pourquoi choisir Ambulance Maroc pour Casablanca Gauthier ?</h3>
                <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
                  <li>Réactivité 24h/24 et 7j/7 dans tout le quartier</li>
                  <li>Personnel médical qualifié et expérimenté</li>
                  <li>Ambulances modernes et bien équipées</li>
                  <li>Couverture complète de Gauthier et des zones voisines</li>
                  <li>Service d'<strong>ambulance privée Casablanca</strong> pour particuliers et entreprises</li>
                </ul>

                <div className="bg-gray-100 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
                  <div className="space-y-2 text-gray-700">
                    <p>📞 Téléphone : <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline font-semibold">+212 7777 223 11</a></p>
                    <p>📍 Casablanca – Quartier Gauthier et alentours</p>
                    <p>🕐 Service : 24h/24 – 7j/7</p>
                  </div>
                </div>
              </>
            ) : isAinDiabVariant ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Service Ambulance Casablanca Ain Diab 24h/24 et 7j/7</h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Ambulance Maroc propose un <strong>service d'ambulance à Casablanca Ain Diab</strong> ultra-réactif, sécurisé et adapté à toutes les situations : urgences vitales, transferts médicaux, hospitalisations planifiées ou soins à domicile. Nous couvrons l'ensemble du quartier d'Ain Diab, ses zones résidentielles et touristiques, pour garantir un service rapide, fiable et disponible à toute heure.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">👨‍⚕️ Ambulance privée à Casablanca Ain Diab avec personnel qualifié</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Nos ambulances sont équipées pour le <strong>transport médicalisé à Casablanca Ain Diab</strong>. Chaque mission est assurée par un personnel médical qualifié : auxiliaires ambulanciers, infirmiers et médecins d'urgence selon les besoins. Nous intervenons dans un cadre strictement conforme aux normes sanitaires et de sécurité, offrant un service premium aux particuliers comme aux entreprises.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Disponibilité dans tout Ain Diab et ses environs</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Nous intervenons rapidement dans toutes les zones d'Ain Diab, y compris la Corniche, le Morocco Mall, les complexes hôteliers et résidentiels, ainsi que dans les quartiers voisins : Anfa, Bourgogne et Aïn Sebaâ. <strong>Notre centrale d'appel est disponible 24h/24 et 7j/7</strong> pour toute demande urgente ou organisation de transfert médical.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">💬 Comment nous contacter ?</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Pour toute demande dans le quartier Ain Diab à Casablanca, <strong>appelez le <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline">+212 7777 223 11</a></strong> ou utilisez notre bouton WhatsApp pour une prise en charge immédiate.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">✅ Pourquoi choisir Ambulance Maroc pour Casablanca Ain Diab ?</h3>
                <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
                  <li>Réactivité 24h/24 et 7j/7 dans tout le quartier</li>
                  <li>Personnel médical qualifié et expérimenté</li>
                  <li>Ambulances modernes et parfaitement équipées</li>
                  <li>Couverture complète d'Ain Diab et des zones voisines</li>
                  <li>Service d'<strong>ambulance privée Casablanca</strong> pour particuliers et entreprises</li>
                </ul>

                <div className="bg-gray-100 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
                  <div className="space-y-2 text-gray-700">
                    <p>📞 Téléphone : <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline font-semibold">+212 7777 223 11</a></p>
                    <p>📍 Casablanca – Quartier Ain Diab et alentours</p>
                    <p>🕐 Service 24h/24 – 7j/7</p>
                  </div>
                </div>
              </>
            ) : isAinChockVariant ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Service Ambulance Casablanca Aïn Chock 24h/24 et 7j/7</h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Ambulance Maroc vous propose un service d'ambulance à Casablanca Aïn Chock rapide, sécurisé et disponible à tout moment, pour tous types d'interventions médicales : urgences vitales, transferts vers hôpitaux, hospitalisations programmées ou assistance médicale à domicile. Nous intervenons dans tout le quartier d'Aïn Chock ainsi que dans les zones avoisinantes, garantissant une prise en charge efficace, de jour comme de nuit.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">👨‍⚕️ Ambulance privée à Casablanca Aïn Chock avec équipe expérimentée</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Nos ambulances sont spécialement équipées pour assurer un transport médicalisé dans le quartier d'Aïn Chock. Chaque mission est menée par un personnel médical qualifié : auxiliaires ambulanciers, infirmiers et médecins d'urgence selon la situation. Nous appliquons des protocoles stricts afin de garantir le confort et la sécurité des patients, que ce soit pour des particuliers ou pour des entreprises locales.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Disponibilité à Aïn Chock et ses environs</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Nous intervenons dans toutes les zones résidentielles et universitaires d'Aïn Chock, ainsi que dans les quartiers voisins : Sidi Maârouf, Californie, Hay Hassani et Oasis. Notre centrale d'appel est joignable 24h/24 et 7j/7 pour organiser un transfert médical ou envoyer immédiatement une ambulance sur place.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">💬 Comment nous contacter ?</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Pour toute demande d'ambulance dans le quartier Aïn Chock à Casablanca, appelez le <strong><a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline">+212 7777 223 11</a></strong> ou utilisez notre bouton WhatsApp pour une réponse immédiate.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">✅ Pourquoi choisir Ambulance Maroc pour Casablanca Aïn Chock ?</h3>
                <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
                  <li>Réactivité 24h/24 et 7j/7 dans tout le quartier</li>
                  <li>Personnel médical qualifié et expérimenté</li>
                  <li>Ambulances modernes et parfaitement équipées</li>
                  <li>Couverture complète d'Aïn Chock et des zones voisines</li>
                  <li>Service d'ambulance privée Casablanca pour particuliers et entreprises</li>
                </ul>

                <div className="bg-gray-100 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
                  <div className="space-y-2 text-gray-700">
                    <p>📞 Téléphone : <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline font-semibold">+212 7777 223 11</a></p>
                    <p>📍 Casablanca – Quartier Aïn Chock et alentours</p>
                    <p>🕐 Service : 24h/24 – 7j/7</p>
                  </div>
                </div>
              </>
            ) : isSidiMaaroufVariant ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Service Ambulance Casablanca Sidi Maârouf 24h/24 et 7j/7</h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Ambulance Maroc met à votre disposition un service d'ambulance à Casablanca Sidi Maârouf rapide, sûr et disponible à tout moment, pour tous types d'interventions : urgences vitales, transferts médicaux, hospitalisations prévues ou assistance à domicile. Nous desservons l'ensemble du quartier de Sidi Maârouf ainsi que les zones environnantes, afin de garantir une prise en charge efficace, de jour comme de nuit.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">👨‍⚕️ Ambulance privée à Casablanca Sidi Maârouf avec équipe qualifiée</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Nos ambulances sont spécialement équipées pour le transport médicalisé dans le quartier de Sidi Maârouf. Chaque mission est assurée par un personnel médical expérimenté : auxiliaires ambulanciers, infirmiers et médecins d'urgence selon la situation. Nous respectons des protocoles stricts pour garantir sécurité, confort et qualité de service, que ce soit pour les particuliers ou les entreprises implantées localement.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Disponibilité à Sidi Maârouf et dans les secteurs proches</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Nous intervenons dans toutes les zones résidentielles et professionnelles de Sidi Maârouf, ainsi que dans les quartiers limitrophes : Aïn Chock, Californie, Oasis et Hay Hassani. Notre centrale d'appel fonctionne en continu, 24h/24 et 7j/7, pour planifier un transfert ou envoyer une ambulance immédiatement.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">💬 Comment nous contacter ?</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Pour toute demande d'ambulance dans le quartier Sidi Maârouf à Casablanca, appelez le <strong><a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline">+212 7777 223 11</a></strong> ou utilisez notre bouton WhatsApp pour une réponse instantanée.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">✅ Pourquoi choisir Ambulance Maroc pour Casablanca Sidi Maârouf ?</h3>
                <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
                  <li>Réactivité 24h/24 et 7j/7 dans tout le secteur</li>
                  <li>Personnel médical qualifié et expérimenté</li>
                  <li>Ambulances modernes et parfaitement équipées</li>
                  <li>Couverture complète de Sidi Maârouf et des zones voisines</li>
                  <li>Service d'ambulance privée Casablanca pour particuliers et entreprises</li>
                </ul>

                <div className="bg-gray-100 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
                  <div className="space-y-2 text-gray-700">
                    <p>📞 Téléphone : <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline font-semibold">+212 7777 223 11</a></p>
                    <p>📍 Casablanca – Quartier Sidi Maârouf et alentours</p>
                    <p>🕐 Service : 24h/24 – 7j/7</p>
                  </div>
                </div>
              </>
            ) : isOasisVariant ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Service Ambulance Casablanca Oasis 24h/24 et 7j/7</h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Ambulance Maroc met à votre disposition un service d'ambulance à Casablanca Oasis rapide, sécurisé et fiable, adapté à toutes les situations : urgences vitales, transferts médicaux, hospitalisations programmées ou soins à domicile. Nous couvrons l'ensemble du quartier d'Oasis ainsi que ses environs, afin d'assurer une prise en charge efficace à toute heure, de jour comme de nuit.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">👨‍⚕️ Ambulance privée à Casablanca Oasis avec personnel qualifié</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Nos ambulances sont équipées pour le transport médicalisé dans le quartier d'Oasis. Chaque mission est effectuée par un personnel médical qualifié : auxiliaires ambulanciers, infirmiers et médecins d'urgence en fonction des besoins. Nous appliquons des protocoles stricts afin de garantir sécurité, confort et qualité de service, que ce soit pour des particuliers ou pour des entreprises implantées dans le secteur.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Disponibilité dans tout Oasis et ses alentours</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Nous intervenons dans toutes les zones résidentielles et commerciales d'Oasis, ainsi que dans les quartiers voisins : Californie, Aïn Chock, Maârif et Hay Hassani. Notre centrale d'appel reste joignable 24h/24 et 7j/7 pour organiser un transfert médical ou envoyer immédiatement une ambulance sur place.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">💬 Comment nous contacter ?</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Pour toute demande d'ambulance dans le quartier Oasis à Casablanca, composez le <strong><a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline">+212 7777 223 11</a></strong> ou utilisez notre bouton WhatsApp pour une prise en charge rapide.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">✅ Pourquoi choisir Ambulance Maroc pour Casablanca Oasis ?</h3>
                <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
                  <li>Réactivité 24h/24 et 7j/7 dans tout le quartier</li>
                  <li>Personnel médical qualifié et expérimenté</li>
                  <li>Ambulances modernes et entièrement équipées</li>
                  <li>Couverture complète d'Oasis et des zones avoisinantes</li>
                  <li>Service d'ambulance privée Casablanca pour particuliers et entreprises</li>
                </ul>

                <div className="bg-gray-100 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
                  <div className="space-y-2 text-gray-700">
                    <p>📞 Téléphone : <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline font-semibold">+212 7777 223 11</a></p>
                    <p>📍 Casablanca – Quartier Oasis et alentours</p>
                    <p>🕐 Service : 24h/24 – 7j/7</p>
                  </div>
                </div>
              </>
            ) : isSidiBernoussiVariant ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Service Ambulance Casablanca Sidi Bernoussi 24h/24 et 7j/7</h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Ambulance Maroc propose un service d'ambulance à Casablanca Sidi Bernoussi rapide, sûr et opérationnel en permanence, pour tous types de besoins médicaux : urgences vitales, transferts vers des hôpitaux, hospitalisations planifiées ou assistance médicale à domicile. Nous intervenons sur l'ensemble du quartier de Sidi Bernoussi ainsi que dans les secteurs environnants, afin d'assurer une prise en charge efficace à toute heure, de jour comme de nuit.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">👨‍⚕️ Ambulance privée à Casablanca Sidi Bernoussi avec personnel qualifié</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Nos ambulances sont parfaitement équipées pour le transport médicalisé dans la zone de Sidi Bernoussi. Chaque intervention est effectuée par un personnel médical expérimenté : auxiliaires ambulanciers, infirmiers et médecins d'urgence selon les besoins. Nous respectons des protocoles stricts afin de garantir sécurité, confort et qualité de service, que ce soit pour des particuliers ou pour des entreprises installées dans la zone.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Disponibilité à Sidi Bernoussi et alentours</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Nous couvrons toutes les zones résidentielles, industrielles et commerciales de Sidi Bernoussi, ainsi que les quartiers proches : Aïn Sebaâ, Hay Mohammadi, Roches Noires et le Port de Casablanca. Notre centrale d'appel reste disponible 24h/24 et 7j/7 pour organiser un transfert médical ou envoyer immédiatement une ambulance sur place.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">💬 Comment nous contacter ?</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Pour toute demande d'ambulance dans le quartier Sidi Bernoussi à Casablanca, appelez le <strong><a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline">+212 7777 223 11</a></strong> ou utilisez notre bouton WhatsApp pour une prise en charge immédiate.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">✅ Pourquoi choisir Ambulance Maroc pour Casablanca Sidi Bernoussi ?</h3>
                <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
                  <li>Réactivité 24h/24 et 7j/7 dans tout le quartier</li>
                  <li>Personnel médical qualifié et expérimenté</li>
                  <li>Ambulances modernes et parfaitement équipées</li>
                  <li>Couverture complète de Sidi Bernoussi et des zones voisines</li>
                  <li>Service d'ambulance privée Casablanca pour particuliers et entreprises</li>
                </ul>

                <div className="bg-gray-100 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
                  <div className="space-y-2 text-gray-700">
                    <p>📞 Téléphone : <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline font-semibold">+212 7777 223 11</a></p>
                    <p>📍 Casablanca – Quartier Sidi Bernoussi et alentours</p>
                    <p>🕐 Service : 24h/24 – 7j/7</p>
                  </div>
                </div>
              </>
            ) : isDerbSultanVariant ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Service Ambulance Casablanca Derb Sultan 24h/24 et 7j/7</h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Ambulance Maroc assure un service d'ambulance à Casablanca Derb Sultan rapide, sécurisé et disponible en permanence, pour tous types d'interventions médicales : urgences vitales, transferts vers hôpitaux, hospitalisations planifiées ou assistance médicale à domicile. Nous intervenons dans l'ensemble du quartier de Derb Sultan ainsi que dans les zones limitrophes, pour garantir une prise en charge efficace, de jour comme de nuit.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">👨‍⚕️ Ambulance privée à Casablanca Derb Sultan avec équipe qualifiée</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Nos ambulances sont équipées pour le transport médicalisé dans le secteur de Derb Sultan. Chaque mission est menée par un personnel médical qualifié : auxiliaires ambulanciers, infirmiers et médecins d'urgence selon la situation. Nous appliquons des procédures rigoureuses pour assurer sécurité, confort et qualité de service, que ce soit pour les particuliers ou pour les entreprises locales.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Disponibilité à Derb Sultan et dans les quartiers voisins</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Nous couvrons toutes les zones résidentielles, commerçantes et administratives de Derb Sultan, ainsi que les quartiers proches : El Fida, Mers Sultan, Hay Mohammadi et Centre-Ville. Notre centrale d'appel est joignable 24h/24 et 7j/7 pour organiser un transfert médical ou envoyer immédiatement une ambulance.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">💬 Comment nous contacter ?</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Pour toute demande d'ambulance dans le quartier Derb Sultan à Casablanca, appelez le <strong><a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline">+212 7777 223 11</a></strong> ou utilisez notre bouton WhatsApp pour une réponse rapide.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">✅ Pourquoi choisir Ambulance Maroc pour Casablanca Derb Sultan ?</h3>
                <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
                  <li>Réactivité 24h/24 et 7j/7 dans tout le quartier</li>
                  <li>Personnel médical qualifié et expérimenté</li>
                  <li>Ambulances modernes et bien équipées</li>
                  <li>Couverture complète de Derb Sultan et des zones voisines</li>
                  <li>Service d'ambulance privée Casablanca pour particuliers et entreprises</li>
                </ul>

                <div className="bg-gray-100 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
                  <div className="space-y-2 text-gray-700">
                    <p>📞 Téléphone : <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline font-semibold">+212 7777 223 11</a></p>
                    <p>📍 Casablanca – Quartier Derb Sultan et alentours</p>
                    <p>🕐 Service : 24h/24 – 7j/7</p>
                  </div>
                </div>
              </>
            ) : isSidiBelyoutVariant ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Service Ambulance Casablanca Sidi Belyout 24h/24 et 7j/7</h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Ambulance Maroc propose un service d'ambulance à Casablanca Sidi Belyout rapide, fiable et disponible à toute heure, pour répondre à tous les besoins médicaux : urgences vitales, transferts hospitaliers, hospitalisations programmées ou assistance médicale à domicile. Nous intervenons sur l'ensemble du quartier de Sidi Belyout ainsi que dans les secteurs voisins, garantissant une prise en charge professionnelle, de jour comme de nuit.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">👨‍⚕️ Ambulance privée à Casablanca Sidi Belyout avec personnel qualifié</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Nos ambulances sont équipées pour le transport médicalisé dans le quartier de Sidi Belyout. Chaque intervention est assurée par un personnel médical expérimenté : auxiliaires ambulanciers, infirmiers et médecins d'urgence selon la situation. Nous respectons des protocoles stricts pour garantir la sécurité, le confort et la qualité de service, que ce soit pour des particuliers ou pour des entreprises implantées localement.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Disponibilité à Sidi Belyout et alentours</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Nous couvrons toutes les zones résidentielles, administratives et commerciales de Sidi Belyout, ainsi que les quartiers proches : Centre-Ville, Maârif, Gauthier et Bourgogne. Notre centrale d'appel reste accessible 24h/24 et 7j/7 pour organiser un transfert médical ou envoyer immédiatement une ambulance sur place.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">💬 Comment nous contacter ?</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Pour toute demande d'ambulance dans le quartier Sidi Belyout à Casablanca, appelez le <strong><a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline">+212 7777 223 11</a></strong> ou utilisez notre bouton WhatsApp pour une prise en charge immédiate.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">✅ Pourquoi choisir Ambulance Maroc pour Casablanca Sidi Belyout ?</h3>
                <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
                  <li>Réactivité 24h/24 et 7j/7 dans tout le quartier</li>
                  <li>Personnel médical qualifié et expérimenté</li>
                  <li>Ambulances modernes et parfaitement équipées</li>
                  <li>Couverture complète de Sidi Belyout et des zones voisines</li>
                  <li>Service d'ambulance privée Casablanca pour particuliers et entreprises</li>
                </ul>

                <div className="bg-gray-100 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
                  <div className="space-y-2 text-gray-700">
                    <p>📞 Téléphone : <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline font-semibold">+212 7777 223 11</a></p>
                    <p>📍 Casablanca – Quartier Sidi Belyout et alentours</p>
                    <p>🕐 Service : 24h/24 – 7j/7</p>
                  </div>
                </div>
              </>
            ) : isBouskouraVariant ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Service Ambulance Bouskoura 24h/24 et 7j/7</h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Ambulance Maroc met à votre disposition un service d'ambulance à Bouskoura rapide, sécurisé et disponible à toute heure, pour tous types d'interventions médicales : urgences vitales, transferts hospitaliers, hospitalisations planifiées ou assistance médicale à domicile. Nous couvrons tout le secteur de Bouskoura ainsi que les zones avoisinantes, afin d'assurer une prise en charge efficace, de jour comme de nuit.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">👨‍⚕️ Ambulance privée à Bouskoura avec personnel expérimenté</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Nos ambulances sont spécialement équipées pour assurer le transport médicalisé dans la région de Bouskoura. Chaque mission est assurée par un personnel médical qualifié : auxiliaires ambulanciers, infirmiers et médecins d'urgence selon les besoins. Nous appliquons des protocoles rigoureux afin de garantir la sécurité, le confort et la qualité de chaque intervention, aussi bien pour les particuliers que pour les entreprises locales.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Disponibilité à Bouskoura et dans les environs</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Nous intervenons dans tous les secteurs résidentiels et zones industrielles de Bouskoura, ainsi que dans les communes voisines : Nouaceur, Dar Bouazza, Aïn Chock et Californie. Notre centrale d'appel est joignable 24h/24 et 7j/7 pour organiser un transfert ou dépêcher immédiatement une ambulance sur place.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">💬 Comment nous contacter ?</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Pour toute demande d'ambulance à Bouskoura, appelez le <strong><a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline">+212 7777 223 11</a></strong> ou utilisez notre bouton WhatsApp pour une prise en charge immédiate.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">✅ Pourquoi choisir Ambulance Maroc pour Bouskoura ?</h3>
                <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
                  <li>Réactivité 24h/24 et 7j/7 dans toute la région</li>
                  <li>Personnel médical qualifié et expérimenté</li>
                  <li>Ambulances modernes et parfaitement équipées</li>
                  <li>Couverture complète de Bouskoura et des zones voisines</li>
                  <li>Service d'ambulance privée pour particuliers et entreprises</li>
                </ul>

                <div className="bg-gray-100 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
                  <div className="space-y-2 text-gray-700">
                    <p>📞 Téléphone : <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline font-semibold">+212 7777 223 11</a></p>
                    <p>📍 Bouskoura et alentours</p>
                    <p>🕐 Service : 24h/24 – 7j/7</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Service Ambulance Casablanca 24h/24 et 7j/7</h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Ambulance Maroc propose un <strong>service d'ambulance à Casablanca</strong> ultra-réactif, sécurisé et adapté à tous les types de situations : urgences vitales, transferts médicaux, hospitalisations planifiées ou soins à domicile.
                  Nous opérons dans tous les quartiers de Casablanca : Maârif, Gauthier, Sidi Maarouf, Hay Hassani, Anfa, Ain Sebaâ, Derb Sultan, etc.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">👨‍⚕️ Ambulance privée à Casablanca avec personnel qualifié</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Nos ambulances sont équipées pour le <strong>transport médicalisé à Casablanca</strong>. Chaque intervention est assurée par un personnel qualifié : auxiliaires ambulanciers, infirmiers, médecins d'urgence selon le cas.
                  Le tout, dans un cadre réglementé, sécurisé et conforme aux standards nationaux et internationaux.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Disponibilité dans toute la région du Grand Casablanca</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Nous intervenons dans les zones urbaines comme périphériques : Bouskoura, Dar Bouazza, Nouaceur, Lissasfa, Aïn Diab, etc.
                  <strong> Notre centrale d'appel est disponible 24h/24</strong> pour vous orienter, répondre à vos questions ou planifier un transfert.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">💬 Comment nous contacter ?</h3>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Un seul numéro pour toutes vos demandes à Casablanca : <strong>Appelez le <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline">+212 7777 223 11</a></strong> ou cliquez sur notre bouton WhatsApp pour une réponse immédiate.
                </p>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Pourquoi choisir Ambulance Maroc ?</h3>
                <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
                  <li>✅ Réactivité 24h/24 dans toute la ville</li>
                  <li>✅ Personnel médical formé et expérimenté</li>
                  <li>✅ Ambulances modernes et bien équipées</li>
                  <li>✅ Intervention dans tous les arrondissements de Casablanca</li>
                  <li>✅ Service d'<strong>ambulance privé Casablanca</strong> pour particuliers et entreprises</li>
                </ul>

                <div className="bg-gray-100 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
                  <div className="space-y-2 text-gray-700">
                    <p>📞 Téléphone : <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline font-semibold">+212 7777 223 11</a></p>
                    <p>📍 Casablanca & périphérie</p>
                    <p>🕐 Service 24h/24 – 7j/7</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* Contenu SEO spécifique pour Marrakech */}
      {city.slug === 'marrakech' && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Service Ambulance Marrakech 24h/24 et 7j/7</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Que vous soyez un résident, un professionnel de santé ou un visiteur, <strong>notre service d'ambulance à Marrakech</strong> est prêt à intervenir à tout moment. Nous couvrons toute la ville : Guéliz, Médina, Ménara, Hivernage, route de Casablanca, route de l'Ourika ou encore Targa.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">👨‍⚕️ Ambulance privée à Marrakech avec personnel qualifié</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Chaque intervention se fait avec un véhicule équipé, un brancard sécurisé et un personnel médical ou paramédical. 
              <strong>Urgence ou transfert programmé</strong>, nous assurons tous les types de déplacements vers les cliniques et hôpitaux de Marrakech.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Zone d'intervention à Marrakech et alentours</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nous intervenons à Marrakech mais aussi dans la région : Tahannaout, Amizmiz, Ourika, Aït Ourir, ou Chichaoua. 
              Appelez notre <strong>standard 24h/24</strong> pour organiser une intervention immédiate ou planifiée.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">💬 Contactez-nous</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Appelez-nous directement au <strong><a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline">+212 7777 223 11</a></strong> ou envoyez-nous un message sur WhatsApp via le bouton sur notre site.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Pourquoi faire appel à Ambulance Maroc à Marrakech ?</h3>
            <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
              <li>✅ Disponibilité 24h/24 – 7j/7</li>
              <li>✅ Ambulances modernes, climatisées et équipées</li>
              <li>✅ Équipe médicale formée et réactive</li>
              <li>✅ Couverture de Marrakech et sa région</li>
              <li>✅ Intervention rapide à domicile, clinique, hôtel ou lieu public</li>
            </ul>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
              <div className="space-y-2 text-gray-700">
                <p>📞 Téléphone : <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline font-semibold">+212 7777 223 11</a></p>
                <p>📍 Marrakech & alentours</p>
                <p>🕐 Disponible 24h/24 – 7j/7</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contenu SEO spécifique pour Tanger */}
      {city.slug === 'tanger' && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Service Ambulance Tanger 24h/24 et 7j/7</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Que vous soyez un résident, un professionnel ou un visiteur, <strong>notre service d'ambulance à Tanger</strong> est prêt à intervenir à tout moment pour répondre à vos besoins médicaux.
              Nous couvrons toutes les zones de Tanger : Malabata, centre-ville, Marshan, Branes, Mghogha, ainsi que la zone franche, l'aéroport ou le port de Tanger Med.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">👨‍⚕️ Ambulance privée à Tanger avec prise en charge complète</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Chaque intervention se fait avec un équipement médical complet, et une équipe formée : auxiliaires ambulanciers, infirmiers ou médecins selon les cas. 
              <strong>Nous assurons aussi bien les urgences que les transferts programmés</strong> vers les hôpitaux publics ou cliniques privées.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Zone d'intervention étendue sur toute la région de Tanger-Tétouan</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nous intervenons à Tanger mais aussi à Tétouan, Fnideq, M'diq, Assilah ou Ksar El Kebir. 
              Appelez notre <strong>centre de coordination disponible 24h/24</strong> pour planifier un transport ou demander une ambulance en urgence.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">💬 Comment nous joindre ?</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Vous pouvez nous appeler directement au <strong><a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline">+212 7777 223 11</a></strong> ou cliquer sur le bouton WhatsApp depuis notre site pour une réponse immédiate.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Pourquoi faire appel à Ambulance Maroc à Tanger ?</h3>
            <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
              <li>✅ Service disponible 24h/24 et 7j/7</li>
              <li>✅ Couverture de toute la région Nord</li>
              <li>✅ Ambulances équipées et climatisées</li>
              <li>✅ Personnel qualifié, parlant arabe, français et parfois espagnol</li>
              <li>✅ Assistance aux passagers de ferry, touristes ou entreprises</li>
            </ul>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
              <div className="space-y-2 text-gray-700">
                <p>📞 Téléphone : <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline font-semibold">+212 7777 223 11</a></p>
                <p>📍 Tanger & région Nord</p>
                <p>🕐 Service 24h/24 – 7j/7</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contenu SEO spécifique pour Rabat */}
      {city.slug === 'rabat' && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Service Ambulance Rabat Yacoub El Mansour 24h/24 et 7j/7</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Vous êtes à Yacoub El Mansour et avez besoin d'une intervention médicale rapide ? Notre service d'ambulance à Rabat Yacoub El Mansour est disponible en continu pour répondre à toutes vos urgences : urgences vitales, transferts hospitaliers, soins programmés ou assistance médicale à domicile. Nous couvrons tout le secteur de Yacoub El Mansour ainsi que ses environs immédiats, avec un temps d'intervention moyen inférieur à 15 minutes.
            </p>

            <div className="border-l-4 border-primary pl-4 mb-8">
              <div className="h-px bg-gray-300 my-4"></div>
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">👨‍⚕️ Ambulance privée à Rabat Yacoub El Mansour avec équipement complet</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nos véhicules d'intervention sont climatisés, parfaitement équipés et accompagnés d'un personnel médical qualifié : auxiliaires ambulanciers, infirmiers et médecins d'urgence selon la situation. Transferts cliniques, évacuations, interventions à domicile : nous adaptons nos services à vos besoins, en toute sécurité et selon les normes médicales en vigueur.
            </p>

            <div className="border-l-4 border-primary pl-4 mb-8">
              <div className="h-px bg-gray-300 my-4"></div>
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Zones couvertes à Yacoub El Mansour et alentours</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nous intervenons dans toutes les zones résidentielles et commerciales de Yacoub El Mansour, ainsi que dans les quartiers proches : Hay Riad, Agdal, Souissi, Centre-Ville et Océan. Notre standard est accessible 24h/24 pour toute demande d'ambulance privée ou de transport médicalisé.
            </p>

            <div className="border-l-4 border-primary pl-4 mb-8">
              <div className="h-px bg-gray-300 my-4"></div>
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">💬 Contact rapide</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Appelez le <strong><a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline">+212 7777 223 11</a></strong> ou utilisez notre bouton WhatsApp pour obtenir une réponse immédiate et une prise en charge rapide.
            </p>

            <div className="border-l-4 border-primary pl-4 mb-8">
              <div className="h-px bg-gray-300 my-4"></div>
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">✅ Pourquoi choisir Ambulance Maroc à Yacoub El Mansour ?</h3>
            <ul className="list-none mb-8 text-gray-700 space-y-3">
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>🚑 Intervention rapide 24h/24 – 7j/7</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>🏥 Couverture complète : Yacoub El Mansour & alentours</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>🚐 Ambulances modernes, climatisées et sécurisées</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>👨‍⚕️ Personnel médical formé et expérimenté</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>📌 Service adapté aux particuliers, entreprises et événements</span>
              </li>
            </ul>

            <div className="border-l-4 border-primary pl-4 mb-8">
              <div className="h-px bg-gray-300 my-4"></div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
              <div className="space-y-2 text-gray-700">
                <p>📞 Téléphone : <a href="tel:+212777722311" className="text-primary hover:text-primary/80 underline font-semibold">+212 7777 223 11</a></p>
                <p>📍 Rabat – Quartier Yacoub El Mansour et alentours</p>
                <p>🕐 Service disponible : 24h/24 – 7j/7</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contenu SEO spécifique pour Fès */}
      {city.slug === 'fes' && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">🚑 Service Ambulance Fès disponible 24h/24 et 7j/7</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Avec Ambulance Maroc, bénéficiez d’un <strong>service d'ambulance à Fès</strong> fiable, professionnel et adapté à tous types de situations : urgence vitale, transfert médical, hospitalisation planifiée ou soins à domicile.
              Nos équipes couvrent tous les quartiers : Fès el Bali, Fès el Jadid, Agdal, Saïss, Route d’Imouzzer, etc.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">🩺 Ambulances privées à Fès avec personnel qualifié</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nos ambulances sont médicalisées et pilotées par du personnel qualifié : auxiliaires ambulanciers, infirmiers ou médecins en fonction de la situation.
              Chaque mission est encadrée dans le respect des normes de sécurité et de santé.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Zone d’intervention étendue dans le Saïss et la région de Fès-Meknès</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nous desservons également les alentours : Sefrou, Imouzzer Kandar, Bhalil, Meknès, ou encore El Hajeb.
              <strong>Appelez notre centrale 24h/24</strong> pour une intervention immédiate ou un transport planifié.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📞 Comment nous contacter ?</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Un simple appel suffit : <strong><a href="tel:+212600000000" className="text-primary hover:text-primary/80 underline">+212 6 00 00 00 00</a></strong> ou contactez-nous via WhatsApp pour une réponse instantanée.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Pourquoi faire confiance à Ambulance Maroc à Fès ?</h3>
            <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
              <li>✅ Intervention rapide dans tous les quartiers de Fès</li>
              <li>✅ Service disponible 24/7 même les jours fériés</li>
              <li>✅ Véhicules récents et parfaitement équipés</li>
              <li>✅ Personnel formé aux urgences et gestes de premiers secours</li>
              <li>✅ Couverture étendue à toute la région Fès-Saïss</li>
            </ul>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
              <div className="space-y-2 text-gray-700">
                <p>📞 Téléphone : <a href="tel:+212600000000" className="text-primary hover:text-primary/80 underline font-semibold">+212 6 00 00 00 00</a></p>
                <p>📍 Fès & région Fès-Meknès</p>
                <p>🕐 Service 24h/24 – 7j/7</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contenu SEO spécifique pour Agadir */}
      {city.slug === 'agadir' && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Service Ambulance Agadir 24h/24 et 7j/7</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              <strong>Ambulance Maroc intervient rapidement à Agadir</strong> pour toutes vos urgences : soins à domicile, transferts hospitaliers, évacuations médicales ou transport sanitaire.
              Nos véhicules couvrent le centre-ville ainsi que les zones périphériques comme Dcheira, Aït Melloul, Inezgane, Hay Mohammadi, Cité Dakhla, etc.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">👨‍⚕️ Ambulance privée à Agadir avec équipements complets</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nos ambulances sont équipées de matériel de réanimation et de surveillance. 
              Chaque intervention est assurée par du personnel qualifié : ambulanciers, infirmiers ou médecins, selon le niveau d'urgence.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Intervention dans toute la région Souss-Massa</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nous intervenons également dans les zones proches : Inezgane, Aït Melloul, Tikiouine, Drarga, ou même jusqu’à Taroudant si besoin.
              Appelez notre <strong>centre de régulation 24h/24</strong> pour une prise en charge rapide.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">💬 Comment nous joindre ?</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Contactez-nous immédiatement au <strong><a href="tel:+212600000000" className="text-primary hover:text-primary/80 underline">+212 6 00 00 00 00</a></strong> ou cliquez sur le bouton WhatsApp pour une réponse immédiate.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Pourquoi faire confiance à Ambulance Maroc à Agadir ?</h3>
            <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
              <li>✅ Disponibilité 24h/24 – 7j/7</li>
              <li>✅ Couverture large de toute la région Souss-Massa</li>
              <li>✅ Équipements médicaux de pointe</li>
              <li>✅ Personnel qualifié et bienveillant</li>
              <li>✅ Service d’ambulance privé pour particuliers, entreprises ou hôtels</li>
            </ul>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
              <div className="space-y-2 text-gray-700">
                <p>📞 Téléphone : <a href="tel:+212600000000" className="text-primary hover:text-primary/80 underline font-semibold">+212 6 00 00 00 00</a></p>
                <p>📍 Agadir & région Souss-Massa</p>
                <p>🕐 Service disponible 24h/24 et 7j/7</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contenu SEO spécifique pour Mohammedia */}
      {city.slug === 'mohammedia' && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Service Ambulance Mohammedia - Urgences 24h/24</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Notre service d'<strong>ambulance à Mohammedia</strong> est disponible à toute heure pour répondre à vos besoins : urgences, hospitalisations, soins à domicile ou transferts médicaux.
              Nous couvrons tous les quartiers : Al Wifaq, Sablettes, Al Houria, Hay Salam, El Alia, ainsi que la zone industrielle et la plage.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">👩‍⚕️ Équipe médicale professionnelle et véhicules équipés</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nos ambulances privées sont équipées pour assurer une prise en charge optimale avec brancards, oxygène, matériel de secours et défibrillateur. 
              <strong>Notre personnel est formé et certifié</strong> : auxiliaires, infirmiers et parfois médecin à bord selon le cas.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Zone couverte à Mohammedia et alentours</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nous intervenons aussi dans les environs : Zenata, Mansouria, Ben Yakhlef ou jusqu’à Aïn Harrouda. 
              Contactez notre <strong>standard 24h/24</strong> pour une intervention rapide ou une prise de rendez-vous.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📞 Comment nous contacter ?</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Appelez notre équipe au <strong><a href="tel:+212600000000" className="text-primary hover:text-primary/80 underline">+212 6 00 00 00 00</a></strong> ou utilisez le bouton WhatsApp de notre site pour une réponse immédiate.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Pourquoi faire confiance à Ambulance Maroc à Mohammedia ?</h3>
            <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
              <li>✅ Disponibilité 24/7</li>
              <li>✅ Intervention dans toute la région de Mohammedia</li>
              <li>✅ Équipements médicaux à bord</li>
              <li>✅ Personnel qualifié et empathique</li>
              <li>✅ Ambulances pour particuliers, hôtels, entreprises et professionnels de santé</li>
            </ul>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
              <div className="space-y-2 text-gray-700">
                <p>📞 Téléphone : <a href="tel:+212600000000" className="text-primary hover:text-primary/80 underline font-semibold">+212 6 00 00 00 00</a></p>
                <p>📍 Mohammedia & périphérie</p>
                <p>🕐 Service permanent 24h/24</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contenu SEO spécifique pour Kénitra */}
      {city.slug === 'kenitra' && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Ambulance Kénitra - Intervention 24h/24</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Vous êtes à <strong>Kénitra</strong> et avez besoin d’un transport médicalisé ? Que ce soit pour une urgence, une hospitalisation programmée ou un transfert médical,
              notre <strong>service d’ambulance à Kénitra</strong> est disponible 24h/24 et 7j/7.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Couverture complète de la ville et des alentours</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nous intervenons dans tous les quartiers : Maamora, Val Fleuri, Ouled Oujih, Centre-ville, Saknia, Université Ibn Tofail, et dans les communes périphériques : Mehdia, Sidi Taïbi, Sidi Yahya, Souk El Arbaa.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">🚑 Ambulances modernes et personnel qualifié</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nos ambulances privées sont équipées d’oxygène, de matériel de réanimation, de brancards confortables et d’une équipe médicale ou paramédicale selon le cas :
              auxiliaires, infirmiers ou médecin.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📞 Contactez-nous 24h/24</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Notre centre de régulation est joignable à tout moment. Appelez le <strong><a href="tel:+212600000000" className="text-primary hover:text-primary/80 underline">+212 6 00 00 00 00</a></strong> ou utilisez le bouton WhatsApp disponible sur notre site.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">✔️ Pourquoi faire confiance à Ambulance Maroc à Kénitra ?</h3>
            <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
              <li>✅ Disponibilité immédiate 24h/24</li>
              <li>✅ Couverture urbaine et rurale</li>
              <li>✅ Ambulances climatisées et médicalisées</li>
              <li>✅ Personnel expérimenté et bilingue</li>
              <li>✅ Transferts vers CHU, cliniques, centres de dialyse ou aéroports</li>
            </ul>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
              <div className="space-y-2 text-gray-700">
                <p>📞 Téléphone : <a href="tel:+212600000000" className="text-primary hover:text-primary/80 underline font-semibold">+212 6 00 00 00 00</a></p>
                <p>📍 Kénitra & région Gharb</p>
                <p>🕐 Service permanent 24h/24 – 7j/7</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contenu SEO spécifique pour Oujda */}
      {city.slug === 'oujda' && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Ambulance Oujda – Disponible 24h/24 et 7j/7</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              En cas d’urgence médicale à Oujda, notre service d’ambulance intervient rapidement dans tous les quartiers de la ville, de <strong>Sidi Yahya</strong> à <strong>Hay El Qods</strong>,
              en passant par <strong>Al Boustane</strong>, <strong>Hay Al Matar</strong>, et <strong>Centre-ville</strong>. Nous couvrons également l’aéroport, la zone industrielle, et les localités proches comme <strong>Ahfir</strong>, <strong>Jerada</strong> et <strong>Berkane</strong>.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">👨‍⚕️ Équipe professionnelle et véhicules médicalisés</h3>
            <p className="mb-4 text-gray-700 leading-relaxed">
              Nos ambulances sont climatisées, bien équipées et conduites par des professionnels formés. Nous assurons :
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
              <li>✅ Les urgences médicales</li>
              <li>✅ Les transferts inter-hôpitaux</li>
              <li>✅ Les rapatriements privés</li>
            </ul>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Chaque intervention peut inclure un auxiliaire ambulancier, un infirmier ou un médecin selon le besoin.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📞 Contact rapide</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Appelez notre standard 24/24 au <strong><a href="tel:+212600000000" className="text-primary hover:text-primary/80 underline">+212 6 00 00 00 00</a></strong> ou contactez-nous par WhatsApp pour une réponse immédiate.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">✔️ Pourquoi Ambulance Maroc à Oujda ?</h3>
            <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
              <li>✅ Intervention rapide à Oujda et ses environs</li>
              <li>✅ Ambulances modernes, propres et climatisées</li>
              <li>✅ Couverture 24h/24 – 7j/7</li>
              <li>✅ Coordination avec les cliniques et CHU de l’Oriental</li>
              <li>✅ Équipe multilingue (arabe, français)</li>
            </ul>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
              <div className="space-y-2 text-gray-700">
                <p>📞 Téléphone : <a href="tel:+212600000000" className="text-primary hover:text-primary/80 underline font-semibold">+212 6 00 00 00 00</a></p>
                <p>📍 Oujda & région de l'Oriental</p>
                <p>🕐 Service permanent 24h/24 – 7j/7</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contenu SEO spécifique pour Tétouan */}
      {city.slug === 'tetouan' && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Service Ambulance à Tétouan – 24h/24 et 7j/7</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Besoin d’une ambulance à Tétouan ou dans les environs ? Notre service est disponible à tout moment pour les urgences ou les transferts médicaux.
              Nous couvrons tous les quartiers de Tétouan : <strong>El Balad, Al Mandar Al Jamil, Avenue des FAR, Hay Kharroub</strong>, ainsi que les villes côtières comme <strong>Fnideq, M’diq, Martil et Cabo Negro</strong>.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">👨‍⚕️ Équipe qualifiée et matériel médical complet</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nos ambulances sont modernes, climatisées et équipées pour tous types de situations : <strong>urgence, évacuation, transport inter-hôpitaux, etc.</strong><br/>
              Notre personnel est composé d’ambulanciers diplômés, infirmiers et médecins d’urgence si besoin.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Zone d’intervention étendue – Nord Maroc</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nous intervenons rapidement sur toute la région de Tétouan et ses alentours, jusqu’à Fnideq, M’diq, Chefchaouen, Ksar El Kebir et Tanger.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📞 Contact rapide – 24h/24</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Appelez le <strong><a href="tel:+212600000000" className="text-primary hover:text-primary/80 underline">+212 6 00 00 00 00</a></strong> ou cliquez sur le bouton WhatsApp pour une assistance immédiate.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">✅ Pourquoi choisir Ambulance Maroc à Tétouan ?</h3>
            <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
              <li>✅ Intervention rapide dans tout le Nord</li>
              <li>✅ Service disponible 24h/24 – 7j/7</li>
              <li>✅ Ambulances équipées et climatisées</li>
              <li>✅ Équipe multilingue : arabe, français, espagnol</li>
              <li>✅ Partenariat avec hôpitaux et cliniques privées</li>
            </ul>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
              <div className="space-y-2 text-gray-700">
                <p>📞 Téléphone : <a href="tel:+212600000000" className="text-primary hover:text-primary/80 underline font-semibold">+212 6 00 00 00 00</a></p>
                <p>📍 Tétouan & région Nord</p>
                <p>🕐 Service 24h/24 – 7j/7</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contenu SEO spécifique pour Meknès */}
      {city.slug === 'meknes' && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">🚨 Ambulance Meknès – Service d'Urgence 24h/24</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Notre <strong>service d’ambulance à Meknès</strong> est disponible 7j/7 et 24h/24 pour toute urgence médicale, transfert vers une clinique ou évacuation sanitaire.
              Que vous soyez un particulier, une entreprise ou un professionnel de santé, nous intervenons dans les meilleurs délais.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📍 Intervention à Meknès et dans toute la région</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nous couvrons tous les quartiers : Hamria, Marjane, Sidi Baba, Toulal, Bassatine, Médina, ainsi que les zones rurales avoisinantes comme El Hajeb, Ain Taoujdate, ou Azrou.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">🚑 Matériel médical et personnel formé</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Nos ambulances sont équipées pour assurer la sécurité et le confort du patient : oxygène, brancard, matériel de réanimation, et présence d’un auxiliaire ambulancier,
              infirmier ou médecin si besoin.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">📞 Assistance téléphonique 24h/24</h3>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Appelez notre centre de coordination au <strong><a href="tel:+212600000000" className="text-primary hover:text-primary/80 underline">+212 6 00 00 00 00</a></strong> ou contactez-nous par WhatsApp via notre site.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-900">✔️ Pourquoi choisir Ambulance Maroc à Meknès ?</h3>
            <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
              <li>✅ Réactivité immédiate 24/7</li>
              <li>✅ Zones couvertes : ville et périphérie</li>
              <li>✅ Matériel médical complet à bord</li>
              <li>✅ Équipe expérimentée, bienveillante et formée</li>
              <li>✅ Coordination avec hôpitaux, cliniques et structures de soins</li>
            </ul>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-gray-900">ℹ️ Infos pratiques</h4>
              <div className="space-y-2 text-gray-700">
                <p>📞 Téléphone : <a href="tel:+212600000000" className="text-primary hover:text-primary/80 underline font-semibold">+212 6 00 00 00 00</a></p>
                <p>📍 Meknès & région Fès-Meknès</p>
                <p>🕐 Disponible 24h/24 et 7j/7</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Reassurance Section */}
{city.slug === 'casablanca' ? (
        <ReassuranceSection
          title="Pourquoi nous faire confiance à Casablanca ?"
          subtitle="Notre engagement : vous offrir un service d’ambulance professionnel, rapide et fiable sur tout Casablanca."
          features={[
            { icon: Clock, title: "Disponible 24/7 à Casablanca", description: "Service d’urgence opérationnel jour et nuit, tous les jours.", color: "text-primary" },
            { icon: Zap, title: "Intervention rapide en ville", description: "Temps de réponse moyen 8–12 min en zone urbaine (selon trafic & distance).", color: "text-emergency" },
            { icon: Users, title: "Personnel qualifié", description: "Équipes formées aux premiers secours et au transport médicalisé.", color: "text-success" },
            { icon: MapPin, title: "Couverture Grand Casablanca", description: "Intervention dans tous les quartiers et communes limitrophes.", color: "text-primary" },
            { icon: Shield, title: "Coordination avec hôpitaux & cliniques", description: "Prise en charge et transfert vers les établissements de santé de la ville.", color: "text-success" },
            { icon: Star, title: "Normes sanitaires", description: "Procédures et matériel conformes aux exigences médicales.", color: "text-emergency" },
          ]}
          stats={[
            { value: "8–12 min", label: "Temps de réponse moyen" },
            { value: "Tous quartiers", label: "Casablanca & périphérie" },
            { value: "24/7", label: "Service continu" },
            { value: "Urgences & programmées", label: "Interventions immédiates et sur réservation" },
          ]}
        />
      ) : city.slug === 'rabat' ? (
        <ReassuranceSection
          title="Pourquoi nous faire confiance à Rabat ?"
          subtitle="Notre engagement : vous offrir un service d’ambulance rapide, fiable et professionnel dans toute la région de Rabat-Salé-Kénitra."
          features={[
            { icon: Clock, title: "Disponible 24/7", description: "Service d’urgence disponible jour et nuit, y compris les jours fériés, sur toute la région de Rabat.", color: "text-primary" },
            { icon: Zap, title: "Intervention rapide", description: "Temps de réponse moyen de moins de 15 minutes dans les zones urbaines de Rabat et Salé.", color: "text-emergency" },
            { icon: Users, title: "Personnel qualifié", description: "Équipe composée d’auxiliaires ambulanciers, infirmiers et médecins d’urgence certifiés.", color: "text-success" },
            { icon: MapPin, title: "Couverture régionale étendue", description: "Intervention sur tous les quartiers de Rabat, Salé, Témara, Skhirat et périphérie.", color: "text-primary" },
            { icon: Shield, title: "Normes sanitaires strictes", description: "Respect total des protocoles du Ministère de la Santé et normes internationales.", color: "text-success" },
            { icon: Star, title: "Excellence reconnue", description: "Service recommandé par nos patients et partenaires hospitaliers de la région.", color: "text-emergency" },
          ]}
          stats={[
            { value: "24/7", label: "Service continu" },
            { value: "< 15 min", label: "Temps de réponse moyen" },
            { value: "+5000", label: "Interventions/an" },
            { value: "12", label: "Quartiers principaux couverts" },
          ]}
        />
      ) : city.slug === 'marrakech' ? (
        <ReassuranceSection
          title="Ambulance à Marrakech – Pourquoi nous faire confiance ?"
          subtitle="Notre engagement : offrir un service d’ambulance rapide, professionnel et disponible 24/7 dans toute la région de Marrakech-Safi."
          features={[
            { icon: Clock, title: "Disponible 24/7", description: "Service d’urgence de jour comme de nuit, y compris les jours fériés.", color: "text-primary" },
            { icon: Zap, title: "Intervention rapide", description: "Temps moyen d’arrivée inférieur à 15 minutes dans Marrakech intra-muros.", color: "text-emergency" },
            { icon: Users, title: "Personnel qualifié", description: "Équipe formée aux urgences vitales, avec expérience hospitalière.", color: "text-success" },
            { icon: MapPin, title: "Couverture régionale", description: "Marrakech, Tameslouht, Aït Ourir, Chichaoua, Amizmiz, et périphérie.", color: "text-primary" },
            { icon: Shield, title: "Normes sanitaires", description: "Protocoles certifiés par le Ministère de la Santé.", color: "text-success" },
            { icon: Star, title: "Excellence reconnue", description: "Recommandé par patients et cliniques locales.", color: "text-emergency" },
          ]}
          stats={[
            { value: "24/7", label: "Service continu" },
            { value: "< 15 min", label: "Temps de réponse" },
            { value: "+5000", label: "Interventions/an" },
            { value: "15", label: "Zones couvertes" },
          ]}
        />
      ) : city.slug === 'fes' ? (
        <ReassuranceSection
          title="Ambulance à Fès – Pourquoi nous faire confiance ?"
          subtitle="Notre engagement : répondre à vos urgences médicales partout à Fès et sa région avec efficacité et sécurité."
          features={[
            { icon: Clock, title: "Disponible 24/7", description: "Service d’urgence permanent.", color: "text-primary" },
            { icon: Zap, title: "Intervention rapide", description: "Moins de 15 min en zone urbaine.", color: "text-emergency" },
            { icon: Users, title: "Personnel qualifié", description: "Ambulanciers et médecins d’urgence certifiés.", color: "text-success" },
            { icon: MapPin, title: "Couverture régionale", description: "Fès, Sefrou, Imouzzer Kandar, Bhalil, et périphérie.", color: "text-primary" },
            { icon: Shield, title: "Normes sanitaires", description: "Protocoles rigoureux et matériel médical certifié.", color: "text-success" },
            { icon: Star, title: "Excellence reconnue", description: "Service recommandé par établissements de santé.", color: "text-emergency" },
          ]}
          stats={[
            { value: "24/7", label: "Service continu" },
            { value: "< 15 min", label: "Temps de réponse" },
            { value: "+4500", label: "Interventions/an" },
            { value: "10", label: "Zones couvertes" },
          ]}
        />
      ) : city.slug === 'tanger' ? (
        <ReassuranceSection
          title="Ambulance à Tanger – Pourquoi nous faire confiance ?"
          subtitle="Notre engagement : assurer un transport médicalisé rapide et sûr dans toute la région de Tanger-Tétouan-Al Hoceïma."
          features={[
            { icon: Clock, title: "Disponible 24/7", description: "Intervention jour et nuit, toute l’année.", color: "text-primary" },
            { icon: Zap, title: "Intervention rapide", description: "Moins de 15 min en moyenne dans Tanger.", color: "text-emergency" },
            { icon: Users, title: "Personnel qualifié", description: "Professionnels expérimentés en urgences vitales.", color: "text-success" },
            { icon: MapPin, title: "Couverture régionale", description: "Tanger, Asilah, Tétouan, Fnideq, M’diq.", color: "text-primary" },
            { icon: Shield, title: "Normes sanitaires", description: "Équipements certifiés et désinfection après chaque intervention.", color: "text-success" },
            { icon: Star, title: "Excellence reconnue", description: "Partenariats avec hôpitaux locaux.", color: "text-emergency" },
          ]}
          stats={[
            { value: "24/7", label: "Service continu" },
            { value: "< 15 min", label: "Temps de réponse" },
            { value: "+4000", label: "Interventions/an" },
            { value: "9", label: "Zones couvertes" },
          ]}
        />
      ) : city.slug === 'agadir' ? (
        <ReassuranceSection
          title="Ambulance à Agadir – Pourquoi nous faire confiance ?"
          subtitle="Notre engagement : offrir un service rapide et fiable dans toute la région Souss-Massa."
          features={[
            { icon: Clock, title: "Disponible 24/7", description: "Urgences médicales prises en charge à toute heure.", color: "text-primary" },
            { icon: Zap, title: "Intervention rapide", description: "Moins de 15 min dans Agadir centre.", color: "text-emergency" },
            { icon: Users, title: "Personnel qualifié", description: "Équipe certifiée en transport médicalisé.", color: "text-success" },
            { icon: MapPin, title: "Couverture régionale", description: "Agadir, Inezgane, Aït Melloul, Taroudant, Tiznit.", color: "text-primary" },
            { icon: Shield, title: "Normes sanitaires", description: "Standards stricts d’hygiène et sécurité.", color: "text-success" },
            { icon: Star, title: "Excellence reconnue", description: "Témoignages positifs de nos patients.", color: "text-emergency" },
          ]}
          stats={[
            { value: "24/7", label: "Service continu" },
            { value: "< 15 min", label: "Temps de réponse" },
            { value: "+3500", label: "Interventions/an" },
            { value: "8", label: "Zones couvertes" },
          ]}
        />
      ) : city.slug === 'meknes' ? (
        <ReassuranceSection
          title="Ambulance à Meknès – Pourquoi nous faire confiance ?"
          subtitle="Notre engagement : garantir un service médical d’urgence fiable dans tout Meknès et ses environs."
          features={[
            { icon: Clock, title: "Disponible 24/7", description: "Intervention 365 jours/an.", color: "text-primary" },
            { icon: Zap, title: "Intervention rapide", description: "Moins de 15 min en ville.", color: "text-emergency" },
            { icon: Users, title: "Personnel qualifié", description: "Infirmiers, médecins et ambulanciers expérimentés.", color: "text-success" },
            { icon: MapPin, title: "Couverture régionale", description: "Meknès, El Hajeb, Ifrane, Azrou, Khenifra.", color: "text-primary" },
            { icon: Shield, title: "Normes sanitaires", description: "Respect strict des protocoles médicaux.", color: "text-success" },
            { icon: Star, title: "Excellence reconnue", description: "Approuvé par la communauté locale.", color: "text-emergency" },
          ]}
          stats={[
            { value: "24/7", label: "Service continu" },
            { value: "< 15 min", label: "Temps de réponse" },
            { value: "+3200", label: "Interventions/an" },
            { value: "7", label: "Zones couvertes" },
          ]}
        />
      ) : city.slug === 'oujda' ? (
        <ReassuranceSection
          title="Ambulance à Oujda – Pourquoi nous faire confiance ?"
          subtitle="Notre engagement : desservir Oujda et toute la région de l’Oriental avec rapidité et professionnalisme."
          features={[
            { icon: Clock, title: "Disponible 24/7", description: "Urgences couvertes jour et nuit.", color: "text-primary" },
            { icon: Zap, title: "Intervention rapide", description: "Moins de 15 min en ville.", color: "text-emergency" },
            { icon: Users, title: "Personnel qualifié", description: "Équipe formée aux interventions d’urgence.", color: "text-success" },
            { icon: MapPin, title: "Couverture régionale", description: "Oujda, Berkane, Nador, Taourirt, Saïdia.", color: "text-primary" },
            { icon: Shield, title: "Normes sanitaires", description: "Protocoles certifiés et contrôles réguliers.", color: "text-success" },
            { icon: Star, title: "Excellence reconnue", description: "Service apprécié par patients et hôpitaux locaux.", color: "text-emergency" },
          ]}
          stats={[
            { value: "24/7", label: "Service continu" },
            { value: "< 15 min", label: "Temps de réponse" },
            { value: "+3000", label: "Interventions/an" },
            { value: "6", label: "Zones couvertes" },
          ]}
        />
      ) : (
        <ReassuranceSection />
      )}
      {/* Services Section */}
      {city.slug === 'casablanca' ? (
        <ServicesSection
          title="🚑 Nos Services d’Ambulance à Casablanca – Urgence 24/7 et Transport Médicalisé"
          description={
            <>
              Notre <strong>service d’ambulance à Casablanca</strong> est disponible 24h/24 et 7j/7 pour toutes urgences médicales,
              transferts hospitaliers et besoins de <strong>transport médicalisé privé</strong>. Avec un temps de réponse moyen de
              <strong> moins de 15 minutes</strong> en zone urbaine, nous assurons une intervention rapide, sécurisée et conforme
              aux normes sanitaires. Que vous cherchiez une <strong>ambulance privée à Casablanca</strong>, un transport longue distance
              ou un transfert inter-hôpitaux, notre équipe qualifiée est prête à intervenir immédiatement.
            </>
          }
          services={[
            {
              title: "🚨 Ambulance Médicale d’Urgence à Casablanca",
              description: (
                <>
                  Intervention immédiate pour toute urgence médicale dans la ville de Casablanca et sa périphérie.
                  Équipe de secours qualifiée, disponible 24h/24, équipée pour la réanimation cardio-pulmonaire,
                  les soins pré-hospitaliers et le transport vers l’hôpital le plus proche.
                </>
              ),
              features: [
                "Réanimation cardio-pulmonaire",
                "Soins d’urgence pré-hospitaliers",
                "Transport rapide vers hôpital",
                "Équipement médical de pointe",
              ],
            },
            {
              title: "🏥 Transport Inter-hôpitaux à Casablanca",
              description: (
                <>
                  Service sécurisé de <strong>transport médicalisé à Casablanca</strong> pour le transfert de patients entre établissements de santé.
                  Coordination complète avec les hôpitaux, suivi médical spécialisé et respect strict des normes sanitaires.
                </>
              ),
              features: [
                "Transport médicalisé",
                "Accompagnement médical spécialisé",
                "Coordination avec hôpitaux",
                "Suivi médical pendant transport",
              ],
              ctaHref: "/devis?ville=casablanca",
            },
            {
              title: "🚌 Transport Médical Longue Distance depuis Casablanca",
              description: (
                <>
                  Déplacements inter-villes avec <strong>ambulance équipée</strong> et personnel médical qualifié.
                  Confort optimal du patient, assistance continue et coordination logistique complète pour trajets longs.
                </>
              ),
              features: [
                "Ambulances adaptées aux longs trajets",
                "Personnel médical qualifié",
                "Confort et sécurité du patient",
                "Coordination logistique",
              ],
              ctaHref: "/devis?ville=casablanca&type=longue-distance",
            },
            {
              title: "🎯 Couverture Médicale pour Événements à Casablanca",
              description: (
                <>
                  Assistance médicale pour événements sportifs, concerts, rassemblements et manifestations publiques à Casablanca.
                  Mise en place de postes de secours, équipe médicale dédiée et intervention rapide en cas d’urgence.
                </>
              ),
              features: [
                "Poste de secours mobile",
                "Équipe médicale dédiée",
                "Intervention préventive",
                "Coordination avec organisateurs",
              ],
              ctaHref: "/devis?ville=casablanca&type=evenements",
            },
          ]}
        />
      ) : city.slug === 'rabat' ? (
        <ServicesSection
          title="🚑 Nos Services d’Ambulance à Rabat – Urgence 24/7 et Transport Médicalisé"
          description={
            <>
              Notre <strong>service d’ambulance à Rabat</strong> est disponible 24h/24 et 7j/7 pour toutes urgences médicales,
              transferts hospitaliers et besoins de <strong>transport médicalisé privé</strong>. Avec un temps de réponse moyen de
              <strong> moins de 15 minutes</strong> en zone urbaine, nous garantissons une intervention rapide, sécurisée et conforme aux normes sanitaires. {""}
              Que vous recherchiez une <strong>ambulance privée à Rabat</strong>, un transport longue distance ou un transfert inter-hôpitaux,
              notre équipe qualifiée est prête à intervenir immédiatement.
            </>
          }
          services={[
            {
              title: "🚨 Ambulance Médicale d’Urgence à Rabat",
              description: (
                <>
                  Intervention immédiate pour toute urgence médicale dans la ville de Rabat et sa périphérie. Équipe de secours qualifiée,
                  disponible 24h/24, équipée pour la réanimation cardio-pulmonaire, les soins pré-hospitaliers et le transport rapide
                  vers l’hôpital le plus proche.
                </>
              ),
              features: [
                "Réanimation cardio-pulmonaire",
                "Soins d’urgence pré-hospitaliers",
                "Transport rapide vers hôpital",
                "Équipement médical de pointe",
              ],
            },
            {
              title: "🏥 Transport Inter-hôpitaux à Rabat",
              description: (
                <>
                  Service sécurisé de <strong>transport médicalisé à Rabat</strong> pour le transfert de patients entre établissements de santé.
                  Coordination complète avec les hôpitaux, suivi médical spécialisé et respect strict des normes sanitaires.
                </>
              ),
              features: [
                "Transport médicalisé",
                "Accompagnement médical spécialisé",
                "Coordination avec hôpitaux",
                "Suivi médical pendant transport",
              ],
              ctaHref: "/devis?ville=rabat",
            },
            {
              title: "🚐 Transport Médical Longue Distance depuis Rabat",
              description: (
                <>
                  Déplacements inter-villes avec <strong>ambulance équipée</strong> et personnel médical qualifié. Confort optimal du patient,
                  assistance continue et coordination logistique complète pour trajets longs.
                </>
              ),
              features: [
                "Ambulances adaptées aux longs trajets",
                "Personnel médical qualifié",
                "Confort et sécurité du patient",
                "Coordination logistique",
              ],
              ctaHref: "/devis?ville=rabat&type=longue-distance",
            },
            {
              title: "🎯 Couverture Médicale pour Événements à Rabat",
              description: (
                <>
                  Assistance médicale pour événements sportifs, concerts, rassemblements et manifestations publiques à Rabat.
                  Mise en place de postes de secours, équipe médicale dédiée et intervention rapide en cas d’urgence.
                </>
              ),
              features: [
                "Poste de secours mobile",
                "Équipe médicale dédiée",
                "Intervention préventive",
                "Coordination avec organisateurs",
              ],
              ctaHref: "/devis?ville=rabat&type=evenements",
            },
          ]}
          seoNote={
            <>
              📌 Pour toute urgence, contactez notre <strong>ambulance à Rabat</strong> au <a href="tel:+212777722311">numéro d’urgence +212 777 722 311</a>. Nous proposons un service rapide et abordable, avec des tarifs transparents. Que ce soit pour un transfert médical, une urgence ou un événement, notre <strong>ambulance privée à Rabat</strong> est à votre service 24/7.
            </>
          }
        />
      ) : city.slug === 'marrakech' ? (
        <ServicesSection
          title="🚑 Nos Services d’Ambulance à Marrakech – Urgence 24/7 et Transport Médicalisé"
          description={
            <>
              Notre <strong>service d’ambulance à Marrakech</strong> est disponible 24h/24 et 7j/7 pour toutes urgences médicales, transferts hospitaliers et besoins de <strong>transport médicalisé privé</strong>. Avec un temps de réponse moyen de <strong>moins de 15 minutes</strong> en zone urbaine, nous assurons une intervention rapide, sécurisée et conforme aux normes sanitaires.
              <br />
              Que vous cherchiez une <strong>ambulance privée à Marrakech</strong>, un transport longue distance ou un transfert inter-hôpitaux, notre équipe qualifiée est prête à intervenir immédiatement dans toute la ville et sa région.
            </>
          }
          services={[
            {
              title: "🚨 Ambulance Médicale d’Urgence à Marrakech",
              description: (
                <>
                  Intervention immédiate pour toute urgence médicale dans la ville de Marrakech et sa périphérie. Équipe de secours qualifiée, disponible 24h/24, équipée pour la réanimation cardio-pulmonaire, les soins pré-hospitaliers et le transport rapide vers l’hôpital le plus proche.
                </>
              ),
              features: [
                "Réanimation cardio-pulmonaire",
                "Soins d’urgence pré-hospitaliers",
                "Transport rapide vers hôpital",
                "Équipement médical de pointe",
              ],
            },
            {
              title: "🏥 Transport Inter-hôpitaux à Marrakech",
              description: (
                <>
                  Service sécurisé de <strong>transport médicalisé à Marrakech</strong> pour le transfert de patients entre établissements de santé. Coordination complète avec les hôpitaux, suivi médical spécialisé et respect strict des normes sanitaires.
                </>
              ),
              features: [
                "Transport médicalisé",
                "Accompagnement médical spécialisé",
                "Coordination avec hôpitaux",
                "Suivi médical pendant transport",
              ],
              ctaHref: "/devis?ville=marrakech",
            },
            {
              title: "🚐 Transport Médical Longue Distance depuis Marrakech",
              description: (
                <>
                  Déplacements inter-villes avec <strong>ambulance équipée</strong> et personnel médical qualifié. Confort optimal du patient, assistance continue et coordination logistique complète pour trajets longs.
                </>
              ),
              features: [
                "Ambulances adaptées aux longs trajets",
                "Personnel médical qualifié",
                "Confort et sécurité du patient",
                "Coordination logistique",
              ],
              ctaHref: "/devis?ville=marrakech&type=longue-distance",
            },
            {
              title: "🎯 Couverture Médicale pour Événements à Marrakech",
              description: (
                <>
                  Assistance médicale pour événements sportifs, concerts, rassemblements et manifestations publiques à Marrakech. Mise en place de postes de secours, équipe médicale dédiée et intervention rapide en cas d’urgence.
                </>
              ),
              features: [
                "Poste de secours mobile",
                "Équipe médicale dédiée",
                "Intervention préventive",
                "Coordination avec organisateurs",
              ],
              ctaHref: "/devis?ville=marrakech&type=evenements",
            },
          ]}
          seoNote={
            <>📌 Pour toute urgence, contactez notre <strong>ambulance à Marrakech</strong> au <a href="tel:+212777722311">numéro d’urgence +212 7777 223 11</a>. Nous proposons un service rapide et abordable, avec des tarifs transparents. Que ce soit pour un transfert médical, une urgence ou un événement, notre <strong>ambulance privée à Marrakech</strong> est disponible 24/7.</>
          }
        />
      ) : city.slug === 'tanger' ? (
        <ServicesSection
          title="🚑 Nos Services d’Ambulance à Tanger – Urgence 24/7 et Transport Médicalisé"
          description={
            <>
              Notre <strong>service d’ambulance à Tanger</strong> est disponible 24h/24 et 7j/7 pour toutes urgences médicales, transferts hospitaliers et besoins de <strong>transport médicalisé privé</strong>. Avec un temps de réponse moyen de <strong>moins de 15 minutes</strong> en zone urbaine, nous assurons une intervention rapide, sécurisée et conforme aux normes sanitaires.
              <br />
              Que vous cherchiez une <strong>ambulance privée à Tanger</strong>, un transport longue distance ou un transfert inter-hôpitaux, notre équipe qualifiée est prête à intervenir immédiatement dans toute la ville et sa région.
            </>
          }
          services={[
            {
              title: "🚨 Ambulance Médicale d’Urgence à Tanger",
              description: (
                <>
                  Intervention immédiate pour toute urgence médicale dans la ville de Tanger et sa périphérie. Équipe de secours qualifiée, disponible 24h/24, équipée pour la réanimation cardio-pulmonaire, les soins pré-hospitaliers et le transport rapide vers l’hôpital le plus proche.
                </>
              ),
              features: [
                "Réanimation cardio-pulmonaire",
                "Soins d’urgence pré-hospitaliers",
                "Transport rapide vers hôpital",
                "Équipement médical de pointe",
              ],
            },
            {
              title: "🏥 Transport Inter-hôpitaux à Tanger",
              description: (
                <>
                  Service sécurisé de <strong>transport médicalisé à Tanger</strong> pour le transfert de patients entre établissements de santé. Coordination complète avec les hôpitaux, suivi médical spécialisé et respect strict des normes sanitaires.
                </>
              ),
              features: [
                "Transport médicalisé",
                "Accompagnement médical spécialisé",
                "Coordination avec hôpitaux",
                "Suivi médical pendant transport",
              ],
              ctaHref: "/devis?ville=tanger",
            },
            {
              title: "🚐 Transport Médical Longue Distance depuis Tanger",
              description: (
                <>
                  Déplacements inter-villes avec <strong>ambulance équipée</strong> et personnel médical qualifié. Confort optimal du patient, assistance continue et coordination logistique complète pour trajets longs.
                </>
              ),
              features: [
                "Ambulances adaptées aux longs trajets",
                "Personnel médical qualifié",
                "Confort et sécurité du patient",
                "Coordination logistique",
              ],
              ctaHref: "/devis?ville=tanger&type=longue-distance",
            },
            {
              title: "🎯 Couverture Médicale pour Événements à Tanger",
              description: (
                <>
                  Assistance médicale pour événements sportifs, concerts, rassemblements et manifestations publiques à Tanger. Mise en place de postes de secours, équipe médicale dédiée et intervention rapide en cas d’urgence.
                </>
              ),
              features: [
                "Poste de secours mobile",
                "Équipe médicale dédiée",
                "Intervention préventive",
                "Coordination avec organisateurs",
              ],
              ctaHref: "/devis?ville=tanger&type=evenements",
            },
          ]}
          seoNote={
            <>📌 Pour toute urgence, contactez notre <strong>ambulance à Tanger</strong> au <a href="tel:+212777722311">numéro d’urgence +212 7777 223 11</a>. Nous proposons un service rapide et abordable, avec des tarifs transparents. Que ce soit pour un transfert médical, une urgence ou un événement, notre <strong>ambulance privée à Tanger</strong> est disponible 24/7.</>
          }
        />
) : city.slug === 'oujda' ? (
        <ServicesSection
          title="🚑 Nos Services d’Ambulance à Oujda – Urgence 24/7 et Transport Médicalisé"
          description={
            <>
              Notre <strong>service d’ambulance à Oujda</strong> est disponible 24h/24 et 7j/7 pour toutes urgences médicales, transferts hospitaliers et besoins de <strong>transport médicalisé privé</strong>. Avec un temps de réponse moyen de <strong>moins de 15 minutes</strong> en zone urbaine, nous assurons une intervention rapide, sécurisée et conforme aux normes sanitaires.
              <br />
              Que vous cherchiez une <strong>ambulance privée à Oujda</strong>, un transport longue distance ou un transfert inter-hôpitaux, notre équipe qualifiée est prête à intervenir immédiatement dans toute la ville et sa région.
            </>
          }
          services={[
            {
              title: "🚨 Ambulance Médicale d’Urgence à Oujda",
              description: (
                <>
                  Intervention immédiate pour toute urgence médicale dans la ville d’Oujda et sa périphérie. Équipe de secours qualifiée, disponible 24h/24, équipée pour la réanimation cardio-pulmonaire, les soins pré-hospitaliers et le transport rapide vers l’hôpital le plus proche.
                </>
              ),
              features: [
                "Réanimation cardio-pulmonaire",
                "Soins d’urgence pré-hospitaliers",
                "Transport rapide vers hôpital",
                "Équipement médical de pointe",
              ],
            },
            {
              title: "🏥 Transport Inter-hôpitaux à Oujda",
              description: (
                <>
                  Service sécurisé de <strong>transport médicalisé à Oujda</strong> pour le transfert de patients entre établissements de santé. Coordination complète avec les hôpitaux, suivi médical spécialisé et respect strict des normes sanitaires.
                </>
              ),
              features: [
                "Transport médicalisé",
                "Accompagnement médical spécialisé",
                "Coordination avec hôpitaux",
                "Suivi médical pendant transport",
              ],
              ctaHref: "/devis?ville=oujda",
            },
            {
              title: "🚐 Transport Médical Longue Distance depuis Oujda",
              description: (
                <>
                  Déplacements inter-villes avec <strong>ambulance équipée</strong> et personnel médical qualifié. Confort optimal du patient, assistance continue et coordination logistique complète pour trajets longs.
                </>
              ),
              features: [
                "Ambulances adaptées aux longs trajets",
                "Personnel médical qualifié",
                "Confort et sécurité du patient",
                "Coordination logistique",
              ],
              ctaHref: "/devis?ville=oujda&type=longue-distance",
            },
            {
              title: "🎯 Couverture Médicale pour Événements à Oujda",
              description: (
                <>
                  Assistance médicale pour événements sportifs, concerts, rassemblements et manifestations publiques à Oujda. Mise en place de postes de secours, équipe médicale dédiée et intervention rapide en cas d’urgence.
                </>
              ),
              features: [
                "Poste de secours mobile",
                "Équipe médicale dédiée",
                "Intervention préventive",
                "Coordination avec organisateurs",
              ],
              ctaHref: "/devis?ville=oujda&type=evenements",
            },
          ]}
          seoNote={
            <>📌 Pour toute urgence, contactez notre <strong>ambulance à Oujda</strong> au <a href="tel:+212777722311">numéro d’urgence +212 7777 223 11</a>. Nous proposons un service rapide et abordable, avec des tarifs transparents. Que ce soit pour un transfert médical, une urgence ou un événement, notre <strong>ambulance privée à Oujda</strong> est disponible 24/7.</>
          }
        />
      ) : city.slug === 'agadir' ? (
        <ServicesSection
          title="🚑 Nos Services d’Ambulance à Agadir – Urgence 24/7 et Transport Médicalisé"
          description={
            <>
              Notre <strong>service d’ambulance à Agadir</strong> est disponible 24h/24 et 7j/7 pour toutes urgences médicales, transferts hospitaliers et besoins de <strong>transport médicalisé privé</strong>. Avec un temps de réponse moyen de <strong>moins de 15 minutes</strong> en zone urbaine, nous assurons une intervention rapide, sécurisée et conforme aux normes sanitaires.
              <br />
              Que vous cherchiez une <strong>ambulance privée à Agadir</strong>, un transport longue distance ou un transfert inter-hôpitaux, notre équipe qualifiée est prête à intervenir immédiatement dans toute la ville et sa région.
            </>
          }
          services={[
            {
              title: "🚨 Ambulance Médicale d’Urgence à Agadir",
              description: (
                <>
                  Intervention immédiate pour toute urgence médicale dans la ville d’Agadir et sa périphérie. Équipe de secours qualifiée, disponible 24h/24, équipée pour la réanimation cardio-pulmonaire, les soins pré-hospitaliers et le transport rapide vers l’hôpital le plus proche.
                </>
              ),
              features: [
                "Réanimation cardio-pulmonaire",
                "Soins d’urgence pré-hospitaliers",
                "Transport rapide vers hôpital",
                "Équipement médical de pointe",
              ],
            },
            {
              title: "🏥 Transport Inter-hôpitaux à Agadir",
              description: (
                <>
                  Service sécurisé de <strong>transport médicalisé à Agadir</strong> pour le transfert de patients entre établissements de santé. Coordination complète avec les hôpitaux, suivi médical spécialisé et respect strict des normes sanitaires.
                </>
              ),
              features: [
                "Transport médicalisé",
                "Accompagnement médical spécialisé",
                "Coordination avec hôpitaux",
                "Suivi médical pendant transport",
              ],
              ctaHref: "/devis?ville=agadir",
            },
            {
              title: "🚐 Transport Médical Longue Distance depuis Agadir",
              description: (
                <>
                  Déplacements inter-villes avec <strong>ambulance équipée</strong> et personnel médical qualifié. Confort optimal du patient, assistance continue et coordination logistique complète pour trajets longs.
                </>
              ),
              features: [
                "Ambulances adaptées aux longs trajets",
                "Personnel médical qualifié",
                "Confort et sécurité du patient",
                "Coordination logistique",
              ],
              ctaHref: "/devis?ville=agadir&type=longue-distance",
            },
            {
              title: "🎯 Couverture Médicale pour Événements à Agadir",
              description: (
                <>
                  Assistance médicale pour événements sportifs, concerts, rassemblements et manifestations publiques à Agadir. Mise en place de postes de secours, équipe médicale dédiée et intervention rapide en cas d’urgence.
                </>
              ),
              features: [
                "Poste de secours mobile",
                "Équipe médicale dédiée",
                "Intervention préventive",
                "Coordination avec organisateurs",
              ],
              ctaHref: "/devis?ville=agadir&type=evenements",
            },
          ]}
          seoNote={
            <>📌 Pour toute urgence, contactez notre <strong>ambulance à Agadir</strong> au <a href="tel:+212777722311">numéro d’urgence +212 7777 223 11</a>. Nous proposons un service rapide et abordable, avec des tarifs transparents. Que ce soit pour un transfert médical, une urgence ou un événement, notre <strong>ambulance privée à Agadir</strong> est disponible 24/7.</>
          }
        />
) : city.slug === 'fes' ? (
        <ServicesSection
          title="🚑 Nos Services d’Ambulance à Fès – Urgence 24/7 et Transport Médicalisé"
          description={
            <>
              Notre <strong>service d’ambulance à Fès</strong> est disponible 24h/24 et 7j/7 pour toutes urgences médicales, transferts hospitaliers et besoins de <strong>transport médicalisé privé</strong>. Avec un temps de réponse moyen de <strong>moins de 15 minutes</strong> en zone urbaine, nous assurons une intervention rapide, sécurisée et conforme aux normes sanitaires.
              <br />
              Que vous cherchiez une <strong>ambulance privée à Fès</strong>, un transport longue distance ou un transfert inter-hôpitaux, notre équipe qualifiée est prête à intervenir immédiatement dans toute la ville et sa région.
            </>
          }
          services={[
            {
              title: "🚨 Ambulance Médicale d’Urgence à Fès",
              description: (
                <>
                  Intervention immédiate pour toute urgence médicale dans la ville de Fès et sa périphérie. Équipe de secours qualifiée, disponible 24h/24, équipée pour la réanimation cardio-pulmonaire, les soins pré-hospitaliers et le transport rapide vers l’hôpital le plus proche.
                </>
              ),
              features: [
                "Réanimation cardio-pulmonaire",
                "Soins d’urgence pré-hospitaliers",
                "Transport rapide vers hôpital",
                "Équipement médical de pointe",
              ],
            },
            {
              title: "🏥 Transport Inter-hôpitaux à Fès",
              description: (
                <>
                  Service sécurisé de <strong>transport médicalisé à Fès</strong> pour le transfert de patients entre établissements de santé. Coordination complète avec les hôpitaux, suivi médical spécialisé et respect strict des normes sanitaires.
                </>
              ),
              features: [
                "Transport médicalisé",
                "Accompagnement médical spécialisé",
                "Coordination avec hôpitaux",
                "Suivi médical pendant transport",
              ],
              ctaHref: "/devis?ville=fes",
            },
            {
              title: "🚐 Transport Médical Longue Distance depuis Fès",
              description: (
                <>
                  Déplacements inter-villes avec <strong>ambulance équipée</strong> et personnel médical qualifié. Confort optimal du patient, assistance continue et coordination logistique complète pour trajets longs.
                </>
              ),
              features: [
                "Ambulances adaptées aux longs trajets",
                "Personnel médical qualifié",
                "Confort et sécurité du patient",
                "Coordination logistique",
              ],
              ctaHref: "/devis?ville=fes&type=longue-distance",
            },
            {
              title: "🎯 Couverture Médicale pour Événements à Fès",
              description: (
                <>
                  Assistance médicale pour événements sportifs, concerts, rassemblements et manifestations publiques à Fès. Mise en place de postes de secours, équipe médicale dédiée et intervention rapide en cas d’urgence.
                </>
              ),
              features: [
                "Poste de secours mobile",
                "Équipe médicale dédiée",
                "Intervention préventive",
                "Coordination avec organisateurs",
              ],
              ctaHref: "/devis?ville=fes&type=evenements",
            },
          ]}
          seoNote={
            <>📌 Pour toute urgence, contactez notre <strong>ambulance à Fès</strong> au <a href="tel:+212777722311">numéro d’urgence +212 7777 223 11</a>. Nous proposons un service rapide et abordable, avec des tarifs transparents. Que ce soit pour un transfert médical, une urgence ou un événement, notre <strong>ambulance privée à Fès</strong> est disponible 24/7.</>
          }
        />
      ) : city.slug === 'meknes' ? (
        <ServicesSection
          title="🚑 Nos Services d’Ambulance à Meknès – Urgence 24/7 et Transport Médicalisé"
          description={
            <>
              Notre <strong>service d’ambulance à Meknès</strong> est disponible 24h/24 et 7j/7 pour toutes urgences médicales, transferts hospitaliers et besoins de <strong>transport médicalisé privé</strong>. Avec un temps de réponse moyen de <strong>moins de 15 minutes</strong> en zone urbaine, nous assurons une intervention rapide, sécurisée et conforme aux normes sanitaires.
              <br />
              Que vous cherchiez une <strong>ambulance privée à Meknès</strong>, un transport longue distance ou un transfert inter-hôpitaux, notre équipe qualifiée est prête à intervenir immédiatement dans toute la ville et sa région.
            </>
          }
          services={[
            {
              title: "🚨 Ambulance Médicale d’Urgence à Meknès",
              description: (
                <>
                  Intervention immédiate pour toute urgence médicale dans la ville de Meknès et sa périphérie. Équipe de secours qualifiée, disponible 24h/24, équipée pour la réanimation cardio-pulmonaire, les soins pré-hospitaliers et le transport rapide vers l’hôpital le plus proche.
                </>
              ),
              features: [
                "Réanimation cardio-pulmonaire",
                "Soins d’urgence pré-hospitaliers",
                "Transport rapide vers hôpital",
                "Équipement médical de pointe",
              ],
            },
            {
              title: "🏥 Transport Inter-hôpitaux à Meknès",
              description: (
                <>
                  Service sécurisé de <strong>transport médicalisé à Meknès</strong> pour le transfert de patients entre établissements de santé. Coordination complète avec les hôpitaux, suivi médical spécialisé et respect strict des normes sanitaires.
                </>
              ),
              features: [
                "Transport médicalisé",
                "Accompagnement médical spécialisé",
                "Coordination avec hôpitaux",
                "Suivi médical pendant transport",
              ],
              ctaHref: "/devis?ville=meknes",
            },
            {
              title: "🚐 Transport Médical Longue Distance depuis Meknès",
              description: (
                <>
                  Déplacements inter-villes avec <strong>ambulance équipée</strong> et personnel médical qualifié. Confort optimal du patient, assistance continue et coordination logistique complète pour trajets longs.
                </>
              ),
              features: [
                "Ambulances adaptées aux longs trajets",
                "Personnel médical qualifié",
                "Confort et sécurité du patient",
                "Coordination logistique",
              ],
              ctaHref: "/devis?ville=meknes&type=longue-distance",
            },
            {
              title: "🎯 Couverture Médicale pour Événements à Meknès",
              description: (
                <>
                  Assistance médicale pour événements sportifs, concerts, rassemblements et manifestations publiques à Meknès. Mise en place de postes de secours, équipe médicale dédiée et intervention rapide en cas d’urgence.
                </>
              ),
              features: [
                "Poste de secours mobile",
                "Équipe médicale dédiée",
                "Intervention préventive",
                "Coordination avec organisateurs",
              ],
              ctaHref: "/devis?ville=meknes&type=evenements",
            },
          ]}
          seoNote={
            <>📌 Pour toute urgence, contactez notre <strong>ambulance à Meknès</strong> au <a href="tel:+212777722311">numéro d’urgence +212 7777 223 11</a>. Nous proposons un service rapide et abordable, avec des tarifs transparents. Que ce soit pour un transfert médical, une urgence ou un événement, notre <strong>ambulance privée à Meknès</strong> est disponible 24/7.</>
          }
        />
      ) : (
        <ServicesSection />
      )}


      {/* Emergency CTA */}
      <section className="bg-emergency text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Urgence Médicale à {city.name} ?
          </h2>
          <p className="text-xl mb-8">
            Notre équipe intervient rapidement dans toute la ville en {city.responseTime} en moyenne
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="tel:+212777722311" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Appelez: +212 7777 223 11
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20" asChild>
              <a href="https://wa.me/212777722311" className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                WhatsApp Direct
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Contact Form */}
      <div id="demande-ambulance" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Demande d'Intervention à {city.name}
            </h2>
            <p className="text-xl text-gray-600">
              Formulaire pour les demandes non urgentes
            </p>
          </div>
          <ContactForm />
        </div>
      </div>

      {/* Maillage interne: quartiers ou villes selon le contexte */}
      <section className="mt-16 px-4 sm:px-6 lg:px-8 py-10 bg-muted/50 border-t border-border" aria-label={currentNeighborhood ? `Autres quartiers de ${currentCity === 'casablanca' ? 'Casablanca' : 'Rabat'}` : "Autres villes couvertes"}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold mb-6 text-center">
            {currentNeighborhood ? `🏘️ Autres Quartiers de ${currentCity === 'casablanca' ? 'Casablanca' : 'Rabat'}` : "🏙️ Autres Villes Couvertes"}
          </h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {(currentNeighborhood ? relatedNeighborhoods : relatedCities).map((item) => (
              <li
                key={item.slug}
                className="group bg-card hover:bg-accent rounded-lg p-4 shadow-sm hover:shadow-md transition-colors ring-1 ring-border"
              >
                <div className="text-lg font-medium text-foreground">{item.name}</div>
                <div className="text-sm text-muted-foreground">🚑 Intervention 15–30 min</div>
                <Link
                  to={currentNeighborhood ? `/${item.slug}` : `/ambulance-${item.slug}`}
                  className="mt-2 inline-flex items-center gap-1 text-sm text-primary underline hover:text-primary/80 transition-colors"
                  aria-label={`Voir la page Ambulance à ${item.name}`}
                >
                  👉 Voir la page
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CityPage;
