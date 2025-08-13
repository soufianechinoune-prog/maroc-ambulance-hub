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
    { name: "Tanger", slug: "tanger", x: 35, y: 8, responseTime: "15-20 min", isMain: true },
    { name: "Tétouan", slug: "tetouan", x: 40, y: 12, responseTime: "20-25 min" },
    { name: "Rabat", slug: "rabat", x: 33, y: 28, responseTime: "12-18 min", isMain: true },
    { name: "Sale", slug: "sale", x: 31, y: 26, responseTime: "15-20 min" },
    { name: "Kenitra", slug: "kenitra", x: 30, y: 22, responseTime: "18-25 min" },
    { name: "Casablanca", slug: "casablanca", x: 32, y: 35, responseTime: "10-15 min", isMain: true },
    { name: "Mohammedia", slug: "mohammedia", x: 34, y: 33, responseTime: "15-20 min" },
    { name: "Fès", slug: "fes", x: 55, y: 28, responseTime: "15-22 min", isMain: true },
    { name: "Meknès", slug: "meknes", x: 50, y: 30, responseTime: "18-25 min", isMain: true },
    { name: "Marrakech", slug: "marrakech", x: 45, y: 50, responseTime: "12-20 min", isMain: true },
    { name: "Agadir", slug: "agadir", x: 25, y: 62, responseTime: "15-25 min", isMain: true },
    { name: "Oujda", slug: "oujda", x: 85, y: 28, responseTime: "20-30 min", isMain: true },
    { name: "Laâyoune", slug: "laayoune", x: 15, y: 85, responseTime: "25-35 min" }
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
            <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-blue-50 to-green-50 rounded-xl overflow-hidden">
                {/* SVG réaliste du Maroc */}
                <svg
                  viewBox="0 0 300 400"
                  className="w-full h-full"
                  aria-label="Carte du Maroc avec zones d'intervention"
                >
                  {/* Contour réaliste du Maroc */}
                  <path
                    d="M 80 15 
                       L 120 5 
                       L 140 8
                       L 160 15
                       L 180 25
                       L 200 35
                       L 220 30
                       L 240 32
                       L 260 35
                       L 275 45
                       L 280 60
                       L 275 75
                       L 270 90
                       L 265 105
                       L 260 120
                       L 255 135
                       L 250 150
                       L 245 165
                       L 240 180
                       L 235 195
                       L 230 210
                       L 225 225
                       L 220 240
                       L 215 255
                       L 210 270
                       L 205 285
                       L 200 300
                       L 195 315
                       L 190 330
                       L 185 345
                       L 180 360
                       L 175 375
                       L 170 390
                       L 40 395
                       L 30 380
                       L 25 365
                       L 20 350
                       L 15 335
                       L 12 320
                       L 10 305
                       L 8 290
                       L 6 275
                       L 5 260
                       L 4 245
                       L 3 230
                       L 2 215
                       L 1 200
                       L 2 185
                       L 4 170
                       L 7 155
                       L 11 140
                       L 16 125
                       L 22 110
                       L 29 95
                       L 37 80
                       L 46 65
                       L 56 50
                       L 67 35
                       L 78 20
                       Z"
                    fill="hsl(var(--muted))"
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
                    className="transition-colors drop-shadow-sm"
                  />
                  
                  {/* Points des villes */}
                  {cities.map((city) => (
                    <g key={city.slug}>
                      {/* Point de la ville */}
                      <circle
                        cx={city.x * 3}
                        cy={city.y * 4}
                        r={city.isMain ? "8" : "6"}
                        fill={city.isMain ? "hsl(var(--primary))" : "hsl(var(--secondary))"}
                        stroke="white"
                        strokeWidth="2"
                        className="cursor-pointer hover:scale-110 transition-transform drop-shadow-sm"
                        onClick={() => setSelectedCity(city)}
                      />
                      
                      {/* Effet de pulsation pour les villes principales */}
                      {city.isMain && (
                        <circle
                          cx={city.x * 3}
                          cy={city.y * 4}
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
                      top: `${city.y + 4}%`,
                      transform: 'translate(-50%, 0)'
                    }}
                  >
                    <Badge variant="secondary" className="text-xs shadow-sm bg-white/90">
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