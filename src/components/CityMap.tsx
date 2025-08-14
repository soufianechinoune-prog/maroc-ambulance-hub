import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = "pk.eyJ1Ijoic29jaWFsZXhwbG9yZXIiLCJhIjoiREFQbXBISSJ9.dwFTwfSaWsHvktHrRtpydQ";

mapboxgl.accessToken = MAPBOX_TOKEN;

interface CityMapProps {
  center?: { lng: number; lat: number };
  zoom?: number;
}

const CityMap = ({ center = { lng: -7.617, lat: 33.572 }, zoom = 10 }: CityMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (mapInstance.current) return; // éviter double initialisation

    if (!mapContainer.current) return;

    mapInstance.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [center.lng, center.lat],
      zoom,
    });

    new mapboxgl.Marker().setLngLat([center.lng, center.lat]).addTo(mapInstance.current);

    return () => {
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, [center.lng, center.lat, zoom]);

  return <div ref={mapContainer} className="w-full h-[420px]" />;
};

export default CityMap;