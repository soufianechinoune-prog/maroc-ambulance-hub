import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// Aliases -> ville canonique
const CITY_ALIASES: Record<string, string> = {
  maroc: "casablanca", // /blog/ambulance-maroc -> casablanca (sécurité)
  casa: "casablanca",
  casablance: "casablanca", // typos fréquentes
  casblanca: "casablanca",
};

const VALID_CITIES = new Set([
  "casablanca",
  "rabat",
  "marrakech",
  "tanger",
  "fes",
  "agadir",
  "meknes",
  "oujda",
]);

export default function BlogCityRedirect() {
  const location = useLocation();
  const match = location.pathname.match(/\/blog\/ambulance-([a-z-]+)/i);
  const cityRaw = (match?.[1] || "").toLowerCase();

  // Alias connus → ville canonique
  const canonical = CITY_ALIASES[cityRaw] || cityRaw;

  // Ville valide ? si non, on retombe sur /blog (liste globale)
  if (!VALID_CITIES.has(canonical)) {
    return <Navigate to="/blog" replace />;
  }

  // Si tout va bien, on redirige vers la route canonique
  return <Navigate to={`/blog/ambulance-${canonical}`} replace />;
}
