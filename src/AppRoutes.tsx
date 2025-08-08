import React from "react";
import { Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Services from "./pages/Services";
import Zones from "./pages/Zones";
import Contact from "./pages/Contact";
import CityPage from "./pages/CityPage";
import NotFound from "./pages/NotFound";
import RedirectCity from "./components/RedirectCity";
import { cities } from "./data/cities";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import ConditionsGeneralesUtilisation from "./pages/ConditionsGeneralesUtilisation";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/services" element={<Services />} />
    <Route path="/zones-d-intervention" element={<Zones />} />
    <Route path="/contact" element={<Contact />} />

    {cities.map((city) => (
      <Route
        key={city.slug}
        path={`/ambulance-${city.slug}`}
        element={<CityPage />}
      />
    ))}

    {/* Legacy zone route redirect */}
    <Route path="/zones" element={<Zones />} />

    {/* Legal pages */}
    <Route path="/mentions-legales" element={<MentionsLegales />} />
    <Route
      path="/politique-confidentialite"
      element={<PolitiqueConfidentialite />}
    />
    <Route
      path="/conditions-generales-utilisation"
      element={<ConditionsGeneralesUtilisation />}
    />

    {/* Redirects for old city URLs (/:slug -> /ambulance-:slug) */}
    {cities.map((city) => (
      <Route
        key={`redirect-${city.slug}`}
        path={`/${city.slug}`}
        element={<RedirectCity />}
      />
    ))}

    {/* Catch-all route */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
