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
  marrakech: [
    { slug: "gueliz", name: "Guéliz", intro: "Centre moderne, proche gares et cliniques.", highlights: ["Av. Mohammed V", "Pl. 16 Novembre"], nearby: ["Hivernage", "Médina"] },
    { slug: "hivernage", name: "Hivernage", intro: "Hôtels, cliniques, larges artères.", highlights: ["Av. Mohammed VI"], nearby: ["Guéliz", "Agdal"] },
    { slug: "medina", name: "Médina", intro: "Zone historique, accès portes Bab.", highlights: ["Bab Doukkala", "Jemaa el-Fna"], nearby: ["Kasbah", "Guéliz"] },
    { slug: "agdal", name: "Agdal", intro: "Résidentiel et commercial, axes rapides.", highlights: ["Av. Hassan II"], nearby: ["Hivernage", "Guéliz"] },
    { slug: "sidi-youssef-ben-ali", name: "Sidi Youssef Ben Ali", intro: "Densité élevée, accès rocade.", highlights: ["Rocade Saniat"], nearby: ["Médina"] },
  ],
  tanger: [
    { slug: "malabata", name: "Malabata", intro: "Littoral et hôtels, accès corniche.", highlights: ["Corniche", "Marina"], nearby: ["Marshan", "Iberia"] },
    { slug: "marshan", name: "Marshan", intro: "Résidentiel sur hauteur, accès rapide centre.", highlights: ["Vieille montagne"], nearby: ["Iberia", "Centre-Ville"] },
    { slug: "iberia", name: "Iberia", intro: "Cliniques et écoles, boulevards.", highlights: ["Bd Pasteur"], nearby: ["Marshan", "Malabata"] },
    { slug: "centre-ville", name: "Centre-Ville", intro: "Nœud urbain, gares et ports.", highlights: ["Place de France"], nearby: ["Iberia", "Malabata"] },
  ],
  fes: [
    { slug: "ville-nouvelle", name: "Ville Nouvelle", intro: "Boulevards et CHU, accès rapide.", highlights: ["Av. Hassan II"], nearby: ["Agdal", "Médina"] },
    { slug: "agdal", name: "Agdal", intro: "Résidentiel, axes vers hôpitaux.", highlights: ["Route de Sefrou"], nearby: ["Ville Nouvelle"] },
    { slug: "medina", name: "Médina", intro: "Zone historique, accès portes principales.", highlights: ["Bab Boujloud"], nearby: ["Andalous", "Rcif"] },
    { slug: "zouagha", name: "Zouagha", intro: "Secteur large, rocade.", highlights: ["Rocade Fès"], nearby: ["Agdal"] },
  ],
  agadir: [
    { slug: "founty", name: "Founty", intro: "Zone hôtelière et plages.", highlights: ["Corniche"], nearby: ["Centre-Ville", "Bensergao"] },
    { slug: "centre-ville", name: "Centre-Ville", intro: "Administrations et cliniques.", highlights: ["Av. Mohammed V"], nearby: ["Founty", "Hay Mohammadi"] },
    { slug: "hay-mohammadi", name: "Hay Mohammadi", intro: "Densité et axes rapides.", highlights: ["RN1"], nearby: ["Centre-Ville"] },
    { slug: "bensergao", name: "Bensergao", intro: "Entrée sud, proche autoroute.", highlights: ["A3"], nearby: ["Founty"] },
  ],
  meknes: [
    { slug: "hamria", name: "Hamria", intro: "Centre moderne, boulevards.", highlights: ["Av. Mohammed V"], nearby: ["Ville Nouvelle", "Médina"] },
    { slug: "ville-nouvelle", name: "Ville Nouvelle", intro: "Cliniques et commerces.", highlights: ["Place d'Armes"], nearby: ["Hamria"] },
    { slug: "medina", name: "Médina", intro: "Sites historiques, accès portes.", highlights: ["Bab Mansour"], nearby: ["Hamria"] },
    { slug: "sidi-baba", name: "Sidi Baba", intro: "Périphérie résidentielle.", highlights: ["Rocade"], nearby: ["Médina"] },
  ],
  oujda: [
    { slug: "centre-ville", name: "Centre-Ville", intro: "Institutions et hôpitaux.", highlights: ["Av. Mohammed V"], nearby: ["Al Qods"] },
    { slug: "al-qods", name: "Al Qods", intro: "Résidentiel étendu.", highlights: ["Boulevards"], nearby: ["Centre-Ville"] },
    { slug: "sidi-yahya", name: "Sidi Yahya", intro: "Accès vers zones périphériques.", highlights: ["RN2"], nearby: ["Al Qods"] },
  ],
  tetouan: [
    { slug: "mhannech", name: "Mhannech", intro: "Axes proches de cliniques.", highlights: ["Av. 10 Mai"], nearby: ["Centre-Ville"] },
    { slug: "centre-ville", name: "Centre-Ville", intro: "Administrations, commerces.", highlights: ["Pl. Moulay El Mehdi"], nearby: ["Mhannech"] },
    { slug: "martil", name: "Martil", intro: "Littoral proche, axes rapides.", highlights: ["Route Martil"], nearby: ["Centre-Ville"] },
  ],
  laayoune: [
    { slug: "hay-el-massira", name: "Hay El Massira", intro: "Grand quartier résidentiel.", highlights: ["Av. Smara"], nearby: ["Wifaq", "Centre-Ville"] },
    { slug: "wifaq", name: "Al Wifaq", intro: "Résidentiel moderne.", highlights: ["Boulevards"] },
    { slug: "centre-ville", name: "Centre-Ville", intro: "Institutions et hôpitaux.", highlights: ["Pl. Mechouar"], nearby: ["Hay El Massira"] },
  ],
  mohammedia: [
    { slug: "centre-ville", name: "Centre-Ville", intro: "Port, gares et cliniques.", highlights: ["Parc des Villes Jumelées"], nearby: ["Sablettes", "Al Alia"] },
    { slug: "sablettes", name: "Sablettes", intro: "Littoral et axes rapides.", highlights: ["Route Côtière"], nearby: ["Centre-Ville"] },
    { slug: "al-alia", name: "Al Alia", intro: "Zone résidentielle nord.", highlights: ["A3"], nearby: ["Centre-Ville"] },
  ],
  kenitra: [
    { slug: "bir-rami", name: "Bir Rami", intro: "Résidentiel, proche zones sportives.", highlights: ["Complexe sportif"], nearby: ["Centre-Ville", "Maâmora"] },
    { slug: "centre-ville", name: "Centre-Ville", intro: "Gares et cliniques.", highlights: ["Av. Mohammed Diouri"], nearby: ["Bir Rami"] },
    { slug: "maamora", name: "Maâmora", intro: "Proximité forêt de Maâmora.", highlights: ["RN1"], nearby: ["Centre-Ville"] },
    { slug: "mehdia", name: "Mehdia", intro: "Plage et accès par rocade.", highlights: ["Route Mehdia"], nearby: ["Centre-Ville"] },
  ],
}

