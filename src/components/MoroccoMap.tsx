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

  // Positions précises des villes sur la vraie carte du Maroc (en pourcentages)
  const cities: CityPoint[] = [
    { name: "Tanger", slug: "tanger", x: 25, y: 15, responseTime: "15-20 min", isMain: true },
    { name: "Tétouan", slug: "tetouan", x: 22, y: 18, responseTime: "20-25 min" },
    { name: "Rabat", slug: "rabat", x: 15, y: 35, responseTime: "12-18 min", isMain: true },
    { name: "Sale", slug: "sale", x: 13, y: 33, responseTime: "15-20 min" },
    { name: "Kenitra", slug: "kenitra", x: 12, y: 30, responseTime: "18-25 min" },
    { name: "Casablanca", slug: "casablanca", x: 12, y: 42, responseTime: "10-15 min", isMain: true },
    { name: "Mohammedia", slug: "mohammedia", x: 14, y: 40, responseTime: "15-20 min" },
    { name: "Fès", slug: "fes", x: 45, y: 38, responseTime: "15-22 min", isMain: true },
    { name: "Meknès", slug: "meknes", x: 35, y: 40, responseTime: "18-25 min", isMain: true },
    { name: "Marrakech", slug: "marrakech", x: 25, y: 58, responseTime: "12-20 min", isMain: true },
    { name: "Agadir", slug: "agadir", x: 15, y: 72, responseTime: "15-25 min", isMain: true },
    { name: "Oujda", slug: "oujda", x: 75, y: 38, responseTime: "20-30 min", isMain: true },
    { name: "Laâyoune", slug: "laayoune", x: 20, y: 88, responseTime: "25-35 min" }
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
                {/* SVG précis du Maroc basé sur la vraie géographie */}
                <svg
                  viewBox="0 0 400 500"
                  className="w-full h-full"
                  aria-label="Carte du Maroc avec zones d'intervention"
                >
                  {/* Contour authentique du Maroc */}
                  <path
                    d="M 105 60 
                       C 110 55, 125 50, 140 52
                       C 155 54, 170 58, 185 65
                       C 200 72, 215 75, 230 78
                       C 245 81, 260 85, 275 90
                       C 290 95, 305 100, 320 110
                       C 335 120, 350 135, 360 155
                       C 365 170, 368 185, 365 200
                       C 362 215, 358 230, 355 245
                       C 352 260, 348 275, 345 290
                       C 342 305, 338 320, 335 335
                       C 332 350, 328 365, 325 380
                       C 322 395, 318 410, 315 425
                       C 312 440, 308 455, 305 470
                       L 300 485
                       L 285 490
                       C 270 485, 255 480, 240 475
                       C 225 470, 210 465, 195 460
                       C 180 455, 165 450, 150 445
                       C 135 440, 120 435, 105 430
                       C 90 425, 75 420, 60 415
                       C 45 410, 30 405, 15 400
                       L 10 385
                       C 8 370, 6 355, 4 340
                       C 2 325, 1 310, 2 295
                       C 3 280, 5 265, 8 250
                       C 11 235, 15 220, 20 205
                       C 25 190, 31 175, 38 160
                       C 45 145, 53 130, 62 115
                       C 71 100, 81 85, 92 70
                       C 98 62, 102 61, 105 60
                       Z"
                    fill="hsl(var(--muted))"
                    stroke="hsl(var(--border))"
                    strokeWidth="3"
                    className="transition-colors drop-shadow-lg"
                  />
                  
                  {/* Détails géographiques - Côte méditerranéenne */}
                  <path
                    d="M 105 60 C 120 58, 135 56, 150 58 C 165 60, 180 62, 190 65"
                    fill="none"
                    stroke="hsl(var(--primary)/0.3)"
                    strokeWidth="2"
                    className="opacity-50"
                  />
                  
                  {/* Sahara occidental */}
                  <path
                    d="M 15 400 L 10 450 L 50 470 L 100 480 L 150 475 L 200 470 L 240 475"
                    fill="none"
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    className="opacity-60"
                  />
                  
                  {/* Points des villes */}
                  {cities.map((city) => (
                    <g key={city.slug}>
                      {/* Point de la ville */}
                      <circle
                        cx={city.x * 4}
                        cy={city.y * 5}
                        r={city.isMain ? "10" : "7"}
                        fill={city.isMain ? "hsl(var(--primary))" : "hsl(var(--destructive))"}
                        stroke="white"
                        strokeWidth="3"
                        className="cursor-pointer hover:scale-125 transition-all drop-shadow-md"
                        onClick={() => setSelectedCity(city)}
                      />
                      
                      {/* Effet de pulsation pour les villes principales */}
                      {city.isMain && (
                        <circle
                          cx={city.x * 4}
                          cy={city.y * 5}
                          r="10"
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
                      top: `${city.y + 5}%`,
                      transform: 'translate(-50%, 0)'
                    }}
                  >
                    <Badge variant="default" className="text-xs shadow-lg bg-white text-primary border-primary/20">
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