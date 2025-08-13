import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users } from "lucide-react";
import { cities } from "@/data/cities";

const MoroccoMap = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const cityPositions = {
    tanger: { x: 820, y: 180 },
    tetouan: { x: 860, y: 190 },
    rabat: { x: 760, y: 260 },
    casablanca: { x: 720, y: 280 },
    marrakech: { x: 650, y: 420 },
    agadir: { x: 560, y: 520 },
    fes: { x: 780, y: 300 },
    oujda: { x: 920, y: 300 },
    laayoune: { x: 430, y: 620 },
    meknes: { x: 750, y: 310 },
    kenitra: { x: 740, y: 250 },
    sale: { x: 750, y: 255 },
    mohammedia: { x: 710, y: 290 }
  };

  const selectedCityData = selectedCity ? cities.find(c => c.slug === selectedCity) : null;

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Carte Interactive du Maroc
          </h2>
          <p className="text-lg text-muted-foreground">
            Découvrez nos zones d'intervention à travers le territoire marocain
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Carte */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="relative w-full h-[600px] bg-white rounded-lg overflow-hidden">
                <svg viewBox="0 0 1200 900" className="w-full h-full">
                  <defs>
                    <style>
                      {`
                        .ocean { fill: #cfe3ee; }
                        .land { fill: #efe9dc; }
                        .stroke { fill: none; stroke: #c8c2b6; stroke-width: 1; }
                        .city-dot { fill: #2b2b2b; cursor: pointer; transition: all 0.2s; }
                        .city-dot:hover { fill: #3b82f6; transform: scale(1.2); }
                        .city-dot.main { fill: #1d4ed8; }
                        .city-dot.selected { fill: #ef4444; }
                        .city-label {
                          font-family: "Inter", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
                          font-size: 16px;
                          fill: #2b2b2b;
                          font-weight: 600;
                          paint-order: stroke;
                          stroke: #ffffff; 
                          stroke-width: 3px; 
                          stroke-linejoin: round;
                          pointer-events: none;
                        }
                        .zone-circle {
                          fill: none;
                          stroke: #3b82f6;
                          stroke-width: 2;
                          opacity: 0.3;
                        }
                        .zone-circle.main {
                          stroke: #1d4ed8;
                        }
                        .zone-circle.other {
                          stroke: #ef4444;
                        }
                      `}
                    </style>
                  </defs>

                  {/* Océan */}
                  <rect className="ocean" x="0" y="0" width="1200" height="900"/>

                  {/* Terre (Maroc + Sahara occidental) */}
                  <g id="morocco">
                    <path className="land" d="
                      M 1150,120
                      L 1020,120 980,140 950,170 920,210 880,245 850,270 820,300 780,320 730,330
                      690,350 650,380 620,420 600,470 560,500 520,520 500,560 490,600 470,640
                      450,690 420,720 390,740 350,760 330,800 300,830 270,845 240,855 210,860
                      190,850 170,840 130,820 110,800 95,770 85,740 80,700 75,650 70,600 65,560
                      70,520 85,500 120,470 150,450 170,430 190,400 220,360 260,330 300,310
                      340,300 360,280 380,250 410,230 450,220 500,210 540,200 560,190 600,165
                      640,150 700,140 760,135 820,130 900,120 1000,110 1080,110 1150,120 Z" />
                    <path className="stroke" d="
                      M 1150,120
                      L 1020,120 980,140 950,170 920,210 880,245 850,270 820,300 780,320 730,330
                      690,350 650,380 620,420 600,470 560,500 520,520 500,560 490,600 470,640
                      450,690 420,720 390,740 350,760 330,800 300,830 270,845 240,855 210,860
                      190,850 170,840 130,820 110,800 95,770 85,740 80,700 75,650 70,600 65,560
                      70,520 85,500 120,470 150,450 170,430 190,400 220,360 260,330 300,310
                      340,300 360,280 380,250 410,230 450,220 500,210 540,200 560,190 600,165
                      640,150 700,140 760,135 820,130 900,120 1000,110 1080,110 1150,120" />
                  </g>

                  {/* Zones d'intervention (cercles de couverture) */}
                  {Object.entries(cityPositions).map(([citySlug, position]) => {
                    const city = cities.find(c => c.slug === citySlug);
                    if (!city) return null;
                    
                    const isSelected = selectedCity === citySlug;
                    const isHovered = hoveredCity === citySlug;
                    
                    if (isSelected || isHovered) {
                      return (
                        <circle 
                          key={`zone-${citySlug}`}
                          className={`zone-circle ${city.isMain ? 'main' : 'other'}`}
                          cx={position.x} 
                          cy={position.y} 
                          r={city.isMain ? "80" : "60"}
                          style={{ opacity: isSelected ? 0.4 : 0.2 }}
                        />
                      );
                    }
                    return null;
                  })}

                  {/* Villes */}
                  {Object.entries(cityPositions).map(([citySlug, position]) => {
                    const city = cities.find(c => c.slug === citySlug);
                    if (!city) return null;
                    
                    const isSelected = selectedCity === citySlug;
                    const isMain = city.isMain;
                    
                    return (
                      <g key={citySlug}>
                        <circle 
                          className={`city-dot ${isMain ? 'main' : ''} ${isSelected ? 'selected' : ''}`}
                          cx={position.x} 
                          cy={position.y} 
                          r={isMain ? "7" : "5"}
                          onClick={() => setSelectedCity(selectedCity === citySlug ? null : citySlug)}
                          onMouseEnter={() => setHoveredCity(citySlug)}
                          onMouseLeave={() => setHoveredCity(null)}
                        />
                        <text 
                          className="city-label" 
                          x={position.x + 12} 
                          y={position.y - 5}
                        >
                          {city.name}
                        </text>
                      </g>
                    );
                  })}

                  {/* Légende */}
                  <g id="legend" transform="translate(50, 750)">
                    <rect fill="rgba(255,255,255,0.9)" x="-20" y="-40" width="400" height="100" rx="8" stroke="#c8c2b6"/>
                    
                    <text className="city-label" x="0" y="-15" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                      Zones d'intervention
                    </text>
                    
                    <circle className="city-dot main" cx="20" cy="10" r="6"/>
                    <text className="city-label" x="35" y="15" style={{ fontSize: '14px' }}>
                      Villes principales (8-18 min)
                    </text>
                    
                    <circle className="city-dot" cx="20" cy="35" r="5"/>
                    <text className="city-label" x="35" y="40" style={{ fontSize: '14px' }}>
                      Autres villes (15-30 min)
                    </text>
                  </g>
                </svg>
              </div>
            </Card>
          </div>

          {/* Panneau d'informations */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                {selectedCityData ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-foreground">
                        {selectedCityData.name}
                      </h3>
                      {selectedCityData.isMain && (
                        <Badge variant="secondary">Ville principale</Badge>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Intervention: {selectedCityData.responseTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>Couverture: {selectedCityData.coverage}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>Population: {selectedCityData.population}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedCityData.description}
                    </p>

                    <div className="pt-4">
                      <a
                        href={`/ambulance-${selectedCityData.slug}`}
                        className="inline-flex items-center justify-center w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
                      >
                        Voir le service à {selectedCityData.name}
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <MapPin className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Sélectionnez une ville
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Cliquez sur un point de la carte pour voir les détails du service d'ambulance dans cette ville.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation rapide */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Accès rapide aux villes principales</h3>
          <div className="flex flex-wrap gap-2">
            {cities.filter(c => c.isMain).map((city) => (
              <button
                key={city.slug}
                onClick={() => setSelectedCity(city.slug)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedCity === city.slug
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoroccoMap;