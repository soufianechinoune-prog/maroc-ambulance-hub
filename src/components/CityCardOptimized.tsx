import React, { memo, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from "lucide-react";

interface CityCardOptimizedProps {
  name: string;
  slug: string;
  responseTime: string;
  coverage: string;
  description: string;
  isMain?: boolean;
  neighborhoods?: string[];
}

const CityCardOptimized = memo(({ 
  name, 
  slug, 
  responseTime, 
  coverage, 
  description, 
  isMain = false,
  neighborhoods = []
}: CityCardOptimizedProps) => {
  const handlePrefetch = useCallback(() => {
    if (!window.prefetchedPages) window.prefetchedPages = new Set();
    if (!window.prefetchedPages.has(slug)) {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = `/ambulance-${slug}`;
      document.head.appendChild(link);
      window.prefetchedPages.add(slug);
    }
  }, [slug]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `/ambulance-${slug}`;
  }, [slug]);
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            {isMain && (
              <Badge variant="secondary" className="mt-1">
                Ville principale
              </Badge>
            )}
          </div>
          <div className="text-2xl">🚑</div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Intervention: {responseTime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Couverture: {coverage}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>

        {neighborhoods.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-medium text-muted-foreground mb-2">Quartiers principaux :</p>
            <div className="flex flex-wrap gap-1">
              {neighborhoods.slice(0, 3).map((neighborhood, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {neighborhood}
                </Badge>
              ))}
              {neighborhoods.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{neighborhoods.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}

        <button
          onClick={handleClick}
          onMouseEnter={handlePrefetch}
          onFocus={handlePrefetch}
          className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors bg-transparent border-none cursor-pointer p-0 text-left"
        >
          Voir le service Ambulance à {name} →
        </button>
      </CardContent>
    </Card>
  );
});

CityCardOptimized.displayName = 'CityCardOptimized';

declare global {
  interface Window {
    prefetchedPages: Set<string>;
  }
}

export default CityCardOptimized;