import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = "pk.eyJ1Ijoic29jaWFsZXhwbG9yZXIiLCJhIjoiREFQbXBISSJ9.dwFTwfSaWsHvktHrRtpydQ";

export default function MoroccoMap() {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null); // anti double-init

  useEffect(() => {
    if (mapInstance.current) return; // éviter double initialisation

    // 1) Token + init
    mapboxgl.accessToken = MAPBOX_TOKEN;

    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-7.62, 33.58], // Casablanca
      zoom: 5
    });
    mapInstance.current = map;

    // Logs d'erreur utiles
    map.on("error", (e) => {
      console.error("Mapbox error:", e?.error || e);
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // 2) Données GeoJSON (long, lat)
    const cities = {
      type: "FeatureCollection",
      features: [
        // Principales (bleu)
        { type:"Feature", properties:{ name:"Casablanca", tier:"main" }, geometry:{ type:"Point", coordinates:[-7.62,33.58] } },
        { type:"Feature", properties:{ name:"Rabat",       tier:"main" }, geometry:{ type:"Point", coordinates:[-6.84,34.02] } },
        { type:"Feature", properties:{ name:"Marrakech",   tier:"main" }, geometry:{ type:"Point", coordinates:[-7.99,31.63] } },
        { type:"Feature", properties:{ name:"Tanger",      tier:"main" }, geometry:{ type:"Point", coordinates:[-5.80,35.76] } },
        { type:"Feature", properties:{ name:"Agadir",      tier:"main" }, geometry:{ type:"Point", coordinates:[-9.60,30.43] } },

        // Autres (rouge)
        { type:"Feature", properties:{ name:"Fès",   tier:"other" }, geometry:{ type:"Point", coordinates:[-5.00,34.04] } },
        { type:"Feature", properties:{ name:"Oujda", tier:"other" }, geometry:{ type:"Point", coordinates:[-1.91,34.68] } }
      ]
    };

    // 3) Ajout des couches une fois le style chargé
    map.on("style.load", () => {
      console.log("✅ Style chargé — ajout des sources/couches…");
      console.log("📍 Cities data:", cities);
      console.log("🗺️ Map object:", map);

      // Source unique (plus simple pour débug)
      if (!map.getSource("cities")) {
        map.addSource("cities", { type: "geojson", data: cities });
        console.log("✅ Source 'cities' ajoutée");
      } else {
        console.log("⚠️ Source 'cities' existe déjà");
      }

      // Points bleus (tier=main)
      if (!map.getLayer("cities-main")) {
        map.addLayer({
          id: "cities-main",
          type: "circle",
          source: "cities",
          filter: ["==", ["get", "tier"], "main"],
          paint: {
            "circle-radius": 10,
            "circle-color": "#2563eb",
            "circle-stroke-width": 3,
            "circle-stroke-color": "#ffffff"
          }
        });
        console.log("✅ Layer 'cities-main' ajoutée");
      } else {
        console.log("⚠️ Layer 'cities-main' existe déjà");
      }

      // Points rouges (tier=other)
      if (!map.getLayer("cities-other")) {
        map.addLayer({
          id: "cities-other",
          type: "circle",
          source: "cities",
          filter: ["==", ["get", "tier"], "other"],
          paint: {
            "circle-radius": 10,
            "circle-color": "#ef4444",
            "circle-stroke-width": 3,
            "circle-stroke-color": "#ffffff"
          }
        });
        console.log("✅ Layer 'cities-other' ajoutée");
      } else {
        console.log("⚠️ Layer 'cities-other' existe déjà");
      }

      // Labels
      if (!map.getLayer("cities-labels")) {
        map.addLayer({
          id: "cities-labels",
          type: "symbol",
          source: "cities",
          layout: {
            "text-field": ["get", "name"],
            "text-size": 14,
            "text-offset": [0, 1.5],
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Regular"]
          },
          paint: {
            "text-color": "#1f2937",
            "text-halo-color": "#ffffff",
            "text-halo-width": 2
          }
        });
        console.log("✅ Layer 'cities-labels' ajoutée");
      } else {
        console.log("⚠️ Layer 'cities-labels' existe déjà");
      }

      // Vérification finale
      console.log("🔍 Sources disponibles:", Object.keys(map.getStyle().sources));
      console.log("🔍 Layers disponibles:", map.getStyle().layers.map(l => l.id));
      
      // Test si on peut récupérer les features
      const source = map.getSource("cities");
      if (source && source._data) {
        console.log("📊 Features dans la source:", source._data.features?.length || 0);
      }

      // 4) Cadre Maroc + Sahara occidental (sans délimitation)
      const bounds = new mapboxgl.LngLatBounds([-13.5, 27.3], [-0.8, 36.1]);
      map.fitBounds(bounds, { padding: 40, duration: 0 });
    });

    return () => {
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, []);

  return (
    <div style={{ position:"relative" }}>
      <div
        ref={mapContainer}
        className="w-full h-[520px]"
        style={{
          borderRadius: 12, border: "1px solid #e5e7eb", overflow: "hidden"
        }}
      />
      {/* Légende simple */}
      <div style={{
        position:"absolute", left:14, bottom:14, background:"#fff",
        borderRadius:10, padding:"12px 14px", boxShadow:"0 6px 24px rgba(0,0,0,.08)",
        font:"500 13px/1.2 system-ui, -apple-system, Segoe UI, Roboto, Arial"
      }}>
        <div style={{fontWeight:700, marginBottom:8}}>Zones d'intervention</div>
        <div style={{display:"flex", alignItems:"center", gap:8, margin:"6px 0"}}>
          <span style={{width:12, height:12, borderRadius:999, background:"#2563eb",
            border:"2px solid #fff", boxShadow:"0 0 0 1px rgba(0,0,0,.08)"}} />
          Villes principales (8–18 min)
        </div>
        <div style={{display:"flex", alignItems:"center", gap:8, margin:"6px 0"}}>
          <span style={{width:12, height:12, borderRadius:999, background:"#ef4444",
            border:"2px solid #fff", boxShadow:"0 0 0 1px rgba(0,0,0,.08)"}} />
          Autres villes (15–30 min)
        </div>
      </div>
    </div>
  );
}