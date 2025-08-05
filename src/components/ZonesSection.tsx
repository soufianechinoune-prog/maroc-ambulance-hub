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

  return (
    <section className="py-16 bg-secondary/20">
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

        {/* Main Cities */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            Villes Principales
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainCities.map((city, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <MapPin className="h-5 w-5 text-primary mr-2" />
                    {city.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{city.region}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-success mr-1" />
                      <span className="text-muted-foreground">Réponse</span>
                    </div>
                    <span className="font-semibold text-success">{city.responseTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Disponibilité</span>
                    <span className="font-semibold text-primary">{city.coverage}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3" asChild>
                    <Link to={`/${city.slug}`}>
                      Page dédiée {city.name}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Other Cities */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
            Autres Villes Couvertes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {otherCities.map((city, index) => (
              <Card key={index} className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <h4 className="font-semibold text-foreground">{city.name}</h4>
                    <div className="flex items-center justify-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {city.responseTime}
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs" asChild>
                      <Link to={`/${city.slug}`}>Voir la page</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Coverage Map Placeholder */}
        <div className="bg-card rounded-2xl p-8 border border-border">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-foreground">
              Couverture Nationale
            </h3>
            <div className="h-64 bg-accent/30 rounded-xl flex items-center justify-center">
              <div className="text-center space-y-2">
                <MapPin className="h-12 w-12 text-primary mx-auto" />
                <p className="text-muted-foreground">
                  Carte interactive du Maroc
                </p>
                <p className="text-sm text-muted-foreground">
                  Toutes les villes et régions couvertes par notre service
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center bg-primary/5 rounded-2xl p-8 border border-primary/20">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Votre ville n'est pas listée ?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Nous intervenons également dans de nombreuses autres localités. 
            Contactez-nous pour connaître nos possibilités d'intervention dans votre région.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="lg" asChild>
              <a href="tel:+212522000000" className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                +212 522 000 000
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
