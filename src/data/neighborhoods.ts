export type Neighborhood = {
  slug: string
  name: string
  intro?: string
  highlights?: string[]
  nearby?: string[]
}

export type CityNeighborhoods = Record<string, Neighborhood[]>

export const neighborhoodsByCity: CityNeighborhoods = {
  casablanca: [
    {
      slug: "maarif",
      name: "Maarif",
      intro:
        "Quartier central commerçant, axes rapides (Bd Massira, Bd Anfa). Idéal pour une intervention rapide en journée.",
      highlights: ["Twin Center", "Bd Al Massira", "Bd Anfa"],
      nearby: ["Gauthier", "Bourgogne", "Anfa"],
    },
    {
      slug: "anfa",
      name: "Anfa",
      intro:
        "Zone résidentielle et cliniques privées. Accès rapide via la Corniche et Bd Gandhi.",
      highlights: ["Anfa Supérieur", "Corniche", "Bd Gandhi"],
      nearby: ["Maarif", "Racine", "Ain Diab"],
    },
    {
      slug: "ain-diab",
      name: "Aïn Diab",
      intro:
        "Secteur littoral, trafic variable le week‑end. Itinéraires alternatifs par Bd la Corniche et routes arrière‑plage.",
      highlights: ["La Corniche", "Sidi Abderrahmane"],
      nearby: ["Anfa", "Oasis"],
    },
    {
      slug: "bourgogne",
      name: "Bourgogne",
      intro:
        "Haute densité, nombreuses résidences. Itinéraires privilégiés : Bd Zerktouni, Bd Moulay Youssef.",
      highlights: ["Bd Zerktouni", "Bd Moulay Youssef"],
      nearby: ["Gauthier", "Anfa"],
    },
    {
      slug: "oasis",
      name: "Oasis",
      intro:
        "Accès hôpitaux et cliniques, voiries plus résidentielles. Connexions rapides vers l’Aéroport et Autoroute.",
      highlights: ["Clinique Oasis", "Gare Oasis"],
      nearby: ["Aïn Chock", "Aïn Diab"],
    },
    {
      slug: "sidi-bernoussi",
      name: "Sidi Bernoussi",
      intro:
        "Périphérie industrielle et résidentielle. Axes : N1, Route côtière. Prévoir créneaux de trafic en pointe.",
      highlights: ["Zone industrielle", "Rte Côtière"],
      nearby: ["Aïn Sebaâ", "Mohammedia"],
    },
  ],
  rabat: [
    {
      slug: "agdal",
      name: "Agdal",
      intro: "Quartier central étudiant et médical, accès rapides par Av. Ibn Sina & Av. de France.",
      highlights: ["Avenue Ibn Sina", "Boulevard de France"],
      nearby: ["Hassan", "Hay Riad", "Yacoub El Mansour"],
    },
    {
      slug: "hay-riad",
      name: "Hay Riad",
      intro: "Zone résidentielle moderne, institutions et cliniques, larges boulevards.",
      highlights: ["Avenue Ennakhil", "Ambassades"],
      nearby: ["Souissi", "Agdal"],
    },
    {
      slug: "souissi",
      name: "Souissi",
      intro: "Quartier verdoyant, villas et cliniques privées, accès par rocade.",
      highlights: ["Cliniques privées", "Rocade de Rabat"],
      nearby: ["Hay Riad", "Agdal"],
    },
    {
      slug: "hassan",
      name: "Hassan",
      intro: "Centre historique et administratif, proximité hôpitaux et gares.",
      highlights: ["Tour Hassan", "Bouregreg"],
      nearby: ["Agdal", "Medina"],
    },
    {
      slug: "yacoub-el-mansour",
      name: "Yacoub El Mansour",
      intro: "Secteur résidentiel étendu, accès vers Rabat et Salé.",
      highlights: ["Axes vers Salé"],
      nearby: ["Hassan", "Agdal"],
    },
    {
      slug: "medina",
      name: "Médina",
      intro: "Zone historique, ruelles étroites, accès par portes principales.",
      highlights: ["Bab Bouiba", "Bab El Had"],
      nearby: ["Hassan"],
    },
  ],
}
