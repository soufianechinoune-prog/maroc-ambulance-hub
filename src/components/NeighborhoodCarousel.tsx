import React from "react";
import { Link } from "react-router-dom";
import { neighborhoodsByCity, type Neighborhood } from "@/data/neighborhoods";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NeighborhoodCarouselProps = {
  citySlug: string;
  cityName: string;
  className?: string;
};

const NeighborhoodCarousel: React.FC<NeighborhoodCarouselProps> = ({ citySlug, cityName, className }) => {
  const items: Neighborhood[] = neighborhoodsByCity[citySlug] || [];
  const [open, setOpen] = React.useState(false);
  const gridId = React.useId();

  if (!items.length) return null;

  return (
    <section className={cn("w-full bg-background/80", className)} aria-label={`Quartiers de ${cityName}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <nav className="relative py-4" aria-label={`Navigation des quartiers de ${cityName}`}>
          <Carousel
            opts={{ align: "start" }}
            className="w-full"
          >
            <CarouselContent className="-ml-2">
              {items.map((n) => (
                <CarouselItem key={n.slug} className="pl-2 basis-1/2 sm:basis-1/3 md:basis-1/5">
                  <Link
                    to={`/ambulance-${citySlug}-${n.slug}`}
                    className="block rounded-md border bg-card px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors whitespace-nowrap text-center"
                  >
                    {n.name}
                  </Link>
                </CarouselItem>
              ))}

              {/* Bouton Voir tous les quartiers */}
              <CarouselItem className="pl-2 basis-1/2 sm:basis-1/3 md:basis-1/5">
                <Button
                  variant="secondary"
                  className="w-full"
                  aria-expanded={open}
                  aria-controls={gridId}
                  onClick={() => setOpen((v) => !v)}
                >
                  Voir tous les quartiers
                </Button>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="-left-6 hidden sm:inline-flex" aria-label="Quartier précédent" />
            <CarouselNext className="-right-6 hidden sm:inline-flex" aria-label="Quartier suivant" />
          </Carousel>
        </nav>

        {/* Grille complète (présente dans le DOM pour SEO) */}
        <div
          id={gridId}
          aria-hidden={!open}
          className={cn(
            "mt-4 grid gap-3",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
            open ? "" : "hidden"
          )}
        >
          {items.map((n) => (
            <Link
              key={`grid-${n.slug}`}
              to={`/ambulance-${citySlug}-${n.slug}`}
              className="rounded-md border bg-card px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {n.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NeighborhoodCarousel;
