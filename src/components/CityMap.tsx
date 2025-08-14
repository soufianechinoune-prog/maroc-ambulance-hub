import { useEffect, useRef, useState } from "react";
import { MAPBOX_TOKEN } from "@/config/map";
import "mapbox-gl/dist/mapbox-gl.css";

type Props = {
  center?: { lng: number; lat: number };
  zoom?: number;
  className?: string;
  showMarker?: boolean;
};

/**
 * CityMap : composant Mapbox robuste (import dynamique, anti double-init, message si token manquant)
 */
export default function CityMap({
  center = { lng: -7.617, lat: 33.572 }, // Casablanca par défaut
  zoom = 10,
  className = "w-full h-[420px] rounded-xl overflow-hidden",
  showMarker = true,
}: Props) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        if (!MAPBOX_TOKEN || MAPBOX_TOKEN.startsWith("pk.REMPLACE")) {
          setError("Clé Mapbox manquante : renseigner MAPBOX_TOKEN dans src/config/map.ts");
          return;
        }
        if (mapRef.current || !mapContainerRef.current) return;

        // import dynamique pour éviter les soucis de bundling/SSR
        const mapboxgl = (await import("mapbox-gl")).default;
        mapboxgl.accessToken = MAPBOX_TOKEN;

        if (cancelled) return;

        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [center.lng, center.lat],
          zoom,
          attributionControl: true,
        });

        if (showMarker) {
          new mapboxgl.Marker().setLngLat([center.lng, center.lat]).addTo(mapRef.current);
        }
      } catch (e: any) {
        console.error("Mapbox init error:", e);
        if (!cancelled) setError("Erreur d'initialisation de la carte");
      }
    })();

    return () => {
      cancelled = true;
      try {
        mapRef.current?.remove();
      } catch {}
      mapRef.current = null;
    };
  }, [center.lng, center.lat, zoom, showMarker]);

  if (error) {
    return (
      <div className="w-full h-[420px] rounded-xl border border-red-200 bg-red-50 flex items-center justify-center text-red-700">
        {error}
      </div>
    );
  }

  return <div ref={mapContainerRef} className={className} />;
}