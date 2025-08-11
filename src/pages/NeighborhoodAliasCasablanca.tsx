import { lazy, Suspense } from "react";

const CityPageLazy = lazy(() => import("@/pages/CityPage"));

export default function NeighborhoodAliasCasablanca() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-12 animate-fade-in">Chargement…</div>}>
      <CityPageLazy />
    </Suspense>
  );
}
