import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock } from "lucide-react";

interface CityPoint {
  name: string;
  slug: string;
  x: number; // Position X en pourcentage
  y: number; // Position Y en pourcentage
  responseTime: string;
  isMain?: boolean;
}

const MoroccoMap = () => {
  const [selectedCity, setSelectedCity] = useState<CityPoint | null>(null);

  // Positions approximatives des villes sur une carte du Maroc (en pourcentages)
  const cities: CityPoint[] = [
    { name: "Tanger", slug: "tanger", x: 20, y: 15, responseTime: "15-20 min", isMain: true },
    { name: "Tétouan", slug: "tetouan", x: 25, y: 18, responseTime: "20-25 min" },
    { name: "Rabat", slug: "rabat", x: 25, y: 35, responseTime: "12-18 min", isMain: true },
    { name: "Sale", slug: "sale", x: 23, y: 33, responseTime: "15-20 min" },
    { name: "Kenitra", slug: "kenitra", x: 22, y: 30, responseTime: "18-25 min" },
    { name: "Casablanca", slug: "casablanca", x: 30, y: 45, responseTime: "10-15 min", isMain: true },
    { name: "Mohammedia", slug: "mohammedia", x: 32, y: 43, responseTime: "15-20 min" },
    { name: "Fès", slug: "fes", x: 45, y: 35, responseTime: "15-22 min", isMain: true },
    { name: "Meknès", slug: "meknes", x: 40, y: 38, responseTime: "18-25 min", isMain: true },
    { name: "Marrakech", slug: "marrakech", x: 40, y: 65, responseTime: "12-20 min", isMain: true },
    { name: "Agadir", slug: "agadir", x: 25, y: 80, responseTime: "15-25 min", isMain: true },
    { name: "Oujda", slug: "oujda", x: 85, y: 35, responseTime: "20-30 min", isMain: true },
    { name: "Laâyoune", slug: "laayoune", x: 15, y: 95, responseTime: "25-35 min" }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10" aria-label="Carte interactive du Maroc">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Carte Interactive de nos Zones d'Intervention
          </h2>
          <p className="text-lg text-muted-foreground">
            Cliquez sur une ville pour voir les détails du service d'ambulance
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Carte du Maroc */}
          <div className="lg:col-span-2">
            <div className="relative bg-white rounded-2xl shadow-lg p-6">
              <div className="relative w-full aspect-[4/5] bg-gradient-to-br from-blue-50 to-green-50 rounded-xl overflow-hidden">
                {/* SVG simplifié du Maroc */}
                <svg
                  viewBox="0 0 400 500"
                  className="w-full h-full"
                  aria-label="Carte du Maroc avec zones d'intervention"
                >
                  {/* Contour simplifié du Maroc */}
                  <path
                    d="M80 50 L320 50 L340 80 L360 120 L380 200 L360 280 L340 350 L300 420 L250 450 L200 480 L150 470 L100 450 L70 400 L50 350 L40 300 L30 250 L20 200 L30 150 L50 100 Z"
                    fill="hsl(var(--muted))"
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
                    className="transition-colors"
                  />
                  
                  {/* Points des villes */}
                  {cities.map((city) => (
                    <g key={city.slug}>
                      {/* Point de la ville */}
                      <circle
                        cx={city.x * 4}
                        cy={city.y * 5}
                        r={city.isMain ? "8" : "6"}
                        fill={city.isMain ? "hsl(var(--primary))" : "hsl(var(--secondary))"}
                        stroke="white"
                        strokeWidth="2"
                        className="cursor-pointer hover:scale-110 transition-transform"
                        onClick={() => setSelectedCity(city)}
                      />
                      
                      {/* Effet de pulsation pour les villes principales */}
                      {city.isMain && (
                        <circle
                          cx={city.x * 4}
                          cy={city.y * 5}
                          r="8"
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="2"
                          opacity="0.6"
                          className="animate-ping"
                        />
                      )}
                    </g>
                  ))}
                </svg>

                {/* Labels des villes principales */}
                {cities.filter(city => city.isMain).map((city) => (
                  <div
                    key={`label-${city.slug}`}
                    className="absolute pointer-events-none"
                    style={{
                      left: `${city.x}%`,
                      top: `${city.y + 3}%`,
                      transform: 'translate(-50%, 0)'
                    }}
                  >
                    <Badge variant="secondary" className="text-xs shadow-sm">
                      {city.name}
                    </Badge>
                  </div>
                ))}
              </div>

              {/* Légende */}
              <div className="mt-6 flex flex-wrap gap-4 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-primary"></div>
                  <span className="text-sm text-muted-foreground">Villes principales</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary"></div>
                  <span className="text-sm text-muted-foreground">Autres villes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Informations sur la ville sélectionnée */}
          <div className="lg:col-span-1">
            {selectedCity ? (
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {selectedCity.name}
                      </h3>
                      {selectedCity.isMain && (
                        <Badge variant="default" className="mt-1">
                          Ville principale
                        </Badge>
                      )}
                    </div>
                    <div className="text-3xl">🚑</div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm">
                        Temps d'intervention: <strong>{selectedCity.responseTime}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm">Service disponible 24h/24</span>
                    </div>
                  </div>

                  <a
                    href={`/ambulance-${selectedCity.slug}`}
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
                  >
                    Voir le service à {selectedCity.name}
                  </a>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <h3 className="text-lg font-semibold mb-2">
                    Sélectionnez une ville
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Cliquez sur un point de la carte pour voir les détails du service d'ambulance dans cette ville.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoroccoMap;