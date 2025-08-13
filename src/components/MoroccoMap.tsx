import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users } from "lucide-react";
import { cities } from "@/data/cities";

const MoroccoMap = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const cityPositions = {
    casablanca: { x: 162, y: 332 },
    rabat: { x: 145, y: 295 },
    marrakech: { x: 135, y: 425 },
    tanger: { x: 125, y: 180 },
    fes: { x: 215, y: 275 },
    agadir: { x: 85, y: 525 },
    meknes: { x: 195, y: 285 },
    oujda: { x: 385, y: 265 },
    kenitra: { x: 138, y: 285 },
    sale: { x: 142, y: 292 },
    mohammedia: { x: 155, y: 325 },
    tetouan: { x: 115, y: 195 },
    laayoune: { x: 45, y: 745 }
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
              <div className="relative w-full h-[600px] bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg overflow-hidden">
                {/* Carte du Maroc SVG basée sur la vraie géographie */}
                <svg
                  viewBox="0 0 500 800"
                  className="w-full h-full"
                  style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
                >
                  {/* Océan Atlantique */}
                  <rect x="0" y="0" width="150" height="800" fill="#3b82f6" opacity="0.2" />
                  
                  {/* Mer Méditerranée */}
                  <rect x="120" y="0" width="380" height="220" fill="#3b82f6" opacity="0.15" />

                  {/* Frontières du Maroc - Tracé réaliste */}
                  <path
                    d="M 125 175 
                       L 140 170 L 155 168 L 170 170 L 185 172 L 200 175 
                       L 215 178 L 230 182 L 245 186 L 260 190 L 275 195 
                       L 290 200 L 305 206 L 320 212 L 335 219 L 350 226 
                       L 365 234 L 380 242 L 395 251 L 410 260 L 425 270 
                       L 435 282 L 440 295 L 442 308 L 441 321 L 438 334 
                       L 433 347 L 426 360 L 417 372 L 406 384 L 393 395 
                       L 378 405 L 361 414 L 342 422 L 321 429 L 298 435 
                       L 273 440 L 246 444 L 217 447 L 186 449 L 153 450 
                       L 118 450 L 82 449 L 45 447 L 7 444 L 25 460 
                       L 45 480 L 60 502 L 70 525 L 75 549 L 76 574 
                       L 73 599 L 66 624 L 55 648 L 40 671 L 22 693 
                       L 0 714 L 15 730 L 35 745 L 58 758 L 84 769 
                       L 113 778 L 145 785 L 179 790 L 215 793 L 253 794 
                       L 292 793 L 332 790 L 372 785 L 412 778 L 451 769 
                       L 489 758 L 525 745 L 559 730 L 590 713 L 618 694 
                       L 642 673 L 662 650 L 677 625 L 687 598 L 692 570 
                       L 691 541 L 685 512 L 673 484 L 656 457 L 634 432 
                       L 607 409 L 575 388 L 538 370 L 497 354 L 451 341 
                       L 401 330 L 347 322 L 289 316 L 228 313 L 164 312 
                       L 125 175 Z"
                    fill="#e8f4f8"
                    stroke="#1e40af"
                    strokeWidth="2"
                    className="transition-colors hover:fill-blue-100"
                  />

                  {/* Sahara Occidental - frontière administrative */}
                  <path
                    d="M 0 714 L 15 730 L 35 745 L 58 758 L 84 769 L 113 778 L 145 785 L 179 790 L 215 793 L 253 794 L 292 793 L 332 790 L 372 785 L 412 778 L 451 769 L 489 758 L 525 745 L 525 800 L 0 800 Z"
                    fill="#f0f8ff"
                    stroke="#1e40af"
                    strokeWidth="1"
                    strokeDasharray="4,4"
                    opacity="0.7"
                  />

                  {/* Chaîne de l'Atlas */}
                  <path
                    d="M 150 350 Q 200 340, 250 345 Q 300 350, 350 360 Q 400 370, 450 385"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="3"
                    opacity="0.3"
                  />

                  {/* Villes avec zones d'intervention */}
                  {Object.entries(cityPositions).map(([citySlug, position]) => {
                    const city = cities.find(c => c.slug === citySlug);
                    if (!city) return null;

                    const isMain = city.isMain;
                    const isSelected = selectedCity === citySlug;
                    const isHovered = hoveredCity === citySlug;

                    return (
                      <g key={citySlug}>
                        {/* Zone de couverture d'intervention */}
                        <circle
                          cx={position.x}
                          cy={position.y}
                          r={isMain ? "45" : "30"}
                          fill={isMain ? "#3b82f6" : "#ef4444"}
                          opacity={isSelected || isHovered ? "0.25" : "0.08"}
                          className={isSelected ? "animate-pulse" : "transition-opacity duration-300"}
                        />
                        
                        {/* Point principal de la ville */}
                        <circle
                          cx={position.x}
                          cy={position.y}
                          r={isMain ? "8" : "6"}
                          fill={isMain ? "#1d4ed8" : "#dc2626"}
                          stroke="white"
                          strokeWidth="2.5"
                          className="cursor-pointer transition-all duration-200 hover:scale-125"
                          onClick={() => setSelectedCity(selectedCity === citySlug ? null : citySlug)}
                          onMouseEnter={() => setHoveredCity(citySlug)}
                          onMouseLeave={() => setHoveredCity(null)}
                        />
                        
                        {/* Label de la ville */}
                        <text
                          x={position.x}
                          y={position.y - 18}
                          textAnchor="middle"
                          className="text-xs font-semibold fill-gray-800 pointer-events-none"
                          style={{ fontSize: '12px', fontFamily: 'Inter, sans-serif' }}
                        >
                          {city.name}
                        </text>

                        {/* Indicateur temps d'intervention pour villes principales */}
                        {isMain && (isSelected || isHovered) && (
                          <text
                            x={position.x}
                            y={position.y + 25}
                            textAnchor="middle"
                            className="text-xs font-medium fill-primary pointer-events-none"
                            style={{ fontSize: '10px' }}
                          >
                            {city.responseTime}
                          </text>
                        )}
                      </g>
                    );
                  })}

                  {/* Noms des villes voisines pour le contexte */}
                  <text x="430" y="140" className="text-xs fill-gray-500" style={{ fontSize: '10px' }}>Algérie</text>
                  <text x="50" y="160" className="text-xs fill-gray-500" style={{ fontSize: '10px' }}>Océan</text>
                  <text x="50" y="175" className="text-xs fill-gray-500" style={{ fontSize: '10px' }}>Atlantique</text>
                  <text x="280" y="140" className="text-xs fill-gray-500" style={{ fontSize: '10px' }}>Mer Méditerranée</text>
                </svg>

                {/* Légende interactive */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl border">
                  <h4 className="font-semibold text-sm mb-3 text-gray-800">Zones d'intervention</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-blue-600 rounded-full shadow-sm"></div>
                      <span className="text-gray-700">Villes principales (8-18 min)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-600 rounded-full shadow-sm"></div>
                      <span className="text-gray-700">Autres villes (15-30 min)</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-600">Cliquez sur une ville pour plus d'infos</p>
                  </div>
                </div>
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