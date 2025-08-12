import React, { Suspense, lazy } from "react";
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
import NeighborhoodAinDiab from "./pages/NeighborhoodAinDiab";
import NeighborhoodCalifornie from "./pages/NeighborhoodCalifornie";
import NeighborhoodMaarif from "./pages/NeighborhoodMaarif";
import NeighborhoodBourgogne from "./pages/NeighborhoodBourgogne";
import NeighborhoodSidiBelyout from "./pages/NeighborhoodSidiBelyout";
import NeighborhoodAinSebaa from "./pages/NeighborhoodAinSebaa";
import NeighborhoodOasis from "./pages/NeighborhoodOasis";

const BlogIndex = lazy(() => import("./pages/BlogIndex"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const BlogCategoryCasablanca = lazy(() => import("./pages/BlogCategoryCasablanca"));
const BlogCategoryRabat = lazy(() => import("./pages/BlogCategoryRabat"));
const BlogCategoryMarrakech = lazy(() => import("./pages/BlogCategoryMarrakech"));
const BlogCategoryFes = lazy(() => import("./pages/BlogCategoryFes"));
const BlogCategoryTanger = lazy(() => import("./pages/BlogCategoryTanger"));
const BlogCategoryMeknes = lazy(() => import("./pages/BlogCategoryMeknes"));
const BlogCategoryAgadir = lazy(() => import("./pages/BlogCategoryAgadir"));
const BlogCategoryKenitra = lazy(() => import("./pages/BlogCategoryKenitra"));
const BlogCategorySale = lazy(() => import("./pages/BlogCategorySale"));
const BlogCategoryOujda = lazy(() => import("./pages/BlogCategoryOujda"));
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/services" element={<Services />} />
    {/* Service landing aliases to Services page (canonicalized via SEO) */}
    <Route path="/ambulance-urgence" element={<Services />} />
    <Route path="/transport-medicalise" element={<Services />} />
    <Route path="/ambulance-privee" element={<Services />} />
    <Route path="/rapatriement-sanitaire" element={<Services />} />
    <Route path="/transport-inter-hopitaux" element={<Services />} />
    <Route path="/zones-d-intervention" element={<Zones />} />
    <Route path="/contact" element={<Contact />} />

    {/* Quartier (alias de contenu Casablanca) */}
    <Route path="/ambulance-casablanca-ain-diab" element={<NeighborhoodAinDiab />} />
    <Route path="/ambulance-casablanca-californie" element={<NeighborhoodCalifornie />} />
    <Route path="/ambulance-casablanca-maarif" element={<NeighborhoodMaarif />} />
    <Route path="/ambulance-casablanca-bourgogne" element={<NeighborhoodBourgogne />} />
    <Route path="/ambulance-casablanca-sidi-belyout" element={<NeighborhoodSidiBelyout />} />
    <Route path="/ambulance-casablanca-ain-sebaa" element={<NeighborhoodAinSebaa />} />
    <Route path="/ambulance-casablanca-oasis" element={<NeighborhoodOasis />} />

    {/* Blog */}
    <Route path="/blog" element={<Suspense fallback={null}><BlogIndex /></Suspense>} />
    <Route path="/blog/casablanca" element={<Suspense fallback={null}><BlogCategoryCasablanca /></Suspense>} />
    <Route path="/blog/rabat" element={<Suspense fallback={null}><BlogCategoryRabat /></Suspense>} />
    <Route path="/blog/marrakech" element={<Suspense fallback={null}><BlogCategoryMarrakech /></Suspense>} />
    <Route path="/blog/fes" element={<Suspense fallback={null}><BlogCategoryFes /></Suspense>} />
    <Route path="/blog/tanger" element={<Suspense fallback={null}><BlogCategoryTanger /></Suspense>} />
    <Route path="/blog/meknes" element={<Suspense fallback={null}><BlogCategoryMeknes /></Suspense>} />
    <Route path="/blog/agadir" element={<Suspense fallback={null}><BlogCategoryAgadir /></Suspense>} />
    <Route path="/blog/kenitra" element={<Suspense fallback={null}><BlogCategoryKenitra /></Suspense>} />
    <Route path="/blog/sale" element={<Suspense fallback={null}><BlogCategorySale /></Suspense>} />
    <Route path="/blog/oujda" element={<Suspense fallback={null}><BlogCategoryOujda /></Suspense>} />
    <Route path="/blog/:city/:slug" element={<Suspense fallback={null}><BlogPost /></Suspense>} />
    <Route path="/blog/:slug" element={<Suspense fallback={null}><BlogPost /></Suspense>} />

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
