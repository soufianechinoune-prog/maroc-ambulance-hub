export interface City {
  name: string;
  slug: string;
  region: string;
  responseTime: string;
  coverage: string;
  population: string;
  isMain: boolean;
  description: string;
  specificities: string[];
}

export const cities: City[] = [
  {
    name: "Casablanca",
    slug: "casablanca",
    region: "Casablanca-Settat",
    responseTime: "8-12 min",
    coverage: "100%",
    population: "3.7M",
    isMain: true,
    description: "La capitale économique du Maroc bénéficie de notre service d'ambulance le plus complet avec 15 véhicules déployés en permanence.",
    specificities: [
      "15 ambulances en service permanent",
      "Couverture complète des zones industrielles",
      "Partenariats avec tous les hôpitaux majeurs",
      "Service VIP pour les entreprises"
    ]
  },
  {
    name: "Rabat",
    slug: "rabat",
    region: "Rabat-Salé-Kénitra",
    responseTime: "10-15 min",
    coverage: "100%",
    population: "1.9M",
    isMain: true,
    description: "La capitale administrative dispose d'un réseau d'ambulances optimisé pour les institutions gouvernementales et les quartiers résidentiels.",
    specificities: [
      "Service prioritaire pour les institutions",
      "Couverture Rabat-Salé-Témara",
      "Équipes spécialisées en protocole",
      "Transport diplomatique autorisé"
    ]
  },
  {
    name: "Marrakech",
    slug: "marrakech",
    region: "Marrakech-Safi",
    responseTime: "12-18 min",
    coverage: "95%",
    population: "1.3M",
    isMain: true,
    description: "La perle du sud bénéficie d'une couverture adaptée au tourisme avec des équipes multilingues et une connaissance parfaite de la médina.",
    specificities: [
      "Équipes multilingues (FR/EN/AR)",
      "Accès optimisé à la médina",
      "Service touristique 24h/24",
      "Partenariat avec les riads et hôtels"
    ]
  },
  {
    name: "Tanger",
    slug: "tanger",
    region: "Tanger-Tétouan-Al Hoceïma",
    responseTime: "15-20 min",
    coverage: "90%",
    population: "1.1M",
    isMain: true,
    description: "La porte de l'Europe bénéficie d'un service transfrontalier avec une couverture étendue vers les zones industrielles et portuaires.",
    specificities: [
      "Service transfrontalier",
      "Couverture zone industrielle TFZ",
      "Transport port-hôpitaux",
      "Coordination internationale"
    ]
  },
  {
    name: "Fès",
    slug: "fes",
    region: "Fès-Meknès",
    responseTime: "15-20 min",
    coverage: "90%",
    population: "1.2M",
    isMain: true,
    description: "La capitale spirituelle dispose d'un service adapté à son patrimoine historique avec des véhicules spécialement équipés pour naviguer dans la médina.",
    specificities: [
      "Véhicules adaptés médina",
      "Service universitaire renforcé",
      "Couverture zones historiques",
      "Transport inter-régional"
    ]
  },
  {
    name: "Agadir",
    slug: "agadir",
    region: "Souss-Massa",
    responseTime: "12-18 min",
    coverage: "85%",
    population: "650K",
    isMain: true,
    description: "La capitale du tourisme balnéaire offre un service optimisé pour les zones hôtelières et les activités nautiques avec des équipes formées aux urgences aquatiques.",
    specificities: [
      "Urgences aquatiques et nautiques",
      "Service zones hôtelières",
      "Transport aéroport-hôpitaux",
      "Équipes formées tourisme"
    ]
  },
  {
    name: "Meknès",
    slug: "meknes",
    region: "Fès-Meknès",
    responseTime: "18-25 min",
    coverage: "80%",
    population: "520K",
    isMain: false,
    description: "L'ancienne capitale impériale bénéficie d'une couverture solide avec une attention particulière aux sites historiques et aux zones agricoles environnantes.",
    specificities: [
      "Couverture zones agricoles",
      "Service sites historiques",
      "Transport rural-urbain",
      "Coordination avec Fès"
    ]
  },
  {
    name: "Oujda",
    slug: "oujda",
    region: "Oriental",
    responseTime: "20-25 min",
    coverage: "75%",
    population: "450K",
    isMain: false,
    description: "La porte de l'Orient offre un service transfrontalier avec l'Algérie et une couverture spécialisée pour les zones frontalières et commerciales.",
    specificities: [
      "Service transfrontalier",
      "Couverture zones commerciales",
      "Transport frontalier",
      "Service zones rurales"
    ]
  },
  {
    name: "Tétouan",
    slug: "tetouan",
    region: "Tanger-Tétouan-Al Hoceïma",
    responseTime: "20-30 min",
    coverage: "70%",
    population: "380K",
    isMain: false,
    description: "La colombe blanche dispose d'un service adapté aux zones montagneuses du Rif avec des équipes spécialisées dans les interventions en altitude.",
    specificities: [
      "Interventions en altitude",
      "Service zones montagneuses",
      "Transport vers Tanger",
      "Urgences rurales Rif"
    ]
  },
  {
    name: "Laâyoune",
    slug: "laayoune",
    region: "Laâyoune-Sakia El Hamra",
    responseTime: "15-25 min",
    coverage: "80%",
    population: "270K",
    isMain: false,
    description: "La capitale du Sahara occidental bénéficie d'un service adapté aux conditions désertiques avec des véhicules tout-terrain et des équipes formées.",
    specificities: [
      "Véhicules tout-terrain",
      "Service conditions désertiques",
      "Couverture zones isolées",
      "Transport longue distance"
    ]
  },
  {
    name: "Mohammedia",
    slug: "mohammedia",
    region: "Casablanca-Settat",
    responseTime: "15-20 min",
    coverage: "85%",
    population: "320K",
    isMain: false,
    description: "La ville des fleurs bénéficie d'une couverture renforcée grâce à la proximité de Casablanca avec un service optimisé pour les zones résidentielles.",
    specificities: [
      "Coordination avec Casablanca",
      "Service zones résidentielles",
      "Transport inter-villes",
      "Couverture littorale"
    ]
  },
  {
    name: "Kénitra",
    slug: "kenitra",
    region: "Rabat-Salé-Kénitra",
    responseTime: "18-25 min",
    coverage: "75%",
    population: "430K",
    isMain: false,
    description: "La ville du Gharb offre un service intégré avec la région de Rabat et une couverture spécialisée pour les zones agricoles environnantes.",
    specificities: [
      "Service zones agricoles",
      "Coordination avec Rabat",
      "Transport rural-urbain",
      "Couverture Gharb"
    ]
  }
];