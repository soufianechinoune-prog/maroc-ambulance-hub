import React from "react";
import CityCard from "@/components/CityCard";
import { cities } from "@/data/cities";

export const mainCitySlugs: string[] = [
  "casablanca",
  "rabat",
  "marrakech",
  "tanger",
  "fes",
  "meknes",
  "agadir",
  "oujda",
  "kenitra",
  "mohammedia",
  "tetouan",
  "laayoune",
];

const orderedMainCities = () => {
  const orderMap = new Map(mainCitySlugs.map((s, i) => [s, i] as const));
  return cities
    .filter((c) => orderMap.has(c.slug))
    .sort((a, b) => (orderMap.get(a.slug)! - orderMap.get(b.slug)!));
};

const CityGrid: React.FC = () => {
  const list = orderedMainCities();
  return (
    <div
      role="region"
      aria-label="Villes principales couvertes"
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {list.map((c) => (
        <CityCard key={c.slug} name={c.name} slug={c.slug} />
      ))}
    </div>
  );
};

export default CityGrid;
