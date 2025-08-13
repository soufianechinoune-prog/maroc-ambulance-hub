import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './map.css';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoic29jaWFsZXhwbG9yZXIiLCJhIjoiREFQbXBISSJ9.dwFTwfSaWsHvktHrRtpydQ';

// Données GeoJSON pour les villes
const mainCitiesData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'Casablanca' },
      geometry: { type: 'Point', coordinates: [-7.5898, 33.5731] }
    },
    {
      type: 'Feature',
      properties: { name: 'Rabat' },
      geometry: { type: 'Point', coordinates: [-6.8498, 34.0209] }
    },
    {
      type: 'Feature',
      properties: { name: 'Marrakech' },
      geometry: { type: 'Point', coordinates: [-7.9811, 31.6295] }
    },
    {
      type: 'Feature',
      properties: { name: 'Tanger' },
      geometry: { type: 'Point', coordinates: [-5.8008, 35.7595] }
    },
    {
      type: 'Feature',
      properties: { name: 'Agadir' },
      geometry: { type: 'Point', coordinates: [-9.5981, 30.4278] }
    }
  ]
};

const otherCitiesData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'Fès' },
      geometry: { type: 'Point', coordinates: [-5.0003, 34.0181] }
    },
    {
      type: 'Feature',
      properties: { name: 'Oujda' },
      geometry: { type: 'Point', coordinates: [-1.9115, 34.6814] }
    }
  ]
};

const MoroccoMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    // Garde pour éviter la double initialisation sous React 18
    if (map.current) return;

    // Configuration de Mapbox
    mapboxgl.accessToken = MAPBOX_TOKEN;

    // Initialisation de la carte
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-7.6, 33.5], // Centre sur Casablanca pour débugger
      zoom: 5,
      projection: 'mercator'
    });

    // Ajout des contrôles de navigation
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Chargement des données et ajout des couches
    map.current.on('load', () => {
      console.log('Mapbox map loaded, adding sources and layers...');
      console.log('Main cities data:', mainCitiesData);
      console.log('Other cities data:', otherCitiesData);
      
      // Ajout des sources de données
      map.current.addSource('main-cities', {
        type: 'geojson',
        data: mainCitiesData
      });

      map.current.addSource('other-cities', {
        type: 'geojson',
        data: otherCitiesData
      });

      console.log('Sources added successfully');

      // Couche des villes principales (bleu)
      map.current.addLayer({
        id: 'main-cities-points',
        type: 'circle',
        source: 'main-cities',
        paint: {
          'circle-color': '#2563eb',
          'circle-radius': 8,
          'circle-stroke-color': '#ffffff',
          'circle-stroke-width': 2
        }
      });
      console.log('Main cities layer added');

      // Couche des autres villes (rouge)
      map.current.addLayer({
        id: 'other-cities-points',
        type: 'circle',
        source: 'other-cities',
        paint: {
          'circle-color': '#dc2626',
          'circle-radius': 6,
          'circle-stroke-color': '#ffffff',
          'circle-stroke-width': 2
        }
      });
      console.log('Other cities layer added');

      // Labels pour les villes principales avec halo blanc
      map.current.addLayer({
        id: 'main-cities-labels',
        type: 'symbol',
        source: 'main-cities',
        layout: {
          'text-field': ['get', 'name'],
          'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
          'text-size': 12,
          'text-offset': [0, 1.5],
          'text-anchor': 'top'
        },
        paint: {
          'text-color': '#1f2937',
          'text-halo-color': '#ffffff',
          'text-halo-width': 2
        }
      });
      console.log('Main cities labels added');

      // Labels pour les autres villes avec halo blanc
      map.current.addLayer({
        id: 'other-cities-labels',
        type: 'symbol',
        source: 'other-cities',
        layout: {
          'text-field': ['get', 'name'],
          'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
          'text-size': 11,
          'text-offset': [0, 1.5],
          'text-anchor': 'top'
        },
        paint: {
          'text-color': '#1f2937',
          'text-halo-color': '#ffffff',
          'text-halo-width': 2
        }
      });
      console.log('Other cities labels added');
      
      console.log('All layers added successfully. Map should now display points.');
    });

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="morocco-map-container">
      <div ref={mapContainer} className="map-container" />
      
      {/* Légende */}
      <div className="map-legend">
        <h4>Zones d'intervention</h4>
        <div className="legend-item">
          <div className="legend-color main-city"></div>
          <span>Villes principales (8-18 min)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color other-city"></div>
          <span>Autres villes (15-30 min)</span>
        </div>
      </div>
    </div>
  );
};

export default MoroccoMap;