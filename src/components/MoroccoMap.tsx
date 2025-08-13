import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users } from "lucide-react";
import { cities } from "@/data/cities";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MoroccoMap = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const cityPositions: Record<string, { lng: number; lat: number }> = {
    tanger: { lng: -5.8008, lat: 35.7595 },
    tetouan: { lng: -5.3684, lat: 35.5889 },
    rabat: { lng: -6.8498, lat: 34.0209 },
    casablanca: { lng: -7.5898, lat: 33.5731 },
    marrakech: { lng: -7.9811, lat: 31.6295 },
    agadir: { lng: -9.5981, lat: 30.4278 },
    fes: { lng: -5.0003, lat: 34.0181 },
    oujda: { lng: -1.9115, lat: 34.6814 },
    laayoune: { lng: -13.2036, lat: 27.1536 },
    meknes: { lng: -5.5407, lat: 33.8935 },
    kenitra: { lng: -6.5802, lat: 34.2610 },
    sale: { lng: -6.7985, lat: 34.0531 },
    mohammedia: { lng: -7.3837, lat: 33.6866 }
  };

  const selectedCityData = selectedCity ? cities.find(c => c.slug === selectedCity) : null;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = 'pk.eyJ1Ijoic29jaWFsZXhwbG9yZXIiLCJhIjoiREFQbXBISSJ9.dwFTwfSaWsHvktHrRtpydQ';
    
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-6.2, 32.0],
      zoom: 5.5,
      projection: 'mercator',
      maxBounds: [
        [-17.0, 21.0],
        [2.0, 37.0]
      ],
      attributionControl: true
    });

    // Add navigation controls
    mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add city markers
    Object.entries(cityPositions).forEach(([citySlug, position]) => {
      const city = cities.find(c => c.slug === citySlug);
      if (!city) return;

      // Create marker element
      const markerEl = document.createElement('div');
      markerEl.className = 'cursor-pointer';
      markerEl.innerHTML = `
        <div class="relative group">
          <div class="w-5 h-5 ${city.isMain ? 'bg-blue-600' : 'bg-red-500'} rounded-full border-3 border-white shadow-lg hover:scale-125 transition-all duration-200 pulse-animation"></div>
          <div class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-xs font-bold text-gray-900 whitespace-nowrap bg-white/95 backdrop-blur-sm px-3 py-1 rounded-lg shadow-xl border opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            ${city.name}
          </div>
          ${city.isMain ? '<div class="absolute inset-0 w-5 h-5 bg-blue-400 rounded-full animate-ping opacity-30"></div>' : ''}
        </div>
      `;

      // Create marker
      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat([position.lng, position.lat])
        .addTo(mapRef.current!);

      // Add click event
      markerEl.addEventListener('click', () => {
        setSelectedCity(selectedCity === citySlug ? null : citySlug);
        // Fly to city with smooth animation
        mapRef.current?.flyTo({
          center: [position.lng, position.lat],
          zoom: 9,
          duration: 1500,
          essential: true
        });
      });

      markersRef.current.push(marker);
    });

    return () => {
      // Cleanup markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      // Cleanup map
      mapRef.current?.remove();
    };
  }, [selectedCity]);

  console.log('MoroccoMap rendering with selectedCity:', selectedCity);

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
          {/* Carte Mapbox */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="relative w-full h-[650px] rounded-xl overflow-hidden border-2 border-muted">
                <div ref={mapContainerRef} className="w-full h-full" />
                
                {/* Légende améliorée */}
                <div className="absolute bottom-6 left-6 bg-white/98 backdrop-blur-md rounded-xl p-5 shadow-2xl border border-gray-200">
                  <h4 className="font-bold text-base mb-4 text-gray-800">Zones d'intervention</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-5 h-5 bg-blue-600 rounded-full border-2 border-white shadow-md"></div>
                        <div className="absolute inset-0 w-5 h-5 bg-blue-400 rounded-full animate-ping opacity-30"></div>
                      </div>
                      <span className="font-medium text-gray-700">Villes principales (8-18 min)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-red-500 rounded-full border-2 border-white shadow-md"></div>
                      <span className="font-medium text-gray-700">Autres villes (15-30 min)</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-200 text-xs text-gray-500">
                    Cliquez sur une ville pour plus d'informations
                  </div>
                </div>
                
                {/* Attribution Mapbox */}
                <div className="absolute bottom-6 right-6 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
                  © Mapbox
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