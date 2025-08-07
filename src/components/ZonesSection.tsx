import { MapPin, Clock, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ZonesSection = () => {
  const cities = [
    {
      name: "Casablanca",
      region: "Grand Casablanca-Settat",
      responseTime: "10-15 min",
      coverage: "24/7",
      slug: "casablanca",
      isMain: true
    },
    {
      name: "Rabat",
      region: "Rabat-Salé-Kénitra",
      responseTime: "12-18 min",
      coverage: "24/7",
      slug: "rabat",
      isMain: true
    },
    {
      name: "Marrakech",
      region: "Marrakech-Safi",
      responseTime: "15-20 min",
      coverage: "24/7",
      slug: "marrakech",
      isMain: true
    },
    {
      name: "Tanger",
      region: "Tanger-Tétouan-Al Hoceïma",
      responseTime: "15-20 min",
      coverage: "24/7",
      slug: "tanger",
      isMain: true
    },
    {
      name: "Fès",
      region: "Fès-Meknès",
      responseTime: "15-25 min",
      coverage: "24/7",
      slug: "fes",
      isMain: false
    },
    {
      name: "Agadir",
      region: "Souss-Massa",
      responseTime: "15-25 min",
      coverage: "24/7",
      slug: "agadir",
      isMain: false
    },
    {
      name: "Meknès",
      region: "Fès-Meknès",
      responseTime: "20-30 min",
      coverage: "24/7",
      slug: "meknes",
      isMain: false
    },
    {
      name: "Oujda",
      region: "Oriental",
      responseTime: "20-30 min",
      coverage: "24/7",
      slug: "oujda",
      isMain: false
    },
    {
      name: "Laâyoune",
      region: "Laâyoune-Sakia El Hamra",
      responseTime: "25-35 min",
      coverage: "24/7",
      slug: "laayoune",
      isMain: false
    }
  ];

  const mainCities = cities.filter(city => city.isMain);
  const otherCities = cities.filter(city => !city.isMain);

  // JSON-LD structure for ItemList (to be used by parent components)
  const jsonLdItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Zones d'intervention ambulance Maroc",
    "itemListElement": cities.map((city, index) => ({
      "@type": "Place",
      "position": index + 1,
      "name": city.name,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": city.name,
        "addressRegion": city.region,
        "addressCountry": "MA"
      },
      "url": `https://www.ambulance-maroc.ma/ambulance-${city.slug}`
    }))
  };

  return (
    <section className="py-16 bg-secondary/20" aria-label="Zones d'intervention">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Zones d'Intervention
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Notre service d'ambulance couvre l'ensemble du territoire marocain 
            avec des équipes locales dans chaque région.
          </p>
        </div>

        {/* Mobile city list (compact grid) */}
        <div className="md:hidden mb-10 space-y-8" aria-label="Villes - navigation mobile">
          <section>
            <h3 className="text-base font-semibold text-foreground mb-3">Villes Principales</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mainCities.map((city, index) => (
                <li key={index}>
                  <Link
                    to={`/ambulance-${city.slug}`}
                    className="block rounded-lg border border-border bg-card px-4 py-3 text-foreground hover:border-primary hover:bg-accent/30 hover:text-primary transition-colors"
                    aria-label={`Ambulance ${city.name}`}
                  >
                    Ambulance à {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h3 className="text-base font-semibold text-foreground mb-3">Autres Villes Couvertes</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {otherCities.map((city, index) => (
                <li key={index}>
                  <Link
                    to={`/ambulance-${city.slug}`}
                    className="block rounded-lg border border-border bg-card px-4 py-3 text-foreground hover:border-primary hover:bg-accent/30 hover:text-primary transition-colors"
                    aria-label={`Voir les infos pour ${city.name}`}
                  >
                    Voir les infos pour {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Main Cities */}
        <div className="mb-12 hidden md:block" aria-label="Villes principales">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Villes Principales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainCities.map((city, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <MapPin className="h-5 w-5 text-primary mr-2" aria-hidden="true" />
                    <Link to={`/ambulance-${city.slug}`} className="hover:text-primary transition-colors">
                      <h3 className="text-lg font-semibold">{city.name}</h3>
                    </Link>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{city.region}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-success mr-1" aria-hidden="true" />
                      <span className="text-muted-foreground">Réponse</span>
                    </div>
                    <span className="font-semibold text-success">{city.responseTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Disponibilité</span>
                    <span className="font-semibold text-primary">{city.coverage}</span>
                  </div>
                  <Button variant="default" size="sm" className="w-full mt-3" asChild>
                    <Link to={`/ambulance-${city.slug}`} aria-label={`Voir la page dédiée ${city.name}`}>
                      Voir la page dédiée
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Other Cities */}
        <div className="mb-12 hidden md:block" aria-label="Autres villes couvertes">
          <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
            Autres Villes Couvertes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {otherCities.map((city, index) => (
              <Card key={index} className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <Link to={`/ambulance-${city.slug}`} className="hover:text-primary transition-colors">
                      <h3 className="font-semibold text-foreground">{city.name}</h3>
                    </Link>
                    <div className="flex items-center justify-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" aria-hidden="true" />
                      {city.responseTime}
                    </div>
                      <Button variant="default" size="sm" className="mt-2" asChild>
                        <Link to={`/ambulance-${city.slug}`} aria-label={`Voir les infos pour ${city.name}`}>
                          Voir les infos pour {city.name}
                        </Link>
                      </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Coverage Map Placeholder - Reformulated to be coherent */}
        <div className="bg-card rounded-2xl p-8 border border-border">
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Couverture Nationale</h2>
            <div className="mx-auto max-w-xl rounded-xl border border-border bg-background p-6 shadow-sm">
              <p className="text-sm text-muted-foreground">
                Nous intervenons dans plus de 15 villes au Maroc.
                <br />
                Consultez la liste complète pour voir si votre ville est couverte.
              </p>
              <Link
                to="/zones-d-intervention"
                className="mt-4 inline-block text-primary underline hover:text-primary/80 transition-colors"
                aria-label="Voir toutes les villes couvertes"
              >
                Voir toutes les villes
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center bg-primary/5 rounded-2xl p-8 border border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Votre ville n'est pas listée ?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Nous intervenons également dans de nombreuses autres localités. 
            Contactez-nous pour connaître nos possibilités d'intervention dans votre région.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="lg" asChild>
              <a href="tel:+212777722311" className="flex items-center">
                <Phone className="h-5 w-5 mr-2" aria-hidden="true" />
                +212 7777 223 11
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">
                Nous contacter
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZonesSection;
