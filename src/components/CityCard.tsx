import React from "react";
import { cn } from "@/lib/utils";

export type CityCardProps = {
  name: string;
  slug: string;
  className?: string;
};

const CityCard: React.FC<CityCardProps> = ({ name, slug, className }) => {
  return (
    <a
      href={`/ambulance-${slug}`}
      aria-label={`Ambulance à ${name}`}
      className={cn(
        "group block rounded-2xl ring-1 ring-border bg-card p-4 shadow-sm transition-all",
        "hover:shadow-md hover:-translate-y-0.5 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">{name}</h3>
        <span className="text-xs text-muted-foreground">→</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">🚑 Intervention 15–30 min</p>
    </a>
  );
};

export default CityCard;
