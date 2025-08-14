import React from 'react';
import MoroccoInteractiveMap from "@/components/MoroccoInteractiveMap";

const MoroccoMap = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Carte Interactive du Maroc
          </h2>
          <p className="text-lg text-muted-foreground">
            Découvrez nos zones d'intervention à travers le territoire marocain
          </p>
        </div>

        <div className="grid lg:grid-cols-1 gap-8">
          {/* Carte Mapbox Interactive */}
          <div className="lg:col-span-1">
            <MoroccoInteractiveMap 
              center={{ lng: -6.8498, lat: 31.7917 }} 
              zoom={5.5} 
              showCityMarkers={true}
              className="w-full h-[600px] rounded-xl overflow-hidden border shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoroccoMap;