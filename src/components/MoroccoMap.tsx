import React from 'react';
import MoroccoMapComponent from '../MoroccoMap';

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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Carte Mapbox */}
          <div className="lg:col-span-3">
            <MoroccoMapComponent />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoroccoMap;