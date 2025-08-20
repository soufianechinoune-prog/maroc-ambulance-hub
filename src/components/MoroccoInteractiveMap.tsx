import { useEffect, useRef, useState } from "react";
import { MAPBOX_TOKEN } from "@/config/map";
import { cities } from "@/data/cities";
import { useNavigate } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";

type Props = {
  center?: { lng: number; lat: number };
  zoom?: number;
  className?: string;
  showCityMarkers?: boolean;
};

/**
 * MoroccoInteractiveMap : carte interactive du Maroc avec pins des villes desservies
 */
export default function MoroccoInteractiveMap({
  center = { lng: -6.8498, lat: 31.7917 }, // Centre du Maroc
  zoom = 5.5,
  className = "w-full h-[600px] rounded-xl overflow-hidden",
  showCityMarkers = true,
}: Props) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Coordonnées des villes
  const cityCoordinates: Record<string, [number, number]> = {
    casablanca: [-7.617, 33.572],
    rabat: [-6.849, 34.020],
    marrakech: [-7.999, 31.630],
    tanger: [-5.800, 35.767],
    fes: [-5.000, 34.040],
    agadir: [-9.600, 30.430],
    meknes: [-5.554, 33.893],
    oujda: [-1.910, 34.680],
    tetouan: [-5.368, 35.578],
    laayoune: [-13.203, 27.125],
    mohammedia: [-7.383, 33.686],
    kenitra: [-6.580, 34.261],
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        if (!MAPBOX_TOKEN || MAPBOX_TOKEN.startsWith("pk.REMPLACE")) {
          setError("Clé Mapbox manquante : renseigner MAPBOX_TOKEN dans src/config/map.ts");
          return;
        }
        if (mapRef.current || !mapContainerRef.current) return;

        // Import dynamique pour éviter les soucis de bundling/SSR
        const mapboxgl = (await import("mapbox-gl")).default;
        mapboxgl.accessToken = MAPBOX_TOKEN;

        if (cancelled) return;

        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: "mapbox://styles/mapbox/light-v11", // Style light sans frontières disputées
          center: [center.lng, center.lat],
          zoom,
          attributionControl: true,
        });

        if (showCityMarkers) {
          // Attendre que la carte soit chargée
          mapRef.current.on('load', () => {
            // Créer des marqueurs pour chaque ville
            cities.forEach((city) => {
              const coordinates = cityCoordinates[city.slug];
              if (coordinates) {
                // Créer l'élément DOM pour le marqueur personnalisé
                const markerElement = document.createElement('div');
                markerElement.className = `city-marker ${city.isMain ? 'main-city' : 'other-city'}`;
                markerElement.style.cssText = `
                  width: ${city.isMain ? '20px' : '16px'};
                  height: ${city.isMain ? '20px' : '16px'};
                  background-color: ${city.isMain ? '#2563eb' : '#ef4444'};
                  border: 3px solid white;
                  border-radius: 50%;
                  cursor: pointer;
                  box-shadow: 0 4px 8px rgba(0,0,0,0.4);
                  transition: transform 0.2s ease;
                  position: relative;
                  z-index: 10;
                `;
                
                // Effet hover - plus visible
                markerElement.addEventListener('mouseenter', () => {
                  markerElement.style.transform = 'scale(1.3)';
                  markerElement.style.zIndex = '20';
                });
                
                markerElement.addEventListener('mouseleave', () => {
                  markerElement.style.transform = 'scale(1)';
                  markerElement.style.zIndex = '10';
                });

                // Créer le marqueur Mapbox
                const marker = new mapboxgl.Marker(markerElement)
                  .setLngLat(coordinates)
                  .addTo(mapRef.current);

                // Créer la popup
                const popup = new mapboxgl.Popup({ 
                  offset: 25,
                  className: 'city-popup',
                  closeOnClick: false, // Ne pas fermer automatiquement
                  closeButton: true    // Afficher le bouton fermer
                }).setHTML(`
                  <div style="padding: 12px; min-width: 220px;">
                    <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937; font-size: 16px;">${city.name}</h3>
                    <p style="margin: 0 0 4px 0; font-size: 14px; color: #6b7280;">
                      Temps d'intervention: <strong style="color: #059669;">${city.responseTime}</strong>
                    </p>
                    <p style="margin: 0 0 8px 0; font-size: 14px; color: #6b7280;">
                      Couverture: <strong style="color: #059669;">${city.coverage}</strong>
                    </p>
                    <button 
                      onclick="window.cityNavigate('${city.slug}')" 
                      style="
                        background: #2563eb; 
                        color: white; 
                        border: none; 
                        padding: 8px 16px; 
                        border-radius: 6px; 
                        cursor: pointer; 
                        font-size: 14px;
                        width: 100%;
                        font-weight: 500;
                        transition: background-color 0.2s;
                      "
                      onmouseover="this.style.backgroundColor='#1d4ed8'"
                      onmouseout="this.style.backgroundColor='#2563eb'"
                    >
                      Ambulance ${city.name} - Service 24h/24 →
                    </button>
                  </div>
                `);

                // Ajouter la popup au marqueur (ne pas l'ouvrir automatiquement)
                marker.setPopup(popup);
                
                // Ouvrir la popup au clic sur le marqueur
                markerElement.addEventListener('click', (e) => {
                  e.stopPropagation();
                  // Fermer toutes les autres popups ouvertes
                  markersRef.current.forEach(m => {
                    if (m.getPopup().isOpen()) {
                      m.getPopup().remove();
                    }
                  });
                  // Ouvrir cette popup
                  popup.addTo(mapRef.current);
                });

                markersRef.current.push(marker);
              }
            });

            // Fonction globale pour la navigation depuis les popups
            (window as any).cityNavigate = (citySlug: string) => {
              navigate(`/ambulance-${citySlug}`);
            };
          });
        }

        // Ajuster la vue pour montrer tout le Maroc
        mapRef.current.fitBounds([
          [-13.5, 27.3], // Sud-ouest (incluant Laâyoune)
          [-0.8, 36.1]   // Nord-est (incluant Oujda)
        ], { 
          padding: 50,
          duration: 0 
        });

      } catch (e: any) {
        console.error("Mapbox init error:", e);
        if (!cancelled) setError("Erreur d'initialisation de la carte");
      }
    })();

    return () => {
      cancelled = true;
      // Nettoyer les marqueurs
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      
      try {
        mapRef.current?.remove();
      } catch {}
      mapRef.current = null;
      
      // Nettoyer la fonction globale
      delete (window as any).cityNavigate;
    };
  }, [center.lng, center.lat, zoom, showCityMarkers, navigate]);

  if (error) {
    return (
      <div className="w-full h-[600px] rounded-xl border border-red-200 bg-red-50 flex items-center justify-center text-red-700">
        {error}
      </div>
    );
  }

  return (
    <>
      <div ref={mapContainerRef} className={className} />
      
      {/* Légende */}
      <div className="mt-4 bg-white rounded-lg border p-4 shadow-sm">
        <h3 className="font-semibold text-foreground mb-3">Légende</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-sm"></div>
            <span className="text-sm text-muted-foreground">Villes principales (8-18 min)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm"></div>
            <span className="text-sm text-muted-foreground">Autres villes (15-30 min)</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          💡 Cliquez sur les marqueurs pour découvrir nos services d'ambulance par ville
        </p>
      </div>
    </>
  );
}