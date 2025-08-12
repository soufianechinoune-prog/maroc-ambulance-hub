export type Neighborhood = {
  slug: string;
  label: string;
};

export const neighborhoodsByCity: Record<string, Neighborhood[]> = {
  casablanca: [
    { slug: "ain-diab", label: "Aïn Diab" },
    { slug: "californie", label: "Californie" },
    { slug: "maarif", label: "Maârif" },
    { slug: "bourgogne", label: "Bourgogne" },
    { slug: "sidi-belyout", label: "Sidi Belyout" },
    { slug: "ain-sebaa", label: "Aïn Sebaâ" },
    { slug: "oasis", label: "Oasis" },
    { slug: "sidi-maarouf", label: "Sidi Maarouf" },
    { slug: "sidi-bernoussi", label: "Sidi Bernoussi" },
  ],
  rabat: [
    { slug: "agdal", label: "Agdal" },
    { slug: "hassan", label: "Hassan" },
    { slug: "hay-riad", label: "Hay Riad" },
    { slug: "souissi", label: "Souissi" },
    { slug: "yacoub-el-mansour", label: "Yacoub El Mansour" },
  ],
  marrakech: [
    { slug: "gueliz", label: "Guéliz" },
    { slug: "hivernage", label: "Hivernage" },
    { slug: "medina", label: "Médina" },
    { slug: "sidi-ghanem", label: "Sidi Ghanem" },
  ],
  tanger: [
    { slug: "malabata", label: "Malabata" },
    { slug: "marshan", label: "Marshan" },
    { slug: "iberia", label: "Iberia" },
    { slug: "beni-makada", label: "Beni Makada" },
  ],
  fes: [
    { slug: "medina", label: "Médina" },
    { slug: "ville-nouvelle", label: "Ville Nouvelle" },
    { slug: "saiss", label: "Saïss" },
  ],
  agadir: [
    { slug: "founty", label: "Founty" },
    { slug: "dakhla", label: "Dakhla" },
    { slug: "hay-mohammadi", label: "Hay Mohammadi" },
  ],
  meknes: [
    { slug: "hamria", label: "Hamria" },
    { slug: "ville-nouvelle", label: "Ville Nouvelle" },
    { slug: "toulal", label: "Toulal" },
  ],
  oujda: [
    { slug: "boudir", label: "Boudir" },
    { slug: "el-akhawayn", label: "El Akhawayn" },
    { slug: "hay-el-qarqra", label: "Hay El Qarqra" },
  ],
  kenitra: [
    { slug: "maamora", label: "Maâmora" },
    { slug: "oued-zem", label: "Oued Zem" },
    { slug: "bir-rami", label: "Bir Rami" },
  ],
  sale: [
    { slug: "tabriquet", label: "Tabriquet" },
    { slug: "hay-karima", label: "Hay Karima" },
    { slug: "sidi-moussa", label: "Sidi Moussa" },
  ],
};
