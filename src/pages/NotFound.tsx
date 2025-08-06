import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <SEO 
        title="Page introuvable – Ambulance Maroc"
        description="La page que vous recherchez n'existe pas. Découvrez nos services d'ambulance disponibles 24/7 partout au Maroc."
        canonical="https://www.ambulance-maroc.ma/404"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Page introuvable",
          "description": "La page demandée n'existe pas sur Ambulance Maroc. Retrouvez nos services d'urgence 24/7 partout au Maroc.",
          "url": "https://www.ambulance-maroc.ma/404"
        }}
      />
      <div className="min-h-screen flex items-center justify-center bg-gray-100" aria-label="Page introuvable">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page introuvable</h2>
          <p className="text-lg text-gray-600 mb-8">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          
          <div className="space-y-4">
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link to="/">Retourner à l'accueil</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/services">Voir nos services</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/zones-d-intervention">Consulter nos zones d'intervention</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-3">
                En cas d'urgence médicale :
              </p>
              <Button asChild variant="emergency" size="lg" className="w-full">
                <a href="tel:+212600000000">Appelez immédiatement: +212 6 00 00 00 00</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
